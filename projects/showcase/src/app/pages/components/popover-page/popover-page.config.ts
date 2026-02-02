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
          code: `<nui-button nuiPopover="Popover arriba" nuiPopoverPosition="top">
  Top
</nui-button>

<nui-button nuiPopover="Popover abajo" nuiPopoverPosition="bottom">
  Bottom
</nui-button>

<nui-button nuiPopover="Popover izquierda" nuiPopoverPosition="left">
  Left
</nui-button>

<nui-button nuiPopover="Popover derecha" nuiPopoverPosition="right">
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
<nui-button nuiPopover="Popover con click" nuiPopoverEvent="click">
  Click Event
</nui-button>

<!-- Hover -->
<nui-button nuiPopover="Popover con hover" nuiPopoverEvent="hover">
  Hover Event
</nui-button>

<!-- Focus -->
<input 
  type="text" 
  nuiPopover="Ayuda para este campo" 
  nuiPopoverEvent="focus"
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
  [nuiPopoverData]="{ userId: 123, userName: 'Juan Pérez' }">
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
  [nuiPopoverShowDelay]="500">
  Show Delay
</nui-button>

<!-- Delay al ocultar (1000ms) -->
<nui-button 
  nuiPopover="Se oculta después de 1s" 
  nuiPopoverEvent="hover"
  [nuiPopoverHideDelay]="1000">
  Hide Delay
</nui-button>

<!-- Ambos delays -->
<nui-button 
  nuiPopover="Delays combinados" 
  nuiPopoverEvent="hover"
  [nuiPopoverShowDelay]="300"
  [nuiPopoverHideDelay]="500">
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
  [nuiPopoverShowArrow]="false">
  Sin flecha
</nui-button>

<!-- Ancho personalizado -->
<nui-button 
  nuiPopover="Popover con ancho personalizado de 400px" 
  nuiPopoverMaxWidth="400px">
  Ancho custom
</nui-button>

<!-- Clase CSS personalizada -->
<nui-button 
  nuiPopover="Popover con estilo custom" 
  nuiPopoverClass="my-custom-popover">
  Clase custom
</nui-button>

<!-- Offset personalizado -->
<nui-button 
  nuiPopover="Mayor separación del trigger" 
  [nuiPopoverOffset]="20">
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
  [nuiPopoverCloseOnClickOutside]="false">
  Click Outside OFF
</nui-button>

<!-- No cerrar con Escape -->
<nui-button 
  nuiPopover="No se cierra con la tecla Escape" 
  [nuiPopoverCloseOnEscape]="false">
  Escape OFF
</nui-button>

<!-- Múltiples popovers abiertos -->
<nui-button 
  nuiPopover="Permite múltiples popovers abiertos" 
  [nuiPopoverAllowMultiple]="true">
  Multiple 1
</nui-button>

<nui-button 
  nuiPopover="Otro popover que puede estar abierto simultáneamente" 
  [nuiPopoverAllowMultiple]="true">
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
  [nuiPopoverBackdrop]="true">
  Con Backdrop
</nui-button>

<!-- Backdrop sin cerrar al hacer click -->
<nui-button 
  [nuiPopover]="modalTemplate" 
  [nuiPopoverBackdrop]="true"
  [nuiBackdropClose]="false">
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
  [nuiPopoverDisabled]="isDisabled">
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
    {
      id: 'api',
      title: 'components.popover.api.title',
      description: 'components.popover.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'components.popover.api.directiveCodeTitle',
          code: `// Inputs de la directiva nuiPopover
@Input() nuiPopover: string | TemplateRef<any> | Type<any>; // Contenido del popover
@Input() nuiPopoverPosition: PopoverPosition = 'top'; // Posición: 'top' | 'bottom' | 'left' | 'right'
@Input() nuiPopoverEvent: 'click' | 'hover' | 'focus' | 'manual' = 'click'; // Evento de activación
@Input() nuiPopoverData?: any;                        // Datos para componentes dinámicos
@Input() nuiPopoverShowArrow = true;                  // Mostrar flecha
@Input() nuiPopoverMaxWidth = '300px';                // Ancho máximo del popover
@Input() nuiPopoverClass?: string;                    // Clase CSS personalizada
@Input() nuiPopoverOffset = 8;                        // Distancia desde el trigger (px)
@Input() nuiPopoverShowDelay = 0;                     // Delay al mostrar (ms)
@Input() nuiPopoverHideDelay = 0;                     // Delay al ocultar (ms)
@Input() nuiPopoverCloseOnClickOutside = true;        // Cerrar al hacer click fuera
@Input() nuiPopoverCloseOnEscape = true;              // Cerrar con tecla Escape
@Input() nuiPopoverAllowMultiple = false;             // Permitir múltiples popovers abiertos
@Input() nuiPopoverBackdrop = false;                  // Mostrar backdrop
@Input() nuiBackdropClose = true;                     // Cerrar al hacer click en backdrop
@Input() nuiPopoverDisabled = false;                  // Deshabilitar popover

// Outputs de la directiva
@Output() nuiPopoverShow = new EventEmitter<void>(); // Se emite al abrir
@Output() nuiPopoverHide = new EventEmitter<void>(); // Se emite al cerrar`,
          language: 'typescript',
        },
        {
          title: 'components.popover.api.tokensCodeTitle',
          code: `// Tokens de inyección para componentes dinámicos
import { POPOVER_DATA, POPOVER_CLOSE } from 'nui';

@Component({
  selector: 'app-my-popover',
  template: \`
    <div>
      <p>{{ data.message }}</p>
      <button (click)="close()">Cerrar</button>
    </div>
  \`
})
export class MyPopoverComponent {
  // Inyectar datos pasados al popover
  data = inject(POPOVER_DATA);
  
  // Inyectar función para cerrar el popover
  close = inject(POPOVER_CLOSE);
}`,
          language: 'typescript',
        },
        {
          title: 'components.popover.api.usageCodeTitle',
          code: `// Ejemplo completo de uso
import { Component, TemplateRef, signal } from '@angular/core';
import { MyPopoverComponent } from './my-popover.component';

@Component({
  selector: 'app-example',
  template: \`
    <!-- Con texto simple -->
    <button
      nuiPopover="Información del elemento"
      nuiPopoverPosition="top"
      nuiPopoverEvent="hover"
      [nuiPopoverShowDelay]="300"
      [nuiPopoverHideDelay]="100"
      (nuiPopoverShow)="onOpen()"
      (nuiPopoverHide)="onClose()">
      Texto
    </button>
    
    <!-- Con template -->
    <button
      [nuiPopover]="myTemplate"
      nuiPopoverPosition="bottom"
      nuiPopoverMaxWidth="400px"
      nuiPopoverClass="custom-popover">
      Template
    </button>
    
    <ng-template #myTemplate let-close="close">
      <div class="rich-content">
        <h3>Título</h3>
        <p>Contenido personalizado</p>
        <button (click)="handleAction(); close()">Aceptar</button>
      </div>
    </ng-template>
    
    <!-- Con componente dinámico -->
    <button
      [nuiPopover]="MyPopoverComponent"
      [nuiPopoverData]="{ userId: 123, userName: 'John' }"
      [nuiPopoverBackdrop]="true"
      [nuiBackdropClose]="false">
      Componente
    </button>
  \`
})
export class ExampleComponent {
  MyPopoverComponent = MyPopoverComponent;
  
  onOpen(): void {
    console.log('Popover abierto');
  }
  
  onClose(): void {
    console.log('Popover cerrado');
  }
  
  handleAction(): void {
    console.log('Acción ejecutada');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.popover.styling.title',
      description: 'components.popover.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.popover.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Contenedor del popover */
  --nui-popover-bg: var(--nui-bg-primary);
  --nui-popover-text: var(--nui-text-primary);
  --nui-popover-border: var(--nui-border-primary);
  --nui-popover-border-radius: var(--border-radius-md);
  --nui-popover-shadow: var(--nui-shadow-lg);
  --nui-popover-padding: var(--spacing-md);
  --nui-popover-max-width: 300px;
  --nui-popover-min-width: 100px;
  
  /* Z-index */
  --nui-popover-z-index: 1050;
  
  /* Flecha */
  --nui-popover-arrow-size: 8px;
  --nui-popover-arrow-bg: var(--nui-bg-primary);
  --nui-popover-arrow-border: var(--nui-border-primary);
  
  /* Backdrop */
  --nui-popover-backdrop-bg: rgba(0, 0, 0, 0.5);
  --nui-popover-backdrop-z-index: 1049;
  
  /* Animaciones */
  --nui-popover-animation-duration: 200ms;
  --nui-popover-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Estados */
  --nui-popover-focus-ring: 2px solid var(--primary-color);
  --nui-popover-focus-ring-offset: 2px;
}

// Ejemplo de popover con estilo custom
.my-custom-popover {
  --nui-popover-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --nui-popover-text: white;
  --nui-popover-border: transparent;
  --nui-popover-border-radius: 12px;
  --nui-popover-padding: 1.5rem;
  --nui-popover-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  --nui-popover-arrow-bg: #667eea;
}

// Ejemplo de popover minimalista
.minimal-popover {
  --nui-popover-bg: white;
  --nui-popover-border: 1px solid #e0e0e0;
  --nui-popover-border-radius: 4px;
  --nui-popover-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --nui-popover-padding: 0.75rem 1rem;
}

// Ejemplo con animación personalizada
.animated-popover {
  animation: popoverSlideIn var(--nui-popover-animation-duration) var(--nui-popover-animation-timing);
}

@keyframes popoverSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
