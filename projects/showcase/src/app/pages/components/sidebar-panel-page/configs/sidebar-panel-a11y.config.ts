import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Sidebar Panel.
 *
 * El Sidebar Panel implementa el patrón ARIA Dialog:
 *
 *  1. Roles semánticos: el panel lleva role="dialog" y aria-labelledby
 *     apuntando al id del elemento título dentro del panel.
 *
 *  2. Focus trap: al abrirse, la directiva CDK FocusTrap captura el foco
 *     dentro del panel. Al cerrarse el foco regresa al elemento que lo abrió.
 *
 *  3. Botones de control: cada botón (close, minimize, restore, expand,
 *     collapse) obtiene su aria-label del token i18n correspondiente.
 *
 *  4. Backdrop: el overlay lleva aria-hidden="true" para ocultarlo de los
 *     lectores de pantalla; la interacción con él cierra el panel.
 *
 *  5. Teclado: Escape cierra el panel activo.
 */
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
          'components.sidebar-panel.a11y.naming.rows.panelTitle.description',
        ],
        [
          'components.sidebar-panel.a11y.naming.elements.controlButtons',
          'components.sidebar-panel.a11y.naming.info.i18nTokens',
          'components.sidebar-panel.a11y.naming.rows.controlButtons.description',
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
          'components.sidebar-panel.a11y.keyboard.rows.spaceEnter.description',
        ],
      ],
    },
  },
];
