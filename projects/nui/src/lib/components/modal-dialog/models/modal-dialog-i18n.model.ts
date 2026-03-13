/**
 * Textos localizables del componente Modal Dialog.
 */
export interface ModalDialogI18n {
  /** Tooltip del botón de cerrar en el header */
  close: string;
  /** Tooltip del botón de minimizar en el header */
  minimize: string;
  /** Tooltip/label del botón de restaurar en el dock */
  restore: string;
  /** Label del botón de confirmación por defecto */
  confirm: string;
  /** Label del botón de cancelación por defecto */
  cancel: string;
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
  close: 'Close',
  minimize: 'Minimize',
  restore: 'Restore',
  confirm: 'Confirm',
  cancel: 'Cancel',
  loading: 'Loading...',
  verificationLabel: 'Type the following to confirm',
  verificationPlaceholder: 'Type here to confirm',
  verificationErrorMessage: 'The text does not match. Please try again.',
};
