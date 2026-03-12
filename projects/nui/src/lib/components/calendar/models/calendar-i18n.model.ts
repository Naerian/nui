import { NUI_DATE_FULL_FORMAT } from '../../../i18n';

export const DEFAULT_CALENDAR_I18N: CalendarI18n = {
  weekDaysShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  selectDay: 'Select day',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
  prevYears: 'Previous years',
  nextYears: 'Next years',
  changeMonth: 'Select month',
  changeYear: 'Select year',
  year: 'Select year',
  dayDisabled: 'Disabled: {date}',
  monthAria: 'Months view',
  yearsAria: 'Years view',
  openCalendar: 'Open calendar',
  today: 'Today',
  clear: 'Clear',
  week: 'Week {week}',
  weekNumbers: 'W',
  showTime: 'Show time selector',
  hideTime: 'Hide time selector',
  timeSelector: {
    start: 'Start time',
    end: 'End time',
  },
  presets: {
    shortcuts: 'Shortcuts',
    today: 'Today',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    thisYear: 'This year',
  },
  tabs: {
    calendar: 'Calendar',
    presets: 'Shortcuts',
    time: 'Time',
  },
  aria: {
    today: 'Today',
    selected: 'Selected',
    inRange: 'In range',
    disabled: 'Disabled',
    statusSuccess: 'Success',
    statusWarning: 'Warning',
    statusDanger: 'Danger',
    statusInfo: 'Information',
  },
  a11y: {
    calendarLabel: 'Calendar',
    keyboardInstructions:
      'Use the arrow keys to navigate. Page Up / Page Down to change month. Press T to go to today.',
    monthNavigated: 'Navigating to {month} {year}',
    rangeStart: 'Range start: {date}. Now select the end date.',
    rangeComplete: 'Range selected: {start} to {end}.',
    weekNumberLabel: 'Week',
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
  clear: string;
  week: string;
  weekNumbers: string;
  showTime: string;
  hideTime: string;
  timeSelector: {
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
