import { ThemePreset } from '../models/theme.model';

/**
 * Corporate Preset - Professional business theme
 * Blue-based color palette with conservative, trustworthy tones
 */
export const corporate: ThemePreset = {
  name: 'corporate',
  colors: {
    light: {
      primary: '#1e40af',
      secondary: '#475569',
      accent: '#0891b2',
      success: '#16a34a',
      info: '#2563eb',
      warning: '#ca8a04',
      danger: '#dc2626',
    },
    dark: {
      primary: '#4171ff',
      secondary: '#506a8f',
      accent: '#1d89a7',
      success: '#15803d',
      info: '#3964dd',
      warning: '#b5710f',
      danger: '#ad2b2b',
    },
  },
};
