import { SLATE_GRAYS, ThemePreset } from '../models';

export const velvet: ThemePreset = {
  name: 'velvet',
  colors: {
    light: {
      primary: '#831843',
      secondary: '#500724',
      accent: '#be185d',
      success: '#064e3b',
      info: '#186ebe',
      warning: '#b45309',
      danger: '#9f1239',
      neutral: SLATE_GRAYS[700],
    },
    dark: {
      primary: '#be185d',
      secondary: '#9f1239',
      accent: '#a21caf',
      success: '#047857',
      info: '#2576c2',
      warning: '#b45309',
      danger: '#e11d48',
      neutral: SLATE_GRAYS[400],
    },
  },
};
