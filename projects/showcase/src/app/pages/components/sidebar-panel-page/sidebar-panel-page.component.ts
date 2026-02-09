import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, SidebarPanelService, SidebarPanelSize, SidebarPanelPosition } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { SIDEBAR_PANEL_PAGE_CONFIG } from './sidebar-panel-page.config';
import { SidebarPanelExampleContentComponent } from './components/sidebar-panel-example-content/sidebar-panel-example-content.component';
import { SidebarPanelEventExampleComponent } from './components/sidebar-panel-event-example/sidebar-panel-event-example.component';

/**
 * Página de documentación del componente Sidebar Panel
 *
 * Muestra ejemplos de uso del componente con diferentes configuraciones:
 * - Uso básico
 * - Diferentes tamaños (xs, sm, md, lg, xl, full)
 * - Diferentes posiciones (left, right, top, bottom)
 * - Componentes dinámicos con inyección de datos
 * - Panel minimizable
 * - Prevención de cierre
 * - Múltiples panels
 * - Personalización de estilos
 */
@Component({
  selector: 'app-sidebar-panel-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    SectionTitleComponent,
    CodeBlockComponent,
  ],
  templateUrl: './sidebar-panel-page.component.html',
  styleUrl: './sidebar-panel-page.component.scss',
})
export class SidebarPanelPageComponent extends BaseComponentPage {
  pageConfig = SIDEBAR_PANEL_PAGE_CONFIG;

  @ViewChild('userDetailsTemplate', { read: TemplateRef }) userDetailsTemplate!: TemplateRef<any>;

  // Datos de ejemplo para el template
  currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    lastLogin: new Date(2024, 0, 15, 10, 30),
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  constructor(private sidebarPanelService: SidebarPanelService) {
    super();
  }

  /**
   * Abre un panel básico desde la derecha
   */
  openBasicPanel(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel Básico',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este es un ejemplo básico del componente Sidebar Panel',
      },
    });
  }

  /**
   * Abre un panel usando SOLO valores por defecto
   * No pasa ninguna configuración específica, usa defaults globales de NUI_CONFIG
   * Útil para probar la configuración global
   */
  openPanelWithDefaults(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Defaults',
      data: {
        message:
          'Este panel usa los valores por defecto de la configuración global. ' +
          'Si cambias provideNUIConfig({ sidebarPanel: {...} }), este panel ' +
          'reflejará esos cambios automáticamente.',
        showConfigInfo: true,
      },
    });
  }

  /**
   * Abre un panel con tamaño específico
   */
  openPanelWithSize(size: SidebarPanelSize): void {
    const sizeLabels: Record<SidebarPanelSize, string> = {
      xs: 'XSmall (300px)',
      sm: 'Small (400px)',
      md: 'Medium (600px)',
      lg: 'Large (800px)',
      xl: 'XLarge (1000px)',
      full: 'Full (100%)',
    };

    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: `Panel ${sizeLabels[size]}`,
      size,
      position: 'right',
      data: {
        message: `Panel con tamaño ${sizeLabels[size]}`,
      },
    });
  }

  /**
   * Abre un panel desde una posición específica
   */
  openPanelWithPosition(position: SidebarPanelPosition): void {
    const positionLabels: Record<SidebarPanelPosition, string> = {
      left: 'Izquierda',
      right: 'Derecha',
      top: 'Arriba',
      bottom: 'Abajo',
    };

    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: `Panel desde ${positionLabels[position]}`,
      position,
      size: 'md',
      data: {
        message: `Este panel se desliza desde la ${positionLabels[position].toLowerCase()}`,
      },
    });
  }

  /**
   * Abre un panel con componente dinámico y datos
   */
  openDynamicPanel(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Datos Dinámicos',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este componente recibe datos dinámicamente mediante inyección de tokens',
        showActions: true,
      },
    });
  }

  /**
   * Abre un panel con contenido HTML simple
   * No requiere crear un componente completo
   */
  openHtmlNotificationPanel(): void {
    this.sidebarPanelService.open({
      title: 'Operation Successful',
      position: 'right',
      size: 'sm',
      htmlContent: `
        <div style="padding: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <i class="ri-check-circle-fill" style="font-size: 2.5rem; color: var(--nui-success-main);"></i>
            <div>
              <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Success!</h3>
              <p style="margin: 0.25rem 0 0 0; color: var(--nui-text-secondary); font-size: 0.875rem;">
                Your changes have been saved.
              </p>
            </div>
          </div>
          <ul style="margin: 0; padding-left: 1.25rem; color: var(--nui-text-secondary);">
            <li>Profile information updated</li>
            <li>Email notifications configured</li>
            <li>Privacy settings adjusted</li>
          </ul>
        </div>
      `,
    });
  }

  /**
   * Abre un panel con un template de Angular
   * Permite pasar datos dinámicos y funciones al template
   */
  openTemplatePanel(): void {
    this.sidebarPanelService.open({
      title: 'User Profile',
      position: 'right',
      size: 'md',
      contentTemplate: this.userDetailsTemplate,
      templateContext: {
        user: this.currentUser,
        onRefresh: () => {
          console.log('Refreshing user data...');
          alert('User data refreshed!');
        },
        onLogout: () => {
          console.log('Logging out...');
          alert('User logged out!');
        },
      },
    });
  }

  /**
   * Abre un panel con HTML generado dinámicamente
   * Útil para mostrar reportes o contenido estructurado
   */
  openDynamicHtmlPanel(): void {
    const items = [
      { id: 1, name: 'Task Alpha', status: 'Completed', priority: 'High' },
      { id: 2, name: 'Task Beta', status: 'In Progress', priority: 'Medium' },
      { id: 3, name: 'Task Gamma', status: 'Pending', priority: 'Low' },
    ];

    const htmlContent = `
      <div style="padding: 1rem;">
        <h3 style="margin-top: 0;">Task List Report</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: var(--nui-surface-variant); text-align: left;">
              <th style="padding: 0.5rem; border: 1px solid var(--nui-divider);">ID</th>
              <th style="padding: 0.5rem; border: 1px solid var(--nui-divider);">Name</th>
              <th style="padding: 0.5rem; border: 1px solid var(--nui-divider);">Status</th>
              <th style="padding: 0.5rem; border: 1px solid var(--nui-divider);">Priority</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                item => `
              <tr>
                <td style="padding: 0.5rem; border: 1px solid var(--nui-divider);">${item.id}</td>
                <td style="padding: 0.5rem; border: 1px solid var(--nui-divider);">${item.name}</td>
                <td style="padding: 0.5rem; border: 1px solid var(--nui-divider);">
                  <span style="
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    background: ${
                      item.status === 'Completed'
                        ? 'var(--nui-success-light)'
                        : item.status === 'In Progress'
                          ? 'var(--nui-warning-light)'
                          : 'var(--nui-grey-200)'
                    };
                    color: ${
                      item.status === 'Completed'
                        ? 'var(--nui-success-dark)'
                        : item.status === 'In Progress'
                          ? 'var(--nui-warning-dark)'
                          : 'var(--nui-text-secondary)'
                    };
                  ">${item.status}</span>
                </td>
                <td style="padding: 0.5rem; border: 1px solid var(--nui-divider);">${item.priority}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    this.sidebarPanelService.open({
      title: 'Task Report',
      position: 'right',
      size: 'lg',
      htmlContent,
    });
  }

  /**
   * Abre un panel minimizable
   */
  openMinimizablePanel(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel Minimizable',
      id: 'minimizable-panel-1',
      minimizable: true,
      position: 'right',
      size: 'md',
      data: {
        message:
          'Este panel puede minimizarse a una pestaña lateral. Haz clic en el botón "-" del header.',
        showActions: false,
      },
    });
  }

  /**
   * Abre otro panel minimizable desde la izquierda
   */
  openMinimizablePanel2(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Otro Panel Minimizable',
      id: 'minimizable-panel-2',
      minimizable: true,
      position: 'right',
      size: 'sm',
      data: {
        message: 'Este es otro panel minimizable abierto desde la izquierda.',
        showActions: false,
      },
    });
  }

  /**
   * Abre un panel de chat con pestaña personalizada
   * Demuestra customización completa: icono, label, CSS class y standalone para botón flotante
   */
  openChatSupportPanel(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Chat de Soporte',
      id: 'chat-support',
      minimizable: true,
      position: 'right',
      size: 'md',
      minimizedTabCustomization: {
        icon: 'ri-customer-service-line', // Icono de soporte
        label: 'Soporte', // Texto del botón
        cssClass: 'floating-chat-button', // Clase CSS para posición flotante
        standalone: true, // Permite posicionamiento libre (bottom-right)
      },
      data: {
        message:
          'Panel de chat con pestaña personalizada. Minimiza este panel para ver el botón flotante personalizado en la esquina inferior derecha. El modo standalone permite posicionamiento CSS libre sin restricciones.',
        showActions: false,
      },
    });
  }

  /**
   * Abre un panel sin botón de cerrar
   */
  openPanelWithoutCloseButton(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel sin botón cerrar',
      showCloseButton: false,
      position: 'right',
      size: 'md',
      data: {
        message:
          'Este panel no tiene botón de cerrar en el header. Usa el botón de abajo para cerrar.',
        showCloseAction: true,
      },
    });
  }

  /**
   * Abre un panel sin backdrop
   */
  openPanelWithoutBackdrop(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel sin Backdrop',
      hasBackdrop: false,
      position: 'right',
      size: 'sm',
      data: {
        message:
          'Este panel no tiene fondo oscuro (backdrop). Puedes interactuar con el contenido detrás.',
      },
    });
  }

  /**
   * Abre un panel con backdrop personalizado
   * Demuestra cómo aplicar estilos custom al backdrop usando backdropClass
   */
  openPanelWithCustomBackdrop(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Backdrop Custom',
      backdropClass: 'custom-backdrop-blur',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel tiene un backdrop personalizado con efecto blur y color custom.',
      },
    });
  }

  /**
   * Abre múltiples panels
   */
  openMultiplePanels(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel 1 (Derecha)',
      position: 'right',
      size: 'sm',
      allowMultiple: true,
      data: {
        message: 'Primer panel abierto desde la derecha',
      },
    });

    setTimeout(() => {
      this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
        title: 'Panel 2 (Izquierda)',
        position: 'left',
        size: 'sm',
        allowMultiple: true,
        data: {
          message: 'Segundo panel abierto desde la izquierda',
        },
      });
    }, 300);
  }

  /**
   * Abre un panel con eventos Output
   * Demuestra cómo capturar eventos emitidos desde el componente dinámico
   */
  openPanelWithEvents(): void {
    // Abrir el panel
    const panelRef = this.sidebarPanelService.open(SidebarPanelEventExampleComponent, {
      title: 'Panel con Eventos Output',
      position: 'right',
      size: 'md',
      data: {
        initialValue: 'Test data',
        message: 'Este panel demuestra la captura de eventos',
      },
    });

    // CLAVE: Acceder a componentInstance para suscribirse a los eventos @Output()
    const componentInstance = panelRef.componentInstance;

    if (componentInstance) {
      // Capturar evento dataChanged
      componentInstance.dataChanged.subscribe((data: any) => {
        console.log('🔵 [PADRE] dataChanged capturado:', data);
        alert(`Evento dataChanged capturado!\nValue: ${data.value}`);
      });

      // Capturar evento statusChanged
      componentInstance.statusChanged.subscribe((data: any) => {
        console.log('🟢 [PADRE] statusChanged capturado:', data);
        alert(`Evento statusChanged capturado!\nStatus: ${data.status}\nMessage: ${data.message}`);
      });

      // Capturar evento customEvent
      componentInstance.customEvent.subscribe((data: any) => {
        console.log('🟡 [PADRE] customEvent capturado:', data);
        alert(`Evento customEvent capturado!\n${JSON.stringify(data, null, 2)}`);
      });

      // Capturar evento beforeClose
      componentInstance.beforeClose.subscribe((result: any) => {
        console.log('🔴 [PADRE] beforeClose capturado:', result);
        console.log(`Panel se va a cerrar con acción: ${result.action}`);
      });
    }

    // También podemos capturar el resultado final con afterClosed()
    panelRef.afterClosed().subscribe((result: any) => {
      console.log('🏁 [PADRE] Panel cerrado con resultado:', result);

      if (result) {
        alert(
          `Panel cerrado!\n\n` +
            `Acción: ${result.action}\n` +
            `Timestamp: ${result.timestamp}\n` +
            `Data: ${JSON.stringify(result.data || {}, null, 2)}`
        );
      }
    });
  }
}
