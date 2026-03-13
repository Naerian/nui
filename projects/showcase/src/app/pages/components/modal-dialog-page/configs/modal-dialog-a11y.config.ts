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
        ['<code>role</code>', 'dialog', 'Identifies the element as a dialog'],
        ['<code>aria-modal</code>', 'true', 'Informs assistive tech that content outside is inert'],
        ['<code>aria-labelledby</code>', '{instanceId}-title', 'Associates the heading with the dialog (auto when title is set)'],
        ['<code>aria-describedby</code>', '{instanceId}-body', 'Associates the body region with the dialog'],
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
        ['Focus trap', 'Keyboard focus is contained within the modal while it is open (Angular CDK FocusTrap)'],
        ['Focus restoration', 'When the modal closes, focus returns to the element that triggered it'],
        ['Escape key', 'Pressing Escape closes the modal (configurable via closeOnEscape)'],
        ['autoFocus', 'When true (default), the first focusable element receives focus on open'],
      ],
    },
  },
];
