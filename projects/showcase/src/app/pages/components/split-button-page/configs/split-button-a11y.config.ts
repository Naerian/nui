import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accessibility del componente SplitButton
 */
export const SPLIT_BUTTON_A11Y_SECTIONS: ComponentSection[] = [
  // ── ROLES ─────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.splitButton.a11y.roles.title',
    description: 'components.splitButton.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.binding',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        ['<code>role</code> (main btn)', '<code class="neutral">button</code>', 'components.splitButton.a11y.roles.rows.mainRole'],
        ['<code>role</code> (trigger btn)', '<code class="neutral">button</code>', 'components.splitButton.a11y.roles.rows.triggerRole'],
        ['<code>aria-haspopup</code>', '<code class="neutral">menu</code>', 'components.splitButton.a11y.roles.rows.ariaHaspopup'],
        ['<code>aria-expanded</code>', '<code class="neutral">true | false</code>', 'components.splitButton.a11y.roles.rows.ariaExpanded'],
        ['<code>role</code> (panel)', '<code class="neutral">menu</code>', 'components.splitButton.a11y.roles.rows.panelRole'],
        ['<code>role</code> (item)', '<code class="neutral">menuitem</code>', 'components.splitButton.a11y.roles.rows.itemRole'],
      ],
    },
  },

  // ── NAMING ────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.splitButton.a11y.naming.title',
    description: 'components.splitButton.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'warning',
      content: 'components.splitButton.a11y.naming.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Aria-label en el botón principal -->
<nui-split-button
  label="Save"
  aria-label="Save document"
  [items]="items"
></nui-split-button>

<!-- Aria-label del disparador via i18n input -->
<nui-split-button
  label="Save"
  [items]="items"
  [i18n]="{ triggerAriaLabel: 'Open save options' }"
></nui-split-button>`,
      },
    ],
  },

  // ── KEYBOARD ──────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.splitButton.a11y.keyboard.title',
    description: 'components.splitButton.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: [
        'common.tables.binding',
        'common.tables.description',
      ],
      rows: [
        ['<kbd>Tab</kbd>', 'components.splitButton.a11y.keyboard.rows.tab'],
        ['<kbd>Space</kbd> / <kbd>Enter</kbd>', 'components.splitButton.a11y.keyboard.rows.enter'],
        ['<kbd>↑</kbd> <kbd>↓</kbd>', 'components.splitButton.a11y.keyboard.rows.arrows'],
        ['<kbd>→</kbd>', 'components.splitButton.a11y.keyboard.rows.right'],
        ['<kbd>←</kbd> / <kbd>Esc</kbd>', 'components.splitButton.a11y.keyboard.rows.esc'],
      ],
    },
  },
];
