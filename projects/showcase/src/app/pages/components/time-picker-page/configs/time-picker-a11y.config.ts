import { ComponentSection } from '../../../../core/models';

export const TIME_PICKER_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.timePicker.a11y.roles.title',
    description: 'components.timePicker.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>aria-label</code>',
          '"Selector de hora" (i18n)',
          'components.timePicker.a11y.roles.rows.containerLabel.description',
        ],
        [
          '<code>role</code>',
          '"listbox"',
          'components.timePicker.a11y.roles.rows.columnRole.description',
        ],
        [
          '<code>aria-label</code>',
          '"Hora" | "Minutos" | "Periodo" (i18n)',
          'components.timePicker.a11y.roles.rows.columnLabel.description',
        ],
        [
          '<code>role</code>',
          '"option"',
          'components.timePicker.a11y.roles.rows.optionRole.description',
        ],
        [
          '<code>aria-selected</code>',
          '"true" | "false"',
          'components.timePicker.a11y.roles.rows.optionSelected.description',
        ],
        [
          '<code>aria-live</code>',
          '"assertive"',
          'components.timePicker.a11y.roles.rows.normalizedAlert.description',
        ]
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.timePicker.a11y.naming.title',
    description: 'components.timePicker.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.timePicker.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.timePicker.a11y.naming.info.containerLabel',
          'components.timePicker.a11y.naming.rows.container.description',
        ],
        [
          'components.timePicker.a11y.naming.info.columnLabels',
          'components.timePicker.a11y.naming.rows.columns.description',
        ],
        [
          'components.timePicker.a11y.naming.info.helpTokens',
          'components.timePicker.a11y.naming.rows.help.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.timePicker.a11y.keyboard.title',
    description: 'components.timePicker.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd>',
          'components.timePicker.a11y.keyboard.rows.arrows.description',
        ],
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.timePicker.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Home</kbd> / <kbd>End</kbd>',
          'components.timePicker.a11y.keyboard.rows.homeEnd.description',
        ],
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.timePicker.a11y.keyboard.rows.enterSpace.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.timePicker.a11y.keyboard.rows.escape.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 4. Templates personalizados y accesibilidad
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-templates',
    title: 'components.timePicker.a11y.templates.title',
    description: 'components.timePicker.a11y.templates.description',
    anchor: 'a11y-templates',
    note: {
      type: 'warning',
      content: 'components.timePicker.a11y.templates.note',
    },
    table: {
      headers: ['common.tables.info', 'common.tables.description'],
      rows: [
        [
          'components.timePicker.a11y.templates.rows.buttonWrapper.info',
          'components.timePicker.a11y.templates.rows.buttonWrapper.description',
        ],
        [
          'components.timePicker.a11y.templates.rows.visibleText.info',
          'components.timePicker.a11y.templates.rows.visibleText.description',
        ],
        [
          'components.timePicker.a11y.templates.rows.footerButtons.info',
          'components.timePicker.a11y.templates.rows.footerButtons.description',
        ],
        [
          'components.timePicker.a11y.templates.rows.headerLiveRegions.info',
          'components.timePicker.a11y.templates.rows.headerLiveRegions.description',
        ],
        [
          'components.timePicker.a11y.templates.rows.colorOnly.info',
          'components.timePicker.a11y.templates.rows.colorOnly.description',
        ],
      ],
    },
  },
];
