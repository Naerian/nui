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
        'common.tables.property',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'Botón con texto o <code>label</code>',
          'Nombre nativo',
          'components.button.a11y.naming.rows.textLabel.description',
        ],
        [
          'Icono + texto',
          'Nombre nativo',
          'components.button.a11y.naming.rows.iconText.description',
        ],
        [
          'Solo icono (<code>isIconOnly</code>)',
          '<code>aria-label</code> / <code>title</code>',
          'components.button.a11y.naming.rows.iconOnly.description',
        ],
        [
          'Estado de carga con solo icono',
          '<code>aria-label</code> / <code>title</code>',
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
          '<code>disabled</code> (nativo)',
          'boolean',
          'components.button.a11y.states.rows.disabled.description',
        ],
        [
          '<code>aria-hidden="true"</code> en iconos',
          'Estático',
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
          'Mueve el foco al botón (o lo abandona). Los botones <code>disabled</code> / <code>loading</code> quedan excluidos del orden de tabulación.',
        ],
        ['<kbd>Shift + Tab</kbd>', 'Mueve el foco al elemento anterior.'],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'Activa el botón. Si está <code>disabled</code> o <code>loading</code>, el handler intercepta y cancela el evento antes de que se dispare <code>onClick</code>.',
        ],
      ],
    },
  },
];
