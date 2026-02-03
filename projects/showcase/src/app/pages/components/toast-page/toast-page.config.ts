import { ComponentPageConfig } from '../../../core/models';

export const TOAST_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.toast.title',
  subtitle: 'components.toast.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.toast.basic.title',
      description: 'components.toast.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `this.toastService.success('Operation completed successfully');
this.toastService.error('An error occurred');
this.toastService.warning('Please review this information');
this.toastService.info('New update available');`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'with-title',
      title: 'components.toast.withTitle.title',
      description: 'components.toast.withTitle.description',
      anchor: 'with-title',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `this.toastService.success('Changes saved successfully', {
  title: 'Save Successful'
});

this.toastService.error('Could not connect to the server', {
  title: 'Connection Error'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'with-actions',
      title: 'components.toast.withActions.title',
      description: 'components.toast.withActions.description',
      anchor: 'with-actions',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `const toastRef = this.toastService.success('Item deleted', {
  title: 'Deleted',
  actions: [
    {
      label: 'Undo',
      timeout: 0, // Persistent until user action
      onClick: () => {
        console.log('Action undone');
        toastRef.close();
      }
    }
  ]
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.toast.positions.title',
      description: 'components.toast.positions.description',
      anchor: 'positions',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `this.toastService.success('Top Left', { position: 'top-left' });
this.toastService.success('Top Center', { position: 'top-center' });
this.toastService.success('Top Right', { position: 'top-right' });
this.toastService.info('Bottom Left', { position: 'bottom-left' });
this.toastService.info('Bottom Center', { position: 'bottom-center' });
this.toastService.info('Bottom Right', { position: 'bottom-right' });`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'icon-top',
      title: 'components.toast.iconTop.title',
      description: 'components.toast.iconTop.description',
      note: {
        type: 'info',
        content: 'components.toast.iconTop.note',
      },
      anchor: 'icon-top',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `
          // Toast with icon at the top
          this.toastService.info('This toast has the icon at the top', {
  iconPosition: 'top'
});

// Toast with icon at the top and title
this.toastService.warning('This toast has the icon at the top', {
  title: 'Icon Top Toast',
  iconPosition: 'top',
});

// Toast with icon at the top, title and actions
this.toastService.success('This toast has the icon at the top', {
  title: 'Icon Top Toast',
  iconPosition: 'top',
  actions: [
    {
      label: 'Action',
      onClick: () => {
        console.log('Icon Top Action clicked');
        alert('You have clicked the action');
        toastRef.close();
      },
    },
  ],
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'custom-icons',
      title: 'components.toast.icons.title',
      description: 'components.toast.icons.description',
      note: {
        type: 'info',
        content: 'components.toast.icons.note',
      },
      anchor: 'custom-icons',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Toast without icon
this.toastService.info('This toast has no icon', {
  icon: false
});

// Toast with custom icon
this.toastService.success('This toast has a custom icon', {
  icon: 'ri-star-line'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'duration',
      title: 'components.toast.duration.title',
      description: 'components.toast.duration.description',
      anchor: 'duration',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Fast toast (2 seconds)
this.toastService.success('Fast toast', { timeout: 2000 });

// Long toast (10 seconds)
this.toastService.info('Long toast', { timeout: 10000 });

// Persistent toast (does not close automatically)
this.toastService.warning('Persistent toast', { timeout: 0 });`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'loading',
      title: 'components.toast.loading.title',
      description: 'components.toast.loading.description',
      anchor: 'loading',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `// Show loading toast and get reference
const toastRef = this.toastService.loading('Processing...);

// Update after completion using the reference
setTimeout(() => {
  toastRef.update({
    type: 'success',        // New type
    message: '¡Éxito!',     // New message
    timeout: 3000,          // Auto close after 3 seconds
    icon: 'ri-check-line',  // Change icon to success
  });
}, 2000);`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.toast.api.title',
      description: 'components.toast.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.directiveCode',
          code: `class ToastService {
  // Show successful toast
  success(message: string, options?: ToastOptions): ToastRef
  
  // Show error toast
  error(message: string, options?: ToastOptions): ToastRef
  
  // Show warning toast
  warning(message: string, options?: ToastOptions): ToastRef
  
  // Show info toast
  info(message: string, options?: ToastOptions): ToastRef
  
  // Show loading toast
  loading(message: string, options?: ToastOptions): ToastRef
  
  // Close all toasts
  clear(): void
  
  // Close specific toast
  close(id: string): void
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.interfacesCode',
          code: `// Predefined toast types
type ToastType = NUIColor;

// Available container positions
type ToastPosition =
  | 'top-left'        // Top left corner
  | 'top-center'      // Top center
  | 'top-right'       // Top right corner
  | 'top-full'        // Full width top
  | 'middle-left'     // Middle left
  | 'middle-center'   // Middle center
  | 'middle-right'    // Middle right
  | 'bottom-left'     // Bottom left corner
  | 'bottom-center'   // Bottom center
  | 'bottom-right'    // Bottom right corner
  | 'bottom-full';    // Full width bottom

// Action inside a toast
interface ToastAction {
  label: string;                       // Button label
  onClick: () => void | Promise<void>; // Click handler
  closeOnClick?: boolean;              // Close after click
  class?: string;                      // Extra CSS class
}

// Per-toast configuration (overrides global)
interface ToastConfig {
  // ===== CONTENT =====
  type?: ToastType;                    // Toast type
  title?: string;                      // Optional title
  message?: string;                    // Message text
  template?: TemplateRef<any>;         // Custom template
  templateContext?: any;               // Template context
  html?: string;                       // Raw HTML content
  templateMode?: 'replace' | 'append'; // Template behavior

  // ===== VISUAL =====
  icon?: boolean | string;              // Icon config
  iconPosition?: 'left' | 'top';        // Icon position
  toastClass?: string | string[];       // Extra CSS class

  // ===== ACTIONS =====
  action?: ToastAction;                 // Primary action
  actions?: ToastAction[];              // Extra actions

  // ===== BEHAVIOR =====
  timeout?: number;                     // Auto close (ms)
  progressBar?: boolean;                // Show progress bar
  closeButton?: boolean;                // Show close button
  pauseOnHover?: boolean;               // Pause on hover
  pauseOnFocusLoss?: boolean;           // Pause on blur
  closeOnTouch?: boolean;               // Close on click/touch
  swipeToDismiss?: boolean;             // Enable swipe dismiss
  swipeThreshold?: number;              // Swipe threshold (px)

  // ===== ANIMATIONS =====
  animationIn?: 'slide' | 'fade' | 'bounce' | 'zoom' | 'flip'; // Enter animation
  animationOut?: 'slide' | 'fade' | 'shrink' | 'zoom';         // Exit animation
  animationDuration?: number;           // Animation duration (ms)

  // ===== GROUPING & PRIORITY =====
  group?: string;                       // Group identifier
  priority?: number;                    // Toast priority
  id?: string;                          // Unique toast ID

  // ===== ADVANCED =====
  position?: ToastPosition;             // Override position
  persistent?: boolean;                 // Persist across reloads
  persistentId?: string;                // Persistence ID
  sound?: boolean | string;             // Sound config
  expandable?: boolean;                 // Allow expand
  expandedContent?: string | TemplateRef<any>; // Expanded content
  requireOnline?: boolean;              // Require connection

  // ===== ACCESSIBILITY =====
  ariaRole?: 'status' | 'alert' | 'log'; // ARIA role
  ariaLive?: 'polite' | 'assertive' | 'off'; // aria-live value
  announceToScreenReader?: boolean;     // Screen reader announce

  // ===== CALLBACKS =====
  onShown?: () => void;                 // On show
  onClosed?: () => void;                // On close
  onClick?: () => void;                 // On click
  onTimeout?: () => void;               // On timeout
  onPause?: () => void;                 // On pause
  onResume?: () => void;                // On resume

  // ===== ACTION BUTTONS =====
  buttonsSize?: NUISize;                // Buttons size
  buttonsColor?: NUIColor;              // Buttons color
  buttonsVariant?: NUIVariant;          // Buttons variant
}

// Global toast system configuration
interface ToastGlobalConfig {
  // ===== BASICS =====
  timeout: number;                      // Default timeout (ms)
  toastClass: string | string[];        // Global CSS class
  position: ToastPosition;              // Container position
  preventDuplicates: boolean;           // Prevent duplicates
  progressBar: boolean;                 // Show progress bar
  closeOnTouch: boolean;                // Close on touch
  closeButton: boolean;                 // Show close button
  maxToasts: number;                    // Max visible toasts
  maxToastsPerPosition: number;         // Max per position

  // ===== TEMPLATES =====
  templateMode: 'replace' | 'append';   // Default template mode

  // ===== ANIMATIONS =====
  animationIn: 'slide' | 'fade' | 'bounce' | 'zoom' | 'flip'; // Enter animation
  animationOut: 'slide' | 'fade' | 'shrink' | 'zoom';         // Exit animation
  animationDuration: number;             // Animation duration (ms)

  // ===== BEHAVIOR =====
  pauseOnHover: boolean;                // Pause on hover
  pauseOnFocusLoss: boolean;            // Pause on blur
  stackingBehavior:                     // Overflow behavior
    | 'queue'
    | 'replace-oldest'
    | 'replace-lowest-priority'
    | 'ignore';
  stackDirection: 'append' | 'prepend'; // Stack direction

  // ===== VISUAL =====
  icon: boolean;                        // Show icon
  iconPosition: 'left' | 'top';         // Icon position

  // ===== ACCESSIBILITY =====
  announceToScreenReader: boolean;      // Screen reader announce
  ariaRole: 'status' | 'alert' | 'log'; // Default ARIA role
  ariaLive: 'polite' | 'assertive' | 'off'; // Default aria-live

  // ===== ADVANCED =====
  sound: boolean;                       // Enable sound
  expandable: boolean;                  // Allow expand
  persistent: boolean;                  // Persist toasts
  swipeToDismiss: boolean;              // Enable swipe dismiss
  swipeThreshold: number;               // Swipe threshold (px)

  // ===== DEFAULT ICONS =====
  icons: {                              // Icons by type
    success: string;
    danger: string;
    warning: string;
    info: string;
    loading?: string;
  };

  // ===== ACTION BUTTONS =====
  buttonsSize?: 'xs' | 'sm' | 'md' | 'lg'; // Buttons size
  buttonsColor?: NUIColor;                 // Buttons color
  buttonsVariant?: 'solid' | 'outline' | 'ghost' | 'link'; // Buttons variant
}

// Internal toast state
interface ToastState {
  id: string;                          // Toast ID
  type: ToastType;                     // Toast type
  config: ToastConfig;                 // Final config
  state: 'showing' | 'visible' | 'hiding' | 'hidden'; // Lifecycle state
  timeRemaining: number;               // Remaining time
  isPaused: boolean;                   // Pause state
  createdAt: Date;                     // Creation date
}
`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component, inject } from '@angular/core';
import { ToastService } from 'nui';

@Component({
  selector: 'app-example',
  template: \`
    <nui-button (onClick)="showSuccessToast()">Success</nui-button>
    <nui-button (onClick)="showLoadingToast()">Loading</nui-button>
    <nui-button (onClick)="showToastWithActions()">With Actions</nui-button>
  \`
})
export class ExampleComponent {
  private toastService = inject(ToastService);
  
  showSuccessToast(): void {
    this.toastService.success('Operation completed successfully', {
      title: 'Success',
      position: 'top-right',
      timeout: 5000,
      closeable: true,
      progressBar: true,
      pauseOnHover: true
    });
  }
  
  async showLoadingToast(): Promise<void> {
  
    // Show loading toast and get reference
    const toastRef = this.toastService.loading('Processing request...', {
      title: 'Loading',
      position: 'top-center',
      timeout: 0 // Persistent
    });
    
    try {
      // Simulate asynchronous operation
      await this.someAsyncOperation();
      
      // Update to success
      toastRef.update({
        type: 'success',
        message: 'Operation completed',
        timeout: 3000 // Auto close after 3 seconds
      });
    } catch (error) {
      // Update to error
      toastRef.update({
        type: 'error',
        message: 'Error in operation',
        timeout: 5000 // Auto close after 5 seconds
      });
    }
  }
  
  showToastWithActions(): void {

    // Show toast with action buttons and get reference
    const toastRef = this.toastService.warning(
      'This item will be permanently deleted',
      {
        title: 'Confirm Deletion',
        position: 'bottom-center',
        timeout: 0,
        actions: [
          {
            label: 'Cancel',
            onClick: () => {
              console.log('Action cancelled');
              toastRef.close();
            },
            variant: 'outline'
          },
          {
            label: 'Delete',
            onClick: () => {
              console.log('Deleting...');
              this.deleteItem();
              toastRef.close();
            },
            color: 'danger'
          }
        ]
      }
    );
    
    // Subscribe to close event
    toastRef.afterClosed().subscribe(() => {
      console.log('Toast closed');
    });
  }
  
  private async someAsyncOperation(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  private deleteItem(): void {
    console.log('Item deleted');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.toast.styling.title',
      description: 'components.toast.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Toast container */
  --nui-toast-bg: var(--nui-bg-primary);
  --nui-toast-text: var(--nui-text-primary);
  --nui-toast-border: var(--nui-border-primary);
  --nui-toast-border-radius: var(--border-radius-lg);
  --nui-toast-shadow: var(--nui-shadow-xl);
  --nui-toast-padding: var(--spacing-md);
  --nui-toast-min-width: 300px;
  --nui-toast-max-width: 500px;
  
  /* Z-index */
  --nui-toast-z-index: 9999;
  
  /* Spacing between toasts */
  --nui-toast-gap: var(--spacing-sm);
  
  /* Title */
  --nui-toast-title-font-size: var(--font-size-md);
  --nui-toast-title-font-weight: var(--font-weight-semibold);
  --nui-toast-title-color: var(--nui-text-primary);
  --nui-toast-title-margin-bottom: var(--spacing-xs);
  
  /* Message */
  --nui-toast-message-font-size: var(--font-size-sm);
  --nui-toast-message-color: var(--nui-text-secondary);
  --nui-toast-message-line-height: 1.5;
  
  /* Icon */
  --nui-toast-icon-size: 20px;
  --nui-toast-icon-margin-right: var(--spacing-sm);
  
  /* Close button */
  --nui-toast-close-button-size: 20px;
  --nui-toast-close-button-color: var(--nui-text-tertiary);
  --nui-toast-close-button-hover-color: var(--nui-text-primary);
  
  /* Progress bar */
  --nui-toast-progress-bar-height: 4px;
  --nui-toast-progress-bar-bg: rgba(255, 255, 255, 0.3);
  --nui-toast-progress-bar-color: currentColor;
  
  /* Colors by type */
  --nui-toast-success-color: var(--success-color);
  --nui-toast-success-bg: var(--success-bg-subtle);
  --nui-toast-success-border: var(--success-border);
  
  --nui-toast-error-color: var(--danger-color);
  --nui-toast-error-bg: var(--danger-bg-subtle);
  --nui-toast-error-border: var(--danger-border);
  
  --nui-toast-warning-color: var(--warning-color);
  --nui-toast-warning-bg: var(--warning-bg-subtle);
  --nui-toast-warning-border: var(--warning-border);
  
  --nui-toast-info-color: var(--info-color);
  --nui-toast-info-bg: var(--info-bg-subtle);
  --nui-toast-info-border: var(--info-border);
  
  /* Animations */
  --nui-toast-animation-duration: 300ms;
  --nui-toast-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

// Example of an iOS-style toast
.ios-toast {
  --nui-toast-bg: rgba(255, 255, 255, 0.95);
  --nui-toast-border: none;
  --nui-toast-border-radius: 14px;
  --nui-toast-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  --nui-toast-padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

// Example of a compact toast
.compact-toast {
  --nui-toast-padding: var(--spacing-sm) var(--spacing-md);
  --nui-toast-min-width: 200px;
  --nui-toast-title-font-size: var(--font-size-sm);
  --nui-toast-message-font-size: var(--font-size-xs);
  --nui-toast-icon-size: 16px;
}

// Example with custom animation
@keyframes toastSlideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-toast {
  animation: toastSlideInRight var(--nui-toast-animation-duration) var(--nui-toast-animation-timing);
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
