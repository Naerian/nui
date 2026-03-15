import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente Button
 * Separada en múltiples secciones: Inputs, Outputs, etc.
 */
export const BUTTON_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { ButtonComponent, ButtonDirective } from 'nui';

@Component({
  standalone: true,
  imports: [ButtonComponent, ButtonDirective],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.button.api.inputs.title',
    description: 'components.button.api.inputs.description',
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
          '<code>variant</code>',
          'NUIVariant | "link"',
          '<code class="neutral">solid</code>',
          'components.button.api.inputs.rows.variant.description',
        ],
        ['<code>shape</code>', 'NUIShape', '<code class="neutral">rounded</code>', 'components.button.api.inputs.rows.shape.description'],
        [
          '<code>raised</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.button.api.inputs.rows.raised.description',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'components.button.api.inputs.rows.color.description',
        ],
        ['<code>size</code>', 'NUISize', '<code class="neutral">md</code>', 'components.button.api.inputs.rows.size.description'],
        [
          '<code>prefixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.button.api.inputs.rows.prefixIcon.description',
        ],
        [
          '<code>suffixIcon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.button.api.inputs.rows.suffixIcon.description',
        ],
        [
          '<code>loading</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.button.api.inputs.rows.loading.description',
        ],
        [
          '<code>loadingPosition</code>',
          "'start' | 'center' | 'end'",
          '<code class="neutral">start</code>',
          'components.button.api.inputs.rows.loadingPosition.description',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full' | 'fit'",
          '<code class="neutral">auto</code>',
          'components.button.api.inputs.rows.width.description',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.button.api.inputs.rows.disabled.description',
        ],
        [
          '<code>type</code>',
          "'button' | 'submit' | 'reset'",
          '<code class="neutral">button</code>',
          'components.button.api.inputs.rows.type.description',
        ],
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.button.api.inputs.rows.label.description',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">null</code>',
          'components.button.api.inputs.rows.title.description',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">null</code>',
          'components.button.api.inputs.rows.ariaLabel.description',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.button.api.outputs.title',
    description: 'components.button.api.outputs.description',
    anchor: 'outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>onClick</code>',
          'EventEmitter<Event>',
          'components.button.api.outputs.rows.onClick.description',
        ],
      ],
    },
  },
  {
    id: 'api-directive',
    title: 'components.button.api.directive.title',
    description: 'components.button.api.directive.description',
    anchor: 'directive',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>variant</code>', 'NUIVariant | "link"', '<code class="neutral">solid</code>', 'components.button.api.inputs.rows.variant.description'],
        ['<code>shape</code>', 'NUIShape', '<code class="neutral">rounded</code>', 'components.button.api.inputs.rows.shape.description'],
        ['<code>raised</code>', 'boolean', '<code class="neutral">false</code>', 'components.button.api.inputs.rows.raised.description'],
        ['<code>color</code>', 'NUIColor', '<code class="neutral">primary</code>', 'components.button.api.inputs.rows.color.description'],
        ['<code>size</code>', 'NUISize', '<code class="neutral">md</code>', 'components.button.api.inputs.rows.size.description'],
        ['<code>prefixIcon</code>', 'string', '<code class="neutral">undefined</code>', 'components.button.api.inputs.rows.prefixIcon.description'],
        ['<code>suffixIcon</code>', 'string', '<code class="neutral">undefined</code>', 'components.button.api.inputs.rows.suffixIcon.description'],
        ['<code>loading</code>', 'boolean', '<code class="neutral">false</code>', 'components.button.api.inputs.rows.loading.description'],
        ['<code>loadingPosition</code>', "'start' | 'center' | 'end'", '<code class="neutral">start</code>', 'components.button.api.inputs.rows.loadingPosition.description'],
        ['<code>width</code>', "'auto' | 'full' | 'fit'", '<code class="neutral">auto</code>', 'components.button.api.inputs.rows.width.description'],
        ['<code>disabled</code>', 'boolean', '<code class="neutral">false</code>', 'components.button.api.inputs.rows.disabled.description'],
        ['<code>type</code>', "'button' | 'submit' | 'reset'", '<code class="neutral">button</code>', 'components.button.api.inputs.rows.type.description'],
        ['<code>label</code>', 'string', '<code class="neutral">undefined</code>', 'components.button.api.inputs.rows.label.description'],
        ['<code>onClick</code>', 'OutputEmitterRef<Event>', '-', 'components.button.api.outputs.rows.onClick.description'],
      ],
    },
  },
  {
    id: 'api-models',
    title: 'components.button.api.models.title',
    description: 'components.button.api.models.description',
    anchor: 'models',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.parameters',
        'common.tables.description',
      ],
      rows: [
        ['<code>ButtonType</code>', 'type', "'button' | 'submit' | 'reset'", 'components.button.api.models.rows.ButtonType.description'],
        ['<code>ButtonTypeEnum</code>', 'enum', '-', 'components.button.api.models.rows.ButtonTypeEnum.description'],
        [
          '<code>ButtonLoadingPosition</code>',
          'type',
          "'start' | 'center' | 'end'",
          'components.button.api.models.rows.ButtonLoadingPosition.description',
        ],
        [
          '<code>ButtonLoadingPositionEnum</code>',
          'enum',
          '-',
          'components.button.api.models.rows.ButtonLoadingPositionEnum.description',
        ],
        [
          '<code>ButtonWidth</code>',
          'type',
          "'auto' | 'full' | 'fit'",
          'components.button.api.models.rows.ButtonWidth.description',
        ],
        ['<code>ButtonWidthEnum</code>', 'enum', '-', 'components.button.api.models.rows.ButtonWidthEnum.description'],
      ],
    },
  },
];
