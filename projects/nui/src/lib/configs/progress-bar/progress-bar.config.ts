import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUIVariant } from '../common';

/**
 * Configuración global del componente ProgressBar.
 */
export interface ProgressBarGlobalConfig {
  color?: NUIColor;
  variant?: NUIVariant;
}

/**
 * Defaults estáticos. No hay inyección aquí, es una constante pura.
 */
export const DEFAULT_PROGRESS_BAR_CONFIG: ProgressBarGlobalConfig = {
  color: 'primary',
  variant: 'solid',
};

/**
 * Función inyectable para resolver la configuración final del ProgressBar.
 * Prioridad: Input del componente → Config global (provideNUI) → Valor por defecto.
 */
export function injectProgressBarConfig(): ProgressBarGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.progressBar ?? {};
  return deepMerge(DEFAULT_PROGRESS_BAR_CONFIG, overrides);
}
