import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SplitButtonComponent, ActionMenuItem } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { SPLIT_BUTTON_PAGE_CONFIG } from './split-button-page.config';

@Component({
  selector: 'app-split-button-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SplitButtonComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './split-button-page.component.html',
  styleUrls: ['./split-button-page.component.scss'],
})
export class SplitButtonPageComponent extends BaseComponentPage {
  override pageConfig = SPLIT_BUTTON_PAGE_CONFIG;

  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'variants-colors',
        'shapes',
        'sizes',
        'raised',
        'icons',
        'loading',
        'disabled',
        'menu-items',
        'submenu',
        'full-width',
        'events',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-import', 'api-inputs', 'api-outputs', 'api-interface'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-structure'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-eye-line',
      sections: ['a11y-roles', 'a11y-naming', 'a11y-keyboard'],
    },
    {
      id: 'globalconfig',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-setup', 'global-config-defaults', 'global-config-priority'],
    },
  ];

  // ── Demo data ─────────────────────────────────────────────────────────────
  readonly basicItems: ActionMenuItem[] = [
    { label: 'Save as draft', icon: 'ri-draft-line',       action: 'draft'   },
    { label: 'Publish',       icon: 'ri-send-plane-line',  action: 'publish' },
    { label: 'Delete',        icon: 'ri-delete-bin-line',  action: 'delete'  },
  ];

  readonly richItems: ActionMenuItem[] = [
    { label: 'Edit',    icon: 'ri-edit-line',       action: 'edit',    selected: true                      },
    { label: 'Rename',  icon: 'ri-text-line',        action: 'rename',  subtitle: 'Change the display name' },
    { separator: true,  label: 'Danger zone'                                                                },
    { label: 'Archive', icon: 'ri-archive-line',     action: 'archive', subtitle: 'Move to archive'         },
    { label: 'Delete',  icon: 'ri-delete-bin-line',  action: 'delete',  badge: '3'                          },
  ];

  readonly submenuItems: ActionMenuItem[] = [
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
  ];

  // ── Interactive state ─────────────────────────────────────────────────────
  readonly isLoading = signal(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  handleAction(item: ActionMenuItem): void {
    console.log('[SplitButton] Item action:', item.action, item);
  }

  handleMainClick(event: Event): void {
    console.log('[SplitButton] Main click:', event);
  }

  onMenuOpen(): void {
    console.log('[SplitButton] Menu opened');
  }

  onMenuClose(): void {
    console.log('[SplitButton] Menu closed');
  }
}
