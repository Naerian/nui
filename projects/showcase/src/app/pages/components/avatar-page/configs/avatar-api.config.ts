import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Avatar
 * Dividido en Inputs y Outputs para mejor organización
 */
export const AVATAR_API_SECTIONS: ComponentSection[] = [
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
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.color.description',
        ],
        [
          '<code>textColor</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.avatar.api.inputs.rows.textColor.description',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.avatar.api.outputs.title',
    description: 'components.avatar.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>imageError</code>',
          'EventEmitter<Event>',
          'components.avatar.api.outputs.rows.imageError.description',
        ],
      ],
    },
  },
];
