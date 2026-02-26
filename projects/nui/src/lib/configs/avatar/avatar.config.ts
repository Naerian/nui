import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.config'; // Ajustar ruta según tu árbol
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';

/**
 * Interfaz de configuración específica para el avatar.
 */
export interface AvatarGlobalConfig {
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
}

/**
 * Constante pura con los defaults del Avatar.
 */
export const DEFAULT_AVATAR_CONFIG: AvatarGlobalConfig = {
  color: 'primary',
  size: 'md',
  variant: 'solid',
};

/**
 * Función inyectable para resolver la configuración final del Avatar.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectAvatarConfig(): AvatarGlobalConfig {
  // 1. Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // 2. Extraemos la sección de avatar
  const avatarOverrides = globalConfig?.avatar || {};

  // 3. Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_AVATAR_CONFIG, avatarOverrides);
}
