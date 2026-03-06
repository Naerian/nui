import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { CALENDAR_EXAMPLES_SECTIONS } from './configs/calendar-examples.config';
import { CALENDAR_API_SECTIONS } from './configs/calendar-api.config';
import { CALENDAR_THEMING_SECTIONS } from './configs/calendar-theming.config';
import { CALENDAR_I18N_SECTIONS } from './configs/calendar-i18n.config';
import { CALENDAR_A11Y_SECTIONS } from './configs/calendar-a11y.config';
import { CALENDAR_GLOBAL_CONFIG_SECTIONS } from './configs/calendar-global-config.config';

export const CALENDAR_PAGE_SECTIONS: ComponentSection[] = [
  ...CALENDAR_EXAMPLES_SECTIONS,
  ...CALENDAR_API_SECTIONS,
  ...CALENDAR_THEMING_SECTIONS,
  ...CALENDAR_I18N_SECTIONS,
  ...CALENDAR_A11Y_SECTIONS,
  ...CALENDAR_GLOBAL_CONFIG_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Calendar
 */
export const CALENDAR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.calendar.title',
  subtitle: 'components.calendar.subtitle',
  sections: CALENDAR_PAGE_SECTIONS,
};
