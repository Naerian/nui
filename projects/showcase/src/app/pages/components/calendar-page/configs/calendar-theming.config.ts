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
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.values'],
      rows: [
        [
          '<code>--calendar-width-xs</code>',
          'Ancho del calendario en tamaño extra pequeño',
          '200px',
        ],
        ['<code>--calendar-padding-xs</code>', 'Padding interno en tamaño xs', '0.5rem'],
        ['<code>--calendar-gap-xs</code>', 'Espaciado entre elementos en xs', '0.25rem'],
        ['<code>--calendar-day-size-xs</code>', 'Tamaño de los días en xs', '1.5rem'],
        ['<code>--calendar-day-font-size-xs</code>', 'Tamaño de fuente de días en xs', '0.6875rem'],

        ['<code>--calendar-width-sm</code>', 'Ancho del calendario en tamaño pequeño', '260px'],
        ['<code>--calendar-padding-sm</code>', 'Padding interno en tamaño sm', '0.75rem'],
        ['<code>--calendar-gap-sm</code>', 'Espaciado entre elementos en sm', '0.375rem'],
        ['<code>--calendar-day-size-sm</code>', 'Tamaño de los días en sm', '2rem'],
        ['<code>--calendar-day-font-size-sm</code>', 'Tamaño de fuente de días en sm', '0.8125rem'],

        ['<code>--calendar-width-md</code>', 'Ancho del calendario en tamaño mediano', '320px'],
        ['<code>--calendar-padding-md</code>', 'Padding interno en tamaño md', '1rem'],
        ['<code>--calendar-gap-md</code>', 'Espaciado entre elementos en md', '0.5rem'],
        ['<code>--calendar-day-size-md</code>', 'Tamaño de los días en md', '2.5rem'],
        ['<code>--calendar-day-font-size-md</code>', 'Tamaño de fuente de días en md', '0.875rem'],

        ['<code>--calendar-width-lg</code>', 'Ancho del calendario en tamaño grande', '380px'],
        ['<code>--calendar-padding-lg</code>', 'Padding interno en tamaño lg', '1.25rem'],
        ['<code>--calendar-gap-lg</code>', 'Espaciado entre elementos en lg', '0.625rem'],
        ['<code>--calendar-day-size-lg</code>', 'Tamaño de los días en lg', '3rem'],
        ['<code>--calendar-day-font-size-lg</code>', 'Tamaño de fuente de días en lg', '1rem'],

        [
          '<code>--calendar-width-xl</code>',
          'Ancho del calendario en tamaño extra grande',
          '440px',
        ],
        ['<code>--calendar-padding-xl</code>', 'Padding interno en tamaño xl', '1.5rem'],
        ['<code>--calendar-gap-xl</code>', 'Espaciado entre elementos en xl', '0.75rem'],
        ['<code>--calendar-day-size-xl</code>', 'Tamaño de los días en xl', '3.5rem'],
        ['<code>--calendar-day-font-size-xl</code>', 'Tamaño de fuente de días en xl', '1.125rem'],
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
        ['<code>--calendar-tabs-border-width</code>', 'Grosor del borde de las pestañas', '1px'],
        ['<code>--calendar-day-border-width</code>', 'Grosor del borde de los días', '1px'],
        [
          '<code>--calendar-day-other-month-opacity</code>',
          'Opacidad de días de otros meses',
          '0.4',
        ],
        ['<code>--calendar-preset-border-width</code>', 'Grosor del borde de los presets', '1px'],
        [
          '<code>--calendar-preset-hover-translateY</code>',
          'Desplazamiento en Y al hacer hover en preset',
          '-2px',
        ],
        [
          '<code>--calendar-preset-active-translateY</code>',
          'Desplazamiento en Y al activar preset',
          '-4px',
        ],
        ['<code>--calendar-focus-outline-width</code>', 'Grosor del outline de foco', '2px'],
        ['<code>--calendar-focus-outline-offset</code>', 'Offset del outline de foco', '2px'],
        ['<code>--calendar-full-min-width</code>', 'Ancho mínimo en modo full', '280px'],
      ],
    },
  },
];
