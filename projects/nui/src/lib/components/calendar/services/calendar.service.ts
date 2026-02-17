import { Injectable, inject } from '@angular/core';
import { NuiDateFnsAdapter } from '../../../adapters/nui-date-fns-adapter';
import { CalendarDay, DEFAULT_FORMAT, WeekRange, DateStatusFn, IsDateEnabledFn } from '../models/calendar.model';
import { NUI_TRANSLATIONS } from '../../../translations';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  readonly dateAdapter = inject(NuiDateFnsAdapter);
  private readonly _translations = inject(NUI_TRANSLATIONS);

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
   * Genera el ViewModel completo para los 42 días del calendario (6 semanas).
   * Calcula todos los estados, propiedades y lógica de negocio para cada día.
   *
   * SMART SERVICE (PASO 1):
   * - Soporta dateStatusFn para asignar estados de negocio dinámicos
   * - Soporta isDateEnabledFn para validación dinámica (prevalece sobre disabledDates)
   * - Genera ariaLabel descriptivo para accesibilidad
   * - Calcula isWeekend automáticamente
   *
   * @param currentDate Fecha del mes actual a mostrar
   * @param weekStartsOn Primer día de la semana (0=Domingo, 1=Lunes)
   * @param options Configuración adicional para estados y validaciones
   * @param options.disabledDates Array de fechas completamente deshabilitadas (deprecado en favor de isDateEnabledFn)
   * @param options.minDate Fecha mínima permitida (inclusive)
   * @param options.maxDate Fecha máxima permitida (inclusive)
   * @param options.selectedDate Fecha seleccionada (modo DAY)
   * @param options.selectedRange Rango seleccionado (start/end, modo RANGE)
   * @param options.selectedWeek Semana seleccionada (start/end, modo WEEK)
   * @param options.hoveredDate Fecha hovereada (para preview de rango)
   * @param options.dateStatusFn Función para asignar status de negocio dinámicamente
   * @param options.isDateEnabledFn Predicado para validación dinámica (prevalece sobre disabledDates)
   *
   * @returns Array de 42 CalendarDay con todos los estados, propiedades y status calculados
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
      selectedWeek?: { start: Date; end: Date } | null;
      hoveredDate?: Date | null;
      dateStatusFn?: DateStatusFn;
      isDateEnabledFn?: IsDateEnabledFn;
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
    const selectedWeek = options?.selectedWeek || null;
    const hoveredDate = options?.hoveredDate || null;
    const dateStatusFn = options?.dateStatusFn;
    const isDateEnabledFn = options?.isDateEnabledFn;

    return calendarDaysRaw.map(date => {
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Domingo o Sábado
      const isCurrentMonth = this.isSameMonth(date, currentDate);
      const isToday = this.isToday(date);
      const isSelected = this.isDateSelected(date, selectedDate, selectedRange);
      const isInRange = this.isDateInRange(date, selectedRange, selectedWeek, hoveredDate);
      const isDisabled = this.isDateUnselectable(
        date,
        disabledDates,
        minDateObj,
        maxDateObj,
        isDateEnabledFn
      );
      const isHovered = hoveredDate ? this.isSameDay(date, hoveredDate) : false;
      const status = dateStatusFn ? dateStatusFn(date) ?? undefined : undefined;

      // Generar ariaLabel descriptivo para accesibilidad
      const ariaLabel = this.generateAriaLabel(
        date,
        isToday,
        isSelected,
        isInRange,
        isDisabled,
        status
      );

      return {
        date,
        dayNumber: this.getDay(date),
        isCurrentMonth,
        isToday,
        isWeekend,
        isSelected,
        isInRange,
        isDisabled,
        isHovered,
        status,
        ariaLabel,
      };
    });
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
   * Verifica si una fecha está dentro del rango (para preview en RANGE mode o WEEK mode)
   * @private
   */
  private isDateInRange(
    date: Date,
    selectedRange: { start: Date | null; end: Date | null },
    selectedWeek: { start: Date; end: Date } | null,
    hoveredDate: Date | null
  ): boolean {
    // Modo WEEK: verificar si está dentro de la semana seleccionada
    if (selectedWeek) {
      return this.isWithinRange(date, selectedWeek.start, selectedWeek.end);
    }

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
   * Verifica si una fecha es no-seleccionable (deshabilitada/fuera de rango).
   * 
   * SMART SERVICE (PASO 1):
   * - Si isDateEnabledFn está presente, prevalece sobre disabledDates
   * - Siempre valida minDate y maxDate
   * 
   * @private
   */
  private isDateUnselectable(
    date: Date,
    disabledDates: Date[],
    minDate: Date | null,
    maxDate: Date | null,
    isDateEnabledFn?: IsDateEnabledFn
  ): boolean {
    // PASO 1: isDateEnabledFn prevalece sobre disabledDates
    if (isDateEnabledFn) {
      if (!isDateEnabledFn(date)) {
        return true; // Fecha deshabilitada por predicado
      }
    } else {
      // Fallback: array estático de disabledDates
      if (this.isDateDisabled(date, disabledDates)) {
        return true;
      }
    }

    // Validación de rango min/max (siempre se ejecuta)
    if (minDate && this.dateAdapter.isBefore(date, minDate)) {
      return true;
    }

    if (maxDate && this.dateAdapter.isAfter(date, maxDate)) {
      return true;
    }

    return false;
  }

  /**
   * Genera etiqueta ARIA descriptiva para accesibilidad.
   * Formato: "Lunes 15 de enero de 2024, Hoy, Seleccionado, Deshabilitado"
   * 
   * PASO 1: Usa el sistema de traducciones de NUI para i18n
   * 
   * @private
   */
  private generateAriaLabel(
    date: Date,
    isToday: boolean,
    isSelected: boolean,
    isInRange: boolean,
    isDisabled: boolean,
    status?: 'success' | 'warning' | 'danger' | 'info'
  ): string {
    const parts: string[] = [];

    // Fecha completa en formato largo
    parts.push(this.dateAdapter.format(date, 'EEEE d \'de\' MMMM \'de\' yyyy'));

    // Estados contextuales (traducidos)
    const aria = this._translations.calendar.aria;
    if (isToday) parts.push(aria.today);
    if (isSelected) parts.push(aria.selected);
    if (isInRange) parts.push(aria.inRange);
    if (isDisabled) parts.push(aria.disabled);

    // Estados de negocio (traducidos)
    if (status) {
      const statusLabels: Record<string, string> = {
        success: aria.statusSuccess,
        warning: aria.statusWarning,
        danger: aria.statusDanger,
        info: aria.statusInfo,
      };
      parts.push(statusLabels[status]);
    }

    return parts.join(', ');
  }
}
