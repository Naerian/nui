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
        [
          '<code>triggerIconOpen</code>',
          'string | undefined',
          '<code class="neutral">undefined</code>',
          'Icon CSS class shown in the trigger when the dial is <strong>open</strong>. Replaces <code>triggerIcon</code> while expanded — no custom <code>fabTrigger</code> template needed for a simple icon swap.',
        ],
        [
          '<code>triggerLabel</code>',
          'string | undefined',
          '<code class="neutral">undefined</code>',
          'Static label shown next to the trigger icon (Extended FAB pill pattern). Hidden automatically when the dial is open and <code>triggerIconOpen</code> is also set.',
        ],
        [
          '<code>triggerBadge</code>',
          'number | string | undefined',
          '<code class="neutral">undefined</code>',
          "Notification badge value shown in the top-end corner of the trigger. Pass <code>undefined</code> to hide. Accepts a number or short string (e.g. <code>'99+'</code>).",
        ],
        [
          '<code>loading</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Shows a loading spinner inside the trigger button. While <code>true</code>, the trigger does not toggle the dial and receives <code>aria-busy="true"</code>.',
        ],
        [
          '<code>closeOnItemClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close the dial after an action item is clicked. Set to <code>false</code> to keep the dial open for multi-action or selection patterns.',
        ],
        [
          '<code>closeOnScroll</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Close the dial when the nearest scroll container fires a scroll event. Useful when the FAB is anchored inside a scrollable panel.',
        ],
        [
          '<code>openOn</code>',
          "'click' | 'hover'",
          '<code class="neutral">\'click\'</code>',
          "How to open the dial. <code>'hover'</code> opens the dial on pointer entry and closes on pointer leave (speed-dial UX for desktop). Click still works in both modes for keyboard and touch accessibility.",
        ],
        [
          '<code>itemDisplay</code>',
          'FabButtonItemDisplay',
          '<code class="neutral">\'icon\'</code>',
          "Controls how action items render: <code>'icon'</code> — icon-only, tooltip on hover; <code>'icon-text'</code> — icon + label visible inside the button (tooltip is suppressed, the label conveys the action).",
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
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
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
        [
          '<code>menuShown</code>',
          'EventEmitter&lt;void&gt;',
          'Emits when the dial has finished opening and the items are visible',
        ],
        [
          '<code>menuHidden</code>',
          'EventEmitter&lt;void&gt;',
          'Emits when the dial has finished closing and the items are hidden',
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
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
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
        [
          '<code>activeTriggerIcon</code>',
          'Signal&lt;string&gt;',
          'Trigger icon in use: returns <code>triggerIconOpen</code> while the dial is open (when set), otherwise returns <code>triggerIcon</code>',
        ],
        [
          '<code>effectiveOpenOn</code>',
          "Signal&lt;'click' | 'hover'&gt;",
          "Resolved open mode (Input → Global Config → Default 'click')",
        ],
        [
          '<code>effectiveCloseOnItemClick</code>',
          'Signal&lt;boolean&gt;',
          'Resolved close-on-item-click (Input → Global Config → Default true)',
        ],
        [
          '<code>effectiveCloseOnScroll</code>',
          'Signal&lt;boolean&gt;',
          'Resolved close-on-scroll (Input → Global Config → Default false)',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // TYPES
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-types',
    title: 'components.fabButton.api.types.title',
    description: 'components.fabButton.api.types.description',
    anchor: 'types',
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
          '<code>FabButtonItemDisplay</code>',
          'type',
          "'icon' | 'icon-text'",
          "<code>'icon'</code>: icon-only items with tooltip on hover. <code>'icon-text'</code>: icon + visible label text inside the button, tooltip suppressed.",
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // FAB BUTTON ITEM
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-item',
    title: 'components.fabButton.api.item.title',
    description: 'components.fabButton.api.item.description',
    anchor: 'item',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>id</code>',
          'string',
          'Unique identifier. Used as the key in <code>@for</code> tracking.',
        ],
        [
          '<code>icon</code>',
          'string',
          'Icon CSS class (e.g. <code>ri-home-line</code>). Rendered as <code>&lt;i&gt;</code> inside the item button.',
        ],
        [
          '<code>label</code>',
          'string',
          'Text label shown next to the icon. When present, the item renders side-by-side icon + label.',
        ],
        [
          '<code>tooltip</code>',
          'string',
          'Tooltip text shown on hover. Position is computed automatically perpendicular to the expansion axis.',
        ],
        [
          '<code>tooltipPosition</code>',
          'TooltipPosition',
          'Override the auto-computed tooltip side: <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>.',
        ],
        [
          '<code>tooltipDelay</code>',
          'number',
          'Delay in milliseconds before the tooltip appears.',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          'Semantic color for this item. Overrides the component-level <code>color</code> input.',
        ],
        [
          '<code>size</code>',
          'NUISize',
          'Size token for this item. Overrides the component-level <code>size</code> input.',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          'Visual variant for this item. Overrides the component-level <code>variant</code> input.',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          'Disables interaction on this item. Renders with reduced opacity and <code>pointer-events: none</code>.',
        ],
        [
          '<code>data</code>',
          'unknown',
          'Arbitrary consumer payload. Available in the <code>itemClick</code> event output as <code>item.data</code>.',
        ],
        [
          '<code>styleClass</code>',
          'string',
          'Extra CSS class(es) applied directly to the item <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code> element.',
        ],
        [
          '<code>url</code>',
          'string',
          'When set, renders the item as an <code>&lt;a href&gt;</code> instead of a <code>&lt;button&gt;</code>.',
        ],
        [
          '<code>target</code>',
          'string',
          'HTML <code>target</code> attribute for anchor items (e.g. <code>_blank</code>).',
        ],
        [
          '<code>command</code>',
          '(event?: Event) => void',
          'Callback executed when the item is clicked. Receives the native DOM event.',
        ],
        [
          '<code>backgroundColor</code>',
          'string',
          'Inline background color override. Bypasses all theme and variant variables.',
        ],
        [
          '<code>textColor</code>',
          'string',
          'Inline text/icon color override. Bypasses all theme and variant variables.',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // FAB BUTTON ITEM RESOLVED
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-item-resolved',
    title: 'components.fabButton.api.itemResolved.title',
    description: 'components.fabButton.api.itemResolved.description',
    anchor: 'item-resolved',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>tx</code>',
          'string',
          'CSS <code>calc()</code> expression for the X-axis translation. Injected as <code>--nui-fab-item-tx</code> in the item inline style.',
        ],
        [
          '<code>ty</code>',
          'string',
          'CSS <code>calc()</code> expression for the Y-axis translation. Injected as <code>--nui-fab-item-ty</code> in the item inline style.',
        ],
        [
          '<code>index</code>',
          'number',
          'Zero-based position of the item in the resolved array. Used to compute the stagger animation delay via <code>--nui-fab-item-index</code>.',
        ],
        [
          '<code>tooltipSide</code>',
          "'top' | 'right' | 'bottom' | 'left'",
          'Auto-computed tooltip side. Perpendicular to the item expansion vector so it never competes with the expansion path.',
        ],
        [
          '<code>...FabButtonItem</code>',
          'FabButtonItem',
          'Inherits all properties of <code>FabButtonItem</code>. The resolved interface only adds the four computed fields above.',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // DIRECTIVES
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-directives',
    title: 'components.fabButton.api.directives.title',
    description: 'components.fabButton.api.directives.description',
    anchor: 'directives',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>fabTrigger</code>',
          'FabTriggerDirective',
          'Place on an <code>&lt;ng-template&gt;</code> to provide a custom trigger interior. The template receives <code>let-open="isOpen"</code> (boolean).',
        ],
        [
          '<code>fabItem</code>',
          'FabItemDirective',
          'Place on an <code>&lt;ng-template&gt;</code> to provide a custom item layout. The template receives <code>let-item</code> (<code>FabButtonItemResolved</code>), <code>let-idx="index"</code> (number) and <code>let-open="isOpen"</code> (boolean).',
        ],
      ],
    },
  },

  // ──────────────────────────────────────────────────────────
  // GLOBAL CONFIG (FabButtonConfig)
  // ──────────────────────────────────────────────────────────
  {
    id: 'api-config',
    title: 'components.fabButton.api.config.title',
    description: 'components.fabButton.api.config.description',
    anchor: 'config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>direction</code>',
          'FabButtonDirection',
          '<code class="neutral">\'up\'</code>',
          'Default expansion direction',
        ],
        [
          '<code>animation</code>',
          'FabButtonAnimation',
          '<code class="neutral">\'scale\'</code>',
          'Default enter/leave animation',
        ],
        [
          '<code>layout</code>',
          'FabButtonLayoutType',
          '<code class="neutral">\'linear\'</code>',
          'Default spatial layout',
        ],
        [
          '<code>shape</code>',
          'FabButtonShape',
          '<code class="neutral">\'circular\'</code>',
          'Default border-radius shape',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">\'primary\'</code>',
          'Default semantic color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">\'md\'</code>',
          'Default size token',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">\'solid\'</code>',
          'Default visual variant',
        ],
        [
          '<code>radius</code>',
          'string',
          '<code class="neutral">\'4rem\'</code>',
          'Default radial layout radius',
        ],
        [
          '<code>spacing</code>',
          'string',
          '<code class="neutral">\'3.5rem\'</code>',
          'Default linear layout item spacing',
        ],
        [
          '<code>backdrop</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Show backdrop by default',
        ],
        [
          '<code>closeOnOutsideClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close on outside click by default',
        ],
        [
          '<code>closeOnEsc</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close on Escape key by default',
        ],
        [
          '<code>closeOnItemClick</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Close after item click by default',
        ],
        [
          '<code>closeOnScroll</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Close on scroll by default',
        ],
        [
          '<code>openOn</code>',
          "'click' | 'hover'",
          '<code class="neutral">\'click\'</code>',
          'Default open trigger mode',
        ],
        [
          '<code>itemDisplay</code>',
          'FabButtonItemDisplay',
          '<code class="neutral">\'icon\'</code>',
          "Default item display mode: 'icon' (icon-only + tooltip) or 'icon-text' (icon + visible label)",
        ],
        [
          '<code>triggerIconOpen</code>',
          'string',
          '<code class="neutral">—</code>',
          'Default trigger icon when expanded',
        ],
        [
          '<code>triggerLabel</code>',
          'string',
          '<code class="neutral">—</code>',
          'Default trigger label (Extended FAB)',
        ],
      ],
    },
    examples: [
      {
        title: 'Global config via NUI_CONFIG',
        language: 'typescript',
        code: `import { provideNuiConfig } from 'nui';

bootstrapApplication(AppComponent, {
  providers: [
    provideNuiConfig({
      config: {
        fabButton: {
          closeOnItemClick: false,  // multi-action pattern
          openOn: 'hover',          // speed-dial on desktop
          closeOnScroll: true,      // close when panel scrolls
          triggerIconOpen: 'ri-close-line',
        },
      },
    }),
  ],
});`,
      },
    ],
  },
];
