import { DEFAULT_AVATAR_I18N } from '../components/avatar/models/avatar-i18n.model';
import { DEFAULT_CALENDAR_I18N } from '../components/calendar/models/calendar-i18n.model';
import { DEFAULT_PAGINATOR_I18N } from '../components/paginator/models/paginator-i18n.model';
import { DEFAULT_TIMEPICKER_I18N } from '../components/time-picker/models/time-picker-i18n.model';
import { NuiI18n } from './nui-i18n.model';

export const DEFAULT_GENERIC_I18N = {
  expand: 'Expand',
  collapse: 'Collapse',
  close: 'Close',
  minimize: 'Minimize',
};

export const NUI_I18N_DEFAULT: NuiI18n = {
  // Textos genéricos por defecto
  ...DEFAULT_GENERIC_I18N,
  // Textos por defecto para los componentes
  avatar: DEFAULT_AVATAR_I18N,
  calendar: DEFAULT_CALENDAR_I18N,
  timePicker: DEFAULT_TIMEPICKER_I18N,
  paginator: DEFAULT_PAGINATOR_I18N,
};
