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
    title: 'components.calendar.weekSelection.title',
    description: 'components.calendar.weekSelection.description',
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
    title: 'components.calendar.rangeSelection.title',
    description: 'components.calendar.rangeSelection.description',
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
    title: 'components.calendar.timePicker.title',
    description: 'components.calendar.timePicker.description',
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
    title: 'components.calendar.disabledDates.title',
    description: 'components.calendar.disabledDates.description',
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
    id: 'min-max-dates',
    title: 'components.calendar.minMaxDates.title',
    description: 'components.calendar.minMaxDates.description',
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
    title: 'components.calendar.reactiveForms.title',
    description: 'components.calendar.reactiveForms.description',
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
];
