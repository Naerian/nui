import { inject } from '@angular/core';
import { CalendarGlobalConfig, CalendarTimePickerModeEnum } from '../../components/calendar/models';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';
import { TimePickerModeEnum } from '../../components/time-picker/models/time-picker.model';

/**
 * Constante pura con los defaults del Calendar.
 * Protege el tree-shaking: si no se usa el Calendar, esto no entra al bundle.
 */
export const DEFAULT_CALENDAR_CONFIG: CalendarGlobalConfig = {
  firstDayOfWeek: 1,
  closeOnSelect: true,
  showTodayButton: true,
  showTimePicker: CalendarTimePickerModeEnum.NONE,
  timePickerMode: TimePickerModeEnum.HOUR_MINUTE_24,
  timePickerConfig: undefined,
  customPresets: undefined,
  startTime: null,
  endTime: null,
  defaultDate: null,
};

/**
 * Función inyectable para resolver la configuración final del Calendar.
 * Combina los defaults estáticos con los posibles overrides del provider global de NUI.
 */
export function injectCalendarConfig(): CalendarGlobalConfig {
  // Inyectamos la config global (opcional por si el usuario no hizo provideNUI)
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos solo la parte que nos interesa
  const calendarOverrides = globalConfig?.calendar || {};

  // Fusionamos: Defaults Base <- pisan <- Overrides Globales
  return deepMerge(DEFAULT_CALENDAR_CONFIG, calendarOverrides);
}
