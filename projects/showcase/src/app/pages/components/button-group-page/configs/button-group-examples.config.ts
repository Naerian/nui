import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos interactivos del Button Group
 */
export const BUTTON_GROUP_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.buttonGroup.basic.title',
    description: 'components.buttonGroup.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-btn-group 
  [options]="['New York', 'Los Angeles']" 
  [(ngModel)]="selectedCity">
</nui-btn-group>

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
        code: `<nui-btn-group 
  mode="radio"
  [options]="options" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selected">
</nui-btn-group>`,
        language: 'html',
      },
      {
        title: 'Checkbox',
        code: `<nui-btn-group 
  mode="checkbox"
  [options]="formats" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selectedFormats">
</nui-btn-group>`,
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
        code: `<nui-btn-group 
  [options]="users"
  labelBy="name"    
  valueBy="id"      
  disabledBy="disabled" 
  [(ngModel)]="selectedUserId">
</nui-btn-group>
`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `users = [
  { id: 101, name: 'Ana G.', role: 'Admin', status: 'active' },
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
        code: `<nui-btn-group 
  [options]="textFormats" 
  iconBy="icon"
  [iconOnly]="true" 
  mode="checkbox"
  valueBy="id">
</nui-btn-group>
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
        code: `<nui-btn-group color="primary" variant="solid" [options]="..."></nui-btn-group>
<nui-btn-group color="danger" variant="ghost" [options]="..."></nui-btn-group>
<nui-btn-group color="success" variant="outline" [options]="..."></nui-btn-group>
`,
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
        title: 'codeExamples.html',
        code: `<nui-btn-group 
  layout="segmented"
  [options]="periods"
  [(ngModel)]="selectedPeriod">
</nui-btn-group>`,
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
        code: `<nui-btn-group size="xs" layout="segmented" [options]="..."></nui-btn-group>
<nui-btn-group size="sm" layout="segmented" [options]="..."></nui-btn-group>
<nui-btn-group size="md" layout="segmented" [options]="..."></nui-btn-group>
<nui-btn-group size="lg" layout="segmented" [options]="..."></nui-btn-group>
<nui-btn-group size="xl" layout="segmented" [options]="..."></nui-btn-group>`,
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
  <nui-btn-group width="full" [options]="['Log In', 'Sign Up']"></nui-btn-group>
</div>`,
        language: 'html',
      },
    ],
  },
];
