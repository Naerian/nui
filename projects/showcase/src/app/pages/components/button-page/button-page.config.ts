import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { BUTTON_EXAMPLES_SECTIONS } from './configs/button-examples.config';
import { BUTTON_API_SECTIONS } from './configs/button-api.config';
import { BUTTON_THEMING_SECTIONS } from './configs/button-theming.config';

export const BUTTON_PAGE_SECTIONS: ComponentSection[] = [
  ...BUTTON_EXAMPLES_SECTIONS,
  ...BUTTON_API_SECTIONS,
  ...BUTTON_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Button
 */
export const BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.button.title',
  subtitle: 'components.button.subtitle',
  sections: BUTTON_PAGE_SECTIONS,
};
