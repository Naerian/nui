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
          '<code>--nui-calendar-bg</code>',
          'components.calendar.theming.colors.rows.bg.description',
          'var(--nui-surface)',
        ],
        [
          '<code>--nui-calendar-border</code>',
          'components.calendar.theming.colors.rows.border.description',
          'var(--nui-border-subtle)',
        ],
        [
          '<code>--nui-calendar-box-shadow</code>',
          'components.calendar.theming.colors.rows.boxShadow.description',
          'var(--nui-box-shadow-sm)',
        ],
        [
          '<code>--nui-calendar-day-bg</code>',
          'components.calendar.theming.colors.rows.dayBg.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-day-text</code>',
          'components.calendar.theming.colors.rows.dayText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-calendar-day-current-month-text</code>',
          'components.calendar.theming.colors.rows.dayCurrentMonthText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-calendar-day-today-bg</code>',
          'components.calendar.theming.colors.rows.dayTodayBg.description',
          '{color}',
        ],
        [
          '<code>--nui-calendar-day-hover-bg</code>',
          'components.calendar.theming.colors.rows.dayHoverBg.description',
          '{color} alpha(0.2)',
        ],
        [
          '<code>--nui-calendar-day-hover-text</code>',
          'components.calendar.theming.colors.rows.dayHoverText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-calendar-day-selected-bg</code>',
          'components.calendar.theming.colors.rows.daySelectedBg.description',
          '{color} alpha(0.2)',
        ],
        [
          '<code>--nui-calendar-day-selected-text</code>',
          'components.calendar.theming.colors.rows.daySelectedText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-calendar-day-selected-border</code>',
          'components.calendar.theming.colors.rows.daySelectedBorder.description',
          '{color}',
        ],
        [
          '<code>--nui-calendar-day-selected-today-bg</code>',
          'components.calendar.theming.colors.rows.daySelectedTodayBg.description',
          '{color} shade(20%)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-bg</code>',
          'components.calendar.theming.colors.rows.daySelectedHoverBg.description',
          '{color} alpha(0.3)',
        ],
        [
          '<code>--nui-calendar-day-selected-hover-border</code>',
          'components.calendar.theming.colors.rows.daySelectedHoverBorder.description',
          '{color}',
        ],
        [
          '<code>--nui-calendar-day-range-bg</code>',
          'components.calendar.theming.colors.rows.dayRangeBg.description',
          '{color} alpha(0.1)',
        ],
        [
          '<code>--nui-calendar-day-range-text</code>',
          'components.calendar.theming.colors.rows.dayRangeText.description',
          'var(--nui-on-surface)',
        ],
        [
          '<code>--nui-calendar-day-range-border</code>',
          'components.calendar.theming.colors.rows.dayRangeBorder.description',
          '{color} alpha(0.4)',
        ],
        [
          '<code>--nui-calendar-day-range-hover-bg</code>',
          'components.calendar.theming.colors.rows.dayRangeHoverBg.description',
          '{color} alpha(0.15)',
        ],
        [
          '<code>--nui-calendar-day-range-hover-border</code>',
          'components.calendar.theming.colors.rows.dayRangeHoverBorder.description',
          '{color} alpha(0.5)',
        ],
        [
          '<code>--nui-calendar-day-status-success</code>',
          'components.calendar.theming.colors.rows.dayStatusSuccess.description',
          '{color}.success',
        ],
        [
          '<code>--nui-calendar-day-status-info</code>',
          'components.calendar.theming.colors.rows.dayStatusInfo.description',
          '{color}.info',
        ],
        [
          '<code>--nui-calendar-day-status-warning</code>',
          'components.calendar.theming.colors.rows.dayStatusWarning.description',
          '{color}.warning',
        ],
        [
          '<code>--nui-calendar-day-status-danger</code>',
          'components.calendar.theming.colors.rows.dayStatusDanger.description',
          '{color}.danger',
        ],
        [
          '<code>--nui-calendar-nav-btn-bg</code>',
          'components.calendar.theming.colors.rows.navBtnBg.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-nav-btn-text</code>',
          'components.calendar.theming.colors.rows.navBtnText.description',
          '{gray}',
        ],
        [
          '<code>--nui-calendar-nav-btn-border</code>',
          'components.calendar.theming.colors.rows.navBtnBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-nav-btn-hover-bg</code>',
          'components.calendar.theming.colors.rows.navBtnHoverBg.description',
          '{gray}',
        ],
        [
          '<code>--nui-calendar-nav-btn-hover-text</code>',
          'components.calendar.theming.colors.rows.navBtnHoverText.description',
          '{gray}',
        ],
        [
          '<code>--nui-calendar-nav-btn-hover-border</code>',
          'components.calendar.theming.colors.rows.navBtnHoverBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-nav-btn-active-bg</code>',
          'components.calendar.theming.colors.rows.navBtnActiveBg.description',
          '{gray}',
        ],
        [
          '<code>--nui-calendar-nav-btn-active-border</code>',
          'components.calendar.theming.colors.rows.navBtnActiveBorder.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-nav-btn-disabled-bg</code>',
          'components.calendar.theming.colors.rows.navBtnDisabledBg.description',
          'transparent',
        ],
        [
          '<code>--nui-calendar-nav-btn-disabled-text</code>',
          'components.calendar.theming.colors.rows.navBtnDisabledText.description',
          '{gray}',
        ],
        [
          '<code>--nui-calendar-nav-btn-disabled-border</code>',
          'components.calendar.theming.colors.rows.navBtnDisabledBorder.description',
          'transparent',
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
          '300px',
        ],
        [
          '<code>--nui-calendar-padding</code>',
          'components.calendar.theming.sizes.rows.padding.description',
          'clamp(0.75rem, 2vw, 1rem)',
        ],
        [
          '<code>--nui-calendar-gap</code>',
          'components.calendar.theming.sizes.rows.gap.description',
          'clamp(0.25rem, 1.5vw, 0.5rem)',
        ],
        [
          '<code>--nui-calendar-day-font-size</code>',
          'components.calendar.theming.sizes.rows.dayFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
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
          '<code>--nui-calendar-week-font-size</code>',
          'components.calendar.theming.sizes.rows.weekFontSize.description',
          'clamp(0.625rem, 3.5cqw, 0.688rem)',
        ],
        [
          '<code>--nui-calendar-weekday-height</code>',
          'components.calendar.theming.sizes.rows.weekdayHeight.description',
          '1.5rem',
        ],
        [
          '<code>--nui-calendar-month-font-size</code>',
          'components.calendar.theming.sizes.rows.monthFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
        ],
        [
          '<code>--nui-calendar-year-font-size</code>',
          'components.calendar.theming.sizes.rows.yearFontSize.description',
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
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
          'clamp(0.75rem, 3.5cqw, 0.813rem)',
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
          '<code>--nui-calendar-preset-border-width</code>',
          'components.calendar.theming.structure.rows.presetBorderWidth.description',
          '1px',
        ],
        [
          '<code>--nui-calendar-day-other-month-opacity</code>',
          'components.calendar.theming.structure.rows.dayOtherMonthOpacity.description',
          '0.4',
        ],
        [
          '<code>--nui-calendar-preset-hover-translateY</code>',
          'components.calendar.theming.structure.rows.presetHoverTranslateY.description',
          '-1px',
        ],
        [
          '<code>--nui-calendar-today-size</code>',
          'components.calendar.theming.structure.rows.todaySize.description',
          'clamp(0.188rem, 1cqw, 0.25rem)',
        ],
        [
          '<code>--nui-calendar-today-bottom</code>',
          'components.calendar.theming.structure.rows.todayBottom.description',
          '8%',
        ],
        [
          '<code>--nui-calendar-status-size</code>',
          'components.calendar.theming.structure.rows.statusSize.description',
          '30%',
        ],
        [
          '<code>--nui-calendar-status-top</code>',
          'components.calendar.theming.structure.rows.statusTop.description',
          '13%',
        ],
      ],
    },
  },
];
