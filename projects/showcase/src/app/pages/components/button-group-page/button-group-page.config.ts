import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Button Group
 */
export const BUTTON_GROUP_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.buttonGroup.title',
  subtitle: 'components.buttonGroup.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.buttonGroup.basic.title',
      description: 'components.buttonGroup.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group 
  [options]="['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']" 
  [(ngModel)]="selectedCity">
</nui-button-group>

<p>Seleccionado: {{ selectedCity() }}</p>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'modes',
      title: 'components.buttonGroup.modes.title',
      description: 'components.buttonGroup.modes.description',
      anchor: 'modes',
      note: {
        type: 'info',
        content: 'components.buttonGroup.modes.note',
      },
      examples: [
        {
          title: 'Radio',
          code: `<nui-button-group 
  mode="radio"
  [options]="options" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selected">
</nui-button-group>`,
          language: 'html',
        },
        {
          title: 'Checkbox',
          code: `<nui-button-group 
  mode="checkbox"
  [options]="formats" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selectedFormats">
</nui-button-group>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `textFormats = [
    { id: 'bold', icon: 'ri-bold', label: 'Bold' },
    { id: 'italic', icon: 'ri-italic', label: 'Italic' },
    { id: 'underline', icon: 'ri-underline', label: 'Underline' },
  ]`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'segmented',
      title: 'components.buttonGroup.segmented.title',
      description: 'components.buttonGroup.segmented.description',
      anchor: 'segmented',
      note: {
        type: 'info',
        content: 'components.buttonGroup.segmented.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group 
  layout="segmented"
  [options]="periods"
  [(ngModel)]="selectedPeriod">
</nui-button-group>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'complex',
      title: 'components.buttonGroup.complex.title',
      description: 'components.buttonGroup.complex.description',
      anchor: 'complex',
      note: {
        type: 'info',
        content: 'components.buttonGroup.complex.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group 
  [options]="users"
  labelBy="name"    
  valueBy="id"      
  disabledBy="disabled" 
  [(ngModel)]="selectedUserId">
</nui-button-group>
`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `users = [
  { id: 101, name: 'Ana García', role: 'Admin', status: 'active' },
  { id: 102, name: 'Carlos Ruíz', role: 'Editor', status: 'busy' },
  { id: 103, name: 'Lucía M.', role: 'Viewer', disabled: true },
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'icons',
      title: 'components.buttonGroup.icons.title',
      description: 'components.buttonGroup.icons.description',
      anchor: 'icons',
      note: {
        type: 'info',
        content: 'components.buttonGroup.icons.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group 
  [options]="textFormats" 
  iconBy="icon"
  [iconOnly]="true" 
  mode="checkbox"
  valueBy="id">
</nui-button-group>
`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `textFormats = [
  { id: 'bold', icon: 'ri-bold', label: 'Negrita' },
  { id: 'italic', icon: 'ri-italic', label: 'Cursiva' },
  { id: 'underline', icon: 'ri-underline', label: 'Subrayado' },
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'colors',
      title: 'components.buttonGroup.colors.title',
      description: 'components.buttonGroup.colors.description',
      anchor: 'colors',
      note: {
        type: 'info',
        content: 'components.buttonGroup.colors.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group color="primary" variant="solid" [options]="..."></nui-button-group>
<nui-button-group color="danger" variant="ghost" [options]="..."></nui-button-group>
<nui-button-group color="success" variant="outline" [options]="..."></nui-button-group>
`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.buttonGroup.sizes.title',
      description: 'components.buttonGroup.sizes.description',
      anchor: 'sizes',
      note: {
        type: 'info',
        content: 'components.buttonGroup.sizes.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-button-group size="xs" layout="segmented" [options]="..."></nui-button-group>
<nui-button-group size="sm" layout="segmented" [options]="..."></nui-button-group>
<nui-button-group size="md" layout="segmented" [options]="..."></nui-button-group>
<nui-button-group size="lg" layout="segmented" [options]="..."></nui-button-group>
<nui-button-group size="xl" layout="segmented" [options]="..."></nui-button-group>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'width',
      title: 'components.buttonGroup.width.title',
      description: 'components.buttonGroup.width.description',
      anchor: 'width',
      note: {
        type: 'info',
        content: 'components.buttonGroup.width.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<div style="width: 100%; max-width: 400px">
  <nui-button-group width="full" [options]="['Log In', 'Sign Up']"></nui-button-group>
</div>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.buttonGroup.api.title',
      description: 'components.buttonGroup.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.componentCode',
          code: `@Input() options: T[] = [];                    // Array of options (strings or objects)
@Input() mode: 'radio' | 'checkbox' = 'radio'; // Selection type
@Input() labelBy?: keyof T;                    // Property for the label (objects)
@Input() valueBy?: keyof T;                    // Property for the value (objects)
@Input() iconBy?: keyof T;                     // Property for the icon (objects)
@Input() disabledBy?: keyof T;                 // Property for the disabled state (objects)
@Input() iconOnly = false;                     // Show icons only without text
@Input() layout: 'default' | 'segmented' = 'default'; // Visual style
@Input() variant: ButtonVariant = 'outline';   // Button variant
@Input() color?: ButtonColor;                  // Theme color
@Input() size: ButtonSize = 'md';              // Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() width: 'auto' | 'full' = 'auto';      // Group width
@Input() disabled = false;                     // Disable the entire group

@Output() valueChange = new EventEmitter<T | T[]>(); // Value change event`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component, signal } from '@angular/core';

interface Filter {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-example',
  template: \`
    <nui-button-group
      mode="checkbox"
      layout="segmented"
      [options]="filters"
      labelBy="label"
      valueBy="id"
      iconBy="icon"
      disabledBy="disabled"
      color="primary"
      size="md"
      [(ngModel)]="selectedFilters"
      (valueChange)="onFilterChange($event)">
    </nui-button-group>
    
    <p>Filtros activos: {{ selectedFilters().join(', ') }}</p>
  \`
})
export class ExampleComponent {
  filters: Filter[] = [
    { id: 'active', label: 'Activos', icon: 'ri-checkbox-circle-line' },
    { id: 'pending', label: 'Pendientes', icon: 'ri-time-line' },
    { id: 'completed', label: 'Completados', icon: 'ri-check-line' },
    { id: 'archived', label: 'Archivados', icon: 'ri-archive-line', disabled: true }
  ];
  
  selectedFilters = signal<string[]>(['active']);
  
  onFilterChange(filters: string[]): void {
    console.log('Filtros seleccionados:', filters);
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.buttonGroup.styling.title',
      description: 'components.buttonGroup.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Espaciado entre botones */
  --nui-button-group-gap: 0;
  --nui-button-group-segmented-gap: var(--nui-spacing-xxs);
  
  /* Segmented variant - Container */
  --nui-button-group-segmented-bg: var(--nui-bg-secondary);
  --nui-button-group-segmented-padding: var(--nui-spacing-xxs);
  --nui-button-group-segmented-border-radius: var(--nui-border-radius-md);
  --nui-button-group-segmented-border: 1px solid var(--nui-border-primary);
  
  /* Segmented variant - Selected button */
  --nui-button-group-segmented-selected-bg: var(--nui-bg-primary);
  --nui-button-group-segmented-selected-shadow: var(--nui-shadow-sm);
  --nui-button-group-segmented-selected-border: 1px solid var(--nui-border-primary);
  
  /* Segmented variant - Unselected button */
  --nui-button-group-segmented-unselected-bg: transparent;
  --nui-button-group-segmented-unselected-text: var(--nui-text-secondary);
  
  /* Segmented variant - Hover */
  --nui-button-group-segmented-hover-bg: var(--nui-bg-hover);
  
  /* Transitions */
  --nui-button-group-transition: all 0.2s ease;
}

// Example of customization for an iOS theme
.ios-style-group {
  --nui-button-group-segmented-bg: #f2f2f7;
  --nui-button-group-segmented-selected-bg: #ffffff;
  --nui-button-group-segmented-border-radius: 9px;
  --nui-button-group-segmented-padding: 2px;
  --nui-button-group-segmented-selected-shadow: 0 3px 8px rgba(0, 0, 0, 0.12),
                                                0 3px 1px rgba(0, 0, 0, 0.04);
}

// Example of a compact group
.compact-group {
  --nui-button-group-gap: -1px; // Solapar bordes
  
  ::ng-deep .nui-button-group {
    button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
