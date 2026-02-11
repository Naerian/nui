import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente Button
 * Separada en múltiples secciones: Inputs, Outputs, etc.
 */
export const BUTTON_API_SECTIONS: ComponentSection[] = [
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
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'Button visual variant',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'Button color theme',
        ],
        ['<code>size</code>', 'NUISize', '<code class="neutral">md</code>', 'Button size'],
        [
          '<code>icon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Remix Icon class name',
        ],
        [
          '<code>iconPosition</code>',
          "'start' | 'end'",
          '<code class="neutral">start</code>',
          'Icon position relative to text',
        ],
        [
          '<code>loading</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Shows loading spinner',
        ],
        [
          '<code>loadingPosition</code>',
          "'start' | 'center' | 'end'",
          '<code class="neutral">start</code>',
          'Spinner position',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full' | 'fit'",
          '<code class="neutral">auto</code>',
          'Button width behavior',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Disables button interaction',
        ],
        [
          '<code>type</code>',
          "'button' | 'submit' | 'reset'",
          '<code class="neutral">button</code>',
          'Native button type',
        ],
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Button text (alternative to content projection)',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">null</code>',
          'HTML title attribute',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">null</code>',
          'Accessibility label (auto-computed for icon-only buttons)',
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
          'Emitted when button is clicked (not emitted if disabled or loading)',
        ],
      ],
    },
  },
  {
    id: 'api-computed',
    title: 'components.button.api.computed.title',
    description: 'components.button.api.computed.description',
    anchor: 'computed',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>effectiveColor</code>',
          'Signal<NUIColor>',
          'Resolved color (Input > Global Config > Default)',
        ],
        [
          '<code>effectiveSize</code>',
          'Signal<NUISize>',
          'Resolved size (Input > Global Config > Default)',
        ],
        [
          '<code>effectiveVariant</code>',
          'Signal<NUIVariant>',
          'Resolved variant (Input > Global Config > Default)',
        ],
        [
          '<code>hasVisibleContent</code>',
          'Signal<boolean>',
          'True if button has text content or label',
        ],
        [
          '<code>isIconOnly</code>',
          'Signal<boolean>',
          'True if button only contains an icon without text',
        ],
        [
          '<code>computedAriaLabel</code>',
          'Signal<string | null>',
          'Auto-computed aria-label for accessibility',
        ],
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
        ['<code>ButtonType</code>', 'type', "'button' | 'submit' | 'reset'", 'Native button types'],
        ['<code>ButtonTypeEnum</code>', 'enum', '-', 'Enum for native button types'],
        ['<code>ButtonIconPosition</code>', 'type', "'start' | 'end'", 'Icon position options'],
        ['<code>ButtonIconPositionEnum</code>', 'enum', '-', 'Enum for icon position'],
        [
          '<code>ButtonLoadingPosition</code>',
          'type',
          "'start' | 'center' | 'end'",
          'Loading spinner position options',
        ],
        [
          '<code>ButtonLoadingPositionEnum</code>',
          'enum',
          '-',
          'Enum for loading spinner position',
        ],
        [
          '<code>ButtonWidth</code>',
          'type',
          "'auto' | 'full' | 'fit'",
          'Button width behavior options',
        ],
        ['<code>ButtonWidthEnum</code>', 'enum', '-', 'Enum for button width behavior'],
      ],
    },
  },
];
