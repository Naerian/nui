import { TimeSelectorConfig, TimeSelectorMode, TimeValue } from '../../time-selector';

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
 * Modo de selecci�n del calendario.
 * Define si el usuario puede seleccionar uno o m�ltiples elementos.
 */
export enum CalendarSelection {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type CalendarSelectionMode = CalendarSelection | `${CalendarSelection}`;

// Cantidad de a�os visibles en el bloque de a�os
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
 * Estado de negocio para un d�a espec�fico del calendario.
 * Permite marcar visualmente d�as con estados significativos para la aplicaci�n.
 *
 * @example
 * - 'success': D�as con reservas confirmadas, pagos completados
 * - 'warning': D�as con reservas pendientes, validaciones requeridas
 * - 'danger': D�as con errores, reservas canceladas, l�mite excedido
 * - 'info': D�as con informaci�n adicional, eventos programados
 */
export type DateStatus = 'success' | 'warning' | 'danger' | 'info';

/**
 * Funci�n que determina el estado de negocio de una fecha.
 * Permite l�gica din�mica basada en datos de la aplicaci�n.
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
 * Predicado que determina si una fecha est� habilitada.
 * Permite l�gica de validaci�n din�mica que prevalece sobre disabledDates.
 *
 * @param date - Fecha a validar
 * @returns true si la fecha est� habilitada, false si debe deshabilitarse
 *
 * @example
 * const isDateEnabledFn: IsDateEnabledFn = (date) => {
 *   // Deshabilitar festivos
 *   if (isHoliday(date)) return false;
 *   // Deshabilitar d�as sin disponibilidad
 *   return hasAvailability(date);
 * };
 */
export type IsDateEnabledFn = (date: Date) => boolean;

/**
 * Modelo de datos para cada d�a del calendario (ViewModel).
 * Contiene toda la informaci�n necesaria para renderizar y gestionar un d�a.
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

  /** N�mero del d�a del mes (1-31) */
  dayNumber: number;

  // ========================================================================
  // ESTADOS DE POSICI�N Y CONTEXTO
  // ========================================================================

  /** Pertenece al mes actualmente mostrado (vs d�as del mes anterior/siguiente) */
  isCurrentMonth: boolean;

  /** Es el d�a actual (hoy) */
  isToday: boolean;

  /** Es fin de semana (s�bado o domingo) - �til para destacar visualmente */
  isWeekend: boolean;

  /** Es el primer d�a de la semana (seg�n firstDayOfWeek configurado) */
  isWeekStart?: boolean;

  /** Es el �ltimo d�a de la semana */
  isWeekEnd?: boolean;

  // ========================================================================
  // ESTADOS DE SELECCI�N
  // ========================================================================

  /** Es una fecha seleccionada (endpoint en DAY/RANGE, o punto de la semana en WEEK) */
  isSelected: boolean;

  /** Est� dentro del rango seleccionado (WEEK o RANGE) o preview en hover */
  isInRange: boolean;

  /** No puede ser seleccionado (por disabledDates, minDate, maxDate, o isDateEnabledFn) */
  isDisabled: boolean;

  /** Est� siendo actualmente se�alado con el mouse (�til para previsualizaci�n) */
  isHovered: boolean;

  // ========================================================================
  // BUSINESS LOGIC (PASO 1 - Smart Service)
  // ========================================================================

  /**
   * Estado de negocio asignado din�micamente mediante dateStatusFn.
   * Permite marcar visualmente d�as con significado para la aplicaci�n.
   * @since PASO 1
   */
  status?: DateStatus;

  // ========================================================================
  // ACCESIBILIDAD
  // ========================================================================

  /**
   * Etiqueta descriptiva para lectores de pantalla (ARIA).
   * Generada autom�ticamente con formato: "Lunes 15 de enero de 2024, Hoy, Seleccionado, Deshabilitado"
   * @since PASO 1
   */
  ariaLabel: string;
}

export interface WeekRange {
  start: Date;
  end: Date;
}

// TimeValue importado desde time-selector (no duplicar definici�n)

// ------------------------------------------------------------------------------
// FORMATO DE RESPUESTA DEL CALENDARIO (Estructurado y Tipado)
// ------------------------------------------------------------------------------

/**
 * Tipo de valor devuelto por el calendario seg�n el modo de selecci�n.
 * Cada tipo tiene su estructura espec�fica con toda la informaci�n relevante.
 *
 * IMPORTANTE:
 * - Soporta selecci�n simple (date/month/year) y m�ltiple (dates/months/years)
 * - La propiedad singular (date/month/year) existe solo en selecci�n simple
 * - La propiedad plural (dates/months/years) contiene solo valores V�LIDOS (excluye deshabilitados)
 * - `type` usa CalendarType enum para type-safety completo
 */
export type CalendarValue =
  | {
      type: CalendarType.DAY;
      date: Date; // Fecha seleccionada (selecci�n simple)
      dates?: never; // No existe en selecci�n simple
      time?: TimeValue; // Hora opcional
    }
  | {
      type: CalendarType.DAY;
      dates: Date[]; // Array de fechas seleccionadas (selecci�n m�ltiple)
      date?: never; // No existe en selecci�n m�ltiple
      time?: TimeValue; // Hora opcional aplicada a todas las fechas
    }
  | {
      type: CalendarType.WEEK;
      dates: Date[]; // Array de fechas V�LIDAS de la semana (pueden ser menos de 7 si hay deshabilitadas)
      week: { start: Date; end: Date }; // Rango completo de la semana
      time?: { start: TimeValue; end: TimeValue }; // Horas opcionales de inicio/fin
    }
  | {
      type: CalendarType.RANGE;
      dates: Date[]; // Array de fechas V�LIDAS del rango (excluye deshabilitadas)
      range: { start: Date; end: Date }; // Fecha de inicio y fin del rango
      time?: { start: TimeValue; end: TimeValue }; // Horas opcionales de inicio/fin
    }
  | {
      type: CalendarType.MONTH;
      date: Date; // Primer d�a del mes seleccionado (ej: 2024-01-01 para enero 2024)
      month: { month: number; year: number }; // Mes (0-11) y a�o seleccionado (selecci�n simple)
      months?: never; // No existe en selecci�n simple
    }
  | {
      type: CalendarType.MONTH;
      dates: Date[]; // Primeros d�as de cada mes seleccionado
      months: Array<{ month: number; year: number }>; // Array de meses seleccionados (selecci�n m�ltiple)
      month?: never; // No existe en selecci�n m�ltiple
    }
  | {
      type: CalendarType.YEAR;
      date: Date; // Primer d�a del a�o seleccionado (ej: 2024-01-01)
      year: number; // A�o seleccionado (selecci�n simple)
      years?: never; // No existe en selecci�n simple
    }
  | {
      type: CalendarType.YEAR;
      dates: Date[]; // Primeros d�as de cada a�o seleccionado
      years: number[]; // Array de a�os seleccionados (selecci�n m�ltiple)
      year?: never; // No existe en selecci�n m�ltiple
    };

export interface DateRangePreset {
  label: string;
  getValue: () => { start: Date; end: Date };
}

export const DEFAULT_FORMAT = 'yyyy-MM-dd';

// Day of week: 0 = Sunday, 1 = Monday, etc.
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Time Picker display modes for Calendar integration
export type CalendarTimeSelectorMode = 'both' | 'default' | 'none';
export enum CalendarTimeSelectorModeEnum {
  BOTH = 'both',
  DEFAULT = 'default',
  NONE = 'none',
}

export type CalendarTabType = 'calendar' | 'presets' | 'time';

// ============================================================================
// FOOTER TEMPLATE CONTEXT
// ============================================================================

/**
 * Contexto expuesto al template del footer personalizado (`nuiCalendarFooter`).
 * Permite que el desarrollador acceda al estado actual del calendario y a
 * las acciones m�s comunes directamente desde su template.
 *
 * @example
 * <ng-template nuiCalendarFooter let-value="value" let-actions="actions">
 *   <span>{{ value?.dates?.length }} d�as seleccionados</span>
 *   <button (click)="actions.clear()">Limpiar</button>
 *   <button (click)="actions.close()">Aplicar</button>
 * </ng-template>
 */
export interface CalendarFooterContext {
  /** Valor de selecci�n actual (fechas, rango, semana, etc.) */
  value: CalendarValue | null;
  /** Vista activa en el calendario (day, month, year) */
  viewMode: ViewMode;
  /** Acciones del calendario disponibles en el footer */
  actions: {
    /** Navega al d�a de hoy y lo selecciona (solo en tipo DAY) */
    goToToday: () => void;
    /** Limpia la selecci�n actual */
    clear: () => void;
    /** Emite el evento de cierre (equivalente a confirmar la selecci�n) */
    close: () => void;
  };
}

// ============================================================================
// DAY CELL TEMPLATE CONTEXT
// ============================================================================

/**
 * Contexto tipado que recibe el `ng-template` proyectado con la directiva `nuiCalendarDay`.
 * Permite personalizar el contenido visual de cada celda de d�a manteniendo
 * todos los atributos ARIA, el manejo de teclado y los eventos gestionados por el componente.
 *
 * @example
 * ```html
 * <nui-calendar [dateStatusFn]="dateStatusFn">
 *   <ng-template nuiCalendarDay let-dayNumber="day" let-status="status" let-fullDay>
 *     <span>{{ dayNumber }}</span>
 *     @if (status === 'danger') { <i class="ri-error-warning-line"></i> }
 *   </ng-template>
 * </nui-calendar>
 * ```
 */
export interface CalendarDayContext {
  /** Objeto `CalendarDay` completo. Shorthand: `let-fullDay` (sin binding = $implicit) */
  $implicit: CalendarDay;
  /** N�mero del d�a (1�31). Atajo de `$implicit.dayNumber`. */
  day: number;
  /** Es el d�a de hoy. Atajo de `$implicit.isToday`. */
  isToday: boolean;
  /** Estado de negocio asignado por `dateStatusFn`, o `null` si no aplica. Atajo de `$implicit.status`. */
  status: DateStatus | null;
}

// ============================================================================
// CONFIGURACI�N GLOBAL DEL CALENDARIO
// ============================================================================

/**
 * Configuraci�n global para el componente Calendar a nivel de aplicaci�n.
 * Permite definir comportamientos, formatos, y estilos por defecto que se
 * aplicar�n a todos los calendarios de la app, evitando discrepancias.
 */
export interface CalendarGlobalConfig {
  // ========================================================================
  // 1. LOCALIZACI�N Y FORMATEO
  // ========================================================================

  /**
   * Primer d�a de la semana (0=Domingo, 1=Lunes, etc.)
   * Por defecto: 1 (Lunes) - Est�ndar internacional ISO 8601
   * @example 1 // Semana empieza en lunes
   */
  firstDayOfWeek?: FirstDayOfWeek;

  // ========================================================================
  // 2. COMPORTAMIENTO Y UX
  // ========================================================================

  /**
   * Mostrar bot�n "Hoy" en el calendario por defecto
   * Por defecto: true
   */
  showTodayButton?: boolean;

  /**
   * Formato de hora integrado para selecci�n con time picker.
   * Define el formato de hora que se usar� cuando showTimeSelector est� activo.
   * Por defecto: timeSelectorModeEnum.HOUR_MINUTE_24 (formato de 24 horas con horas y minutos)
   * @example timeSelectorModeEnum.HOUR_12 // Usar formato de 12 horas con AM/PM
   * @example timeSelectorModeEnum.HOUR_24 // Usar formato de 24 horas con solo horas (sin minutos)
   * @example timeSelectorModeEnum.HOUR_MINUTE_12 // Usar formato de 12 horas con horas y minutos
   * @example timeSelectorModeEnum.HOUR_MINUTE_24 // Usar formato de 24 horas con horas y minutos
   * @example timeSelectorModeEnum.DURATION // Usar formato de duraci�n (horas y minutos sin AM/PM)
   */
  timeSelectorMode?: TimeSelectorMode;

  /**
   * Configuraci�n adicional para el time picker integrado en el calendario.
   * Permite personalizar el comportamiento del selector de hora (steps, rangos, presets, etc.)
   * Esta configuraci�n se aplicar� a todos los calendarios que usen showTimeSelector, pero cada calendario puede sobrescribirla.
   * Por defecto: undefined (usar configuraci�n por defecto del time picker)
   * @example
   * {
   *    hourStep: 1, // Incrementos de hora de 1 en 1
   *    minuteStep: 15, // Incrementos de minuto de 15 en 15
   *    minTime: { hour: 8, minute: 0 }, // Hora m�nima seleccionable (08:00)
   *    maxTime: { hour: 18, minute: 0 }, // Hora m�xima seleccionable (18:00)
   *    disabledHours: [12, 13], // Deshabilitar horas de 12 a 13
   *    presets: [
   *          // Presets personalizados para el time picker
   *          { label: 'Ma�ana', value: { hour: 9, minute: 0 } },
   *          { label: 'Tarde', value: { hour: 15, minute: 0 } },
   *          { label: 'Noche', value: { hour: 20, minute: 0 } },
   *    ],
   * }
   */
  timeSelectorConfig?: TimeSelectorConfig;

  // ========================================================================
  // 4. PRESETS DE RANGO
  // ========================================================================

  /**
   * Array de presets personalizados para rangos de fechas.
   * Se inyectan globalmente en todos los calendarios con CalendarType.RANGE.
   * �til para per�odos recurrentes como trimestres fiscales, semana actual, etc.
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
   *     label: 'A�o Fiscal',
   *     getValue: () => ({
   *       start: new Date(2024, 3, 1),
   *       end: new Date(2025, 2, 31)
   *     })
   *   }
   * ]
   */
  customPresets?: DateRangePreset[];

  /**
   * Mostrar selector de hora integrado para fechas seleccionadas.
   * Permite seleccionar horas junto con fechas sin necesidad de un time picker externo.
   * - 'both': Mostrar selector de hora para ambas fechas (inicio y fin)
   * - 'default': Comportamiento inteligente por defecto (mostrar selector de hora para fecha de inicio en RANGE, o para la �nica fecha en DAY/WEEK)
   * - 'none': No mostrar selector de hora integrado
   * Por defecto: 'none' (no mostrar time picker integrado)
   */
  showTimeSelector?: CalendarTimeSelectorMode;

  /**
   * Hora de inicio y fin inicial para selecci�n con time picker integrado.
   * Permite establecer un rango horario por defecto cuando se usa showTimeSelector.
   * Por ejemplo, para reservas de hotel, puedes establecer 14:00 - 12:00 del d�a siguiente.
   * Estas horas se aplicar�n inicialmente al seleccionar fechas, pero el usuario podr� modificarlas.
   * Por defecto: null (sin hora inicial)
   */
  startTime?: TimeValue | Date | string | null; // Hora de inicio inicial para selecci�n con time picker
  endTime?: TimeValue | Date | string | null; // Hora de fin inicial para selecci�n con time picker

  /**
   * Fecha o fechas que se muestran inicialmente al abrir el calendario, sin estar seleccionadas.
   * Permite controlar el enfoque inicial del calendario (ej: mostrar mes actual, mes de cumplea�os, etc.)
   * Puede ser:
   * - string: Formato "yyyy-MM-dd" para una fecha espec�fica, o "yyyy-MM" para un mes, o "yyyy" para un a�o, o rango tomando como referencia el primer d�a (ej: "2024-01" para enero 2024)
   * - Date: Objeto Date para una fecha espec�fica, mes, a�o o rango de semanas tomando como referencia el primer d�a de la semana en base a la fecha
   * - Date[]: Array de fechas para rangos, selecci�n m�ltiple, meses, a�os o rango de semanas (se usar� la primera fecha para determinar el mes/a�o a mostrar)
   * - null: Sin fecha inicial, mostrar mes actual por defecto
   * Por defecto: null (sin fecha inicial, mostrar mes actual)
   * @example "2024-01-15" // Mostrar enero 2024 con enfoque en el d�a 15
   * @example "2024-01" // Mostrar enero 2024 sin enfoque espec�fico
   * @example "2024" // Mostrar a�o 2024 sin enfoque espec�fico
   * @example new Date(2024, 0, 15) // Mostrar enero 2024 con enfoque en el d�a 15
   * @example [new Date(2024, 0, 15), new Date(2024, 0, 20)] // Mostrar enero 2024 con enfoque en la semana del d�a 15 al 20
   */
  defaultDate?: string | Date | Date[] | null; // Fecha que se muestra inicialmente al abrir el calendario (sin seleccionar)
}
