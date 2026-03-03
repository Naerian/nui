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
          'Background color (dynamic based on theme)',
        ],
        ['<code>--nui-tooltip-text</code>', '#ffffff', 'Text color (dynamic based on theme)'],
        ['<code>--nui-tooltip-padding-y</code>', '0.25rem', 'Vertical padding (4px)'],
        ['<code>--nui-tooltip-padding-x</code>', '0.75rem', 'Horizontal padding (12px)'],
        ['<code>--nui-tooltip-max-width</code>', '14rem', 'Maximum width (224px)'],
        ['<code>--nui-tooltip-font-size</code>', 'var(--nui-font-size-xs)', 'Font size'],
        ['<code>--nui-tooltip-font-weight</code>', 'var(--nui-font-weight-medium)', 'Font weight'],
        ['<code>--nui-tooltip-line-height</code>', '1.3', 'Line height'],
        ['<code>--nui-tooltip-border-radius</code>', 'var(--nui-border-radius-sm)', 'Border radius'],
        ['<code>--nui-tooltip-border-width</code>', '1px', 'Border width'],
        [
          '<code>--nui-tooltip-border-color</code>',
          'rgba(255, 255, 255, 0.1)',
          'Border color (dynamic based on theme)',
        ],
        ['<code>--nui-tooltip-shadow</code>', 'var(--nui-box-shadow-md)', 'Box shadow'],
        ['<code>--nui-tooltip-z-index</code>', 'var(--nui-z-index-top)', 'Z-index for stacking order'],
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
      rows: [['<code>--nui-tooltip-arrow-size</code>', '0.4rem', 'Arrow size (6.4px)']],
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
        ['<code>--nui-tooltip-transition-duration</code>', '150ms', 'Transition duration'],
        ['<code>--nui-tooltip-transition-timing</code>', 'ease-out', 'Transition timing function'],
      ],
    },
  },
];
