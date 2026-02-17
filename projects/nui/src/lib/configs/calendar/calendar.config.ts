import { inject } from '@angular/core';
import { CalendarGlobalConfig, ViewMode } from '../../components/calendar';
import { NUI_TRANSLATIONS } from '../../translations';

/**
 * Función factory para crear la configuración por defecto del Calendar.
 *
 * Esta configuración actúa como los "defaults globales" de la aplicación para todos
 * los componentes Calendar. Cada Calendar individual puede seguir teniendo sus propios
 * inputs que sobrescriben estos defaults.
 *
 * @returns CalendarGlobalConfig con valores por defecto
 *
 * @example
 * // En app.config.ts con override global
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideNUIConfig({
 *       calendar: {
 *         firstDayOfWeek: 1,           // Semana empieza lunes (ISO 8601)
 *         format: 'yyyy-MM-dd',        // Formato para APIs
 *         locale: 'es',                // Español
 *         showTodayButton: true,
 *         initialViewMode: ViewMode.DAY,
 *         size: 'md',
 *         width: 'full',
 *         timeMode: '24h',
 *         customPresets: [
 *           {
 *             label: 'Trimestre Actual',
 *             getValue: () => ({ start: ..., end: ... })
 *           }
 *         ]
 *       }
 *     })
 *   ]
 * };
 */
export function createDefaultCalendarConfig(): CalendarGlobalConfig {
  const translations = inject(NUI_TRANSLATIONS);

  return {
    // ========================================================================
    // LOCALIZACIÓN Y FORMATEO
    // ========================================================================

    /**
     * Primer día de la semana: 1 = Lunes (ISO 8601 estándar internacional)
     * Esto evita que diferentes calendarios en la app tengan distintos inicios de semana.
     */
    firstDayOfWeek: 1,

    /**
     * Cerrar automáticamente el calendario tras seleccionar una fecha.
     * Esto es especialmente útil para calendarios de selección única (DAY/WEEK).
     * Para RANGE, normalmente se deja false para permitir seleccionar inicio y fin sin cerrar.
     * Aquí se establece el default global, pero cada Calendar puede sobrescribirlo.
     */
    closeOnSelect: true,

    /**
     * Formato por defecto para serializar fechas.
     * Compatible con date-fns (usado internamente por el adapter).
     * Se usa para:
     * - APIs REST
     * - Display en interfaz (si es necesario)
     * - Parsing de strings
     */
    format: 'yyyy-MM-dd',

    /**
     * Localización por defecto: Español.
     * Afecta a:
     * - Nombres de meses (enero, febrero, ...)
     * - Nombres de días (lunes, martes, ...)
     * - Formatting de fechas según región
     */
    locale: 'es',

    // ========================================================================
    // COMPORTAMIENTO Y UX
    // ========================================================================

    /**
     * Mostrar el botón "Hoy" en el calendario.
     * Útil para usuarios que quieren volver rápidamente a la fecha actual.
     */
    showTodayButton: true,

    /**
     * Bloquear selección de rangos que crucen fechas deshabilitadas.
     * Si la política de tu app es "no permitir saltar fechas bloqueadas",
     * activa esto para que el preview se detenga en la barrera deshabilitada.
     */
    blockDisabledRanges: false,

    /**
     * Modo de vista inicial por defecto.
     * Los calendarios mostrarán primero el vue especificado
     * (puede ser DAY, MONTH, o YEAR).
     */
    initialViewMode: ViewMode.DAY,

    /**
     * Cerrar automáticamente el calendario tras seleccionar.
     * Esto puede variar según el tipo:
     * - DAY/WEEK: normalmente true (selección única)
     * - RANGE: normalmente false (requiere inicio y fin)
     * Aquí es el default global; cada Calendar puede sobrescribir.
     */
    autoClose: true,

    /**
     * Cuántos meses/años mostrar simultáneamente.
     * Útil para comparar períodos o rangos amplios.
     */
    displayCount: 1,

    // ========================================================================
    // VISUAL Y UI (DESIGN SYSTEM)
    // ========================================================================

    /**
     * Tamaño del calendario por defecto.
     * 'md' es equilibrado para la mayoría de casos.
     * - 'sm': Para sidebars o widgets compactos
     * - 'md': Estándar
     * - 'lg': Para dashboards prominentes
     */
    size: 'md',

    /**
     * Ancho del calendario por defecto.
     * - 'full': Ocupa todo el ancho del contenedor (por defecto)
     * - 'compact': Solo lo necesario (280px aprox)
     * Minimiza discrepancias visuales entre pantallas.
     */
    width: 'full',

    /**
     * Formato de hora integrado (si usas SelectionType.RANGE con TimePicker).
     * - '24h': Formato de 24 horas (0:00 - 23:59)
     * - '12h': Formato AM/PM (12:00 AM - 11:59 PM)
     * Mantiene consistencia si tu app mezcla calendarios con diferentes regiones
     */
    timeMode: '24h',

    // ========================================================================
    // PRESETS DE RANGO
    // ========================================================================

    /**
     * Array de presets personalizados para calendarios en modo RANGE.
     * Se inyectan automáticamente en todos los calendarios.
     *
     * Por defecto: undefined (sin presets adicionales)
     * Los calendarios tienen presets built-in: Hoy, Esta semana, Este mes, etc.
     * Aquí puedes añadir tus presets específicos de negocio.
     *
     * @example
     * customPresets: [
     *   {
     *     label: 'Trimestre Q1 FY2024',
     *     getValue: () => ({
     *       start: new Date(2024, 0, 1),   // 1 enero
     *       end: new Date(2024, 2, 31)     // 31 marzo
     *     })
     *   },
     *   {
     *     label: 'Año Fiscal 2024',
     *     getValue: () => ({
     *       start: new Date(2024, 3, 1),   // 1 abril
     *       end: new Date(2025, 2, 31)     // 31 marzo siguiente
     *     })
     *   }
     * ]
     */
    customPresets: undefined,
  };
}
