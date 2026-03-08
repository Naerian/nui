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
          '<code>prefixIcon</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Clase RemixIcon mostrada antes del texto de la etiqueta.',
        ],
        [
          '<code>suffixIcon</code>',
          'string | null',
          '<code class="neutral">null</code>',
          'Clase RemixIcon mostrada después del texto de la etiqueta.',
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
];
