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
          'More {count} profiles',
          'components.avatar.i18n.tokens.rows.moreProfiles.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `// app.config.ts — global override via provideNuiI18n
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
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Per-instance override via [i18n] input -->
<nui-avatar-group
  [avatars]="avatars"
  [max]="3"
  [i18n]="{ moreProfiles: '{count} weitere Profile' }"
/>`,
      },
    ],
  },
];
