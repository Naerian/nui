import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente Button
 * Separada en: Variables de color y Variables estructurales
 */
export const BUTTON_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.button.theming.colors.title',
    description: 'components.button.theming.colors.description',
    anchor: 'colors',
    note: {
      type: 'info',
      content: 'components.button.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.variants'],
      rows: [
        // Solid variants
        [
          '<code>--nui-button-{color}-solid-bg</code>',
          'Background color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-text</code>',
          'Text color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-border</code>',
          'Border color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-bg</code>',
          'Hover background for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-text</code>',
          'Hover text color for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-hover-border</code>',
          'Hover border for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-active-bg</code>',
          'Active background for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-solid-active-border</code>',
          'Active border for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Outline variants
        [
          '<code>--nui-button-{color}-outline-bg</code>',
          'Background color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-text</code>',
          'Text color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-border</code>',
          'Border color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-bg</code>',
          'Hover background for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-text</code>',
          'Hover text for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-hover-border</code>',
          'Hover border for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-active-bg</code>',
          'Active background for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-outline-active-border</code>',
          'Active border for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Ghost variants
        [
          '<code>--nui-button-{color}-ghost-bg</code>',
          'Background color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-text</code>',
          'Text color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-border</code>',
          'Border color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-bg</code>',
          'Hover background for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-text</code>',
          'Hover text for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-hover-border</code>',
          'Hover border for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-active-bg</code>',
          'Active background for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-button-{color}-ghost-active-border</code>',
          'Active border for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Focus
        [
          '<code>--nui-button-{color}-focus-color</code>',
          'Focus ring color',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.button.theming.structure.title',
    description: 'components.button.theming.structure.description',
    anchor: 'structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Spacing
        ['<code>--nui-button-gap</code>', 'Space between icon and text', '0.5rem'],
        ['<code>--nui-button-padding-x-xs</code>', 'Horizontal padding for xs size', '0.5rem'],
        ['<code>--nui-button-padding-y-xs</code>', 'Vertical padding for xs size', '0.25rem'],
        ['<code>--nui-button-padding-x-sm</code>', 'Horizontal padding for sm size', '0.75rem'],
        ['<code>--nui-button-padding-y-sm</code>', 'Vertical padding for sm size', '0.375rem'],
        ['<code>--nui-button-padding-x-md</code>', 'Horizontal padding for md size', '1rem'],
        ['<code>--nui-button-padding-y-md</code>', 'Vertical padding for md size', '0.5rem'],
        ['<code>--nui-button-padding-x-lg</code>', 'Horizontal padding for lg size', '1.25rem'],
        ['<code>--nui-button-padding-y-lg</code>', 'Vertical padding for lg size', '0.625rem'],
        ['<code>--nui-button-padding-x-xl</code>', 'Horizontal padding for xl size', '1.5rem'],
        ['<code>--nui-button-padding-y-xl</code>', 'Vertical padding for xl size', '0.75rem'],

        // Border radius
        ['<code>--nui-button-radius-xs</code>', 'Border radius for xs size', '0.25rem'],
        ['<code>--nui-button-radius-sm</code>', 'Border radius for sm size', '0.375rem'],
        ['<code>--nui-button-radius-md</code>', 'Border radius for md size', '0.5rem'],
        ['<code>--nui-button-radius-lg</code>', 'Border radius for lg size', '0.625rem'],
        ['<code>--nui-button-radius-xl</code>', 'Border radius for xl size', '0.75rem'],

        // Font sizes
        ['<code>--nui-button-font-size-xs</code>', 'Font size for xs', '0.75rem'],
        ['<code>--nui-button-font-size-sm</code>', 'Font size for sm', '0.875rem'],
        ['<code>--nui-button-font-size-md</code>', 'Font size for md', '1rem'],
        ['<code>--nui-button-font-size-lg</code>', 'Font size for lg', '1.125rem'],
        ['<code>--nui-button-font-size-xl</code>', 'Font size for xl', '1.25rem'],

        // Icon sizes
        ['<code>--nui-button-icon-size-xs</code>', 'Icon size for xs', '1rem'],
        ['<code>--nui-button-icon-size-sm</code>', 'Icon size for sm', '1.125rem'],
        ['<code>--nui-button-icon-size-md</code>', 'Icon size for md', '1.25rem'],
        ['<code>--nui-button-icon-size-lg</code>', 'Icon size for lg', '1.375rem'],
        ['<code>--nui-button-icon-size-xl</code>', 'Icon size for xl', '1.5rem'],

        // Animations & Effects
        ['<code>--nui-button-transition</code>', 'Transition duration', '0.2s ease'],
        ['<code>--nui-button-spin-duration</code>', 'Loading spinner animation duration', '0.8s'],
        ['<code>--nui-button-focus-width</code>', 'Focus outline width', '2px'],
        ['<code>--nui-button-focus-offset</code>', 'Focus outline offset', '2px'],
      ],
    },
  },
];
