import type { SidebarPanelConfig } from '../../components/sidebar-panel';

/**
 * Crea la configuración por defecto para sidebar panels
 * @returns {SidebarPanelConfig} Configuración por defecto
 */
export function createDefaultSidebarPanelConfig(): SidebarPanelConfig {
  return {
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
}
