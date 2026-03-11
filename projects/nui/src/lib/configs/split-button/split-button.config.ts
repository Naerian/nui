import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUIShape, NUISize, NUIVariant } from '../common';

/**
 * Interfaz de configuración global para el SplitButton.
 */
export interface SplitButtonGlobalConfig {
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
  shape?: NUIShape;
  raised?: boolean;
  width?: 'auto' | 'full';
  /** Icono del botón disparador. @default 'ri-arrow-down-s-line' */
  triggerIcon?: string;
  /** Offset entre el disparador y el panel flotante. @default 4 */
  offset?: number;
  /** Offset entre el item padre y el panel del submenú. @default 4 */
  offsetSubmenu?: number;
}

export const DEFAULT_SPLIT_BUTTON_CONFIG: SplitButtonGlobalConfig = {
  color: 'primary',
  size: 'md',
  shape: 'rounded',
  variant: 'solid',
  raised: false,
  width: 'auto',
  triggerIcon: 'ri-arrow-down-s-line',
  offset: 4,
  offsetSubmenu: 4,
};

/**
 * Función inyectable para resolver la configuración final del SplitButton.
 */
export function injectSplitButtonConfig(): SplitButtonGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.splitButton || {};
  return deepMerge(DEFAULT_SPLIT_BUTTON_CONFIG, overrides);
}
