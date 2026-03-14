import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración global del componente NuiDock.
 *
 * Se aplica a la instancia única del dock que gestiona todos los elementos
 * minimizados (modales y paneles laterales) de la aplicación.
 */
export interface NuiDockGlobalConfig {
  /**
   * Posición vertical del dock respecto al viewport.
   * @default 'bottom'
   */
  position?: 'bottom' | 'top';

  /**
   * Muestra un separador visual entre los chips de modales y los de paneles laterales
   * cuando el dock contiene items de ambos tipos.
   * @default true
   */
  showTypeSeparator?: boolean;

  /**
   * Número máximo de chips visibles en el dock antes de colapsar el resto
   * en un chip de desbordamiento "+N". Útil en mobile para evitar que el dock
   * crezca más allá del ancho de pantalla.
   * Si no se define, se muestran todos los chips sin límite.
   * @default undefined (sin límite)
   */
  maxVisibleChips?: number;
}

/**
 * Configuración por defecto del NuiDock.
 */
export const DEFAULT_NUI_DOCK_CONFIG: NuiDockGlobalConfig = {
  position: 'bottom',
  showTypeSeparator: true,
  maxVisibleChips: 4,
};

/**
 * Función inyectable para resolver la configuración final del NuiDock.
 * Fusiona los defaults de la librería con la config global del usuario.
 */
export function injectNuiDockConfig(): NuiDockGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.dock;
  return deepMerge(DEFAULT_NUI_DOCK_CONFIG, overrides);
}
