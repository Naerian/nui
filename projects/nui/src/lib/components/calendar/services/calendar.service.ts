import { Injectable, inject } from '@angular/core';
import { NuiDateFnsAdapter } from '../../../adapters/nui-date-fns-adapter';
import { CalendarDay, DEFAULT_FORMAT, WeekRange } from '../models/calendar.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  readonly dateAdapter = inject(NuiDateFnsAdapter);

  convertToDate(value: string | Date | null | undefined): Date | null {
    return this.dateAdapter.convertToDate(value);
  }

  formatDate(date: Date, formatStr: string = DEFAULT_FORMAT): string {
    return this.dateAdapter.format(date, formatStr);
  }

  isToday(date: Date): boolean {
    return this.dateAdapter.isToday(date);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return this.dateAdapter.isSameDay(date1, date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return this.dateAdapter.isSameMonth(date1, date2);
  }

  isWithinRange(date: Date, start: Date, end: Date): boolean {
    return this.dateAdapter.isWithinRange(date, start, end);
  }

  getMonthStart(date: Date): Date {
    return this.dateAdapter.startOfMonth(date);
  }

  getMonthEnd(date: Date): Date {
    return this.dateAdapter.endOfMonth(date);
  }

  getWeekRange(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1): WeekRange {
    return {
      start: this.dateAdapter.startOfWeek(date, weekStartsOn),
      end: this.dateAdapter.endOfWeek(date, weekStartsOn),
    };
  }

  getDaysInMonth(date: Date): Date[] {
    const start = this.dateAdapter.startOfMonth(date);
    const end = this.dateAdapter.endOfMonth(date);
    return this.dateAdapter.getDateRange(start, end);
  }

  getCalendarDays(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1): Date[] {
    const monthStart = this.dateAdapter.startOfMonth(date);
    const calendarStart = this.dateAdapter.startOfWeek(monthStart, weekStartsOn);
    
    // Siempre mostrar 6 semanas completas (42 días) para cubrir todos los casos
    // Esto asegura que todos los meses se muestren completamente, incluso aquellos
    // que empiezan en domingo y terminan en lunes (el peor caso posible)
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      days.push(this.dateAdapter.addDays(calendarStart, i));
    }
    
    return days;
  }

  nextMonth(date: Date): Date {
    return this.dateAdapter.addMonths(date, 1);
  }

  previousMonth(date: Date): Date {
    return this.dateAdapter.subtractMonths(date, 1);
  }

  nextYear(date: Date): Date {
    return this.dateAdapter.addYears(date, 1);
  }

  previousYear(date: Date): Date {
    return this.dateAdapter.subtractYears(date, 1);
  }

  getYear(date: Date): number {
    return this.dateAdapter.getYear(date);
  }

  getMonth(date: Date): number {
    return this.dateAdapter.getMonth(date);
  }

  getDay(date: Date): number {
    return this.dateAdapter.getDay(date);
  }

  setYear(date: Date, year: number): Date {
    return this.dateAdapter.setYear(date, year);
  }

  setMonth(date: Date, month: number): Date {
    return this.dateAdapter.setMonth(date, month);
  }

  startOfDay(date: Date): Date {
    // date-fns startOfDay is not in the adapter, so we use JavaScript Date API
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  isDateDisabled(date: Date, disabledDates?: Date[]): boolean {
    if (!disabledDates || disabledDates.length === 0) return false;
    return this.dateAdapter.isDateDisabled(date, disabledDates);
  }

  // Métodos para retrocompatibilidad con input-date-picker
  getDatesBetween(start: Date, end: Date): Date[] {
    return this.dateAdapter.getDateRange(start, end);
  }

  getWeekStartEnd(date: Date): WeekRange {
    return this.getWeekRange(date);
  }

  // ============================================================================
  // MÉTODO UNIFICADO PARA GENERACIÓN DE VISTA (getDaysViewModel)
  // ============================================================================

  /**
   * Genera el ViewModel del mes completo con todos los estados pre-calculados.
   *
   * Este es el método core que centraliza toda la lógica de cálculo de estados
   * para cada día (isToday, isCurrentMonth, isDisabled, etc.).
   *
   * @param currentDate Fecha base para mostrar el mes
   * @param weekStartsOn Primer día de la semana (0=Domingo, 1=Lunes)
   * @param disabledDates Array de fechas completamente deshabilitadas
   * @param minDate Fecha mínima permitida (inclusive)
   * @param maxDate Fecha máxima permitida (inclusive)
   * @param selectedDate Fecha seleccionada (solo para modo DAY, para comparación)
   * @param selectedRange Rango seleccionado (start/end, para comparación)
   * @param hoveredDate Fecha hovereada (para modo RANGE preview)
   *
   * @returns Array de 42 CalendarDay con todos los estados calculados
   */
  getDaysViewModel(
    currentDate: Date,
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1,
    options?: {
      disabledDates?: Date[];
      minDate?: Date | string;
      maxDate?: Date | string;
      selectedDate?: Date | null;
      selectedRange?: { start: Date | null; end: Date | null };
      hoveredDate?: Date | null;
    }
  ): CalendarDay[] {
    const calendarDaysRaw = this.getCalendarDays(currentDate, weekStartsOn);

    // Parse min/max dates
    const minDateObj = options?.minDate
      ? typeof options.minDate === 'string'
        ? this.convertToDate(options.minDate)
        : options.minDate
      : null;

    const maxDateObj = options?.maxDate
      ? typeof options.maxDate === 'string'
        ? this.convertToDate(options.maxDate)
        : options.maxDate
      : null;

    const disabledDates = options?.disabledDates || [];
    const selectedDate = options?.selectedDate || null;
    const selectedRange = options?.selectedRange || { start: null, end: null };
    const hoveredDate = options?.hoveredDate || null;

    return calendarDaysRaw.map(date => ({
      date,
      dayNumber: this.getDay(date),
      isCurrentMonth: this.isSameMonth(date, currentDate),
      isToday: this.isToday(date),
      isSelected: this.isDateSelected(date, selectedDate, selectedRange),
      isInRange: this.isDateInRange(date, selectedRange, hoveredDate),
      isDisabled: this.isDateUnselectable(date, disabledDates, minDateObj, maxDateObj),
      isHovered: hoveredDate ? this.isSameDay(date, hoveredDate) : false,
    }));
  }

  /**
   * Verifica si una fecha específica está seleccionada
   * @private
   */
  private isDateSelected(
    date: Date,
    selectedDate: Date | null,
    selectedRange: { start: Date | null; end: Date | null }
  ): boolean {
    // Modo DAY: solo si coincide con selectedDate
    if (selectedDate && this.isSameDay(date, selectedDate)) {
      return true;
    }

    // Modo RANGE: solo los extremos están "selected", el resto es "in-range"
    if (selectedRange.start && !selectedRange.end) {
      return this.isSameDay(date, selectedRange.start);
    }

    if (selectedRange.start && selectedRange.end) {
      return (
        this.isSameDay(date, selectedRange.start) ||
        this.isSameDay(date, selectedRange.end)
      );
    }

    return false;
  }

  /**
   * Verifica si una fecha está dentro del rango (para preview en RANGE mode)
   * @private
   */
  private isDateInRange(
    date: Date,
    selectedRange: { start: Date | null; end: Date | null },
    hoveredDate: Date | null
  ): boolean {
    // Si no hay rango, no está in-range
    if (!selectedRange.start) return false;

    // Si ya hay end, es un rango completo: check si está dentro
    if (selectedRange.end) {
      return this.isWithinRange(date, selectedRange.start, selectedRange.end);
    }

    // Si no hay end pero hay hover, mostrar preview del rango
    if (hoveredDate) {
      const [start, end] =
        selectedRange.start < hoveredDate
          ? [selectedRange.start, hoveredDate]
          : [hoveredDate, selectedRange.start];
      return this.isWithinRange(date, start, end);
    }

    return false;
  }

  /**
   * Verifica si una fecha es no-seleccionable (deshabilitada/fuera de rango)
   * @private
   */
  private isDateUnselectable(
    date: Date,
    disabledDates: Date[],
    minDate: Date | null,
    maxDate: Date | null
  ): boolean {
    // Deshabilitada por el usuario
    if (this.isDateDisabled(date, disabledDates)) {
      return true;
    }

    // Fuera del rango min/max
    if (minDate && this.dateAdapter.isBefore(date, minDate)) {
      return true;
    }

    if (maxDate && this.dateAdapter.isAfter(date, maxDate)) {
      return true;
    }

    return false;
  }
}
