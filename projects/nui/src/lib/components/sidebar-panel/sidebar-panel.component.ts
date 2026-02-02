/**
 * Componente SidebarPanel - Panel lateral deslizable
 */
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Type,
  inject,
  signal,
  computed,
  HostBinding,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import {
  SIDEBAR_PANEL_SIZE_MAP,
  SIDEBAR_PANEL_CONFIG,
  SidebarPanelPosition,
  SidebarPanelAction,
} from './models/sidebar-panel.model';
import { SidebarPanelRef } from './sidebar-panel-ref';
import {
  sidebarPanelAnimation,
  fadeBackdropAnimation,
} from './animations/sidebar-panel.animations';
import { NUI_TRANSLATIONS } from '../../translations/translations.token';
import { ButtonComponent } from '../button/button.component';
import { SidebarPanelActionsService } from './services/sidebar-panel-actions.service';
import { SidebarPanelTabsService } from './services/sidebar-panel-tabs.service';

/**
 * Constante para el delay del focus trap
 */
const FOCUS_TRAP_DELAY = 100;

/**
 * Componente contenedor del sidebar-panel
 *
 * Este componente se crea dinÃ¡micamente a travÃ©s del `SidebarPanelService` y actÃºa
 * como contenedor para el contenido dinÃ¡mico que se carga dentro del panel.
 *
 * **CaracterÃ­sticas principales:**
 * - GestiÃ³n de animaciones de entrada/salida
 * - Soporte para 4 posiciones: right, left, top, bottom
 * - Sistema de focus trap para accesibilidad
 * - ConfiguraciÃ³n de estilos dinÃ¡micos basados en posiciÃ³n y tamaÃ±o
 * - Responsive con soporte para pantalla completa en mÃ³viles
 *
 * **Ciclo de vida:**
 * 1. Se crea dinÃ¡micamente por el servicio
 * 2. Se adjunta al overlay de CDK
 * 3. Se inicializa la animaciÃ³n de entrada
 * 4. Se configura el focus trap
 * 5. Al cerrar, ejecuta animaciÃ³n de salida
 * 6. Se destruye y limpia recursos
 *
 * @internal - No se debe instanciar directamente, usar `SidebarPanelService`
 *
 * @example
 * ```typescript
 * // No instanciar directamente. Usar el servicio:
 * const panelRef = SidebarPanelService.open(MyComponent, {
 *   position: 'right',
 *   size: 'md'
 * });
 * ```
 */
@Component({
  selector: 'nui-sidebar-panel',
  standalone: true,
  imports: [NgTemplateOutlet, ButtonComponent, CommonModule],
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidebarPanelAnimation, fadeBackdropAnimation],
})
export class SidebarPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _focusTrapFactory = inject(FocusTrapFactory);
  private readonly _elementRef = inject(ElementRef);
  private readonly _tabsService = inject(SidebarPanelTabsService);
  protected readonly translations = inject(NUI_TRANSLATIONS);
  protected readonly actionsService = inject(SidebarPanelActionsService, {
    optional: true,
  });

  /**
   * ViewContainerRef para insertar el componente dinÃ¡mico
   */
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer?: ViewContainerRef;

  /**
   * ConfiguraciÃ³n del panel inyectada desde el servicio
   */
  readonly config = inject(SIDEBAR_PANEL_CONFIG);

  /**
   * Obtiene las acciones del footer segÃºn la precedencia:
   * 1. customButtons (configuraciÃ³n)
   * 2. footerTemplate de directiva (actionsService)
   * 3. actions del servicio
   * 4. footerTemplate de configuraciÃ³n
   */
  protected get footerActions(): SidebarPanelAction[] {
    // Si hay customButtons, convertirlos a acciones
    if (this.config.customButtons && this.config.customButtons.length > 0) {
      return this.config.customButtons.map(btn => ({
        label: btn.text,
        icon: btn.icon,
        color: btn.color,
        variant: btn.variant,
        size: btn.size,
        handler: () => btn.callback(this.panelRef),
        disabled: btn.disabled,
        loading: btn.loading,
        class: btn.class,
      }));
    }

    // Si no hay customButtons, usar las acciones del servicio
    return this.actionsService?.actions ?? [];
  }

  /**
   * Obtiene el template de footer personalizado si existe (de la directiva)
   */
  protected get footerTemplate(): TemplateRef<any> | null {
    return this.actionsService?.footerTemplate ?? null;
  }

  /**
   * Determina si se debe mostrar el footer con acciones/botones
   * Tiene en cuenta la precedencia: customButtons > acciones del servicio
   */
  protected get shouldShowFooterActions(): boolean {
    return (
      (this.config.customButtons && this.config.customButtons.length > 0) ||
      (this.footerActions.length > 0 && !this.footerTemplate)
    );
  }

  /**
   * Referencia al panel para control de su ciclo de vida
   * Asignada por el servicio despuÃ©s de la creaciÃ³n
   */
  panelRef!: SidebarPanelRef;

  /**
   * Tipo del componente dinÃ¡mico que se carga en el panel
   */
  componentType!: Type<any>;

  /**
   * Instancia del componente dinÃ¡mico cargado
   */
  componentInstance: any;

  /**
   * Estado actual de la animaciÃ³n del panel
   *
   * - `void`: Estado inicial antes de iniciar la animaciÃ³n
   * - `visible`: Panel visible en pantalla
   * - `hidden`: Panel oculto (estado previo a la destrucciÃ³n)
   */
  animationState = signal<'void' | 'visible' | 'hidden'>('void');

  /**
   * Transform CSS para la animaciÃ³n segÃºn la posiciÃ³n del panel
   */
  get animationTransform(): string {
    const position = this.config.position ?? 'right';
    return this._getTransformByPosition(position);
  }

  /**
   * Focus trap de CDK para gestionar el foco dentro del panel
   * Mejora la accesibilidad manteniendo el foco dentro del panel
   */
  private _focusTrap?: FocusTrap;

  /**
   * Elemento que tenÃ­a el foco antes de abrir el panel
   * Se restaura al cerrar para mejor accesibilidad
   */
  private _previouslyFocusedElement: HTMLElement | null = null;

  /**
   * PosiciÃ³n de scroll guardada antes de bloquear el scroll
   * Se restaura al cerrar el panel
   */
  private _previousScrollPosition?: { x: number; y: number };

  /**
   * Obtiene las clases CSS para el elemento host del componente
   *
   * Las clases incluyen:
   * - Clase base del contenedor
   * - Clase de posiciÃ³n (right, left, top, bottom)
   * - Clase de tamaÃ±o (xs, sm, md, lg, xl, full)
   * - Clase condicional para modo fullscreen en mÃ³viles
   * - Clase condicional para estado minimizado
   *
   * @returns String con las clases CSS separadas por espacios
   */
  @HostBinding('class') get hostClasses(): string {
    const classes = [
      'sidebar-panel-container',
      `sidebar-panel-position-${this.config.position ?? 'right'}`,
      `sidebar-panel-size-${this.config.size ?? 'md'}`,
    ];

    if (this.config.mobileFullScreen) {
      classes.push('sidebar-panel-mobile-fullscreen');
    }

    if (this.panelRef?.isMinimized) {
      classes.push('sidebar-panel-minimized');
    }

    return classes.join(' ');
  }

  /**
   * Atributo data-position para identificar la posiciÃ³n del panel
   */
  @HostBinding('attr.data-position') get dataPosition(): string {
    return this.config.position ?? 'right';
  }

  /**
   * Atributo data-minimized para identificar si estÃ¡ minimizado
   */
  @HostBinding('attr.data-minimized') get dataMinimized(): string | null {
    return this.panelRef?.isMinimized ? 'true' : null;
  }

  /**
   * Atributo data-sidebar-panel-id para identificar de forma única este panel
   */
  @HostBinding('attr.data-sidebar-panel-id') get dataSidebarPanelId(): string {
    return this.panelRef?.id ?? '';
  }

  /**
   * Obtiene los estilos CSS dinÃ¡micos para el elemento host
   *
   * Los estilos se calculan segÃºn la configuraciÃ³n del panel:
   * - **Posiciones horizontales (left/right)**: Controla width, height es 100vh
   * - **Posiciones verticales (top/bottom)**: Controla height, width es 100vw
   * - **z-index**: Se aplica si estÃ¡ especificado en la configuraciÃ³n
   *
   * Soporta dimensiones personalizadas a travÃ©s de `config.width`, `config.height`,
   * `config.maxWidth` y `config.maxHeight`.
   *
   * @returns Objeto con propiedades de estilo CSS
   */
  @HostBinding('style') get hostStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    const position = this.config.position ?? 'right';
    const size = this.config.size ?? 'md';

    // Aplicar estilos de dimensiones
    Object.assign(styles, this._getDimensionStyles(position, size));

    // Z-index
    if (this.config.zIndex) {
      styles['z-index'] = this.config.zIndex.toString();
    }

    return styles;
  }

  /**
   * Calcula los estilos de dimensiones segÃºn la posiciÃ³n y tamaÃ±o
   *
   * @param position - PosiciÃ³n del panel
   * @param size - TamaÃ±o del panel
   * @returns Objeto con estilos de dimensiones
   * @private
   */
  private _getDimensionStyles(
    position: SidebarPanelPosition,
    size: string,
  ): Record<string, string> {
    const isHorizontal = position === 'left' || position === 'right';

    if (isHorizontal) {
      return {
        width:
          this.config.width ??
          SIDEBAR_PANEL_SIZE_MAP[size as keyof typeof SIDEBAR_PANEL_SIZE_MAP],
        height: '100vh',
        ...(this.config.maxWidth && { 'max-width': this.config.maxWidth }),
      };
    }

    return {
      height:
        this.config.height ??
        SIDEBAR_PANEL_SIZE_MAP[size as keyof typeof SIDEBAR_PANEL_SIZE_MAP],
      width: '100vw',
      ...(this.config.maxHeight && { 'max-height': this.config.maxHeight }),
    };
  }

  /**
   * Calcula los parÃ¡metros de animaciÃ³n segÃºn la posiciÃ³n del panel
   *
   * Determina la direcciÃ³n de la transformaciÃ³n CSS basÃ¡ndose en la posiciÃ³n:
   * - **right**: `translateX(100%)` - Desde/hacia la derecha
   * - **left**: `translateX(-100%)` - Desde/hacia la izquierda
   * - **top**: `translateY(-100%)` - Desde/hacia arriba
   * - **bottom**: `translateY(100%)` - Desde/hacia abajo
   *
   * @returns Objeto con el estado actual y parÃ¡metros de animaciÃ³n
   */
  private readonly _animationParams = computed(() => {
    const position = this.config.position ?? 'right';
    const transform = this._getTransformByPosition(position);

    return {
      value: this.animationState(),
      params: {
        transform,
        duration: this.config.animationDuration ?? 300,
      },
    };
  });

  @HostBinding('@sidebar-panel')
  get animationParams() {
    return this._animationParams();
  }

  /**
   * Obtiene la transformaciÃ³n CSS segÃºn la posiciÃ³n del panel
   *
   * Usa translate3d en lugar de translateX/Y para:
   * - Activar aceleraciÃ³n de GPU (hardware acceleration)
   * - Mejorar fluidez de animaciones (60fps estables)
   * - Reducir jank y stuttering
   * - Matching con Material-UI Drawer performance
   *
   * @param position - PosiciÃ³n del panel (right, left, top, bottom)
   * @returns String con la transformaciÃ³n CSS usando translate3d
   * @private
   */
  private _getTransformByPosition(position: SidebarPanelPosition): string {
    const transforms: Record<SidebarPanelPosition, string> = {
      right: 'translate3d(100%, 0, 0)',   // Desliza desde la derecha
      left: 'translate3d(-100%, 0, 0)',   // Desliza desde la izquierda
      top: 'translate3d(0, -100%, 0)',    // Desliza desde arriba
      bottom: 'translate3d(0, 100%, 0)',  // Desliza desde abajo
    };
    return transforms[position];
  }

  /**
   * Determina si se debe mostrar el header del panel
   *
   * @returns `true` si se debe mostrar, `false` en caso contrario (por defecto: `true`)
   */
  get showHeader(): boolean {
    return this.config.showHeader ?? true;
  }

  /**
   * Determina si se debe mostrar el botÃ³n de cerrar en el header
   *
   * @returns `true` si se debe mostrar, `false` en caso contrario (por defecto: `true`)
   */
  get showCloseButton(): boolean {
    return this.config.showCloseButton ?? true;
  }

  /**
   * Obtiene el tÃ­tulo del panel desde la configuraciÃ³n
   *
   * @returns TÃ­tulo del panel o string vacÃ­o si no estÃ¡ definido
   */
  get title(): string {
    return this.config.title ?? '';
  }

  /**
   * Inicializa el componente y guarda el elemento con foco actual
   *
   * Se ejecuta durante la fase de inicializaciÃ³n del componente,
   * antes de que la vista estÃ© completamente renderizada.
   */
  ngOnInit(): void {
    // Guardar elemento con foco actual para restaurarlo al cerrar
    this._previouslyFocusedElement = document.activeElement as HTMLElement;

    // Aplicar estrategia de scroll
    this._handleScrollStrategy();

    // Suscribirse a cambios de estado para detectar cambios
    if (this.panelRef) {
      this.panelRef.stateChanged().subscribe((state) => {
        // Si el estado cambiÃ³ a 'open' desde 'minimized', ejecutar animaciÃ³n de restauraciÃ³n
        if (state === 'open' && this.animationState() === 'hidden') {
          // Remover la pestaÃ±a si existe (por si se restaurÃ³ desde otro lugar)
          this._tabsService.removeTab(this.panelRef.id);
          
          // Ejecutar animaciÃ³n de entrada
          requestAnimationFrame(() => {
            this.animationState.set('visible');
            this._cdr.detectChanges();
          });
        }
        
        // Forzar detecciÃ³n de cambios para actualizar el template y estilos
        this._cdr.detectChanges();
      });
    }
  }

  /**
   * Inicia las animaciones despuÃ©s de que la vista estÃ© completamente renderizada
   *
   * Usa `requestAnimationFrame` en lugar de `setTimeout` para garantizar que:
   * 1. El DOM estÃ© completamente listo
   * 2. La animaciÃ³n se ejecute en el siguiente frame de renderizado
   * 3. No haya conflictos con el ciclo de detecciÃ³n de cambios
   *
   * Secuencia:
   * 1. Inicia la animaciÃ³n de entrada (void â†’ visible)
   * 2. Configura el focus trap despuÃ©s de FOCUS_TRAP_DELAY (si autoFocus estÃ¡ habilitado)
   */
  ngAfterViewInit(): void {
    // Usar requestAnimationFrame para garantizar que el DOM estÃ© listo
    requestAnimationFrame(() => {
      this.animationState.set('visible');
      this._cdr.markForCheck();
    });

    // Configurar focus trap
    if (this.config.autoFocus !== false) {
      setTimeout(() => {
        this._setupFocusTrap();
      }, FOCUS_TRAP_DELAY);
    }
  }

  /**
   * Destruye el componente y limpia los recursos
   *
   * - Destruye el focus trap
   * - Restaura el foco al elemento anterior
   * - Restaura el scroll del body
   */
  ngOnDestroy(): void {
    this._focusTrap?.destroy();

    // Limpiar la pestaÃ±a del servicio si el panel estÃ¡ minimizado
    if (this.panelRef?.isMinimized) {
      this._tabsService.removeTab(this.panelRef.id);
    }

    // Restaurar scroll
    this._restoreScroll();

    // Restaurar foco al elemento anterior
    if (
      this._previouslyFocusedElement &&
      typeof this._previouslyFocusedElement.focus === 'function'
    ) {
      // Usar timeout para asegurar que el DOM estÃ© listo
      setTimeout(() => {
        this._previouslyFocusedElement?.focus();
      }, 0);
    }
  }

  /**
   * Inicia la animaciÃ³n de cierre del panel
   *
   * Este mÃ©todo solo cambia el estado de la animaciÃ³n a `hidden`.
   * La destrucciÃ³n real del componente es manejada por `SidebarPanelRef`
   * despuÃ©s de que la animaciÃ³n termine.
   *
   * @internal - Llamado internamente por `SidebarPanelRef.close()`
   */
  close(): void {
    this.animationState.set('hidden');
    this._cdr.markForCheck();
  }

  /**
   * Solicita el cierre del panel a través de su referencia
   *
   * Este método es llamado por el botón de cerrar en el header.
   * Ejecuta la función `preventClose` si está configurada, y solo cierra
   * el panel si la función retorna `true` o no está definida.
   */
  requestClose(): void {
    this.panelRef?.close();
  }

  /**
   * Minimiza el panel
   *
   * El panel se convierte en una pestaÃ±a minimizada en la esquina de la pantalla.
   * El usuario puede hacer click en la pestaÃ±a para restaurar el panel.
   */
  minimize(): void {
    if (this.panelRef) {
      // 1. Ejecutar animaciÃ³n de salida (slideOut)
      this.animationState.set('hidden');
      
      // 2. DespuÃ©s de la animaciÃ³n, cambiar estado a minimized y registrar en el servicio
      setTimeout(() => {
        this.panelRef.minimize();
        
        // Registrar la pestaÃ±a en el servicio global
        this._tabsService.addTab({
          id: this.panelRef.id,
          title: this.title || 'Panel',
          position: this.config.position ?? 'right',
          restoreCallback: () => this.restore(),
        });
        
        this._cdr.detectChanges();
      }, 300); // DuraciÃ³n de la animaciÃ³n
    }
  }

  /**
   * Restaura el panel desde el estado minimizado
   */
  restore(): void {
    if (this.panelRef) {
      // 1. Remover la pestaÃ±a del servicio
      this._tabsService.removeTab(this.panelRef.id);
      
      // 2. Cambiar estado del panel (esto tambiÃ©n muestra el backdrop)
      this.panelRef.restore();
      
      // 3. Forzar detecciÃ³n de cambios para actualizar el DOM
      this._cdr.detectChanges();
      
      // 4. En el siguiente frame, ejecutar animaciÃ³n de entrada
      requestAnimationFrame(() => {
        this.animationState.set('visible');
        this._cdr.detectChanges();
      });
    }
  }

  /**
   * Configura el focus trap de CDK para gestionar el foco dentro del panel
   *
   * El focus trap:
   * - Mantiene el foco dentro del panel mientras estÃ¡ abierto
   * - Mejora la accesibilidad para usuarios de teclado
   * - Soporta auto-focus en el primer elemento focusable o en un selector especÃ­fico
   *
   * @private
   */
  private _setupFocusTrap(): void {
    const element = this._elementRef.nativeElement;

    if (element) {
      this._focusTrap = this._focusTrapFactory.create(element);

      // Auto-focus
      if (this.config.autoFocus === true) {
        this._focusTrap.focusInitialElementWhenReady();
      } else if (typeof this.config.autoFocus === 'string') {
        const targetElement = element.querySelector(
          this.config.autoFocus,
        ) as HTMLElement;
        if (targetElement) {
          targetElement.focus();
        } else {
          this._focusTrap.focusInitialElementWhenReady();
        }
      }
    }
  }

  /**
   * Aplica la estrategia de scroll configurada
   *
   * - **block**: Bloquea el scroll del body y guarda la posiciÃ³n actual
   * - **reposition**: No hace nada (el panel se reposiciona automÃ¡ticamente)
   * - **close**: Cierra el panel al hacer scroll (manejado en otro lugar)
   *
   * @private
   */
  private _handleScrollStrategy(): void {
    const strategy = this.config.scrollStrategy ?? 'block';

    if (strategy === 'block') {
      // Guardar posiciÃ³n actual de scroll
      this._previousScrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
      };

      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Restaura el scroll al estado anterior
   *
   * Restaura la posiciÃ³n de scroll guardada y desbloquea el overflow del body
   *
   * @private
   */
  private _restoreScroll(): void {
    const strategy = this.config.scrollStrategy ?? 'block';

    if (strategy === 'block') {
      // Restaurar overflow del body
      document.body.style.overflow = '';

      // Restaurar posiciÃ³n de scroll si fue guardada
      if (this._previousScrollPosition) {
        window.scrollTo(
          this._previousScrollPosition.x,
          this._previousScrollPosition.y,
        );
      }
    }
  }
}


