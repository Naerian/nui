import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CalendarType,
  CalendarDay,
  ViewMode,
  COUNT_BLOCK_YEARS,
  DateRangePreset,
  FirstDayOfWeek,
  CalendarTimePickerMode,
  CalendarValue,
  WeekRange,
  CalendarTabType,
  CalendarWidth,
  CalendarWidthEnum,
  CalendarTimePickerModeEnum,
  CalendarGlobalConfig,
  DateStatusFn,
  IsDateEnabledFn,
  CalendarSelection,
  CalendarSelectionMode,
} from './models/calendar.model';
import { CalendarService } from './services/calendar.service';
import { CalendarKeyboardNavigationService } from './services/calendar-keyboard-navigation.service';
import { ButtonComponent } from '../button/button.component';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import {
  TimePickerConfig,
  TimePickerMode,
  TimeValue,
} from '../time-picker/models/time-picker.model';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { NUISize, NUI_CONFIG } from '../../configs';
import { NUI_TRANSLATIONS } from '../../translations';
import { BtnGroupOption } from '../button-group';

@Component({
  selector: 'nui-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    A11yModule,
    ButtonComponent,
    ButtonGroupComponent,
    TimePickerComponent,
    FormsModule,
  ],
  providers: [
    CalendarKeyboardNavigationService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
  host: {
    class: 'nui-calendar-host',
    '[class.nui-calendar-full]': 'effectiveWidth() === "full"',
    '[style.display]': 'effectiveWidth() === "full" ? "flex" : "inline-flex"',
    '[style.width]': 'effectiveWidth() === "full" ? "100%" : "auto"',
  },
})
export class CalendarComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  // ============================================================================
  // INPUTS (Signals API)
  // ============================================================================

  type = input<CalendarType | string>(CalendarType.DAY);

  /**
   * Modo de selección: single (uno) o multiple (varios).
   * - type="day" + selection="multiple" ? Seleccionar múltiples días
   * - type="month" + selection="multiple" ? Seleccionar múltiples meses
   * - type="year" + selection="multiple" ? Seleccionar múltiples años
   * - type="week" o "range" ? selection se ignora (siempre son multi-fecha por naturaleza)
   */
  selection = input<CalendarSelectionMode>(CalendarSelection.SINGLE);

  // Input date usando la nueva API de signals de Angular 17+
  // - Para DAY: single date
  // - Para WEEK: array de 7 fechas (se recalcula la semana desde el primer elemento)
  // - Para RANGE: array de N fechas (se usa first como start, last como end)
  date = input<string | Date | Date[] | null>();

  disabledDates = input<(string | Date)[]>(); // Fechas deshabilitadas

  // ========================================================================
  // PASO 1: Smart Service - Inputs para lógica de negocio avanzada
  // ========================================================================

  /**
   * Función que determina el estado de negocio de una fecha.
   * Permite asignar estados visuales dinámicamente: 'success', 'warning', 'danger', 'info'
   * @example
   * dateStatusFn = (date) => {
   *   const availability = getAvailability(date);
   *   if (availability === 0) return 'danger';
   *   if (availability < 5) return 'warning';
   *   return 'success';
   * }
   */
  dateStatusFn = input<DateStatusFn>();

  /**
   * Predicado que determina dinámicamente si una fecha está habilitada.
   * Prevalece sobre disabledDates para permitir lógica de validación compleja.
   * @example
   * isDateEnabledFn = (date) => {
   *   if (date.getDay() === 0 || date.getDay() === 6) return false; // No fines de semana
   *   return hasAvailability(date);
   * }
   */
  isDateEnabledFn = input<IsDateEnabledFn>();

  size = input<NUISize>('md'); // Tamaño del calendario
  width = input<CalendarWidth>(CalendarWidthEnum.COMPACT); // Ancho del calendario: compact (fijo) o full (100%)
  blockDisabledRanges = input<boolean>(false); // Bloquear rangos de fechas deshabilitadas
  isOpenedByOverlay = input<boolean>(false); // ¿Se abrió desde un overlay (datepicker)?
  minDate = input<Date | string | null>(); // Fecha mínima permitida
  maxDate = input<Date | string | null>(); // Fecha máxima permitida
  showTodayButton = input<boolean>(true); // Mostrar botón "Hoy"
  showPresets = input<boolean>(false); // Mostrar panel de presets
  customPresets = input<DateRangePreset[]>(); // Presets personalizados
  firstDayOfWeek = input<FirstDayOfWeek>(1); // 0=Domingo, 1=Lunes (default)
  showTimePicker = input<CalendarTimePickerMode | false>(false); // Mostrar selector de hora integrado: true/'start'/'end'/'both'
  timeMode = input<TimePickerMode>('HOUR_MINUTE_24'); // Modo de mostrar la hora en el timePicker
  timeConfig = input<TimePickerConfig>({}); // Opciones de configuración para el timePicker
  startTime = input<TimeValue | Date | string | null>(null); // Hora de inicio inicial
  endTime = input<TimeValue | Date | string | null>(null); // Hora de fin inicial

  // ============================================================================
  // OUTPUTS (Signals API)
  // ============================================================================

  /**
   * Evento que emite el valor seleccionado en formato estructurado CalendarValue.
   * Incluye toda la información: fecha(s), rango/semana, y tiempo si está habilitado.
   *
   * - Para DAY: { type: 'DAY', date: Date, time?: TimeValue }
   * - Para WEEK: { type: 'WEEK', dates: Date[], week: {...}, time?: {...} }
   * - Para RANGE: { type: 'RANGE', dates: Date[], range: {...}, time?: {...} }
   */
  valueChange = output<CalendarValue>();

  /**
   * Evento que se emite cuando se completa la selección y que va vinculado al cierre del
   * calendario (si se usa dentro de un datepicker o con autoClose) mediante `closeOnSelect`.
   */
  selectFinished = output<void>();

  // ============================================================================
  // VIEW CHILDREN (Signals API)
  // ============================================================================

  dayButtons = viewChildren<ElementRef>('dayButton');
  monthButtons = viewChildren<ElementRef>('monthButton');
  yearButtons = viewChildren<ElementRef>('yearButton');

  calendarService = inject(CalendarService);
  private keyboardNavService = inject(CalendarKeyboardNavigationService);
  protected readonly _translations = inject(NUI_TRANSLATIONS);
  private readonly globalConfig = inject(NUI_CONFIG);
  private readonly calendarConfig: Partial<CalendarGlobalConfig> =
    this.globalConfig?.calendar || {};

  // Signals para estado reactivo
  viewMode = signal<ViewMode>(ViewMode.DAY);
  currentDate = signal<Date>(new Date());
  previousViewDate = signal<Date | null>(null); // Para cancelar con Escape
  
  // Selección simple (selection='single')
  selectedDate = signal<Date | null>(null);
  selectedMonth = signal<{ month: number; year: number } | null>(null); // Mes y año seleccionado (para type='month')
  selectedYear = signal<number | null>(null); // Año seleccionado independiente
  
  // Selección múltiple (selection='multiple')
  selectedDates = signal<Date[]>([]); // Array de fechas seleccionadas (para type='day' + selection='multiple')
  selectedMonths = signal<Array<{ month: number; year: number }>>([]); // Array de meses seleccionados
  selectedYears = signal<number[]>([]); // Array de años seleccionados
  
  // Selección de rango y semana (siempre múltiple por naturaleza)
  selectedRange = signal<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  selectedWeek = signal<{ start: Date; end: Date } | null>(null);
  
  hoveredDate = signal<Date | null>(null);
  focusedDayIndex = signal<number>(-1);
  presetsVisible = signal<boolean>(false); // Control de visibilidad de presets
  timePickerVisible = signal<boolean>(false); // Control de visibilidad del time picker
  showingEndTime = signal<boolean>(false); // Toggle entre inicio/fin en modo 'both'
  activeTab = signal<CalendarTabType>('calendar'); // Pesta?a activa en el sistema de tabs
  isMobile = signal<boolean>(false); // Detecta si es dispositivo móvil (< 768px)
  selectedTime = signal<TimeValue | null>(null); // Hora seleccionada (para DAY y compatibilidad)
  selectedStartTime = signal<TimeValue | null>(null); // Hora de inicio (para WEEK/RANGE con 'start' o 'both')
  selectedEndTime = signal<TimeValue | null>(null); // Hora de fin (para RANGE con 'end' o 'both')
  closeOnSelect = input<boolean>(false); // Control de cierre automático al seleccionar (útil para RANGE)

  // Computed values para inputs con fallback a configuración global y luego a default literal
  effectiveCloseOnSelect = computed(() => {
    const inputValue = this.closeOnSelect();
    // Si el input es undefined, usar el valor global, si este también es undefined, usar false
    return inputValue ?? this.calendarConfig.closeOnSelect ?? false;
  });

  // Computed values para time picker
  showStartTimePicker = computed(() => {
    const mode = this.showTimePicker();
    return (
      mode === true ||
      mode === CalendarTimePickerModeEnum.START ||
      mode === CalendarTimePickerModeEnum.BOTH
    );
  });

  showEndTimePicker = computed(() => {
    const mode = this.showTimePicker();
    return mode === CalendarTimePickerModeEnum.END || mode === CalendarTimePickerModeEnum.BOTH;
  });

  /**
   * Opciones para el ButtonGroup de Start / End en modo 'both'
   */
  timePickerToggleOptions = computed<BtnGroupOption[]>(() => [
    {
      label: this._translations.calendar.timePicker.start,
      value: CalendarTimePickerModeEnum.START,
    },
    { label: this._translations.calendar.timePicker.end, value: CalendarTimePickerModeEnum.END },
  ]);

  /**
   * Valor actual del toggle (computed para sincronizar con showingEndTime)
   */
  timePickerToggleValue = computed<string>(() =>
    this.showingEndTime() ? CalendarTimePickerModeEnum.END : CalendarTimePickerModeEnum.START
  );

  /**
   * Indica si se debe mostrar el sistema de pesta?as
   * Solo si hay presets o timepicker disponibles
   */
  shouldShowTabs = computed(() => {
    return this.showPresets() || this.showTimePicker() !== false;
  });

  /**
   * Opciones para las pesta?as del calendario
   */
  tabOptions = computed<BtnGroupOption[]>(() => {
    const options: BtnGroupOption[] = [
      { label: this._translations.calendar.tabs.calendar, value: 'calendar' },
    ];

    if (this.showPresets() && this.type() === CalendarType.RANGE) {
      options.push({
        label: this._translations.calendar.tabs.presets,
        value: 'presets',
      });
    }

    if (this.showTimePicker() !== false) {
      options.push({
        label: this._translations.calendar.tabs.time,
        value: 'time',
      });
    }

    return options;
  });

  // ============================================================================
  // COMPUTED: Valores Efectivos (Global + Local)
  // Prioridad: local input > global config > default literal
  // ============================================================================

  /**
   * Valor efectivo de showTodayButton considerando configuración global
   */
  effectiveShowTodayButton = computed(() => {
    const inputValue = this.showTodayButton();
    return inputValue ?? this.calendarConfig.showTodayButton ?? true;
  });

  /**
   * Valor efectivo de blockDisabledRanges considerando configuración global
   */
  effectiveBlockDisabledRanges = computed(() => {
    const inputValue = this.blockDisabledRanges();
    return inputValue ?? this.calendarConfig.blockDisabledRanges ?? false;
  });

  /**
   * Valor efectivo de size considerando configuración global
   */
  effectiveSize = computed(() => {
    const inputValue = this.size();
    return inputValue ?? this.calendarConfig.size ?? 'md';
  });

  /**
   * Valor efectivo de width considerando configuración global y modo móvil.
   * En móviles (< 768px) siempre devuelve 'full' para asegurar que quepa en el contenedor.
   */
  effectiveWidth = computed(() => {
    // Si es móvil, forzar modo full
    if (this.isMobile()) {
      return CalendarWidthEnum.FULL;
    }
    
    const inputValue = this.width();
    return inputValue ?? this.calendarConfig.width ?? CalendarWidthEnum.FULL;
  });

  /**
   * Valor efectivo de customPresets considerando configuración global
   */
  effectiveCustomPresets = computed(() => {
    const inputValue = this.customPresets();
    return inputValue ?? this.calendarConfig.customPresets ?? undefined;
  });

  // ============================================================================
  // COMPUTED: Valores Derivados
  // ============================================================================

  displayedYear = computed(() => this.calendarService.getYear(this.currentDate()));
  displayedMonth = computed(
    () => this._translations.calendar.months[this.calendarService.getMonth(this.currentDate())]
  );
  displayedMonthIndex = computed(() => this.calendarService.getMonth(this.currentDate()));

  calendarDays = computed(() => {
    const rawDisabledDates = this.disabledDates();
    const convertedDisabledDates = rawDisabledDates
      ? rawDisabledDates
          .map(d => this.calendarService.convertToDate(d))
          .filter((d): d is Date => d !== null)
      : undefined;

    return this.calendarService.getDaysViewModel(
      this.currentDate(),
      this.firstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      {
        disabledDates: convertedDisabledDates,
        minDate: this.minDate() ?? undefined,
        maxDate: this.maxDate() ?? undefined,
        selectedDate: this.selectedDate(),
        selectedRange: this.selectedRange(),
        selectedWeek: this.selectedWeek(),
        hoveredDate: this.hoveredDate(),
        dateStatusFn: this.dateStatusFn(),
        isDateEnabledFn: this.isDateEnabledFn(),
        selectedMultipleDates: this.selection() === CalendarSelection.MULTIPLE ? this.selectedDates() : undefined,
      }
    );
  });

  years = computed(() => {
    const currentYear = this.displayedYear();
    return Array.from({ length: COUNT_BLOCK_YEARS }, (_, i) => currentYear - 5 + i);
  });

  // Verificar si un mes está deshabilitado (fuera del rango min/max)
  isMonthDisabled = (monthIndex: number): boolean => {
    const minDateValue = this.minDate();
    const maxDateValue = this.maxDate();
    const currentYear = this.displayedYear();

    // Crear fecha del primer y último día del mes a verificar
    const monthStart = new Date(currentYear, monthIndex, 1);
    const monthEnd = new Date(currentYear, monthIndex + 1, 0); // Último día del mes

    // Si hay minDate, verificar que el último día del mes no sea anterior
    if (minDateValue) {
      const minDate = this.calendarService.convertToDate(minDateValue);
      if (minDate && monthEnd < minDate) {
        return true;
      }
    }

    // Si hay maxDate, verificar que el primer día del mes no sea posterior
    if (maxDateValue) {
      const maxDate = this.calendarService.convertToDate(maxDateValue);
      if (maxDate && monthStart > maxDate) {
        return true;
      }
    }

    return false;
  };

  // Verificar si un año está deshabilitado (fuera del rango min/max)
  isYearDisabled = (year: number): boolean => {
    const minDateValue = this.minDate();
    const maxDateValue = this.maxDate();

    // Crear fecha del primer y último día del año a verificar
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    // Si hay minDate, verificar que el último día del año no sea anterior
    if (minDateValue) {
      const minDate = this.calendarService.convertToDate(minDateValue);
      if (minDate && yearEnd < minDate) {
        return true;
      }
    }

    // Si hay maxDate, verificar que el primer día del año no sea posterior
    if (maxDateValue) {
      const maxDate = this.calendarService.convertToDate(maxDateValue);
      if (maxDate && yearStart > maxDate) {
        return true;
      }
    }

    return false;
  };

  // Verificar si un mes está seleccionado
  isMonthSelected = (monthIndex: number): boolean => {
    if (this.type() === CalendarType.MONTH) {
      // En modo MONTH, verificar según si es single o multiple
      if (this.selection() === CalendarSelection.MULTIPLE) {
        // Selección múltiple: buscar en el array
        const selectedMonths = this.selectedMonths();
        const currentYear = this.displayedYear();
        return selectedMonths.some(m => m.month === monthIndex && m.year === currentYear);
      } else {
        // Selección simple: verificar el signal
        const selected = this.selectedMonth();
        if (!selected) return false;
        return selected.month === monthIndex && selected.year === this.displayedYear();
      }
    } else {
      // En modo navegación, marcar el mes actual mostrado
      return monthIndex === this.displayedMonthIndex();
    }
  };

  // Verificar si un año está seleccionado
  isYearSelected = (year: number): boolean => {
    if (this.type() === CalendarType.YEAR) {
      // En modo YEAR, verificar según si es single o multiple
      if (this.selection() === CalendarSelection.MULTIPLE) {
        // Selección múltiple: buscar en el array
        const selectedYears = this.selectedYears();
        return selectedYears.includes(year);
      } else {
        // Selección simple: verificar el signal
        const selected = this.selectedYear();
        return selected === year;
      }
    } else {
      // En modo navegación, marcar el año actual mostrado
      return year === this.selectedYear();
    }
  };

  // D?as de la semana ordenados seg?n firstDayOfWeek
  // Rota el array de traducciones para que coincida con el orden visual del calendario
  orderedWeekDays = computed(() => {
    const weekDays = this._translations.calendar.weekDaysShort;
    const firstDay = this.firstDayOfWeek();

    // Si empieza en Lunes (1), el array ya est? en orden correcto
    if (firstDay === 1) {
      return weekDays;
    }

    // Rotar el array seg?n el primer d?a
    // weekDays original: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S?', 'Do'] (?ndices 0-6 = Lunes-Domingo)
    // Si firstDay = 0 (Domingo), necesitamos: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S?']
    // Si firstDay = 6 (S?bado), necesitamos: ['S?', 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi']

    // Calcular cu?ntas posiciones rotar
    // firstDay 0 (Dom) = weekDays[6] primero ? rotar 6 a la izquierda (o 1 a la derecha)
    // firstDay 1 (Lun) = weekDays[0] primero ? no rotar (ya est? en orden)
    // firstDay 6 (S?b) = weekDays[5] primero ? rotar 5 a la izquierda (o 2 a la derecha)
    const rotateBy = firstDay === 0 ? 6 : firstDay - 1;

    return [...weekDays.slice(rotateBy), ...weekDays.slice(0, rotateBy)];
  });

  // Verificar si estamos en el mes actual (para mostrar/ocultar bot?n "Hoy")
  isCurrentMonth = computed(() => {
    const today = new Date();
    return this.calendarService.isSameMonth(this.currentDate(), today);
  });

  // Verificar si la fecha seleccionada es hoy
  isTodaySelected = computed(() => {
    const today = new Date();
    const selected = this.selectedDate();
    return selected
      ? this.calendarService.isSameMonth(selected, today) && selected.getDate() === today.getDate()
      : false;
  });

  // Verificar si se puede navegar hacia atr?s (minDate)
  canNavigateBack = computed(() => {
    if (!this.minDate()) return true;
    const minDateObj = this.parseDate(this.minDate());
    const viewMode = this.viewMode();
    const currentYear = this.displayedYear();
    const currentMonth = this.displayedMonthIndex();

    if (viewMode === ViewMode.YEAR) {
      const firstYear = this.years()[0];
      return firstYear > minDateObj.getFullYear();
    } else if (viewMode === ViewMode.MONTH) {
      // En vista de meses, verificar si se puede navegar al año anterior
      return currentYear > minDateObj.getFullYear();
    } else {
      // En vista de días, verificar si el mes anterior tiene algún día válido
      // Calcular el último día del mes anterior
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const lastDayOfPreviousMonth = new Date(previousYear, previousMonth + 1, 0);

      return lastDayOfPreviousMonth >= minDateObj;
    }
  });

  // Verificar si se puede navegar hacia adelante (maxDate)
  canNavigateForward = computed(() => {
    if (!this.maxDate()) return true;
    const maxDateObj = this.parseDate(this.maxDate());
    const viewMode = this.viewMode();
    const currentYear = this.displayedYear();
    const currentMonth = this.displayedMonthIndex();

    if (viewMode === ViewMode.YEAR) {
      const lastYear = this.years()[this.years().length - 1];
      return lastYear < maxDateObj.getFullYear();
    } else if (viewMode === ViewMode.MONTH) {
      // En vista de meses, verificar si se puede navegar al año siguiente
      return currentYear < maxDateObj.getFullYear();
    } else {
      // En vista de días, verificar si el mes siguiente tiene algún día válido
      // Calcular el primer día del mes siguiente
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const firstDayOfNextMonth = new Date(nextYear, nextMonth, 1);

      return firstDayOfNextMonth <= maxDateObj;
    }
  });

  // Presets por defecto
  defaultPresets = computed<DateRangePreset[]>(() => [
    {
      label: this._translations.calendar.presets.today,
      getValue: () => {
        const today = new Date();
        return { start: today, end: today };
      },
    },
    {
      label: this._translations.calendar.presets.last7Days,
      getValue: () => {
        const end = new Date();
        const start = this.calendarService.dateAdapter.subtractDays(end, 6);
        return { start, end };
      },
    },
    {
      label: this._translations.calendar.presets.last30Days,
      getValue: () => {
        const end = new Date();
        const start = this.calendarService.dateAdapter.subtractDays(end, 29);
        return { start, end };
      },
    },
    {
      label: this._translations.calendar.presets.thisMonth,
      getValue: () => {
        const today = new Date();
        const firstDay = this.calendarService.dateAdapter.startOfMonth(today);
        const lastDay = this.calendarService.dateAdapter.endOfMonth(today);
        return { start: firstDay, end: lastDay };
      },
    },
    {
      label: this._translations.calendar.presets.lastMonth,
      getValue: () => {
        const lastMonth = this.calendarService.dateAdapter.subtractMonths(new Date(), 1);
        const firstDay = this.calendarService.dateAdapter.startOfMonth(lastMonth);
        const lastDay = this.calendarService.dateAdapter.endOfMonth(lastMonth);
        return { start: firstDay, end: lastDay };
      },
    },
    {
      label: this._translations.calendar.presets.thisYear,
      getValue: () => {
        const today = new Date();
        const firstDay = this.calendarService.dateAdapter.startOfYear(today);
        const lastDay = this.calendarService.dateAdapter.endOfYear(today);
        return { start: firstDay, end: lastDay };
      },
    },
  ]);

  // Presets finales (customPresets o defaultPresets)
  presets = computed(() => this.customPresets() || this.defaultPresets());

  // Constantes
  readonly CalendarType = CalendarType;
  readonly ViewMode = ViewMode;

  constructor() {
    // Observar cambios en el input date para reinicializar el calendario
    effect(() => {
      const dateValue = this.date();
      // Forzar dependencia del signal
      if (dateValue !== undefined) {
        // Usar untracked para evitar loops infinitos al escribir en signals
        untracked(() => this.initializeCalendar());
      }
    });

    // Observar cambios en startTime y endTime inputs
    effect(() => {
      const startTimeInput = this.startTime();
      const endTimeInput = this.endTime();

      untracked(() => {
        // Inicializar hora de inicio si se provee
        if (startTimeInput) {
          const parsedTime = this.parseTimeInput(startTimeInput);
          if (parsedTime) {
            this.selectedStartTime.set(parsedTime);
            if (this.showTimePicker() === true || this.showTimePicker() === 'start') {
              this.selectedTime.set(parsedTime);
            }
          }
        }

        // Inicializar hora de fin si se provee
        if (endTimeInput) {
          const parsedTime = this.parseTimeInput(endTimeInput);
          if (parsedTime) {
            this.selectedEndTime.set(parsedTime);
          }
        }
      });
    });

    // Effecto para manejar el enfoque del teclado en los botones de día/mes/año
    effect(() => {
      const buttons = this.dayButtons();
      if (buttons.length > 0) {
        const focusedIndex = this.focusedDayIndex();
        if (focusedIndex >= 0) {
          untracked(() => this.focusDayButton(focusedIndex));
        }
      }
    });

    // Efectos para manejar el enfoque al cambiar de vista (mes/año)
    effect(() => {
      const buttons = this.monthButtons();
      if (buttons.length > 0 && this.viewMode() === ViewMode.MONTH) {
        untracked(() => this.focusCurrentMonth());
      }
    });

    // Efecto para enfocar el año seleccionado al entrar en vista de años
    effect(() => {
      const buttons = this.yearButtons();
      if (buttons.length > 0 && this.viewMode() === ViewMode.YEAR) {
        untracked(() => this.focusCurrentYear());
      }
    });
    
    // Inicializar detección de móvil
    this.checkIfMobile();
  }

  // ===========================
  // Mobile detection
  // ===========================
  
  /**
   * Verifica si el viewport es móvil (< 768px) y actualiza el signal
   */
  private checkIfMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth < 768);
    }
  }
  
  /**
   * Escucha cambios en el tamaño de ventana para actualizar modo móvil
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkIfMobile();
  }

  // ===========================
  // ControlValueAccessor implementation
  // ===========================
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private isDisabled = false;

  writeValue(value: any): void {
    // ------------------------------------------------------------------------------
    // ACEPTA M?LTIPLES FORMATOS:
    // 1. CalendarValue (nuevo formato estructurado)
    // 2. Date (para DAY)
    // 3. Date[] (para WEEK/RANGE o DAY multiple)
    // 4. { start: Date, end: Date } (para WEEK/RANGE)
    // 5. { month: number, year: number } (para MONTH) o array para MONTH multiple
    // 6. number (para YEAR) o array para YEAR multiple
    // ------------------------------------------------------------------------------

    if (!value) {
      // Si el valor es null/undefined, limpiar todas las selecciones
      this.resetSelectionStates();
      this.selectedTime.set(null);
      this.selectedStartTime.set(null);
      this.selectedEndTime.set(null);
      return;
    }

    // Detectar si es el nuevo formato CalendarValue
    if (value && typeof value === 'object' && 'type' in value) {
      this.handleCalendarValueInput(value as CalendarValue);
      return;
    }

    // Formatos legacy
    if (this.type() === CalendarType.DAY && value instanceof Date) {
      this.selectedDate.set(value);
      this.currentDate.set(value);
    } else if (this.type() === CalendarType.WEEK) {
      // Aceptar tanto array como objeto { start, end }
      if (Array.isArray(value) && value.length > 0) {
        // Si es un array, tomar la primera fecha y calcular la semana
        const week = this.calendarService.getWeekRange(value[0], this.firstDayOfWeek());
        this.selectedWeek.set(week);
        this.currentDate.set(week.start);
      } else if (value?.start && value?.end) {
        this.selectedWeek.set(value);
        this.currentDate.set(value.start);
      }
    } else if (this.type() === CalendarType.RANGE) {
      // Aceptar tanto array como objeto { start, end }
      if (Array.isArray(value) && value.length > 0) {
        // Si es un array, tomar primera y ?ltima fecha
        const start = value[0];
        const end = value[value.length - 1];
        this.selectedRange.set({ start, end });
        this.currentDate.set(start);
      } else if (value?.start || value?.end) {
        this.selectedRange.set({
          start: value.start || null,
          end: value.end || null,
        });
        if (value.start) {
          this.currentDate.set(value.start);
        }
      }
    } else if (this.type() === CalendarType.MONTH) {
      // Aceptar { month: number, year: number } o Date
      if (value.month !== undefined && value.year !== undefined) {
        this.selectedMonth.set({ month: value.month, year: value.year });
        const monthDate = new Date(value.year, value.month, 1);
        this.currentDate.set(monthDate);
        this.viewMode.set(ViewMode.MONTH);
      } else if (value instanceof Date) {
        const month = value.getMonth();
        const year = value.getFullYear();
        this.selectedMonth.set({ month, year });
        this.currentDate.set(value);
        this.viewMode.set(ViewMode.MONTH);
      }
    } else if (this.type() === CalendarType.YEAR) {
      // Aceptar number (year), Date, o array para multiple
      if (Array.isArray(value)) {
        // Array de years (number[]) o Date[]
        const years = value.map(v => 
          typeof v === 'number' ? v : v.getFullYear()
        );
        this.selectedYears.set(years);
        if (years.length > 0) {
          const yearDate = new Date(years[0], 0, 1);
          this.currentDate.set(yearDate);
        }
        this.viewMode.set(ViewMode.YEAR);
      } else if (typeof value === 'number') {
        this.selectedYear.set(value);
        const yearDate = new Date(value, 0, 1);
        this.currentDate.set(yearDate);
        this.viewMode.set(ViewMode.YEAR);
      } else if (value instanceof Date) {
        const year = value.getFullYear();
        this.selectedYear.set(year);
        this.currentDate.set(value);
        this.viewMode.set(ViewMode.YEAR);
      }
    } else if (this.type() === CalendarType.DAY && Array.isArray(value)) {
      // DAY con array: modo multiple
      this.selectedDates.set(value);
      if (value.length > 0) {
        this.currentDate.set(value[0]);
      }
    }
  }

  /**
   * Maneja el nuevo formato CalendarValue
   */
  private handleCalendarValueInput(value: CalendarValue): void {
    switch (value.type) {
      case CalendarType.DAY:
        // DAY: Single o Multiple
        if ('dates' in value && value.dates) {
          // Multiple days
          this.selectedDates.set(value.dates);
          if (value.dates.length > 0) {
            this.currentDate.set(value.dates[0]);
          }
        } else if ('date' in value && value.date) {
          // Single day
          this.selectedDate.set(value.date);
          this.currentDate.set(value.date);
        }
        if (value.time) {
          this.selectedTime.set(value.time);
          this.selectedStartTime.set(value.time);
        }
        break;

      case CalendarType.WEEK:
        this.selectedWeek.set(value.week);
        this.currentDate.set(value.week.start);
        if (value.time) {
          this.selectedStartTime.set(value.time.start);
          this.selectedEndTime.set(value.time.end);
        }
        break;

      case CalendarType.RANGE:
        this.selectedRange.set(value.range);
        this.currentDate.set(value.range.start);
        if (value.time) {
          this.selectedStartTime.set(value.time.start);
          this.selectedEndTime.set(value.time.end);
        }
        break;

      case CalendarType.MONTH:
        // MONTH: Single o Multiple
        if ('months' in value && value.months) {
          // Multiple months
          this.selectedMonths.set(value.months);
          if (value.months.length > 0) {
            const monthDate = new Date(value.months[0].year, value.months[0].month, 1);
            this.currentDate.set(monthDate);
          }
        } else if ('month' in value && value.month) {
          // Single month
          this.selectedMonth.set(value.month);
          const monthDate = new Date(value.month.year, value.month.month, 1);
          this.currentDate.set(monthDate);
        }
        this.viewMode.set(ViewMode.MONTH);
        break;

      case CalendarType.YEAR:
        // YEAR: Single o Multiple
        if ('years' in value && value.years) {
          // Multiple years
          this.selectedYears.set(value.years);
          if (value.years.length > 0) {
            const yearDate = new Date(value.years[0], 0, 1);
            this.currentDate.set(yearDate);
          }
        } else if ('year' in value && typeof value.year === 'number') {
          // Single year
          this.selectedYear.set(value.year);
          const yearDate = new Date(value.year, 0, 1);
          this.currentDate.set(yearDate);
        }
        this.viewMode.set(ViewMode.YEAR);
        break;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.initializeCalendar();
  }

  ngAfterViewInit(): void {
    // Si se abri? desde un overlay (datepicker), hacer focus en el d?a seleccionado/actual
    if (this.isOpenedByOverlay()) {
      this.focusInitialDay();
    }
  }

  private initializeCalendar(): void {
    const today = new Date();
    const dateInput = this.date(); // Leer el valor del signal

    // Resetear estados
    this.resetSelectionStates();

    if (!dateInput) {
      this.initializeWithoutDate(today);
      return;
    }

    try {
      const dates = this.parseDatesInput(dateInput);

      if (dates.length === 0) {
        console.warn('No valid dates provided to calendar');
        return;
      }

      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];

      if (!this.isValidDate(firstDate)) {
        console.warn('Invalid date provided to calendar:', dateInput);
        return;
      }

      // Posicionar el calendario en la primera fecha
      this.currentDate.set(firstDate);

      // Inicializar seg?n el tipo de calendario
      this.initializeByType(dates, firstDate, lastDate);
    } catch (error) {
      console.error('Error initializing calendar:', error);
    }
  }

  /**
   * Resetea los estados de selecci?n del calendario
   */
  private resetSelectionStates(): void {
    // Selección simple
    this.selectedDate.set(null);
    this.selectedMonth.set(null);
    this.selectedYear.set(null);
    
    // Selección múltiple
    this.selectedDates.set([]);
    this.selectedMonths.set([]);
    this.selectedYears.set([]);
    
    // Rango y semana
    this.selectedWeek.set(null);
    this.selectedRange.set({ start: null, end: null });
  }

  /**
   * Inicializa el calendario cuando no hay fecha de entrada
   */
  private initializeWithoutDate(today: Date): void {
    // No seleccionar ninguna fecha por defecto
    // El calendario mostrará el mes actual sin ninguna fecha seleccionada
    
    // Establecer la vista inicial según el tipo de calendario
    if (this.type() === CalendarType.MONTH) {
      this.viewMode.set(ViewMode.MONTH);
    } else if (this.type() === CalendarType.YEAR) {
      this.viewMode.set(ViewMode.YEAR);
    } else {
      this.viewMode.set(ViewMode.DAY);
    }
  }

  /**
   * Parsea el input de fechas a un array de objetos Date
   */
  private parseDatesInput(dateInput: string | Date | Date[]): Date[] {
    return Array.isArray(dateInput)
      ? (dateInput.map(d => this.calendarService.convertToDate(d)).filter(Boolean) as Date[])
      : ([this.calendarService.convertToDate(dateInput)].filter(Boolean) as Date[]);
  }

  /**
   * Valida que una fecha sea v?lida
   */
  private isValidDate(date: Date | null): boolean {
    return date !== null && !isNaN(date.getTime());
  }

  /**
   * Inicializa el calendario seg?n su tipo (DAY, WEEK, RANGE, MONTH, YEAR)
   */
  private initializeByType(dates: Date[], firstDate: Date, lastDate: Date): void {
    switch (this.type()) {
      case CalendarType.DAY:
        this.initializeDayMode(dates, firstDate);
        break;

      case CalendarType.WEEK:
        this.initializeWeekMode(firstDate);
        break;

      case CalendarType.RANGE:
        this.initializeRangeMode(dates, firstDate, lastDate);
        break;

      case CalendarType.MONTH:
        this.initializeMonthMode(dates, firstDate);
        break;

      case CalendarType.YEAR:
        this.initializeYearMode(dates, firstDate);
        break;
    }
  }

  /**
   * Inicializa el calendario en modo DAY
   */
  private initializeDayMode(dates: Date[], firstDate: Date): void {
    if (this.selection() === CalendarSelection.MULTIPLE) {
      // Selección múltiple: guardar todas las fechas
      this.selectedDates.set(dates);
    } else {
      // Selección simple: solo la primera fecha
      this.selectedDate.set(firstDate);
    }
  }

  /**
   * Inicializa el calendario en modo WEEK
   */
  private initializeWeekMode(date: Date): void {
    const week = this.calendarService.getWeekRange(date, this.firstDayOfWeek());
    this.selectedWeek.set(week);
  }

  /**
   * Inicializa el calendario en modo RANGE
   */
  private initializeRangeMode(dates: Date[], firstDate: Date, lastDate: Date): void {
    if (dates.length > 1 && this.isValidDate(lastDate)) {
      this.selectedRange.set({
        start: firstDate,
        end: lastDate,
      });
    } else {
      this.selectedRange.set({
        start: firstDate,
        end: null,
      });
    }
  }

  /**
   * Inicializa el calendario en modo MONTH
   */
  private initializeMonthMode(dates: Date[], firstDate: Date): void {
    if (this.selection() === CalendarSelection.MULTIPLE) {
      // Selección múltiple: convertir todas las fechas a meses
      const months = dates.map(d => ({ month: d.getMonth(), year: d.getFullYear() }));
      this.selectedMonths.set(months);
    } else {
      // Selección simple: solo el primer mes
      const month = firstDate.getMonth();
      const year = firstDate.getFullYear();
      this.selectedMonth.set({ month, year });
    }
    this.viewMode.set(ViewMode.MONTH); // Iniciar en vista de meses
  }

  /**
   * Inicializa el calendario en modo YEAR
   */
  private initializeYearMode(dates: Date[], firstDate: Date): void {
    if (this.selection() === CalendarSelection.MULTIPLE) {
      // Selección múltiple: convertir todas las fechas a años
      const years = dates.map(d => d.getFullYear());
      this.selectedYears.set(years);
    } else {
      // Selección simple: solo el primer año
      const year = firstDate.getFullYear();
      this.selectedYear.set(year);
    }
    this.viewMode.set(ViewMode.YEAR); // Iniciar en vista de a?os
  }

  // ?? HELPER: Parsear fecha de string o Date
  private parseDate(date: Date | string | null | undefined): Date {
    if (!date) return new Date();
    if (date instanceof Date) return date;
    return this.calendarService.convertToDate(date) || new Date();
  }

  // ?? HELPER: Parsear hora de TimeValue, Date o string
  private parseTimeInput(time: TimeValue | Date | string | null): TimeValue | null {
    if (!time) return null;

    // Si ya es TimeValue
    if (typeof time === 'object' && 'hour' in time && 'minute' in time) {
      return time as TimeValue;
    }

    // Si es Date
    if (time instanceof Date) {
      const is12h = this.timeMode().includes('12');
      const hour = is12h ? time.getHours() % 12 || 12 : time.getHours();
      return {
        hour,
        minute: time.getMinutes(),
        period: is12h ? (time.getHours() >= 12 ? 'PM' : 'AM') : undefined,
      };
    }

    // Si es string "HH:mm" o "HH:mm AM/PM"
    if (typeof time === 'string') {
      const parts = time.trim().split(/[\s:]+/);
      if (parts.length < 1) return null;

      const hour = parseInt(parts[0], 10);
      const minute = parts.length > 1 ? parseInt(parts[1], 10) : 0;
      const period = parts.length > 2 ? (parts[2].toUpperCase() as 'AM' | 'PM') : undefined;

      if (isNaN(hour) || isNaN(minute)) return null;

      return { hour, minute, period };
    }

    return null;
  }

  // Verificar si fecha est? fuera del rango min/max

  /**
   * Filtra un array de fechas removiendo las deshabilitadas
   * (tanto por disabledDates como por min/max)
   */
  private filterDisabledDates(dates: Date[]): Date[] {
    const disabledDates = this.disabledDates()
      ? this.disabledDates()!
          .map(d => this.calendarService.convertToDate(d))
          .filter(d => d !== null)
      : [];

    return dates.filter(date => {
      // Verificar si está deshabilitado por disabledDates
      if (
        disabledDates.length > 0 &&
        this.calendarService.isDateDisabled(date, disabledDates as Date[])
      ) {
        return false;
      }

      // Verificar si está fuera del rango min/max
      if (this.minDate()) {
        const minDateObj = this.parseDate(this.minDate());
        if (this.calendarService.dateAdapter.isBefore(date, minDateObj)) {
          return false;
        }
      }

      if (this.maxDate()) {
        const maxDateObj = this.parseDate(this.maxDate());
        if (this.calendarService.dateAdapter.isAfter(date, maxDateObj)) {
          return false;
        }
      }

      return true;
    });
  }

  // Ir a hoy
  goToToday(): void {
    const today = new Date();
    this.currentDate.set(today);
    this.viewMode.set(ViewMode.DAY);

    // Si es modo DAY, seleccionar hoy
    if (this.type() === CalendarType.DAY) {
      this.selectedDate.set(today);
      const calendarValue = this.buildCalendarValue(CalendarType.DAY, {
        date: today,
      });
      this.emitSelection(calendarValue);
    }
  }

  // Aplicar preset de rango
  applyPreset(preset: DateRangePreset): void {
    if (this.type() !== CalendarType.RANGE) return;

    const range = preset.getValue();
    this.selectedRange.set({ start: range.start, end: range.end });
    this.currentDate.set(range.start);
    this.viewMode.set(ViewMode.DAY);
    const calendarValue = this.buildCalendarValue(CalendarType.RANGE, {
      range,
    });
    this.emitSelection(calendarValue);

    // Si el calendario está abierto, verificar si se debe cerrar automáticamente
    this.checkAutoClose();

    this.activeTab.set('calendar');
  }

  // Toggle visibilidad de presets
  togglePresets(): void {
    this.presetsVisible.update(visible => !visible);
  }

  // Toggle visibilidad del time picker
  toggleTimePicker(): void {
    this.timePickerVisible.update(visible => !visible);
  }

  /**
   * Cambia la pesta?a activa en el sistema de tabs
   */
  onTabChange(tab: CalendarTabType): void {
    this.activeTab.set(tab as CalendarTabType);
  }

  // Toggle entre hora de inicio/fin en modo 'both'
  setShowingEndTime(value: boolean): void {
    this.showingEndTime.set(value);
  }

  /**
   * Handler para el ButtonGroup de Start/End time picker
   */
  onTimePickerToggleChange(value: string): void {
    this.setShowingEndTime(value === 'end');
  }

  // Manejar cambio de hora del time picker
  onTimeChange(time: TimeValue | null, isEndTime: boolean = false): void {
    if (isEndTime) {
      this.selectedEndTime.set(time);
    } else {
      // Para compatibilidad y DAY mode
      this.selectedTime.set(time);
      this.selectedStartTime.set(time);
    }

    // Emitir el nuevo valor completo con el tiempo actualizado
    this.emitCurrentSelection();
  }

  /**
   * Emite la selecci?n actual con el tiempo actualizado.
   * Se usa cuando cambia el tiempo sin cambiar la fecha.
   */
  private emitCurrentSelection(): void {
    const currentType = this.type() as CalendarType;

    // Construir CalendarValue seg?n el tipo actual
    let calendarValue: CalendarValue | null = null;

    // Obtener tiempos seleccionados
    const startTime = this.selectedStartTime() || this.selectedTime();
    const endTime = this.selectedEndTime();

    if (currentType === CalendarType.DAY) {
      // DAY: Verificar si es selecci?n m?ltiple
      if (this.selection() === CalendarSelection.MULTIPLE) {
        const selectedDates = this.selectedDates();
        if (selectedDates.length > 0) {
          calendarValue = {
            type: CalendarType.DAY,
            dates: selectedDates,
            time: startTime || undefined,
          } as CalendarValue;
        }
      } else {
        const selectedDate = this.selectedDate();
        if (selectedDate) {
          calendarValue = {
            type: CalendarType.DAY,
            date: selectedDate,
            time: startTime || undefined,
          } as CalendarValue;
        }
      }
    } else if (currentType === CalendarType.WEEK) {
      const selectedWeek = this.selectedWeek();
      if (selectedWeek) {
        const weekDates = this.calendarService.dateAdapter.getDateRange(
          selectedWeek.start,
          selectedWeek.end
        );
        const filteredDates = this.filterDisabledDates(weekDates);

        calendarValue = {
          type: CalendarType.WEEK,
          dates: filteredDates,
          week: { start: selectedWeek.start, end: selectedWeek.end },
          time:
            startTime || endTime
              ? { start: startTime || endTime!, end: endTime || startTime! }
              : undefined,
        };
      }
    } else if (currentType === CalendarType.RANGE) {
      const range = this.selectedRange();
      if (range.start && range.end) {
        const rangeDates = this.calendarService.dateAdapter.getDateRange(range.start, range.end);
        const filteredDates = this.filterDisabledDates(rangeDates);

        calendarValue = {
          type: CalendarType.RANGE,
          dates: filteredDates,
          range: { start: range.start, end: range.end },
          time:
            startTime || endTime
              ? { start: startTime || endTime!, end: endTime || startTime! }
              : undefined,
        };
      }
    } else if (currentType === CalendarType.MONTH) {
      // MONTH: Verificar si es selecci?n m?ltiple
      if (this.selection() === CalendarSelection.MULTIPLE) {
        const selectedMonths = this.selectedMonths();
        if (selectedMonths.length > 0) {
          // Convertir cada { month, year } a Date
          const dates = selectedMonths.map(
            (m) => new Date(m.year, m.month, 1)
          );
          calendarValue = {
            type: CalendarType.MONTH,
            dates,
            months: selectedMonths,
          } as CalendarValue;
        }
      } else {
        const selectedMonth = this.selectedMonth();
        if (selectedMonth) {
          const monthDate = new Date(selectedMonth.year, selectedMonth.month, 1);
          calendarValue = {
            type: CalendarType.MONTH,
            date: monthDate,
            month: selectedMonth,
          } as CalendarValue;
        }
      }
    } else if (currentType === CalendarType.YEAR) {
      // YEAR: Verificar si es selecci?n m?ltiple
      if (this.selection() === CalendarSelection.MULTIPLE) {
        const selectedYears = this.selectedYears();
        if (selectedYears.length > 0) {
          // Convertir cada year a Date
          const dates = selectedYears.map((y) => new Date(y, 0, 1));
          calendarValue = {
            type: CalendarType.YEAR,
            dates,
            years: selectedYears,
          } as CalendarValue;
        }
      } else {
        const selectedYear = this.selectedYear();
        if (selectedYear !== null) {
          const yearDate = new Date(selectedYear, 0, 1);
          calendarValue = {
            type: CalendarType.YEAR,
            date: yearDate,
            year: selectedYear,
          } as CalendarValue;
        }
      }
    }

    // Si hay una selecci?n v?lida, emitirla
    if (calendarValue) {
      this.emitSelection(calendarValue);
    }
  }

  // Combinar Date + TimeValue (m?todo helper p?blico para el usuario)
  combineDateAndTime(date: Date, time: TimeValue | null): Date {
    const result = new Date(date);

    // Si hay hora, la a?adimos
    if (time) {
      let hour = time.hour;

      // Convertir de 12h a 24h si es necesario
      if (time.period) {
        if (time.period === 'PM' && hour !== 12) {
          hour += 12;
        } else if (time.period === 'AM' && hour === 12) {
          hour = 0;
        }
      }

      result.setHours(hour, time.minute, 0, 0);
    }

    return result;
  }

  onDayClick(day: CalendarDay): void {
    if (day.isDisabled) return;

    // Si el d?a seleccionado es de otro mes, navegar a ese mes
    if (!day.isCurrentMonth) {
      this.currentDate.set(day.date);
    }

    if (this.type() === CalendarType.DAY) {
      if (this.selection() === CalendarSelection.MULTIPLE) {
        // Selección múltiple: toggle fecha
        this.handleMultipleDaySelection(day.date);
      } else {
        // Selección simple
        this.selectedDate.set(day.date);
        const calendarValue = this.buildCalendarValue(CalendarType.DAY, {
          date: day.date,
        });
        this.emitSelection(calendarValue);
      }
    } else if (this.type() === CalendarType.WEEK) {
      const week = this.calendarService.getWeekRange(day.date, this.firstDayOfWeek());
      this.selectedWeek.set(week);
      const calendarValue = this.buildCalendarValue(CalendarType.WEEK, {
        week,
      });
      this.emitSelection(calendarValue);
    } else if (this.type() === CalendarType.RANGE) {
      this.handleRangeSelection(day.date);
    }

    // Si el calendario está abierto, verificar si se debe cerrar automáticamente
    this.checkAutoClose();
  }

  private handleMultipleDaySelection(date: Date): void {
    const currentDates = this.selectedDates();
    const dateIndex = currentDates.findIndex(d =>
      this.calendarService.isSameDay(d, date)
    );

    let newDates: Date[];
    if (dateIndex >= 0) {
      // Si la fecha ya est? seleccionada, deseleccionarla
      newDates = currentDates.filter((_, i) => i !== dateIndex);
    } else {
      // Si no est? seleccionada, agregarla
      newDates = [...currentDates, date];
    }

    this.selectedDates.set(newDates);

    // Emitir el valor actualizado
    const calendarValue = this.buildCalendarValue(CalendarType.DAY, {
      dates: newDates,
    });
    this.emitSelection(calendarValue);
  }

  private handleRangeSelection(date: Date): void {
    const range = this.selectedRange();

    if (!range.start || (range.start && range.end)) {
      this.selectedRange.set({ start: date, end: null });
    } else {
      const [start, end] = range.start < date ? [range.start, date] : [date, range.start];
      this.selectedRange.set({ start, end });
      const calendarValue = this.buildCalendarValue(CalendarType.RANGE, {
        range: { start, end },
      });
      this.emitSelection(calendarValue);
    }
  }

  onDayHover(day: CalendarDay): void {
    if (this.type() === CalendarType.RANGE) {
      this.hoveredDate.set(day.date);
    }
  }

  onDayHoverEnd(): void {
    this.hoveredDate.set(null);
  }

  previousMonth(): void {
    this.currentDate.set(this.calendarService.previousMonth(this.currentDate()));
  }

  nextMonth(): void {
    this.currentDate.set(this.calendarService.nextMonth(this.currentDate()));
  }

  previousYear(): void {
    this.currentDate.set(this.calendarService.previousYear(this.currentDate()));
  }

  nextYear(): void {
    this.currentDate.set(this.calendarService.nextYear(this.currentDate()));
  }

  /**
   * Maneja la navegaci?n hacia atr?s seg?n la vista actual
   */
  handlePreviousNavigation(): void {
    const viewMode = this.viewMode();
    if (viewMode === ViewMode.YEAR) {
      this.previousYearBlock();
    } else if (viewMode === ViewMode.MONTH) {
      this.previousYear();
    } else {
      this.previousMonth();
    }
  }

  /**
   * Maneja la navegaci?n hacia adelante seg?n la vista actual
   */
  handleNextNavigation(): void {
    const viewMode = this.viewMode();
    if (viewMode === ViewMode.YEAR) {
      this.nextYearBlock();
    } else if (viewMode === ViewMode.MONTH) {
      this.nextYear();
    } else {
      this.nextMonth();
    }
  }

  // Saltar al bloque anterior de COUNT_BLOCK_YEARS a?os
  private previousYearBlock(): void {
    const currentYear = this.displayedYear();
    // Retroceder COUNT_BLOCK_YEARS a?os para mostrar el bloque anterior completo
    const newYear = currentYear - COUNT_BLOCK_YEARS;
    const newDate = this.calendarService.setYear(this.currentDate(), newYear);
    this.currentDate.set(newDate);
  }

  // Saltar al bloque siguiente de COUNT_BLOCK_YEARS a?os
  private nextYearBlock(): void {
    const currentYear = this.displayedYear();
    // Avanzar COUNT_BLOCK_YEARS a?os para mostrar el bloque siguiente completo
    const newYear = currentYear + COUNT_BLOCK_YEARS;
    const newDate = this.calendarService.setYear(this.currentDate(), newYear);
    this.currentDate.set(newDate);
  }

  switchToYearView(): void {
    this.previousViewDate.set(new Date(this.currentDate()));
    this.selectedYear.set(this.displayedYear());
    this.viewMode.set(ViewMode.YEAR);
  }

  switchToMonthView(): void {
    this.previousViewDate.set(new Date(this.currentDate()));
    this.viewMode.set(ViewMode.MONTH);
    this.selectedYear.set(null);
  }

  switchToDayView(): void {
    this.previousViewDate.set(null); // Limpiar estado previo
    this.viewMode.set(ViewMode.DAY);
  }

  selectYear(year: number): void {
    // No permitir seleccionar años deshabilitados
    if (this.isYearDisabled(year)) {
      return;
    }

    const newDate = this.calendarService.setYear(this.currentDate(), year);
    this.currentDate.set(newDate);

    // Si el tipo es YEAR, emitir el valor y cerrar
    if (this.type() === CalendarType.YEAR) {
      if (this.selection() === CalendarSelection.MULTIPLE) {
        // Selección múltiple: toggle año
        const currentYears = this.selectedYears();
        const yearIndex = currentYears.indexOf(year);
        
        let newYears: number[];
        if (yearIndex >= 0) {
          // Deseleccionar
          newYears = currentYears.filter((_, i) => i !== yearIndex);
        } else {
          // Seleccionar
          newYears = [...currentYears, year];
        }
        
        this.selectedYears.set(newYears);
        const yearDates = newYears.map(y => new Date(y, 0, 1));
        const calendarValue = this.buildCalendarValue(CalendarType.YEAR, {
          years: newYears,
          dates: yearDates,
        });
        this.emitSelection(calendarValue);
        this.checkAutoClose();
      } else {
        // Selección simple
        this.selectedYear.set(year);
        const yearDate = new Date(year, 0, 1);
        const calendarValue = this.buildCalendarValue(CalendarType.YEAR, {
          year,
          date: yearDate,
        });
        this.emitSelection(calendarValue);
        this.checkAutoClose();
      }
    } else {
      // Navegación normal: cambiar a vista de mes
      this.selectedYear.set(year);
      this.switchToMonthView();
    }
  }

  selectMonth(monthIndex: number): void {
    // No permitir seleccionar meses deshabilitados
    if (this.isMonthDisabled(monthIndex)) {
      return;
    }

    const newDate = this.calendarService.setMonth(this.currentDate(), monthIndex);
    this.currentDate.set(newDate);

    // Si el tipo es MONTH, emitir el valor y cerrar
    if (this.type() === CalendarType.MONTH) {
      const year = this.displayedYear();
      
      if (this.selection() === CalendarSelection.MULTIPLE) {
        // Selección múltiple: toggle mes
        const currentMonths = this.selectedMonths();
        const monthValue = { month: monthIndex, year };
        const monthIndex_ = currentMonths.findIndex(
          m => m.month === monthIndex && m.year === year
        );
        
        let newMonths: Array<{ month: number; year: number }>;
        if (monthIndex_ >= 0) {
          // Deseleccionar
          newMonths = currentMonths.filter((_, i) => i !== monthIndex_);
        } else {
          // Seleccionar
          newMonths = [...currentMonths, monthValue];
        }
        
        this.selectedMonths.set(newMonths);
        const monthDates = newMonths.map(m => new Date(m.year, m.month, 1));
        const calendarValue = this.buildCalendarValue(CalendarType.MONTH, {
          months: newMonths,
          dates: monthDates,
        });
        this.emitSelection(calendarValue);
        this.checkAutoClose();
      } else {
        // Selección simple
        const monthDate = new Date(year, monthIndex, 1);
        this.selectedMonth.set({ month: monthIndex, year });
        const calendarValue = this.buildCalendarValue(CalendarType.MONTH, {
          month: { month: monthIndex, year },
          date: monthDate,
        });
        this.emitSelection(calendarValue);
        this.checkAutoClose();
      }
    } else {
      // Navegación normal: cambiar a vista de día
      this.switchToDayView();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;

    // Verificar si debemos manejar este evento
    if (!this.keyboardNavService.shouldHandleKeyEvent(event, target)) {
      return;
    }

    // ?? SHORTCUTS GLOBALES (funcionan en todas las vistas)
    const key = event.key.toLowerCase();

    // T = Today (Ir a hoy)
    if (key === 't') {
      event.preventDefault();
      this.goToToday();
      return;
    }

    // H = Home (Primer d?a del mes en vista DAY)
    if (key === 'h' && this.viewMode() === ViewMode.DAY) {
      event.preventDefault();
      const firstDay = this.calendarService.dateAdapter.startOfMonth(this.currentDate());
      this.currentDate.set(firstDay);
      this.focusedDayIndex.set(0);
      return;
    }

    // E = End (?ltimo d?a del mes en vista DAY)
    if (key === 'e' && this.viewMode() === ViewMode.DAY) {
      event.preventDefault();
      const lastDay = this.calendarService.dateAdapter.endOfMonth(this.currentDate());
      this.currentDate.set(lastDay);
      const days = this.calendarDays();
      const lastDayIndex = days.findIndex(
        d => d.isCurrentMonth && d.dayNumber === lastDay.getDate()
      );
      if (lastDayIndex >= 0) {
        this.focusedDayIndex.set(lastDayIndex);
      }
      return;
    }

    // PageUp = Mes anterior
    if (event.key === 'PageUp') {
      event.preventDefault();
      if (this.canNavigateBack()) {
        this.previousMonth();
      }
      return;
    }

    // PageDown = Mes siguiente
    if (event.key === 'PageDown') {
      event.preventDefault();
      if (this.canNavigateForward()) {
        this.nextMonth();
      }
      return;
    }

    // Alt + ArrowLeft = A?o anterior
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault();
      if (this.canNavigateBack()) {
        const newDate = this.calendarService.dateAdapter.subtractYears(this.currentDate(), 1);
        this.currentDate.set(newDate);
      }
      return;
    }

    // Alt + ArrowRight = A?o siguiente
    if (event.altKey && event.key === 'ArrowRight') {
      event.preventDefault();
      if (this.canNavigateForward()) {
        const newDate = new Date(this.currentDate());
        newDate.setFullYear(newDate.getFullYear() + 1);
        this.currentDate.set(newDate);
      }
      return;
    }

    const viewMode = this.viewMode();

    // Delegar navegaci?n seg?n la vista
    switch (viewMode) {
      case ViewMode.DAY:
        this.handleDayNavigation(event);
        break;
      case ViewMode.MONTH:
        this.handleMonthNavigation(event);
        break;
      case ViewMode.YEAR:
        this.handleYearNavigation(event);
        break;
    }
  }

  protected getDayAriaLabel(day: CalendarDay): string {
    const baseLabel = this.formatDayLabel(day);

    if (day.isDisabled) {
      return this._translations.calendar.dayDisabled.replace('{date}', baseLabel);
      // Resultado: "Deshabilitado: jueves, 9 octubre 2025"
    }

    return baseLabel;
  }

  protected formatDayLabel(day: CalendarDay): string {
    const dayOfWeek = this.calendarService.dateAdapter.getDayOfWeek(day.date); // 0 = Domingo, 1 = Lunes, etc.
    const dayNumber = this.calendarService.dateAdapter.format(day.date, 'd'); // D?a del mes sin cero inicial
    const monthIndex = parseInt(this.calendarService.dateAdapter.format(day.date, 'M'), 10) - 1; // 0-11
    const year = this.calendarService.dateAdapter.format(day.date, 'yyyy');

    // Usamos `firstDayOfWeek` para ajustar el ?ndice del d?a
    const dayIndex = (this.firstDayOfWeek() + dayOfWeek) % 7;
    // Ejemplo: si firstDayOfWeek=1 (Lunes) y dayOfWeek=0 (Domingo), dayIndex=1
    // Esto asegura que el primer d?a de la semana sea el correcto seg?n la configuraci?n del usuario

    const dayName = this._translations.calendar.weekDays[dayIndex].toLowerCase();
    const monthName = this._translations.calendar.months[monthIndex].toLowerCase();

    return `${dayName}, ${dayNumber} ${monthName} ${year}`;
  }

  private handleDayNavigation(event: KeyboardEvent): void {
    const days = this.calendarDays();
    let currentIndex = this.focusedDayIndex();

    // Inicializar ?ndice si no est? establecido
    if (currentIndex === -1) {
      currentIndex = this.findInitialDayIndex(days);
      this.focusedDayIndex.set(currentIndex);
    }

    // Manejar selecci?n
    if (this.keyboardNavService.isSelectionKey(event.key)) {
      event.preventDefault();
      if (currentIndex >= 0 && currentIndex < days.length) {
        this.onDayClick(days[currentIndex]);
      }
      return;
    }

    // Calcular nueva posici?n
    const result = this.keyboardNavService.calculateDayNavigationIndex(
      event,
      currentIndex,
      days.length
    );

    if (result.shouldChangeMonth) {
      // Cambiar de mes
      if (result.direction === 'prev') {
        this.previousMonth();
        this.focusedDayIndex.set(this.calendarDays().length - 1);
      } else {
        this.nextMonth();
        this.focusedDayIndex.set(result.newIndex);
      }
    } else {
      this.focusedDayIndex.set(result.newIndex);
      this.focusDayButton(result.newIndex);
    }
  }

  /**
   * Encuentra el ?ndice inicial del d?a a enfocar
   */
  private findInitialDayIndex(days: CalendarDay[]): number {
    const todayIndex = days.findIndex(d => d.isToday);
    return todayIndex !== -1 ? todayIndex : days.findIndex(d => d.isCurrentMonth);
  }

  private handleMonthNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    // Usar data attribute en lugar de clase CSS
    const currentMonth = target.closest('[data-calendar-item="month"]');
    if (!currentMonth) return;

    // Usar data attribute para obtener el contenedor
    const allMonths = Array.from(
      target
        .closest('[data-calendar-view="months"]')
        ?.querySelectorAll('[data-calendar-item="month"]') || []
    ) as HTMLElement[];

    const currentIndex = allMonths.indexOf(currentMonth as HTMLElement);
    if (currentIndex === -1) return;

    // Manejar cancelaci?n
    if (this.keyboardNavService.isCancelKey(event.key)) {
      event.preventDefault();
      this.cancelAndReturnToPreviousView();
      return;
    }

    // Manejar selecci?n
    if (this.keyboardNavService.isSelectionKey(event.key)) {
      event.preventDefault();
      this.selectMonth(currentIndex);
      return;
    }

    // Calcular nueva posici?n
    const newIndex = this.keyboardNavService.calculateMonthNavigationIndex(event, currentIndex);

    if (newIndex !== null && newIndex !== currentIndex && allMonths[newIndex]) {
      allMonths[newIndex].focus();
    }
  }

  private handleYearNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    // Usar data attribute en lugar de clase CSS
    const currentYear = target.closest('[data-calendar-item="year"]');
    if (!currentYear) return;

    // Usar data attribute para obtener el contenedor
    const allYears = Array.from(
      target
        .closest('[data-calendar-view="years"]')
        ?.querySelectorAll('[data-calendar-item="year"]') || []
    ) as HTMLElement[];

    const currentIndex = allYears.indexOf(currentYear as HTMLElement);
    if (currentIndex === -1) return;

    // Manejar cancelaci?n
    if (this.keyboardNavService.isCancelKey(event.key)) {
      event.preventDefault();
      this.cancelAndReturnToPreviousView();
      return;
    }

    // Manejar selecci?n
    if (this.keyboardNavService.isSelectionKey(event.key)) {
      event.preventDefault();
      const yearValue = parseInt(currentYear.textContent?.trim() || '0', 10);
      if (yearValue) {
        this.selectYear(yearValue);
      }
      return;
    }

    // Calcular nueva posici?n
    const result = this.keyboardNavService.calculateYearNavigationIndex(event, currentIndex);

    if (result.shouldChangeBlock) {
      // Cambiar bloque de a?os
      if (result.direction === 'prev') {
        this.previousYearBlock();
      } else {
        this.nextYearBlock();
      }
      // Guardar ?ndice para hacer focus despu?s del cambio
      this.focusedDayIndex.set(result.newIndex);
    } else if (result.newIndex !== currentIndex && allYears[result.newIndex]) {
      allYears[result.newIndex].focus();
    }
  }

  private focusDayButton(index: number): void {
    const buttons = this.dayButtons();
    if (buttons[index]) {
      buttons[index].nativeElement.focus();
    }
  }

  private focusInitialDay(): void {
    const days = this.calendarDays();
    let indexToFocus = -1;

    // 1. Prioridad: D?a seleccionado del tipo actual
    if (this.type() === CalendarType.DAY && this.selectedDate()) {
      indexToFocus = days.findIndex(d =>
        this.calendarService.isSameDay(d.date, this.selectedDate()!)
      );
    } else if (this.type() === CalendarType.WEEK && this.selectedWeek()) {
      // Para WEEK, enfocar el primer d?a de la semana seleccionada
      indexToFocus = days.findIndex(d =>
        this.calendarService.isSameDay(d.date, this.selectedWeek()!.start)
      );
    } else if (this.type() === CalendarType.RANGE) {
      const range = this.selectedRange();
      if (range.start) {
        // Para RANGE, enfocar el d?a de inicio del rango
        indexToFocus = days.findIndex(d => this.calendarService.isSameDay(d.date, range.start!));
      }
    }

    // 2. Fallback: D?a de hoy si est? visible
    if (indexToFocus === -1) {
      indexToFocus = days.findIndex(d => d.isToday);
    }

    // 3. ?ltimo fallback: Primer d?a del mes actual
    if (indexToFocus === -1) {
      indexToFocus = days.findIndex(d => d.isCurrentMonth);
    }

    // Hacer focus en el d?a encontrado
    if (indexToFocus !== -1) {
      this.focusedDayIndex.set(indexToFocus);
      this.focusDayButton(indexToFocus);
    }
  }

  private focusCurrentMonth(): void {
    const currentMonthIndex = this.displayedMonthIndex();
    const buttons = this.monthButtons();
    if (buttons[currentMonthIndex]) {
      buttons[currentMonthIndex].nativeElement.focus();
    }
  }

  private focusCurrentYear(): void {
    const buttons = this.yearButtons();

    // Si hay un ?ndice guardado (por ejemplo, despu?s de cambiar bloque), usarlo
    const focusedIndex = this.focusedDayIndex();
    if (focusedIndex >= 0 && focusedIndex < buttons.length) {
      buttons[focusedIndex].nativeElement.focus();
      this.focusedDayIndex.set(-1); // Resetear
      return;
    }

    // Si no, hacer focus en el a?o seleccionado (no en displayedYear)
    const selectedYear = this.selectedYear();
    if (selectedYear !== null) {
      const yearsList = this.years();
      const selectedYearIndex = yearsList.indexOf(selectedYear);

      if (selectedYearIndex !== -1 && buttons[selectedYearIndex]) {
        buttons[selectedYearIndex].nativeElement.focus();
        return;
      }
    }

    // Fallback: hacer focus en el a?o actual (displayedYear)
    const currentYear = this.displayedYear();
    const yearsList = this.years();
    const currentYearIndex = yearsList.indexOf(currentYear);

    if (currentYearIndex !== -1 && buttons[currentYearIndex]) {
      buttons[currentYearIndex].nativeElement.focus();
    }
  }

  private cancelAndReturnToPreviousView(): void {
    const previousDate = this.previousViewDate();

    if (previousDate) {
      // Restaurar la fecha anterior (cancelar cambios)
      this.currentDate.set(new Date(previousDate));

      // Volver a la vista de d?as
      this.switchToDayView();
    }
  }

  private emitSelection(calendarValue: CalendarValue): void {
    // ------------------------------------------------------------------------------
    // EMITIR VALORES
    // ------------------------------------------------------------------------------

    // 1. Emitir evento valueChange (CalendarValue completo - para uso avanzado)
    this.valueChange.emit(calendarValue);

    // 2. Notificar a ngModel / FormControl (valor simplificado - para formularios reactivos)
    // Se emite un formato más simple según el tipo para facilitar el uso con FormControl
    let formValue: Date | Date[] | null = null;

    switch (calendarValue.type) {
      case CalendarType.DAY:
        // DAY: single o multiple
        if ('dates' in calendarValue && calendarValue.dates) {
          formValue = calendarValue.dates;
        } else if ('date' in calendarValue && calendarValue.date) {
          formValue = calendarValue.date;
        }
        break;

      case CalendarType.WEEK:
        formValue = calendarValue.dates;
        break;

      case CalendarType.RANGE:
        if (calendarValue.range.start && calendarValue.range.end) {
          formValue = [calendarValue.range.start, calendarValue.range.end];
        } else if (calendarValue.range.start) {
          formValue = [calendarValue.range.start];
        }
        break;

      case CalendarType.MONTH:
        // MONTH: single o multiple
        if ('dates' in calendarValue && calendarValue.dates) {
          formValue = calendarValue.dates;
        } else if ('date' in calendarValue && calendarValue.date) {
          formValue = calendarValue.date;
        }
        break;

      case CalendarType.YEAR:
        // YEAR: single o multiple
        if ('dates' in calendarValue && calendarValue.dates) {
          formValue = calendarValue.dates;
        } else if ('date' in calendarValue && calendarValue.date) {
          formValue = calendarValue.date;
        }
        break;
    }

    this.onChange(formValue);
    this.onTouched();
  }

  /**
   * Construye un CalendarValue a partir de los datos seleccionados
   */
  private buildCalendarValue(
    type: CalendarType,
    data: {
      date?: Date;
      dates?: Date[];
      week?: WeekRange;
      range?: { start: Date; end: Date };
      month?: { month: number; year: number };
      months?: Array<{ month: number; year: number }>;
      year?: number;
      years?: number[];
    }
  ): CalendarValue {
    const startTime = this.selectedStartTime() || this.selectedTime();
    const endTime = this.selectedEndTime();

    // DAY - Selección simple
    if (type === CalendarType.DAY && data.date) {
      return {
        type: CalendarType.DAY,
        date: data.date,
        time: startTime || undefined,
      } as CalendarValue;
    }
    
    // DAY - Selección múltiple
    if (type === CalendarType.DAY && data.dates) {
      return {
        type: CalendarType.DAY,
        dates: data.dates,
        time: startTime || undefined,
      } as CalendarValue;
    }
    
    // WEEK
    if (type === CalendarType.WEEK && data.week) {
      const weekDates = this.calendarService.dateAdapter.getDateRange(
        data.week.start,
        data.week.end
      );
      const filteredDates = this.filterDisabledDates(weekDates);

      return {
        type: CalendarType.WEEK,
        dates: filteredDates,
        week: { start: data.week.start, end: data.week.end },
        time:
          startTime || endTime
            ? { start: startTime || endTime!, end: endTime || startTime! }
            : undefined,
      };
    }
    
    // RANGE
    if (type === CalendarType.RANGE && data.range) {
      const rangeDates = this.calendarService.dateAdapter.getDateRange(
        data.range.start,
        data.range.end
      );
      const filteredDates = this.filterDisabledDates(rangeDates);

      return {
        type: CalendarType.RANGE,
        dates: filteredDates,
        range: { start: data.range.start, end: data.range.end },
        time:
          startTime || endTime
            ? { start: startTime || endTime!, end: endTime || startTime! }
            : undefined,
      };
    }
    
    // MONTH - Selección simple
    if (type === CalendarType.MONTH && data.month && data.date) {
      return {
        type: CalendarType.MONTH,
        date: data.date,
        month: data.month,
      } as CalendarValue;
    }
    
    // MONTH - Selección múltiple
    if (type === CalendarType.MONTH && data.months && data.dates) {
      return {
        type: CalendarType.MONTH,
        dates: data.dates,
        months: data.months,
      } as CalendarValue;
    }
    
    // YEAR - Selección simple
    if (type === CalendarType.YEAR && data.year !== undefined && data.date) {
      return {
        type: CalendarType.YEAR,
        date: data.date,
        year: data.year,
      } as CalendarValue;
    }
    
    // YEAR - Selección múltiple
    if (type === CalendarType.YEAR && data.years && data.dates) {
      return {
        type: CalendarType.YEAR,
        dates: data.dates,
        years: data.years,
      } as CalendarValue;
    }

    throw new Error(`Invalid calendar type or missing data for type: ${type}`);
  }

  /**
   * Verifica si se debe emitir el evento de cierre automático
   * basado en la configuración y el estado actual de selección.
   */
  private checkAutoClose(): void {
    // 1. Si la funcionalidad está desactivada, no hacemos nada
    if (!this.closeOnSelect()) {
      return;
    }

    // 2. Si está en modo de selección múltiple, nunca cerrar automáticamente
    //    (el usuario quiere seguir seleccionando)
    if (this.selection() === CalendarSelection.MULTIPLE) {
      return;
    }

    const currentType = this.type();

    // 3. Evaluamos según el tipo de selección (solo en modo single)
    let shouldClose = false;

    switch (currentType) {
      case CalendarType.DAY:
        // En modo día, cualquier selección válida dispara el cierre
        shouldClose = !!this.selectedDate();
        break;

      case CalendarType.RANGE:
        // En modo rango, solo cerramos cuando el intervalo está completo
        const range = this.selectedRange();
        shouldClose = !!(range.start && range.end);
        break;

      case CalendarType.WEEK:
        // En modo semana, se cierra al seleccionar la semana
        shouldClose = !!this.selectedWeek();
        break;

      case CalendarType.MONTH:
        // En modo mes, se cierra al seleccionar el mes
        shouldClose = !!this.selectedMonth();
        break;

      case CalendarType.YEAR:
        // En modo año, se cierra al seleccionar el año
        shouldClose = !!this.selectedYear();
        break;
    }

    // 4. Si se cumple la condición, emitimos el output semántico
    if (shouldClose) {
      // Este es el evento que el Popover/Modal escuchará para cerrarse
      this.selectFinished.emit();
    }
  }
}
