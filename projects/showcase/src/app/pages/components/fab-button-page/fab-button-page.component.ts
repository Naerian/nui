import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  FabButtonComponent,
  FabButtonItem,
  FabTriggerDirective,
  FabItemDirective,
} from 'nui';
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
        'basic',
        'directions',
        'layouts',
        'shapes',
        'colors',
        'sizes',
        'animation',
        'trigger',
        'loading',
        'openOn',
        'itemDisplay',
        'closeOptions',
        'backdrop',
        'templates',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: [
        'api-inputs',
        'api-outputs',
        'api-computed',
        'api-types',
        'api-item',
        'api-item-resolved',
        'api-directives',
        'api-config',
      ],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-structure'],
    },
    {
      id: 'i18n',
      label: 'common.tabs.i18n',
      icon: 'ri-translate-2',
      sections: ['i18n-tokens'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-accessibility-line',
      sections: ['a11y-roles', 'a11y-naming', 'a11y-keyboard'],
    },
    {
      id: 'globalconfig',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-setup', 'global-config-defaults', 'global-config-priority'],
    },
  ];

  // ─── Shared item sets ───────────────────────────────────────────────────

  /** Generic 3-item set used across most demos. */
  readonly actions: FabButtonItem[] = [
    { id: '1', icon: 'ri-pencil-line',     tooltip: 'Edit'    },
    { id: '2', icon: 'ri-share-line',      tooltip: 'Share' },
    { id: '3', icon: 'ri-delete-bin-line', tooltip: 'Delete', color: 'danger' },
  ];

  /** 4-item set for radial / circle layout (needs one extra item). */
  readonly radialActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-home-4-line',    tooltip: 'Home'    },
    { id: '2', icon: 'ri-calendar-line',  tooltip: 'Calendar'    },
    { id: '3', icon: 'ri-mail-line',      tooltip: 'Messages'  },
    { id: '4', icon: 'ri-chat-3-line',    tooltip: 'Chat'      },
  ];

  /** Items with visible labels (icon-text display mode). */
  readonly labeledActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-file-add-line',   label: 'Document', tooltip: 'New document' },
    { id: '2', icon: 'ri-image-add-line',  label: 'Image',    tooltip: 'New image'    },
    { id: '3', icon: 'ri-folder-add-line', label: 'Folder',   tooltip: 'New folder'   },
  ];

  /** Items with labels + semantic color for the templates demo. */
  readonly templateActions: FabButtonItem[] = [
    { id: '1', icon: 'ri-bug-line',        label: 'Bug',        color: 'danger'  },
    { id: '2', icon: 'ri-lightbulb-line',  label: 'Feature',    color: 'success' },
    { id: '3', icon: 'ri-chat-3-line',     label: 'Comment', color: 'info'    },
  ];

  // ─── Interactive state ──────────────────────────────────────────────────

  /** Badge counter shown on the trigger in the trigger demo. */
  readonly unreadCount = signal(3);

  /** Loading state for the loading demo. */
  readonly isSending = signal(false);

  simulateSend(): void {
    this.isSending.set(true);
    setTimeout(() => this.isSending.set(false), 2000);
  }
}
