import { COOL_GRAYS, SLATE_GRAYS, ZINC_GRAYS } from '../models/theme.config';
import { ThemePreset } from '../models/theme.model';

export const aura: ThemePreset = {
  name: 'aura',
  colors: {
    light: {
      primary: '#0d9488',
      secondary: COOL_GRAYS[700],
      accent: '#7c3aed',
      success: '#16a34a',
      info: '#0891b2',
      warning: '#ca8a04',
      danger: '#b91c1c',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#129d92',
      secondary: COOL_GRAYS[300],
      accent: '#ae7aff',
      success: '#15803d',
      info: '#0369a1',
      warning: '#c7651a',
      danger: '#b32525',
      neutral: SLATE_GRAYS[500],
    },
  },
};
