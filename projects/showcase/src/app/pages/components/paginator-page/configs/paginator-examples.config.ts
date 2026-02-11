import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos interactivos del Paginator
 */
export const PAGINATOR_EXAMPLES_SECTIONS: ComponentSection[] = [
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
      type: 'warning',
      icon: 'ri-error-warning-line',
      content: 'components.paginator.layout.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-paginator
  [layout]="idealLayout"
  [mobileLayout]="idealMobileLayout"
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
};

// Mobile-optimized layout to prevent overflow on small screens
idealMobileLayout: PaginatorLayout = {
  // TOP: Contextual information
  top: ['itemRange'],

  // CENTER: Essential navigation only (more compact)
  center: ['prevButton', 'currentPage', 'nextButton'],

  // BOTTOM: Configuration controls stacked
  bottom: ['pageSize', 'pageJump'],

  // Area configuration
  topConfig: { horizontal: 'center', vertical: 'center' },
  centerConfig: { horizontal: 'center', vertical: 'center' },
  bottomConfig: { horizontal: 'center', vertical: 'center' },

  // Vertical layout to stack elements
  direction: 'column',
  gap: '0.75rem',
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
  right?: PaginatorElement[]; // Elements on the right area
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
      content: 'components.paginator.infinite.note',
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
];
