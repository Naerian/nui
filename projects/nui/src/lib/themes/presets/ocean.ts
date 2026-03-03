import { ThemePreset } from '../models/theme.model';

/**
 * Ocean preset - Deep blues and aqua tones inspired by the sea
 * Perfect for professional and calming applications
 */
export const ocean: ThemePreset = {
  name: 'ocean',
  colors: {
    light: {
      primary: '#0E7490',
      secondary: '#155E75',
      accent: '#0a77aa',
      success: '#15803D',
      info: '#056392',
      warning: '#b45c09',
      danger: '#B91C1C',
      neutral: '#52525B',
    },
    dark: {
      primary: '#67E8F9',
      secondary: '#22D3EE',
      accent: '#A5F3FC',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
};
