import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Tooltip
 */
export const TOOLTIP_API_SECTIONS: ComponentSection[] = [
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
          '<code class="neutral">undefined</code>',
          'Tooltip content (text or template)',
        ],
        [
          '<code>nuiTooltipPosition</code>',
          "'top' | 'bottom' | 'left' | 'right'",
          '<code class="neutral">top</code>',
          'Tooltip position relative to element',
        ],
        [
          '<code>nuiTooltipEvent</code>',
          "'hover' | 'click' | 'focus'",
          '<code class="neutral">hover</code>',
          'Event that triggers the tooltip',
        ],
        [
          '<code>nuiTooltipShowArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Show arrow pointing to element',
        ],
        [
          '<code>nuiTooltipShowDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay before showing tooltip (ms)',
        ],
        [
          '<code>nuiTooltipHideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay before hiding tooltip (ms)',
        ],
        [
          '<code>nuiTooltipMaxWidth</code>',
          'string',
          '<code class="neutral">200px</code>',
          'Maximum width of tooltip (CSS value)',
        ],
        [
          '<code>nuiTooltipClass</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Custom CSS class for tooltip',
        ],
        [
          '<code>nuiTooltipOffset</code>',
          'number',
          '<code class="neutral">8</code>',
          'Distance from element (px)',
        ],
        [
          '<code>nuiTooltipInteractive</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Allow interaction with tooltip content',
        ],
        [
          '<code>nuiTooltipDisabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Disable tooltip',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.tooltip.api.outputs.title',
    description: 'components.tooltip.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>tooltipShown</code>', 'EventEmitter&lt;void&gt;', 'Emitted when tooltip is shown'],
        [
          '<code>tooltipHidden</code>',
          'EventEmitter&lt;void&gt;',
          'Emitted when tooltip is hidden',
        ],
      ],
    },
  },
];
