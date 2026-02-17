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
          "Tipo de selección: 'day' (fecha única), 'week' (semana), 'range' (rango), 'month' (mes/año), 'year' (año)",
        ],
        [
          '<code>selection</code>',
          'CalendarSelectionMode',
          '<code class="neutral">single</code>',
          "Modo de selección: 'single' (uno) o 'multiple' (varios). Aplica a DAY, MONTH y YEAR. Los usuarios pueden hacer clic en múltiples elementos para agregarlos/quitarlos (toggle)",
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
        [
          '<code>dateStatusFn</code>',
          'DateStatusFn',
          '<code class="neutral">undefined</code>',
          "Función que asigna estados visuales a fechas ('success', 'warning', 'danger', 'info')",
        ],
        [
          '<code>isDateEnabledFn</code>',
          'IsDateEnabledFn',
          '<code class="neutral">undefined</code>',
          'Función que determina dinámicamente si una fecha está habilitada (prevalece sobre disabledDates)',
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
    title: 'components.calendar.api.calendar-value.title',
    description: 'components.calendar.api.calendar-value.description',
    anchor: 'api-calendar-value',
    note: {
      type: 'info',
      icon: 'ri-information-line',
      content: 'components.calendar.api.calendar-value.note',
    },
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [['<code>type</code>', 'CalendarType', 'Tipo de selección (DAY, WEEK, RANGE)']],
    },
  },
  {
    id: 'api-calendar-type',
    title: 'components.calendar.api.calendar-type.title',
    description: 'components.calendar.api.calendar-type.description',
    anchor: 'api-calendar-type',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>DAY</code>', 'Selección de una fecha única. Con selection="multiple" permite seleccionar múltiples fechas'],
        ['<code>WEEK</code>', 'Selección de una semana completa (7 días consecutivos)'],
        ['<code>RANGE</code>', 'Selección de un rango de fechas (inicio y fin)'],
        ['<code>MONTH</code>', 'Selección de mes y año. Con selection="multiple" permite seleccionar múltiples meses'],
        ['<code>YEAR</code>', 'Selección de año. Con selection="multiple" permite seleccionar múltiples años'],
      ],
    },
  },
  {
    id: 'api-calendar-width',
    title: 'components.calendar.api.calendar-width.title',
    description: 'components.calendar.api.calendar-width.description',
    anchor: 'api-calendar-width',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>compact</code>', 'Ancho fijo según el tamaño (size). No se adapta al contenedor.'],
        [
          '<code>full</code>',
          'Ancho 100% del contenedor. Usa Container Queries para adaptar tipografía y espaciado.',
        ],
      ],
    },
  },
  {
    id: 'api-calendar-selection',
    title: 'components.calendar.api.calendar-selection.title',
    description: 'components.calendar.api.calendar-selection.description',
    anchor: 'api-calendar-selection',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>single</code>', 'Permite seleccionar un único elemento (día, mes o año según el tipo)'],
        ['<code>multiple</code>', 'Permite seleccionar múltiples elementos con toggle al hacer clic. El calendario nunca se cierra automáticamente en este modo'],
      ],
    },
  },
  {
    id: 'api-view-mode',
    title: 'components.calendar.api.view-mode.title',
    description: 'components.calendar.api.view-mode.description',
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
      content: 'components.calendar.api.view-mode.note',
    },
  },
  {
    id: 'api-preset',
    title: 'components.calendar.api.preset.title',
    description: 'components.calendar.api.preset.description',
    anchor: 'api-preset',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>label</code>', 'string', 'Texto que se muestra en el botón'],
        ['<code>start</code>', 'Date', 'Fecha de inicio del rango'],
        ['<code>end</code>', 'Date', 'Fecha de fin del rango'],
      ],
    },
    examples: [
      {
        title: 'Interface DateRangePreset',
        code: `customPresets: DateRangePreset[] = [
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
  {
    id: 'api-smart-types',
    title: 'components.calendar.api.smart-types.title',
    description: 'components.calendar.api.smart-types.description',
    anchor: 'api-smart-types',
    note: {
      type: 'info',
      icon: 'ri-code-line',
      content: 'components.calendar.api.smart-types.note',
    },
    table: {
      headers: ['common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>DateStatus</code>', "Estados visuales: 'success' | 'warning' | 'danger' | 'info'"],
        [
          '<code>DateStatusFn</code>',
          '<code>(date: Date) => DateStatus | null</code> - Función que asigna estados visuales dinámicamente',
        ],
        [
          '<code>IsDateEnabledFn</code>',
          '<code>(date: Date) => boolean</code> - Función que valida si una fecha está habilitada (prevalece sobre disabledDates)',
        ],
      ],
    },
    examples: [
      {
        title: 'DateStatusFn (ejemplo)',
        code: `dateStatusFn: DateStatusFn = (date) => {
  const availability = getAvailability(date);
  if (availability === 0) return 'danger';
  if (availability < 5) return 'warning';
  if (availability >= 10) return 'success';
  return 'info';
};`,
        language: 'typescript',
      },
      {
        title: 'IsDateEnabledFn (ejemplo)',
        code: `isDateEnabledFn: IsDateEnabledFn = (date) => {
  // No permitir fines de semana
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  
  // No permitir festivos
  if (isHoliday(date)) return false;
  
  return true;
};`,
        language: 'typescript',
      },
    ],
  },
];
