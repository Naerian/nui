import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';
import {
  FabButtonAnimation,
  FabButtonDirection,
  FabButtonLayoutType,
  FabButtonShape,
} from '../../components/fab-button';

// ============================================================
// Config interface
// ============================================================
/**
 * Global configuration for the FabButton component.
 * All fields are optional; unset fields fall back to DEFAULT_FAB_BUTTON_CONFIG.
 */
export interface FabButtonConfig {
  /** Direction in which items spread from the trigger. @default 'up' */
  direction?: FabButtonDirection;
  /** Enter/leave animation for the items. @default 'scale' */
  animation?: FabButtonAnimation;
  /** Spatial distribution of items. @default 'linear' */
  layout?: FabButtonLayoutType;
  /** Border-radius shape of trigger and items. @default 'circular' */
  shape?: FabButtonShape;
  /** Semantic color for trigger and items. @default 'primary' */
  color?: NUIColor;
  /** Size token for trigger and items. @default 'md' */
  size?: NUISize;
  /** Visual variant for trigger and items. @default 'solid' */
  variant?: NUIVariant;
  /**
   * Radius for circle/semi-circle/quarter-circle layouts.
   * Accepts any valid CSS length (rem, px, em…).
   * @default '4rem'
   */
  radius?: string;
  /**
   * Spacing between items in linear layout.
   * Accepts any valid CSS length.
   * @default '3.5rem'
   */
  spacing?: string;
  /** Whether to show a translucent backdrop behind the items. @default false */
  backdrop?: boolean;
  /** Close the dial when the user clicks outside the component. @default true */
  closeOnOutsideClick?: boolean;
  /** Close the dial when the user presses the ESC key. @default true */
  closeOnEsc?: boolean;
}

// ============================================================
// Default values
// ============================================================
export const DEFAULT_FAB_BUTTON_CONFIG: Required<FabButtonConfig> = {
  direction: 'up',
  animation: 'scale',
  layout: 'linear',
  shape: 'circular',
  color: 'primary',
  size: 'md',
  variant: 'solid',
  radius: '4rem',
  spacing: '3.5rem',
  backdrop: false,
  closeOnOutsideClick: true,
  closeOnEsc: true,
};

// ============================================================
// Injection helper (mirrors injectButtonConfig pattern)
// ============================================================
/**
 * Resolves the final FabButton configuration by merging the library defaults
 * with any values provided via the global NUI_CONFIG provider.
 *
 * Usage inside a component:
 * ```ts
 * private readonly config = injectFabButtonConfig();
 * ```
 */
export function injectFabButtonConfig(): Required<FabButtonConfig> {
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;
  const overrides = globalConfig?.fabButton ?? {};
  return deepMerge(DEFAULT_FAB_BUTTON_CONFIG, overrides) as Required<FabButtonConfig>;
}
