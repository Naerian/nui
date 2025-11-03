import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  signal,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastRef } from './toast-ref';
import { ToastConfig, ToastType, ToastGlobalConfig, ToastPosition } from './models/toast.model';
import { NUI_CONFIG } from '../../configs/nui.config';

let toastIdCounter = 0;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private document = inject(DOCUMENT);
  private nuiConfig = inject(NUI_CONFIG, { optional: true });

  // Mapa de contenedores por posición (uno por posición)
  private containers = new Map<ToastPosition, ComponentRef<ToastContainerComponent>>();

  // Signal con los toasts activos
  private readonly _activeToasts = signal<ToastRef[]>([]);

  /**
   * Signal con los toasts activos
   */
  readonly activeToasts: Signal<ToastRef[]> = this._activeToasts.asReadonly();

  /**
   * Computed: número de toasts activos
   */
  readonly activeCount = computed(() => this._activeToasts().length);

  /**
   * Computed: hay toasts de error
   */
  readonly hasErrors = computed(() =>
    this._activeToasts().some(t => t.type === 'danger')
  );

  /**
   * Computed: hay toasts de advertencia
   */
  readonly hasWarnings = computed(() =>
    this._activeToasts().some(t => t.type === 'warning')
  );

  // Configuración global
  private readonly globalConfig: ToastGlobalConfig;

  // Cola de toasts pendientes
  private toastQueue: Array<{ type: ToastType; message: string; config?: ToastConfig }> = [];

  // Mapa para detectar duplicados
  private toastMap = new Map<string, ToastRef>();

  constructor() {
    // Obtener configuración global desde NUI_CONFIG
    this.globalConfig = this.getGlobalConfig();

    // Detectar cuando la ventana pierde el foco
    if (this.globalConfig.pauseOnFocusLoss) {
      this.document.addEventListener('visibilitychange', () => {
        if (this.document.hidden) {
          this._activeToasts().forEach(toast => toast.pause());
        } else {
          this._activeToasts().forEach(toast => toast.resume());
        }
      });
    }
  }

  // ===== MÉTODOS PRINCIPALES =====

  /**
   * Toast de éxito
   */
  success(message: string, config?: ToastConfig): ToastRef {
    return this.show('success', message, config);
  }

  /**
   * Toast de error
   */
  error(message: string, config?: ToastConfig): ToastRef {
    return this.show('danger', message, config);
  }

  /**
   * Toast de advertencia
   */
  warning(message: string, config?: ToastConfig): ToastRef {
    return this.show('warning', message, config);
  }

  /**
   * Toast informativo
   */
  info(message: string, config?: ToastConfig): ToastRef {
    return this.show('info', message, config);
  }

  /**
   * Toast genérico/personalizado
   */
  custom(message: string, config?: ToastConfig): ToastRef {
    return this.show('secondary', message, config);
  }

  /**
   * Toast de carga
   */
  loading(message: string, config?: ToastConfig): ToastRef {
    return this.show('info', message, {
      ...config,
      icon: this.globalConfig.icons.loading || 'ri-loader-4-line',
      timeout: 0,
      closeButton: false,
      progressBar: false,
    });
  }

  /**
   * Toast de promesa (loading → success/error automático)
   */
  async promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((result: T) => string);
      error: string | ((error: any) => string);
    },
    config?: ToastConfig
  ): Promise<T> {
    const loadingToast = this.loading(messages.loading, config);

    try {
      const result = await promise;
      const successMessage =
        typeof messages.success === 'function' ? messages.success(result) : messages.success;

      this.update(loadingToast.id, {
        type: 'success',
        message: successMessage,
        icon: true,
        timeout: config?.timeout ?? this.globalConfig.timeout,
        closeButton: true,
        progressBar: config?.progressBar ?? this.globalConfig.progressBar,
      });

      return result;
    } catch (err) {
      const errorMessage =
        typeof messages.error === 'function' ? messages.error(err) : messages.error;

      this.update(loadingToast.id, {
        type: 'danger',
        message: errorMessage,
        icon: true,
        timeout: config?.timeout ?? this.globalConfig.timeout,
        closeButton: true,
        progressBar: config?.progressBar ?? this.globalConfig.progressBar,
      });

      throw err;
    }
  }

  // ===== GESTIÓN DE TOASTS =====

  /**
   * Muestra un toast con tipo específico
   */
  private show(type: ToastType, message: string, config?: ToastConfig): ToastRef {
    const mergedConfig = this.mergeConfig(type, message, config);

    // Verificar duplicados
    if (this.globalConfig.preventDuplicates && this.isDuplicate(mergedConfig)) {
      const existing = this.findDuplicate(mergedConfig);
      if (existing) {
        existing.resetTimeout();
        return existing;
      }
    }

    // Determinar la posición
    const position = mergedConfig.position || this.globalConfig.position;

    // 1. Verificar límite GLOBAL primero
    if (this._activeToasts().length >= this.globalConfig.maxToasts) {
      return this.handleMaxToasts(type, message, config);
    }

    // 2. Verificar límite por posición específica
    const currentCountInPosition = this._activeToasts().filter(
      t => (t.config.position || this.globalConfig.position) === position
    ).length;
    
    const maxPerPosition = this.globalConfig.maxToastsPerPosition || this.globalConfig.maxToasts;
    if (currentCountInPosition >= maxPerPosition) {
      // Eliminar el toast más antiguo de esa posición
      const oldestInPosition = this._activeToasts()
        .filter(t => (t.config.position || this.globalConfig.position) === position)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
      
      if (oldestInPosition) {
        oldestInPosition.close();
      }
    }

    // Crear el toast
    return this.createToast(type, mergedConfig);
  }

  /**
   * Actualiza un toast existente
   */
  update(id: string, options: Partial<ToastConfig>): void {
    const toast = this.get(id);
    if (toast) {
      toast.update(options);
    }
  }

  /**
   * Cierra un toast específico
   */
  close(id: string): void {
    const toast = this.get(id);
    if (toast) {
      toast.close();
    }
  }

  /**
   * Cierra todos los toasts
   */
  closeAll(): void {
    this._activeToasts().forEach(toast => toast.close());
  }

  /**
   * Cierra toasts de un grupo específico
   */
  closeGroup(group: string): void {
    this.getGroup(group).forEach(toast => toast.close());
  }

  /**
   * Cierra toasts por tipo
   */
  closeByType(type: ToastType): void {
    this._activeToasts()
      .filter(toast => toast.type === type)
      .forEach(toast => toast.close());
  }

  /**
   * Obtiene un toast por ID
   */
  get(id: string): ToastRef | undefined {
    return this._activeToasts().find(toast => toast.id === id);
  }

  /**
   * Obtiene todos los toasts activos
   */
  getActive(): ToastRef[] {
    return this._activeToasts();
  }

  /**
   * Obtiene toasts de un grupo
   */
  getGroup(group: string): ToastRef[] {
    return this._activeToasts().filter(toast => toast.config.group === group);
  }

  /**
   * Limpia toasts persistentes del localStorage
   */
  clearPersistent(): void {
    if (typeof localStorage !== 'undefined') {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('nui-toast-')) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Crea un nuevo toast
   */
  private createToast(type: ToastType, config: ToastConfig): ToastRef {
    const id = config.id || `toast-${++toastIdCounter}`;
    const toastRef = new ToastRef(id, type, config);

    // Agregar a la lista de activos
    const currentToasts = this._activeToasts();
    const newToasts =
      this.globalConfig.stackDirection === 'prepend'
        ? [toastRef, ...currentToasts]
        : [...currentToasts, toastRef];

    this._activeToasts.set(newToasts);

    // Agregar al mapa
    const key = this.getToastKey(config);
    this.toastMap.set(key, toastRef);

    // Determinar la posición (usar la específica del config o la global)
    const position = config.position || this.globalConfig.position;

    // Asegurar que el contenedor exista para esta posición
    const containerRef = this.ensureContainer(position);

    // Agregar al contenedor
    containerRef.instance.addToast(toastRef);

    // Suscribirse al cierre
    toastRef.afterClosed().subscribe(() => {
      this.removeToast(toastRef);
      this.toastMap.delete(key);
    });

    // Persistir si está configurado
    if (config.persistent && config.persistentId) {
      this.persistToast(toastRef);
    }

    return toastRef;
  }

  /**
   * Elimina un toast de la lista de activos
   */
  private removeToast(toastRef: ToastRef): void {
    const currentToasts = this._activeToasts();
    const filteredToasts = currentToasts.filter(t => t.id !== toastRef.id);
    this._activeToasts.set(filteredToasts);

    // Procesar cola si hay pendientes
    if (this.toastQueue.length > 0) {
      const queued = this.toastQueue.shift();
      if (queued) {
        this.show(queued.type, queued.message, queued.config);
      }
    }
  }

  /**
   * Maneja el caso cuando se alcanza el máximo de toasts
   */
  private handleMaxToasts(type: ToastType, message: string, config?: ToastConfig): ToastRef {
    const behavior = this.globalConfig.stackingBehavior;

    switch (behavior) {
      case 'queue':
        this.toastQueue.push({ type, message, config });
        // Retornar referencia dummy
        return new ToastRef('queued', type, this.mergeConfig(type, message, config));

      case 'replace-oldest':
        const oldest = this._activeToasts()[0];
        if (oldest) {
          oldest.close();
        }
        return this.createToast(type, this.mergeConfig(type, message, config));

      case 'replace-lowest-priority':
        const sorted = [...this._activeToasts()].sort(
          (a, b) => (a.config.priority || 0) - (b.config.priority || 0)
        );
        const lowest = sorted[0];
        if (lowest) {
          lowest.close();
        }
        return this.createToast(type, this.mergeConfig(type, message, config));

      case 'ignore':
      default:
        // No hacer nada, retornar referencia dummy
        return new ToastRef('ignored', type, this.mergeConfig(type, message, config));
    }
  }

  /**
   * Combina la configuración global con la específica del toast
   */
  private mergeConfig(type: ToastType, message: string, config?: ToastConfig): ToastConfig {
    const defaultConfig: ToastConfig = {
      type,
      message,
      timeout: this.globalConfig.timeout,
      progressBar: this.globalConfig.progressBar,
      closeButton: this.globalConfig.closeButton,
      closeOnTouch: this.globalConfig.closeOnTouch,
      pauseOnHover: this.globalConfig.pauseOnHover,
      pauseOnFocusLoss: this.globalConfig.pauseOnFocusLoss,
      icon: this.globalConfig.icon,
      iconPosition: this.globalConfig.iconPosition,
      animationIn: this.globalConfig.animationIn,
      animationOut: this.globalConfig.animationOut,
      animationDuration: this.globalConfig.animationDuration,
      swipeToDismiss: this.globalConfig.swipeToDismiss,
      swipeThreshold: this.globalConfig.swipeThreshold,
      ariaRole: this.getAriaRole(type),
      ariaLive: this.getAriaLive(type),
      announceToScreenReader: this.globalConfig.announceToScreenReader,
      priority: 0,
    };

    return { ...defaultConfig, ...config };
  }

  /**
   * Obtiene el role ARIA según el tipo
   */
  private getAriaRole(type: ToastType): 'status' | 'alert' | 'log' {
    return type === 'danger' || type === 'warning' ? 'alert' : 'status';
  }

  /**
   * Obtiene el aria-live según el tipo
   */
  private getAriaLive(type: ToastType): 'polite' | 'assertive' | 'off' {
    return type === 'danger' ? 'assertive' : 'polite';
  }

  /**
   * Verifica si un toast es duplicado
   */
  private isDuplicate(config: ToastConfig): boolean {
    const key = this.getToastKey(config);
    return this.toastMap.has(key);
  }

  /**
   * Encuentra un toast duplicado
   */
  private findDuplicate(config: ToastConfig): ToastRef | undefined {
    const key = this.getToastKey(config);
    return this.toastMap.get(key);
  }

  /**
   * Genera una clave única para detectar duplicados
   */
  private getToastKey(config: ToastConfig): string {
    return `${config.type}-${config.message}-${config.title || ''}`;
  }

  /**
   * Asegura que el contenedor exista para una posición específica
   */
  private ensureContainer(position: ToastPosition): ComponentRef<ToastContainerComponent> {
    // Verificar si ya existe un contenedor para esta posición
    let containerRef = this.containers.get(position);
    
    if (containerRef) {
      return containerRef;
    }

    // Crear el contenedor
    containerRef = createComponent(ToastContainerComponent, {
      environmentInjector: this.injector,
    });

    // Adjuntar a la aplicación
    this.appRef.attachView(containerRef.hostView);

    // Agregar al DOM
    const domElem = (containerRef.hostView as any).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    // Configurar posición
    containerRef.instance.updatePosition(position);
    
    // Guardar en el mapa
    this.containers.set(position, containerRef);
    
    return containerRef;
  }

  /**
   * Persiste un toast en localStorage
   */
  private persistToast(toastRef: ToastRef): void {
    if (typeof localStorage === 'undefined' || !toastRef.config.persistentId) {
      return;
    }

    const key = `nui-toast-${toastRef.config.persistentId}`;
    const state = toastRef.getState();

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error('Error persisting toast:', err);
    }
  }

  /**
   * Obtiene la configuración global
   */
  private getGlobalConfig(): ToastGlobalConfig {
    // Configuración por defecto
    const defaultConfig: ToastGlobalConfig = {
      timeout: 5000,
      toastClass: [],
      position: 'top-right',
      preventDuplicates: true,
      progressBar: true,
      closeOnTouch: true,
      closeButton: true,
      maxToasts: 5,
      maxToastsPerPosition: 3,
      animationIn: 'slide',
      animationOut: 'fade',
      animationDuration: 300,
      templateMode: 'replace',
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      stackingBehavior: 'queue',
      stackDirection: 'append',
      icon: true,
      iconPosition: 'left',
      announceToScreenReader: true,
      ariaRole: 'status',
      ariaLive: 'polite',
      sound: false,
      expandable: false,
      persistent: false,
      swipeToDismiss: true,
      swipeThreshold: 100,
      icons: {
        success: 'ri-checkbox-circle-line',
        danger: 'ri-error-warning-line',
        warning: 'ri-alert-line',
        info: 'ri-information-line',
        loading: 'ri-loader-4-line',
      },
    };

    // Mergear con configuración del usuario desde NUI_CONFIG
    return {
      ...defaultConfig,
      ...(this.nuiConfig?.toast || {}),
    };
  }
}
