/**
 * Configuración del menú lateral de navegación
 * 
 * Este archivo centraliza toda la estructura del menú para facilitar
 * el mantenimiento y la adición de nuevos componentes.
 */

export interface MenuItem {
  label: string;
  translationKey: string;
  route: string;
  icon: string;
  children?: MenuItem[];
}

/**
 * Configuración completa del menú de navegación
 */
export const SIDEBAR_MENU_CONFIG: MenuItem[] = [
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
        label: 'CSS Variables',
        translationKey: 'sidebar.themingCssVariables',
        route: '/theming/css-variables',
        icon: 'ri-code-line',
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
        label: 'Button',
        translationKey: 'sidebar.button',
        route: '/components/button',
        icon: 'ri-rectangle-fill',
      },
      {
        label: 'Action Menu',
        translationKey: 'sidebar.actionMenu',
        route: '/components/action-menu',
        icon: 'ri-menu-line',
      },
      {
        label: 'Avatar',
        translationKey: 'sidebar.avatar',
        route: '/components/avatar',
        icon: 'ri-user-line',
      },
      {
        label: 'Button Group',
        translationKey: 'sidebar.buttonGroup',
        route: '/components/button-group',
        icon: 'ri-layout-grid-line',
      },
      {
        label: 'Paginator',
        translationKey: 'sidebar.paginator',
        route: '/components/paginator',
        icon: 'ri-pages-line',
      },
      {
        label: 'Popover',
        translationKey: 'sidebar.popover',
        route: '/components/popover',
        icon: 'ri-chat-4-line',
      },
      {
        label: 'Toast',
        translationKey: 'sidebar.toast',
        route: '/components/toast',
        icon: 'ri-notification-line',
      },
      {
        label: 'Tooltip',
        translationKey: 'sidebar.tooltip',
        route: '/components/tooltip',
        icon: 'ri-question-line',
      },
      {
        label: 'Sidebar Panel',
        translationKey: 'sidebar.sidebarPanel',
        route: '/components/sidebar-panel',
        icon: 'ri-side-bar-fill',
      }
    ],
  }
];
