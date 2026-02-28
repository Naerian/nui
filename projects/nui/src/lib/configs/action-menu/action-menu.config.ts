import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token'; // Ajustar ruta según tu árbol
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';

/**
 * Interfaz de configuración específica para el botón.
 */
export interface ActionMenuGlobalConfig {
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
}

/**
 * Constante pura con los defaults del Action Menu.
 */
export const DEFAULT_ACTION_MENU_CONFIG: ActionMenuGlobalConfig = {
  color: 'primary',
  size: 'md',
  variant: 'solid',
};

/**
 * Función inyectable para resolver la configuración final del Action Menu.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectActionMenuConfig(): ActionMenuGlobalConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de actionMenu
  const actionMenuOverrides = globalConfig?.actionMenu || {};

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_ACTION_MENU_CONFIG, actionMenuOverrides);
}
