// ========================================
// PUBLIC API - TOAST MODULE
// ========================================

// Servicio
export { ToastService } from './toast.service';

// Referencia
export { ToastRef } from './toast-ref';

// Componentes
export { ToastComponent } from './toast.component';
export { ToastContainerComponent } from './toast-container/toast-container.component';

// Modelos y tipos
export type {
  ToastType,
  ToastPosition,
  ToastAction,
  ToastConfig,
  ToastGlobalConfig,
  ToastState,
} from './models/toast.model';

// Animaciones
export {
  TOAST_ANIMATIONS,
  toastAnimation,
  progressBarAnimation,
  swipeAnimation,
  slideIn,
  slideOut,
  fadeIn,
  fadeOut,
  bounceIn,
  zoomIn,
  zoomOut,
  flipIn,
  shrinkOut,
} from './animations/toast.animations';
