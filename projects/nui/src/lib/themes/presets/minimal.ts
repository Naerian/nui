import { ThemePreset } from '../theme.service';

/**
 * Minimal Preset - Clean, understated theme
 * Gray-based color palette with subtle accents
 */
export const minimal: ThemePreset = {
  name: 'minimal',
  colors: {
    light: {
      primary: '#18181b',     // zinc-900
      secondary: '#71717a',   // zinc-500
      accent: '#3f3f46',      // zinc-700
      success: '#14532d',     // green-900
      info: '#1e3a8a',        // blue-900
      warning: '#78350f',     // amber-900
      danger: '#7f1d1d',      // red-900
    },
    dark: {
      primary: '#fafafa',     // zinc-50
      secondary: '#a1a1aa',   // zinc-400
      accent: '#d4d4d8',      // zinc-300
      success: '#bbf7d0',     // green-200
      info: '#bfdbfe',        // blue-200
      warning: '#fde68a',     // yellow-200
      danger: '#fecaca',      // red-200
    }
  }
};
