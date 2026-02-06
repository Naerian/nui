import { COOL_GRAYS, ZINC_GRAYS } from '../models/theme.config';
import { ThemePreset } from '../models/theme.model';

export const twilight: ThemePreset = {
  name: 'twilight',
  colors: {
    light: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c084fc',
      success: '#059669',
      info: '#06b6d4',
      warning: '#ce690a',
      danger: '#dc2626',
      neutral: COOL_GRAYS[600],
    },
    dark: {
      primary: '#904fff',
      secondary: '#8d2bdb',
      accent: '#cc38ff',
      success: '#1f8165',
      info: '#1383c1',
      warning: '#b77313',
      danger: '#c32626',
      neutral: COOL_GRAYS[500]
    },
  },
};
