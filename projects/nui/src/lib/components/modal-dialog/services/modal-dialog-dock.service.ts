import {
  Injectable,
  signal,
  inject,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalDialogDockItem } from '../models/modal-dialog.model';

/**
 * Servicio global para gestionar el dock inferior de modales minimizados.
 *
 * El componente dock (`ModalDialogDockComponent`) se crea dinámicamente
 * al minimizar el primer modal y se destruye cuando ya no quedan modales
 * minimizados (lazy lifecycle).
 *
 * @example
 * ```typescript
 * // Desde ModalDialogComponent (shell):
 * this.dockService.addItem({
 *   id: this.modalRef.id,
 *   title: this.config.title ?? 'Modal',
 *   icon: this.config.iconTitle,
 *   color: this.config.color,
 *   restoreCallback: () => this.restore(),
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ModalDialogDockService {
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  private readonly _items = signal<ModalDialogDockItem[]>([]);
  private dockComponentRef?: ComponentRef<any>;

  /** Signal de solo lectura con los items actualmente en el dock */
  readonly items = this._items.asReadonly();

  /**
   * Añade un item al dock.
   * Si es el primero, crea el componente dock dinámicamente.
   */
  addItem(item: ModalDialogDockItem): void {
    const exists = this._items().some((i) => i.id === item.id);
    if (!exists) {
      this._items.update((current) => [...current, item]);
      this._ensureDockComponent();
    }
  }

  /**
   * Elimina un item del dock.
   * Si era el último, destruye el componente dock.
   */
  removeItem(id: string): void {
    this._items.update((current) => current.filter((i) => i.id !== id));
    this._destroyDockIfEmpty();
  }

  /**
   * Restaura el modal asociado al item y lo elimina del dock.
   */
  restoreItem(id: string): void {
    const item = this._items().find((i) => i.id === id);
    if (item) {
      item.restoreCallback();
      this.removeItem(id);
    }
  }

  /**
   * Limpia todos los items y destruye el dock.
   */
  clearAll(): void {
    this._items.set([]);
    this._destroyDockIfEmpty();
  }

  // ─── Privados ──────────────────────────────────────────────

  /**
   * Crea el componente dock y lo inserta en el `<body>` si aún no existe.
   * Usa import dinámico para evitar dependencias circulares.
   */
  private _ensureDockComponent(): void {
    if (this.dockComponentRef) return;

    import('../dock/modal-dialog-dock.component').then(({ ModalDialogDockComponent }) => {
      this.dockComponentRef = createComponent(ModalDialogDockComponent, {
        environmentInjector: this.envInjector,
      });
      this.appRef.attachView(this.dockComponentRef.hostView);
      const domEl = (this.dockComponentRef.hostView as any).rootNodes[0] as HTMLElement;
      this.document.body.appendChild(domEl);
    });
  }

  /**
   * Destruye el componente dock si no quedan items.
   */
  private _destroyDockIfEmpty(): void {
    if (this._items().length === 0 && this.dockComponentRef) {
      this.appRef.detachView(this.dockComponentRef.hostView);
      this.dockComponentRef.destroy();
      this.dockComponentRef = undefined;
    }
  }
}
