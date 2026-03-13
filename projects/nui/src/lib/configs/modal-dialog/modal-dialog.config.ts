import { inject } from '@angular/core';
import type { ModalDialogConfig } from '../../components/modal-dialog';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Subset de ModalDialogConfig que tiene sentido definir globalmente.
 * Excluye campos que son por defecto por-modal (title, message, data, etc.).
 */
export interface ModalDialogGlobalConfig
  extends Pick<
    ModalDialogConfig,
    | 'animationDuration'
    | 'hasBackdrop'
    | 'closeOnBackdropClick'
    | 'closeOnEscape'
    | 'closeOnRouteChange'
    | 'showHeader'
    | 'showCloseButton'
    | 'autoFocus'
    | 'scrollStrategy'
    | 'canBeClosed'
    | 'buttonsVariant'
    | 'buttonsSize'
    | 'width'
    | 'minWidth'
    | 'maxWidth'
    | 'minHeight'
  > {}

/**
 * Configuración estática por defecto para los Modal Dialogs.
 */
export const DEFAULT_MODAL_DIALOG_CONFIG: ModalDialogGlobalConfig = {
  animationDuration: 220,
  hasBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  closeOnRouteChange: false,
  showHeader: true,
  showCloseButton: true,
  autoFocus: true,
  scrollStrategy: 'block',
  canBeClosed: true,
  buttonsVariant: 'solid',
  buttonsSize: 'md',
  width: '500px',
};

/**
 * Función inyectable para resolver la configuración final del ModalDialog.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectModalDialogConfig(): ModalDialogGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.modalDialog;
  return deepMerge(DEFAULT_MODAL_DIALOG_CONFIG, overrides);
}
