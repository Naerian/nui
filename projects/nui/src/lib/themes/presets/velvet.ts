import { SLATE_GRAYS, ThemePreset } from '../models';

export const velvet: ThemePreset = {
  name: 'velvet',
  colors: {
    light: {
      primary: '#831843',
      secondary: '#500724',
      accent: '#be185d',
      success: '#064e3b',
      info: '#4c0519',
      warning: '#b45309',
      danger: '#9f1239',
      neutral: SLATE_GRAYS[700],
    },
    dark: {
      primary: '#db2777',
      secondary: '#f472b6',
      accent: '#aa35aa',
      success: '#10b981',
      info: '#ec4899',
      warning: '#da9500',
      danger: '#fb7185',
      neutral: SLATE_GRAYS[400],
    },
  },
};
