import { TemplateRef } from '@angular/core';
import { NUIColor, NUISize, NUIVariant } from '../../../configs';

export const TOAST_LOADING_CLASS = 'nui-toast--loading';

/**
 * Tipos de toast predefinidos
 */
export type ToastType = NUIColor;

/**
 * Posiciones disponibles para el contenedor
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'top-full' // Ancho completo arriba
  | 'middle-left'
  | 'middle-center' // Como Snackbar de Material
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-full'; // Ancho completo abajo

/**
 * Acción dentro de un toast
 */
export interface ToastAction {
  /**
   * Texto del botón
   */
  label: string;

  /**
   * Función a ejecutar al hacer click
   */
  onClick: () => void | Promise<void>;

  /**
   * Cerrar el toast después de ejecutar
   * @default true
   */
  closeOnClick?: boolean;

  /**
   * Clase CSS adicional para el botón
   */
  class?: string;
}

/**
 * Configuración individual por toast
 * Sobrescribe la configuración global
 */
export interface ToastConfig {
  // ===== CONTENIDO =====
  /**
   * Tipo del toast (afecta color e icono)
   * @default 'custom'
   */
  type?: ToastType;

  /**
   * Título del toast (opcional)
   */
  title?: string;

  /**
   * Mensaje del toast
   */
  message?: string;

  /**
   * Template personalizado para el contenido
   */
  template?: TemplateRef<any>;

  /**
   * Datos para el template
   */
  templateContext?: any;

  /**
   * Contenido HTML (usar con precaución)
   */
  html?: string;

  /**
   * Comportamiento cuando se usa template personalizado
   * - 'replace': Reemplaza todo el contenido (oculta título, mensaje, icono)
   * - 'append': Añade el template después del contenido estándar
   * @default 'replace'
   */
  templateMode?: 'replace' | 'append';

  // ===== VISUAL =====
  /**
   * Icono personalizado
   * - true: Usa el icono por defecto según tipo
   * - false: Sin icono
   * - string: Icono personalizado (clase Remix Icon)
   * @default true
   */
  icon?: boolean | string;

  /**
   * Posición del icono
   */
  iconPosition?: 'left' | 'top';

  /**
   * Clase CSS adicional
   */
  toastClass?: string | string[];

  // ===== ACCIONES =====
  /**
   * Acción principal (ej: "Deshacer")
   */
  action?: ToastAction;

  /**
   * Acciones adicionales (máximo 2 recomendado)
   */
  actions?: ToastAction[];

  // ===== COMPORTAMIENTO =====
  /**
   * Duración antes de cerrarse (ms)
   * 0 = no se cierra automáticamente
   */
  timeout?: number;

  /**
   * Mostrar barra de progreso
   */
  progressBar?: boolean;

  /**
   * Mostrar botón de cerrar
   */
  closeButton?: boolean;

  /**
   * Pausar timeout al hacer hover
   */
  pauseOnHover?: boolean;

  /**
   * Pausar timeout al perder foco
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Cerrar al hacer click en el toast
   */
  closeOnTouch?: boolean;

  /**
   * Permitir arrastrar para cerrar
   */
  swipeToDismiss?: boolean;

  /**
   * Umbral de arrastre (px)
   */
  swipeThreshold?: number;

  // ===== ANIMACIONES =====
  /**
   * Animación de entrada
   */
  animationIn?: 'slide' | 'fade' | 'bounce' | 'zoom' | 'flip';

  /**
   * Animación de salida
   */
  animationOut?: 'slide' | 'fade' | 'shrink' | 'zoom';

  /**
   * Duración de animaciones (ms)
   */
  animationDuration?: number;

  // ===== AGRUPACIÓN Y PRIORIDAD =====
  /**
   * Grupo del toast (para gestionar relacionados)
   * @example 'notifications', 'errors', 'file-operations'
   */
  group?: string;

  /**
   * Prioridad (mayor = más importante)
   * @default 0
   */
  priority?: number;

  /**
   * ID único del toast
   * Útil para actualizar o cerrar específicamente
   */
  id?: string;

  // ===== AVANZADO =====
  /**
   * Posición específica para este toast
   * Sobrescribe la posición global
   */
  position?: ToastPosition;

  /**
   * Persistir entre recargas
   */
  persistent?: boolean;

  /**
   * ID único para persistencia
   */
  persistentId?: string;

  /**
   * Reproducir sonido
   * - true: Sonido por defecto según tipo
   * - false: Sin sonido
   * - string: URL del sonido personalizado
   */
  sound?: boolean | string;

  /**
   * Permitir expandir
   */
  expandable?: boolean;

  /**
   * Contenido expandido
   */
  expandedContent?: string | TemplateRef<any>;

  /**
   * Mostrar solo si hay conexión
   * Se encola si no hay conexión
   */
  requireOnline?: boolean;

  // ===== ACCESIBILIDAD =====
  /**
   * Role ARIA
   */
  ariaRole?: 'status' | 'alert' | 'log';

  /**
   * Aria-live
   */
  ariaLive?: 'polite' | 'assertive' | 'off';

  /**
   * Anunciar a screen readers
   */
  announceToScreenReader?: boolean;

  // ===== CALLBACKS =====
  /**
   * Callback cuando se muestra el toast
   */
  onShown?: () => void;

  /**
   * Callback cuando se cierra el toast
   */
  onClosed?: () => void;

  /**
   * Callback cuando se hace click en el toast
   */
  onClick?: () => void;

  /**
   * Callback cuando expira el timeout
   */
  onTimeout?: () => void;

  /**
   * Callback cuando se pausa (hover)
   */
  onPause?: () => void;

  /**
   * Callback cuando se reanuda
   */
  onResume?: () => void;

  // ===== BOTONES DE ACCIÓN =====
  /**
   * Tamaño de los botones de acción
   */
  buttonsSize?: NUISize;

  /**
   * Color de los botones de acción
   */
  buttonsColor?: NUIColor;

  /**
   * Variante de los botones de acción
   */
  buttonsVariant?: NUIVariant;
}

/**
 * Configuración global del sistema de toasts
 */
export interface ToastGlobalConfig {
  // ===== BÁSICAS =====
  /**
   * Duración antes de cerrarse automáticamente (ms)
   * 0 = no se cierra automáticamente
   * @default 5000
   */
  timeout: number;

  /**
   * Clase(s) CSS adicional(es) para el toast
   * @default []
   */
  toastClass: string | string[];

  /**
   * Posición del contenedor de toasts
   * @default 'top-right'
   */
  position: ToastPosition;

  /**
   * Prevenir toasts duplicados
   * @default true
   */
  preventDuplicates: boolean;

  /**
   * Mostrar barra de progreso
   * @default true
   */
  progressBar: boolean;

  /**
   * Cerrar al tocar/hacer click (móvil)
   * @default true
   */
  closeOnTouch: boolean;

  /**
   * Mostrar botón de cerrar
   * @default true
   */
  closeButton: boolean;

  /**
   * Número máximo de toasts visibles simultáneamente (GLOBAL)
   * @default 5
   */
  maxToasts: number;

  /**
   * Número máximo de toasts por posición específica
   * @default 3
   */
  maxToastsPerPosition: number;

  // ===== TEMPLATES =====
  /**
   * Modo de plantilla para el contenido del toast
   * @default 'replace'
   */
  templateMode: 'replace' | 'append';

  // ===== ANIMACIONES =====
  /**
   * Tipo de animación de entrada
   * @default 'slide'
   */
  animationIn: 'slide' | 'fade' | 'bounce' | 'zoom' | 'flip';

  /**
   * Tipo de animación de salida
   * @default 'fade'
   */
  animationOut: 'slide' | 'fade' | 'shrink' | 'zoom';

  /**
   * Duración de las animaciones (ms)
   * @default 300
   */
  animationDuration: number;

  // ===== COMPORTAMIENTO =====
  /**
   * Pausar el timeout al hacer hover
   * @default true
   */
  pauseOnHover: boolean;

  /**
   * Pausar el timeout cuando la ventana pierde el foco
   * @default true
   */
  pauseOnFocusLoss: boolean;

  /**
   * Comportamiento cuando se alcanza maxToasts
   * @default 'queue'
   */
  stackingBehavior:
    | 'queue'
    | 'replace-oldest'
    | 'replace-lowest-priority'
    | 'ignore';

  /**
   * Dirección del stack (nuevos arriba o abajo)
   * @default 'append'
   */
  stackDirection: 'append' | 'prepend';

  // ===== VISUAL =====
  /**
   * Mostrar icono
   * - true: Icono por defecto según tipo
   * - false: Sin icono
   * @default true
   */
  icon: boolean;

  /**
   * Posición del icono
   * @default 'left'
   */
  iconPosition: 'left' | 'top';

  // ===== ACCESIBILIDAD =====
  /**
   * Anunciar el toast a screen readers
   * @default true
   */
  announceToScreenReader: boolean;

  /**
   * Role ARIA por defecto
   * Se sobrescribe según el tipo si no se especifica
   * @default 'status'
   */
  ariaRole: 'status' | 'alert' | 'log';

  /**
   * Aria-live por defecto
   * Se sobrescribe según el tipo si no se especifica
   * @default 'polite'
   */
  ariaLive: 'polite' | 'assertive' | 'off';

  // ===== AVANZADO =====
  /**
   * Reproducir sonido al mostrar
   * @default false
   */
  sound: boolean;

  /**
   * Permitir expandir para ver más contenido
   * @default false
   */
  expandable: boolean;

  /**
   * Persistir entre recargas (localStorage)
   * @default false
   */
  persistent: boolean;

  /**
   * Permitir arrastrar para cerrar
   * @default true en móvil, false en desktop
   */
  swipeToDismiss: boolean;

  /**
   * Umbral de arrastre para cerrar (px)
   * @default 100
   */
  swipeThreshold: number;

  // ===== ÍCONOS POR DEFECTO =====
  /**
   * Íconos predefinidos por tipo
   */
  icons: {
    success: string;
    danger: string;
    warning: string;
    info: string;
    loading?: string;
  };

  // ===== BOTONES DE ACCIÓN =====
  /**
   * Tamaño de los botones de acción
   * @default 'sm'
   */
  buttonsSize?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Color de los botones de acción
   * @default undefined (usa el color del toast)
   */
  buttonsColor?: NUIColor;

  /**
   * Variante de los botones de acción
   * @default 'ghost'
   */
  buttonsVariant?: 'solid' | 'outline' | 'ghost' | 'link';
}

/**
 * Estado interno de un toast
 */
export interface ToastState {
  id: string;
  type: ToastType;
  config: ToastConfig;
  state: 'showing' | 'visible' | 'hiding' | 'hidden';
  timeRemaining: number;
  isPaused: boolean;
  createdAt: Date;
}
