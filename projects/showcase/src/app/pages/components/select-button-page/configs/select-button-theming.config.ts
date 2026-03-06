import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Select Button
 * Variables CSS para personalizar la apariencia
 */
export const SELECT_BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-general',
    title: 'components.selectButton.theming.general.title',
    description: 'components.selectButton.theming.general.description',
    anchor: 'theming-general',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-slc-btn-gap</code>', 'components.selectButton.theming.general.rows.gap.description', '0'],
        [
          '<code>--nui-slc-btn-transition</code>',
          'components.selectButton.theming.general.rows.transition.description',
          'all 0.2s ease',
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
        // Contenedor segmented
        [
          '<code>--nui-slc-btn-segmented-gap</code>',
          'components.selectButton.theming.segmented.rows.gap.description',
          'var(--nui-spacing-xxs)',
        ],
        [
          '<code>--nui-slc-btn-segmented-bg</code>',
          'components.selectButton.theming.segmented.rows.bg.description',
          'var(--nui-bg-secondary)',
        ],
        [
          '<code>--nui-slc-btn-segmented-padding</code>',
          'components.selectButton.theming.segmented.rows.padding.description',
          'var(--nui-spacing-xxs)',
        ],
        [
          '<code>--nui-slc-btn-segmented-border-radius</code>',
          'components.selectButton.theming.segmented.rows.borderRadius.description',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-slc-btn-segmented-border</code>',
          'components.selectButton.theming.segmented.rows.border.description',
          '1px solid var(--nui-border-primary)',
        ],

        // Botón seleccionado
        [
          '<code>--nui-slc-btn-segmented-selected-bg</code>',
          'components.selectButton.theming.segmented.rows.selectedBg.description',
          'var(--nui-bg-primary)',
        ],
        [
          '<code>--nui-slc-btn-segmented-selected-shadow</code>',
          'components.selectButton.theming.segmented.rows.selectedShadow.description',
          'var(--nui-shadow-sm)',
        ],
        [
          '<code>--nui-slc-btn-segmented-selected-border</code>',
          'components.selectButton.theming.segmented.rows.selectedBorder.description',
          '1px solid var(--nui-border-primary)',
        ],

        // Botón no seleccionado
        [
          '<code>--nui-slc-btn-segmented-unselected-bg</code>',
          'components.selectButton.theming.segmented.rows.unselectedBg.description',
          'transparent',
        ],
        [
          '<code>--nui-slc-btn-segmented-unselected-text</code>',
          'components.selectButton.theming.segmented.rows.unselectedText.description',
          'var(--nui-text-secondary)',
        ],

        // Hover
        [
          '<code>--nui-slc-btn-segmented-hover-bg</code>',
          'components.selectButton.theming.segmented.rows.hoverBg.description',
          'var(--nui-bg-hover)',
        ],
      ],
    },
  },
];