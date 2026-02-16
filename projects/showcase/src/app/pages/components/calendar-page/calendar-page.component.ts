import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent, CalendarType, CalendarValue } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { CALENDAR_PAGE_CONFIG } from './calendar-page.config';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    CalendarComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent extends BaseComponentPage {
  // Configuration from external file
  override pageConfig = CALENDAR_PAGE_CONFIG;

  // Tabs configuration
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'sizes',
        'widths',
        'week-selection',
        'range-selection',
        'presets',
        'time-picker',
        'disabled-dates',
        'min-max-dates',
        'reactive-forms',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: [
        'api-inputs',
        'api-outputs',
        'api-calendar-value',
        'api-calendar-type',
        'api-calendar-width',
        'api-view-mode',
        'api-preset',
      ],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-sizes', 'theming-structure', 'theming-customization'],
    },
  ];

  // Examples data - Basic
  selectedDate = signal<Date | null>(null);
  selectedDateString = signal<string>('');

  // Week selection
  selectedWeekDates = signal<Date[]>([]);
  selectedWeekRange = signal<string>('');

  // Range selection
  selectedRangeDates = signal<Date[]>([]);
  selectedRangeDisplay = signal<string>('');

  // With time picker
  selectedDateWithTime = signal<CalendarValue | null>(null);
  selectedRangeWithTime = signal<CalendarValue | null>(null);

  // Reactive Forms
  dateControl = new FormControl<Date | null>(null);
  rangeControl = new FormControl<Date[] | null>(null);

  // Enums para el template
  CalendarType = CalendarType;

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  onDateChange(value: CalendarValue): void {
    console.log('Date changed:', value);
    
    if (value.type === CalendarType.DAY) {
      this.selectedDate.set(value.date);
      this.selectedDateString.set(value.date.toLocaleDateString());
    }
  }

  onWeekChange(value: CalendarValue): void {
    console.log('Week changed:', value);
    
    if (value.type === CalendarType.WEEK) {
      this.selectedWeekDates.set(value.dates);
      const start = value.week.start.toLocaleDateString();
      const end = value.week.end.toLocaleDateString();
      this.selectedWeekRange.set(`${start} - ${end}`);
    }
  }

  onRangeChange(value: CalendarValue): void {
    console.log('Range changed:', value);
    
    if (value.type === CalendarType.RANGE) {
      this.selectedRangeDates.set(value.dates);
      if (value.range.start && value.range.end) {
        const start = value.range.start.toLocaleDateString();
        const end = value.range.end.toLocaleDateString();
        this.selectedRangeDisplay.set(`${start} - ${end}`);
      }
    }
  }

  onDateWithTimeChange(value: CalendarValue): void {
    console.log('Date with time changed:', value);
    this.selectedDateWithTime.set(value);
  }

  onRangeWithTimeChange(value: CalendarValue): void {
    console.log('Range with time changed:', value);
    this.selectedRangeWithTime.set(value);
  }

  // ========================================================================
  // EXAMPLE DATA
  // ========================================================================

  // Disabled dates for example
  disabledDates: Date[] = [
    new Date(2024, 0, 15),
    new Date(2024, 0, 20),
    new Date(2024, 0, 25),
  ];

  // Min and max dates
  minDate = new Date(2024, 0, 1);
  maxDate = new Date(2024, 11, 31);
}
