import { COOL_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

export const dopamine: ThemePreset = {
  name: 'dopamine',
  colors: {
    light: {
      primary: '#65a30d',
      secondary: '#db2777',
      accent: '#0891b2',
      success: '#16a34a',
      info: '#2563eb',
      warning: '#f97316',
      danger: '#dc2626',
      neutral: COOL_GRAYS[600],
    },
    dark: {
      primary: '#a3e635',
      secondary: '#f472b6',
      accent: '#22d3ee',
      success: '#4ade80',
      info: '#60a5fa',
      warning: '#fbbf24',
      danger: '#f87171',
      neutral: COOL_GRAYS[400],
    },
  },
};
