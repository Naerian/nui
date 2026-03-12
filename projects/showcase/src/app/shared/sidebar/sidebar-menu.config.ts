/**
 * ConfiguraciÃ³n del menÃº lateral de navegaciÃ³n
 *
 * Este archivo centraliza toda la estructura del menÃº para facilitar
 * el mantenimiento y la adiciÃ³n de nuevos componentes.
 */

export interface MenuItem {
  label: string;
  translationKey: string;
  route: string;
  icon?: string;
  children?: MenuItem[];
}

/**
 * ConfiguraciÃ³n completa del menÃº de navegaciÃ³n
 */
export const SIDEBAR_MENU_CONFIG: MenuItem[] = [
  {
    label: 'Home',
    translationKey: 'sidebar.home',
    route: '/',
    icon: 'ri-home-line',
  },
  {
    label: 'Getting Started',
    translationKey: 'sidebar.gettingStarted',
    route: '/getting-started',
    icon: 'ri-rocket-line',
    children: [
      {
        label: 'Installation',
        translationKey: 'sidebar.installation',
        route: '/getting-started/installation',
        icon: 'ri-download-line',
      },
      {
        label: 'Configuration',
        translationKey: 'sidebar.configuration',
        route: '/getting-started/configuration',
        icon: 'ri-settings-3-line',
      },
    ],
  },
  {
    label: 'Theming',
    translationKey: 'sidebar.theming',
    route: '/theming',
    icon: 'ri-palette-line',
    children: [
      {
        label: 'Overview',
        translationKey: 'sidebar.themingOverview',
        route: '/theming/overview',
        icon: 'ri-information-line',
      },
      {
        label: 'Presets',
        translationKey: 'sidebar.themingPresets',
        route: '/theming/presets',
        icon: 'ri-palette-fill',
      },
      {
        label: 'Architecture',
        translationKey: 'sidebar.themingArchitecture',
        route: '/theming/architecture',
        icon: 'ri-building-line',
      },
      {
        label: 'Dark Mode',
        translationKey: 'sidebar.themingDarkMode',
        route: '/theming/dark-mode',
        icon: 'ri-moon-line',
      },
      {
        label: 'Customization',
        translationKey: 'sidebar.themingCustomization',
        route: '/theming/customization',
        icon: 'ri-tools-line',
      },
    ],
  },
  {
    label: 'Components',
    translationKey: 'sidebar.components',
    route: '/components',
    icon: 'ri-layout-grid-line',
    children: [
      {
        label: 'Actions',
        translationKey: 'sidebar.componentsActions',
        route: '/components/actions',
        children: [
          {
            label: 'Button',
            translationKey: 'sidebar.button',
            route: '/components/button',
          },
          {
            label: 'FAB Button',
            translationKey: 'sidebar.fabButton',
            route: '/components/fab-button',
          },
          {
            label: 'Select Button',
            translationKey: 'sidebar.selectButton',
            route: '/components/select-button',
          },
          {
            label: 'Action Menu',
            translationKey: 'sidebar.actionMenu',
            route: '/components/action-menu',
          },
          {
            label: 'Split Button',
            translationKey: 'sidebar.splitButton',
            route: '/components/split-button',
          },
        ],
      },
      {
        label: 'Overlays',
        translationKey: 'sidebar.componentsOverlays',
        route: '/components/overlays',
        children: [
          {
            label: 'Popover',
            translationKey: 'sidebar.popover',
            route: '/components/popover',
          },
          {
            label: 'Tooltip',
            translationKey: 'sidebar.tooltip',
            route: '/components/tooltip',
          },
          {
            label: 'Toast',
            translationKey: 'sidebar.toast',
            route: '/components/toast',
          },
          {
            label: 'Sidebar Panel',
            translationKey: 'sidebar.sidebarPanel',
            route: '/components/sidebar-panel',
          },
        ],
      },
      {
        label: 'Forms',
        translationKey: 'sidebar.componentsForms',
        route: '/components/forms',
        children: [
          {
            label: 'Calendar',
            translationKey: 'sidebar.calendar',
            route: '/components/calendar',
          },
          {
            label: 'Time Picker',
            translationKey: 'sidebar.timeSelector',
            route: '/components/time-selector',
          },
        ],
      },
      {
        label: 'Display',
        translationKey: 'sidebar.componentsDisplay',
        route: '/components/display',
        children: [
          {
            label: 'Avatar',
            translationKey: 'sidebar.avatar',
            route: '/components/avatar',
          },
          {
            label: 'Paginator',
            translationKey: 'sidebar.paginator',
            route: '/components/paginator',
          },
          {
            label: 'Progress Bar',
            translationKey: 'sidebar.progressBar',
            route: '/components/progress-bar',
          },
        ],
      },
    ],
  },
];
