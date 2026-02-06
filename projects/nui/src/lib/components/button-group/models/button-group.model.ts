import { NUIVariant } from '../../../configs';

/**
 * Modo de selección del button-group
 * - 'radio': Selección única
 * - 'checkbox': Multiselección
 */
export type BtnGroupMode = 'radio' | 'checkbox';
export enum BtnGroupModeEnum {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

/**
 * Variante visual del button-group
 * - 'solid', 'outline', 'ghost' (heredados de Button)
 * - 'segmented' (estilo iOS, con botones unidos sin espacios)
 */
export type BtnGroupVariant = NUIVariant | 'segmented';

/**
 * Opciones para el button-group
 */
export interface BtnGroupOption {
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
export interface BtnNormalizedOption {
  label: string;
  value: any;
  tooltip?: string;
  icon?: string;
  disabled: boolean;
  original: any;
}
