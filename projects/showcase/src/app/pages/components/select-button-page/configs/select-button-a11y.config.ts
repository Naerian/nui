import { ComponentSection } from '../../../../core/models';

export const SELECT_BUTTON_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.selectButton.a11y.roles.title',
    description: 'components.selectButton.a11y.roles.description',
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
          '"radiogroup"',
          'components.selectButton.a11y.roles.rows.roleRadiogroup.description',
        ],
        [
          '<code>role</code>',
          '"group"',
          'components.selectButton.a11y.roles.rows.roleGroup.description',
        ],
        [
          '<code>aria-disabled</code>',
          '"true" | "false"',
          'components.selectButton.a11y.roles.rows.ariaDisabled.description',
        ],
        [
          '<code>role</code>',
          '"radio"',
          'components.selectButton.a11y.roles.rows.roleRadio.description',
        ],
        [
          '<code>role</code>',
          '"checkbox"',
          'components.selectButton.a11y.roles.rows.roleCheckbox.description',
        ],
        [
          '<code>aria-checked</code>',
          '"true" | "false"',
          'components.selectButton.a11y.roles.rows.ariaChecked.description',
        ],
        [
          '<code>aria-hidden</code>',
          '"true"',
          'components.selectButton.a11y.roles.rows.ariaHiddenIcon.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.selectButton.a11y.naming.title',
    description: 'components.selectButton.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.selectButton.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.selectButton.a11y.naming.info.optionLabel',
          'components.selectButton.a11y.naming.rows.button.description',
        ],
        [
          'components.selectButton.a11y.naming.info.groupLabel',
          'components.selectButton.a11y.naming.rows.container.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.selectButton.a11y.keyboard.title',
    description: 'components.selectButton.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.selectButton.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>ArrowRight</kbd> / <kbd>ArrowDown</kbd>',
          'components.selectButton.a11y.keyboard.rows.arrowNext.description',
        ],
        [
          '<kbd>ArrowLeft</kbd> / <kbd>ArrowUp</kbd>',
          'components.selectButton.a11y.keyboard.rows.arrowPrev.description',
        ],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'components.selectButton.a11y.keyboard.rows.enterSpace.description',
        ],
      ],
    },
  },
];
