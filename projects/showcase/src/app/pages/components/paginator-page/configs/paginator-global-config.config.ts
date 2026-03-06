import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Paginator.
 * Documenta el sistema de configuración global a través de NUI_CONFIG / provideNUI().
 */
export const PAGINATOR_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Setup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-setup',
    title: 'components.paginator.globalConfig.setup.title',
    description: 'components.paginator.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.paginator.globalConfig.setup.note',
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
        paginator: {
          color: 'secondary',
          size: 'sm',
          variant: 'outline',
          maxVisiblePages: 5,
          showFirstLast: true,
          showPageSizeSelector: true,
          showItemRange: true,
          pageSizeOptions: [10, 20, 50],
          autoScroll: true,
          navDisplay: 'both',
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
    title: 'components.paginator.globalConfig.defaults.title',
    description: 'components.paginator.globalConfig.defaults.description',
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
          'components.paginator.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.paginator.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.paginator.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>maxVisiblePages</code>',
          'number',
          '<code class="neutral">7</code>',
          'components.paginator.globalConfig.defaults.rows.maxVisiblePages',
        ],
        [
          '<code>showFirstLast</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.globalConfig.defaults.rows.showFirstLast',
        ],
        [
          '<code>showPageSizeSelector</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.globalConfig.defaults.rows.showPageSizeSelector',
        ],
        [
          '<code>showItemRange</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.globalConfig.defaults.rows.showItemRange',
        ],
        [
          '<code>showPageJump</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.globalConfig.defaults.rows.showPageJump',
        ],
        [
          '<code>pageSizeOptions</code>',
          'number[]',
          '<code class="neutral">[10, 25, 50, 100]</code>',
          'components.paginator.globalConfig.defaults.rows.pageSizeOptions',
        ],
        [
          '<code>autoScroll</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.globalConfig.defaults.rows.autoScroll',
        ],

        [
          '<code>navDisplay</code>',
          "PaginatorNavDisplay",
          '<code class="neutral">icon</code>',
          'components.paginator.globalConfig.defaults.rows.navDisplay',
        ],
        [
          '<code>navIcons</code>',
          'Partial&lt;PaginatorIcons&gt;',
          '<code class="neutral">DEFAULT_ICON_CONFIG</code>',
          'components.paginator.globalConfig.defaults.rows.navIcons',
        ],
        [
          '<code>keyboard</code>',
          'Partial&lt;KeyboardConfig&gt;',
          '<code class="neutral">DEFAULT_KEYBOARD_CONFIG</code>',
          'components.paginator.globalConfig.defaults.rows.keyboard',
        ],
        [
          '<code>loading</code>',
          'Partial&lt;LoadingConfig&gt;',
          '<code class="neutral">{ showLoading: false, ... }</code>',
          'components.paginator.globalConfig.defaults.rows.loading',
        ],
        [
          '<code>infinite</code>',
          'Partial&lt;InfiniteConfig&gt;',
          '<code class="neutral">{ enabled: false, ... }</code>',
          'components.paginator.globalConfig.defaults.rows.infinite',
        ],
        [
          '<code>layout</code>',
          'Partial&lt;PaginatorLayout&gt;',
          '<code class="neutral">{ center: [\'prevButton\', ...], ... }</code>',
          'components.paginator.globalConfig.defaults.rows.layout',
        ],
        [
          '<code>mobileLayout</code>',
          'Partial&lt;PaginatorLayout&gt;',
          '<code class="neutral">{ center: [\'fractionalNumbers\', ...], ... }</code>',
          'components.paginator.globalConfig.defaults.rows.mobileLayout',
        ],
        [
          '<code>infiniteLayout</code>',
          'Partial&lt;PaginatorLayout&gt;',
          '<code class="neutral">{ center: [\'infiniteButton\', ...], ... }</code>',
          'components.paginator.globalConfig.defaults.rows.infiniteLayout',
        ],
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Prioridad de resolución
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'global-config-priority',
    title: 'components.paginator.globalConfig.priority.title',
    description: 'components.paginator.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.paginator.globalConfig.priority.note',
    },
  },
];
