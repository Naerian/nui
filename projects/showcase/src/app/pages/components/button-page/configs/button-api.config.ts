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
        ['variant', "'solid' | 'outline' | 'ghost'", "'solid'", 'Button visual variant'],
        [
          'color',
          "'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger' | 'neutral'",
          "'primary'",
          'Button color theme',
        ],
        ['size', "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Button size'],
        ['icon', 'string', 'undefined', 'Remix Icon class name'],
        ['iconPosition', "'start' | 'end'", "'start'", 'Icon position relative to text'],
        ['loading', 'boolean', 'false', 'Shows loading spinner'],
        ['loadingPosition', "'start' | 'center' | 'end'", "'start'", 'Spinner position'],
        ['width', "'auto' | 'full' | 'fit'", "'auto'", 'Button width behavior'],
        ['disabled', 'boolean', 'false', 'Disables button interaction'],
        ['type', "'button' | 'submit' | 'reset'", "'button'", 'Native button type'],
        ['label', 'string', 'undefined', 'Button text (alternative to content projection)'],
        ['title', 'string', "''", 'HTML title attribute'],
        ['ariaLabel', 'string', "''", 'Accessibility label (auto-computed for icon-only buttons)'],
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
          'onClick',
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
        ['effectiveColor', 'Signal<NUIColor>', 'Resolved color (Input > Global Config > Default)'],
        ['effectiveSize', 'Signal<NUISize>', 'Resolved size (Input > Global Config > Default)'],
        [
          'effectiveVariant',
          'Signal<NUIVariant>',
          'Resolved variant (Input > Global Config > Default)',
        ],
        ['hasVisibleContent', 'Signal<boolean>', 'True if button has text content or label'],
        ['isIconOnly', 'Signal<boolean>', 'True if button only contains an icon without text'],
        [
          'computedAriaLabel',
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
        ['ButtonType', 'type', "'button' | 'submit' | 'reset'", 'Native button types'],
        ['ButtonTypeEnum', 'enum', '-', 'Enum for native button types'],
        ['ButtonIconPosition', 'type', "'start' | 'end'", 'Icon position options'],
        ['ButtonIconPositionEnum', 'enum', '-', 'Enum for icon position'],
        [
          'ButtonLoadingPosition',
          'type',
          "'start' | 'center' | 'end'",
          'Loading spinner position options',
        ],
        ['ButtonLoadingPositionEnum', 'enum', '-', 'Enum for loading spinner position'],
        ['ButtonWidth', 'type', "'auto' | 'full' | 'fit'", 'Button width behavior options'],
        ['ButtonWidthEnum', 'enum', '-', 'Enum for button width behavior'],
      ],
    },
  },
];
