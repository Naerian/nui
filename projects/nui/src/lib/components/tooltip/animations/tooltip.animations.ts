import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Animación para el popover, aplicando un efecto de fade-in con escala.
 * La animación se activa al entrar y salir del DOM, proporcionando una transición suave.
 * Se utiliza una curva de aceleración personalizada para mejorar la experiencia visual.
 */
export const tooltipAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }), // Solo escala
    animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);
