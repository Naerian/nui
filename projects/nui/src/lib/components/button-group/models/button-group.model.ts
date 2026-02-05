/**
 * Modo de selección del button-group
 * - 'radio': Selección única
 * - 'checkbox': Multiselección
 */
export type ButtonGroupMode = 'radio' | 'checkbox';

/**
 * Variante visual del button-group
 * - 'grouped': Botones separados con espacios (por defecto)
 * - 'segmented': Botones unidos sin espacios, bordes compartidos (estilo iOS)
 */
export type ButtonGroupLayout = 'grouped' | 'segmented';

/**
 * Opciones para el button-group
 */
export interface ButtonGroupOption {
  /**
   * Etiqueta visible del botón
   */
  label: string;

  /**
   * Valor interno del botón
   */
  value: any;

  /**
   * Icono opcional (clase CSS de RemixIcon)
   */
  icon?: string;

  /**
   * Si el botón está deshabilitado
   */
  disabled?: boolean;
}

/**
 * Interfaz interna normalizada para el template
 */
export interface NormalizedOption {
  label: string;
  value: any;
  tooltip?: string;
  icon?: string;
  disabled: boolean;
  original: any;
}
