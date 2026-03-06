import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Avatar.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const AVATAR_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup — cómo proveer la config global
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.avatar.globalConfig.setup.title',
    description: 'components.avatar.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.avatar.globalConfig.setup.note',
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
        avatar: {
          color: 'secondary',
          size: 'lg',
          variant: 'outline',
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
    title: 'components.avatar.globalConfig.defaults.title',
    description: 'components.avatar.globalConfig.defaults.description',
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
          'components.avatar.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.avatar.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.avatar.globalConfig.defaults.rows.variant',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Cadena de prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.avatar.globalConfig.priority.title',
    description: 'components.avatar.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.avatar.globalConfig.priority.note',
    },
  },
];
