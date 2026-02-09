import { SLATE_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

/**
 * Ocean preset - Deep blues and aqua tones inspired by the sea
 * Perfect for professional and calming applications
 */
export const ocean: ThemePreset = {
  name: 'ocean',
  colors: {
    light: {
      primary: '#0077be',
      secondary: '#4a90a4',
      accent: '#5ca5af',
      success: '#26a69a',
      info: '#039be5',
      warning: '#ef9050',
      danger: '#ef5350',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#06b6d4',
      success: '#14b8a6',
      info: '#3b82f6',
      warning: '#f97316',
      danger: '#ef4444',
      neutral: SLATE_GRAYS[400],
    },
  },
};
