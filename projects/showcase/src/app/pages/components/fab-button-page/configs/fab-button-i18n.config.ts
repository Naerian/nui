import { ComponentSection } from '../../../../core/models';

export const FAB_BUTTON_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-tokens',
    title: 'components.fabButton.i18n.tokens.title',
    description: 'components.fabButton.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.fabButton.i18n.tokens.note',
    },
    table: {
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>fabButton.triggerAriaLabel</code>',
          '"Open actions"',
          'components.fabButton.i18n.tokens.rows.triggerAriaLabel.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override global i18n
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      fabButton: {
        triggerAriaLabel: 'Abrir acciones',
      },
    }),
  ],
};`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Override por instancia -->
<nui-fab-button [i18n]="{ triggerAriaLabel: 'Abrir acciones rápidas' }" [actions]="actions" />`,
      },
    ],
  },
];
