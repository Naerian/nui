import { inject } from '@angular/core';
import { NUI_CONFIG } from '../nui.token';
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';
import {
  FabButtonAnimation,
  FabButtonDirection,
  FabButtonLayoutType,
  FabButtonShape,
  FabButtonItemDisplay,
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
  /**
   * Controls how action items render their content:
   * - `'icon'` (default) — icon-only button; label is not shown but tooltip appears on hover.
   * - `'icon-text'` — icon + label text inside the button; tooltip is suppressed
   *   (the visible label already conveys the action).
   * @default 'icon'
   */
  itemDisplay?: FabButtonItemDisplay;
  /**
   * Set to `false` to keep the dial open for multi-action patterns. @default true
   */
  closeOnItemClick?: boolean;
  /**
   * Close the dial when the nearest scroll container scrolls.
   * Useful when the FAB is inside a scrollable panel. @default false
   */
  closeOnScroll?: boolean;
  /**
   * How to open the dial: 'click' (default) or 'hover'.
   * In 'hover' mode the dial opens on pointer entry and closes on leave.
   * Keyboard navigation is unaffected in either mode. @default 'click'
   */
  openOn?: 'click' | 'hover';
  /**
   * Icon CSS class shown in the trigger when the dial is open.
   * When set, the `triggerIcon` is replaced by this class while expanded —
   * avoids the need for a custom `fabTrigger` template just for icon swap.
   * @example 'ri-close-line'
   */
  triggerIconOpen?: string;
  /**
   * Static label shown next to the trigger icon.
   * Renders the trigger as an Extended FAB pill (icon + text).
   * The label is omitted when the dial is open and `triggerIconOpen` is set.
   * @example 'Compose'
   */
  triggerLabel?: string;
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
  itemDisplay: 'icon',
  closeOnItemClick: true,
  closeOnScroll: false,
  openOn: 'click',
  triggerIconOpen: '',
  triggerLabel: '',
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
