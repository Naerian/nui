import { aura } from '../presets/aura';
import { ThemeGrays, ThemePreset } from './theme.model';

/**
 * UMBRAL PARA DEFINIR EL CONTRASTE ENTRE NEGRO Y BLANCO SOBRE UN COLOR
 */
export const LUMINANCE_UMBRAL = 0.40;

/**
 * Colores puros extremos (negro y blanco)
 */
export const PURE_COLORS = {
  BLACK: '#0d1117', // Near-black (GitHub dark)
  WHITE: '#ffffff', // Pure white
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
export const DEFAULT_PRESET: ThemePreset = aura;

/**
 * Token de inyección para la configuración del tema
 */
export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');
