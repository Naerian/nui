import { TimePeriod, TimeValue } from '../../time-picker';

export enum CalendarType {
  DAY = 'day',
  WEEK = 'week',
  RANGE = 'range',
  MONTH = 'month',
  YEAR = 'year',
}

// Alias para retrocompatibilidad
export type SelectionType = CalendarType | `${CalendarType}`;

/**
 * Modo de selección del calendario.
 * Define si el usuario puede seleccionar uno o múltiples elementos.
 */
export enum CalendarSelection {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type CalendarSelectionMode = CalendarSelection | `${CalendarSelection}`;

// Cantidad de años visibles en el bloque de años
export const COUNT_BLOCK_YEARS = 20;

export enum ViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
}

// ============================================================================
// SMART SERVICE - BUSINESS LOGIC TYPES (PASO 1)
// ============================================================================

/**
 * Estado de negocio para un día específico del calendario.
 * Permite marcar visualmente días con estados significativos para la aplicación.
 *
 * @example
 * - 'success': Días con reservas confirmadas, pagos completados
 * - 'warning': Días con reservas pendientes, validaciones requeridas
 * - 'danger': Días con errores, reservas canceladas, límite excedido
 * - 'info': Días con información adicional, eventos programados
 */
export type DateStatus = 'success' | 'warning' | 'danger' | 'info';

/**
 * Función que determina el estado de negocio de una fecha.
 * Permite lógica dinámica basada en datos de la aplicación.
 *
 * @param date - Fecha a evaluar
 * @returns El estado de negocio o null si no aplica
 *
 * @example
 * const dateStatusFn: DateStatusFn = (date) => {
 *   const reservations = getReservationsForDate(date);
 *   if (reservations.some(r => r.status === 'confirmed')) return 'success';
 *   if (reservations.some(r => r.status === 'pending')) return 'warning';
 *   if (reservations.some(r => r.status === 'cancelled')) return 'danger';
 *   return null;
 * };
 */
export type DateStatusFn = (date: Date) => DateStatus | null;

/**
 * Predicado que determina si una fecha está habilitada.
 * Permite lógica de validación dinámica que prevalece sobre disabledDates.
 *
 * @param date - Fecha a validar
 * @returns true si la fecha está habilitada, false si debe deshabilitarse
 *
 * @example
 * const isDateEnabledFn: IsDateEnabledFn = (date) => {
 *   // Deshabilitar festivos
 *   if (isHoliday(date)) return false;
 *   // Deshabilitar días sin disponibilidad
 *   return hasAvailability(date);
 * };
 */
export type IsDateEnabledFn = (date: Date) => boolean;

/**
 * Modelo de datos para cada día del calendario (ViewModel).
 * Contiene toda la información necesaria para renderizar y gestionar un día.
 *
 * BACKWARD COMPATIBILITY:
 * - Nuevas propiedades son opcionales o tienen valores por defecto
 * - Propiedades existentes mantienen su comportamiento
 */
export interface CalendarDay {
  // ========================================================================
  // DATOS BASE
  // ========================================================================

  /** Objeto Date nativo de JavaScript */
  date: Date;

  /** Número del día del mes (1-31) */
  dayNumber: number;

  // ========================================================================
  // ESTADOS DE POSICIÓN Y CONTEXTO
  // ========================================================================

  /** Pertenece al mes actualmente mostrado (vs días del mes anterior/siguiente) */
  isCurrentMonth: boolean;

  /** Es el día actual (hoy) */
  isToday: boolean;

  /** Es fin de semana (sábado o domingo) - Útil para destacar visualmente */
  isWeekend: boolean;

  /** Es el primer día de la semana (según firstDayOfWeek configurado) */
  isWeekStart?: boolean;

  /** Es el último día de la semana */
  isWeekEnd?: boolean;

  // ========================================================================
  // ESTADOS DE SELECCIÓN
  // ========================================================================

  /** Es una fecha seleccionada (endpoint en DAY/RANGE, o punto de la semana en WEEK) */
  isSelected: boolean;

  /** Está dentro del rango seleccionado (WEEK o RANGE) o preview en hover */
  isInRange: boolean;

  /** No puede ser seleccionado (por disabledDates, minDate, maxDate, o isDateEnabledFn) */
  isDisabled: boolean;

  /** Está siendo actualmente señalado con el mouse (útil para previsualización) */
  isHovered: boolean;

  // ========================================================================
  // BUSINESS LOGIC (PASO 1 - Smart Service)
  // ========================================================================

  /**
   * Estado de negocio asignado dinámicamente mediante dateStatusFn.
   * Permite marcar visualmente días con significado para la aplicación.
   * @since PASO 1
   */
  status?: DateStatus;

  // ========================================================================
  // ACCESIBILIDAD
  // ========================================================================

  /**
   * Etiqueta descriptiva para lectores de pantalla (ARIA).
   * Generada automáticamente con formato: "Lunes 15 de enero de 2024, Hoy, Seleccionado, Deshabilitado"
   * @since PASO 1
   */
  ariaLabel: string;
}

export interface WeekRange {
  start: Date;
  end: Date;
}

// TimeValue importado desde time-picker (no duplicar definición)

// ------------------------------------------------------------------------------
// FORMATO DE RESPUESTA DEL CALENDARIO (Estructurado y Tipado)
// ------------------------------------------------------------------------------

/**
 * Tipo de valor devuelto por el calendario según el modo de selección.
 * Cada tipo tiene su estructura específica con toda la información relevante.
 *
 * IMPORTANTE:
 * - Soporta selección simple (date/month/year) y múltiple (dates/months/years)
 * - La propiedad singular (date/month/year) existe solo en selección simple
 * - La propiedad plural (dates/months/years) contiene solo valores VÁLIDOS (excluye deshabilitados)
 * - `type` usa CalendarType enum para type-safety completo
 */
export type CalendarValue =
  | {
      type: CalendarType.DAY;
      date: Date; // Fecha seleccionada (selección simple)
      dates?: never; // No existe en selección simple
      time?: TimeValue; // Hora opcional
    }
  | {
      type: CalendarType.DAY;
      dates: Date[]; // Array de fechas seleccionadas (selección múltiple)
      date?: never; // No existe en selección múltiple
      time?: TimeValue; // Hora opcional aplicada a todas las fechas
    }
  | {
      type: CalendarType.WEEK;
      dates: Date[]; // Array de fechas VÁLIDAS de la semana (pueden ser menos de 7 si hay deshabilitadas)
      week: { start: Date; end: Date }; // Rango completo de la semana
      time?: { start: TimeValue; end: TimeValue }; // Horas opcionales de inicio/fin
    }
  | {
      type: CalendarType.RANGE;
      dates: Date[]; // Array de fechas VÁLIDAS del rango (excluye deshabilitadas)
      range: { start: Date; end: Date }; // Fecha de inicio y fin del rango
      time?: { start: TimeValue; end: TimeValue }; // Horas opcionales de inicio/fin
    }
  | {
      type: CalendarType.MONTH;
      date: Date; // Primer día del mes seleccionado (ej: 2024-01-01 para enero 2024)
      month: { month: number; year: number }; // Mes (0-11) y año seleccionado (selección simple)
      months?: never; // No existe en selección simple
    }
  | {
      type: CalendarType.MONTH;
      dates: Date[]; // Primeros días de cada mes seleccionado
      months: Array<{ month: number; year: number }>; // Array de meses seleccionados (selección múltiple)
      month?: never; // No existe en selección múltiple
    }
  | {
      type: CalendarType.YEAR;
      date: Date; // Primer día del año seleccionado (ej: 2024-01-01)
      year: number; // Año seleccionado (selección simple)
      years?: never; // No existe en selección simple
    }
  | {
      type: CalendarType.YEAR;
      dates: Date[]; // Primeros días de cada año seleccionado
      years: number[]; // Array de años seleccionados (selección múltiple)
      year?: never; // No existe en selección múltiple
    };

export interface DateRangePreset {
  label: string;
  getValue: () => { start: Date; end: Date };
}

export const DEFAULT_FORMAT = 'yyyy-MM-dd';

// Day of week: 0 = Sunday, 1 = Monday, etc.
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Time Picker display modes for Calendar integration
export type CalendarTimePickerMode = true | 'start' | 'end' | 'both';
export enum CalendarTimePickerModeEnum {
  START = 'start',
  END = 'end',
  BOTH = 'both',
}

export type CalendarTabType = 'calendar' | 'presets' | 'time';

export type CalendarWidth = 'compact' | 'full';
export enum CalendarWidthEnum {
  COMPACT = 'compact',
  FULL = 'full',
}

// ============================================================================
// CONFIGURACIÓN GLOBAL DEL CALENDARIO
// ============================================================================

/**
 * Configuración global para el componente Calendar a nivel de aplicación.
 * Permite definir comportamientos, formatos, y estilos por defecto que se
 * aplicarán a todos los calendarios de la app, evitando discrepancias.
 */
export interface CalendarGlobalConfig {
  // ========================================================================
  // 1. LOCALIZACIÓN Y FORMATEO
  // ========================================================================

  /**
   * Primer día de la semana (0=Domingo, 1=Lunes, etc.)
   * Por defecto: 1 (Lunes) - Estándar internacional ISO 8601
   * @example 1 // Semana empieza en lunes
   */
  firstDayOfWeek?: FirstDayOfWeek;

  /**
   * Cerrar automáticamente el calendario tras seleccionar una fecha.
   * Esto es especialmente útil para calendarios de selección única (DAY/WEEK).
   * Para RANGE, normalmente se deja false para permitir seleccionar inicio y fin sin cerrar.
   * Aquí se establece el default global, pero cada Calendar puede sobrescribirlo.
   * Por defecto: true (para tipos DAY y WEEK), false (para RANGE)
   */
  closeOnSelect?: boolean;

  /**
   * Formato de fecha por defecto para la comunicación con APIs y usuarios.
   * Acepta formato date-fns compatible (ej: 'yyyy-MM-dd', 'dd/MM/yyyy')
   * Por defecto: 'yyyy-MM-dd'
   * @example 'dd/MM/yyyy' // Formato español
   */
  format?: string;

  /**
   * Código de idioma/localidad (BCP 47)
   * Usado por date-fns para traducciones de meses, días, etc.
   * Por defecto: 'es' (Español)
   * @example 'es', 'en', 'fr', 'de'
   */
  locale?: string;

  // ========================================================================
  // 2. COMPORTAMIENTO Y UX
  // ========================================================================

  /**
   * Mostrar botón "Hoy" en el calendario por defecto
   * Por defecto: true
   */
  showTodayButton?: boolean;

  /**
   * Impedir que el usuario seleccione rangos que crucen fechas deshabilitadas.
   * Si es true, al hacer hover sobre rangos, se detendrá en la fecha deshabilitada.
   * Por defecto: false (permite cruzar)
   */
  blockDisabledRanges?: boolean;

  /**
   * Modo de vista inicial por defecto.
   * Útil para calendarios que siempre deben empezar en vista anual.
   * Por defecto: ViewMode.DAY
   * @example ViewMode.MONTH // Empieza siempre en vista de mes
   */
  initialViewMode?: ViewMode;

  /**
   * Cerrar automáticamente el calendario tras seleccionar una fecha.
   * Por defecto: true (para tipos DAY y WEEK), false (para RANGE)
   */
  autoClose?: boolean;

  /**
   * Número de meses/años a mostrar en vista simultánea.
   * Por defecto: 1 (Un mes o año)
   * @example 2 // Mostrar 2 meses lado a lado
   */
  displayCount?: number;

  // ========================================================================
  // 3. VISUAL Y UI (DESIGN SYSTEM)
  // ========================================================================

  /**
   * Tamaño por defecto del calendario (sm, md, lg)
   * Por defecto: 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Ancho por defecto del calendario (compact, full)
   * - 'compact': Ancho mínimo necesario
   * - 'full': Ocupa el contenedor padre
   * Por defecto: 'full'
   */
  width?: CalendarWidth;

  /**
   * Formato de hora integrado (12h o 24h).
   * Mantiene consistencia si usas time zones o selección de rangos con horas.
   * Por defecto: '24h'
   * @example '12h' // Para aplicaciones en USA
   */
  timeMode?: '12h' | '24h';

  // ========================================================================
  // 4. PRESETS DE RANGO
  // ========================================================================

  /**
   * Array de presets personalizados para rangos de fechas.
   * Se inyectan globalmente en todos los calendarios con CalendarType.RANGE.
   * Útil para períodos recurrentes como trimestres fiscales, semana actual, etc.
   * Por defecto: undefined (sin presets adicionales)
   *
   * @example
   * [
   *   {
   *     label: 'Trimestre Actual',
   *     getValue: () => ({
   *       start: new Date(2024, 0, 1),
   *       end: new Date(2024, 2, 31)
   *     })
   *   },
   *   {
   *     label: 'Año Fiscal',
   *     getValue: () => ({
   *       start: new Date(2024, 3, 1),
   *       end: new Date(2025, 2, 31)
   *     })
   *   }
   * ]
   */
  customPresets?: DateRangePreset[];
}
