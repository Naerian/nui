import { aura } from '../presets/aura';
import { ThemeGrays, ThemePreset } from './theme.model';

/**
 * UMBRAL PARA DEFINIR EL CONTRASTE ENTRE NEGRO Y BLANCO SOBRE UN COLOR
 */
export const LUMINANCE_UMBRAL = 0.4;

/**
 * Colores puros extremos (negro y blanco)
 */
export const PURE_COLORS = {
  BLACK: '#0d1117', // Near-black (GitHub dark)
  WHITE: '#ffffff', // Pure white
} as const;

// SLATE GRAYS
export const SLATE_GRAYS: ThemeGrays = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
};

// COOL GRAYS
export const COOL_GRAYS: ThemeGrays = {
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

// ZINC GRAYS
export const ZINC_GRAYS: ThemeGrays = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
};

// NEUTRAL GRAYS
export const NEUTRAL_GRAYS: ThemeGrays = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
};

// STONE GRAYS
export const STONE_GRAYS: ThemeGrays = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
};

/**
 * Preset por defecto (Aura)
 */
export const DEFAULT_PRESET: ThemePreset = aura;

/**
 * Token de inyección para la configuración del tema
 */
export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');
