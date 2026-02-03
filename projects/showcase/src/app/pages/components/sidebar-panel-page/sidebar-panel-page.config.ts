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
      id: 'defaults',
      title: 'Configuración por Defecto',
      description:
        'Prueba el panel usando SOLO valores por defecto de la configuración global. Ideal para verificar que los cambios en provideNUIConfig() se aplican correctamente.',
      anchor: 'defaults',
      note: {
        type: 'info',
        content:
          'Este panel no recibe configuración específica, por lo que usa los valores definidos en <code>provideNUIConfig({ sidebarPanel: {...} })</code> en <code>app.config.ts</code>. Si no hay configuración global, usa los defaults del componente.',
      },
      examples: [
        {
          title: 'TypeScript - Panel con Defaults',
          code: `// app.config.ts - Configurar defaults globales
import { provideNUIConfig } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      sidebarPanel: {
        position: 'left',        // ← Todos los panels se abrirán a la izquierda
        size: 'lg',              // ← Todos serán grandes por defecto
        animationDuration: 300,  // ← Animación más lenta
        mobileFullScreen: true   // ← Fullscreen en mobile
      }
    })
  ]
};

// component.ts - Abrir panel SIN config específica
openPanel() {
  this.sidebarPanelService.open(MyContentComponent, {
    title: 'Panel con Defaults'
    // No pasamos position, size, etc. → usa globals
  });
}`,
          language: 'typescript',
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
      note: {
        type: 'info',
        content: 'components.sidebar-panel.minimizable.note',
      },
      anchor: 'minimizable',
      examples: [
        {
          title: 'components.sidebar-panel.minimizable.codeTitle',
          code: `// Panel que puede minimizarse a una pestaña
const panelRef = this.sidebarPanelService.open(ChatComponent, {
  title: 'Chat de Soporte',
  id: 'support-chat-panel',
  minimizable: true,
  position: 'right',
  size: 'md'
});

// Control programático (opcional)
panelRef.minimize(); // Minimizar a pestaña
panelRef.restore();  // Restaurar desde pestaña

// Verificar estado (opcional)
if (panelRef.isMinimized) {
  console.log('El panel está minimizado');
}`,
          language: 'typescript',
        },
        {
          title: 'components.sidebar-panel.minimizable.customizationCodeTitle',
          code: `// Pestaña minimizada con customización completa
this.sidebarPanelService.open(ChatComponent, {
  title: 'Chat de Soporte',
  id: 'chat-support',
  minimizable: true,
  position: 'right',
  size: 'md',
  minimizedTabCustomization: {
    icon: 'ri-customer-service-line',  // Icono personalizado
    label: 'Soporte',                  // Texto del botón
    cssClass: 'floating-chat-button',  // Clase CSS custom
    standalone: true  // 🔑 Permite posicionamiento libre (bottom-right)
  }
});

// Sin standalone (agrupada en el borde)
this.sidebarPanelService.open(NotificationsComponent, {
  id: 'notifications',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-notification-3-line',
    label: 'Notificaciones'
    // Sin standalone: se agrupa con otras pestañas en el borde
  }
});`,
          language: 'typescript',
        },
        {
          title: 'components.sidebar-panel.minimizable.cssCodeTitle',
          code: `// Estilos CSS para botón flotante personalizado
::ng-deep .floating-chat-button {
  // Posición flotante en esquina inferior derecha
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  
  // Dimensiones y padding
  width: auto !important;
  height: auto !important;
  padding: 14px 20px !important;
  
  // Estilo redondeado (píldora)
  border-radius: 50px !important;
  
  // Sombra elevada
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  
  // Colores
  background: var(--nui-color-primary) !important;
  color: white !important;
  
  // Efectos hover
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
  }
}`,
          language: 'scss',
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
      id: 'custom-backdrop',
      title: 'components.sidebar-panel.customBackdrop.title',
      description: 'components.sidebar-panel.customBackdrop.description',
      anchor: 'backdrop-personalizado',
      examples: [
        {
          title: 'components.sidebar-panel.customBackdrop.codeTitle',
          code: `// Backdrop personalizado con clase CSS custom
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel con Backdrop Custom',
  backdropClass: 'custom-backdrop-blur'
});

// CSS para el backdrop personalizado
::ng-deep .custom-backdrop-blur {
  backdrop-filter: blur(8px);
  background-color: rgba(59, 130, 246, 0.25) !important;
  transition: opacity 300ms ease-in-out;
}

// También puedes usar múltiples clases
this.sidebarPanelService.open(MyContentComponent, {
  backdropClass: ['custom-backdrop', 'with-animation']
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
      id: 'events',
      title: 'Comunicación con Eventos',
      description:
        'Demuestra cómo capturar eventos @Output() emitidos desde un componente dinámico cargado dentro del panel. Los eventos se capturan a través de panelRef.componentInstance.',
      anchor: 'eventos',
      note: {
        type: 'info',
        content:
          'Los eventos @Output() del componente dinámico funcionan exactamente igual que en cualquier componente Angular. Accede a ellos mediante <code>panelRef.componentInstance</code>.',
      },
      examples: [
        {
          title: 'TypeScript - Captura de Eventos',
          code: `// Abrir panel con componente que emite eventos
openPanelWithEvents() {
  const panelRef = this.sidebarPanelService.open(EventExampleComponent, {
    title: 'Panel con Eventos',
    position: 'right',
    size: 'md'
  });

  // Obtener instancia del componente dinámico
  const instance = panelRef.componentInstance;

  if (instance) {
    // Suscribirse a eventos @Output()
    instance.dataChanged.subscribe((data) => {
      console.log('Datos cambiados:', data);
      alert(\`Nuevo valor: \${data.value}\`);
    });

    instance.statusChanged.subscribe((status) => {
      console.log('Estado:', status);
    });

    instance.beforeClose.subscribe((result) => {
      console.log('Se va a cerrar con:', result);
    });
  }

  // Capturar resultado final al cerrar
  panelRef.afterClosed().subscribe((result) => {
    console.log('Panel cerrado. Resultado:', result);
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Componente Dinámico - Definir Eventos',
          code: `// event-example.component.ts
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SIDEBAR_PANEL_REF } from 'nui';

interface DataPayload {
  value: string;
  timestamp: Date;
}

@Component({
  selector: 'app-event-example',
  template: \`
    <div>
      <button (click)="emitDataChanged()">
        Emitir Evento
      </button>
      
      <button (click)="closeWithResult()">
        Cerrar Panel
      </button>
    </div>
  \`
})
export class EventExampleComponent {
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);

  // Definir eventos @Output()
  @Output() dataChanged = new EventEmitter<DataPayload>();
  @Output() statusChanged = new EventEmitter<string>();
  @Output() beforeClose = new EventEmitter<any>();

  emitDataChanged(): void {
    this.dataChanged.emit({
      value: 'New data',
      timestamp: new Date()
    });
  }

  closeWithResult(): void {
    this.beforeClose.emit({ action: 'saved' });
    this.panelRef.close({ success: true });
  }
}`,
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
  --nui-sidebar-panel-bg: var(--nui-bg-primary);
  --nui-sidebar-panel-text: var(--nui-text-primary);
  --nui-sidebar-panel-border: var(--nui-border-primary);
  
  /* Sombras y elevación */
  --nui-sidebar-panel-shadow: var(--nui-shadow-lg);
  --nui-sidebar-panel-z-index: 1040;
  --nui-sidebar-panel-overlay-bg: var(--nui-overlay-bg);
  
  /* Header */
  --nui-sidebar-panel-header-padding: var(--spacing-md);
  --nui-sidebar-panel-header-bg: var(--nui-bg-secondary);
  --nui-sidebar-panel-title-size: var(--font-size-md);
  --nui-sidebar-panel-title-weight: var(--font-weight-semibold);
  
  /* Contenido */
  --nui-sidebar-panel-content-padding: var(--spacing-md);
  
  /* Tamaños predefinidos */
  --nui-sidebar-panel-size-xs: 300px;
  --nui-sidebar-panel-size-sm: 400px;
  --nui-sidebar-panel-size-md: 600px;
  --nui-sidebar-panel-size-lg: 800px;
  --nui-sidebar-panel-size-xl: 1000px;
  --nui-sidebar-panel-size-full: 100%;
}

// Clases personalizadas
.my-custom-panel {
  .nui-sidebar-panel {
    border-left: 4px solid var(--primary-color);
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
