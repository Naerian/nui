import { ComponentPageConfig } from '../../../core/models';
import { TOAST_EXAMPLES_SECTIONS } from './configs/toast-examples.config';
import { TOAST_API_SECTIONS } from './configs/toast-api.config';
import { TOAST_THEMING_SECTIONS } from './configs/toast-theming.config';
import { TOAST_I18N_SECTIONS } from './configs/toast-i18n.config';
import { TOAST_A11Y_SECTIONS } from './configs/toast-a11y.config';

/**
 * Configuración completa de la página de documentación del componente Toast
 */
export const TOAST_PAGE_SECTIONS = [
  ...TOAST_EXAMPLES_SECTIONS,
  ...TOAST_API_SECTIONS,
  ...TOAST_THEMING_SECTIONS,
  ...TOAST_I18N_SECTIONS,
  ...TOAST_A11Y_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Toast
 */
export const TOAST_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.toast.title',
  subtitle: 'components.toast.subtitle',
  sections: TOAST_PAGE_SECTIONS,
};
