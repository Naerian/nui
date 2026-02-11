import { ComponentSection } from "../../../../core";

/**
 * Configuración de las secciones de ejemplos del Sidebar Panel
 */
export const SIDEBAR_PANEL_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.sidebar-panel.examples.basic.title',
    description: 'components.sidebar-panel.examples.basic.description',
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
    title: 'components.sidebar-panel.examples.defaults.title',
    description: 'components.sidebar-panel.examples.defaults.description',
    anchor: 'defaults',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.defaults.note',
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
    title: 'components.sidebar-panel.examples.sizes.title',
    description: 'components.sidebar-panel.examples.sizes.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.sizes.note',
    },
    anchor: 'sizes',
    examples: [
      {
        title: 'codeExamples.typescript',
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
    title: 'components.sidebar-panel.examples.positions.title',
    description: 'components.sidebar-panel.examples.positions.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.positions.note',
    },
    anchor: 'positions',
    examples: [
      {
        title: 'codeExamples.typescript',
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
    title: 'components.sidebar-panel.examples.htmlContent.title',
    description: 'components.sidebar-panel.examples.htmlContent.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.htmlContent.note',
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
            <td>\$

{item.name}</td>
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
    title: 'components.sidebar-panel.examples.templateContent.title',
    description: 'components.sidebar-panel.examples.templateContent.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.templateContent.note',
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
    title: 'components.sidebar-panel.examples.dynamicComponent.title',
    description: 'components.sidebar-panel.examples.dynamicComponent.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.dynamicComponent.note',
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
    title: 'components.sidebar-panel.examples.events.title',
    description: 'components.sidebar-panel.examples.events.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.events.note',
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
    title: 'components.sidebar-panel.examples.minimizable.title',
    description: 'components.sidebar-panel.examples.minimizable.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.minimizable.note',
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
    title: 'components.sidebar-panel.examples.closeButton.title',
    description: 'components.sidebar-panel.examples.closeButton.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.closeButton.note',
    },
    anchor: 'close-button',
    examples: [
      {
        title: 'codeExamples.typescript',
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
    title: 'components.sidebar-panel.examples.backdrop.title',
    description: 'components.sidebar-panel.examples.backdrop.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.backdrop.note',
    },
    anchor: 'backdrop',
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
    title: 'components.sidebar-panel.examples.customBackdrop.title',
    description: 'components.sidebar-panel.examples.customBackdrop.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.customBackdrop.note',
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
    title: 'components.sidebar-panel.examples.multiple.title',
    description: 'components.sidebar-panel.examples.multiple.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.multiple.note',
    },
    anchor: 'multiple',
    examples: [
      {
        title: 'codeExamples.typescript',
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
    id: 'footer-actions',
    title: 'components.sidebar-panel.examples.footerActions.title',
    description: 'components.sidebar-panel.examples.footerActions.description',
    anchor: 'footer-actions',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.footerActions.note',
    },
    examples: [
      {
        title: 'Basic',
        code: `this.sidebarPanelService.open(MyContentComponent, {
  title: 'Panel with Footer Actions',
  position: 'right',
  size: 'md',
  customButtons: [
    {
      text: 'Cancel',
      color: 'secondary',
      variant: 'outline',
      callback: (panelRef) => {
        panelRef.close({ action: 'cancel' });
      }
    },
    {
      text: 'Save',
      icon: 'ri-save-line',
      color: 'primary',
      variant: 'solid',
      callback: (panelRef) => {
        alert('Data saved successfully!');
        panelRef.close({ action: 'save', saved: true });
      }
    }
  ]
});`,
        language: 'typescript',
      },
      {
        title: 'Variants',
        code: `this.sidebarPanelService.open(MyContentComponent, {
  title: 'Actions with Different Styles',
  customButtons: [
    {
      text: 'Delete',
      icon: 'ri-delete-bin-line',
      color: 'danger',
      variant: 'ghost',
      callback: (panelRef) => {
        if (confirm('Are you sure?')) {
          panelRef.close({ action: 'delete' });
        }
      }
    },
    {
      text: 'Edit',
      icon: 'ri-edit-line',
      color: 'info',
      variant: 'outline',
      callback: () => alert('Edit mode activated')
    },
    {
      text: 'Share',
      icon: 'ri-share-line',
      color: 'accent',
      variant: 'solid',
      callback: (panelRef) => {
        alert('Panel shared successfully!');
        panelRef.close({ action: 'share' });
      }
    }
  ]
});`,
        language: 'typescript',
      },
      {
        title: 'Loading States',
        code: `<!-- Template con loading states reactivos -->
<ng-template #loadingActionsTemplate>
  <div style="
    display: flex;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    justify-content: flex-end;
    border-top: 1px solid var(--nui-divider);
  ">
    <nui-button
      [color]="'secondary'"
      [variant]="'outline'"
      [disabled]="isProcessing()"
      (click)="cancelPanel()">
      Cancelar
    </nui-button>
    <nui-button
      [color]="'primary'"
      [icon]="'ri-refresh-line'"
      [disabled]="isProcessing()"
      [loading]="isProcessing()"
      (click)="processAction()">
      Procesar
    </nui-button>
  </div>
</ng-template>
          

// In the component class
import { Component, ViewChild, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html'
})
export class MyComponent {
  @ViewChild('loadingActionsTemplate') loadingActionsTemplate!: TemplateRef<any>;

  // Signal to control the loading state (instance property)
  isProcessing = signal(false);
  currentPanelRef: any = null;

  openPanelWithLoadingActions() {
    // Reset the state when opening the panel
    this.isProcessing.set(false);

    this.currentPanelRef = this.sidebarPanelService.open(MyContentComponent, {
      title: 'Panel with Loading States',
      position: 'right',
      size: 'md',
      footerTemplate: this.loadingActionsTemplate
    });
  }

  cancelPanel() {
    if (this.currentPanelRef) {
      this.currentPanelRef.close({ action: 'cancel' });
    }
  }

  async processAction() {
    if (this.isProcessing()) return;
    
    this.isProcessing.set(true);
    
    try {
      // Simulate asynchronous operation (API call, etc)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isProcessing.set(false);
      alert('Process completed!');
      
      if (this.currentPanelRef) {
        this.currentPanelRef.close({ action: 'process', success: true });
      }
    } catch (error) {
      this.isProcessing.set(false);
      console.error('Error:', error);
    }
  }
}`,
        language: 'typescript',
      },
      {
        title: 'Conditionals',
        code: `openPanel() {
  let hasChanges = false;

  this.sidebarPanelService.open(MyContentComponent, {
    title: 'Panel with Conditional Buttons',
    customButtons: [
      {
        text: 'Discard',
        color: 'secondary',
        variant: 'ghost',
        disabled: !hasChanges,
        callback: (panelRef) => {
          if (confirm('Discard changes?')) {
            hasChanges = false;
            panelRef.close({ action: 'discard' });
          }
        }
      },
      {
        text: 'Save Changes',
        icon: 'ri-save-line',
        color: 'primary',
        variant: 'solid',
        disabled: !hasChanges,
        callback: (panelRef) => {
          alert('Changes saved!');
          hasChanges = false;
          panelRef.close({ action: 'save', saved: true });
        }
      }
    ]
  });
}`,
        language: 'typescript',
      },
      {
        title: 'Template',
        code: `@ViewChild('customFooterTemplate') customFooterTemplate!: TemplateRef<any>;

openPanel() {
  this.sidebarPanelService.open(MyContentComponent, {
    title: 'Panel with Custom Footer Template',
    footerTemplate: this.customFooterTemplate
  });
}

// In the template:
<ng-template #customFooterTemplate>
  <div style="padding: 1rem; background: var(--nui-surface-variant);">
    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <nui-button [color]="'secondary'" [variant]="'ghost'">Cancel</nui-button>
      <nui-button [color]="'success'" [icon]="'ri-check-line'">Confirm</nui-button>
    </div>
  </div>
</ng-template>`,
        language: 'typescript',
      },
      {
        title: 'Advanced',
        code: `this.sidebarPanelService.open(MyFormComponent, {
  title: 'User Form',
  position: 'right',
  size: 'lg',
  customButtons: [
    {
      text: 'Reset Form',
      icon: 'ri-restart-line',
      color: 'secondary',
      variant: 'ghost',
      callback: (panelRef) => {
        if (confirm('Reset form?')) {
          alert('Form reset successfully!');
        }
      }
    },
    {
      text: 'Preview',
      icon: 'ri-eye-line',
      color: 'info',
      variant: 'outline',
      callback: () => alert('Opening preview...')
    },
    {
      text: 'Save Draft',
      icon: 'ri-draft-line',
      color: 'secondary',
      variant: 'solid',
      callback: async (panelRef) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Draft saved successfully!');
      }
    },
    {
      text: 'Publish',
      icon: 'ri-send-plane-fill',
      color: 'success',
      variant: 'solid',
      callback: async (panelRef) => {
        if (confirm('Publish changes?')) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          alert('Published successfully!');
          panelRef.close({ action: 'publish', published: true });
        }
      }
    }
  ]
});`,
        language: 'typescript',
      },
    ],
  },
];
