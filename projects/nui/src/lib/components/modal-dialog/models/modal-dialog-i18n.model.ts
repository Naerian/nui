/**
 * Textos localizables del componente Modal Dialog.
 */
export interface ModalDialogI18n {
  /** Label mostrado mientras la pantalla está en estado loading */
  loading: string;
  /** Etiqueta del campo de verificación (verification modal) */
  verificationLabel: string;
  /** Placeholder del campo de verificación */
  verificationPlaceholder: string;
  /** Mensaje de error cuando el texto de verificación no coincide */
  verificationErrorMessage: string;
}

export const DEFAULT_MODAL_DIALOG_I18N: ModalDialogI18n = {
  loading: 'Loading...',
  verificationLabel: 'Type the following to confirm',
  verificationPlaceholder: 'Type here to confirm',
  verificationErrorMessage: 'The text does not match. Please try again.',
};
