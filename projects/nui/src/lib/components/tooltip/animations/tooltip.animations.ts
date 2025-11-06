import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Animación de fadeIn para tooltips
 */
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate(
      '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '100ms cubic-bezier(0.4, 0, 1, 1)',
      style({ opacity: 0, transform: 'scale(0.9)' })
    ),
  ]),
]);

export const TOOLTIP_ANIMATIONS = [fadeIn];
