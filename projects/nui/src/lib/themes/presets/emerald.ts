import { ThemePreset } from '../models/theme.model';
import { COOL_GRAYS } from '../models/theme-grays';

/**
 * Emerald Preset - Fresh, vibrant theme
 * Green-based color palette with lively, rejuvenating tones
 */
export const emerald: ThemePreset = {
  name: 'emerald',
  colors: {
    light: {
      primary: '#047857',
      secondary: '#166534',
      accent: '#065F46',
      success: '#15803D',
      info: '#0E7490',
      warning: '#B45309',
      danger: '#B91C1C',
      neutral: '#52525B',
    },
    dark: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#6EE7B7',
      success: '#43c974',
      info: '#67E8F9',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
  grays: COOL_GRAYS,
};
