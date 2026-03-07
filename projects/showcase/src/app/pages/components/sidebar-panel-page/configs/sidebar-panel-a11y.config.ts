import { ComponentSection } from '../../../../core/models';

export const SIDEBAR_PANEL_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.sidebar-panel.a11y.roles.title',
    description: 'components.sidebar-panel.a11y.roles.description',
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
          'components.sidebar-panel.a11y.roles.elements.panel',
          '<code>role</code>',
          '"dialog"',
          'components.sidebar-panel.a11y.roles.rows.role.description',
        ],
        [
          'components.sidebar-panel.a11y.roles.elements.panel',
          '<code>aria-labelledby</code>',
          '"{instanceId}-title"',
          'components.sidebar-panel.a11y.roles.rows.labelledby.description',
        ],
        [
          'components.sidebar-panel.a11y.roles.elements.closeButton',
          '<code>aria-label</code>',
          '"Close" (i18n)',
          'components.sidebar-panel.a11y.roles.rows.closeLabel.description',
        ],
        [
          'components.sidebar-panel.a11y.roles.elements.minimizeButton',
          '<code>aria-label</code>',
          '"Minimize" | "Restore" (i18n)',
          'components.sidebar-panel.a11y.roles.rows.minimizeLabel.description',
        ],
        [
          'components.sidebar-panel.a11y.roles.elements.expandButton',
          '<code>aria-label</code>',
          '"Expand" | "Collapse" (i18n)',
          'components.sidebar-panel.a11y.roles.rows.expandLabel.description',
        ],
        [
          'components.sidebar-panel.a11y.roles.elements.backdrop',
          '<code>aria-hidden</code>',
          '"true"',
          'components.sidebar-panel.a11y.roles.rows.backdrop.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.sidebar-panel.a11y.naming.title',
    description: 'components.sidebar-panel.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.sidebar-panel.a11y.naming.elements.panelWithTitle',
          '<code>aria-labelledby</code>',
          'components.sidebar-panel.a11y.naming.rows.title.description',
        ],
        [
          'components.sidebar-panel.a11y.naming.elements.buttons',
          'components.sidebar-panel.a11y.naming.info.i18nTokens',
          'components.sidebar-panel.a11y.naming.rows.buttons.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.sidebar-panel.a11y.keyboard.title',
    description: 'components.sidebar-panel.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Escape</kbd>',
          'components.sidebar-panel.a11y.keyboard.rows.escape.description',
        ],
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.sidebar-panel.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.sidebar-panel.a11y.keyboard.rows.enterSpace.description',
        ],
      ],
    },
  },
];
