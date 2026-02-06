import { NEUTRAL_GRAYS, STONE_GRAYS } from '../models/theme.config';
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
      secondary: NEUTRAL_GRAYS[500],
      accent: '#dc2626',
      success: '#65a30d',
      info: '#0891b2',
      warning: '#d97706',
      danger: '#b91c1c',
      neutral: STONE_GRAYS[600],
    },
    dark: {
      primary: '#c2410c',
      secondary: NEUTRAL_GRAYS[300],
      accent: '#991b1b',
      success: '#4e761a',
      info: '#187593',
      warning: '#af5620',
      danger: '#a52a2a',
      neutral: STONE_GRAYS[700]
    },
  },
};
