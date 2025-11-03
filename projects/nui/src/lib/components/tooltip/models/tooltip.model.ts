/**
 * Posiciones disponibles para el tooltip
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Eventos que pueden disparar el tooltip
 */
export type TooltipEvent = 'hover' | 'click' | 'focus' | 'manual';

/**
 * Configuración del tooltip
 */
export interface TooltipConfig {
  /**
   * Posición del tooltip respecto al elemento
   * @default 'top'
   */
  position?: TooltipPosition;

  /**
   * Evento que dispara el tooltip
   * @default 'hover'
   */
  event?: TooltipEvent;

  /**
   * Delay antes de mostrar el tooltip (ms)
   * @default 300
   */
  showDelay?: number;

  /**
   * Delay antes de ocultar el tooltip (ms)
   * @default 0
   */
  hideDelay?: number;

  /**
   * Desactiva el tooltip
   * @default false
   */
  disabled?: boolean;

  /**
   * Clase CSS personalizada para el tooltip
   */
  tooltipClass?: string;

  /**
   * Muestra una flecha apuntando al elemento
   * @default true
   */
  showArrow?: boolean;

  /**
   * Permite interactuar con el contenido del tooltip (hover sobre el tooltip)
   * Útil para tooltips con enlaces, botones o contenido seleccionable
   * @default false
   */
  interactive?: boolean;
}
