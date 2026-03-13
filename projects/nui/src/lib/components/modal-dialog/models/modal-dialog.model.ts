import { InjectionToken, TemplateRef } from '@angular/core';
import { NUIColor, NUISize, NUIVariant } from '../../../configs/common/types';
import { ButtonLoadingPosition, ButtonWidth } from '../../button';

// ─────────────────────────────────────────────────────────────
// Token de inyección para la configuración global del modal
// ─────────────────────────────────────────────────────────────

/**
 * Token de inyección para que el shell y los componentes dinámicos
 * accedan a la configuración del modal.
 */
export const MODAL_DIALOG_CONFIG = new InjectionToken<ModalDialogConfig>(
  'MODAL_DIALOG_CONFIG'
);

/**
 * Delay en ms para activar el focus trap después del paint inicial
 */
export const MODAL_FOCUS_TRAP_DELAY = 100;

// ─────────────────────────────────────────────────────────────
// Tipos de estado y ciclo de vida
// ─────────────────────────────────────────────────────────────

/**
 * Estados posibles de un modal en el stack.
 * - opening   → Animación de entrada en curso
 * - open      → Visible e interactivo
 * - minimized → Oculto, representado como chip en el dock inferior
 * - closing   → Animación de salida en curso
 * - closed    → Destruido y eliminado del stack
 */
export type ModalDialogState =
  | 'opening'
  | 'open'
  | 'minimized'
  | 'closing'
  | 'closed';

/**
 * Semántica visual del modal (aplica colores y clases BEM correspondientes)
 */
export type ModalDialogType =
  | 'confirm'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
  | 'verification'
  | null;

/**
 * Estrategia de scroll del body cuando hay un modal abierto
 */
export type ModalScrollStrategy = 'block' | 'reposition';

// ─────────────────────────────────────────────────────────────
// Interfaces de resultado y sub-opciones
// ─────────────────────────────────────────────────────────────

/**
 * Resultado emitido por `ModalDialogRef.afterClosed()`
 */
export interface ModalDialogResult<T = any> {
  /** true si el usuario confirmó la acción */
  confirmed: boolean;
  /** Datos opcionales devueltos por el componente dinámico o formulario */
  data?: T | null;
  /** Causa del cierre */
  reason?: 'confirmed' | 'cancelled' | 'timeout' | 'backdrop' | 'escape';
}

/**
 * Configuración del timeout con cuenta regresiva y barra de progreso
 */
export interface ModalDialogTimeoutOptions {
  /** Duración total en milisegundos */
  duration: number;
  /** Mostrar barra de progreso visual. Default: true */
  showProgressBar?: boolean;
  /** Pausar la cuenta regresiva al hacer hover. Default: true */
  pauseOnHover?: boolean;
  /** Acción al expirar el timeout. Default: 'cancel' */
  timeoutAction?: 'confirm' | 'cancel';
  /** Callback que se ejecuta justo antes de la acción de timeout */
  onTimeout?: (action: 'confirm' | 'cancel') => void;
}

/**
 * Configuración de gestos táctiles para dispositivos móviles
 */
export interface ModalDialogGestureOptions {
  enabled: boolean;
  swipeDown?: { enabled: boolean; threshold?: number };
  swipeLeft?: { enabled: boolean; threshold?: number };
  swipeRight?: { enabled: boolean; threshold?: number };
  /** Vibración corta en dispositivos compatibles */
  hapticFeedback?: boolean;
}

/**
 * Barra de color semántico en uno de los bordes del modal
 */
export interface ModalDialogStatusBar {
  position: 'top' | 'left' | 'bottom' | 'right' | 'none';
  /** Grosor en px. Default: 4 */
  thickness?: number;
  /** Color CSS custom (override del color por tipo) */
  color?: string;
}

// ─────────────────────────────────────────────────────────────
// Acciones de footer (registradas via ModalDialogActionsService)
// ─────────────────────────────────────────────────────────────

/**
 * Acción de footer registrada por un componente dinámico
 * cargado dentro del modal.
 *
 * El campo `disabled` y `loading` aceptan tanto un valor
 * booleano estático como una función (getter reactivo) que
 * el shell evalúa en cada ciclo de detección.
 *
 * @example
 * ```typescript
 * actionsService.register([
 *   {
 *     label: 'Guardar',
 *     color: 'primary',
 *     handler: () => this.save(),
 *     disabled: () => this.form.invalid,
 *     loading: () => this.isSaving(),
 *   }
 * ]);
 * ```
 */
export interface ModalDialogAction {
  label: string;
  prefixIcon?: string;
  suffixIcon?: string;
  color?: NUIColor;
  variant?: NUIVariant;
  size?: NUISize;
  handler: () => void | Promise<void>;
  /** Booleano estático o getter reactivo */
  disabled?: boolean | (() => boolean);
  /** Booleano estático o getter reactivo */
  loading?: boolean | (() => boolean);
  loadingPosition?: ButtonLoadingPosition;
  width?: ButtonWidth;
  class?: string;
}

/**
 * Botón custom declarado en la configuración del modal.
 * Tiene máxima prioridad en el footer (sobre las acciones del servicio).
 */
export interface ModalDialogCustomButton {
  text: string;
  color?: NUIColor;
  variant?: NUIVariant;
  size?: NUISize;
  prefixIcon?: string;
  suffixIcon?: string;
  /** Callback que recibe la referencia del modal */
  callback: (modalRef?: any) => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  /** Cerrar el modal automáticamente tras ejecutar el callback. Default: false */
  closeOnClick?: boolean;
  class?: string;
  ariaLabel?: string;
}

// ─────────────────────────────────────────────────────────────
// Stack item y Dock item
// ─────────────────────────────────────────────────────────────

/**
 * Entrada en el stack interno de `ModalDialogService`
 */
export interface ModalDialogStackItem {
  id: string;
  /** ModalDialogRef — tipado como `any` para evitar dependencia circular */
  modalRef: any;
  componentType: any;
  config: ModalDialogConfig;
  state: ModalDialogState;
  zIndex: number;
  createdAt: number;
}

/**
 * Elemento en el dock inferior que representa un modal minimizado
 */
export interface ModalDialogDockItem {
  id: string;
  title: string;
  icon?: string;
  color?: NUIColor;
  restoreCallback: () => void;
}

// ─────────────────────────────────────────────────────────────
// Configuración del modal (ModalDialogConfig)
// ─────────────────────────────────────────────────────────────

/**
 * Propiedades comunes compartidas entre variantes de configuración
 * @internal
 */
interface ModalDialogConfigBase<D = any> {
  // ── Contenido básico ────────────────────────────────────────
  /** Título mostrado en el header del modal */
  title?: string;
  /** Icono Remix Icon en el header (ej: 'ri-alert-line') */
  iconTitle?: string;
  /** Mensaje HTML del body (para modales simples sin componente dinámico) */
  message?: string;
  /** Datos tipados que se inyectan en el componente dinámico via MODAL_DIALOG_DATA */
  data?: D;

  // ── Dimensiones ─────────────────────────────────────────────
  width?: string;
  minWidth?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;

  // ── Semántica visual ────────────────────────────────────────
  modalType?: ModalDialogType;
  /** Color NUI para theming del modal (aplica clase BEM) */
  color?: NUIColor;
  statusBar?: ModalDialogStatusBar;

  // ── Comportamiento ──────────────────────────────────────────
  /** Permite cerrar con ESC o botón X. Default: true */
  canBeClosed?: boolean;
  /** Ocultar el backdrop. Default: true (muestra backdrop) */
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  panelClass?: string | string[];
  /** Cerrar al hacer click en el backdrop. Default: true */
  closeOnBackdropClick?: boolean;
  /** Cerrar al presionar Escape. Default: true */
  closeOnEscape?: boolean;
  /** Cerrar al cambiar de ruta (evita overlays huérfanos). Default: false */
  closeOnRouteChange?: boolean;
  /**
   * Hook de prevención de cierre.
   * Si retorna false | Promise<false>, el cierre se cancela.
   */
  preventClose?: () => boolean | Promise<boolean>;
  /** Auto-focus al primer elemento enfocable. Default: true */
  autoFocus?: boolean;
  /** Duración de las animaciones en ms. Default: 200 */
  animationDuration?: number;
  /** Estrategia de scroll del body. Default: 'block' */
  scrollStrategy?: ModalScrollStrategy;

  // ── Header & Footer ─────────────────────────────────────────
  showHeader?: boolean;
  showCloseButton?: boolean;
  /** Template completamente custom para el header */
  headerTemplate?: TemplateRef<any>;
  /**
   * Template para el footer (baja prioridad).
   * Precedencia: customButtons > ModalDialogFooterDirective > actionsService > footerTemplate
   */
  footerTemplate?: TemplateRef<any>;
  hideDefaultHeader?: boolean;
  hideDefaultFooter?: boolean;

  // ── Botones por defecto (usados por ModalDialogSimpleContentComponent) ──
  cancelText?: string;
  confirmText?: string;
  /** Variante por defecto para los botones cancel/confirm */
  buttonsVariant?: NUIVariant;
  /** Tamaño por defecto para los botones cancel/confirm */
  buttonsSize?: NUISize;

  /**
   * Botones custom con callbacks (máxima prioridad en footer).
   * Reemplazan la renderización de cancel/confirm del servicio.
   */
  customButtons?: ModalDialogCustomButton[];
  /** Mostrar también los botones por defecto junto a los custom. Default: false */
  showDefaultButtons?: boolean;

  // ── Loading ─────────────────────────────────────────────────
  isLoading?: boolean;
  loadingLabel?: string;
  loadingSize?: NUISize;

  // ── Timeout ─────────────────────────────────────────────────
  timeout?: ModalDialogTimeoutOptions;

  // ── Gestos táctiles ─────────────────────────────────────────
  gestures?: ModalDialogGestureOptions;

  // ── Verificación ────────────────────────────────────────────
  /** Texto que el usuario debe escribir para habilitar el botón de confirmación */
  verificationText?: string;
  verificationLabel?: string;
  verificationPlaceholder?: string;
  verificationErrorMessage?: string;
  /** Verificación distingue mayúsculas/minúsculas. Default: false */
  caseSensitive?: boolean;

  // ── Contenido alternativo al componente dinámico ─────────────
  /** HTML directo para el body (alternativa a componente dinámico) */
  htmlContent?: string;
  /**
   * TemplateRef para el body con soporte de contexto dinámico
   * (alternativa a componente dinámico)
   */
  bodyTemplate?: TemplateRef<any>;
  templateContext?: any;
}

/** Configuración de modal NO minimizable (id es opcional) */
type ModalDialogConfigNonMinimizable<D = any> = ModalDialogConfigBase<D> & {
  minimizable?: false;
  id?: string;
};

/**
 * Configuración de modal minimizable.
 * El campo `id` es OBLIGATORIO para garantizar el singleton-by-ID.
 */
type ModalDialogConfigMinimizable<D = any> = ModalDialogConfigBase<D> & {
  minimizable: true;
  id: string;
};

/**
 * Tipo de configuración del modal; unión discriminada por `minimizable`.
 *
 * **Nota:** Al ser CDK-puro (sin Material), esta interfaz es completamente
 * independiente de `MatDialogConfig`.
 *
 * @example
 * ```typescript
 * // Modal simple (no minimizable)
 * const config: ModalDialogConfig = { title: 'Confirmar', message: '...' };
 *
 * // Modal minimizable (id obligatorio)
 * const config: ModalDialogConfig = {
 *   minimizable: true,
 *   id: 'editor-modal',
 *   title: 'Editor',
 * };
 * ```
 */
export type ModalDialogConfig<D = any> =
  | ModalDialogConfigNonMinimizable<D>
  | ModalDialogConfigMinimizable<D>;
