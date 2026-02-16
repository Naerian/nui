import { TimePeriod, TimeValue } from "../../time-picker";

export enum CalendarType {
  DAY = 'day',
  WEEK = 'week',
  RANGE = 'range',
}

// Alias para retrocompatibilidad
export type SelectionType = CalendarType | `${CalendarType}`;

// Cantidad de años visibles en el bloque de años
export const COUNT_BLOCK_YEARS = 20;

export enum ViewMode {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  isHovered: boolean;
  isWeekStart?: boolean;
  isWeekEnd?: boolean;
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
 * - `dates` contiene solo fechas VÁLIDAS (excluye deshabilitadas y fuera de rango)
 * - Todas las fechas están en formato `Date` nativo de JavaScript
 * - `type` usa CalendarType enum para type-safety completo
 */
export type CalendarValue =
  | {
      type: CalendarType.DAY;
      date: Date; // Fecha seleccionada
      time?: TimeValue; // Hora opcional
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
