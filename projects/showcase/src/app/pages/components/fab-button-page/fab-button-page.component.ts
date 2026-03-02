import { Component, signal } from '@angular/core';
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
  // ── Page config ─────────────────────────────────────────────
  override pageConfig = FAB_BUTTON_PAGE_CONFIG;

  // ── Tabs ────────────────────────────────────────────────────
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'directions',
        'layouts',
        'animations',
        'variants-colors',
        'shapes',
        'sizes',
        'backdrop',
        'item-colors',
        'controlled',
        'events',
        'disabled',
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

  // ── Shared demo data ────────────────────────────────────────
  /** Default action items used across most demos. */
  readonly actions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',  tooltip: 'Edit'   },
    { id: '2', icon: 'ri-share-line',   tooltip: 'Share'  },
    { id: '3', icon: 'ri-delete-bin-2-line',  tooltip: 'Delete' },
  ];

  /** More items to showcase layouts that need 4+ entries. */
  readonly moreActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',    tooltip: 'Edit'      },
    { id: '2', icon: 'ri-share-line',     tooltip: 'Share'     },
    { id: '3', icon: 'ri-delete-bin-2-line',    tooltip: 'Delete'    },
    { id: '4', icon: 'ri-mail-send-line', tooltip: 'Send mail' },
  ];

  /** Per-item color overrides demo. */
  readonly coloredActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',  tooltip: 'Edit',   color: 'success' },
    { id: '2', icon: 'ri-share-line',   tooltip: 'Share',  color: 'info'    },
    { id: '3', icon: 'ri-delete-bin-2-line',  tooltip: 'Delete', color: 'danger'  },
  ];

  // ── Controlled-mode state ───────────────────────────────────
  readonly isOpen = signal(false);

  // ── Event handlers ──────────────────────────────────────────
  onExpandedChange(value: boolean): void {
    this.isOpen.set(value);
    console.log('FAB expanded:', value);
  }

  onItemClick({ item, event }: { item: FabButtonItem; event: Event }): void {
    console.log('Item clicked:', item.id, event);
  }
}
