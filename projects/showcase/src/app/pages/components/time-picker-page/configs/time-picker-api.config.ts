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
          '<code>showHeader</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Indica si se muestra el header del selector de tiempo',
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
        [
          '<code>autoClose</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timePicker.api.inputs.rows.autoClose',
        ],
        [
          '<code>overlayMode</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timePicker.api.inputs.rows.overlayMode',
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
        [
          '<code>selectFinished</code>',
          'OutputEmitterRef<void>',
          'components.timePicker.api.outputs.rows.selectFinished',
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
    anchor: 'api-duration-config',    table: {
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
  // ─────────────────────────────────────────────────────────────────────────
  // Content Directives (custom templates)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'api-content-directives',
    title: 'components.timePicker.api.contentDirectives.title',
    description: 'components.timePicker.api.contentDirectives.description',
    anchor: 'api-content-directives',
    table: {
      headers: [
        'common.tables.directive',
        'Selector CSS',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>TimePickerItemDirective</code>',
          '<code>[nuiTimePickerItem]</code>',
          'Proyecta un <code>ng-template</code> que reemplaza el contenido visual de cada ítem en las columnas de selección (hora, minuto, segundo).',
        ],
        [
          '<code>TimePickerFooterDirective</code>',
          '<code>[nuiTimePickerFooter]</code>',
          'Proyecta un <code>ng-template</code> que reemplaza el footer built-in con botones de acción propios.',
        ],
        [
          '<code>TimePickerHeaderDirective</code>',
          '<code>[nuiTimePickerHeader]</code>',
          'Proyecta un <code>ng-template</code> que reemplaza el display visual del header. Las live regions de a11y se mantienen activas independientemente.',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { TimePickerItemDirective, TimePickerFooterDirective, TimePickerHeaderDirective } from 'nui';

@Component({
  imports: [
    TimePickerComponent,
    TimePickerItemDirective,
    TimePickerFooterDirective,
    TimePickerHeaderDirective,
  ]
})`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-item-context',
    title: 'TimePickerItemContext',
    description: 'Contexto disponible en el template de <code>[nuiTimePickerItem]</code>. Accede con <code>let-value</code>, <code>let-type="type"</code>, etc.',
    anchor: 'api-item-context',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>$implicit</code>',
          'number | string',
          'Valor del ítem (hora o minuto como número, periodo como string "AM"/"PM"). Accede con <code>let-value</code>.',
        ],
        [
          '<code>type</code>',
          "'hour' | 'minute' | 'period'",
          'Tipo de columna al que pertenece el ítem.',
        ],
        [
          '<code>selected</code>',
          'boolean',
          'Indica si este ítem es el valor actualmente seleccionado.',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          'Indica si el selector está en estado deshabilitado.',
        ],
      ],
    },
  },
  {
    id: 'api-footer-context',
    title: 'TimePickerFooterContext',
    description: 'Contexto disponible en el template de <code>[nuiTimePickerFooter]</code>. Accede con <code>let-currentTime</code> y <code>let-actions="actions"</code>.',
    anchor: 'api-footer-context',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>$implicit</code>',
          'TimeValue | DurationValue | null',
          'Valor actualmente seleccionado en el picker. Accede con <code>let-currentTime</code>.',
        ],
        [
          '<code>actions.clear()</code>',
          '() => void',
          'Limpia el valor seleccionado y emite <code>null</code>.',
        ],
        [
          '<code>actions.setToNow()</code>',
          '() => void',
          'Establece el valor a la hora actual (solo en modo no-DURATION).',
        ],
        [
          '<code>normalization</code>',
          '{ original: string; normalized: string } | null',
          'Info de normalización si se recibió un valor string que fue normalizado automáticamente.',
        ],
        [
          '<code>range</code>',
          '{ min: TimeValue | undefined; max: TimeValue | undefined }',
          'Rango horario configurado en <code>config.minTime</code> / <code>config.maxTime</code>.',
        ],
      ],
    },
  },
  {
    id: 'api-header-context',
    title: 'TimePickerHeaderContext',
    description: 'Contexto disponible en el template de <code>[nuiTimePickerHeader]</code>. Accede con <code>let-currentTime</code>, <code>let-formattedTime="formattedTime"</code>, etc.',
    anchor: 'api-header-context',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>$implicit</code>',
          'TimeValue | DurationValue | null',
          'Valor actualmente seleccionado. Accede con <code>let-currentTime</code>.',
        ],
        [
          '<code>mode</code>',
          'TimePickerMode',
          'Modo activo del picker, p.ej. <code>\'HOUR_MINUTE_24\'</code> o <code>\'DURATION\'</code>.',
        ],
        [
          '<code>is12h</code>',
          'boolean',
          '<code>true</code> si el modo usa formato 12h (AM/PM).',
        ],
        [
          '<code>formattedTime</code>',
          'string',
          'Representación legible del valor actual en texto plano (sin HTML), lista para mostrar directamente.',
        ],
        [
          '<code>normalization</code>',
          '{ original: string; normalized: string } | null',
          'Info de normalización si se recibió un valor string normalizado, <code>null</code> en caso contrario.',
        ],
        [
          '<code>range</code>',
          '{ min: TimeValue | undefined; max: TimeValue | undefined }',
          'Rango horario configurado en <code>config.minTime</code> / <code>config.maxTime</code>.',
        ],
      ],
    },
  },
];
