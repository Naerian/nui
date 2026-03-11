import { Directive, TemplateRef } from '@angular/core';
import { CalendarFooterContext } from '../models/calendar.model';

/**
 * Directiva marker para definir un footer personalizado en `nui-calendar`.
 *
 * Cuando está presente, **reemplaza** el footer built-in (botón "Hoy").
 * El template recibe un contexto tipado {@link CalendarFooterContext} con el
 * valor de selección actual, el viewMode y las acciones del calendario.
 *
 * @example
 * ```html
 * <nui-calendar [type]="'range'">
 *   <ng-template nuiCalendarFooter let-value="value" let-actions="actions">
 *     <button (click)="actions.clear()">Limpiar</button>
 *     <button (click)="actions.close()">Aplicar</button>
 *   </ng-template>
 * </nui-calendar>
 * ```
 *
 * @example Mantener el botón "Hoy" dentro del footer custom
 * ```html
 * <ng-template nuiCalendarFooter let-actions="actions" let-viewMode="viewMode">
 *   @if (viewMode === 'day') {
 *     <button (click)="actions.goToToday()">Hoy</button>
 *   }
 *   <button (click)="actions.close()">Aceptar</button>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[nuiCalendarFooter]',
  standalone: true,
})
export class CalendarFooterDirective {
  constructor(public readonly templateRef: TemplateRef<CalendarFooterContext>) {}

  /** Soporte para type-checking de variables de template */
  static ngTemplateContextGuard(
    _dir: CalendarFooterDirective,
    ctx: unknown,
  ): ctx is CalendarFooterContext {
    return true;
  }
}
