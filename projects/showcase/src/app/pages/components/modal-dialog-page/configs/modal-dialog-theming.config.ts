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
        ['<code>--nui-modal-dialog-bg</code>', 'var(--nui-surface)', 'components.modal-dialog.theming.colors.rows.bg'],
        ['<code>--nui-modal-dialog-text</code>', 'var(--nui-on-surface)', 'components.modal-dialog.theming.colors.rows.text'],
        ['<code>--nui-modal-dialog-border</code>', 'var(--nui-border-subtle)', 'components.modal-dialog.theming.colors.rows.border'],
        ['<code>--nui-modal-dialog-overlay-bg</code>', 'var(--nui-overlay-bg)', 'components.modal-dialog.theming.colors.rows.overlayBg'],
        ['<code>--nui-modal-dialog-progress-bg</code>', 'var(--nui-surface-neutral)', 'components.modal-dialog.theming.colors.rows.progressBg'],
        ['<code>--nui-modal-dialog-progress-color</code>', 'var(--nui-primary)', 'components.modal-dialog.theming.colors.rows.progressColor'],
        ['<code>--nui-modal-dialog-scroll-bg</code>', 'var(--nui-surface)', 'components.modal-dialog.theming.colors.rows.scrollBg'],
        ['<code>--nui-modal-dialog-scroll-thumb-bg</code>', 'var(--nui-border-high)', 'components.modal-dialog.theming.colors.rows.scrollThumbBg'],
        ['<code>--nui-modal-dialog-scroll-thumb-hover-bg</code>', 'var(--nui-border-high)', 'components.modal-dialog.theming.colors.rows.scrollThumbHoverBg'],
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
        ['<code>--nui-modal-dialog-border-radius</code>', 'var(--nui-border-radius-md)', 'components.modal-dialog.theming.layout.rows.borderRadius'],
        ['<code>--nui-modal-dialog-shadow</code>', 'var(--nui-box-shadow-xl)', 'components.modal-dialog.theming.layout.rows.shadow'],
        ['<code>--nui-modal-dialog-header-padding</code>', '1.25rem', 'components.modal-dialog.theming.layout.rows.headerPadding'],
        ['<code>--nui-modal-dialog-header-padding-y</code>', '0.75rem', 'components.modal-dialog.theming.layout.rows.headerPaddingY'],
        ['<code>--nui-modal-dialog-body-padding-y</code>', '1rem', 'components.modal-dialog.theming.layout.rows.bodyPaddingY'],
        ['<code>--nui-modal-dialog-body-padding-x</code>', '1.25rem', 'components.modal-dialog.theming.layout.rows.bodyPaddingX'],
        ['<code>--nui-modal-dialog-footer-padding-top</code>', '0.75rem', 'components.modal-dialog.theming.layout.rows.footerPaddingTop'],
        ['<code>--nui-modal-dialog-footer-padding-bottom</code>', '1.25rem', 'components.modal-dialog.theming.layout.rows.footerPaddingBottom'],
        ['<code>--nui-modal-dialog-footer-padding-x</code>', '1.25rem', 'components.modal-dialog.theming.layout.rows.footerPaddingX'],
        ['<code>--nui-modal-dialog-title-size</code>', '1rem', 'components.modal-dialog.theming.layout.rows.titleSize'],
        ['<code>--nui-modal-dialog-title-weight</code>', '600', 'components.modal-dialog.theming.layout.rows.titleWeight'],
        ['<code>--nui-modal-dialog-z-index</code>', 'var(--nui-z-index-modal)', 'components.modal-dialog.theming.layout.rows.zIndex'],
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
        ['<code>--nui-dock-z-index</code>', '1060', 'components.modal-dialog.theming.dock.rows.zIndex'],
        ['<code>--nui-dock-offset</code>', '16px', 'components.modal-dialog.theming.dock.rows.offset'],
        ['<code>--nui-dock-max-width</code>', 'none', 'components.modal-dialog.theming.dock.rows.maxWidth'],
        ['<code>--nui-dock-border-radius</code>', '0.5rem', 'components.modal-dialog.theming.dock.rows.borderRadius'],
        ['<code>--nui-dock-chip-bg</code>', 'var(--nui-surface)', 'components.modal-dialog.theming.dock.rows.chipBg'],
        ['<code>--nui-dock-chip-hover-bg</code>', 'var(--nui-surface-neutral)', 'components.modal-dialog.theming.dock.rows.chipHoverBg'],
        ['<code>--nui-dock-text</code>', 'var(--nui-on-surface)', 'components.modal-dialog.theming.dock.rows.text'],
        ['<code>--nui-dock-border</code>', 'var(--nui-border-subtle)', 'components.modal-dialog.theming.dock.rows.border'],
        ['<code>--nui-dock-shadow</code>', 'var(--nui-box-shadow-md)', 'components.modal-dialog.theming.dock.rows.shadow'],
        ['<code>--nui-dock-hover-shadow</code>', 'var(--nui-box-shadow-xl)', 'components.modal-dialog.theming.dock.rows.hoverShadow'],
        ['<code>--nui-dock-separator-color</code>', 'var(--nui-border-subtle)', 'components.modal-dialog.theming.dock.rows.separatorColor'],
      ],
    },
  },
];
