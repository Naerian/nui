import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Select Button
 * Dividido en Inputs y Outputs para mejor organización
 */
export const SELECT_BUTTON_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { SelectButtonComponent } from 'nui';

@Component({
  standalone: true,
  imports: [SelectButtonComponent],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.selectButton.api.inputs.title',
    description: 'components.selectButton.api.inputs.description',
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
          '<code>options</code>',
          'any[]',
          '-',
          'components.selectButton.api.inputs.rows.options.description',
        ],
        [
          '<code>mode</code>',
          "'radio' | 'checkbox'",
          '<code class="neutral">radio</code>',
          'components.selectButton.api.inputs.rows.mode.description',
        ],
        [
          '<code>labelBy</code>',
          'string',
          '<code class="neutral">label</code>',
          'components.selectButton.api.inputs.rows.labelBy.description',
        ],
        [
          '<code>valueBy</code>',
          'string',
          '<code class="neutral">value</code>',
          'components.selectButton.api.inputs.rows.valueBy.description',
        ],
        [
          '<code>tooltipBy</code>',
          'string',
          '<code class="neutral">tooltip</code>',
          'components.selectButton.api.inputs.rows.tooltipBy.description',
        ],
        [
          '<code>iconBy</code>',
          'string',
          '<code class="neutral">icon</code>',
          'components.selectButton.api.inputs.rows.iconBy.description',
        ],
        [
          '<code>disabledBy</code>',
          'string',
          '<code class="neutral">disabled</code>',
          'components.selectButton.api.inputs.rows.disabledBy.description',
        ],
        [
          '<code>iconOnly</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.selectButton.api.inputs.rows.iconOnly.description',
        ],
        [
          '<code>variant</code>',
          "SelectBtnVariant",
          '<code class="neutral">undefined</code>',
          'components.selectButton.api.inputs.rows.variant.description',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'components.selectButton.api.inputs.rows.color.description',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">undefined</code>',
          'components.selectButton.api.inputs.rows.size.description',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'components.selectButton.api.inputs.rows.width.description',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.selectButton.api.inputs.rows.disabled.description',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.selectButton.api.outputs.title',
    description: 'components.selectButton.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>valueChange</code>',
          'OutputEmitterRef<any>',
          'components.selectButton.api.outputs.rows.valueChange.description',
        ],
      ],
    },
  },
  {
    id: 'api-models',
    title: 'components.selectButton.api.models.title',
    description: 'components.selectButton.api.models.description',
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
          '<code>SelectBtnMode</code>',
          'type',
          "'radio' | 'checkbox'",
          'components.selectButton.api.models.rows.SelectBtnMode.description',
        ],
        [
          '<code>SelectBtnModeEnum</code>',
          'enum',
          '-',
          'components.selectButton.api.models.rows.SelectBtnModeEnum.description',
        ],
        [
          '<code>SelectBtnVariant</code>',
          'type',
          "NUIVariant | 'segmented'",
          'components.selectButton.api.models.rows.SelectBtnVariant.description',
        ],
        [
          '<code>SelectBtnOption</code>',
          'interface',
          '-',
          'components.selectButton.api.models.rows.SelectBtnOption.description',
        ],
      ],
    },
  },
];
