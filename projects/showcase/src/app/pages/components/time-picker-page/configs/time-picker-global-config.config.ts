import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente TimePicker.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const TIME_PICKER_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.timePicker.globalConfig.setup.title',
    description: 'components.timePicker.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.timePicker.globalConfig.setup.note',
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
        timePicker: {
          showHeader: true,
          defaultStrategy: 'smart',
          smartOffset: 15,
          hourStep: 1,
          minuteStep: 15,
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
    title: 'components.timePicker.globalConfig.defaults.title',
    description: 'components.timePicker.globalConfig.defaults.description',
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
          '<code>showHeader</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.timePicker.globalConfig.defaults.rows.showHeader',
        ],
        [
          '<code>defaultStrategy</code>',
          'TimePickerStrategy',
          '<code class="neutral">empty</code>',
          'components.timePicker.globalConfig.defaults.rows.defaultStrategy',
        ],
        [
          '<code>smartOffset</code>',
          'number',
          '<code class="neutral">30</code>',
          'components.timePicker.globalConfig.defaults.rows.smartOffset',
        ],
        [
          '<code>hourStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timePicker.globalConfig.defaults.rows.hourStep',
        ],
        [
          '<code>minuteStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timePicker.globalConfig.defaults.rows.minuteStep',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.timePicker.globalConfig.priority.title',
    description: 'components.timePicker.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.timePicker.globalConfig.priority.note',
    },
  },
];
