import {
  Injectable,
  Injector,
  Type,
  ComponentRef,
  inject,
  EnvironmentInjector,
  createComponent,
  InjectionToken,
  ApplicationRef,
  TemplateRef,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Router, NavigationStart } from '@angular/router';
import { filter, takeUntil, Subject } from 'rxjs';

import { ModalDialogRef } from '../modal-dialog-ref';
import {
  MODAL_DIALOG_CONFIG,
  ModalDialogConfig,
  ModalDialogStackItem,
  ModalDialogType,
} from '../models/modal-dialog.model';
import { ModalDialogComponent } from '../modal-dialog.component';
import { ModalDialogActionsService } from './modal-dialog-actions.service';
import { ModalDialogSimpleContentComponent } from '../modal-dialog-simple-content.component';

// ─── Tokens públicos ──────────────────────────────────────────────────────────

/**
 * Inyecta los datos tipados en el componente dinámico cargado dentro del modal.
 *
 * @example
 * ```typescript
 * // En el componente dinámico:
 * readonly data = inject<MyData>(MODAL_DIALOG_DATA);
 * ```
 */
export const MODAL_DIALOG_DATA = new InjectionToken<any>('MODAL_DIALOG_DATA');

/**
 * Inyecta la referencia al modal en el componente dinámico o en el shell.
 *
 * @example
 * ```typescript
 * readonly modalRef = inject<ModalDialogRef<any>>(MODAL_DIALOG_REF);
 * modalRef.close({ confirmed: true });
 * ```
 */
export const MODAL_DIALOG_REF = new InjectionToken<ModalDialogRef>(
  'MODAL_DIALOG_REF'
);

// ─── Alias de tipos para sobrecargas ─────────────────────────────────────────

/** Configuración para abrir un modal simple (sin componente dinámico externo) */
export type SimpleModalDialogConfig<D = any> = ModalDialogConfig<D> & {
  message?: string;
  htmlContent?: string;
  bodyTemplate?: TemplateRef<any>;
  templateContext?: any;
};

// ─── Servicio ─────────────────────────────────────────────────────────────────

/**
 * Servicio principal para abrir y gestionar modales mediante CDK Overlay.
 *
 * ---
 * ### Overloads de `open()`
 *
 * 1. **`open(Type<T>, config?)`** — Modal con componente dinámico custom:
 *    ```typescript
 *    const ref = modalService.open(MyFormComponent, { title: 'Editar' });
 *    ```
 *
 * 2. **`open(config)`** — Modal simple con mensaje/HTML/template:
 *    ```typescript
 *    const ref = modalService.open({ title: 'Info', message: 'Operación completada' });
 *    ```
 *
 * ---
 * ### Singleton by ID (modales minimizables)
 *
 * Si `config.minimizable: true` y `config.id` coincide con un modal ya abierto:
 * - Si está minimizado → lo restaura y devuelve su ref
 * - Si está abierto/abriendo → devuelve la ref existente
 *
 * @example
 * ```typescript
 * // Con helpers predefinidos
 * this.modalService.openConfirm({ title: '¿Eliminar?', message: 'No se puede deshacer' })
 *   .afterClosed()
 *   .subscribe(result => { if (result?.confirmed) this.delete(); });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ModalDialogService {
  private readonly _overlay = inject(Overlay);
  private readonly _injector = inject(Injector);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _applicationRef = inject(ApplicationRef);
  private readonly _router = inject(Router, { optional: true });

  private readonly _openPanels = new Map<string, ModalDialogStackItem>();
  private readonly _baseZIndex = 1040;
  private _zIndexCounter = 0;

  // ─── Getters de estado ───────────────────────────────────────────────────────

  get openPanelsCount(): number {
    return this._openPanels.size;
  }

  getById(id: string): ModalDialogRef | undefined {
    return this._openPanels.get(id)?.modalRef;
  }

  // ─── Overloads públicos ──────────────────────────────────────────────────────

  /**
   * Abre un modal con un componente Angular como contenido.
   */
  open<T extends object = any, D = unknown, R = unknown>(
    component: Type<T>,
    config?: ModalDialogConfig<D>
  ): ModalDialogRef<T, R>;

  /**
   * Abre un modal simple con mensaje, HTML o template como contenido.
   */
  open<D = unknown, R = unknown>(
    config: SimpleModalDialogConfig<D>
  ): ModalDialogRef<any, R>;

  /** @internal Implementación */
  open<T extends object = any, D = unknown, R = unknown>(
    componentOrConfig: Type<T> | SimpleModalDialogConfig<D>,
    config?: ModalDialogConfig<D>
  ): ModalDialogRef<T, R> {
    let component: Type<T>;
    let mergedConfig: ModalDialogConfig<D>;

    if (this._isType(componentOrConfig)) {
      component = componentOrConfig;
      mergedConfig = config ?? ({} as ModalDialogConfig<D>);
    } else {
      component = ModalDialogSimpleContentComponent as unknown as Type<T>;
      mergedConfig = componentOrConfig as ModalDialogConfig<D>;
    }

    // ── Singleton by ID ──────────────────────────────────────────────────────
    if (mergedConfig.id) {
      const existing = this._openPanels.get(mergedConfig.id);
      if (existing) {
        const ref = existing.modalRef as ModalDialogRef<T, R>;
        if (ref.isMinimized) {
          ref.restore();
        }
        return ref;
      }
    }

    const zIndex = this._getNextZIndex();
    const actionsService = new ModalDialogActionsService();

    // ── Overlay ──────────────────────────────────────────────────────────────
    const overlayRef = this._createOverlay(mergedConfig, zIndex);

    // ── ModalDialogRef (antes del portal, ya que el shell lo inyecta) ────────
    const modalRef = new ModalDialogRef<T, R>(overlayRef, null, mergedConfig);

    // ── Shell portal ─────────────────────────────────────────────────────────
    const injector = this._createInjector(mergedConfig, overlayRef, modalRef, actionsService);
    const portal = new ComponentPortal(ModalDialogComponent, null, injector);
    const containerRef = overlayRef.attach(
      portal
    ) as ComponentRef<ModalDialogComponent>;

    // Z-index del backdrop
    if (overlayRef.backdropElement) {
      overlayRef.backdropElement.style.zIndex = (zIndex - 1).toString();
    }

    // ── Enlace shell ↔ ref ───────────────────────────────────────────────────
    modalRef._setContainerComponentRef(containerRef);

    // ── Componente dinámico (insertado al contentElement) ────────────────────
    const componentRef = this._createDynamicComponent<T, D>(
      component,
      mergedConfig,
      overlayRef,
      containerRef,
      modalRef,
      actionsService
    );

    modalRef.componentInstance = componentRef.instance;

    // ── Stack ────────────────────────────────────────────────────────────────
    const id = modalRef.id;
    const stackItem: ModalDialogStackItem = {
      id,
      modalRef,
      componentType: component,
      config: mergedConfig,
      state: 'opening',
      zIndex,
      createdAt: Date.now(),
    };
    this._openPanels.set(id, stackItem);

    // ── Finalizar apertura tras la animación de entrada ──────────────────────
    setTimeout(() => {
      modalRef._finishOpen();
      stackItem.state = 'open';
    }, mergedConfig.animationDuration ?? 220);

    // ── Limpieza al cerrar ───────────────────────────────────────────────────
    modalRef.afterClosed().subscribe(() => {
      this._openPanels.delete(id);
    });

    // ── closeOnRouteChange ───────────────────────────────────────────────────
    if (mergedConfig.closeOnRouteChange && this._router) {
      const destroy$ = new Subject<void>();
      modalRef.afterClosed().subscribe(() => destroy$.next());

      this._router.events
        .pipe(
          filter((e) => e instanceof NavigationStart),
          takeUntil(destroy$)
        )
        .subscribe(() => {
          modalRef.close({ confirmed: false, data: null, reason: 'cancelled' });
        });
    }

    return modalRef;
  }

  // ─── Helpers predefinidos ────────────────────────────────────────────────────

  /** Modal de confirmación (confirm + cancel) */
  openConfirm<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    return this.open({
      modalType: 'confirm',
      confirmText: options.confirmText ?? 'Confirmar',
      cancelText: options.cancelText ?? 'Cancelar',
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /** Modal de información (solo confirm) */
  openInfo<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    return this.open({
      modalType: 'info',
      confirmText: options.confirmText ?? 'Aceptar',
      canBeClosed: options.canBeClosed !== false,
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /** Modal de advertencia */
  openWarning<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    return this.open({
      modalType: 'warning',
      confirmText: options.confirmText ?? 'Entendido',
      iconTitle: options.iconTitle ?? 'ri-alert-line',
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /** Modal de error / peligro */
  openError<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    return this.open({
      modalType: 'danger',
      confirmText: options.confirmText ?? 'Cerrar',
      iconTitle: options.iconTitle ?? 'ri-error-warning-line',
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /** Modal de éxito */
  openSuccess<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    return this.open({
      modalType: 'success',
      confirmText: options.confirmText ?? 'Continuar',
      iconTitle: options.iconTitle ?? 'ri-checkbox-circle-line',
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /** Modal de verificación con campo de texto (confirmar solo si el texto coincide) */
  openVerification<R = any>(options: SimpleModalDialogConfig): ModalDialogRef<any, R> {
    if (!options.verificationText) {
      console.warn('[modal-dialog] openVerification requiere verificationText');
    }
    return this.open({
      modalType: 'verification',
      confirmText: options.confirmText ?? 'Confirmar',
      cancelText: options.cancelText ?? 'Cancelar',
      iconTitle: options.iconTitle ?? 'ri-shield-check-line',
      verificationLabel: options.verificationLabel ?? 'Para confirmar, escriba:',
      verificationPlaceholder: options.verificationPlaceholder ?? options.verificationText,
      caseSensitive: options.caseSensitive !== false,
      statusBar: options.statusBar ?? { position: 'left', thickness: 4 },
      ...options,
    }) as ModalDialogRef<any, R>;
  }

  /**
   * Abre un modal de carga (loader).
   * Devuelve la ref para que el llamador lo cierre al finalizar la operación.
   */
  openLoader(options: SimpleModalDialogConfig = {}): ModalDialogRef {
    return this.open({
      isLoading: true,
      canBeClosed: options.canBeClosed ?? false,
      hasBackdrop: options.hasBackdrop !== false,
      closeOnBackdropClick: false,
      closeOnEscape: false,
      ...options,
    });
  }

  /** Cierra todos los modales del stack */
  closeAll(reason: 'cancelled' | 'confirmed' = 'cancelled'): void {
    this._openPanels.forEach((item) => {
      item.modalRef.close({ confirmed: reason === 'confirmed', data: null, reason });
    });
  }

  // ─── Privados ────────────────────────────────────────────────────────────────

  private _createOverlay(config: ModalDialogConfig, zIndex: number): OverlayRef {
    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop !== false,
      backdropClass: config.backdropClass ?? 'nui-modal-backdrop',
      panelClass: ['nui-modal-overlay', ...(
        Array.isArray(config.panelClass) ? config.panelClass :
        config.panelClass ? [config.panelClass] : []
      )],
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      width: config.width ?? '500px',
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      minHeight: config.minHeight,
      height: config.height,
    });

    const overlayRef = this._overlay.create(overlayConfig);

    // Set z-index through hostElement
    const overlayHost = (overlayRef as any)._host as HTMLElement | undefined;
    if (overlayHost) {
      overlayHost.style.zIndex = zIndex.toString();
    }

    return overlayRef;
  }

  private _createInjector<D>(
    config: ModalDialogConfig<D>,
    overlayRef: OverlayRef,
    modalRef: ModalDialogRef | null,
    actionsService: ModalDialogActionsService
  ): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        { provide: MODAL_DIALOG_CONFIG, useValue: config },
        { provide: OverlayRef, useValue: overlayRef },
        { provide: MODAL_DIALOG_DATA, useValue: config.data ?? {} },
        { provide: ModalDialogActionsService, useValue: actionsService },
        ...(modalRef ? [{ provide: MODAL_DIALOG_REF, useValue: modalRef }] : []),
      ],
    });
  }

  private _createDynamicComponent<T, D>(
    component: Type<T>,
    config: ModalDialogConfig<D>,
    overlayRef: OverlayRef,
    containerRef: ComponentRef<ModalDialogComponent>,
    modalRef: ModalDialogRef,
    actionsService: ModalDialogActionsService
  ): ComponentRef<T> {
    try {
      const injector = this._createInjector(config, overlayRef, modalRef, actionsService);

      const componentRef = createComponent(component, {
        environmentInjector: this._environmentInjector,
        elementInjector: injector,
      });

      // Registrar en ApplicationRef para que Angular rastree signals y CD
      this._applicationRef.attachView(componentRef.hostView);

      // Insertar en el body del shell
      const bodyEl = containerRef.location.nativeElement.querySelector(
        '.nui-modal-dialog__body'
      ) as HTMLElement | null;

      if (!bodyEl) {
        componentRef.destroy();
        throw new Error('[modal-dialog] No se encontró .nui-modal-dialog__body en el shell');
      }

      bodyEl.appendChild(componentRef.location.nativeElement);

      componentRef.changeDetectorRef.detectChanges();

      setTimeout(() => {
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
      }, 10);

      return componentRef;
    } catch (error) {
      console.error('[modal-dialog] Error al crear el componente dinámico:', error);
      modalRef._forceClose();
      throw error;
    }
  }

  private _getNextZIndex(): number {
    return this._baseZIndex + this._zIndexCounter++;
  }

  private _isType<T>(value: unknown): value is Type<T> {
    return typeof value === 'function' && value.prototype !== undefined;
  }
}
