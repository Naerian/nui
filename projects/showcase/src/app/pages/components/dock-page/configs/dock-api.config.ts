import { ComponentSection } from '../../../../core';

export const DOCK_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-service',
    title: 'components.dock.api.service.title',
    description: 'components.dock.api.service.description',
    anchor: 'api-service',
    table: {
      headers: [
        'common.tables.method',
        'common.tables.parameters',
        'common.tables.returns',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>add()</code>',
          'item: NuiDockItem',
          'void',
          'components.dock.api.service.rows.add',
        ],
        [
          '<code>remove()</code>',
          'id: string',
          'void',
          'components.dock.api.service.rows.remove',
        ],
        [
          '<code>restore()</code>',
          'id: string',
          'void',
          'components.dock.api.service.rows.restore',
        ],
        [
          '<code>clearAll()</code>',
          '-',
          'void',
          'components.dock.api.service.rows.clearAll',
        ],
        [
          '<code>items</code>',
          '-',
          'Signal&lt;NuiDockItem[]&gt;',
          'components.dock.api.service.rows.items',
        ],
      ],
    },
  },
  {
    id: 'api-dock-item',
    title: 'components.dock.api.dock-item.title',
    description: 'components.dock.api.dock-item.description',
    anchor: 'api-dock-item',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>id</code>',
          'string',
          '-',
          'components.dock.api.dock-item.rows.id',
        ],
        [
          '<code>type</code>',
          "'modal' | 'sidebar'",
          '-',
          'components.dock.api.dock-item.rows.type',
        ],
        [
          '<code>title</code>',
          'string',
          '-',
          'components.dock.api.dock-item.rows.title',
        ],
        [
          '<code>prefixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.prefixIcon',
        ],
        [
          '<code>suffixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.suffixIcon',
        ],
        [
          '<code>hideSuffixIcon</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.hideSuffixIcon',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.color',
        ],
        [
          '<code>position</code>',
          'SidebarPanelPosition',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.position',
        ],
        [
          '<code>cssClass</code>',
          'string | string[]',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-item.rows.cssClass',
        ],
        [
          '<code>restore</code>',
          '() =&gt; void',
          '-',
          'components.dock.api.dock-item.rows.restore',
        ],
      ],
    },
  },
  {
    id: 'api-dock-tab-config',
    title: 'components.dock.api.dock-tab-config.title',
    description: 'components.dock.api.dock-tab-config.description',
    anchor: 'api-dock-tab-config',
    note: {
      type: 'info',
      content: 'components.dock.api.dock-tab-config.note',
    },
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>prefixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-tab-config.rows.prefixIcon',
        ],
        [
          '<code>suffixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-tab-config.rows.suffixIcon',
        ],
        [
          '<code>hideSuffixIcon</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-tab-config.rows.hideSuffixIcon',
        ],
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-tab-config.rows.label',
        ],
        [
          '<code>cssClass</code>',
          'string | string[]',
          '<code class="neutral">undefined</code>',
          'components.dock.api.dock-tab-config.rows.cssClass',
        ],
      ],
    },
  },
];
