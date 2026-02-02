import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, SidebarPanelService, SidebarPanelSize, SidebarPanelPosition } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { SIDEBAR_PANEL_PAGE_CONFIG } from './sidebar-panel-page.config';
import { SidebarPanelExampleContentComponent } from './components/sidebar-panel-example-content/sidebar-panel-example-content.component';

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
        message: 'Este es un ejemplo básico del componente Sidebar Panel'
      }
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
        message: `Panel con tamaño ${sizeLabels[size]}`
      }
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
        message: `Este panel se desliza desde la ${positionLabels[position].toLowerCase()}`
      }
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
        showActions: true
      }
    });
  }

  /**
   * Abre un panel minimizable
   */
  openMinimizablePanel(): void {
    this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
      title: 'Panel Minimizable',
      minimizable: true,
      position: 'right',
      size: 'md',
      data: {
        message: 'Este panel puede minimizarse a una pestaña lateral. Haz clic en el botón "-" del header.',
        showActions: false
      }
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
        message: 'Este panel no tiene botón de cerrar en el header. Usa el botón de abajo para cerrar.',
        showCloseAction: true
      }
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
        message: 'Este panel no tiene fondo oscuro (backdrop). Puedes interactuar con el contenido detrás.'
      }
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
        message: 'Primer panel abierto desde la derecha'
      }
    });

    setTimeout(() => {
      this.sidebarPanelService.open(SidebarPanelExampleContentComponent, {
        title: 'Panel 2 (Izquierda)',
        position: 'left',
        size: 'sm',
        allowMultiple: true,
        data: {
          message: 'Segundo panel abierto desde la izquierda'
        }
      });
    }, 300);
  }

  /**
   * Cierra todos los panels
   */
  closeAllPanels(): void {
    this.sidebarPanelService.closeAll();
  }
}
