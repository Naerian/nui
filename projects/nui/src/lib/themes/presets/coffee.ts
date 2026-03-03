import { ThemePreset } from '../models/theme.model';

/**
 * Coffee Preset - Warm, comforting theme
 * Brown-based color palette with rich, earthy tones
 */
export const coffee: ThemePreset = {
  name: 'coffee',
  colors: {
    light: {
      primary: '#6F4E37',
      secondary: '#7A6A58',
      accent: '#8f5839',
      success: '#386A20',
      info: '#006874',
      warning: '#974900',
      danger: '#8C1D18',
      neutral: '#605D5A',
    },
    dark: {
      primary: '#E6BEA9',
      secondary: '#D8C2B0',
      accent: '#F2B8A0',
      success: '#9FD67A',
      info: '#4FD8EB',
      warning: '#FFB77A',
      danger: '#FFB4AB',
      neutral: '#D0C4BC',
    },
  },
};
