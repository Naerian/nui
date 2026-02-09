import { NEUTRAL_GRAYS, STONE_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

/**
 * Warm Preset - Cozy, inviting theme
 * Orange/brown-based color palette with earthy, comfortable tones
 */
export const warm: ThemePreset = {
  name: 'warm',
  colors: {
    light: {
      primary: '#ea580c',
      secondary: '#78350f',
      accent: '#dc2626',
      success: '#65a30d',
      info: '#0891b2',
      warning: '#d97706',
      danger: '#b91c1c',
      neutral: STONE_GRAYS[600],
    },
    dark: {
      primary: '#ea580c',
      secondary: '#d97706',
      accent: '#dc2626',
      success: '#65a30d',
      info: '#0891b2',
      warning: '#f59e0b',
      danger: '#ef4444',
      neutral: STONE_GRAYS[500],
    },
  },
};
