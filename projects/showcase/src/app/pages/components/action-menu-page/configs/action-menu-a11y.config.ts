import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Action Menu.
 *
 * El Action Menu aplica los siguientes patrones ARIA:
 *
 *  1. Roles semánticos: el botón disparador expone aria-haspopup="menu" y
 *     aria-expanded; el contenedor del menú tiene role="menu"; cada opción
 *     lleva role="menuitem" (o "menuitemradio" en modo selección) y los
 *     separadores tienen role="separator".
 *
 *  2. Naming: el nombre accesible del disparador sigue la cadena
 *     ariaLabel()||label()||title()||null. El menú se etiqueta con
 *     aria-labelledby apuntando al id del disparador (modo dinámico).
 *
 *  3. Teclado: el componente intercepta ArrowDown/Up/Home/End con
 *     preventDefault para mover el foco entre ítems, ArrowRight/Left para
 *     abrir/cerrar submenús y Escape para cerrar el menú activo.
 *
 *  4. Iconos decorativos: todos los <i> de iconos llevan aria-hidden="true".
 */
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
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Disparador con texto: nombre accesible resuelto de forma nativa -->
<nui-action-menu [items]="items" label="Actions"></nui-action-menu>

<!-- Solo icono: aria-label explícito (recomendado) -->
<nui-action-menu [items]="items" icon="ri-more-line" ariaLabel="More actions"></nui-action-menu>

<!-- Solo icono: title como fallback -->
<nui-action-menu [items]="items" icon="ri-more-line" title="More actions"></nui-action-menu>

<!-- [EVITAR] Solo icono sin nombre accesible -->
<nui-action-menu [items]="items" icon="ri-more-line"></nui-action-menu>`,
      },
    ],
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
