import { inject } from '@angular/core';
import { PaginatorGlobalConfig } from '../../components/paginator';
import { NUI_TRANSLATIONS } from '../../translations';

/**
 * Función factory para crear la configuración por defecto del paginator con traducciones
 */
export function createDefaultPaginatorConfig(): PaginatorGlobalConfig {
  const translations = inject(NUI_TRANSLATIONS);

  return {
    config: {
      maxVisiblePages: 7,
      showFirstLast: true,
      showPageSizeSelector: false,
      showItemRange: true,
      showPageJump: false,
      pageSizeOptions: [10, 25, 50, 100],
      autoScroll: false,
      scrollTarget: 'body',
    },
    texts: {
      firstPage: translations?.paginator?.firstPage || 'Primera página',
      lastPage: translations?.paginator?.lastPage || 'Última página',
      previousPage: translations?.paginator?.previousPage || 'Página anterior',
      nextPage: translations?.paginator?.nextPage || 'Página siguiente',
      goToPage: translations?.paginator?.goToPage || 'Ir a la página',
      go: translations?.paginator?.go || 'Ir',
      itemsPerPage: translations?.paginator?.itemsPerPage || 'Items por página',
      showingItems:
        translations?.paginator?.showingItems || '{start}-{end} de {total}',
      pageLabel: translations?.paginator?.pageLabel || 'Página {page}',
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
      loadingText: translations?.paginator?.loading || 'Cargando...',
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
      loadMoreText: translations?.paginator?.loadMore || 'Cargar más',
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
      // Layout por defecto: diseño tradicional con controles en el centro
      top: [],
      left: ['itemRange', 'pageSize'],
      center: [
        'firstButton',
        'prevButton',
        'pageNumbers',
        'nextButton',
        'lastButton',
      ],
      right: ['pageJump'],
      bottom: [],
      direction: 'row',
      align: 'center',
      gap: '0.5rem',
    },
    mobileLayout: {
      // Layout optimizado para móviles: diseño vertical compacto
      top: ['itemRange'],
      center: [
        'firstButton',
        'prevButton',
        'fractionalNumbers',
        'nextButton',
        'lastButton',
      ],
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
}
