import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Popover.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const POPOVER_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.popover.globalConfig.setup.title',
    description: 'components.popover.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.popover.globalConfig.setup.note',
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
        popover: {
          position: 'bottom',
          event: 'hover',
          showDelay: 150,
          hideDelay: 100,
          showArrow: false,
          closeOnClickOutside: true,
          closeOnEscape: true,
          maxWidth: '320px',
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
    title: 'components.popover.globalConfig.defaults.title',
    description: 'components.popover.globalConfig.defaults.description',
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
          '<code>position</code>',
          'PopoverPosition',
          '<code class="neutral">top</code>',
          'components.popover.globalConfig.defaults.rows.position',
        ],
        [
          '<code>event</code>',
          'PopoverEvent',
          '<code class="neutral">click</code>',
          'components.popover.globalConfig.defaults.rows.event',
        ],
        [
          '<code>showDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.popover.globalConfig.defaults.rows.showDelay',
        ],
        [
          '<code>hideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.popover.globalConfig.defaults.rows.hideDelay',
        ],
        [
          '<code>showArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.globalConfig.defaults.rows.showArrow',
        ],
        [
          '<code>closeOnClickOutside</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.globalConfig.defaults.rows.closeOnClickOutside',
        ],
        [
          '<code>closeOnEscape</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.globalConfig.defaults.rows.closeOnEscape',
        ],
        [
          '<code>maxWidth</code>',
          'string',
          '<code class="neutral">auto</code>',
          'components.popover.globalConfig.defaults.rows.maxWidth',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.popover.globalConfig.priority.title',
    description: 'components.popover.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.popover.globalConfig.priority.note',
    },
  },
];
