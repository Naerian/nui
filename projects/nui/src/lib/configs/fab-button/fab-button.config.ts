import { inject } from '@angular/core';
import { TooltipPosition } from '../../components/tooltip';
import { NUIColor, NUISize, NUIVariant } from '../common/types';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Dirección en la que se despliegan los items del FAB
 * - up, down, left, right: Para layouts linear, circle, semi-circle
 * - up-left, up-right, down-left, down-right: Para layout quarter-circle
 */
export type FabButtonDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

/**
 * Tipo de animación para el despliegue de items
 */
export type FabButtonAnimation = 'scale' | 'fade' | 'slide';

/**
 * Tipo de layout para el despliegue de items
 */
export type FabButtonLayoutType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

/**
 * Forma del botón y sus items
 */
export type FabButtonShape = 'circular' | 'rounded' | 'square';

/**
 * Configuración de un item individual del FAB
 */
export interface FabButtonItem {
  id?: string;
  icon?: string;
  label?: string;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
  tooltipDelay?: number;
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
  disabled?: boolean;
  data?: any;
  styleClass?: string;
  url?: string;
  target?: string;
  command?: (event?: any) => void;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Configuración global del componente FAB Button
 */
export interface FabButtonConfig {
  direction?: FabButtonDirection;
  animation?: FabButtonAnimation;
  layoutType?: FabButtonLayoutType;
  shape?: FabButtonShape;
  showLabels?: boolean;
  animationDuration?: number;
  itemSpacing?: number;
  hideOnItemClick?: boolean;
  hideOnClickOutside?: boolean;
  hideOverlay?: boolean;
  iconRotation?: number;
}

/**
 * Configuración estática por defecto para los FAB Buttons.
 */
export const DEFAULT_FAB_BUTTON_CONFIG: FabButtonConfig = {
  direction: 'up',
  animation: 'scale',
  layoutType: 'linear',
  shape: 'circular',
  showLabels: false,
  hideOnItemClick: true,
  hideOnClickOutside: true,
  hideOverlay: true,
  iconRotation: 135,
};

/**
 * Función inyectable para resolver la configuración final del FAB Button.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectFabButtonConfig(): FabButtonConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true });

  // Extraemos la sección de fabButton
  const fabButtonOverrides = globalConfig?.config?.fabButton;

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_FAB_BUTTON_CONFIG, fabButtonOverrides);
}
