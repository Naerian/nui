import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente Button
 * Separada en: Variables de color y Variables estructurales
 */
export const BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.button.theming.colors.title',
    description: 'components.button.theming.colors.description',
    anchor: 'colors',
    note: {
      type: 'info',
      content: 'components.button.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.variants'],
      rows: [
        // Solid variants
        [
          '<code>--nui-button-{color}-solid-bg</code>',
          'components.button.theming.colors.rows.solidBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-text</code>',
          'components.button.theming.colors.rows.solidText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-border</code>',
          'components.button.theming.colors.rows.solidBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-bg</code>',
          'components.button.theming.colors.rows.solidHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-text</code>',
          'components.button.theming.colors.rows.solidHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-border</code>',
          'components.button.theming.colors.rows.solidHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-active-bg</code>',
          'components.button.theming.colors.rows.solidActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-active-border</code>',
          'components.button.theming.colors.rows.solidActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Outline variants
        [
          '<code>--nui-button-{color}-outline-bg</code>',
          'components.button.theming.colors.rows.outlineBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-text</code>',
          'components.button.theming.colors.rows.outlineText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-border</code>',
          'components.button.theming.colors.rows.outlineBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-bg</code>',
          'components.button.theming.colors.rows.outlineHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-text</code>',
          'components.button.theming.colors.rows.outlineHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-border</code>',
          'components.button.theming.colors.rows.outlineHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-active-bg</code>',
          'components.button.theming.colors.rows.outlineActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-active-border</code>',
          'components.button.theming.colors.rows.outlineActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Ghost variants
        [
          '<code>--nui-button-{color}-ghost-bg</code>',
          'components.button.theming.colors.rows.ghostBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-text</code>',
          'components.button.theming.colors.rows.ghostText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-border</code>',
          'components.button.theming.colors.rows.ghostBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-bg</code>',
          'components.button.theming.colors.rows.ghostHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-text</code>',
          'components.button.theming.colors.rows.ghostHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-border</code>',
          'components.button.theming.colors.rows.ghostHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-active-bg</code>',
          'components.button.theming.colors.rows.ghostActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-active-border</code>',
          'components.button.theming.colors.rows.ghostActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Focus
        [
          '<code>--nui-button-{color}-focus-color</code>',
          'components.button.theming.colors.rows.focusColor.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.button.theming.structure.title',
    description: 'components.button.theming.structure.description',
    anchor: 'structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Spacing
        [
          '<code>--nui-button-gap</code>',
          'components.button.theming.structure.rows.gap.description',
          '0.5rem',
        ],
        [
          '<code>--nui-button-padding-x-xs</code>',
          'components.button.theming.structure.rows.paddingXXs.description',
          '0.5rem',
        ],
        [
          '<code>--nui-button-padding-y-xs</code>',
          'components.button.theming.structure.rows.paddingYXs.description',
          '0.25rem',
        ],
        [
          '<code>--nui-button-padding-x-sm</code>',
          'components.button.theming.structure.rows.paddingXSm.description',
          '0.75rem',
        ],
        [
          '<code>--nui-button-padding-y-sm</code>',
          'components.button.theming.structure.rows.paddingYSm.description',
          '0.375rem',
        ],
        [
          '<code>--nui-button-padding-x-md</code>',
          'components.button.theming.structure.rows.paddingXMd.description',
          '1rem',
        ],
        [
          '<code>--nui-button-padding-y-md</code>',
          'components.button.theming.structure.rows.paddingYMd.description',
          '0.5rem',
        ],
        [
          '<code>--nui-button-padding-x-lg</code>',
          'components.button.theming.structure.rows.paddingXLg.description',
          '1.25rem',
        ],
        [
          '<code>--nui-button-padding-y-lg</code>',
          'components.button.theming.structure.rows.paddingYLg.description',
          '0.625rem',
        ],
        [
          '<code>--nui-button-padding-x-xl</code>',
          'components.button.theming.structure.rows.paddingXXl.description',
          '1.5rem',
        ],
        [
          '<code>--nui-button-padding-y-xl</code>',
          'components.button.theming.structure.rows.paddingYXl.description',
          '0.75rem',
        ],

        // Border radius
        [
          '<code>--nui-button-radius-xs</code>',
          'components.button.theming.structure.rows.radiusXs.description',
          '0.25rem',
        ],
        [
          '<code>--nui-button-radius-sm</code>',
          'components.button.theming.structure.rows.radiusSm.description',
          '0.375rem',
        ],
        [
          '<code>--nui-button-radius-md</code>',
          'components.button.theming.structure.rows.radiusMd.description',
          '0.5rem',
        ],
        [
          '<code>--nui-button-radius-lg</code>',
          'components.button.theming.structure.rows.radiusLg.description',
          '0.625rem',
        ],
        [
          '<code>--nui-button-radius-xl</code>',
          'components.button.theming.structure.rows.radiusXl.description',
          '0.75rem',
        ],

        // Font sizes
        [
          '<code>--nui-button-font-size-xs</code>',
          'components.button.theming.structure.rows.fontSizeXs.description',
          '0.75rem',
        ],
        [
          '<code>--nui-button-font-size-sm</code>',
          'components.button.theming.structure.rows.fontSizeSm.description',
          '0.875rem',
        ],
        [
          '<code>--nui-button-font-size-md</code>',
          'components.button.theming.structure.rows.fontSizeMd.description',
          '1rem',
        ],
        [
          '<code>--nui-button-font-size-lg</code>',
          'components.button.theming.structure.rows.fontSizeLg.description',
          '1.125rem',
        ],
        [
          '<code>--nui-button-font-size-xl</code>',
          'components.button.theming.structure.rows.fontSizeXl.description',
          '1.25rem',
        ],

        // Icon sizes
        [
          '<code>--nui-button-icon-size-xs</code>',
          'components.button.theming.structure.rows.iconSizeXs.description',
          '1rem',
        ],
        [
          '<code>--nui-button-icon-size-sm</code>',
          'components.button.theming.structure.rows.iconSizeSm.description',
          '1.125rem',
        ],
        [
          '<code>--nui-button-icon-size-md</code>',
          'components.button.theming.structure.rows.iconSizeMd.description',
          '1.25rem',
        ],
        [
          '<code>--nui-button-icon-size-lg</code>',
          'components.button.theming.structure.rows.iconSizeLg.description',
          '1.375rem',
        ],
        [
          '<code>--nui-button-icon-size-xl</code>',
          'components.button.theming.structure.rows.iconSizeXl.description',
          '1.5rem',
        ],

        // Animations & Effects
        [
          '<code>--nui-button-transition</code>',
          'components.button.theming.structure.rows.transition.description',
          '0.2s ease',
        ],
        [
          '<code>--nui-button-spin-duration</code>',
          'components.button.theming.structure.rows.spinDuration.description',
          '0.8s',
        ],
      ],
    },
  },
];
