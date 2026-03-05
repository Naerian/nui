import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Toast.
 *
 * El Toast implementa la región de estado en vivo de ARIA:
 *
 *  1. Roles semánticos: el host lleva aria-live="polite" (o "assertive" para
 *     tipo error/warning) y aria-atomic="true" para que el lector de pantalla
 *     anuncie el mensaje completo cuando aparece.
 *
 *  2. Naming: el nombre accesible del host se calcula automáticamente
 *     siguiendo la cadena: title → message → type.
 *
 *  3. Botón de cierre: recibe el texto i18n `close` como aria-label y
 *     devuelve el foco al elemento disparador tras cerrarse.
 *
 *  4. No requiere gestión de foco: al ser una notificación transitoria no
 *     mueve el foco al aparecer. El contenido es anunciado por el lector
 *     de pantalla gracias a aria-live.
 */
export const TOAST_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.toast.a11y.roles.title',
    description: 'components.toast.a11y.roles.description',
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
          'components.toast.a11y.roles.elements.host',
          '<code>aria-live</code>',
          '"polite" | "assertive"',
          'components.toast.a11y.roles.rows.ariaLive.description',
        ],
        [
          'components.toast.a11y.roles.elements.host',
          '<code>aria-atomic</code>',
          '"true"',
          'components.toast.a11y.roles.rows.ariaAtomic.description',
        ],
        [
          'components.toast.a11y.roles.elements.host',
          '<code>aria-label</code>',
          'title | message | type',
          'components.toast.a11y.roles.rows.ariaLabel.description',
        ],
        [
          'components.toast.a11y.roles.elements.closeButton',
          '<code>aria-label</code>',
          '"Close" (i18n)',
          'components.toast.a11y.roles.rows.closeLabel.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.toast.a11y.naming.title',
    description: 'components.toast.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'info',
      content: 'components.toast.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.toast.a11y.naming.elements.hostWithTitle',
          'components.toast.a11y.naming.info.title',
          'components.toast.a11y.naming.rows.hostTitle.description',
        ],
        [
          'components.toast.a11y.naming.elements.hostWithMessage',
          'components.toast.a11y.naming.info.message',
          'components.toast.a11y.naming.rows.hostMessage.description',
        ],
        [
          'components.toast.a11y.naming.elements.hostTypeFallback',
          'components.toast.a11y.naming.info.type',
          'components.toast.a11y.naming.rows.hostType.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Interacción con teclado
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-keyboard',
    title: 'components.toast.a11y.keyboard.title',
    description: 'components.toast.a11y.keyboard.description',
    anchor: 'a11y-keyboard',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<kbd>Tab</kbd>',
          'components.toast.a11y.keyboard.rows.tab.description',
        ],
        [
          '<kbd>Space</kbd> / <kbd>Enter</kbd>',
          'components.toast.a11y.keyboard.rows.spaceEnter.description',
        ],
      ],
    },
  },
];
