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
        'common.tables.element',
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          'components.timePicker.a11y.roles.elements.container',
          '<code>aria-label</code>',
          '"Selector de hora" (i18n)',
          'components.timePicker.a11y.roles.rows.containerLabel.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.column',
          '<code>role</code>',
          '"listbox"',
          'components.timePicker.a11y.roles.rows.columnRole.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.column',
          '<code>aria-label</code>',
          '"Hora" | "Minutos" | "Periodo" (i18n)',
          'components.timePicker.a11y.roles.rows.columnLabel.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.option',
          '<code>role</code>',
          '"option"',
          'components.timePicker.a11y.roles.rows.optionRole.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.option',
          '<code>aria-selected</code>',
          '"true" | "false"',
          'components.timePicker.a11y.roles.rows.optionSelected.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.normalizedAlert',
          '<code>aria-live</code>',
          '"assertive"',
          'components.timePicker.a11y.roles.rows.normalizedAlert.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.normalizedLive',
          '<code>aria-live</code>',
          '"assertive"',
          'components.timePicker.a11y.roles.rows.normalizedLive.description',
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
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.timePicker.a11y.naming.elements.container',
          'components.timePicker.a11y.naming.info.i18nLabel',
          'components.timePicker.a11y.naming.rows.container.description',
        ],
        [
          'components.timePicker.a11y.naming.elements.columns',
          'components.timePicker.a11y.naming.info.columnLabels',
          'components.timePicker.a11y.naming.rows.columns.description',
        ],
        [
          'components.timePicker.a11y.naming.elements.help',
          'components.timePicker.a11y.naming.info.a11yHelpTokens',
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
];
