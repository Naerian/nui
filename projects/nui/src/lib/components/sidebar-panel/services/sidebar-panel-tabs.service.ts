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
import { SidebarPanelPosition } from '../models/sidebar-panel.model';

/**
 * InformaciÃ³n de una pestaÃ±a minimizada
 */
export interface MinimizedTab {
  id: string;
  title: string;
  position: SidebarPanelPosition;
  restoreCallback: () => void;
}

/**
 * Servicio global para gestionar las pestaÃ±as de panels minimizados
 * 
 * Este servicio mantiene un registro centralizado de todos los panels minimizados
 * y proporciona mÃ©todos para agregar, remover y restaurar pestaÃ±as.
 * 
 * **Nota:** El componente de pestaÃ±as se crea automÃ¡ticamente cuando se minimiza
 * el primer panel, sin necesidad de instanciarlo manualmente en el HTML.
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarPanelTabsService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  /**
   * Signal con todas las pestaÃ±as minimizadas
   */
  private readonly _tabs = signal<MinimizedTab[]>([]);

  /**
   * Referencia al componente de pestaÃ±as (se crea dinÃ¡micamente)
   */
  private tabsComponentRef?: ComponentRef<any>;

  /**
   * Obtiene todas las pestaÃ±as minimizadas
   */
  readonly tabs = this._tabs.asReadonly();

  /**
   * Crea dinÃ¡micamente el componente de pestaÃ±as si no existe
   * 
   * Este mÃ©todo se llama automÃ¡ticamente cuando se minimiza el primer panel.
   * El componente se inyecta dinÃ¡micamente en el DOM (al final del body) sin
   * necesidad de instanciarlo manualmente en el HTML.
   * 
   * **Ventajas de la inyecciÃ³n dinÃ¡mica:**
   * - âœ… No contamina el HTML de la aplicaciÃ³n
   * - âœ… Se crea solo cuando es necesario (lazy)
   * - âœ… Se destruye automÃ¡ticamente cuando no hay pestaÃ±as
   * - âœ… Zero-config para el desarrollador
   * 
   * @private
   */
  private ensureTabsComponent(): void {
    if (this.tabsComponentRef) {
      return; // Ya existe
    }

    // Importar el componente dinÃ¡micamente para evitar dependencias circulares
    import('../sidebar-panel-tabs/sidebar-panel-tabs.component').then(
      ({ SidebarPanelTabsComponent }) => {
        // Crear el componente usando createComponent de Angular
        this.tabsComponentRef = createComponent(SidebarPanelTabsComponent, {
          environmentInjector: this.injector,
        });

        // Adjuntar a la aplicaciÃ³n
        this.appRef.attachView(this.tabsComponentRef.hostView);

        // Insertar en el DOM (al final del body)
        const domElem = (this.tabsComponentRef.hostView as any)
          .rootNodes[0] as HTMLElement;
        this.document.body.appendChild(domElem);
      }
    );
  }

  /**
   * Destruye el componente de pestaÃ±as si no hay tabs
   * 
   * Este mÃ©todo se llama automÃ¡ticamente cuando se cierra/restaura la Ãºltima pestaÃ±a.
   * Limpia completamente el componente del DOM para no dejar rastros innecesarios.
   * 
   * **Proceso de limpieza:**
   * 1. Desadjunta la vista de la aplicaciÃ³n Angular
   * 2. Destruye el componente (limpia subscripciones, listeners, etc.)
   * 3. Elimina la referencia para liberar memoria
   * 
   * @private
   */
  private destroyTabsComponentIfEmpty(): void {
    if (this._tabs().length === 0 && this.tabsComponentRef) {
      this.appRef.detachView(this.tabsComponentRef.hostView);
      this.tabsComponentRef.destroy();
      this.tabsComponentRef = undefined;
    }
  }

  /**
   * Agrega una nueva pestaÃ±a minimizada
   * 
   * Si es la primera pestaÃ±a, crea automÃ¡ticamente el componente global.
   */
  addTab(tab: MinimizedTab): void {
    // Verificar que no exista ya
    const exists = this._tabs().some(t => t.id === tab.id);
    if (!exists) {
      this._tabs.update(tabs => [...tabs, tab]);
      
      // Asegurar que el componente de pestaÃ±as existe
      this.ensureTabsComponent();
    }
  }

  /**
   * Remueve una pestaÃ±a minimizada
   * 
   * Si era la Ãºltima pestaÃ±a, destruye automÃ¡ticamente el componente global.
   */
  removeTab(id: string): void {
    this._tabs.update(tabs => tabs.filter(t => t.id !== id));
    
    // Destruir el componente si ya no hay pestaÃ±as
    this.destroyTabsComponentIfEmpty();
  }

  /**
   * Restaura un panel minimizado
   */
  restoreTab(id: string): void {
    const tab = this._tabs().find(t => t.id === id);
    if (tab) {
      tab.restoreCallback();
      this.removeTab(id);
    }
  }

  /**
   * Obtiene pestaÃ±as agrupadas por posiciÃ³n
   */
  getTabsByPosition(position: SidebarPanelPosition): MinimizedTab[] {
    return this._tabs().filter(t => t.position === position);
  }

  /**
   * Limpia todas las pestaÃ±as
   */
  clearAll(): void {
    this._tabs.set([]);
    
    // Destruir el componente
    this.destroyTabsComponentIfEmpty();
  }
}



