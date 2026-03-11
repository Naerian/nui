import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente SplitButton
 */
export const SPLIT_BUTTON_API_SECTIONS: ComponentSection[] = [
  // ── INPUTS ────────────────────────────────────────────────────────────────
  {
    id: 'api-inputs',
    title: 'components.splitButton.api.inputs.title',
    description: 'components.splitButton.api.inputs.description',
    anchor: 'inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.splitButton.api.inputs.rows.label',
        ],
        [
          '<code>prefixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.splitButton.api.inputs.rows.prefixIcon',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'components.splitButton.api.inputs.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.splitButton.api.inputs.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.splitButton.api.inputs.rows.variant',
        ],
        [
          '<code>shape</code>',
          'NUIShape',
          '<code class="neutral">rounded</code>',
          'components.splitButton.api.inputs.rows.shape',
        ],
        [
          '<code>raised</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.splitButton.api.inputs.rows.raised',
        ],
        [
          '<code>loading</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.splitButton.api.inputs.rows.loading',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.splitButton.api.inputs.rows.disabled',
        ],
        [
          '<code>disabledTrigger</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.splitButton.api.inputs.rows.disabledTrigger',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'components.splitButton.api.inputs.rows.width',
        ],
        [
          '<code>items</code>',
          'ActionMenuItem[]',
          '<code class="neutral">[]</code>',
          'components.splitButton.api.inputs.rows.items',
        ],
        [
          '<code>type</code>',
          "'button' | 'submit' | 'reset'",
          '<code class="neutral">button</code>',
          'components.splitButton.api.inputs.rows.type',
        ],
        [
          '<code>triggerIcon</code>',
          'string',
          '<code class="neutral">ri-arrow-down-s-line</code>',
          'components.splitButton.api.inputs.rows.triggerIcon',
        ],
        [
          '<code>iconSubmenu</code>',
          'string',
          '<code class="neutral">ri-arrow-right-s-line</code>',
          'components.splitButton.api.inputs.rows.iconSubmenu',
        ],
        [
          '<code>offset</code>',
          'number',
          '<code class="neutral">4</code>',
          'components.splitButton.api.inputs.rows.offset',
        ],
        [
          '<code>offsetSubmenu</code>',
          'number',
          '<code class="neutral">4</code>',
          'components.splitButton.api.inputs.rows.offsetSubmenu',
        ],
        [
          '<code>itemTemplate</code>',
          'TemplateRef&lt;any&gt;',
          '<code class="neutral">undefined</code>',
          'components.splitButton.api.inputs.rows.itemTemplate',
        ],
        [
          '<code>aria-label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.splitButton.api.inputs.rows.ariaLabel',
        ],
        [
          '<code>i18n</code>',
          'Partial&lt;SplitButtonI18n&gt;',
          '<code class="neutral">undefined</code>',
          'components.splitButton.api.inputs.rows.i18n',
        ],
      ],
    },
  },

  // ── OUTPUTS ───────────────────────────────────────────────────────────────
  {
    id: 'api-outputs',
    title: 'components.splitButton.api.outputs.title',
    description: 'components.splitButton.api.outputs.description',
    anchor: 'outputs',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>onClick</code>',
          'EventEmitter&lt;Event&gt;',
          'components.splitButton.api.outputs.rows.onClick',
        ],
        [
          '<code>onItemAction</code>',
          'EventEmitter&lt;ActionMenuItem&gt;',
          'components.splitButton.api.outputs.rows.onItemAction',
        ],
        [
          '<code>menuOpen</code>',
          'EventEmitter&lt;void&gt;',
          'components.splitButton.api.outputs.rows.menuOpen',
        ],
        [
          '<code>menuClose</code>',
          'EventEmitter&lt;void&gt;',
          'components.splitButton.api.outputs.rows.menuClose',
        ],
      ],
    },
  },

  // ── INTERFACE ─────────────────────────────────────────────────────────────
  {
    id: 'api-interface',
    title: 'components.actionMenu.api.interface.title',
    description: 'components.actionMenu.api.interface.description',
    anchor: 'api-interface',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>action</code>',
          'string',
          'components.actionMenu.api.interface.rows.action.description',
        ],
        [
          '<code>label</code>',
          'string',
          'components.actionMenu.api.interface.rows.label.description',
        ],
        [
          '<code>subtitle</code>',
          'string',
          'components.actionMenu.api.interface.rows.subtitle.description',
        ],
        [
          '<code>title</code>',
          'string',
          'components.actionMenu.api.interface.rows.title.description',
        ],
        [
          '<code>icon</code>',
          'string',
          'components.actionMenu.api.interface.rows.icon.description',
        ],
        [
          '<code>shortcut</code>',
          'string',
          'components.actionMenu.api.interface.rows.shortcut.description',
        ],
        [
          '<code>templateRef</code>',
          'TemplateRef<any>',
          'components.actionMenu.api.interface.rows.templateRef.description',
        ],
        ['<code>id</code>', 'string', 'components.actionMenu.api.interface.rows.id.description'],
        [
          '<code>children</code>',
          'ActionMenuItem[]',
          'components.actionMenu.api.interface.rows.children.description',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          'components.actionMenu.api.interface.rows.disabled.description',
        ],
        [
          '<code>selected</code>',
          'boolean',
          'components.actionMenu.api.interface.rows.selected.description',
        ],
        [
          '<code>separator</code>',
          'boolean',
          'components.actionMenu.api.interface.rows.separator.description',
        ],
        [
          '<code>onAction</code>',
          'Function',
          'components.actionMenu.api.interface.rows.onAction.description',
        ],
        ['<code>data</code>', 'any', 'components.actionMenu.api.interface.rows.data.description'],
        [
          '<code>badge</code>',
          'string',
          'components.actionMenu.api.interface.rows.badge.description',
        ],
      ],
    },
  },
];
