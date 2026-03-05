import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Paginator
 * Dividido en Inputs, Outputs e Interfaces para mejor organización
 */
export const PAGINATOR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.paginator.api.inputs.title',
    description: 'components.paginator.api.inputs.description',
    anchor: 'api-inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          "Color del paginador: 'primary', 'secondary', 'accent', etc.",
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          "Tamaño: 'xs', 'sm', 'md', 'lg', 'xl'",
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          "Variante visual: 'solid', 'outline', 'ghost'",
        ],
        [
          '<code>mode</code>',
          'PaginatorMode',
          '<code class="neutral">default</code>',
          "Modo de visualización: 'default', 'compact', 'fractional', 'minimal'",
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Deshabilita el paginador y todos sus controles',
        ],
        [
          '<code>navDisplay</code>',
          'PaginatorNavDisplay',
          '<code class="neutral">icon</code>',
          "Define qué mostrar en botones de navegación: 'icon', 'text' o 'both'",
        ],
        [
          '<code>navIcons</code>',
          'Partial<PaginatorIcons>',
          '<code class="neutral">undefined</code>',
          'Sobrescribe iconos específicos de navegación (first, next, etc.)',
        ],
        [
          '<code>navText</code>',
          'Partial<PaginatorI18n>',
          '<code class="neutral">undefined</code>',
          'Textos personalizados para el paginador (sobrescribe traducciones)',
        ],
        [
          '<code>currentPage</code>',
          'number',
          '<code class="neutral">1</code>',
          'Página actual (Model Signal - admite Two-way binding)',
        ],
        [
          '<code>totalItems</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'Número total de elementos para calcular totalPages automáticamente',
        ],
        [
          '<code>totalPages</code>',
          'number',
          '<code class="neutral">1</code>',
          'Número total de páginas (para binding manual si no hay totalItems)',
        ],
        [
          '<code>itemsPerPage</code>',
          'number',
          '<code class="neutral">10</code>',
          'Elementos por página (Model Signal)',
        ],
        [
          '<code>maxVisiblePages</code>',
          'number',
          '<code class="neutral">5</code>',
          'Máximo de botones de página visibles',
        ],
        [
          '<code>pageSizeOptions</code>',
          'number[]',
          '<code class="neutral">[10, 20, 50, 100]</code>',
          'Opciones para el selector de tamaño de página',
        ],
        [
          '<code>showFirstLast</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Mostrar botones de primera/última página',
        ],
        [
          '<code>showPageSizeSelector</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Mostrar selector de tamaño de página',
        ],
        [
          '<code>showItemRange</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Mostrar rango de elementos (ej: "1-10 de 100")',
        ],
        [
          '<code>showPageJump</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Mostrar input para saltar a una página específica',
        ],
        [
          '<code>autoScroll</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Scroll automático al cambiar de página',
        ],
        [
          '<code>scrollTarget</code>',
          'string | HTMLElement',
          '<code class="neutral">undefined</code>',
          'Elemento específico para el scroll (por defecto window/body)',
        ],
        [
          '<code>keyboard</code>',
          'Partial<KeyboardConfig>',
          '<code class="neutral">undefined</code>',
          'Configuración personalizada de atajos de teclado',
        ],
        [
          '<code>layout</code>',
          'PaginatorLayout',
          '<code class="neutral">undefined</code>',
          'Layout personalizado para posicionar los elementos (top, left, center, etc.)',
        ],
        [
          '<code>infiniteConfig</code>',
          'InfiniteConfig',
          '<code class="neutral">undefined</code>',
          'Configuración del modo de carga infinita',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.paginator.api.outputs.title',
    description: 'components.paginator.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>pageChange</code>',
          'EventEmitter<number>',
          'Emitido cuando cambia la página actual (emite el número de página)',
        ],
        [
          '<code>pageSizeChange</code>',
          'EventEmitter<number>',
          'Emitido cuando cambia el tamaño de página (emite el nuevo tamaño)',
        ],
        [
          '<code>pageChangeAdvanced</code>',
          'EventEmitter<PageChangeEvent>',
          'Evento avanzado con información completa del cambio de página',
        ],
        [
          '<code>pageSizeChangeAdvanced</code>',
          'EventEmitter<PageSizeChangeEvent>',
          'Evento avanzado con información completa del cambio de tamaño',
        ],
      ],
    },
  },
  {
    id: 'api-config',
    title: 'components.paginator.api.config.title',
    description: 'components.paginator.api.config.description',
    anchor: 'api-config',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>maxVisiblePages</code>', 'number', 'Número máximo de páginas visibles'],
        ['<code>showFirstLast</code>', 'boolean', 'Mostrar botones de primera y última página'],
        ['<code>showPageSizeSelector</code>', 'boolean', 'Mostrar selector de items por página'],
        ['<code>showItemRange</code>', 'boolean', 'Mostrar información del rango de items'],
        [
          '<code>showPageJump</code>',
          'boolean',
          'Mostrar input para saltar a una página específica',
        ],
        [
          '<code>pageSizeOptions</code>',
          'number[]',
          'Opciones para el selector de items por página',
        ],
        ['<code>autoScroll</code>', 'boolean', 'Scroll automático al cambiar página'],
        [
          '<code>scrollTarget</code>',
          'string | HTMLElement',
          'Elemento al que hacer scroll (selector CSS o elemento)',
        ],
        ['<code>layout</code>', 'PaginatorLayout', 'Configuración del layout personalizado'],
        [
          '<code>mobileLayout</code>',
          'PaginatorLayout',
          'Configuración del layout para dispositivos móviles',
        ],
      ],
    },
  },
  {
    id: 'api-texts',
    title: 'components.paginator.api.texts.title',
    description: 'components.paginator.api.texts.description',
    anchor: 'api-texts',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>itemsPerPage</code>', 'string', 'Texto para "Items por página"'],
        [
          '<code>showingItems</code>',
          'string',
          'Template: "Mostrando {start}-{end} de {total} resultados"',
        ],
        ['<code>page</code>', 'string', 'Texto para "Página"'],
        ['<code>of</code>', 'string', 'Texto para "de"'],
        ['<code>goToPage</code>', 'string', 'Texto para "Ir a página"'],
        ['<code>go</code>', 'string', 'Texto para "Ir" (botón)'],
        ['<code>invalidPage</code>', 'string', 'Texto para "Página inválida"'],
        ['<code>firstPage</code>', 'string', 'Texto para "Primera página"'],
        ['<code>lastPage</code>', 'string', 'Texto para "Última página"'],
        ['<code>previousPage</code>', 'string', 'Texto para "Página anterior"'],
        ['<code>nextPage</code>', 'string', 'Texto para "Página siguiente"'],
        ['<code>pageLabel</code>', 'string', 'Template: "Página {page}"'],
        ['<code>morePages</code>', 'string', 'Texto para "Más páginas"'],
        ['<code>loadMore</code>', 'string', 'Texto para "Cargar más"'],
        ['<code>loading</code>', 'string', 'Texto para "Cargando..."'],
        [
          '<code>pageJumpHelp</code>',
          'string',
          'Template: "Página inválida. Ingrese un número entre 1 y {totalPages}."',
        ],
        [
          '<code>infiniteLoadedItems</code>',
          'string',
          'Template: "{loaded} elementos cargados de {total}"',
        ],
        ['<code>infiniteLoadEnd</code>', 'string', 'Texto para "No hay más elementos que mostrar"'],

        // Textos exclusivos para lectores de pantalla (objeto a11y)
        ['<code>a11y.pagination</code>', 'string', 'ARIA label del <code>&lt;nav&gt;</code> de paginación'],
        ['<code>a11y.morePages</code>', 'string', 'ARIA label de los puntos suspensivos (ellipsis)'],
        ['<code>a11y.page</code>', 'string', 'Template ARIA: "Página {page}" — usado en aria-live al navegar'],
        ['<code>a11y.currentPage</code>', 'string', 'ARIA label del botón de página activo: "{page}, página actual"'],
        ['<code>a11y.goToPage</code>', 'string', 'ARIA label de botones de página no activos: "Ir a página {page}"'],
        [
          '<code>a11y.currentPageWithRange</code>',
          'string',
          'Template ARIA: "Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados"',
        ],
        [
          '<code>a11y.currentPageNoRange</code>',
          'string',
          'Template ARIA: "Página {page} de {totalPages}"',
        ],
        [
          '<code>a11y.showingItems</code>',
          'string',
          'Template ARIA: "Mostrando items {start} a {end} de {total} resultados"',
        ],
        ['<code>a11y.loading</code>', 'string', 'Anuncio aria-live al iniciar carga: "Cargando nueva página..."'],
      ],
    },
  },
  {
    id: 'api-keyboard',
    title: 'components.paginator.api.keyboard.title',
    description: 'components.paginator.api.keyboard.description',
    anchor: 'api-keyboard',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>enabled</code>', 'boolean', 'Habilitar navegación por teclado'],
        ['<code>firstPage</code>', 'string[]', 'Teclas para ir a la primera página'],
        ['<code>lastPage</code>', 'string[]', 'Teclas para ir a la última página'],
        ['<code>previousPage</code>', 'string[]', 'Teclas para página anterior'],
        ['<code>nextPage</code>', 'string[]', 'Teclas para página siguiente'],
      ],
    },
  },
  {
    id: 'api-loading',
    title: 'components.paginator.api.loading.title',
    description: 'components.paginator.api.loading.description',
    anchor: 'api-loading',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>showLoading</code>', 'boolean', 'Mostrar indicador de loading durante cambios'],
        ['<code>loadingDelay</code>', 'number', 'Delay antes de mostrar loading (ms)'],
        ['<code>disableOnLoading</code>', 'boolean', 'Deshabilitar controles durante loading'],
      ],
    },
  },
  {
    id: 'api-layout',
    title: 'components.paginator.api.layout.title',
    description: 'components.paginator.api.layout.description',
    anchor: 'api-layout',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>top</code>', 'PaginatorElement[]', 'Elementos en el área superior'],
        ['<code>left</code>', 'PaginatorElement[]', 'Elementos en el área izquierda'],
        ['<code>center</code>', 'PaginatorElement[]', 'Elementos en el área central'],
        ['<code>right</code>', 'PaginatorElement[]', 'Elementos en el área derecha'],
        ['<code>bottom</code>', 'PaginatorElement[]', 'Elementos en el área inferior'],
        [
          '<code>direction</code>',
          "'row' | 'column'",
          "Dirección del layout principal: 'row' (horizontal) o 'column' (vertical)",
        ],
        [
          '<code>align</code>',
          'PLayoutAlign',
          "Alineación: 'start', 'center', 'end', 'space-between', 'space-around'",
        ],
        [
          '<code>topConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'Configuración de alineación para área superior',
        ],
        [
          '<code>bottomConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'Configuración de alineación para área inferior',
        ],
        [
          '<code>leftConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'Configuración de alineación para área izquierda',
        ],
        [
          '<code>centerConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'Configuración de alineación para área central',
        ],
        [
          '<code>rightConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'Configuración de alineación para área derecha',
        ],
        [
          '<code>verticalAlign</code>',
          'PVerticalAlign',
          "Alineación vertical general: 'start', 'center', 'end'",
        ],
        ['<code>gap</code>', 'string', 'Gap entre elementos (en rem o px)'],
      ],
    },
  },
  {
    id: 'api-icons',
    title: 'components.paginator.api.icons.title',
    description: 'components.paginator.api.icons.description',
    anchor: 'api-icons',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>first</code>',
          'string',
          '<code class="neutral">ri-arrow-left-double-line</code>',
          'Icono para primera página',
        ],
        [
          '<code>previous</code>',
          'string',
          '<code class="neutral">ri-arrow-left-s-line</code>',
          'Icono para página anterior',
        ],
        [
          '<code>next</code>',
          'string',
          '<code class="neutral">ri-arrow-right-s-line</code>',
          'Icono para página siguiente',
        ],
        [
          '<code>last</code>',
          'string',
          '<code class="neutral">ri-arrow-right-double-line</code>',
          'Icono para última página',
        ],
        [
          '<code>loadMore</code>',
          'string',
          '<code class="neutral">ri-add-line</code>',
          'Icono para cargar más (modo infinito)',
        ],
        [
          '<code>loading</code>',
          'string',
          '<code class="neutral">ri-loader-4-line</code>',
          'Icono de carga',
        ],
        [
          '<code>prefix</code>',
          'string',
          '<code class="neutral">ri-</code>',
          "Prefijo de clases de iconos (ej: 'ri-', 'fa-')",
        ],
      ],
    },
  },
  {
    id: 'api-infinite',
    title: 'components.paginator.api.infinite.title',
    description: 'components.paginator.api.infinite.description',
    anchor: 'api-infinite',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>enabled</code>', 'boolean', 'Habilitar modo infinito'],
        [
          '<code>mode</code>',
          "'scroll' | 'button' | 'hybrid'",
          'Tipo de modo infinito: scroll automático, botón manual o híbrido',
        ],
        ['<code>scrollOffset</code>', 'number', 'Offset para detectar scroll (px desde el bottom)'],
        ['<code>itemsPerLoad</code>', 'number', 'Número de items a cargar por lote'],
        ['<code>maxItems</code>', 'number', 'Máximo número de items a cargar'],
        ['<code>showCounter</code>', 'boolean', 'Mostrar contador de items cargados'],
        [
          '<code>initialLoadedItems</code>',
          'number',
          'Número de items ya cargados inicialmente (para sincronizar el contador)',
        ],
        [
          '<code>onLoadMore</code>',
          '() => void | Promise<void>',
          'Callback cuando se necesitan más datos',
        ],
      ],
    },
  },
];
