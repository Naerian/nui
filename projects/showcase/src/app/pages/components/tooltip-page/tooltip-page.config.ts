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
  ],
};
