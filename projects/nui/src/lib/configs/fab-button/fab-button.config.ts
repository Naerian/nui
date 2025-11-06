import { TooltipPosition } from '../../components/tooltip';
import { NUIColor, NUISize, NUIVariant } from '../common/types';

/**
 * Dirección en la que se despliegan los items del FAB
 * - up, down, left, right: Para layouts linear, circle, semi-circle
 * - up-left, up-right, down-left, down-right: Para layout quarter-circle
 */
export type FabButtonDirection = 
  | 'up' | 'down' | 'left' | 'right'
  | 'up-left' | 'up-right' | 'down-left' | 'down-right';

/**
 * Tipo de animación para el despliegue de items
 */
export type FabButtonAnimation = 'scale' | 'fade' | 'slide';

/**
 * Tipo de layout para el despliegue de items
 */
export type FabButtonLayoutType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

/**
 * Forma del botón y sus items
 */
export type FabButtonShape = 'circular' | 'rounded' | 'square';

/**
 * Configuración de un item individual del FAB
 */
export interface FabButtonItem {
  /**
   * Identificador único del item
   */
  id?: string;

  /**
   * Icono del item
   */
  icon?: string;

  /**
   * Label del item (se muestra en tooltip o inline)
   */
  label?: string;

  /**
   * Tooltip personalizado (si no se especifica, usa el label)
   */
  tooltip?: string;

  /**
   * Posición del tooltip
   */
  tooltipPosition?: TooltipPosition;

  /**
   * Delay del tooltip en ms
   */
  tooltipDelay?: number;

  /**
   * Color del item (hereda del padre si no se especifica)
   */
  color?: NUIColor;

  /**
   * Tamaño del item (hereda del padre si no se especifica)
   */
  size?: NUISize;

  /**
   * Variante del item (hereda del padre si no se especifica)
   */
  variant?: NUIVariant;

  /**
   * Estado deshabilitado del item
   */
  disabled?: boolean;

  /**
   * Datos adicionales asociados al item
   */
  data?: any;

  /**
   * Clase CSS adicional para el item
   */
  styleClass?: string;

  /**
   * URL para navegación (opcional)
   */
  url?: string;

  /**
   * Target para el enlace (si url está definida)
   */
  target?: string;

  /**
   * Comando a ejecutar al hacer clic
   */
  command?: (event?: any) => void;

  /**
   * Color de fondo personalizado (sobrescribe el color predefinido)
   */
  backgroundColor?: string;

  /**
   * Color del texto/icono personalizado (sobrescribe el color predefinido)
   */
  textColor?: string;
}

/**
 * Configuración global del componente FAB Button
 */
export interface FabButtonConfig {
  /**
   * Dirección por defecto del despliegue
   */
  direction?: FabButtonDirection;

  /**
   * Tipo de animación por defecto
   */
  animation?: FabButtonAnimation;

  /**
   * Tipo de layout para el despliegue de items
   */
  layoutType?: FabButtonLayoutType;

  /**
   * Forma del botón y sus items
   */
  shape?: FabButtonShape;

  /**
   * Mostrar labels inline por defecto
   */
  showLabels?: boolean;

  /**
   * Duración de la animación en milisegundos
   */
  animationDuration?: number;

  /**
   * Espaciado entre items en pixels
   */
  itemSpacing?: number;

  /**
   * Cerrar el menú al hacer clic en un item
   */
  hideOnItemClick?: boolean;

  /**
   * Cerrar el menú al hacer clic fuera
   */
  hideOnClickOutside?: boolean;

  /**
   * Ocultar el overlay de fondo
   */
  hideOverlay?: boolean;

  /**
   * Rotación del icono principal al abrir (en grados)
   */
  iconRotation?: number;
}

/**
 * Configuración por defecto del FAB Button
 */
export function createDefaultFabButtonConfig(): FabButtonConfig {
  return {
    direction: 'up',
    animation: 'scale',
    layoutType: 'linear',
    shape: 'circular',
    showLabels: false,
    // animationDuration y itemSpacing se manejan por CSS
    hideOnItemClick: true,
    hideOnClickOutside: true,
    hideOverlay: true, // Por defecto oculto
    iconRotation: 135, // Rotación para efecto "×" en el icono "+"
  };
}
