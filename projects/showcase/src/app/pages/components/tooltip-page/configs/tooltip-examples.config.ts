import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos del Tooltip
 */
export const TOOLTIP_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.tooltip.examples.basic.title',
    description: 'components.tooltip.examples.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `// Simple tooltip with text and arrow
<button nuiTooltip="Save changes">Save</button>
  
 // Tooltip without arrow
 <button nuiTooltip="No arrow tooltip" [nuiTooltipShowArrow]="false">
   No Arrow
 </button>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'positions',
    title: 'components.tooltip.examples.positions.title',
    description: 'components.tooltip.examples.positions.description',
    anchor: 'positions',
    examples: [
      {
        title: 'codeExamples.html',
        code: `// Top tooltip (default)
<button nuiTooltip="Tooltip top" nuiTooltipPosition="top">
  Top
</button>

// Bottom tooltip
<button nuiTooltip="Tooltip bottom" nuiTooltipPosition="bottom">
  Bottom
</button>

// Left tooltip
<button nuiTooltip="Tooltip left" nuiTooltipPosition="left">
  Left
</button>

// Right tooltip
<button nuiTooltip="Tooltip right" nuiTooltipPosition="right">
  Right
</button>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'events',
    title: 'components.tooltip.examples.events.title',
    description: 'components.tooltip.examples.events.description',
    anchor: 'events',
    examples: [
      {
        title: 'codeExamples.html',
        code: `// Hover (default)
<button nuiTooltip="Tooltip on hover">Hover</button>

// Click
<button nuiTooltip="Tooltip on click" nuiTooltipEvent="click">
  Click
</button>

// Focus
<input nuiTooltip="Tooltip on focus" nuiTooltipEvent="focus" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'delays',
    title: 'components.tooltip.examples.delays.title',
    description: 'components.tooltip.examples.delays.description',
    anchor: 'delays',
    note: {
      type: 'info',
      content: 'components.tooltip.examples.delays.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `// Input delay (500ms)
<button 
  nuiTooltip="Appears after 500ms" 
  [nuiTooltipShowDelay]="500">
  Input Delay
</button>

// Output delay (1000ms)
<button 
  nuiTooltip="Disappears after 1s" 
  [nuiTooltipHideDelay]="1000">
  Output Delay
</button>

// No delays
<button 
  nuiTooltip="No delays" 
  [nuiTooltipShowDelay]="0"
  [nuiTooltipHideDelay]="0">
  No Delays
</button>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'templates',
    title: 'components.tooltip.examples.templates.title',
    description: 'components.tooltip.examples.templates.description',
    anchor: 'templates',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<button [nuiTooltip]="tooltipTemplate">View Info</button>

<!-- Template Content -->
<ng-template #tooltipTemplate>
  <div class="custom-tooltip">
    <strong>Important Information</strong>
    <p>Custom content</p>
  </div>
</ng-template>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'interactive',
    title: 'components.tooltip.examples.interactive.title',
    description: 'components.tooltip.examples.interactive.description',
    anchor: 'interactive',
    note: {
      type: 'info',
      content: 'components.tooltip.examples.interactive.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `<button 
  [nuiTooltip]="interactiveTemplate" 
  [nuiTooltipInteractive]="true">
  Interactive Tooltip
</button>

<!-- Template Content -->
<ng-template #interactiveTemplate>
  <div class="interactive-tooltip">
    <h4>Available Actions</h4>
    <button (click)="doAction()">Action</button>
  </div>
</ng-template>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled',
    title: 'components.tooltip.examples.disabled.title',
    description: 'components.tooltip.examples.disabled.description',
    anchor: 'disabled',
    note: {
      type: 'info',
      content: 'components.tooltip.examples.disabled.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        code: `// Disabled tooltip
<button 
  nuiTooltip="Will not show" 
  [nuiTooltipDisabled]="true">
  Disabled
</button>

// Disabled conditionally
<button 
  nuiTooltip="Conditional tooltip" 
  [nuiTooltipDisabled]="isDisabled">
  Conditional
</button>`,
        language: 'html',
      },
    ],
  },
];
