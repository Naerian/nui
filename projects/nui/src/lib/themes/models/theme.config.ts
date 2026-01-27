import { ThemeGrays, ThemePreset } from './theme.model';

/**
 * Colores puros extremos (negro y blanco)
 */
export const PURE_COLORS = {
  BLACK: '#0d1117',  // Near-black (GitHub dark)
  WHITE: '#ffffff'   // Pure white
} as const;

/**
 * Escala de grises por defecto
 */
export const DEFAULT_GRAYS: ThemeGrays = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};

/**
 * Preset por defecto (Aura)
 */
export const DEFAULT_PRESET: ThemePreset = {
  name: 'aura',
  colors: {
    light: {
      primary: '#0d9488',
      secondary: '#64748b',
      accent: '#9333ea',
      success: '#059669',
      info: '#0e7490',
      warning: '#d97706',
      danger: '#dc2626',
    },
    dark: {
      primary: '#14b8a6',
      secondary: '#94a3b8',
      accent: '#a855f7',
      success: '#10b981',
      info: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
  },
};

/**
 * Token de inyección para la configuración del tema
 */
export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');
