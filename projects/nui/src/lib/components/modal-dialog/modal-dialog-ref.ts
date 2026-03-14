import { ComponentRef, TemplateRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import {
  ModalDialogConfig,
  ModalDialogResult,
  ModalDialogState,
} from './models/modal-dialog.model';

/**
 * Referencia a un modal abierto.
 *
 * Permite controlar el ciclo de vida del modal (cerrar, minimizar, restaurar)
 * y suscribirse a sus eventos desde fuera del modal.
 *
 * @example
 * ```typescript
 * const ref = this.modalService.open(MyComponent, { title: 'Editor' });
 *
 * ref.afterClosed().subscribe(result => {
 *   if (result?.confirmed) {
 *     // Procesar datos
 *   }
 * });
 *
 * // Cerrar programáticamente
 * ref.close({ confirmed: false });
 * ```
 */
export class ModalDialogRef<T = any, R = any> {
  /** ID único del modal en el stack */
  readonly id: string;

  /** Instancia del componente dinámico cargado (si existe) */
  componentInstance: T | null = null;

  private _state: ModalDialogState = 'opening';

  private readonly _afterOpened = new Subject<void>();
  private readonly _afterClosed = new Subject<ModalDialogResult<R> | undefined>();
  private readonly _backdropClick = new Subject<MouseEvent>();
  private readonly _keydownEvents = new Subject<KeyboardEvent>();
  private readonly _closePrevented = new Subject<void>();
  private readonly _stateChanged = new Subject<ModalDialogState>();

  /** Componente contenedor (ModalDialogComponent — shell) */
  private _containerComponentRef: ComponentRef<any> | null = null;

  private _closed = false;

  private readonly _stateHistory: ModalDialogState[] = ['opening'];

  /**
   * Máquina de estados: define las transiciones válidas entre estados.
   * Cualquier transición no listada es rechazada y logeada como warning.
   */
  private readonly _validTransitions: Record<ModalDialogState, ModalDialogState[]> =
    {
      opening: ['open', 'closing', 'minimized'],
      open: ['closing', 'minimized'],
      closing: ['closed'],
      closed: [],
      minimized: ['open', 'closing'],
    };

  constructor(
    private readonly _overlayRef: OverlayRef,
    private readonly _componentRef: ComponentRef<any> | null,
    public readonly config: ModalDialogConfig
  ) {
    this.id = config.id ?? this._generateId();

    // Backdrop click
    if (config.closeOnBackdropClick !== false) {
      this._overlayRef.backdropClick().subscribe((event) => {
        this._backdropClick.next(event);
        if (this._state === 'minimized') {
          this.restore();
        } else {
          this.close({ confirmed: false, data: null, reason: 'backdrop' });
        }
      });
    } else {
      this._overlayRef.backdropClick().subscribe((event) => {
        this._backdropClick.next(event);
      });
    }

    // ESC key
    this._overlayRef.keydownEvents().subscribe((event) => {
      this._keydownEvents.next(event);
      if (config.closeOnEscape !== false && event.key === 'Escape') {
        event.preventDefault();
        this.close({ confirmed: false, data: null, reason: 'escape' });
      }
    });
  }

  // ─── Getters de estado ─────────────────────────────────────

  get state(): ModalDialogState {
    return this._state;
  }

  get isOpen(): boolean {
    return this._state === 'open' || this._state === 'opening';
  }

  get isClosed(): boolean {
    return this._state === 'closed' || this._state === 'closing';
  }

  get isMinimized(): boolean {
    return this._state === 'minimized';
  }

  get stateHistory(): ReadonlyArray<ModalDialogState> {
    return this._stateHistory;
  }

  // ─── Observables públicos ──────────────────────────────────

  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  afterClosed(): Observable<ModalDialogResult<R> | undefined> {
    return this._afterClosed.asObservable();
  }

  backdropClick(): Observable<MouseEvent> {
    return this._backdropClick.asObservable();
  }

  keydownEvents(): Observable<KeyboardEvent> {
    return this._keydownEvents.asObservable();
  }

  closePrevented(): Observable<void> {
    return this._closePrevented.asObservable();
  }

  stateChanged(): Observable<ModalDialogState> {
    return this._stateChanged.asObservable();
  }

  // ─── Ciclo de vida público ─────────────────────────────────

  /**
   * Cierra el modal con un resultado opcional.
   * Si `preventClose` está configurado y retorna false, el cierre se cancela.
   */
  async close(result?: ModalDialogResult<R>): Promise<void> {
    if (this._closed) return;

    if (this.config.preventClose) {
      const canClose = await Promise.resolve(this.config.preventClose());
      if (!canClose) {
        this._closePrevented.next();
        return;
      }
    }

    this._closed = true;
    this._setState('closing');

    // Disparar animación de salida en el shell
    if (this._containerComponentRef?.instance?.close) {
      this._containerComponentRef.instance.close();
    }

    // Esperar la duración de la animación antes de destruir
    const duration = this.config.animationDuration ?? 200;
    await this._delay(duration);

    this._overlayRef.dispose();
    this._componentRef?.destroy();
    this._containerComponentRef?.destroy();
    this._setState('closed');

    this._afterClosed.next(result);
    this._afterClosed.complete();
    this._afterOpened.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._closePrevented.complete();
    this._stateChanged.complete();
  }

  /**
   * Minimiza el modal al dock inferior.
   * Solo tiene efecto si `config.minimizable: true`.
   */
  minimize(): void {
    if (!this.config.minimizable) return;
    if (this._state !== 'open' && this._state !== 'opening') return;

    this._setState('minimized');

    // Ocultar backdrop sin destruir el overlay
    if (this._overlayRef.backdropElement) {
      this._overlayRef.backdropElement.style.opacity = '0';
      this._overlayRef.backdropElement.style.pointerEvents = 'none';
    }
  }

  /**
   * Restaura el modal desde el dock al estado visible.
   */
  restore(): void {
    if (this._state !== 'minimized') return;

    this._setState('open');

    if (this._overlayRef.backdropElement) {
      this._overlayRef.backdropElement.style.opacity = '';
      this._overlayRef.backdropElement.style.pointerEvents = '';
    }
  }

  /**
   * Verifica si una transición de estado es válida.
   */
  canTransitionTo(newState: ModalDialogState): boolean {
    return this._validTransitions[this._state]?.includes(newState) ?? false;
  }

  // ─── Mutaciones de configuración en caliente ───────────────

  /**
   * Actualiza el título del modal en caliente.
   * Llama a updateTitle() en la instancia del componente (signal-based).
   */
  updateTitle(title: string): void {
    (this.config as any).title = title;
    this._containerComponentRef?.instance?.updateTitle?.(title);
  }

  /**
   * Actualiza el template del header en caliente.
   */
  updateHeaderTemplate(template: TemplateRef<any>): void {
    (this.config as any).headerTemplate = template;
    this._containerComponentRef?.instance?._refreshView?.();
  }

  /**
   * Actualiza el template del footer en caliente.
   */
  updateFooterTemplate(template: TemplateRef<any>): void {
    (this.config as any).footerTemplate = template;
    this._containerComponentRef?.instance?._refreshView?.();
  }

  // ─── API interna (@internal) ───────────────────────────────

  /** @internal Llamado por el servicio cuando la animación de entrada finaliza */
  _finishOpen(): void {
    this._setState('open');
    this._afterOpened.next();
  }

  /** @internal Cierre forzado sin animación (usado al detectar errores) */
  _forceClose(): void {
    if (this._closed) return;
    this._closed = true;
    this._setState('closing');
    this._containerComponentRef?.destroy();
    this._containerComponentRef = null;
    this._overlayRef.dispose();
    this._setState('closed');
    this._afterClosed.next(undefined);
    this._afterClosed.complete();
  }

  /** @internal Asigna la referencia al shell (ModalDialogComponent) */
  _setContainerComponentRef(ref: ComponentRef<any>): void {
    this._containerComponentRef = ref;
  }

  // ─── Privados ──────────────────────────────────────────────

  private _setState(state: ModalDialogState): void {
    if (!this.canTransitionTo(state)) {
      console.warn(
        `[modal-dialog] Transición de estado inválida: "${this._state}" → "${state}". ` +
          `Permitidas: ${this._validTransitions[this._state]?.join(', ') || 'ninguna'}`
      );
      return;
    }
    this._state = state;
    this._stateHistory.push(state);
    this._stateChanged.next(state);
  }

  private _generateId(): string {
    return `modal-dialog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private _delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
