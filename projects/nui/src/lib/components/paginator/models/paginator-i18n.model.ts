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

  // Textos exclusivos para lectores de pantalla
  a11y: {
    pagination: 'Paginación',
    morePages: 'Más páginas',
    page: 'Página {page}',
    currentPage: '{page}, página actual',
    goToPage: 'Ir a página {page}',
    currentPageWithRange:
      'Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados',
    currentPageNoRange: 'Página {page} de {totalPages}',
    fractionalPage: 'Página {page} de {totalPages}',
    showingItems: 'Mostrando items {start} a {end} de {total} resultados',
    loading: 'Cargando nueva página...',
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
    pagination: string;              // "Paginación" — aria-label del <nav> y del host
    morePages: string;               // "Más páginas" — aria-label de los puntos suspensivos
    page: string;                    // "Página {page}" — usado en el aria-live al navegar
    currentPage: string;             // "{page}, página actual" — aria-label del botón activo
    goToPage: string;                // "Ir a página {page}" — aria-label de botones de página
    currentPageWithRange: string;    // "Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados"
    currentPageNoRange: string;      // "Página {page} de {totalPages}"
    fractionalPage: string;          // "Página {page} de {totalPages}" — aria-label del modo fraccionado
    showingItems: string;            // "Mostrando items {start} a {end} de {total} resultados"
    loading: string;                 // "Cargando nueva página..." — anuncio al hacer loading
  };
}
