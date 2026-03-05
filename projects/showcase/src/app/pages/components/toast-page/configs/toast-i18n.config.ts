import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Internacionalización del componente Toast.
 *
 * El componente Toast inyecta NuiI18nService para obtener el texto del botón
 * de cierre a través del token genérico `close`. No tiene un sub-objeto
 * propio en el espacio de nombres del componente.
 *
 * La etiqueta del host (aria-label) se deriva automáticamente del contenido
 * de la notificación (título → mensaje → tipo), por lo que no se traduce
 * con i18n sino que refleja el texto del propio usuario.
 */
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
      close: 'Cerrar',
    }),
  ],
};`,
      },
    ],
  },
];
