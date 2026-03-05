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
        ['<code>--nui-avatar-size-xs</code>', 'components.avatar.theming.sizes.rows.sizeXs.description', '24px'],
        ['<code>--nui-avatar-size-sm</code>', 'components.avatar.theming.sizes.rows.sizeSm.description', '32px'],
        ['<code>--nui-avatar-size-md</code>', 'components.avatar.theming.sizes.rows.sizeMd.description', '40px'],
        ['<code>--nui-avatar-size-lg</code>', 'components.avatar.theming.sizes.rows.sizeLg.description', '48px'],
        ['<code>--nui-avatar-size-xl</code>', 'components.avatar.theming.sizes.rows.sizeXl.description', '64px'],

        // Tamaños de fuente para iniciales
        ['<code>--nui-avatar-font-size-xs</code>', 'components.avatar.theming.sizes.rows.fontSizeXs.description', '10px'],
        ['<code>--nui-avatar-font-size-sm</code>', 'components.avatar.theming.sizes.rows.fontSizeSm.description', '12px'],
        ['<code>--nui-avatar-font-size-md</code>', 'components.avatar.theming.sizes.rows.fontSizeMd.description', '14px'],
        ['<code>--nui-avatar-font-size-lg</code>', 'components.avatar.theming.sizes.rows.fontSizeLg.description', '16px'],
        ['<code>--nui-avatar-font-size-xl</code>', 'components.avatar.theming.sizes.rows.fontSizeXl.description', '20px'],

        // Tamaños de iconos
        ['<code>--nui-avatar-icon-size-xs</code>', 'components.avatar.theming.sizes.rows.iconSizeXs.description', '14px'],
        ['<code>--nui-avatar-icon-size-sm</code>', 'components.avatar.theming.sizes.rows.iconSizeSm.description', '16px'],
        ['<code>--nui-avatar-icon-size-md</code>', 'components.avatar.theming.sizes.rows.iconSizeMd.description', '20px'],
        ['<code>--nui-avatar-icon-size-lg</code>', 'components.avatar.theming.sizes.rows.iconSizeLg.description', '24px'],
        ['<code>--nui-avatar-icon-size-xl</code>', 'components.avatar.theming.sizes.rows.iconSizeXl.description', '32px'],
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
          'components.avatar.theming.styles.rows.borderRadiusCircular.description',
          '50%',
        ],
        [
          '<code>--nui-avatar-border-radius-rounded</code>',
          'components.avatar.theming.styles.rows.borderRadiusRounded.description',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-avatar-border-radius-square</code>',
          'components.avatar.theming.styles.rows.borderRadiusSquare.description',
          '0',
        ],

        // Bordes opcionales
        ['<code>--nui-avatar-border-width</code>', 'components.avatar.theming.styles.rows.borderWidth.description', '0'],
        [
          '<code>--nui-avatar-border-width-bordered</code>',
          'components.avatar.theming.styles.rows.borderWidthBordered.description',
          '0',
        ],
        [
          '<code>--nui-avatar-border-outset</code>',
          'components.avatar.theming.styles.rows.borderOutset.description',
          'var(--nui-bg-secondary)',
        ],

        // Colores por defecto
        [
          '<code>--nui-avatar-default-bg</code>',
          'components.avatar.theming.styles.rows.defaultBg.description',
          'var(--nui-bg-neutral)',
        ],
        [
          '<code>--nui-avatar-default-color</code>',
          'components.avatar.theming.styles.rows.defaultColor.description',
          'var(--nui-text-secondary)',
        ],

        // Tipografía
        [
          '<code>--nui-avatar-font-weight</code>',
          'components.avatar.theming.styles.rows.fontWeight.description',
          'var(--nui-font-weight-semibold)',
        ],
      ],
    },
  },
];
