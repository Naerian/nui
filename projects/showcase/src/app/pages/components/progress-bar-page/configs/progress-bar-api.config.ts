import { ComponentSection } from '../../../../core/models';

export const PROGRESS_BAR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.progressBar.api.inputs.title',
    description: 'components.progressBar.api.inputs.description',
    anchor: 'api-inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>compact</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Reduce la barra a un indicador fino (6 px) y oculta el valor.',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'Color semántico del componente.',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          "Variante visual: 'solid', 'outline', 'ghost'",
        ],
        [
          '<code>value</code>',
          'number | null',
          '<code class="neutral">0</code>',
          'Valor actual del progreso.',
        ],
        [
          '<code>maxValue</code>',
          'number | null',
          '<code class="neutral">100</code>',
          'Valor máximo del progreso.',
        ],
        [
          '<code>indeterminate</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Activa la animación de progreso indeterminado.',
        ],
        [
          '<code>valuePosition</code>',
          'ProgressBarValuePosition',
          '<code class="neutral">inside</code>',
          "Posición del valor: 'hidden', 'inside', 'top', 'bottom', 'left', 'right'",
        ],
        [
          '<code>valueFormat</code>',
          'ProgressBarValueFormat',
          '<code class="neutral">percentage</code>',
          "Formato del valor: 'percentage' muestra 70 %, 'fractional' muestra 70 / 100",
        ],
        [
          '<code>label</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Texto de etiqueta descriptiva del progreso.',
        ],
        [
          '<code>labelPosition</code>',
          'ProgressBarLabelPosition',
          '<code class="neutral">top</code>',
          "Posición de la etiqueta: 'top', 'bottom', 'left', 'right'",
        ],
        [
          '<code>trailingIcon</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Clase RemixIcon independiente del label, always renderizada al final del row de la barra.',
        ],
        [
          '<code>showValueInLabel</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Muestra el valor de progreso inline junto a la etiqueta.',
        ],
        [
          '<code>ariaLabel</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Nombre accesible para lectores de pantalla cuando no hay etiqueta visible. Solo se aplica si no hay <code>label</code> ni <code>nuiPbLabel</code> activos.',
        ],
        [
          '<code>steps</code>',
          'number',
          '<code class="neutral">0</code>',
          'Divide visualmente el track en N segmentos mediante líneas divisoras. Requiere ≥ 2 para activarse.',
        ],
        [
          '<code>trackColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Color de fondo personalizado del track (sobreescribe el tema).',
        ],
        [
          '<code>fillColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Color de fondo personalizado del fill (sobreescribe el tema).',
        ],
        [
          '<code>textColor</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Color personalizado para el texto del valor, etiqueta e iconos.',
        ],
      ],
    },
  },
  {
    id: 'api-templates',
    title: 'components.progressBar.api.templates.title',
    description: 'components.progressBar.api.templates.description',
    anchor: 'api-templates',
    note: {
      type: 'info',
      content: 'components.progressBar.api.templates.note',
    },
    table: {
      headers: [
        'common.tables.directive',
        'common.tables.slot',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>[nuiPbTemplate]</code>',
          '<code>slot="value"</code>',
          'Reemplaza el bloque del valor numérico. Compatible con cualquier <code>valuePosition</code>, incluyendo <code>inside</code>.',
        ],
        [
          '<code>[nuiPbTemplate]</code>',
          '<code>slot="label"</code>',
          'Reemplaza el bloque de la etiqueta descriptiva. Puede estar activo simultáneamente con <code>slot="value"</code>, cada uno en su propia posición.',
        ],
      ],
    },
  },
  {
    id: 'api-context',
    title: 'components.progressBar.api.context.title',
    description: 'components.progressBar.api.context.description',
    anchor: 'api-context',
    table: {
      headers: [
        'common.tables.binding',
        'common.tables.type',
        'common.tables.slot',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>let-text</code> <em>(<code>$implicit</code>)</em>',
          '<code>string</code>',
          'value + label',
          'Cadena pre-formateada (ej. <em>"70 %"</em>). Es el <code>$implicit</code> del contexto: el <strong>único</strong> binding que <strong>no</strong> necesita <code>="..."</code>, porque Angular lo mapea automáticamente con un <code>let-X</code> libre.',
        ],
        [
          '<code>let-percent="percent"</code>',
          '<code>number</code>',
          'value + label',
          'Porcentaje calculado: 0&ndash;100. Clave del contexto: <code>percent</code>. El nombre local es libre: <code>let-pct="percent"</code> o <code>let-p="percent"</code> son igual de válidos.',
        ],
        [
          '<code>let-v="value"</code>',
          '<code>number</code>',
          'value + label',
          'Valor numérico bruto del input <code>value</code>. Clave: <code>value</code>. El nombre local es libre: <code>let-val="value"</code>, <code>let-current="value"</code>, etc.',
        ],
        [
          '<code>let-max="max"</code>',
          '<code>number</code>',
          'value + label',
          'Valor máximo bruto del input <code>maxValue</code>. Clave de contexto: <code>max</code>.',
        ],
        [
          '<code>let-label="label"</code>',
          '<code>string | null</code>',
          '<em>solo</em> <code>slot="label"</code>',
          'String crudo del input <code>label</code>. Exclusivo de <code>slot="label"</code>; en <code>slot="value"</code> será <code>undefined</code>.',
        ],
      ],
    },
  },
];
