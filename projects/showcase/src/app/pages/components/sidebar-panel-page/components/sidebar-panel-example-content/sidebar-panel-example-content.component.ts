import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, SIDEBAR_PANEL_DATA, SIDEBAR_PANEL_REF, SIDEBAR_PANEL_CONFIG } from 'nui';

interface SidebarPanelExampleData {
  message?: string;
  showActions?: boolean;
  showCloseAction?: boolean;
  showConfigInfo?: boolean;
}

/**
 * Componente de ejemplo para mostrar dentro del Sidebar Panel
 * Recibe datos a través de inyección desde el servicio
 */
@Component({
  selector: 'app-sidebar-panel-example-content',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './sidebar-panel-example-content.component.html',
  styleUrl: './sidebar-panel-example-content.component.scss',
})
export class SidebarPanelExampleContentComponent {
  // Datos inyectados desde el servicio
  private readonly data = inject<SidebarPanelExampleData>(SIDEBAR_PANEL_DATA);
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);
  readonly config = inject(SIDEBAR_PANEL_CONFIG);

  // Propiedades derivadas de los datos inyectados
  readonly message = this.data.message || 'Contenido del panel';
  readonly showActions = this.data.showActions || false;
  readonly showCloseAction = this.data.showCloseAction || false;
  readonly showConfigInfo = this.data.showConfigInfo || false;

  /**
   * Acción de ejemplo
   */
  handleAction(): void {
    console.log('Acción ejecutada desde el panel');
    alert('Acción ejecutada correctamente');
  }

  /**
   * Cerrar el panel
   */
  close(): void {
    this.panelRef.close();
  }
}
