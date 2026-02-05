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
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
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
      id: 'colors',
      title: 'components.paginator.colors.title',
      description: 'components.paginator.colors.description',
      note: {
        type: 'info',
        content: 'components.paginator.colors.note',
      },
      anchor: 'colors',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-paginator color="primary" variant="ghost" [totalItems]="100" [showPageSizeSelector]="true"></nui-paginator>
<nui-paginator color="secondary" variant="outline" [totalItems]="100" [showPageSizeSelector]="true"></nui-paginator>
<nui-paginator color="success" variant="solid" [totalItems]="100" [showPageSizeSelector]="true"></nui-paginator>
<nui-paginator color="danger" [totalItems]="100" [showPageSizeSelector]="true"></nui-paginator>
<nui-paginator color="warning" variant="outline" [totalItems]="100" [showPageSizeSelector]="true"></nui-paginator>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.paginator.sizes.title',
      description: 'components.paginator.sizes.description',
      note: {
        type: 'info',
        content: 'components.paginator.sizes.note',
      },
      anchor: 'sizes',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-paginator [currentPage]="1" [totalPages]="5" size="xs"></nui-paginator>
<nui-paginator [currentPage]="1" [totalPages]="5" size="sm"></nui-paginator>
<nui-paginator [currentPage]="1" [totalPages]="5" size="md"></nui-paginator>
<nui-paginator [currentPage]="1" [totalPages]="5" size="lg"></nui-paginator>
<nui-paginator [currentPage]="1" [totalPages]="5" size="xl"></nui-paginator>`,
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
          title: 'codeExamples.html',
          code: `<nui-paginator
  [layout]="idealLayout"
  [currentPage]="1"
  [totalItems]="500"
  [itemsPerPage]="20"
></nui-paginator>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `import { PaginatorLayout } from 'nui';

idealLayout: PaginatorLayout = {
  // Clean top/bottom rows to save vertical height
  top: [],
  bottom: ['itemRange'],

  // LEFT: Informational context
  // Users read left to right: first they see how much data there is.
  left: [],

  // CENTER: Pure navigation
  // The most important elements in the center, easy to reach with mouse/finger.
  center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],

  // RIGHT: Configuration tools
  // Changing page size or jumping to a page are secondary actions.
  right: ['pageSize', 'pageJump'],

  // Area-specific alignments (optional)
  leftConfig: {
    vertical: 'center', // Text stays nicely vertically centered
  },

  // The bottom area is centered both vertically and horizontally to highlight
  // the item range, which is important information but less interactive than
  // the central navigation.
  bottomConfig: {
    vertical: 'center',   // Pagination stays vertically centered
    horizontal: 'center', // Pagination stays horizontally centered
  },

  // The center keeps the default alignment (center), which is ideal for navigation
  centerConfig: {
    vertical: 'center', // Buttons remain centered
  },

  // The right area sticks to the top (start) to differentiate it from the center,
  // and is aligned to the right (end)
  rightConfig: {
    vertical: 'start',   // <--- HERE! The right area sticks to the top
    horizontal: 'end',   // And aligns to the right
  },

  // Settings
  direction: 'column',
  gap: '1rem',
};`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.itemInterface',
          code: `// Elements that can be used in the layout
interface PaginatorLayout {
  top?: PaginatorElement[]; // Elements in the top area
  left?: PaginatorElement[]; // Elements in the left area
  center?: PaginatorElement[]; // Elements in the center area
  right?: PaginatorElement[]; // Elements in the right area
  bottom?: PaginatorElement[]; // Elements in the bottom area

  direction?: PLayoutDirection; // Main layout direction: 'row' (horizontal) or 'column' (vertical)
  align?: PLayoutAlign; // Elements alignment: 'start', 'center', 'end', 'space-between', 'space-around'

  topConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign }; // Alignment config for the top area
  bottomConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign }; // Alignment config for the bottom area

  leftConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign }; // Alignment config for the left area
  centerConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign }; // Alignment config for the center area
  rightConfig?: { vertical?: PVerticalAlign; horizontal?: PLayoutAlign }; // Alignment config for the right area

  verticalAlign?: PVerticalAlign; // General vertical alignment (if not specified per area)
  gap?: string; // Gap between elements (in rem or px)
}

// Possible elements in the layout
type PaginatorElement =
  | 'firstButton'     // Button to go to the first page
  | 'prevButton'      // Button to go to the previous page
  | 'pageNumbers'     // Page number buttons
  | 'currentPage'     // Current page display
  | 'nextButton'      // Button to go to the next page
  | 'lastButton'      // Button to go to the last page
  | 'itemRange'       // Display of item range (e.g., "1-10 of 100")
  | 'pageSize'        // Page size selector
  | 'pageJump';       // Page jump input
`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'infinite',
      title: 'components.paginator.infinite.title',
      description: 'components.paginator.infinite.description',
      note: {
        type: 'info',
        content: 'components.paginator.layout.note',
      },
      anchor: 'infinite',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-paginator
  [infiniteConfig]="{ 
    enabled: true, 
    mode: 'button',
    showCounter: true,
    initialLoadedItems: 20,
    onLoadMore: loadMoreData
  }"
  [totalItems]="100"
></nui-paginator>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `async loadMoreData() {
  this.loading.set(true);
  
  // Simulate data loading
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const currentLength = this.items().length;
  const newItems = Array.from(
    { length: 20 }, 
    (_, i) => \`Item \${currentLength + i + 1}\`
  );
  
  this.items.update(items => [...items, ...newItems]);
  this.loading.set(false);
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.interfacesCode',
          code: `interface InfiniteScrollConfig {
  enabled: boolean;              // Enable infinite mode
  mode: 'button' | 'auto';       // Mode: button or automatic
  showCounter?: boolean;         // Show loaded items counter
  initialLoadedItems?: number;   // Initially loaded items
  onLoadMore: () => void | Promise<void>; // Callback to load more
  loadingText?: string;          // Loading text
  buttonText?: string;           // Button text
  endText?: string;              // Text when no more items
}`,
          language: 'typescript',
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
          title: 'codeExamples.componentCode',
          code: `@Input() currentPage = 1;                      // Current page
@Input() totalItems = 0;                       // Total items
@Input() itemsPerPage = 10;                    // Items per page
@Input() pageSizeOptions: number[] = [10, 25, 50, 100]; // Page size options
@Input() maxPages = 7;                         // Maximum visible pages
@Input() showFirstLast = true;                 // Show first/last buttons
@Input() showPrevNext = true;                  // Show previous/next buttons
@Input() showPageNumbers = true;               // Show page numbers
@Input() showPageSizeSelector = true;          // Show page size selector
@Input() showItemRange = true;                 // Show item range
@Input() showPageJump = false;                 // Show page jump
@Input() color?: ButtonColor;                  // Button color
@Input() variant: ButtonVariant = 'outline';   // Button variant
@Input() size: ButtonSize = 'md';              // Button size
@Input() layout?: PaginatorLayout;             // Custom layout
@Input() infiniteConfig?: InfiniteScrollConfig; // Infinite scroll configuration

@Output() pageChange = new EventEmitter<number>();     // Page change
@Output() pageSizeChange = new EventEmitter<number>(); // Page size change`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.interfacesCode',
          code: `// Interface to configure the layout
interface PaginatorLayout {
  top?: PaginatorElement[];      // Elements at the top
  left?: PaginatorElement[];     // Elements on the left
  center?: PaginatorElement[];   // Elements in the center
  right?: PaginatorElement[];    // Elements on the right
  bottom?: PaginatorElement[];   // Elements at the bottom
  direction?: 'row' | 'column';  // Layout direction
  gap?: string;                  // Gap between areas
}

// Possible elements in the layout
type PaginatorElement = 
  | 'firstButton'    // First page button
  | 'prevButton'     // Previous page button
  | 'pageNumbers'    // Page numbers
  | 'nextButton'     // Next page button
  | 'lastButton'     // Last page button
  | 'pageSize'       // Page size selector
  | 'itemRange'      // Item range (e.g., "1-10 of 100")
  | 'pageJump';      // Page jump


// Interface to configure infinite scroll
interface InfiniteScrollConfig {
  enabled: boolean;              // Enable infinite mode
  mode: 'button' | 'auto';       // Mode: button or automatic
  showCounter?: boolean;         // Show loaded items counter
  initialLoadedItems?: number;   // Initially loaded items
  onLoadMore: () => void | Promise<void>; // Callback to load more
  loadingText?: string;          // Loading text
  buttonText?: string;           // Button text
  endText?: string;              // Text when no more items
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component, signal } from '@angular/core';
import { PaginatorLayout, InfiniteScrollConfig } from 'nui';

@Component({
  selector: 'app-example',
  template: \`
    <!-- Standard paginator with custom layout -->
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
    
    <!-- Paginator with infinite scroll -->
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
  
  // Custom layout
  customLayout: PaginatorLayout = {
    top: ['itemRange'],
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
    right: ['pageSize'],
    direction: 'column',
    gap: '1rem'
  };
  
  // Infinite scroll configuration
  infiniteConfig: InfiniteScrollConfig = {
    enabled: true,
    mode: 'button',
    showCounter: true,
    initialLoadedItems: 20,
    onLoadMore: () => this.loadMore(),
    loadingText: 'Loading more items...',
    buttonText: 'Load More',
    endText: 'No more items'
  };
  
  onPageChange(page: number): void {
    this.currentPage.set(page);
    console.log('Page changed to:', page);
    this.loadData();
  }
  
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1); // Reset to first page
    console.log('Page size changed to:', size);
    this.loadData();
  }
  
  async loadData(): Promise<void> {
    // Load data for the current page
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    // ... loading logic
  }
  
  async loadMore(): Promise<void> {
    if (this.loading()) return;
    
    this.loading.set(true);
    try {
      // Simulate data loading
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
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Layout */
  --nui-pg-gap: var(--nui-spacing-sm);
  --nui-pg-align-items: center;
  --nui-pg-justify-content: space-between;
  
  /* Navigation buttons */
  --nui-pg-button-min-width: 40px;
  --nui-pg-button-gap: var(--nui-spacing-xs);
  
  /* Page numbers */
  --nui-pg-page-number-min-width: 36px;
  --nui-pg-page-number-height: 36px;
  --nui-pg-page-number-gap: 4px;
  
  /* Active page */
  --nui-pg-active-bg: var(--primary-color);
  --nui-pg-active-text: var(--nui-text-on-primary);
  --nui-pg-active-border: var(--primary-color);
  
  /* Ellipsis */
  --nui-pg-ellipsis-color: var(--nui-text-tertiary);
  --nui-pg-ellipsis-padding: var(--nui-spacing-xs);
  
  /* Size selector */
  --nui-pg-size-selector-min-width: 80px;
  --nui-pg-size-selector-gap: var(--nui-spacing-sm);
  
  /* Item range */
  --nui-pg-item-range-color: var(--nui-text-secondary);
  --nui-pg-item-range-font-size: var(--nui-font-size-sm);
  
  /* Page jump */
  --nui-pg-page-jump-input-width: 60px;
  --nui-pg-page-jump-gap: var(--nui-spacing-sm);
  
  /* Infinite scroll - Button */
  --nui-pg-infinite-button-padding: var(--nui-spacing-md) var(--nui-spacing-xl);
  --nui-pg-infinite-button-margin: var(--nui-spacing-lg) 0;
  
  /* Infinite scroll - Counter */
  --nui-pg-infinite-counter-color: var(--nui-text-secondary);
  --nui-pg-infinite-counter-font-size: var(--nui-font-size-sm);
  --nui-pg-infinite-counter-margin: var(--nui-spacing-xs) 0;
  
  /* Infinite scroll - End message */
  --nui-pg-infinite-end-color: var(--nui-text-tertiary);
  --nui-pg-infinite-end-font-size: var(--nui-font-size-sm);
}

// Example of a compact paginator
.compact-paginator {
  --nui-pg-gap: var(--nui-spacing-xs);
  --nui-pg-button-min-width: 32px;
  --nui-pg-page-number-min-width: 32px;
  --nui-pg-page-number-height: 32px;
  --nui-pg-page-number-gap: 2px;
}

// Example of a paginator with rounded borders
.rounded-paginator {
  ::ng-deep .nui-paginator {
    button {
      border-radius: 20px;
    }
  }
}

// Example of a minimal style paginator
.minimal-paginator {
  --nui-pg-button-gap: 0;
  --nui-pg-page-number-gap: 0;
  
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
        font-weight: var(--nui-font-weight-bold);
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
