/**
 * Tipos de tamaños disponibles para los componentes
 */
export const NUI_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type NUISize = (typeof NUI_SIZES)[number];

/**
 * Variantes visuales disponibles para los componentes
 * - 'solid': Fondo de color completo (default)
 * - 'outline': Solo borde de color
 * - 'ghost': Fondo suave de color
 */
export const NUI_VARIANTS = ['solid', 'outline', 'ghost'] as const;
export type NUIVariant = (typeof NUI_VARIANTS)[number];

/**
 * Formas disponibles para los componentes
 * - 'rounded': Bordes redondeados (default)
 * - 'square': Bordes cuadrados
 * - 'pill': Bordes completamente redondeados
 */
export const NUI_SHAPES = ['rounded', 'square', 'pill'] as const;
export type NUIShape = (typeof NUI_SHAPES)[number];

/**
 * Colores disponibles para los componentes
 */
export const NUI_COLORS = [
  'primary',
  'accent',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
] as const;
export type NUIColor = (typeof NUI_COLORS)[number];
