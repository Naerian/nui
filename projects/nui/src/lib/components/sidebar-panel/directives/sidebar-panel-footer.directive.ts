import { Directive, TemplateRef, OnInit, OnDestroy, inject } from '@angular/core';
import { SidebarPanelActionsService } from '../services/sidebar-panel-actions.service';

/**
 * Directiva para declarar un template custom de footer desde dentro
 * del componente dinámico cargado en el sidebar panel.
 *
 * Permite que el componente hijo sea dueño de su footer sin necesidad
 * de comunicarse con el componente padre o con el servicio de apertura.
 *
 * **Precedencia en el footer:**
 * 1. `customButtons` (config)
 * 2. `NuiSidebarPanelFooter` ← esta directiva
 * 3. Acciones registradas via `SidebarPanelActionsService`
 * 4. `footerTemplate` (config)
 *
 * @example
 * ```html
 * <!-- En el componente dinámico cargado dentro del panel: -->
 * <div class="form-content">
 *   <form [formGroup]="form">...</form>
 * </div>
 *
 * <ng-template nuiSidebarPanelFooter>
 *   <div class="footer-actions">
 *     <nui-button (click)="cancel()">Cancelar</nui-button>
 *     <nui-button color="primary" (click)="save()" [disabled]="form.invalid">
 *       Guardar
 *     </nui-button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @publicApi
 */
@Directive({
  selector: '[nuiSidebarPanelFooter]',
  standalone: true,
})
export class SidebarPanelFooterDirective implements OnInit, OnDestroy {
  readonly templateRef = inject(TemplateRef<any>);
  private readonly actionsService = inject(SidebarPanelActionsService, { optional: true });

  ngOnInit(): void {
    this.actionsService?.registerFooterTemplate(this.templateRef);
  }

  ngOnDestroy(): void {
    this.actionsService?.registerFooterTemplate(null);
  }
}




