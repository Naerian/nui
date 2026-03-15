import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Avatar
 * Dividido en Inputs del componente avatar, Inputs del grupo y Modelos
 */
export const AVATAR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { AvatarComponent, AvatarGroupComponent } from 'nui';

@Component({
  standalone: true,
  imports: [AvatarComponent, AvatarGroupComponent],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.avatar.api.inputs.title',
    description: 'components.avatar.api.inputs.description',
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
          '<code>src</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.src.description',
        ],
        [
          '<code>alt</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.alt.description',
        ],
        [
          '<code>initials</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.initials.description',
        ],
        [
          '<code>icon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.icon.description',
        ],
        ['<code>size</code>', 'NUISize', "'md'", 'components.avatar.api.inputs.rows.size.description'],
        [
          '<code>customSize</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.customSize.description',
        ],
        [
          '<code>variant</code>',
          "'circular' | 'rounded' | 'square'",
          "'circular'",
          'components.avatar.api.inputs.rows.variant.description',
        ],
        [
          '<code>color</code>',
          'NUIColor | string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.color.description',
        ],
        [
          '<code>bordered</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.avatar.api.inputs.rows.bordered.description',
        ],
        [
          '<code>tooltip</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.tooltip.description',
        ],
      ],
    },
  },
  {
    id: 'api-group-inputs',
    title: 'components.avatar.api.groupInputs.title',
    description: 'components.avatar.api.groupInputs.description',
    anchor: 'api-group-inputs',
    note: {
      type: 'info',
      content: 'components.avatar.api.groupInputs.note',
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
          '<code>avatars</code>',
          'AvatarConfig[]',
          '<code class="neutral">[]</code>',
          'components.avatar.api.groupInputs.rows.avatars.description',
        ],
        [
          '<code>max</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.groupInputs.rows.max.description',
        ],
        [
          '<code>spacing</code>',
          'number',
          '<code class="neutral">-8</code>',
          'components.avatar.api.groupInputs.rows.spacing.description',
        ],
        [
          '<code>layout</code>',
          "'stacked' | 'inline'",
          "'inline'",
          'components.avatar.api.groupInputs.rows.layout.description',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.groupInputs.rows.size.description',
        ],
        [
          '<code>variant</code>',
          "'circular' | 'rounded' | 'square'",
          "'circular'",
          'components.avatar.api.groupInputs.rows.variant.description',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.groupInputs.rows.color.description',
        ],
        [
          '<code>bordered</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.avatar.api.groupInputs.rows.bordered.description',
        ],
        [
          '<code>customSize</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.groupInputs.rows.customSize.description',
        ],
      ],
    },
  },
  {
    id: 'api-models',
    title: 'components.avatar.api.models.title',
    description: 'components.avatar.api.models.description',
    anchor: 'api-models',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.parameters',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>AvatarVariant</code>',
          'type',
          "'circular' | 'rounded' | 'square'",
          'components.avatar.api.models.rows.AvatarVariant.description',
        ],
        [
          '<code>AvatarConfig</code>',
          'interface',
          '-',
          'components.avatar.api.models.rows.AvatarConfig.description',
        ],
      ],
    },
  },
];
