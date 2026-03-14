import { ComponentSection } from '../../../../core';

export const DOCK_I18N_SECTIONS: ComponentSection[] = [
  {
    id: 'i18n-keys',
    title: 'components.dock.i18n.keys.title',
    description: 'components.dock.i18n.keys.description',
    note: {
      type: 'info',
      content: 'components.dock.i18n.keys.note',
    },
    anchor: 'i18n-keys',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>dock.ariaLabel</code>',
          'Minimized items',
          'components.dock.i18n.keys.rows.ariaLabel',
        ],
        [
          '<code>close</code>',
          'Close',
          'components.dock.i18n.keys.rows.close',
        ],
        [
          '<code>dock.sheetTitle</code>',
          'Minimized items',
          'components.dock.i18n.keys.rows.sheetTitle',
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
  dock: {
    ariaLabel: 'Elementos minimizados',
    sheetTitle: 'Elementos minimizados',
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
