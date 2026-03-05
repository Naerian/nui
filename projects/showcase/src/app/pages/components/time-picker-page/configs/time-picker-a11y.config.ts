import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Time Picker.
 *
 * El TimePicker implementa el patrón ARIA Listbox para las columnas de scroll:
 *
 *  1. Roles semánticos: cada columna de scroll (horas, minutos, período)
 *     actúa como role="listbox"; cada valor dentro de la columna lleva
 *     role="option" y aria-selected.
 *
 *  2. Live region: cuando la hora se normaliza automáticamente (por límites
 *     de rango), se anuncia el nuevo valor a través de aria-live="assertive".
 *
 *  3. Naming: el aria-label del contenedor se toma del token
 *     `timePicker.a11y.timePickerLabel` (o durationPickerLabel en modo duración).
 *     Cada columna recibe su propia etiqueta descriptiva.
 *
 *  4. Foco: al abrir el TimePicker, el foco se posiciona en la primera
 *     columna activa (horas). Al cerrar, regresa al elemento disparador.
 *
 *  5. Teclado: las columnas soportan navegación con flechas verticales;
 *     Tab pasa entre columnas; Escape cierra el picker.
 */
export const TIME_PICKER_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.timePicker.a11y.roles.title',
    description: 'components.timePicker.a11y.roles.description',
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
          'components.timePicker.a11y.roles.elements.container',
          '<code>aria-label</code>',
          '"Selector de hora" (i18n)',
          'components.timePicker.a11y.roles.rows.containerLabel.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.column',
          '<code>role</code>',
          '"listbox"',
          'components.timePicker.a11y.roles.rows.columnRole.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.column',
          '<code>aria-label</code>',
          '"Hora" | "Minutos" | "Periodo" (i18n)',
          'components.timePicker.a11y.roles.rows.columnLabel.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.option',
          '<code>role</code>',
          '"option"',
          'components.timePicker.a11y.roles.rows.optionRole.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.option',
          '<code>aria-selected</code>',
          '"true" | "false"',
          'components.timePicker.a11y.roles.rows.optionSelected.description',
        ],
        [
          'components.timePicker.a11y.roles.elements.normalizedAlert',
          '<code>aria-live</code>',
          '"assertive"',
          'components.timePicker.a11y.roles.rows.normalizedAlert.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.timePicker.a11y.naming.title',
    description: 'components.timePicker.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.timePicker.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.timePicker.a11y.naming.elements.container',
          'components.timePicker.a11y.naming.info.i18nLabel',
          'components.timePicker.a11y.naming.rows.container.description',
        ],
        [
          'components.timePicker.a11y.naming.elements.columns',
          'components.timePicker.a11y.naming.info.columnLabels',
          'components.timePicker.a11y.naming.rows.columns.description',
        ],
        [
          'components.timePicker.a11y.naming.elements.helpText',
          'components.timePicker.a11y.naming.info.a11yHelpTokens',
          'components.timePicker.a11y.naming.rows.helpText.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.timePicker.a11y.keyboard.title',
    description: 'components.timePicker.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd>',
          'components.timePicker.a11y.keyboard.rows.arrows.description',
        ],
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.timePicker.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Home</kbd> / <kbd>End</kbd>',
          'components.timePicker.a11y.keyboard.rows.homeEnd.description',
        ],
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.timePicker.a11y.keyboard.rows.spaceEnter.description',
        ],
        [
          '<kbd>Escape</kbd>',
          'components.timePicker.a11y.keyboard.rows.escape.description',
        ],
      ],
    },
  },
];
