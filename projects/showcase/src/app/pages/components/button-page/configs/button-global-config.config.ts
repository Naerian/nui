import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Button.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const BUTTON_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup — cómo proveer la config global
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.button.globalConfig.setup.title',
    description: 'components.button.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.button.globalConfig.setup.note',
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
        button: {
          color: 'secondary',
          size: 'lg',
          variant: 'outline',
          shape: 'pill',
          raised: false,
        },
      },
    }),
  ],
};`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Propiedades configurables y sus defaults de librería
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-defaults',
    title: 'components.button.globalConfig.defaults.title',
    description: 'components.button.globalConfig.defaults.description',
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
          'components.button.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.button.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.button.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>shape</code>',
          'NUIShape',
          '<code class="neutral">rounded</code>',
          'components.button.globalConfig.defaults.rows.shape',
        ],
        [
          '<code>raised</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.button.globalConfig.defaults.rows.raised',
        ],
        [
          '<code>width</code>',
          'ButtonWidth',
          '<code class="neutral">auto</code>',
          'components.button.globalConfig.defaults.rows.width',
        ],
        [
          '<code>type</code>',
          'ButtonType',
          '<code class="neutral">button</code>',
          'components.button.globalConfig.defaults.rows.type',
        ],
        [
          '<code>loadingPosition</code>',
          'ButtonLoadingPosition',
          '<code class="neutral">start</code>',
          'components.button.globalConfig.defaults.rows.loadingPosition',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Cadena de prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.button.globalConfig.priority.title',
    description: 'components.button.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.button.globalConfig.priority.note',
    },
  },
];
