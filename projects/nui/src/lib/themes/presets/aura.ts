import { SLATE_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

export const aura: ThemePreset = {
  name: 'aura',
  colors: {
    light: {
      primary: '#0d9488',
      secondary: '#7c3aed',
      accent: '#d946ef',
      success: '#16a34a',
      info: '#06b6d4',
      warning: '#d97706',
      danger: '#dc2626',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#14b8a6',
      secondary: '#8b5cf6',
      accent: '#d946ef',
      success: '#16a34a',
      info: '#0891b2',
      warning: '#ec8815',
      danger: '#ef4444',
      neutral: SLATE_GRAYS[400],
    },
  },
};
