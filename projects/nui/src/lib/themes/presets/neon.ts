import { ThemePreset } from '../models/theme.model';

/**
 * Neon Preset - Bold, electric theme
 * Cyan/purple-based color palette with high contrast and vibrant tones
 */
export const neon: ThemePreset = {
  name: 'neon',
  colors: {
    light: {
      primary: '#06b6d4',     // cyan-500
      secondary: '#d946ef',   // fuchsia-500
      accent: '#8b5cf6',      // violet-500
      success: '#10b981',     // emerald-500
      info: '#0ea5e9',        // sky-500
      warning: '#f59e0b',     // amber-500
      danger: '#ef4444',      // red-500
    },
    dark: {
      primary: '#22d3ee',     // cyan-400
      secondary: '#e879f9',   // fuchsia-400
      accent: '#a78bfa',      // violet-400
      success: '#34d399',     // emerald-400
      info: '#38bdf8',        // sky-400
      warning: '#fbbf24',     // amber-400
      danger: '#f87171',      // red-400
    }
  }
};
