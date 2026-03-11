import { Directive, TemplateRef } from '@angular/core';
import { CalendarDayContext } from '../models/calendar.model';

/**
 * Directiva marker para personalizar el contenido visual de cada celda de día
 * en `nui-calendar`.
 *
 * El componente sigue gestionando todos los atributos ARIA, el manejo de teclado
 * y los eventos de clic. Solo se reemplaza el contenido interno del `<button>`.
 * El template recibe un contexto tipado {@link CalendarDayContext} con todos los
 * datos relevantes del día.
 *
 * @example Añadir punto de estado debajo del número
 * ```html
 * <nui-calendar [dateStatusFn]="dateStatusFn">
 *   <ng-template nuiCalendarDay let-day let-status="status" let-isToday="isToday">
 *     <span [class.today]="isToday">{{ day }}</span>
 *     @if (status) {
 *       <span class="status-dot status-dot--{{ status }}"></span>
 *     }
 *   </ng-template>
 * </nui-calendar>
 * ```
 *
 * @example Mostrar precio por día (ej. motor de reservas)
 * ```html
 * <nui-calendar>
 *   <ng-template nuiCalendarDay let-day let-date="date" let-isCurrentMonth="isCurrentMonth">
 *     <span>{{ day }}</span>
 *     @if (isCurrentMonth) {
 *       <small class="price">{{ getPriceForDate(date) | currency }}</small>
 *     }
 *   </ng-template>
 * </nui-calendar>
 * ```
 */
@Directive({
  selector: '[nuiCalendarDay]',
  standalone: true,
})
export class CalendarDayDirective {
  constructor(public readonly templateRef: TemplateRef<CalendarDayContext>) {}

  /** Soporte para type-checking de variables de template */
  static ngTemplateContextGuard(
    _dir: CalendarDayDirective,
    ctx: unknown,
  ): ctx is CalendarDayContext {
    return true;
  }
}
