// ─── Types ─────────────────────────────────────────────────────────────────
export type ProgressBarValuePosition = 'hidden' | 'inside' | 'top' | 'bottom' | 'left' | 'right';
export type ProgressBarLabelPosition = 'top' | 'bottom' | 'left' | 'right';
export type ProgressBarValueFormat = 'percentage' | 'fractional';

// ─── Enums ──────────────────────────────────────────────────────────────────
export enum ProgressBarValuePositionEnum {
  HIDDEN = 'hidden',
  INSIDE = 'inside',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ProgressBarLabelPositionEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ProgressBarValueFormatEnum {
  PERCENTAGE = 'percentage',
  FRACTIONAL = 'fractional',
}

// ─── Defaults ────────────────────────────────────────────────────────────────
export const DEFAULT_PB_VALUE_POSITION: ProgressBarValuePosition = ProgressBarValuePositionEnum.INSIDE;
export const DEFAULT_PB_LABEL_POSITION: ProgressBarLabelPosition = ProgressBarLabelPositionEnum.TOP;
export const DEFAULT_PB_VALUE_FORMAT: ProgressBarValueFormat = ProgressBarValueFormatEnum.PERCENTAGE;
