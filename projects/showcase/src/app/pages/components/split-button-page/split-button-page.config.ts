import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { SPLIT_BUTTON_EXAMPLES_SECTIONS } from './configs/split-button-examples.config';
import { SPLIT_BUTTON_API_SECTIONS } from './configs/split-button-api.config';
import { SPLIT_BUTTON_THEMING_SECTIONS } from './configs/split-button-theming.config';
import { SPLIT_BUTTON_A11Y_SECTIONS } from './configs/split-button-a11y.config';
import { SPLIT_BUTTON_GLOBAL_CONFIG_SECTIONS } from './configs/split-button-global-config.config';

export const SPLIT_BUTTON_PAGE_SECTIONS: ComponentSection[] = [
  ...SPLIT_BUTTON_EXAMPLES_SECTIONS,
  ...SPLIT_BUTTON_API_SECTIONS,
  ...SPLIT_BUTTON_THEMING_SECTIONS,
  ...SPLIT_BUTTON_A11Y_SECTIONS,
  ...SPLIT_BUTTON_GLOBAL_CONFIG_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente SplitButton
 */
export const SPLIT_BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.splitButton.title',
  subtitle: 'components.splitButton.subtitle',
  sections: SPLIT_BUTTON_PAGE_SECTIONS,
};
