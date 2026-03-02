import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FabButtonComponent, FabButtonItem, FabTriggerDirective, FabItemDirective } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { FAB_BUTTON_PAGE_CONFIG } from './fab-button-page.config';

@Component({
  selector: 'app-fab-button-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FabButtonComponent,
    FabTriggerDirective,
    FabItemDirective,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './fab-button-page.component.html',
  styleUrls: ['./fab-button-page.component.scss'],
})
export class FabButtonPageComponent extends BaseComponentPage {
  override pageConfig = FAB_BUTTON_PAGE_CONFIG;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'scenario-mobile',
        'scenario-dashboard',
        'scenario-card',
        'scenario-radial',
        'scenario-panel',
        'scenario-custom',
        'scenario-extended',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs', 'api-computed', 'api-types', 'api-item', 'api-item-resolved', 'api-directives', 'api-config'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-structure'],
    },
  ];

  readonly mobileActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line', tooltip: 'New Note' },
    { id: '2', icon: 'ri-camera-line', tooltip: 'Photo' },
    { id: '3', icon: 'ri-attachment-2', tooltip: 'Attachment' },
  ];

  readonly dashboardActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-bar-chart-2-line', tooltip: 'Report' },
    { id: '2', icon: 'ri-download-2-line', tooltip: 'Export' },
    { id: '3', icon: 'ri-share-line', tooltip: 'Share' },
    { id: '4', icon: 'ri-settings-3-line', tooltip: 'Settings' },
  ];

  readonly cardActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line', tooltip: 'Edit' },
    { id: '2', icon: 'ri-share-line', tooltip: 'Share' },
    { id: '3', icon: 'ri-delete-bin-2-line', tooltip: 'Delete', color: 'danger' },
  ];

  readonly radialActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-home-4-line', tooltip: 'Home' },
    { id: '2', icon: 'ri-calendar-line', tooltip: 'Agenda' },
    { id: '3', icon: 'ri-mail-line', tooltip: 'Messages' },
    { id: '4', icon: 'ri-chat-3-line', tooltip: 'Chat' },
  ];

  readonly panelActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-filter-3-line', tooltip: 'Filters' },
    { id: '2', icon: 'ri-bookmark-line', tooltip: 'Save' },
    { id: '3', icon: 'ri-printer-line', tooltip: 'Print' },
  ];

  readonly customTemplateActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-bug-line', label: 'Bug' },
    { id: '2', icon: 'ri-lightbulb-line', label: 'Feature' },
    { id: '3', icon: 'ri-chat-3-line', label: 'Comment' },
  ];

  // Extended FAB scenario data
  readonly extendedUnreadCount = signal(3);
  readonly extendedLoading = signal(false);

  readonly composeActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-mail-line',     tooltip: 'New email',   command: () => this._simLoading() },
    { id: '2', icon: 'ri-user-add-line', tooltip: 'New contact'  },
    { id: '3', icon: 'ri-calendar-line', tooltip: 'New event'    },
  ];

  readonly shareActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-twitter-x-line', tooltip: 'Share on X'       },
    { id: '2', icon: 'ri-linkedin-line',  tooltip: 'Share on LinkedIn' },
    { id: '3', icon: 'ri-link',           tooltip: 'Copy link'         },
  ];

  readonly filterActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-sort-asc',  tooltip: 'Sort A–Z' },
    { id: '2', icon: 'ri-star-line', tooltip: 'Starred'  },
    { id: '3', icon: 'ri-time-line', tooltip: 'Recent'   },
  ];

  // Items with label for icon-text display demo
  readonly iconTextActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-file-add-line',   label: 'Document', tooltip: 'New document' },
    { id: '2', icon: 'ri-image-add-line',  label: 'Image',    tooltip: 'New image'    },
    { id: '3', icon: 'ri-folder-add-line', label: 'Folder',   tooltip: 'New folder'   },
  ];

  /** Simulates a 2-second async action for the loading demo. */
  _simLoading(): void {
    this.extendedLoading.set(true);
    setTimeout(() => this.extendedLoading.set(false), 2000);
  }

  readonly scenarioCards = [
    { title: 'Alpha', icon: 'ri-rocket-line', featured: true },
    { title: 'Beta', icon: 'ri-flask-line', featured: false },
    { title: 'Gamma', icon: 'ri-leaf-line', featured: false },
    { title: 'Delta', icon: 'ri-bar-chart-line', featured: false },
  ];
}
