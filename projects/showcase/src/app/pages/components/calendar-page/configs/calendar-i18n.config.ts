import { ComponentSection } from '../../../../core/models';

export const CALENDAR_I18N_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tokens de navegación y etiquetas visibles
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-navigation',
    title: 'components.calendar.i18n.navigation.title',
    description: 'components.calendar.i18n.navigation.description',
    anchor: 'i18n-navigation',
    note: {
      type: 'info',
      content: 'components.calendar.i18n.navigation.note',
    },
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>calendar.weekDaysShort</code>',
          '["Mo","Tu","We","Th","Fr","Sa","Su"]',
          'components.calendar.i18n.navigation.rows.weekDaysShort.description',
        ],
        [
          '<code>calendar.weekDays</code>',
          '["Monday","Tuesday",...]',
          'components.calendar.i18n.navigation.rows.weekDays.description',
        ],
        [
          '<code>calendar.months</code>',
          '["January","February",...]',
          'components.calendar.i18n.navigation.rows.months.description',
        ],
        [
          '<code>calendar.shortMonths</code>',
          '["Jan","Feb",...]',
          'components.calendar.i18n.navigation.rows.shortMonths.description',
        ],
        [
          '<code>calendar.prevMonth</code>',
          '"Previous month"',
          'components.calendar.i18n.navigation.rows.prevMonth.description',
        ],
        [
          '<code>calendar.nextMonth</code>',
          '"Next month"',
          'components.calendar.i18n.navigation.rows.nextMonth.description',
        ],
        [
          '<code>calendar.prevYears</code>',
          '"Previous years"',
          'components.calendar.i18n.navigation.rows.prevYears.description',
        ],
        [
          '<code>calendar.nextYears</code>',
          '"Next years"',
          'components.calendar.i18n.navigation.rows.nextYears.description',
        ],
        [
          '<code>calendar.changeMonth</code>',
          '"Change month"',
          'components.calendar.i18n.navigation.rows.changeMonth.description',
        ],
        [
          '<code>calendar.changeYear</code>',
          '"Change year"',
          'components.calendar.i18n.navigation.rows.changeYear.description',
        ],
        [
          '<code>calendar.year</code>',
          '"Year"',
          'components.calendar.i18n.navigation.rows.year.description',
        ],
        [
          '<code>calendar.week</code>',
          '"Week"',
          'components.calendar.i18n.navigation.rows.week.description',
        ],
        [
          '<code>calendar.weekNumbers</code>',
          '"Week numbers"',
          'components.calendar.i18n.navigation.rows.weekNumbers.description',
        ],
        [
          '<code>calendar.today</code>',
          '"Today"',
          'components.calendar.i18n.navigation.rows.today.description',
        ],
        [
          '<code>calendar.selectDay</code>',
          '"Select day"',
          'components.calendar.i18n.navigation.rows.selectDay.description',
        ],
        [
          '<code>calendar.dayDisabled</code>',
          '"Day disabled"',
          'components.calendar.i18n.navigation.rows.dayDisabled.description',
        ],
        [
          '<code>calendar.openCalendar</code>',
          '"Open calendar"',
          'components.calendar.i18n.navigation.rows.openCalendar.description',
        ],
        [
          '<code>calendar.showTime</code>',
          '"Show time"',
          'components.calendar.i18n.navigation.rows.showTime.description',
        ],
        [
          '<code>calendar.hideTime</code>',
          '"Hide time"',
          'components.calendar.i18n.navigation.rows.hideTime.description',
        ],
        [
          '<code>calendar.monthAria</code>',
          '"Select month"',
          'components.calendar.i18n.navigation.rows.monthAria.description',
        ],
        [
          '<code>calendar.yearsAria</code>',
          '"Select year"',
          'components.calendar.i18n.navigation.rows.yearsAria.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Tokens de presets, tabs y TimePicker integrado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-presets-tabs',
    title: 'components.calendar.i18n.presetsAndTabs.title',
    description: 'components.calendar.i18n.presetsAndTabs.description',
    anchor: 'i18n-presets-tabs',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>calendar.presets.shortcuts</code>',
          '"Quick access"',
          'components.calendar.i18n.presetsAndTabs.rows.shortcuts.description',
        ],
        [
          '<code>calendar.presets.today</code>',
          '"Today"',
          'components.calendar.i18n.presetsAndTabs.rows.presetsToday.description',
        ],
        [
          '<code>calendar.presets.last7Days</code>',
          '"Last 7 days"',
          'components.calendar.i18n.presetsAndTabs.rows.last7Days.description',
        ],
        [
          '<code>calendar.presets.last30Days</code>',
          '"Last 30 days"',
          'components.calendar.i18n.presetsAndTabs.rows.last30Days.description',
        ],
        [
          '<code>calendar.presets.thisMonth</code>',
          '"This month"',
          'components.calendar.i18n.presetsAndTabs.rows.thisMonth.description',
        ],
        [
          '<code>calendar.presets.lastMonth</code>',
          '"Last month"',
          'components.calendar.i18n.presetsAndTabs.rows.lastMonth.description',
        ],
        [
          '<code>calendar.presets.thisYear</code>',
          '"This year"',
          'components.calendar.i18n.presetsAndTabs.rows.thisYear.description',
        ],
        [
          '<code>calendar.tabs.calendar</code>',
          '"Calendar"',
          'components.calendar.i18n.presetsAndTabs.rows.tabCalendar.description',
        ],
        [
          '<code>calendar.tabs.presets</code>',
          '"Presets"',
          'components.calendar.i18n.presetsAndTabs.rows.tabPresets.description',
        ],
        [
          '<code>calendar.tabs.time</code>',
          '"Time"',
          'components.calendar.i18n.presetsAndTabs.rows.tabTime.description',
        ],
        [
          '<code>calendar.timePicker.start</code>',
          '"Start time"',
          'components.calendar.i18n.presetsAndTabs.rows.timeStart.description',
        ],
        [
          '<code>calendar.timePicker.end</code>',
          '"End time"',
          'components.calendar.i18n.presetsAndTabs.rows.timeEnd.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Tokens de estado ARIA y accesibilidad avanzada
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-aria-tokens',
    title: 'components.calendar.i18n.ariaTokens.title',
    description: 'components.calendar.i18n.ariaTokens.description',
    anchor: 'i18n-aria-tokens',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>calendar.aria.today</code>',
          '"Today"',
          'components.calendar.i18n.ariaTokens.rows.ariaToday.description',
        ],
        [
          '<code>calendar.aria.selected</code>',
          '"Selected"',
          'components.calendar.i18n.ariaTokens.rows.selected.description',
        ],
        [
          '<code>calendar.aria.inRange</code>',
          '"In range"',
          'components.calendar.i18n.ariaTokens.rows.inRange.description',
        ],
        [
          '<code>calendar.aria.disabled</code>',
          '"Disabled"',
          'components.calendar.i18n.ariaTokens.rows.ariaDisabled.description',
        ],
        [
          '<code>calendar.aria.statusSuccess</code>',
          '"Success state"',
          'components.calendar.i18n.ariaTokens.rows.statusSuccess.description',
        ],
        [
          '<code>calendar.aria.statusWarning</code>',
          '"Warning state"',
          'components.calendar.i18n.ariaTokens.rows.statusWarning.description',
        ],
        [
          '<code>calendar.aria.statusDanger</code>',
          '"Danger state"',
          'components.calendar.i18n.ariaTokens.rows.statusDanger.description',
        ],
        [
          '<code>calendar.aria.statusInfo</code>',
          '"Info state"',
          'components.calendar.i18n.ariaTokens.rows.statusInfo.description',
        ],
        [
          '<code>calendar.a11y.calendarLabel</code>',
          '"Calendar"',
          'components.calendar.i18n.ariaTokens.rows.calendarLabel.description',
        ],
        [
          '<code>calendar.a11y.keyboardInstructions</code>',
          '"Use the date keys..."',
          'components.calendar.i18n.ariaTokens.rows.keyboardInstructions.description',
        ],
        [
          '<code>calendar.a11y.monthNavigated</code>',
          '"Navigated to {month} {year}"',
          'components.calendar.i18n.ariaTokens.rows.monthNavigated.description',
        ],
        [
          '<code>calendar.a11y.rangeStart</code>',
          '"Range start selected"',
          'components.calendar.i18n.ariaTokens.rows.rangeStart.description',
        ],
        [
          '<code>calendar.a11y.rangeComplete</code>',
          '"Range complete selected"',
          'components.calendar.i18n.ariaTokens.rows.rangeComplete.description',
        ],
        [
          '<code>calendar.a11y.weekNumberLabel</code>',
          '"Week {week}"',
          'components.calendar.i18n.ariaTokens.rows.weekNumberLabel.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override de tokens del Calendar
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      calendar: {
        months: ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDaysShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        today: 'Today',
        a11y: { calendarLabel: 'Date picker' },
      },
    }),
  ],
};`,
      },
    ],
  },
];
