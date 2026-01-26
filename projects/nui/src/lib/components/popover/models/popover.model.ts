import { InjectionToken } from '@angular/core';

/**
 * Token de inyección para los datos del popover
 */
export const POPOVER_DATA = new InjectionToken<any>('POPOVER_DATA');

/**
 * Token de inyección para la función close del popover
 */
export const POPOVER_CLOSE = new InjectionToken<() => void>('POPOVER_CLOSE');

/**
 * Posiciones disponibles para el popover
 */
export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Eventos que pueden disparar el popover
 */
export type PopoverEvent = 'hover' | 'click' | 'focus';

/**
 * Configuración del popover
 */
export interface PopoverConfig {
  /**
   * Posición del popover respecto al elemento
   * @default 'top'
   */
  position?: PopoverPosition;

  /**
   * Evento que dispara el popover
   * @default 'click'
   */
  event?: PopoverEvent;

  /**
   * Delay antes de mostrar el popover (ms)
   * @default 0
   */
  showDelay?: number;

  /**
   * Delay antes de ocultar el popover (ms)
   * @default 0
   */
  hideDelay?: number;

  /**
   * Desactiva el popover
   * @default false
   */
  disabled?: boolean;

  /**
   * Clase CSS personalizada para el popover
   */
  popoverClass?: string;

  /**
   * Muestra una flecha apuntando al elemento
   * @default true
   */
  showArrow?: boolean;

  /**
   * Cierra el popover al hacer click fuera
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Cierra el popover al presionar Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Ancho máximo del popover (CSS value)
   * @default '300px'
   */
  maxWidth?: string;

  /**
   * Ancho mínimo del popover (CSS value)
   */
  minWidth?: string;

  /**
   * Permite múltiples popovers abiertos simultáneamente
   * Si es false, al abrir un popover se cierran todos los demás
   * @default false
   */
  allowMultiple?: boolean;
}

/**
 * Contexto del template del popover
 */
export interface PopoverContext {
  /** Función para cerrar el popover desde el contenido */
  close: () => void;
  /** Datos opcionales pasados al popover */
  data?: any;
}

/**
 * Interfaz base para componentes que se cargan dinámicamente en popovers.
 * Los componentes que implementen esta interfaz recibirán automáticamente
 * la función close() y los datos del contexto.
 * 
 * @example
 * export class MyPopoverComponent implements PopoverContentComponent {
 *   data: any;
 *   close: () => void = () => {};
 * }
 */
export interface PopoverContentComponent {
  /** Datos pasados al componente desde el padre */
  data?: any;
  /** Función para cerrar el popover, inyectada automáticamente */
  close: () => void;
}
