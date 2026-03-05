import { ComponentSection } from '../../../../core/models';

export const AVATAR_I18N_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tokens de traducción
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-tokens',
    title: 'components.avatar.i18n.tokens.title',
    description: 'components.avatar.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.avatar.i18n.tokens.note',
    },
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>avatar.moreProfiles</code>',
          '"{count} more profiles"',
          'components.avatar.i18n.tokens.rows.moreProfiles.description',
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
      avatar: {
        moreProfiles: '{count} more profiles',
      },
    }),
  ],
};`,
      },
    ],
  },
];
