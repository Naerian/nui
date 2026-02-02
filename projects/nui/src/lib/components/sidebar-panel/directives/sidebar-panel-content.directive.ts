import { Directive, TemplateRef } from '@angular/core';

/**
 * Directiva para marcar templates como contenido de sidebar-panel
 * 
 * Permite identificar y referenciar templates especÃ­ficos que se usarÃ¡n
 * como contenido dinÃ¡mico en los sidebar-panels. Ãštil para escenarios donde
 * se trabaja con mÃºltiples templates y se necesita distinguirlos.
 * 
 * @example
 * ```html
 * <!-- Template bÃ¡sico -->
 * <ng-template nuisidebar-panelContent>
 *   <p>Contenido del panel</p>
 * </ng-template>
 * 
 * <!-- Template con nombre para identificaciÃ³n -->
 * <ng-template nuisidebar-panelContent="userForm">
 *   <form>...</form>
 * </ng-template>
 * 
 * <!-- Uso con ViewChild para obtener referencia -->
 * <ng-template nuisidebar-panelContent #panelContent>
 *   <div>Contenido dinÃ¡mico</div>
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
 *     // Se podrÃ­a pasar el template al servicio si se implementa soporte
 *     // this.SidebarPanelService.openWithTemplate(this.panelTemplate, config);
 *   }
 * }
 * ```
 * 
 * @usageNotes
 * ### Ventajas
 * - **IdentificaciÃ³n clara**: Marca explÃ­citamente templates destinados a sidebar-panels
 * - **ReutilizaciÃ³n**: Permite definir templates una vez y referenciarlos mÃºltiples veces
 * - **Type Safety**: Proporciona tipado cuando se usa con ViewChild/ContentChild
 * - **OrganizaciÃ³n**: Mejora la legibilidad del cÃ³digo separando templates de lÃ³gica
 * 
 * ### Casos de Uso
 * - Templates de confirmaciÃ³n reutilizables
 * - Formularios complejos en panels
 * - Contenido condicional segÃºn contexto
 * - MÃºltiples variantes de contenido para el mismo panel
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
   * El TemplateRef se inyecta automÃ¡ticamente por Angular cuando la directiva
   * se aplica a un elemento `<ng-template>`. Esta referencia puede ser utilizada
   * posteriormente para crear vistas dinÃ¡micas.
   */
  constructor(public templateRef: TemplateRef<any>) {}
}



