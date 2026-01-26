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
  ],
};
