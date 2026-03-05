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
        'common.tables.element',
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          'components.actionMenu.a11y.roles.elements.trigger',
          '<code>aria-haspopup</code>',
          '"menu"',
          'components.actionMenu.a11y.roles.rows.haspopup.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.trigger',
          '<code>aria-expanded</code>',
          '"true" | "false"',
          'components.actionMenu.a11y.roles.rows.expanded.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.trigger',
          '<code>aria-controls</code>',
          '"{instanceId}-menu"',
          'components.actionMenu.a11y.roles.rows.controls.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.menu',
          '<code>role</code>',
          '"menu"',
          'components.actionMenu.a11y.roles.rows.roleMenu.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.menu',
          '<code>aria-orientation</code>',
          '"vertical"',
          'components.actionMenu.a11y.roles.rows.orientation.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.menuDynamic',
          '<code>aria-labelledby</code>',
          '"{instanceId}-trigger"',
          'components.actionMenu.a11y.roles.rows.labelledby.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.item',
          '<code>role</code>',
          '"menuitem" | "menuitemradio"',
          'components.actionMenu.a11y.roles.rows.roleItem.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.itemSelectable',
          '<code>aria-checked</code>',
          '"true" | "false"',
          'components.actionMenu.a11y.roles.rows.ariaChecked.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.item',
          '<code>aria-keyshortcuts</code>',
          'string | null',
          'components.actionMenu.a11y.roles.rows.keyshortcuts.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.separator',
          '<code>role</code>',
          '"separator"',
          'components.actionMenu.a11y.roles.rows.roleSeparator.description',
        ],
        [
          'components.actionMenu.a11y.roles.elements.icon',
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
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.actionMenu.a11y.naming.elements.triggerWithLabel',
          'components.actionMenu.a11y.naming.info.nativeName',
          'components.actionMenu.a11y.naming.rows.triggerLabel.description',
        ],
        [
          'components.actionMenu.a11y.naming.elements.triggerWithAriaLabel',
          '<code>aria-label</code>',
          'components.actionMenu.a11y.naming.rows.triggerAriaLabel.description',
        ],
        [
          'components.actionMenu.a11y.naming.elements.triggerIconOnly',
          'components.actionMenu.a11y.naming.info.titleFallback',
          'components.actionMenu.a11y.naming.rows.triggerIconOnly.description',
        ],
        [
          'components.actionMenu.a11y.naming.elements.menuItem',
          '<code>aria-label</code>',
          'components.actionMenu.a11y.naming.rows.itemLabel.description',
        ],
        [
          'components.actionMenu.a11y.naming.elements.menuContainer',
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
          'components.actionMenu.a11y.keyboard.rows.spaceEnter.description',
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
