import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente TimeSelector
 * Documenta variables CSS y personalización
 */
export const TIME_SELECTOR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.timeSelector.theming.colors.title',
    description: 'components.timeSelector.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-time-selector-bg</code>',
          'components.timeSelector.theming.colors.rows.bg.description',
          'var(--nui-surface)',
        ],
        [
          '<code>--nui-time-selector-border</code>',
          'components.timeSelector.theming.colors.rows.border.description',
          'var(--nui-border-subtle)',
        ],
        [
          '<code>--nui-time-selector-box-shadow</code>',
          'components.timeSelector.theming.colors.rows.boxShadow.description',
          'var(--nui-box-shadow-sm)',
        ],
        [
          '<code>--nui-time-selector-item-bg</code>',
          'components.timeSelector.theming.colors.rows.itemBg.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-item-text</code>',
          'components.timeSelector.theming.colors.rows.itemText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-time-selector-item-hover-bg</code>',
          'components.timeSelector.theming.colors.rows.itemHoverBg.description',
          'rgba(primary, 0.2)',
        ],
        [
          '<code>--nui-time-selector-item-hover-text</code>',
          'components.timeSelector.theming.colors.rows.itemHoverText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-time-selector-item-selected-bg</code>',
          'components.timeSelector.theming.colors.rows.itemSelectedBg.description',
          'rgba(primary, 0.2)',
        ],
        [
          '<code>--nui-time-selector-item-selected-border</code>',
          'components.timeSelector.theming.colors.rows.itemSelectedBorder.description',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-time-selector-item-selected-text</code>',
          'components.timeSelector.theming.colors.rows.itemSelectedText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-time-selector-item-selected-hover-bg</code>',
          'components.timeSelector.theming.colors.rows.itemSelectedHoverBg.description',
          'rgba(primary, 0.3)',
        ],
        [
          '<code>--nui-time-selector-item-selected-hover-border</code>',
          'components.timeSelector.theming.colors.rows.itemSelectedHoverBorder.description',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-time-selector-item-disabled-bg</code>',
          'components.timeSelector.theming.colors.rows.itemDisabledBg.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-item-disabled-text</code>',
          'components.timeSelector.theming.colors.rows.itemDisabledText.description',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-bg</code>',
          'components.timeSelector.theming.colors.rows.navBtnBg.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-nav-btn-text</code>',
          'components.timeSelector.theming.colors.rows.navBtnText.description',
          'var(--nui-text-secondary)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-border</code>',
          'components.timeSelector.theming.colors.rows.navBtnBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-nav-btn-hover-bg</code>',
          'components.timeSelector.theming.colors.rows.navBtnHoverBg.description',
          'var(--nui-bg-secondary)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-hover-text</code>',
          'components.timeSelector.theming.colors.rows.navBtnHoverText.description',
          'var(--nui-text-primary)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-hover-border</code>',
          'components.timeSelector.theming.colors.rows.navBtnHoverBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-nav-btn-active-bg</code>',
          'components.timeSelector.theming.colors.rows.navBtnActiveBg.description',
          'var(--nui-bg-tertiary)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-active-border</code>',
          'components.timeSelector.theming.colors.rows.navBtnActiveBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-nav-btn-disabled-bg</code>',
          'components.timeSelector.theming.colors.rows.navBtnDisabledBg.description',
          'transparent',
        ],
        [
          '<code>--nui-time-selector-nav-btn-disabled-text</code>',
          'components.timeSelector.theming.colors.rows.navBtnDisabledText.description',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-disabled-border</code>',
          'components.timeSelector.theming.colors.rows.navBtnDisabledBorder.description',
          'transparent',
        ],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.timeSelector.theming.sizes.title',
    description: 'components.timeSelector.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-time-selector-width</code>',
          'components.timeSelector.theming.sizes.rows.width.description',
          '300px',
        ],
        [
          '<code>--nui-time-selector-item-height</code>',
          'components.timeSelector.theming.sizes.rows.itemHeight.description',
          '2.25rem',
        ],
        [
          '<code>--nui-time-selector-max-height</code>',
          'components.timeSelector.theming.sizes.rows.maxHeight.description',
          '11rem',
        ],
        [
          '<code>--nui-time-selector-min-height</code>',
          'components.timeSelector.theming.sizes.rows.minHeight.description',
          '8rem',
        ],
        [
          '<code>--nui-time-selector-padding</code>',
          'components.timeSelector.theming.sizes.rows.padding.description',
          'clamp(0.75rem, 2vw, 1rem)',
        ],
        [
          '<code>--nui-time-selector-gap</code>',
          'components.timeSelector.theming.sizes.rows.gap.description',
          'clamp(0.25rem, 1.5vw, 0.5rem)',
        ],
        [
          '<code>--nui-time-selector-font-size</code>',
          'components.timeSelector.theming.sizes.rows.fontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
        ],
        [
          '<code>--nui-time-selector-item-radius</code>',
          'components.timeSelector.theming.sizes.rows.itemRadius.description',
          'calc(var(--nui-border-radius-md) - 0.125rem)',
        ],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.timeSelector.theming.structure.title',
    description: 'components.timeSelector.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-time-selector-separator-width</code>',
          'components.timeSelector.theming.structure.rows.separatorWidth.description',
          '2rem',
        ],
        [
          '<code>--nui-time-selector-separator-line-width</code>',
          'components.timeSelector.theming.structure.rows.separatorLineWidth.description',
          '0.125rem',
        ],
        [
          '<code>--nui-time-selector-separator-line-height</code>',
          'components.timeSelector.theming.structure.rows.separatorLineHeight.description',
          '1.5rem',
        ],
        [
          '<code>--nui-time-selector-separator-border-radius</code>',
          'components.timeSelector.theming.structure.rows.separatorBorderRadius.description',
          '0.063rem',
        ],
        [
          '<code>--nui-time-selector-separator-padding-top</code>',
          'components.timeSelector.theming.structure.rows.separatorPaddingTop.description',
          '1.5rem',
        ],
        [
          '<code>--nui-time-selector-items-gap</code>',
          'components.timeSelector.theming.structure.rows.itemsGap.description',
          '2px',
        ],
        [
          '<code>--nui-time-selector-items-padding</code>',
          'components.timeSelector.theming.structure.rows.itemsPadding.description',
          '2px',
        ],
        [
          '<code>--nui-time-selector-items-border-radius</code>',
          'components.timeSelector.theming.structure.rows.itemsBorderRadius.description',
          '2px',
        ],
        [
          '<code>--nui-time-selector-option-min-height</code>',
          'components.timeSelector.theming.structure.rows.optionMinHeight.description',
          '48px',
        ],
        [
          '<code>--nui-time-selector-actions-gap</code>',
          'components.timeSelector.theming.structure.rows.actionsGap.description',
          '1rem',
        ],
        [
          '<code>--nui-time-selector-min-width</code>',
          'components.timeSelector.theming.structure.rows.minWidth.description',
          '160px',
        ],
        [
          '<code>--nui-time-selector-min-width-with-seconds</code>',
          'components.timeSelector.theming.structure.rows.minWidthWithSeconds.description',
          '220px',
        ],
        [
          '<code>--nui-time-selector-header-border-width</code>',
          'components.timeSelector.theming.structure.rows.headerBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-time-selector-item-border-width</code>',
          'components.timeSelector.theming.structure.rows.itemBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-time-selector-display-font-size</code>',
          'components.timeSelector.theming.structure.rows.displayFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
        ],
        [
          '<code>--nui-time-selector-normalized-font-size</code>',
          'components.timeSelector.theming.structure.rows.normalizedFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
        ],
        [
          '<code>--nui-time-selector-nav-btn-height</code>',
          'components.timeSelector.theming.structure.rows.navBtnHeight.description',
          '2.5rem',
        ],
        [
          '<code>--nui-time-selector-nav-btn-padding</code>',
          'components.timeSelector.theming.structure.rows.navBtnPadding.description',
          '0.5rem 0.75rem',
        ],
        [
          '<code>--nui-time-selector-nav-btn-font-size</code>',
          'components.timeSelector.theming.structure.rows.navBtnFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
        ],
      ],
    },
  },
];
