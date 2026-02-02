import { ComponentRef, TemplateRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject, filter, take } from 'rxjs';
import { SidebarPanelConfig, SidebarPanelState } from './models/sidebar-panel.model';

/**
 * Referencia a un sidebar-panel abierto.
 * Se usa para controlar el panel y suscribirse a sus eventos.
 */
export class SidebarPanelRef<T = any, R = any> {
  /**
   * ID único del panel
   */
  readonly id: string;

  /**
   * Instancia del componente cargado dinámicamente
   */
  componentInstance: T | null = null;

  /**
   * Estado actual del panel
   */
  private _state: SidebarPanelState = 'opening';

  /**
   * Subjects para los eventos
   */
  private readonly _afterOpened = new Subject<void>();
  private readonly _afterClosed = new Subject<R | undefined>();
  private readonly _backdropClick = new Subject<MouseEvent>();
  private readonly _keydownEvents = new Subject<KeyboardEvent>();
  private readonly _closePrevented = new Subject<void>();
  private readonly _stateChanged = new Subject<SidebarPanelState>();

  /**
   * Componente contenedor (SidebarPanelComponent)
   */
  private _containerComponentRef: ComponentRef<any> | null = null;

  /**
   * Indica si el panel ya fue cerrado
   */
  private _closed = false;

  /**
   * Historial de estados del panel
   */
  private readonly _stateHistory: SidebarPanelState[] = [];

  /**
   * Mapa de transiciones válidas entre estados
   */
  private readonly _validTransitions: Record<SidebarPanelState, SidebarPanelState[]> = {
    opening: ['open', 'closing', 'minimized'],
    open: ['closing', 'minimized'],
    closing: ['closed'],
    closed: [],
    minimized: ['open', 'closing'],
  };

  constructor(
    private _overlayRef: OverlayRef,
    private _componentRef: ComponentRef<any> | null,
    public readonly config: SidebarPanelConfig
  ) {
    this.id = config.id || this._generateId();
    this.componentInstance = _componentRef?.instance ?? null;

    // Escuchar clicks en el backdrop
    if (config.closeOnBackdropClick) {
      this._overlayRef.backdropClick().subscribe((event) => {
        this._backdropClick.next(event);
        
        // Si el panel está minimizado, restaurarlo en lugar de cerrarlo
        if (this._state === 'minimized') {
          this.restore();
        } else {
          this.close();
        }
      });
    } else {
      this._overlayRef.backdropClick().subscribe((event) => {
        this._backdropClick.next(event);
      });
    }

    // Escuchar eventos de teclado
    this._overlayRef.keydownEvents().subscribe((event) => {
      this._keydownEvents.next(event);

      if (config.closeOnEscape && event.key === 'Escape') {
        event.preventDefault();
        this.close();
      }
    });
  }

  /**
   * Estado actual del panel
   */
  get state(): SidebarPanelState {
    return this._state;
  }

  /**
   * Indica si el panel está abierto
   */
  get isOpen(): boolean {
    return this._state === 'open' || this._state === 'opening';
  }

  /**
   * Indica si el panel está cerrado
   */
  get isClosed(): boolean {
    return this._state === 'closed' || this._state === 'closing';
  }

  /**
   * Indica si el panel está minimizado
   */
  get isMinimized(): boolean {
    return this._state === 'minimized';
  }

  /**
   * Observable que se emite después de que el panel se abre completamente
   */
  afterOpened(): Observable<void> {
    return this._afterOpened.asObservable();
  }

  /**
   * Observable que se emite después de que el panel se cierra completamente
   * Incluye el resultado pasado a close()
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Observable que se emite cuando se hace click en el backdrop
   */
  backdropClick(): Observable<MouseEvent> {
    return this._backdropClick.asObservable();
  }

  /**
   * Observable que se emite en cada keydown dentro del panel
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._keydownEvents.asObservable();
  }

  /**
   * Observable que se emite cuando se intenta cerrar pero preventClose lo impide
   */
  closePrevented(): Observable<void> {
    return this._closePrevented.asObservable();
  }

  /**
   * Observable que se emite cuando cambia el estado del panel
   */
  stateChanged(): Observable<SidebarPanelState> {
    return this._stateChanged.asObservable();
  }

  /**
   * Cierra el panel
   * @param result Resultado opcional que se pasa a afterClosed()
   */
  async close(result?: R): Promise<void> {
    if (this._closed) {
      return;
    }

    // Verificar si se puede cerrar
    if (this.config.preventClose) {
      const canClose = await Promise.resolve(this.config.preventClose());
      if (!canClose) {
        this._closePrevented.next();
        return;
      }
    }

    this._closed = true;
    this._setState('closing');

    // Disparar la animación del componente contenedor si existe
    if (this._containerComponentRef?.instance?.close) {
      this._containerComponentRef.instance.close();
    }

    // Esperar la duración de la animación antes de destruir
    // 225ms matches Material Design standard and DEFAULT_SIDEBAR_PANEL_CONFIG
    const duration = this.config.animationDuration ?? 225;
    await this._delay(duration);

    // Limpiar (esto también elimina el backdrop)
    this._overlayRef.dispose();
    this._componentRef?.destroy();
    this._containerComponentRef?.destroy();
    this._setState('closed');

    // Emitir eventos
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this._afterOpened.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._closePrevented.complete();
    this._stateChanged.complete();
  }

  /**
   * Minimiza el panel
   * Solo si minimizable está habilitado
   */
  minimize(): void {
    if (!this.config.minimizable) {
      return;
    }

    if (this._state === 'open' || this._state === 'opening') {
      this._setState('minimized');
      
      // Usar opacity y pointer-events en lugar de display para mantener transiciones fluidas
      if (this._overlayRef.backdropElement) {
        this._overlayRef.backdropElement.style.opacity = '0';
        this._overlayRef.backdropElement.style.pointerEvents = 'none';
      }
    }
  }

  /**
   * Restaura el panel desde minimizado
   */
  restore(): void {
    if (this._state === 'minimized') {
      this._setState('open');
      
      // Restaurar opacity y pointer-events para transición fluida
      if (this._overlayRef.backdropElement) {
        this._overlayRef.backdropElement.style.opacity = '';
        this._overlayRef.backdropElement.style.pointerEvents = '';
      }
    }
  }

  /**
   * Actualiza el título del panel
   * @param title Nuevo título
   */
  updateTitle(title: string): void {
    if (this.config) {
      this.config.title = title;
    }
  }

  /**
   * Actualiza el template del header
   * @param template Nuevo template
   */
  updateHeaderTemplate(template: TemplateRef<any>): void {
    if (this.config) {
      this.config.headerTemplate = template;
    }
  }

  /**
   * Actualiza el template del footer
   * @param template Nuevo template
   */
  updateFooterTemplate(template: TemplateRef<any>): void {
    if (this.config) {
      this.config.footerTemplate = template;
    }
  }

  /**
   * @internal
   * Marca el panel como completamente abierto
   */
  _finishOpen(): void {
    this._setState('open');
    this._afterOpened.next();
  }

  /**
   * @internal
   * Cierra el panel forzosamente sin ejecutar preventClose ni animaciones
   * Solo se usa en caso de error durante la creación del componente
   */
  _forceClose(): void {
    this._setState('closing');
    
    if (this._containerComponentRef) {
      this._containerComponentRef.destroy();
      this._containerComponentRef = null;
    }

    if (this._overlayRef) {
      this._overlayRef.dispose();
    }

    this._setState('closed');
    this._afterClosed.next(undefined);
    this._afterClosed.complete();
  }

  /**
   * @internal
   * Establece la referencia al componente contenedor
   */
  _setContainerComponentRef(ref: ComponentRef<any>): void {
    this._containerComponentRef = ref;
  }

  /**
   * Verifica si se puede transicionar al nuevo estado
   * 
   * @param newState - Estado al que se quiere transicionar
   * @returns `true` si la transición es válida, `false` en caso contrario
   * 
   * @example
   * ```typescript
   * if (panelRef.canTransitionTo('closing')) {
   *   panelRef.close();
   * }
   * ```
   */
  canTransitionTo(newState: SidebarPanelState): boolean {
    return this._validTransitions[this._state]?.includes(newState) ?? false;
  }

  /**
   * Obtiene el historial de estados del panel
   * 
   * @returns Array de solo lectura con los estados por los que ha pasado el panel
   * 
   * @example
   * ```typescript
   * console.log(panelRef.stateHistory); // ['opening', 'open', 'closing', 'closed']
   * ```
   */
  get stateHistory(): ReadonlyArray<SidebarPanelState> {
    return this._stateHistory;
  }

  /**
   * Actualiza el estado y emite el evento
   * También registra el cambio en el historial de estados
   */
  private _setState(state: SidebarPanelState): void {
    // Validar transición si no es el estado inicial
    if (this._state && !this.canTransitionTo(state)) {
      console.warn(
        `[sidebar-panel] Invalid state transition from "${this._state}" to "${state}". ` +
        `Valid transitions: ${this._validTransitions[this._state]?.join(', ') || 'none'}`
      );
      return;
    }

    this._state = state;
    this._stateHistory.push(state);
    this._stateChanged.next(state);
  }

  /**
   * Genera un ID único para el panel
   */
  private _generateId(): string {
    return `sidebar-panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Simula un retardo (delay) usando Promesas
   * @param ms Milisegundos a esperar
   */
  private _delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}



