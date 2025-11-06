import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

/**
 * Animación de entrada: Slide (deslizar desde el lado)
 */
export const slideIn: AnimationTriggerMetadata = trigger('slideIn', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
      opacity: 0,
    }),
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({
        transform: 'translateX(0)',
        opacity: 1,
      })
    ),
  ]),
]);

/**
 * Animación de salida: Slide (deslizar hacia el lado)
 */
export const slideOut: AnimationTriggerMetadata = trigger('slideOut', [
  transition(':leave', [
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 1, 1)',
      style({
        transform: 'translateX(100%)',
        opacity: 0,
      })
    ),
  ]),
]);

/**
 * Animación de entrada: Fade (aparecer gradualmente)
 */
export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '{{duration}}ms ease-in',
      style({
        opacity: 1,
      })
    ),
  ]),
]);

/**
 * Animación de salida: Fade (desaparecer gradualmente)
 */
export const fadeOut: AnimationTriggerMetadata = trigger('fadeOut', [
  transition(':leave', [
    animate(
      '{{duration}}ms ease-out',
      style({
        opacity: 0,
      })
    ),
  ]),
]);

/**
 * Animación de entrada: Bounce (rebotar)
 */
export const bounceIn: AnimationTriggerMetadata = trigger('bounceIn', [
  transition(':enter', [
    style({
      transform: 'scale(0.3)',
      opacity: 0,
    }),
    animate(
      '{{duration}}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      style({
        transform: 'scale(1)',
        opacity: 1,
      })
    ),
  ]),
]);

/**
 * Animación de entrada: Zoom (escalar desde pequeño)
 */
export const zoomIn: AnimationTriggerMetadata = trigger('zoomIn', [
  transition(':enter', [
    style({
      transform: 'scale(0)',
      opacity: 0,
    }),
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({
        transform: 'scale(1)',
        opacity: 1,
      })
    ),
  ]),
]);

/**
 * Animación de salida: Zoom (escalar hacia pequeño)
 */
export const zoomOut: AnimationTriggerMetadata = trigger('zoomOut', [
  transition(':leave', [
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 1, 1)',
      style({
        transform: 'scale(0)',
        opacity: 0,
      })
    ),
  ]),
]);

/**
 * Animación de entrada: Flip (voltear)
 */
export const flipIn: AnimationTriggerMetadata = trigger('flipIn', [
  transition(':enter', [
    style({
      transform: 'perspective(400px) rotateX(90deg)',
      opacity: 0,
    }),
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({
        transform: 'perspective(400px) rotateX(0deg)',
        opacity: 1,
      })
    ),
  ]),
]);

/**
 * Animación de salida: Shrink (encoger)
 */
export const shrinkOut: AnimationTriggerMetadata = trigger('shrinkOut', [
  transition(':leave', [
    animate(
      '{{duration}}ms cubic-bezier(0.4, 0.0, 1, 1)',
      style({
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      })
    ),
  ]),
]);

/**
 * Animación combinada para toast
 * Maneja entrada y salida dinámicamente según el tipo
 */
export const toastAnimation: AnimationTriggerMetadata = trigger('toastAnimation', [
  // Estados (solo los necesarios, eliminado 'showing' duplicado)
  state('visible', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
  state('hiding', style({ opacity: 0 })),
  state('hidden', style({ opacity: 0, display: 'none' })),

  // Transiciones de entrada
  transition('void => visible', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    animate('{{animationDuration}}ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
  ]),

  // Transiciones de salida
  transition('* => hiding', [
    animate(
      '{{animationDuration}}ms cubic-bezier(0.4, 0.0, 1, 1)',
      style({ opacity: 0, transform: 'translateX(100%)' })
    ),
  ]),
  transition('* => hidden', [
    animate(
      '{{animationDuration}}ms ease-out',
      style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 })
    ),
  ]),
]);

/**
 * Animación de barra de progreso
 */
export const progressBarAnimation: AnimationTriggerMetadata = trigger('progressBar', [
  transition('void => *', [
    style({ width: '100%' }),
    animate('{{timeout}}ms linear', style({ width: '0%' })),
  ]),
]);

/**
 * Animación de swipe (arrastre)
 */
export const swipeAnimation: AnimationTriggerMetadata = trigger('swipe', [
  state('idle', style({ transform: 'translateX(0)' })),
  state('swiping', style({ transform: 'translateX({{distance}}px)' }), {
    params: { distance: 0 },
  }),
  transition('idle => swiping', animate('0ms')),
  transition('swiping => idle', animate('200ms ease-out')),
]);

/**
 * Mapa de animaciones de entrada
 */
export const ENTRANCE_ANIMATIONS: Record<string, AnimationTriggerMetadata> = {
  slide: slideIn,
  fade: fadeIn,
  bounce: bounceIn,
  zoom: zoomIn,
  flip: flipIn,
};

/**
 * Mapa de animaciones de salida
 */
export const EXIT_ANIMATIONS: Record<string, AnimationTriggerMetadata> = {
  slide: slideOut,
  fade: fadeOut,
  shrink: shrinkOut,
  zoom: zoomOut,
};

/**
 * Todas las animaciones disponibles para toast
 */
export const TOAST_ANIMATIONS = [
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
];
