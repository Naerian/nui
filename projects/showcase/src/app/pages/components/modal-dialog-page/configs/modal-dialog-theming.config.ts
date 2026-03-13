import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.modal-dialog.theming.colors.title',
    description: 'components.modal-dialog.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-modal-dialog-bg</code>', 'var(--nui-surface)', 'Modal panel background color'],
        ['<code>--nui-modal-dialog-text</code>', 'var(--nui-on-surface)', 'Modal text color'],
        ['<code>--nui-modal-dialog-border</code>', 'var(--nui-border-subtle)', 'Footer border separator color'],
        ['<code>--nui-modal-dialog-overlay-bg</code>', 'var(--nui-overlay-bg)', 'Backdrop overlay background'],
        ['<code>--nui-modal-dialog-progress-bg</code>', 'var(--nui-surface-neutral)', 'Timeout progress bar track color'],
        ['<code>--nui-modal-dialog-progress-color</code>', 'var(--nui-primary)', 'Timeout progress bar fill color'],
        ['<code>--nui-modal-dialog-scroll-bg</code>', 'var(--nui-surface)', 'Scrollbar track color'],
        ['<code>--nui-modal-dialog-scroll-thumb-bg</code>', 'var(--nui-border-high)', 'Scrollbar thumb color'],
      ],
    },
  },
  {
    id: 'theming-layout',
    title: 'components.modal-dialog.theming.layout.title',
    description: 'components.modal-dialog.theming.layout.description',
    anchor: 'theming-layout',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-modal-dialog-border-radius</code>', '12px', 'Corner radius of the modal panel'],
        ['<code>--nui-modal-dialog-shadow</code>', 'var(--nui-box-shadow-xl)', 'Drop shadow of the modal panel'],
        ['<code>--nui-modal-dialog-header-padding</code>', '20px', 'Header top/side padding'],
        ['<code>--nui-modal-dialog-body-padding-y</code>', '16px', 'Body vertical padding'],
        ['<code>--nui-modal-dialog-body-padding-x</code>', '20px', 'Body horizontal padding'],
        ['<code>--nui-modal-dialog-footer-padding-top</code>', '12px', 'Footer top padding'],
        ['<code>--nui-modal-dialog-footer-padding-bottom</code>', '20px', 'Footer bottom padding'],
        ['<code>--nui-modal-dialog-footer-padding-x</code>', '20px', 'Footer horizontal padding'],
        ['<code>--nui-modal-dialog-title-size</code>', '1rem', 'Title font size'],
        ['<code>--nui-modal-dialog-title-weight</code>', '600', 'Title font weight'],
        ['<code>--nui-modal-dialog-z-index</code>', 'var(--nui-z-index-modal)', 'Stack layer for the overlay backdrop'],
      ],
    },
  },
  {
    id: 'theming-dock',
    title: 'components.modal-dialog.theming.dock.title',
    description: 'components.modal-dialog.theming.dock.description',
    anchor: 'theming-dock',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-modal-dialog-dock-bg</code>', 'var(--nui-surface)', 'Dock area background'],
        ['<code>--nui-modal-dialog-dock-border</code>', 'var(--nui-border-subtle)', 'Dock chip border color'],
        ['<code>--nui-modal-dialog-dock-text</code>', 'var(--nui-on-surface)', 'Dock chip text color'],
        ['<code>--nui-modal-dialog-dock-shadow</code>', 'var(--nui-box-shadow-md)', 'Dock chip default shadow'],
        ['<code>--nui-modal-dialog-dock-hover-shadow</code>', 'var(--nui-box-shadow-xl)', 'Dock chip shadow on hover'],
        ['<code>--nui-modal-dialog-dock-chip-bg</code>', 'var(--nui-surface)', 'Chip background color'],
        ['<code>--nui-modal-dialog-dock-chip-hover-bg</code>', 'var(--nui-surface-neutral)', 'Chip background on hover'],
        ['<code>--nui-modal-dialog-dock-border-radius</code>', '8px', 'Chip corner radius'],
      ],
    },
  },
];
