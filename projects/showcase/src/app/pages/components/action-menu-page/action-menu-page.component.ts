import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActionMenuComponent, ActionMenuItem } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

interface CodeExample {
  title: string;
  code: string;
  language: string;
}

@Component({
  selector: 'app-action-menu-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, ActionMenuComponent, CodeBlockComponent],
  templateUrl: './action-menu-page.component.html',
  styleUrls: ['./action-menu-page.component.scss'],
})
export class ActionMenuPageComponent {
  // 1. Básico
  basicExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.basic.htmlTitle',
      code: `<nui-action-menu 
  icon="ri-more-line" 
  [items]="menuItems"
  (onItemAction)="handleAction($event)">
</nui-action-menu>`,
      language: 'html',
    },
    {
      title: 'components.actionMenu.basic.tsTitle',
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
  ];

  // 2. Con separadores
  separatorExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.separators.codeTitle',
      code: `menuItems: ActionMenuItem[] = [
  { label: 'Edit', icon: 'ri-edit-line', action: 'edit' },
  { label: 'Duplicate', icon: 'ri-file-copy-line', action: 'duplicate' },
  { separator: true }, // Simple separator
  { label: 'Export', icon: 'ri-download-line', action: 'export' },
  { separator: true, label: 'Danger Zone' }, // Separator with label
  { label: 'Delete', icon: 'ri-delete-bin-line', action: 'delete' }
];`,
      language: 'typescript',
    },
  ];

  // 3. Con submenús
  submenuExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.submenu.codeTitle',
      code: `menuWithSubmenu: ActionMenuItem[] = [
  { label: 'New', icon: 'ri-add-line', action: 'new' },
  { 
    label: 'Export', 
    icon: 'ri-download-line',
    children: [
      { label: 'PDF', action: 'export-pdf', icon: 'ri-file-pdf-line' },
      { label: 'Excel', action: 'export-excel', icon: 'ri-file-excel-line' },
      { label: 'CSV', action: 'export-csv', icon: 'ri-file-text-line' }
    ]
  },
  { separator: true },
  {
    label: 'Share',
    icon: 'ri-share-line',
    children: [
      { label: 'Email', action: 'share-email', icon: 'ri-mail-line' },
      { label: 'Link', action: 'share-link', icon: 'ri-link' },
      { label: 'Social', action: 'share-social', icon: 'ri-share-box-line' }
    ]
  }
];`,
      language: 'typescript',
    },
  ];

  // 4. Variantes de botón
  variantExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.variants.codeTitle',
      code: `<!-- Ghost (default) -->
<nui-action-menu 
  icon="ri-more-line"
  variant="ghost"
  [items]="menuItems">
</nui-action-menu>

<!-- Solid -->
<nui-action-menu 
  icon="ri-more-line"
  variant="solid"
  color="primary"
  [items]="menuItems">
</nui-action-menu>

<!-- Outline -->
<nui-action-menu 
  icon="ri-more-line"
  variant="outline"
  color="accent"
  [items]="menuItems">
</nui-action-menu>`,
      language: 'html',
    },
  ];

  // 5. Tamaños
  sizeExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.sizes.codeTitle',
      code: `<nui-action-menu size="xs" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="sm" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="md" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="lg" icon="ri-more-line" [items]="menuItems"></nui-action-menu>
<nui-action-menu size="xl" icon="ri-more-line" [items]="menuItems"></nui-action-menu>`,
      language: 'html',
    },
  ];

  // 6. Con texto
  labelExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.label.codeTitle',
      code: `<!-- Con icono y texto -->
<nui-action-menu 
  label="Actions"
  icon="ri-more-2-line"
  color="primary"
  variant="solid"
  [items]="menuItems">
</nui-action-menu>

<!-- Solo texto -->
<nui-action-menu 
  label="Options"
  variant="outline"
  [items]="menuItems">
</nui-action-menu>

<!-- Ancho completo -->
<nui-action-menu 
  label="Menu"
  width="full"
  [items]="menuItems">
</nui-action-menu>`,
      language: 'html',
    },
  ];

  // 7. Items deshabilitados
  disabledExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.disabled.codeTitle',
      code: `menuItems: ActionMenuItem[] = [
  { label: 'Save', icon: 'ri-save-line', action: 'save' },
  { 
    label: 'Print', 
    icon: 'ri-printer-line', 
    action: 'print',
    disabled: true
  },
  { label: 'Share', icon: 'ri-share-line', action: 'share' }
];

<!-- Menú completamente deshabilitado -->
<nui-action-menu 
  [disabled]="true"
  icon="ri-more-line"
  [items]="menuItems">
</nui-action-menu>`,
      language: 'typescript',
    },
  ];

  // 8. Con Subtitle
  subtitleExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.withSubtitle.codeTitle',
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
  ];

  // 9. Con Selected
  selectedExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.selected.codeTitle',
      code: `// Útil para selectores o filtros
menuItems: ActionMenuItem[] = [
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
  ];

  // 10. Iconos descriptivos
  colorExamples: CodeExample[] = [
    {
      title: 'components.actionMenu.colors.codeTitle',
      code: `<!-- Note: ActionMenu items don't have variant/color properties -->
<!-- Use icons and labels to communicate intent -->
menuItems: ActionMenuItem[] = [
  { label: 'Info', icon: 'ri-information-line', action: 'info' },
  { label: 'Success', icon: 'ri-checkbox-circle-line', action: 'success' },
  { label: 'Warning', icon: 'ri-error-warning-line', action: 'warning' },
  { separator: true },
  { label: 'Delete', icon: 'ri-close-circle-line', action: 'delete' }
];`,
      language: 'typescript',
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
        { label: 'Excel', action: 'export-excel', icon: 'ri-file-excel-line' },
        { label: 'CSV', action: 'export-csv', icon: 'ri-file-text-line' },
      ],
    },
    { separator: true },
    {
      label: 'Share',
      icon: 'ri-share-line',
      children: [
        { label: 'Email', action: 'share-email', icon: 'ri-mail-line' },
        { label: 'Link', action: 'share-link', icon: 'ri-link' },
        { label: 'Social', action: 'share-social', icon: 'ri-share-box-line' },
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

  handleAction(item: ActionMenuItem) {
    console.log('Action:', item.action);
  }
}
