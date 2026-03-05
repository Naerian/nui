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
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override global close label
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      close: 'Close',
    }),
  ],
};`,
      },
    ],
  },
];
