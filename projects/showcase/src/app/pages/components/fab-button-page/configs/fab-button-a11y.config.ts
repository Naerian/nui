import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente FAB Button.
 *
 * El FAB Button implementa el patrón ARIA Menu Button:
 *
 *  1. Roles semánticos: el host actúa como role="group" cuando el panel
 *     está abierto; el botón disparador expone aria-expanded, aria-controls
 *     y aria-haspopup="menu"; la lista de acciones tiene role="menu" y cada
 *     elemento role="menuitem".
 *
 *  2. Naming: el aria-label del host se toma de triggerAriaLabel (i18n) al
 *     abrir y del input ariaLabel al cerrar. Cada acción recibe su nombre
 *     del texto/tooltip de la propia acción.
 *
 *  3. Foco: al abrir, el foco pasa al primer ítem del menú. Al cerrar
 *     vuelve al botón disparador.
 *
 *  4. Teclado: Escape cierra el panel; las flechas navegan entre acciones.
 */
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
        'common.tables.element',
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          'components.fabButton.a11y.roles.elements.host',
          '<code>role</code>',
          '"group"',
          'components.fabButton.a11y.roles.rows.roleGroup.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.host',
          '<code>aria-label</code>',
          'triggerAriaLabel (i18n)',
          'components.fabButton.a11y.roles.rows.hostLabel.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.trigger',
          '<code>aria-expanded</code>',
          '"true" | "false"',
          'components.fabButton.a11y.roles.rows.expanded.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.trigger',
          '<code>aria-controls</code>',
          '"{instanceId}-menu"',
          'components.fabButton.a11y.roles.rows.controls.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.trigger',
          '<code>aria-haspopup</code>',
          '"menu"',
          'components.fabButton.a11y.roles.rows.haspopup.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.menu',
          '<code>role</code>',
          '"menu"',
          'components.fabButton.a11y.roles.rows.roleMenu.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.action',
          '<code>role</code>',
          '"menuitem"',
          'components.fabButton.a11y.roles.rows.roleMenuItem.description',
        ],
        [
          'components.fabButton.a11y.roles.elements.icon',
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
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.fabButton.a11y.naming.elements.trigger',
          'components.fabButton.a11y.naming.info.triggerLabel',
          'components.fabButton.a11y.naming.rows.trigger.description',
        ],
        [
          'components.fabButton.a11y.naming.elements.action',
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
          'components.fabButton.a11y.keyboard.rows.spaceEnter.description',
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
