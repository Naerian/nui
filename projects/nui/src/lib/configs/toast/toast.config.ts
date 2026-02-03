import { ToastGlobalConfig } from "../../components/toast";

/**
 * Crea la configuración por defecto para toasts
 * @returns {ToastGlobalConfig} Configuración por defecto
 */
export function createDefaultToastConfig(): ToastGlobalConfig {
  return {
    // ===== BÁSICAS =====
    timeout: 5000,
    toastClass: [],
    position: 'top-right',
    preventDuplicates: true,
    progressBar: true,
    closeOnTouch: true,
    closeButton: true,
    maxToasts: 6,
    maxToastsPerPosition: 3, // Límite por posición específica

    // ===== ANIMACIONES =====
    animationIn: 'slide',
    animationOut: 'fade',
    animationDuration: 300,

    // ===== COMPORTAMIENTO =====
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    stackingBehavior: 'queue',
    stackDirection: 'append',

    // ===== VISUAL =====
    icon: true,
    iconPosition: 'left',

    // ===== ACCESIBILIDAD =====
    announceToScreenReader: true,
    ariaRole: 'status',
    ariaLive: 'polite',

    // ===== AVANZADO =====
    sound: false,
    expandable: false,
    persistent: false,
    swipeToDismiss: true,
    swipeThreshold: 100,

    // ==== TEMPLATES =====
    templateMode: 'replace',

    // ===== ÍCONOS POR DEFECTO =====
    icons: {
      success: 'ri-checkbox-circle-line',
      danger: 'ri-error-warning-line',
      warning: 'ri-alert-line',
      info: 'ri-information-line',
      loading: 'ri-loader-4-line',
    },

    // ===== BOTONES DE ACCIÓN =====
    buttonsSize: 'sm',
    buttonsVariant: 'ghost',
  };
}
