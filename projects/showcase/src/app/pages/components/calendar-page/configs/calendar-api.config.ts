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
          'components.calendar.api.inputs.rows.type.description',
        ],
        [
          '<code>selection</code>',
          'CalendarSelectionMode',
          '<code class="neutral">single</code>',
          'components.calendar.api.inputs.rows.selection.description',
        ],
        [
          '<code>date</code>',
          'string | Date | Date[]',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.date.description',
        ],
        [
          '<code>disabledDates</code>',
          '(string | Date)[]',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.disabledDates.description',
        ],
        [
          '<code>minDate</code>',
          'Date | string',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.minDate.description',
        ],
        [
          '<code>maxDate</code>',
          'Date | string',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.maxDate.description',
        ],
        [
          '<code>showTodayButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.calendar.api.inputs.rows.showTodayButton.description',
        ],
        [
          '<code>showPresets</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.calendar.api.inputs.rows.showPresets.description',
        ],
        [
          '<code>customPresets</code>',
          'DateRangePreset[]',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.customPresets.description',
        ],
        [
          '<code>firstDayOfWeek</code>',
          'FirstDayOfWeek',
          '<code class="neutral">1</code>',
          'components.calendar.api.inputs.rows.firstDayOfWeek.description',
        ],
        [
          '<code>showTimePicker</code>',
          'CalendarTimePickerMode',
          '<code class="neutral">none</code>',
          'components.calendar.api.inputs.rows.showTimePicker.description',
        ],
        [
          '<code>timePickerMode</code>',
          'TimePickerMode',
          '<code class="neutral">HOUR_MINUTE_24</code>',
          'components.calendar.api.inputs.rows.timePickerMode.description',
        ],
        [
          '<code>timePickerConfig</code>',
          'TimePickerConfig',
          '<code class="neutral">{}</code>',
          'components.calendar.api.inputs.rows.timePickerConfig.description',
        ],
        [
          '<code>startTime</code>',
          'TimeValue | Date | string',
          '<code class="neutral">null</code>',
          'components.calendar.api.inputs.rows.startTime.description',
        ],
        [
          '<code>endTime</code>',
          'TimeValue | Date | string',
          '<code class="neutral">null</code>',
          'components.calendar.api.inputs.rows.endTime.description',
        ],
        [
          '<code>dateStatusFn</code>',
          'DateStatusFn',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.dateStatusFn.description',
        ],
        [
          '<code>isDateEnabledFn</code>',
          'IsDateEnabledFn',
          '<code class="neutral">undefined</code>',
          'components.calendar.api.inputs.rows.isDateEnabledFn.description',
        ],
        [
          '<code>showWeekNumbers</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.calendar.api.inputs.rows.showWeekNumbers.description',
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
          'components.calendar.api.outputs.rows.valueChange.description',
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
        ['<code>DAY</code>', 'components.calendar.api.calendar-type.rows.DAY.description'],
        ['<code>WEEK</code>', 'components.calendar.api.calendar-type.rows.WEEK.description'],
        ['<code>RANGE</code>', 'components.calendar.api.calendar-type.rows.RANGE.description'],
        ['<code>MONTH</code>', 'components.calendar.api.calendar-type.rows.MONTH.description'],
        ['<code>YEAR</code>', 'components.calendar.api.calendar-type.rows.YEAR.description'],
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
        ['<code>single</code>', 'components.calendar.api.calendar-selection.rows.single.description'],
        ['<code>multiple</code>', 'components.calendar.api.calendar-selection.rows.multiple.description'],
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
        ['<code>DAY</code>', 'components.calendar.api.view-mode.rows.DAY.description'],
        ['<code>MONTH</code>', 'components.calendar.api.view-mode.rows.MONTH.description'],
        ['<code>YEAR</code>', 'components.calendar.api.view-mode.rows.YEAR.description'],
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
        ['<code>label</code>', 'string', 'components.calendar.api.preset.rows.label.description'],
        ['<code>start</code>', 'Date', 'components.calendar.api.preset.rows.start.description'],
        ['<code>end</code>', 'Date', 'components.calendar.api.preset.rows.end.description'],
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
        ['<code>DateStatus</code>', 'components.calendar.api.smart-types.rows.DateStatus.description'],
        ['<code>DateStatusFn</code>', 'components.calendar.api.smart-types.rows.DateStatusFn.description'],
        ['<code>IsDateEnabledFn</code>', 'components.calendar.api.smart-types.rows.IsDateEnabledFn.description'],
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
