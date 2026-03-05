import { ComponentSection } from '../../../../core/models';

export const SIDEBAR_PANEL_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-tokens',
    title: 'components.sidebar-panel.i18n.tokens.title',
    description: 'components.sidebar-panel.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.i18n.tokens.note',
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
          'components.sidebar-panel.i18n.tokens.rows.close.description',
        ],
        [
          '<code>minimize</code>',
          '"Minimize"',
          'components.sidebar-panel.i18n.tokens.rows.minimize.description',
        ],
        [
          '<code>restore</code>',
          '"Restore"',
          'components.sidebar-panel.i18n.tokens.rows.restore.description',
        ],
        [
          '<code>expand</code>',
          '"Expand"',
          'components.sidebar-panel.i18n.tokens.rows.expand.description',
        ],
        [
          '<code>collapse</code>',
          '"Collapse"',
          'components.sidebar-panel.i18n.tokens.rows.collapse.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.ts',
        language: 'typescript',
        code: `// app.config.ts — override de etiquetas globales
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      close:    'Close',
      minimize: 'Minimize',
      restore:  'Restore',
      expand:   'Expand',
      collapse: 'Collapse',
    }),
  ],
};`,
      },
    ],
  },
];
