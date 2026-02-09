import { aura } from '../presets/aura';
import { ThemeGrays, ThemePreset } from './theme.model';

/**
 * UMBRAL PARA DEFINIR EL CONTRASTE ENTRE NEGRO Y BLANCO SOBRE UN COLOR
 */
export const LUMINANCE_UMBRAL = 0.45;

/**
 * Colores puros extremos (negro y blanco)
 */
export const PURE_COLORS = {
  BLACK: '#0d1117', // Near-black (GitHub dark)
  WHITE: '#ffffff', // Pure white
} as const;

/**
 * Preset por defecto (Aura)
 */
export const DEFAULT_PRESET: ThemePreset = aura;

/**
 * Token de inyección para la configuración del tema
 */
export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');
