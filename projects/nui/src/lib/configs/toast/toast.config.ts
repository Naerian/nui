import { inject } from '@angular/core';
import { ToastGlobalConfig } from '../../components/toast';
import { NUI_CONFIG } from '../nui.config';
import { deepMerge } from '../../utils/deep-merge';

/**
 * Configuración estática por defecto para los Toasts.
 */
export const DEFAULT_TOAST_CONFIG: ToastGlobalConfig = {
  timeout: 5000,
  toastClass: [],
  position: 'top-right',
  preventDuplicates: true,
  progressBar: true,
  closeOnTouch: true,
  closeButton: true,
  maxToasts: 6,
  maxToastsPerPosition: 3,
  animationIn: 'slide',
  animationOut: 'fade',
  animationDuration: 300,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  stackingBehavior: 'queue',
  stackDirection: 'append',
  icon: true,
  iconPosition: 'left',
  announceToScreenReader: true,
  ariaRole: 'status',
  ariaLive: 'polite',
  sound: false,
  expandable: false,
  persistent: false,
  swipeToDismiss: true,
  swipeThreshold: 100,
  templateMode: 'replace',
  icons: {
    success: 'ri-checkbox-circle-line',
    danger: 'ri-error-warning-line',
    warning: 'ri-alert-line',
    info: 'ri-information-line',
    loading: 'ri-loader-4-line',
  },

  buttonsSize: 'sm',
  buttonsVariant: 'ghost',
  buttonsShape: 'rounded',
};

/**
 * Resolver de los Toasts.
 * Combina la base estática con las configuraciones globales inyectadas a través de NUI_CONFIG.
 *
 * @returns {ToastGlobalConfig} Configuración final combinada
 */
export function injectToastConfig(): ToastGlobalConfig {
  const globalConfig = inject(NUI_CONFIG, { optional: true });
  const toastOverrides = globalConfig?.toast;

  return deepMerge(DEFAULT_TOAST_CONFIG, toastOverrides);
}
