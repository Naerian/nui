import { ComponentSection } from '../../../../core/models';

export const TOAST_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.toast.a11y.roles.title',
    description: 'components.toast.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>aria-live</code>',
          '"polite" | "assertive"',
          'components.toast.a11y.roles.rows.ariaLive.description',
        ],
        [
          '<code>aria-atomic</code>',
          '"true"',
          'components.toast.a11y.roles.rows.ariaAtomic.description',
        ],
        [
          '<code>aria-label</code>',
          'title | message | type',
          'components.toast.a11y.roles.rows.ariaLabel.description',
        ],
        [
          '<code>aria-label</code>',
          '"Close" (i18n)',
          'components.toast.a11y.roles.rows.closeLabel.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.toast.a11y.naming.title',
    description: 'components.toast.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.toast.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.toast.a11y.naming.info.title',
          'components.toast.a11y.naming.rows.hostTitle.description',
        ],
        [
          'components.toast.a11y.naming.info.message',
          'components.toast.a11y.naming.rows.hostMessage.description',
        ],
        [
          'components.toast.a11y.naming.info.type',
          'components.toast.a11y.naming.rows.hostType.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.toast.a11y.keyboard.title',
    description: 'components.toast.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd>',
          'components.toast.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'components.toast.a11y.keyboard.rows.enterSpace.description',
        ],
      ],
    },
  },
];
