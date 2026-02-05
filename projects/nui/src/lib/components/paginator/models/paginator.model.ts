import { NUIColor, NUISize, NUIVariant } from '../../../configs';

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const DEFAULT_MAX_VISIBLE_PAGES = 5;
export const DEFAULT_ITEMS_PER_PAGE = 10;
export const DEFAULT_GAP = '0.5rem';

/**
 * Configuración del componente Paginator
 */
export interface PaginatorConfig {
  /** Número máximo de páginas visibles */
  maxVisiblePages?: number;
  /** Mostrar botones de primera y última página */
  showFirstLast?: boolean;
  /** Mostrar selector de items por página */
  showPageSizeSelector?: boolean;
  /** Mostrar información del rango de items */
  showItemRange?: boolean;
  /** Mostrar input para saltar a una página específica */
  showPageJump?: boolean;
  /** Opciones para el selector de items por página */
  pageSizeOptions?: number[];
  /** Scroll automático al cambiar página */
  autoScroll?: boolean;
  /** Elemento al que hacer scroll (selector CSS o elemento) */
  scrollTarget?: string | HTMLElement;
  /** Configuración del layout personalizado */
  layout?: PaginatorLayout;
  /** Configuración del layout para dispositivos móviles (se usa en modo compact automático) */
  mobileLayout?: PaginatorLayout;
}

/**
 * Textos personalizables del Paginator
 */
export interface PaginatorTexts {
  /** Texto para "Primera página" */
  firstPage?: string;
  /** Texto para "Última página" */
  lastPage?: string;
  /** Texto para "Página anterior" */
  previousPage?: string;
  /** Texto para "Página siguiente" */
  nextPage?: string;
  /** Texto para "Ir a la página" */
  goToPage?: string;
  /** Texto para "Ir" (botón) */
  go?: string;
  /** Texto para "Items por página" */
  itemsPerPage?: string;
  /** Template para mostrar rango: {start}-{end} de {total} */
  showingItems?: string;
  /** Texto para "Página {page}" */
  pageLabel?: string;
}

/**
 * Configuración de navegación por teclado
 */
export interface KeyboardConfig {
  /** Teclas para ir a la primera página */
  firstPage?: string[];
  /** Teclas para ir a la última página */
  lastPage?: string[];
  /** Teclas para página anterior */
  previousPage?: string[];
  /** Teclas para página siguiente */
  nextPage?: string[];
  /** Habilitar navegación por teclado */
  enabled?: boolean;
}

/**
 * Configuración de loading y estados
 */
export interface LoadingConfig {
  /** Mostrar loading durante cambios */
  showLoading?: boolean;
  /** Texto durante loading */
  loadingText?: string;
  /** Delay antes de mostrar loading (ms) */
  loadingDelay?: number;
  /** Deshabilitar controles durante loading */
  disableOnLoading?: boolean;
}

/**
 * Configuración responsiva para diferentes breakpoints
 */
export interface ResponsiveConfig {
  /** Configuración para móviles */
  mobile?: Partial<PaginatorConfig>;
  /** Configuración para tablets */
  tablet?: Partial<PaginatorConfig>;
  /** Breakpoints personalizados (px) */
  breakpoints?: {
    mobile?: number;
    tablet?: number;
  };
}

/**
 * Tipos de elementos que pueden ir en el layout del paginator
 */
export type PaginatorElement =
  | 'firstButton'
  | 'prevButton'
  | 'pageNumbers'
  | 'fractionalNumbers'
  | 'nextButton'
  | 'lastButton'
  | 'pageSize'
  | 'itemRange'
  | 'pageJump'
  | 'currentPage'
  | 'infiniteButton'
  | 'infiniteCounter'
  | 'infiniteEndMessage';

export enum PaginatorElementEnum {
  FIRST_BUTTON = 'firstButton',
  PREV_BUTTON = 'prevButton',
  PAGE_NUMBERS = 'pageNumbers',
  FRACTIONAL_NUMBERS = 'fractionalNumbers',
  NEXT_BUTTON = 'nextButton',
  LAST_BUTTON = 'lastButton',
  PAGE_SIZE = 'pageSize',
  ITEM_RANGE = 'itemRange',
  PAGE_JUMP = 'pageJump',
  CURRENT_PAGE = 'currentPage',
  INFINITE_BUTTON = 'infiniteButton',
  INFINITE_COUNTER = 'infiniteCounter',
  INFINITE_END_MESSAGE = 'infiniteEndMessage',
}

/**
 * Modos de visualización disponibles para el paginador
 * - 'default': Modo estándar con todos los elementos visibles
 * - 'compact': Solo anterior/siguiente y página actual (+ primera/última si está habilitado)
 * - 'fractional': Anterior/siguiente + página actual/total (ej: "3 de 10")
 * - 'minimal': Solo flechas anterior/siguiente
 */
export type PaginatorMode = 'default' | 'compact' | 'fractional' | 'minimal';
export enum PaginatorModeEnum {
  DEFAULT = 'default',
  COMPACT = 'compact',
  FRACTIONAL = 'fractional',
  MINIMAL = 'minimal',
}
export const DEFAULT_PAGINATOR_MODE: PaginatorMode = PaginatorModeEnum.DEFAULT;

/**
 * Configuración de áreas del layout del paginador
 * - 'top': Área superior
 * - 'left': Área izquierda de la navegación principal
 * - 'center': Área central de la navegación principal
 * - 'right': Área derecha de la navegación principal
 * - 'bottom': Área inferior
 */
export const PAGINATOR_LAYOUT_AREAS: PaginatorLayoutArea[] = [
  'top',
  'left',
  'center',
  'right',
  'bottom',
];
export type PaginatorLayoutArea = 'top' | 'left' | 'center' | 'right' | 'bottom';
export enum PaginatorLayoutAreaEnum {
  TOP = 'top',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

/**
 * Dirección del layout: fila (horizontal) o columna (vertical)
 */
export type PLayoutDirection = 'row' | 'column';
export enum PLayoutDirectionEnum {
  ROW = 'row',
  COLUMN = 'column',
}

/**
 * Alineación de los elementos dentro de cada área del layout
 */
export type PLayoutAlign = 'start' | 'center' | 'end' | 'space-between' | 'space-around';
export enum PLayoutAlignEnum {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
}
export type PVerticalAlign = 'start' | 'center' | 'end';
export enum PVerticalAlignEnum {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

/**
 * Configuración del layout personalizado del paginator
 * Permite organizar los elementos en diferentes áreas (top, left, center, right, bottom)
 */
export interface PaginatorLayout {
  /** Elementos en el área superior */
  top?: PaginatorElement[];
  /** Elementos en el área izquierda */
  left?: PaginatorElement[];
  /** Elementos en el área central */
  center?: PaginatorElement[];
  /** Elementos en el área derecha */
  right?: PaginatorElement[];
  /** Elementos en el área inferior */
  bottom?: PaginatorElement[];
  /** Dirección del layout principal: 'row' (horizontal) o 'column' (vertical) */
  direction?: PLayoutDirection;
  /** Alineación de los elementos: 'start', 'center', 'end', 'space-between', 'space-around' */
  align?: PLayoutAlign;
  /** Configuración de alineación para el área superior */
  topConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign };
  /** Configuración de alineación para el área inferior */
  bottomConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign };
  /** Alineación vertical de los elementos: 'start', 'center', 'end', 'space-between', 'space-around' */
  leftConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign };
  /** Configuración de alineación para el área central */
  centerConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign };
  /** Configuración de alineación para el área derecha */
  rightConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign };
  /** Alineación vertical general (si no se especifica en áreas individuales) */
  verticalAlign?: PVerticalAlign;
  /** Gap entre elementos (en rem o px) */
  gap?: string;
}

export const DEFAULT_PAGINATOR_LAYOUT: PaginatorLayout = {
  top: [],
  center: [],
  direction: 'column',
  align: 'center',
  gap: '1rem',
};

export const DEFAULT_MINIMAL_LAYOUT: PaginatorLayout = {
  center: ['prevButton', 'nextButton'],
  direction: 'row',
  align: 'center',
  gap: '0.5rem',
};

export const DEFAULT_COMPACT_LAYOUT: PaginatorLayout = {
  direction: 'row',
  align: 'center',
  gap: '0.5rem',
};

export const DEFAULT_FRACTIONAL_LAYOUT: PaginatorLayout = {
  direction: 'row',
  align: 'center',
  gap: '0.5rem',
};

/**
 * Configuración de iconos personalizables
 */
export interface IconConfig {
  /** Icono para primera página */
  first?: string;
  /** Icono para página anterior */
  previous?: string;
  /** Icono para página siguiente */
  next?: string;
  /** Icono para última página */
  last?: string;
  /** Icono para cargar más (modo infinito) */
  loadMore?: string;
  /** Icono de carga */
  loading?: string;
  /** Prefijo de clases de iconos (ej: 'ri-', 'fa-') */
  prefix?: string;
}

/**
 * Configuración de iconos aplicada, con valores por defecto
 */
export const DEFAULT_ICON_CONFIG: Required<IconConfig> = {
  first: 'ri-arrow-left-double-line',
  previous: 'ri-arrow-left-s-line',
  next: 'ri-arrow-right-s-line',
  last: 'ri-arrow-right-double-line',
  loadMore: 'ri-add-line',
  loading: 'ri-loader-4-line',
  prefix: 'ri-',
};

/**
 * Configuración del modo infinito
 */
export interface InfiniteConfig {
  /** Habilitar modo infinito */
  enabled?: boolean;
  /** Tipo de modo infinito */
  mode?: 'scroll' | 'button' | 'hybrid';
  /** Texto del botón "Cargar más" */
  loadMoreText?: string;
  /** Offset para detectar scroll (px desde el bottom) */
  scrollOffset?: number;
  /** Número de items a cargar por lote */
  itemsPerLoad?: number;
  /** Máximo número de items a cargar */
  maxItems?: number;
  /** Mostrar contador de items cargados */
  showCounter?: boolean;
  /** Número de items ya cargados inicialmente (para sincronizar el contador) */
  initialLoadedItems?: number;
  /** Callback cuando se necesitan más datos */
  onLoadMore?: () => void | Promise<void>;
}

/**
 * Configuración completa del Paginator
 */
export interface PaginatorGlobalConfig {
  /** Configuración básica */
  config?: PaginatorConfig;
  /** Textos personalizados */
  texts?: PaginatorTexts;
  /** Configuración de teclado */
  keyboard?: KeyboardConfig;
  /** Configuración de loading */
  loading?: LoadingConfig;
  /** Configuración responsiva */
  responsive?: ResponsiveConfig;
  /** Configuración de iconos */
  icons?: IconConfig;
  /** Configuración del modo infinito */
  infinite?: InfiniteConfig;
  /** Configuración del layout personalizado */
  layout?: PaginatorLayout;
  /** Configuración del layout para dispositivos móviles */
  mobileLayout?: PaginatorLayout;
  /** Configuración del layout para modo infinito */
  infiniteLayout?: PaginatorLayout;
  /** Apariencia */
  appearance?: {
    color?: NUIColor;
    size?: NUISize;
    variant?: NUIVariant;
  };
}

/**
 * Estado interno del Paginator
 */
export interface PaginatorState {
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Items por página */
  itemsPerPage: number;
  /** Total de items */
  totalItems?: number;
  /** Está en la primera página */
  isFirstPage: boolean;
  /** Está en la última página */
  isLastPage: boolean;
  /** Páginas visibles */
  visiblePages: (number | string)[];
  /** Rango de items actual */
  itemRange?: {
    start: number;
    end: number;
    total: number;
  };
}

/**
 * Evento emitido cuando cambia la página
 */
export interface PageChangeEvent {
  /** Nueva página */
  page: number;
  /** Página anterior */
  previousPage: number;
  /** Items por página */
  itemsPerPage: number;
  /** Total de páginas */
  totalPages: number;
}

/**
 * Evento emitido cuando cambia el tamaño de página
 */
export interface PageSizeChangeEvent {
  /** Nuevo tamaño */
  pageSize: number;
  /** Tamaño anterior */
  previousPageSize: number;
  /** Página actual (puede cambiar si el nuevo tamaño afecta el rango) */
  currentPage: number;
  /** Nuevo total de páginas */
  totalPages: number;
}

/**
 * Estado del modo infinito
 */
export interface InfiniteState {
  /** Está cargando más datos */
  isLoading: boolean;
  /** Hay más datos disponibles */
  hasMore: boolean;
  /** Total de items cargados */
  loadedItems: number;
  /** Número de cargas realizadas */
  loadCount: number;
}

export const DEFAULT_INFINITE_STATE: InfiniteState = {
  isLoading: false,
  hasMore: true,
  loadedItems: 0,
  loadCount: 0,
};
