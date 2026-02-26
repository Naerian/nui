import { inject } from '@angular/core';
import { TooltipConfig } from '../../components/tooltip';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración estática por defecto para los Tooltips.
 */
export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  position: 'top',
  event: 'hover',
  showDelay: 300,
  hideDelay: 0,
  showArrow: true,
  allowHtml: false,
  interactive: false,
};

/**
 * Resolver de los Tooltips.
 * Combina la base estática con las configuraciones globales inyectadas a través de NUI_CONFIG.
 *
 * @returns {TooltipConfig} Configuración final combinada
 */
export function injectTooltipConfig(): TooltipConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const tooltipOverrides = globalConfig?.tooltip;

  return deepMerge(DEFAULT_TOOLTIP_CONFIG, tooltipOverrides);
}
