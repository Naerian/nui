import { Directive, TemplateRef } from '@angular/core';

/**
 * Directiva para marcar templates como contenido de sidebar-panel
 * 
 * Permite identificar y referenciar templates específicos que se usarán
 * como contenido dinámico en los sidebar-panels. Útil para escenarios donde
 * se trabaja con múltiples templates y se necesita distinguirlos.
 * 
 * @example
 * ```html
 * <!-- Template básico -->
 * <ng-template nuisidebar-panelContent>
 *   <p>Contenido del panel</p>
 * </ng-template>
 * 
 * <!-- Template con nombre para identificación -->
 * <ng-template nuisidebar-panelContent="userForm">
 *   <form>...</form>
 * </ng-template>
 * 
 * <!-- Uso con ViewChild para obtener referencia -->
 * <ng-template nuisidebar-panelContent #panelContent>
 *   <div>Contenido dinámico</div>
 * </ng-template>
 * ```
 * 
 * @example
 * ```typescript
 * // En el componente - Obtener referencia al template
 * export class MyComponent {
 *   @ViewChild(SidebarPanelContentDirective, { read: TemplateRef })
 *   panelTemplate!: TemplateRef<any>;
 *   
 *   openPanel() {
 *     // Se podría pasar el template al servicio si se implementa soporte
 *     // this.SidebarPanelService.openWithTemplate(this.panelTemplate, config);
 *   }
 * }
 * ```
 * 
 * @usageNotes
 * ### Ventajas
 * - **Identificación clara**: Marca explícitamente templates destinados a sidebar-panels
 * - **Reutilización**: Permite definir templates una vez y referenciarlos múltiples veces
 * - **Type Safety**: Proporciona tipado cuando se usa con ViewChild/ContentChild
 * - **Organización**: Mejora la legibilidad del código separando templates de lógica
 * 
 * ### Casos de Uso
 * - Templates de confirmación reutilizables
 * - Formularios complejos en panels
 * - Contenido condicional según contexto
 * - Múltiples variantes de contenido para el mismo panel
 * 
 * @publicApi
 */
@Directive({
  selector: '[nuisidebar-panelContent]',
  standalone: true,
})
export class SidebarPanelContentDirective {
  /**
   * Crea una instancia de la directiva
   * 
   * @param templateRef - Referencia al template que contiene la directiva
   * 
   * @internal
   * El TemplateRef se inyecta automáticamente por Angular cuando la directiva
   * se aplica a un elemento `<ng-template>`. Esta referencia puede ser utilizada
   * posteriormente para crear vistas dinámicas.
   */
  constructor(public templateRef: TemplateRef<any>) {}
}



