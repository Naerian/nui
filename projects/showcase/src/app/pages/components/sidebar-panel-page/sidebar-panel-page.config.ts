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
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `openPanel() {
  this.sidebarPanelService.open(MyContentComponent, {
    title: 'My Panel',
    position: 'right',
    size: 'md'
  });
}
`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.html',
          code: `<nui-button (click)="openPanel()">
  Open Panel
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'defaults',
      title: 'components.sidebar-panel.default.title',
      description: 'components.sidebar-panel.default.description',
      anchor: 'defaults',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.default.note',
      },
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Default NUI Configuration for Sidebar Panels
export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      sidebarPanel: {
        position: 'left',        // All panels will open to the left
        size: 'lg',              // All will be large by default
        animationDuration: 300,  // Slower animation
        mobileFullScreen: true   // Fullscreen on mobile
      }
    })
  ]
};

// Using the global defaults when opening a panel
openPanel() {
  this.sidebarPanelService.open(MyContentComponent, {
    title: 'Sample Panel'
    // No need to specify position, size, etc. Will use global defaults
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
      note: {
        type: 'info',
        content: 'components.sidebar-panel.sizes.note',
      },
      anchor: 'sizes',
      examples: [
        {
          title: 'components.sidebar-panel.sizes.codeTitle',
          code: `// Predefined sizes (XS: 300px)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel XSmall',
  size: 'xs'
});

// Predefined sizes (SM: 400px)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Small',
  size: 'sm'
});

// Predefined sizes (MD: 600px - Default)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Medium',
  size: 'md'
});

// Predefined sizes (LG: 800px)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Large',
  size: 'lg'
});

// Predefined sizes (XL: 1000px)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel XLarge',
  size: 'xl'
});

// Predefined sizes (FULL: 100%)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Full',
  size: 'full'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.sidebar-panel.positions.title',
      description: 'components.sidebar-panel.positions.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.positions.note',
      },
      anchor: 'positions',
      examples: [
        {
          title: 'components.sidebar-panel.positions.codeTitle',
          code: `// Panel from the right edge (default)
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Right',
  position: 'right'
});

// Panel from the left edge
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Left',
  position: 'left'
});

// Panel from the top edge
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Top',
  position: 'top'
});

// Panel from the bottom edge
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel Bottom',
  position: 'bottom'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'html-content',
      title: 'components.sidebar-panel.htmlContent.title',
      description: 'components.sidebar-panel.htmlContent.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.htmlContent.note',
      },
      anchor: 'html-content',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Simple HTML notification
openHtmlNotification() {
  this.sidebarPanelService.open({
    title: 'Operation Successful',
    position: 'right',
    size: 'sm',
    htmlContent: \`
      <div style="padding: 1rem;">
        <h3>Success!</h3>
        <p>Your changes have been saved.</p>
      </div>
    \`
  });
}

// Dynamic HTML generation
openDynamicReport() {
  const items = [
    { id: 1, name: 'Task Alpha', status: 'Completed' },
    { id: 2, name: 'Task Beta', status: 'In Progress' }
  ];

  const htmlContent = \`
    <div style="padding: 1rem;">
      <h3>Task Report</h3>
      <table>
        \${items.map(item => \`
          <tr>
            <td>\${item.id}</td>
            <td>\${item.name}</td>
            <td>\${item.status}</td>
          </tr>
        \`).join('')}
      </table>
    </div>
  \`;

  this.sidebarPanelService.open({
    title: 'Task Report',
    position: 'right',
    size: 'lg',
    htmlContent
  });
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'template-content',
      title: 'components.sidebar-panel.templateContent.title',
      description: 'components.sidebar-panel.templateContent.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.templateContent.note',
      },
      anchor: 'template-content',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: \`
    <!-- Template definition -->
    <ng-template #userDetailsTemplate 
      let-user="user" 
      let-onRefresh="onRefresh"
      let-onLogout="onLogout">
      <div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button (click)="onRefresh()">Refresh</button>
        <button (click)="onLogout()">Logout</button>
      </div>
    </ng-template>

    <button (click)="openPanel()">Open Panel</button>
  \`
})
export class MyComponent {
  @ViewChild('userDetailsTemplate') 
  userDetailsTemplate!: TemplateRef<any>;

  currentUser = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  openPanel() {
    this.sidebarPanelService.open({
      title: 'User Profile',
      position: 'right',
      size: 'md',
      contentTemplate: this.userDetailsTemplate,
      templateContext: {
        user: this.currentUser,
        onRefresh: () => this.refreshUser(),
        onLogout: () => this.logout()
      }
    });
  }

  refreshUser() {
    console.log('Refreshing user data...');
  }

  logout() {
    console.log('Logging out...');
  }
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.html',
          code: `<!-- Template with context variables -->
<ng-template #myTemplate 
  let-data="data" 
  let-onSave="onSave"
  let-onCancel="onCancel">
  <div class="template-content">
    <p>{{ data.message }}</p>
    <button (click)="onSave(data)">Save</button>
    <button (click)="onCancel()">Cancel</button>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'dynamic-component',
      title: 'components.sidebar-panel.dynamicComponent.title',
      description: 'components.sidebar-panel.dynamicComponent.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.dynamicComponent.note',
      },
      anchor: 'dynamic-component',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Open panel with injected data
const panelRef = this.sidebarPanelService.open(PanelContentComponent, {
  title: 'Edit Information',
  data: {
    title: 'My Title',
    description: 'A full description of the content goes here.'
  }
});

// Receive result on close
panelRef.afterClosed().subscribe(result => {
  if (result?.saved) {
    console.log('Data saved successfully');
  }
});`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.child',
          code: `import { Component, inject } from '@angular/core';
import { SIDEBAR_PANEL_DATA, SIDEBAR_PANEL_REF } from 'nui';

@Component({
  selector: 'app-panel-content',
  template: \`
    <div>
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      <nui-button (click)="save()">Save</nui-button>
    </div>
  \`
})
export class PanelContentComponent {

  // Injected data and panel reference
  readonly data = inject(SIDEBAR_PANEL_DATA);
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);
  
  save() {
    console.log('Saving data...');
    this.panelRef.close({ saved: true });
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'dynamic-component-events',
      title: 'components.sidebar-panel.events.title',
      description: 'components.sidebar-panel.events.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.events.note',
      },
      anchor: 'dynamic-component-events',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `openPanelWithEvents() {

  // Open panel with dynamic component inside
  const panelRef = this.sidebarPanelService.open(EventExampleComponent, {
    title: 'Panel with Events',
    position: 'right',
    size: 'md'
  });

  // Get instance of the dynamic component
  const instance = panelRef.componentInstance;

  if (instance) {

    // Subscribe to @Output() event "dataChanged"
    instance.dataChanged.subscribe((data) => {
      console.log('Data changed:', data);
      alert(\`New value: \${data.value}\`);
    });

    // Subscribe to @Output() event "statusChanged"
    instance.statusChanged.subscribe((status) => {
      console.log('Status:', status);
    });

    // Subscribe to @Output() event "beforeClose"
    instance.beforeClose.subscribe((result) => {
      console.log('Before close with:', result);
    });
  }

  // Capture final result on close
  panelRef.afterClosed().subscribe((result) => {
    console.log('Panel closed. Result:', result);
  });
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.child',
          code: `import { Component, EventEmitter, Output, inject } from '@angular/core';
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
        Emit Data Changed
      </button>
      
      <button (click)="closeWithResult()">
        Close Panel with Result
      </button>
    </div>
  \`
})
export class EventExampleComponent {
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);

  // Ouputs events to emit to parent
  @Output() dataChanged = new EventEmitter<DataPayload>();
  @Output() statusChanged = new EventEmitter<string>();
  @Output() beforeClose = new EventEmitter<any>();

  // Emit data changed event
  emitDataChanged(): void {
    this.dataChanged.emit({
      value: 'New data',
      timestamp: new Date()
    });
  }

  // Emit before close event and close panel with result
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
          title: 'codeExamples.typescript',
          code: `// Open a minimizable sidebar panel
const panelRef = this.sidebarPanelService.open(ChatComponent, {
  title: 'Support Chat',
  id: 'support-chat-panel',
  minimizable: true,
  position: 'right',
  size: 'md'
});

// Programmatically minimize and restore (optional)
panelRef.minimize(); // Minimize to tab
panelRef.restore();  // Restore from tab

// Check if panel is minimized
if (panelRef.isMinimized) {
  console.log('The panel is minimized');
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.typescript',
          code: `// Open a minimizable sidebar panel
this.sidebarPanelService.open(ChatComponent, {
  title: 'Support Chat',
  id: 'chat-support',
  minimizable: true,
  position: 'right',
  size: 'md',
  minimizedTabCustomization: {
    icon: 'ri-customer-service-line',  // Custom icon
    label: 'Support',                  // Button text
    cssClass: 'floating-chat-button',  // Custom CSS class
    standalone: true  // Allows free positioning (bottom-right)
  }
});

// Without standalone (grouped at the edge)
this.sidebarPanelService.open(NotificationsComponent, {
  id: 'notifications',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-notification-3-line',
    label: 'Notifications'
    // Without standalone: grouped with other tabs at the edge
  }
});`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.scss',
          code: `// Custom floating button CSS styles
::ng-deep .floating-chat-button {
  // Floating position at bottom right corner
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  
  // Dimensions and padding
  width: auto !important;
  height: auto !important;
  padding: 14px 20px !important;
  
  // Rounded style (pill)
  border-radius: 50px !important;
  
  // Elevated shadow
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  
  // Colors
  background: var(--nui-color-primary) !important;
  color: white !important;
  
  // Hover effects
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
      note: {
        type: 'info',
        content: 'components.sidebar-panel.closeButton.note',
      },
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
      id: 'backdrop',
      title: 'components.sidebar-panel.noBackdrop.title',
      description: 'components.sidebar-panel.noBackdrop.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.noBackdrop.note',
      },
      anchor: 'sbackdrop',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel without Backdrop',
  hasBackdrop: false
});

this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel with Backdrop but No Close on Click',
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
      note: {
        type: 'info',
        content: 'components.sidebar-panel.customBackdrop.note',
      },
      anchor: 'custom-backdrop',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Adding a custom class to the backdrop
this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel with Custom Backdrop',
  backdropClass: 'custom-backdrop-blur'
});

// Adding multiple classes to backdrop
this.sidebarPanelService.open(MyContentComponent, {
  backdropClass: ['custom-backdrop', 'with-animation']
});`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.scss',
          code: `::ng-deep .custom-backdrop-blur {
  backdrop-filter: blur(8px);
  background-color: rgba(59, 130, 246, 0.25) !important;
  transition: opacity 300ms ease-in-out;
}`,
          language: 'scss',
        },
      ],
    },
    {
      id: 'multiple',
      title: 'components.sidebar-panel.multiple.title',
      description: 'components.sidebar-panel.multiple.description',
      note: {
        type: 'info',
        content: 'components.sidebar-panel.multiple.note',
      },
      anchor: 'multiple',
      examples: [
        {
          title: 'components.sidebar-panel.multiple.codeTitle',
          code: `this.sidebarPanelService.open(Panel1Component, {
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

// Close all open panels
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
          title: 'codeExamples.serviceCode',
          code: `class SidebarPanelService {
  // Open panel with dynamic component
  open<T, D, R>(
    component: Type<T>,
    config?: SidebarPanelConfig<D>
  ): SidebarPanelRef<T, R>
  
  // Close specific panel
  close(id: string): void
  
  // Close all panels
  closeAll(): void
  
  // Get panel by ID
  getPanel(id: string): SidebarPanelStackItem | undefined
  
  // Get all panels
  getAllPanels(): SidebarPanelStackItem[]
  
  // Number of open panels
  get openPanelsCount(): number
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.refCode',
          code: `class SidebarPanelRef<T, R> {
  // Properties
  id: string
  componentInstance: T
  config: SidebarPanelConfig
  state: SidebarPanelState
  isOpen: boolean
  isClosed: boolean
  isMinimized: boolean
  
  // Methods
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
        {
          title: 'codeExamples.interfacesCode',
          code: `// Base configuration for a sidebar panel
interface SidebarPanelConfigBase<D = any> {
  position?: SidebarPanelPosition;     // Panel screen position
  size?: SidebarPanelSize;             // Preset panel size

  width?: string;                      // Custom width (left/right)
  height?: string;                     // Custom height (top/bottom)

  maxWidth?: string;                   // Max panel width
  maxHeight?: string;                  // Max panel height

  data?: D;                            // Data passed to component

  title?: string;                     // Panel title (header)
  showHeader?: boolean;                // Show header
  showCloseButton?: boolean;           // Show close button

  headerTemplate?: TemplateRef<any>;   // Custom header template
  footerTemplate?: TemplateRef<any>;   // Custom footer template

  hasBackdrop?: boolean;               // Show backdrop
  backdropClass?: string | string[];   // Backdrop CSS class

  closeOnBackdropClick?: boolean;      // Close on backdrop click
  closeOnEscape?: boolean;             // Close on Escape key
  closeOnRouteChange?: boolean;        // Close on route change

  preventClose?: () => boolean | Promise<boolean>; // Guard before close

  autoFocus?: boolean | string;        // Auto-focus behavior

  mobileFullScreen?: boolean;          // Fullscreen on mobile
  breakpoint?: number;                 // Mobile breakpoint (px)

  panelClass?: string | string[];      // Extra panel CSS class

  scrollStrategy?: ScrollStrategy;     // Body scroll strategy

  ariaLabel?: string;                  // ARIA label
  ariaDescribedBy?: string;            // ARIA describedBy ID

  animationDuration?: number;          // Animation duration (ms)
  zIndex?: number;                     // Base z-index

  allowMultiple?: boolean;             // Allow multiple panels
  lazyLoad?: boolean;                  // Lazy load content

  customButtons?: SidebarPanelCustomButton[]; // Custom footer buttons

  minimizedTabCustomization?: MinimizedTabCustomization; // Minimized tab UI
}

// Custom button configuration for sidebar panel
export interface SidebarPanelCustomButton {
  text: string;                         // Button label
  icon?: string;                         // Optional icon (Remix Icon)
  color?: NUIColor;                      // Button color/type
  variant?: NUIVariant;                  // Button variant/style
  size?: NUISize;                        // Button size
  callback: (panelRef: any) => void | Promise<void>; // Click handler
  disabled?: boolean;                    // Disabled state
  loading?: boolean;                     // Show loading spinner
  class?: string;                        // Extra CSS classes
}

// Visual customization for minimized panel tab
export interface MinimizedTabCustomization {
  icon?: string;                       // Custom tab icon (Remix Icon)
  label?: string;                      // Custom tab label
  cssClass?: string | string[];        // Extra tab CSS classes
  template?: TemplateRef<any>;         // Fully custom tab template
  standalone?: boolean;                // Render tab outside grouped container
}
  
// Sidebar panel lifecycle events
export interface SidebarPanelEvents {
  afterOpened: Observable<void>;        // Emitted after panel is fully opened
  afterClosed: Observable<any>;         // Emitted after panel is fully closed
  backdropClick: Observable<MouseEvent>; // Emitted on backdrop click
  keydownEvents: Observable<KeyboardEvent>; // Emitted on keydown inside panel
  closePrevented: Observable<void>;     // Emitted when close is prevented
}
`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.sidebar-panel.styling.title',
      description: 'components.sidebar-panel.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.variablesCss',
          code: `:root {
  /* Colors */
  --nui-sidebar-panel-bg: var(--nui-bg-primary);
  --nui-sidebar-panel-text: var(--nui-text-primary);
  --nui-sidebar-panel-border: var(--nui-border-primary);
  
  /* Shadows and elevation */
  --nui-sidebar-panel-shadow: var(--nui-shadow-lg);
  --nui-sidebar-panel-z-index: 1040;
  --nui-sidebar-panel-overlay-bg: var(--nui-overlay-bg);
  
  /* Header */
  --nui-sidebar-panel-header-padding: var(--spacing-md);
  --nui-sidebar-panel-header-bg: var(--nui-bg-secondary);
  --nui-sidebar-panel-title-size: var(--font-size-md);
  --nui-sidebar-panel-title-weight: var(--font-weight-semibold);
  
  /* Content */
  --nui-sidebar-panel-content-padding: var(--spacing-md);
  
  /* Predefined sizes */
  --nui-sidebar-panel-size-xs: 300px;
  --nui-sidebar-panel-size-sm: 400px;
  --nui-sidebar-panel-size-md: 600px;
  --nui-sidebar-panel-size-lg: 800px;
  --nui-sidebar-panel-size-xl: 1000px;
  --nui-sidebar-panel-size-full: 100%;
}

// Custom classes
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
