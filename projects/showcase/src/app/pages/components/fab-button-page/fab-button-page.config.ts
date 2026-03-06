import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { FAB_BUTTON_EXAMPLES_SECTIONS } from './configs/fab-button-examples.config';
import { FAB_BUTTON_API_SECTIONS } from './configs/fab-button-api.config';
import { FAB_BUTTON_THEMING_SECTIONS } from './configs/fab-button-theming.config';
import { FAB_BUTTON_I18N_SECTIONS } from './configs/fab-button-i18n.config';
import { FAB_BUTTON_A11Y_SECTIONS } from './configs/fab-button-a11y.config';
import { FAB_BUTTON_GLOBAL_CONFIG_SECTIONS } from './configs/fab-button-global-config.config';

export const FAB_BUTTON_PAGE_SECTIONS: ComponentSection[] = [
  ...FAB_BUTTON_EXAMPLES_SECTIONS,
  ...FAB_BUTTON_API_SECTIONS,
  ...FAB_BUTTON_THEMING_SECTIONS,
  ...FAB_BUTTON_I18N_SECTIONS,
  ...FAB_BUTTON_A11Y_SECTIONS,
  ...FAB_BUTTON_GLOBAL_CONFIG_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente FabButton.
 */
export const FAB_BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.fabButton.title',
  subtitle: 'components.fabButton.subtitle',
  sections: FAB_BUTTON_PAGE_SECTIONS,
};
