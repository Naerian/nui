import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Paginator
 * Variables CSS para personalizar la apariencia
 */
export const PAGINATOR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-layout',
    title: 'components.paginator.theming.layout.title',
    description: 'components.paginator.theming.layout.description',
    anchor: 'theming-layout',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-gap</code>',
          'components.paginator.theming.layout.rows.gap.description',
          '0.25rem',
        ],
        [
          '<code>--nui-pg-disabled-opacity</code>',
          'components.paginator.theming.layout.rows.disabledOpacity.description',
          '0.4',
        ],
        [
          '<code>--nui-pg-page-jump-input-width</code>',
          'components.paginator.theming.layout.rows.pageJumpInputWidth.description',
          '4rem',
        ],
      ],
    },
  },
  {
    id: 'theming-zindex',
    title: 'components.paginator.theming.zindex.title',
    description: 'components.paginator.theming.zindex.description',
    anchor: 'theming-zindex',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-z-index-base</code>',
          'components.paginator.theming.zindex.rows.base.description',
          '0',
        ],
        [
          '<code>--nui-pg-z-index-hover</code>',
          'components.paginator.theming.zindex.rows.hover.description',
          '1',
        ],
        [
          '<code>--nui-pg-z-index-active</code>',
          'components.paginator.theming.zindex.rows.active.description',
          '1',
        ],
        [
          '<code>--nui-pg-z-index-focus</code>',
          'components.paginator.theming.zindex.rows.focus.description',
          '2',
        ],
      ],
    },
  },
  {
    id: 'theming-inactive',
    title: 'components.paginator.theming.inactive.title',
    description: 'components.paginator.theming.inactive.description',
    anchor: 'theming-inactive',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-ghost-bg</code>',
          'components.paginator.theming.inactive.rows.ghostBg.description',
          'transparent',
        ],
        [
          '<code>--nui-pg-ghost-text</code>',
          'components.paginator.theming.inactive.rows.ghostText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-ghost-border</code>',
          'components.paginator.theming.inactive.rows.ghostBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-pg-ghost-hover-bg</code>',
          'components.paginator.theming.inactive.rows.ghostHoverBg.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-ghost-hover-border</code>',
          'components.paginator.theming.inactive.rows.ghostHoverBorder.description',
          'transparent',
        ],
      ],
    },
  },
  {
    id: 'theming-active',
    title: 'components.paginator.theming.active.title',
    description: 'components.paginator.theming.active.description',
    anchor: 'theming-active',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-solid-active-bg</code>',
          'components.paginator.theming.active.rows.solidActiveBg.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-solid-active-text</code>',
          'components.paginator.theming.active.rows.solidActiveText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-solid-active-border</code>',
          'components.paginator.theming.active.rows.solidActiveBorder.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-outline-active-bg</code>',
          'components.paginator.theming.active.rows.outlineActiveBg.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-outline-active-text</code>',
          'components.paginator.theming.active.rows.outlineActiveText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-outline-active-border</code>',
          'components.paginator.theming.active.rows.outlineActiveBorder.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-ghost-active-bg</code>',
          'components.paginator.theming.active.rows.ghostActiveBg.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-ghost-active-text</code>',
          'components.paginator.theming.active.rows.ghostActiveText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-ghost-active-border</code>',
          'components.paginator.theming.active.rows.ghostActiveBorder.description',
          'transparent',
        ],
      ],
    },
  },
  {
    id: 'theming-nav',
    title: 'components.paginator.theming.nav.title',
    description: 'components.paginator.theming.nav.description',
    anchor: 'theming-nav',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-nav-bg</code>',
          'components.paginator.theming.nav.rows.navBg.description',
          'transparent',
        ],
        [
          '<code>--nui-pg-nav-text</code>',
          'components.paginator.theming.nav.rows.navText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-nav-border</code>',
          'components.paginator.theming.nav.rows.navBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-pg-nav-hover-bg</code>',
          'components.paginator.theming.nav.rows.navHoverBg.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-nav-hover-text</code>',
          'components.paginator.theming.nav.rows.navHoverText.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-nav-hover-border</code>',
          'components.paginator.theming.nav.rows.navHoverBorder.description',
          'transparent',
        ],
      ],
    },
  },
  {
    id: 'theming-misc',
    title: 'components.paginator.theming.misc.title',
    description: 'components.paginator.theming.misc.description',
    anchor: 'theming-misc',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-ellipsis-color</code>',
          'components.paginator.theming.misc.rows.ellipsisColor.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-focus-ring</code>',
          'components.paginator.theming.misc.rows.focusRing.description',
          '{color}',
        ],
        [
          '<code>--nui-pg-jump-border</code>',
          'components.paginator.theming.misc.rows.jumpBorder.description',
          'var(--nui-border-subtle)',
        ],
        [
          '<code>--nui-pg-jump-separator</code>',
          'components.paginator.theming.misc.rows.jumpSeparator.description',
          'var(--nui-border-subtle)',
        ],
        [
          '<code>--nui-pg-jump-hover-bg</code>',
          'components.paginator.theming.misc.rows.jumpHoverBg.description',
          '{color}',
        ],
      ],
    },
  },
];
