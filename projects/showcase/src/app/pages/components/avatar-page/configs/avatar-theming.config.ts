import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Avatar
 * Dividido en tamaños, estilos, grupo y exceso para mejor organización
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
        ['<code>--nui-avatar-size-xs</code>', 'components.avatar.theming.sizes.rows.sizeXs.description', '1.5rem'],
        ['<code>--nui-avatar-size-sm</code>', 'components.avatar.theming.sizes.rows.sizeSm.description', '2rem'],
        ['<code>--nui-avatar-size-md</code>', 'components.avatar.theming.sizes.rows.sizeMd.description', '2.5rem'],
        ['<code>--nui-avatar-size-lg</code>', 'components.avatar.theming.sizes.rows.sizeLg.description', '3.5rem'],
        ['<code>--nui-avatar-size-xl</code>', 'components.avatar.theming.sizes.rows.sizeXl.description', '5rem'],

        // Tamaños de fuente para iniciales
        ['<code>--nui-avatar-font-size-xs</code>', 'components.avatar.theming.sizes.rows.fontSizeXs.description', '0.625rem'],
        ['<code>--nui-avatar-font-size-sm</code>', 'components.avatar.theming.sizes.rows.fontSizeSm.description', '0.75rem'],
        ['<code>--nui-avatar-font-size-md</code>', 'components.avatar.theming.sizes.rows.fontSizeMd.description', '0.875rem'],
        ['<code>--nui-avatar-font-size-lg</code>', 'components.avatar.theming.sizes.rows.fontSizeLg.description', '1.25rem'],
        ['<code>--nui-avatar-font-size-xl</code>', 'components.avatar.theming.sizes.rows.fontSizeXl.description', '1.5rem'],

        // Tamaños de iconos
        ['<code>--nui-avatar-icon-size-xs</code>', 'components.avatar.theming.sizes.rows.iconSizeXs.description', '0.875rem'],
        ['<code>--nui-avatar-icon-size-sm</code>', 'components.avatar.theming.sizes.rows.iconSizeSm.description', '1rem'],
        ['<code>--nui-avatar-icon-size-md</code>', 'components.avatar.theming.sizes.rows.iconSizeMd.description', '1.25rem'],
        ['<code>--nui-avatar-icon-size-lg</code>', 'components.avatar.theming.sizes.rows.iconSizeLg.description', '1.75rem'],
        ['<code>--nui-avatar-icon-size-xl</code>', 'components.avatar.theming.sizes.rows.iconSizeXl.description', '2.5rem'],
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
          '0.5rem',
        ],
        [
          '<code>--nui-avatar-border-radius-square</code>',
          'components.avatar.theming.styles.rows.borderRadiusSquare.description',
          '0',
        ],

        // Bordes opcionales
        ['<code>--nui-avatar-border-width</code>', 'components.avatar.theming.styles.rows.borderWidth.description', '0.063rem'],
        [
          '<code>--nui-avatar-border-width-bordered</code>',
          'components.avatar.theming.styles.rows.borderWidthBordered.description',
          'calc(0.063rem * 2)',
        ],
        [
          '<code>--nui-avatar-border-outset</code>',
          'components.avatar.theming.styles.rows.borderOutset.description',
          'var(--nui-surface)',
        ],

        // Colores por defecto
        [
          '<code>--nui-avatar-default-bg</code>',
          'components.avatar.theming.styles.rows.defaultBg.description',
          'var(--nui-surface-secondary)',
        ],
        [
          '<code>--nui-avatar-default-color</code>',
          'components.avatar.theming.styles.rows.defaultColor.description',
          'var(--nui-on-surface-secondary)',
        ],

        // Tipografía
        [
          '<code>--nui-avatar-font-weight</code>',
          'components.avatar.theming.styles.rows.fontWeight.description',
          '500',
        ],
        [
          '<code>--nui-avatar-line-height</code>',
          'components.avatar.theming.styles.rows.lineHeight.description',
          '1',
        ],
        [
          '<code>--nui-avatar-text-transform</code>',
          'components.avatar.theming.styles.rows.textTransform.description',
          'uppercase',
        ],
      ],
    },
  },
  {
    id: 'theming-group',
    title: 'components.avatar.theming.group.title',
    description: 'components.avatar.theming.group.description',
    anchor: 'theming-group',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-avatar-group-spacing</code>',
          'components.avatar.theming.group.rows.groupSpacing.description',
          '-0.5rem',
        ],
        [
          '<code>--nui-avatar-group-hover-scale</code>',
          'components.avatar.theming.group.rows.groupHoverScale.description',
          '1.1',
        ],
        [
          '<code>--nui-avatar-group-z-index-hover</code>',
          'components.avatar.theming.group.rows.groupZIndexHover.description',
          '10',
        ],
        [
          '<code>--nui-avatar-z-index-base</code>',
          'components.avatar.theming.group.rows.zIndexBase.description',
          '0',
        ],
        [
          '<code>--nui-avatar-z-index-hover</code>',
          'components.avatar.theming.group.rows.zIndexHover.description',
          '10',
        ],
      ],
    },
  },
  {
    id: 'theming-excess',
    title: 'components.avatar.theming.excess.title',
    description: 'components.avatar.theming.excess.description',
    anchor: 'theming-excess',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-avatar-excess-font-size-xs</code>',
          'components.avatar.theming.excess.rows.excessFontSizeXs.description',
          '0.375rem',
        ],
        [
          '<code>--nui-avatar-excess-font-size-sm</code>',
          'components.avatar.theming.excess.rows.excessFontSizeSm.description',
          '0.5rem',
        ],
        [
          '<code>--nui-avatar-excess-font-size-md</code>',
          'components.avatar.theming.excess.rows.excessFontSizeMd.description',
          '0.625rem',
        ],
        [
          '<code>--nui-avatar-excess-font-size-lg</code>',
          'components.avatar.theming.excess.rows.excessFontSizeLg.description',
          '0.75rem',
        ],
        [
          '<code>--nui-avatar-excess-font-size-xl</code>',
          'components.avatar.theming.excess.rows.excessFontSizeXl.description',
          '0.875rem',
        ],
        [
          '<code>--nui-avatar-excess-font-weight</code>',
          'components.avatar.theming.excess.rows.excessFontWeight.description',
          '600',
        ],
      ],
    },
  },
];
