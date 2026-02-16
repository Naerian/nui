import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente TimePicker
 * Documenta inputs, outputs y modelos
 */
export const TIME_PICKER_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.timePicker.api.inputs.title',
    description: 'components.timePicker.api.inputs.description',
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
          '<code>mode</code>',
          'TimePickerMode',
          '<code class="neutral">HOUR_MINUTE_24</code>',
          "Modo de selección: 'HOUR_12', 'HOUR_24', 'HOUR_MINUTE_12', 'HOUR_MINUTE_24', 'DURATION'",
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          "Tamaño del componente: 'xs', 'sm', 'md', 'lg', 'xl'",
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Estado deshabilitado del componente',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">""</code>',
          'Título personalizado que se muestra en el header',
        ],
        [
          '<code>fromCalendar</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Indica si se usa desde un calendario (oculta header y bordes)',
        ],
        [
          '<code>variant</code>',
          'TimePickerVariant',
          '<code class="neutral">default</code>',
          "Variante visual: 'default' o 'compact'",
        ],
        [
          '<code>config</code>',
          'TimePickerConfig',
          '<code class="neutral">undefined</code>',
          'Configuración completa: steps, rangos, presets, duration, etc.',
        ],
        [
          '<code>defaultStrategy</code>',
          'TimePickerStrategy',
          '<code class="neutral">empty</code>',
          "Estrategia de valor inicial: 'now', 'smart', 'empty', 'custom'",
        ],
        [
          '<code>defaultValue</code>',
          'Date | string | TimeValue',
          '<code class="neutral">undefined</code>',
          "Valor custom cuando strategy='custom'",
        ],
        [
          '<code>smartOffset</code>',
          'number',
          '<code class="neutral">30</code>',
          "Offset en minutos para strategy='smart' (hora actual + offset)",
        ],
        [
          '<code>value</code>',
          'TimePickerValue',
          '<code class="neutral">null</code>',
          'Valor actual del picker (TimeValue, DurationValue, Date, string o null)',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.timePicker.api.outputs.title',
    description: 'components.timePicker.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>valueChange</code>',
          'EventEmitter<TimeValue | DurationValue | null>',
          'Emite cuando cambia el valor seleccionado (hora o duración)',
        ],
      ],
    },
  },
  {
    id: 'api-config',
    title: 'components.timePicker.api.config.title',
    description: 'components.timePicker.api.config.description',
    anchor: 'api-config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>hourStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'Incremento entre horas seleccionables (ej: 2 = solo horas pares)',
        ],
        [
          '<code>minuteStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'Incremento entre minutos (común: 5, 10, 15, 30)',
        ],
        [
          '<code>minTime</code>',
          'TimeValue',
          '<code class="neutral">undefined</code>',
          'Hora mínima seleccionable',
        ],
        [
          '<code>maxTime</code>',
          'TimeValue',
          '<code class="neutral">undefined</code>',
          'Hora máxima seleccionable',
        ],
        [
          '<code>disabledHours</code>',
          'number[]',
          '<code class="neutral">[]</code>',
          'Array de horas deshabilitadas',
        ],
        [
          '<code>disabledMinutes</code>',
          'number[]',
          '<code class="neutral">[]</code>',
          'Array de minutos deshabilitados',
        ],
        [
          '<code>presets</code>',
          'TimePreset[]',
          '<code class="neutral">[]</code>',
          'Presets de hora rápida con label, time e icon opcional',
        ],
        [
          '<code>showRangeIndicator</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Mostrar indicador visual del rango permitido',
        ],
        [
          '<code>variant</code>',
          'TimePickerVariant',
          '<code class="neutral">default</code>',
          'Variante de visualización del componente',
        ],
        [
          '<code>duration</code>',
          'DurationConfig',
          '<code class="neutral">DEFAULT_DURATION_CONFIG</code>',
          'Configuración para modo DURATION',
        ],
      ],
    },
  },
  {
    id: 'api-duration-config',
    title: 'components.timePicker.api.durationConfig.title',
    description: 'components.timePicker.api.durationConfig.description',
    anchor: 'api-duration-config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>maxHours</code>',
          'number',
          '<code class="neutral">23</code>',
          'Límite máximo de horas seleccionables',
        ],
        [
          '<code>minHours</code>',
          'number',
          '<code class="neutral">0</code>',
          'Límite mínimo de horas',
        ],
        [
          '<code>showSeconds</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Mostrar selector de segundos',
        ],
        [
          '<code>secondStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'Incremento entre segundos',
        ],
        [
          '<code>allowZero</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Permitir duración de 0 (todas las unidades en 0)',
        ],
        [
          '<code>quickDurations</code>',
          'DurationPreset[]',
          '<code class="neutral">[]</code>',
          'Presets comunes de duración con label, duration e icon',
        ],
      ],
    },
  },
  {
    id: 'api-time-value',
    title: 'TimeValue',
    description: 'Interface para representar un valor de tiempo (hora del día)',
    anchor: 'api-time-value',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>hour</code>',
          'number',
          'Hora: 0-23 para formato 24h, 1-12 para formato 12h',
        ],
        [
          '<code>minute</code>',
          'number',
          'Minutos: 0-59',
        ],
        [
          '<code>period</code>',
          'TimePeriod | null',
          "Opcional. Periodo 'AM' o 'PM' (solo para formato 12h)",
        ],
      ],
    },
  },
  {
    id: 'api-duration-value',
    title: 'DurationValue',
    description: 'Interface para representar un intervalo de tiempo (duración)',
    anchor: 'api-duration-value',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>hours</code>',
          'number',
          'Horas: 0-n (sin límite superior por defecto)',
        ],
        [
          '<code>minutes</code>',
          'number',
          'Minutos: 0-59',
        ],
        [
          '<code>seconds</code>',
          'number',
          'Opcional. Segundos: 0-59 (para mayor precisión)',
        ],
      ],
    },
  },
  {
    id: 'api-time-preset',
    title: 'TimePreset',
    description: 'Interface para definir presets de tiempo rápido (ej: "Ahora", "Mediodía")',
    anchor: 'api-time-preset',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>label</code>',
          'string',
          'Texto que se muestra en el botón del preset',
        ],
        [
          '<code>time</code>',
          'TimeValue',
          'Valor de tiempo al que salta el preset',
        ],
        [
          '<code>icon</code>',
          'string',
          'Opcional. Icono Remix Icon para el botón (ej: "time-line")',
        ],
      ],
    },
  },
  {
    id: 'api-duration-preset',
    title: 'DurationPreset',
    description: 'Interface para definir presets de duración rápida (ej: "15 min", "1 hora")',
    anchor: 'api-duration-preset',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>label</code>',
          'string',
          'Texto que se muestra en el botón del preset',
        ],
        [
          '<code>duration</code>',
          'DurationValue',
          'Valor de duración al que salta el preset',
        ],
        [
          '<code>icon</code>',
          'string',
          'Opcional. Icono Remix Icon para el botón',
        ],
      ],
    },
  },
  {
    id: 'api-time-picker-mode',
    title: 'TimePickerMode',
    description: 'Type con los modos de selección disponibles',
    anchor: 'api-time-picker-mode',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<code>HOUR_12</code>',
          'Solo selector de horas en formato 12h (AM/PM)',
        ],
        [
          '<code>HOUR_24</code>',
          'Solo selector de horas en formato 24h',
        ],
        [
          '<code>HOUR_MINUTE_12</code>',
          'Selector de horas y minutos en formato 12h (AM/PM)',
        ],
        [
          '<code>HOUR_MINUTE_24</code>',
          'Selector de horas y minutos en formato 24h (predeterminado)',
        ],
        [
          '<code>DURATION</code>',
          'Modo duración para seleccionar intervalos de tiempo',
        ],
      ],
    },
  },
  {
    id: 'api-time-picker-strategy',
    title: 'TimePickerStrategy',
    description: 'Type con las estrategias de valor inicial disponibles',
    anchor: 'api-time-picker-strategy',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<code>now</code>',
          'Usa la hora actual como valor inicial',
        ],
        [
          '<code>smart</code>',
          'Hora actual + offset (configurable con smartOffset)',
        ],
        [
          '<code>empty</code>',
          'Sin valor inicial (predeterminado)',
        ],
        [
          '<code>custom</code>',
          'Usa el valor proporcionado en defaultValue',
        ],
      ],
    },
  },
  {
    id: 'api-time-picker-variant',
    title: 'TimePickerVariant',
    description: 'Type con las variantes visuales disponibles',
    anchor: 'api-time-picker-variant',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<code>default</code>',
          'Variante predeterminada con header y bordes completos',
        ],
        [
          '<code>compact</code>',
          'Variante compacta con espaciado reducido',
        ],
      ],
    },
  },
  {
    id: 'api-time-picker-value',
    title: 'TimePickerValue',
    description: 'Union type que acepta múltiples formatos de entrada para el valor del picker',
    anchor: 'api-time-picker-value',
    table: {
      headers: ['common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>TimeValue</code>',
          '{ hour, minute, period? } - Para modos HOUR_* (hora del día)',
        ],
        [
          '<code>DurationValue</code>',
          '{ hours, minutes, seconds? } - Para modo DURATION (intervalo)',
        ],
        [
          '<code>Date</code>',
          'Objeto Date con hora específica',
        ],
        [
          '<code>string</code>',
          'Formato "HH:mm" o "HH:mm AM/PM"',
        ],
        [
          '<code>null</code>',
          'Sin valor seleccionado',
        ],
      ],
    },
  },
  {
    id: 'api-methods',
    title: 'components.timePicker.api.methods.title',
    description: 'components.timePicker.api.methods.description',
    anchor: 'api-methods',
    table: {
      headers: [
        'common.tables.method',
        'common.tables.parameters',
        'common.tables.return',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>writeValue(value)</code>',
          'TimePickerValue',
          'void',
          'Escribe el valor programáticamente (método de ControlValueAccessor)',
        ],
        [
          '<code>registerOnChange(fn)</code>',
          '(value: TimeValue | DurationValue | null) => void',
          'void',
          'Registra callback para cambios de valor (método de ControlValueAccessor)',
        ],
        [
          '<code>registerOnTouched(fn)</code>',
          '() => void',
          'void',
          'Registra callback para evento touched (método de ControlValueAccessor)',
        ],
        [
          '<code>setDisabledState(isDisabled)</code>',
          'boolean',
          'void',
          'Establece el estado deshabilitado programáticamente (método de ControlValueAccessor)',
        ],
        [
          '<code>toDate(baseDate?)</code>',
          'Date',
          'Date',
          'Convierte el valor actual a un objeto Date. Usa baseDate como referencia (por defecto: fecha actual)',
        ],
        [
          '<code>toDurationMilliseconds()</code>',
          '-',
          'number | null',
          'Convierte el valor de duración actual a milisegundos. Solo disponible en modo DURATION',
        ],
      ],
    },
  },
];

