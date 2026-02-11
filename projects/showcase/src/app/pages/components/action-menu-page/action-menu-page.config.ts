import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { ACTION_MENU_EXAMPLES_SECTIONS } from './configs/action-menu-examples.config';
import { ACTION_MENU_API_SECTIONS } from './configs/action-menu-api.config';
import { ACTION_MENU_THEMING_SECTIONS } from './configs/action-menu-theming.config';

export const ACTION_MENU_PAGE_SECTIONS: ComponentSection[] = [
  ...ACTION_MENU_EXAMPLES_SECTIONS,
  ...ACTION_MENU_API_SECTIONS,
  ...ACTION_MENU_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Action Menu
 */
export const ACTION_MENU_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.actionMenu.title',
  subtitle: 'components.actionMenu.subtitle',
  sections: ACTION_MENU_PAGE_SECTIONS,
};
