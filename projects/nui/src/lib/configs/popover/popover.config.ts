import { inject } from '@angular/core';
import { PopoverConfig } from '../../components/popover';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración estática por defecto para los popovers.
 */
export const DEFAULT_POPOVER_CONFIG: PopoverConfig = {
  position: 'top',
  event: 'click',
  showDelay: 0,
  hideDelay: 0,
  showArrow: true,
  closeOnClickOutside: true,
  closeOnEscape: true,
  maxWidth: 'auto',
};

/**
 * Función inyectable para resolver la configuración final del Popover.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectPopoverConfig(): PopoverConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de popover
  const popoverOverrides = globalConfig?.popover;

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_POPOVER_CONFIG, popoverOverrides);
}
