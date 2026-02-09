import { STONE_GRAYS } from '../models/theme-grays';
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
      primary: '#fb7185',
      secondary: '#f472b6',
      accent: '#fb923c',
      success: '#10b981',
      info: '#0ea5e9',
      warning: '#f59e0b',
      danger: '#ef4444',
      neutral: STONE_GRAYS[400],
    },
  },
};
