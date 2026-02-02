import { PopoverConfig } from "../../components/popover";

/**
 * Crea la configuración por defecto para popovers
 * @returns {PopoverConfig} Configuración por defecto
 */
export function createDefaultPopoverConfig(): PopoverConfig {
  return {
    position: 'top',
    event: 'click',
    showDelay: 0,
    hideDelay: 0,
    showArrow: true,
    closeOnClickOutside: true,
    closeOnEscape: true,
    maxWidth: 'auto',
  };
}

/**
 * Token de inyección para la configuración global de popovers
 */
export const POPOVER_CONFIG_TOKEN = 'NUI_POPOVER_CONFIG';
