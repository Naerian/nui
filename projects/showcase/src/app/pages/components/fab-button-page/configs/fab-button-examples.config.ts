import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Examples" del componente FabButton.
 * Cinco escenarios reales que muestran el FAB en contexto.
 */
export const FAB_BUTTON_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'scenario-mobile',
    title: 'components.fabButton.scenarios.mobile.title',
    description: 'components.fabButton.scenarios.mobile.description',
    anchor: 'scenario-mobile',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- App screen container (position: relative) -->
<div class="app-screen">
  <!-- ...screen content... -->

  <nui-fab-button
    style="position: absolute; bottom: 1.5rem; right: 1.5rem"
    direction="up"
    layout="linear"
    shape="circular"
    color="primary"
    animation="scale"
    [items]="mobileActions"
  />
</div>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { FabButtonItem } from 'nui';

mobileActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-pencil-line',   tooltip: 'New note' },
  { id: '2', icon: 'ri-camera-line',   tooltip: 'Photo'    },
  { id: '3', icon: 'ri-attachment-2',  tooltip: 'Attachment' },
];`,
      },
    ],
  },
  {
    id: 'scenario-dashboard',
    title: 'components.fabButton.scenarios.dashboard.title',
    description: 'components.fabButton.scenarios.dashboard.description',
    anchor: 'scenario-dashboard',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  style="position: absolute; bottom: 1.5rem; right: 1.5rem"
  layout="semi-circle"
  direction="left"
  shape="circular"
  color="accent"
  variant="solid"
  [backdrop]="true"
  [items]="dashboardActions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `dashboardActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-bar-chart-2-line', tooltip: 'Report'   },
  { id: '2', icon: 'ri-download-2-line',  tooltip: 'Export'  },
  { id: '3', icon: 'ri-share-line',       tooltip: 'Share' },
  { id: '4', icon: 'ri-settings-3-line',  tooltip: 'Settings'   },
];`,
      },
    ],
  },
  {
    id: 'scenario-card',
    title: 'components.fabButton.scenarios.card.title',
    description: 'components.fabButton.scenarios.card.description',
    anchor: 'scenario-card',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Card with position: relative -->
<div class="card" style="position: relative">
  <nui-fab-button
    style="position: absolute; top: 0.75rem; right: 0.75rem"
    layout="linear"
    direction="left"
    shape="circular"
    color="neutral"
    variant="solid"
    size="sm"
    triggerIcon="ri-more-2-fill"
    [items]="cardActions"
  />
  <!-- ...card content... -->
</div>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `cardActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-pencil-line',       tooltip: 'Edit'    },
  { id: '2', icon: 'ri-share-line',        tooltip: 'Share' },
  { id: '3', icon: 'ri-delete-bin-2-line', tooltip: 'Delete', color: 'danger' },
];`,
      },
    ],
  },
  {
    id: 'scenario-radial',
    title: 'components.fabButton.scenarios.radial.title',
    description: 'components.fabButton.scenarios.radial.description',
    anchor: 'scenario-radial',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  layout="circle"
  shape="circular"
  color="secondary"
  animation="scale"
  triggerIcon="ri-apps-2-line"
  [items]="radialActions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `radialActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-home-4-line',   tooltip: 'Home'   },
  { id: '2', icon: 'ri-calendar-line', tooltip: 'Agenda'   },
  { id: '3', icon: 'ri-mail-line',     tooltip: 'Messages' },
  { id: '4', icon: 'ri-chat-3-line',   tooltip: 'Chat'     },
];`,
      },
    ],
  },
  {
    id: 'scenario-panel',
    title: 'components.fabButton.scenarios.panel.title',
    description: 'components.fabButton.scenarios.panel.description',
    anchor: 'scenario-panel',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  style="position: absolute; top: 1rem; left: 1rem"
  layout="quarter-circle"
  direction="down-right"
  shape="circular"
  color="info"
  variant="solid"
  triggerIcon="ri-layout-3-line"
  [items]="panelActions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `panelActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-filter-3-line', tooltip: 'Filters'  },
  { id: '2', icon: 'ri-bookmark-line', tooltip: 'Save'  },
  { id: '3', icon: 'ri-printer-line',  tooltip: 'Print' },
];`,
      },
    ],
  },
  {
    id: 'scenario-custom',
    title: 'components.fabButton.scenarios.custom.title',
    description: 'components.fabButton.scenarios.custom.description',
    anchor: 'scenario-custom',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<nui-fab-button
  layout="linear"
  direction="up"
  shape="rounded"
  color="primary"
  spacing="4.5rem"
  [items]="customTemplateActions"
>
  <!-- fabTrigger: rotative close/add icon + "New" label -->
  <ng-template fabTrigger let-open="isOpen">
    <span class="my-trigger">
      <i [class]="open ? 'ri-close-line' : 'ri-add-line'"></i>
      @if (!open) {
        <span class="my-trigger-label">New</span>
      }
    </span>
  </ng-template>

  <!-- fabItem: semantic — icon + label per item -->
  <ng-template fabItem let-item>
    <span class="my-item">
      <i [class]="item.icon"></i>
      @if (item.label) {
        <span>{{ item.label }}</span>
      }
    </span>
  </ng-template>
</nui-fab-button>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `import { FabButtonItem, FabTriggerDirective, FabItemDirective } from 'nui';

// In @Component imports array:
imports: [FabButtonComponent, FabTriggerDirective, FabItemDirective]

customTemplateActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-bug-line',       label: 'Bug',     color: 'danger'  },
  { id: '2', icon: 'ri-lightbulb-line', label: 'Feature', color: 'success' },
  { id: '3', icon: 'ri-chat-3-line',    label: 'Comment', color: 'info'    },
];`,
      },
    ],
  },
  {
    id: 'scenario-extended',
    title: 'components.fabButton.scenarios.extended.title',
    description: 'components.fabButton.scenarios.extended.description',
    anchor: 'scenario-extended',
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- Extended FAB: triggerLabel + triggerIconOpen + triggerBadge -->
<nui-fab-button
  triggerIcon="ri-pencil-line"
  triggerIconOpen="ri-close-line"
  triggerLabel="Compose"
  [triggerBadge]="unreadCount"
  shape="rounded"
  color="primary"
  direction="up"
  layout="linear"
  [items]="composeActions"
/>

<!-- FAB with loading state (async action in progress) -->
<nui-fab-button
  triggerIcon="ri-send-plane-line"
  [loading]="isSending"
  color="primary"
  [items]="sendActions"
/>

<!-- Speed-dial (hover to open) -->
<nui-fab-button
  openOn="hover"
  triggerIcon="ri-share-line"
  color="secondary"
  [items]="shareActions"
/>

<!-- Multi-action: dial stays open after item click -->
<nui-fab-button
  [closeOnItemClick]="false"
  triggerIcon="ri-filter-3-line"
  color="neutral"
  variant="outline"
  [items]="filterActions"
/>

<!-- Icon + label inside each item button (tooltip suppressed) -->
<nui-fab-button
  itemDisplay="icon-text"
  triggerIcon="ri-add-line"
  color="primary"
  shape="rounded"
  direction="up"
  layout="linear"
  [items]="iconTextActions"
/>

<!-- Close on scroll (e.g. inside a scrollable panel) -->
<nui-fab-button
  [closeOnScroll]="true"
  triggerIcon="ri-add-line"
  color="primary"
  [items]="quickActions"
/>`,
      },
      {
        title: 'codeExamples.typescript',
        language: 'typescript',
        code: `composeActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-mail-line',     tooltip: 'New email',   command: () => this.simulate() },
  { id: '2', icon: 'ri-user-add-line', tooltip: 'New contact'  },
  { id: '3', icon: 'ri-calendar-line', tooltip: 'New event'    },
];

shareActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-twitter-x-line', tooltip: 'Share on X'       },
  { id: '2', icon: 'ri-linkedin-line',  tooltip: 'Share on LinkedIn' },
  { id: '3', icon: 'ri-link',           tooltip: 'Copy link'         },
];

filterActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-sort-asc',  tooltip: 'Sort A\u2013Z' },
  { id: '2', icon: 'ri-star-line', tooltip: 'Starred'  },
  { id: '3', icon: 'ri-time-line', tooltip: 'Recent'   },
];

iconTextActions: FabButtonItem[] = [
  { id: '1', icon: 'ri-file-add-line',   label: 'Document', tooltip: 'New document' },
  { id: '2', icon: 'ri-image-add-line',  label: 'Image',    tooltip: 'New image'    },
  { id: '3', icon: 'ri-folder-add-line', label: 'Folder',   tooltip: 'New folder'   },
];`,
      },
    ],
  },
];
