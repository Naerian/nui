export type TimePickerMode =
  | 'HOUR_12'
  | 'HOUR_24'
  | 'HOUR_MINUTE_12'
  | 'HOUR_MINUTE_24'
  | 'DURATION';
export enum TimePickerModeEnum {
  HOUR_12 = 'HOUR_12',
  HOUR_24 = 'HOUR_24',
  HOUR_MINUTE_12 = 'HOUR_MINUTE_12',
  HOUR_MINUTE_24 = 'HOUR_MINUTE_24',
  DURATION = 'DURATION',
}

export type TimePeriod = 'AM' | 'PM';

export type TimePickerSection = 'hour' | 'minute' | 'period' | 'duration-hours' | 'duration-minutes' | 'duration-seconds';

export type TimePickerStrategy = 'now' | 'smart' | 'empty' | 'custom';
export enum TimePickerStrategyEnum {
  NOW = 'now',
  SMART = 'smart',
  EMPTY = 'empty',
  CUSTOM = 'custom',
}

export enum TimePeriodEnum {
  AM = 'AM',
  PM = 'PM',
}

export interface TimeValue {
  hour: number; // 0-23 para 24h, 1-12 para 12h
  minute: number; // 0-59
  period?: TimePeriod | null; // Solo para formato 12h
}

/**
 * Valor de duración (diferente a TimeValue)
 * Representa un intervalo de tiempo, no un momento específico
 */
export interface DurationValue {
  hours: number;    // 0-n (sin límite superior por defecto)
  minutes: number;  // 0-59
  seconds?: number; // 0-59 (opcional, para mayor precisión)
}

/**
 * Preset de duración
 */
export interface DurationPreset {
  label: string;
  duration: DurationValue;
  icon?: string;
}

/**
 * Configuración específica para modo DURATION
 */
export interface DurationConfig {
  maxHours?: number;      // Límite máximo de horas (default: 23)
  minHours?: number;      // Mínimo de horas (default: 0)
  showSeconds?: boolean;  // Mostrar selector de segundos
  secondStep?: number;    // Paso para segundos (default: 1)
  allowZero?: boolean;    // Permitir duración 0 (default: true)
  
  // Presets comunes para duraciones
  quickDurations?: DurationPreset[];
}

/**
 * Tipo de valor que acepta el time-picker
 * Puede ser:
 * - TimeValue: { hour, minute, period? } - Para modos HOUR_* (hora del día)
 * - DurationValue: { hours, minutes, seconds? } - Para modo DURATION (intervalo)
 * - Date: Objeto Date con hora específica
 * - string: Formato "HH:mm" o "HH:mm AM/PM"
 * - null: Sin valor seleccionado
 */
export type TimePickerValue = TimeValue | DurationValue | Date | string | null;

/**
 * Preset de hora rápida
 */
export interface TimePreset {
  label: string;
  time: TimeValue;
  icon?: string; // Opcional: icono para el botón
}

export interface TimePickerConfig {
  hourStep?: number; // Default: 1
  minuteStep?: number; // Default: 1 (común: 5, 10, 15, 30)
  minTime?: TimeValue | undefined;
  maxTime?: TimeValue | undefined;
  disabledHours?: number[];
  disabledMinutes?: number[];
  presets?: TimePreset[]; // Presets de hora rápida
  showRangeIndicator?: boolean; // Mostrar indicador visual de rango
  duration?: DurationConfig; // Configuración para modo DURATION
}

/**
 * Configuración interna con valores por defecto garantizados
 */
export interface ResolvedTimePickerConfig {
  hourStep: number;
  minuteStep: number;
  minTime: TimeValue | undefined;
  maxTime: TimeValue | undefined;
  disabledHours: number[];
  disabledMinutes: number[];
  presets: TimePreset[];
  showRangeIndicator: boolean;
  duration: DurationConfig;
}

export const DEFAULT_DURATION_CONFIG: DurationConfig = {
  maxHours: 23,
  minHours: 0,
  showSeconds: false,
  secondStep: 1,
  allowZero: true,
  quickDurations: [], // Vacío por defecto, se generan en el componente con traducciones
};

export const DEFAULT_CONFIG: ResolvedTimePickerConfig = {
  hourStep: 1,
  minuteStep: 1,
  minTime: undefined,
  maxTime: undefined,
  disabledHours: [],
  disabledMinutes: [],
  presets: [],
  showRangeIndicator: false,
  duration: DEFAULT_DURATION_CONFIG,
};
