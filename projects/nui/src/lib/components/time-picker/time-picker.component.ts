import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  input,
  ChangeDetectionStrategy,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import {
  TimePickerMode,
  TimePickerConfig,
  ResolvedTimePickerConfig,
  TimeValue,
  DurationValue,
  TimePeriod,
  TimePickerValue,
  TimePeriodEnum,
  TimePickerSection,
  TimePreset,
  DEFAULT_CONFIG,
  DEFAULT_DURATION_CONFIG,
  TimePickerStrategy,
  TimePickerStrategyEnum,
  TimePickerModeEnum,
} from './models/time-picker.model';
import { ButtonGroupComponent } from '../button-group';
import type { BtnGroupOption } from '../button-group/models/button-group.model';
import { NUI_TRANSLATIONS } from '../../translations';

@Component({
  selector: 'nui-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonGroupComponent],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  // ==================
  // INPUTS
  // ==================
  mode = input<TimePickerMode>('HOUR_MINUTE_24');
  disabled = input<boolean>(false);
  title = input<string>('');
  showHeader = input<boolean>(true);

  // Internal disabled state from form (ControlValueAccessor)
  private _disabledByForm = signal<boolean>(false);

  // Combined disabled state (input or form)
  isDisabled = computed(() => this.disabled() || this._disabledByForm());

  @Input() set config(value: TimePickerConfig) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...value };

    // Si es modo DURATION y no se proporcionó config de duration, usar valores por defecto razonables
    if (!value.duration) {
      mergedConfig.duration = {
        ...DEFAULT_DURATION_CONFIG,
        maxHours: 12, // 0-12 horas por defecto
        minHours: 0,
        allowZero: true,
        showSeconds: false,
      };
    } else {
      // Merge con defaults si se proporcionó duration parcial
      mergedConfig.duration = {
        ...DEFAULT_DURATION_CONFIG,
        ...value.duration,
      };
    }

    this._config = mergedConfig;
  }

  private _config: ResolvedTimePickerConfig = DEFAULT_CONFIG;

  get config(): ResolvedTimePickerConfig {
    return this._config;
  }

  /**
   * Estrategia de valor por defecto
   * - 'now': Hora actual
   * - 'smart': Hora actual + redondeo + offset
   * - 'empty': Sin valor inicial
   * - 'custom': Usar defaultValue
   */
  defaultStrategy = input<TimePickerStrategy>(TimePickerStrategyEnum.EMPTY);

  /**
   * Valor custom cuando strategy = 'custom'
   */
  defaultValue = input<Date | string | TimeValue | undefined>(undefined);

  /**
   * Offset en minutos para strategy 'smart' (default: 30)
   */
  smartOffset = input<number>(30);

  /**
   * Permite establecer el valor directamente desde el template
   * Acepta: TimeValue, Date, string (HH:mm), o null
   */
  @Input() set value(val: TimePickerValue) {
    this.writeValue(val);
  }
  get value(): TimeValue | null {
    return this.selectedTime();
  }

  // ==================
  // OUTPUT
  // ==================
  /**
   * Emite el valor TimeValue o DurationValue cuando cambia la hora/duración seleccionada
   */
  @Output() valueChange = new EventEmitter<TimeValue | DurationValue | null>();

  // ==================
  // VIEW CHILDREN
  // ==================
  @ViewChild('hoursColumn') hoursColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('minutesColumn') minutesColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('periodColumn') periodColumn?: ElementRef<any>; // ButtonGroup reference
  @ViewChild('durationHoursColumn')
  durationHoursColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('durationMinutesColumn')
  durationMinutesColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('durationSecondsColumn')
  durationSecondsColumn?: ElementRef<HTMLDivElement>;

  protected readonly _translations = inject(NUI_TRANSLATIONS);

  // ==================
  // SIGNALS
  // ==================
  selectedTime = signal<TimeValue | null>(null);
  selectedDuration = signal<DurationValue | null>(null);
  selectedPeriod = signal<TimePeriod | null>(null);
  focusedSection = signal<TimePickerSection | null>(null);

  // Tracking de normalización de strings
  normalizationInfo = signal<{
    original: string;
    normalized: string;
  } | null>(null);

  // Para tracking de valores externos vs defaults
  private hasExternalValue = signal<boolean>(false);

  // Signal para el sistema de tabs (selector/presets)
  activeTab = signal<'selector' | 'presets'>('selector');

  // ==================
  // COMPUTED
  // ==================
  is12HourFormat = computed(() => this.mode().includes('12'));
  showMinutes = computed(() => this.mode().includes('MINUTE'));
  isDurationMode = computed(() => this.mode() === TimePickerModeEnum.DURATION);

  /**
   * Presets efectivos: si hay presets configurados, usarlos; si no, usar preset por defecto de "Ahora"
   */
  effectivePresets = computed<TimePreset[]>(() => {
    const configPresets = this.config.presets || [];

    if (configPresets.length > 0) {
      return configPresets;
    }

    // Presets por defecto si no hay configurados
    if (this.isDurationMode()) {
      // Para modo DURATION, presets comunes de duración
      return [
        {
          label: this._translations.timePicker.presets.minutes.replace('{{value}}', '15'),
          time: { hour: 0, minute: 15 },
        },
        {
          label: this._translations.timePicker.presets.minutes.replace('{{value}}', '30'),
          time: { hour: 0, minute: 30 },
        },
        {
          label: this._translations.timePicker.presets.hour.replace('{{value}}', '1'),
          time: { hour: 1, minute: 0 },
        },
        {
          label: this._translations.timePicker.presets.hours.replace('{{value}}', '2'),
          time: { hour: 2, minute: 0 },
        },
      ];
    } else {
      // Para modo normal, presets de hora
      const now = this.getCurrentTime();
      const midnight: TimeValue = this.is12HourFormat()
        ? { hour: 12, minute: 0, period: TimePeriodEnum.AM }
        : { hour: 0, minute: 0 };
      const noon: TimeValue = this.is12HourFormat()
        ? { hour: 12, minute: 0, period: TimePeriodEnum.PM }
        : { hour: 12, minute: 0 };

      return [
        { label: this._translations.timePicker.presets.now, time: now, icon: 'ri-time-line' },
        { label: this._translations.timePicker.presets.noon, time: noon, icon: 'ri-sun-line' },
        {
          label: this._translations.timePicker.presets.midnight,
          time: midnight,
          icon: 'ri-moon-line',
        },
      ];
    }
  });

  /**
   * Indica si hay presets personalizados (no solo el preset de "Ahora")
   */
  hasCustomPresets = computed(() => {
    return this.config.presets && this.config.presets.length > 0;
  });

  /**
   * Indica si se debe mostrar el sistema de tabs
   */
  shouldShowTabs = computed(() => {
    return this.hasCustomPresets();
  });

  /**
   * Opciones para las pestañas del time picker
   */
  tabOptions = computed<BtnGroupOption[]>(() => {
    const options: BtnGroupOption[] = [
      { label: this._translations.timePicker.tabs.selector, value: 'selector' },
    ];

    if (this.hasCustomPresets()) {
      options.push({
        label: this._translations.timePicker.tabs.presets,
        value: 'presets',
      });
    }

    return options;
  });

  /**
   * Opciones para el ToggleButton de AM/PM
   */
  periodOptions = computed<BtnGroupOption[]>(() => [
    { label: TimePeriodEnum.AM, value: TimePeriodEnum.AM },
    { label: TimePeriodEnum.PM, value: TimePeriodEnum.PM },
  ]);

  /**
   * Detecta si el rango de tiempo cruza la medianoche (rango nocturno)
   * Por ejemplo: minTime=22:00, maxTime=06:00 → rango nocturno
   */
  isMidnightCrossing = computed(() => {
    if (!this.config.minTime || !this.config.maxTime) return false;

    const minHour24 = this.convertTo24Hour(this.config.minTime);
    const maxHour24 = this.convertTo24Hour(this.config.maxTime);

    return minHour24 > maxHour24;
  });

  availableHours = computed(() => {
    const step = this.config.hourStep;
    const hours: number[] = [];

    // Modo Duration: horas desde 0 hasta un límite razonable (ej: 23 horas)
    if (this.isDurationMode()) {
      const maxDurationHours = this.config.maxTime?.hour ?? 23;
      const minDurationHours = this.config.minTime?.hour ?? 0;

      for (let i = minDurationHours; i <= maxDurationHours; i += step) {
        hours.push(i);
      }
      return hours;
    }

    const is12h = this.is12HourFormat();

    if (is12h) {
      // Formato 12h con rango nocturno
      if (this.isMidnightCrossing()) {
        const currentPeriod = this.selectedPeriod();
        const minTime = this.config.minTime!;
        const maxTime = this.config.maxTime!;

        if (currentPeriod === minTime.period) {
          // Período de inicio (ej: PM) - mostrar desde minHour hasta 12
          for (let i = minTime.hour; i <= 12; i += step) {
            if (!this.config.disabledHours.includes(i)) {
              hours.push(i);
            }
          }
        } else if (currentPeriod === maxTime.period) {
          // Período de fin (ej: AM) - mostrar desde 12 hasta maxHour
          for (let i = 12; i >= 1; i -= step) {
            if (i <= maxTime.hour && !this.config.disabledHours.includes(i)) {
              hours.push(i);
            }
          }
          // Ordenar ascendente
          hours.sort((a, b) => a - b);
        }
      } else {
        // Formato 12h normal: mostrar todas (1-12), filtrar después por período
        for (let i = 1; i <= 12; i += step) {
          if (!this.config.disabledHours.includes(i)) {
            hours.push(i);
          }
        }
      }
    } else {
      // Formato 24h
      if (this.isMidnightCrossing()) {
        // Rango nocturno: mostrar desde minHour hasta 23, y desde 0 hasta maxHour
        const minHour = this.config.minTime!.hour;
        const maxHour = this.config.maxTime!.hour;

        // Parte nocturna (minHour hasta 23)
        for (let i = minHour; i <= 23; i += step) {
          if (!this.config.disabledHours.includes(i)) {
            hours.push(i);
          }
        }

        // Parte madrugada (0 hasta maxHour)
        for (let i = 0; i <= maxHour; i += step) {
          if (!this.config.disabledHours.includes(i)) {
            hours.push(i);
          }
        }
      } else {
        // Rango normal del mismo día
        let start = 0;
        let end = 23;

        if (this.config.minTime) {
          start = Math.max(start, this.config.minTime.hour);
        }

        if (this.config.maxTime) {
          end = Math.min(end, this.config.maxTime.hour);
        }

        for (let i = start; i <= end; i += step) {
          if (!this.config.disabledHours.includes(i)) {
            hours.push(i);
          }
        }
      }
    }

    return hours;
  });

  availableMinutes = computed(() => {
    const step = this.config.minuteStep;
    const minutes: number[] = [];
    const selectedTime = this.selectedTime();

    let minMinute = 0;
    let maxMinute = 59;

    // Si hay una hora seleccionada y restricciones de tiempo, aplicarlas
    if (selectedTime && selectedTime.hour !== undefined && selectedTime.hour !== null) {
      const selectedHour24 = this.convertTo24Hour(selectedTime);

      // Aplicar restricción de minTime
      if (this.config.minTime) {
        const minHour24 = this.convertTo24Hour(this.config.minTime);

        // Para rangos nocturnos, validar que estamos en la parte correcta del rango
        if (this.isMidnightCrossing()) {
          const maxHour24 = this.convertTo24Hour(this.config.maxTime!);

          // Si estamos en la parte inicial del rango (antes de medianoche)
          if (selectedHour24 >= minHour24 && selectedHour24 <= 23) {
            if (selectedHour24 === minHour24) {
              minMinute = this.config.minTime.minute || 0;
            }
          }
          // Si estamos en la parte final del rango (después de medianoche)
          else if (selectedHour24 >= 0 && selectedHour24 <= maxHour24) {
            if (selectedHour24 === maxHour24) {
              maxMinute = this.config.maxTime!.minute || 59;
            }
          }
        } else {
          // Rango normal del mismo día
          if (selectedHour24 === minHour24) {
            minMinute = this.config.minTime.minute || 0;
          }
        }
      }

      // Aplicar restricción de maxTime (solo para rangos normales)
      if (this.config.maxTime && !this.isMidnightCrossing()) {
        const maxHour24 = this.convertTo24Hour(this.config.maxTime);

        if (selectedHour24 === maxHour24) {
          maxMinute = this.config.maxTime.minute || 59;
        }
      }
    }

    for (let i = minMinute; i <= maxMinute; i += step) {
      if (!this.config.disabledMinutes.includes(i)) {
        minutes.push(i);
      }
    }

    return minutes;
  });

  formattedTime = computed(() => {
    // Modo Duration: mostrar duración
    if (this.isDurationMode()) {
      const duration = this.selectedDuration();
      if (!duration) return this._translations.timePicker.duration.selectDuration + '<br/>' + '--';

      const parts: string[] = [];

      if (duration.hours > 0) {
        const label =
          duration.hours === 1 ? 'h' : this._translations.timePicker.duration.hoursShort;
        parts.push(`${duration.hours} ${label}`);
      }

      if (duration.minutes > 0) {
        const label =
          duration.minutes === 1 ? 'm' : this._translations.timePicker.duration.minutesShort;
        parts.push(`${duration.minutes} ${label}`);
      }

      if (
        this.config.duration.showSeconds &&
        duration.seconds !== undefined &&
        duration.seconds > 0
      ) {
        const label =
          duration.seconds === 1 ? 's' : this._translations.timePicker.duration.secondsShort;
        parts.push(`${duration.seconds} ${label}`);
      }

      const result =
        parts.length > 0 ? parts.join(', ') : `0 ${this._translations.timePicker.duration.minutes}`;

      return this._translations.timePicker.duration.durationSelected + '<br/>' + result;
    }

    // Modo normal de hora
    const time = this.selectedTime();
    if (!time)
      return this.title() || this._translations.timePicker.selectTime + '<br/>' + '-- : --';

    const { hour, minute, period } = time;

    const is12h = this.is12HourFormat();
    const showMin = this.showMinutes();

    let formatted = `${hour.toString().padStart(2, '0')}`;

    if (showMin) {
      formatted += `:${minute.toString().padStart(2, '0')}`;
    }

    if (is12h && period) {
      formatted += ` ${period}`;
    }

    return this.title() || this._translations.timePicker.timeSelected + '<br/>' + formatted;
  });

  // Computed para horas disponibles en modo DURATION
  availableDurationHours = computed(() => {
    const step = this.config.hourStep;
    const hours: number[] = [];
    const maxHours = this.config.duration.maxHours ?? 23;
    const minHours = this.config.duration.minHours ?? 0;

    for (let i = minHours; i <= maxHours; i += step) {
      hours.push(i);
    }

    return hours;
  });

  // Computed para minutos disponibles en modo DURATION
  availableDurationMinutes = computed(() => {
    const step = this.config.minuteStep;
    const minutes: number[] = [];

    for (let i = 0; i <= 59; i += step) {
      minutes.push(i);
    }

    return minutes;
  });

  // Computed para segundos disponibles en modo DURATION (opcional)
  availableDurationSeconds = computed(() => {
    if (!this.config.duration.showSeconds) return [];

    const step = this.config.duration.secondStep ?? 1;
    const seconds: number[] = [];

    for (let i = 0; i <= 59; i += step) {
      seconds.push(i);
    }

    return seconds;
  });

  // ==================
  // LIFECYCLE HOOKS
  // ==================
  ngOnInit(): void {
    // Inicialización se hace en ngAfterViewInit para asegurar que el DOM esté listo
  }

  ngAfterViewInit(): void {
    // Aplicar estrategia de valor por defecto solo si no hay valor externo
    setTimeout(() => {
      if (
        !this.selectedTime() &&
        !this.hasExternalValue() &&
        this.defaultStrategy() !== TimePickerStrategyEnum.EMPTY
      ) {
        const defaultValue = this.getDefaultValue();
        if (defaultValue) {
          this.applyDefaultValueSilently(defaultValue);
        }
      }

      // Para rangos nocturnos en formato 12H, establecer período inicial inteligente
      // Esto evita mostrar lista de horas vacía al inicio
      if (this.is12HourFormat() && this.isMidnightCrossing() && !this.selectedPeriod()) {
        const initialPeriod = this.getInitialPeriodForMidnightCrossing();
        this.selectedPeriod.set(initialPeriod);
      }
    }, 0);
  }

  // ==================
  // CONTROL VALUE ACCESSOR
  // ==================
  private onChange: (value: TimeValue | DurationValue | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: TimePickerValue): void {
    if (!value) {
      this.selectedTime.set(null);
      this.selectedDuration.set(null);
      this.hasExternalValue.set(false);
      return;
    }

    // Marcar que tenemos un valor externo (no aplicar defaults)
    this.hasExternalValue.set(true);

    // Detectar si es DurationValue (tiene 'hours' en lugar de 'hour')
    if (typeof value === 'object' && 'hours' in value) {
      this.selectedDuration.set(value as DurationValue);
      return;
    }

    // Si es string "HH:mm" o "HH:mm AM/PM"
    if (typeof value === 'string') {
      this.selectedTime.set(this.parseTimeString(value));
    }
    // Si es Date
    else if (value instanceof Date) {
      this.selectedTime.set(this.parseDate(value));
    }
    // Si ya es TimeValue
    else {
      this.selectedTime.set(value);
    }

    // Hacer scroll al valor seleccionado
    this.scheduleScroll();
  }

  registerOnChange(fn: (value: TimeValue | DurationValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByForm.set(isDisabled);
  }

  // ==================
  // MÉTODOS PÚBLICOS
  // ==================
  selectHour(hour: number): void {
    if (this.isDisabled()) return;

    // Limpiar cualquier indicador previo de normalización
    this.normalizationInfo.set(null);

    // Validar que la hora esté disponible en el listado
    if (!this.availableHours().includes(hour)) return;

    const current = this.selectedTime();
    const isFirstSelection = !current;
    const currentPeriod = this.selectedPeriod();

    // Crear tiempo base
    const baseTime = current || {
      hour: this.is12HourFormat() ? 12 : 0,
      minute: 0,
      period: this.is12HourFormat() ? currentPeriod : null,
    };

    const newTime: TimeValue = {
      ...baseTime,
      hour,
    };

    // Solo auto-establecer período si NO hay período seleccionado actualmente
    // (es decir, en primera selección o cuando el usuario no ha elegido AM/PM)
    if (this.is12HourFormat() && !currentPeriod) {
      const defaultPeriod = this.getDefaultPeriodForHour(hour);
      newTime.period = defaultPeriod;
      this.selectedPeriod.set(defaultPeriod);
    } else if (this.is12HourFormat() && currentPeriod) {
      // Mantener el período ya seleccionado por el usuario
      newTime.period = currentPeriod;
    }

    this.updateTime(newTime);

    // Scroll al elemento seleccionado con animación suave
    setTimeout(() => {
      this.scrollToElement(this.hoursColumn, `[data-hour="${hour}"]`, true);
    }, 10);

    // Auto-focus a minutos si está disponible
    if (this.showMinutes()) {
      this.focusedSection.set('minute');
    }
  }

  selectMinute(minute: number): void {
    if (this.isDisabled()) return;

    // Limpiar cualquier indicador previo de normalización
    this.normalizationInfo.set(null);

    // Validar que el minuto esté disponible en el listado
    if (!this.availableMinutes().includes(minute)) return;

    const current = this.selectedTime();
    const currentPeriod = this.selectedPeriod();

    // Crear tiempo base
    const baseTime = current || {
      hour: this.is12HourFormat() ? 12 : 0,
      minute: 0,
      period: this.is12HourFormat() ? currentPeriod : null,
    };

    const newTime: TimeValue = {
      ...baseTime,
      minute,
    };

    // Solo auto-establecer período si NO hay período seleccionado actualmente
    if (this.is12HourFormat() && !currentPeriod) {
      const defaultPeriod = this.getDefaultPeriodForHour(newTime.hour);
      newTime.period = defaultPeriod;
      this.selectedPeriod.set(defaultPeriod);
    } else if (this.is12HourFormat() && currentPeriod) {
      // Mantener el período ya seleccionado por el usuario
      newTime.period = currentPeriod;
    }

    this.updateTime(newTime);
    this.emitSelection(newTime);

    // Scroll al elemento seleccionado con animación suave
    setTimeout(() => {
      this.scrollToElement(this.minutesColumn, `[data-minute="${minute}"]`, true);
    }, 10);
  }

  selectPeriod(period: TimePeriod): void {
    if (this.isDisabled() || !this.is12HourFormat()) return;

    this.selectedPeriod.set(period);

    const current = this.selectedTime();
    if (!current) return;

    const newTime: TimeValue = {
      ...current,
      period,
    };

    this.updateTime(newTime);

    // Scroll al elemento seleccionado con animación suave
    setTimeout(() => {
      this.scrollToElement(this.periodColumn, `[data-period="${period}"]`, true);
    }, 10);
  }

  /**
   * Handler para el ToggleButton de AM/PM
   */
  onPeriodChange(period: TimePeriod): void {
    this.selectPeriod(period);
  }

  /**
   * Obtiene el período inicial inteligente para rangos nocturnos
   * Prioriza el período que tenga más horas disponibles
   */
  private getInitialPeriodForMidnightCrossing(): TimePeriod {
    if (!this.config.minTime || !this.config.maxTime) {
      return TimePeriodEnum.AM;
    }

    const minTime = this.config.minTime;
    const maxTime = this.config.maxTime;

    // Obtener la hora actual para decidir qué período es más relevante
    const now = new Date();
    const currentHour = now.getHours();

    // Convertir tiempos de configuración a 24H
    const minHour24 = this.convertTo24Hour(minTime);
    const maxHour24 = this.convertTo24Hour(maxTime);

    // Si la hora actual está dentro del rango nocturno, usar su período
    if (currentHour >= minHour24 || currentHour <= maxHour24) {
      return currentHour >= 12 ? minTime.period! : maxTime.period!;
    }

    // Si no estamos en el rango, preferir el período con más horas disponibles
    // Típicamente el período de inicio (PM) tendrá menos horas que el de fin (AM)
    // Ejemplo: 10-12 PM (3 horas) vs 12-6 AM (7 horas) → preferir AM
    const minPeriodHours = 12 - minTime.hour + 1; // Horas desde minHour hasta 12
    const maxPeriodHours = maxTime.hour === 12 ? 1 : maxTime.hour + 1; // Horas desde 12 hasta maxHour

    return maxPeriodHours >= minPeriodHours ? maxTime.period! : minTime.period!;
  }

  /**
   * Obtiene el período por defecto (AM/PM) para una hora específica
   * Lógica inteligente basada en la hora actual como referencia
   */
  private getDefaultPeriodForHour(hour: number): TimePeriod {
    if (!this.is12HourFormat()) return TimePeriodEnum.AM; // Safety check

    // Para rangos nocturnos, usar el período actual seleccionado si existe
    if (this.isMidnightCrossing() && this.selectedPeriod()) {
      return this.selectedPeriod()!;
    }

    // Obtener la hora actual como referencia inteligente
    const now = new Date();
    const currentHour = now.getHours();
    const currentHour12 = currentHour % 12 || 12;
    const currentPeriod = currentHour >= 12 ? TimePeriodEnum.PM : TimePeriodEnum.AM;

    // Si el usuario selecciona la misma hora que la actual, usar el período actual
    if (hour === currentHour12) return currentPeriod;

    // Lógica inteligente para otros casos:
    // - Horas típicamente matutinas (6-11): AM
    // - Horas típicamente vespertinas (1-5): PM
    // - 12: depende del contexto (por defecto PM para almuerzo)
    if (hour >= 6 && hour <= 11) {
      return TimePeriodEnum.AM;
    } else if (hour >= 1 && hour <= 5) {
      return TimePeriodEnum.PM;
    } else if (hour === 12) {
      return TimePeriodEnum.PM;
    }

    // Fallback: usar el período de la hora actual como referencia
    return currentPeriod;
  }

  // ====================
  // DURATION METHODS
  // ====================

  selectDurationHours(hours: number): void {
    if (this.isDisabled()) return;

    const current = this.selectedDuration() || { hours: 0, minutes: 0 };
    const newDuration: DurationValue = { ...current, hours };

    this.updateDuration(newDuration);
  }

  selectDurationMinutes(minutes: number): void {
    if (this.isDisabled()) return;

    const current = this.selectedDuration() || { hours: 0, minutes: 0 };
    const newDuration: DurationValue = { ...current, minutes };

    this.updateDuration(newDuration);
  }

  selectDurationSeconds(seconds: number): void {
    if (this.isDisabled()) return;

    const current = this.selectedDuration() || {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    const newDuration: DurationValue = { ...current, seconds };

    this.updateDuration(newDuration);
  }

  private updateDuration(duration: DurationValue): void {
    // Validar que no sea todo ceros si allowZero es false
    if (!this.config.duration.allowZero) {
      const isZero =
        duration.hours === 0 &&
        duration.minutes === 0 &&
        (duration.seconds === undefined || duration.seconds === 0);

      if (isZero) return;
    }

    this.selectedDuration.set(duration);
    this.onChange(duration);
    this.valueChange.emit(duration);
  }

  clear(): void {
    this.selectedTime.set(null);
    this.selectedDuration.set(null);
    this.normalizationInfo.set(null);
    this.onChange(null);
    this.emitSelection(null);
  }

  setToNow(): void {
    const rawTime: TimeValue = this.getCurrentTime();

    const isValidHour = this.availableHours().includes(rawTime.hour);
    const isValidMinute = this.availableMinutes().includes(rawTime.minute);
    const needsNormalization = !isValidHour || !isValidMinute;

    let finalTime: TimeValue;

    if (needsNormalization) {
      finalTime = this.normalizeTimeToAvailableOptions(rawTime);

      // Marcar que fue normalizado
      this.normalizationInfo.set({
        original: this.formatTimeValue(rawTime),
        normalized: this.formatTimeValue(finalTime),
      });
    } else {
      finalTime = rawTime;
    }

    this.selectedTime.set(finalTime);
    this.selectedPeriod.set(finalTime.period || null);
    this.onChange(finalTime);
    this.emitSelection(finalTime);

    this.scheduleScroll();
  }

  /**
   * Cambia la pestaña activa (selector/presets)
   */
  onTabChange(tab: string): void {
    this.activeTab.set(tab as 'selector' | 'presets');
  }

  /**
   * Aplica un preset de hora
   */
  applyPreset(preset: TimePreset): void {
    const time = { ...preset.time };

    // Validar y normalizar si es necesario
    const isValidHour = this.availableHours().includes(time.hour);
    const isValidMinute = this.availableMinutes().includes(time.minute);

    let finalTime: TimeValue;

    if (!isValidHour || !isValidMinute) {
      finalTime = this.normalizeTimeToAvailableOptions(time);

      // Marcar que fue normalizado
      this.normalizationInfo.set({
        original: this.formatTimeValue(time),
        normalized: this.formatTimeValue(finalTime),
      });
    } else {
      finalTime = time;
    }

    this.selectedTime.set(finalTime);
    this.selectedPeriod.set(finalTime.period || null);
    this.onChange(finalTime);
    this.emitSelection(finalTime);

    this.scheduleScroll();

    // Volver a la pestaña del selector después de aplicar el preset
    this.activeTab.set('selector');
  }

  // Método público para convertir TimeValue a Date
  toDate(baseDate: Date = new Date()): Date {
    const time = this.selectedTime();
    if (!time) return baseDate;

    const date = new Date(baseDate);
    let hour = time.hour;

    // Convertir de 12h a 24h si es necesario
    if (this.is12HourFormat() && time.period) {
      if (time.period === TimePeriodEnum.PM && hour !== 12) {
        hour += 12;
      } else if (time.period === TimePeriodEnum.AM && hour === 12) {
        hour = 0;
      }
    }

    date.setHours(hour, time.minute, 0, 0);
    return date;
  }

  // Método público para convertir DurationValue a milisegundos
  toDurationMilliseconds(): number | null {
    const duration = this.selectedDuration();
    if (!duration) return null;

    const hours = duration.hours * 60 * 60 * 1000;
    const minutes = duration.minutes * 60 * 1000;
    const seconds = (duration.seconds ?? 0) * 1000;

    return hours + minutes + seconds;
  }

  // ==================
  // KEYBOARD NAVIGATION & ACCESSIBILITY
  // ==================

  /**
   * Maneja la navegación por teclado con soporte completo de accesibilidad
   */
  onKeyDown(event: KeyboardEvent, section: TimePickerSection): void {
    const key = event.key;

    // Navegación vertical dentro de la columna actual
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();
      const delta = key === 'ArrowUp' ? -1 : 1;
      this.navigateValue(section, delta);
      this.focusCurrentItem(section);
    }
    // Navegación horizontal entre columnas
    else if (key === 'ArrowLeft') {
      event.preventDefault();
      this.focusPrevious(section);
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      this.focusNext(section);
    }
    // Saltar al primer elemento
    else if (key === 'Home') {
      event.preventDefault();
      this.navigateToFirst(section);
      this.focusCurrentItem(section);
    }
    // Saltar al último elemento
    else if (key === 'End') {
      event.preventDefault();
      this.navigateToLast(section);
      this.focusCurrentItem(section);
    }
    // Saltar 5 elementos hacia arriba
    else if (key === 'PageUp') {
      event.preventDefault();
      this.navigateValue(section, -5);
      this.focusCurrentItem(section);
    }
    // Saltar 5 elementos hacia abajo
    else if (key === 'PageDown') {
      event.preventDefault();
      this.navigateValue(section, 5);
      this.focusCurrentItem(section);
    }
    // Seleccionar valor actual
    else if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      // El valor ya está actualizado por navigateValue, solo confirmar
      this.confirmSelection();
    }
    // Escape para limpiar (si es apropiado)
    else if (key === 'Escape') {
      event.preventDefault();
      this.handleEscape();
    }
  }

  /**
   * Maneja el focus inicial cuando se hace clic en una columna
   */
  onColumnFocus(section: TimePickerSection): void {
    this.focusedSection.set(section);

    // Si no hay selección, seleccionar el primer valor disponible
    const current = this.selectedTime();
    if (!current) {
      this.selectFirstAvailableValue(section);
    }

    this.focusCurrentItem(section);
  }

  /**
   * Maneja el focus cuando un item individual recibe el foco (via Tab)
   */
  onItemFocus(section: TimePickerSection, value: number): void {
    this.focusedSection.set(section);
  }

  /**
   * Maneja eventos de teclado en items individuales
   * Esto permite que Enter/Space funcionen correctamente cuando se navega con Tab
   */
  onItemKeyDown(event: KeyboardEvent, section: TimePickerSection, value: number): void {
    const key = event.key;

    // Si presionan Enter o Space en un item individual, seleccionarlo
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      event.stopPropagation(); // Evitar que el evento llegue al contenedor

      // Seleccionar el valor del item que tiene el foco
      switch (section) {
        case 'hour':
          this.selectHour(value);
          break;
        case 'minute':
          this.selectMinute(value);
          break;
        case 'duration-hours':
          this.selectDurationHours(value);
          break;
        case 'duration-minutes':
          this.selectDurationMinutes(value);
          break;
        case 'duration-seconds':
          this.selectDurationSeconds(value);
          break;
      }
    }
    // Para todas las demás teclas (flechas, PageUp, etc.), 
    // delegar al handler principal pero evitar duplicación
    else {
      // Importante: detener la propagación para evitar que se ejecute dos veces
      event.stopPropagation();
      this.onKeyDown(event, section);
    }
  }

  /**
   * Enfoca visualmente el item actual en el DOM
   */
  private focusCurrentItem(section: TimePickerSection): void {
    // Modo DURATION
    if (this.isDurationMode()) {
      const current = this.selectedDuration();
      if (!current) return;

      let selector: string | null = null;
      let column: ElementRef<HTMLDivElement> | undefined;

      switch (section) {
        case 'duration-hours':
          selector = `[data-duration-hours="${current.hours}"]`;
          column = this.durationHoursColumn;
          break;
        case 'duration-minutes':
          selector = `[data-duration-minutes="${current.minutes}"]`;
          column = this.durationMinutesColumn;
          break;
        case 'duration-seconds':
          if (this.config.duration.showSeconds && current.seconds !== undefined) {
            selector = `[data-duration-seconds="${current.seconds}"]`;
            column = this.durationSecondsColumn;
          } else {
            return;
          }
          break;
        default:
          return;
      }

      if (column && selector) {
        const element = column.nativeElement.querySelector(selector) as HTMLElement;
        if (element) {
          element.focus();
          this.scrollToElement(column, selector, true);
        }
      }
      return;
    }

    // Modo TIME (hora normal)
    const current = this.selectedTime();
    if (!current) return;

    let selector: string | null = null;
    let column: ElementRef<HTMLDivElement> | undefined;

    switch (section) {
      case 'hour':
        selector = `[data-hour="${current.hour}"]`;
        column = this.hoursColumn;
        break;
      case 'minute':
        selector = `[data-minute="${current.minute}"]`;
        column = this.minutesColumn;
        break;
      case 'period':
        if (this.is12HourFormat() && current.period) {
          // Para AM/PM usamos el ButtonGroup, necesitamos un enfoque diferente
          this.focusPeriodButton(current.period);
          return;
        }
        return;
      default:
        // Sección no válida para modo TIME
        return;
    }

    if (column && selector) {
      const element = column.nativeElement.querySelector(selector) as HTMLElement;
      if (element) {
        // Establecer focus real del DOM
        element.focus();
        // Hacer scroll suave al elemento enfocado
        this.scrollToElement(column, selector, true);
      }
    }
  }

  /**
   * Enfoca el botón del período (AM/PM) en el ButtonGroup
   */
  private focusPeriodButton(period: TimePeriod): void {
    // Focus the ButtonGroup period selector
    setTimeout(() => {
      if (this.periodColumn) {
        // Try to focus the ButtonGroup component
        const buttonGroup = this.periodColumn.nativeElement;
        if (buttonGroup) {
          // Look for the active button or the first button
          const activeButton =
            buttonGroup.querySelector('.active, [aria-pressed="true"], [aria-selected="true"]') ||
            buttonGroup.querySelector('button');

          if (activeButton && typeof activeButton.focus === 'function') {
            activeButton.focus();
          } else if (typeof buttonGroup.focus === 'function') {
            buttonGroup.focus();
          }
        }
      }
    }, 0);
  }

  /**
   * Selecciona el primer valor disponible para una sección
   */
  private selectFirstAvailableValue(section: TimePickerSection): void {
    switch (section) {
      case 'hour':
        const hours = this.availableHours();
        if (hours.length > 0) {
          this.selectHour(hours[0]);
        }
        break;
      case 'minute':
        const minutes = this.availableMinutes();
        if (minutes.length > 0) {
          this.selectMinute(minutes[0]);
        }
        break;
      case 'period':
        if (this.is12HourFormat()) {
          this.selectPeriod(TimePeriodEnum.AM);
        }
        break;
    }
  }

  /**
   * Navega al primer elemento de la sección
   */
  private navigateToFirst(section: TimePickerSection): void {
    switch (section) {
      case 'hour':
        const hours = this.availableHours();
        if (hours.length > 0) {
          this.selectHour(hours[0]);
        }
        break;
      case 'minute':
        const minutes = this.availableMinutes();
        if (minutes.length > 0) {
          this.selectMinute(minutes[0]);
        }
        break;
      case 'period':
        if (this.is12HourFormat()) {
          this.selectPeriod(TimePeriodEnum.AM);
        }
        break;
    }
  }

  /**
   * Navega al último elemento de la sección
   */
  private navigateToLast(section: TimePickerSection): void {
    switch (section) {
      case 'hour':
        const hours = this.availableHours();
        if (hours.length > 0) {
          this.selectHour(hours[hours.length - 1]);
        }
        break;
      case 'minute':
        const minutes = this.availableMinutes();
        if (minutes.length > 0) {
          this.selectMinute(minutes[minutes.length - 1]);
        }
        break;
      case 'period':
        if (this.is12HourFormat()) {
          this.selectPeriod(TimePeriodEnum.PM);
        }
        break;
    }
  }

  /**
   * Confirma la selección actual (útil para Enter/Space)
   */
  private confirmSelection(): void {
    const current = this.selectedTime();
    if (current) {
      this.emitSelection(current);
    }
  }

  /**
   * Maneja la tecla Escape
   */
  private handleEscape(): void {
    // Blur del elemento actual
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }

    // Limpiar focus interno
    this.focusedSection.set(null);

    // Opcional: limpiar selección (comentado para no ser destructivo)
    // this.clear();
  }

  // ==================
  // MÉTODOS PRIVADOS
  // ==================
  private updateTime(time: TimeValue): void {
    this.selectedTime.set(time);

    // Actualizar el signal del período si es formato 12H
    if (this.is12HourFormat() && time.period) {
      this.selectedPeriod.set(time.period);
    }

    this.onChange(time);
    this.valueChange.emit(time);
  }

  private emitSelection(time: TimeValue | null): void {
    this.valueChange.emit(time);
    this.onTouched();
  }

  /**
   * Convierte un TimeValue a formato 24 horas
   * Útil para comparaciones en rangos nocturnos
   */
  private convertTo24Hour(time: TimeValue): number {
    let hour24 = time.hour;

    // Si tiene período (formato 12H), convertir a 24H
    if (time.period) {
      if (time.period === TimePeriodEnum.AM && time.hour === 12) {
        hour24 = 0; // 12 AM = 00:00
      } else if (time.period === TimePeriodEnum.PM && time.hour !== 12) {
        hour24 = time.hour + 12; // 1 PM = 13:00, 11 PM = 23:00
      } else if (time.period === TimePeriodEnum.PM && time.hour === 12) {
        hour24 = 12; // 12 PM = 12:00
      }
    }

    return hour24;
  }

  /**
   * Obtiene el valor por defecto según la estrategia configurada
   */
  private getDefaultValue(): TimeValue | null {
    switch (this.defaultStrategy()) {
      case TimePickerStrategyEnum.NOW:
        return this.getCurrentTime();

      case TimePickerStrategyEnum.SMART:
        return this.getSmartTime();

      case TimePickerStrategyEnum.CUSTOM:
        if (!this.defaultValue()) return null;

        return this.parseDefaultValue(this.defaultValue()!);

      case TimePickerStrategyEnum.EMPTY:
      default:
        return null;
    }
  }

  /**
   * Aplica un valor por defecto sin emitir eventos (silencioso)
   */
  private applyDefaultValueSilently(timeValue: TimeValue): void {
    this.selectedTime.set(timeValue);
    this.selectedPeriod.set(timeValue.period || null);

    // Sincronizar con FormControl/NgModel sin emitir eventos
    this.onChange(timeValue);

    // Hacer scroll al valor seleccionado
    this.scheduleScroll(true);
  }

  /**
   * Obtiene la hora actual como TimeValue
   */
  private getCurrentTime(): TimeValue {
    const now = new Date();
    const hour = this.is12HourFormat() ? now.getHours() % 12 || 12 : now.getHours();

    return {
      hour,
      minute: now.getMinutes(),
      period: this.is12HourFormat()
        ? now.getHours() >= 12
          ? TimePeriodEnum.PM
          : TimePeriodEnum.AM
        : null,
    };
  }

  /**
   * Obtiene una hora "inteligente" (actual + offset + redondeo)
   */
  private getSmartTime(): TimeValue {
    const now = new Date();

    // Agregar offset en minutos
    now.setMinutes(now.getMinutes() + this.smartOffset());

    // Redondear a incrementos según la configuración
    const minuteStep = this.config.minuteStep;
    const roundedMinutes = Math.ceil(now.getMinutes() / minuteStep) * minuteStep;

    // Si se pasa de 59, ajustar la hora
    if (roundedMinutes >= 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(roundedMinutes - 60);
    } else {
      now.setMinutes(roundedMinutes);
    }

    const hour = this.is12HourFormat() ? now.getHours() % 12 || 12 : now.getHours();

    return {
      hour,
      minute: now.getMinutes(),
      period: this.is12HourFormat()
        ? now.getHours() >= 12
          ? TimePeriodEnum.PM
          : TimePeriodEnum.AM
        : null,
    };
  }

  /**
   * Parsea el defaultValue según su tipo
   */
  private parseDefaultValue(value: Date | string | TimeValue): TimeValue | null {
    // Si ya es TimeValue
    if (typeof value === 'object' && 'hour' in value && 'minute' in value) {
      return value as TimeValue;
    }

    // Si es Date
    if (value instanceof Date) {
      return this.parseDate(value);
    }

    // Si es string
    if (typeof value === 'string') {
      return this.parseTimeString(value);
    }

    return null;
  }

  /**
   * Convierte Date a TimeValue
   */
  private parseDate(date: Date): TimeValue {
    const hour = this.is12HourFormat() ? date.getHours() % 12 || 12 : date.getHours();

    return {
      hour,
      minute: date.getMinutes(),
      period: this.is12HourFormat()
        ? date.getHours() >= 12
          ? TimePeriodEnum.PM
          : TimePeriodEnum.AM
        : null,
    };
  }

  /**
   * Parsea string de tiempo ("14:30", "2:30 PM", etc.)
   */
  private parseTimeString(timeStr: string): TimeValue | null {
    // Limpiar el string
    const cleaned = timeStr.trim().toLowerCase();

    // Regex para diferentes formatos
    const formats = [
      /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i, // "14:30" or "2:30 PM"
      /^(\d{1,2}):(\d{2})$/, // "14:30"
      /^(\d{1,2})\s*(am|pm)$/i, // "2 PM"
    ];

    for (const regex of formats) {
      const match = cleaned.match(regex);
      if (match) {
        let hour = parseInt(match[1], 10);
        const minute = match[2] ? parseInt(match[2], 10) : 0;
        const period = match[3]?.toUpperCase() as TimePeriod | undefined;

        // Validaciones básicas
        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
          continue;
        }

        // Ajustar hora según formato
        if (this.is12HourFormat()) {
          if (period) {
            // Formato 12h con AM/PM explícito
            if (period === TimePeriodEnum.PM && hour !== 12) hour += 12;
            if (period === TimePeriodEnum.AM && hour === 12) hour = 0;
            hour = hour % 12 || 12; // Normalizar a 1-12
          } else {
            // Formato 24h parseado para 12h
            if (hour === 0) hour = 12;
            if (hour > 12) hour -= 12;
          }
        } else {
          // Formato 24h
          if (period) {
            // 12h convertido a 24h
            if (period === TimePeriodEnum.PM && hour !== 12) hour += 12;
            if (period === TimePeriodEnum.AM && hour === 12) hour = 0;
          }
        }

        return {
          hour,
          minute,
          period: this.is12HourFormat()
            ? period || (hour >= 12 ? TimePeriodEnum.PM : TimePeriodEnum.AM)
            : null,
        };
      }
    }

    return null;
  }

  private navigateValue(section: TimePickerSection, delta: number): void {
    // Modo DURATION
    if (this.isDurationMode()) {
      const current = this.selectedDuration();
      if (!current) {
        this.selectFirstAvailableDurationValue(section);
        return;
      }

      if (section === 'duration-hours') {
        const hours = this.availableDurationHours();
        if (hours.length === 0) return;

        const currentIndex = hours.indexOf(current.hours);
        if (currentIndex === -1) {
          this.selectDurationHours(hours[0]);
          return;
        }

        let newIndex = currentIndex + delta;
        if (newIndex < 0) {
          newIndex = hours.length + (newIndex % hours.length);
        } else if (newIndex >= hours.length) {
          newIndex = newIndex % hours.length;
        }

        this.selectDurationHours(hours[newIndex]);
      } else if (section === 'duration-minutes') {
        const minutes = this.availableDurationMinutes();
        if (minutes.length === 0) return;

        const currentIndex = minutes.indexOf(current.minutes);
        if (currentIndex === -1) {
          this.selectDurationMinutes(minutes[0]);
          return;
        }

        let newIndex = currentIndex + delta;
        if (newIndex < 0) {
          newIndex = minutes.length + (newIndex % minutes.length);
        } else if (newIndex >= minutes.length) {
          newIndex = newIndex % minutes.length;
        }

        this.selectDurationMinutes(minutes[newIndex]);
      } else if (section === 'duration-seconds' && this.config.duration.showSeconds) {
        const seconds = this.availableDurationSeconds();
        if (seconds.length === 0) return;

        const currentIndex = seconds.indexOf(current.seconds || 0);
        if (currentIndex === -1) {
          this.selectDurationSeconds(seconds[0]);
          return;
        }

        let newIndex = currentIndex + delta;
        if (newIndex < 0) {
          newIndex = seconds.length + (newIndex % seconds.length);
        } else if (newIndex >= seconds.length) {
          newIndex = newIndex % seconds.length;
        }

        this.selectDurationSeconds(seconds[newIndex]);
      }
      return;
    }

    // Modo TIME (hora normal)
    const current = this.selectedTime();
    if (!current) {
      // Si no hay selección, seleccionar el primer valor
      this.selectFirstAvailableValue(section);
      return;
    }

    if (section === 'hour') {
      const hours = this.availableHours();
      if (hours.length === 0) return;

      const currentIndex = hours.indexOf(current.hour);
      if (currentIndex === -1) {
        // Si la hora actual no está en la lista, seleccionar la primera
        this.selectHour(hours[0]);
        return;
      }

      // Aplicar delta con wrapping circular
      let newIndex = currentIndex + delta;

      // Manejar wrapping circular
      if (newIndex < 0) {
        newIndex = hours.length + (newIndex % hours.length);
      } else if (newIndex >= hours.length) {
        newIndex = newIndex % hours.length;
      }

      this.selectHour(hours[newIndex]);
    } else if (section === 'minute') {
      const minutes = this.availableMinutes();
      if (minutes.length === 0) return;

      const currentIndex = minutes.indexOf(current.minute);
      if (currentIndex === -1) {
        // Si el minuto actual no está en la lista, seleccionar el primero
        this.selectMinute(minutes[0]);
        return;
      }

      // Aplicar delta con wrapping circular
      let newIndex = currentIndex + delta;

      // Manejar wrapping circular
      if (newIndex < 0) {
        newIndex = minutes.length + (newIndex % minutes.length);
      } else if (newIndex >= minutes.length) {
        newIndex = newIndex % minutes.length;
      }

      this.selectMinute(minutes[newIndex]);
    } else if (section === 'period' && this.is12HourFormat()) {
      // Para AM/PM, simplemente alternar
      const newPeriod =
        current.period === TimePeriodEnum.AM ? TimePeriodEnum.PM : TimePeriodEnum.AM;
      this.selectPeriod(newPeriod);
    }
  }

  private selectFirstAvailableDurationValue(section: TimePickerSection): void {
    switch (section) {
      case 'duration-hours':
        const hours = this.availableDurationHours();
        if (hours.length > 0) {
          this.selectDurationHours(hours[0]);
        }
        break;
      case 'duration-minutes':
        const minutes = this.availableDurationMinutes();
        if (minutes.length > 0) {
          this.selectDurationMinutes(minutes[0]);
        }
        break;
      case 'duration-seconds':
        if (this.config.duration.showSeconds) {
          const seconds = this.availableDurationSeconds();
          if (seconds.length > 0) {
            this.selectDurationSeconds(seconds[0]);
          }
        }
        break;
    }
  }

  private focusNext(current: TimePickerSection): void {
    if (this.isDurationMode()) {
      if (current === 'duration-hours') {
        this.focusedSection.set('duration-minutes');
        this.focusCurrentItem('duration-minutes');
      } else if (current === 'duration-minutes' && this.config.duration.showSeconds) {
        this.focusedSection.set('duration-seconds');
        this.focusCurrentItem('duration-seconds');
      }
      return;
    }

    if (current === 'hour' && this.showMinutes()) {
      this.focusedSection.set('minute');
      this.focusCurrentItem('minute');
    } else if (current === 'hour' && !this.showMinutes() && this.is12HourFormat()) {
      // Saltar directamente al período si no hay minutos
      this.focusedSection.set('period');
      this.focusCurrentItem('period');
    } else if (current === 'minute' && this.is12HourFormat()) {
      this.focusedSection.set('period');
      this.focusCurrentItem('period');
    }
    // Si ya estamos en la última columna, no hacer nada (o ciclar si se desea)
  }

  private focusPrevious(current: TimePickerSection): void {
    if (this.isDurationMode()) {
      if (current === 'duration-seconds') {
        this.focusedSection.set('duration-minutes');
        this.focusCurrentItem('duration-minutes');
      } else if (current === 'duration-minutes') {
        this.focusedSection.set('duration-hours');
        this.focusCurrentItem('duration-hours');
      }
      return;
    }

    if (current === 'period' && this.showMinutes()) {
      this.focusedSection.set('minute');
      this.focusCurrentItem('minute');
    } else if (current === 'period' && !this.showMinutes()) {
      // Saltar directamente a horas si no hay minutos
      this.focusedSection.set('hour');
      this.focusCurrentItem('hour');
    } else if (current === 'minute') {
      this.focusedSection.set('hour');
      this.focusCurrentItem('hour');
    }
    // Si ya estamos en la primera columna, no hacer nada (o ciclar si se desea)
  }

  // ==================
  // SCROLL UTILITIES
  // ==================
  private scrollToSelected(): void {
    const time = this.selectedTime();
    if (!time) return;

    // Verificar que los ViewChild estén disponibles antes de hacer scroll
    if (!this.hoursColumn?.nativeElement) {
      // Si no están disponibles, programar para más tarde
      setTimeout(() => this.scrollToSelected(), 10);
      return;
    }

    // Scroll directo (sin smooth) para mayor confiabilidad
    // Scroll a la hora seleccionada
    this.scrollToElement(this.hoursColumn, `[data-hour="${time.hour}"]`, false);

    // Scroll a los minutos seleccionados si está visible
    if (this.showMinutes()) {
      this.scrollToElement(this.minutesColumn, `[data-minute="${time.minute}"]`, false);
    }

    // Scroll al período seleccionado si es formato 12h
    if (this.is12HourFormat() && time.period) {
      this.scrollToElement(this.periodColumn, `[data-period="${time.period}"]`, false);
    }
  }

  /**
   * Normaliza un tiempo a los valores disponibles más cercanos
   */
  private normalizeTimeToAvailableOptions(time: TimeValue): TimeValue {
    const normalizedHour = this.findClosestAvailableHour(time.hour);

    // Calcular los minutos disponibles para la hora normalizada
    const availableMinutes = this.getAvailableMinutesForHour(normalizedHour);
    const normalizedMinute = this.findClosestValueInArray(time.minute, availableMinutes);

    return {
      hour: normalizedHour,
      minute: normalizedMinute,
      period: time.period,
    };
  }

  /**
   * Calcula los minutos disponibles para una hora específica (sin depender de selectedTime)
   */
  private getAvailableMinutesForHour(hour: number): number[] {
    const step = this.config.minuteStep;
    const minutes: number[] = [];

    let minMinute = 0;
    let maxMinute = 59;

    // Aplicar restricción de minTime
    if (this.config.minTime) {
      const minHour24 = this.convertTo24Hour(this.config.minTime);

      if (this.isMidnightCrossing()) {
        const maxHour24 = this.convertTo24Hour(this.config.maxTime!);

        // Si estamos en la parte inicial del rango (antes de medianoche)
        if (hour >= minHour24 && hour <= 23) {
          if (hour === minHour24) {
            minMinute = this.config.minTime.minute || 0;
          }
        }
        // Si estamos en la parte final del rango (después de medianoche)
        else if (hour >= 0 && hour <= maxHour24) {
          if (hour === maxHour24) {
            maxMinute = this.config.maxTime!.minute || 59;
          }
        }
      } else {
        // Rango normal del mismo día
        if (hour === minHour24) {
          minMinute = this.config.minTime.minute || 0;
        }
      }
    }

    // Aplicar restricción de maxTime (solo para rangos normales)
    if (this.config.maxTime && !this.isMidnightCrossing()) {
      const maxHour24 = this.convertTo24Hour(this.config.maxTime);

      if (hour === maxHour24) {
        maxMinute = this.config.maxTime.minute || 59;
      }
    }

    for (let i = minMinute; i <= maxMinute; i += step) {
      if (!this.config.disabledMinutes.includes(i)) {
        minutes.push(i);
      }
    }

    return minutes;
  }

  private findClosestValueInArray(target: number, available: number[]): number {
    if (available.length === 0) return target;
    if (available.includes(target)) return target;

    return available.reduce((closest, current) => {
      return Math.abs(current - target) < Math.abs(closest - target) ? current : closest;
    });
  }

  private findClosestAvailableHour(targetHour: number): number {
    const available = this.availableHours();

    if (available.length === 0) return targetHour;
    if (available.includes(targetHour)) return targetHour;

    return available.reduce((closest, current) => {
      return Math.abs(current - targetHour) < Math.abs(closest - targetHour) ? current : closest;
    });
  }

  /**
   * Formatea un TimeValue a string legible
   */
  formatTimeValue(time: TimeValue): string {
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    const period = time.period ? ` ${time.period}` : '';
    return `${hour}:${minute}${period}`;
  }

  private scheduleScroll(immediate = false): void {
    if (immediate) {
      // Scroll sin animación (init)
      // Usar setTimeout para asegurar que ViewChild esté disponible
      setTimeout(() => this.scrollToSelected(), 0);
    } else {
      // Esperar próximo frame para que Angular actualice DOM
      requestAnimationFrame(() => {
        this.scrollToSelected();
      });
    }
  }

  private scrollToElement(
    column: ElementRef<HTMLDivElement> | undefined,
    selector: string,
    smooth: boolean = false
  ): void {
    if (!column || !column.nativeElement) return;

    const container = column.nativeElement;
    const element = container.querySelector(selector) as HTMLElement;

    if (element && container) {
      // Calcular la posición para centrar el elemento en el contenedor
      const elementTop = element.offsetTop;
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;

      // Centrar el elemento: posición del elemento - mitad del contenedor + mitad del elemento
      const targetScroll = elementTop - containerHeight / 2 + elementHeight / 2;

      // Asegurar que no sea negativo
      const finalScroll = Math.max(0, targetScroll);

      // Hacer scroll SOLO en el contenedor, sin afectar la página
      if (smooth) {
        container.scrollTo({
          top: finalScroll,
          behavior: 'smooth',
        });
      } else {
        // Scroll directo sin animación (más confiable para inicialización)
        container.scrollTop = finalScroll;
      }
    }
  }
}
