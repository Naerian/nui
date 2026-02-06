import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Popover
 */
export const POPOVER_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.popover.title',
  subtitle: 'components.popover.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.popover.basic.title',
      description: 'components.popover.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button nuiPopover="Additional information about the element">
  View Info
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'colors',
      title: 'components.popover.colors.title',
      description: 'components.popover.colors.description',
      note: {
        type: 'info',
        content: 'components.popover.colors.note',
      },
      anchor: 'colors',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Popover with warning color and ghost variant -->
<nui-button
  nuiPopover="Warning ghost popover with custom color and variant"
  [nuiPopoverColor]="'warning'"
  [nuiPopoverVariant]="'ghost'"
>
  Warning Ghost Popover
</nui-button>

<!-- Popover with danger color and outline variant -->
<nui-button
  nuiPopover="Error outline popover with custom color and variant"
  [nuiPopoverColor]="'danger'"
  [nuiPopoverVariant]="'outline'"
>
  Error Outline Popover
</nui-button>

<!-- Popover with success color and default variant -->
<nui-button
  nuiPopover="Success popover with custom color and default variant"
  [nuiPopoverColor]="'success'"
>
  Success Popover
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.popover.positions.title',
      description: 'components.popover.positions.description',
      anchor: 'positions',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button nuiPopover="Popover Top" nuiPopoverPosition="top">
  Top
</nui-button>
<nui-button nuiPopover="Popover Bottom" nuiPopoverPosition="bottom">
  Bottom
</nui-button>
<nui-button nuiPopover="Popover Left" nuiPopoverPosition="left">
  Left
</nui-button>
<nui-button nuiPopover="Popover Right" nuiPopoverPosition="right">
  Right
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'events',
      title: 'components.popover.events.title',
      description: 'components.popover.events.description',
      note: {
        type: 'info',
        content: 'components.popover.events.note',
      },
      anchor: 'events',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Click (default) -->
<nui-button nuiPopover="Popover with click" nuiPopoverEvent="click">
  Click Event
</nui-button>

<!-- Hover -->
<nui-button nuiPopover="Popover with hover" nuiPopoverEvent="hover">
  Hover Event
</nui-button>

<!-- Focus -->
<input 
  type="text" 
  nuiPopover="Help for this field" 
  nuiPopoverEvent="focus"
  placeholder="Focus to see help"
/>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'template',
      title: 'components.popover.template.title',
      description: 'components.popover.template.description',
      note: {
        type: 'info',
        content: 'components.popover.template.note',
      },
      anchor: 'template',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button [nuiPopover]="popoverTemplate">
  Ver detalles
</nui-button>

<ng-template #popoverTemplate let-close="close">
  <div class="custom-popover">
    <h3 class="custom-popover__title">Popover Title</h3>
    <p class="custom-popover__text">This is the content of the popover with a custom template.</p>
    <div class="custom-popover__actions">
      <nui-button size="sm" variant="outline" (onClick)="close()">
        Cancel
      </nui-button>
      <nui-button size="sm" (onClick)="handleAction(); close()">
        Accept
      </nui-button>
    </div>
  </div>
</ng-template>`,
          language: 'html',
        },
        {
          title: 'codeExamples.scss',
          code: `.custom-popover {
  min-width: 250px;

  &__title {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--nui-text-primary);
  }

  &__text {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    color: var(--nui-text-secondary);
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}`,
          language: 'scss',
        },
        {
          title: 'codeExamples.typescript',
          code: `export class MyComponent {
  handleAction() {
    console.log('Action confirmed');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'component',
      title: 'components.popover.component.title',
      description: 'components.popover.component.description',
      anchor: 'component',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button 
  [nuiPopover]="UserProfilePopoverComponent"
  [nuiPopoverData]="{ userId: 123, userName: 'Juan Pérez' }">
  View Profile
</nui-button>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `import { UserProfilePopoverComponent } from './user-profile-popover.component';

export class MyComponent {
  UserProfilePopoverComponent = UserProfilePopoverComponent;
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.child',
          code: `import { Component, inject } from '@angular/core';
import { POPOVER_DATA, POPOVER_CLOSE } from '@shared/components/popover';

@Component({
  selector: 'app-user-profile-popover',
  standalone: true,
  template: \`
    <div class="user-profile-popover">
      <h3>{{ data.userName }}</h3>
      <p>ID: {{ data.userId }}</p>
      <button (click)="close()">Close</button>
    </div>
  \`,
})
export class UserProfilePopoverComponent {
  data = inject(POPOVER_DATA);
  close = inject(POPOVER_CLOSE);
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'delays',
      title: 'components.popover.delays.title',
      description: 'components.popover.delays.description',
      anchor: 'delays',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Show Delay (500ms) -->
<nui-button 
  nuiPopover="Appears after 500ms" 
  [nuiPopoverShowDelay]="500">
  Show Delay
</nui-button>

<!-- Hide Delay (1000ms) -->
<nui-button 
  nuiPopover="Hides after 1s" 
  nuiPopoverEvent="hover"
  [nuiPopoverHideDelay]="1000">
  Hide Delay
</nui-button>

<!-- Both Delays -->
<nui-button 
  nuiPopover="Combined Delays" 
  nuiPopoverEvent="hover"
  [nuiPopoverShowDelay]="300"
  [nuiPopoverHideDelay]="500">
  Both Delays
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'customization',
      title: 'components.popover.customization.title',
      description: 'components.popover.customization.description',
      note: {
        type: 'info',
        content: 'components.popover.customization.note',
      },
      anchor: 'customization',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- No arrow -->
<nui-button 
  nuiPopover="Popover without arrow" 
  [nuiPopoverShowArrow]="false">
  No arrow
</nui-button>

<!-- Custom width -->
<nui-button 
  nuiPopover="Popover with custom width of 400px" 
  nuiPopoverMaxWidth="400px">
  Custom width
</nui-button>

<!-- Custom CSS class -->
<nui-button 
  nuiPopover="Popover with custom style" 
  nuiPopoverClass="my-custom-popover">
  Custom class
</nui-button>

<!-- Custom offset -->
<nui-button 
  nuiPopover="Greater separation from the trigger" 
  [nuiPopoverOffset]="20">
  Offset 20px
</nui-button>`,
          language: 'html',
        },
        {
          title: 'codeExamples.scss',
          code: `::ng-deep .my-custom-popover {
  .nui-popover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
    padding: 1.25rem;
    min-width: 200px;
  }

  .nui-popover__arrow {
    border-top-color: #667eea !important;
    filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.3));
  }
}`,
          language: 'scss',
        },
      ],
    },
    {
      id: 'closeOptions',
      title: 'components.popover.closeOptions.title',
      description: 'components.popover.closeOptions.description',
      note: {
        type: 'info',
        content: 'components.popover.closeOptions.note',
      },
      anchor: 'close-options',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Do not close on outside click -->
<nui-button 
  nuiPopover="Do not close on outside click" 
  [nuiPopoverCloseOnClickOutside]="false">
  Click Outside OFF
</nui-button>

<!-- Do not close with Escape -->
<nui-button 
  nuiPopover="Do not close with Escape key" 
  [nuiPopoverCloseOnEscape]="false">
  Escape OFF
</nui-button>

<!-- Multiple popovers open -->
<nui-button 
  nuiPopover="Allows multiple popovers open" 
  [nuiPopoverAllowMultiple]="true">
  Multiple 1
</nui-button>

<nui-button 
  nuiPopover="Another popover that can be open simultaneously" 
  [nuiPopoverAllowMultiple]="true">
  Multiple 2
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'backdrop',
      title: 'components.popover.backdrop.title',
      description: 'components.popover.backdrop.description',
      note: {
        type: 'info',
        content: 'components.popover.backdrop.note',
      },
      anchor: 'backdrop',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- With backdrop (dark background) -->
<nui-button 
  [nuiPopover]="modalTemplate" 
  [nuiPopoverBackdrop]="true">
  With Backdrop
</nui-button>

<!-- Backdrop without closing on click -->
<nui-button 
  [nuiPopover]="modalTemplate" 
  [nuiPopoverBackdrop]="true"
  [nuiBackdropClose]="false">
  Backdrop without closing on click
</nui-button>

<ng-template #modalTemplate let-close="close">
  <div class="modal-content">
    <h3>Popover Modal</h3>
    <p>This popover has a dark backdrop behind it.</p>
    <nui-button (onClick)="close()">Close</nui-button>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'disabled',
      title: 'components.popover.disabled.title',
      description: 'components.popover.disabled.description',
      note: {
        type: 'info',
        content: 'components.popover.disabled.note',
      },
      anchor: 'disabled',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button 
  nuiPopover="This popover is disabled" 
  [nuiPopoverDisabled]="isDisabled">
  Conditional Popover
</nui-button>

<nui-button (onClick)="isDisabled = !isDisabled">
  Toggle disabled
</nui-button>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `export class MyComponent {
  isDisabled = false;
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.popover.api.title',
      description: 'components.popover.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.interfacesCode',
          code: `@Input() nuiPopover: string | TemplateRef<any> | Type<any>; // Content of the popover
@Input() nuiPopoverPosition: PopoverPosition = 'top'; // Position: 'top' | 'bottom' | 'left' | 'right'
@Input() nuiPopoverEvent: 'click' | 'hover' | 'focus' | 'manual' = 'click'; // Activation event
@Input() nuiPopoverData?: any;                        // Data for dynamic components
@Input() nuiPopoverShowArrow = true;                  // Show arrow
@Input() nuiPopoverMaxWidth = '300px';                // Maximum width of the popover
@Input() nuiPopoverClass?: string;                    // Custom CSS class
@Input() nuiPopoverOffset = 8;                        // Distance from the trigger (px)
@Input() nuiPopoverShowDelay = 0;                     // Show delay (ms)
@Input() nuiPopoverHideDelay = 0;                     // Hide delay (ms)
@Input() nuiPopoverCloseOnClickOutside = true;        // Close on outside click
@Input() nuiPopoverCloseOnEscape = true;              // Close on Escape key
@Input() nuiPopoverAllowMultiple = false;             // Allow multiple popovers open
@Input() nuiPopoverBackdrop = false;                  // Show backdrop
@Input() nuiBackdropClose = true;                     // Close on backdrop click
@Input() nuiPopoverDisabled = false;                  // Disable popover

@Output() nuiPopoverShow = new EventEmitter<void>(); // Emitted when opened
@Output() nuiPopoverHide = new EventEmitter<void>(); // Emitted when closed`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.tokensCode',
          code: `import { POPOVER_DATA, POPOVER_CLOSE } from 'nui';

@Component({
  selector: 'app-my-popover',
  template: \`
    <div>
      <p>{{ data.message }}</p>
      <button (click)="close()">Close</button>
    </div>
  \`
})
export class MyPopoverComponent {
  // Inject data passed to the popover
  data = inject(POPOVER_DATA);
  
  // Inject function to close the popover
  close = inject(POPOVER_CLOSE);
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component, TemplateRef, signal } from '@angular/core';
import { MyPopoverComponent } from './my-popover.component';

@Component({
  selector: 'app-example',
  template: \`
    <!-- With simple text -->
    <button
      nuiPopover="Element information"
      nuiPopoverPosition="top"
      nuiPopoverEvent="hover"
      [nuiPopoverShowDelay]="300"
      [nuiPopoverHideDelay]="100"
      (nuiPopoverShow)="onOpen()"
      (nuiPopoverHide)="onClose()">
      Text
    </button>
    
    <!-- With template -->
    <button
      [nuiPopover]="myTemplate"
      nuiPopoverPosition="bottom"
      nuiPopoverMaxWidth="400px"
      nuiPopoverClass="custom-popover">
      Template
    </button>
    
    <ng-template #myTemplate let-close="close">
      <div class="rich-content">
        <h3>Title</h3>
        <p>Custom content</p>
        <button (click)="handleAction(); close()">Accept</button>
      </div>
    </ng-template>
    
    <!-- With dynamic component -->
    <button
      [nuiPopover]="MyPopoverComponent"
      [nuiPopoverData]="{ userId: 123, userName: 'John' }"
      [nuiPopoverBackdrop]="true"
      [nuiBackdropClose]="false">
      Component
    </button>
  \`
})
export class ExampleComponent {
  MyPopoverComponent = MyPopoverComponent;
  
  onOpen(): void {
    console.log('Popover opened');
  }
  
  onClose(): void {
    console.log('Popover closed');
  }
  
  handleAction(): void {
    console.log('Action executed');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.popover.styling.title',
      description: 'components.popover.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Popover container */
  --nui-popover-bg: var(--nui-bg-primary);
  --nui-popover-text: var(--nui-text-primary);
  --nui-popover-border: var(--nui-border-primary);
  --nui-popover-border-radius: var(--nui-border-radius-md);
  --nui-popover-shadow: var(--nui-shadow-lg);
  --nui-popover-padding: var(--nui-spacing-md);
  --nui-popover-max-width: 300px;
  --nui-popover-min-width: 100px;
  
  /* Z-index */
  --nui-popover-z-index: 1050;
  
  /* Arrow */
  --nui-popover-arrow-size: 8px;
  --nui-popover-arrow-bg: var(--nui-bg-primary);
  --nui-popover-arrow-border: var(--nui-border-primary);
  
  /* Backdrop */
  --nui-popover-backdrop-bg: rgba(0, 0, 0, 0.5);
  --nui-popover-backdrop-z-index: 1049;
  
  /* Animations */
  --nui-popover-animation-duration: 200ms;
  --nui-popover-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* States */
  --nui-popover-focus-ring: 2px solid var(--primary-color);
  --nui-popover-focus-ring-offset: 2px;
}

// Example of custom styled popover
.my-custom-popover {
  --nui-popover-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --nui-popover-text: white;
  --nui-popover-border: transparent;
  --nui-popover-border-radius: 12px;
  --nui-popover-padding: 1.5rem;
  --nui-popover-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  --nui-popover-arrow-bg: #667eea;
}

// Example of minimalist popover
.minimal-popover {
  --nui-popover-bg: white;
  --nui-popover-border: 1px solid #e0e0e0;
  --nui-popover-border-radius: 4px;
  --nui-popover-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --nui-popover-padding: 0.75rem 1rem;
}

// Example with custom animation
.animated-popover {
  animation: popoverSlideIn var(--nui-popover-animation-duration) var(--nui-popover-animation-timing);
}

@keyframes popoverSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
