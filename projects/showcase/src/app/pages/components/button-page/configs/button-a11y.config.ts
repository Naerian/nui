import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Button.
 *
 * El componente Button utiliza el elemento nativo <button>, que proporciona
 * semántica, foco y eventos de teclado de forma gratuita. La capa de a11y
 * de NUI añade únicamente lo necesario sobre esa base:
 *
 *  - Cálculo automático del nombre accesible para botones de solo icono.
 *  - aria-busy durante el estado de carga.
 *  - aria-hidden en todos los elementos decorativos (iconos, spinners).
 *  - Bloqueo real del botón (atributo disabled nativo) cuando disabled/loading.
 *
 * El componente NO usa NuiI18nService porque no produce texto visible propio;
 * todo el contenido viene del consumidor (label, ng-content, aria-label).
 */
export const BUTTON_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.button.a11y.naming.title',
    description: 'components.button.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'warning',
      content: 'components.button.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.button.a11y.naming.elements.textLabel',
          'components.button.a11y.naming.info.nativeName',
          'components.button.a11y.naming.rows.textLabel.description',
        ],
        [
          'components.button.a11y.naming.elements.iconText',
          'components.button.a11y.naming.info.nativeName',
          'components.button.a11y.naming.rows.iconText.description',
        ],
        [
          'components.button.a11y.naming.elements.iconOnly',
          'components.button.a11y.naming.info.ariaLabelTitle',
          'components.button.a11y.naming.rows.iconOnly.description',
        ],
        [
          'components.button.a11y.naming.elements.iconOnlyLoading',
          'components.button.a11y.naming.info.ariaLabelTitle',
          'components.button.a11y.naming.rows.iconOnlyLoading.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Visible text – automatically resolved accessible name -->
<nui-button>Save changes</nui-button>

<!-- Icon + text – decorative icon, text as name -->
<nui-button icon="ri-save-line">Save</nui-button>

<!-- Icon only – explicit aria-label (recommended) -->
<nui-button icon="ri-close-line" aria-label="Close dialog"></nui-button>

<!-- Icon only – title as fallback (if aria-label is not available) -->
<nui-button icon="ri-close-line" title="Close dialog"></nui-button>

<!-- Icon only without accessible name – [AVOID !!] -->
<nui-button icon="ri-close-line"></nui-button>`,
      },
    ],
  },
  {
    id: 'a11y-states',
    title: 'components.button.a11y.states.title',
    description: 'components.button.a11y.states.description',
    anchor: 'a11y-states',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>[attr.aria-label]</code>',
          'string | null',
          'components.button.a11y.states.rows.ariaLabel.description',
        ],
        [
          '<code>[attr.aria-busy]</code>',
          '"true" | null',
          'components.button.a11y.states.rows.ariaBusy.description',
        ],
        [
          'components.button.a11y.states.elements.disabled',
          'boolean',
          'components.button.a11y.states.rows.disabled.description',
        ],
        [
          'components.button.a11y.states.elements.ariaHiddenIcons',
          'components.button.a11y.states.info.staticValue',
          'components.button.a11y.states.rows.ariaHidden.description',
        ],
      ],
    },
  },
  {
    id: 'a11y-keyboard',
    title: 'components.button.a11y.keyboard.title',
    description: 'components.button.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    note: {
      type: 'info',
      content: 'components.button.a11y.keyboard.note',
    },
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd>',
          'components.button.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Shift + Tab</kbd>',
          'components.button.a11y.keyboard.rows.shiftTab.description',
        ],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'components.button.a11y.keyboard.rows.spaceEnter.description',
        ],
      ],
    },
  },
];
