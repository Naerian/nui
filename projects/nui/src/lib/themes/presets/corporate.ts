import { ThemePreset } from '../theme.service';

/**
 * Corporate Preset - Professional business theme
 * Blue-based color palette with conservative, trustworthy tones
 */
export const corporate: ThemePreset = {
  name: 'corporate',
  colors: {
    light: {
      primary: '#1e40af',     // blue-800
      secondary: '#475569',   // slate-600
      accent: '#0891b2',      // cyan-600
      success: '#16a34a',     // green-600
      info: '#2563eb',        // blue-600
      warning: '#ca8a04',     // yellow-600
      danger: '#dc2626',      // red-600
    },
    dark: {
      primary: '#3b82f6',     // blue-500
      secondary: '#64748b',   // slate-500
      accent: '#06b6d4',      // cyan-500
      success: '#22c55e',     // green-500
      info: '#60a5fa',        // blue-400
      warning: '#eab308',     // yellow-500
      danger: '#ef4444',      // red-500
    }
  }
};
