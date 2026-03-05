import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Internacionalización del componente Avatar.
 *
 * El componente AvatarGroup inyecta NuiI18nService para construir la etiqueta
 * del indicador de exceso "+N" (p. ej. "+3 perfiles más"). El texto se define
 * en el token `avatar.moreProfiles` y soporta el placeholder `{count}` que
 * se sustituye dinámicamente con el número de avatares ocultos.
 *
 * El componente nui-avatar individual NO usa NuiI18nService; para él el
 * nombre accesible lo aporta siempre el consumidor mediante los inputs
 * `alt`, `tooltip` o el estándar `aria-label`.
 *
 * Para sobreescribir el texto del indicador basta con pasar la clave al
 * proveedor global NUI_I18N o al input [i18n] del componente padre:
 *
 *   providers: [provideNuiI18n({ avatar: { moreProfiles: '+{count} more' } })]
 */
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
      headers: [
        'common.tables.token',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>avatar.moreProfiles</code>',
          '"Más {count} perfiles"',
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
        moreProfiles: '+{count} more',
      },
    }),
  ],
};`,
      },
    ],
  },
];
