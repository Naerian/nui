import { Directive, TemplateRef } from '@angular/core';
import { TimeValue, DurationValue } from '../models/time-picker.model';

/**
 * Directiva marker que permite personalizar el footer del nui-time-picker.
 *
 * Contexto disponible en el template:
 * - `$implicit` — El valor `TimeValue | DurationValue | null` actualmente seleccionado.
 * - `actions`   — Objeto con métodos de utilidad (p.ej. `clear()`).
 *
 * @example
 * ```html
 * <nui-time-picker [(ngModel)]="time">
 *   <ng-template nuiTimePickerFooter let-currentTime let-actions="actions">
 *     <div class="custom-footer">
 *       Hora: {{ currentTime?.hour }}:{{ currentTime?.minute }}
 *       <button (click)="actions.clear()">Limpiar</button>
 *     </div>
 *   </ng-template>
 * </nui-time-picker>
 * ```
 */
export interface TimePickerFooterContext {
  /** Valor actualmente seleccionado (TimeValue en modo hora, DurationValue en modo duración). */
  $implicit: TimeValue | DurationValue | null;
  /** Métodos de acción del footer. `setToNow` solo está disponible en modo hora (no duración). */
  actions: {
    clear: () => void;
    setToNow?: () => void;
  };
  /** Info de normalización si se recibió un string normalizado, `null` en caso contrario. */
  normalization: { original: string; normalized: string } | null;
  /** Rango horario configurado (`min` y/o `max` pueden ser `undefined` si no están definidos). */
  range: {
    min: TimeValue | undefined;
    max: TimeValue | undefined;
  };
}

@Directive({
  selector: '[nuiTimePickerFooter]',
  standalone: true,
})
export class TimePickerFooterDirective {
  constructor(public readonly templateRef: TemplateRef<TimePickerFooterContext>) {}

  static ngTemplateContextGuard(
    _dir: TimePickerFooterDirective,
    ctx: unknown
  ): ctx is TimePickerFooterContext {
    return true;
  }
}
