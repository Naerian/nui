import { ThemePreset } from '../models/theme.model';
import { SLATE_GRAYS } from '../models/theme-grays';

/**
 * Neon Preset - Bold, electric theme
 * Cyan/purple-based color palette with high contrast and vibrant tones
 */
export const neon: ThemePreset = {
  name: 'neon',
  colors: {
    light: {
      primary: '#4F46E5',
      secondary: '#DB2777',
      accent: '#814cfd',
      success: '#15803D',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#E11D48',
      neutral: '#3F3F46',
    },
    dark: {
      primary: '#818CF8',
      secondary: '#F472B6',
      accent: '#22D3EE',
      success: '#4ADE80',
      info: '#38BDF8',
      warning: '#FACC15',
      danger: '#F87171',
      neutral: '#A1A1AA',
    },
  },
  grays: SLATE_GRAYS
};
