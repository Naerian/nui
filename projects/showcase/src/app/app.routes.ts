import { Routes } from '@angular/router';

/**
 * Configuración de rutas de la aplicación Showcase
 *
 * Organización:
 * - Home
 * - Getting Started (Installation, Configuration)
 * - Theming
 * - Components (Button, Avatar, Paginator, etc.)
 * - Examples
 * - Playground
 */
export const routes: Routes = [
  // ============================================
  // HOME
  // ============================================
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },

  // ============================================
  // GETTING STARTED
  // ============================================
  {
    path: 'getting-started',
    children: [
      {
        path: '',
        redirectTo: 'installation',
        pathMatch: 'full',
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('./pages/getting-started/installation/installation.component').then(
            m => m.InstallationComponent
          ),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./pages/getting-started/configuration/configuration.component').then(
            m => m.ConfigurationComponent
          ),
      },
    ],
  },

  // ============================================
  // THEMING
  // ============================================
  {
    path: 'theming',
    loadComponent: () => import('./pages/theming/theming.component').then(m => m.ThemingComponent),
  },

  // ============================================
  // COMPONENTS
  // ============================================
  {
    path: 'components',
    children: [
      {
        path: '',
        redirectTo: 'button',
        pathMatch: 'full',
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/components/button-page/button-page.component').then(
            m => m.ButtonPageComponent
          ),
      },
      {
        path: 'action-menu',
        loadComponent: () =>
          import('./pages/components/action-menu-page/action-menu-page.component').then(
            m => m.ActionMenuPageComponent
          ),
      },
      {
        path: 'avatar',
        loadComponent: () =>
          import('./pages/components/avatar-page/avatar-page.component').then(
            m => m.AvatarPageComponent
          ),
      },
      {
        path: 'button-group',
        loadComponent: () =>
          import('./pages/components/button-group-page/button-group-page.component').then(
            m => m.ButtonGroupPageComponent
          ),
      },
      {
        path: 'paginator',
        loadComponent: () =>
          import('./pages/components/paginator-page/paginator-page.component').then(
            m => m.PaginatorPageComponent
          ),
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./pages/components/popover-page/popover-page.component').then(
            m => m.PopoverPageComponent
          ),
      },
      {
        path: 'toast',
        loadComponent: () =>
          import('./pages/components/toast-page/toast-page.component').then(
            m => m.ToastPageComponent
          ),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./pages/components/tooltip-page/tooltip-page.component').then(
            m => m.TooltipPageComponent
          ),
      },
      {
        path: 'sidebar-panel',
        loadComponent: () =>
          import('./pages/components/sidebar-panel-page/sidebar-panel-page.component').then(
            m => m.SidebarPanelPageComponent
          ),
      },
    ],
  },

  // ============================================
  // EXAMPLES & PLAYGROUND
  // ============================================
  {
    path: 'examples',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), // TODO: Create examples page
  },
  {
    path: 'playground',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), // TODO: Create playground page
  },

  // ============================================
  // FALLBACK
  // ============================================
  {
    path: '**',
    redirectTo: '/home',
  },
];
