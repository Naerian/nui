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
          '<code>--nui-btn-{color}-solid-bg</code>',
          'components.button.theming.colors.rows.solidBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-text</code>',
          'components.button.theming.colors.rows.solidText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-border</code>',
          'components.button.theming.colors.rows.solidBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-hover-bg</code>',
          'components.button.theming.colors.rows.solidHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-hover-text</code>',
          'components.button.theming.colors.rows.solidHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-hover-border</code>',
          'components.button.theming.colors.rows.solidHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-active-bg</code>',
          'components.button.theming.colors.rows.solidActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-solid-active-border</code>',
          'components.button.theming.colors.rows.solidActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Outline variants
        [
          '<code>--nui-btn-{color}-outline-bg</code>',
          'components.button.theming.colors.rows.outlineBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-text</code>',
          'components.button.theming.colors.rows.outlineText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-border</code>',
          'components.button.theming.colors.rows.outlineBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-hover-bg</code>',
          'components.button.theming.colors.rows.outlineHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-hover-text</code>',
          'components.button.theming.colors.rows.outlineHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-hover-border</code>',
          'components.button.theming.colors.rows.outlineHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-active-bg</code>',
          'components.button.theming.colors.rows.outlineActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-outline-active-border</code>',
          'components.button.theming.colors.rows.outlineActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Ghost variants
        [
          '<code>--nui-btn-{color}-ghost-bg</code>',
          'components.button.theming.colors.rows.ghostBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-text</code>',
          'components.button.theming.colors.rows.ghostText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-border</code>',
          'components.button.theming.colors.rows.ghostBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-hover-bg</code>',
          'components.button.theming.colors.rows.ghostHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-hover-text</code>',
          'components.button.theming.colors.rows.ghostHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-hover-border</code>',
          'components.button.theming.colors.rows.ghostHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-active-bg</code>',
          'components.button.theming.colors.rows.ghostActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-ghost-active-border</code>',
          'components.button.theming.colors.rows.ghostActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Link variants
        [
          '<code>--nui-btn-{color}-link-bg</code>',
          'components.button.theming.colors.rows.linkBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-text</code>',
          'components.button.theming.colors.rows.linkText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-border</code>',
          'components.button.theming.colors.rows.linkBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-hover-bg</code>',
          'components.button.theming.colors.rows.linkHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-hover-text</code>',
          'components.button.theming.colors.rows.linkHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-hover-border</code>',
          'components.button.theming.colors.rows.linkHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-active-bg</code>',
          'components.button.theming.colors.rows.linkActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-active-border</code>',
          'components.button.theming.colors.rows.linkActiveBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-btn-{color}-link-active-text</code>',
          'components.button.theming.colors.rows.linkActiveText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Focus
        [
          '<code>--nui-btn-{color}-focus-ring</code>',
          'components.button.theming.colors.rows.focusRing.description',
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

        // Border
        [
          '<code>--nui-button-border-width</code>',
          'components.button.theming.structure.rows.borderWidth.description',
          'var(--nui-border-width-sm)',
        ],

        // Border radius
        [
          '<code>--nui-button-radius-xs</code>',
          'components.button.theming.structure.rows.radiusXs.description',
          'var(--nui-border-radius-xs)',
        ],
        [
          '<code>--nui-button-radius-sm</code>',
          'components.button.theming.structure.rows.radiusSm.description',
          'var(--nui-border-radius-sm)',
        ],
        [
          '<code>--nui-button-radius-md</code>',
          'components.button.theming.structure.rows.radiusMd.description',
          'var(--nui-border-radius-md)',
        ],
        [
          '<code>--nui-button-radius-lg</code>',
          'components.button.theming.structure.rows.radiusLg.description',
          'var(--nui-border-radius-lg)',
        ],
        [
          '<code>--nui-button-radius-xl</code>',
          'components.button.theming.structure.rows.radiusXl.description',
          'var(--nui-border-radius-xl)',
        ],

        // Typography
        [
          '<code>--nui-button-font-weight</code>',
          'components.button.theming.structure.rows.fontWeight.description',
          'var(--nui-font-weight-semibold)',
        ],

        // Animations & Effects
        [
          '<code>--nui-button-spin-duration</code>',
          'components.button.theming.structure.rows.spinDuration.description',
          '1s',
        ],

        // Link variant
        [
          '<code>--nui-button-link-underline-offset</code>',
          'components.button.theming.structure.rows.linkUnderlineOffset.description',
          '0.25em',
        ],
        [
          '<code>--nui-button-link-underline-thickness</code>',
          'components.button.theming.structure.rows.linkUnderlineThickness.description',
          'var(--nui-border-width-sm)',
        ],
        [
          '<code>--nui-button-link-underline-skip-ink</code>',
          'components.button.theming.structure.rows.linkUnderlineSkipInk.description',
          'auto',
        ],
      ],
    },
  },
];
