import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Avatar
 * Dividido en tamaños y estilos para mejor organización
 */
export const AVATAR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-sizes',
    title: 'components.avatar.theming.sizes.title',
    description: 'components.avatar.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Tamaños del contenedor
        ['<code>--nui-avatar-size-xs</code>', 'Dimensión del avatar extra pequeño', '24px'],
        ['<code>--nui-avatar-size-sm</code>', 'Dimensión del avatar pequeño', '32px'],
        ['<code>--nui-avatar-size-md</code>', 'Dimensión del avatar mediano', '40px'],
        ['<code>--nui-avatar-size-lg</code>', 'Dimensión del avatar grande', '48px'],
        ['<code>--nui-avatar-size-xl</code>', 'Dimensión del avatar extra grande', '64px'],

        // Tamaños de fuente para iniciales
        ['<code>--nui-avatar-font-size-xs</code>', 'Tamaño de fuente para iniciales (xs)', '10px'],
        ['<code>--nui-avatar-font-size-sm</code>', 'Tamaño de fuente para iniciales (sm)', '12px'],
        ['<code>--nui-avatar-font-size-md</code>', 'Tamaño de fuente para iniciales (md)', '14px'],
        ['<code>--nui-avatar-font-size-lg</code>', 'Tamaño de fuente para iniciales (lg)', '16px'],
        ['<code>--nui-avatar-font-size-xl</code>', 'Tamaño de fuente para iniciales (xl)', '20px'],

        // Tamaños de iconos
        ['<code>--nui-avatar-icon-size-xs</code>', 'Tamaño del icono (xs)', '14px'],
        ['<code>--nui-avatar-icon-size-sm</code>', 'Tamaño del icono (sm)', '16px'],
        ['<code>--nui-avatar-icon-size-md</code>', 'Tamaño del icono (md)', '20px'],
        ['<code>--nui-avatar-icon-size-lg</code>', 'Tamaño del icono (lg)', '24px'],
        ['<code>--nui-avatar-icon-size-xl</code>', 'Tamaño del icono (xl)', '32px'],
      ],
    },
  },
  {
    id: 'theming-styles',
    title: 'components.avatar.theming.styles.title',
    description: 'components.avatar.theming.styles.description',
    anchor: 'theming-styles',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Bordes y formas
        [
          '<code>--nui-avatar-border-radius-circular</code>',
          'Radio de borde para variante circular',
          '50%',
        ],
        [
          '<code>--nui-avatar-border-radius-rounded</code>',
          'Radio de borde para variante rounded',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-avatar-border-radius-square</code>',
          'Radio de borde para variante square',
          '0',
        ],

        // Bordes opcionales
        ['<code>--nui-avatar-border-width</code>', 'Grosor del borde del avatar', '0'],
        [
          '<code>--nui-avatar-border-width-bordered</code>',
          'Grosor del borde del avatar cuando está bordeado',
          '0',
        ],
        [
          '<code>--nui-avatar-border-outset</code>',
          'Color del borde exterior del avatar',
          'var(--nui-bg-secondary)',
        ],

        // Colores por defecto
        [
          '<code>--nui-avatar-default-bg</code>',
          'Color de fondo por defecto',
          'var(--nui-bg-tertiary)',
        ],
        [
          '<code>--nui-avatar-default-color</code>',
          'Color de texto/icono por defecto',
          'var(--nui-text-secondary)',
        ],

        // Tipografía
        [
          '<code>--nui-avatar-font-weight</code>',
          'Peso de fuente para iniciales',
          'var(--nui-font-weight-semibold)',
        ],
      ],
    },
  },
];
