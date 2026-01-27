import { ThemePreset } from '../models/theme.model';

export const twilight: ThemePreset = {
  name: 'twilight',
  colors: {
    light: {
      primary: '#8b5cf6',    // violet-500
      secondary: '#a78bfa',  // violet-400
      accent: '#c084fc',     // purple-400
      success: '#059669',    // emerald-600
      info: '#06b6d4',       // cyan-600
      warning: '#f59e0b',    // amber-500
      danger: '#dc2626',     // red-600
    },
    dark: {
      primary: '#a78bfa',    // violet-400
      secondary: '#c4b5fd',  // violet-300
      accent: '#d8b4fe',     // purple-300
      success: '#10b981',    // emerald-500
      info: '#22d3ee',       // cyan-400
      warning: '#fbbf24',    // amber-400
      danger: '#ef4444',     // red-500
    }
  }
};
