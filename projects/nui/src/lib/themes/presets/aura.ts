import { ThemePreset } from '../models/theme.model';
import { MAUVE_GRAYS } from '../models/theme-grays';

/**
 * Aura Preset - Ethereal, mystical theme
 * Soft purple-based color palette with dreamy, otherworldly tones
 */
export const aura: ThemePreset = {
  name: 'aura',
  colors: {
    light: {
      primary: '#6750A4',
      secondary: '#625B71',
      accent: '#7D5260',
      success: '#2E7D32',
      info: '#01669D',
      warning: '#91501c',
      danger: '#B3261E',
      neutral: '#605D62',
    },
    dark: {
      primary: '#D0BCFF',
      secondary: '#CCC2DC',
      accent: '#EFB8C8',
      success: '#81C784',
      info: '#4FC3F7',
      warning: '#FFB74D',
      danger: '#F2B8B5',
      neutral: '#CAC4D0',
    },
  },
  grays: MAUVE_GRAYS,
};
