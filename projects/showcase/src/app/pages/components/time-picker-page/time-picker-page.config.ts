import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { TIME_PICKER_EXAMPLES_SECTIONS } from './configs/time-picker-examples.config';
import { TIME_PICKER_API_SECTIONS } from './configs/time-picker-api.config';
import { TIME_PICKER_THEMING_SECTIONS } from './configs/time-picker-theming.config';
import { TIME_PICKER_I18N_SECTIONS } from './configs/time-picker-i18n.config';
import { TIME_PICKER_A11Y_SECTIONS } from './configs/time-picker-a11y.config';
import { TIME_PICKER_GLOBAL_CONFIG_SECTIONS } from './configs/time-picker-global-config.config';

export const TIME_PICKER_PAGE_SECTIONS: ComponentSection[] = [
  ...TIME_PICKER_EXAMPLES_SECTIONS,
  ...TIME_PICKER_API_SECTIONS,
  ...TIME_PICKER_THEMING_SECTIONS,
  ...TIME_PICKER_I18N_SECTIONS,
  ...TIME_PICKER_A11Y_SECTIONS,
  ...TIME_PICKER_GLOBAL_CONFIG_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente TimePicker
 */
export const TIME_PICKER_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.timePicker.title',
  subtitle: 'components.timePicker.subtitle',
  sections: TIME_PICKER_PAGE_SECTIONS,
};
