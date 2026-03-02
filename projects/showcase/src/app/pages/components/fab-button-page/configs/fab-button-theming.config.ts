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
      headers: [
        'common.tables.cssVariable',
        'common.tables.description',
        'common.tables.variants',
      ],
      rows: [
        // ── Solid ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-solid-bg</code>',
          'Background color — solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-text</code>',
          'Text color — solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-border</code>',
          'Border color — solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-bg</code>',
          'Hover background — solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-text</code>',
          'Hover text — solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-hover-border</code>',
          'Hover border — solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-solid-active-bg</code>',
          'Active background — solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Outline ────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-outline-bg</code>',
          'Background color — outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-text</code>',
          'Text color — outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-border</code>',
          'Border color — outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-bg</code>',
          'Hover background — outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-text</code>',
          'Hover text — outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-hover-border</code>',
          'Hover border — outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-outline-active-bg</code>',
          'Active background — outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Ghost ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-ghost-bg</code>',
          'Background color — ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-text</code>',
          'Text color — ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-border</code>',
          'Border color — ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-bg</code>',
          'Hover background — ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-text</code>',
          'Hover text — ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-hover-border</code>',
          'Hover border — ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-fab-{color}-ghost-active-bg</code>',
          'Active background — ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // ── Focus ──────────────────────────────────────────
        [
          '<code>--nui-fab-{color}-focus-ring</code>',
          'Focus ring color (semi-transparent)',
          'primary, secondary, accent, success, info, warning, danger, neutral',
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
      headers: [
        'common.tables.cssVariable',
        'common.tables.description',
        'common.tables.default',
      ],
      rows: [
        // Layout
        ['<code>--nui-fab-radius</code>',      'Radius for circle / semi-circle / quarter-circle layouts', '4rem'],
        ['<code>--nui-fab-spacing</code>',     'Step distance between items in linear layout',             '3.5rem'],

        // Animation
        ['<code>--nui-fab-anim-duration</code>',    'Enter/leave transition duration for items',            '200ms'],
        ['<code>--nui-fab-anim-easing</code>',      'Easing curve shared by all animation types',          'cubic-bezier(0.4, 0, 0.2, 1)'],
        ['<code>--nui-fab-anim-delay-step</code>',  'Stagger delay delta per item',                        '30ms'],

        // Trigger
        ['<code>--nui-fab-trigger-rotate</code>',   'Trigger icon rotation when expanded',                 '45deg'],
        ['<code>--nui-fab-trigger-size-{sz}</code>', 'Trigger button diameter per size token (xs…xl)',      '3rem (md)'],
        ['<code>--nui-fab-trigger-icon-{sz}</code>', 'Trigger icon font-size per size token',               '1.5rem (md)'],

        // Items
        ['<code>--nui-fab-item-size-{sz}</code>',   'Item button diameter per size token (xs…xl)',         '2.5rem (md)'],
        ['<code>--nui-fab-item-icon-{sz}</code>',   'Item icon font-size per size token',                  '1.125rem (md)'],

        // Backdrop
        ['<code>--nui-fab-backdrop-bg</code>',      'Backdrop overlay background color',                   'rgba(0,0,0,0.2)'],
        ['<code>--nui-fab-backdrop-blur</code>',    'Backdrop CSS blur amount',                             '2px'],

        // Tooltip label
        ['<code>--nui-fab-tooltip-offset</code>',   'Gap between item button and its inline tooltip label','0.5rem'],

        // Focus ring
        ['<code>--nui-fab-focus-width</code>',      'Focus outline width',                                 '0.125rem'],
        ['<code>--nui-fab-focus-offset</code>',     'Focus outline offset',                                '0.125rem'],
      ],
    },
    examples: [
      {
        title: 'Customisation example (SCSS)',
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
        title: 'Per-instance override (inline)',
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
