import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { FAB_BUTTON_EXAMPLES_SECTIONS } from './configs/fab-button-examples.config';
import { FAB_BUTTON_API_SECTIONS } from './configs/fab-button-api.config';
import { FAB_BUTTON_THEMING_SECTIONS } from './configs/fab-button-theming.config';

export const FAB_BUTTON_PAGE_SECTIONS: ComponentSection[] = [
  ...FAB_BUTTON_EXAMPLES_SECTIONS,
  ...FAB_BUTTON_API_SECTIONS,
  ...FAB_BUTTON_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente FabButton.
 */
export const FAB_BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.fabButton.title',
  subtitle: 'components.fabButton.subtitle',
  sections: FAB_BUTTON_PAGE_SECTIONS,
};
