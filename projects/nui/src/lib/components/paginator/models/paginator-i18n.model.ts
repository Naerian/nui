/**
 * Textos por defecto del Paginator
 */
export const DEFAULT_PAGINATOR_I18N: Required<PaginatorI18n> = {
  // Textos visibles
  itemsPerPage: 'Elementos por página:',
  showingItems: '{start}-{end} de {total}',
  page: 'Página',
  of: 'de',
  goToPage: 'Ir a página',
  go: 'Ir',
  invalidPage: 'Página inválida',
  firstPage: 'Primera página',
  lastPage: 'Última página',
  previousPage: 'Página anterior',
  nextPage: 'Página siguiente',
  pageLabel: 'Página {page}',
  morePages: 'Más páginas',
  loadMore: 'Cargar más',
  loading: 'Cargando...',
  pageJumpHelp: 'Ingrese un número entre 1 y {totalPages}.',
  infiniteLoadedItems: '{loaded} elementos cargados de {total}',
  infiniteLoadEnd: 'No hay más elementos que mostrar',

  // ARIA labels
  ariaPagination: 'Paginación',
  ariaMorePages: 'Más páginas',
  ariaPage: 'Página {page}',
  ariaCurrentPage: '{page}, página actual',
  ariaGoToPage: 'Ir a página {page}',
  ariaCurrentPageWithRange:
    'Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados',
  ariaCurrentPageNoRange: 'Página {page} de {totalPages}',
  ariaShowingItems: 'Mostrando items {start} a {end} de {total} resultados',
  ariaLoading: 'Cargando nueva página...',
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
  pageJumpHelp: string; // "Página inválida. Ingrese un número entre 1 y {totalPages}."
  infiniteLoadedItems: string; // "{loaded} elementos cargados de {total}"
  infiniteLoadEnd: string; // "No hay más elementos que mostrar"

  // ARIA labels
  ariaPagination: string; // "Paginación"
  ariaMorePages: string; // "Más páginas"
  ariaPage: string; // "Página {page}"
  ariaCurrentPage: string; // "página actual"
  ariaGoToPage: string; // "Ir a página {page}"
  ariaCurrentPageWithRange: string; // "Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados"
  ariaCurrentPageNoRange: string; // "Página {page} de {totalPages}"
  ariaShowingItems: string; // "Mostrando items {start} a {end} de {total} resultados"
  ariaLoading: string; // "Cargando nueva página..."
}
