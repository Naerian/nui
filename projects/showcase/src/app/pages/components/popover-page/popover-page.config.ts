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
      anchor: 'basico',
      examples: [
        {
          title: 'components.popover.basic.codeTitle',
          code: `<nui-button nuiPopover="Información adicional del elemento">
  Ver información
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.popover.positions.title',
      description: 'components.popover.positions.description',
      anchor: 'posiciones',
      examples: [
        {
          title: 'components.popover.positions.codeTitle',
          code: `<nui-button nuiPopover="Popover arriba" popoverPosition="top">
  Top
</nui-button>

<nui-button nuiPopover="Popover abajo" popoverPosition="bottom">
  Bottom
</nui-button>

<nui-button nuiPopover="Popover izquierda" popoverPosition="left">
  Left
</nui-button>

<nui-button nuiPopover="Popover derecha" popoverPosition="right">
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
      anchor: 'eventos',
      examples: [
        {
          title: 'components.popover.events.codeTitle',
          code: `<!-- Click (default) -->
<nui-button nuiPopover="Popover con click" popoverEvent="click">
  Click Event
</nui-button>

<!-- Hover -->
<nui-button nuiPopover="Popover con hover" popoverEvent="hover">
  Hover Event
</nui-button>

<!-- Focus -->
<input 
  type="text" 
  nuiPopover="Ayuda para este campo" 
  popoverEvent="focus"
  placeholder="Enfoca para ver ayuda"
/>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'template',
      title: 'components.popover.template.title',
      description: 'components.popover.template.description',
      anchor: 'template',
      examples: [
        {
          title: 'components.popover.template.htmlTitle',
          code: `<nui-button [nuiPopover]="popoverTemplate">
  Ver detalles
</nui-button>

<ng-template #popoverTemplate let-close="close">
  <div class="custom-popover">
    <h3 class="custom-popover__title">Título del Popover</h3>
    <p class="custom-popover__text">Este es el contenido del popover con un template personalizado.</p>
    <div class="custom-popover__actions">
      <nui-button size="sm" variant="outline" (onClick)="close()">
        Cancelar
      </nui-button>
      <nui-button size="sm" (onClick)="handleAction(); close()">
        Aceptar
      </nui-button>
    </div>
  </div>
</ng-template>`,
          language: 'html',
        },
        {
          title: 'components.popover.template.scssTitle',
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
          title: 'components.popover.template.tsTitle',
          code: `export class MyComponent {
  handleAction() {
    console.log('Acción confirmada');
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
      anchor: 'componente',
      examples: [
        {
          title: 'components.popover.component.parentHtmlTitle',
          code: `<nui-button 
  [nuiPopover]="UserProfilePopoverComponent"
  [popoverData]="{ userId: 123, userName: 'Juan Pérez' }">
  Ver perfil
</nui-button>`,
          language: 'html',
        },
        {
          title: 'components.popover.component.parentTsTitle',
          code: `import { UserProfilePopoverComponent } from './user-profile-popover.component';

export class MyComponent {
  UserProfilePopoverComponent = UserProfilePopoverComponent;
}`,
          language: 'typescript',
        },
        {
          title: 'components.popover.component.childTitle',
          code: `import { Component, inject } from '@angular/core';
import { POPOVER_DATA, POPOVER_CLOSE } from '@shared/components/popover';

@Component({
  selector: 'app-user-profile-popover',
  standalone: true,
  template: \`
    <div class="user-profile-popover">
      <h3>{{ data.userName }}</h3>
      <p>ID: {{ data.userId }}</p>
      <button (click)="close()">Cerrar</button>
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
          title: 'components.popover.delays.codeTitle',
          code: `<!-- Delay al mostrar (500ms) -->
<nui-button 
  nuiPopover="Aparece después de 500ms" 
  [popoverShowDelay]="500">
  Show Delay
</nui-button>

<!-- Delay al ocultar (1000ms) -->
<nui-button 
  nuiPopover="Se oculta después de 1s" 
  popoverEvent="hover"
  [popoverHideDelay]="1000">
  Hide Delay
</nui-button>

<!-- Ambos delays -->
<nui-button 
  nuiPopover="Delays combinados" 
  popoverEvent="hover"
  [popoverShowDelay]="300"
  [popoverHideDelay]="500">
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
      anchor: 'personalizacion',
      examples: [
        {
          title: 'components.popover.customization.codeTitle',
          code: `<!-- Sin flecha -->
<nui-button 
  nuiPopover="Popover sin flecha" 
  [popoverShowArrow]="false">
  Sin flecha
</nui-button>

<!-- Ancho personalizado -->
<nui-button 
  nuiPopover="Popover con ancho personalizado de 400px" 
  popoverMaxWidth="400px">
  Ancho custom
</nui-button>

<!-- Clase CSS personalizada -->
<nui-button 
  nuiPopover="Popover con estilo custom" 
  popoverClass="my-custom-popover">
  Clase custom
</nui-button>

<!-- Offset personalizado -->
<nui-button 
  nuiPopover="Mayor separación del trigger" 
  [popoverOffset]="20">
  Offset 20px
</nui-button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'closeOptions',
      title: 'components.popover.closeOptions.title',
      description: 'components.popover.closeOptions.description',
      anchor: 'opciones-cierre',
      examples: [
        {
          title: 'components.popover.closeOptions.codeTitle',
          code: `<!-- No cerrar al hacer click fuera -->
<nui-button 
  nuiPopover="No se cierra al hacer click fuera" 
  [popoverCloseOnClickOutside]="false">
  Click Outside OFF
</nui-button>

<!-- No cerrar con Escape -->
<nui-button 
  nuiPopover="No se cierra con la tecla Escape" 
  [popoverCloseOnEscape]="false">
  Escape OFF
</nui-button>

<!-- Múltiples popovers abiertos -->
<nui-button 
  nuiPopover="Permite múltiples popovers abiertos" 
  [popoverAllowMultiple]="true">
  Multiple 1
</nui-button>

<nui-button 
  nuiPopover="Otro popover que puede estar abierto simultáneamente" 
  [popoverAllowMultiple]="true">
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
      anchor: 'backdrop',
      examples: [
        {
          title: 'components.popover.backdrop.codeTitle',
          code: `<!-- Con backdrop (fondo oscuro) -->
<nui-button 
  [nuiPopover]="modalTemplate" 
  [popoverBackdrop]="true">
  Con Backdrop
</nui-button>

<!-- Backdrop sin cerrar al hacer click -->
<nui-button 
  [nuiPopover]="modalTemplate" 
  [popoverBackdrop]="true"
  [backdropClose]="false">
  Backdrop sin cierre
</nui-button>

<ng-template #modalTemplate let-close="close">
  <div class="modal-content">
    <h3>Popover Modal</h3>
    <p>Este popover tiene un backdrop oscuro detrás.</p>
    <nui-button (onClick)="close()">Cerrar</nui-button>
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
      anchor: 'deshabilitado',
      examples: [
        {
          title: 'components.popover.disabled.htmlTitle',
          code: `<nui-button 
  nuiPopover="Este popover está deshabilitado" 
  [popoverDisabled]="isDisabled">
  Popover condicional
</nui-button>

<nui-button (onClick)="isDisabled = !isDisabled">
  Toggle disabled
</nui-button>`,
          language: 'html',
        },
        {
          title: 'components.popover.disabled.tsTitle',
          code: `export class MyComponent {
  isDisabled = false;
}`,
          language: 'typescript',
        },
      ],
    },
  ],
};
