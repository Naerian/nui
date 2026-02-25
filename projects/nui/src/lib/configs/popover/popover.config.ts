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
 * Resolver del Popover.
 * Combina la base estática con las configuraciones globales inyectadas a través de NUI_CONFIG.
 * * @returns {PopoverConfig} Configuración final combinada
 */
export function injectPopoverConfig(): PopoverConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true });
  const popoverOverrides = globalConfig?.popover;

  return deepMerge(DEFAULT_POPOVER_CONFIG, popoverOverrides);
}
