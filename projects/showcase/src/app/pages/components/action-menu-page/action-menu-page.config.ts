import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Action Menu
 */
export const ACTION_MENU_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.actionMenu.title',
  subtitle: 'components.actionMenu.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.actionMenu.basic.title',
      description: 'components.actionMenu.basic.description',
      anchor: 'basic',
      note: {
        type: 'info',
        content: 'components.actionMenu.basic.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-action-menu 
  icon="ri-more-line" 
  [items]="menuItems"
  (onItemAction)="handleAction($event)">
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `export class MyComponent {
  menuItems: ActionMenuItem[] = [
    { 
      label: 'Edit', 
      icon: 'ri-edit-line', 
      action: 'edit' 
    },
    { 
      label: 'Delete', 
      icon: 'ri-delete-bin-line', 
      action: 'delete',
      variant: 'danger' 
    }
  ];

  handleAction(item: ActionMenuItem) {
    console.log('Action:', item.action);
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'separators',
      title: 'components.actionMenu.separators.title',
      description: 'components.actionMenu.separators.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.separators.note',
      },
      anchor: 'separators',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuItems: ActionMenuItem[] = [
  { label: 'Edit', icon: 'ri-edit-line', action: 'edit' },
  { label: 'Duplicate', icon: 'ri-file-copy-line', action: 'duplicate' },
  { separator: true }, // Simple separator
  { label: 'Export', icon: 'ri-download-line', action: 'export' },
  { separator: true, label: 'Danger Zone' }, // <----- Separator with label
  { label: 'Delete', icon: 'ri-delete-bin-line', action: 'delete' }
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'submenu',
      title: 'components.actionMenu.submenu.title',
      description: 'components.actionMenu.submenu.description',
      anchor: 'submenu',
      note: {
        type: 'info',
        content: 'components.actionMenu.submenu.note',
      },
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuWithSubmenu: ActionMenuItem[] = [
  { label: 'New', icon: 'ri-add-line', action: 'new' },
  { 
    label: 'Export', 
    icon: 'ri-download-line',
    children: [
      { label: 'PDF', action: 'export-pdf', icon: 'ri-file-pdf-line' },
      { label: 'Excel', action: 'export-excel', icon: 'ri-file-excel-line', selected: true },
      { label: 'CSV', action: 'export-csv', icon: 'ri-file-text-line' }
    ]
  },
  { separator: true },
  {
    label: 'Share',
    icon: 'ri-share-line',
    children: [
      { label: 'Email', action: 'share-email', icon: 'ri-mail-line' },
      { 
        label: 'Social Media', 
        icon: 'ri-share-box-line',
        children: [
          { label: 'Facebook', action: 'share-facebook', icon: 'ri-facebook-line' },
          { label: 'Twitter', action: 'share-twitter', icon: 'ri-twitter-line' },
          { label: 'LinkedIn', action: 'share-linkedin', icon: 'ri-linkedin-line' }
        ]
      },
      { label: 'Copy Link', action: 'share-link', icon: 'ri-link' }
    ]
  }
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'variants',
      title: 'components.actionMenu.variants.title',
      description: 'components.actionMenu.variants.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.variants.note',
      },
      anchor: 'variants',
      examples: [
        {
          title: 'Ghost',
          code: `<nui-action-menu 
  icon="ri-more-line"
  variant="ghost"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'Outline',
          code: `<nui-action-menu 
  icon="ri-more-line"
  variant="outline"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'Solid',
          code: `<nui-action-menu 
  icon="ri-more-line"
  variant="solid"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.actionMenu.sizes.title',
      description: 'components.actionMenu.sizes.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.sizes.note',
      },
      anchor: 'sizes',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-action-menu size="xs" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="sm" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="md" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="lg" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="xl" icon="ri-more-line" [items]="menuItems"></nui-action-menu>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'label',
      title: 'components.actionMenu.label.title',
      description: 'components.actionMenu.label.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.label.note',
      },
      anchor: 'label',
      examples: [
        {
          title: 'components.actionMenu.label.codeTitle1',
          code: `<nui-action-menu 
  label="Actions"
  icon="ri-more-2-line"
  color="primary"
  variant="solid"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'components.actionMenu.label.codeTitle2',
          code: `<nui-action-menu 
  label="Options"
  color="secondary"
  variant="outline"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'components.actionMenu.label.codeTitle3',
          code: `<nui-action-menu 
  label="Menu"
  width="full"
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'disabled',
      title: 'components.actionMenu.disabled.title',
      description: 'components.actionMenu.disabled.description',
      anchor: 'disabled',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuItems: ActionMenuItem[] = [
  { label: 'Save', icon: 'ri-save-line', action: 'save' },
  { 
    label: 'Print', 
    icon: 'ri-printer-line', 
    action: 'print',
    disabled: true
  },
  { label: 'Share', icon: 'ri-share-line', action: 'share' }
];`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.html',
          code: `<nui-action-menu 
  icon="ri-more-line" 
  [items]="menuItems">
</nui-action-menu>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'withSubtitle',
      title: 'components.actionMenu.withSubtitle.title',
      description: 'components.actionMenu.withSubtitle.description',
      anchor: 'withSubtitle',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuItems: ActionMenuItem[] = [
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
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'selected',
      title: 'components.actionMenu.selected.title',
      description: 'components.actionMenu.selected.description',
      anchor: 'selected',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuItems: ActionMenuItem[] = [
  { 
    label: 'English', 
    icon: 'ri-global-line',
    action: 'lang-en',
    selected: true // Muestra check icon
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
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'icons',
      title: 'components.actionMenu.icons.title',
      description: 'components.actionMenu.icons.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.icons.note',
      },
      anchor: 'icons',
      examples: [
        {
          title: 'codeExamples.typescript',
          code: `menuItems: ActionMenuItem[] = [
  { label: 'Info', icon: 'ri-information-line', action: 'info' },
  { label: 'Success', icon: 'ri-checkbox-circle-line', action: 'success' },
  { label: 'Warning', icon: 'ri-error-warning-line', action: 'warning' },
  { separator: true },
  { label: 'Delete', icon: 'ri-close-circle-line', action: 'delete' }
];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'template',
      title: 'components.actionMenu.template.title',
      description: 'components.actionMenu.template.description',
      note: {
        type: 'info',
        content: 'components.actionMenu.template.note',
      },
      anchor: 'template',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-action-menu 
  icon="ri-user-line" 
  label="Mi Cuenta"
  variant="solid"
  color="primary"
  [items]="menuWithBadges">
  
  <!-- Header: Use the menu-header directive directly -->
  <div menu-header class="menu-user-header">
    <div class="user-avatar">
      <i class="ri-user-fill"></i>
    </div>
    <div class="user-info">
      <span class="user-name">John Doe</span>
      <span class="user-email">john@example.com</span>
    </div>
  </div>
  
  <!-- Items: custom template with let-item -->
  <ng-template #item let-item>
    <div class="menu-item-custom" (click)="handleAction(item)">
      <div class="menu-item-main">
        <i [class]="item.icon"></i>
        <div class="menu-item-text">
          <span class="menu-item-label">{{ item.label }}</span>
          @if (item.subtitle) {
            <span class="menu-item-subtitle">{{ item.subtitle }}</span>
          }
        </div>
      </div>
      @if (item.badge) {
        <span class="menu-item-badge">{{ item.badge }}</span>
      }
      @if (item.shortcut) {
        <span class="menu-item-shortcut">{{ item.shortcut }}</span>
      }
    </div>
  </ng-template>
  
  <!-- Footer: use the menu-footer directive directly -->
  <button menu-footer class="menu-footer-logout">
    <i class="ri-logout-box-line"></i>
    <span>Cerrar Sesión</span>
  </button>
</nui-action-menu>`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `menuWithBadges: ActionMenuItem[] = [
  { 
    label: 'Mensajes', 
    subtitle: 'New messages received',
    icon: 'ri-message-line', 
    action: 'messages',
    badge: '3'
  },
  { 
    label: 'Tareas', 
    subtitle: 'Pending tasks',
    icon: 'ri-task-line', 
    action: 'tasks',
    badge: '7'
  },
  { separator: true },
  { 
    label: 'Settings', 
    icon: 'ri-settings-line', 
    action: 'settings',
    shortcut: '⌘+S'
  }
];

...

handleAction(item: ActionMenuItem) {
  console.log('Action:', item.action, 'Data:', item.data);
}
`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.actionMenu.api.title',
      description: 'components.actionMenu.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.componentCode',
          code: `@Input() items: ActionMenuItem[] = [];        // Menu items
@Input() icon?: string;                       // Icon of the trigger button
@Input() label?: string;                      // Text of the trigger button
@Input() variant: ButtonVariant = 'ghost';    // Button variant
@Input() color?: ButtonColor;                 // Button color
@Input() size: ButtonSize = 'md';             // Button size
@Input() width?: 'auto' | 'full' = 'auto';    // Button width
@Input() disabled = false;                    // Disabled state
@Input() position: PopoverPosition = 'bottom-start'; // Menu position
@Input() menuWidth: string = '200px';         // Dropdown menu width

@Output() onItemAction = new EventEmitter<ActionMenuItem>(); // Click on item
@Output() onMenuOpen = new EventEmitter<void>();             // Menu opened
@Output() onMenuClose = new EventEmitter<void>();            // Menu closed`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.interfacesCode',
          code: `interface ActionMenuItem {
  label?: string;           // Text of the item
  subtitle?: string;        // Secondary text
  icon?: string;            // Icon (Remix Icon)
  action?: string;          // Action identifier
  badge?: string;           // Badge with text/number
  shortcut?: string;        // Keyboard shortcut (⌘+S)
  selected?: boolean;       // Shows check icon
  disabled?: boolean;       // Disabled state
  separator?: boolean;      // Renders as separator
  variant?: 'default' | 'danger'; // Visual variant
  children?: ActionMenuItem[]; // Submenu items
  data?: any;               // Custom data
}`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component } from '@angular/core';
import { ActionMenuItem } from 'nui';

@Component({
  selector: 'app-example',
  template: \`
    <nui-action-menu
      icon="ri-more-line"
      variant="ghost"
      size="md"
      position="bottom-start"
      menuWidth="250px"
      [items]="menuItems"
      (onItemAction)="handleAction($event)"
      (onMenuOpen)="onOpen()"
      (onMenuClose)="onClose()">
    </nui-action-menu>
  \`
})
export class ExampleComponent {
  menuItems: ActionMenuItem[] = [
    { label: 'Edit', icon: 'ri-edit-line', action: 'edit' },
    { separator: true },
    { label: 'Delete', icon: 'ri-delete-bin-line', action: 'delete' }
  ];

  handleAction(item: ActionMenuItem): void {
    console.log('Action:', item.action, 'Data:', item.data);
  }

  onOpen(): void {
    console.log('Menu opened');
  }

  onClose(): void {
    console.log('Menu closed');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.actionMenu.styling.title',
      description: 'components.actionMenu.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Menu Container */
  --nui-action-menu-bg: var(--nui-bg-primary);
  --nui-action-menu-border: var(--nui-border-primary);
  --nui-action-menu-border-radius: var(--nui-border-radius-md);
  --nui-action-menu-shadow: var(--nui-shadow-lg);
  --nui-action-menu-padding: var(--nui-spacing-xs);
  --nui-action-menu-min-width: 180px;
  --nui-action-menu-max-width: 320px;

  /* Menu Items */
  --nui-action-menu-item-padding: var(--nui-spacing-sm) var(--nui-spacing-md);
  --nui-action-menu-item-gap: var(--nui-spacing-sm);
  --nui-action-menu-item-border-radius: var(--nui-border-radius-sm);
  --nui-action-menu-item-text-color: var(--nui-text-primary);
  --nui-action-menu-item-icon-size: 18px;
  
  /* Item States */
  --nui-action-menu-item-hover-bg: var(--nui-bg-hover);
  --nui-action-menu-item-active-bg: var(--nui-bg-active);
  --nui-action-menu-item-disabled-opacity: 0.5;
  
  /* Selected Item */
  --nui-action-menu-item-selected-color: var(--primary-color);
  --nui-action-menu-item-selected-bg: var(--primary-bg-subtle);
  
  /* Subtitle */
  --nui-action-menu-subtitle-color: var(--nui-text-secondary);
  --nui-action-menu-subtitle-size: var(--nui-font-size-xs);
  
  /* Badge */
  --nui-action-menu-badge-bg: var(--primary-color);
  --nui-action-menu-badge-color: var(--nui-text-on-primary);
  --nui-action-menu-badge-size: var(--nui-font-size-xs);
  --nui-action-menu-badge-padding: 2px 6px;
  --nui-action-menu-badge-radius: var(--nui-border-radius-full);
  
  /* Shortcut */
  --nui-action-menu-shortcut-color: var(--nui-text-tertiary);
  --nui-action-menu-shortcut-bg: var(--nui-bg-tertiary);
  --nui-action-menu-shortcut-size: var(--nui-font-size-xs);
  --nui-action-menu-shortcut-padding: 2px 6px;
  --nui-action-menu-shortcut-radius: var(--nui-border-radius-xs);
  
  /* Separator */
  --nui-action-menu-separator-color: var(--nui-border-primary);
  --nui-action-menu-separator-margin: var(--nui-spacing-xs) 0;
  --nui-action-menu-separator-label-color: var(--nui-text-tertiary);
  --nui-action-menu-separator-label-size: var(--nui-font-size-xs);
  
  /* Submenu */
  --nui-action-menu-submenu-icon-size: 16px;
  --nui-action-menu-submenu-icon-color: var(--nui-text-tertiary);
  
  /* Header & Footer */
  --nui-action-menu-header-padding: var(--nui-spacing-md);
  --nui-action-menu-header-border: var(--nui-border-primary);
  --nui-action-menu-footer-padding: var(--nui-spacing-md);
  --nui-action-menu-footer-border: var(--nui-border-primary);
}

// Example of customization
.my-custom-action-menu {
  ::ng-deep .nui-action-menu {
    --nui-action-menu-bg: #1a1a2e;
    --nui-action-menu-item-text-color: #e0e0e0;
    --nui-action-menu-item-hover-bg: #16213e;
    --nui-action-menu-border-radius: 12px;
    --nui-action-menu-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
