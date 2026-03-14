import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_A11Y_SECTIONS: ComponentSection[] = [
  {
    id: 'a11y-roles',
    title: 'components.modal-dialog.a11y.roles.title',
    description: 'components.modal-dialog.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: ['common.tables.attribute', 'common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>role</code>', 'dialog', 'components.modal-dialog.a11y.roles.rows.role'],
        ['<code>aria-modal</code>', 'true', 'components.modal-dialog.a11y.roles.rows.ariaModal'],
        ['<code>aria-labelledby</code>', '{instanceId}-title', 'components.modal-dialog.a11y.roles.rows.ariaLabelledby'],
        ['<code>aria-describedby</code>', '{instanceId}-body', 'components.modal-dialog.a11y.roles.rows.ariaDescribedby'],
      ],
    },
  },
  {
    id: 'a11y-focus',
    title: 'components.modal-dialog.a11y.focus.title',
    description: 'components.modal-dialog.a11y.focus.description',
    anchor: 'a11y-focus',
    note: {
      type: 'info',
      content: 'components.modal-dialog.a11y.focus.note',
    },
    table: {
      headers: ['common.tables.feature', 'common.tables.description'],
      rows: [
        ['Focus trap', 'components.modal-dialog.a11y.focus.rows.focusTrap'],
        ['Focus restoration', 'components.modal-dialog.a11y.focus.rows.focusRestoration'],
        ['Escape key', 'components.modal-dialog.a11y.focus.rows.escapeKey'],
        ['autoFocus', 'components.modal-dialog.a11y.focus.rows.autoFocus'],
      ],
    },
  },
];
