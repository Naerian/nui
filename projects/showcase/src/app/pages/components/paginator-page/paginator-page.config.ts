import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Paginator
 */
export const PAGINATOR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.paginator.title',
  subtitle: 'components.paginator.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.paginator.basic.title',
      description: 'components.paginator.basic.description',
      anchor: 'basico',
      examples: [
        {
          title: 'components.paginator.basic.codeTitle',
          code: `<nui-paginator
  [currentPage]="currentPage"
  [totalItems]="150"
  [itemsPerPage]="10"
  (pageChange)="onPageChange($event)"
></nui-paginator>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'styles',
      title: 'components.paginator.styles.title',
      description: 'components.paginator.styles.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.paginator.styles.codeTitle',
          code: `<!-- Colores y variantes -->
<nui-paginator color="secondary" variant="outline" [totalItems]="100"></nui-paginator>
<nui-paginator color="success" variant="solid" [totalItems]="100"></nui-paginator>
<nui-paginator color="primary" variant="ghost" [totalItems]="100"></nui-paginator>

<!-- Tamaños -->
<nui-paginator size="sm" color="success" [totalItems]="100"></nui-paginator>
<nui-paginator size="md" [totalItems]="100"></nui-paginator>
<nui-paginator size="lg" [totalItems]="100"></nui-paginator>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'layout',
      title: 'components.paginator.layout.title',
      description: 'components.paginator.layout.description',
      anchor: 'layout',
      note: {
        type: 'info',
        content: 'components.paginator.layout.note',
      },
      examples: [
        {
          title: 'components.paginator.layout.tsTitle',
          code: `import { PaginatorLayout } from 'nui';

myLayout: PaginatorLayout = {
  top: ['itemRange'],
  left: ['pageSize'],
  center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
  right: ['pageJump'],
  bottom: ['itemRange'],
  direction: 'column',
  gap: '1rem',
};`,
          language: 'typescript',
        },
        {
          title: 'components.paginator.layout.htmlTitle',
          code: `<nui-paginator
  [layout]="myLayout"
  [currentPage]="1"
  [totalItems]="500"
  [itemsPerPage]="20"
></nui-paginator>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'infinite',
      title: 'components.paginator.infinite.title',
      description: 'components.paginator.infinite.description',
      anchor: 'carga-infinita',
      examples: [
        {
          title: 'components.paginator.infinite.codeTitle',
          code: `<nui-paginator
  [infiniteConfig]="{ 
    enabled: true, 
    mode: 'button',
    showCounter: true,
    initialLoadedItems: 20,
    onLoadMore: loadMoreData
  }"
  [totalItems]="100"
></nui-paginator>

// TypeScript
async loadMoreData() {
  this.loading.set(true);
  
  // Simular llamada a API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const currentLength = this.items().length;
  const newItems = Array.from(
    { length: 20 }, 
    (_, i) => \`Item \${currentLength + i + 1}\`
  );
  
  this.items.update(items => [...items, ...newItems]);
  this.loading.set(false);
}`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.paginator.sizes.title',
      description: 'components.paginator.sizes.description',
      anchor: 'tamanos-pagina',
      note: {
        type: 'info',
        content: 'components.paginator.sizes.note',
      },
      examples: [
        {
          title: 'components.paginator.sizes.codeTitle',
          code: `<nui-paginator
  [currentPage]="1"
  [totalItems]="200"
  [itemsPerPage]="pageSize"
  [pageSizeOptions]="[5, 10, 25, 50, 100]"
  (pageSizeChange)="onPageSizeChange($event)"
></nui-paginator>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.paginator.api.title',
      description: 'components.paginator.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'components.paginator.api.inputsCodeTitle',
          code: `// Inputs del componente
@Input() currentPage = 1;                      // Página actual
@Input() totalItems = 0;                       // Total de items
@Input() itemsPerPage = 10;                    // Items por página
@Input() pageSizeOptions: number[] = [10, 25, 50, 100]; // Opciones de tamaño
@Input() maxPages = 7;                         // Máximo de páginas visibles
@Input() showFirstLast = true;                 // Mostrar botones primera/última
@Input() showPrevNext = true;                  // Mostrar botones anterior/siguiente
@Input() showPageNumbers = true;               // Mostrar números de página
@Input() showPageSizeSelector = true;          // Mostrar selector de tamaño
@Input() showItemRange = true;                 // Mostrar rango de items
@Input() showPageJump = false;                 // Mostrar salto a página
@Input() color?: ButtonColor;                  // Color de los botones
@Input() variant: ButtonVariant = 'outline';   // Variante de los botones
@Input() size: ButtonSize = 'md';              // Tamaño de los botones
@Input() layout?: PaginatorLayout;             // Layout personalizado
@Input() infiniteConfig?: InfiniteScrollConfig; // Configuración de carga infinita

// Outputs del componente
@Output() pageChange = new EventEmitter<number>();     // Cambio de página
@Output() pageSizeChange = new EventEmitter<number>(); // Cambio de tamaño`,
          language: 'typescript',
        },
        {
          title: 'components.paginator.api.interfacesCodeTitle',
          code: `// Interface PaginatorLayout
interface PaginatorLayout {
  top?: PaginatorElement[];      // Elementos en la parte superior
  left?: PaginatorElement[];     // Elementos a la izquierda
  center?: PaginatorElement[];   // Elementos en el centro
  right?: PaginatorElement[];    // Elementos a la derecha
  bottom?: PaginatorElement[];   // Elementos en la parte inferior
  direction?: 'row' | 'column';  // Dirección del layout
  gap?: string;                  // Espacio entre áreas
}

type PaginatorElement = 
  | 'firstButton'    // Botón primera página
  | 'prevButton'     // Botón anterior
  | 'pageNumbers'    // Números de página
  | 'nextButton'     // Botón siguiente
  | 'lastButton'     // Botón última página
  | 'pageSize'       // Selector de tamaño
  | 'itemRange'      // Rango de items (ej: "1-10 de 100")
  | 'pageJump';      // Salto a página

// Interface InfiniteScrollConfig
interface InfiniteScrollConfig {
  enabled: boolean;              // Activar modo infinito
  mode: 'button' | 'auto';       // Modo: botón o automático
  showCounter?: boolean;         // Mostrar contador de items cargados
  initialLoadedItems?: number;   // Items cargados inicialmente
  onLoadMore: () => void | Promise<void>; // Callback para cargar más
  loadingText?: string;          // Texto durante la carga
  buttonText?: string;           // Texto del botón
  endText?: string;              // Texto cuando no hay más items
}`,
          language: 'typescript',
        },
        {
          title: 'components.paginator.api.usageCodeTitle',
          code: `// Ejemplo completo con layout personalizado e infinito
import { Component, signal } from '@angular/core';
import { PaginatorLayout, InfiniteScrollConfig } from 'nui';

@Component({
  selector: 'app-example',
  template: \`
    <!-- Paginador estándar con layout personalizado -->
    <nui-paginator
      [currentPage]="currentPage()"
      [totalItems]="totalItems()"
      [itemsPerPage]="pageSize()"
      [pageSizeOptions]="[10, 25, 50, 100]"
      [layout]="customLayout"
      color="primary"
      variant="solid"
      size="md"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </nui-paginator>
    
    <!-- Paginador con carga infinita -->
    <nui-paginator
      [infiniteConfig]="infiniteConfig"
      [totalItems]="totalItems()">
    </nui-paginator>
  \`
})
export class ExampleComponent {
  currentPage = signal(1);
  pageSize = signal(25);
  totalItems = signal(500);
  items = signal<string[]>([]);
  loading = signal(false);
  
  // Layout personalizado
  customLayout: PaginatorLayout = {
    top: ['itemRange'],
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
    right: ['pageSize'],
    direction: 'column',
    gap: '1rem'
  };
  
  // Configuración de carga infinita
  infiniteConfig: InfiniteScrollConfig = {
    enabled: true,
    mode: 'button',
    showCounter: true,
    initialLoadedItems: 20,
    onLoadMore: () => this.loadMore(),
    loadingText: 'Cargando más items...',
    buttonText: 'Cargar más',
    endText: 'No hay más items'
  };
  
  onPageChange(page: number): void {
    this.currentPage.set(page);
    console.log('Página cambiada a:', page);
    this.loadData();
  }
  
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1); // Resetear a primera página
    console.log('Tamaño de página cambiado a:', size);
    this.loadData();
  }
  
  async loadData(): Promise<void> {
    // Cargar datos para la página actual
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    // ... lógica de carga
  }
  
  async loadMore(): Promise<void> {
    if (this.loading()) return;
    
    this.loading.set(true);
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentLength = this.items().length;
      const newItems = Array.from(
        { length: 20 },
        (_, i) => \`Item \${currentLength + i + 1}\`
      );
      this.items.update(items => [...items, ...newItems]);
    } finally {
      this.loading.set(false);
    }
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.paginator.styling.title',
      description: 'components.paginator.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.paginator.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Layout */
  --nui-paginator-gap: var(--spacing-sm);
  --nui-paginator-align-items: center;
  --nui-paginator-justify-content: space-between;
  
  /* Botones de navegación */
  --nui-paginator-button-min-width: 40px;
  --nui-paginator-button-gap: var(--spacing-xs);
  
  /* Números de página */
  --nui-paginator-page-number-min-width: 36px;
  --nui-paginator-page-number-height: 36px;
  --nui-paginator-page-number-gap: 4px;
  
  /* Página activa */
  --nui-paginator-active-bg: var(--primary-color);
  --nui-paginator-active-text: var(--nui-text-on-primary);
  --nui-paginator-active-border: var(--primary-color);
  
  /* Ellipsis */
  --nui-paginator-ellipsis-color: var(--nui-text-tertiary);
  --nui-paginator-ellipsis-padding: var(--spacing-xs);
  
  /* Selector de tamaño */
  --nui-paginator-size-selector-min-width: 80px;
  --nui-paginator-size-selector-gap: var(--spacing-sm);
  
  /* Rango de items */
  --nui-paginator-item-range-color: var(--nui-text-secondary);
  --nui-paginator-item-range-font-size: var(--font-size-sm);
  
  /* Salto a página */
  --nui-paginator-page-jump-input-width: 60px;
  --nui-paginator-page-jump-gap: var(--spacing-sm);
  
  /* Carga infinita - Botón */
  --nui-paginator-infinite-button-padding: var(--spacing-md) var(--spacing-xl);
  --nui-paginator-infinite-button-margin: var(--spacing-lg) 0;
  
  /* Carga infinita - Contador */
  --nui-paginator-infinite-counter-color: var(--nui-text-secondary);
  --nui-paginator-infinite-counter-font-size: var(--font-size-sm);
  --nui-paginator-infinite-counter-margin: var(--spacing-xs) 0;
  
  /* Carga infinita - Mensaje final */
  --nui-paginator-infinite-end-color: var(--nui-text-tertiary);
  --nui-paginator-infinite-end-font-size: var(--font-size-sm);
}

// Ejemplo de paginador compacto
.compact-paginator {
  --nui-paginator-gap: var(--spacing-xs);
  --nui-paginator-button-min-width: 32px;
  --nui-paginator-page-number-min-width: 32px;
  --nui-paginator-page-number-height: 32px;
  --nui-paginator-page-number-gap: 2px;
}

// Ejemplo de paginador con bordes redondeados
.rounded-paginator {
  ::ng-deep .nui-paginator {
    button {
      border-radius: 20px;
    }
  }
}

// Ejemplo de paginador estilo minimal
.minimal-paginator {
  --nui-paginator-button-gap: 0;
  --nui-paginator-page-number-gap: 0;
  
  ::ng-deep .nui-paginator {
    button {
      border: none;
      background: transparent;
      
      &:hover {
        background: var(--nui-bg-hover);
      }
      
      &.active {
        background: transparent;
        color: var(--primary-color);
        font-weight: var(--font-weight-bold);
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
