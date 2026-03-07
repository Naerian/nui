import { inject } from '@angular/core';
import { TimePickerStrategy } from '../../components/time-picker/models/time-picker.model';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración global del TimePicker.
 * Define valores por defecto para toda la aplicación, sobreescribibles por instancia.
 */
export interface TimePickerGlobalConfig {
  /** Mostrar la cabecera con el tiempo formateado */
  showHeader?: boolean;
  /** Estrategia de valor inicial: 'now', 'smart', 'empty' o 'custom' */
  defaultStrategy?: TimePickerStrategy;
  /** Offset en minutos para la estrategia 'smart' */
  smartOffset?: number;
  /** Incremento de horas en el selector */
  hourStep?: number;
  /** Incremento de minutos en el selector */
  minuteStep?: number;
}

/**
 * Defaults estáticos del TimePicker.
 */
export const DEFAULT_TIME_PICKER_CONFIG: TimePickerGlobalConfig = {
  showHeader: true,
  defaultStrategy: 'empty',
  smartOffset: 30,
  hourStep: 1,
  minuteStep: 1,
};

/**
 * Función inyectable para resolver la configuración final del TimePicker.
 * Orden de precedencia: Defaults base ← Config global (provideNUI)
 */
export function injectTimePickerConfig(): TimePickerGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.timePicker || {};
  return deepMerge(DEFAULT_TIME_PICKER_CONFIG, overrides);
}
