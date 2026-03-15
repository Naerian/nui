import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Select Button
 * Variables CSS para personalizar la apariencia
 */
export const SELECT_BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-structural',
    title: 'components.selectButton.theming.structural.title',
    description: 'components.selectButton.theming.structural.description',
    anchor: 'theming-structural',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Z-index layers
        [
          '<code>--nui-slc-btn-z-index-base</code>',
          'components.selectButton.theming.structural.rows.zIndexBase.description',
          '0',
        ],
        [
          '<code>--nui-slc-btn-z-index-hover</code>',
          'components.selectButton.theming.structural.rows.zIndexHover.description',
          '1',
        ],
        [
          '<code>--nui-slc-btn-z-index-selected</code>',
          'components.selectButton.theming.structural.rows.zIndexSelected.description',
          '1',
        ],
        [
          '<code>--nui-slc-btn-z-index-focus</code>',
          'components.selectButton.theming.structural.rows.zIndexFocus.description',
          '2',
        ],
        // Opacities
        [
          '<code>--nui-slc-btn-disabled-opacity</code>',
          'components.selectButton.theming.structural.rows.disabledOpacity.description',
          '0.4',
        ],
        [
          '<code>--nui-slc-btn-container-disabled-opacity</code>',
          'components.selectButton.theming.structural.rows.containerDisabledOpacity.description',
          '0.6',
        ],
        // Layout & spacing
        [
          '<code>--nui-slc-btn-border-width</code>',
          'components.selectButton.theming.structural.rows.borderWidth.description',
          'var(--nui-border-width-xs)',
        ],
        [
          '<code>--nui-slc-btn-overlap</code>',
          'components.selectButton.theming.structural.rows.overlap.description',
          'calc(var(--nui-slc-btn-border-width) * -1)',
        ],
        [
          '<code>--nui-slc-btn-radius</code>',
          'components.selectButton.theming.structural.rows.radius.description',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-slc-btn-icon-scale</code>',
          'components.selectButton.theming.structural.rows.iconScale.description',
          '1.1',
        ],
      ],
    },
  },
  {
    id: 'theming-segmented',
    title: 'components.selectButton.theming.segmented.title',
    description: 'components.selectButton.theming.segmented.description',
    anchor: 'theming-segmented',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-slc-btn-segmented-gap</code>',
          'components.selectButton.theming.segmented.rows.gap.description',
          '0.125rem',
        ],
        [
          '<code>--nui-slc-btn-segmented-padding</code>',
          'components.selectButton.theming.segmented.rows.padding.description',
          '0.125rem',
        ],
      ],
    },
  },
  {
    id: 'theming-color',
    title: 'components.selectButton.theming.color.title',
    description: 'components.selectButton.theming.color.description',
    anchor: 'theming-color',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Solid / Outline / Ghost shared pattern
        [
          '<code>--nui-slc-btn-{color}-{variant}-bg</code>',
          'components.selectButton.theming.color.rows.bg.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-text</code>',
          'components.selectButton.theming.color.rows.text.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-border</code>',
          'components.selectButton.theming.color.rows.border.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-hover-bg</code>',
          'components.selectButton.theming.color.rows.hoverBg.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-sel-bg</code>',
          'components.selectButton.theming.color.rows.selBg.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-sel-text</code>',
          'components.selectButton.theming.color.rows.selText.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-{variant}-sel-border</code>',
          'components.selectButton.theming.color.rows.selBorder.description',
          '—',
        ],
        // Segmented track (only used in segmented variant)
        [
          '<code>--nui-slc-btn-{color}-segmented-track-bg</code>',
          'components.selectButton.theming.color.rows.trackBg.description',
          '—',
        ],
        [
          '<code>--nui-slc-btn-{color}-segmented-track-border</code>',
          'components.selectButton.theming.color.rows.trackBorder.description',
          '—',
        ],
      ],
    },
  },
];
