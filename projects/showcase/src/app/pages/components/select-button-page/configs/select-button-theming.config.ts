import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Select Button
 * Variables CSS para personalizar la apariencia
 */
export const SELECT_BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-general',
    title: 'components.buttonGroup.theming.general.title',
    description: 'components.buttonGroup.theming.general.description',
    anchor: 'theming-general',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-slc-btn-gap</code>', 'Espacio entre botones en layout default', '0'],
        ['<code>--nui-slc-btn-transition</code>', 'Transiciones de los botones', 'all 0.2s ease'],
      ],
    },
  },
  {
    id: 'theming-segmented',
    title: 'components.buttonGroup.theming.segmented.title',
    description: 'components.buttonGroup.theming.segmented.description',
    anchor: 'theming-segmented',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Contenedor segmented
        [
          '<code>--nui-slc-btn-segmented-gap</code>',
          'Espacio entre botones en layout segmented',
          'var(--nui-spacing-xxs)',
        ],
        [
          '<code>--nui-slc-btn-segmented-bg</code>',
          'Fondo del contenedor segmented',
          'var(--nui-bg-secondary)',
        ],
        [
          '<code>--nui-slc-btn-segmented-padding</code>',
          'Padding interno del contenedor',
          'var(--nui-spacing-xxs)',
        ],
        [
          '<code>--nui-slc-btn-segmented-border-radius</code>',
          'Radio de esquinas del contenedor',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-slc-btn-segmented-border</code>',
          'Borde del contenedor',
          '1px solid var(--nui-border-primary)',
        ],

        // Botón seleccionado
        [
          '<code>--nui-slc-btn-segmented-selected-bg</code>',
          'Fondo del botón seleccionado',
          'var(--nui-bg-primary)',
        ],
        [
          '<code>--nui-slc-btn-segmented-selected-shadow</code>',
          'Sombra del botón seleccionado',
          'var(--nui-shadow-sm)',
        ],
        [
          '<code>--nui-slc-btn-segmented-selected-border</code>',
          'Borde del botón seleccionado',
          '1px solid var(--nui-border-primary)',
        ],

        // Botón no seleccionado
        [
          '<code>--nui-slc-btn-segmented-unselected-bg</code>',
          'Fondo del botón no seleccionado',
          'transparent',
        ],
        [
          '<code>--nui-slc-btn-segmented-unselected-text</code>',
          'Color de texto del botón no seleccionado',
          'var(--nui-text-secondary)',
        ],

        // Hover
        [
          '<code>--nui-slc-btn-segmented-hover-bg</code>',
          'Fondo del botón en hover',
          'var(--nui-bg-hover)',
        ],
      ],
    },
  },
];