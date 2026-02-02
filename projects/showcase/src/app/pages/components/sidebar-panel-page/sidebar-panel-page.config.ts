import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Sidebar Panel
 */
export const SIDEBAR_PANEL_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.sidebar-panel.title',
  subtitle: 'components.sidebar-panel.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.sidebar-panel.basic.title',
      description: 'components.sidebar-panel.basic.description',
      anchor: 'basico',
      examples: [
        {
          title: 'components.sidebar-panel.basic.codeTitle',
          code: `// TypeScript
import { SidebarPanelService } from 'nui';

constructor(private sidebarPanelService: SidebarPanelService) {}

openPanel() {
  this.sidebarPanelService.open(MyContentComponent, {
    title: 'Mi Panel',
    position: 'right',
    size: 'md'
  });
}
`,
          language: 'typescript',
        },
        {
          title: 'components.sidebar-panel.basic.htmlCodeTitle',
          code: `<!-- HTML -->
<nui-button (click)="openPanel()">
  Abrir Panel
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.sidebar-panel.sizes.title',
      description: 'components.sidebar-panel.sizes.description',
      anchor: 'tamanos',
      examples: [
        {
          title: 'components.sidebar-panel.sizes.codeTitle',
          code: `// Tamaños predefinidos
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel XSmall',
  size: 'xs' // 300px
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Small',
  size: 'sm' // 400px
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Medium',
  size: 'md' // 600px (por defecto)
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Large',
  size: 'lg' // 800px
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel XLarge',
  size: 'xl' // 1000px
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Full',
  size: 'full' // 100%
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.sidebar-panel.positions.title',
      description: 'components.sidebar-panel.positions.description',
      anchor: 'posiciones',
      examples: [
        {
          title: 'components.sidebar-panel.positions.codeTitle',
          code: `// Panel desde la derecha (por defecto)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Derecha',
  position: 'right'
});

// Panel desde la izquierda
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Izquierda',
  position: 'left'
});

// Panel desde arriba
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Superior',
  position: 'top'
});

// Panel desde abajo
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Inferior',
  position: 'bottom'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'dynamic-component',
      title: 'components.sidebar-panel.dynamicComponent.title',
      description: 'components.sidebar-panel.dynamicComponent.description',
      anchor: 'componente-dinamico',
      examples: [
        {
          title: 'components.sidebar-panel.dynamicComponent.componentCodeTitle',
          code: `// content.component.ts
import { Component, inject } from '@angular/core';
import { SIDEBAR_PANEL_DATA, SIDEBAR_PANEL_REF } from 'nui';

@Component({
  selector: 'app-panel-content',
  template: \`
    <div>
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      <nui-button (click)="save()">Guardar</nui-button>
    </div>
  \`
})
export class PanelContentComponent {
  readonly data = inject(SIDEBAR_PANEL_DATA);
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);
  
  save() {
    console.log('Guardando datos...');
    this.panelRef.close({ saved: true });
  }
}`,
          language: 'typescript',
        },
        {
          title: 'components.sidebar-panel.dynamicComponent.usageCodeTitle',
          code: `// Abrir panel con datos inyectados
const panelRef = this.sidebarPanelService.open(PanelContentComponent, {
  title: 'Editar Información',
  data: {
    title: 'Mi título',
    description: 'Una descripción completa'
  }
});

// Recibir resultado al cerrar
panelRef.afterClosed().subscribe(result => {
  if (result?.saved) {
    console.log('Datos guardados exitosamente');
  }
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'minimizable',
      title: 'components.sidebar-panel.minimizable.title',
      description: 'components.sidebar-panel.minimizable.description',
      anchor: 'minimizable',
      examples: [
        {
          title: 'components.sidebar-panel.minimizable.codeTitle',
          code: `// Panel que puede minimizarse a una pestaña
const panelRef = this.sidebarPanelService.open(ChatComponent, {
  title: 'Chat de Soporte',
  minimizable: true,
  position: 'right',
  size: 'md'
});

// Control programático
panelRef.minimize(); // Minimizar a pestaña
panelRef.restore();  // Restaurar desde pestaña

// Verificar estado
if (panelRef.isMinimized) {
  console.log('El panel está minimizado');
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'close-button',
      title: 'components.sidebar-panel.closeButton.title',
      description: 'components.sidebar-panel.closeButton.description',
      anchor: 'boton-cerrar',
      examples: [
        {
          title: 'components.sidebar-panel.closeButton.codeTitle',
          code: `// Ocultar el botón de cerrar del header
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel sin botón cerrar',
  showCloseButton: false
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'no-backdrop',
      title: 'components.sidebar-panel.noBackdrop.title',
      description: 'components.sidebar-panel.noBackdrop.description',
      anchor: 'sin-backdrop',
      examples: [
        {
          title: 'components.sidebar-panel.noBackdrop.codeTitle',
          code: `// Panel sin fondo oscuro (backdrop)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel sin Backdrop',
  hasBackdrop: false
});

// Con backdrop pero sin cerrar al hacer click
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel',
  hasBackdrop: true,
  closeOnBackdropClick: false
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'multiple',
      title: 'components.sidebar-panel.multiple.title',
      description: 'components.sidebar-panel.multiple.description',
      anchor: 'multiples',
      examples: [
        {
          title: 'components.sidebar-panel.multiple.codeTitle',
          code: `// Abrir múltiples panels simultáneamente
this.sidebarPanelService.open(Panel1Component, {
  title: 'Panel 1',
  position: 'right',
  allowMultiple: true,
  zIndex: 1000
});

this.sidebarPanelService.open(Panel2Component, {
  title: 'Panel 2',
  position: 'left',
  allowMultiple: true,
  zIndex: 1001
});

// Cerrar todos los panels
this.sidebarPanelService.closeAll();`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.sidebar-panel.api.title',
      description: 'components.sidebar-panel.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'components.sidebar-panel.api.serviceCodeTitle',
          code: `// SidebarPanelService
class SidebarPanelService {
  // Abrir panel
  open<T, D, R>(
    component: Type<T>,
    config?: SidebarPanelConfig<D>
  ): SidebarPanelRef<T, R>
  
  // Cerrar panel específico
  close(id: string): void
  
  // Cerrar todos los panels
  closeAll(): void
  
  // Obtener panel por ID
  getPanel(id: string): SidebarPanelStackItem | undefined
  
  // Obtener todos los panels
  getAllPanels(): SidebarPanelStackItem[]
  
  // Número de panels abiertos
  get openPanelsCount(): number
}`,
          language: 'typescript',
        },
        {
          title: 'components.sidebar-panel.api.refCodeTitle',
          code: `// SidebarPanelRef
class SidebarPanelRef<T, R> {
  // Propiedades
  id: string
  componentInstance: T
  config: SidebarPanelConfig
  state: SidebarPanelState
  isOpen: boolean
  isClosed: boolean
  isMinimized: boolean
  
  // Métodos
  close(result?: R): Promise<void>
  minimize(): void
  restore(): void
  updateTitle(title: string): void
  
  // Observables
  afterOpened(): Observable<void>
  afterClosed(): Observable<R>
  backdropClick(): Observable<MouseEvent>
  keydownEvents(): Observable<KeyboardEvent>
  stateChanged(): Observable<SidebarPanelState>
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.sidebar-panel.styling.title',
      description: 'components.sidebar-panel.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.sidebar-panel.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Colores */
  --nui-slidepanel-bg: var(--nui-bg-primary);
  --nui-slidepanel-text: var(--nui-text-primary);
  --nui-slidepanel-border: var(--nui-border-primary);
  
  /* Sombras y elevación */
  --nui-slidepanel-shadow: var(--nui-shadow-lg);
  --nui-slidepanel-z-index: 1040;
  --nui-slidepanel-overlay-bg: var(--nui-overlay-bg);
  
  /* Header */
  --nui-slidepanel-header-padding: var(--spacing-md);
  --nui-slidepanel-header-bg: var(--nui-bg-secondary);
  --nui-slidepanel-title-size: var(--font-size-md);
  --nui-slidepanel-title-weight: var(--font-weight-semibold);
  
  /* Contenido */
  --nui-slidepanel-content-padding: var(--spacing-md);
  
  /* Tamaños predefinidos */
  --nui-slidepanel-size-xs: 300px;
  --nui-slidepanel-size-sm: 400px;
  --nui-slidepanel-size-md: 600px;
  --nui-slidepanel-size-lg: 800px;
  --nui-slidepanel-size-xl: 1000px;
  --nui-slidepanel-size-full: 100%;
}

// Clases personalizadas
.my-custom-panel {
  .nui-slidepanel {
    border-left: 4px solid var(--primary-color);
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
