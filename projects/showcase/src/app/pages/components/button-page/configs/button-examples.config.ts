import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Examples del componente Button
 * Contiene todas las demostraciones interactivas
 */
export const BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
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
      {
        title: 'Link',
        code: `<nui-button variant="link" color="primary">Primary</nui-button>
<nui-button variant="link" color="secondary">Secondary</nui-button>
<nui-button variant="link" color="accent">Accent</nui-button>
<nui-button variant="link" color="success">Success</nui-button>
<nui-button variant="link" color="info">Info</nui-button>
<nui-button variant="link" color="warning">Warning</nui-button>
<nui-button variant="link" color="danger">Danger</nui-button>
<nui-button variant="link" color="neutral">Neutral</nui-button>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'shapes',
    title: 'components.button.shapes.title',
    description: 'components.button.shapes.description',
    anchor: 'shapes',
    note: {
      type: 'info',
      content: 'components.button.shapes.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-button shape="rounded">Rounded</nui-button>
<nui-button shape="rounded" prefixIcon="ri-user-line" variant="outline"></nui-button>
<nui-button shape="square">Square</nui-button>
<nui-button shape="square" prefixIcon="ri-user-line" color="danger"></nui-button>
<nui-button shape="pill">Pill</nui-button>
<nui-button shape="pill" prefixIcon="ri-user-line"></nui-button>
<nui-button shape="square" color="danger" variant="ghost">Square</nui-button>
<nui-button shape="pill" color="success" variant="outline">Pill</nui-button>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'raised',
    title: 'components.button.raised.title',
    description: 'components.button.raised.description',
    anchor: 'raised',
    note: {
      type: 'info',
      content: 'components.button.raised.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-button raised>Raised Button</nui-button>
<nui-button raised color="primary">Raised Primary</nui-button>
<nui-button raised color="success" prefixIcon="ri-user-line" shape="pill"></nui-button>
<button nuiButton [raised]="true" color="success">Raised Directive</button>`,
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
        title: 'codeExamples.html',
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
        code: `<nui-button prefixIcon="ri-user-line">Profile</nui-button>
<nui-button suffixIcon="ri-arrow-right-line">Next</nui-button>
<nui-button prefixIcon="ri-settings-line" aria-label="Settings"></nui-button>
<nui-button prefixIcon="ri-settings-line" suffixIcon="ri-arrow-right-line" aria-label="Settings">Example</nui-button>`,
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
        code: `<!-- Spinner in start position with content -->
<nui-button
  [loading]="isLoading()"
  [size]="'xl'"
  loadingPosition="start"
  (onClick)="simulateLoading()"
>
  {{ isLoading() ? 'Loading...' : 'Click to Load' }}
</nui-button>

<!-- Spinner in end position, but content is replaced because only icon is present -->
<nui-button
  [loading]="isLoading()"
  loadingPosition="end"
  [prefixIcon]="'ri-loader-line'"
/>

<!-- Spinner in center position replaces content -->
<nui-button [loading]="isLoading()" [size]="'xs'" loadingPosition="center">
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
<button nuiButton prefixIcon="ri-save-line">Save</button>
<button nuiButton suffixIcon="ri-download-line">Download</button>

<!-- With loading -->
<button nuiButton [loading]="isLoading">Submit</button>

<!-- <a> elements with button appearance -->
<a nuiButton href="/profile" prefixIcon="ri-user-line">View Profile</a>
<a nuiButton variant="outline" color="accent" href="/settings">Settings</a>`,
        language: 'html',
      },
    ],
  },
];
