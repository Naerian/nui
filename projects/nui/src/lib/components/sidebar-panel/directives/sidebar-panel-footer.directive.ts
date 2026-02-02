import { Directive, TemplateRef, OnInit, OnDestroy, inject, Optional } from '@angular/core';
import { SidebarPanelActionsService } from '../services/sidebar-panel-actions.service';

/**
 * Directiva para marcar un template como footer del sidebar-panel
 * 
 * Permite que el componente hijo defina su propio footer sin necesidad
 * de pasar templates desde el componente padre. El footer se proyecta
 * automáticamente al panel.
 * 
 * @example
 * ```html
 * <!-- En el componente que se carga dentro del panel -->
 * <div class="form-content">
 *   <form>...</form>
 * </div>
 * 
 * <ng-template nuisidebar-panelFooter>
 *   <div class="footer-actions">
 *     <button (click)="cancel()">Cancelar</button>
 *     <button (click)="save()">Guardar</button>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @example
 * ```typescript
 * // El componente es dueño de su footer
 * export class MyFormComponent {
 *   @ViewChild(SidebarPanelFooterDirective) 
 *   footerTemplate?: SidebarPanelFooterDirective;
 * 
 *   save() {
 *     // Lógica de guardado
 *   }
 * 
 *   cancel() {
 *     // Lógica de cancelación
 *   }
 * }
 * ```
 * 
 * @usageNotes
 * ### Ventajas
 * - **Responsabilidad única**: El componente maneja sus propias acciones
 * - **Reutilizable**: El componente funciona dentro o fuera del panel
 * - **Flexible**: Control total sobre el diseño del footer
 * - **Testeable**: El componente se puede probar independientemente
 * 
 * ### Cuándo Usar
 * - Footers con diseño personalizado
 * - Footers con estado dinámico (loading, validaciones, etc.)
 * - Footers con múltiples botones o elementos complejos
 * - Cuando necesitas control total sobre el layout
 * 
 * @publicApi
 */
@Directive({
  selector: '[nuisidebar-panelFooter]',
  standalone: true,
})
export class SidebarPanelFooterDirective implements OnInit, OnDestroy {
  private readonly actionsService = inject(SidebarPanelActionsService, { optional: true });

  /**
   * Crea una instancia de la directiva
   * 
   * @param templateRef - Referencia al template que contiene la directiva
   * 
   * @internal
   * El TemplateRef se inyecta automáticamente por Angular cuando la directiva
   * se aplica a un elemento `<ng-template>`.
   */
  constructor(public templateRef: TemplateRef<any>) {}

  /**
   * Registra el template en el servicio al inicializar
   */
  ngOnInit(): void {
    if (this.actionsService) {
      this.actionsService.registerFooterTemplate(this.templateRef);
    }
  }

  /**
   * Limpia el template del servicio al destruir
   */
  ngOnDestroy(): void {
    if (this.actionsService) {
      this.actionsService.registerFooterTemplate(null);
    }
  }
}



