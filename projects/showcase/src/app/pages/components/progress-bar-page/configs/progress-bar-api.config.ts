import { ComponentSection } from '../../../../core/models';

export const PROGRESS_BAR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { ProgressBarComponent, ProgressBarTemplateDirective } from 'nui';

@Component({
  standalone: true,
  imports: [ProgressBarComponent, ProgressBarTemplateDirective],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.progressBar.api.inputs.title',
    description: 'components.progressBar.api.inputs.description',
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
          '<code>compact</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.progressBar.api.inputs.rows.compact.description',
        ],
        [
          '<code>color</code>',
          'NUIColor | undefined',
          '<code class="neutral">undefined</code>',
          'components.progressBar.api.inputs.rows.color.description',
        ],
        [
          '<code>variant</code>',
          'NUIVariant | undefined',
          '<code class="neutral">undefined</code>',
          'components.progressBar.api.inputs.rows.variant.description',
        ],
        [
          '<code>value</code>',
          'number | null',
          '<code class="neutral">0</code>',
          'components.progressBar.api.inputs.rows.value.description',
        ],
        [
          '<code>maxValue</code>',
          'number | null',
          '<code class="neutral">100</code>',
          'components.progressBar.api.inputs.rows.maxValue.description',
        ],
        [
          '<code>indeterminate</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.progressBar.api.inputs.rows.indeterminate.description',
        ],
        [
          '<code>valuePosition</code>',
          'ProgressBarValuePosition',
          '<code class="neutral">inside</code>',
          'components.progressBar.api.inputs.rows.valuePosition.description',
        ],
        [
          '<code>valueFormat</code>',
          'ProgressBarValueFormat',
          '<code class="neutral">percentage</code>',
          'components.progressBar.api.inputs.rows.valueFormat.description',
        ],
        [
          '<code>label</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.label.description',
        ],
        [
          '<code>labelPosition</code>',
          'ProgressBarLabelPosition',
          '<code class="neutral">top</code>',
          'components.progressBar.api.inputs.rows.labelPosition.description',
        ],
        [
          '<code>trailingIcon</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.trailingIcon.description',
        ],
        [
          '<code>showValueInLabel</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.progressBar.api.inputs.rows.showValueInLabel.description',
        ],
        [
          '<code>ariaLabel</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.ariaLabel.description',
        ],
        [
          '<code>steps</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.progressBar.api.inputs.rows.steps.description',
        ],
        [
          '<code>trackColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.trackColor.description',
        ],
        [
          '<code>fillColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.fillColor.description',
        ],
        [
          '<code>textColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'components.progressBar.api.inputs.rows.textColor.description',
        ],
      ],
    },
  },
  {
    id: 'api-templates',
    title: 'components.progressBar.api.templates.title',
    description: 'components.progressBar.api.templates.description',
    anchor: 'api-templates',
    note: {
      type: 'info',
      content: 'components.progressBar.api.templates.note',
    },
    table: {
      headers: [
        'common.tables.directive',
        'common.tables.slot',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>[nuiPbTemplate]</code>',
          '<code>slot="value"</code>',
          'components.progressBar.api.templates.rows.value.description',
        ],
        [
          '<code>[nuiPbTemplate]</code>',
          '<code>slot="label"</code>',
          'components.progressBar.api.templates.rows.label.description',
        ],
      ],
    },
  },
  {
    id: 'api-context',
    title: 'components.progressBar.api.context.title',
    description: 'components.progressBar.api.context.description',
    anchor: 'api-context',
    table: {
      headers: [
        'common.tables.binding',
        'common.tables.type',
        'common.tables.slot',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>let-text</code> <em>(<code>$implicit</code>)</em>',
          '<code>string</code>',
          'components.progressBar.api.context.slots.both',
          'components.progressBar.api.context.rows.text.description',
        ],
        [
          '<code>let-percent="percent"</code>',
          '<code>number</code>',
          'components.progressBar.api.context.slots.both',
          'components.progressBar.api.context.rows.percent.description',
        ],
        [
          '<code>let-v="value"</code>',
          '<code>number</code>',
          'components.progressBar.api.context.slots.both',
          'components.progressBar.api.context.rows.value.description',
        ],
        [
          '<code>let-max="max"</code>',
          '<code>number</code>',
          'components.progressBar.api.context.slots.both',
          'components.progressBar.api.context.rows.max.description',
        ],
        [
          '<code>let-label="label"</code>',
          '<code>string | null</code>',
          'components.progressBar.api.context.slots.labelOnly',
          'components.progressBar.api.context.rows.label.description',
        ],
      ],
    },
  },
];
