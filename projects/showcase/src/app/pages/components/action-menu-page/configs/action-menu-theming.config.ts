import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de Theming del Action Menu
 * Dividido en variables estructurales y de items para mejor organización
 */
export const ACTION_MENU_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-structure',
    title: 'components.actionMenu.theming.structure.title',
    description: 'components.actionMenu.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Container
        ['<code>--nui-am-min-width</code>', 'components.actionMenu.theming.structure.rows.minWidth.description', '12rem'],
        ['<code>--nui-am-max-width</code>', 'components.actionMenu.theming.structure.rows.maxWidth.description', '20rem'],
        ['<code>--nui-am-border-width</code>', 'components.actionMenu.theming.structure.rows.borderWidth.description', 'var(--nui-border-width-xs)'],
        ['<code>--nui-am-border-color</code>', 'components.actionMenu.theming.structure.rows.borderColor.description', 'var(--nui-border-primary)'],
        ['<code>--nui-am-border-radius</code>', 'components.actionMenu.theming.structure.rows.borderRadius.description', 'var(--nui-border-radius-md)'],
        ['<code>--nui-am-padding</code>', 'components.actionMenu.theming.structure.rows.padding.description', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-shadow</code>', 'components.actionMenu.theming.structure.rows.shadow.description', 'var(--nui-shadow-elevated)'],
        ['<code>--nui-am-static-shadow</code>', 'components.actionMenu.theming.structure.rows.staticShadow.description', 'var(--nui-shadow-container)'],
        
        // Items
        ['<code>--nui-am-item-gap</code>', 'components.actionMenu.theming.structure.rows.itemGap.description', 'var(--nui-spacing-sm)'],
        ['<code>--nui-am-item-border</code>', 'components.actionMenu.theming.structure.rows.itemBorder.description', 'none'],
        ['<code>--nui-am-item-border-radius</code>', 'components.actionMenu.theming.structure.rows.itemBorderRadius.description', 'calc(var(--nui-border-radius-md) - 0.125rem)'],
        ['<code>--nui-am-item-padding</code>', 'components.actionMenu.theming.structure.rows.itemPadding.description', 'var(--nui-spacing-xs) var(--nui-spacing-sm)'],
        ['<code>--nui-am-item-padding-y</code>', 'components.actionMenu.theming.structure.rows.itemPaddingY.description', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-item-padding-x</code>', 'components.actionMenu.theming.structure.rows.itemPaddingX.description', 'var(--nui-spacing-sm)'],
        ['<code>--nui-am-item-label-margin-right</code>', 'components.actionMenu.theming.structure.rows.itemLabelMarginRight.description', 'var(--nui-spacing-md)'],
        
        // Focus
        ['<code>--nui-am-focus-outline-width</code>', 'components.actionMenu.theming.structure.rows.focusOutlineWidth.description', '2px'],
        ['<code>--nui-am-focus-outline-offset</code>', 'components.actionMenu.theming.structure.rows.focusOutlineOffset.description', '-1px'],
        
        // Arrow (submenu indicator)
        ['<code>--nui-am-arrow-padding-left</code>', 'components.actionMenu.theming.structure.rows.arrowPaddingLeft.description', '0.5rem'],
      ],
    },
  },
  {
    id: 'theming-items',
    title: 'components.actionMenu.theming.items.title',
    description: 'components.actionMenu.theming.items.description',
    anchor: 'theming-items',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        // Subtitle
        ['<code>--nui-am-item-subtitle-color</code>', 'components.actionMenu.theming.items.rows.subtitleColor.description', 'var(--nui-text-secondary)'],
        ['<code>--nui-am-item-subtitle-font-size</code>', 'components.actionMenu.theming.items.rows.subtitleFontSize.description', 'var(--nui-font-size-xs)'],
        
        // Label
        ['<code>--nui-am-item-label-weight</code>', 'components.actionMenu.theming.items.rows.labelWeight.description', 'var(--nui-font-weight-medium)'],
        ['<code>--nui-am-item-label-font-size</code>', 'components.actionMenu.theming.items.rows.labelFontSize.description', 'var(--nui-font-size-sm)'],
        
        // Separator
        ['<code>--nui-am-separator-color</code>', 'components.actionMenu.theming.items.rows.separatorColor.description', 'var(--nui-border-primary)'],
        ['<code>--nui-am-separator-padding</code>', 'components.actionMenu.theming.items.rows.separatorPadding.description', 'var(--nui-spacing-xs) 0'],
        ['<code>--nui-am-separator-label-color</code>', 'components.actionMenu.theming.items.rows.separatorLabelColor.description', 'var(--nui-text-neutral)'],
        ['<code>--nui-am-separator-label-spacing</code>', 'components.actionMenu.theming.items.rows.separatorLabelSpacing.description', 'var(--nui-spacing-xs)'],
        ['<code>--nui-am-separator-font-size</code>', 'components.actionMenu.theming.items.rows.separatorFontSize.description', 'var(--nui-font-size-xs)'],
        ['<code>--nui-am-separator-font-weight</code>', 'components.actionMenu.theming.items.rows.separatorFontWeight.description', 'var(--nui-font-weight-semibold)'],
        
        // Shortcut
        ['<code>--nui-am-shortcut-bg</code>', 'components.actionMenu.theming.items.rows.shortcutBg.description', 'var(--nui-bg-neutral)'],
        ['<code>--nui-am-shortcut-color</code>', 'components.actionMenu.theming.items.rows.shortcutColor.description', 'var(--nui-text-secondary)'],
        ['<code>--nui-am-shortcut-padding</code>', 'components.actionMenu.theming.items.rows.shortcutPadding.description', '0.125rem 0.375rem'],
        ['<code>--nui-am-shortcut-border-width</code>', 'components.actionMenu.theming.items.rows.shortcutBorderWidth.description', 'var(--nui-border-width-xs)'],
        ['<code>--nui-am-shortcut-border-color</code>', 'components.actionMenu.theming.items.rows.shortcutBorderColor.description', 'var(--nui-border-primary)'],
        ['<code>--nui-am-shortcut-border-radius</code>', 'components.actionMenu.theming.items.rows.shortcutBorderRadius.description', 'var(--nui-border-radius-md)'],
        ['<code>--nui-am-shortcut-font-size</code>', 'components.actionMenu.theming.items.rows.shortcutFontSize.description', 'var(--nui-font-size-xs)'],
        
        // Badge
        ['<code>--nui-am-badge-bg</code>', 'components.actionMenu.theming.items.rows.badgeBg.description', 'var(--nui-primary)'],
        ['<code>--nui-am-badge-color</code>', 'components.actionMenu.theming.items.rows.badgeColor.description', 'var(--nui-on-primary)'],

        // Selected parent indicator
        ['<code>--nui-am-item-notify-selected-size</code>', 'components.actionMenu.theming.items.rows.notifySelectedSize.description', '0.375rem'],
        ['<code>--nui-am-item-notify-selected-radius</code>', 'components.actionMenu.theming.items.rows.notifySelectedRadius.description', '50%'],
      ],
    },
  },
  {
    id: 'theming-colors',
    title: 'components.actionMenu.theming.colors.title',
    description: 'components.actionMenu.theming.colors.description',
    anchor: 'theming-colors',
    note: {
      type: 'info',
      content: 'components.actionMenu.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.variants'],
      rows: [
        [
          '<code>--nui-am-{color}-base-bg</code>',
          'components.actionMenu.theming.colors.rows.baseBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-base-color</code>',
          'components.actionMenu.theming.colors.rows.baseColor.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-border</code>',
          'components.actionMenu.theming.colors.rows.border.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-check</code>',
          'components.actionMenu.theming.colors.rows.check.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
        [
          '<code>--nui-am-{color}-active-bg</code>',
          'components.actionMenu.theming.colors.rows.activeBg.description',
          'primary, secondary, accent, success, info, warning, danger, neutral',
        ],
      ],
    },
  },
];
