import { ThemePreset } from '../models/theme.model';

/**
 * Minimal Preset - Clean, understated theme
 * Gray-based color palette with subtle accents
 */
export const minimal: ThemePreset = {
  name: 'minimal',
  colors: {
    light: {
      primary: '#18181b', 
      secondary: '#71717a',
      accent: '#3f3f46',
      success: '#14532d',
      info: '#1e3a8a',
      warning: '#78350f',
      danger: '#7f1d1d',
    },
    dark: {
      primary: '#fafafa',
      secondary: '#afafaf',
      accent: '#d4d4d8',
      success: '#bbf7d0',
      info: '#bfdbfe',
      warning: '#fde68a',
      danger: '#fecaca',
    }
  }
};
