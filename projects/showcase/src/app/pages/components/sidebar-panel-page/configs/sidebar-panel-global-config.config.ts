import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente SidebarPanel.
 */
export const SIDEBAR_PANEL_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-setup',
    title: 'components.sidebar-panel.globalConfig.setup.title',
    description: 'components.sidebar-panel.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.globalConfig.setup.note',
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
        sidebarPanel: {
          position: 'left',
          size: 'lg',
          hasBackdrop: true,
          closeOnEscape: true,
          closeOnBackdropClick: true,
          mobileFullScreen: true,
          animationDuration: 300,
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
    title: 'components.sidebar-panel.globalConfig.defaults.title',
    description: 'components.sidebar-panel.globalConfig.defaults.description',
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
          "'left' | 'right' | 'top' | 'bottom'",
          '<code class="neutral">right</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.position',
        ],
        [
          '<code>size</code>',
          "NUISize | 'full'",
          '<code class="neutral">md</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.size',
        ],
        [
          '<code>showHeader</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.showHeader',
        ],
        [
          '<code>showCloseButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.showCloseButton',
        ],
        [
          '<code>hasBackdrop</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.hasBackdrop',
        ],
        [
          '<code>closeOnBackdropClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.closeOnBackdropClick',
        ],
        [
          '<code>closeOnEscape</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.closeOnEscape',
        ],
        [
          '<code>closeOnRouteChange</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.closeOnRouteChange',
        ],
        [
          '<code>autoFocus</code>',
          'boolean | string',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.autoFocus',
        ],
        [
          '<code>mobileFullScreen</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.mobileFullScreen',
        ],
        [
          '<code>scrollStrategy</code>',
          "'block' | 'reposition' | 'close'",
          '<code class="neutral">block</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.scrollStrategy',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">Slide Panel</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.ariaLabel',
        ],
        [
          '<code>animationDuration</code>',
          'number',
          '<code class="neutral">225</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.animationDuration',
        ],
        [
          '<code>minimizable</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.minimizable',
        ],
        [
          '<code>allowMultiple</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.allowMultiple',
        ],
        [
          '<code>lazyLoad</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.sidebar-panel.globalConfig.defaults.rows.lazyLoad',
        ],
      ],
    },
  },
  {
    id: 'global-config-priority',
    title: 'components.sidebar-panel.globalConfig.priority.title',
    description: 'components.sidebar-panel.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.globalConfig.priority.note',
    },
  },
];
