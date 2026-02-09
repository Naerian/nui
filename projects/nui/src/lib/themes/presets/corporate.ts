import { SLATE_GRAYS } from '../models/theme-grays';
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
      secondary: '#64748b',
      accent: '#0891b2',
      success: '#16a34a',
      info: '#2563eb',
      warning: '#ca8a04',
      danger: '#dc2626',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#64748b',
      accent: '#0891b2',
      success: '#16a34a',
      info: '#3b82f6',
      warning: '#d97706',
      danger: '#dc2626',
      neutral: SLATE_GRAYS[400],
    },
  },
};
