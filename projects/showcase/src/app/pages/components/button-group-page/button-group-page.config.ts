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
  ],
};
