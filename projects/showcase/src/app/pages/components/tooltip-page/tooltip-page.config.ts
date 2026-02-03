import { ComponentPageConfig } from '../../../core/models';

export const TOOLTIP_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.tooltip.title',
  subtitle: 'components.tooltip.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.tooltip.basic.title',
      description: 'components.tooltip.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
          code: `// Simple tooltip with text and arrow
<button nuiTooltip="Save changes">Save</button>
  
 // Tooltip without arrow
 <button nuiTooltip="No arrow tooltip" [nuiTooltipShowArrow]="false">
   No Arrow
 </button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.tooltip.positions.title',
      description: 'components.tooltip.positions.description',
      anchor: 'positions',
      examples: [
        {
          title: 'codeExamples.html',
          code: `// Top tooltip (default)
<button nuiTooltip="Tooltip top" nuiTooltipPosition="top">
  Top
</button>

// Bottom tooltip
<button nuiTooltip="Tooltip bottom" nuiTooltipPosition="bottom">
  Bottom
</button>

// Left tooltip
<button nuiTooltip="Tooltip left" nuiTooltipPosition="left">
  Left
</button>

// Right tooltip
<button nuiTooltip="Tooltip right" nuiTooltipPosition="right">
  Right
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'events',
      title: 'components.tooltip.events.title',
      description: 'components.tooltip.events.description',
      anchor: 'events',
      examples: [
        {
          title: 'codeExamples.html',
          code: `// Hover (default)
<button nuiTooltip="Tooltip on hover">Hover</button>

// Click
<button nuiTooltip="Tooltip on click" nuiTooltipEvent="click">
  Click
</button>

// Focus
<input nuiTooltip="Tooltip on focus" nuiTooltipEvent="focus" />`,
          language: 'html',
        },
      ],
    },
    {
      id: 'delays',
      title: 'components.tooltip.delays.title',
      description: 'components.tooltip.delays.description',
      anchor: 'delays',
      note: {
        type: 'info',
        content: 'components.tooltip.delays.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `// Input delay (500ms)
<button 
  nuiTooltip="Appears after 500ms" 
  [nuiTooltipShowDelay]="500">
  Input Delay
</button>

// Output delay (1000ms)
<button 
  nuiTooltip="Disappears after 1s" 
  [nuiTooltipHideDelay]="1000">
  Output Delay
</button>

// No delays
<button 
  nuiTooltip="No delays" 
  [nuiTooltipShowDelay]="0"
  [nuiTooltipHideDelay]="0">
  No Delays
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'templates',
      title: 'components.tooltip.templates.title',
      description: 'components.tooltip.templates.description',
      anchor: 'templates',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<button [nuiTooltip]="tooltipTemplate">View Info</button>

<!-- Template Content -->
<ng-template #tooltipTemplate>
  <div class="custom-tooltip">
    <strong>Important Information</strong>
    <p>Custom content</p>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'interactive',
      title: 'components.tooltip.interactive.title',
      description: 'components.tooltip.interactive.description',
      anchor: 'interactive',
      note: {
        type: 'info',
        content: 'components.tooltip.interactive.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<button 
  [nuiTooltip]="interactiveTemplate" 
  [nuiTooltipInteractive]="true">
  Interactive Tooltip
</button>

<!-- Template Content -->
<ng-template #interactiveTemplate>
  <div class="interactive-tooltip">
    <h4>Available Actions</h4>
    <button (click)="doAction()">Action</button>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'disabled',
      title: 'components.tooltip.disabled.title',
      description: 'components.tooltip.disabled.description',
      anchor: 'disabled',
      note: {
        type: 'info',
        content: 'components.tooltip.disabled.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `// Disabled tooltip
<button 
  nuiTooltip="Will not show" 
  [nuiTooltipDisabled]="true">
  Disabled
</button>

// Disabled conditionally
<button 
  nuiTooltip="Conditional tooltip" 
  [nuiTooltipDisabled]="isDisabled">
  Conditional
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.tooltip.api.title',
      description: 'components.tooltip.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.componentCode',
          code: `@Input() nuiTooltip: string | TemplateRef<any>; // Tooltip content
@Input() nuiTooltipPosition: TooltipPosition = 'top'; // Position: 'top' | 'bottom' | 'left' | 'right'
@Input() nuiTooltipEvent: 'hover' | 'click' | 'focus' = 'hover'; // Trigger event
@Input() nuiTooltipShowArrow = true;              // Show arrow
@Input() nuiTooltipShowDelay = 0;                 // Show delay (ms)
@Input() nuiTooltipHideDelay = 0;                 // Hide delay (ms)
@Input() nuiTooltipMaxWidth = '200px';            // Maximum width
@Input() nuiTooltipClass?: string;                // Custom CSS class
@Input() nuiTooltipOffset = 8;                    // Distance from the element (px)
@Input() nuiTooltipInteractive = false;           // Allow interaction with the tooltip
@Input() nuiTooltipDisabled = false;              // Disable tooltip

@Output() tooltipShown = new EventEmitter<void>();   // Emitted when shown
@Output() tooltipHidden = new EventEmitter<void>();  // Emitted when hidden`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <!-- Tooltip with simple text -->
    <button
      nuiTooltip="Guardar cambios"
      nuiTooltipPosition="top"
      [nuiTooltipShowDelay]="500"
      (tooltipShown)="onTooltipShown()"
      (tooltipHidden)="onTooltipHidden()">
      Guardar
    </button>
    
    <!-- Tooltip with template -->
    <button
      [nuiTooltip]="tooltipTemplate"
      nuiTooltipPosition="bottom"
      nuiTooltipMaxWidth="300px"
      nuiTooltipClass="custom-tooltip">
      View Info
    </button>
    
    <ng-template #tooltipTemplate>
      <div class="rich-tooltip">
        <strong>Detailed Information</strong>
        <p>Custom content with HTML</p>
      </div>
    </ng-template>
    
    <!-- Interactive tooltip -->
    <button
      [nuiTooltip]="interactiveTemplate"
      [nuiTooltipInteractive]="true"
      nuiTooltipEvent="click"
      nuiTooltipPosition="right">
      Actions
    </button>
    
    <ng-template #interactiveTemplate>
      <div class="interactive-tooltip">
        <h4>Available Actions</h4>
        <ul>
          <li><a (click)="editItem()">Edit</a></li>
          <li><a (click)="deleteItem()">Delete</a></li>
        </ul>
      </div>
    </ng-template>
    
    <!-- Conditional tooltip -->
    <button
      nuiTooltip="This tooltip can be disabled"
      [nuiTooltipDisabled]="isDisabled()"
      nuiTooltipPosition="left">
      Conditional
    </button>
    
    <!-- Tooltip on input with focus -->
    <input
      type="email"
      nuiTooltip="Enter a valid email address"
      nuiTooltipEvent="focus"
      nuiTooltipPosition="top"
      placeholder="Email"
    />
  \`
})
export class ExampleComponent {
  isDisabled = signal(false);
  
  onTooltipShown(): void {
    console.log('Tooltip shown');
  }
  
  onTooltipHidden(): void {
    console.log('Tooltip hidden');
  }
  
  editItem(): void {
    console.log('Editing item');
  }
  
  deleteItem(): void {
    console.log('Deleting item');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.tooltip.styling.title',
      description: 'components.tooltip.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Tooltip container */
  --nui-tooltip-bg: var(--nui-bg-inverse);
  --nui-tooltip-text: var(--nui-text-inverse);
  --nui-tooltip-border-radius: var(--border-radius-sm);
  --nui-tooltip-padding: var(--spacing-xs) var(--spacing-sm);
  --nui-tooltip-font-size: var(--font-size-xs);
  --nui-tooltip-line-height: 1.4;
  --nui-tooltip-max-width: 200px;
  --nui-tooltip-shadow: var(--nui-shadow-md);
  
  /* Z-index */
  --nui-tooltip-z-index: 1060;
  
  /* Arrow */
  --nui-tooltip-arrow-size: 6px;
  --nui-tooltip-arrow-bg: var(--nui-bg-inverse);
  
  /* Animations */
  --nui-tooltip-animation-duration: 150ms;
  --nui-tooltip-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Opacity */
  --nui-tooltip-opacity: 0.95;
}

// Example of a light theme tooltip
.light-tooltip {
  --nui-tooltip-bg: white;
  --nui-tooltip-text: var(--nui-text-primary);
  --nui-tooltip-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--nui-border-primary);
}

// Example of a tooltip with custom color
.success-tooltip {
  --nui-tooltip-bg: var(--success-color);
  --nui-tooltip-text: white;
  --nui-tooltip-arrow-bg: var(--success-color);
}

.error-tooltip {
  --nui-tooltip-bg: var(--danger-color);
  --nui-tooltip-text: white;
  --nui-tooltip-arrow-bg: var(--danger-color);
}

// Example of a large tooltip
.large-tooltip {
  --nui-tooltip-padding: var(--spacing-sm) var(--spacing-md);
  --nui-tooltip-font-size: var(--font-size-sm);
  --nui-tooltip-max-width: 400px;
  --nui-tooltip-border-radius: var(--border-radius-md);
}

// Example with custom animation
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: var(--nui-tooltip-opacity);
    transform: scale(1);
  }
}

.animated-tooltip {
  animation: tooltipFadeIn var(--nui-tooltip-animation-duration) var(--nui-tooltip-animation-timing);
}

// Example of a tooltip without arrow and with border
.bordered-tooltip {
  --nui-tooltip-bg: var(--nui-bg-primary);
  --nui-tooltip-text: var(--nui-text-primary);
  --nui-tooltip-shadow: none;
  border: 2px solid var(--primary-color);
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
