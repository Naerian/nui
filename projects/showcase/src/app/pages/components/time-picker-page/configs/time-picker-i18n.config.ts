import { ComponentSection } from '../../../../core/models';

export const TIME_PICKER_I18N_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tokens principales
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-tokens',
    title: 'components.timePicker.i18n.tokens.title',
    description: 'components.timePicker.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.timePicker.i18n.tokens.note',
    },
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timePicker.setToCurrentTime</code>', '"Current"', 'components.timePicker.i18n.tokens.rows.setToCurrentTime.description'],
        ['<code>timePicker.selectTime</code>', '"Select Time"', 'components.timePicker.i18n.tokens.rows.selectTime.description'],
        ['<code>timePicker.clear</code>', '"Clear"', 'components.timePicker.i18n.tokens.rows.clear.description'],
        ['<code>timePicker.hour</code>', '"Hour"', 'components.timePicker.i18n.tokens.rows.hour.description'],
        ['<code>timePicker.minutes</code>', '"Minutes"', 'components.timePicker.i18n.tokens.rows.minutes.description'],
        ['<code>timePicker.hour12</code>', '"Hour (1-12)"', 'components.timePicker.i18n.tokens.rows.hour12.description'],
        ['<code>timePicker.hour24</code>', '"Hour (0-23)"', 'components.timePicker.i18n.tokens.rows.hour24.description'],
        ['<code>timePicker.period</code>', '"Period (AM/PM)"', 'components.timePicker.i18n.tokens.rows.period.description'],
        ['<code>timePicker.normalizedTime</code>', '"Normalized Time..."', 'components.timePicker.i18n.tokens.rows.normalizedTime.description'],
        ['<code>timePicker.rangeLabel</code>', '"Allowed Range"', 'components.timePicker.i18n.tokens.rows.rangeLabel.description'],
        ['<code>timePicker.timeSelected</code>', '"Selected Time"', 'components.timePicker.i18n.tokens.rows.timeSelected.description'],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Tokens de duración, tabs y presets
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-duration-presets',
    title: 'components.timePicker.i18n.durationAndPresets.title',
    description: 'components.timePicker.i18n.durationAndPresets.description',
    anchor: 'i18n-duration-presets',
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timePicker.duration.hours</code>', '"Hours"', 'components.timePicker.i18n.durationAndPresets.rows.durationHours.description'],
        ['<code>timePicker.duration.minutes</code>', '"Minutes"', 'components.timePicker.i18n.durationAndPresets.rows.durationMinutes.description'],
        ['<code>timePicker.duration.seconds</code>', '"Seconds"', 'components.timePicker.i18n.durationAndPresets.rows.durationSeconds.description'],
        ['<code>timePicker.duration.hoursShort</code>', '"h"', 'components.timePicker.i18n.durationAndPresets.rows.hoursShort.description'],
        ['<code>timePicker.duration.minutesShort</code>', '"m"', 'components.timePicker.i18n.durationAndPresets.rows.minutesShort.description'],
        ['<code>timePicker.duration.secondsShort</code>', '"s"', 'components.timePicker.i18n.durationAndPresets.rows.secondsShort.description'],
        ['<code>timePicker.duration.selectDuration</code>', '"Select Duration"', 'components.timePicker.i18n.durationAndPresets.rows.selectDuration.description'],
        ['<code>timePicker.duration.durationSelected</code>', '"Duration Selected"', 'components.timePicker.i18n.durationAndPresets.rows.durationSelected.description'],
        ['<code>timePicker.tabs.selector</code>', '"Selector"', 'components.timePicker.i18n.durationAndPresets.rows.tabSelector.description'],
        ['<code>timePicker.tabs.presets</code>', '"Presets"', 'components.timePicker.i18n.durationAndPresets.rows.tabPresets.description'],
        ['<code>timePicker.presets.now</code>', '"Now"', 'components.timePicker.i18n.durationAndPresets.rows.presetsNow.description'],
        ['<code>timePicker.presets.noon</code>', '"Noon"', 'components.timePicker.i18n.durationAndPresets.rows.presetsNoon.description'],
        ['<code>timePicker.presets.midnight</code>', '"Midnight"', 'components.timePicker.i18n.durationAndPresets.rows.presetsMidnight.description'],
        ['<code>timePicker.presets.minutes</code>', '"{{value}} min"', 'components.timePicker.i18n.durationAndPresets.rows.presetsMinutes.description'],
        ['<code>timePicker.presets.hour</code>', '"{{value}} hour"', 'components.timePicker.i18n.durationAndPresets.rows.presetsHour.description'],
        ['<code>timePicker.presets.hours</code>', '"{{value}} hours"', 'components.timePicker.i18n.durationAndPresets.rows.presetsHours.description'],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Tokens de accesibilidad (sub-objeto a11y)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-a11y-tokens',
    title: 'components.timePicker.i18n.a11yTokens.title',
    description: 'components.timePicker.i18n.a11yTokens.description',
    anchor: 'i18n-a11y-tokens',
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timePicker.a11y.timePickerLabel</code>', '"Time selector"', 'components.timePicker.i18n.a11yTokens.rows.timePickerLabel.description'],
        ['<code>timePicker.a11y.durationPickerLabel</code>', '"Duration selector"', 'components.timePicker.i18n.a11yTokens.rows.durationPickerLabel.description'],
        ['<code>timePicker.a11y.hourColumnHelp</code>', '"Use the arrows to change the hour"', 'components.timePicker.i18n.a11yTokens.rows.hourColumnHelp.description'],
        ['<code>timePicker.a11y.minuteColumnHelp</code>', '"Use the arrows to change the minutes"', 'components.timePicker.i18n.a11yTokens.rows.minuteColumnHelp.description'],
        ['<code>timePicker.a11y.periodHelp</code>', '"Use the arrows to change AM/PM"', 'components.timePicker.i18n.a11yTokens.rows.periodHelp.description'],
        ['<code>timePicker.a11y.normalizedAlert</code>', '"Normalized time: {time}"', 'components.timePicker.i18n.a11yTokens.rows.normalizedAlert.description'],
        ['<code>timePicker.a11y.rangeInfo</code>', '"Valid range: {min} - {max}"', 'components.timePicker.i18n.a11yTokens.rows.rangeInfo.description'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override de tokens del TimePicker
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      timePicker: {
        selectTime: 'Select time',
        clear: 'Clear',
        presets: { now: 'Now', noon: 'Noon', midnight: 'Midnight' },
        a11y: { timePickerLabel: 'Time selector' },
      },
    }),
  ],
};`,
      },
    ],
  },
];
