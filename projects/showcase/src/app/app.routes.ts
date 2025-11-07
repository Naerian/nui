import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'getting-started',
    children: [
      {
        path: '',
        redirectTo: 'installation',
        pathMatch: 'full'
      },
      {
        path: 'installation',
        loadComponent: () => import('./pages/getting-started/installation/installation.component').then(m => m.InstallationComponent)
      },
      {
        path: 'configuration',
        loadComponent: () => import('./pages/getting-started/configuration/configuration.component').then(m => m.ConfigurationComponent)
      }
    ]
  },
  {
    path: 'theming',
    loadComponent: () => import('./pages/theming/theming.component').then(m => m.ThemingComponent)
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        redirectTo: 'button',
        pathMatch: 'full'
      },
      {
        path: 'button',
        loadComponent: () => import('./pages/components/button-page/button-page.component').then(m => m.ButtonPageComponent)
      }
    ]
  },
  {
    path: 'examples',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) // Placeholder
  },
  {
    path: 'playground',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) // Placeholder
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
