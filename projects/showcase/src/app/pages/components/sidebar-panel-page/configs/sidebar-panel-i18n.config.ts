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
          'Close',
          'components.sidebar-panel.i18n.tokens.rows.close.description',
        ],
        [
          '<code>minimize</code>',
          'Minimize',
          'components.sidebar-panel.i18n.tokens.rows.minimize.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `// app.config.ts — global label override via provideNuiI18n
import { provideNuiI18n, NuiI18n } from 'nui';

const myI18n: Partial<NuiI18n> = {
  close:    'Close',
  minimize: 'Minimize',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n(myI18n),
  ],
};`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- The SidebarPanel reads i18n tokens internally.
     No template binding is required in consumer code. -->
<nui-button (onClick)="openPanel()">Open Panel</nui-button>`,
      },
    ],
  },
];
