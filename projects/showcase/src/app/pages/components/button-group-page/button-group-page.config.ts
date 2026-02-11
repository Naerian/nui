import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { BUTTON_GROUP_EXAMPLES_SECTIONS } from './configs/button-group-examples.config';
import { BUTTON_GROUP_API_SECTIONS } from './configs/button-group-api.config';
import { BUTTON_GROUP_THEMING_SECTIONS } from './configs/button-group-theming.config';

/**
 * Secciones del Button Group (modularizado)
 */
export const BUTTON_GROUP_PAGE_SECTIONS: ComponentSection[] = [
  ...BUTTON_GROUP_EXAMPLES_SECTIONS,
  ...BUTTON_GROUP_API_SECTIONS,
  ...BUTTON_GROUP_THEMING_SECTIONS,
];

/**
 * Configuración de la página de documentación del componente Button Group
 */
export const BUTTON_GROUP_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.buttonGroup.title',
  subtitle: 'components.buttonGroup.subtitle',
  sections: BUTTON_GROUP_PAGE_SECTIONS,
};