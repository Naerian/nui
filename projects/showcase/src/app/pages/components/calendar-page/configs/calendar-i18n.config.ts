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
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>calendar.weekDaysShort</code>', '["Lu","Ma","Mi","Ju","Vi","S\u00e1","Do"]', 'components.calendar.i18n.navigation.rows.weekDaysShort.description'],
        ['<code>calendar.weekDays</code>', '["Lunes","Martes",...]', 'components.calendar.i18n.navigation.rows.weekDays.description'],
        ['<code>calendar.months</code>', '["Enero","Febrero",...]', 'components.calendar.i18n.navigation.rows.months.description'],
        ['<code>calendar.shortMonths</code>', '["Ene","Feb",...]', 'components.calendar.i18n.navigation.rows.shortMonths.description'],
        ['<code>calendar.prevMonth</code>', '"Mes anterior"', 'components.calendar.i18n.navigation.rows.prevMonth.description'],
        ['<code>calendar.nextMonth</code>', '"Mes siguiente"', 'components.calendar.i18n.navigation.rows.nextMonth.description'],
        ['<code>calendar.prevYears</code>', '"A\u00f1os anteriores"', 'components.calendar.i18n.navigation.rows.prevYears.description'],
        ['<code>calendar.nextYears</code>', '"A\u00f1os siguientes"', 'components.calendar.i18n.navigation.rows.nextYears.description'],
        ['<code>calendar.changeMonth</code>', '"Cambiar mes"', 'components.calendar.i18n.navigation.rows.changeMonth.description'],
        ['<code>calendar.changeYear</code>', '"Cambiar a\u00f1o"', 'components.calendar.i18n.navigation.rows.changeYear.description'],
        ['<code>calendar.year</code>', '"A\u00f1o"', 'components.calendar.i18n.navigation.rows.year.description'],
        ['<code>calendar.week</code>', '"Semana"', 'components.calendar.i18n.navigation.rows.week.description'],
        ['<code>calendar.weekNumbers</code>', '"N\u00fameros de semana"', 'components.calendar.i18n.navigation.rows.weekNumbers.description'],
        ['<code>calendar.today</code>', '"Hoy"', 'components.calendar.i18n.navigation.rows.today.description'],
        ['<code>calendar.selectDay</code>', '"Seleccionar d\u00eda"', 'components.calendar.i18n.navigation.rows.selectDay.description'],
        ['<code>calendar.dayDisabled</code>', '"D\u00eda deshabilitado"', 'components.calendar.i18n.navigation.rows.dayDisabled.description'],
        ['<code>calendar.openCalendar</code>', '"Abrir calendario"', 'components.calendar.i18n.navigation.rows.openCalendar.description'],
        ['<code>calendar.showTime</code>', '"Mostrar hora"', 'components.calendar.i18n.navigation.rows.showTime.description'],
        ['<code>calendar.hideTime</code>', '"Ocultar hora"', 'components.calendar.i18n.navigation.rows.hideTime.description'],
        ['<code>calendar.monthAria</code>', '"Selecci\u00f3n de mes"', 'components.calendar.i18n.navigation.rows.monthAria.description'],
        ['<code>calendar.yearsAria</code>', '"Selecci\u00f3n de a\u00f1o"', 'components.calendar.i18n.navigation.rows.yearsAria.description'],
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
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>calendar.presets.shortcuts</code>', '"Accesos r\u00e1pidos"', 'components.calendar.i18n.presetsAndTabs.rows.shortcuts.description'],
        ['<code>calendar.presets.today</code>', '"Hoy"', 'components.calendar.i18n.presetsAndTabs.rows.presetsToday.description'],
        ['<code>calendar.presets.last7Days</code>', '"Últimos 7 d\u00edas"', 'components.calendar.i18n.presetsAndTabs.rows.last7Days.description'],
        ['<code>calendar.presets.last30Days</code>', '"Últimos 30 d\u00edas"', 'components.calendar.i18n.presetsAndTabs.rows.last30Days.description'],
        ['<code>calendar.presets.thisMonth</code>', '"Este mes"', 'components.calendar.i18n.presetsAndTabs.rows.thisMonth.description'],
        ['<code>calendar.presets.lastMonth</code>', '"Mes pasado"', 'components.calendar.i18n.presetsAndTabs.rows.lastMonth.description'],
        ['<code>calendar.presets.thisYear</code>', '"Este a\u00f1o"', 'components.calendar.i18n.presetsAndTabs.rows.thisYear.description'],
        ['<code>calendar.tabs.calendar</code>', '"Calendario"', 'components.calendar.i18n.presetsAndTabs.rows.tabCalendar.description'],
        ['<code>calendar.tabs.presets</code>', '"Presets"', 'components.calendar.i18n.presetsAndTabs.rows.tabPresets.description'],
        ['<code>calendar.tabs.time</code>', '"Hora"', 'components.calendar.i18n.presetsAndTabs.rows.tabTime.description'],
        ['<code>calendar.timePicker.start</code>', '"Hora de inicio"', 'components.calendar.i18n.presetsAndTabs.rows.timeStart.description'],
        ['<code>calendar.timePicker.end</code>', '"Hora de fin"', 'components.calendar.i18n.presetsAndTabs.rows.timeEnd.description'],
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
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>calendar.aria.today</code>', '"Hoy"', 'components.calendar.i18n.ariaTokens.rows.ariaToday.description'],
        ['<code>calendar.aria.selected</code>', '"Seleccionado"', 'components.calendar.i18n.ariaTokens.rows.selected.description'],
        ['<code>calendar.aria.inRange</code>', '"En rango"', 'components.calendar.i18n.ariaTokens.rows.inRange.description'],
        ['<code>calendar.aria.disabled</code>', '"Deshabilitado"', 'components.calendar.i18n.ariaTokens.rows.ariaDisabled.description'],
        ['<code>calendar.aria.statusSuccess</code>', '"Estado exitoso"', 'components.calendar.i18n.ariaTokens.rows.statusSuccess.description'],
        ['<code>calendar.aria.statusWarning</code>', '"Estado de advertencia"', 'components.calendar.i18n.ariaTokens.rows.statusWarning.description'],
        ['<code>calendar.aria.statusDanger</code>', '"Estado de peligro"', 'components.calendar.i18n.ariaTokens.rows.statusDanger.description'],
        ['<code>calendar.aria.statusInfo</code>', '"Estado informativo"', 'components.calendar.i18n.ariaTokens.rows.statusInfo.description'],
        ['<code>calendar.a11y.calendarLabel</code>', '"Calendario"', 'components.calendar.i18n.ariaTokens.rows.calendarLabel.description'],
        ['<code>calendar.a11y.keyboardInstructions</code>', '"Usa las teclas de fecha..."', 'components.calendar.i18n.ariaTokens.rows.keyboardInstructions.description'],
        ['<code>calendar.a11y.monthNavigated</code>', '"Navegado a {month} {year}"', 'components.calendar.i18n.ariaTokens.rows.monthNavigated.description'],
        ['<code>calendar.a11y.rangeStart</code>', '"Inicio de rango seleccionado"', 'components.calendar.i18n.ariaTokens.rows.rangeStart.description'],
        ['<code>calendar.a11y.rangeComplete</code>', '"Rango completo seleccionado"', 'components.calendar.i18n.ariaTokens.rows.rangeComplete.description'],
        ['<code>calendar.a11y.weekNumberLabel</code>', '"Semana {week}"', 'components.calendar.i18n.ariaTokens.rows.weekNumberLabel.description'],
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
