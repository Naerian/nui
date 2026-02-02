import { Injectable, Injector, Type, ComponentRef, inject, EnvironmentInjector, createComponent, InjectionToken } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { SidebarPanelRef } from './sidebar-panel-ref';
import { SidebarPanelConfig, DEFAULT_SIDEBAR_PANEL_CONFIG, SidebarPanelStackItem, SIDEBAR_PANEL_SIZE_MAP, SIDEBAR_PANEL_CONFIG, SidebarPanelPosition } from './models/sidebar-panel.model';
import { SidebarPanelComponent } from './sidebar-panel.component';
import { SidebarPanelActionsService } from './services/sidebar-panel-actions.service';
import { SidebarPanelTabsService } from './services/sidebar-panel-tabs.service';

/**
 * Token de inyecciÃ³n para los datos del componente dinÃ¡mico
 * 
 * Permite inyectar datos en el componente que se carga dentro del panel.
 * 
 * @example
 * ```typescript
 * // En el componente dinÃ¡mico:
 * readonly data = inject(SIDEBAR_PANEL_DATA);
 * ```
 */
export const SIDEBAR_PANEL_DATA = new InjectionToken<any>('SIDEBAR_PANEL_DATA');

/**
 * Token de inyecciÃ³n para la referencia del panel
 * 
 * Permite al componente dinÃ¡mico acceder a la referencia del panel
 * para controlarlo (cerrar, minimizar, etc.).
 * 
 * @example
 * ```typescript
 * // En el componente dinÃ¡mico:
 * readonly panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
 * 
 * closePanel() {
 *   this.panelRef.close({ result: 'some data' });
 * }
 * ```
 */
export const SIDEBAR_PANEL_REF = new InjectionToken<SidebarPanelRef>('SIDEBAR_PANEL_REF');

/**
 * Servicio para gestionar la creaciÃ³n y control de slide panels
 * 
 * Este servicio proporciona una API completa para:
 * - Abrir panels con componentes dinÃ¡micos
 * - Gestionar mÃºltiples panels simultÃ¡neamente
 * - Controlar el ciclo de vida de los panels
 * - Mantener un stack de panels abiertos
 * 
 * **CaracterÃ­sticas:**
 * - Soporte para 4 posiciones (right, left, top, bottom)
 * - 6 tamaÃ±os predefinidos (xs, sm, md, lg, xl, full)
 * - Dimensiones personalizadas
 * - Backdrop configurable
 * - Animaciones suaves
 * - GestiÃ³n de foco y accesibilidad
 * - Cierre por ESC, backdrop o programÃ¡tico
 * - Soporte para mÃºltiples panels
 * 
 * @example
 * ```typescript
 * // Uso bÃ¡sico
 * const panelRef = SidebarPanelService.open(MyComponent, {
 *   position: 'right',
 *   size: 'md',
 *   data: { userId: 123 }
 * });
 * 
 * panelRef.afterClosed().subscribe(result => {
 *   console.log('Panel cerrado con resultado:', result);
 * });
 * 
 * // Cerrar programÃ¡ticamente
 * panelRef.close({ saved: true });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarPanelService {
  private readonly _overlay = inject(Overlay);
  private readonly _injector = inject(Injector);
  private readonly _router = inject(Router);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _tabsService = inject(SidebarPanelTabsService);

  /**
   * Mapa de panels actualmente abiertos
   * Key: ID Ãºnico del panel
   * Value: InformaciÃ³n del panel en el stack
   * @private
   */
  private readonly _openPanels = new Map<string, SidebarPanelStackItem>();

  /**
   * Z-index base para todos los panels
   * El z-index real se calcula dinÃ¡micamente basÃ¡ndose en el stack actual
   * @private
   */
  private readonly _baseZIndex = 1000;

  /**
   * Calcula el siguiente z-index disponible
   * Busca el z-index mÃ¡ximo actual y le suma 1
   * @returns Siguiente z-index disponible
   * @private
   */
  private _getNextZIndex(): number {
    if (this._openPanels.size === 0) {
      return this._baseZIndex;
    }

    const maxZIndex = Math.max(
      ...Array.from(this._openPanels.values()).map((panel) => panel.zIndex),
      this._baseZIndex
    );

    return maxZIndex + 1;
  }

  /**
   * Busca un panel minimizado del componente especificado con la misma posiciÃ³n
   * @param component - Tipo del componente a buscar
   * @param position - PosiciÃ³n del panel a buscar
   * @returns Referencia al panel minimizado o undefined si no existe
   * @private
   */
  private _findMinimizedPanel<T>(component: Type<T>, position: SidebarPanelPosition): SidebarPanelRef | undefined {
    // Obtener todas las pestaÃ±as minimizadas en esa posiciÃ³n
    const tabsInPosition = this._tabsService.getTabsByPosition(position);
    
    if (tabsInPosition.length === 0) {
      return undefined;
    }
    
    // Buscar en el mapa de paneles abiertos uno que coincida con el componente y estÃ© minimizado
    for (const stackItem of this._openPanels.values()) {
      if (
        stackItem.componentType === component && 
        stackItem.state === 'minimized' &&
        stackItem.config.position === position
      ) {
        // Verificar que realmente existe en el servicio de tabs
        const tabExists = tabsInPosition.some(tab => tab.id === stackItem.panelRef.id);
        if (tabExists) {
          return stackItem.panelRef;
        }
      }
    }
    
    return undefined;
  }

  /**
   * Abre un nuevo slide panel con el componente especificado
   * 
   * Crea dinÃ¡micamente un panel lateral que contiene el componente proporcionado.
   * El componente puede inyectar `SIDEBAR_PANEL_DATA` y `SIDEBAR_PANEL_REF` para
   * acceder a sus datos y controlar el panel.
   * 
   * @template T - Tipo del componente dinÃ¡mico
   * @template D - Tipo de los datos que se pasan al componente
   * @template R - Tipo del resultado que devuelve el panel al cerrarse
   * 
   * @param component - Componente standalone a cargar en el panel
   * @param config - ConfiguraciÃ³n opcional del panel (posiciÃ³n, tamaÃ±o, datos, etc.)
   * 
   * @returns Referencia al panel con mÃ©todos para controlarlo y observables para su ciclo de vida
   * 
   * @throws Error si component es null o undefined
   * 
   * @example
   * ```typescript
   * // Panel simple
   * const ref = this.SidebarPanelService.open(UserProfileComponent, {
   *   position: 'right',
   *   size: 'md',
   *   title: 'Perfil de Usuario',
   *   data: { userId: 123 }
   * });
   * 
   * // Panel con formulario y prevenciÃ³n de cierre
   * const ref = this.SidebarPanelService.open(EditFormComponent, {
   *   position: 'right',
   *   size: 'lg',
   *   preventClose: () => confirm('Â¿Descartar cambios?'),
   *   data: { formData: {...} }
   * });
   * 
   * // MÃºltiples panels
   * this.SidebarPanelService.open(Panel1Component, {
   *   position: 'right',
   *   allowMultiple: true,
   *   zIndex: 1000
   * });
   * 
   * this.SidebarPanelService.open(Panel2Component, {
   *   position: 'left',
   *   allowMultiple: true,
   *   zIndex: 1001
   * });
   * ```
   */
  open<T extends object = any, D = unknown, R = unknown>(
    component: Type<T>,
    config?: SidebarPanelConfig<D>
  ): SidebarPanelRef<T, R> {
    // ValidaciÃ³n del componente
    if (!component) {
      throw new Error('[sidebar-panel] Component is required and cannot be null or undefined');
    }

    // Merge con configuraciÃ³n por defecto
    const mergedConfig: SidebarPanelConfig<D> = {
      ...DEFAULT_SIDEBAR_PANEL_CONFIG,
      ...config,
    };

    // Buscar si ya existe un panel minimizado del mismo componente y posiciÃ³n
    // Si existe, restaurarlo en lugar de crear uno nuevo
    const minimizedPanel = this._findMinimizedPanel(component, mergedConfig.position ?? 'right');
    if (minimizedPanel) {
      minimizedPanel.restore();
      return minimizedPanel as SidebarPanelRef<T, R>;
    }

    // Verificar si se permiten mÃºltiples panels
    if (!mergedConfig.allowMultiple && this._openPanels.size > 0) {
      this.closeAll();
    }

    // Crear UNA instancia del servicio de acciones para este panel
    const actionsService = new SidebarPanelActionsService();

    // Crear overlay
    const overlayRef = this._createOverlay(mergedConfig);

    // Crear el componente contenedor (SidebarPanelComponent)
    const containerPortal = new ComponentPortal(
      SidebarPanelComponent,
      null,
      this._createInjector(mergedConfig, overlayRef, null, actionsService)
    );
    const containerRef = overlayRef.attach(containerPortal) as ComponentRef<SidebarPanelComponent>;

    // Crear la referencia ANTES de crear el componente dinÃ¡mico
    const panelRef = new SidebarPanelRef<T, R>(overlayRef, null, mergedConfig);

    // Pasar la referencia del container al panelRef
    panelRef._setContainerComponentRef(containerRef);

    // Crear el componente dinÃ¡mico con el panelRef ya disponible y la misma instancia del servicio
    const componentRef = this._createDynamicComponent(component, mergedConfig, overlayRef, containerRef, panelRef, actionsService);

    // Asignar el componentRef al panelRef
    (panelRef as any).componentInstance = componentRef.instance;
    (panelRef as any)._componentRef = componentRef;

    // Asignar al contenedor
    containerRef.instance.componentInstance = componentRef.instance;
    containerRef.instance.componentType = component;
    containerRef.instance.panelRef = panelRef;

    // Calcular z-index dinÃ¡micamente basado en el stack actual
    const zIndex = mergedConfig.zIndex ?? this._getNextZIndex();

    // Agregar al stack
    this._openPanels.set(panelRef.id, {
      id: panelRef.id,
      config: mergedConfig,
      componentType: component,
      state: 'opening',
      zIndex: zIndex,
      createdAt: new Date(),
      panelRef: panelRef, // Guardar referencia al panel
    });

    // Actualizar el estado en el stack cuando cambie
    panelRef.stateChanged().subscribe((state) => {
      const stackItem = this._openPanels.get(panelRef.id);
      if (stackItem) {
        stackItem.state = state;
      }
    });

    // Cerrar al cambiar de ruta si estÃ¡ configurado
    if (mergedConfig.closeOnRouteChange) {
      this._router.events
        .pipe(
          filter(() => panelRef.isOpen),
          takeUntil(panelRef.afterClosed())
        )
        .subscribe(() => {
          panelRef.close();
        });
    }

    // Remover del stack al cerrar
    panelRef.afterClosed().subscribe(() => {
      this._openPanels.delete(panelRef.id);
    });

    // Marcar como abierto despuÃ©s de la animaciÃ³n
    setTimeout(() => {
      panelRef._finishOpen();
    }, mergedConfig.animationDuration ?? 300);

    return panelRef;
  }

  /**
   * Cierra un panel especÃ­fico por su ID
   * 
   * @param id - ID Ãºnico del panel a cerrar
   * 
   * @remarks
   * El panel ejecutarÃ¡ su animaciÃ³n de salida antes de destruirse.
   * El evento `afterClosed()` se emitirÃ¡ cuando el panel estÃ© completamente cerrado.
   * 
   * @example
   * ```typescript
   * const ref = this.SidebarPanelService.open(MyComponent);
   * 
   * // Cerrar despuÃ©s de 5 segundos
   * setTimeout(() => {
   *   this.SidebarPanelService.close(ref.id);
   * }, 5000);
   * ```
   */
  close(id: string): void {
    const panelItem = this._openPanels.get(id);
    if (panelItem) {
      // El panel se encarga de remover del map a travÃ©s del afterClosed
      // AquÃ­ solo necesitamos disparar el close
    }
  }

  /**
   * Cierra todos los panels abiertos actualmente
   * 
   * Ãštil para limpiar todos los panels, por ejemplo, al cerrar sesiÃ³n
   * o al navegar a una ruta que requiere todos los panels cerrados.
   * 
   * @remarks
   * Los panels se cierran secuencialmente, cada uno ejecutando su
   * animaciÃ³n de salida completa.
   * 
   * @example
   * ```typescript
   * // Cerrar todos los panels antes de logout
   * logout() {
   *   this.SidebarPanelService.closeAll();
   *   this.authService.logout();
   * }
   * ```
   */
  closeAll(): void {
    // Crear un array de IDs porque el map se modifica durante el cierre
    const panelIds = Array.from(this._openPanels.keys());
    panelIds.forEach((id) => this.close(id));
  }

  /**
   * Obtiene la informaciÃ³n de un panel especÃ­fico del stack
   * 
   * @param id - ID Ãºnico del panel
   * @returns InformaciÃ³n del panel en el stack o `undefined` si no existe
   * 
   * @example
   * ```typescript
   * const ref = this.SidebarPanelService.open(MyComponent);
   * const panelInfo = this.SidebarPanelService.getPanel(ref.id);
   * 
   * console.log(panelInfo?.state); // 'opening' | 'open' | 'closing' | 'closed'
   * console.log(panelInfo?.createdAt); // Timestamp de creaciÃ³n
   * ```
   */
  getPanel(id: string): SidebarPanelStackItem | undefined {
    return this._openPanels.get(id);
  }

  /**
   * Obtiene un array con todos los panels actualmente abiertos
   * 
   * @returns Array de informaciÃ³n de todos los panels en el stack
   * 
   * @example
   * ```typescript
   * const allPanels = this.SidebarPanelService.getAllPanels();
   * console.log(`Hay ${allPanels.length} panels abiertos`);
   * 
   * allPanels.forEach(panel => {
   *   console.log(`Panel ${panel.id} en estado: ${panel.state}`);
   * });
   * ```
   */
  getAllPanels(): SidebarPanelStackItem[] {
    return Array.from(this._openPanels.values());
  }

  /**
   * Obtiene el nÃºmero de panels actualmente abiertos
   * 
   * @returns Cantidad de panels en el stack
   * 
   * @example
   * ```typescript
   * if (this.SidebarPanelService.openPanelsCount > 0) {
   *   console.log('Hay panels abiertos');
   * }
   * 
   * // En template
   * <div *ngIf="SidebarPanelService.openPanelsCount > 0">
   *   Hay {{ SidebarPanelService.openPanelsCount }} panel(es) abierto(s)
   * </div>
   * ```
   */
  get openPanelsCount(): number {
    return this._openPanels.size;
  }

  /**
   * Crea un overlay de CDK con la configuraciÃ³n especificada
   * 
   * @private
   * @param config - ConfiguraciÃ³n del panel
   * @returns Referencia al overlay creado
   */
  private _createOverlay(config: SidebarPanelConfig): OverlayRef {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  /**
   * Configura el overlay de CDK para el panel
   * 
   * @private
   * @param config - Configuración del panel
   * @returns Configuración del overlay
   */
  private _getOverlayConfig(config: SidebarPanelConfig): OverlayConfig {
    const position = config.position ?? 'right';
    const positionStrategy = this._overlay.position().global();

    // Configurar posición según el lado
    switch (position) {
      case 'left':
        positionStrategy.left('0');
        break;
      case 'right':
        positionStrategy.right('0');
        break;
      case 'top':
        positionStrategy.top('0');
        break;
      case 'bottom':
        positionStrategy.bottom('0');
        break;
    }

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop ?? true,
      backdropClass: this._getBackdropClasses(config),
      panelClass: this._getPanelClasses(config),
      scrollStrategy: this._overlay.scrollStrategies[config.scrollStrategy ?? 'block'](),
      positionStrategy,
      disposeOnNavigation: config.closeOnRouteChange ?? false,
    });
  }

  /**
   * Obtiene las clases CSS para el backdrop
   * 
   * @private
   * @param config - ConfiguraciÃ³n del panel
   * @returns Array de clases CSS
   */
  private _getBackdropClasses(config: SidebarPanelConfig): string[] {
    const classes = ['sidebar-panel-backdrop'];

    if (config.backdropClass) {
      if (Array.isArray(config.backdropClass)) {
        classes.push(...config.backdropClass);
      } else {
        classes.push(config.backdropClass);
      }
    }

    return classes;
  }

  /**
   * Obtiene las clases CSS para el contenedor del panel
   * 
   * @private
   * @param config - ConfiguraciÃ³n del panel
   * @returns Array de clases CSS
   */
  private _getPanelClasses(config: SidebarPanelConfig): string[] {
    const classes = ['sidebar-panel-pane'];

    if (config.panelClass) {
      if (Array.isArray(config.panelClass)) {
        classes.push(...config.panelClass);
      } else {
        classes.push(config.panelClass);
      }
    }

    return classes;
  }

  /**
   * Crea un injector personalizado para el componente dinÃ¡mico
   * 
   * Proporciona los tokens necesarios para que el componente dinÃ¡mico
   * pueda inyectar su configuraciÃ³n, datos y referencia al panel.
   * 
   * @private
   * @template D - Tipo de los datos
   * @param config - ConfiguraciÃ³n del panel
   * @param overlayRef - Referencia al overlay de CDK
   * @param panelRef - Referencia al panel (puede ser null durante la creaciÃ³n inicial)
   * @param actionsService - Instancia compartida del servicio de acciones
   * @returns Injector configurado
   */
  private _createInjector<D>(
    config: SidebarPanelConfig<D>,
    overlayRef: OverlayRef,
    panelRef: SidebarPanelRef | null,
    actionsService: SidebarPanelActionsService
  ): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        { provide: SIDEBAR_PANEL_CONFIG, useValue: config },
        { provide: OverlayRef, useValue: overlayRef },
        { provide: SIDEBAR_PANEL_DATA, useValue: config.data ?? {} },
        { provide: SidebarPanelActionsService, useValue: actionsService },
        ...(panelRef ? [{ provide: SIDEBAR_PANEL_REF, useValue: panelRef }] : []),
      ],
    });
  }

  /**
   * Crea el componente dinÃ¡mico y lo inserta en el contenedor del panel
   * 
   * Utiliza la funciÃ³n `createComponent` de Angular para crear dinÃ¡micamente
   * el componente especificado y adjuntarlo al DOM del contenedor del panel.
   * 
   * @private
   * @template T - Tipo del componente
   * @template D - Tipo de los datos
   * @param component - Tipo del componente a crear
   * @param config - ConfiguraciÃ³n del panel
   * @param overlayRef - Referencia al overlay de CDK
   * @param containerRef - Referencia al componente contenedor
   * @param panelRef - Referencia al panel
   * @param actionsService - Instancia compartida del servicio de acciones
   * @returns Referencia al componente creado
   * @throws Error si falla la creaciÃ³n del componente o la inserciÃ³n en el DOM
   */
  private _createDynamicComponent<T, D>(
    component: Type<T>,
    config: SidebarPanelConfig<D>,
    overlayRef: OverlayRef,
    containerRef: ComponentRef<SidebarPanelComponent>,
    panelRef: SidebarPanelRef,
    actionsService: SidebarPanelActionsService
  ): ComponentRef<T> {
    try {
      const injector = this._createInjector(config, overlayRef, panelRef, actionsService);

      const componentRef = createComponent(component, {
        environmentInjector: this._environmentInjector,
        elementInjector: injector,
      });

      // Attach al contenedor
      const contentElement = containerRef.location.nativeElement.querySelector('.nui-slidepanel-content');
      
      if (!contentElement) {
        componentRef.destroy();
        throw new Error('[sidebar-panel] Content container not found in panel DOM');
      }

      contentElement.appendChild(componentRef.location.nativeElement);
      componentRef.changeDetectorRef.detectChanges();

      return componentRef;
    } catch (error) {
      // Cleanup en caso de error
      console.error('[sidebar-panel] Error creating dynamic component:', error);
      
      // Cerrar el panel si ya existe
      if (panelRef) {
        panelRef._forceClose();
      }
      
      // Destruir overlay
      if (overlayRef) {
        overlayRef.dispose();
      }
      
      throw error;
    }
  }
}



