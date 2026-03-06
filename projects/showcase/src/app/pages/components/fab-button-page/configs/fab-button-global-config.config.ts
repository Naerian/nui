import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente FabButton.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const FAB_BUTTON_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.fabButton.globalConfig.setup.title',
    description: 'components.fabButton.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.fabButton.globalConfig.setup.note',
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
        fabButton: {
          color: 'secondary',
          size: 'lg',
          direction: 'right',
          layout: 'linear',
          animation: 'fade',
          backdrop: true,
          closeOnItemClick: true,
          closeOnOutsideClick: true,
          closeOnEsc: true,
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
    title: 'components.fabButton.globalConfig.defaults.title',
    description: 'components.fabButton.globalConfig.defaults.description',
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
          'components.fabButton.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.fabButton.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.fabButton.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>direction</code>',
          'FabButtonDirection',
          '<code class="neutral">up</code>',
          'components.fabButton.globalConfig.defaults.rows.direction',
        ],
        [
          '<code>animation</code>',
          'FabButtonAnimation',
          '<code class="neutral">scale</code>',
          'components.fabButton.globalConfig.defaults.rows.animation',
        ],
        [
          '<code>layout</code>',
          'FabButtonLayoutType',
          '<code class="neutral">linear</code>',
          'components.fabButton.globalConfig.defaults.rows.layout',
        ],
        [
          '<code>shape</code>',
          'FabButtonShape',
          '<code class="neutral">circular</code>',
          'components.fabButton.globalConfig.defaults.rows.shape',
        ],
        [
          '<code>radius</code>',
          'string',
          '<code class="neutral">4rem</code>',
          'components.fabButton.globalConfig.defaults.rows.radius',
        ],
        [
          '<code>spacing</code>',
          'string',
          '<code class="neutral">3.5rem</code>',
          'components.fabButton.globalConfig.defaults.rows.spacing',
        ],
        [
          '<code>itemDisplay</code>',
          'FabButtonItemDisplay',
          '<code class="neutral">icon</code>',
          'components.fabButton.globalConfig.defaults.rows.itemDisplay',
        ],
        [
          '<code>backdrop</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.fabButton.globalConfig.defaults.rows.backdrop',
        ],
        [
          '<code>openOn</code>',
          "'click' | 'hover'",
          '<code class="neutral">click</code>',
          'components.fabButton.globalConfig.defaults.rows.openOn',
        ],
        [
          '<code>closeOnItemClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.fabButton.globalConfig.defaults.rows.closeOnItemClick',
        ],
        [
          '<code>closeOnOutsideClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.fabButton.globalConfig.defaults.rows.closeOnOutsideClick',
        ],
        [
          '<code>closeOnEsc</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.fabButton.globalConfig.defaults.rows.closeOnEsc',
        ],
        [
          '<code>closeOnScroll</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.fabButton.globalConfig.defaults.rows.closeOnScroll',
        ],
        [
          '<code>triggerIconOpen</code>',
          'string',
          '<code class="neutral">""</code>',
          'components.fabButton.globalConfig.defaults.rows.triggerIconOpen',
        ],
        [
          '<code>triggerLabel</code>',
          'string',
          '<code class="neutral">""</code>',
          'components.fabButton.globalConfig.defaults.rows.triggerLabel',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.fabButton.globalConfig.priority.title',
    description: 'components.fabButton.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.fabButton.globalConfig.priority.note',
    },
  },
];
