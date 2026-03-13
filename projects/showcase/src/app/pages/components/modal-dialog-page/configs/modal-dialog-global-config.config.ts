import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-options',
    title: 'components.modal-dialog.globalConfig.options.title',
    description: 'components.modal-dialog.globalConfig.options.description',
    anchor: 'global-config-options',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        ['<code>animationDuration</code>', 'number', '220', 'Open/close animation duration in ms'],
        ['<code>hasBackdrop</code>', 'boolean', 'true', 'Show backdrop overlay by default'],
        ['<code>closeOnBackdropClick</code>', 'boolean', 'true', 'Close on backdrop click by default'],
        ['<code>closeOnEscape</code>', 'boolean', 'true', 'Close on Escape key by default'],
        ['<code>closeOnRouteChange</code>', 'boolean', 'false', 'Auto-close on navigation by default'],
        ['<code>showCloseButton</code>', 'boolean', 'true', 'Show the header close button by default'],
        ['<code>autoFocus</code>', 'boolean', 'true', 'Focus the first element on open by default'],
        ['<code>width</code>', 'string', "'500px'", 'Default modal width'],
        ['<code>buttonsVariant</code>', 'NUIVariant', "'solid'", 'Default button variant for confirm/cancel'],
        ['<code>buttonsSize</code>', 'NUISize', "'md'", 'Default button size for confirm/cancel'],
      ],
    },
  },
  {
    id: 'global-config-example',
    title: 'components.modal-dialog.globalConfig.example.title',
    description: 'components.modal-dialog.globalConfig.example.description',
    anchor: 'global-config-example',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        modalDialog: {
          animationDuration: 180,
          closeOnRouteChange: true, // All modals close on navigation
          width: '600px',           // Wider modals by default
          buttonsSize: 'sm',
        }
      }
    })
  ]
};`,
        language: 'typescript',
      },
    ],
  },
];
