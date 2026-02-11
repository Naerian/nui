import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la sección Theming del componente Popover
 */
export const POPOVER_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-spacing',
    title: 'components.popover.theming.spacing.title',
    description: 'components.popover.theming.spacing.description',
    anchor: 'theming-spacing',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-popover-padding</code>', '1rem', 'Padding interno del popover'],
        ['<code>--nui-popover-max-width</code>', '20rem (320px)', 'Ancho máximo del popover'],
        ['<code>--nui-popover-min-width</code>', '5rem (80px)', 'Ancho mínimo del popover'],
        [
          '<code>--nui-popover-arrow-size</code>',
          '0.5rem (8px)',
          'Tamaño de la flecha del popover',
        ],
        [
          '<code>--nui-popover-distance</code>',
          '0.313rem (5px)',
          'Distancia desde el elemento trigger hasta el popover',
        ],
      ],
    },
  },
  {
    id: 'theming-typography',
    title: 'components.popover.theming.typography.title',
    description: 'components.popover.theming.typography.description',
    anchor: 'theming-typography',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-popover-font-size</code>',
          'var(--nui-font-size-sm)',
          'Tamaño de fuente del contenido del popover',
        ],
        [
          '<code>--nui-popover-font-weight</code>',
          'var(--nui-font-weight-regular)',
          'Peso de fuente del contenido del popover',
        ],
        [
          '<code>--nui-popover-line-height</code>',
          'var(--nui-line-height-md)',
          'Altura de línea del contenido del popover',
        ],
      ],
    },
  },
  {
    id: 'theming-borders',
    title: 'components.popover.theming.borders.title',
    description: 'components.popover.theming.borders.description',
    anchor: 'theming-borders',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        ['<code>--nui-popover-border-width</code>', '1px', 'Ancho del borde del popover'],
        [
          '<code>--nui-popover-border-radius</code>',
          'var(--nui-border-radius-sm)',
          'Radio de borde del popover',
        ],
      ],
    },
  },
  {
    id: 'theming-shadow',
    title: 'components.popover.theming.shadow.title',
    description: 'components.popover.theming.shadow.description',
    anchor: 'theming-shadow',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-popover-shadow</code>',
          'var(--nui-shadow-elevated)',
          'Sombra del popover para darle profundidad visual',
        ],
      ],
    },
  },
  {
    id: 'theming-zindex',
    title: 'components.popover.theming.zindex.title',
    description: 'components.popover.theming.zindex.description',
    anchor: 'theming-zindex',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-popover-z-index</code>',
          '1000',
          'Z-index del popover para controlar el orden de apilamiento',
        ],
      ],
    },
  },
  {
    id: 'theming-animation',
    title: 'components.popover.theming.animation.title',
    description: 'components.popover.theming.animation.description',
    anchor: 'theming-animation',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-popover-transition-duration</code>',
          '200ms',
          'Duración de las transiciones de entrada/salida del popover',
        ],
        [
          '<code>--nui-popover-transition-timing</code>',
          'cubic-bezier(0.4, 0, 0.2, 1)',
          'Función de timing para las transiciones (easing)',
        ],
      ],
    },
  },
];
