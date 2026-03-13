import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-keys',
    title: 'components.modal-dialog.i18n.keys.title',
    description: 'components.modal-dialog.i18n.keys.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.i18n.keys.note',
    },
    anchor: 'i18n-keys',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>modalDialog.close</code>',
          'Close',
          'Aria label and title of the header close button',
        ],
        [
          '<code>modalDialog.minimize</code>',
          'Minimize',
          'Aria label and title of the header minimize button',
        ],
        ['<code>modalDialog.restore</code>', 'Restore', 'Label for the dock restore chip'],
        ['<code>modalDialog.confirm</code>', 'Confirm', 'Default confirm button label'],
        ['<code>modalDialog.cancel</code>', 'Cancel', 'Default cancel button label'],
        ['<code>modalDialog.loading</code>', 'Loading...', 'Label displayed in loader modals'],
        [
          '<code>modalDialog.verificationLabel</code>',
          'Type the following to confirm',
          'Label of the verification text field',
        ],
        [
          '<code>modalDialog.verificationPlaceholder</code>',
          'Type here to confirm',
          'Placeholder of the verification text field',
        ],
        [
          '<code>modalDialog.verificationErrorMessage</code>',
          'The text does not match. Please try again.',
          'Error shown when verification text is wrong',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Global override via provideNuiI18n
import { provideNuiI18n, NuiI18n } from 'nui';

const myI18n: Partial<NuiI18n> = {
  modalDialog: {
    close: 'Cerrar',
    minimize: 'Minimizar',
    restore: 'Restaurar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    verificationLabel: 'Escribe lo siguiente para confirmar',
    verificationPlaceholder: 'Escribe aquí para confirmar',
    verificationErrorMessage: 'El texto no coincide. Inténtalo de nuevo.',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n(myI18n),
  ]
};`,
        language: 'typescript',
      },
    ],
  },
];
