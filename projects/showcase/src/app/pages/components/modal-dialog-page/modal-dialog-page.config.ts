import { ComponentPageConfig } from '../../../core/models';
import { MODAL_DIALOG_EXAMPLES_SECTIONS } from './configs/modal-dialog-examples.config';
import { MODAL_DIALOG_API_SECTIONS } from './configs/modal-dialog-api.config';
import { MODAL_DIALOG_THEMING_SECTIONS } from './configs/modal-dialog-theming.config';
import { MODAL_DIALOG_I18N_SECTIONS } from './configs/modal-dialog-i18n.config';
import { MODAL_DIALOG_A11Y_SECTIONS } from './configs/modal-dialog-a11y.config';
import { MODAL_DIALOG_GLOBAL_CONFIG_SECTIONS } from './configs/modal-dialog-global-config.config';

/**
 * Configuración de la página de documentación del componente Modal Dialog
 */
export const MODAL_DIALOG_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.modal-dialog.title',
  subtitle: 'components.modal-dialog.subtitle',
  sections: [
    ...MODAL_DIALOG_EXAMPLES_SECTIONS,
    ...MODAL_DIALOG_API_SECTIONS,
    ...MODAL_DIALOG_THEMING_SECTIONS,
    ...MODAL_DIALOG_I18N_SECTIONS,
    ...MODAL_DIALOG_A11Y_SECTIONS,
    ...MODAL_DIALOG_GLOBAL_CONFIG_SECTIONS,
  ],
};
