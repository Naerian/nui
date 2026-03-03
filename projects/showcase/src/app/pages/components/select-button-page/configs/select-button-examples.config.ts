import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos interactivos del Select Button
 */
export const SELECT_BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.selectButton.basic.title',
    description: 'components.selectButton.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn 
  [options]="['New York', 'Los Angeles']" 
  [(ngModel)]="selectedCity">
</nui-select-btn>

<p>Seleccionado: {{ selectedCity() }}</p>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'modes',
    title: 'components.selectButton.modes.title',
    description: 'components.selectButton.modes.description',
    anchor: 'modes',
    note: {
      type: 'info',
      content: 'components.selectButton.modes.note',
    },
    examples: [
      {
        title: 'Radio',
        code: `<nui-select-btn 
  mode="radio"
  [options]="options" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selected">
</nui-select-btn>`,
        language: 'html',
      },
      {
        title: 'Checkbox',
        code: `<nui-select-btn 
  mode="checkbox"
  [options]="formats" 
  labelBy="label"
  iconBy="icon"
  valueBy="id"
  [(ngModel)]="selectedFormats">
</nui-select-btn>`,
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
    title: 'components.selectButton.complex.title',
    description: 'components.selectButton.complex.description',
    anchor: 'complex',
    note: {
      type: 'info',
      content: 'components.selectButton.complex.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn 
  [options]="users"
  labelBy="name"    
  valueBy="id"      
  disabledBy="disabled" 
  [(ngModel)]="selectedUserId">
</nui-select-btn>
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
    title: 'components.selectButton.icons.title',
    description: 'components.selectButton.icons.description',
    anchor: 'icons',
    note: {
      type: 'info',
      content: 'components.selectButton.icons.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn 
  [options]="textFormats" 
  iconBy="icon"
  [iconOnly]="true" 
  mode="checkbox"
  valueBy="id">
</nui-select-btn>
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
    title: 'components.selectButton.colors.title',
    description: 'components.selectButton.colors.description',
    anchor: 'colors',
    note: {
      type: 'info',
      content: 'components.selectButton.colors.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn color="primary" variant="solid" [options]="..."></nui-select-btn>
<nui-select-btn color="danger" variant="ghost" [options]="..."></nui-select-btn>
<nui-select-btn color="success" variant="outline" [options]="..."></nui-select-btn>
`,
        language: 'html',
      },
    ],
  },
  {
    id: 'segmented',
    title: 'components.selectButton.segmented.title',
    description: 'components.selectButton.segmented.description',
    anchor: 'segmented',
    note: {
      type: 'info',
      content: 'components.selectButton.segmented.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn 
  variant="segmented"
  [options]="periods"
  [(ngModel)]="selectedPeriod">
</nui-select-btn>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'sizes',
    title: 'components.selectButton.sizes.title',
    description: 'components.selectButton.sizes.description',
    anchor: 'sizes',
    note: {
      type: 'info',
      content: 'components.selectButton.sizes.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-select-btn size="xs" layout="segmented" [options]="..."></nui-select-btn>
<nui-select-btn size="sm" layout="segmented" [options]="..."></nui-select-btn>
<nui-select-btn size="md" layout="segmented" [options]="..."></nui-select-btn>
<nui-select-btn size="lg" layout="segmented" [options]="..."></nui-select-btn>
<nui-select-btn size="xl" layout="segmented" [options]="..."></nui-select-btn>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'width',
    title: 'components.selectButton.width.title',
    description: 'components.selectButton.width.description',
    anchor: 'width',
    note: {
      type: 'info',
      content: 'components.selectButton.width.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<div style="width: 100%; max-width: 400px">
  <nui-select-btn width="full" [options]="['Log In', 'Sign Up']"></nui-select-btn>
</div>`,
        language: 'html',
      },
    ],
  },
];
