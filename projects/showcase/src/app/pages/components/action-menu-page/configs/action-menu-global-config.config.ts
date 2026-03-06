import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Action Menu.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const ACTION_MENU_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup — cómo proveer la config global
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.actionMenu.globalConfig.setup.title',
    description: 'components.actionMenu.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.actionMenu.globalConfig.setup.note',
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
        actionMenu: {
          color: 'secondary',
          size: 'lg',
          variant: 'outline',
          offset: 8,
          offsetSubmenu: 12,
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
    title: 'components.actionMenu.globalConfig.defaults.title',
    description: 'components.actionMenu.globalConfig.defaults.description',
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
          'components.actionMenu.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.actionMenu.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.actionMenu.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>offset</code>',
          'number',
          '<code class="neutral">5</code>',
          'components.actionMenu.globalConfig.defaults.rows.offset',
        ],
        [
          '<code>offsetSubmenu</code>',
          'number',
          '<code class="neutral">10</code>',
          'components.actionMenu.globalConfig.defaults.rows.offsetSubmenu',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Cadena de prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.actionMenu.globalConfig.priority.title',
    description: 'components.actionMenu.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.actionMenu.globalConfig.priority.note',
    },
  },
];
