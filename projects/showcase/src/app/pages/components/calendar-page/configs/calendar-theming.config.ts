import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente Calendar
 * Documenta variables CSS y personalización
 */
export const CALENDAR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.calendar.theming.colors.title',
    description: 'components.calendar.theming.colors.description',
    anchor: 'theming-colors',
    note: {
      type: 'info',
      icon: 'ri-palette-line',
      content: 'components.calendar.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-calendar-day-bg</code>', 'Color de fondo de los días', 'transparent'],
        [
          '<code>--nui-calendar-day-text</code>',
          'Color de texto de los días',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--nui-calendar-day-hover-bg</code>',
          'Color de fondo al hacer hover en un día',
          'var(--nui-bg-secondary)',
        ],
        [
          '<code>--nui-calendar-day-hover-text</code>',
          'Color de texto al hacer hover en un día',
          'var(--nui-text-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-bg</code>',
          'Color de fondo del día seleccionado',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-text</code>',
          'Color de texto del día seleccionado',
          'var(--nui-color-primary-contrast)',
        ],
        [
          '<code>--nui-calendar-day-selected-border</code>',
          'Color de borde del día seleccionado',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-bg</code>',
          'Color de fondo del día seleccionado al hacer hover',
          'var(--nui-color-primary-hover)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-border</code>',
          'Color de borde del día seleccionado al hacer hover',
          'var(--nui-color-primary-hover)',
        ],
        [
          '<code>--nui-calendar-day-range-bg</code>',
          'Color de fondo de días dentro de un rango',
          'var(--nui-color-primary-alpha-10)',
        ],
        [
          '<code>--nui-calendar-day-range-text</code>',
          'Color de texto de días dentro de un rango',
          'var(--nui-text-primary)',
        ],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.calendar.theming.sizes.title',
    description: 'components.calendar.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-calendar-width</code>',
          'Ancho estándar del calendario',
          '320px',
        ],
        ['<code>--nui-calendar-padding</code>', 'Padding interno del calendario', '1rem'],
        ['<code>--nui-calendar-gap</code>', 'Espaciado entre elementos del calendario', '0.5rem'],
        ['<code>--nui-calendar-day-font-size</code>', 'Tamaño de fuente de los días', '0.875rem'],
        ['<code>--nui-calendar-title-font-size</code>', 'Tamaño de fuente del título mes/año', '1rem'],
        ['<code>--nui-calendar-weekday-font-size</code>', 'Tamaño de fuente de nombres de días', '0.75rem'],
        ['<code>--nui-calendar-weekday-height</code>', 'Altura de la fila de nombres de días', '1.5rem'],
        ['<code>--nui-calendar-month-font-size</code>', 'Tamaño de fuente en vista de meses', '0.875rem'],
        ['<code>--nui-calendar-year-font-size</code>', 'Tamaño de fuente en vista de años', '0.875rem'],
        ['<code>--nui-calendar-nav-btn-height</code>', 'Altura de botones de navegación', '2.5rem'],
        ['<code>--nui-calendar-nav-btn-padding</code>', 'Padding de botones de navegación', '0.5rem 0.75rem'],
        ['<code>--nui-calendar-nav-btn-font-size</code>', 'Tamaño de fuente de botones de navegación', '0.875rem'],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.calendar.theming.structure.title',
    description: 'components.calendar.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-calendar-tabs-border-width</code>', 'Grosor del borde de las pestañas', '1px'],
        ['<code>--nui-calendar-day-border-width</code>', 'Grosor del borde de los días', '1px'],
        [
          '<code>--nui-calendar-day-other-month-opacity</code>',
          'Opacidad de días de otros meses',
          '0.4',
        ],
        ['<code>--nui-calendar-preset-border-width</code>', 'Grosor del borde de los presets', '1px'],
        [
          '<code>--nui-calendar-preset-hover-translateY</code>',
          'Desplazamiento en Y al hacer hover en preset',
          '-1px',
        ],
      ],
    },
  },
];
