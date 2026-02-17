import { STONE_GRAYS, ThemePreset } from '../models';

export const coffee: ThemePreset = {
  name: 'coffee',
  colors: {
    light: {
      primary: '#78350f',
      secondary: '#4b381e',
      accent: '#d97706',
      success: '#3f6212',
      info: '#0891b2',
      warning: '#b45309',
      danger: '#991b1b',
      neutral: STONE_GRAYS[700],
    },
    dark: {
      primary: '#d97706',
      secondary: '#78716c',
      accent: '#d97706',
      success: '#65a30d',
      info: '#0891b2',
      warning: '#ea580c',
      danger: '#dc2626',
      neutral: '#a8a29e',
    },
  },
};
