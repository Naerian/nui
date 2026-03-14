import { ComponentSection } from '../../../../core';

export const DOCK_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-options',
    title: 'components.dock.globalConfig.options.title',
    description: 'components.dock.globalConfig.options.description',
    anchor: 'global-config-options',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>position</code>',
          "'bottom' | 'top'",
          "'bottom'",
          'components.dock.globalConfig.options.rows.position',
        ],
        [
          '<code>showTypeSeparator</code>',
          'boolean',
          'true',
          'components.dock.globalConfig.options.rows.showTypeSeparator',
        ],
        [
          '<code>maxVisibleChips</code>',
          'number | undefined',
          'undefined',
          'components.dock.globalConfig.options.rows.maxVisibleChips',
        ],
      ],
    },
  },
  {
    id: 'global-config-example',
    title: 'components.dock.globalConfig.example.title',
    description: 'components.dock.globalConfig.example.description',
    anchor: 'global-config-example',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        dock: {
          position: 'top',           // Show dock at the top of the viewport
          showTypeSeparator: false,  // Hide the separator between modal and sidebar chips
          maxVisibleChips: 3,        // Collapse overflow into a "+N" chip (recommended for mobile)
        }
      }
    })
  ]
};`,
        language: 'typescript',
      },
    ],
  },
];
