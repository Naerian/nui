import { ComponentSection } from '../../../../core/models';

export const PAGINATOR_I18N_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Tokens de etiquetas visibles
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-tokens',
    title: 'components.paginator.i18n.tokens.title',
    description: 'components.paginator.i18n.tokens.description',
    anchor: 'i18n-tokens',
    note: {
      type: 'info',
      content: 'components.paginator.i18n.tokens.note',
    },
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>paginator.itemsPerPage</code>',
          '"Items per page:"',
          'components.paginator.i18n.tokens.rows.itemsPerPage.description',
        ],
        [
          '<code>paginator.showingItems</code>',
          '"{start}-{end} of {total}"',
          'components.paginator.i18n.tokens.rows.showingItems.description',
        ],
        [
          '<code>paginator.page</code>',
          '"Page"',
          'components.paginator.i18n.tokens.rows.page.description',
        ],
        [
          '<code>paginator.of</code>',
          '"of"',
          'components.paginator.i18n.tokens.rows.of.description',
        ],
        [
          '<code>paginator.goToPage</code>',
          '"Go to page"',
          'components.paginator.i18n.tokens.rows.goToPage.description',
        ],
        [
          '<code>paginator.go</code>',
          '"Go"',
          'components.paginator.i18n.tokens.rows.go.description',
        ],
        [
          '<code>paginator.invalidPage</code>',
          '"Invalid page"',
          'components.paginator.i18n.tokens.rows.invalidPage.description',
        ],
        [
          '<code>paginator.firstPage</code>',
          '"First page"',
          'components.paginator.i18n.tokens.rows.firstPage.description',
        ],
        [
          '<code>paginator.lastPage</code>',
          '"Last page"',
          'components.paginator.i18n.tokens.rows.lastPage.description',
        ],
        [
          '<code>paginator.previousPage</code>',
          '"Previous page"',
          'components.paginator.i18n.tokens.rows.previousPage.description',
        ],
        [
          '<code>paginator.nextPage</code>',
          '"Next page"',
          'components.paginator.i18n.tokens.rows.nextPage.description',
        ],
        [
          '<code>paginator.pageLabel</code>',
          '"Page {page}"',
          'components.paginator.i18n.tokens.rows.pageLabel.description',
        ],
        [
          '<code>paginator.morePages</code>',
          '"More pages"',
          'components.paginator.i18n.tokens.rows.morePages.description',
        ],
        [
          '<code>paginator.loadMore</code>',
          '"Load more"',
          'components.paginator.i18n.tokens.rows.loadMore.description',
        ],
        [
          '<code>paginator.loading</code>',
          '"Loading..."',
          'components.paginator.i18n.tokens.rows.loading.description',
        ],
        [
          '<code>paginator.pageJumpHelp</code>',
          '"Enter a number between 1 and {totalPages}."',
          'components.paginator.i18n.tokens.rows.pageJumpHelp.description',
        ],
        [
          '<code>paginator.infiniteLoadedItems</code>',
          '"{loaded} items loaded of {total}"',
          'components.paginator.i18n.tokens.rows.infiniteLoadedItems.description',
        ],
        [
          '<code>paginator.infiniteLoadEnd</code>',
          '"No more items to display"',
          'components.paginator.i18n.tokens.rows.infiniteLoadEnd.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `// app.config.ts — global override via provideNuiI18n
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      paginator: {
        itemsPerPage: 'Items per page:',
        showingItems: '{start}–{end} of {total}',
        loadMore: 'Load more',
      },
    }),
  ],
};`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Per-instance override via [i18n] input -->
<nui-paginator
  [totalItems]="total"
  [(currentPage)]="page"
  [i18n]="{ itemsPerPage: 'Per page:', loadMore: 'Show more' }"
/>`,
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Tokens de accesibilidad (sub-objeto a11y)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-a11y-tokens',
    title: 'components.paginator.i18n.a11yTokens.title',
    description: 'components.paginator.i18n.a11yTokens.description',
    anchor: 'i18n-a11y-tokens',
    table: {
      headers: ['common.tables.token', 'common.tables.default', 'common.tables.description'],
      rows: [
        [
          '<code>paginator.a11y.pagination</code>',
          '"Pagination"',
          'components.paginator.i18n.a11yTokens.rows.pagination.description',
        ],
        [
          '<code>paginator.a11y.morePages</code>',
          '"More pages"',
          'components.paginator.i18n.a11yTokens.rows.morePages.description',
        ],
        [
          '<code>paginator.a11y.page</code>',
          '"Page {page}"',
          'components.paginator.i18n.a11yTokens.rows.page.description',
        ],
        [
          '<code>paginator.a11y.currentPage</code>',
          '"{page}, current page"',
          'components.paginator.i18n.a11yTokens.rows.currentPage.description',
        ],
        [
          '<code>paginator.a11y.goToPage</code>',
          '"Go to page {page}"',
          'components.paginator.i18n.a11yTokens.rows.goToPage.description',
        ],
        [
          '<code>paginator.a11y.currentPageWithRange</code>',
          '"Page {page} of {totalPages}, showing items {start} to {end} of {total} results"',
          'components.paginator.i18n.a11yTokens.rows.currentPageWithRange.description',
        ],
        [
          '<code>paginator.a11y.currentPageNoRange</code>',
          '"Page {page} of {totalPages}"',
          'components.paginator.i18n.a11yTokens.rows.currentPageNoRange.description',
        ],
        [
          '<code>paginator.a11y.fractionalPage</code>',
          '"Page {page} of {totalPages}"',
          'components.paginator.i18n.a11yTokens.rows.fractionalPage.description',
        ],
        [
          '<code>paginator.a11y.showingItems</code>',
          '"Showing items {start} to {end} of {total} results"',
          'components.paginator.i18n.a11yTokens.rows.showingItems.description',
        ],
        [
          '<code>paginator.a11y.loading</code>',
          '"Loading new page..."',
          'components.paginator.i18n.a11yTokens.rows.loading.description',
        ],
      ],
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `// app.config.ts — global override via provideNuiI18n
import { provideNuiI18n } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      paginator: {
        itemsPerPage: 'Items per page:',
        showingItems: '{start}–{end} of {total}',
        a11y: {
          pagination: 'Pagination',
          currentPage: '{page}, current page',
        },
      },
    }),
  ],
};`,
      },
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Per-instance override via [i18n] input -->
<nui-paginator
  [totalItems]="total"
  [(currentPage)]="page"
  [i18n]="{
    a11y: {
      pagination: 'Page navigation',
      currentPage: '{page}, active'
    }
  }"
/>`,
      },
    ],
  },
];
