import { AvatarI18n } from '../components/avatar/models/avatar-i18n.model';
import { CalendarI18n } from '../components/calendar/models/calendar-i18n.model';
import { FabButtonI18n } from '../components/fab-button';
import { PaginatorI18n } from '../components/paginator/models/paginator-i18n.model';
import { TimeSelectorI18n } from '../components/time-selector/models/time-selector-i18n.model';

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
  /** Etiqueta accesible genérica para botones que abren un menú de acciones. */
  openActionsMenu: string;

  // Textos de los componentes
  avatar: AvatarI18n;
  calendar: CalendarI18n;
  timeSelector: TimeSelectorI18n;
  paginator: PaginatorI18n;
  fabButton: FabButtonI18n;
}
