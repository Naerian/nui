import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Paginator.
 *
 * El Paginator implementa el patrón ARIA Navigation + Live Region:
 *
 *  1. Roles semánticos: el host es un elemento <nav> con aria-label derivado
 *     de `paginator.a11y.pagination` (i18n). Los botones de página llevan
 *     aria-label descriptivos y aria-current="page" en la página activa.
 *
 *  2. Region en vivo: hay una live region oculta (aria-live="polite") que
 *     anuncia los cambios de página a los lectores de pantalla.
 *
 *  3. Botones de navegación: primera/última/anterior/siguiente página
 *     llevan sus respectivos tokens i18n como aria-label. Los botones
 *     deshabilitados utilizan el atributo disabled nativo.
 *
 *  4. Salto de página: el campo de entrada tiene su propio aria-label y
 *     mensajes de error de validación enlazados con aria-describedby.
 */
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
        'common.tables.element',
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          'components.paginator.a11y.roles.elements.host',
          '<code>aria-label</code>',
          '"Paginaci\u00f3n" (i18n)',
          'components.paginator.a11y.roles.rows.hostLabel.description',
        ],
        [
          'components.paginator.a11y.roles.elements.firstPage',
          '<code>aria-label</code>',
          '"Primera p\u00e1gina" (i18n)',
          'components.paginator.a11y.roles.rows.firstPage.description',
        ],
        [
          'components.paginator.a11y.roles.elements.prevPage',
          '<code>aria-label</code>',
          '"P\u00e1gina anterior" (i18n)',
          'components.paginator.a11y.roles.rows.prevPage.description',
        ],
        [
          'components.paginator.a11y.roles.elements.pageButton',
          '<code>aria-label</code>',
          '"P\u00e1gina {page}" (i18n)',
          'components.paginator.a11y.roles.rows.pageButton.description',
        ],
        [
          'components.paginator.a11y.roles.elements.currentPage',
          '<code>aria-current</code>',
          '"page"',
          'components.paginator.a11y.roles.rows.currentPage.description',
        ],
        [
          'components.paginator.a11y.roles.elements.nextPage',
          '<code>aria-label</code>',
          '"P\u00e1gina siguiente" (i18n)',
          'components.paginator.a11y.roles.rows.nextPage.description',
        ],
        [
          'components.paginator.a11y.roles.elements.lastPage',
          '<code>aria-label</code>',
          '"Última p\u00e1gina" (i18n)',
          'components.paginator.a11y.roles.rows.lastPage.description',
        ],
        [
          'components.paginator.a11y.roles.elements.liveRegion',
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
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.paginator.a11y.naming.elements.nav',
          'components.paginator.a11y.naming.info.i18nPagination',
          'components.paginator.a11y.naming.rows.nav.description',
        ],
        [
          'components.paginator.a11y.naming.elements.pageButtons',
          'components.paginator.a11y.naming.info.i18nPage',
          'components.paginator.a11y.naming.rows.pageButtons.description',
        ],
        [
          'components.paginator.a11y.naming.elements.liveAnnouncement',
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
          'components.paginator.a11y.keyboard.rows.spaceEnter.description',
        ],
      ],
    },
  },
];
