import { ThemePreset } from '../models/theme.model';

/**
 * Corporate Preset - Professional business theme
 * Blue-based color palette with conservative, trustworthy tones
 */
export const corporate: ThemePreset = {
  name: 'corporate',
  colors: {
    light: {
      primary: '#1F3A8A', 
      secondary: '#475569',
      accent: '#2563EB',
      success: '#166534',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#B91C1C',
      neutral: '#52525B',
    },
    dark: {
      primary: '#93C5FD',
      secondary: '#CBD5E1',
      accent: '#60A5FA',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
};
