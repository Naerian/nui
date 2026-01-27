import { ThemePreset } from '../models/theme.model';

/**
 * Ocean preset - Deep blues and aqua tones inspired by the sea
 * Perfect for professional and calming applications
 */
export const ocean: ThemePreset = {
  name: 'ocean',
  colors: {
    light: {
      primary: '#0077be',      // Deep ocean blue
      secondary: '#4a90a4',    // Slate blue
      accent: '#00bcd4',       // Cyan
      success: '#26a69a',      // Teal
      info: '#039be5',         // Light blue
      warning: '#ffa726',      // Amber
      danger: '#ef5350',       // Red
    },
    dark: {
      primary: '#29b6f6',      // Light ocean blue
      secondary: '#78909c',    // Blue grey
      accent: '#4dd0e1',       // Light cyan
      success: '#4db6ac',      // Light teal
      info: '#42a5f5',         // Sky blue
      warning: '#ffb74d',      // Light amber
      danger: '#ff5252',       // Light red
    }
  }
};
