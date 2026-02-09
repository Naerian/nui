import { ZINC_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

/**
 * Minimal Preset - Clean, understated theme
 * Gray-based color palette with subtle accents
 */
export const minimal: ThemePreset = {
  name: 'minimal',
  colors: {
    light: {
      primary: '#18181b',
      secondary: '#707070',
      accent: '#3c3c41',
      success: '#14532d',
      info: '#1e3a8a',
      warning: '#9c4615',
      danger: '#992323',
      neutral: ZINC_GRAYS[600],
    },
    dark: {
      primary: '#a1a1aa',
      secondary: '#5b5b66',
      accent: '#71717a',
      success: '#15803d',
      info: '#3b82f6',
      warning: '#f59e0b',
      danger: '#ef4444',
      neutral: ZINC_GRAYS[400],
    },
  },
};
