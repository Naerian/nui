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
          'Espacio entre elementos del paginador',
          'var(--nui-spacing-sm)',
        ],
        ['<code>--nui-pg-align-items</code>', 'Alineación vertical de elementos', 'center'],
        [
          '<code>--nui-pg-justify-content</code>',
          'Alineación horizontal de elementos',
          'space-between',
        ],
      ],
    },
  },
  {
    id: 'theming-buttons',
    title: 'components.paginator.theming.buttons.title',
    description: 'components.paginator.theming.buttons.description',
    anchor: 'theming-buttons',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-button-min-width</code>',
          'Ancho mínimo de los botones de navegación',
          '40px',
        ],
        [
          '<code>--nui-pg-button-gap</code>',
          'Espacio entre botones de navegación',
          'var(--nui-spacing-xs)',
        ],
        [
          '<code>--nui-pg-page-number-min-width</code>',
          'Ancho mínimo de los botones de número de página',
          '36px',
        ],
        [
          '<code>--nui-pg-page-number-height</code>',
          'Altura de los botones de número de página',
          '36px',
        ],
        ['<code>--nui-pg-page-number-gap</code>', 'Espacio entre números de página', '4px'],
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
        ['<code>--nui-pg-active-bg</code>', 'Fondo de la página activa', 'var(--primary-color)'],
        [
          '<code>--nui-pg-active-text</code>',
          'Color de texto de la página activa',
          'var(--nui-text-on-primary)',
        ],
        [
          '<code>--nui-pg-active-border</code>',
          'Borde de la página activa',
          'var(--primary-color)',
        ],
        [
          '<code>--nui-pg-ellipsis-color</code>',
          'Color de los puntos suspensivos (…)',
          'var(--nui-text-tertiary)',
        ],
        [
          '<code>--nui-pg-ellipsis-padding</code>',
          'Padding de los puntos suspensivos',
          'var(--nui-spacing-xs)',
        ],
      ],
    },
  },
  {
    id: 'theming-controls',
    title: 'components.paginator.theming.controls.title',
    description: 'components.paginator.theming.controls.description',
    anchor: 'theming-controls',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-size-selector-min-width</code>',
          'Ancho mínimo del selector de tamaño',
          '80px',
        ],
        [
          '<code>--nui-pg-size-selector-gap</code>',
          'Espacio del selector de tamaño',
          'var(--nui-spacing-sm)',
        ],
        [
          '<code>--nui-pg-item-range-color</code>',
          'Color del texto de rango de elementos',
          'var(--nui-text-secondary)',
        ],
        [
          '<code>--nui-pg-item-range-font-size</code>',
          'Tamaño de fuente del rango',
          'var(--nui-font-size-sm)',
        ],
        [
          '<code>--nui-pg-page-jump-input-width</code>',
          'Ancho del input de salto de página',
          '60px',
        ],
        [
          '<code>--nui-pg-page-jump-gap</code>',
          'Espacio del salto de página',
          'var(--nui-spacing-sm)',
        ],
      ],
    },
  },
  {
    id: 'theming-infinite',
    title: 'components.paginator.theming.infinite.title',
    description: 'components.paginator.theming.infinite.description',
    anchor: 'theming-infinite',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-pg-infinite-button-padding</code>',
          'Padding del botón "Load More"',
          'var(--nui-spacing-md) var(--nui-spacing-xl)',
        ],
        [
          '<code>--nui-pg-infinite-button-margin</code>',
          'Margen del botón de carga',
          'var(--nui-spacing-lg) 0',
        ],
        [
          '<code>--nui-pg-infinite-counter-color</code>',
          'Color del contador de elementos cargados',
          'var(--nui-text-secondary)',
        ],
        [
          '<code>--nui-pg-infinite-counter-font-size</code>',
          'Tamaño de fuente del contador',
          'var(--nui-font-size-sm)',
        ],
        [
          '<code>--nui-pg-infinite-counter-margin</code>',
          'Margen del contador',
          'var(--nui-spacing-xs) 0',
        ],
        [
          '<code>--nui-pg-infinite-end-color</code>',
          'Color del mensaje de fin de datos',
          'var(--nui-text-tertiary)',
        ],
        [
          '<code>--nui-pg-infinite-end-font-size</code>',
          'Tamaño de fuente del mensaje de fin',
          'var(--nui-font-size-sm)',
        ],
      ],
    },
  },
];
