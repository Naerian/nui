import { Directive, TemplateRef } from '@angular/core';

/**
 * Directiva marker que permite personalizar el template de cada ítem
 * (hora, minuto o período) dentro del nui-time-selector.
 *
 * Contexto disponible en el template:
 * - `$implicit` — El valor del ítem (number | string).
 * - `type`      — Tipo de columna: 'hour' | 'minute' | 'period'.
 * - `selected`  — Si el ítem está seleccionado (boolean).
 * - `disabled`  — Si el ítem está deshabilitado (boolean).
 *
 * @example
 * ```html
 * <nui-time-selector [(ngModel)]="time">
 *   <ng-template nuiTimeSelectorItem let-value let-type="type" let-selected="selected">
 *     <span [class.active]="selected">{{ value }} {{ type === 'hour' ? 'h' : 'm' }}</span>
 *   </ng-template>
 * </nui-time-selector>
 * ```
 */
export interface TimeSelectorItemContext {
  $implicit: number | string;
  type: 'hour' | 'minute' | 'period';
  selected: boolean;
  disabled: boolean;
}

@Directive({
  selector: '[nuiTimeSelectorItem]',
  standalone: true,
})
export class TimeSelectorItemDirective {
  constructor(public readonly templateRef: TemplateRef<TimeSelectorItemContext>) {}

  static ngTemplateContextGuard(
    _dir: TimeSelectorItemDirective,
    ctx: unknown
  ): ctx is TimeSelectorItemContext {
    return true;
  }
}
