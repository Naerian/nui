import { signal, Signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastConfig, ToastType, ToastState } from './models/toast.model';

/**
 * Referencia a un toast individual
 * Permite controlarlo después de creado
 */
export class ToastRef {
  /**
   * ID único del toast
   */
  readonly id: string;

  /**
   * Tipo del toast
   */
  readonly type: ToastType;

  /**
   * Signal con la configuración del toast
   * Se expone como Signal para que los computed puedan rastrear cambios
   */
  readonly config: Signal<ToastConfig>;
  private readonly _config: ReturnType<typeof signal<ToastConfig>>;

  /**
   * Signal con el estado actual del toast
   */
  private readonly _state = signal<'visible' | 'hiding' | 'hidden'>('visible');
  readonly state: Signal<'visible' | 'hiding' | 'hidden'> = this._state.asReadonly();

  /**
   * Signal con el tiempo restante (ms) si hay timeout
   */
  private readonly _timeRemaining = signal<number>(0);
  readonly timeRemaining: Signal<number> = this._timeRemaining.asReadonly();

  /**
   * Signal que indica si está pausado (hover o focus loss)
   */
  private readonly _isPaused = signal<boolean>(false);
  readonly isPaused: Signal<boolean> = this._isPaused.asReadonly();

  /**
   * Computed: indica si el toast está expandido
   */
  private readonly _isExpanded = signal<boolean>(false);
  readonly isExpanded: Signal<boolean> = this._isExpanded.asReadonly();

  /**
   * Subject que se completa cuando el toast se cierra
   */
  private readonly _afterClosed$ = new Subject<void>();

  /**
   * Subject que se emite cuando el toast se muestra
   */
  private readonly _afterShown$ = new Subject<void>();

  /**
   * Subject que se emite cuando el toast se pausa
   */
  private readonly _onPause$ = new Subject<void>();

  /**
   * Subject que se emite cuando el toast se reanuda
   */
  private readonly _onResume$ = new Subject<void>();

  /**
   * Referencia al temporizador de timeout
   */
  private timeoutId?: ReturnType<typeof setTimeout>;

  /**
   * Timestamp cuando se pausó
   */
  private pausedAt?: number;

  /**
   * Tiempo acumulado de pausa
   */
  private pausedTime = 0;

  /**
   * Timestamp de creación (público para ordenamiento)
   */
  readonly createdAt: Date;

  constructor(id: string, type: ToastType, config: ToastConfig) {
    this.id = id;
    this.type = type;
    
    // Inicializar el signal writable y el readonly
    this._config = signal(config);
    this.config = this._config.asReadonly();
    
    this.createdAt = new Date();

    // Inicializar tiempo restante si hay timeout
    if (config.timeout && config.timeout > 0) {
      this._timeRemaining.set(config.timeout);
    }
  }

  /**
   * Observable que se completa al cerrarse el toast
   */
  afterClosed(): Observable<void> {
    return this._afterClosed$.asObservable();
  }

  /**
   * Observable que se emite al mostrarse el toast
   */
  afterShown(): Observable<void> {
    return this._afterShown$.asObservable();
  }

  /**
   * Observable que se emite al pausarse el toast
   */
  onPause(): Observable<void> {
    return this._onPause$.asObservable();
  }

  /**
   * Observable que se emite al reanudarse el toast
   */
  onResume(): Observable<void> {
    return this._onResume$.asObservable();
  }

  /**
   * Cierra el toast
   */
  close(): void {
    if (this._state() === 'hiding' || this._state() === 'hidden') {
      return;
    }

    this._state.set('hiding');
    this.clearTimeout();

    // Ejecutar callback onClosed si existe
    const config = this.config();
    if (config.onClosed) {
      config.onClosed();
    }

    // Esperar a que termine la animación de salida antes de completar
    const duration = config.animationDuration || 300;
    setTimeout(() => {
      this.markAsHidden();
      this._afterClosed$.next();
      this._afterClosed$.complete();
    }, duration);
  }

  /**
   * Actualiza el toast con nuevas opciones
   */
  update(options: Partial<ToastConfig>): void {
    // Actualizar configuración creando un nuevo objeto para que el signal detecte el cambio
    const updatedConfig = { ...this._config(), ...options };
    this._config.set(updatedConfig);

    // Si se actualiza el timeout, resetear el temporizador
    if (options.timeout !== undefined) {
      this.resetTimeout();
    }
  }

  /**
   * Pausa el timeout
   */
  pause(): void {
    const config = this.config();
    if (this._isPaused() || !config.timeout || config.timeout === 0) {
      return;
    }

    this._isPaused.set(true);
    this.pausedAt = Date.now();

    // Guardar el tiempo restante actual antes de limpiar el timeout
    const currentRemaining = this._timeRemaining();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }

    // Mantener el tiempo restante cuando se pausa (no volver a 100%)
    this._timeRemaining.set(currentRemaining);

    // Ejecutar callback onPause si existe
    if (config.onPause) {
      config.onPause();
    }

    this._onPause$.next();
  }

  /**
   * Reanuda el timeout
   */
  resume(): void {
    const config = this.config();
    if (!this._isPaused() || !config.timeout || config.timeout === 0) {
      return;
    }

    this._isPaused.set(false);

    // Calcular tiempo acumulado de pausa
    if (this.pausedAt) {
      this.pausedTime += Date.now() - this.pausedAt;
      this.pausedAt = undefined;
    }

    const remaining = this._timeRemaining();
    if (remaining > 0) {
      this.startTimeout(remaining);
    }

    // Ejecutar callback onResume si existe
    if (config.onResume) {
      config.onResume();
    }

    this._onResume$.next();
  }

  /**
   * Resetea el timeout (vuelve a empezar)
   */
  resetTimeout(): void {
    this.clearTimeout();
    this.pausedTime = 0;
    this.pausedAt = undefined;

    const config = this.config();
    if (config.timeout && config.timeout > 0) {
      this._timeRemaining.set(config.timeout);
      this.startTimeout(config.timeout);
    }
  }

  /**
   * Marca el toast como mostrado
   * @internal
   */
  markAsShown(): void {
    this._state.set('visible');
    this._afterShown$.next();
    this._afterShown$.complete();

    const config = this.config();
    // Ejecutar callback onShown si existe
    if (config.onShown) {
      config.onShown();
    }

    // Iniciar timeout si está configurado
    if (config.timeout && config.timeout > 0) {
      this.startTimeout(config.timeout);
    }
  }

  /**
   * Marca el toast como oculto
   * @internal
   */
  markAsHidden(): void {
    this._state.set('hidden');
  }

  /**
   * Alterna el estado expandido
   */
  toggleExpanded(): void {
    const config = this.config();
    if (!config.expandable) {
      return;
    }
    this._isExpanded.set(!this._isExpanded());
  }

  /**
   * Obtiene el estado completo del toast
   */
  getState(): ToastState {
    return {
      id: this.id,
      type: this.type,
      config: this.config(),
      state: this._state(),
      timeRemaining: this._timeRemaining(),
      isPaused: this._isPaused(),
      createdAt: this.createdAt,
    };
  }

  /**
   * Inicia el temporizador de timeout
   * @private
   */
  private startTimeout(duration: number): void {
    this.clearTimeout();

    // Actualizar inmediatamente el tiempo restante
    this._timeRemaining.set(duration);

    const startTime = Date.now();
    const updateInterval = 16; // ~60fps para animación suave

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, duration - elapsed);

      this._timeRemaining.set(remaining);

      if (remaining === 0) {
        this.onTimeoutExpired();
      } else {
        // Actualizar cada 16ms (~60fps) para animación muy suave
        this.timeoutId = setTimeout(tick, updateInterval);
      }
    };

    tick();
  }

  /**
   * Limpia el temporizador de timeout
   * @private
   */
  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  /**
   * Callback cuando expira el timeout
   * @private
   */
  private onTimeoutExpired(): void {
    // Ejecutar callback onTimeout si existe
    const config = this.config();
    if (config.onTimeout) {
      config.onTimeout();
    }

    this.close();
  }

  /**
   * Limpia recursos y previene memory leaks
   * @internal
   */
  dispose(): void {
    // Limpiar timeout activo
    this.clearTimeout();
    
    // Completar todos los observables
    this._afterClosed$.complete();
    this._afterShown$.complete();
    this._onPause$.complete();
    this._onResume$.complete();
    
    // Limpiar referencias para GC
    this.pausedAt = undefined;
    this.pausedTime = 0;
  }
}
