import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { TIME_PICKER_EXAMPLES_SECTIONS } from './configs/time-picker-examples.config';
import { TIME_PICKER_API_SECTIONS } from './configs/time-picker-api.config';
import { TIME_PICKER_THEMING_SECTIONS } from './configs/time-picker-theming.config';

export const TIME_PICKER_PAGE_SECTIONS: ComponentSection[] = [
  ...TIME_PICKER_EXAMPLES_SECTIONS,
  ...TIME_PICKER_API_SECTIONS,
  ...TIME_PICKER_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente TimePicker
 */
export const TIME_PICKER_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.timePicker.title',
  subtitle: 'components.timePicker.subtitle',
  sections: TIME_PICKER_PAGE_SECTIONS,
};
