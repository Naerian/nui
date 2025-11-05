import { NUISize, NUIColor } from "../../../configs";

/**
 * Variantes de forma del avatar
 */
export type AvatarVariant = 'circular' | 'rounded' | 'square';

/**
 * Configuración del Avatar
 */
export interface AvatarConfig {
  /**
   * Variante de forma del avatar
   * @default 'circular'
   */
  variant?: AvatarVariant;

  /**
   * Tamaño predefinido del avatar
   * @default 'md'
   */
  size?: NUISize;

  /**
   * Color de fondo personalizado (para avatares con iniciales o iconos)
   */
  color?: NUIColor;

  /**
   * URL de la imagen
   */
  src?: string;

  /**
   * Texto alternativo para la imagen (usado como fallback)
   */
  alt?: string;

  /**
   * Texto de iniciales a mostrar
   */
  initials?: string;

  /**
   * Icono a mostrar (clase de RemixIcon)
   */
  icon?: string;

  /**
   * Clases CSS adicionales
   */
  class?: string | string[];

  /**
   * Tamaño personalizado (sobrescribe size predefinido)
   */
  customSize?: number;
}

/**
 * Configuración del AvatarGroup
 */
export interface AvatarGroupConfig {
  /**
   * Número máximo de avatares visibles
   * El resto se muestra como "+N"
   */
  max?: number;

  /**
   * Espaciado entre avatares (en pixeles negativos para superposición)
   * @default -8
   */
  spacing?: number;

  /**
   * Tamaño de los avatares del grupo
   * @default 'md'
   */
  size?: NUISize;

  /**
   * Variante de forma para todos los avatares
   * @default 'circular'
   */
  variant?: AvatarVariant;

  /**
   * Mostrar borde alrededor de cada avatar
   * @default true
   */
  bordered?: boolean;

  /**
   * Clases CSS adicionales para el grupo
   */
  class?: string | string[];
}

/**
 * Item individual del AvatarGroup
 */
export interface AvatarGroupItem {
  /**
   * URL de la imagen
   */
  src?: string;

  /**
   * Texto alternativo
   */
  alt?: string;

  /**
   * Iniciales
   */
  initials?: string;

  /**
   * Icono
   */
  icon?: string;

  /**
   * Color de fondo
   */
  color?: NUIColor;

  /**
   * Tooltip al hacer hover
   */
  tooltip?: string;
}
