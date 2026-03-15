import { ComponentSection } from '../../../../core/models';

export const TOAST_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-tokens',
    title: 'components.toast.i18n.tokens.title',
    description: 'components.toast.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.toast.i18n.tokens.note',
    },
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>close</code>',
          '"Close"',
          'components.toast.i18n.tokens.rows.close.description',
        ],
        [
          '<code>expand</code>',
          '"Expand"',
          'components.toast.i18n.tokens.rows.expand.description',
        ],
        [
          '<code>collapse</code>',
          '"Collapse"',
          'components.toast.i18n.tokens.rows.collapse.description',
        ],
        [
          '<code>toast.notifications</code>',
          '"Notifications"',
          'components.toast.i18n.tokens.rows.notifications.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `// app.config.ts — override toast i18n tokens globally
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      close: 'Cerrar',
      expand: 'Expandir',
      collapse: 'Contraer',
      toast: {
        notifications: 'Notificaciones',
      },
    }),
  ],
};`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- No per-instance i18n override is available via ToastConfig.
     All toast labels are controlled through the global NuiI18n token. -->`,
      },
    ],
  },
];
