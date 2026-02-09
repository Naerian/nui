import { COOL_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

export const dopamine: ThemePreset = {
  name: 'dopamine',
  colors: {
    light: {
      primary: '#65a30d',
      secondary: '#db2777',
      accent: '#05a0bb',
      success: '#16a34a',
      info: '#2563eb',
      warning: '#f97316',
      danger: '#dc2626',
      neutral: COOL_GRAYS[600],
    },
    dark: {
      primary: '#66ab0c',
      secondary: '#9d174d',
      accent: '#03afce',
      success: '#15803d',
      info: '#156eed',
      warning: '#b36d08',
      danger: '#d13e3e',
      neutral: COOL_GRAYS[500],
    },
  },
};
