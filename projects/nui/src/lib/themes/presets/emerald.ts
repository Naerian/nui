import { SLATE_GRAYS, ThemePreset } from '../models';

export const emerald: ThemePreset = {
  name: 'emerald',
  colors: {
    light: {
      primary: '#059669',
      secondary: '#0f766e',
      accent: '#7c3aed',
      success: '#16a34a',
      info: '#0891b2',
      warning: '#ca8a04',
      danger: '#dc2626',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#10b981',
      secondary: '#14b8a6',
      accent: '#8b5cf6',
      success: '#16a34a',
      info: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444',
      neutral: SLATE_GRAYS[400],
    },
  },
};
