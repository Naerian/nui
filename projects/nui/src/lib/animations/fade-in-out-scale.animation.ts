import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const FADE_IN_OUT_SCALE = trigger('fadeInOutScale', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(-10px) scale(0.95)', // Sube 10px y escala
    }),
  ),
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateY(0) scale(1)', // Vuelve a su posición y escala normal
    }),
  ),
  transition('void => *', [animate('150ms ease-out')]),
  transition('* => void', [animate('50ms ease-in')]),
]);
