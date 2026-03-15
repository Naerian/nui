import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-tokens',
    title: 'components.modal-dialog.i18n.tokens.title',
    description: 'components.modal-dialog.i18n.tokens.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.i18n.tokens.note',
    },
    anchor: 'i18n-tokens',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>close</code>',
          'Close',
          'components.modal-dialog.i18n.tokens.rows.close.description',
        ],
        [
          '<code>minimize</code>',
          'Minimize',
          'components.modal-dialog.i18n.tokens.rows.minimize.description',
        ],
        ['<code>restore</code>', 'Restore', 'components.modal-dialog.i18n.tokens.rows.restore.description'],
        ['<code>confirm</code>', 'Confirm', 'components.modal-dialog.i18n.tokens.rows.confirm.description'],
        ['<code>cancel</code>', 'Cancel', 'components.modal-dialog.i18n.tokens.rows.cancel.description'],

        ['<code>modalDialog.loading</code>', 'Loading...', 'components.modal-dialog.i18n.tokens.rows.modalDialogLoading.description'],
        [
          '<code>modalDialog.verificationLabel</code>',
          'Type the following to confirm',
          'components.modal-dialog.i18n.tokens.rows.modalDialogVerificationLabel.description',
        ],
        [
          '<code>modalDialog.verificationPlaceholder</code>',
          'Type here to confirm',
          'components.modal-dialog.i18n.tokens.rows.modalDialogVerificationPlaceholder.description',
        ],
        [
          '<code>modalDialog.verificationErrorMessage</code>',
          'The text does not match. Please try again.',
          'components.modal-dialog.i18n.tokens.rows.modalDialogVerificationErrorMessage.description',
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
      {
        title: 'codeExamples.html',
        code: `<!-- Per-instance override for verification tokens via open() config -->
<!-- verificationLabel, verificationPlaceholder and verificationErrorMessage
     can be passed directly in the modal configuration, overriding the global i18n value. -->
this.modalService.openVerification({
  title: 'Confirm deletion',
  verificationText: 'delete',
  verificationLabel: 'Type "delete" to confirm',
  verificationPlaceholder: 'Type here…',
  verificationErrorMessage: 'Text does not match. Please try again.',
});`,
        language: 'typescript',
      },
    ],
  },
];
