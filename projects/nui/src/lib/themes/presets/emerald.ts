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
      primary: '#34d399',
      secondary: '#2dd4bf',
      accent: '#bca6ff',
      success: '#22c55e',
      info: '#78e4f7',
      warning: '#fbbf24',
      danger: '#ff8a8a',
      neutral: SLATE_GRAYS[200],
    },
  },
};
