import { Directive, TemplateRef } from '@angular/core';
import { TimeValue, DurationValue, TimeSelectorMode } from '../models/time-selector.model';

/**
 * Directiva marker que permite personalizar el header del nui-time-selector.
 *
 * Contexto disponible en el template:
 * - `$implicit`     — El valor `TimeValue | DurationValue | null` actualmente seleccionado.
 * - `mode`          — Modo del picker (e.g. `'HOUR_MINUTE_24'`, `'DURATION'`).
 * - `is12h`         — `true` si el modo es de formato 12h.
 * - `formattedTime` — Texto legible del valor actual (sin HTML, apto para mostrar directamente).
 * - `normalization` — Info de normalización `{ original, normalized }` si se normalizó un valor
 *                     string, o `null` si no hubo normalización.
 * - `range`         — Rango horario permitido `{ min: TimeValue | undefined; max: TimeValue | undefined }`.
 *
 * **Nota de accesibilidad**: Las live regions (`aria-live`) del header nativo se mantienen
 * activas aunque se use un template personalizado. El template únicamente reemplaza
 * el contenido visual del header, no la infraestructura de a11y.
 *
 * @example
 * ```html
 * <nui-time-selector [(ngModel)]="time">
 *   <ng-template
 *     nuiTimeSelectorHeader
 *     let-currentTime
 *     let-formattedTime="formattedTime"
 *     let-normalization="normalization"
 *     let-range="range"
 *   >
 *     <div class="my-header">
 *       <strong>{{ formattedTime }}</strong>
 *       @if (normalization) {
 *         <small>Normalizado desde {{ normalization.original }}</small>
 *       }
 *       @if (range.min && range.max) {
 *         <span>Rango: {{ range.min.hour }}:00 — {{ range.max.hour }}:00</span>
 *       }
 *     </div>
 *   </ng-template>
 * </nui-time-selector>
 * ```
 */
export interface TimeSelectorHeaderContext {
  /** Valor actualmente seleccionado (TimeValue en modo hora, DurationValue en modo duración). */
  $implicit: TimeValue | DurationValue | null;
  /** Modo activo del picker, p.ej. `'HOUR_MINUTE_24'` o `'DURATION'`. */
  mode: TimeSelectorMode;
  /** Atajo: `true` si el modo usa formato 12h (AM/PM). */
  is12h: boolean;
  /** Representación legible del valor actual (texto plano, sin HTML). */
  formattedTime: string;
  /** Info de normalización si se recibió un string normalizado, `null` en caso contrario. */
  normalization: { original: string; normalized: string } | null;
  /** Rango horario configurado (`min` y/o `max` pueden ser `undefined` si no están definidos). */
  range: {
    min: TimeValue | undefined;
    max: TimeValue | undefined;
  };
}

@Directive({
  selector: '[nuiTimeSelectorHeader]',
  standalone: true,
})
export class TimeSelectorHeaderDirective {
  constructor(public readonly templateRef: TemplateRef<TimeSelectorHeaderContext>) {}

  static ngTemplateContextGuard(
    _dir: TimeSelectorHeaderDirective,
    ctx: unknown
  ): ctx is TimeSelectorHeaderContext {
    return true;
  }
}
