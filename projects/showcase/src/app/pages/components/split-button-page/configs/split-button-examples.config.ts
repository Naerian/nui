import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Examples del componente SplitButton
 */
export const SPLIT_BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
  // ── 1. BASIC ──────────────────────────────────────────────────────────────
  {
    id: 'basic',
    title: 'components.splitButton.basic.title',
    description: 'components.splitButton.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button label="Save" [items]="items" (onClick)="onSave()" (onItemAction)="onAction($event)">
</nui-split-button>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { ActionMenuItem } from 'nui';

items: ActionMenuItem[] = [
  { label: 'Save as draft', icon: 'ri-draft-line',      action: 'draft'    },
  { label: 'Publish',       icon: 'ri-send-plane-line', action: 'publish'  },
  { label: 'Delete',        icon: 'ri-delete-bin-line', action: 'delete'   },
];`,
      },
    ],
  },

  // ── 2. VARIANTS & COLORS ─────────────────────────────────────────────────
  {
    id: 'variants-colors',
    title: 'components.splitButton.variantsColors.title',
    description: 'components.splitButton.variantsColors.description',
    anchor: 'variants-colors',
    note: {
      type: 'info',
      content: 'components.splitButton.variantsColors.note',
    },
    examples: [
      {
        title: 'Solid',
        language: 'html',
        code: `<nui-split-button label="Save" color="primary"   variant="solid" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="secondary" variant="solid" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="accent"    variant="solid" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="success"   variant="solid" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="danger"    variant="solid" [items]="items"></nui-split-button>`,
      },
      {
        title: 'Outline',
        language: 'html',
        code: `<nui-split-button label="Save" color="primary"   variant="outline" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="secondary" variant="outline" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="accent"    variant="outline" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="success"   variant="outline" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="danger"    variant="outline" [items]="items"></nui-split-button>`,
      },
      {
        title: 'Ghost',
        language: 'html',
        code: `<nui-split-button label="Save" color="primary"   variant="ghost" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="secondary" variant="ghost" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="accent"    variant="ghost" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="success"   variant="ghost" [items]="items"></nui-split-button>
<nui-split-button label="Save" color="danger"    variant="ghost" [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 3. SHAPES ─────────────────────────────────────────────────────────────
  {
    id: 'shapes',
    title: 'components.splitButton.shapes.title',
    description: 'components.splitButton.shapes.description',
    anchor: 'shapes',
    note: {
      type: 'info',
      content: 'components.splitButton.shapes.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button label="Rounded" shape="rounded" [items]="items"></nui-split-button>
<nui-split-button label="Square"  shape="square"  [items]="items"></nui-split-button>
<nui-split-button label="Pill"    shape="pill"    [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 4. SIZES ──────────────────────────────────────────────────────────────
  {
    id: 'sizes',
    title: 'components.splitButton.sizes.title',
    description: 'components.splitButton.sizes.description',
    anchor: 'sizes',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button label="XSmall" size="xs" [items]="items"></nui-split-button>
<nui-split-button label="Small"  size="sm" [items]="items"></nui-split-button>
<nui-split-button label="Medium" size="md" [items]="items"></nui-split-button>
<nui-split-button label="Large"  size="lg" [items]="items"></nui-split-button>
<nui-split-button label="XLarge" size="xl" [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 5. RAISED ─────────────────────────────────────────────────────────────
  {
    id: 'raised',
    title: 'components.splitButton.raised.title',
    description: 'components.splitButton.raised.description',
    anchor: 'raised',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button label="Raised Primary" raised color="primary" [items]="items"></nui-split-button>
<nui-split-button label="Raised Pill" raised shape="pill" color="success" [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 6. ICONS ──────────────────────────────────────────────────────────────
  {
    id: 'icons',
    title: 'components.splitButton.icons.title',
    description: 'components.splitButton.icons.description',
    anchor: 'icons',
    note: {
      type: 'info',
      content: 'components.splitButton.icons.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Icono en botón principal -->
<nui-split-button label="Save"   prefixIcon="ri-save-line"       [items]="items"></nui-split-button>
<nui-split-button label="Upload" prefixIcon="ri-upload-line"     [items]="items" color="secondary"></nui-split-button>
<nui-split-button label="Share"  prefixIcon="ri-share-line"      [items]="items" color="accent"></nui-split-button>

<!-- Icono de caret personalizado -->
<nui-split-button label="Options" triggerIcon="ri-arrow-down-s-line" [items]="items"></nui-split-button>
<nui-split-button label="More"    triggerIcon="ri-more-line"          [items]="items" color="secondary"></nui-split-button>`,
      },
    ],
  },

  // ── 7. LOADING ────────────────────────────────────────────────────────────
  {
    id: 'loading',
    title: 'components.splitButton.loading.title',
    description: 'components.splitButton.loading.description',
    anchor: 'loading',
    note: {
      type: 'info',
      content: 'components.splitButton.loading.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button
  label="Save"
  prefixIcon="ri-save-line"
  [loading]="isLoading"
  [items]="items"
  (onClick)="simulateLoading()"
></nui-split-button>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `isLoading = signal(false);

simulateLoading(): void {
  this.isLoading.set(true);
  setTimeout(() => this.isLoading.set(false), 2000);
}`,
      },
    ],
  },

  // ── 8. DISABLED ───────────────────────────────────────────────────────────
  {
    id: 'disabled',
    title: 'components.splitButton.disabled.title',
    description: 'components.splitButton.disabled.description',
    anchor: 'disabled',
    note: {
      type: 'info',
      content: 'components.splitButton.disabled.note',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Ambos botones deshabilitados -->
<nui-split-button label="Save" disabled [items]="items"></nui-split-button>

<!-- Solo el disparador deshabilitado -->
<nui-split-button label="Save" disabledTrigger [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 9. MENU ITEMS (separators, subtitle, selected, badge) ─────────────────
  {
    id: 'menu-items',
    title: 'components.splitButton.menuItems.title',
    description: 'components.splitButton.menuItems.description',
    anchor: 'menu-items',
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `richItems: ActionMenuItem[] = [
  { label: 'Edit',    icon: 'ri-edit-line',        action: 'edit',    selected: true  },
  { label: 'Rename',  icon: 'ri-text-line',         action: 'rename',  subtitle: 'Change the display name' },
  { separator: true,  label: 'Danger zone' },
  { label: 'Archive', icon: 'ri-archive-line',      action: 'archive', subtitle: 'Move to archive' },
  { label: 'Delete',  icon: 'ri-delete-bin-line',   action: 'delete',  badge: '3' },
];`,
      },
    ],
  },

  // ── 10. SUBMENU ───────────────────────────────────────────────────────────
  {
    id: 'submenu',
    title: 'components.splitButton.submenu.title',
    description: 'components.splitButton.submenu.description',
    anchor: 'submenu',
    examples: [
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `submenuItems: ActionMenuItem[] = [
  {
    label: 'Export',
    icon: 'ri-download-line',
    children: [
      { label: 'As PDF',  icon: 'ri-file-pdf-line',   action: 'export-pdf'  },
      { label: 'As CSV',  icon: 'ri-file-chart-line',  action: 'export-csv'  },
      { label: 'As JSON', icon: 'ri-braces-line',      action: 'export-json' },
    ],
  },
  { label: 'Share',  icon: 'ri-share-line',       action: 'share'  },
  { label: 'Delete', icon: 'ri-delete-bin-line',  action: 'delete' },
];`,
      },
    ],
  },

  // ── 11. FULL WIDTH ────────────────────────────────────────────────────────
  {
    id: 'full-width',
    title: 'components.splitButton.fullWidth.title',
    description: 'components.splitButton.fullWidth.description',
    anchor: 'full-width',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button label="Full width action" width="full" [items]="items"></nui-split-button>`,
      },
    ],
  },

  // ── 12. EVENTS ────────────────────────────────────────────────────────────
  {
    id: 'events',
    title: 'components.splitButton.events.title',
    description: 'components.splitButton.events.description',
    anchor: 'events',
    note: {
      type: 'info',
      content: 'components.splitButton.events.consoleNote',
    },
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-split-button
  label="Save"
  prefixIcon="ri-save-line"
  [items]="items"
  (onClick)="onMainClick($event)"
  (onItemAction)="onItemAction($event)"
  (menuOpen)="onMenuOpen()"
  (menuClose)="onMenuClose()"
></nui-split-button>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `onMainClick(event: Event): void {
  console.log('[SplitButton] Main click:', event);
}

onItemAction(item: ActionMenuItem): void {
  console.log('[SplitButton] Item action:', item.action, item);
}

onMenuOpen(): void {
  console.log('[SplitButton] Menu opened');
}

onMenuClose(): void {
  console.log('[SplitButton] Menu closed');
}`,
      },
    ],
  },
];
