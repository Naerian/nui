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
          'var(--nui-surface-secondary)',
          'components.sidebar-panel.theming.colors.rows.bg.description',
        ],
        [
          '<code>--nui-sidebar-panel-text</code>',
          'var(--nui-on-surface-secondary)',
          'components.sidebar-panel.theming.colors.rows.text.description',
        ],
        [
          '<code>--nui-sidebar-panel-border</code>',
          'var(--nui-border-subtle)',
          'components.sidebar-panel.theming.colors.rows.border.description',
        ],
        [
          '<code>--nui-sidebar-panel-overlay-bg</code>',
          'var(--nui-overlay-bg)',
          'components.sidebar-panel.theming.colors.rows.overlayBg.description',
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
        ['<code>--nui-sidebar-panel-size-xs-width</code>', '320px', 'components.sidebar-panel.theming.layout.rows.sizeXsWidth.description'],
        ['<code>--nui-sidebar-panel-size-sm-width</code>', '400px', 'components.sidebar-panel.theming.layout.rows.sizeSmWidth.description'],
        ['<code>--nui-sidebar-panel-size-md-width</code>', '560px', 'components.sidebar-panel.theming.layout.rows.sizeMdWidth.description'],
        ['<code>--nui-sidebar-panel-size-lg-width</code>', '720px', 'components.sidebar-panel.theming.layout.rows.sizeLgWidth.description'],
        ['<code>--nui-sidebar-panel-size-xl-width</code>', '960px', 'components.sidebar-panel.theming.layout.rows.sizeXlWidth.description'],
        ['<code>--nui-sidebar-panel-size-full-width</code>', '100vw', 'components.sidebar-panel.theming.layout.rows.sizeFullWidth.description'],
        ['<code>--nui-sidebar-panel-header-padding</code>', '1.125rem', 'components.sidebar-panel.theming.layout.rows.headerPadding.description'],
        ['<code>--nui-sidebar-panel-content-padding</code>', '1.125rem', 'components.sidebar-panel.theming.layout.rows.contentPadding.description'],
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
        ['<code>--nui-sidebar-panel-title-size</code>', '1.125rem', 'components.sidebar-panel.theming.typography.rows.titleSize.description'],
        ['<code>--nui-sidebar-panel-title-weight</code>', '600', 'components.sidebar-panel.theming.typography.rows.titleWeight.description'],
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
          'var(--nui-box-shadow-md)',
          'components.sidebar-panel.theming.elevation.rows.shadow.description',
        ],
        [
          '<code>--nui-sidebar-panel-z-index</code>',
          'var(--nui-z-index-modal)',
          'components.sidebar-panel.theming.elevation.rows.zIndex.description',
        ],
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
          'var(--nui-surface-secondary)',
          'components.sidebar-panel.theming.scrollbar.rows.scrollBg.description',
        ],
        [
          '<code>--nui-sidebar-panel-scroll-thumb-bg</code>',
          'var(--nui-border-high)',
          'components.sidebar-panel.theming.scrollbar.rows.scrollThumbBg.description',
        ],
        [
          '<code>--nui-sidebar-panel-scroll-thumb-hover-bg</code>',
          'var(--nui-border-high)',
          'components.sidebar-panel.theming.scrollbar.rows.scrollThumbHoverBg.description',
        ],
      ],
    },
  },
];
