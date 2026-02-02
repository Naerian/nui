import { ComponentPageConfig } from '../../../core/models';

export const TOOLTIP_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.tooltip.title',
  subtitle: 'components.tooltip.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.tooltip.basic.title',
      description: 'components.tooltip.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'components.tooltip.basic.codeTitle',
          code: `// Tooltip básico con texto simple
<button nuiTooltip="Guardar cambios">Guardar</button>

// Con flecha desactivada
<button nuiTooltip="Sin flecha" [tooltipShowArrow]="false">
  Sin Flecha
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.tooltip.positions.title',
      description: 'components.tooltip.positions.description',
      anchor: 'positions',
      examples: [
        {
          title: 'components.tooltip.positions.codeTitle',
          code: `// Tooltip arriba (default)
<button nuiTooltip="Tooltip arriba" tooltipPosition="top">
  Top
</button>

// Tooltip abajo
<button nuiTooltip="Tooltip abajo" tooltipPosition="bottom">
  Bottom
</button>

// Tooltip izquierda
<button nuiTooltip="Tooltip izquierda" tooltipPosition="left">
  Left
</button>

// Tooltip derecha
<button nuiTooltip="Tooltip derecha" tooltipPosition="right">
  Right
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'events',
      title: 'components.tooltip.events.title',
      description: 'components.tooltip.events.description',
      anchor: 'events',
      examples: [
        {
          title: 'components.tooltip.events.codeTitle',
          code: `// Hover (default)
<button nuiTooltip="Tooltip al hacer hover">Hover</button>

// Click
<button nuiTooltip="Tooltip al hacer click" tooltipEvent="click">
  Click
</button>

// Focus
<input nuiTooltip="Tooltip al enfocar" tooltipEvent="focus" />`,
          language: 'html',
        },
      ],
    },
    {
      id: 'delays',
      title: 'components.tooltip.delays.title',
      description: 'components.tooltip.delays.description',
      anchor: 'delays',
      note: {
        type: 'info',
        content: 'components.tooltip.delays.note',
      },
      examples: [
        {
          title: 'components.tooltip.delays.codeTitle',
          code: `// Delay de entrada (500ms)
<button 
  nuiTooltip="Aparece después de 500ms" 
  [tooltipShowDelay]="500">
  Delay Entrada
</button>

// Delay de salida (1000ms)
<button 
  nuiTooltip="Desaparece después de 1s" 
  [tooltipHideDelay]="1000">
  Delay Salida
</button>

// Sin delay
<button 
  nuiTooltip="Sin delays" 
  [tooltipShowDelay]="0"
  [tooltipHideDelay]="0">
  Sin Delay
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'templates',
      title: 'components.tooltip.templates.title',
      description: 'components.tooltip.templates.description',
      anchor: 'templates',
      examples: [
        {
          title: 'components.tooltip.templates.codeTitle',
          code: `<button [nuiTooltip]="tooltipTemplate">Ver Info</button>

<ng-template #tooltipTemplate>
  <div class="custom-tooltip">
    <strong>Información Importante</strong>
    <p>Contenido personalizado</p>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'interactive',
      title: 'components.tooltip.interactive.title',
      description: 'components.tooltip.interactive.description',
      anchor: 'interactive',
      note: {
        type: 'info',
        content: 'components.tooltip.interactive.note',
      },
      examples: [
        {
          title: 'components.tooltip.interactive.codeTitle',
          code: `<button 
  [nuiTooltip]="interactiveTemplate" 
  [tooltipInteractive]="true">
  Tooltip Interactivo
</button>

<ng-template #interactiveTemplate>
  <div class="interactive-tooltip">
    <h4>Acciones Disponibles</h4>
    <button (click)="doAction()">Acción</button>
  </div>
</ng-template>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'disabled',
      title: 'components.tooltip.disabled.title',
      description: 'components.tooltip.disabled.description',
      anchor: 'disabled',
      note: {
        type: 'info',
        content: 'components.tooltip.disabled.note',
      },
      examples: [
        {
          title: 'components.tooltip.disabled.codeTitle',
          code: `// Tooltip deshabilitado
<button 
  nuiTooltip="No se mostrará" 
  [tooltipDisabled]="true">
  Deshabilitado
</button>

// Deshabilitado condicionalmente
<button 
  nuiTooltip="Tooltip condicional" 
  [tooltipDisabled]="isDisabled">
  Condicional
</button>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.tooltip.api.title',
      description: 'components.tooltip.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'components.tooltip.api.directiveCodeTitle',
          code: `// Inputs de la directiva nuiTooltip
@Input() nuiTooltip: string | TemplateRef<any>; // Contenido del tooltip
@Input() tooltipPosition: TooltipPosition = 'top'; // Posición: 'top' | 'bottom' | 'left' | 'right'
@Input() tooltipEvent: 'hover' | 'click' | 'focus' = 'hover'; // Evento de activación
@Input() tooltipShowArrow = true;              // Mostrar flecha
@Input() tooltipShowDelay = 0;                 // Delay al mostrar (ms)
@Input() tooltipHideDelay = 0;                 // Delay al ocultar (ms)
@Input() tooltipMaxWidth = '200px';            // Ancho máximo
@Input() tooltipClass?: string;                // Clase CSS personalizada
@Input() tooltipOffset = 8;                    // Distancia desde el elemento (px)
@Input() tooltipInteractive = false;           // Permitir interacción con el tooltip
@Input() tooltipDisabled = false;              // Deshabilitar tooltip

// Outputs de la directiva
@Output() tooltipShown = new EventEmitter<void>();   // Se emite al mostrar
@Output() tooltipHidden = new EventEmitter<void>();  // Se emite al ocultar`,
          language: 'typescript',
        },
        {
          title: 'components.tooltip.api.usageCodeTitle',
          code: `// Ejemplo completo de uso
import { Component, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <!-- Tooltip con texto simple -->
    <button
      nuiTooltip="Guardar cambios"
      tooltipPosition="top"
      [tooltipShowDelay]="500"
      (tooltipShown)="onTooltipShown()"
      (tooltipHidden)="onTooltipHidden()">
      Guardar
    </button>
    
    <!-- Tooltip con template -->
    <button
      [nuiTooltip]="tooltipTemplate"
      tooltipPosition="bottom"
      tooltipMaxWidth="300px"
      tooltipClass="custom-tooltip">
      Ver Info
    </button>
    
    <ng-template #tooltipTemplate>
      <div class="rich-tooltip">
        <strong>Información Detallada</strong>
        <p>Contenido personalizado con HTML</p>
      </div>
    </ng-template>
    
    <!-- Tooltip interactivo -->
    <button
      [nuiTooltip]="interactiveTemplate"
      [tooltipInteractive]="true"
      tooltipEvent="click"
      tooltipPosition="right">
      Acciones
    </button>
    
    <ng-template #interactiveTemplate>
      <div class="interactive-tooltip">
        <h4>Acciones Disponibles</h4>
        <ul>
          <li><a (click)="editItem()">Editar</a></li>
          <li><a (click)="deleteItem()">Eliminar</a></li>
        </ul>
      </div>
    </ng-template>
    
    <!-- Tooltip condicional -->
    <button
      nuiTooltip="Este tooltip puede deshabilitarse"
      [tooltipDisabled]="isDisabled()"
      tooltipPosition="left">
      Condicional
    </button>
    
    <!-- Tooltip en input con focus -->
    <input
      type="email"
      nuiTooltip="Ingresa un email válido"
      tooltipEvent="focus"
      tooltipPosition="top"
      placeholder="Email"
    />
  \`
})
export class ExampleComponent {
  isDisabled = signal(false);
  
  onTooltipShown(): void {
    console.log('Tooltip mostrado');
  }
  
  onTooltipHidden(): void {
    console.log('Tooltip ocultado');
  }
  
  editItem(): void {
    console.log('Editando item');
  }
  
  deleteItem(): void {
    console.log('Eliminando item');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.tooltip.styling.title',
      description: 'components.tooltip.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.tooltip.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Contenedor del tooltip */
  --nui-tooltip-bg: var(--nui-bg-inverse);
  --nui-tooltip-text: var(--nui-text-inverse);
  --nui-tooltip-border-radius: var(--border-radius-sm);
  --nui-tooltip-padding: var(--spacing-xs) var(--spacing-sm);
  --nui-tooltip-font-size: var(--font-size-xs);
  --nui-tooltip-line-height: 1.4;
  --nui-tooltip-max-width: 200px;
  --nui-tooltip-shadow: var(--nui-shadow-md);
  
  /* Z-index */
  --nui-tooltip-z-index: 1060;
  
  /* Flecha */
  --nui-tooltip-arrow-size: 6px;
  --nui-tooltip-arrow-bg: var(--nui-bg-inverse);
  
  /* Animaciones */
  --nui-tooltip-animation-duration: 150ms;
  --nui-tooltip-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Opacidad */
  --nui-tooltip-opacity: 0.95;
}

// Ejemplo de tooltip claro (light theme)
.light-tooltip {
  --nui-tooltip-bg: white;
  --nui-tooltip-text: var(--nui-text-primary);
  --nui-tooltip-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--nui-border-primary);
}

// Ejemplo de tooltip con color personalizado
.success-tooltip {
  --nui-tooltip-bg: var(--success-color);
  --nui-tooltip-text: white;
  --nui-tooltip-arrow-bg: var(--success-color);
}

.error-tooltip {
  --nui-tooltip-bg: var(--danger-color);
  --nui-tooltip-text: white;
  --nui-tooltip-arrow-bg: var(--danger-color);
}

// Ejemplo de tooltip grande
.large-tooltip {
  --nui-tooltip-padding: var(--spacing-sm) var(--spacing-md);
  --nui-tooltip-font-size: var(--font-size-sm);
  --nui-tooltip-max-width: 400px;
  --nui-tooltip-border-radius: var(--border-radius-md);
}

// Ejemplo con animación personalizada
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: var(--nui-tooltip-opacity);
    transform: scale(1);
  }
}

.animated-tooltip {
  animation: tooltipFadeIn var(--nui-tooltip-animation-duration) var(--nui-tooltip-animation-timing);
}

// Ejemplo de tooltip sin flecha con borde
.bordered-tooltip {
  --nui-tooltip-bg: var(--nui-bg-primary);
  --nui-tooltip-text: var(--nui-text-primary);
  --nui-tooltip-shadow: none;
  border: 2px solid var(--primary-color);
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
