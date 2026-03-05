import { ComponentSection } from '../../../../core/models';

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
