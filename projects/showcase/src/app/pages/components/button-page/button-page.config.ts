import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Button
 */
export const BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.button.title',
  subtitle: 'components.button.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.button.basic.title',
      description: 'components.button.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button>Click me</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'variants-colors',
      title: 'components.button.variants-colors.title',
      description: 'components.button.variants-colors.description',
      note: {
        type: 'info',
        content: 'components.button.variants-colors.note',
      },
      anchor: 'variants-colors',
      examples: [
        {
          title: 'Solid',
          code: `<nui-button color="primary">Primary</nui-button>
<nui-button color="secondary">Secondary</nui-button>
<nui-button color="accent">Accent</nui-button>
<nui-button color="success">Success</nui-button>
<nui-button color="info">Info</nui-button>
<nui-button color="warning">Warning</nui-button>
<nui-button color="danger">Danger</nui-button>`,
          language: 'html',
        },
        {
          title: 'Outline',
          code: `<nui-button variant="outline" color="primary">Primary</nui-button>
<nui-button variant="outline" color="secondary">Secondary</nui-button>
<nui-button variant="outline" color="accent">Accent</nui-button>
<nui-button variant="outline" color="success">Success</nui-button>
<nui-button variant="outline" color="info">Info</nui-button>
<nui-button variant="outline" color="warning">Warning</nui-button>
<nui-button variant="outline" color="danger">Danger</nui-button>`,
          language: 'html',
        },
        {
          title: 'Ghost',
          code: `<nui-button variant="ghost" color="primary">Primary</nui-button>
<nui-button variant="ghost" color="secondary">Secondary</nui-button>
<nui-button variant="ghost" color="accent">Accent</nui-button>
<nui-button variant="ghost" color="success">Success</nui-button>
<nui-button variant="ghost" color="info">Info</nui-button>
<nui-button variant="ghost" color="warning">Warning</nui-button>
<nui-button variant="ghost" color="danger">Danger</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.button.sizes.title',
      description: 'components.button.sizes.description',
      note: {
        type: 'info',
        content: 'components.button.sizes.note',
      },
      anchor: 'sizes',
      examples: [
        {
          title: 'components.button.sizes.codeTitle',
          code: `<nui-button size="xs">Extra Small</nui-button>
<nui-button size="sm">Small</nui-button>
<nui-button size="md">Medium</nui-button>
<nui-button size="lg">Large</nui-button>
<nui-button size="xl">Extra Large</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'icons',
      title: 'components.button.icons.title',
      description: 'components.button.icons.description',
      anchor: 'icons',
      note: {
        type: 'info',
        content: 'components.button.icons.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button icon="ri-user-line">Profile</nui-button>
<nui-button icon="ri-arrow-right-line" iconPosition="end">Next</nui-button>
<nui-button icon="ri-settings-line" aria-label="Settings"></nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'loading',
      title: 'components.button.loading.title',
      description: 'components.button.loading.description',
      anchor: 'loading',
      note: {
        type: 'info',
        content: 'components.button.loading.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button [loading]="isLoading" loadingPosition="start">
  Loading...
</nui-button>

<nui-button [loading]="true" loadingPosition="end">
  Loading...
</nui-button>

<nui-button [loading]="true" loadingPosition="center">
  Loading...
</nui-button>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `export class MyComponent {
  isLoading = false;

  async handleSubmit() {
    this.isLoading = true;
    try {
      await this.apiService.save();
    } finally {
      this.isLoading = false;
    }
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'width',
      title: 'components.button.width.title',
      description: 'components.button.width.description',
      anchor: 'width',
      note: {
        type: 'info',
        content: 'components.button.width.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button width="auto">Auto Width</nui-button>
<nui-button width="full">Full Width</nui-button>
<nui-button width="fit">Fit Content</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'disabled',
      title: 'components.button.disabled.title',
      description: 'components.button.disabled.description',
      anchor: 'disabled',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button [disabled]="true">Disabled Button</nui-button>
<nui-button variant="outline" [disabled]="true">Disabled Outline</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'events',
      title: 'components.button.events.title',
      description: 'components.button.events.description',
      anchor: 'events',
      note: {
        type: 'info',
        content: 'components.button.events.consoleNote',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button (onClick)="handleClick()">Click Event</nui-button>
<nui-button type="submit" (onClick)="handleSubmit($event)">Submit Form</nui-button>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `export class MyComponent {
  handleClick() {
    console.log('Button clicked!');
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'directive',
      title: 'components.button.directive.title',
      description: 'components.button.directive.description',
      note: {
        type: 'info',
        content: 'components.button.directive.note',
      },
      anchor: 'directive',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Using the nuiButton directive in native HTML elements -->
<button nuiButton>Native Button</button>
<button nuiButton variant="outline" color="primary">Primary Outline</button>
<button nuiButton variant="ghost" color="danger">Ghost Danger</button>

<!-- With icons -->
<button nuiButton icon="ri-save-line">Save</button>
<button nuiButton icon="ri-download-line" iconPosition="end">Download</button>

<!-- With loading -->
<button nuiButton [loading]="isLoading">Submit</button>

<!-- <a> elements with button appearance -->
<a nuiButton href="/profile" icon="ri-user-line">View Profile</a>
<a nuiButton variant="outline" color="accent" href="/settings">Settings</a>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.button.api.title',
      description: 'components.button.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.componentCode',
          code: `@Input() variant: ButtonVariant = 'solid';     // Variant: 'solid' | 'outline' | 'ghost'
@Input() color?: ButtonColor;                  // Color: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger'
@Input() size: ButtonSize = 'md';              // Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() icon?: string;                        // Icon (Remix Icon)
@Input() iconPosition: 'start' | 'end' = 'start'; // Icon position
@Input() loading = false;                      // Loading state
@Input() loadingPosition: 'start' | 'center' | 'end' = 'start'; // Spinner position
@Input() width: 'auto' | 'full' | 'fit' = 'auto'; // Button width
@Input() disabled = false;                     // Disabled state
@Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
@Input() ariaLabel?: string;                   // Accessibility label

// Component outputs
@Output() onClick = new EventEmitter<Event>(); // Click event`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.directiveCode',
          code: `@Input() variant: ButtonVariant = 'solid';     // Variant: 'solid' | 'outline' | 'ghost'
@Input() color?: ButtonColor;                  // Color: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger'
@Input() size: ButtonSize = 'md';              // Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() icon?: string;                        // Icon (Remix Icon)
@Input() iconPosition: 'start' | 'end' = 'start'; // Icon position
@Input() loading = false;                      // Loading state
@Input() loadingPosition: 'start' | 'center' | 'end' = 'start'; // Spinner position
@Input() width: 'auto' | 'full' | 'fit' = 'auto'; // Button width
@Input() disabled = false;                     // Disabled state
@Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
@Input() ariaLabel?: string;                   // Accessibility label

// Component outputs
@Output() onClick = new EventEmitter<Event>(); // Click event`,
          language: 'typescript',
        },
        {
          title: 'components.button.api.usageCodeTitle',
          code: `// Complete usage example
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <nui-button
      variant="solid"
      color="primary"
      size="lg"
      icon="ri-save-line"
      iconPosition="start"
      [loading]="isSaving()"
      loadingPosition="center"
      width="full"
      [disabled]="!isFormValid()"
      type="submit"
      (onClick)="handleSave()">
      Guardar Cambios
    </nui-button>
    
    <!-- Using a directive on a native button -->
    <button
      nuiButton
      variant="outline"
      color="danger"
      icon="ri-delete-bin-line"
      [loading]="isDeleting()"
      (click)="handleDelete()">
      Eliminar
    </button>
    
    <!-- Link with button appearance -->
    <a
      nuiButton
      variant="ghost"
      color="accent"
      icon="ri-external-link-line"
      iconPosition="end"
      href="/docs"
      target="_blank">
      Ver Documentación
    </a>
  \`
})
export class ExampleComponent {
  isSaving = signal(false);
  isDeleting = signal(false);
  isFormValid = signal(true);
  
  async handleSave(): Promise<void> {
    if (!this.isFormValid()) return;
    
    this.isSaving.set(true);
    try {
      await this.apiService.save();
      console.log('Saved successfully');
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      this.isSaving.set(false);
    }
  }
  
  async handleDelete(): Promise<void> {
    this.isDeleting.set(true);
    try {
      await this.apiService.delete();
      console.log('Deleted successfully');
    } finally {
      this.isDeleting.set(false);
    }
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.button.styling.title',
      description: 'components.button.styling.description',
      anchor: 'styles',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Sizes */
  --nui-button-height-xs: 24px;
  --nui-button-height-sm: 32px;
  --nui-button-height-md: 40px;
  --nui-button-height-lg: 48px;
  --nui-button-height-xl: 56px;
  
  --nui-button-padding-x-xs: var(--spacing-sm);
  --nui-button-padding-x-sm: var(--spacing-md);
  --nui-button-padding-x-md: var(--spacing-lg);
  --nui-button-padding-x-lg: var(--spacing-xl);
  --nui-button-padding-x-xl: var(--spacing-2xl);
  
  /* Typography */
  --nui-button-font-size-xs: var(--font-size-xs);
  --nui-button-font-size-sm: var(--font-size-sm);
  --nui-button-font-size-md: var(--font-size-md);
  --nui-button-font-size-lg: var(--font-size-lg);
  --nui-button-font-size-xl: var(--font-size-xl);
  --nui-button-font-weight: var(--font-weight-medium);
  
  /* Borders and shape */
  --nui-button-border-radius: var(--border-radius-md);
  --nui-button-border-width: 1px;
  
  /* Internal spacing */
  --nui-button-icon-gap: var(--spacing-sm);
  --nui-button-icon-only-padding: var(--spacing-sm);
  
  /* Transitions */
  --nui-button-transition: all 0.2s ease;
  
  /* States - generated dynamically by color */
  /* Solid variant */
  --nui-button-solid-bg: var(--primary-color);
  --nui-button-solid-text: var(--nui-text-on-primary);
  --nui-button-solid-hover-bg: var(--primary-hover);
  --nui-button-solid-active-bg: var(--primary-active);
  
  /* Outline variant */
  --nui-button-outline-border: var(--primary-color);
  --nui-button-outline-text: var(--primary-color);
  --nui-button-outline-hover-bg: var(--primary-bg-subtle);
  
  /* Ghost variant */
  --nui-button-ghost-text: var(--primary-color);
  --nui-button-ghost-hover-bg: var(--primary-bg-subtle);
  
  /* Disabled */
  --nui-button-disabled-opacity: 0.5;
  --nui-button-disabled-cursor: not-allowed;
  
  /* Loading */
  --nui-button-loading-spinner-size: 16px;
  --nui-button-loading-opacity: 0.7;
}

// Customization example
.my-custom-button {
  --nui-button-border-radius: 20px;
  --nui-button-font-weight: var(--font-weight-bold);
  --nui-button-height-md: 44px;
  --nui-button-padding-x-md: 24px;
  
  /* Custom shadows */
  &.nui-button--solid {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
    
    &:active {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(0);
    }
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
