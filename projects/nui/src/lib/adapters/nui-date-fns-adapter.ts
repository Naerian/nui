import {
  addDays as dfAddDays,
  addMonths as dfAddMonths,
  addYears as dfAddYears,
  eachDayOfInterval,
  endOfMonth as dfEndOfMonth,
  endOfYear as dfEndOfYear,
  endOfWeek as dfEndOfWeek,
  format,
  getDate,
  getDay as dfGetDay,
  getMonth,
  getYear,
  isSameDay as dfIsSameDay,
  isSameMonth as dfIsSameMonth,
  isSameYear as dfIsSameYear,
  isToday as dfIsToday,
  isWithinInterval,
  startOfMonth as dfStartOfMonth,
  startOfYear as dfStartOfYear,
  startOfWeek as dfStartOfWeek,
  subDays as dfSubDays,
  subMonths as dfSubMonths,
  subYears as dfSubYears,
  isBefore,
  isAfter,
} from 'date-fns';
import { Injectable } from '@angular/core';
import { NuiDateAdapter } from './nui-date-adapter';

/**
 * Implementación concreta de NuiDateAdapter usando date-fns.
 *
 * Este es el **único lugar del monorepo donde date-fns debe ser importado directamente**.
 * Todos los componentes y servicios acceden a operaciones de fecha a través del adaptador,
 * lo que nos permite cambiar de librería en el futuro sin afectar el resto del código.
 *
 * IMPORTANTE: Todos los métodos devuelven objetos Date nativos de JavaScript,
 * manteniendo la transparencia de la API pública.
 */
@Injectable({
  providedIn: 'root',
})
export class NuiDateFnsAdapter implements NuiDateAdapter {
  // ============================================================================
  // PARSING & EXTRACTION
  // ============================================================================

  convertToDate(value: string | Date | null | undefined): Date | null {
    if (!value) return null;

    if (value instanceof Date) {
      // Validar que sea una fecha válida
      return isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string') {
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
  }

  format(date: Date, pattern: string): string {
    try {
      return format(date, pattern);
    } catch (error) {
      console.warn(`Invalid date format pattern: ${pattern}`, error);
      return '';
    }
  }

  getYear(date: Date): number {
    return getYear(date);
  }

  getMonth(date: Date): number {
    // date-fns devuelve 0-11, perfecto
    return getMonth(date);
  }

  getDay(date: Date): number {
    // getDate() devuelve 1-31
    return getDate(date);
  }

  getDayOfWeek(date: Date): number {
    // getDay() devuelve 0-6 (0=Domingo)
    return dfGetDay(date);
  }

  // ============================================================================
  // NAVIGATION (Añadir/Restar)
  // ============================================================================

  addDays(date: Date, days: number): Date {
    return dfAddDays(date, days);
  }

  addMonths(date: Date, months: number): Date {
    return dfAddMonths(date, months);
  }

  addYears(date: Date, years: number): Date {
    return dfAddYears(date, years);
  }

  subtractDays(date: Date, days: number): Date {
    return dfSubDays(date, days);
  }

  subtractMonths(date: Date, months: number): Date {
    return dfSubMonths(date, months);
  }

  subtractYears(date: Date, years: number): Date {
    return dfSubYears(date, years);
  }

  // ============================================================================
  // BOUNDARIES (Principios y finales de períodos)
  // ============================================================================

  startOfMonth(date: Date): Date {
    return dfStartOfMonth(date);
  }

  endOfMonth(date: Date): Date {
    return dfEndOfMonth(date);
  }

  startOfYear(date: Date): Date {
    return dfStartOfYear(date);
  }

  endOfYear(date: Date): Date {
    return dfEndOfYear(date);
  }

  startOfWeek(date: Date, firstDayOfWeek: number): Date {
    // date-fns startOfWeek espera: { weekStartsOn: 0-6 }
    return dfStartOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  }

  endOfWeek(date: Date, firstDayOfWeek: number): Date {
    // date-fns endOfWeek espera: { weekStartsOn: 0-6 }
    return dfEndOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  }

  // ============================================================================
  // COMPARISON (Comparaciones)
  // ============================================================================

  isSameDay(date1: Date, date2: Date): boolean {
    return dfIsSameDay(date1, date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return dfIsSameMonth(date1, date2);
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return dfIsSameYear(date1, date2);
  }

  isToday(date: Date): boolean {
    return dfIsToday(date);
  }

  isBefore(date1: Date, date2: Date): boolean {
    return isBefore(date1, date2);
  }

  isAfter(date1: Date, date2: Date): boolean {
    return isAfter(date1, date2);
  }

  isWithinRange(date: Date, start: Date, end: Date): boolean {
    return isWithinInterval(date, { start, end });
  }

  isDateDisabled(date: Date, disabledDates: Date[]): boolean {
    return disabledDates.some(disabledDate => dfIsSameDay(date, disabledDate));
  }

  // ============================================================================
  // RANGES (Rangos)
  // ============================================================================

  getDateRange(start: Date, end: Date): Date[] {
    return eachDayOfInterval({ start, end });
  }

  // ============================================================================
  // UTILITIES (Utilidades)
  // ============================================================================

  setYear(date: Date, year: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    return newDate;
  }

  setMonth(date: Date, month: number): Date {
    const newDate = new Date(date);
    // Date.setMonth() normaliza automáticamente si el día no existe en el mes
    // Ej: 31 enero -> setMonth(1) [febrero] -> 28/29 febrero
    newDate.setMonth(month);
    return newDate;
  }

  clone(date: Date): Date {
    return new Date(date);
  }
}
