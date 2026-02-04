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
      secondary: '#92400e',
      accent: '#dc2626',
      success: '#65a30d',
      info: '#0891b2',
      warning: '#d97706',
      danger: '#b91c1c',
    },
    dark: {
      primary: '#c2410c',
      secondary: '#8b4924',
      accent: '#991b1b',
      success: '#4e761a',
      info: '#187593',
      warning: '#af5620',
      danger: '#a52a2a',
    },
  },
};
