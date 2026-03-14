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
        ['<code>animationDuration</code>', 'number', '220', 'components.modal-dialog.globalConfig.options.rows.animationDuration'],
        ['<code>hasBackdrop</code>', 'boolean', 'true', 'components.modal-dialog.globalConfig.options.rows.hasBackdrop'],
        ['<code>closeOnBackdropClick</code>', 'boolean', 'true', 'components.modal-dialog.globalConfig.options.rows.closeOnBackdropClick'],
        ['<code>closeOnEscape</code>', 'boolean', 'true', 'components.modal-dialog.globalConfig.options.rows.closeOnEscape'],
        ['<code>closeOnRouteChange</code>', 'boolean', 'false', 'components.modal-dialog.globalConfig.options.rows.closeOnRouteChange'],
        ['<code>showCloseButton</code>', 'boolean', 'true', 'components.modal-dialog.globalConfig.options.rows.showCloseButton'],
        ['<code>autoFocus</code>', 'boolean', 'true', 'components.modal-dialog.globalConfig.options.rows.autoFocus'],
        ['<code>width</code>', 'string', "'500px'", 'components.modal-dialog.globalConfig.options.rows.width'],
        ['<code>buttonsVariant</code>', 'NUIVariant', "'solid'", 'components.modal-dialog.globalConfig.options.rows.buttonsVariant'],
        ['<code>buttonsSize</code>', 'NUISize', "'md'", 'components.modal-dialog.globalConfig.options.rows.buttonsSize'],
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
