import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente SplitButton.
 */
export const SPLIT_BUTTON_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ── 1. SETUP ──────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.splitButton.globalConfig.setup.title',
    description: 'components.splitButton.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.splitButton.globalConfig.setup.note',
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
        splitButton: {
          color:        'secondary',
          size:         'lg',
          variant:      'outline',
          shape:        'pill',
          raised:       false,
          width:        'auto',
          triggerIcon:  'ri-arrow-down-s-line',
          offset:       4,
          offsetSubmenu: 4,
        },
      },
    }),
  ],
};`,
      },
    ],
  },

  // ── 2. DEFAULTS ───────────────────────────────────────────────────────────
  {
    id: 'global-config-defaults',
    title: 'components.splitButton.globalConfig.defaults.title',
    description: 'components.splitButton.globalConfig.defaults.description',
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
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'components.splitButton.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.splitButton.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.splitButton.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>shape</code>',
          'NUIShape',
          '<code class="neutral">rounded</code>',
          'components.splitButton.globalConfig.defaults.rows.shape',
        ],
        [
          '<code>raised</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.splitButton.globalConfig.defaults.rows.raised',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'components.splitButton.globalConfig.defaults.rows.width',
        ],
        [
          '<code>triggerIcon</code>',
          'string',
          '<code class="neutral">ri-arrow-down-s-line</code>',
          'components.splitButton.globalConfig.defaults.rows.triggerIcon',
        ],
        [
          '<code>offset</code>',
          'number',
          '<code class="neutral">4</code>',
          'components.splitButton.globalConfig.defaults.rows.offset',
        ],
        [
          '<code>offsetSubmenu</code>',
          'number',
          '<code class="neutral">4</code>',
          'components.splitButton.globalConfig.defaults.rows.offsetSubmenu',
        ],
      ],
    },
  },

  // ── 3. PRIORITY ───────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.splitButton.globalConfig.priority.title',
    description: 'components.splitButton.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.splitButton.globalConfig.priority.note',
    },
  },
];
