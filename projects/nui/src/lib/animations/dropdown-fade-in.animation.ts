import { trigger, transition, style, animate } from '@angular/animations';

export const dropdownFadeInAnimation = trigger('dropdownFadeIn', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-8px)',
    }),
    animate(
      '150ms ease-out',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      })
    ),
  ]),
]);
