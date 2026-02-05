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
] as const;
export type NUIColor = (typeof NUI_COLORS)[number];

/**
 * Formatos de fecha de entrada soportados
 */
export const NUI_DATE_FORMATS = [
  'DD/MM/YYYY', // Europeo: 31/12/2024
  'MM/DD/YYYY', // Americano: 12/31/2024
  'YYYY/MM/DD', // ISO con barras: 2024/12/31
  'DD/MM/YY', // Europeo corto: 31/12/24
  'MM/DD/YY', // Americano corto: 12/31/24
  'YY/MM/DD', // ISO corto con barras: 24/12/31
  'DD-MM-YYYY', // Europeo con guiones: 31-12-2024
  'MM-DD-YYYY', // Americano con guiones: 12-31-2024
  'YYYY-MM-DD', // ISO con guiones: 2024-12-31
  'DD-MM-YY', // Europeo corto con guiones: 31-12-24
  'MM-DD-YY', // Americano corto con guiones: 12-31-24
  'YY-MM-DD', // ISO corto con guiones: 24-12-31
  'DD.MM.YYYY', // Europeo con puntos: 31.12.2024
  'MM.DD.YYYY', // Americano con puntos: 12.31.2024
  'YYYY.MM.DD', // ISO con puntos: 2024.12.31
  'DDMMYYYY', // Europeo sin separadores: 31122024
  'MMDDYYYY', // Americano sin separadores: 12312024
  'YYYYMMDD', // ISO sin separadores: 20241231
  'DD MM YYYY', // Europeo con espacios: 31 12 2024
  'MM DD YYYY', // Americano con espacios: 12 31 2024
  'YYYY MM DD', // ISO con espacios: 2024 12 31
] as const;
export type NUIDateFormat = (typeof NUI_DATE_FORMATS)[number];
