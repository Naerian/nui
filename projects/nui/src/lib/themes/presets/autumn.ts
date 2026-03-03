import { STONE_GRAYS, ThemePreset } from '../models';

/**
 * Autumn Preset - Cozy, inviting theme
 * Orange/brown-based color palette with earthy, comfortable tones
 */
export const autumn: ThemePreset = {
  name: 'autumn',
  colors: {
    light: {
      primary: '#854D0E',
      secondary: '#451A03',
      accent: '#92400E',
      success: '#15803D',
      info: '#0369A1',
      warning: '#C2410C',
      danger: '#991B1B',
      neutral: '#57534E',
    },
    dark: {
      primary: '#FCD34D',
      secondary: '#FBBF24',
      accent: '#FDBA74',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FACC15',
      danger: '#FCA5A5',
      neutral: '#D1D5DB',
    },
  },
  grays: STONE_GRAYS,
};
