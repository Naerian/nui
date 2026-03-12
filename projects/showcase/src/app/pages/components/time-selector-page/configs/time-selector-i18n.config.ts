import { ComponentSection } from '../../../../core/models';

export const TIME_SELECTOR_I18N_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tokens principales
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-tokens',
    title: 'components.timeSelector.i18n.tokens.title',
    description: 'components.timeSelector.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.timeSelector.i18n.tokens.note',
    },
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timeSelector.setToCurrentTime</code>', '"Current"', 'components.timeSelector.i18n.tokens.rows.setToCurrentTime.description'],
        ['<code>timeSelector.selectTime</code>', '"Select Time"', 'components.timeSelector.i18n.tokens.rows.selectTime.description'],
        ['<code>timeSelector.clear</code>', '"Clear"', 'components.timeSelector.i18n.tokens.rows.clear.description'],
        ['<code>timeSelector.hour</code>', '"Hour"', 'components.timeSelector.i18n.tokens.rows.hour.description'],
        ['<code>timeSelector.minutes</code>', '"Minutes"', 'components.timeSelector.i18n.tokens.rows.minutes.description'],
        ['<code>timeSelector.hour12</code>', '"Hour (1-12)"', 'components.timeSelector.i18n.tokens.rows.hour12.description'],
        ['<code>timeSelector.hour24</code>', '"Hour (0-23)"', 'components.timeSelector.i18n.tokens.rows.hour24.description'],
        ['<code>timeSelector.period</code>', '"Period (AM/PM)"', 'components.timeSelector.i18n.tokens.rows.period.description'],
        ['<code>timeSelector.normalizedTime</code>', '"Normalized Time..."', 'components.timeSelector.i18n.tokens.rows.normalizedTime.description'],
        ['<code>timeSelector.rangeLabel</code>', '"Allowed Range"', 'components.timeSelector.i18n.tokens.rows.rangeLabel.description'],
        ['<code>timeSelector.timeSelected</code>', '"Selected Time"', 'components.timeSelector.i18n.tokens.rows.timeSelected.description'],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Tokens de duración, tabs y presets
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-duration-presets',
    title: 'components.timeSelector.i18n.durationAndPresets.title',
    description: 'components.timeSelector.i18n.durationAndPresets.description',
    anchor: 'i18n-duration-presets',
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timeSelector.duration.hours</code>', '"Hours"', 'components.timeSelector.i18n.durationAndPresets.rows.durationHours.description'],
        ['<code>timeSelector.duration.minutes</code>', '"Minutes"', 'components.timeSelector.i18n.durationAndPresets.rows.durationMinutes.description'],
        ['<code>timeSelector.duration.seconds</code>', '"Seconds"', 'components.timeSelector.i18n.durationAndPresets.rows.durationSeconds.description'],
        ['<code>timeSelector.duration.hoursShort</code>', '"h"', 'components.timeSelector.i18n.durationAndPresets.rows.hoursShort.description'],
        ['<code>timeSelector.duration.minutesShort</code>', '"m"', 'components.timeSelector.i18n.durationAndPresets.rows.minutesShort.description'],
        ['<code>timeSelector.duration.secondsShort</code>', '"s"', 'components.timeSelector.i18n.durationAndPresets.rows.secondsShort.description'],
        ['<code>timeSelector.duration.selectDuration</code>', '"Select Duration"', 'components.timeSelector.i18n.durationAndPresets.rows.selectDuration.description'],
        ['<code>timeSelector.duration.durationSelected</code>', '"Duration Selected"', 'components.timeSelector.i18n.durationAndPresets.rows.durationSelected.description'],
        ['<code>timeSelector.tabs.selector</code>', '"Selector"', 'components.timeSelector.i18n.durationAndPresets.rows.tabSelector.description'],
        ['<code>timeSelector.tabs.presets</code>', '"Presets"', 'components.timeSelector.i18n.durationAndPresets.rows.tabPresets.description'],
        ['<code>timeSelector.presets.now</code>', '"Now"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsNow.description'],
        ['<code>timeSelector.presets.noon</code>', '"Noon"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsNoon.description'],
        ['<code>timeSelector.presets.midnight</code>', '"Midnight"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsMidnight.description'],
        ['<code>timeSelector.presets.minutes</code>', '"{{value}} min"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsMinutes.description'],
        ['<code>timeSelector.presets.hour</code>', '"{{value}} hour"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsHour.description'],
        ['<code>timeSelector.presets.hours</code>', '"{{value}} hours"', 'components.timeSelector.i18n.durationAndPresets.rows.presetsHours.description'],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Tokens de accesibilidad (sub-objeto a11y)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-a11y-tokens',
    title: 'components.timeSelector.i18n.a11yTokens.title',
    description: 'components.timeSelector.i18n.a11yTokens.description',
    anchor: 'i18n-a11y-tokens',
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>timeSelector.a11y.timeSelectorLabel</code>', '"Time selector"', 'components.timeSelector.i18n.a11yTokens.rows.timeSelectorLabel.description'],
        ['<code>timeSelector.a11y.durationPickerLabel</code>', '"Duration selector"', 'components.timeSelector.i18n.a11yTokens.rows.durationPickerLabel.description'],
        ['<code>timeSelector.a11y.hourColumnHelp</code>', '"Use the arrows to change the hour"', 'components.timeSelector.i18n.a11yTokens.rows.hourColumnHelp.description'],
        ['<code>timeSelector.a11y.minuteColumnHelp</code>', '"Use the arrows to change the minutes"', 'components.timeSelector.i18n.a11yTokens.rows.minuteColumnHelp.description'],
        ['<code>timeSelector.a11y.periodHelp</code>', '"Use the arrows to change AM/PM"', 'components.timeSelector.i18n.a11yTokens.rows.periodHelp.description'],
        ['<code>timeSelector.a11y.normalizedAlert</code>', '"Normalized time: {time}"', 'components.timeSelector.i18n.a11yTokens.rows.normalizedAlert.description'],
        ['<code>timeSelector.a11y.rangeInfo</code>', '"Valid range: {min} - {max}"', 'components.timeSelector.i18n.a11yTokens.rows.rangeInfo.description'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override de tokens del TimeSelector
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      timeSelector: {
        selectTime: 'Select time',
        clear: 'Clear',
        presets: { now: 'Now', noon: 'Noon', midnight: 'Midnight' },
        a11y: { timeSelectorLabel: 'Time selector' },
      },
    }),
  ],
};`,
      },
    ],
  },
];
