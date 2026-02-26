import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.config'; // Ajustar ruta según tu árbol
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';
import { ButtonWidth, ButtonWidthEnum } from '../../components/button';

/**
 * Interfaz de configuración específica para el SelectButton.
 */
export interface SelectButtonGlobalConfig {
  width?: ButtonWidth;
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
}

/**
 * Constante pura con los defaults del SelectButton.
 */
export const DEFAULT_SELECT_BUTTON_CONFIG: SelectButtonGlobalConfig = {
  width: ButtonWidthEnum.AUTO,
  color: 'primary',
  size: 'md',
  variant: 'solid',
};

/**
 * Función inyectable para resolver la configuración final del SelectButton.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectSelectButtonConfig(): SelectButtonGlobalConfig {
  // 1. Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // 2. Extraemos la sección de button
  const selectButtonOverrides = globalConfig?.selectButton || {};

  // 3. Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_SELECT_BUTTON_CONFIG, selectButtonOverrides);
}
