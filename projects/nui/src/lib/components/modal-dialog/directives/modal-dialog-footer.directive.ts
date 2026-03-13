import { Directive, TemplateRef, OnInit, OnDestroy, inject } from '@angular/core';
import { ModalDialogActionsService } from '../services/modal-dialog-actions.service';

/**
 * Directiva para declarar un template custom de footer desde dentro
 * del componente dinámico cargado en el modal.
 *
 * Permite que el componente hijo sea dueño de su footer sin necesidad
 * de comunicarse con el componente padre o con el servicio de apertura.
 *
 * **Precedencia en el footer:**
 * 1. `customButtons` (config)
 * 2. `ModalDialogFooterDirective` ← esta directiva
 * 3. Acciones registradas via `ModalDialogActionsService`
 * 4. `footerTemplate` (config)
 *
 * @example
 * ```html
 * <!-- En el componente dinámico cargado en el modal: -->
 * <div class="form-content">
 *   <form [formGroup]="form">...</form>
 * </div>
 *
 * <ng-template nuiModalDialogFooter>
 *   <div class="custom-footer">
 *     <button type="button" (click)="cancel()">Cancelar</button>
 *     <button type="button" (click)="save()" [disabled]="form.invalid">
 *       Guardar
 *     </button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @publicApi
 */
@Directive({
  selector: '[nuiModalDialogFooter]',
  standalone: true,
})
export class ModalDialogFooterDirective implements OnInit, OnDestroy {
  readonly templateRef = inject(TemplateRef<any>);
  private readonly actionsService = inject(ModalDialogActionsService, { optional: true });

  ngOnInit(): void {
    this.actionsService?.registerFooterTemplate(this.templateRef);
  }

  ngOnDestroy(): void {
    this.actionsService?.registerFooterTemplate(null);
  }
}
