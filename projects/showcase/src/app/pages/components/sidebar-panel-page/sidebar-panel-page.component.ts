import { Component, ViewChild, TemplateRef, signal } from '@angular/core';
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
  @ViewChild('customFooterTemplate', { read: TemplateRef }) customFooterTemplate!: TemplateRef<any>;
  @ViewChild('loadingActionsTemplate', { read: TemplateRef }) loadingActionsTemplate!: TemplateRef<any>;

  // Signal para controlar el estado de loading del footer
  isProcessing = signal(false);
  currentPanelRef: any = null;

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

  /**
   * Abre un panel con botones de acción en el footer (básico)
   * Demuestra el uso de customButtons con acciones simples
   */
  openPanelWithFooterActions(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Footer Actions',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel tiene botones de acción en el footer configurados mediante customButtons',
      },
      customButtons: [
        {
          text: 'Cancelar',
          color: 'secondary',
          variant: 'outline',
          callback: (panelRef) => {
            console.log('Cancelar clicked');
            panelRef.close({ action: 'cancel' });
          },
        },
        {
          text: 'Guardar',
          icon: 'ri-save-line',
          color: 'primary',
          variant: 'solid',
          callback: (panelRef) => {
            console.log('Guardar clicked');
            alert('Datos guardados correctamente!');
            panelRef.close({ action: 'save', saved: true });
          },
        },
      ],
    });
  }

  /**
   * Abre un panel con múltiples botones y variantes
   * Demuestra diferentes estilos y colores de botones
   */
  openPanelWithVariedActions(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Actions con Diferentes Estilos',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel muestra diferentes variantes de botones: solid, outline y ghost',
      },
      customButtons: [
        {
          text: 'Eliminar',
          icon: 'ri-delete-bin-line',
          color: 'danger',
          variant: 'ghost',
          callback: async (panelRef) => {
            const confirmed = confirm('¿Estás seguro de eliminar?');
            if (confirmed) {
              alert('Elemento eliminado');
              panelRef.close({ action: 'delete' });
            }
          },
        },
        {
          text: 'Editar',
          icon: 'ri-edit-line',
          color: 'info',
          variant: 'outline',
          callback: (panelRef) => {
            alert('Modo edición activado');
          },
        },
        {
          text: 'Compartir',
          icon: 'ri-share-line',
          color: 'accent',
          variant: 'solid',
          callback: (panelRef) => {
            alert('Panel compartido');
            panelRef.close({ action: 'share' });
          },
        },
      ],
    });
  }

  /**
   * Abre un panel con botones de acción que cambian estado (loading)
   * Demuestra el uso de estados disabled y loading reactivos con Signals
   */
  openPanelWithLoadingActions(): void {
    // Reset del estado de loading
    this.isProcessing.set(false);

    this.currentPanelRef = this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Loading States',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel demuestra botones con estados de loading reactivos usando Angular Signals',
      },
      footerTemplate: this.loadingActionsTemplate,
    });
  }

  /**
   * Cancela la operación y cierra el panel de loading
   */
  cancelLoadingPanel(): void {
    if (this.currentPanelRef) {
      this.currentPanelRef.close({ action: 'cancel' });
    }
  }

  /**
   * Procesa la operación asíncrona con estados de loading
   */
  async processLoadingAction(): Promise<void> {
    if (this.isProcessing()) return;
    
    this.isProcessing.set(true);
    console.log('Iniciando proceso...');
    
    try {
      // Simular operación asíncrona
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isProcessing.set(false);
      alert('Proceso completado exitosamente!');
      
      if (this.currentPanelRef) {
        this.currentPanelRef.close({ action: 'process', success: true });
      }
    } catch (error) {
      this.isProcessing.set(false);
      console.error('Error en el proceso:', error);
    }
  }

  /**
   * Abre un panel con botones condicionales (disabled)
   * Demuestra el uso de botones deshabilitados según condiciones
   */
  openPanelWithConditionalActions(): void {
    let hasChanges = false;

    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Botones Condicionales',
      position: 'right',
      size: 'md',
      data: {
        message: 'Los botones del footer pueden estar deshabilitados según condiciones. Simula hacer cambios para habilitar los botones.',
      },
      customButtons: [
        {
          text: 'Descartar',
          color: 'secondary',
          variant: 'ghost',
          disabled: !hasChanges,
          callback: (panelRef) => {
            const confirmed = confirm('¿Descartar todos los cambios?');
            if (confirmed) {
              hasChanges = false;
              panelRef.close({ action: 'discard' });
            }
          },
        },
        {
          text: 'Guardar Cambios',
          icon: 'ri-save-line',
          color: 'primary',
          variant: 'solid',
          disabled: !hasChanges,
          callback: (panelRef) => {
            alert('Cambios guardados!');
            hasChanges = false;
            panelRef.close({ action: 'save', saved: true });
          },
        },
      ],
    });
  }

  /**
   * Abre un panel con footer template personalizado
   * Demuestra el uso de footerTemplate para layouts completamente custom
   */
  openPanelWithCustomFooterTemplate(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel con Footer Template Custom',
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel usa un template completamente personalizado en el footer',
      },
      footerTemplate: this.customFooterTemplate,
    });
  }

  /**
   * Abre un panel con múltiples acciones complejas
   * Demuestra un caso de uso real con validación y flujo complejo
   */
  openPanelWithComplexActions(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Formulario de Usuario',
      position: 'right',
      size: 'lg',
      data: {
        message: 'Panel con múltiples acciones y flujo de validación complejo',
        showActions: false,
      },
      customButtons: [
        {
          text: 'Restablecer',
          icon: 'ri-restart-line',
          color: 'secondary',
          variant: 'ghost',
          callback: (panelRef) => {
            const confirmed = confirm('¿Restablecer formulario a valores por defecto?');
            if (confirmed) {
              alert('Formulario restablecido');
            }
          },
        },
        {
          text: 'Vista Previa',
          icon: 'ri-eye-line',
          color: 'info',
          variant: 'outline',
          callback: (panelRef) => {
            alert('Abriendo vista previa...');
          },
        },
        {
          text: 'Guardar Borrador',
          icon: 'ri-draft-line',
          color: 'secondary',
          variant: 'solid',
          callback: async (panelRef) => {
            console.log('Guardando borrador...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Borrador guardado');
          },
        },
        {
          text: 'Publicar',
          icon: 'ri-send-plane-fill',
          color: 'success',
          variant: 'solid',
          callback: async (panelRef) => {
            const confirmed = confirm('¿Publicar cambios?');
            if (confirmed) {
              console.log('Publicando...');
              await new Promise(resolve => setTimeout(resolve, 1500));
              alert('Publicado exitosamente!');
              panelRef.close({ action: 'publish', published: true });
            }
          },
        },
      ],
    });
  }
}
