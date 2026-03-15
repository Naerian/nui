import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Tooltip
 */
export const TOOLTIP_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { TooltipDirective } from 'nui';

@Component({
  standalone: true,
  imports: [TooltipDirective],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-inputs',
    title: 'components.tooltip.api.inputs.title',
    description: 'components.tooltip.api.inputs.description',
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
          '<code>nuiTooltip</code>',
          'string | TemplateRef&lt;any&gt;',
          '-',
          'components.tooltip.api.inputs.rows.nuiTooltip.description',
        ],
        [
          '<code>nuiTooltipPosition</code>',
          "'top' | 'bottom' | 'left' | 'right'",
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipPosition.description',
        ],
        [
          '<code>nuiTooltipEvent</code>',
          "'hover' | 'click' | 'focus' | 'manual'",
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipEvent.description',
        ],
        [
          '<code>nuiTooltipShowDelay</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipShowDelay.description',
        ],
        [
          '<code>nuiTooltipHideDelay</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipHideDelay.description',
        ],
        [
          '<code>nuiTooltipDisabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipDisabled.description',
        ],
        [
          '<code>nuiTooltipClass</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipClass.description',
        ],
        [
          '<code>nuiTooltipShowArrow</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipShowArrow.description',
        ],
        [
          '<code>nuiTooltipAllowHtml</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipAllowHtml.description',
        ],
        [
          '<code>nuiTooltipInteractive</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.tooltip.api.inputs.rows.nuiTooltipInteractive.description',
        ],
      ],
    },
  },
  {
    id: 'api-methods',
    title: 'components.tooltip.api.methods.title',
    description: 'components.tooltip.api.methods.description',
    anchor: 'api-methods',
    table: {
      headers: [
        'common.tables.method',
        'common.tables.returns',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>show()</code>',
          'void',
          'components.tooltip.api.methods.rows.show.description',
        ],
        [
          '<code>hide()</code>',
          'void',
          'components.tooltip.api.methods.rows.hide.description',
        ],
        [
          '<code>toggle()</code>',
          'void',
          'components.tooltip.api.methods.rows.toggle.description',
        ],
      ],
    },
  },
];
