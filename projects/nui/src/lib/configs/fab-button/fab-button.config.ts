import { inject } from '@angular/core';
import { TooltipPosition } from '../../components/tooltip';
import { NUIColor, NUISize, NUIVariant } from '../common/types';
import { NUI_CONFIG } from '../nui.config';
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
 * Resolver del Fab Button.
 * Combina la base estática con las configuraciones globales inyectadas a través de NUI_CONFIG.
 *
 * @returns {FabButtonConfig} Configuración final combinada
 */
export function injectFabButtonConfig(): FabButtonConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true });
  const fabButtonOverrides = globalConfig?.config?.fabButton;

  return deepMerge(DEFAULT_FAB_BUTTON_CONFIG, fabButtonOverrides);
}
