import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
  inject,
  computed,
  signal,
  effect,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NuiDockService } from './nui-dock.service';
import { NuiDockItem } from './models/nui-dock.model';
import { NuiI18nService } from '../../i18n';
import { injectNuiDockConfig } from '../../configs/dock/dock.config';

/**
 * Componente global que renderiza el dock unificado de elementos minimizados.
 *
 * Muestra un toolbar horizontal con chips para cada modal o panel lateral minimizado.
 * Se crea dinámicamente por `NuiDockService` al minimizar el primer elemento y
 * se destruye automáticamente cuando no quedan items.
 *
 * Cuando `maxVisibleChips` está configurado y hay más items que ese límite,
 * los excedentes se colapsan en un chip "+N" que abre una hoja inferior con
 * la lista completa.
 *
 * @internal No instanciar directamente; usar `NuiDockService`.
 */
@Component({
  selector: 'nui-dock',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nui-dock.component.html',
  styleUrls: ['./nui-dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NuiDockComponent {
  private readonly _dockService = inject(NuiDockService);
  private readonly _i18nService = inject(NuiI18nService);
  protected readonly _dockConfig = injectNuiDockConfig();

  protected readonly _i18n = computed(() => this._i18nService.translations());

  // ─── Items agrupados ────────────────────────────────────────────────────────

  /** Todos los items: modales primero, luego sidebars */
  private readonly _allItems = computed(() => [
    ...this._dockService.items().filter((i) => i.type === 'modal'),
    ...this._dockService.items().filter((i) => i.type === 'sidebar'),
  ]);

  /** Items visibles en el toolbar (limitados por maxVisibleChips) */
  private readonly _visibleItems = computed(() => {
    const max = this._dockConfig.maxVisibleChips;
    const all = this._allItems();
    return max != null ? all.slice(0, max) : all;
  });

  /** Items que desbordan el límite visible */
  protected readonly overflowItems = computed(() => {
    const max = this._dockConfig.maxVisibleChips;
    const all = this._allItems();
    return max != null ? all.slice(max) : [];
  });

  protected readonly overflowCount = computed(() => this.overflowItems().length);

  /** Items de tipo modal visibles en el toolbar */
  protected readonly visibleModalItems = computed(() =>
    this._visibleItems().filter((i) => i.type === 'modal')
  );

  /** Items de tipo sidebar visibles en el toolbar */
  protected readonly visibleSidebarItems = computed(() =>
    this._visibleItems().filter((i) => i.type === 'sidebar')
  );

  /** Determina si hay items de ambos tipos para mostrar el separador */
  protected readonly showSeparator = computed(
    () =>
      (this._dockConfig.showTypeSeparator ?? true) &&
      this.visibleModalItems().length > 0 &&
      this.visibleSidebarItems().length > 0
  );

  // ─── Estado de la hoja inferior ─────────────────────────────────────────────

  protected readonly showSheet = signal(false);

  constructor() {
    // Cierra la hoja automáticamente cuando ya no quedan items de desbordamiento
    effect(() => {
      if (this.overflowCount() === 0) {
        this.showSheet.set(false);
      }
    });
  }

  // ─── Iconos de posición para sidebar ────────────────────────────────────────

  protected readonly POSITION_ICONS: Readonly<Record<string, string>> = {
    right: 'ri-arrow-right-s-line',
    left: 'ri-arrow-left-s-line',
    top: 'ri-arrow-up-s-line',
    bottom: 'ri-arrow-down-s-line',
  };

  // ─── Host ───────────────────────────────────────────────────────────────────

  @HostBinding('class')
  get hostClass(): string {
    const position = this._dockConfig.position ?? 'bottom';
    return `nui-dock nui-dock--${position}`;
  }

  // ─── Acciones ───────────────────────────────────────────────────────────────

  protected toggleSheet(): void {
    this.showSheet.update((v) => !v);
  }

  protected closeSheet(): void {
    this.showSheet.set(false);
  }

  /**
   * Restaura el elemento con el id dado y lo elimina del dock.
   */
  protected restoreItem(id: string): void {
    this._dockService.restore(id);
  }

  /**
   * Restaura desde la hoja inferior y cierra la hoja.
   */
  protected restoreFromSheet(id: string): void {
    this._dockService.restore(id);
    this.closeSheet();
  }

  /**
   * Elimina el elemento del dock sin restaurarlo (dismiss desde el botón de cierre).
   */
  protected dismissItem(id: string): void {
    this._dockService.remove(id);
  }

  protected trackById(_: number, item: NuiDockItem): string {
    return item.id;
  }
}
