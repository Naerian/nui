import { ThemePreset } from '../models/theme.model';

/**
 * Dopamine Preset - Energetic, vibrant theme
 * Bright, high-contrast color palette with stimulating tones
 */
export const dopamine: ThemePreset = {
  name: 'dopamine',
  colors: {
    light: {
      primary: '#7C3AED',
      secondary: '#AD1457',
      accent: '#0E7490',
      success: '#15803D',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#C62828',
      neutral: '#52525B',
    },
    dark: {
      primary: '#C4B5FD',
      secondary: '#FDA4AF',
      accent: '#67E8F9',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
};
