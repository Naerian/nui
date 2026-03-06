import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Tooltip.
 */
export const TOOLTIP_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-setup',
    title: 'components.tooltip.globalConfig.setup.title',
    description: 'components.tooltip.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.tooltip.globalConfig.setup.note',
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
        tooltip: {
          position: 'bottom',
          event: 'hover',
          showDelay: 200,
          hideDelay: 100,
          showArrow: false,
          allowHtml: true,
          interactive: false,
        },
      },
    }),
  ],
};`,
      },
    ],
  },
  {
    id: 'global-config-defaults',
    title: 'components.tooltip.globalConfig.defaults.title',
    description: 'components.tooltip.globalConfig.defaults.description',
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
          "'top' | 'bottom' | 'left' | 'right'",
          '<code class="neutral">top</code>',
          'components.tooltip.globalConfig.defaults.rows.position',
        ],
        [
          '<code>event</code>',
          "'hover' | 'click' | 'focus' | 'manual'",
          '<code class="neutral">hover</code>',
          'components.tooltip.globalConfig.defaults.rows.event',
        ],
        [
          '<code>showDelay</code>',
          'number',
          '<code class="neutral">300</code>',
          'components.tooltip.globalConfig.defaults.rows.showDelay',
        ],
        [
          '<code>hideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.tooltip.globalConfig.defaults.rows.hideDelay',
        ],
        [
          '<code>showArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.tooltip.globalConfig.defaults.rows.showArrow',
        ],
        [
          '<code>allowHtml</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.tooltip.globalConfig.defaults.rows.allowHtml',
        ],
        [
          '<code>interactive</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.tooltip.globalConfig.defaults.rows.interactive',
        ],
      ],
    },
  },
  {
    id: 'global-config-priority',
    title: 'components.tooltip.globalConfig.priority.title',
    description: 'components.tooltip.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.tooltip.globalConfig.priority.note',
    },
  },
];
