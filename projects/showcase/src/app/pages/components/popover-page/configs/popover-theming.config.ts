import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la sección Theming del componente Popover
 */
export const POPOVER_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-spacing',
    title: 'components.popover.theming.spacing.title',
    description: 'components.popover.theming.spacing.description',
    anchor: 'theming-spacing',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-padding</code>',
          '1rem',
          'components.popover.theming.spacing.rows.padding',
        ],
        [
          '<code>--nui-popover-max-width</code>',
          '20rem',
          'components.popover.theming.spacing.rows.maxWidth',
        ],
        [
          '<code>--nui-popover-min-width</code>',
          '5rem',
          'components.popover.theming.spacing.rows.minWidth',
        ],
        [
          '<code>--nui-popover-arrow-size</code>',
          '0.5rem',
          'components.popover.theming.spacing.rows.arrowSize',
        ],
        [
          '<code>--nui-popover-distance</code>',
          '0.313rem',
          'components.popover.theming.spacing.rows.distance',
        ],
      ],
    },
  },
  {
    id: 'theming-typography',
    title: 'components.popover.theming.typography.title',
    description: 'components.popover.theming.typography.description',
    anchor: 'theming-typography',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-font-size</code>',
          'var(--nui-font-size-sm)',
          'components.popover.theming.typography.rows.fontSize',
        ],
        [
          '<code>--nui-popover-font-weight</code>',
          'var(--nui-font-weight-regular)',
          'components.popover.theming.typography.rows.fontWeight',
        ],
        [
          '<code>--nui-popover-line-height</code>',
          'var(--nui-line-height-md)',
          'components.popover.theming.typography.rows.lineHeight',
        ],
      ],
    },
  },
  {
    id: 'theming-borders',
    title: 'components.popover.theming.borders.title',
    description: 'components.popover.theming.borders.description',
    anchor: 'theming-borders',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-border-width</code>',
          '1px',
          'components.popover.theming.borders.rows.borderWidth',
        ],
        [
          '<code>--nui-popover-border-radius</code>',
          'var(--nui-border-radius-sm)',
          'components.popover.theming.borders.rows.borderRadius',
        ],
      ],
    },
  },
  {
    id: 'theming-shadow',
    title: 'components.popover.theming.shadow.title',
    description: 'components.popover.theming.shadow.description',
    anchor: 'theming-shadow',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-shadow</code>',
          'var(--nui-shadow-elevated)',
          'components.popover.theming.shadow.rows.shadow',
        ],
      ],
    },
  },
  {
    id: 'theming-zindex',
    title: 'components.popover.theming.zindex.title',
    description: 'components.popover.theming.zindex.description',
    anchor: 'theming-zindex',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-z-index</code>',
          'var(--nui-z-index-popout)',
          'components.popover.theming.zindex.rows.zIndex',
        ],
      ],
    },
  },
  {
    id: 'theming-animation',
    title: 'components.popover.theming.animation.title',
    description: 'components.popover.theming.animation.description',
    anchor: 'theming-animation',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-popover-transition-duration</code>',
          '200ms',
          'components.popover.theming.animation.rows.transitionDuration',
        ],
        [
          '<code>--nui-popover-transition-timing</code>',
          'cubic-bezier(0.4, 0, 0.2, 1)',
          'components.popover.theming.animation.rows.transitionTiming',
        ],
      ],
    },
  },
];
