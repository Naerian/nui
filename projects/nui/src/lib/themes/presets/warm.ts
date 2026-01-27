import { ThemePreset } from '../models/theme.model';

/**
 * Warm Preset - Cozy, inviting theme
 * Orange/brown-based color palette with earthy, comfortable tones
 */
export const warm: ThemePreset = {
  name: 'warm',
  colors: {
    light: {
      primary: '#ea580c',     // orange-600
      secondary: '#92400e',   // amber-800
      accent: '#dc2626',      // red-600
      success: '#65a30d',     // lime-600
      info: '#0891b2',        // cyan-600
      warning: '#d97706',     // amber-600
      danger: '#b91c1c',      // red-700
    },
    dark: {
      primary: '#fb923c',     // orange-400
      secondary: '#fbbf24',   // amber-400
      accent: '#f87171',      // red-400
      success: '#a3e635',     // lime-400
      info: '#22d3ee',        // cyan-400
      warning: '#fbbf24',     // amber-400
      danger: '#fca5a5',      // red-300
    }
  }
};
