import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente TimeSelector
 * Documenta variables CSS y personalización
 */
export const TIME_SELECTOR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.timeSelector.theming.colors.title',
    description: 'components.timeSelector.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--time-selector-{color}-item-bg</code>',
          'Fondo del item normal (generado por ThemeService para cada color)',
          'transparent',
        ],
        [
          '<code>--time-selector-{color}-item-hover-bg</code>',
          'Fondo del item al hacer hover',
          'rgba(color, 0.1)',
        ],
        [
          '<code>--time-selector-{color}-item-selected-bg</code>',
          'Fondo del item seleccionado',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-selector-{color}-item-text</code>',
          'Color de texto del item normal',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-selector-{color}-item-selected-text</code>',
          'Color de texto del item seleccionado',
          'var(--nui-color-{color}-contrast)',
        ],
        [
          '<code>--time-selector-{color}-item-disabled-bg</code>',
          'Fondo del item deshabilitado',
          'transparent',
        ],
        [
          '<code>--time-selector-{color}-item-disabled-text</code>',
          'Color de texto del item deshabilitado',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--time-selector-{color}-accent</code>',
          'Color de acento (separador y efectos)',
          'var(--nui-color-{color})',
        ],
        [
          '<code>--time-selector-{color}-focus-ring</code>',
          'Color del anillo de foco',
          'rgba(color, 0.3)',
        ],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.timeSelector.theming.sizes.title',
    description: 'components.timeSelector.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--time-selector-item-height</code>',
          'Altura estándar de items',
          '2.25rem',
        ],
        ['<code>--time-selector-padding</code>', 'Padding estándar del picker', '0.75rem'],
        ['<code>--time-selector-max-height</code>', 'Altura máxima del picker', '12rem'],
        ['<code>--time-selector-min-height</code>', 'Altura mínima del picker', '8rem'],
        ['<code>--time-selector-font-size</code>', 'Tamaño de fuente estándar', 'var(--nui-font-size-md)'],
        ['<code>--time-selector-item-radius</code>', 'Radio de borde de items', 'calc(var(--nui-border-radius-md) - 0.125rem)'],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.timeSelector.theming.structure.title',
    description: 'components.timeSelector.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--time-selector-separator-width</code>', 'Ancho del separador (":")', '2rem'],
        [
          '<code>--time-selector-separator-line-width</code>',
          'Grosor de la línea del separador',
          '2px',
        ],
        [
          '<code>--time-selector-separator-line-height</code>',
          'Altura de la línea del separador',
          '1.5rem',
        ],
        ['<code>--time-selector-separator-border-radius</code>', 'Radio de borde de la línea', '1px'],
        [
          '<code>--time-selector-separator-padding-top</code>',
          'Padding superior del separador',
          '1.5rem',
        ],
        ['<code>--time-selector-items-gap</code>', 'Espacio entre items de la lista', '2px'],
        ['<code>--time-selector-items-padding</code>', 'Padding de la lista de items', '2px'],
        ['<code>--time-selector-items-border-radius</code>', 'Radio de borde de la lista', '2px'],
        ['<code>--time-selector-min-width</code>', 'Ancho mínimo del picker', '160px'],
        ['<code>--time-selector-min-width-with-seconds</code>', 'Ancho mínimo con segundos', '220px'],
        ['<code>--time-selector-header-border-width</code>', 'Grosor del borde del header', '1px'],
        ['<code>--time-selector-item-border-width</code>', 'Grosor del borde de los items', '1px'],
        ['<code>--time-selector-display-font-size</code>', 'Tamaño de fuente del display', '0.75rem'],
        [
          '<code>--time-selector-normalized-font-size</code>',
          'Tamaño de fuente del indicador de normalización',
          '0.75rem',
        ]
      ],
    },
  },

];
