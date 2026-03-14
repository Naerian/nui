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
    title: 'components.sidebar-panel.examples.html-content.title',
    description: 'components.sidebar-panel.examples.html-content.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.html-content.note',
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
    title: 'components.sidebar-panel.examples.template-content.title',
    description: 'components.sidebar-panel.examples.template-content.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.template-content.note',
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
    title: 'components.sidebar-panel.examples.dynamic-component.title',
    description: 'components.sidebar-panel.examples.dynamic-component.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.dynamic-component.note',
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
    title: 'components.sidebar-panel.examples.dynamic-component-events.title',
    description: 'components.sidebar-panel.examples.dynamic-component-events.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.dynamic-component-events.note',
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
    title: 'components.sidebar-panel.examples.close-button.title',
    description: 'components.sidebar-panel.examples.close-button.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.close-button.note',
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
    title: 'components.sidebar-panel.examples.custom-backdrop.title',
    description: 'components.sidebar-panel.examples.custom-backdrop.description',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.custom-backdrop.note',
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
    title: 'components.sidebar-panel.examples.footer-actions.title',
    description: 'components.sidebar-panel.examples.footer-actions.description',
    anchor: 'footer-actions',
    note: {
      type: 'info',
      content: 'components.sidebar-panel.examples.footer-actions.note',
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
      prefixIcon: 'ri-save-line',
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
      prefixIcon: 'ri-delete-bin-line',
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
      prefixIcon: 'ri-edit-line',
      color: 'info',
      variant: 'outline',
      callback: () => alert('Edit mode activated')
    },
    {
      text: 'Share',
      prefixIcon: 'ri-share-line',
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
        code: `// HTML Template:
// <ng-template #loadingActionsTemplate>
//   <div>
//     <nui-button
//       [color]="'secondary'"
//       [variant]="'outline'"
//       [disabled]="isProcessing()"
//       (click)="cancelPanel()">
//       Cancel
//     </nui-button>
//     <nui-button
//       [color]="'primary'"
//       [prefixIcon]="'ri-refresh-line'"
//       [disabled]="isProcessing()"
//       [loading]="isProcessing()"
//       (click)="processAction()">
//       Process
//     </nui-button>
//   </div>
// </ng-template>
          

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
        prefixIcon: 'ri-save-line',
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
        title: 'Template (nuiSidebarPanelFooter)',
        code: `// Inside a dynamic component loaded by SidebarPanelService:
// The directive registers the template into the panel footer automatically.

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarPanelFooterDirective, ButtonComponent],
  template: \`
    <form [formGroup]="form">
      <input formControlName="name" placeholder="Name" />
    </form>

    <ng-template nuiSidebarPanelFooter>
      <div style="display:flex; gap:8px; justify-content:flex-end">
        <nui-button color="secondary" variant="outline" (click)="cancel()">
          Cancel
        </nui-button>
        <nui-button color="primary" [disabled]="form.invalid" (click)="save()">
          Save
        </nui-button>
      </div>
    </ng-template>
  \`,
})
export class MyFormComponent {
  private readonly panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);

  form = inject(FormBuilder).group({
    name: ['', Validators.required],
  });

  cancel() { this.panelRef.close({ confirmed: false }); }
  save()   { this.panelRef.close({ confirmed: true, data: this.form.value }); }
}`,
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
      prefixIcon: 'ri-restart-line',
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
      prefixIcon: 'ri-eye-line',
      color: 'info',
      variant: 'outline',
      callback: () => alert('Opening preview...')
    },
    {
      text: 'Save Draft',
      prefixIcon: 'ri-draft-line',
      color: 'secondary',
      variant: 'solid',
      callback: async (panelRef) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Draft saved successfully!');
      }
    },
    {
      text: 'Publish',
      prefixIcon: 'ri-send-plane-fill',
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
  {
    id: 'child-footer-actions',
    title: 'components.sidebar-panel.examples.child-footer-actions.title',
    description: 'components.sidebar-panel.examples.child-footer-actions.description',
    anchor: 'child-footer-actions',
    note: {
      type: 'info',
      icon: 'ri-lightbulb-line',
      content: 'components.sidebar-panel.examples.child-footer-actions.note',
    },
    note2: {
      type: 'info',
      icon: 'ri-lightbulb-flash-line',
      content: 'components.sidebar-panel.examples.child-footer-actions.note2',
    },
    examples: [

      {
        title: 'Child Component',
        code: `import { Component, inject, OnInit, signal, effect, computed, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SIDEBAR_PANEL_REF, SIDEBAR_PANEL_DATA, SidebarPanelActionsService } from 'nui';

@Component({
  selector: 'app-user-form-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (submit)="save()">
      <input formControlName="name" placeholder="Nombre" />
      <input formControlName="email" placeholder="Email" />
      @if (isLoading()) { <span>Guardando...</span> }
    </form>
  \`
})
export class UserFormExampleComponent implements OnInit {
  private actions = inject(SidebarPanelActionsService);
  private panelRef = inject(SIDEBAR_PANEL_REF);
  private data = inject(SIDEBAR_PANEL_DATA);
  
  form = inject(FormBuilder).group({
    name: [this.data?.name || '', Validators.required],
    email: [this.data?.email || '', [Validators.required, Validators.email]]
  });

  isLoading = signal(false);

  // Convertimos estados de Angular Forms a Signals para el effect
  private isInvalid = toSignal(this.form.statusChanges.pipe(map(s => s === 'INVALID')), { initialValue: this.form.invalid });
  private isPristine = toSignal(this.form.valueChanges.pipe(map(() => this.form.pristine)), { initialValue: true });

  constructor() {
    effect(() => {
      const loading = this.isLoading();
      const invalid = this.isInvalid();
      const pristine = this.isPristine();

      untracked(() => {
        this.actions.update(0, { disabled: loading }); // Cancelar
        this.actions.update(1, { disabled: pristine || loading }); // Resetear
        this.actions.update(2, { disabled: invalid || loading, loading }); // Guardar
      });
    });
  }

  ngOnInit() {
    this.actions.register([
      { label: 'Cancelar', handler: () => this.panelRef.close() },
      { label: 'Resetear', handler: () => this.form.reset() },
      { label: 'Guardar', variant: 'solid', color: 'primary', handler: () => this.save() }
    ]);
  }

  async save() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    // Lógica de guardado...
    this.panelRef.close({ saved: true, data: this.form.value });
  }
}`,
        language: 'typescript',
      },
      {
        title: 'Parent Component',
        code: `// Abrir el panel (el hijo define los botones)
const panelRef = this.sidebarPanelService.open(UserFormComponent, {
  title: 'Editar Usuario',
  position: 'right',
  size: 'md',
  data: {
    name: 'Juan',
    email: 'juan@example.com'
  }
});

// Escuchar el resultado
panelRef.afterClosed().subscribe(result => {
  if (result?.saved) {
    console.log('Usuario guardado:', result.data);
    this.refreshUserList();
  }
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'prevent-close',
    title: 'components.sidebar-panel.examples.prevent-close.title',
    description: 'components.sidebar-panel.examples.prevent-close.description',
    anchor: 'prevent-close',
    note: {
      type: 'info',
      icon: 'ri-shield-check-line',
      content: 'components.sidebar-panel.examples.prevent-close.note',
    },
    examples: [
      {
        title: 'Basic — always block',
        code: `// Block ALL close attempts (backdrop, ESC, close button)
const panelRef = this.sidebarPanelService.open(EditFormComponent, {
  title: 'Unsaved Changes',
  preventClose: () => false,
});`,
        language: 'typescript',
      },
      {
        title: 'Conditional — confirm dialog',
        code: `let hasUnsavedChanges = false;

const panelRef = this.sidebarPanelService.open(EditFormComponent, {
  title: 'Edit Record',
  preventClose: () => {
    if (!hasUnsavedChanges) return true; // No changes → allow close
    return confirm('You have unsaved changes. Discard them?');
  },
  customButtons: [
    {
      text: 'Mark as dirty',
      color: 'secondary', variant: 'outline',
      callback: () => { hasUnsavedChanges = true; }
    },
    {
      text: 'Save & Close',
      color: 'primary', variant: 'solid',
      callback: (ref) => {
        hasUnsavedChanges = false;
        ref.close({ saved: true });
      }
    }
  ]
});`,
        language: 'typescript',
      },
      {
        title: 'Async — server validation',
        code: `const panelRef = this.sidebarPanelService.open(CheckoutFormComponent, {
  title: 'Checkout',
  preventClose: async () => {
    const ok = await this.checkoutService.canAbort();
    return ok;
  },
});

// closePrevented() fires every time close is blocked
panelRef.closePrevented().subscribe(() => {
  this.toastService.warn('Please finish or cancel the checkout first.');
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'update-ref',
    title: 'components.sidebar-panel.examples.update-ref.title',
    description: 'components.sidebar-panel.examples.update-ref.description',
    anchor: 'update-ref',
    note: {
      type: 'info',
      icon: 'ri-refresh-line',
      content: 'components.sidebar-panel.examples.update-ref.note',
    },
    examples: [
      {
        title: 'updateTitle()',
        code: `const panelRef = this.sidebarPanelService.open(MyComponent, {
  title: 'Loading...',
  customButtons: [
    {
      text: 'Rename panel',
      color: 'secondary', variant: 'outline',
      callback: (ref) => ref.updateTitle('Panel renamed!'),
    }
  ]
});

// Update title after async data loads
this.userService.getUser(id).then(user => {
  panelRef.updateTitle(user.name);
});`,
        language: 'typescript',
      },
      {
        title: 'updateFooterTemplate()',
        code: `// Parent component template
// <ng-template #confirmFooter>
//   <div class="footer-custom">
//     <button (click)="confirm()">Confirm</button>
//   </div>
// </ng-template>

@ViewChild('confirmFooter') confirmFooter!: TemplateRef<any>;

openAndUpdateFooter(): void {
  const panelRef = this.sidebarPanelService.open(MyComponent, {
    title: 'Step 1 — Setup',
  });

  // Switch to a confirmation footer after some event
  panelRef.afterOpened().subscribe(() => {
    setTimeout(() => {
      panelRef.updateFooterTemplate(this.confirmFooter);
    }, 2000);
  });
}`,
        language: 'typescript',
      },
    ],
  },
];
