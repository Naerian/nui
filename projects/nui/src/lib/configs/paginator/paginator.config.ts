import { inject } from '@angular/core';
import { PaginatorGlobalConfig } from '../../components/paginator';
import { NUI_TRANSLATIONS } from '../../translations'; // O la ruta correcta a tu token
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Defaults estáticos. No hay inyección aquí, es una constante pura.
 * (Si no se usa el Paginator, esto no entra en el build final).
 */
export const DEFAULT_PAGINATOR_CONFIG: PaginatorGlobalConfig = {
  config: {
    maxVisiblePages: 7,
    showFirstLast: false,
    showPageSizeSelector: false,
    showItemRange: false,
    showPageJump: false,
    pageSizeOptions: [10, 25, 50, 100],
    autoScroll: false,
    scrollTarget: 'body',
  },
  texts: {
    firstPage: 'Primera página',
    lastPage: 'Última página',
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente',
    goToPage: 'Ir a la página',
    go: 'Ir',
    itemsPerPage: 'Items por página',
    showingItems: '{start}-{end} de {total}',
    pageLabel: 'Página {page}',
  },
  keyboard: {
    firstPage: ['Home'],
    lastPage: ['End'],
    previousPage: ['ArrowLeft'],
    nextPage: ['ArrowRight'],
    enabled: true,
  },
  loading: {
    showLoading: false,
    loadingText: 'Cargando...',
    loadingDelay: 200,
    disableOnLoading: true,
  },
  responsive: {
    mobile: {
      maxVisiblePages: 3,
      showFirstLast: false,
      showPageJump: false,
      showPageSizeSelector: false,
    },
    tablet: {
      maxVisiblePages: 5,
      showFirstLast: true,
      showPageJump: false,
      showPageSizeSelector: true,
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
    },
  },
  icons: {
    first: 'ri-arrow-left-double-line',
    previous: 'ri-arrow-left-s-line',
    next: 'ri-arrow-right-s-line',
    last: 'ri-arrow-right-double-line',
    loadMore: 'ri-add-line',
    loading: 'ri-loader-4-line',
    prefix: 'ri-',
  },
  infinite: {
    enabled: false,
    mode: 'button',
    loadMoreText: 'Cargar más',
    scrollOffset: 100,
    itemsPerLoad: 20,
    maxItems: 1000,
    showCounter: true,
    onLoadMore: () => {},
  },
  appearance: {
    color: 'primary',
    size: 'md',
    variant: 'solid',
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
export function injectPaginatorConfig(): PaginatorGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true });
  const translations = inject(NUI_TRANSLATIONS, { optional: true });

  // 1. Mapeamos las traducciones dinámicas solo si existen
  // Mantenemos la estructura para que deepMerge la combine sin machacar defaults
  const translationsOverride: Partial<PaginatorGlobalConfig> = translations?.paginator
    ? {
        texts: {
          firstPage: translations.paginator.firstPage,
          lastPage: translations.paginator.lastPage,
          previousPage: translations.paginator.previousPage,
          nextPage: translations.paginator.nextPage,
          goToPage: translations.paginator.goToPage,
          go: translations.paginator.go,
          itemsPerPage: translations.paginator.itemsPerPage,
          showingItems: translations.paginator.showingItems,
          pageLabel: translations.paginator.pageLabel,
        },
        loading: {
          loadingText: translations.paginator.loading,
        },
        infinite: {
          loadMoreText: translations.paginator.loadMore,
        },
      }
    : {};

  // 2. Mezclamos Defaults Base + Traducciones
  const configWithTranslations = deepMerge(DEFAULT_PAGINATOR_CONFIG, translationsOverride);

  // 3. Mezclamos (Base+Traducciones) + Configuración global del usuario (que tiene la prioridad final)
  return deepMerge(configWithTranslations, globalConfig?.paginator);
}
