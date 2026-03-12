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
    console.log('Selected date:', value.date);
  }
}`,
        language: 'typescript',
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
    console.log('Week:', value.week);
    console.log('Dates:', value.dates);
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'week-numbers',
    title: 'components.calendar.week-numbers.title',
    description: 'components.calendar.week-numbers.description',
    anchor: 'week-numbers',
    examples: [
      {
        title: 'WEEK',
        code: `<nui-calendar
  type="week"
  [showWeekNumbers]="true"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'DAY (Multiple)',
        code: `<nui-calendar
  type="day"
  selection="multiple"
  [showWeekNumbers]="true"
  (valueChange)="onWeekNumberClick($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'DAY (Normal)',
        code: `<nui-calendar
  type="day"
  [showWeekNumbers]="true"
></nui-calendar>`,
        language: 'html',
      },
    ],
    note: {
      type: 'info',
      icon: 'ri-calendar-line',
      content: 'components.calendar.week-numbers.note',
    },
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
    console.log('Start:', value.range.start);
    console.log('End:', value.range.end);
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
        title: 'Default presets',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  [showPresets]="true"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Custom presets (HTML)',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  [showPresets]="true"
  [customPresets]="customPresets"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Custom presets (TypeScript)',
        code: `customPresets: DateRangePreset[] = [
  {
    label: 'Last 7 days',
    start: subDays(new Date(), 7),
    end: new Date(),
  },
  {
    label: 'This month',
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
];`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'time-selector',
    title: 'components.calendar.time-selector.title',
    description: 'components.calendar.time-selector.description',
    anchor: 'time-selector',
    examples: [
      {
        title: 'Start time (DAY)',
        code: `<nui-calendar
  [type]="CalendarType.DAY"
  [showTimeSelector]="true"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Start time (RANGE)',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  showTimeSelector="start"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Start and end time (RANGE)',
        code: `<nui-calendar
  [type]="CalendarType.RANGE"
  showTimeSelector="both"
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

// Dynamic validation function
isDateEnabledFn: IsDateEnabledFn = (date) => {
  // 1. Do not allow weekends
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  
  // 2. Do not allow national holidays
  if (this.isNationalHoliday(date)) return false;
  
  return true;
};

private isNationalHoliday(date: Date): boolean {
  const holidays = [
    '2026-01-01', // New Year's Day
    '2026-12-25', // Christmas
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

// Status function (visual business states)
dateStatusFn: DateStatusFn = (date) => {
  const availability = this.getAvailability(date);
  
  if (availability === 0) return 'danger';    // No rooms (red)
  if (availability < 5) return 'warning';     // Few rooms (amber)
  if (availability >= 10) return 'success';   // Good availability (green)
  return 'info';                              // Normal availability (blue)
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
  [autoClose]="true"
  (valueChange)="onMonthSelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'Year picker',
        code: `<nui-calendar
  type="year"
  [autoClose]="true"
  (valueChange)="onYearSelected($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `onMonthSelected(value: CalendarValue): void {
  if (value.type === 'month' && 'month' in value && value.month) {
    console.log('Month:', value.month.month); // 0-11
    console.log('Year:', value.month.year);  // YYYY
    console.log('Date:', value.date);        // 1st day of the month
  }
}

onYearSelected(value: CalendarValue): void {
  if (value.type === 'year' && 'year' in value && typeof value.year === 'number') {
    console.log('Year:', value.year);        // YYYY
    console.log('Date:', value.date);        // 1st of January of the year
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
    console.log('Selected dates:', value.dates);
    console.log('Total:', value.dates.length);
  }
}
  
onMultipleMonthsSelected(value: CalendarValue): void {
  if (value.type === 'month' && 'months' in value && value.months) {
    console.log('Selected months:', value.months);
    console.log('Total:', value.months.length);
    // value.months = [{ month: 0, year: 2026 }, { month: 3, year: 2026 }, ...]
  }
}
`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'custom-footer',
    title: 'components.calendar.custom-footer.title',
    description: 'components.calendar.custom-footer.description',
    anchor: 'custom-footer',
    note: {
      type: 'info',
      content: 'components.calendar.custom-footer.note',
    },
    examples: [
      {
        title: 'components.calendar.custom-footer.exampleRange',
        code: `<nui-calendar [type]="CalendarType.RANGE">
  <ng-template nuiCalendarFooter let-value="value" let-actions="actions">
    <button nuiButton prefixIcon="ri-close-line" size="xs" (onClick)="actions.clear(); footerAppliedRange.set('')"> Clear </button>
    <button nuiButton size="xs" [disabled]="!value" (onClick)="onFooterApply(value); actions.close()"> Apply </button>
  </ng-template>
</nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `import { CalendarFooterDirective, CalendarValue, CalendarType } from 'nui';

// In @Component imports:
imports: [..., CalendarFooterDirective]

// State
footerAppliedRange = signal<string>('');

// Handler for the Apply button
onFooterApply(value: CalendarValue | null): void {
  if (!value || value.type !== CalendarType.RANGE) return;
  const { start, end } = value.range;
  this.footerAppliedRange.set(
    \`\${start.toLocaleDateString()} – \${end.toLocaleDateString()}\`
  );
}`,
        language: 'typescript',
      },
      {
        title: 'components.calendar.custom-footer.exampleDay',
        code: `<nui-calendar type="day" [showTodayButton]="false">
  <ng-template nuiCalendarFooter let-actions="actions">
    <button nuiButton prefixIcon="ri-close-line" size="xs" (onClick)="actions.clear()"> Clear </button>
    <button nuiButton size="xs" (onClick)="actions.goToToday()">Today</button>
  </ng-template>
</nui-calendar>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'day-template',
    title: 'components.calendar.day-template.title',
    description: 'components.calendar.day-template.description',
    anchor: 'day-template',
    note: {
      type: 'info',
      icon: 'ri-layout-grid-line',
      content: 'components.calendar.day-template.note',
    },
    examples: [
      {
        title: 'components.calendar.day-template.exampleStatus',
        code: `<nui-calendar type="day" [dateStatusFn]="dateStatusFn">
  <ng-template nuiCalendarDay let-dayNumber="day" let-status="status" let-fullDay>
    <span [class.today-marker]="fullDay.isToday">{{ dayNumber }}</span>
    @if (status) {
      <span class="status-dot status-dot--{{ status }}"></span>
    }
  </ng-template>
</nui-calendar>`,
        language: 'html',
      },
      {
        title: 'components.calendar.day-template.examplePrice',
        code: `<nui-calendar type="range" [dateStatusFn]="availabilityStatusFn">
  <ng-template nuiCalendarDay let-dayNumber="day" let-fullDay>
    <span>{{ dayNumber }}</span>
    @if (fullDay.isCurrentMonth && !fullDay.isDisabled) {
      <small class="nui-calendar__day-price">
        {{ getPriceForDate(fullDay.date) | currency:'EUR':'symbol':'1.0-0' }}
      </small>
    }
  </ng-template>
</nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `import { CalendarDayDirective, DateStatusFn } from 'nui';

@Component({
  imports: [CalendarComponent, CalendarDayDirective, CurrencyPipe],
})
export class MyComponent {
  dateStatusFn: DateStatusFn = (date) => {
    const availability = this.getAvailability(date);
    if (availability === 0) return 'danger';
    if (availability < 5) return 'warning';
    if (availability >= 10) return 'success';
    return 'info';
  };

  getPriceForDate(date: Date): number {
    return this.priceMap.get(date.toDateString()) ?? 0;
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'overlay-integration',
    title: 'components.calendar.overlay-integration.title',
    description: 'components.calendar.overlay-integration.description',
    note: {
      type: 'info',
      content: 'components.calendar.overlay-integration.note',
    },
    anchor: 'overlay-integration',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-calendar
  type="day"
  [autoClose]="true"
  [overlayMode]="true"
  (selectFinished)="closeDatepicker()"
  (valueChange)="onDateChange($event)"
></nui-calendar>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `isOpen = signal<boolean>(false);

closeDatepicker(): void {
  this.isOpen.set(false);
}`,
        language: 'typescript',
      },
    ],
  },
];
