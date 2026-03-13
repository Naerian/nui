import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

/**
 * Animación principal del modal: escala + opacidad desde el centro.
 *
 * Está inspirada en Material Design 3 dialog motion:
 * - Entrada: escala 0.92 → 1 con easeOut (decelera al final)
 * - Salida:  escala 1 → 0.92 con easeIn  (acelera al final)
 *
 * Parámetros:
 * - `duration`: Duración en ms (default de entrada: 220, salida: 160)
 *
 * @example
 * ```typescript
 * // En el shell:
 * @HostBinding('@modal-dialog')
 * get animationParams() {
 *   return {
 *     value: this.animationState(),
 *     params: { duration: this.config.animationDuration ?? 220 }
 *   };
 * }
 * ```
 */
export const modalDialogAnimation: AnimationTriggerMetadata = trigger('modal-dialog', [
  // Estado inicial antes de entrar al DOM
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scale(0.92)',
      visibility: 'hidden',
    })
  ),

  // Estado completamente visible
  state(
    'visible',
    style({
      opacity: 1,
      transform: 'scale(1)',
      visibility: 'visible',
    })
  ),

  // Estado de salida (oculto, pendiente de destrucción)
  state(
    'hidden',
    style({
      opacity: 0,
      transform: 'scale(0.92)',
      visibility: 'hidden',
    })
  ),

  // Entrada: void → visible
  transition(
    'void => visible',
    [animate('{{ duration }}ms cubic-bezier(0.0, 0, 0.2, 1)')],
    { params: { duration: 220 } }
  ),

  // Salida normal: visible → hidden
  transition(
    'visible => hidden',
    [animate('{{ duration }}ms cubic-bezier(0.4, 0, 0.6, 1)')],
    { params: { duration: 160 } }
  ),
]);

/**
 * Animación del backdrop del modal (fade-in / fade-out).
 * Sincronizada con `modalDialogAnimation`.
 */
export const fadeBackdropModalAnimation: AnimationTriggerMetadata = trigger(
  'fade-backdrop-modal',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('{{ duration }}ms ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('{{ duration }}ms ease-in', style({ opacity: 0 })),
    ]),
  ]
);
