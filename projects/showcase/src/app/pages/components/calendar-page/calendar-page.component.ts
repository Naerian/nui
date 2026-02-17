import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent, CalendarType, CalendarValue, DateStatusFn, IsDateEnabledFn } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { CALENDAR_PAGE_CONFIG } from './calendar-page.config';
import { addDays } from 'date-fns';

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
        'dynamic-disabled-dates',
        'min-max-dates',
        'date-status',
        'selection-modes',
        'multiple-selection',
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
        'api-calendar-selection',
        'api-view-mode',
        'api-preset',
        'api-smart-types',
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

  // Selection modes (month, year)
  selectedMonth = signal<string>('');
  selectedYear = signal<string>('');

  // Multiple selection
  selectedMultipleDates = signal<Date[]>([]);
  selectedMultipleDisplay = signal<string>('');
  selectedMultipleMonths = signal<Array<{ month: number; year: number }>>([]);
  selectedMultipleMonthsDisplay = signal<string>('');

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
    
    if (value.type === CalendarType.DAY && 'date' in value && value.date) {
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

  onMonthSelected(value: CalendarValue): void {
    console.log('Month selected:', value);
    
    if (value.type === CalendarType.MONTH && 'month' in value && value.month) {
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      const monthName = monthNames[value.month.month];
      this.selectedMonth.set(`${monthName} ${value.month.year}`);
    }
  }

  onYearSelected(value: CalendarValue): void {
    console.log('Year selected:', value);
    
    if (value.type === CalendarType.YEAR && 'year' in value && typeof value.year === 'number') {
      this.selectedYear.set(value.year.toString());
    }
  }

  onMultipleSelection(value: CalendarValue): void {
    console.log('Multiple selection:', value);
    
    if (value.type === CalendarType.DAY && 'dates' in value && value.dates) {
      this.selectedMultipleDates.set(value.dates);
      if (value.dates.length > 0) {
        const datesStr = value.dates
          .map(d => d.toLocaleDateString())
          .join(', ');
        this.selectedMultipleDisplay.set(datesStr);
      } else {
        this.selectedMultipleDisplay.set('');
      }
    }
  }

  onMultipleMonthsSelected(value: CalendarValue): void {
    console.log('Multiple months selected:', value);
    
    if (value.type === CalendarType.MONTH && 'months' in value && value.months) {
      this.selectedMultipleMonths.set(value.months);
      if (value.months.length > 0) {
        const monthNames = [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        const monthsStr = value.months
          .map(m => `${monthNames[m.month]} ${m.year}`)
          .join(', ');
        this.selectedMultipleMonthsDisplay.set(monthsStr);
      } else {
        this.selectedMultipleMonthsDisplay.set('');
      }
    }
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

  // ========================================================================
  // SMART SERVICE (PASO 1) - EXAMPLES
  // ========================================================================

  today = new Date();
  maxBookingDate = addDays(this.today, 90);
  selectedZone = signal<string>('ZONE_A');

  // Mapa de disponibilidad simulado (normalmente vendría de una API)
  // Usar strings directamente para evitar problemas de inicialización
  private availabilityMap = new Map<string, number>([
    ['2026-02-18', 2],   // Poca disponibilidad
    ['2026-02-19', 0],   // Sin disponibilidad
    ['2026-02-20', 12],  // Buena disponibilidad
    ['2026-02-21', 15],  // Muy buena disponibilidad
    ['2026-02-22', 3],   // Poca disponibilidad
    ['2026-02-23', 8],   // Disponibilidad normal
  ]);

  // Ejemplo 1: Estados de negocio (Sistema de reservas hoteleras)
  dateStatusFn: DateStatusFn = (date) => {
    const availability = this.getAvailability(date);
    
    if (availability === 0) return 'danger';    // Sin habitaciones
    if (availability < 5) return 'warning';     // Pocas habitaciones
    if (availability >= 10) return 'success';   // Buena disponibilidad
    return 'info';                              // Disponibilidad normal
  };

  // Ejemplo 2: Validación dinámica (Calendario corporativo)
  isDateEnabledFn: IsDateEnabledFn = (date) => {
    // 1. No permitir fines de semana
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    
    // 2. No permitir festivos nacionales (ejemplo)
    if (this.isNationalHoliday(date)) return false;
    
    return true;
  };

  // Ejemplo 3: Status combinado con eventos
  combinedStatusFn: DateStatusFn = (date) => {
    const events = this.getEventsForDate(date);
    
    if (events.some(e => e.priority === 'high')) return 'danger';
    if (events.some(e => e.priority === 'medium')) return 'warning';
    if (events.some(e => e.type === 'meeting')) return 'info';
    if (events.some(e => e.type === 'holiday')) return 'success';
    
    return null;
  };

  // Ejemplo 4: Validación compleja por zona
  combinedValidationFn: IsDateEnabledFn = (date) => {
    const zone = this.selectedZone();
    const dayOfWeek = date.getDay();
    
    // Zonas con días específicos de entrega
    if (zone === 'ZONE_A' && ![1, 3, 5].includes(dayOfWeek)) {
      return false; // Solo L-M-V
    }
    
    // Validar capacidad de almacén
    const capacity = this.getWarehouseCapacity(date);
    const scheduled = this.getScheduledDeliveries(date).length;
    
    return scheduled < capacity;
  };

  // ========================================================================
  // SMART SERVICE - HELPER METHODS (Simulación)
  // ========================================================================

  private formatDateKey(date: Date): string {
    // Usar fecha local, no UTC, para evitar problemas de zona horaria
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private getAvailability(date: Date): number {
    return this.availabilityMap.get(this.formatDateKey(date)) ?? 5;
  }

  private isNationalHoliday(date: Date): boolean {
    const holidays = [
      '2026-01-01', // Año Nuevo
      '2026-12-25', // Navidad
    ];
    return holidays.includes(this.formatDateKey(date));
  }

  private getEventsForDate(date: Date): Array<{ type: string; priority: string }> {
    // Simulación de eventos
    const key = this.formatDateKey(date);
    const eventsMap = new Map([
      ['2026-02-18', [{ type: 'meeting', priority: 'high' }]],
      ['2026-02-20', [{ type: 'holiday', priority: 'low' }]],
      ['2026-02-21', [{ type: 'meeting', priority: 'medium' }]],
    ]);
    return eventsMap.get(key) ?? [];
  }

  private getWarehouseCapacity(date: Date): number {
    // Simulación: capacidad de 10 entregas por día
    return 10;
  }

  private getScheduledDeliveries(date: Date): Array<any> {
    // Simulación: días con entregas
    const key = this.formatDateKey(date);
    const deliveriesMap = new Map([
      ['2026-02-18', [{}, {}, {}]], // 3 entregas
      ['2026-02-19', [{}, {}, {}, {}, {}]], // 5 entregas
    ]);
    return deliveriesMap.get(key) ?? [];
  }
}
