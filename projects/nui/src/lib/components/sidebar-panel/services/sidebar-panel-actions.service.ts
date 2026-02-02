import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidebarPanelAction } from '../models/sidebar-panel.model';

/**
 * Servicio para registrar acciones de footer desde componentes cargados en el sidebar-panel.
 * 
 * Permite que los componentes cargados en el sidebar-panel registren sus propias
 * acciones de footer (botones) sin necesidad de templates complejos. Las acciones
 * se renderizan automÃ¡ticamente por el sidebar-panel con estilos consistentes.
 * 
 * @example
 * ```typescript
 * // En el componente que se carga en el panel
 * export class MyFormComponent implements OnInit {
 *   private actions = inject(SidebarPanelActionsService);
 * 
 *   ngOnInit() {
 *     this.actions.register([
 *       { 
 *         label: 'Cancelar', 
 *         type: 'secondary',
 *         handler: () => this.cancel() 
 *       },
 *       { 
 *         label: 'Guardar', 
 *         type: 'primary',
 *         icon: 'ri-save-line',
 *         handler: () => this.save() 
 *       }
 *     ]);
 *   }
 * 
 *   save() {
 *     // Lógica de guardado
 *   }
 * 
 *   cancel() {
 *     this.panelRef.close();
 *   }
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Con estados dinámicos
 * export class MyFormComponent implements OnInit {
 *   private actions = inject(SidebarPanelActionsService);
 *   isLoading = false;
 * 
 *   ngOnInit() {
 *     this.actions.register([
 *       { 
 *         label: 'Guardar', 
 *         type: 'primary',
 *         handler: () => this.save(),
 *         get disabled() { return this.isFormInvalid; },
 *         get loading() { return this.isLoading; }
 *       }
 *     ]);
 *   }
 * 
 *   async save() {
 *     this.isLoading = true;
 *     await this.apiService.save();
 *     this.isLoading = false;
 *   }
 * }
 * ```
 * 
 * @usageNotes
 * ### Ventajas
 * - **Simple**: Solo defines un array de acciones
 * - **Consistente**: Estilos automáticos según el tipo
 * - **Reactivo**: Soporta estados disabled/loading
 * - **Clean**: No necesitas crear templates
 * 
 * ### Cuándo Usar
 * - Footers con botones estándar (Guardar, Cancelar, etc.)
 * - Cuando no necesitas diseño personalizado
 * - Formularios simples con acciones básicas
 * - Rápido prototipado
 * 
 * ### Cuándo NO Usar
 * - Footers con layouts complejos
 * - Elementos del footer que no sean botones
 * - Necesitas control total sobre el diseño
 * → En estos casos, usa `SidebarPanelFooterDirective`
 * 
 * @publicApi
 */
@Injectable()
export class SidebarPanelActionsService {
  private readonly _actions$ = new BehaviorSubject<SidebarPanelAction[]>([]);
  private readonly _footerTemplate$ = new BehaviorSubject<TemplateRef<any> | null>(null);

  /**
   * Observable de las acciones actuales
   */
  readonly actions$: Observable<SidebarPanelAction[]> = this._actions$.asObservable();

  /**
   * Observable del template de footer personalizado
   */
  readonly footerTemplate$: Observable<TemplateRef<any> | null> = this._footerTemplate$.asObservable();

  /**
   * Obtiene las acciones actuales
   */
  get actions(): SidebarPanelAction[] {
    return this._actions$.value;
  }

  /**
   * Obtiene el template de footer personalizado
   */
  get footerTemplate(): TemplateRef<any> | null {
    return this._footerTemplate$.value;
  }

  /**
   * Registra un template de footer personalizado
   * Usado internamente por la directiva SidebarPanelFooterDirective
   * 
   * @param template - Template del footer
   */
  registerFooterTemplate(template: TemplateRef<any> | null): void {
    this._footerTemplate$.next(template);
  }

  /**
   * Registra un conjunto de acciones
   * 
   * Reemplaza las acciones existentes con las nuevas. Típicamente se llama
   * en `ngOnInit()` del componente.
   * 
   * @param actions - Array de acciones a registrar
   * 
   * @example
   * ```typescript
   * ngOnInit() {
   *   this.actions.register([
   *     { label: 'Cancelar', type: 'secondary', handler: () => this.cancel() },
   *     { label: 'Guardar', type: 'primary', handler: () => this.save() }
   *   ]);
   * }
   * ```
   */
  register(actions: SidebarPanelAction[]): void {
    this._actions$.next(actions);
  }

  /**
   * Agrega una acción al conjunto existente
   * 
   * @param action - Acción a agregar
   * 
   * @example
   * ```typescript
   * this.actions.add({
   *   label: 'Eliminar',
   *   type: 'danger',
   *   handler: () => this.delete()
   * });
   * ```
   */
  add(action: SidebarPanelAction): void {
    this._actions$.next([...this._actions$.value, action]);
  }

  /**
   * Actualiza una acción existente
   * 
   * @param index - Índice de la acción a actualizar
   * @param updates - Actualizaciones parciales de la acción
   * 
   * @example
   * ```typescript
   * // Deshabilitar el botón de guardar
   * this.actions.update(1, { disabled: true });
   * 
   * // Mostrar loading
   * this.actions.update(1, { loading: true });
   * ```
   */
  update(index: number, updates: Partial<SidebarPanelAction>): void {
    const actions = [...this._actions$.value];
    if (actions[index]) {
      actions[index] = { ...actions[index], ...updates };
      this._actions$.next(actions);
    }
  }

  /**
   * Limpia todas las acciones
   * 
   * @example
   * ```typescript
   * ngOnDestroy() {
   *   this.actions.clear();
   * }
   * ```
   */
  clear(): void {
    this._actions$.next([]);
  }

  /**
   * Habilita o deshabilita una acción por índice
   * 
   * @param index - Índice de la acción
   * @param disabled - Si debe estar deshabilitada
   */
  setDisabled(index: number, disabled: boolean): void {
    this.update(index, { disabled });
  }

  /**
   * Muestra u oculta el loading de una acción
   * 
   * @param index - Índice de la acción
   * @param loading - Si debe mostrar loading
   */
  setLoading(index: number, loading: boolean): void {
    this.update(index, { loading });
  }
}



