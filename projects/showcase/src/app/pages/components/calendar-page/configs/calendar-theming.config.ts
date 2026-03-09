import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente Calendar
 * Documenta variables CSS y personalización
 */
export const CALENDAR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.calendar.theming.colors.title',
    description: 'components.calendar.theming.colors.description',
    anchor: 'theming-colors',
    note: {
      type: 'info',
      icon: 'ri-palette-line',
      content: 'components.calendar.theming.colors.note',
    },
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-calendar-day-bg</code>',
          'components.calendar.theming.colors.rows.dayBg.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-day-text</code>',
          'components.calendar.theming.colors.rows.dayText.description',
          'var(--nui-text-disabled)',
        ],
        [
          '<code>--nui-calendar-day-hover-bg</code>',
          'components.calendar.theming.colors.rows.dayHoverBg.description',
          'var(--nui-bg-secondary)',
        ],
        [
          '<code>--nui-calendar-day-hover-text</code>',
          'components.calendar.theming.colors.rows.dayHoverText.description',
          'var(--nui-text-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-bg</code>',
          'components.calendar.theming.colors.rows.daySelectedBg.description',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-text</code>',
          'components.calendar.theming.colors.rows.daySelectedText.description',
          'var(--nui-color-primary-contrast)',
        ],
        [
          '<code>--nui-calendar-day-selected-border</code>',
          'components.calendar.theming.colors.rows.daySelectedBorder.description',
          'var(--nui-color-primary)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-bg</code>',
          'components.calendar.theming.colors.rows.daySelectedHoverBg.description',
          'var(--nui-color-primary-hover)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-border</code>',
          'components.calendar.theming.colors.rows.daySelectedHoverBorder.description',
          'var(--nui-color-primary-hover)',
        ],
        [
          '<code>--nui-calendar-day-range-bg</code>',
          'components.calendar.theming.colors.rows.dayRangeBg.description',
          'var(--nui-color-primary-alpha-10)',
        ],
        [
          '<code>--nui-calendar-day-range-text</code>',
          'components.calendar.theming.colors.rows.dayRangeText.description',
          'var(--nui-text-primary)',
        ],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.calendar.theming.sizes.title',
    description: 'components.calendar.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-calendar-width</code>',
          'components.calendar.theming.sizes.rows.width.description',
          '320px',
        ],
        [
          '<code>--nui-calendar-padding</code>',
          'components.calendar.theming.sizes.rows.padding.description',
          '1rem',
        ],
        [
          '<code>--nui-calendar-gap</code>',
          'components.calendar.theming.sizes.rows.gap.description',
          '0.5rem',
        ],
        [
          '<code>--nui-calendar-day-font-size</code>',
          'components.calendar.theming.sizes.rows.dayFontSize.description',
          '0.875rem',
        ],
        [
          '<code>--nui-calendar-title-font-size</code>',
          'components.calendar.theming.sizes.rows.titleFontSize.description',
          '1rem',
        ],
        [
          '<code>--nui-calendar-weekday-font-size</code>',
          'components.calendar.theming.sizes.rows.weekdayFontSize.description',
          '0.75rem',
        ],
        [
          '<code>--nui-calendar-weekday-height</code>',
          'components.calendar.theming.sizes.rows.weekdayHeight.description',
          '1.5rem',
        ],
        [
          '<code>--nui-calendar-month-font-size</code>',
          'components.calendar.theming.sizes.rows.monthFontSize.description',
          '0.875rem',
        ],
        [
          '<code>--nui-calendar-year-font-size</code>',
          'components.calendar.theming.sizes.rows.yearFontSize.description',
          '0.875rem',
        ],
        [
          '<code>--nui-calendar-nav-btn-height</code>',
          'components.calendar.theming.sizes.rows.navBtnHeight.description',
          '2.5rem',
        ],
        [
          '<code>--nui-calendar-nav-btn-padding</code>',
          'components.calendar.theming.sizes.rows.navBtnPadding.description',
          '0.5rem 0.75rem',
        ],
        [
          '<code>--nui-calendar-nav-btn-font-size</code>',
          'components.calendar.theming.sizes.rows.navBtnFontSize.description',
          '0.875rem',
        ],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.calendar.theming.structure.title',
    description: 'components.calendar.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-calendar-tabs-border-width</code>',
          'components.calendar.theming.structure.rows.tabsBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-calendar-day-border-width</code>',
          'components.calendar.theming.structure.rows.dayBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-calendar-day-other-month-opacity</code>',
          'components.calendar.theming.structure.rows.dayOtherMonthOpacity.description',
          '0.4',
        ],
        [
          '<code>--nui-calendar-preset-border-width</code>',
          'components.calendar.theming.structure.rows.presetBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-calendar-preset-hover-translateY</code>',
          'components.calendar.theming.structure.rows.presetHoverTranslateY.description',
          '-1px',
        ],
      ],
    },
  },
];
