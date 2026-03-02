import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "API" del componente FabButton.
 * Separada en secciones: Inputs, Outputs, Computed, Modelos.
 */
export const FAB_BUTTON_API_SECTIONS: ComponentSection[] = [
  // ──────────────────────────────────────────────────────────
  // INPUTS
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-inputs',
    title: 'components.fabButton.api.inputs.title',
    description: 'components.fabButton.api.inputs.description',
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
          '<code>items</code>',
          'FabButtonItem[]',
          '<code class="neutral">[]</code>',
          'Array of action items shown when the FAB is expanded',
        ],
        [
          '<code>direction</code>',
          'FabButtonDirection',
          '<code class="neutral">up</code>',
          'Direction in which items spread from the trigger',
        ],
        [
          '<code>layout</code>',
          'FabButtonLayoutType',
          '<code class="neutral">linear</code>',
          'Spatial distribution of items around the trigger',
        ],
        [
          '<code>animation</code>',
          'FabButtonAnimation',
          '<code class="neutral">scale</code>',
          'Enter/leave animation for the action items',
        ],
        [
          '<code>shape</code>',
          'FabButtonShape',
          '<code class="neutral">circular</code>',
          'Border-radius shape for trigger and item buttons',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'Semantic color for trigger and items',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'Size token for trigger and item buttons',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'Visual variant for trigger and item buttons',
        ],
        [
          '<code>expanded</code>',
          'boolean | undefined',
          '<code class="neutral">undefined</code>',
          'Controlled expansion state. When set, overrides internal toggle.',
        ],
        [
          '<code>triggerIcon</code>',
          'string',
          '<code class="neutral">ri-add-line</code>',
          'Icon CSS class for the main trigger button',
        ],
        [
          '<code>radius</code>',
          'string',
          '<code class="neutral">4rem</code>',
          'Radius for circle / semi-circle / quarter-circle layouts (any CSS length)',
        ],
        [
          '<code>spacing</code>',
          'string',
          '<code class="neutral">3.5rem</code>',
          'Distance between items in linear layout (any CSS length)',
        ],
        [
          '<code>backdrop</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Show a translucent backdrop behind the items when expanded',
        ],
        [
          '<code>closeOnOutsideClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close the dial when the user clicks outside the component',
        ],
        [
          '<code>closeOnEsc</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close the dial when the user presses the ESC key',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Disables the trigger button',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">Open actions</code>',
          'Accessible label for the component host and trigger button',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // OUTPUTS
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-outputs',
    title: 'components.fabButton.api.outputs.title',
    description: 'components.fabButton.api.outputs.description',
    anchor: 'outputs',
    table: {
      headers: [
        'common.tables.event',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>expandedChange</code>',
          'EventEmitter&lt;boolean&gt;',
          'Emits true on open and false on close. Enables two-way binding via [(expanded)].',
        ],
        [
          '<code>itemClick</code>',
          'EventEmitter&lt;{ item: FabButtonItem; event: Event }&gt;',
          'Emits when an action item is clicked (before the dial closes)',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // COMPUTED
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-computed',
    title: 'components.fabButton.api.computed.title',
    description: 'components.fabButton.api.computed.description',
    anchor: 'computed',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>isOpen</code>',
          'Signal&lt;boolean&gt;',
          'Expansion surface: reads controlled <code>expanded</code> input or internal signal',
        ],
        [
          '<code>resolvedItems</code>',
          'Signal&lt;FabButtonItemResolved[]&gt;',
          'Items extended with computed CSS translate values (tx, ty) for the current layout',
        ],
        [
          '<code>effectiveColor</code>',
          'Signal&lt;NUIColor&gt;',
          'Resolved color (Input → Global Config → Default)',
        ],
        [
          '<code>effectiveSize</code>',
          'Signal&lt;NUISize&gt;',
          'Resolved size (Input → Global Config → Default)',
        ],
        [
          '<code>effectiveVariant</code>',
          'Signal&lt;NUIVariant&gt;',
          'Resolved variant (Input → Global Config → Default)',
        ],
        [
          '<code>effectiveAnimation</code>',
          'Signal&lt;FabButtonAnimation&gt;',
          'Resolved animation (Input → Global Config → Default)',
        ],
        [
          '<code>effectiveDirection</code>',
          'Signal&lt;FabButtonDirection&gt;',
          'Resolved direction (Input → Global Config → Default)',
        ],
        [
          '<code>effectiveLayout</code>',
          'Signal&lt;FabButtonLayoutType&gt;',
          'Resolved layout (Input → Global Config → Default)',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // MODELS
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-models',
    title: 'components.fabButton.api.models.title',
    description: 'components.fabButton.api.models.description',
    anchor: 'models',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.parameters',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>FabButtonDirection</code>',
          'type',
          "'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'",
          'Axis / diagonal where items spread from the trigger',
        ],
        [
          '<code>FabButtonAnimation</code>',
          'type',
          "'scale' | 'fade' | 'slide'",
          'Enter/leave animation type for action items',
        ],
        [
          '<code>FabButtonLayoutType</code>',
          'type',
          "'linear' | 'circle' | 'semi-circle' | 'quarter-circle'",
          'Spatial distribution of items around the trigger',
        ],
        [
          '<code>FabButtonShape</code>',
          'type',
          "'circular' | 'rounded' | 'square'",
          'Border-radius shape for trigger and item buttons',
        ],
        [
          '<code>FabButtonItem</code>',
          'interface',
          '-',
          'Public item definition provided by the consumer (icon, label, tooltip, color, command…)',
        ],
        [
          '<code>FabButtonItemResolved</code>',
          'interface',
          '-',
          'Internal: FabButtonItem extended with computed CSS translate values (tx, ty, index)',
        ],
      ],
    },
    examples: [
      {
        title: 'FabButtonItem interface',
        language: 'typescript',
        code: `export interface FabButtonItem {
  id?:              string;
  icon?:            string;
  label?:           string;
  tooltip?:         string;
  tooltipPosition?: TooltipPosition;
  tooltipDelay?:    number;
  color?:           NUIColor;
  size?:            NUISize;
  variant?:         NUIVariant;
  disabled?:        boolean;
  data?:            unknown;
  styleClass?:      string;
  url?:             string;
  target?:          string;
  command?:         (event?: Event) => void;
  backgroundColor?: string;
  textColor?:       string;
}`,
      },
    ],
  },
];
