import { AvatarI18n } from '../components/avatar/models/avatar-i18n.model';
import { CalendarI18n } from '../components/calendar/models/calendar-i18n.model';
import { FabButtonI18n } from '../components/fab-button';
import { PaginatorI18n } from '../components/paginator/models/paginator-i18n.model';
import { TimePickerI18n } from '../components/time-picker/models/time-picker-i18n.model';
import { SplitButtonI18n } from '../components/split-button/models/split-button.model';

export const NUI_DATE_FULL_FORMAT = 'PPPP';

/**
 * Interfaz para las traducciones de la librería
 */
export interface NuiI18n {
  // Textos genéricos
  expand: string;
  collapse: string;
  close: string;
  minimize: string;
  restore: string;

  // Textos de los componentes
  avatar: AvatarI18n;
  calendar: CalendarI18n;
  timePicker: TimePickerI18n;
  paginator: PaginatorI18n;
  fabButton: FabButtonI18n;
  splitButton: SplitButtonI18n;
}
