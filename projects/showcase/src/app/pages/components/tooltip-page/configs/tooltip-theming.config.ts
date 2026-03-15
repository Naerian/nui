import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de theming del Tooltip
 */
export const TOOLTIP_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-container',
    title: 'components.tooltip.theming.container.title',
    description: 'components.tooltip.theming.container.description',
    anchor: 'theming-container',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-tooltip-bg</code>',
          'var(--nui-gray-900)',
          'components.tooltip.theming.container.rows.bg.description',
        ],
        [
          '<code>--nui-tooltip-text</code>',
          '#ffffff',
          'components.tooltip.theming.container.rows.text.description',
        ],
        [
          '<code>--nui-tooltip-padding-y</code>',
          '0.25rem',
          'components.tooltip.theming.container.rows.paddingY.description',
        ],
        [
          '<code>--nui-tooltip-padding-x</code>',
          '0.75rem',
          'components.tooltip.theming.container.rows.paddingX.description',
        ],
        [
          '<code>--nui-tooltip-max-width</code>',
          '14rem',
          'components.tooltip.theming.container.rows.maxWidth.description',
        ],
        [
          '<code>--nui-tooltip-font-size</code>',
          'var(--nui-font-size-xs)',
          'components.tooltip.theming.container.rows.fontSize.description',
        ],
        [
          '<code>--nui-tooltip-font-weight</code>',
          'var(--nui-font-weight-medium)',
          'components.tooltip.theming.container.rows.fontWeight.description',
        ],
        [
          '<code>--nui-tooltip-line-height</code>',
          '1.3',
          'components.tooltip.theming.container.rows.lineHeight.description',
        ],
        [
          '<code>--nui-tooltip-border-radius</code>',
          'var(--nui-border-radius-sm)',
          'components.tooltip.theming.container.rows.borderRadius.description',
        ],
        [
          '<code>--nui-tooltip-border-width</code>',
          '1px',
          'components.tooltip.theming.container.rows.borderWidth.description',
        ],
        [
          '<code>--nui-tooltip-border-color</code>',
          'rgba(255, 255, 255, 0.1)',
          'components.tooltip.theming.container.rows.borderColor.description',
        ],
        [
          '<code>--nui-tooltip-shadow</code>',
          'var(--nui-box-shadow-md)',
          'components.tooltip.theming.container.rows.shadow.description',
        ],
        [
          '<code>--nui-tooltip-z-index</code>',
          'var(--nui-z-index-top)',
          'components.tooltip.theming.container.rows.zIndex.description',
        ],
      ],
    },
  },
  {
    id: 'theming-arrow',
    title: 'components.tooltip.theming.arrow.title',
    description: 'components.tooltip.theming.arrow.description',
    anchor: 'theming-arrow',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-tooltip-arrow-size</code>',
          '0.4rem',
          'components.tooltip.theming.arrow.rows.arrowSize.description',
        ],
      ],
    },
  },
  {
    id: 'theming-animation',
    title: 'components.tooltip.theming.animation.title',
    description: 'components.tooltip.theming.animation.description',
    anchor: 'theming-animation',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>--nui-tooltip-transition-duration</code>',
          '150ms',
          'components.tooltip.theming.animation.rows.transitionDuration.description',
        ],
        [
          '<code>--nui-tooltip-transition-timing</code>',
          'ease-out',
          'components.tooltip.theming.animation.rows.transitionTiming.description',
        ],
      ],
    },
  },
];
