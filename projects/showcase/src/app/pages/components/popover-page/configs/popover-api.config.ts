import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la sección API del componente Popover
 */
export const POPOVER_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { PopoverDirective } from 'nui';

@Component({
  standalone: true,
  imports: [PopoverDirective],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.popover.api.inputs.title',
    description: 'components.popover.api.inputs.description',
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
          '<code>nuiPopover</code>',
          'string | TemplateRef<PopoverContext> | Type<any>',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopover.description',
        ],
        [
          '<code>nuiPopoverPosition</code>',
          "'top' | 'bottom' | 'left' | 'right'",
          '<code class="neutral">top</code>',
          'components.popover.api.inputs.rows.nuiPopoverPosition.description',
        ],
        [
          '<code>nuiPopoverEvent</code>',
          "'hover' | 'click' | 'focus'",
          '<code class="neutral">click</code>',
          'components.popover.api.inputs.rows.nuiPopoverEvent.description',
        ],
        [
          '<code>nuiPopoverColor</code>',
          'NUIColor',
          '<code class="neutral">null</code>',
          'components.popover.api.inputs.rows.nuiPopoverColor.description',
        ],
        [
          '<code>nuiPopoverVariant</code>',
          'NUIVariant',
          '<code class="neutral">null</code>',
          'components.popover.api.inputs.rows.nuiPopoverVariant.description',
        ],
        [
          '<code>nuiPopoverShowDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.popover.api.inputs.rows.nuiPopoverShowDelay.description',
        ],
        [
          '<code>nuiPopoverHideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.popover.api.inputs.rows.nuiPopoverHideDelay.description',
        ],
        [
          '<code>nuiPopoverDisabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.popover.api.inputs.rows.nuiPopoverDisabled.description',
        ],
        [
          '<code>nuiPopoverClass</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverClass.description',
        ],
        [
          '<code>nuiPopoverShowArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.api.inputs.rows.nuiPopoverShowArrow.description',
        ],
        [
          '<code>nuiPopoverCloseOnOutsideClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.api.inputs.rows.nuiPopoverCloseOnOutsideClick.description',
        ],
        [
          '<code>nuiPopoverCloseOnEscape</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.api.inputs.rows.nuiPopoverCloseOnEscape.description',
        ],
        [
          '<code>nuiPopoverMaxWidth</code>',
          'string',
          '<code class="neutral">\'300px\'</code>',
          'components.popover.api.inputs.rows.nuiPopoverMaxWidth.description',
        ],
        [
          '<code>nuiPopoverMinWidth</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverMinWidth.description',
        ],
        [
          '<code>nuiPopoverOffset</code>',
          'number',
          '<code class="neutral">8</code>',
          'components.popover.api.inputs.rows.nuiPopoverOffset.description',
        ],
        [
          '<code>nuiPopoverData</code>',
          'any',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverData.description',
        ],
        [
          '<code>nuiPopoverAllowMultiple</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverAllowMultiple.description',
        ],
        [
          '<code>nuiPopoverBackdrop</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.popover.api.inputs.rows.nuiPopoverBackdrop.description',
        ],
        [
          '<code>nuiPopoverCloseOnBackdrop</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.popover.api.inputs.rows.nuiPopoverCloseOnBackdrop.description',
        ],
        [
          '<code>nuiPopoverZIndex</code>',
          'number',
          '<code class="neutral">1000</code>',
          'components.popover.api.inputs.rows.nuiPopoverZIndex.description',
        ],
        [
          '<code>nuiPopoverAriaLabel</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverAriaLabel.description',
        ],
        [
          '<code>nuiPopoverAriaLabelledBy</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.popover.api.inputs.rows.nuiPopoverAriaLabelledBy.description',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.popover.api.outputs.title',
    description: 'components.popover.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>nuiPopoverShow</code>',
          'EventEmitter<void>',
          'components.popover.api.outputs.rows.nuiPopoverShow.description',
        ],
        [
          '<code>nuiPopoverHide</code>',
          'EventEmitter<void>',
          'components.popover.api.outputs.rows.nuiPopoverHide.description',
        ],
      ],
    },
  },
  {
    id: 'api-methods',
    title: 'components.popover.api.methods.title',
    description: 'components.popover.api.methods.description',
    anchor: 'api-methods',
    note: { type: 'info', content: 'components.popover.api.methods.note' },
    table: {
      headers: ['common.tables.method', 'common.tables.returns', 'common.tables.description'],
      rows: [
        ['<code>show()</code>', 'boolean', 'components.popover.api.methods.rows.show.description'],
        ['<code>hide()</code>', 'boolean', 'components.popover.api.methods.rows.hide.description'],
        ['<code>toggle()</code>', 'void', 'components.popover.api.methods.rows.toggle.description'],
        ['<code>isOpen()</code>', 'boolean', 'components.popover.api.methods.rows.isOpen.description'],
      ],
    },
  },
  {
    id: 'api-context',
    title: 'components.popover.api.context.title',
    description: 'components.popover.api.context.description',
    anchor: 'api-context',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>close</code>', '() => void', 'components.popover.api.context.rows.close.description'],
        [
          '<code>data</code>',
          'any',
          'components.popover.api.context.rows.data.description',
        ],
      ],
    },
  },
  {
    id: 'api-tokens',
    title: 'components.popover.api.tokens.title',
    description: 'components.popover.api.tokens.description',
    anchor: 'api-tokens',
    table: {
      headers: ['common.tables.token', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>POPOVER_DATA</code>',
          'InjectionToken<any>',
          'components.popover.api.tokens.rows.POPOVER_DATA.description',
        ],
        [
          '<code>POPOVER_CLOSE</code>',
          'InjectionToken<() => void>',
          'components.popover.api.tokens.rows.POPOVER_CLOSE.description',
        ],
      ],
    },
  },
];
