import { SLATE_GRAYS } from '../models/theme-grays';
import { ThemePreset } from '../models/theme.model';

/**
 * Ocean preset - Deep blues and aqua tones inspired by the sea
 * Perfect for professional and calming applications
 */
export const ocean: ThemePreset = {
  name: 'ocean',
  colors: {
    light: {
      primary: '#0077be',
      secondary: '#4a90a4',
      accent: '#5ca5af',
      success: '#26a69a',
      info: '#039be5',
      warning: '#ef9050',
      danger: '#ef5350',
      neutral: SLATE_GRAYS[600],
    },
    dark: {
      primary: '#00a4ff',
      secondary: '#647e94',
      accent: '#3fb5c5',
      success: '#3bb573',
      info: '#42a5f5',
      warning: '#ff8852',
      danger: '#ff5252',
      neutral: SLATE_GRAYS[400],
    },
  },
};
