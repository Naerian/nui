/**
 * Tipo de botón HTML.
 * - 'submit': Envía el formulario
 * - 'reset': Resetea el formulario
 * - 'button': Botón estándar (comportamiento por defecto)
 * @default 'button'
 */
export type ButtonType = 'submit' | 'reset' | 'button';
export enum ButtonTypeEnum {
  SUBMIT = 'submit',
  RESET = 'reset',
  BUTTON = 'button',
}

/**
 * Posición del spinner de carga en el botón.
 *
 * - **'start'**: Spinner a la izquierda del texto
 * - **'end'**: Spinner a la derecha del texto
 * - **'center'**: Spinner centrado, reemplaza el contenido
 *
 * @default 'start'
 *
 * @example
 * ```html
 * <nui-button [loading]="isLoading" loadingPosition="start">
 *   Save Changes
 * </nui-button>
 * ```
 */
export type ButtonLoadingPosition = 'start' | 'end' | 'center';
export enum ButtonLoadingPositionEnum {
  START = 'start',
  END = 'end',
  CENTER = 'center',
}

/**
 * Tipo para el ancho del botón
 * - 'auto': Ancho automático basado en el contenido (default)
 * - 'full': Ocupa todo el ancho del contenedor (100%)
 * - 'fit': Se ajusta exactamente al contenido (fit-content)
 * @default 'auto'
 */
export type ButtonWidth = 'auto' | 'full' | 'fit';
export enum ButtonWidthEnum {
  AUTO = 'auto',
  FULL = 'full',
  FIT = 'fit',
}
