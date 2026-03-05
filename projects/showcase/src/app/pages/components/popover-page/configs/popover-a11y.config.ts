import { ComponentSection } from '../../../../core/models';

export const POPOVER_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.popover.a11y.roles.title',
    description: 'components.popover.a11y.roles.description',
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
          'components.popover.a11y.roles.elements.trigger',
          '<code>aria-expanded</code>',
          '"true" | "false"',
          'components.popover.a11y.roles.rows.expanded.description',
        ],
        [
          'components.popover.a11y.roles.elements.trigger',
          '<code>aria-controls</code>',
          '"{popoverId}"',
          'components.popover.a11y.roles.rows.controls.description',
        ],
        [
          'components.popover.a11y.roles.elements.popover',
          '<code>role</code>',
          '"dialog"',
          'components.popover.a11y.roles.rows.role.description',
        ],
        [
          'components.popover.a11y.roles.elements.popover',
          '<code>id</code>',
          '"{popoverId}"',
          'components.popover.a11y.roles.rows.id.description',
        ],
        [
          'components.popover.a11y.roles.elements.popover',
          '<code>aria-label</code>',
          'string | null',
          'components.popover.a11y.roles.rows.ariaLabel.description',
        ],
        [
          'components.popover.a11y.roles.elements.popover',
          '<code>aria-labelledby</code>',
          'string | null',
          'components.popover.a11y.roles.rows.labelledby.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.popover.a11y.naming.title',
    description: 'components.popover.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.popover.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.popover.a11y.naming.elements.popoverLabelledBy',
          '<code>aria-labelledby</code>',
          'components.popover.a11y.naming.rows.labelledBy.description',
        ],
        [
          'components.popover.a11y.naming.elements.popoverLabel',
          '<code>aria-label</code>',
          'components.popover.a11y.naming.rows.label.description',
        ],
        [
          'components.popover.a11y.naming.elements.popoverAuto',
          'components.popover.a11y.naming.info.auto',
          'components.popover.a11y.naming.rows.auto.description',
        ],
        [
          'components.popover.a11y.naming.elements.trigger',
          'components.popover.a11y.naming.info.ownLabel',
          'components.popover.a11y.naming.rows.trigger.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.popover.a11y.keyboard.title',
    description: 'components.popover.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.popover.a11y.keyboard.rows.spaceEnter.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.popover.a11y.keyboard.rows.escape.description',
        ],
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.popover.a11y.keyboard.rows.tab.description',
        ],
      ],
    },
  },
];
