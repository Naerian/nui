import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Action Menu
 * Dividido en variables estructurales y de items para mejor organización
 */
export const ACTION_MENU_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-structure',
    title: 'components.actionMenu.theming.structure.title',
    description: 'components.actionMenu.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Container
        ['<code>--nui-am-min-width</code>', 'Ancho mínimo del menú', '12rem'],
        ['<code>--nui-am-max-width</code>', 'Ancho máximo del menú', '20rem'],
        ['<code>--nui-am-border-width</code>', 'Grosor del borde del menú', 'var(--nui-border-width-xs)'],
        ['<code>--nui-am-border-color</code>', 'Color del borde del menú', 'var(--nui-border-primary)'],
        ['<code>--nui-am-border-radius</code>', 'Radio de esquinas del menú', 'var(--nui-border-radius-md)'],
        ['<code>--nui-am-padding</code>', 'Padding interno del menú', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-shadow</code>', 'Sombra del menú desplegable', 'var(--nui-shadow-elevated)'],
        ['<code>--nui-am-static-shadow</code>', 'Sombra del menú estático', 'var(--nui-shadow-container)'],
        
        // Items
        ['<code>--nui-am-item-gap</code>', 'Espacio entre elementos del item', 'var(--nui-spacing-sm)'],
        ['<code>--nui-am-item-border</code>', 'Borde de los items', 'none'],
        ['<code>--nui-am-item-border-radius</code>', 'Radio de esquinas de items', 'var(--nui-border-radius-sm)'],
        ['<code>--nui-am-item-padding-y</code>', 'Padding vertical de items', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-item-padding-x</code>', 'Padding horizontal de items', 'var(--nui-spacing-sm)'],
        ['<code>--nui-am-item-label-margin-right</code>', 'Margen derecho del label', 'var(--nui-spacing-md)'],
        
        // Focus
        ['<code>--nui-am-focus-outline-width</code>', 'Ancho del outline de foco', '2px'],
        ['<code>--nui-am-focus-outline-offset</code>', 'Offset del outline de foco', '-1px'],
        
        // Arrow (submenu indicator)
        ['<code>--nui-am-arrow-padding-left</code>', 'Padding izquierdo de la flecha', '0.5rem'],
        
        // Transitions
        ['<code>--nui-am-transition</code>', 'Transiciones de estados', 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'],
      ],
    },
  },
  {
    id: 'theming-items',
    title: 'components.actionMenu.theming.items.title',
    description: 'components.actionMenu.theming.items.description',
    anchor: 'theming-items',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Subtitle
        ['<code>--nui-am-item-subtitle-color</code>', 'Color del texto secundario', 'var(--nui-text-secondary)'],
        ['<code>--nui-am-item-subtitle-font-size</code>', 'Tamaño de fuente del subtitle', 'var(--nui-font-size-xs)'],
        
        // Label
        ['<code>--nui-am-item-label-weight</code>', 'Peso de fuente del label', 'var(--nui-font-weight-medium)'],
        ['<code>--nui-am-item-label-font-size</code>', 'Tamaño de fuente del label', 'var(--nui-font-size-sm)'],
        
        // Separator
        ['<code>--nui-am-separator-color</code>', 'Color del separador', 'var(--nui-border-primary)'],
        ['<code>--nui-am-separator-padding</code>', 'Padding del separador', 'var(--nui-spacing-xs) 0'],
        ['<code>--nui-am-separator-label-color</code>', 'Color del label del separador', 'var(--nui-text-tertiary)'],
        ['<code>--nui-am-separator-label-spacing</code>', 'Espaciado del label del separador', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-separator-font-size</code>', 'Tamaño de fuente del separador', 'var(--nui-font-size-xs)'],
        ['<code>--nui-am-separator-font-weight</code>', 'Peso de fuente del separador', 'var(--nui-font-weight-semibold)'],
        
        // Shortcut
        ['<code>--nui-am-shortcut-bg</code>', 'Fondo del shortcut', 'var(--nui-bg-tertiary)'],
        ['<code>--nui-am-shortcut-color</code>', 'Color del texto del shortcut', 'var(--nui-text-secondary)'],
        ['<code>--nui-am-shortcut-padding</code>', 'Padding del shortcut', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-shortcut-border-width</code>', 'Grosor del borde del shortcut', 'var(--nui-border-width-xs)'],
        ['<code>--nui-am-shortcut-border-color</code>', 'Color del borde del shortcut', 'var(--nui-border-primary)'],
        ['<code>--nui-am-shortcut-border-radius</code>', 'Radio de esquinas del shortcut', 'var(--nui-border-radius-md)'],
        ['<code>--nui-am-shortcut-font-size</code>', 'Tamaño de fuente del shortcut', 'var(--nui-font-size-xs)'],
        
        // Selected parent indicator
        ['<code>--nui-am-item-notify-selected-size</code>', 'Tamaño del indicador de hijo seleccionado', '0.375rem'],
        ['<code>--nui-am-item-notify-selected-radius</code>', 'Radio del indicador de hijo seleccionado', '50%'],
      ],
    },
  },
  {
    id: 'theming-colors',
    title: 'components.actionMenu.theming.colors.title',
    description: 'components.actionMenu.theming.colors.description',
    anchor: 'theming-colors',
    note: {
      type: 'info',
      content: 'components.actionMenu.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.variants'],
      rows: [
        [
          '<code>--nui-am-{color}-bg</code>',
          'Fondo del item en estado normal',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-text</code>',
          'Color del texto del item',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-hover-bg</code>',
          'Fondo del item en hover',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-hover-text</code>',
          'Color del texto en hover',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-active-bg</code>',
          'Fondo del item en active',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-selected-bg</code>',
          'Fondo del item seleccionado',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-selected-text</code>',
          'Color del texto del item seleccionado',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-notify-selected</code>',
          'Color del indicador de hijo seleccionado',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
      ],
    },
  },
];
