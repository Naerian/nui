import { ThemePreset } from '../models/theme.model';

/**
 * Sunset Preset - Warm, vibrant theme
 * Orange and pink-based color palette with energetic, lively tones
 * Inspired by the colors of a sunset, this preset evokes feelings of warmth, creativity, and optimism. The primary orange and pink hues create a dynamic and inviting atmosphere, while the complementary colors provide balance and versatility for various UI elements.
 */
export const sunset: ThemePreset = {
  name: 'sunset',
  colors: {
    light: {
      primary: '#C2410C',
      secondary: '#C2410C',
      accent: '#E11D48',
      success: '#15803D',
      info: '#0369A1',
      warning: '#B45309',
      danger: '#DC2626',
      neutral: '#57534E',
    },
    dark: {
      primary: '#FDBA74',
      secondary: '#FB923C',
      accent: '#FDA4AF',
      success: '#86EFAC',
      info: '#7DD3FC',
      warning: '#FCD34D',
      danger: '#FCA5A5',
      neutral: '#D6D3D1',
    },
  },
};
