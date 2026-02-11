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
          '<code>--tooltip-bg</code>',
          'var(--nui-gray-900)',
          'Background color (dynamic based on theme)',
        ],
        ['<code>--tooltip-text</code>', '#ffffff', 'Text color (dynamic based on theme)'],
        ['<code>--tooltip-padding-y</code>', '0.25rem', 'Vertical padding (4px)'],
        ['<code>--tooltip-padding-x</code>', '0.75rem', 'Horizontal padding (12px)'],
        ['<code>--tooltip-max-width</code>', '14rem', 'Maximum width (224px)'],
        ['<code>--tooltip-font-size</code>', 'var(--nui-font-size-xs)', 'Font size'],
        ['<code>--tooltip-font-weight</code>', 'var(--nui-font-weight-medium)', 'Font weight'],
        ['<code>--tooltip-line-height</code>', '1.3', 'Line height'],
        ['<code>--tooltip-border-radius</code>', 'var(--nui-border-radius-sm)', 'Border radius'],
        ['<code>--tooltip-border-width</code>', '1px', 'Border width'],
        [
          '<code>--tooltip-border-color</code>',
          'rgba(255, 255, 255, 0.1)',
          'Border color (dynamic based on theme)',
        ],
        ['<code>--tooltip-shadow</code>', 'var(--nui-box-shadow-md)', 'Box shadow'],
        ['<code>--tooltip-z-index</code>', '1000', 'Z-index for stacking order'],
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
      rows: [['<code>--tooltip-arrow-size</code>', '0.4rem', 'Arrow size (6.4px)']],
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
        ['<code>--tooltip-transition-duration</code>', '150ms', 'Transition duration'],
        ['<code>--tooltip-transition-timing</code>', 'ease-out', 'Transition timing function'],
      ],
    },
  },
];
