# ContextMenu Component

Componente de menú contextual que se abre con clic derecho, ideal para acciones contextuales sobre elementos específicos.

## 📦 Importación

```typescript
import { ContextMenuModule } from '@shared/components/context-menu';
```

## 🎯 Selector

```html
<nui-context-menu></nui-context-menu>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `items` | `ContextMenuItem[]` | `[]` | Items del menú contextual |
| `disabled` | `boolean` | `false` | Deshabilitar el menú contextual |
| `autoClose` | `boolean` | `true` | Cerrar automáticamente al hacer clic en un item |
| `trigger` | `'contextmenu' \| 'click'` | `'contextmenu'` | Evento que abre el menú |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onItemAction` | `EventEmitter<ContextMenuItem>` | Se emite al seleccionar un item del menú |
| `menuOpen` | `EventEmitter<void>` | Se emite cuando el menú se abre |
| `menuClose` | `EventEmitter<void>` | Se emite cuando el menú se cierra |

### Tipos

```typescript
interface ContextMenuItem {
  label?: string;
  icon?: string;
  action?: string | ((item: ContextMenuItem) => void);
  variant?: NUIColor;
  disabled?: boolean;
  type?: 'item' | 'separator';
  submenu?: ContextMenuItem[];
  shortcut?: string;  // Atajo de teclado a mostrar
}

type NUIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
```

## 💡 Ejemplos de Uso

### Menú Contextual Básico

```html
<div 
  nyContextMenu 
  [items]="menuItems"
  (onItemAction)="handleAction($event)">
  Haz clic derecho aquí
</div>
```

```typescript
import { Component } from '@angular/core';
import { ContextMenuItem } from '@shared/components/context-menu';

@Component({
  selector: 'app-example',
  template: `...`
})
export class ExampleComponent {
  menuItems: ContextMenuItem[] = [
    { 
      label: 'Copiar', 
      icon: 'ri-file-copy-line',
      action: 'copy',
      shortcut: 'Ctrl+C'
    },
    { 
      label: 'Pegar', 
      icon: 'ri-clipboard-line',
      action: 'paste',
      shortcut: 'Ctrl+V'
    },
    { 
      type: 'separator' 
    },
    { 
      label: 'Eliminar', 
      icon: 'ri-delete-bin-line',
      action: 'delete',
      variant: 'danger'
    }
  ];

  handleAction(item: ContextMenuItem) {
    console.log('Acción:', item.action);
    switch(item.action) {
      case 'copy':
        this.copy();
        break;
      case 'paste':
        this.paste();
        break;
      case 'delete':
        this.delete();
        break;
    }
  }

  private copy() {
    // Lógica de copiar
  }

  private paste() {
    // Lógica de pegar
  }

  private delete() {
    // Lógica de eliminar
  }
}
```

### Menú Contextual en Tabla

```html
<table>
  <tbody>
    <tr 
      *ngFor="let user of users"
      nyContextMenu
      [items]="getUserContextMenu(user)"
      (onItemAction)="handleUserAction($event, user)">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.role }}</td>
    </tr>
  </tbody>
</table>
```

```typescript
export class UsersTableComponent {
  users = [
    { id: 1, name: 'Juan', email: 'juan@example.com', role: 'Admin' },
    { id: 2, name: 'María', email: 'maria@example.com', role: 'User' }
  ];

  getUserContextMenu(user: any): ContextMenuItem[] {
    return [
      { 
        label: 'Ver perfil', 
        icon: 'ri-user-line',
        action: 'view'
      },
      { 
        label: 'Editar', 
        icon: 'ri-edit-line',
        action: 'edit'
      },
      { 
        type: 'separator' 
      },
      { 
        label: 'Cambiar rol',
        icon: 'ri-shield-user-line',
        submenu: [
          { label: 'Admin', action: 'role-admin' },
          { label: 'User', action: 'role-user' },
          { label: 'Guest', action: 'role-guest' }
        ]
      },
      { 
        type: 'separator' 
      },
      { 
        label: 'Eliminar', 
        icon: 'ri-delete-bin-line',
        action: 'delete',
        variant: 'danger',
        disabled: user.role === 'Admin' // No eliminar admins
      }
    ];
  }

  handleUserAction(item: ContextMenuItem, user: any) {
    switch(item.action) {
      case 'view':
        this.viewUser(user);
        break;
      case 'edit':
        this.editUser(user);
        break;
      case 'delete':
        this.deleteUser(user);
        break;
      default:
        if (item.action?.startsWith('role-')) {
          const newRole = item.action.replace('role-', '');
          this.changeUserRole(user, newRole);
        }
    }
  }
}
```

### Menú con Submenús

```html
<div nyContextMenu [items]="advancedMenu"></div>
```

```typescript
advancedMenu: ContextMenuItem[] = [
  { 
    label: 'Nuevo',
    icon: 'ri-add-line',
    submenu: [
      { label: 'Archivo', icon: 'ri-file-line', action: 'new-file' },
      { label: 'Carpeta', icon: 'ri-folder-line', action: 'new-folder' },
      { label: 'Proyecto', icon: 'ri-folder-2-line', action: 'new-project' }
    ]
  },
  { 
    label: 'Exportar',
    icon: 'ri-download-line',
    submenu: [
      { label: 'PDF', icon: 'ri-file-pdf-line', action: 'export-pdf' },
      { label: 'Excel', icon: 'ri-file-excel-line', action: 'export-excel' },
      { label: 'CSV', icon: 'ri-file-text-line', action: 'export-csv' },
      { type: 'separator' },
      { label: 'JSON', icon: 'ri-code-line', action: 'export-json' }
    ]
  },
  {
    type: 'separator'
  },
  {
    label: 'Configuración',
    icon: 'ri-settings-line',
    action: 'settings'
  }
];
```

### Menú con Callbacks Directos

```typescript
menuItems: ContextMenuItem[] = [
  { 
    label: 'Copiar al portapapeles',
    icon: 'ri-clipboard-line',
    action: () => {
      navigator.clipboard.writeText(this.selectedText);
      this.showToast('Copiado');
    }
  },
  {
    label: 'Compartir',
    icon: 'ri-share-line',
    action: () => this.openShareDialog()
  }
];
```

### Menú Contextual en Elementos de Lista

```html
<ul class="file-list">
  <li 
    *ngFor="let file of files"
    nyContextMenu
    [items]="getFileMenu(file)"
    (onItemAction)="handleFileAction($event, file)">
    <i [class]="getFileIcon(file)"></i>
    {{ file.name }}
  </li>
</ul>
```

```typescript
export class FileListComponent {
  files = [
    { id: 1, name: 'document.pdf', type: 'pdf' },
    { id: 2, name: 'image.jpg', type: 'image' },
    { id: 3, name: 'video.mp4', type: 'video' }
  ];

  getFileMenu(file: any): ContextMenuItem[] {
    const menu: ContextMenuItem[] = [
      { 
        label: 'Abrir', 
        icon: 'ri-file-open-line',
        action: 'open'
      },
      { 
        label: 'Descargar', 
        icon: 'ri-download-line',
        action: 'download'
      }
    ];

    // Opciones específicas por tipo
    if (file.type === 'image') {
      menu.push({ 
        label: 'Ver en galería', 
        icon: 'ri-gallery-line',
        action: 'gallery'
      });
    }

    menu.push({ type: 'separator' });
    menu.push({ 
      label: 'Renombrar', 
      icon: 'ri-edit-line',
      action: 'rename',
      shortcut: 'F2'
    });
    menu.push({ 
      label: 'Eliminar', 
      icon: 'ri-delete-bin-line',
      action: 'delete',
      variant: 'danger',
      shortcut: 'Del'
    });

    return menu;
  }

  getFileIcon(file: any): string {
    const icons: any = {
      pdf: 'ri-file-pdf-line',
      image: 'ri-image-line',
      video: 'ri-video-line'
    };
    return icons[file.type] || 'ri-file-line';
  }

  handleFileAction(item: ContextMenuItem, file: any) {
    console.log(`${item.action} on ${file.name}`);
  }
}
```

### Menú Contextual en Canvas/Mapa

```html
<div 
  class="canvas-container"
  nyContextMenu
  [items]="canvasMenu"
  (menuOpen)="onMenuOpen($event)"
  (onItemAction)="handleCanvasAction($event)">
  <!-- Canvas content -->
</div>
```

```typescript
export class CanvasComponent {
  mousePosition = { x: 0, y: 0 };

  canvasMenu: ContextMenuItem[] = [
    { 
      label: 'Agregar nodo', 
      icon: 'ri-add-circle-line',
      action: 'add-node'
    },
    { 
      label: 'Pegar', 
      icon: 'ri-clipboard-line',
      action: 'paste',
      disabled: !this.hasClipboardData()
    },
    {
      type: 'separator'
    },
    {
      label: 'Seleccionar todo',
      icon: 'ri-checkbox-multiple-line',
      action: 'select-all',
      shortcut: 'Ctrl+A'
    },
    {
      label: 'Limpiar selección',
      icon: 'ri-close-circle-line',
      action: 'clear-selection',
      shortcut: 'Esc'
    }
  ];

  onMenuOpen(event: MouseEvent) {
    // Guardar posición del click para acciones contextuales
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  handleCanvasAction(item: ContextMenuItem) {
    switch(item.action) {
      case 'add-node':
        this.addNodeAt(this.mousePosition);
        break;
      case 'paste':
        this.pasteAt(this.mousePosition);
        break;
      // ... más acciones
    }
  }

  private hasClipboardData(): boolean {
    // Verificar si hay datos en el portapapeles
    return false; // Implementación real
  }
}
```

### Menú con Items Dinámicos

```html
<div 
  *ngFor="let item of items"
  nyContextMenu
  [items]="getContextMenu(item)"
  (onItemAction)="handleAction($event, item)">
  {{ item.name }}
</div>
```

```typescript
getContextMenu(item: any): ContextMenuItem[] {
  const menu: ContextMenuItem[] = [
    { label: 'Ver detalles', action: 'view' }
  ];

  // Agregar opciones según estado
  if (item.status === 'draft') {
    menu.push({ 
      label: 'Publicar', 
      icon: 'ri-send-plane-line',
      action: 'publish',
      variant: 'success'
    });
  } else if (item.status === 'published') {
    menu.push({ 
      label: 'Despublicar', 
      icon: 'ri-eye-off-line',
      action: 'unpublish'
    });
  }

  // Agregar opciones según permisos
  if (this.canEdit(item)) {
    menu.push({ 
      label: 'Editar', 
      icon: 'ri-edit-line',
      action: 'edit'
    });
  }

  if (this.canDelete(item)) {
    menu.push({ type: 'separator' });
    menu.push({ 
      label: 'Eliminar', 
      icon: 'ri-delete-bin-line',
      action: 'delete',
      variant: 'danger'
    });
  }

  return menu;
}
```

### Trigger con Click (en lugar de Right-Click)

```html
<button 
  nyContextMenu
  trigger="click"
  [items]="menuItems">
  Opciones
</button>
```

### Auto-Close Deshabilitado

```html
<div 
  nyContextMenu
  [items]="menuItems"
  [autoClose]="false">
  Menú permanente
</div>
```

### Menú con Eventos

```html
<div 
  nyContextMenu
  [items]="menuItems"
  (menuOpen)="onMenuOpen()"
  (menuClose)="onMenuClose()"
  (onItemAction)="onAction($event)">
  Contenido
</div>
```

```typescript
onMenuOpen() {
  console.log('Menú abierto');
  // Cargar datos dinámicos, analytics, etc.
}

onMenuClose() {
  console.log('Menú cerrado');
  // Limpiar estado temporal
}

onAction(item: ContextMenuItem) {
  console.log('Acción ejecutada:', item.action);
  // Ejecutar acción
}
```

### Menú Contextual en Editor de Texto

```html
<div 
  class="text-editor"
  contenteditable="true"
  nyContextMenu
  [items]="editorMenu"
  (onItemAction)="handleEditorAction($event)">
</div>
```

```typescript
export class EditorComponent {
  editorMenu: ContextMenuItem[] = [
    { 
      label: 'Cortar', 
      icon: 'ri-scissors-line',
      action: 'cut',
      shortcut: 'Ctrl+X'
    },
    { 
      label: 'Copiar', 
      icon: 'ri-file-copy-line',
      action: 'copy',
      shortcut: 'Ctrl+C'
    },
    { 
      label: 'Pegar', 
      icon: 'ri-clipboard-line',
      action: 'paste',
      shortcut: 'Ctrl+V'
    },
    { 
      type: 'separator' 
    },
    { 
      label: 'Formato',
      icon: 'ri-text',
      submenu: [
        { label: 'Negrita', action: 'bold', shortcut: 'Ctrl+B' },
        { label: 'Cursiva', action: 'italic', shortcut: 'Ctrl+I' },
        { label: 'Subrayado', action: 'underline', shortcut: 'Ctrl+U' },
        { type: 'separator' },
        { label: 'Limpiar formato', action: 'clear-format' }
      ]
    }
  ];

  handleEditorAction(item: ContextMenuItem) {
    const selection = window.getSelection();
    
    switch(item.action) {
      case 'cut':
        document.execCommand('cut');
        break;
      case 'copy':
        document.execCommand('copy');
        break;
      case 'paste':
        document.execCommand('paste');
        break;
      case 'bold':
        document.execCommand('bold');
        break;
      // ... más comandos de formato
    }
  }
}
```

### Menú Contextual con Prevención de Default

```typescript
@HostListener('contextmenu', ['$event'])
onContextMenu(event: MouseEvent) {
  event.preventDefault(); // Prevenir menú del navegador
  // El componente nyContextMenu ya maneja esto automáticamente
}
```

## 🎨 Personalización CSS

```scss
// Personalizar colores
nui-context-menu {
  --context-menu-bg: white;
  --context-menu-text: #333;
  --context-menu-hover-bg: #f0f0f0;
  --context-menu-separator: #e0e0e0;
}

// Personalizar tamaños
nui-context-menu {
  --context-menu-min-width: 200px;
  --context-menu-padding: 4px;
  --context-menu-item-padding: 8px 12px;
}

// Personalizar animaciones
nui-context-menu {
  --context-menu-animation-duration: 0.2s;
}

// Personalizar sombra
nui-context-menu {
  --context-menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## ♿ Accesibilidad

- ✅ Navegación por teclado (flechas, Enter, Escape)
- ✅ Roles ARIA (`menu`, `menuitem`)
- ✅ Submenús navegables
- ✅ Indicadores visuales para items deshabilitados
- ✅ Cierre con Escape
- ✅ Focus trap dentro del menú

## 📱 Responsive

- **Desktop**: Menú posicionado en el punto del click
- **Mobile**: Adaptado a pantallas táctiles, puede abrirse con long-press
- **Tablet**: Posicionamiento inteligente para evitar salirse de la pantalla

## 💡 Buenas Prácticas

1. **Usa iconos descriptivos** - Ayudan a identificar rápidamente las acciones
2. **Agrupa acciones relacionadas** - Usa separadores para organizar
3. **Limita el número de items** - Máximo 8-10 items principales
4. **Resalta acciones destructivas** - Usa `variant="danger"` para eliminar
5. **Muestra shortcuts cuando aplique** - Ayuda a que usuarios aprendan atajos
6. **Items dinámicos según contexto** - Solo muestra opciones relevantes
7. **Deshabilita en lugar de ocultar** - Cuando sea útil para el contexto
8. **Previene el menú del navegador** - Ya se hace automáticamente

## 🔗 Ver También

- [ActionMenu Component](./action-menu.md)
- [Dropdown Component](./dropdown.md)
- [Menu Component](./menu.md)

---

**Última actualización:** Octubre 2025
