import { inject } from '@angular/core';
import type { SidebarPanelConfig } from '../../components/sidebar-panel';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración estática por defecto para los Sidebar Panels.
 */
export const DEFAULT_SIDEBAR_PANEL_CONFIG: SidebarPanelConfig = {
  position: 'right',
  size: 'md',
  showHeader: true,
  showCloseButton: true,
  hasBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  closeOnRouteChange: false,
  autoFocus: true,
  mobileFullScreen: false,
  breakpoint: 768,
  scrollStrategy: 'block',
  ariaLabel: 'Slide Panel',
  animationDuration: 225,
  minimizable: false,
  zIndex: 1000,
  allowMultiple: false,
  lazyLoad: true,
};

/**
 * Función inyectable para resolver la configuración final del SidebarPanel.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectSidebarPanelConfig(): SidebarPanelConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de sidebarPanel
  const sidebarPanelOverrides = globalConfig?.sidebarPanel;

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_SIDEBAR_PANEL_CONFIG, sidebarPanelOverrides);
}
