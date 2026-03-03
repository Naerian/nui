import { inject } from '@angular/core';
import { ToastGlobalConfig } from '../../components/toast';
import { NUI_CONFIG } from '../nui.token';
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
 * Función inyectable para resolver la configuración final del Toast.
 * Sigue el patrón de inyectar el NUI_CONFIG global y hacer el merge.
 */
export function injectToastConfig(): ToastGlobalConfig {
  // Inyectamos la config global del monorepo
  const globalConfig = inject(NUI_CONFIG, { optional: true })?.config;

  // Extraemos la sección de toast
  const toastOverrides = globalConfig?.toast;

  // Fusionamos los defaults de la librería con lo configurado por el usuario
  return deepMerge(DEFAULT_TOAST_CONFIG, toastOverrides);
}
