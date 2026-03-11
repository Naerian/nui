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
    title: 'components.fabButton.examples.basic.title',
    description: 'components.fabButton.examples.basic.description',
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
    title: 'components.fabButton.examples.directions.title',
    description: 'components.fabButton.examples.directions.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.directions.note',
    },
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
    title: 'components.fabButton.examples.layouts.title',
    description: 'components.fabButton.examples.layouts.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.layouts.note',
    },
    anchor: 'layouts',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button layout="linear" direction="up" [items]="actions" />
<nui-fab-button layout="semi-circle" direction="up" [items]="actions" color="secondary" />
<nui-fab-button layout="quarter-circle" direction="up-right" [items]="actions" color="accent" />
<nui-fab-button layout="circle" triggerIcon="ri-apps-2-line" [items]="radialActions" color="info" />
<nui-fab-button layout="circle" triggerIcon="ri-apps-2-line" [items]="radialActions" color="danger" radius="3rem"/>`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHAPES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'shapes',
    title: 'components.fabButton.examples.shapes.title',
    description: 'components.fabButton.examples.shapes.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.shapes.note',
    },
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
    title: 'components.fabButton.examples.colors.title',
    description: 'components.fabButton.examples.colors.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.colors.note',
    },
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
  // VARIANTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'variants',
    title: 'components.fabButton.examples.variants.title',
    description: 'components.fabButton.examples.variants.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.variants.note',
    },
    anchor: 'variants',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button color="primary" [items]="actions" />
<nui-fab-button variant="outline" color="secondary" [items]="actions" />
<nui-fab-button variant="ghost" color="accent" [items]="actions" />`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SIZES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sizes',
    title: 'components.fabButton.examples.sizes.title',
    description: 'components.fabButton.examples.sizes.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.sizes.note',
    },
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
    title: 'components.fabButton.examples.animation.title',
    description: 'components.fabButton.examples.animation.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.animation.note',
    },
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
    title: 'components.fabButton.examples.trigger.title',
    description: 'components.fabButton.examples.trigger.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.trigger.note',
    },
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
    title: 'components.fabButton.examples.loading.title',
    description: 'components.fabButton.examples.loading.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.loading.note',
    },
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
    title: 'components.fabButton.examples.openOn.title',
    description: 'components.fabButton.examples.openOn.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.openOn.note',
    },
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
    title: 'components.fabButton.examples.itemDisplay.title',
    description: 'components.fabButton.examples.itemDisplay.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.itemDisplay.note',
    },
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
    title: 'components.fabButton.examples.closeOptions.title',
    description: 'components.fabButton.examples.closeOptions.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.closeOptions.note',
    },
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
    title: 'components.fabButton.examples.backdrop.title',
    description: 'components.fabButton.examples.backdrop.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.backdrop.note',
    },
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
    title: 'components.fabButton.examples.templates.title',
    description: 'components.fabButton.examples.templates.description',
    note: {
      type: 'info',
      content: 'components.fabButton.examples.templates.note',
    },
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
