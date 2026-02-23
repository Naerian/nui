import { ThemePreset } from '../models/theme.model';

/**
 * Twilight Preset - Mysterious, elegant theme
 * Deep purples and blues with subtle accents for a sophisticated look
 * Inspired by the colors of twilight, this preset creates a sense of calm and intrigue. The rich purples and blues evoke feelings of mystery and elegance, while the subtle accent colors add depth and interest to the overall palette. Perfect for applications that want to convey sophistication and creativity.
 */
export const twilight: ThemePreset = {
  name: 'twilight',
  colors: {
    light: {
      primary: '#4338CA',
      secondary: '#5B21B6',
      accent: '#7C3AED',
      success: '#15803D',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#B91C1C',
      neutral: '#52525B',
    },
    dark: {
      primary: '#A5B4FC',
      secondary: '#C4B5FD',
      accent: '#DDD6FE',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D4D4D8',
    },
  },
};
