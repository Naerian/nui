import { ComponentSection } from '../../../../core/models';

export const FAB_BUTTON_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.fabButton.a11y.roles.title',
    description: 'components.fabButton.a11y.roles.description',
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
          '"group"',
          'components.fabButton.a11y.roles.rows.roleGroup.description',
        ],
        [
          '<code>aria-label</code>',
          'triggerAriaLabel (i18n)',
          'components.fabButton.a11y.roles.rows.hostLabel.description',
        ],
        [
          '<code>aria-expanded</code>',
          '"true" | "false"',
          'components.fabButton.a11y.roles.rows.expanded.description',
        ],
        [
          '<code>aria-controls</code>',
          '"{instanceId}-menu"',
          'components.fabButton.a11y.roles.rows.controls.description',
        ],
        [
          '<code>aria-haspopup</code>',
          '"menu"',
          'components.fabButton.a11y.roles.rows.haspopup.description',
        ],
        [
          '<code>role</code>',
          '"menu"',
          'components.fabButton.a11y.roles.rows.roleMenu.description',
        ],
        [
          '<code>role</code>',
          '"menuitem"',
          'components.fabButton.a11y.roles.rows.roleMenuItem.description',
        ],
        [
          '<code>aria-hidden</code>',
          '"true"',
          'components.fabButton.a11y.roles.rows.ariaHiddenIcon.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.fabButton.a11y.naming.title',
    description: 'components.fabButton.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.fabButton.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.fabButton.a11y.naming.info.triggerLabel',
          'components.fabButton.a11y.naming.rows.trigger.description',
        ],
        [
          'components.fabButton.a11y.naming.info.actionLabel',
          'components.fabButton.a11y.naming.rows.action.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.fabButton.a11y.keyboard.title',
    description: 'components.fabButton.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.fabButton.a11y.keyboard.rows.enterSpace.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.fabButton.a11y.keyboard.rows.escape.description',
        ],
        [
          '<kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd>',
          'components.fabButton.a11y.keyboard.rows.arrows.description',
        ],
        [
          '<kbd>Home</kbd> / <kbd>End</kbd>',
          'components.fabButton.a11y.keyboard.rows.homeEnd.description',
        ],
        [
          '<kbd>Tab</kbd>',
          'components.fabButton.a11y.keyboard.rows.tab.description',
        ],
      ],
    },
  },
];
