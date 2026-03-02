import { NUIColor, NUISize, NUIVariant } from '../../../configs';
import { TooltipPosition } from '../../tooltip';

// ============================================================
// Direction: the axis / diagonal where items spread out from
// ============================================================
export type FabButtonDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';
export enum FabButtonDirectionEnum {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  UP_LEFT = 'up-left',
  UP_RIGHT = 'up-right',
  DOWN_LEFT = 'down-left',
  DOWN_RIGHT = 'down-right',
}

// ============================================================
// Animation: how items enter/leave
// ============================================================
export type FabButtonAnimation = 'scale' | 'fade' | 'slide';

// ============================================================
// Item display: icon-only or icon + label inside the button
// ============================================================
export type FabButtonItemDisplay = 'icon' | 'icon-text';
export enum FabButtonItemDisplayEnum {
  ICON      = 'icon',
  ICON_TEXT = 'icon-text',
}

// ============================================================
// Layout: spatial distribution of items around the trigger
// ============================================================
export type FabButtonLayoutType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';
export enum FabButtonLayoutTypeEnum {
  LINEAR = 'linear',
  CIRCLE = 'circle',
  SEMI_CIRCLE = 'semi-circle',
  QUARTER_CIRCLE = 'quarter-circle',
}

// ============================================================
// Shape: border-radius of trigger and items
// ============================================================
export type FabButtonShape = 'circular' | 'rounded' | 'square';

// ============================================================
// Tooltip position for items with tooltips (computed internally)
// ============================================================
export type FabButtonTooltipSide = 'top' | 'right' | 'bottom' | 'left';
export enum FabButtonTooltipSideEnum {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

// ============================================================
// Public item definition (provided by the consumer)
// ============================================================
export interface FabButtonItem {
  /** Unique identifier for the item. Used for tracking in @for. */
  id?: string;
  /** Icon CSS class (e.g. 'ri-home-line'). */
  icon?: string;
  /** Accessible label shown next to the icon (optional). */
  label?: string;
  /** Tooltip text. Shown when nuiTooltip directive is applied. */
  tooltip?: string;
  /** Position of the tooltip relative to the item button. */
  tooltipPosition?: TooltipPosition;
  /** Delay in ms before the tooltip appears. */
  tooltipDelay?: number;
  /** Semantic color for this specific item. Overrides component-level color. */
  color?: NUIColor;
  /** Size for this specific item. Overrides component-level size. */
  size?: NUISize;
  /** Visual variant for this specific item. Overrides component-level variant. */
  variant?: NUIVariant;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Consumer-defined payload attached to click events. */
  data?: unknown;
  /** Extra CSS classes for the item button. */
  styleClass?: string;
  /** If set, renders the item as an anchor <a> instead of a <button>. */
  url?: string;
  /** Target attribute for anchor items. */
  target?: string;
  /** Callback executed when the item is clicked. */
  command?: (event?: Event) => void;
  /** Inline background color override (bypasses theme variables). */
  backgroundColor?: string;
  /** Inline text color override (bypasses theme variables). */
  textColor?: string;
}

// ============================================================
// Internal resolved item: FabButtonItem + computed position
// ============================================================
export interface FabButtonItemResolved extends FabButtonItem {
  /**
   * CSS calc() expression for the X translation.
   * Example: "calc(0.7071 * var(--nui-fab-radius))"
   * Injected as --nui-fab-item-tx in the item's inline style.
   */
  tx: string;
  /**
   * CSS calc() expression for the Y translation.
   * Injected as --nui-fab-item-ty in the item's inline style.
   */
  ty: string;
  /**
   * Zero-based index of the item in the resolved array.
   * Used to compute the stagger animation delay.
   */
  index: number;
  /**
   * Which side the inline tooltip should appear on.
   * Computed perpendicularly to the item's expansion vector so the tooltip
   * never competes with the expansion path:
   *   - Vertical / diagonal dominance → 'right' (vx ≥ 0) or 'left' (vx < 0)
   *   - Purely horizontal expansion   → 'top'
   */
  tooltipSide: 'top' | 'right' | 'bottom' | 'left';
}
