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
import { NuiDockItem } from './models/nui-dock.model';

/**
 * Servicio centralizado para gestionar los elementos minimizados del dock.
 *
 * Actúa como única fuente de verdad para modales y paneles laterales minimizados,
 * sustituyendo a `ModalDialogDockService` y `SidebarPanelTabsService`.
 *
 * El componente `NuiDockComponent` se crea dinámicamente la primera vez que se añade
 * un item y se destruye automáticamente cuando la lista queda vacía (lazy lifecycle).
 *
 * @example
 * ```typescript
 * // Desde ModalDialogComponent:
 * this._dockService.add({
 *   id: this.modalRef.id,
 *   type: 'modal',
 *   title: this.config.title ?? 'Modal',
 *   icon: this.config.iconTitle,
 *   color: this.config.color,
 *   restore: () => this._restore(),
 * });
 *
 * // Desde SidebarPanelComponent:
 * this._dockService.add({
 *   id: this.panelRef.id,
 *   type: 'sidebar',
 *   title: this.title || 'Panel',
 *   icon: this.sidebarPanelConfig.dockTabConfig?.icon,
 *   position: this.sidebarPanelConfig.position ?? 'right',
 *   restore: () => this.restore(),
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class NuiDockService {
  private readonly _appRef = inject(ApplicationRef);
  private readonly _envInjector = inject(EnvironmentInjector);
  private readonly _document = inject(DOCUMENT);

  private readonly _items = signal<NuiDockItem[]>([]);
  private _dockComponentRef?: ComponentRef<any>;

  /** Signal de solo lectura con los items actualmente en el dock */
  readonly items = this._items.asReadonly();

  /**
   * Añade un item al dock.
   * Si es el primero, crea el componente dock dinámicamente.
   * No añade duplicados; si el id ya existe, la operación es silenciosa.
   */
  add(item: NuiDockItem): void {
    const exists = this._items().some((i) => i.id === item.id);
    if (!exists) {
      this._items.update((current) => [...current, item]);
      this._ensureDockComponent();
    }
  }

  /**
   * Elimina un item del dock por su id.
   * Si era el último item, destruye el componente dock.
   */
  remove(id: string): void {
    this._items.update((current) => current.filter((i) => i.id !== id));
    this._destroyIfEmpty();
  }

  /**
   * Restaura el elemento asociado al id, invoca su función `restore` y lo elimina del dock.
   */
  restore(id: string): void {
    const item = this._items().find((i) => i.id === id);
    if (item) {
      item.restore();
      this.remove(id);
    }
  }

  /**
   * Elimina todos los items y destruye el componente dock.
   */
  clearAll(): void {
    this._items.set([]);
    this._destroyIfEmpty();
  }

  // ─── Privados ──────────────────────────────────────────────────────────────

  /**
   * Crea el componente dock y lo inserta en `<body>` si aún no existe.
   * Usa import dinámico para evitar dependencias circulares con el componente.
   */
  private _ensureDockComponent(): void {
    if (this._dockComponentRef) return;

    import('./nui-dock.component').then(({ NuiDockComponent }) => {
      this._dockComponentRef = createComponent(NuiDockComponent, {
        environmentInjector: this._envInjector,
      });
      this._appRef.attachView(this._dockComponentRef.hostView);
      const domEl = (this._dockComponentRef.hostView as any).rootNodes[0] as HTMLElement;
      this._document.body.appendChild(domEl);
    });
  }

  /**
   * Destruye el componente dock si la lista de items está vacía.
   */
  private _destroyIfEmpty(): void {
    if (this._items().length === 0 && this._dockComponentRef) {
      this._appRef.detachView(this._dockComponentRef.hostView);
      this._dockComponentRef.destroy();
      this._dockComponentRef = undefined;
    }
  }
}
