import { ThemePreset } from '../models/theme.model';
import { NEUTRAL_GRAYS } from '../models/theme-grays';

/**
 * Minimal Preset - Clean, understated theme
 * Gray-based color palette with subtle accents
 */
export const minimal: ThemePreset = {
  name: 'minimal',
  colors: {
    light: {
      primary: '#18181B',
      secondary: '#3F3F46',
      accent: '#4F46E5',
      success: '#15803D',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#cc2828',
      neutral: '#52525B',
    },
    dark: {
      primary: '#F4F4F5',
      secondary: '#A1A1AA',
      accent: '#818CF8',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
  grays: NEUTRAL_GRAYS
};
