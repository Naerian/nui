import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { 
  ActionMenuComponent, 
  ActionMenuItem, 
  MenuHeaderDirective, 
  MenuFooterDirective 
} from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { ACTION_MENU_PAGE_CONFIG } from './action-menu-page.config';

@Component({
  selector: 'app-action-menu-page',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    ActionMenuComponent, 
    MenuHeaderDirective, 
    MenuFooterDirective, 
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent
  ],
  templateUrl: './action-menu-page.component.html',
  styleUrls: ['./action-menu-page.component.scss'],
})
export class ActionMenuPageComponent extends BaseComponentPage {
  override pageConfig = ACTION_MENU_PAGE_CONFIG;

  // Tabs configuration
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'separators', 'submenu', 'variants', 'sizes', 'label', 'disabled', 'withSubtitle', 'selected', 'icons', 'template'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs', 'api-interface'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-structure', 'theming-items', 'theming-colors'],
    },
  ];

  // Datos para ejemplos interactivos
  basicMenuItems: ActionMenuItem[] = [
    { label: 'Edit', icon: 'ri-edit-line', action: 'edit' },
    { label: 'Delete', icon: 'ri-delete-bin-line', action: 'delete' },
  ];

  menuWithSeparators: ActionMenuItem[] = [
    { label: 'Edit', icon: 'ri-edit-line', action: 'edit' },
    { label: 'Duplicate', icon: 'ri-file-copy-line', action: 'duplicate' },
    { separator: true },
    { label: 'Export', icon: 'ri-download-line', action: 'export' },
    { separator: true, label: 'Danger Zone' },
    { label: 'Delete', icon: 'ri-delete-bin-line', action: 'delete' },
  ];

  menuWithSubmenu: ActionMenuItem[] = [
    { label: 'New', icon: 'ri-add-line', action: 'new' },
    {
      label: 'Export',
      icon: 'ri-download-line',
      children: [
        { label: 'PDF', action: 'export-pdf', icon: 'ri-file-pdf-line' },
        { label: 'Excel', action: 'export-excel', icon: 'ri-file-excel-line', selected: true },
        { label: 'CSV', action: 'export-csv', icon: 'ri-file-text-line' },
      ],
    },
    { separator: true },
    {
      label: 'Share',
      icon: 'ri-share-line',
      children: [
        { label: 'Email', action: 'share-email', icon: 'ri-mail-line' },
        { 
          label: 'Social Media', 
          action: 'share-social-media', 
          icon: 'ri-share-box-line',
          children: [
            { label: 'Facebook', action: 'share-facebook', icon: 'ri-facebook-line' },
            { label: 'Twitter', action: 'share-twitter', icon: 'ri-twitter-line' },
            { label: 'LinkedIn', action: 'share-linkedin', icon: 'ri-linkedin-line' },
          ]
        },
        { label: 'Copy Link', action: 'share-link', icon: 'ri-link' },
      ],
    },
  ];

  menuWithDisabled: ActionMenuItem[] = [
    { label: 'Save', icon: 'ri-save-line', action: 'save' },
    { label: 'Print', icon: 'ri-printer-line', action: 'print', disabled: true },
    { label: 'Share', icon: 'ri-share-line', action: 'share' },
  ];

  menuWithSubtitle: ActionMenuItem[] = [
    { 
      label: 'John Doe', 
      subtitle: 'john@example.com',
      icon: 'ri-user-line', 
      action: 'user1' 
    },
    { 
      label: 'Jane Smith', 
      subtitle: 'jane@example.com',
      icon: 'ri-user-line', 
      action: 'user2' 
    },
    { separator: true },
    { 
      label: 'Settings', 
      subtitle: 'Manage preferences',
      icon: 'ri-settings-line', 
      action: 'settings' 
    }
  ];

  menuWithSelected: ActionMenuItem[] = [
    { 
      label: 'English', 
      icon: 'ri-global-line',
      action: 'lang-en',
      selected: true
    },
    { 
      label: 'Español', 
      icon: 'ri-global-line',
      action: 'lang-es'
    },
    { 
      label: 'Français', 
      icon: 'ri-global-line',
      action: 'lang-fr'
    }
  ];

  coloredMenuItems: ActionMenuItem[] = [
    { label: 'Info', icon: 'ri-information-line', action: 'info' },
    { label: 'Success', icon: 'ri-checkbox-circle-line', action: 'success' },
    { label: 'Warning', icon: 'ri-error-warning-line', action: 'warning' },
    { separator: true },
    { label: 'Delete', icon: 'ri-close-circle-line', action: 'delete' },
  ];

  menuWithBadges: ActionMenuItem[] = [
    { 
      label: 'Mensajes', 
      subtitle: 'Nuevos mensajes recibidos',
      icon: 'ri-message-line', 
      action: 'messages',
      badge: '3'
    },
    { 
      label: 'Tareas', 
      subtitle: 'Tareas pendientes',
      icon: 'ri-task-line', 
      action: 'tasks',
      badge: '7'
    },
    { separator: true },
    { 
      label: 'Configuración', 
      icon: 'ri-settings-line', 
      action: 'settings',
      shortcut: '⌘+S'
    }
  ];

  menuActionOnly: ActionMenuItem[] = [
    { 
      label: 'Export PDF', 
      icon: 'ri-file-pdf-line',
      action: 'export-pdf'
    },
    { 
      label: 'Export Excel', 
      icon: 'ri-file-excel-line',
      action: 'export-excel'
    },
    { separator: true },
    { 
      label: 'Share', 
      icon: 'ri-share-line',
      action: 'share'
    },
    { 
      label: 'Print', 
      icon: 'ri-printer-line',
      action: 'print'
    }
  ];

  handleAction(item: ActionMenuItem) {
    console.log('🎯 Item seleccionado:', item.label);
    console.log('📋 Action:', item.action);
    console.log('📦 Item completo:', item);
  }

  handleSelectionChange(item: ActionMenuItem) {
    console.log('✅ Selección cambiada:', item.label);
    console.log('📋 Action:', item.action);
    console.log('📦 Item seleccionado:', item);
  }
}
