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
 * Resolver del SidebarPanel.
 * Combina la base estática con las configuraciones globales inyectadas a través de NUI_CONFIG.
 *
 * @returns {SidebarPanelConfig} Configuración final combinada
 */
export function injectSidebarPanelConfig(): SidebarPanelConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true });
  const sidebarPanelOverrides = globalConfig?.sidebarPanel;

  return deepMerge(DEFAULT_SIDEBAR_PANEL_CONFIG, sidebarPanelOverrides);
}
