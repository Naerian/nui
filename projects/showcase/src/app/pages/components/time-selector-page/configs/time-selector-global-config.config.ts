import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente TimeSelector.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const TIME_SELECTOR_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.timeSelector.globalConfig.setup.title',
    description: 'components.timeSelector.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.timeSelector.globalConfig.setup.note',
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
        timeSelector: {
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
    title: 'components.timeSelector.globalConfig.defaults.title',
    description: 'components.timeSelector.globalConfig.defaults.description',
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
          'components.timeSelector.globalConfig.defaults.rows.showHeader',
        ],
        [
          '<code>defaultStrategy</code>',
          'TimeSelectorStrategy',
          '<code class="neutral">empty</code>',
          'components.timeSelector.globalConfig.defaults.rows.defaultStrategy',
        ],
        [
          '<code>smartOffset</code>',
          'number',
          '<code class="neutral">30</code>',
          'components.timeSelector.globalConfig.defaults.rows.smartOffset',
        ],
        [
          '<code>hourStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timeSelector.globalConfig.defaults.rows.hourStep',
        ],
        [
          '<code>minuteStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timeSelector.globalConfig.defaults.rows.minuteStep',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.timeSelector.globalConfig.priority.title',
    description: 'components.timeSelector.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.timeSelector.globalConfig.priority.note',
    },
  },
];
