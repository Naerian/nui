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
          '<code>close</code>',
          'Close',
          'components.modal-dialog.i18n.keys.rows.close',
        ],
        [
          '<code>minimize</code>',
          'Minimize',
          'components.modal-dialog.i18n.keys.rows.minimize',
        ],
        ['<code>restore</code>', 'Restore', 'components.modal-dialog.i18n.keys.rows.restore'],
        ['<code>confirm</code>', 'Confirm', 'components.modal-dialog.i18n.keys.rows.confirm'],
        ['<code>cancel</code>', 'Cancel', 'components.modal-dialog.i18n.keys.rows.cancel'],

        ['<code>modalDialog.loading</code>', 'Loading...', 'components.modal-dialog.i18n.keys.rows.modalDialogLoading'],
        [
          '<code>modalDialog.verificationLabel</code>',
          'Type the following to confirm',
          'components.modal-dialog.i18n.keys.rows.modalDialogVerificationLabel',
        ],
        [
          '<code>modalDialog.verificationPlaceholder</code>',
          'Type here to confirm',
          'components.modal-dialog.i18n.keys.rows.modalDialogVerificationPlaceholder',
        ],
        [
          '<code>modalDialog.verificationErrorMessage</code>',
          'The text does not match. Please try again.',
          'components.modal-dialog.i18n.keys.rows.modalDialogVerificationErrorMessage',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Global override via provideNuiI18n
import { provideNuiI18n, NuiI18n } from 'nui';

const myI18n: Partial<NuiI18n> = {
  close: 'Cerrar',
  minimize: 'Minimizar',
  restore: 'Restaurar',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  modalDialog: {
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
