import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Action Menu
 * Dividido en Inputs, Outputs e Interfaces para mejor organización
 */
export const ACTION_MENU_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.actionMenu.api.inputs.title',
    description: 'components.actionMenu.api.inputs.description',
    anchor: 'api-inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>items</code>',
          'ActionMenuItem[]',
          '<code class="neutral">[]</code>',
          'components.actionMenu.api.inputs.rows.items.description',
        ],
        [
          '<code>type</code>',
          "'static' | 'dynamic'",
          '<code class="neutral">dynamic</code>',
          'components.actionMenu.api.inputs.rows.type.description',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'components.actionMenu.api.inputs.rows.color.description',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.actionMenu.api.inputs.rows.size.description',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.actionMenu.api.inputs.rows.variant.description',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'components.actionMenu.api.inputs.rows.width.description',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.actionMenu.api.inputs.rows.disabled.description',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">""</code>',
          'components.actionMenu.api.inputs.rows.title.description',
        ],
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.actionMenu.api.inputs.rows.label.description',
        ],
        [
          '<code>icon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.actionMenu.api.inputs.rows.icon.description',
        ],
        [
          '<code>iconPosition</code>',
          "'start' | 'end'",
          '<code class="neutral">start</code>',
          'components.actionMenu.api.inputs.rows.iconPosition.description',
        ],
        [
          '<code>iconSubmenu</code>',
          'string',
          '<code class="neutral">ri-arrow-right-s-line</code>',
          'components.actionMenu.api.inputs.rows.iconSubmenu.description',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.actionMenu.api.inputs.rows.ariaLabel.description',
        ],
        [
          '<code>itemTemplate</code>',
          'TemplateRef<any>',
          '<code class="neutral">undefined</code>',
          'components.actionMenu.api.inputs.rows.itemTemplate.description',
        ],
        [
          '<code>offset</code>',
          'number',
          '<code class="neutral">5</code>',
          'components.actionMenu.api.inputs.rows.offset.description',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.actionMenu.api.outputs.title',
    description: 'components.actionMenu.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>onItemAction</code>',
          'EventEmitter<ActionMenuItem>',
          'components.actionMenu.api.outputs.rows.onItemAction.description',
        ],
        [
          '<code>onSelectionChange</code>',
          'EventEmitter<ActionMenuItem>',
          'components.actionMenu.api.outputs.rows.onSelectionChange.description',
        ],
        ['<code>menuOpen</code>', 'EventEmitter<void>', 'components.actionMenu.api.outputs.rows.menuOpen.description'],
        ['<code>menuClose</code>', 'EventEmitter<void>', 'components.actionMenu.api.outputs.rows.menuClose.description'],
      ],
    },
  },
  {
    id: 'api-interface',
    title: 'components.actionMenu.api.interface.title',
    description: 'components.actionMenu.api.interface.description',
    anchor: 'api-interface',
    table: {
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>action</code>', 'string', 'components.actionMenu.api.interface.rows.action.description'],
        ['<code>label</code>', 'string', 'components.actionMenu.api.interface.rows.label.description'],
        ['<code>subtitle</code>', 'string', 'components.actionMenu.api.interface.rows.subtitle.description'],
        ['<code>title</code>', 'string', 'components.actionMenu.api.interface.rows.title.description'],
        ['<code>icon</code>', 'string', 'components.actionMenu.api.interface.rows.icon.description'],
        ['<code>shortcut</code>', 'string', 'components.actionMenu.api.interface.rows.shortcut.description'],
        ['<code>templateRef</code>', 'TemplateRef<any>', 'components.actionMenu.api.interface.rows.templateRef.description'],
        ['<code>id</code>', 'string', 'components.actionMenu.api.interface.rows.id.description'],
        ['<code>children</code>', 'ActionMenuItem[]', 'components.actionMenu.api.interface.rows.children.description'],
        ['<code>disabled</code>', 'boolean', 'components.actionMenu.api.interface.rows.disabled.description'],
        ['<code>selected</code>', 'boolean', 'components.actionMenu.api.interface.rows.selected.description'],
        ['<code>separator</code>', 'boolean', 'components.actionMenu.api.interface.rows.separator.description'],
        ['<code>onAction</code>', 'Function', 'components.actionMenu.api.interface.rows.onAction.description'],
        [
          '<code>data</code>',
          'any',
          'components.actionMenu.api.interface.rows.data.description',
        ],
        ['<code>badge</code>', 'string', 'components.actionMenu.api.interface.rows.badge.description'],
      ],
    },
  },
];
