import { TemplateRef, Type, InjectionToken } from '@angular/core';
import { NUIColor, NUISize, NUIVariant } from '../../../configs/common/types';
import { Observable } from 'rxjs';

/**
 * Token de inyección para la configuración global del sidebar-panel
 */
export const SIDEBAR_PANEL_CONFIG = new InjectionToken<SidebarPanelConfig>('SIDEBAR_PANEL_CONFIG');

/**
 * Delay en milisegundos para activar el focus trap
 * Permite que el DOM se estabilice antes de configurar el foco
 * @constant
 */
export const FOCUS_TRAP_DELAY = 100;

/**
 * Posición del sidebar-panel en la pantalla
 */
export type SidebarPanelPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Tamaño predefinido del sidebar-panel
 */
export type SidebarPanelSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Estrategia de scroll del body cuando el panel está abierto
 */
export type ScrollStrategy = 'block' | 'reposition' | 'close';

/**
 * Mapa de tamaños a dimensiones
 */
export const SIDEBAR_PANEL_SIZE_MAP: Record<SidebarPanelSize, string> = {
  xs: '300px',
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  full: '100%',
};

/**
 * Modelo de una pestaña minimizada
 */
export interface MinimizedTab {
  id: string;
  title: string;
  position: SidebarPanelPosition;
  restoreCallback: () => void;
}

/**
 * Datos que se pueden pasar al componente dinámico
 */
export interface SidebarPanelData {
  [key: string]: any;
}

/**
 * Configuración completa del sidebar-panel
 */
export interface SidebarPanelConfig<D = any> {
  /**
   * Posición del panel en la pantalla
   * @default 'right'
   */
  position?: SidebarPanelPosition;

  /**
   * Tamaño predefinido del panel
   * @default 'md'
   */
  size?: SidebarPanelSize;

  /**
   * Ancho custom del panel (sobrescribe size)
   * Solo aplica para position 'left' o 'right'
   */
  width?: string;

  /**
   * Alto custom del panel (sobrescribe size)
   * Solo aplica para position 'top' o 'bottom'
   */
  height?: string;

  /**
   * Ancho máximo del panel
   * Útil para evitar panels demasiado anchos en pantallas grandes
   */
  maxWidth?: string;

  /**
   * Alto máximo del panel
   * Útil para evitar panels demasiado altos
   */
  maxHeight?: string;

  /**
   * Datos que se pasarán al componente dinámico
   */
  data?: D;

  /**
   * ID único del panel (útil para controlar múltiples panels)
   */
  id?: string;

  /**
   * Título del panel (se muestra en el header)
   */
  title?: string;

  /**
   * Si se muestra el header
   * @default true
   */
  showHeader?: boolean;

  /**
   * Si se muestra el botón de cerrar en el header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Template custom para el header
   * Reemplaza completamente el header por defecto
   */
  headerTemplate?: TemplateRef<any>;

  /**
   * Template custom para el footer
   */
  footerTemplate?: TemplateRef<any>;

  /**
   * Si se muestra el backdrop (fondo oscuro)
   * @default true
   */
  hasBackdrop?: boolean;

  /**
   * Clase(s) CSS para el backdrop
   */
  backdropClass?: string | string[];

  /**
   * Si se cierra al hacer click en el backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Si se cierra al presionar Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Si se cierra automáticamente al cambiar de ruta
   * @default false
   */
  closeOnRouteChange?: boolean;

  /**
   * Función que se ejecuta antes de cerrar
   * Si retorna false o Promise<false>, previene el cierre
   * Útil para confirmar si hay cambios sin guardar
   */
  preventClose?: () => boolean | Promise<boolean>;

  /**
   * Auto-focus al abrir
   * - true: Enfoca el primer elemento enfocable
   * - false: No hace auto-focus
   * - string: Selector CSS del elemento a enfocar
   * @default true
   */
  autoFocus?: boolean | string;

  /**
   * Si el panel ocupa toda la pantalla en móvil
   * @default false
   */
  mobileFullScreen?: boolean;

  /**
   * Breakpoint (en px) para cambiar a fullscreen en móvil
   * Solo aplica si mobileFullScreen es true
   * @default 768
   */
  breakpoint?: number;

  /**
   * Clase(s) CSS adicionales para el panel
   */
  panelClass?: string | string[];

  /**
   * Estrategia de scroll del body
   * - 'block': Bloquea el scroll del body
   * - 'reposition': Reposiciona el panel al hacer scroll
   * - 'close': Cierra el panel al hacer scroll
   * @default 'block'
   */
  scrollStrategy?: ScrollStrategy;

  /**
   * Label ARIA para accesibilidad
   */
  ariaLabel?: string;

  /**
   * ID del elemento que describe el panel (para aria-describedby)
   */
  ariaDescribedBy?: string;

  /**
   * Duración de la animación de entrada/salida (en ms)
   * @default 300
   */
  animationDuration?: number;

  /**
   * Si se minimiza el panel en lugar de cerrarlo
   * @default false
   */
  minimizable?: boolean;

  /**
   * Z-index base del panel
   * @default 1000
   */
  zIndex?: number;

  /**
   * Si se permite tener múltiples panels abiertos simultáneamente
   * Si es false, cierra el anterior al abrir uno nuevo
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Si el componente se carga de forma lazy (solo al abrir)
   * @default true
   */
  lazyLoad?: boolean;

  /**
   * Botones personalizados para el footer
   * Permite pasar acciones programáticamente al abrir el panel
   * Similar al sistema de customButtons de Modal
   * Tiene precedencia sobre otros métodos de footer
   */
  customButtons?: SidebarPanelCustomButton[];
}

/**
 * Configuración por defecto del sidebar-panel
 */
export const DEFAULT_SIDEBAR_PANEL_CONFIG: Required<
  Omit<
    SidebarPanelConfig,
    | 'data'
    | 'id'
    | 'headerTemplate'
    | 'footerTemplate'
    | 'preventClose'
    | 'ariaDescribedBy'
    | 'title'
    | 'width'
    | 'height'
    | 'maxWidth'
    | 'maxHeight'
    | 'backdropClass'
    | 'panelClass'
    | 'customButtons'
  >
> = {
  position: 'right',
  size: 'md',
  showHeader: true,
  showCloseButton: true,
  hasBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  closeOnRouteChange: false,
  autoFocus: true,
  mobileFullScreen: false,
  breakpoint: 768,
  scrollStrategy: 'block',
  ariaLabel: 'Slide Panel',
  animationDuration: 225, // Matching Material-UI Drawer (225ms entrada, 195ms salida)
  minimizable: false,
  zIndex: 1000,
  allowMultiple: false,
  lazyLoad: true,
};

/**
 * Eventos del sidebar-panel
 */
export interface SidebarPanelEvents {
  /**
   * Se emite después de que el panel se ha abierto completamente
   */
  afterOpened: Observable<void>;

  /**
   * Se emite después de que el panel se ha cerrado completamente
   * Incluye el resultado pasado a close()
   */
  afterClosed: Observable<any>;

  /**
   * Se emite cuando se hace click en el backdrop
   */
  backdropClick: Observable<MouseEvent>;

  /**
   * Se emite en cada keydown dentro del panel
   */
  keydownEvents: Observable<KeyboardEvent>;

  /**
   * Se emite cuando se intenta cerrar el panel pero preventClose lo impide
   */
  closePrevented: Observable<void>;
}

/**
 * Estado del sidebar-panel
 */
export type SidebarPanelState = 'opening' | 'open' | 'closing' | 'closed' | 'minimized';

/**
 * Datos del panel en el stack
 */
export interface SidebarPanelStackItem {
  id: string;
  config: SidebarPanelConfig;
  componentType: Type<any>;
  state: SidebarPanelState;
  zIndex: number;
  createdAt: Date;
  panelRef?: any; // Referencia al SidebarPanelRef (any para evitar dependencia circular)
}

/**
 * Representa una acción individual del footer
 */
export interface SidebarPanelAction {
  /**
   * Etiqueta visible del botón
   */
  label: string;

  /**
   * Icono opcional (clase de Remix Icons)
   * @example 'ri-save-line', 'ri-close-line'
   */
  icon?: string;

  /**
   * Tipo de botón que determina el estilo visual
   * @default 'secondary'
   */
  color?: NUIColor;

  /**
   * Variante del botón que determina el estilo de fondo
   * @default 'solid'
   */
  variant?: NUIVariant;

  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: NUISize;

  /**
   * Función que se ejecuta al hacer click
   */
  handler: () => void | Promise<void>;

  /**
   * Si el botón está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Si se debe mostrar un loading spinner
   * @default false
   */
  loading?: boolean;

  /**
   * Clases CSS adicionales
   */
  class?: string;
}

/**
 * Representa un botón personalizado del footer cuando se pasa desde la configuración
 * Similar a SidebarPanelAction pero con callback que recibe la referencia del panel
 */
export interface SidebarPanelCustomButton {
  /**
   * Texto visible del botón
   */
  text: string;

  /**
   * Icono opcional (clase de Remix Icons)
   * @example 'ri-save-line', 'ri-close-line'
   */
  icon?: string;

  /**
   * Tipo de botón que determina el estilo visual
   * @default 'secondary'
   */
  color?: NUIColor;

  /**
   * Variante del botón que determina el estilo de fondo
   * @default 'solid'
   */
  variant?: NUIVariant;

  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: NUISize;

  /**
   * Función que se ejecuta al hacer click
   * Recibe la referencia del panel para poder cerrarlo o actualizarlo
   */
  callback: (panelRef: any) => void | Promise<void>;

  /**
   * Si el botón está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Si se debe mostrar un loading spinner
   * @default false
   */
  loading?: boolean;

  /**
   * Clases CSS adicionales
   */
  class?: string;
}

// ===== UTILITY TYPES =====

/**
 * Tipo utilitario para configuración con campos requeridos específicos
 *
 * Útil para escenarios donde se necesitan ciertos campos obligatorios
 * más allá de la configuración base.
 *
 * @template K - Claves que deben ser requeridas
 *
 * @example
 * ```typescript
 * // Configuración que requiere título y datos
 * const config: RequiredSidebarPanelConfig<'title' | 'data'> = {
 *   title: 'Mi Panel',
 *   data: { userId: 123 }
 * };
 * ```
 */
export type RequiredSidebarPanelConfig<K extends keyof SidebarPanelConfig = never> =
  SidebarPanelConfig & Required<Pick<SidebarPanelConfig, K>>;

/**
 * Tipo utilitario para configuración completamente resuelta con valores por defecto
 *
 * Representa la configuración después de aplicar todos los valores por defecto.
 * Todos los campos opcionales están presentes con sus valores finales.
 *
 * @example
 * ```typescript
 * function processConfig(config: ResolvedSidebarPanelConfig): void {
 *   // Todos los campos están garantizados como definidos (excepto los explícitamente opcionales)
 *   console.log(config.position); // Siempre existe: 'left' | 'right' | 'top' | 'bottom'
 *   console.log(config.size); // Siempre existe: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * }
 * ```
 */
export type ResolvedSidebarPanelConfig<D = any> = Required<
  Omit<
    SidebarPanelConfig<D>,
    // Campos que legítimamente pueden ser undefined incluso después de defaults
    | 'data'
    | 'id'
    | 'title'
    | 'headerTemplate'
    | 'footerTemplate'
    | 'preventClose'
    | 'ariaDescribedBy'
    | 'width'
    | 'height'
    | 'maxWidth'
    | 'maxHeight'
    | 'backdropClass'
    | 'panelClass'
  >
> &
  Pick<
    SidebarPanelConfig<D>,
    | 'data'
    | 'id'
    | 'title'
    | 'headerTemplate'
    | 'footerTemplate'
    | 'preventClose'
    | 'ariaDescribedBy'
    | 'width'
    | 'height'
    | 'maxWidth'
    | 'maxHeight'
    | 'backdropClass'
    | 'panelClass'
  >;
