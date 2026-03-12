/**
 * Textos por defecto del Paginator
 */
export const DEFAULT_PAGINATOR_I18N: Required<PaginatorI18n> = {
  // Visible texts
  itemsPerPage: 'Items per page:',
  showingItems: '{start}-{end} of {total}',
  page: 'Page',
  of: 'of',
  goToPage: 'Go to page',
  go: 'Go',
  invalidPage: 'Invalid page',
  firstPage: 'First page',
  lastPage: 'Last page',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  pageLabel: 'Page {page}',
  morePages: 'More pages',
  loadMore: 'Load more',
  loading: 'Loading...',
  pageJumpHelp: 'Enter a number between 1 and {totalPages}.',
  infiniteLoadedItems: '{loaded} items loaded of {total}',
  infiniteLoadEnd: 'No more items to display',

  // Screen reader only texts
  a11y: {
    pagination: 'Pagination',
    morePages: 'More pages',
    page: 'Page {page}',
    currentPage: '{page}, current page',
    goToPage: 'Go to page {page}',
    currentPageWithRange:
      'Page {page} of {totalPages}, showing items {start} to {end} of {total} results',
    currentPageNoRange: 'Page {page} of {totalPages}',
    fractionalPage: 'Page {page} of {totalPages}',
    showingItems: 'Showing items {start} to {end} of {total} results',
    loading: 'Loading new page...',
  },
};

/**
 * Textos personalizables del Paginator
 */
export interface PaginatorI18n {
  // Textos visibles
  itemsPerPage: string; // "Items por página"
  showingItems: string; // "Mostrando {start}-{end} de {total} resultados"
  page: string; // "Página"
  of: string; // "de"
  goToPage: string; // "Ir a página"
  go: string; // "Ir"
  invalidPage: string; // "Página inválida"
  firstPage: string; // "Primera página"
  lastPage: string; // "Última página"
  previousPage: string; // "Página anterior"
  nextPage: string; // "Página siguiente"
  pageLabel: string; // "Página {page}"
  morePages: string; // "Más páginas"
  loadMore: string; // "Cargar más"
  loading: string; // "Cargando..."
  pageJumpHelp: string; // "Ingrese un número entre 1 y {totalPages}."
  infiniteLoadedItems: string; // "{loaded} elementos cargados de {total}"
  infiniteLoadEnd: string; // "No hay más elementos que mostrar"

  // Textos exclusivos para lectores de pantalla
  a11y: {
    pagination: string; // "Paginación" — aria-label del <nav> y del host
    morePages: string; // "Más páginas" — aria-label de los puntos suspensivos
    page: string; // "Página {page}" — usado en el aria-live al navegar
    currentPage: string; // "{page}, página actual" — aria-label del botón activo
    goToPage: string; // "Ir a página {page}" — aria-label de botones de página
    currentPageWithRange: string; // "Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados"
    currentPageNoRange: string; // "Página {page} de {totalPages}"
    fractionalPage: string; // "Página {page} de {totalPages}" — aria-label del modo fraccionado
    showingItems: string; // "Mostrando items {start} a {end} de {total} resultados"
    loading: string; // "Cargando nueva página..." — anuncio al hacer loading
  };
}
