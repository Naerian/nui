import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { SELECT_BUTTON_EXAMPLES_SECTIONS } from './configs/select-button-examples.config';
import { SELECT_BUTTON_API_SECTIONS } from './configs/select-button-api.config';
import { SELECT_BUTTON_THEMING_SECTIONS } from './configs/select-button-theming.config';
import { SELECT_BUTTON_A11Y_SECTIONS } from './configs/select-button-a11y.config';

/**
 * Secciones del Select Button (modularizado)
 */
export const SELECT_BUTTON_PAGE_SECTIONS: ComponentSection[] = [
  ...SELECT_BUTTON_EXAMPLES_SECTIONS,
  ...SELECT_BUTTON_API_SECTIONS,
  ...SELECT_BUTTON_THEMING_SECTIONS,
  ...SELECT_BUTTON_A11Y_SECTIONS,
];

/**
 * Configuración de la página de documentación del componente Select Button
 */
export const SELECT_BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.selectButton.title',
  subtitle: 'components.selectButton.subtitle',
  sections: SELECT_BUTTON_PAGE_SECTIONS,
};
