import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Internacionalización del componente Time Picker.
 *
 * El TimePicker inyecta NuiI18nService para construir todas las etiquetas
 * visibles y accesibles a través del sub-objeto `timePicker.*`.
 *
 * Los tokens se organizan en los siguientes grupos funcionales:
 *  - Principales (selector de hora, limpiar, normalización, rango)
 *  - Duration (cuando el componente se usa en modo duración)
 *  - Tabs (selector/presets)
 *  - Presets (accesos rápidos: ahora, mediodía, medianoche, duraciones)
 *  - A11y (sub-objeto `timePicker.a11y.*` sólo para lectores de pantalla)
 */
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
        ['<code>timePicker.setToCurrentTime</code>', '"Actual"', 'components.timePicker.i18n.tokens.rows.setToCurrentTime.description'],
        ['<code>timePicker.selectTime</code>', '"Seleccionar hora"', 'components.timePicker.i18n.tokens.rows.selectTime.description'],
        ['<code>timePicker.clear</code>', '"Limpiar"', 'components.timePicker.i18n.tokens.rows.clear.description'],
        ['<code>timePicker.hour</code>', '"Hora"', 'components.timePicker.i18n.tokens.rows.hour.description'],
        ['<code>timePicker.minutes</code>', '"Minutos"', 'components.timePicker.i18n.tokens.rows.minutes.description'],
        ['<code>timePicker.hour12</code>', '"Hora (1-12)"', 'components.timePicker.i18n.tokens.rows.hour12.description'],
        ['<code>timePicker.hour24</code>', '"Hora (0-23)"', 'components.timePicker.i18n.tokens.rows.hour24.description'],
        ['<code>timePicker.period</code>', '"Periodo (AM/PM)"', 'components.timePicker.i18n.tokens.rows.period.description'],
        ['<code>timePicker.normalizedTime</code>', '"Tiempo normalizado..."', 'components.timePicker.i18n.tokens.rows.normalizedTime.description'],
        ['<code>timePicker.rangeLabel</code>', '"Rango permitido"', 'components.timePicker.i18n.tokens.rows.rangeLabel.description'],
        ['<code>timePicker.timeSelected</code>', '"Hora seleccionada"', 'components.timePicker.i18n.tokens.rows.timeSelected.description'],
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
        ['<code>timePicker.duration.hours</code>', '"Horas"', 'components.timePicker.i18n.durationAndPresets.rows.durationHours.description'],
        ['<code>timePicker.duration.minutes</code>', '"Minutos"', 'components.timePicker.i18n.durationAndPresets.rows.durationMinutes.description'],
        ['<code>timePicker.duration.seconds</code>', '"Segundos"', 'components.timePicker.i18n.durationAndPresets.rows.durationSeconds.description'],
        ['<code>timePicker.duration.hoursShort</code>', '"h"', 'components.timePicker.i18n.durationAndPresets.rows.hoursShort.description'],
        ['<code>timePicker.duration.minutesShort</code>', '"m"', 'components.timePicker.i18n.durationAndPresets.rows.minutesShort.description'],
        ['<code>timePicker.duration.secondsShort</code>', '"s"', 'components.timePicker.i18n.durationAndPresets.rows.secondsShort.description'],
        ['<code>timePicker.duration.selectDuration</code>', '"Seleccionar duraci\u00f3n"', 'components.timePicker.i18n.durationAndPresets.rows.selectDuration.description'],
        ['<code>timePicker.duration.durationSelected</code>', '"Duraci\u00f3n seleccionada"', 'components.timePicker.i18n.durationAndPresets.rows.durationSelected.description'],
        ['<code>timePicker.tabs.selector</code>', '"Selector"', 'components.timePicker.i18n.durationAndPresets.rows.tabSelector.description'],
        ['<code>timePicker.tabs.presets</code>', '"Acc. r\u00e1pidos"', 'components.timePicker.i18n.durationAndPresets.rows.tabPresets.description'],
        ['<code>timePicker.presets.now</code>', '"Ahora"', 'components.timePicker.i18n.durationAndPresets.rows.presetsNow.description'],
        ['<code>timePicker.presets.noon</code>', '"Mediod\u00eda"', 'components.timePicker.i18n.durationAndPresets.rows.presetsNoon.description'],
        ['<code>timePicker.presets.midnight</code>', '"Medianoche"', 'components.timePicker.i18n.durationAndPresets.rows.presetsMidnight.description'],
        ['<code>timePicker.presets.minutes</code>', '"{{value}} min"', 'components.timePicker.i18n.durationAndPresets.rows.presetsMinutes.description'],
        ['<code>timePicker.presets.hour</code>', '"{{value}} hora"', 'components.timePicker.i18n.durationAndPresets.rows.presetsHour.description'],
        ['<code>timePicker.presets.hours</code>', '"{{value}} horas"', 'components.timePicker.i18n.durationAndPresets.rows.presetsHours.description'],
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
        ['<code>timePicker.a11y.timePickerLabel</code>', '"Selector de hora"', 'components.timePicker.i18n.a11yTokens.rows.timePickerLabel.description'],
        ['<code>timePicker.a11y.durationPickerLabel</code>', '"Selector de duraci\u00f3n"', 'components.timePicker.i18n.a11yTokens.rows.durationPickerLabel.description'],
        ['<code>timePicker.a11y.hourColumnHelp</code>', '"Usa las flechas para cambiar la hora"', 'components.timePicker.i18n.a11yTokens.rows.hourColumnHelp.description'],
        ['<code>timePicker.a11y.minuteColumnHelp</code>', '"Usa las flechas para cambiar los minutos"', 'components.timePicker.i18n.a11yTokens.rows.minuteColumnHelp.description'],
        ['<code>timePicker.a11y.periodHelp</code>', '"Usa las flechas para cambiar AM/PM"', 'components.timePicker.i18n.a11yTokens.rows.periodHelp.description'],
        ['<code>timePicker.a11y.normalizedAlert</code>', '"Hora normalizada: {time}"', 'components.timePicker.i18n.a11yTokens.rows.normalizedAlert.description'],
        ['<code>timePicker.a11y.rangeInfo</code>', '"Rango v\u00e1lido: {min} - {max}"', 'components.timePicker.i18n.a11yTokens.rows.rangeInfo.description'],
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
