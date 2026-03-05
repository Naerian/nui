import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Tooltip.
 *
 * El Tooltip implementa el patrón ARIA «describedby»:
 *
 *  1. Roles semánticos: el elemento disparador recibe aria-describedby
 *     apuntando al id del tooltip; el tooltip renderizado lleva role="tooltip".
 *
 *  2. Naming: el contenido del tooltip proporciona la descripción del
 *     disparador, no su nombre. Si el disparador es un icono sin texto
 *     visible debe tener su propio aria-label.
 *
 *  3. Teclado: el tooltip se muestra/oculta sincronizándose con los eventos
 *     focus/blur del disparador, siguiendo así el comportamiento de teclado
 *     nativo sin necesidad de gestión adicional. Escape lo oculta.
 *
 *  4. Sin foco interno: el contenido del tooltip no es interactivo; para
 *     contenido con acciones utilizar el componente Popover.
 */
export const TOOLTIP_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.tooltip.a11y.roles.title',
    description: 'components.tooltip.a11y.roles.description',
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
          'components.tooltip.a11y.roles.elements.trigger',
          '<code>aria-describedby</code>',
          '"{tooltipId}"',
          'components.tooltip.a11y.roles.rows.describedby.description',
        ],
        [
          'components.tooltip.a11y.roles.elements.tooltip',
          '<code>role</code>',
          '"tooltip"',
          'components.tooltip.a11y.roles.rows.role.description',
        ],
        [
          'components.tooltip.a11y.roles.elements.tooltip',
          '<code>id</code>',
          '"{tooltipId}"',
          'components.tooltip.a11y.roles.rows.id.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.tooltip.a11y.naming.title',
    description: 'components.tooltip.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.tooltip.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.tooltip.a11y.naming.elements.trigger',
          'components.tooltip.a11y.naming.info.ownLabel',
          'components.tooltip.a11y.naming.rows.trigger.description',
        ],
        [
          'components.tooltip.a11y.naming.elements.iconTrigger',
          'components.tooltip.a11y.naming.info.ariaLabel',
          'components.tooltip.a11y.naming.rows.iconTrigger.description',
        ],
        [
          'components.tooltip.a11y.naming.elements.tooltipContent',
          'components.tooltip.a11y.naming.info.description',
          'components.tooltip.a11y.naming.rows.tooltipContent.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Botón con texto: el tooltip lo describe -->
<button [nuiTooltip]="'Guarda los cambios'" type="button">Guardar</button>

<!-- Icono sin texto: requiere aria-label propio en el disparador -->
<button [nuiTooltip]="'Eliminar elemento'" aria-label="Eliminar" type="button">
  <i class="ri-delete-bin-line" aria-hidden="true"></i>
</button>

<!-- [EVITAR] Icono sin aria-label: el nombre accesible queda vacío -->
<button [nuiTooltip]="'Eliminar elemento'" type="button">
  <i class="ri-delete-bin-line"></i>
</button>`,
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.tooltip.a11y.keyboard.title',
    description: 'components.tooltip.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd>',
          'components.tooltip.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.tooltip.a11y.keyboard.rows.escape.description',
        ],
      ],
    },
  },
];
