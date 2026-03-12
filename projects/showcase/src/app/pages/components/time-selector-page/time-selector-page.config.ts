import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { TIME_SELECTOR_EXAMPLES_SECTIONS } from './configs/time-selector-examples.config';
import { TIME_SELECTOR_API_SECTIONS } from './configs/time-selector-api.config';
import { TIME_SELECTOR_THEMING_SECTIONS } from './configs/time-selector-theming.config';
import { TIME_SELECTOR_I18N_SECTIONS } from './configs/time-selector-i18n.config';
import { TIME_SELECTOR_A11Y_SECTIONS } from './configs/time-selector-a11y.config';
import { TIME_SELECTOR_GLOBAL_CONFIG_SECTIONS } from './configs/time-selector-global-config.config';

export const TIME_SELECTOR_PAGE_SECTIONS: ComponentSection[] = [
  ...TIME_SELECTOR_EXAMPLES_SECTIONS,
  ...TIME_SELECTOR_API_SECTIONS,
  ...TIME_SELECTOR_THEMING_SECTIONS,
  ...TIME_SELECTOR_I18N_SECTIONS,
  ...TIME_SELECTOR_A11Y_SECTIONS,
  ...TIME_SELECTOR_GLOBAL_CONFIG_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente TimeSelector
 */
export const TIME_SELECTOR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.timeSelector.title',
  subtitle: 'components.timeSelector.subtitle',
  sections: TIME_SELECTOR_PAGE_SECTIONS,
};
