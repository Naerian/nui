import { inject } from '@angular/core';
import { TimeSelectorStrategy } from '../../components/time-selector/models/time-selector.model';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración global del timeSelector.
 * Define valores por defecto para toda la aplicación, sobreescribibles por instancia.
 */
export interface TimeSelectorGlobalConfig {
  /** Mostrar la cabecera con el tiempo formateado */
  showHeader?: boolean;
  /** Mostrar el footer built-in (botones 'Limpiar' + 'Ahora'). Por defecto: true */
  showFooter?: boolean;
  /** Estrategia de valor inicial: 'now', 'smart', 'empty' o 'custom' */
  defaultStrategy?: TimeSelectorStrategy;
  /** Offset en minutos para la estrategia 'smart' */
  smartOffset?: number;
  /** Incremento de horas en el selector */
  hourStep?: number;
  /** Incremento de minutos en el selector */
  minuteStep?: number;
}

/**
 * Defaults estáticos del timeSelector.
 */
export const DEFAULT_TIME_SELECTOR_CONFIG: TimeSelectorGlobalConfig = {
  showHeader: true,
  showFooter: true,
  defaultStrategy: 'empty',
  smartOffset: 30,
  hourStep: 1,
  minuteStep: 1,
};

/**
 * Función inyectable para resolver la configuración final del timeSelector.
 * Orden de precedencia: Defaults base ← Config global (provideNUI)
 */
export function injectTimeSelectorConfig(): TimeSelectorGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.timeSelector || {};
  return deepMerge(DEFAULT_TIME_SELECTOR_CONFIG, overrides);
}
