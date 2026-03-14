import { ComponentSection } from '../../../../core';

export const DOCK_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.dock.theming.colors.title',
    description: 'components.dock.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-dock-chip-bg</code>', 'var(--nui-surface)', 'components.dock.theming.colors.rows.chipBg'],
        ['<code>--nui-dock-chip-hover-bg</code>', 'var(--nui-surface-neutral)', 'components.dock.theming.colors.rows.chipHoverBg'],
        ['<code>--nui-dock-text</code>', 'var(--nui-on-surface)', 'components.dock.theming.colors.rows.text'],
        ['<code>--nui-dock-border</code>', 'var(--nui-border-subtle)', 'components.dock.theming.colors.rows.border'],
        ['<code>--nui-dock-shadow</code>', 'var(--nui-box-shadow-md)', 'components.dock.theming.colors.rows.shadow'],
        ['<code>--nui-dock-hover-shadow</code>', 'var(--nui-box-shadow-xl)', 'components.dock.theming.colors.rows.hoverShadow'],
        ['<code>--nui-dock-separator-color</code>', 'var(--nui-border-subtle)', 'components.dock.theming.colors.rows.separatorColor'],
      ],
    },
  },
  {
    id: 'theming-layout',
    title: 'components.dock.theming.layout.title',
    description: 'components.dock.theming.layout.description',
    anchor: 'theming-layout',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.default', 'common.tables.description'],
      rows: [
        ['<code>--nui-dock-z-index</code>', '1060', 'components.dock.theming.layout.rows.zIndex'],
        ['<code>--nui-dock-offset</code>', '16px', 'components.dock.theming.layout.rows.offset'],
        ['<code>--nui-dock-max-width</code>', 'none', 'components.dock.theming.layout.rows.maxWidth'],
        ['<code>--nui-dock-border-radius</code>', '0.5rem', 'components.dock.theming.layout.rows.borderRadius'],
      ],
    },
  },
];
