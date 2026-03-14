import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
  inject,
  computed,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NuiDockService } from './nui-dock.service';
import { NuiDockItem } from './models/nui-dock.model';
import { NuiI18nService } from '../../i18n';
import { NUI_CONFIG } from '../../configs/nui.token';
import { DEFAULT_NUI_DOCK_CONFIG } from '../../configs/dock/dock.config';

/**
 * Componente global que renderiza el dock unificado de elementos minimizados.
 *
 * Muestra un toolbar horizontal con chips para cada modal o panel lateral minimizado.
 * Se crea dinámicamente por `NuiDockService` al minimizar el primer elemento y
 * se destruye automáticamente cuando no quedan items.
 *
 * Cuando hay items de ambos tipos (modal y sidebar), se renderiza un separador
 * visual entre los dos grupos si `showTypeSeparator` está activo en la config global.
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
  private readonly _globalConfig = inject(NUI_CONFIG, { optional: true });

  protected readonly _i18n = computed(() => this._i18nService.translations());

  /** Configuración del dock resuelta con defaults */
  private readonly _dockConfig = {
    ...DEFAULT_NUI_DOCK_CONFIG,
    ...this._globalConfig?.config?.dock,
  };

  /** Items de tipo modal en el dock */
  protected readonly modalItems = computed(() =>
    this._dockService.items().filter((i) => i.type === 'modal')
  );

  /** Items de tipo sidebar en el dock */
  protected readonly sidebarItems = computed(() =>
    this._dockService.items().filter((i) => i.type === 'sidebar')
  );

  /** Determina si hay items de ambos tipos para mostrar el separador */
  protected readonly showSeparator = computed(
    () =>
      (this._dockConfig.showTypeSeparator ?? true) &&
      this.modalItems().length > 0 &&
      this.sidebarItems().length > 0
  );

  /**
   * Iconos direccionales para indicar la posición original del panel lateral.
   * Se muestran en el chip cuando el item de sidebar no tiene icono personalizado.
   */
  protected readonly POSITION_ICONS: Readonly<Record<string, string>> = {
    right: 'ri-arrow-right-s-line',
    left: 'ri-arrow-left-s-line',
    top: 'ri-arrow-up-s-line',
    bottom: 'ri-arrow-down-s-line',
  };

  @HostBinding('class')
  get hostClass(): string {
    const position = this._dockConfig.position ?? 'bottom';
    return `nui-dock nui-dock--${position}`;
  }

  /**
   * Restaura el elemento con el id dado y lo elimina del dock.
   */
  protected restoreItem(id: string): void {
    this._dockService.restore(id);
  }

  protected trackById(_: number, item: NuiDockItem): string {
    return item.id;
  }
}
