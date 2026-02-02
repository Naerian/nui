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
      anchor: 'basico',
      examples: [
        {
          title: 'components.buttonGroup.basic.codeTitle',
          code: `<nui-button-group 
  [options]="['Madrid', 'Barcelona', 'Valencia', 'Sevilla']" 
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
      anchor: 'modos',
      note: {
        type: 'info',
        content: 'components.buttonGroup.modes.note',
      },
      examples: [
        {
          title: 'components.buttonGroup.modes.codeTitle',
          code: `<!-- Radio: selección única (default) -->
<nui-button-group 
  mode="radio"
  [options]="options" 
  [(ngModel)]="selected">
</nui-button-group>

<!-- Checkbox: selección múltiple -->
<nui-button-group 
  mode="checkbox"
  [options]="formats" 
  labelBy="label"
  valueBy="id"
  [(ngModel)]="selectedFormats">
</nui-button-group>`,
          language: 'html',
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
          title: 'components.buttonGroup.segmented.codeTitle',
          code: `<nui-button-group 
  visualVariant="segmented"
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
      anchor: 'objetos-complejos',
      note: {
        type: 'info',
        content: 'components.buttonGroup.complex.note',
      },
      examples: [
        {
          title: 'components.buttonGroup.complex.codeTitle',
          code: `<nui-button-group 
  [options]="users"
  labelBy="name"    
  valueBy="id"      
  disabledBy="disabled" 
  [(ngModel)]="selectedUserId">
</nui-button-group>

// TypeScript
users = [
  { id: 101, name: 'Ana García', role: 'Admin', status: 'active' },
  { id: 102, name: 'Carlos Ruíz', role: 'Editor', status: 'busy' },
  { id: 103, name: 'Lucía M.', role: 'Viewer', disabled: true },
];`,
          language: 'html',
        },
      ],
    },
    {
      id: 'icons',
      title: 'components.buttonGroup.icons.title',
      description: 'components.buttonGroup.icons.description',
      anchor: 'iconos',
      note: {
        type: 'info',
        content: 'components.buttonGroup.icons.note',
      },
      examples: [
        {
          title: 'components.buttonGroup.icons.codeTitle',
          code: `<!-- Con iconos e iconOnly -->
<nui-button-group 
  [options]="textFormats" 
  iconBy="icon"
  [iconOnly]="true" 
  mode="checkbox"
  valueBy="id">
</nui-button-group>

// TypeScript
textFormats = [
  { id: 'bold', icon: 'ri-bold', label: 'Negrita' },
  { id: 'italic', icon: 'ri-italic', label: 'Cursiva' },
  { id: 'underline', icon: 'ri-underline', label: 'Subrayado' },
];`,
          language: 'html',
        },
      ],
    },
    {
      id: 'styles',
      title: 'components.buttonGroup.styles.title',
      description: 'components.buttonGroup.styles.description',
      anchor: 'estilos',
      note: {
        type: 'info',
        content: 'components.buttonGroup.styles.note',
      },
      examples: [
        {
          title: 'components.buttonGroup.styles.codeTitle',
          code: `<!-- Colores y variantes -->
<nui-button-group color="primary" variant="solid" [options]="..."></nui-button-group>
<nui-button-group color="danger" variant="ghost" [options]="..."></nui-button-group>
<nui-button-group color="success" variant="outline" [options]="..."></nui-button-group>

<!-- Tamaños -->
<nui-button-group size="xs" visualVariant="segmented" [options]="..."></nui-button-group>
<nui-button-group size="sm" visualVariant="segmented" [options]="..."></nui-button-group>
<nui-button-group size="md" visualVariant="segmented" [options]="..."></nui-button-group>
<nui-button-group size="lg" visualVariant="segmented" [options]="..."></nui-button-group>
<nui-button-group size="xl" visualVariant="segmented" [options]="..."></nui-button-group>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'width',
      title: 'components.buttonGroup.width.title',
      description: 'components.buttonGroup.width.description',
      anchor: 'ancho',
      note: {
        type: 'info',
        content: 'components.buttonGroup.width.note',
      },
      examples: [
        {
          title: 'components.buttonGroup.width.codeTitle',
          code: `<nui-button-group 
  width="full" 
  [options]="periods"
  [(ngModel)]="selectedPeriod">
</nui-button-group>`,
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
          title: 'components.buttonGroup.api.inputsCodeTitle',
          code: `// Inputs del componente
@Input() options: T[] = [];                    // Array de opciones (strings o objetos)
@Input() mode: 'radio' | 'checkbox' = 'radio'; // Tipo de selección
@Input() labelBy?: keyof T;                    // Propiedad para el label (objetos)
@Input() valueBy?: keyof T;                    // Propiedad para el value (objetos)
@Input() iconBy?: keyof T;                     // Propiedad para el icono (objetos)
@Input() disabledBy?: keyof T;                 // Propiedad para estado disabled (objetos)
@Input() iconOnly = false;                     // Mostrar solo iconos sin texto
@Input() visualVariant: 'default' | 'segmented' = 'default'; // Estilo visual
@Input() variant: ButtonVariant = 'outline';   // Variante del botón
@Input() color?: ButtonColor;                  // Color del tema
@Input() size: ButtonSize = 'md';              // Tamaño: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() width: 'auto' | 'full' = 'auto';      // Ancho del grupo
@Input() disabled = false;                     // Deshabilitar todo el grupo

// Outputs del componente
@Output() valueChange = new EventEmitter<T | T[]>(); // Cambio de valor`,
          language: 'typescript',
        },
        {
          title: 'components.buttonGroup.api.usageCodeTitle',
          code: `// Ejemplo completo con objetos complejos
import { Component, signal } from '@angular/core';

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
      visualVariant="segmented"
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
      anchor: 'estilos',
      examples: [
        {
          title: 'components.buttonGroup.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Espaciado entre botones */
  --nui-button-group-gap: 0;
  --nui-button-group-segmented-gap: var(--spacing-xxs);
  
  /* Variante Segmented - Contenedor */
  --nui-button-group-segmented-bg: var(--nui-bg-secondary);
  --nui-button-group-segmented-padding: var(--spacing-xxs);
  --nui-button-group-segmented-border-radius: var(--border-radius-md);
  --nui-button-group-segmented-border: 1px solid var(--nui-border-primary);
  
  /* Variante Segmented - Botón seleccionado */
  --nui-button-group-segmented-selected-bg: var(--nui-bg-primary);
  --nui-button-group-segmented-selected-shadow: var(--nui-shadow-sm);
  --nui-button-group-segmented-selected-border: 1px solid var(--nui-border-primary);
  
  /* Variante Segmented - Botón no seleccionado */
  --nui-button-group-segmented-unselected-bg: transparent;
  --nui-button-group-segmented-unselected-text: var(--nui-text-secondary);
  
  /* Variante Segmented - Hover */
  --nui-button-group-segmented-hover-bg: var(--nui-bg-hover);
  
  /* Transiciones */
  --nui-button-group-transition: all 0.2s ease;
}

// Ejemplo de customización para tema iOS
.ios-style-group {
  --nui-button-group-segmented-bg: #f2f2f7;
  --nui-button-group-segmented-selected-bg: #ffffff;
  --nui-button-group-segmented-border-radius: 9px;
  --nui-button-group-segmented-padding: 2px;
  --nui-button-group-segmented-selected-shadow: 0 3px 8px rgba(0, 0, 0, 0.12),
                                                0 3px 1px rgba(0, 0, 0, 0.04);
}

// Ejemplo de grupo compacto
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
