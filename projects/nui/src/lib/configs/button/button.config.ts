import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token'; // Ajustar ruta según tu árbol
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUIShape, NUISize, NUIVariant } from '../common';
import {
  ButtonIconPosition,
  ButtonIconPositionEnum,
  ButtonLoadingPosition,
  ButtonLoadingPositionEnum,
  ButtonType,
  ButtonTypeEnum,
  ButtonWidth,
  ButtonWidthEnum,
} from '../../components/button';

/**
 * Interfaz de configuración específica para el botón.
 */
export interface ButtonGlobalConfig {
  type?: ButtonType;
  iconPosition?: ButtonIconPosition;
  loadingPosition?: ButtonLoadingPosition;
  width?: ButtonWidth;
  color?: NUIColor;
  size?: NUISize;
  shape?: NUIShape;
  variant?: NUIVariant;
  raised?: boolean;
}

/**
 * Constante pura con los defaults del Botón.
 */
export const DEFAULT_BUTTON_CONFIG: ButtonGlobalConfig = {
  type: ButtonTypeEnum.BUTTON,
  iconPosition: ButtonIconPositionEnum.START,
  loadingPosition: ButtonLoadingPositionEnum.START,
  width: ButtonWidthEnum.AUTO,
  color: 'primary',
  size: 'md',
  shape: 'rounded',
  variant: 'solid',
  raised: false,
};

/**
 * Función inyectable para resolver la configuración final del Botón.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectButtonConfig(): ButtonGlobalConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de button
  const buttonOverrides = globalConfig?.button || {};

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_BUTTON_CONFIG, buttonOverrides);
}
