import { Injectable, signal, TemplateRef } from '@angular/core';
import { ModalDialogAction } from '../models/modal-dialog.model';

/**
 * Servicio para registrar acciones de footer desde componentes cargados
 * dinámicamente en el modal.
 *
 * Permite que el componente hijo defina sus propios botones de footer
 * sin necesidad de templates complejos ni inputs/outputs.
 * Las acciones se renderizan automáticamente por el shell (`ModalDialogComponent`)
 * con estilos NUI consistentes.
 *
 * **Nota:** Este servicio **no** usa `providedIn: 'root'`. Una instancia fresca
 * se crea por cada modal abierto en `ModalDialogService.open()`.
 *
 * @example
 * ```typescript
 * // En el componente dinámico cargado dentro del modal:
 * export class MyFormComponent implements OnInit {
 *   private readonly actionsService = inject(ModalDialogActionsService);
 *   private readonly modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);
 *   private readonly isSaving = signal(false);
 *
 *   ngOnInit() {
 *     this.actionsService.register([
 *       {
 *         label: 'Cancelar',
 *         color: 'secondary',
 *         variant: 'outline',
 *         handler: () => this.modalRef.close({ confirmed: false }),
 *       },
 *       {
 *         label: 'Guardar',
 *         color: 'primary',
 *         handler: () => this.save(),
 *         disabled: () => this.form.invalid,
 *         loading: () => this.isSaving(),
 *       },
 *     ]);
 *   }
 * }
 * ```
 *
 * @publicApi
 */
@Injectable()
export class ModalDialogActionsService {
  private readonly _actions = signal<ModalDialogAction[]>([]);
  private readonly _footerTemplate = signal<TemplateRef<any> | null>(null);

  /** Signal de solo lectura con las acciones actuales */
  readonly actions = this._actions.asReadonly();

  /** Signal de solo lectura con el template de footer personalizado */
  readonly footerTemplate = this._footerTemplate.asReadonly();

  /**
   * Reemplaza todas las acciones del footer con el array proporcionado.
   */
  register(actions: ModalDialogAction[]): void {
    this._actions.set(actions);
  }

  /**
   * Añade una acción individual al footer.
   */
  add(action: ModalDialogAction): void {
    this._actions.update((current) => [...current, action]);
  }

  /**
   * Actualiza una acción existente por índice (patch parcial).
   */
  update(index: number, partial: Partial<ModalDialogAction>): void {
    this._actions.update((current) =>
      current.map((a, i) => (i === index ? { ...a, ...partial } : a))
    );
  }

  /**
   * Elimina todas las acciones registradas.
   */
  clear(): void {
    this._actions.set([]);
  }

  /**
   * Registra (o elimina) un template TemplateRef para el footer.
   * Si se pasa `null`, se elimina el template y los botones vuelven a ser visibles.
   *
   * Tiene mayor precedencia que las acciones del servicio pero menor que
   * `customButtons` de la configuración.
   */
  registerFooterTemplate(template: TemplateRef<any> | null): void {
    this._footerTemplate.set(template);
  }
}
