import { STONE_GRAYS } from '../models/theme.config';
import { ThemePreset } from '../models/theme.model';

export const sunset: ThemePreset = {
  name: 'sunset',
  colors: {
    light: {
      primary: '#e11d48',
      secondary: '#db2777',
      accent: '#ea580c',
      success: '#059669',
      info: '#0284c7',
      warning: '#d97706',
      danger: '#dc2626',
      neutral: STONE_GRAYS[600],
    },
    dark: {
      primary: '#e51e4e',
      secondary: '#b7225e',
      accent: '#cf3c00',
      success: '#0a7648',
      info: '#0369a1',
      warning: '#b45309',
      danger: '#991b1b',
      neutral: STONE_GRAYS[500]
    },
  },
};
