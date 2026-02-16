/**
 * Interfaz abstracta para operaciones de fechas en NUI.
 * Define el contrato que cualquier implementación de adaptador de fechas debe cumplir.
 *
 * La idea es desacoplar la lógica de componentes y servicios de librerías específicas
 * como date-fns. Si en el futuro cambiamos a Day.js o cualquier otra librería,
 * solo necesitamos crear un nuevo adaptador sin tocar el resto del código.
 *
 * Todos los métodos devuelven Date nativo de JavaScript, manteniendo la transparencia
 * en la API pública (usuarios de la librería trabajan solo con Date).
 */
export interface NuiDateAdapter {
  // ============================================================================
  // PARSING & EXTRACTION
  // ============================================================================

  /**
   * Convierte un valor (string, Date) a un objeto Date.
   * Devuelve null si no puede convertir.
   */
  convertToDate(value: string | Date | null | undefined): Date | null;

  /**
   * Formatea una fecha según el patrón especificado.
   * @param date Fecha a formatear
   * @param pattern Patrón de formato (ej: 'dd/MM/yyyy', 'EEEE d MMMM yyyy')
   */
  format(date: Date, pattern: string): string;

  /**
   * Extrae el año de una fecha (4 dígitos)
   */
  getYear(date: Date): number;

  /**
   * Extrae el mes de una fecha (0-11)
   */
  getMonth(date: Date): number;

  /**
   * Extrae el día del mes de una fecha (1-31)
   */
  getDay(date: Date): number;

  /**
   * Extrae el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
   */
  getDayOfWeek(date: Date): number;

  // ============================================================================
  // NAVIGATION (Añadir/Restar)
  // ============================================================================

  /**
   * Añade días a una fecha. Permite números negativos para restar.
   */
  addDays(date: Date, days: number): Date;

  /**
   * Añade meses a una fecha. Permite números negativos para restar.
   */
  addMonths(date: Date, months: number): Date;

  /**
   * Añade años a una fecha. Permite números negativos para restar.
   */
  addYears(date: Date, years: number): Date;

  /**
   * Resta días de una fecha (equivalente a addDays con negativo).
   */
  subtractDays(date: Date, days: number): Date;

  /**
   * Resta meses de una fecha (equivalente a addMonths con negativo).
   */
  subtractMonths(date: Date, months: number): Date;

  /**
   * Resta años de una fecha (equivalente a addYears con negativo).
   */
  subtractYears(date: Date, years: number): Date;

  // ============================================================================
  // BOUNDARIES (Principios y finales de períodos)
  // ============================================================================

  /**
   * Devuelve el primer día del mes a las 00:00:00
   */
  startOfMonth(date: Date): Date;

  /**
   * Devuelve el último día del mes a las 23:59:59
   */
  endOfMonth(date: Date): Date;

  /**
   * Devuelve el primer día del año a las 00:00:00
   */
  startOfYear(date: Date): Date;

  /**
   * Devuelve el último día del año a las 23:59:59
   */
  endOfYear(date: Date): Date;

  /**
   * Devuelve el primer día de la semana que contiene la fecha especificada.
   * @param date Fecha dentro de la semana
   * @param firstDayOfWeek 0 = Domingo, 1 = Lunes, etc.
   */
  startOfWeek(date: Date, firstDayOfWeek: number): Date;

  /**
   * Devuelve el último día de la semana que contiene la fecha especificada.
   * @param date Fecha dentro de la semana
   * @param firstDayOfWeek 0 = Domingo, 1 = Lunes, etc.
   */
  endOfWeek(date: Date, firstDayOfWeek: number): Date;

  // ============================================================================
  // COMPARISON (Comparaciones)
  // ============================================================================

  /**
   * Compara si dos fechas son el mismo día (ignora horas, minutos, segundos).
   */
  isSameDay(date1: Date, date2: Date): boolean;

  /**
   * Compara si dos fechas están en el mismo mes y año.
   */
  isSameMonth(date1: Date, date2: Date): boolean;

  /**
   * Compara si dos fechas están en el mismo año.
   */
  isSameYear(date1: Date, date2: Date): boolean;

  /**
   * Comprueba si una fecha es hoy (comparación de día completo).
   */
  isToday(date: Date): boolean;

  /**
   * Comprueba si date1 es antes que date2.
   */
  isBefore(date1: Date, date2: Date): boolean;

  /**
   * Comprueba si date1 es después que date2.
   */
  isAfter(date1: Date, date2: Date): boolean;

  /**
   * Comprueba si una fecha está dentro de un rango (incluye limites).
   */
  isWithinRange(date: Date, start: Date, end: Date): boolean;

  /**
   * Comprueba si una fecha está en la lista de fechas deshabilitadas.
   */
  isDateDisabled(date: Date, disabledDates: Date[]): boolean;

  // ============================================================================
  // RANGES (Rangos)
  // ============================================================================

  /**
   * Devuelve un array de todas las fechas entre start y end (inclusive).
   * Útil para generar calendarios, semanas, rangos de fechas.
   */
  getDateRange(start: Date, end: Date): Date[];

  // ============================================================================
  // UTILITIES (Utilidades)
  // ============================================================================

  /**
   * Establece el año de una fecha, manteniendo mes y día.
   * Si el nuevo año + mes + día no es válido (ej: 29/2 en año no bisiesto),
   * el comportamiento debe normalizarse al último día del mes disponible.
   */
  setYear(date: Date, year: number): Date;

  /**
   * Establece el mes de una fecha (0-11), manteniendo año y día si es posible.
   * Si el nuevo mes no tiene ese día (ej: 31 en febrero), normaliza al último día.
   */
  setMonth(date: Date, month: number): Date;

  /**
   * Clona una fecha para evitar mutaciones.
   */
  clone(date: Date): Date;
}
