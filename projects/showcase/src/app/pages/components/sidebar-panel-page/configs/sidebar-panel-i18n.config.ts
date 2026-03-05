import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Internacionalización del componente Sidebar Panel.
 *
 * El Sidebar Panel inyecta NuiI18nService para obtener las etiquetas de los
 * botones de control del panel a través de tokens genéricos del espacio de
 * nombres raíz (sin sub-objeto propio):
 *
 *  - `close`    → botón de cierre del panel
 *  - `minimize` → botón para minimizar el panel (modo minimizable)
 *  - `restore`  → botón para restaurar el panel desde minimizado
 *  - `expand`   → botón para expandir el panel colapsado
 *  - `collapse` → botón para colapsar el panel expandido
 */
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
      close:    'Cerrar',
      minimize: 'Minimizar',
      restore:  'Restaurar',
      expand:   'Expandir',
      collapse: 'Colapsar',
    }),
  ],
};`,
      },
    ],
  },
];
