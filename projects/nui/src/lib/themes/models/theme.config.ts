import { minimal } from '../presets/minimal';
import { ThemePreset } from './theme.model';

/**
 * Configuración de luminancia para determinar si un token es claro u oscuro
 * Basado en el estándar WCAG, pero ajustado para un umbral más alto
 */
export const NUI_LUMINANCE_THRESHOLD = 0.18;

/**
 * Colores puros extremos (negro y blanco)
 */
export const PURE_COLORS = {
  BLACK: '#1E1E1E', // Near-black
  WHITE: '#ffffff', // Pure white
} as const;

/**
 * Preset por defecto (Minimalista)
 */
export const DEFAULT_PRESET: ThemePreset = minimal;

/**
 * Token de inyección para la configuración del tema
 */
export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');
