import { TooltipConfig } from "../../components/tooltip";

/**
 * Crea la configuración por defecto para tooltips
 * @returns {TooltipConfig} Configuración por defecto
 */
export function createDefaultTooltipConfig(): TooltipConfig {
  return {
    position: 'top',
    event: 'hover',
    showDelay: 300,
    hideDelay: 0,
    showArrow: true,
    interactive: false,
  };
}

/**
 * Token de inyección para la configuración global de tooltips
 */
export const TOOLTIP_CONFIG_TOKEN = 'NUI_TOOLTIP_CONFIG';
