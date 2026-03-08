import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente ProgressBar.
 */
export const PROGRESS_BAR_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-setup',
    title: 'components.progressBar.globalConfig.setup.title',
    description: 'components.progressBar.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.progressBar.globalConfig.setup.note',
    },
    examples: [
      {
        title: 'app.config.ts',
        code: `import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        progressBar: {
          color: 'primary',
          variant: 'solid',
        },
      },
    }),
  ],
};`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'global-config-defaults',
    title: 'components.progressBar.globalConfig.defaults.title',
    description: 'components.progressBar.globalConfig.defaults.description',
    anchor: 'global-config-defaults',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'components.progressBar.globalConfig.defaults.rows.color',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.progressBar.globalConfig.defaults.rows.variant',
        ],
      ],
    },
  },
  {
    id: 'global-config-priority',
    title: 'components.progressBar.globalConfig.priority.title',
    description: 'components.progressBar.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.progressBar.globalConfig.priority.note',
    },
  },
];
