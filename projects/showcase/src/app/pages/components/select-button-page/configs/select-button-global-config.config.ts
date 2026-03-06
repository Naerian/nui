import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente SelectButton.
 */
export const SELECT_BUTTON_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-setup',
    title: 'components.selectButton.globalConfig.setup.title',
    description: 'components.selectButton.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.selectButton.globalConfig.setup.note',
    },
    examples: [
      {
        title: 'codeExamples.configuration',
        language: 'typescript',
        code: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        selectButton: {
          color: 'secondary',
          size: 'sm',
          variant: 'outline',
          width: 'full',
        },
      },
    }),
  ],
};`,
      },
    ],
  },
  {
    id: 'global-config-defaults',
    title: 'components.selectButton.globalConfig.defaults.title',
    description: 'components.selectButton.globalConfig.defaults.description',
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
          'components.selectButton.globalConfig.defaults.rows.color',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'components.selectButton.globalConfig.defaults.rows.size',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'components.selectButton.globalConfig.defaults.rows.variant',
        ],
        [
          '<code>width</code>',
          'ButtonWidth',
          '<code class="neutral">auto</code>',
          'components.selectButton.globalConfig.defaults.rows.width',
        ],
      ],
    },
  },
  {
    id: 'global-config-priority',
    title: 'components.selectButton.globalConfig.priority.title',
    description: 'components.selectButton.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.selectButton.globalConfig.priority.note',
    },
  },
];
