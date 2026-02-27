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
 * Función inyectable para resolver la configuración final del Tooltip.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectTooltipConfig(): TooltipConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de tooltip
  const tooltipOverrides = globalConfig?.tooltip;

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_TOOLTIP_CONFIG, tooltipOverrides);
}
