import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Theming" del componente FabButton.
 * Separada en: Variables de color y Variables estructurales.
 */
export const FAB_BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  // ──────────────────────────────────────────────────────────
  // COLOR VARIABLES
  // ──────────────────────────────────────────────────────────
  {
    id: 'theming-colors',
    title: 'components.fabButton.theming.colors.title',
    description: 'components.fabButton.theming.colors.description',
    anchor: 'colors',
    note: {
      type: 'info',
      content: 'components.fabButton.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.variants'],
      rows: [
        // ── Solid ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-solid-bg</code>',
          'components.fabButton.theming.colors.rows.solidBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-text</code>',
          'components.fabButton.theming.colors.rows.solidText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-border</code>',
          'components.fabButton.theming.colors.rows.solidBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-bg</code>',
          'components.fabButton.theming.colors.rows.solidHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-text</code>',
          'components.fabButton.theming.colors.rows.solidHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-border</code>',
          'components.fabButton.theming.colors.rows.solidHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-active-bg</code>',
          'components.fabButton.theming.colors.rows.solidActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Outline ────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-outline-bg</code>',
          'components.fabButton.theming.colors.rows.outlineBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-text</code>',
          'components.fabButton.theming.colors.rows.outlineText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-border</code>',
          'components.fabButton.theming.colors.rows.outlineBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-bg</code>',
          'components.fabButton.theming.colors.rows.outlineHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-text</code>',
          'components.fabButton.theming.colors.rows.outlineHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-border</code>',
          'components.fabButton.theming.colors.rows.outlineHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-active-bg</code>',
          'components.fabButton.theming.colors.rows.outlineActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Ghost ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-ghost-bg</code>',
          'components.fabButton.theming.colors.rows.ghostBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-text</code>',
          'components.fabButton.theming.colors.rows.ghostText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-border</code>',
          'components.fabButton.theming.colors.rows.ghostBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-bg</code>',
          'components.fabButton.theming.colors.rows.ghostHoverBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-text</code>',
          'components.fabButton.theming.colors.rows.ghostHoverText.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-border</code>',
          'components.fabButton.theming.colors.rows.ghostHoverBorder.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-active-bg</code>',
          'components.fabButton.theming.colors.rows.ghostActiveBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Focus ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-focus-ring</code>',
          'components.fabButton.theming.colors.rows.focusRing.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Badge & misc ───────────────────────────────────
        [
          '<code>--nui-fab-badge-bg</code>',
          'components.fabButton.theming.colors.rows.badgeBg.description',
          'var(--nui-danger)',
        ],
        [
          '<code>--nui-fab-badge-text</code>',
          'components.fabButton.theming.colors.rows.badgeText.description',
          'var(--nui-on-danger)',
        ],
        [
          '<code>--nui-fab-badge-border</code>',
          'components.fabButton.theming.colors.rows.badgeBorder.description',
          'var(--nui-border-subtle)',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // STRUCTURAL VARIABLES
  // ──────────────────────────────────────────────────────────
  {
    id: 'theming-structure',
    title: 'components.fabButton.theming.structure.title',
    description: 'components.fabButton.theming.structure.description',
    anchor: 'structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Layout
        [
          '<code>--nui-fab-radius</code>',
          'components.fabButton.theming.structure.rows.radius.description',
          '3.5rem',
        ],
        [
          '<code>--nui-fab-spacing</code>',
          'components.fabButton.theming.structure.rows.spacing.description',
          '3rem',
        ],

        // Animation
        [
          '<code>--nui-fab-anim-duration</code>',
          'components.fabButton.theming.structure.rows.animDuration.description',
          '200ms',
        ],
        [
          '<code>--nui-fab-anim-easing</code>',
          'components.fabButton.theming.structure.rows.animEasing.description',
          'cubic-bezier(0.4, 0, 0.2, 1)',
        ],
        [
          '<code>--nui-fab-anim-delay-step</code>',
          'components.fabButton.theming.structure.rows.animDelayStep.description',
          '30ms',
        ],

        // Trigger
        [
          '<code>--nui-fab-trigger-rotate</code>',
          'components.fabButton.theming.structure.rows.triggerRotate.description',
          '45deg',
        ],
        [
          '<code>--nui-fab-trigger-icon-scale</code>',
          'components.fabButton.theming.structure.rows.triggerIconScale.description',
          '0.5',
        ],
        [
          '<code>--nui-fab-spin-duration</code>',
          'components.fabButton.theming.structure.rows.spinDuration.description',
          '1s',
        ],

        // Items
        [
          '<code>--nui-fab-item-icon-scale</code>',
          'components.fabButton.theming.structure.rows.itemIconScale.description',
          '0.45',
        ],

        // Tooltip label
        [
          '<code>--nui-fab-tooltip-offset</code>',
          'components.fabButton.theming.structure.rows.tooltipOffset.description',
          '0.5rem',
        ],

        // Focus ring
        [
          '<code>--nui-fab-focus-width</code>',
          'components.fabButton.theming.structure.rows.focusWidth.description',
          '0.125rem',
        ],
        [
          '<code>--nui-fab-focus-offset</code>',
          'components.fabButton.theming.structure.rows.focusOffset.description',
          '0.125rem',
        ],

        // Z-index
        [
          '<code>--nui-fab-z-index</code>',
          'components.fabButton.theming.structure.rows.zIndex.description',
          'var(--nui-z-index-elevated)',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.scss',
        language: 'scss',
        code: `// Override FAB layout tokens globally
:root {
  --nui-fab-radius:          6rem;   // larger radial layouts
  --nui-fab-spacing:         4rem;   // more space between linear items
  --nui-fab-anim-duration:   300ms;  // slower animation
  --nui-fab-anim-delay-step: 50ms;   // wider stagger
  --nui-fab-trigger-rotate:  135deg; // deeper rotation
}`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Override radius directly on the host via style binding -->
<nui-fab-button
  layout="semi-circle"
  [radius]="'6rem'"
  [items]="actions"
/>`,
      },
    ],
  },
];
