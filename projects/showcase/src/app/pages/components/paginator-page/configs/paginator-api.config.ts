import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Paginator
 * Dividido en Inputs, Outputs e Interfaces para mejor organización
 */
export const PAGINATOR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-import',
    title: 'common.import',
    description: 'common.api.importComponent',
    anchor: 'api-import',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { PaginatorComponent } from 'nui';

@Component({
  standalone: true,
  imports: [PaginatorComponent],
})
export class MyComponent {}`,
        language: 'typescript',
      },
    ],
  },
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
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.size.description',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.variant.description',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.color.description',
        ],
        [
          '<code>mode</code>',
          'PaginatorMode',
          '<code class="neutral">default</code>',
          'components.paginator.api.inputs.rows.mode.description',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.paginator.api.inputs.rows.disabled.description',
        ],
        [
          '<code>currentPage</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.paginator.api.inputs.rows.currentPage.description',
        ],
        [
          '<code>totalItems</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.totalItems.description',
        ],
        [
          '<code>totalPages</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.paginator.api.inputs.rows.totalPages.description',
        ],
        [
          '<code>itemsPerPage</code>',
          'number',
          '<code class="neutral">10</code>',
          'components.paginator.api.inputs.rows.itemsPerPage.description',
        ],
        [
          '<code>maxVisiblePages</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.maxVisiblePages.description',
        ],
        [
          '<code>pageSizeOptions</code>',
          'number[]',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.pageSizeOptions.description',
        ],
        [
          '<code>showFirstLast</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.showFirstLast.description',
        ],
        [
          '<code>showPageSizeSelector</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.showPageSizeSelector.description',
        ],
        [
          '<code>showItemRange</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.showItemRange.description',
        ],
        [
          '<code>showPageJump</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.showPageJump.description',
        ],
        [
          '<code>navDisplay</code>',
          'PaginatorNavDisplay',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.navDisplay.description',
        ],
        [
          '<code>navIcons</code>',
          'Partial&lt;PaginatorIcons&gt;',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.navIcons.description',
        ],
        [
          '<code>navTexts</code>',
          'Partial&lt;PaginatorI18n&gt;',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.navTexts.description',
        ],
        [
          '<code>autoScroll</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.autoScroll.description',
        ],
        [
          '<code>scrollTarget</code>',
          'string | HTMLElement',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.scrollTarget.description',
        ],
        [
          '<code>keyboard</code>',
          'Partial&lt;KeyboardConfig&gt;',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.keyboard.description',
        ],
        [
          '<code>layout</code>',
          'PaginatorLayout',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.layout.description',
        ],
        [
          '<code>mobileLayout</code>',
          'PaginatorLayout',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.mobileLayout.description',
        ],
        [
          '<code>autoMobile</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.paginator.api.inputs.rows.autoMobile.description',
        ],
        [
          '<code>autoWrap</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.paginator.api.inputs.rows.autoWrap.description',
        ],
        [
          '<code>infiniteConfig</code>',
          'InfiniteConfig',
          '<code class="neutral">undefined</code>',
          'components.paginator.api.inputs.rows.infiniteConfig.description',
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
          'OutputEmitterRef&lt;number&gt;',
          'components.paginator.api.outputs.rows.pageChange.description',
        ],
        [
          '<code>pageSizeChange</code>',
          'OutputEmitterRef&lt;number&gt;',
          'components.paginator.api.outputs.rows.pageSizeChange.description',
        ],
        [
          '<code>pageChangeAdvanced</code>',
          'OutputEmitterRef&lt;PageChangeEvent&gt;',
          'components.paginator.api.outputs.rows.pageChangeAdvanced.description',
        ],
        [
          '<code>pageSizeChangeAdvanced</code>',
          'OutputEmitterRef&lt;PageSizeChangeEvent&gt;',
          'components.paginator.api.outputs.rows.pageSizeChangeAdvanced.description',
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
        ['<code>itemsPerPage</code>', 'string', 'components.paginator.api.texts.rows.itemsPerPage.description'],
        ['<code>showingItems</code>', 'string', 'components.paginator.api.texts.rows.showingItems.description'],
        ['<code>page</code>', 'string', 'components.paginator.api.texts.rows.page.description'],
        ['<code>of</code>', 'string', 'components.paginator.api.texts.rows.of.description'],
        ['<code>goToPage</code>', 'string', 'components.paginator.api.texts.rows.goToPage.description'],
        ['<code>go</code>', 'string', 'components.paginator.api.texts.rows.go.description'],
        ['<code>invalidPage</code>', 'string', 'components.paginator.api.texts.rows.invalidPage.description'],
        ['<code>firstPage</code>', 'string', 'components.paginator.api.texts.rows.firstPage.description'],
        ['<code>lastPage</code>', 'string', 'components.paginator.api.texts.rows.lastPage.description'],
        ['<code>previousPage</code>', 'string', 'components.paginator.api.texts.rows.previousPage.description'],
        ['<code>nextPage</code>', 'string', 'components.paginator.api.texts.rows.nextPage.description'],
        ['<code>pageLabel</code>', 'string', 'components.paginator.api.texts.rows.pageLabel.description'],
        ['<code>morePages</code>', 'string', 'components.paginator.api.texts.rows.morePages.description'],
        ['<code>loadMore</code>', 'string', 'components.paginator.api.texts.rows.loadMore.description'],
        ['<code>loading</code>', 'string', 'components.paginator.api.texts.rows.loading.description'],
        ['<code>pageJumpHelp</code>', 'string', 'components.paginator.api.texts.rows.pageJumpHelp.description'],
        ['<code>infiniteLoadedItems</code>', 'string', 'components.paginator.api.texts.rows.infiniteLoadedItems.description'],
        ['<code>infiniteLoadEnd</code>', 'string', 'components.paginator.api.texts.rows.infiniteLoadEnd.description'],
        ['<code>a11y.pagination</code>', 'string', 'components.paginator.api.texts.rows.a11yPagination.description'],
        ['<code>a11y.morePages</code>', 'string', 'components.paginator.api.texts.rows.a11yMorePages.description'],
        ['<code>a11y.page</code>', 'string', 'components.paginator.api.texts.rows.a11yPage.description'],
        ['<code>a11y.currentPage</code>', 'string', 'components.paginator.api.texts.rows.a11yCurrentPage.description'],
        ['<code>a11y.goToPage</code>', 'string', 'components.paginator.api.texts.rows.a11yGoToPage.description'],
        ['<code>a11y.currentPageWithRange</code>', 'string', 'components.paginator.api.texts.rows.a11yCurrentPageWithRange.description'],
        ['<code>a11y.currentPageNoRange</code>', 'string', 'components.paginator.api.texts.rows.a11yCurrentPageNoRange.description'],
        ['<code>a11y.fractionalPage</code>', 'string', 'components.paginator.api.texts.rows.a11yFractionalPage.description'],
        ['<code>a11y.showingItems</code>', 'string', 'components.paginator.api.texts.rows.a11yShowingItems.description'],
        ['<code>a11y.loading</code>', 'string', 'components.paginator.api.texts.rows.a11yLoading.description'],
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
        ['<code>enabled</code>', 'boolean', 'components.paginator.api.keyboard.rows.enabled.description'],
        ['<code>firstPage</code>', 'string[]', 'components.paginator.api.keyboard.rows.firstPage.description'],
        ['<code>lastPage</code>', 'string[]', 'components.paginator.api.keyboard.rows.lastPage.description'],
        ['<code>previousPage</code>', 'string[]', 'components.paginator.api.keyboard.rows.previousPage.description'],
        ['<code>nextPage</code>', 'string[]', 'components.paginator.api.keyboard.rows.nextPage.description'],
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
        ['<code>showLoading</code>', 'boolean', 'components.paginator.api.loading.rows.showLoading.description'],
        ['<code>loadingDelay</code>', 'number', 'components.paginator.api.loading.rows.loadingDelay.description'],
        ['<code>disableOnLoading</code>', 'boolean', 'components.paginator.api.loading.rows.disableOnLoading.description'],
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
        ['<code>top</code>', 'PaginatorElement[]', 'components.paginator.api.layout.rows.top.description'],
        ['<code>left</code>', 'PaginatorElement[]', 'components.paginator.api.layout.rows.left.description'],
        ['<code>center</code>', 'PaginatorElement[]', 'components.paginator.api.layout.rows.center.description'],
        ['<code>right</code>', 'PaginatorElement[]', 'components.paginator.api.layout.rows.right.description'],
        ['<code>bottom</code>', 'PaginatorElement[]', 'components.paginator.api.layout.rows.bottom.description'],
        [
          '<code>direction</code>',
          "'row' | 'column'",
          'components.paginator.api.layout.rows.direction.description',
        ],
        [
          '<code>align</code>',
          'PLayoutAlign',
          'components.paginator.api.layout.rows.align.description',
        ],
        [
          '<code>topConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'components.paginator.api.layout.rows.topConfig.description',
        ],
        [
          '<code>bottomConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'components.paginator.api.layout.rows.bottomConfig.description',
        ],
        [
          '<code>leftConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'components.paginator.api.layout.rows.leftConfig.description',
        ],
        [
          '<code>centerConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'components.paginator.api.layout.rows.centerConfig.description',
        ],
        [
          '<code>rightConfig</code>',
          '{ vertical?: PVerticalAlign; horizontal?: PLayoutAlign }',
          'components.paginator.api.layout.rows.rightConfig.description',
        ],
        [
          '<code>verticalAlign</code>',
          'PVerticalAlign',
          'components.paginator.api.layout.rows.verticalAlign.description',
        ],
        ['<code>gap</code>', 'string', 'components.paginator.api.layout.rows.gap.description'],
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
          'components.paginator.api.icons.rows.first.description',
        ],
        [
          '<code>previous</code>',
          'string',
          '<code class="neutral">ri-arrow-left-s-line</code>',
          'components.paginator.api.icons.rows.previous.description',
        ],
        [
          '<code>next</code>',
          'string',
          '<code class="neutral">ri-arrow-right-s-line</code>',
          'components.paginator.api.icons.rows.next.description',
        ],
        [
          '<code>last</code>',
          'string',
          '<code class="neutral">ri-arrow-right-double-line</code>',
          'components.paginator.api.icons.rows.last.description',
        ],
        [
          '<code>loadMore</code>',
          'string',
          '<code class="neutral">ri-add-line</code>',
          'components.paginator.api.icons.rows.loadMore.description',
        ],
        [
          '<code>loading</code>',
          'string',
          '<code class="neutral">ri-loader-4-line</code>',
          'components.paginator.api.icons.rows.loading.description',
        ],
        [
          '<code>prefix</code>',
          'string',
          '<code class="neutral">ri-</code>',
          'components.paginator.api.icons.rows.prefix.description',
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
        ['<code>enabled</code>', 'boolean', 'components.paginator.api.infinite.rows.enabled.description'],
        [
          '<code>mode</code>',
          "'scroll' | 'button' | 'hybrid'",
          'components.paginator.api.infinite.rows.mode.description',
        ],
        ['<code>scrollOffset</code>', 'number', 'components.paginator.api.infinite.rows.scrollOffset.description'],
        ['<code>itemsPerLoad</code>', 'number', 'components.paginator.api.infinite.rows.itemsPerLoad.description'],
        ['<code>maxItems</code>', 'number', 'components.paginator.api.infinite.rows.maxItems.description'],
        ['<code>showCounter</code>', 'boolean', 'components.paginator.api.infinite.rows.showCounter.description'],
        [
          '<code>initialLoadedItems</code>',
          'number',
          'components.paginator.api.infinite.rows.initialLoadedItems.description',
        ],
        [
          '<code>onLoadMore</code>',
          '() =&gt; void | Promise&lt;void&gt;',
          'components.paginator.api.infinite.rows.onLoadMore.description',
        ],
      ],
    },
  },
];
