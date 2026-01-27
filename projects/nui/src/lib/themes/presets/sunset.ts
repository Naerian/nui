import { ThemePreset } from '../models/theme.model';

export const sunset: ThemePreset = {
  name: 'sunset',
  colors: {
    light: {
      primary: '#f43f5e',    // rose-500
      secondary: '#f472b6',  // pink-400
      accent: '#fb923c',     // orange-400
      success: '#059669',    // emerald-600
      info: '#0ea5e9',       // sky-500
      warning: '#f59e0b',    // amber-500
      danger: '#dc2626',     // red-600
    },
    dark: {
      primary: '#fb7185',    // rose-400
      secondary: '#f9a8d4',  // pink-300
      accent: '#fdba74',     // orange-300
      success: '#10b981',    // emerald-500
      info: '#38bdf8',       // sky-400
      warning: '#fbbf24',    // amber-400
      danger: '#ef4444',     // red-500
    }
  }
};
