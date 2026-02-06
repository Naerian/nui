import { ZINC_GRAYS } from '../models/theme.config';
import { ThemePreset } from '../models/theme.model';

/**
 * Neon Preset - Bold, electric theme
 * Cyan/purple-based color palette with high contrast and vibrant tones
 */
export const neon: ThemePreset = {
  name: 'neon',
  colors: {
    light: {
      primary: '#0891b2',
      secondary: '#c026d3',
      accent: '#7c3aed',
      success: '#059669',
      info: '#0284c7',
      warning: '#df8e15',
      danger: '#ef4444',
      neutral: ZINC_GRAYS[500],
    },
    dark: {
      primary: '#0e7490',
      secondary: '#a21caf',
      accent: '#8b46f7',
      success: '#168767',
      info: '#1178b1',
      warning: '#b45309',
      danger: '#a32121',
      neutral: ZINC_GRAYS[400],
    },
  },
};
