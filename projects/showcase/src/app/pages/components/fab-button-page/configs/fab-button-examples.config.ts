import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Examples" del componente FabButton.
 * Cada sección muestra una característica concreta del componente.
 */
export const FAB_BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BASIC
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'basic',
    title: 'components.fabButton.basic.title',
    description: 'components.fabButton.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button [items]="actions" />`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { FabButtonItem } from 'nui';

actions: FabButtonItem[] = [
  { id: '1', icon: 'ri-pencil-line',  tooltip: 'Editar'    },
  { id: '2', icon: 'ri-share-line',   tooltip: 'Compartir' },
  { id: '3', icon: 'ri-delete-bin-line', tooltip: 'Eliminar', color: 'danger' },
];`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIRECTIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'directions',
    title: 'components.fabButton.directions.title',
    description: 'components.fabButton.directions.description',
    anchor: 'directions',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button direction="up"    [items]="actions" />
<nui-fab-button direction="right" [items]="actions" />
<nui-fab-button direction="down"  [items]="actions" color="secondary" />
<nui-fab-button direction="left"  [items]="actions" color="accent" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'layouts',
    title: 'components.fabButton.layouts.title',
    description: 'components.fabButton.layouts.description',
    anchor: 'layouts',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button layout="linear"        direction="up"    [items]="actions" />
<nui-fab-button layout="semi-circle"   direction="up"    [items]="actions" color="secondary" />
<nui-fab-button layout="quarter-circle" direction="up-right" [items]="actions" color="accent" />
<nui-fab-button layout="circle"        triggerIcon="ri-apps-2-line" [items]="radialActions" color="info" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHAPES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'shapes',
    title: 'components.fabButton.shapes.title',
    description: 'components.fabButton.shapes.description',
    anchor: 'shapes',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button shape="circular" [items]="actions" />
<nui-fab-button shape="rounded"  [items]="actions" color="secondary" />
<nui-fab-button shape="square"   [items]="actions" color="accent" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COLORS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'colors',
    title: 'components.fabButton.colors.title',
    description: 'components.fabButton.colors.description',
    anchor: 'colors',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button color="primary"   [items]="actions" />
<nui-fab-button color="secondary" [items]="actions" />
<nui-fab-button color="accent"    [items]="actions" />
<nui-fab-button color="success"   [items]="actions" />
<nui-fab-button color="info"      [items]="actions" />
<nui-fab-button color="warning"   [items]="actions" />
<nui-fab-button color="danger"    [items]="actions" />
<nui-fab-button color="neutral"   [items]="actions" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SIZES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sizes',
    title: 'components.fabButton.sizes.title',
    description: 'components.fabButton.sizes.description',
    anchor: 'sizes',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button size="xs" [items]="actions" />
<nui-fab-button size="sm" [items]="actions" />
<nui-fab-button size="md" [items]="actions" />
<nui-fab-button size="lg" [items]="actions" />
<nui-fab-button size="xl" [items]="actions" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ANIMATION
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'animation',
    title: 'components.fabButton.animation.title',
    description: 'components.fabButton.animation.description',
    anchor: 'animation',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button animation="scale" [items]="actions" />
<nui-fab-button animation="fade"  [items]="actions" color="secondary" />
<nui-fab-button animation="slide" [items]="actions" color="accent" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TRIGGER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'trigger',
    title: 'components.fabButton.trigger.title',
    description: 'components.fabButton.trigger.description',
    anchor: 'trigger',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Custom trigger icon -->
<nui-fab-button
  triggerIcon="ri-pencil-line"
  [items]="actions"
/>

<!-- Icon swaps when open -->
<nui-fab-button
  triggerIcon="ri-add-line"
  triggerIconOpen="ri-close-line"
  color="secondary"
  [items]="actions"
/>

<!-- Extended FAB: icon + label -->
<nui-fab-button
  triggerIcon="ri-add-line"
  triggerIconOpen="ri-close-line"
  triggerLabel="Nuevo"
  shape="rounded"
  color="accent"
  [items]="actions"
/>

<!-- Badge on trigger -->
<nui-fab-button
  triggerIcon="ri-notification-line"
  [triggerBadge]="unreadCount()"
  color="danger"
  [items]="actions"
/>`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'loading',
    title: 'components.fabButton.loading.title',
    description: 'components.fabButton.loading.description',
    anchor: 'loading',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  triggerIcon="ri-send-plane-line"
  triggerLabel="Enviar"
  shape="rounded"
  [loading]="isSending"
  [items]="actions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `isSending = signal(false);

simulateSend(): void {
  this.isSending.set(true);
  setTimeout(() => this.isSending.set(false), 2000);
}`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // OPEN ON (click vs hover)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'openOn',
    title: 'components.fabButton.openOn.title',
    description: 'components.fabButton.openOn.description',
    anchor: 'openOn',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Default: opens on click -->
<nui-fab-button openOn="click" [items]="actions" />

<!-- Opens on hover (speed-dial) -->
<nui-fab-button openOn="hover" color="secondary" [items]="actions" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ITEM DISPLAY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'itemDisplay',
    title: 'components.fabButton.itemDisplay.title',
    description: 'components.fabButton.itemDisplay.description',
    anchor: 'itemDisplay',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- icon (default): tooltip on hover -->
<nui-fab-button itemDisplay="icon" [items]="actions" />

<!-- icon-text: label visible inside the button -->
<nui-fab-button itemDisplay="icon-text" shape="rounded" color="secondary" [items]="labeledActions" />`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `labeledActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-file-add-line',   label: 'Documento' },
  { id: '2', icon: 'ri-image-add-line',  label: 'Imagen'    },
  { id: '3', icon: 'ri-folder-add-line', label: 'Carpeta'   },
];`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLOSE OPTIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'closeOptions',
    title: 'components.fabButton.closeOptions.title',
    description: 'components.fabButton.closeOptions.description',
    anchor: 'closeOptions',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Stays open after item click (multi-action) -->
<nui-fab-button
  [closeOnItemClick]="false"
  triggerIcon="ri-filter-3-line"
  color="neutral"
  [items]="actions"
/>

<!-- Closes when clicking outside -->
<nui-fab-button
  [closeOnOutsideClick]="true"
  color="secondary"
  [items]="actions"
/>

<!-- Closes when the nearest scroll container scrolls -->
<nui-fab-button
  [closeOnScroll]="true"
  color="accent"
  [items]="actions"
/>`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BACKDROP
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'backdrop',
    title: 'components.fabButton.backdrop.title',
    description: 'components.fabButton.backdrop.description',
    anchor: 'backdrop',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button [backdrop]="true" layout="semi-circle" direction="up" [items]="actions" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CUSTOM TEMPLATES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'templates',
    title: 'components.fabButton.templates.title',
    description: 'components.fabButton.templates.description',
    anchor: 'templates',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button shape="rounded" color="primary" [items]="templateActions">
  <!-- fabTrigger: control total del trigger -->
  <ng-template fabTrigger let-open="isOpen">
    <span class="custom-trigger">
      <i [class]="open ? 'ri-close-line' : 'ri-add-line'"></i>
      @if (!open) { <span>Nuevo</span> }
    </span>
  </ng-template>

  <!-- fabItem: control total de cada item -->
  <ng-template fabItem let-item>
    <span class="custom-item">
      <i [class]="item.icon"></i>
      <span>{{ item.label }}</span>
    </span>
  </ng-template>
</nui-fab-button>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { FabButtonComponent, FabTriggerDirective, FabItemDirective } from 'nui';

// imports del componente:
imports: [FabButtonComponent, FabTriggerDirective, FabItemDirective]

templateActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-bug-line',       label: 'Bug',       color: 'danger'  },
  { id: '2', icon: 'ri-lightbulb-line', label: 'Feature',   color: 'success' },
  { id: '3', icon: 'ri-chat-3-line',    label: 'Comentario', color: 'info'   },
];`,
      },
    ],
  },
];
