import { ComponentSection } from '../../../../core/models';

export const CALENDAR_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.calendar.a11y.roles.title',
    description: 'components.calendar.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>role</code>',
          '"grid"',
          'components.calendar.a11y.roles.rows.grid.description',
        ],
        [
          '<code>aria-label</code>',
          '"Calendario" (i18n)',
          'components.calendar.a11y.roles.rows.gridLabel.description',
        ],
        [
          '<code>role</code>',
          '"columnheader"',
          'components.calendar.a11y.roles.rows.columnHeader.description',
        ],
        [
          '<code>role</code>',
          '"gridcell"',
          'components.calendar.a11y.roles.rows.gridcell.description',
        ],
        [
          '<code>aria-selected</code>',
          '"true" | "false"',
          'components.calendar.a11y.roles.rows.selected.description',
        ],
        [
          '<code>aria-disabled</code>',
          '"true" | "false"',
          'components.calendar.a11y.roles.rows.disabled.description',
        ],
        [
          '<code>aria-live</code>',
          '"polite"',
          'components.calendar.a11y.roles.rows.liveRegion.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.calendar.a11y.naming.title',
    description: 'components.calendar.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.calendar.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.calendar.a11y.naming.info.i18nLabel',
          'components.calendar.a11y.naming.rows.grid.description',
        ],
        [
          'components.calendar.a11y.naming.info.dateFormatted',
          'components.calendar.a11y.naming.rows.dayButton.description',
        ],
        [
          'components.calendar.a11y.naming.info.ariaTokens',
          'components.calendar.a11y.naming.rows.stateAnnotation.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.calendar.a11y.keyboard.title',
    description: 'components.calendar.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd>',
          'components.calendar.a11y.keyboard.rows.arrowHorizontal.description',
        ],
        [
          '<kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd>',
          'components.calendar.a11y.keyboard.rows.arrowVertical.description',
        ],
        [
          '<kbd>Home</kbd>',
          'components.calendar.a11y.keyboard.rows.home.description',
        ],
        [
          '<kbd>End</kbd>',
          'components.calendar.a11y.keyboard.rows.end.description',
        ],
        [
          '<kbd>PageUp</kbd>',
          'components.calendar.a11y.keyboard.rows.pageUp.description',
        ],
        [
          '<kbd>PageDown</kbd>',
          'components.calendar.a11y.keyboard.rows.pageDown.description',
        ],
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.calendar.a11y.keyboard.rows.enterSpace.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.calendar.a11y.keyboard.rows.escape.description',
        ],
      ],
    },
  },
];
