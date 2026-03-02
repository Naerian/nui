import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FabButtonComponent, FabButtonItem } from 'nui';
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
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs', 'api-computed', 'api-models'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-structure'],
    },
  ];

  readonly mobileActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',   tooltip: 'New Note' },
    { id: '2', icon: 'ri-camera-line',   tooltip: 'Photo'    },
    { id: '3', icon: 'ri-attachment-2', tooltip: 'Attachment' },
  ];

  readonly dashboardActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-bar-chart-2-line', tooltip: 'Report'   },
    { id: '2', icon: 'ri-download-2-line',  tooltip: 'Export'  },
    { id: '3', icon: 'ri-share-line',       tooltip: 'Share' },
    { id: '4', icon: 'ri-settings-3-line',  tooltip: 'Settings'   },
  ];

  readonly cardActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',       tooltip: 'Edit'    },
    { id: '2', icon: 'ri-share-line',        tooltip: 'Share' },
    { id: '3', icon: 'ri-delete-bin-2-line', tooltip: 'Delete', color: 'danger' },
  ];

  readonly radialActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-home-4-line',   tooltip: 'Home'    },
    { id: '2', icon: 'ri-calendar-line', tooltip: 'Agenda'    },
    { id: '3', icon: 'ri-mail-line',     tooltip: 'Messages'  },
    { id: '4', icon: 'ri-chat-3-line',   tooltip: 'Chat'      },
  ];

  readonly panelActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-filter-3-line',  tooltip: 'Filters'  },
    { id: '2', icon: 'ri-bookmark-line',  tooltip: 'Save'  },
    { id: '3', icon: 'ri-printer-line',   tooltip: 'Print' },
  ];

  readonly scenarioCards = [
    { title: 'Alpha', icon: 'ri-rocket-line',    featured: true  },
    { title: 'Beta',  icon: 'ri-flask-line',     featured: false },
    { title: 'Gamma', icon: 'ri-leaf-line',      featured: false },
    { title: 'Delta', icon: 'ri-bar-chart-line', featured: false },
  ];
}
