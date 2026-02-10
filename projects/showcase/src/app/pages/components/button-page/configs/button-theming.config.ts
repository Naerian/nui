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
          '--nui-button-{color}-solid-bg',
          'Background color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-text',
          'Text color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-border',
          'Border color for solid variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-hover-bg',
          'Hover background for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-hover-text',
          'Hover text color for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-hover-border',
          'Hover border for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-active-bg',
          'Active background for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-solid-active-border',
          'Active border for solid',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Outline variants
        [
          '--nui-button-{color}-outline-bg',
          'Background color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-text',
          'Text color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-border',
          'Border color for outline variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-hover-bg',
          'Hover background for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-hover-text',
          'Hover text for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-hover-border',
          'Hover border for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-active-bg',
          'Active background for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-outline-active-border',
          'Active border for outline',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Ghost variants
        [
          '--nui-button-{color}-ghost-bg',
          'Background color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-text',
          'Text color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-border',
          'Border color for ghost variant',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-hover-bg',
          'Hover background for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-hover-text',
          'Hover text for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-hover-border',
          'Hover border for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-active-bg',
          'Active background for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '--nui-button-{color}-ghost-active-border',
          'Active border for ghost',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],

        // Focus
        [
          '--nui-button-{color}-focus-color',
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
      headers: ['CSS Variable', 'Description', 'Default Value'],
      rows: [
        // Spacing
        ['--nui-button-gap', 'Space between icon and text', '0.5rem'],
        ['--nui-button-padding-x-xs', 'Horizontal padding for xs size', '0.5rem'],
        ['--nui-button-padding-y-xs', 'Vertical padding for xs size', '0.25rem'],
        ['--nui-button-padding-x-sm', 'Horizontal padding for sm size', '0.75rem'],
        ['--nui-button-padding-y-sm', 'Vertical padding for sm size', '0.375rem'],
        ['--nui-button-padding-x-md', 'Horizontal padding for md size', '1rem'],
        ['--nui-button-padding-y-md', 'Vertical padding for md size', '0.5rem'],
        ['--nui-button-padding-x-lg', 'Horizontal padding for lg size', '1.25rem'],
        ['--nui-button-padding-y-lg', 'Vertical padding for lg size', '0.625rem'],
        ['--nui-button-padding-x-xl', 'Horizontal padding for xl size', '1.5rem'],
        ['--nui-button-padding-y-xl', 'Vertical padding for xl size', '0.75rem'],

        // Border radius
        ['--nui-button-radius-xs', 'Border radius for xs size', '0.25rem'],
        ['--nui-button-radius-sm', 'Border radius for sm size', '0.375rem'],
        ['--nui-button-radius-md', 'Border radius for md size', '0.5rem'],
        ['--nui-button-radius-lg', 'Border radius for lg size', '0.625rem'],
        ['--nui-button-radius-xl', 'Border radius for xl size', '0.75rem'],

        // Font sizes
        ['--nui-button-font-size-xs', 'Font size for xs', '0.75rem'],
        ['--nui-button-font-size-sm', 'Font size for sm', '0.875rem'],
        ['--nui-button-font-size-md', 'Font size for md', '1rem'],
        ['--nui-button-font-size-lg', 'Font size for lg', '1.125rem'],
        ['--nui-button-font-size-xl', 'Font size for xl', '1.25rem'],

        // Icon sizes
        ['--nui-button-icon-size-xs', 'Icon size for xs', '1rem'],
        ['--nui-button-icon-size-sm', 'Icon size for sm', '1.125rem'],
        ['--nui-button-icon-size-md', 'Icon size for md', '1.25rem'],
        ['--nui-button-icon-size-lg', 'Icon size for lg', '1.375rem'],
        ['--nui-button-icon-size-xl', 'Icon size for xl', '1.5rem'],

        // Animations & Effects
        ['--nui-button-transition', 'Transition duration', '0.2s ease'],
        ['--nui-button-spin-duration', 'Loading spinner animation duration', '0.8s'],
        ['--nui-button-focus-width', 'Focus outline width', '2px'],
        ['--nui-button-focus-offset', 'Focus outline offset', '2px'],
      ],
    },
  },
];
