import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPanelTabsService } from '../services/sidebar-panel-tabs.service';
import { SidebarPanelPosition } from '../models/sidebar-panel.model';

/**
 * Componente global que renderiza todas las pestaÃ±as de paneles minimizados
 * 
 * **NOTA IMPORTANTE:** Este componente se crea automÃ¡ticamente de forma dinÃ¡mica
 * cuando se minimiza el primer panel. NO es necesario instanciarlo manualmente
 * en el HTML de tu aplicaciÃ³n.
 * 
 * El servicio `SidebarPanelTabsService` se encarga de:
 * 1. Crear el componente cuando se minimiza el primer panel
 * 2. Destruirlo automÃ¡ticamente cuando no hay pestaÃ±as minimizadas
 * 3. Gestionar su ciclo de vida completo
 * 
 * @internal
 * Este componente es gestionado internamente por el sistema de sidebar-panels
 */
@Component({
  selector: 'nui-sidebar-panel-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-panel-tabs.component.html',
  styleUrls: ['./sidebar-panel-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarPanelTabsComponent {
  private readonly _tabsService = inject(SidebarPanelTabsService);

  /**
   * Todas las pestaÃ±as minimizadas
   */
  protected readonly tabs = this._tabsService.tabs;

  /**
   * PestaÃ±as agrupadas por posiciÃ³n para facilitar el renderizado
   */
  protected readonly tabsByPosition = computed(() => {
    const allTabs = this.tabs();
    
    return {
      right: allTabs.filter(t => t.position === 'right'),
      left: allTabs.filter(t => t.position === 'left'),
      top: allTabs.filter(t => t.position === 'top'),
      bottom: allTabs.filter(t => t.position === 'bottom'),
    };
  });

  /**
   * Restaura un panel minimizado
   * @param id - ID del panel a restaurar
   */
  protected restorePanel(id: string): void {
    this._tabsService.restoreTab(id);
  }
}



