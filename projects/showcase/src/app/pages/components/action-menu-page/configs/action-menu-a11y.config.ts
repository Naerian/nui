import { ComponentSection } from '../../../../core/models';

export const ACTION_MENU_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.actionMenu.a11y.roles.title',
    description: 'components.actionMenu.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>aria-haspopup</code>',
          '"menu"',
          'components.actionMenu.a11y.roles.rows.haspopup.description',
        ],
        [
          '<code>aria-expanded</code>',
          '"true" | "false"',
          'components.actionMenu.a11y.roles.rows.expanded.description',
        ],
        [
          '<code>aria-controls</code>',
          '"{instanceId}-menu"',
          'components.actionMenu.a11y.roles.rows.controls.description',
        ],
        [
          '<code>role</code>',
          '"menu"',
          'components.actionMenu.a11y.roles.rows.roleMenu.description',
        ],
        [
          '<code>aria-orientation</code>',
          '"vertical"',
          'components.actionMenu.a11y.roles.rows.orientation.description',
        ],
        [
          '<code>aria-labelledby</code>',
          '"{instanceId}-trigger"',
          'components.actionMenu.a11y.roles.rows.labelledby.description',
        ],
        [
          '<code>role</code>',
          '"menuitem" | "menuitemradio"',
          'components.actionMenu.a11y.roles.rows.roleItem.description',
        ],
        [
          '<code>aria-checked</code>',
          '"true" | "false"',
          'components.actionMenu.a11y.roles.rows.ariaChecked.description',
        ],
        [
          '<code>aria-keyshortcuts</code>',
          'string | null',
          'components.actionMenu.a11y.roles.rows.keyshortcuts.description',
        ],
        [
          '<code>role</code>',
          '"separator"',
          'components.actionMenu.a11y.roles.rows.roleSeparator.description',
        ],
        [
          '<code>aria-hidden</code>',
          '"true"',
          'components.actionMenu.a11y.roles.rows.ariaHiddenIcon.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.actionMenu.a11y.naming.title',
    description: 'components.actionMenu.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.actionMenu.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.actionMenu.a11y.naming.info.nativeName',
          'components.actionMenu.a11y.naming.rows.triggerLabel.description',
        ],
        [
          '<code>aria-label</code>',
          'components.actionMenu.a11y.naming.rows.triggerAriaLabel.description',
        ],
        [
          'components.actionMenu.a11y.naming.info.titleFallback',
          'components.actionMenu.a11y.naming.rows.triggerIconOnly.description',
        ],
        [
          '<code>aria-label</code>',
          'components.actionMenu.a11y.naming.rows.itemLabel.description',
        ],
        [
          '<code>aria-labelledby</code>',
          'components.actionMenu.a11y.naming.rows.menuLabelledby.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.actionMenu.a11y.keyboard.title',
    description: 'components.actionMenu.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    note: {
      type: 'info',
      content: 'components.actionMenu.a11y.keyboard.note',
    },
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.actionMenu.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'components.actionMenu.a11y.keyboard.rows.enterSpace.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.actionMenu.a11y.keyboard.rows.escape.description',
        ],
        [
          '<kbd>ArrowDown</kbd>',
          'components.actionMenu.a11y.keyboard.rows.arrowDown.description',
        ],
        [
          '<kbd>ArrowUp</kbd>',
          'components.actionMenu.a11y.keyboard.rows.arrowUp.description',
        ],
        [
          '<kbd>Home</kbd>',
          'components.actionMenu.a11y.keyboard.rows.home.description',
        ],
        [
          '<kbd>End</kbd>',
          'components.actionMenu.a11y.keyboard.rows.end.description',
        ],
        [
          '<kbd>ArrowRight</kbd>',
          'components.actionMenu.a11y.keyboard.rows.arrowRight.description',
        ],
        [
          '<kbd>ArrowLeft</kbd>',
          'components.actionMenu.a11y.keyboard.rows.arrowLeft.description',
        ],
      ],
    },
  },
];
