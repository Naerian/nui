import { ComponentSection } from '../../../../core/models';

export const PAGINATOR_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.paginator.a11y.roles.title',
    description: 'components.paginator.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>aria-label</code>',
          '"Paginación" (i18n)',
          'components.paginator.a11y.roles.rows.hostLabel.description',
        ],
        [
          '<code>aria-label</code>',
          '"Primera página" (i18n)',
          'components.paginator.a11y.roles.rows.firstPage.description',
        ],
        [
          '<code>aria-label</code>',
          '"Página anterior" (i18n)',
          'components.paginator.a11y.roles.rows.prevPage.description',
        ],
        [
          '<code>aria-label</code>',
          '"Página {page}" (i18n)',
          'components.paginator.a11y.roles.rows.pageButton.description',
        ],
        [
          '<code>aria-current</code>',
          '"page"',
          'components.paginator.a11y.roles.rows.currentPage.description',
        ],
        [
          '<code>aria-label</code>',
          '"Página siguiente" (i18n)',
          'components.paginator.a11y.roles.rows.nextPage.description',
        ],
        [
          '<code>aria-label</code>',
          '"Última página" (i18n)',
          'components.paginator.a11y.roles.rows.lastPage.description',
        ],
        [
          '<code>aria-live</code>',
          '"polite"',
          'components.paginator.a11y.roles.rows.liveRegion.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.paginator.a11y.naming.title',
    description: 'components.paginator.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.paginator.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.paginator.a11y.naming.info.i18nPagination',
          'components.paginator.a11y.naming.rows.nav.description',
        ],
        [
          'components.paginator.a11y.naming.info.i18nPage',
          'components.paginator.a11y.naming.rows.pageButtons.description',
        ],
        [
          'components.paginator.a11y.naming.info.interpolated',
          'components.paginator.a11y.naming.rows.liveAnnouncement.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.paginator.a11y.keyboard.title',
    description: 'components.paginator.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>',
          'components.paginator.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Enter</kbd> / <kbd>Space</kbd>',
          'components.paginator.a11y.keyboard.rows.enterSpace.description',
        ],
      ],
    },
  },
];
