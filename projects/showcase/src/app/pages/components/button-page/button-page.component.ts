import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

interface CodeExample {
  title: string;
  code: string;
  language: string;
}

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent, CodeBlockComponent],
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
})
export class ButtonPageComponent {
  // 1. Botón básico
  basicButtonExamples: CodeExample[] = [
    {
      title: 'components.button.basic.codeTitle',
      code: `<nui-button>Click me</nui-button>`,
      language: 'html',
    },
  ];

  // 2. Variantes (solid, outline, ghost)
  variantExamples: CodeExample[] = [
    {
      title: 'components.button.variants.codeTitle',
      code: `<nui-button variant="solid">Solid Button</nui-button>
<nui-button variant="outline">Outline Button</nui-button>
<nui-button variant="ghost">Ghost Button</nui-button>`,
      language: 'html',
    },
  ];

  // 3. Colores
  colorExamples: CodeExample[] = [
    {
      title: 'components.button.colors.codeTitle',
      code: `<nui-button color="primary">Primary</nui-button>
<nui-button color="secondary">Secondary</nui-button>
<nui-button color="accent">Accent</nui-button>
<nui-button color="success">Success</nui-button>
<nui-button color="info">Info</nui-button>
<nui-button color="warning">Warning</nui-button>
<nui-button color="danger">Danger</nui-button>`,
      language: 'html',
    },
  ];

  // 4. Tamaños
  sizeExamples: CodeExample[] = [
    {
      title: 'components.button.sizes.codeTitle',
      code: `<nui-button size="xs">Extra Small</nui-button>
<nui-button size="sm">Small</nui-button>
<nui-button size="md">Medium</nui-button>
<nui-button size="lg">Large</nui-button>
<nui-button size="xl">Extra Large</nui-button>`,
      language: 'html',
    },
  ];

  // 5. Con iconos
  iconExamples: CodeExample[] = [
    {
      title: 'components.button.icons.codeTitle',
      code: `<nui-button icon="ri-user-line">Profile</nui-button>
<nui-button icon="ri-arrow-right-line" iconPosition="end">Next</nui-button>
<nui-button icon="ri-settings-line" aria-label="Settings"></nui-button>`,
      language: 'html',
    },
  ];

  // 6. Estado loading
  loadingExamples: CodeExample[] = [
    {
      title: 'components.button.loading.htmlTitle',
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
      title: 'components.button.loading.tsTitle',
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
  ];

  // 7. Ancho
  widthExamples: CodeExample[] = [
    {
      title: 'components.button.width.codeTitle',
      code: `<nui-button width="auto">Auto Width</nui-button>
<nui-button width="full">Full Width</nui-button>
<nui-button width="fit">Fit Content</nui-button>`,
      language: 'html',
    },
  ];

  // 8. Estado deshabilitado
  disabledExamples: CodeExample[] = [
    {
      title: 'components.button.disabled.codeTitle',
      code: `<nui-button [disabled]="true">Disabled Button</nui-button>
<nui-button variant="outline" [disabled]="true">Disabled Outline</nui-button>`,
      language: 'html',
    },
  ];

  // 9. Eventos
  eventExamples: CodeExample[] = [
    {
      title: 'components.button.events.htmlTitle',
      code: `<nui-button (onClick)="handleClick()">Click Event</nui-button>
<nui-button type="submit" (onClick)="handleSubmit($event)">Submit Form</nui-button>`,
      language: 'html',
    },
    {
      title: 'components.button.events.tsTitle',
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
  ];

  // 10. Combinaciones avanzadas
  advancedExamples: CodeExample[] = [
    {
      title: 'components.button.advanced.codeTitle',
      code: `<nui-button 
  color="primary" 
  size="lg" 
  icon="ri-save-line"
  width="full"
  (onClick)="save()">
  Save Changes
</nui-button>

<nui-button 
  color="danger" 
  variant="outline"
  icon="ri-delete-bin-line"
  [disabled]="!canDelete"
  (onClick)="confirmDelete()">
  Delete
</nui-button>

<nui-button 
  color="accent" 
  size="xl"
  icon="ri-add-line"
  aria-label="Add new item">
</nui-button>`,
      language: 'html',
    },
  ];

  // Variables para ejemplos interactivos
  isLoading = false;

  handleClick() {
    console.log('Button clicked!');
  }

  simulateLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
