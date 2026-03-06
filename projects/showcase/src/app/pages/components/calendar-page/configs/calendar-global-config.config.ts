import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Calendar.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const CALENDAR_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.calendar.globalConfig.setup.title',
    description: 'components.calendar.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.calendar.globalConfig.setup.note',
    },
    examples: [
      {
        title: 'codeExamples.configuration',
        language: 'typescript',
        code: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        calendar: {
          firstDayOfWeek: 0,        // 0 = Sunday
          closeOnSelect: false,
          showTodayButton: false,
          showTimePicker: 'inline',
          timePickerMode: 'hour-minute-24',
        },
      },
    }),
  ],
};`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Propiedades configurables y sus defaults
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-defaults',
    title: 'components.calendar.globalConfig.defaults.title',
    description: 'components.calendar.globalConfig.defaults.description',
    anchor: 'global-config-defaults',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>firstDayOfWeek</code>',
          'FirstDayOfWeek',
          '<code class="neutral">1</code>',
          'components.calendar.globalConfig.defaults.rows.firstDayOfWeek',
        ],
        [
          '<code>closeOnSelect</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.calendar.globalConfig.defaults.rows.closeOnSelect',
        ],
        [
          '<code>showTodayButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.calendar.globalConfig.defaults.rows.showTodayButton',
        ],
        [
          '<code>showTimePicker</code>',
          'CalendarTimePickerMode',
          '<code class="neutral">none</code>',
          'components.calendar.globalConfig.defaults.rows.showTimePicker',
        ],
        [
          '<code>timePickerMode</code>',
          'TimePickerMode',
          '<code class="neutral">hour-minute-24</code>',
          'components.calendar.globalConfig.defaults.rows.timePickerMode',
        ],
        [
          '<code>timePickerConfig</code>',
          'TimePickerConfig | undefined',
          '<code class="neutral">undefined</code>',
          'components.calendar.globalConfig.defaults.rows.timePickerConfig',
        ],
        [
          '<code>customPresets</code>',
          'CalendarPreset[] | undefined',
          '<code class="neutral">undefined</code>',
          'components.calendar.globalConfig.defaults.rows.customPresets',
        ],
        [
          '<code>defaultDate</code>',
          'Date | null',
          '<code class="neutral">null</code>',
          'components.calendar.globalConfig.defaults.rows.defaultDate',
        ],
        [
          '<code>startTime</code>',
          'Date | null',
          '<code class="neutral">null</code>',
          'components.calendar.globalConfig.defaults.rows.startTime',
        ],
        [
          '<code>endTime</code>',
          'Date | null',
          '<code class="neutral">null</code>',
          'components.calendar.globalConfig.defaults.rows.endTime',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.calendar.globalConfig.priority.title',
    description: 'components.calendar.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.calendar.globalConfig.priority.note',
    },
  },
];
