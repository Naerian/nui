import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente Calendar
 * Documenta inputs, outputs y modelos
 */
export const CALENDAR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.calendar.api.inputs.title',
    description: 'components.calendar.api.inputs.description',
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
          '<code>type</code>',
          'CalendarType',
          '<code class="neutral">DAY</code>',
          "Tipo de selección: 'DAY' (fecha única), 'WEEK' (semana completa), 'RANGE' (rango de fechas)",
        ],
        [
          '<code>date</code>',
          'string | Date | Date[]',
          '<code class="neutral">undefined</code>',
          'Fecha inicial o fechas seleccionadas',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          "Tamaño del calendario: 'xs', 'sm', 'md', 'lg', 'xl', 'auto'",
        ],
        [
          '<code>width</code>',
          'CalendarWidth',
          '<code class="neutral">compact</code>',
          "'compact' (ancho fijo) o 'full' (100% con container queries)",
        ],
        [
          '<code>disabledDates</code>',
          '(string | Date)[]',
          '<code class="neutral">undefined</code>',
          'Array de fechas deshabilitadas',
        ],
        [
          '<code>blockDisabledRanges</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Si true, bloquea rangos que contienen fechas deshabilitadas',
        ],
        [
          '<code>minDate</code>',
          'Date | string',
          '<code class="neutral">undefined</code>',
          'Fecha mínima seleccionable',
        ],
        [
          '<code>maxDate</code>',
          'Date | string',
          '<code class="neutral">undefined</code>',
          'Fecha máxima seleccionable',
        ],
        [
          '<code>showTodayButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Muestra botón "Hoy" en el footer',
        ],
        [
          '<code>showPresets</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Muestra panel de presets (solo para tipo RANGE)',
        ],
        [
          '<code>customPresets</code>',
          'DateRangePreset[]',
          '<code class="neutral">undefined</code>',
          'Presets personalizados de rangos de fechas',
        ],
        [
          '<code>firstDayOfWeek</code>',
          'FirstDayOfWeek',
          '<code class="neutral">1</code>',
          '0=Domingo, 1=Lunes (primer día de la semana)',
        ],
        [
          '<code>showTimePicker</code>',
          'CalendarTimePickerMode | false',
          '<code class="neutral">false</code>',
          "Muestra selector de hora: true, 'start', 'end', 'both', false",
        ],
        [
          '<code>timeMode</code>',
          'TimePickerMode',
          '<code class="neutral">HOUR_MINUTE_24</code>',
          'Modo del selector de hora integrado',
        ],
        [
          '<code>timeConfig</code>',
          'TimePickerConfig',
          '<code class="neutral">{}</code>',
          'Configuración del selector de hora (steps, rangos, etc.)',
        ],
        [
          '<code>startTime</code>',
          'TimeValue | Date | string',
          '<code class="neutral">null</code>',
          'Hora de inicio inicial',
        ],
        [
          '<code>endTime</code>',
          'TimeValue | Date | string',
          '<code class="neutral">null</code>',
          'Hora de fin inicial',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.calendar.api.outputs.title',
    description: 'components.calendar.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>valueChange</code>',
          'EventEmitter<CalendarValue>',
          'Emite cuando cambia la selección. Incluye fecha(s), rango/semana y tiempo si está habilitado',
        ],
      ],
    },
  },
  {
    id: 'api-calendar-value',
    title: 'components.calendar.api.calendarValue.title',
    description: 'components.calendar.api.calendarValue.description',
    anchor: 'api-calendar-value',
    note: {
      type: 'info',
      icon: 'ri-information-line',
      content: 'components.calendar.api.calendarValue.note',
    },
    examples: [
      {
        title: 'Definición de CalendarValue',
        code: `type CalendarValue = 
  | { type: 'DAY'; date: Date; time?: TimeValue }
  | { type: 'WEEK'; dates: Date[]; week: WeekRange; time?: { start?: TimeValue; end?: TimeValue } }
  | { type: 'RANGE'; dates: Date[]; range: { start: Date | null; end: Date | null }; time?: { start?: TimeValue; end?: TimeValue } }`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'api-calendar-type',
    title: 'components.calendar.api.calendarType.title',
    description: 'components.calendar.api.calendarType.description',
    anchor: 'api-calendar-type',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>DAY</code>', 'Selección de una fecha única'],
        ['<code>WEEK</code>', 'Selección de una semana completa (7 días consecutivos)'],
        ['<code>RANGE</code>', 'Selección de un rango de fechas (inicio y fin)'],
      ],
    },
  },
  {
    id: 'api-calendar-width',
    title: 'components.calendar.api.calendarWidth.title',
    description: 'components.calendar.api.calendarWidth.description',
    anchor: 'api-calendar-width',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<code>compact</code>',
          'Ancho fijo según el tamaño (size). No se adapta al contenedor.',
        ],
        [
          '<code>full</code>',
          'Ancho 100% del contenedor. Usa Container Queries para adaptar tipografía y espaciado.',
        ],
      ],
    },
  },
  {
    id: 'api-view-mode',
    title: 'components.calendar.api.viewMode.title',
    description: 'components.calendar.api.viewMode.description',
    anchor: 'api-view-mode',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>DAY</code>', 'Vista de días del mes (grid 7x6)'],
        ['<code>MONTH</code>', 'Vista de meses del año (grid 3x4)'],
        ['<code>YEAR</code>', 'Vista de años (grid 4x3, 12 años)'],
      ],
    },
    note: {
      type: 'info',
      icon: 'ri-information-line',
      content: 'components.calendar.api.viewMode.note',
    },
  },
  {
    id: 'api-preset',
    title: 'components.calendar.api.preset.title',
    description: 'components.calendar.api.preset.description',
    anchor: 'api-preset',
    examples: [
      {
        title: 'Interface DateRangePreset',
        code: `interface DateRangePreset {
  label: string;      // Texto que se muestra en el botón
  start: Date;        // Fecha de inicio del rango
  end: Date;          // Fecha de fin del rango
}

// Ejemplo de uso
customPresets: DateRangePreset[] = [
  {
    label: 'Últimos 7 días',
    start: subDays(new Date(), 7),
    end: new Date(),
  },
  {
    label: 'Este mes',
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
  {
    label: 'Último mes',
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  },
];`,
        language: 'typescript',
      },
    ],
  },
];
