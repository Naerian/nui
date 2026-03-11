import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente SplitButton
 */
export const SPLIT_BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  // ── COLORS ────────────────────────────────────────────────────────────────
  {
    id: 'theming-colors',
    title: 'components.splitButton.theming.colors.title',
    description: 'components.splitButton.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: [
        'common.tables.cssVariable',
        'common.tables.description',
      ],
      rows: [
        ['<code>--nui-split-btn-{color}-solid-divider</code>',   'components.splitButton.theming.colors.rows.solidDivider'],
        ['<code>--nui-split-btn-{color}-outline-divider</code>', 'components.splitButton.theming.colors.rows.outlineDivider'],
        ['<code>--nui-split-btn-{color}-ghost-divider</code>',   'components.splitButton.theming.colors.rows.ghostDivider'],
      ],
    },
    note: {
      type: 'info',
      content: 'components.splitButton.theming.colors.note',
    },
  },

  // ── STRUCTURE ─────────────────────────────────────────────────────────────
  {
    id: 'theming-structure',
    title: 'components.splitButton.theming.structure.title',
    description: 'components.splitButton.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: [
        'common.tables.cssVariable',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>--nui-split-btn-divider-width</code>',    '<code class="neutral">1px</code>',   'components.splitButton.theming.structure.rows.dividerWidth'],
        ['<code>--nui-split-btn-trigger-padding</code>',  '<code class="neutral">0 0.5em</code>', 'components.splitButton.theming.structure.rows.triggerPadding'],
        ['<code>--nui-split-btn-trigger-min-width</code>', '<code class="neutral">2em</code>', 'components.splitButton.theming.structure.rows.triggerMinWidth'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.configuration',
        language: 'scss',
        code: `:root {
  /* Divider más grueso */
  --nui-split-btn-divider-width: 2px;

  /* Trigger más ancho */
  --nui-split-btn-trigger-min-width: 2.5em;

  /* Divider personalizado para primary solid */
  --nui-split-btn-primary-solid-divider: rgba(255, 255, 255, 0.5);
}`,
      },
    ],
  },
];
