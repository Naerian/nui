import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Examples" del componente FabButton.
 * Cada sección corresponde a un @case en el template.
 */
export const FAB_BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
  // ──────────────────────────────────────────────────────────
  // Basic
  // ──────────────────────────────────────────────────────────
  {
    id: 'basic',
    title: 'components.fabButton.basic.title',
    description: 'components.fabButton.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  triggerIcon="ri-add-line"
  [items]="actions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { FabButtonItem } from 'nui';

actions: FabButtonItem[] = [
  { id: '1', icon: 'ri-pencil-line',  tooltip: 'Edit'   },
  { id: '2', icon: 'ri-share-line',   tooltip: 'Share'  },
  { id: '3', icon: 'ri-delete-bin-2-line',  tooltip: 'Delete' },
];`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Directions
  // ──────────────────────────────────────────────────────────
  {
    id: 'directions',
    title: 'components.fabButton.directions.title',
    description: 'components.fabButton.directions.description',
    anchor: 'directions',
    note: {
      type: 'info',
      content: 'components.fabButton.directions.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button direction="up"         [items]="actions" />
<nui-fab-button direction="down"       [items]="actions" />
<nui-fab-button direction="left"       [items]="actions" />
<nui-fab-button direction="right"      [items]="actions" />
<nui-fab-button direction="up-left"    [items]="actions" />
<nui-fab-button direction="up-right"   [items]="actions" />
<nui-fab-button direction="down-left"  [items]="actions" />
<nui-fab-button direction="down-right" [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Layouts
  // ──────────────────────────────────────────────────────────
  {
    id: 'layouts',
    title: 'components.fabButton.layouts.title',
    description: 'components.fabButton.layouts.description',
    anchor: 'layouts',
    note: {
      type: 'info',
      content: 'components.fabButton.layouts.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Linear (default): items spread linearly along the direction axis -->
<nui-fab-button layout="linear"        direction="up" [items]="actions" />

<!-- Circle: items distributed in a full 360° ring -->
<nui-fab-button layout="circle"        [items]="actions" />

<!-- Semi-circle: items spread in a 180° arc centred on the direction -->
<nui-fab-button layout="semi-circle"   direction="up" [items]="actions" />

<!-- Quarter-circle: items spread in a 90° arc centred on the direction -->
<nui-fab-button layout="quarter-circle" direction="up-right" [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Animations
  // ──────────────────────────────────────────────────────────
  {
    id: 'animations',
    title: 'components.fabButton.animations.title',
    description: 'components.fabButton.animations.description',
    anchor: 'animations',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Scale (default): items scale in from 0 with opacity -->
<nui-fab-button animation="scale" [items]="actions" />

<!-- Fade: items fade in without scaling -->
<nui-fab-button animation="fade"  [items]="actions" />

<!-- Slide: items slide from the trigger to their computed position -->
<nui-fab-button animation="slide" [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Variants & Colors
  // ──────────────────────────────────────────────────────────
  {
    id: 'variants-colors',
    title: 'components.fabButton.variantsColors.title',
    description: 'components.fabButton.variantsColors.description',
    anchor: 'variants-colors',
    examples: [
      {
        title: 'Solid',
        language: 'html',
        code: `<nui-fab-button color="primary"   variant="solid" [items]="actions" />
<nui-fab-button color="secondary" variant="solid" [items]="actions" />
<nui-fab-button color="accent"    variant="solid" [items]="actions" />
<nui-fab-button color="success"   variant="solid" [items]="actions" />
<nui-fab-button color="warning"   variant="solid" [items]="actions" />
<nui-fab-button color="danger"    variant="solid" [items]="actions" />`,
      },
      {
        title: 'Outline',
        language: 'html',
        code: `<nui-fab-button color="primary"   variant="outline" [items]="actions" />
<nui-fab-button color="secondary" variant="outline" [items]="actions" />
<nui-fab-button color="accent"    variant="outline" [items]="actions" />
<nui-fab-button color="success"   variant="outline" [items]="actions" />
<nui-fab-button color="warning"   variant="outline" [items]="actions" />
<nui-fab-button color="danger"    variant="outline" [items]="actions" />`,
      },
      {
        title: 'Ghost',
        language: 'html',
        code: `<nui-fab-button color="primary"   variant="ghost" [items]="actions" />
<nui-fab-button color="secondary" variant="ghost" [items]="actions" />
<nui-fab-button color="accent"    variant="ghost" [items]="actions" />
<nui-fab-button color="success"   variant="ghost" [items]="actions" />
<nui-fab-button color="warning"   variant="ghost" [items]="actions" />
<nui-fab-button color="danger"    variant="ghost" [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Shapes
  // ──────────────────────────────────────────────────────────
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
<nui-fab-button shape="rounded"  [items]="actions" />
<nui-fab-button shape="square"   [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Sizes
  // ──────────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────────
  // Backdrop
  // ──────────────────────────────────────────────────────────
  {
    id: 'backdrop',
    title: 'components.fabButton.backdrop.title',
    description: 'components.fabButton.backdrop.description',
    anchor: 'backdrop',
    note: {
      type: 'info',
      content: 'components.fabButton.backdrop.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button [backdrop]="true" [items]="actions" />`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Item colors (per-item override)
  // ──────────────────────────────────────────────────────────
  {
    id: 'item-colors',
    title: 'components.fabButton.itemColors.title',
    description: 'components.fabButton.itemColors.description',
    anchor: 'item-colors',
    note: {
      type: 'info',
      content: 'components.fabButton.itemColors.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button [items]="coloredActions" />`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `coloredActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-pencil-line',  tooltip: 'Edit',   color: 'success' },
  { id: '2', icon: 'ri-share-line',   tooltip: 'Share',  color: 'info'    },
  { id: '3', icon: 'ri-delete-bin-2-line',  tooltip: 'Delete', color: 'danger'  },
];`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Controlled mode
  // ──────────────────────────────────────────────────────────
  {
    id: 'controlled',
    title: 'components.fabButton.controlled.title',
    description: 'components.fabButton.controlled.description',
    anchor: 'controlled',
    note: {
      type: 'info',
      content: 'components.fabButton.controlled.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Two-way binding via [(expanded)] -->
<nui-fab-button
  [(expanded)]="isOpen"
  [items]="actions"
/>

<!-- One-way controlled: parent drives state, component notifies  -->
<nui-fab-button
  [expanded]="isOpen()"
  (expandedChange)="onExpandedChange($event)"
  [items]="actions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `isOpen = signal(false);

onExpandedChange(value: boolean) {
  this.isOpen.set(value);
  console.log('FAB state:', value);
}`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────
  {
    id: 'events',
    title: 'components.fabButton.events.title',
    description: 'components.fabButton.events.description',
    anchor: 'events',
    note: {
      type: 'info',
      content: 'components.fabButton.events.consoleNote',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  [items]="actions"
  (expandedChange)="onExpandedChange($event)"
  (itemClick)="onItemClick($event)"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `onExpandedChange(open: boolean) {
  console.log('FAB expanded:', open);
}

onItemClick({ item, event }: { item: FabButtonItem; event: Event }) {
  console.log('Item clicked:', item.id, event);
}`,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Disabled
  // ──────────────────────────────────────────────────────────
  {
    id: 'disabled',
    title: 'components.fabButton.disabled.title',
    description: 'components.fabButton.disabled.description',
    anchor: 'disabled',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button [disabled]="true" [items]="actions" />`,
      },
    ],
  },
];
