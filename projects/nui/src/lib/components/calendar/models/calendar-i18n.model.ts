import { NUI_DATE_FULL_FORMAT } from "../../../i18n";

export const DEFAULT_CALENDAR_I18N: CalendarI18n = {
  weekDaysShort: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
  weekDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  selectDay: 'Seleccionar día',
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  prevMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  prevYears: 'Años anteriores',
  nextYears: 'Años siguientes',
  changeMonth: 'Seleccionar mes',
  changeYear: 'Seleccionar año',
  year: 'Seleccionar año',
  dayDisabled: 'Deshabilitado: {date}',
  monthAria: 'Vista de meses',
  yearsAria: 'Vista de años',
  openCalendar: 'Abrir calendario',
  today: 'Hoy',
  week: 'Semana {week}',
  weekNumbers: 'S',
  showTime: 'Mostrar selector de hora',
  hideTime: 'Ocultar selector de hora',
  timePicker: {
    start: 'Hora de inicio',
    end: 'Hora de fin',
  },
  presets: {
    shortcuts: 'Acc. rápidos',
    today: 'Hoy',
    last7Days: 'Últimos 7 días',
    last30Days: 'Últimos 30 días',
    thisMonth: 'Este mes',
    lastMonth: 'Mes pasado',
    thisYear: 'Este año',
  },
  tabs: {
    calendar: 'Calendario',
    presets: 'Acc. Rápidos',
    time: 'Hora',
  },
  aria: {
    today: 'Hoy',
    selected: 'Seleccionado',
    inRange: 'En rango',
    disabled: 'Deshabilitado',
    statusSuccess: 'Éxito',
    statusWarning: 'Advertencia',
    statusDanger: 'Peligro',
    statusInfo: 'Información',
  },
  a11y: {
    calendarLabel: 'Calendario',
    keyboardInstructions: 'Usa las flechas para navegar. Re. Pág / Av. Pág para cambiar de mes. T para ir a hoy.',
    monthNavigated: 'Navegando a {month} {year}',
    rangeStart: 'Inicio de rango: {date}. Ahora seleccione la fecha de fin.',
    rangeComplete: 'Rango seleccionado: {start} hasta {end}.',
    weekNumberLabel: 'Semana',
  },
};

export interface CalendarI18n {
  weekDaysShort: string[];
  weekDays: string[];
  selectDay: string;
  months: string[];
  shortMonths: string[];
  prevMonth: string;
  nextMonth: string;
  prevYears: string;
  nextYears: string;
  changeMonth: string;
  changeYear: string;
  year: string;
  dayDisabled: string;
  monthAria: string;
  yearsAria: string;
  openCalendar: string;
  today: string;
  week: string;
  weekNumbers: string;
  showTime: string;
  hideTime: string;
  timePicker: {
    start: string;
    end: string;
  };
  presets: {
    shortcuts: string;
    today: string;
    last7Days: string;
    last30Days: string;
    thisMonth: string;
    lastMonth: string;
    thisYear: string;
  };
  tabs: {
    calendar: string;
    presets: string;
    time: string;
  };
  aria: {
    today: string;
    selected: string;
    inRange: string;
    disabled: string;
    statusSuccess: string;
    statusWarning: string;
    statusDanger: string;
    statusInfo: string;
  };
  a11y: {
    calendarLabel: string;
    keyboardInstructions: string;
    monthNavigated: string;
    rangeStart: string;
    rangeComplete: string;
    weekNumberLabel: string;
  };
}
