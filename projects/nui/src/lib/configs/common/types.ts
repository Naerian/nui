/**
 * Tipos de tamaños disponibles para los componentes
 */
export type NUISize = 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Variantes visuales disponibles para los componentes
 * - 'solid': Fondo de color completo (default)
 * - 'outline': Solo borde de color
 * - 'ghost': Fondo suave de color
 */
export type NUIVariant = 'solid' | 'outline' | 'ghost';

/**
 * Colores disponibles para los componentes
 */
export type NUIColor =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * Formatos de fecha de entrada soportados
 */
export type NUIDateFormat =
  // Formatos con barras (/)
  | 'DD/MM/YYYY' // Europeo: 31/12/2024
  | 'MM/DD/YYYY' // Americano: 12/31/2024
  | 'YYYY/MM/DD' // ISO con barras: 2024/12/31
  | 'DD/MM/YY' // Europeo corto: 31/12/24
  | 'MM/DD/YY' // Americano corto: 12/31/24
  | 'YY/MM/DD' // ISO corto con barras: 24/12/31

  // Formatos con guiones (-)
  | 'DD-MM-YYYY' // Europeo con guiones: 31-12-2024
  | 'MM-DD-YYYY' // Americano con guiones: 12-31-2024
  | 'YYYY-MM-DD' // ISO estándar: 2024-12-31
  | 'DD-MM-YY' // Europeo corto con guiones: 31-12-24
  | 'MM-DD-YY' // Americano corto con guiones: 12-31-24
  | 'YY-MM-DD' // ISO corto: 24-12-31

  // Formatos con puntos (.)
  | 'DD.MM.YYYY' // Europeo con puntos: 31.12.2024
  | 'MM.DD.YYYY' // Americano con puntos: 12.31.2024
  | 'YYYY.MM.DD' // ISO con puntos: 2024.12.31

  // Formatos sin separadores
  | 'DDMMYYYY' // Europeo compacto: 31122024
  | 'MMDDYYYY' // Americano compacto: 12312024
  | 'YYYYMMDD' // ISO compacto: 20241231

  // Formatos con espacios
  | 'DD MM YYYY' // Europeo con espacios: 31 12 2024
  | 'MM DD YYYY' // Americano con espacios: 12 31 2024
  | 'YYYY MM DD'; // ISO con espacios: 2024 12 31
