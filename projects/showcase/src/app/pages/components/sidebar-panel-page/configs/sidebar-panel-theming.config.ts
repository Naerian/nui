import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la sección de theming del Sidebar Panel
 */
export const SIDEBAR_PANEL_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.sidebar-panel.theming.colors.title',
    description: 'components.sidebar-panel.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-sidebar-panel-bg</code>',
          'var(--nui-bg-secondary) / var(--nui-bg-primary)',
          'Panel background color (dynamic based on theme)',
        ],
        ['<code>--nui-sidebar-panel-text</code>', 'var(--nui-text-primary)', 'Panel text color'],
        [
          '<code>--nui-sidebar-panel-border</code>',
          'var(--nui-border-primary) / var(--nui-border-secondary)',
          'Panel border color (dynamic based on theme)',
        ],
        [
          '<code>--nui-sidebar-panel-overlay-bg</code>',
          'var(--nui-overlay-bg)',
          'Backdrop overlay background',
        ],
      ],
    },
  },
  {
    id: 'theming-layout',
    title: 'components.sidebar-panel.theming.layout.title',
    description: 'components.sidebar-panel.theming.layout.description',
    anchor: 'theming-layout',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-sidebar-panel-size-xs-width</code>', '320px', 'Extra small panel width'],
        ['<code>--nui-sidebar-panel-size-sm-width</code>', '400px', 'Small panel width'],
        ['<code>--nui-sidebar-panel-size-md-width</code>', '600px', 'Medium panel width (default)'],
        ['<code>--nui-sidebar-panel-size-lg-width</code>', '800px', 'Large panel width'],
        ['<code>--nui-sidebar-panel-size-xl-width</code>', '1000px', 'Extra large panel width'],
        ['<code>--nui-sidebar-panel-size-full-width</code>', '100vw', 'Full width panel'],
        ['<code>--nui-sidebar-panel-header-padding</code>', '1.125rem', 'Header padding (18px)'],
        ['<code>--nui-sidebar-panel-content-padding</code>', '1.125rem', 'Content padding (18px)'],
      ],
    },
  },
  {
    id: 'theming-typography',
    title: 'components.sidebar-panel.theming.typography.title',
    description: 'components.sidebar-panel.theming.typography.description',
    anchor: 'theming-typography',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-sidebar-panel-title-size</code>', '1.125rem', 'Panel title font size (18px)'],
        ['<code>--nui-sidebar-panel-title-weight</code>', '600', 'Panel title font weight'],
      ],
    },
  },
  {
    id: 'theming-elevation',
    title: 'components.sidebar-panel.theming.elevation.title',
    description: 'components.sidebar-panel.theming.elevation.description',
    anchor: 'theming-elevation',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-sidebar-panel-shadow</code>',
          'var(--nui-box-shadow-xl)',
          'Panel shadow for elevation',
        ],
        ['<code>--nui-sidebar-panel-z-index</code>', '1040', 'Panel z-index'],
        ['<code>--nui-sidebar-panel-overlay-z-index</code>', '1039', 'Backdrop overlay z-index'],
      ],
    },
  },
  {
    id: 'theming-scrollbar',
    title: 'components.sidebar-panel.theming.scrollbar.title',
    description: 'components.sidebar-panel.theming.scrollbar.description',
    anchor: 'theming-scrollbar',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-sidebar-panel-scroll-bg</code>',
          'var(--nui-bg-secondary)',
          'Scrollbar track background',
        ],
        [
          '<code>--nui-sidebar-panel-scroll-thumb-bg</code>',
          'var(--nui-border-primary)',
          'Scrollbar thumb background',
        ],
        [
          '<code>--nui-sidebar-panel-scroll-thumb-hover-bg</code>',
          'var(--nui-border-primary)',
          'Scrollbar thumb hover background',
        ],
      ],
    },
  },
];
