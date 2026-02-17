import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Examples del componente Calendar
 * Contiene todas las demostraciones interactivas
 */
export const CALENDAR_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.calendar.basic.title',
    description: 'components.calendar.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [type]="CalendarType.DAY"
  (valueChange)="onDateChange($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onDateChange(value: CalendarValue): void {
  if (value.type === 'DAY') {
    console.log('Fecha seleccionada:', value.date);
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'sizes',
    title: 'components.calendar.sizes.title',
    description: 'components.calendar.sizes.description',
    anchor: 'sizes',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar size="xs"></nui-calendar>
<nui-calendar size="sm"></nui-calendar>
<nui-calendar size="md"></nui-calendar>
<nui-calendar size="lg"></nui-calendar>
<nui-calendar size="xl"></nui-calendar>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'widths',
    title: 'components.calendar.widths.title',
    description: 'components.calendar.widths.description',
    note: {
      type: 'info',
      icon: 'ri-information-line',
      content: 'components.calendar.widths.note',
    },
    anchor: 'widths',
    examples: [
      {
        title: 'Compact (ancho fijo)',
        code: `<nui-calendar width="compact"></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Full (100% con Container Queries)',
        code: `<div style="max-width: 800px;">
  <nui-calendar width="full"></nui-calendar>
</div>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'week-selection',
    title: 'components.calendar.week-selection.title',
    description: 'components.calendar.week-selection.description',
    anchor: 'week-selection',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [type]="CalendarType.WEEK"
  (valueChange)="onWeekChange($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onWeekChange(value: CalendarValue): void {
  if (value.type === 'WEEK') {
    console.log('Semana:', value.week);
    console.log('Fechas:', value.dates);
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'range-selection',
    title: 'components.calendar.range-selection.title',
    description: 'components.calendar.range-selection.description',
    anchor: 'range-selection',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  (valueChange)="onRangeChange($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onRangeChange(value: CalendarValue): void {
  if (value.type === 'RANGE') {
    console.log('Inicio:', value.range.start);
    console.log('Fin:', value.range.end);
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'presets',
    title: 'components.calendar.presets.title',
    description: 'components.calendar.presets.description',
    note: {
      type: 'info',
      icon: 'ri-information-line',
      content: 'components.calendar.presets.note',
    },
    anchor: 'presets',
    examples: [
      {
        title: 'Con presets predeterminados',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  [showPresets]="true"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Con presets personalizados',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  [showPresets]="true"
  [customPresets]="customPresets"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Definición de presets personalizados',
        code: `customPresets: DateRangePreset[] = [
  {
    label: 'Última semana',
    start: subDays(new Date(), 7),
    end: new Date(),
  },
  {
    label: 'Este mes',
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
];`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'time-picker',
    title: 'components.calendar.time-picker.title',
    description: 'components.calendar.time-picker.description',
    anchor: 'time-picker',
    examples: [
      {
        title: 'Con hora de inicio (DAY)',
        code: `<nui-calendar
  [type]="CalendarType.DAY"
  [showTimePicker]="true"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Con hora de inicio (RANGE)',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  showTimePicker="start"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Con hora de inicio y fin (RANGE)',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  showTimePicker="both"
></nui-calendar>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled-dates',
    title: 'components.calendar.disabled-dates.title',
    description: 'components.calendar.disabled-dates.description',
    anchor: 'disabled-dates',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [disabledDates]="disabledDates"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `disabledDates: Date[] = [
  new Date(2024, 0, 15),
  new Date(2024, 0, 20),
  new Date(2024, 0, 25),
];`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'dynamic-disabled-dates',
    title: 'components.calendar.dynamic-disabled-dates.title',
    description: 'components.calendar.dynamic-disabled-dates.description',
    anchor: 'dynamic-disabled-dates',
    note: {
      type: 'info',
      icon: 'ri-shield-check-line',
      content: 'components.calendar.dynamic-disabled-dates.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  type="day"
  [isDateEnabledFn]="isDateEnabledFn"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `import { IsDateEnabledFn } from 'nui';

// Función de validación dinámica
isDateEnabledFn: IsDateEnabledFn = (date) => {
  // 1. No permitir fines de semana
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  
  // 2. No permitir festivos nacionales
  if (this.isNationalHoliday(date)) return false;
  
  return true;
};

private isNationalHoliday(date: Date): boolean {
  const holidays = [
    '2026-01-01', // Año Nuevo
    '2026-02-16', // Carnaval
    '2026-02-17', // Carnaval
    '2026-04-03', // Viernes Santo
    '2026-05-01', // Día del Trabajo
    '2026-12-25', // Navidad
  ];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return holidays.includes(\`\${year}-\${month}-\${day}\`);
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'min-max-dates',
    title: 'components.calendar.min-max-dates.title',
    description: 'components.calendar.min-max-dates.description',
    anchor: 'min-max-dates',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [minDate]="minDate"
  [maxDate]="maxDate"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `minDate = new Date(2024, 0, 1);
maxDate = new Date(2024, 11, 31);`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'reactive-forms',
    title: 'components.calendar.reactive-forms.title',
    description: 'components.calendar.reactive-forms.description',
    anchor: 'reactive-forms',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  [type]="CalendarType.DAY"
  [formControl]="dateControl"
></nui-calendar>

<nui-calendar
  [type]="CalendarType.RANGE"
  [formControl]="rangeControl"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `dateControl = new FormControl<Date | null>(null);
rangeControl = new FormControl<Date[] | null>(null);`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'date-status',
    title: 'components.calendar.date-status.title',
    description: 'components.calendar.date-status.description',
    anchor: 'date-status',
    note: {
      type: 'success',
      icon: 'ri-palette-line',
      content: 'components.calendar.date-status.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  type="day"
  [dateStatusFn]="dateStatusFn"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `import { DateStatusFn } from 'nui';

// Función de status (estados visuales de negocio)
dateStatusFn: DateStatusFn = (date) => {
  const availability = this.getAvailability(date);
  
  if (availability === 0) return 'danger';    // Sin habitaciones (rojo)
  if (availability < 5) return 'warning';     // Pocas habitaciones (ámbar)
  if (availability >= 10) return 'success';   // Buena disponibilidad (verde)
  return 'info';                              // Disponibilidad normal (azul)
};

private availabilityMap = new Map<string, number>([
  ['2026-02-18', 2],   // warning
  ['2026-02-19', 0],   // danger
  ['2026-02-20', 12],  // success
  ['2026-02-21', 15],  // success
  ['2026-02-22', 3],   // warning
  ['2026-02-23', 8],   // info
]);

private getAvailability(date: Date): number {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = \`\${year}-\${month}-\${day}\`;
  return this.availabilityMap.get(key) ?? 5;
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'selection-modes',
    title: 'components.calendar.selection-modes.title',
    description: 'components.calendar.selection-modes.description',
    anchor: 'selection-modes',
    note: {
      type: 'info',
      icon: 'ri-calendar-line',
      content: 'components.calendar.selection-modes.note',
    },
    examples: [
      {
        title: 'Day (normal)',
        code: `<nui-calendar
  type="day"
  (valueChange)="onDaySelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Month picker',
        code: `<nui-calendar
  type="month"
  [closeOnSelect]="true"
  (valueChange)="onMonthSelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Year picker',
        code: `<nui-calendar
  type="year"
  [closeOnSelect]="true"
  (valueChange)="onYearSelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onMonthSelected(value: CalendarValue): void {
  if (value.type === 'month' && 'month' in value && value.month) {
    console.log('Mes:', value.month.month); // 0-11
    console.log('Año:', value.month.year);  // YYYY
    console.log('Fecha:', value.date);      // 1er día del mes
  }
}

onYearSelected(value: CalendarValue): void {
  if (value.type === 'year' && 'year' in value && typeof value.year === 'number') {
    console.log('Año:', value.year);        // YYYY
    console.log('Fecha:', value.date);      // 1 de enero del año
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'multiple-selection',
    title: 'components.calendar.multiple-selection.title',
    description: 'components.calendar.multiple-selection.description',
    anchor: 'multiple-selection',
    note: {
      type: 'warning',
      icon: 'ri-checkbox-multiple-line',
      content: 'components.calendar.multiple-selection.note',
    },
    examples: [
      {
        title: 'Multiple days',
        code: `<nui-calendar
  type="day"
  selection="multiple"
  (valueChange)="onMultipleSelection($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Multiple months',
        code: `<nui-calendar
  type="month"
  selection="multiple"
  (valueChange)="onMultipleMonthsSelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onMultipleSelection(value: CalendarValue): void {
  if (value.type === 'day' && 'dates' in value) {
    console.log('Fechas seleccionadas:', value.dates);
    console.log('Total:', value.dates.length);
  }
}
  
onMultipleMonthsSelected(value: CalendarValue): void {
  if (value.type === 'month' && 'months' in value && value.months) {
    console.log('Meses seleccionados:', value.months);
    console.log('Total:', value.months.length);
    // value.months = [{ month: 0, year: 2026 }, { month: 3, year: 2026 }, ...]
  }
}
`,
        language: 'typescript',
      },
    ],
  },
];
