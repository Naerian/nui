import { Directive, TemplateRef } from '@angular/core';

/**
 * Directiva marker que permite personalizar el template de cada ítem
 * (hora, minuto o período) dentro del nui-time-picker.
 *
 * Contexto disponible en el template:
 * - `$implicit` — El valor del ítem (number | string).
 * - `type`      — Tipo de columna: 'hour' | 'minute' | 'period'.
 * - `selected`  — Si el ítem está seleccionado (boolean).
 * - `disabled`  — Si el ítem está deshabilitado (boolean).
 *
 * @example
 * ```html
 * <nui-time-picker [(ngModel)]="time">
 *   <ng-template nuiTimePickerItem let-value let-type="type" let-selected="selected">
 *     <span [class.active]="selected">{{ value }} {{ type === 'hour' ? 'h' : 'm' }}</span>
 *   </ng-template>
 * </nui-time-picker>
 * ```
 */
export interface TimePickerItemContext {
  $implicit: number | string;
  type: 'hour' | 'minute' | 'period';
  selected: boolean;
  disabled: boolean;
}

@Directive({
  selector: '[nuiTimePickerItem]',
  standalone: true,
})
export class TimePickerItemDirective {
  constructor(public readonly templateRef: TemplateRef<TimePickerItemContext>) {}

  static ngTemplateContextGuard(
    _dir: TimePickerItemDirective,
    ctx: unknown
  ): ctx is TimePickerItemContext {
    return true;
  }
}
