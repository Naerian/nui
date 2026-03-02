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
  direction="up-left"
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
];
