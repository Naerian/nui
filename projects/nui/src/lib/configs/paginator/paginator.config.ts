import { inject } from '@angular/core';
import {
  PaginatorIcons,
  InfiniteConfig,
  InfiniteModeEnum,
  KeyboardConfig,
  LoadingConfig,
  PaginatorNavDisplayEnum,
  PaginatorLayout,
  PaginatorNavDisplay,
  DEFAULT_ICON_CONFIG,
  DEFAULT_KEYBOARD_CONFIG,
} from '../../components/paginator';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';
import { NUIColor, NUISize, NUIVariant } from '../common';
import {
  DEFAULT_PAGINATOR_I18N,
  PaginatorI18n,
} from '../../components/paginator/models/paginator-i18n.model';

/**
 * Configuración completa del Paginator
 */
export interface PaginatorConfig {
  // Propiedades de estilo
  size?: NUISize;
  color?: NUIColor;
  variant?: NUIVariant;

  // Propiedades de comportamiento
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  showPageSizeSelector?: boolean;
  showItemRange?: boolean;
  showPageJump?: boolean;
  pageSizeOptions?: number[];
  autoScroll?: boolean;
  scrollTarget?: string | HTMLElement;
  navDisplay?: PaginatorNavDisplay;

  // Propiedades de bloques
  navIcons?: Partial<PaginatorIcons>;
  navTexts?: Partial<PaginatorI18n>;
  keyboard?: Partial<KeyboardConfig>;
  loading?: Partial<LoadingConfig>;
  infinite?: Partial<InfiniteConfig>;

  // Layouts
  layout?: Partial<PaginatorLayout>;
  mobileLayout?: Partial<PaginatorLayout>;
  infiniteLayout?: Partial<PaginatorLayout>;
}

/**
 * Defaults estáticos. No hay inyección aquí, es una constante pura.
 * (Si no se usa el Paginator, esto no entra en el build final).
 */
export const DEFAULT_PAGINATOR_CONFIG: PaginatorConfig = {
  size: 'md',
  color: 'primary',
  variant: 'solid',
  maxVisiblePages: 7,
  showFirstLast: false,
  showPageSizeSelector: false,
  showItemRange: false,
  showPageJump: false,
  pageSizeOptions: [10, 25, 50, 100],
  autoScroll: false,
  scrollTarget: 'body',
  navDisplay: PaginatorNavDisplayEnum.ICON,
  navIcons: DEFAULT_ICON_CONFIG,
  navTexts: DEFAULT_PAGINATOR_I18N,
  keyboard: DEFAULT_KEYBOARD_CONFIG,
  loading: {
    showLoading: false,
    loadingDelay: 200,
    disableOnLoading: true,
  },
  infinite: {
    enabled: false,
    mode: InfiniteModeEnum.BUTTON,
    scrollOffset: 100,
    itemsPerLoad: 20,
    maxItems: 1000,
    showCounter: true,
    onLoadMore: () => {},
  },
  layout: {
    top: [],
    left: ['itemRange', 'pageSize'],
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
    right: ['pageJump'],
    bottom: [],
    direction: 'row',
    align: 'center',
    gap: '0.5rem',
  },
  mobileLayout: {
    top: ['itemRange'],
    center: ['firstButton', 'prevButton', 'fractionalNumbers', 'nextButton', 'lastButton'],
    bottom: ['pageSize'],
    direction: 'column',
    align: 'center',
    gap: '0.5rem',
  },
  infiniteLayout: {
    top: ['infiniteCounter'],
    center: ['infiniteButton', 'infiniteEndMessage'],
    bottom: [],
    direction: 'column',
    align: 'center',
    gap: '1rem',
  },
};

/**
 * Resolver del Paginator. Lo inyecta el componente en su constructor/propiedades.
 * Orden de precedencia: Base Estática <- Traducciones (si hay) <- Configuración Global (si hay)
 */
export function injectPaginatorConfig(): PaginatorConfig {
  // Inyectamos la config global (opcional por si el usuario no hizo provideNUI)
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos solo la parte que nos interesa
  const paginatorOverrides = globalConfig?.paginator || {};

  // Fusionamos: Defaults Base <- pisan <- Overrides Globales
  return deepMerge(DEFAULT_PAGINATOR_CONFIG, paginatorOverrides);
}
