/**
 * Interfaz de i18n para el SplitButton.
 * Permite personalizar los textos accesibles del disparador de menú.
 */
export interface SplitButtonI18n {
  /**
   * Etiqueta accesible para el botón disparador del menú (caret).
   * @default 'Open actions menu'
   */
  triggerAriaLabel: string;
}

export const DEFAULT_SPLIT_BUTTON_I18N: SplitButtonI18n = {
  triggerAriaLabel: 'Open actions menu',
};
