import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Popover.
 *
 * El Popover implementa el patrón ARIA Dialog:
 *
 *  1. Roles semánticos: el contenedor del popover lleva role="dialog";
 *     el disparador expone aria-expanded y aria-controls apuntando al id
 *     del popover.
 *
 *  2. Naming: la cadena de prioridad para el nombre accesible es
 *     ariaLabelledBy (externo) > ariaLabel (input) > derivado automáticamente
 *     del primer texto visible del contenido.
 *
 *  3. Foco: al abrirse, el foco se mueve al primer elemento focusable
 *     dentro del popover. Al cerrarse vuelve al disparador.
 *
 *  4. Teclado: Escape cierra el popover; Tab/Shift+Tab ciclan dentro
 *     del contenido (focus trap opcional según configuración).
 */
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
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- aria-labelledby apuntando a un título dentro del popover -->
<button [nuiPopover]="myPopover" ariaLabelledBy="popover-title" type="button">
  Abrir detalles
</button>

<!-- aria-label explícito -->
<button [nuiPopover]="myPopover" ariaLabel="Panel de configuración" type="button">
  <i class="ri-settings-line" aria-hidden="true"></i>
</button>

<!-- Derivado automáticamente del primer texto del contenido -->
<button [nuiPopover]="myPopover" type="button">Opciones</button>
<ng-template #myPopover>
  <p>Personaliza la visualización del dashboard.</p>
</ng-template>`,
      },
    ],
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
