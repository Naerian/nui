import { COOL_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

export const twilight: ThemePreset = {
  name: 'twilight',
  colors: {
    light: {
      primary: '#7c3aed',
      secondary: '#9333ea',
      accent: '#a855f7',
      success: '#059669',
      info: '#06b6d4',
      warning: '#d97706',
      danger: '#dc2626',
      neutral: COOL_GRAYS[600],
    },
    dark: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c084fc',
      success: '#059669',
      info: '#06b6d4',
      warning: '#ce690a',
      danger: '#dc2626',
      neutral: COOL_GRAYS[500],
    },
  },
};
