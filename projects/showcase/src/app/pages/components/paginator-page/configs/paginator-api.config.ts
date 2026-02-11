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
          'Deshabilita el paginador',
        ],
        [
          '<code>currentPage</code>',
          'number',
          '<code class="neutral">1</code>',
          'Página actual (1-indexed)',
        ],
        [
          '<code>totalPages</code>',
          'number',
          '<code class="neutral">1</code>',
          'Número total de páginas (para binding manual)',
        ],
        [
          '<code>totalItems</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'Número total de elementos (calcula totalPages automáticamente)',
        ],
        [
          '<code>itemsPerPage</code>',
          'number',
          '<code class="neutral">10</code>',
          'Elementos por página',
        ],
        [
          '<code>maxVisiblePages</code>',
          'number',
          '<code class="neutral">5</code>',
          'Máximo de páginas visibles en el paginador',
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
          '<code class="neutral">undefined</code>',
          'Mostrar botones primera/última página (usa config global si undefined)',
        ],
        [
          '<code>showPageSizeSelector</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'Mostrar selector de tamaño de página (usa config global)',
        ],
        [
          '<code>showItemRange</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'Mostrar rango de elementos (ej: "1-10 de 100") (usa config global)',
        ],
        [
          '<code>showPageJump</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'Mostrar input para saltar a página (usa config global)',
        ],
        [
          '<code>autoScroll</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'Scroll automático al cambiar página',
        ],
        [
          '<code>scrollTarget</code>',
          'string | HTMLElement',
          '<code class="neutral">undefined</code>',
          'Elemento target para scroll (selector CSS o elemento)',
        ],
        [
          '<code>autoMobile</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Detectar automáticamente móviles y cambiar a modo fractional',
        ],
        [
          '<code>autoWrap</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Envolver botones en pantallas pequeñas',
        ],
        [
          '<code>config</code>',
          'PaginatorConfig',
          '<code class="neutral">undefined</code>',
          'Configuración avanzada del componente',
        ],
        [
          '<code>layout</code>',
          'PaginatorLayout',
          '<code class="neutral">undefined</code>',
          'Layout personalizado para posicionar elementos',
        ],
        [
          '<code>mobileLayout</code>',
          'PaginatorLayout',
          '<code class="neutral">undefined</code>',
          'Layout específico para dispositivos móviles',
        ],
        [
          '<code>iconConfig</code>',
          'IconConfig',
          '<code class="neutral">undefined</code>',
          'Configuración de iconos personalizables',
        ],
        [
          '<code>icons</code>',
          'Partial<IconConfig>',
          '<code class="neutral">undefined</code>',
          'Iconos específicos que sobreescriben la configuración global',
        ],
        [
          '<code>infiniteConfig</code>',
          'InfiniteConfig',
          '<code class="neutral">undefined</code>',
          'Configuración del modo de scroll infinito',
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
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
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
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>firstPage</code>', 'string', 'Texto para "Primera página"'],
        ['<code>lastPage</code>', 'string', 'Texto para "Última página"'],
        ['<code>previousPage</code>', 'string', 'Texto para "Página anterior"'],
        ['<code>nextPage</code>', 'string', 'Texto para "Página siguiente"'],
        ['<code>goToPage</code>', 'string', 'Texto para "Ir a la página"'],
        ['<code>go</code>', 'string', 'Texto para "Ir" (botón)'],
        ['<code>itemsPerPage</code>', 'string', 'Texto para "Items por página"'],
        [
          '<code>showingItems</code>',
          'string',
          'Template para mostrar rango: {start}-{end} de {total}',
        ],
        ['<code>pageLabel</code>', 'string', 'Texto para "Página {page}"'],
      ],
    },
  },
  {
    id: 'api-keyboard',
    title: 'components.paginator.api.keyboard.title',
    description: 'components.paginator.api.keyboard.description',
    anchor: 'api-keyboard',
    table: {
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
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
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>showLoading</code>', 'boolean', 'Mostrar indicador de loading durante cambios'],
        ['<code>loadingText</code>', 'string', 'Texto durante loading'],
        ['<code>loadingDelay</code>', 'number', 'Delay antes de mostrar loading (ms)'],
        ['<code>disableOnLoading</code>', 'boolean', 'Deshabilitar controles durante loading'],
      ],
    },
  },
  {
    id: 'api-responsive',
    title: 'components.paginator.api.responsive.title',
    description: 'components.paginator.api.responsive.description',
    anchor: 'api-responsive',
    table: {
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>mobile</code>',
          'Partial<PaginatorConfig>',
          'Configuración específica para móviles',
        ],
        [
          '<code>tablet</code>',
          'Partial<PaginatorConfig>',
          'Configuración específica para tablets',
        ],
        [
          '<code>breakpoints</code>',
          '{ mobile?: number; tablet?: number }',
          'Breakpoints personalizados en px',
        ],
      ],
    },
  },
  {
    id: 'api-layout',
    title: 'components.paginator.api.layout.title',
    description: 'components.paginator.api.layout.description',
    anchor: 'api-layout',
    table: {
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
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
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>enabled</code>', 'boolean', 'Habilitar modo infinito'],
        [
          '<code>mode</code>',
          "'scroll' | 'button' | 'hybrid'",
          'Tipo de modo infinito: scroll automático, botón manual o híbrido',
        ],
        ['<code>loadMoreText</code>', 'string', 'Texto del botón "Cargar más"'],
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
