import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente TimePicker
 * Documenta variables CSS y personalización
 */
export const TIME_PICKER_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.timePicker.theming.colors.title',
    description: 'components.timePicker.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--time-picker-{color}-item-bg</code>',
          'Fondo del item normal (generado por ThemeService para cada color)',
          'transparent',
        ],
        [
          '<code>--time-picker-{color}-item-hover-bg</code>',
          'Fondo del item al hacer hover',
          'rgba(color, 0.1)',
        ],
        [
          '<code>--time-picker-{color}-item-selected-bg</code>',
          'Fondo del item seleccionado',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-picker-{color}-item-text</code>',
          'Color de texto del item normal',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-picker-{color}-item-selected-text</code>',
          'Color de texto del item seleccionado',
          'var(--nui-color-{color}-contrast)',
        ],
        [
          '<code>--time-picker-{color}-item-disabled-bg</code>',
          'Fondo del item deshabilitado',
          'transparent',
        ],
        [
          '<code>--time-picker-{color}-item-disabled-text</code>',
          'Color de texto del item deshabilitado',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--time-picker-{color}-accent</code>',
          'Color de acento (separador y efectos)',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-picker-{color}-focus-ring</code>',
          'Color del anillo de foco',
          'rgba(color, 0.3)',
        ],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.timePicker.theming.sizes.title',
    description: 'components.timePicker.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--time-picker-item-height-xs</code>',
          'Altura de items en tamaño extra pequeño',
          '1.5rem',
        ],
        ['<code>--time-picker-padding-xs</code>', 'Padding en tamaño extra pequeño', '0.25rem'],
        ['<code>--time-picker-max-height-xs</code>', 'Altura máxima del picker en xs', '8rem'],
        ['<code>--time-picker-min-height-xs</code>', 'Altura mínima del picker en xs', '6rem'],
        ['<code>--time-picker-item-height-sm</code>', 'Altura de items en tamaño pequeño', '2rem'],
        ['<code>--time-picker-padding-sm</code>', 'Padding en tamaño pequeño', '0.375rem'],
        ['<code>--time-picker-max-height-sm</code>', 'Altura máxima del picker en sm', '12rem'],
        ['<code>--time-picker-min-height-sm</code>', 'Altura mínima del picker en sm', '8rem'],
        [
          '<code>--time-picker-item-height-md</code>',
          'Altura de items en tamaño mediano (default)',
          '2.25rem',
        ],
        ['<code>--time-picker-padding-md</code>', 'Padding en tamaño mediano', '0.75rem'],
        ['<code>--time-picker-max-height-md</code>', 'Altura máxima del picker en md', '12rem'],
        ['<code>--time-picker-min-height-md</code>', 'Altura mínima del picker en md', '8rem'],
        ['<code>--time-picker-item-height-lg</code>', 'Altura de items en tamaño grande', '2.5rem'],
        ['<code>--time-picker-padding-lg</code>', 'Padding en tamaño grande', '1rem'],
        ['<code>--time-picker-max-height-lg</code>', 'Altura máxima del picker en lg', '14rem'],
        ['<code>--time-picker-min-height-lg</code>', 'Altura mínima del picker en lg', '10rem'],
        [
          '<code>--time-picker-item-height-xl</code>',
          'Altura de items en tamaño extra grande',
          '2.75rem',
        ],
        ['<code>--time-picker-padding-xl</code>', 'Padding en tamaño extra grande', '1.5rem'],
        ['<code>--time-picker-max-height-xl</code>', 'Altura máxima del picker en xl', '16rem'],
        ['<code>--time-picker-min-height-xl</code>', 'Altura mínima del picker en xl', '12rem'],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.timePicker.theming.structure.title',
    description: 'components.timePicker.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--time-picker-separator-width</code>', 'Ancho del separador (":")', '2rem'],
        [
          '<code>--time-picker-separator-line-width</code>',
          'Grosor de la línea del separador',
          '2px',
        ],
        [
          '<code>--time-picker-separator-line-height</code>',
          'Altura de la línea del separador',
          '1.5rem',
        ],
        ['<code>--time-picker-separator-border-radius</code>', 'Radio de borde de la línea', '1px'],
        [
          '<code>--time-picker-separator-padding-top</code>',
          'Padding superior del separador',
          '1.5rem',
        ],
        [
          '<code>--time-picker-separator-text-shadow</code>',
          'Sombra del texto del separador',
          '0 1px 2px rgba(0, 0, 0, 0.1)',
        ],
        ['<code>--time-picker-items-gap</code>', 'Espacio entre items de la lista', '2px'],
        ['<code>--time-picker-items-padding</code>', 'Padding de la lista de items', '2px'],
        ['<code>--time-picker-items-border-radius</code>', 'Radio de borde de la lista', '2px'],
        ['<code>--time-picker-min-width</code>', 'Ancho mínimo del picker', '160px'],
        ['<code>--time-picker-min-width-with-seconds</code>', 'Ancho mínimo con segundos', '220px'],
        ['<code>--time-picker-header-border-width</code>', 'Grosor del borde del header', '1px'],
        ['<code>--time-picker-item-border-width</code>', 'Grosor del borde de los items', '1px'],
        ['<code>--time-picker-display-font-size</code>', 'Tamaño de fuente del display', '0.75rem'],
        [
          '<code>--time-picker-normalized-font-size</code>',
          'Tamaño de fuente del indicador de normalización',
          '0.75rem',
        ],
        ['<code>--time-picker-focus-outline-width</code>', 'Grosor del outline de foco', '2px'],
        ['<code>--time-picker-focus-outline-offset</code>', 'Offset del outline de foco', '2px'],
        [
          '<code>--time-picker-item-focus-outline-offset</code>',
          'Offset del outline de foco en items',
          '-1px',
        ],
      ],
    },
  },

];
