import { ThemePreset } from '../models/theme.model';

/**
 * Velvet Preset - Luxurious, rich theme
 * Deep reds and complementary tones for a sophisticated, opulent look
 * Inspired by the rich textures and colors of velvet fabric, this preset exudes luxury and sophistication. The deep reds create a sense of warmth and opulence, while the complementary tones add depth and balance to the overall palette. Perfect for applications that want to convey elegance and refinement.
 */
export const velvet: ThemePreset = {
  name: 'velvet',
  colors: {
    light: {
      primary: '#7F1D1D',
      secondary: '#9F1239',
      accent: '#BE185D',
      success: '#166534',
      info: '#155E75',
      warning: '#B45309',
      danger: '#991B1B',
      neutral: '#57534E',
    },
    dark: {
      primary: '#FCA5A5',
      secondary: '#FDA4AF',
      accent: '#F9A8D4',
      success: '#86EFAC',
      info: '#67E8F9',
      warning: '#FCD34D',
      danger: '#F87171',
      neutral: '#D6D3D1',
    },
  },
};
