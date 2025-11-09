# ActionMenu Component

Componente de menú desplegable con soporte para items estáticos, dinámicos y submenús.

## 📦 Importación

```typescript
import { ActionMenuModule } from '@shared/components/action-menu';
```

## 🎯 Selector

```html
<nui-action-menu></nui-action-menu>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `items` | `ActionMenuItem[]` | `[]` | Lista de items del menú dinámicos |
| `type` | `'static' \| 'dynamic'` | `'dynamic'` | Tipo de renderizado del menú. Si es `static`, se renderiza en el DOM. Si es `dynamic`, se usa overlay |
| `color` | `NUIColor` | `'primary'` | Color del botón del menú |
| `size` | `NUISize` | `'md'` | Tamaño del botón (`'xs' \| 's' \| 'md' \| 'lg' \| 'xl'`) |
| `width` | `ButtonWidth` | `'auto'` | Ancho del botón (`'auto' \| 'fit' \| 'full'`) |
| `variant` | `NUIVariant` | `'ghost'` | Variante del botón (`'solid' \| 'outline' \| 'ghost'`) |
| `disabled` | `boolean` | `false` | Desactiva el menú |
| `title` | `string` | `''` | Tooltip del botón |
| `icon` | `string` | - | Icono del botón (clase Remix Icon) |
| `iconSubmenu` | `string` | `'ri-arrow-right-s-line'` | Icono para indicar submenús |
| `label` | `string` | - | Texto del botón |

### Templates

| Nombre | Contexto | Descripción |
|--------|----------|-------------|
| `#item` | `{ $implicit: ActionMenuItem }` | Template personalizado para renderizar cada item del menú. Permite personalizar completamente el contenido de cada item |

### Directivas

| Directiva | Descripción |
|-----------|-------------|
| `menu-header` o `nuiMenuHeader` | Marca contenido que debe aparecer en el header del menú. Más simple que usar `ng-template`, permite agregar componentes directamente |
| `menu-footer` o `nuiMenuFooter` | Marca contenido que debe aparecer en el footer del menú. Más simple que usar `ng-template`, permite agregar componentes directamente |

**Nota:** Las directivas `menu-header` y `menu-footer` son la forma recomendada de agregar contenido al inicio y final del menú. Los templates `#start` y `#end` están deprecados pero se mantienen por compatibilidad.

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onItemAction` | `EventEmitter<ActionMenuItem>` | Se emite al hacer clic en un item del menú |
| `menuClose` | `EventEmitter<void>` | Se emite cuando el menú se cierra |

### Tipos

```typescript
interface ActionMenuItem {
  label?: string;
  subtitle?: string;
  icon?: string;
  action?: string;
  disabled?: boolean;
  selected?: boolean;
  separator?: boolean;
  children?: ActionMenuItem[];
  shortcut?: string;
  templateRef?: TemplateRef<any>;
  badge?: string;
  data?: any;
  onAction?: () => void;
}

type ActionMenuType = 'static' | 'dynamic';
```

## 💡 Ejemplos de Uso

### Uso Básico con Items Dinámicos

```html
<nui-action-menu 
  icon="ri-more-line" 
  [items]="menuItems"
  (onItemAction)="handleAction($event)">
</nui-action-menu>
```

```typescript
import { Component } from '@angular/core';
import { ActionMenuItem } from '@shared/components/action-menu';

@Component({
  selector: 'app-example',
  template: `...`
})
export class ExampleComponent {
  menuItems: ActionMenuItem[] = [
    { 
      label: 'Editar', 
      icon: 'ri-edit-line', 
      action: 'edit' 
    },
    { 
      label: 'Eliminar', 
      icon: 'ri-delete-bin-line', 
      action: 'delete',
      variant: 'danger' 
    },
    { 
      type: 'separator' 
    },
    { 
      label: 'Exportar', 
      icon: 'ri-download-line', 
      action: 'export' 
    }
  ];

  handleAction(item: ActionMenuItem) {
    console.log('Acción:', item.action);
    // Implementar lógica según item.action
  }
}
```

### Con Items Estáticos (Proyección de Contenido)

```html
<nui-action-menu icon="ri-settings-line" type="static">
  <nui-action-menu-item icon="ri-user-line">
    Perfil
  </nui-action-menu-item>
  
  <nui-action-menu-item icon="ri-settings-line">
    Configuración
  </nui-action-menu-item>
  
  <nui-action-menu-separator></nui-action-menu-separator>
  
  <nui-action-menu-item 
    icon="ri-logout-line" 
    variant="danger">
    Salir
  </nui-action-menu-item>
</nui-action-menu>
```

### Con Submenús

```html
<nui-action-menu [items]="menuWithSubmenu"></nui-action-menu>
```

```typescript
menuWithSubmenu: ActionMenuItem[] = [
  { 
    label: 'Nuevo', 
    icon: 'ri-add-line', 
    action: 'new' 
  },
  { 
    label: 'Exportar', 
    icon: 'ri-download-line',
    submenu: [
      { label: 'PDF', action: 'export-pdf', icon: 'ri-file-pdf-line' },
      { label: 'Excel', action: 'export-excel', icon: 'ri-file-excel-line' },
      { label: 'CSV', action: 'export-csv', icon: 'ri-file-text-line' }
    ]
  },
  {
    type: 'separator'
  },
  {
    label: 'Compartir',
    icon: 'ri-share-line',
    submenu: [
      { label: 'Email', action: 'share-email' },
      { label: 'Link', action: 'share-link' },
      { label: 'Redes Sociales', action: 'share-social' }
    ]
  }
];
```

### Personalización del Botón

```html
<!-- Botón con texto y color personalizado -->
<nui-action-menu 
  label="Acciones"
  icon="ri-more-2-line"
  [color]="'primary'"
  [size]="'lg'"
  variant="solid"
  [items]="menuItems">
</nui-action-menu>

<!-- Botón outline -->
<nui-action-menu 
  icon="ri-settings-line"
  variant="outline"
  [color]="'secondary'"
  [items]="settingsMenu">
</nui-action-menu>

<!-- Botón de ancho completo -->
<nui-action-menu 
  label="Opciones"
  width="full"
  [items]="options">
</nui-action-menu>
```

### Items con Callbacks Directos

```typescript
menuItems: ActionMenuItem[] = [
  { 
    label: 'Copiar', 
    icon: 'ri-file-copy-line',
    action: () => this.copyToClipboard()
  },
  { 
    label: 'Pegar', 
    icon: 'ri-clipboard-line',
    action: () => this.pasteFromClipboard()
  }
];

private copyToClipboard() {
  // Lógica de copiar
  console.log('Copiado al portapapeles');
}

private pasteFromClipboard() {
  // Lógica de pegar
  console.log('Pegado desde portapapeles');
}
```

### Items Deshabilitados

```typescript
menuItems: ActionMenuItem[] = [
  { 
    label: 'Guardar', 
    icon: 'ri-save-line', 
    action: 'save'
  },
  { 
    label: 'Imprimir', 
    icon: 'ri-printer-line', 
    action: 'print',
    disabled: true  // Item deshabilitado
  },
  { 
    label: 'Compartir', 
    icon: 'ri-share-line', 
    action: 'share'
  }
];
```

### Menú Contextual en Tabla

```html
<table>
  <tr *ngFor="let user of users">
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>
      <nui-action-menu 
        icon="ri-more-line"
        [items]="getUserActions(user)"
        (onItemAction)="handleUserAction($event, user)">
      </nui-action-menu>
    </td>
  </tr>
</table>
```

```typescript
getUserActions(user: User): ActionMenuItem[] {
  return [
    { label: 'Ver perfil', icon: 'ri-eye-line', action: 'view' },
    { label: 'Editar', icon: 'ri-edit-line', action: 'edit' },
    { type: 'separator' },
    { 
      label: 'Eliminar', 
      icon: 'ri-delete-bin-line', 
      action: 'delete',
      variant: 'danger',
      disabled: user.id === this.currentUserId // No puede eliminarse a sí mismo
    }
  ];
}

handleUserAction(item: ActionMenuItem, user: User) {
  switch(item.action) {
    case 'view':
      this.viewUserProfile(user);
      break;
    case 'edit':
      this.editUser(user);
      break;
    case 'delete':
      this.deleteUser(user);
      break;
  }
}
```

### Diferentes Tamaños

```html
<nui-action-menu size="xs" [items]="menu">Extra Small</nui-action-menu>
<nui-action-menu size="s" [items]="menu">Small</nui-action-menu>
<nui-action-menu size="md" [items]="menu">Medium</nui-action-menu>
<nui-action-menu size="lg" [items]="menu">Large</nui-action-menu>
<nui-action-menu size="xl" [items]="menu">Extra Large</nui-action-menu>
```

### Template Personalizado

Puedes personalizar completamente cómo se renderiza el menú usando templates y directivas. A diferencia de PrimeNG, nuestra API usa directivas simples para header y footer, evitando `ng-template` innecesarios:

```html
<nui-action-menu 
  icon="ri-user-line" 
  label="Mi Cuenta"
  [items]="menuItems"
  (onItemAction)="handleAction($event)">
  
  <!-- Header con directiva (sin ng-template) -->
  <div menu-header class="user-header">
    <img src="avatar.jpg" class="avatar" />
    <div>
      <span class="name">John Doe</span>
      <span class="email">john@example.com</span>
    </div>
  </div>
  
  <!-- Template personalizado para cada item -->
  <ng-template #item let-item>
    <div class="custom-item">
      <i [class]="item.icon"></i>
      <div class="item-content">
        <span class="label">{{ item.label }}</span>
        @if (item.subtitle) {
          <span class="subtitle">{{ item.subtitle }}</span>
        }
      </div>
      @if (item.badge) {
        <span class="badge">{{ item.badge }}</span>
      }
    </div>
  </ng-template>
  
  <!-- Footer con directiva (sin ng-template) -->
  <button menu-footer class="logout-button" (click)="logout()">
    <i class="ri-logout-box-line"></i>
    <span>Cerrar Sesión</span>
  </button>
</nui-action-menu>
```

```typescript
menuItems: ActionMenuItem[] = [
  { 
    label: 'Messages', 
    subtitle: 'New messages received',
    icon: 'ri-message-line', 
    action: 'messages',
    badge: '3'
  },
  { 
    label: 'Tasks', 
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
```

**Ventajas sobre PrimeNG:**
- **Más simple:** Usa `menu-header` y `menu-footer` directamente en el HTML, sin necesidad de envolver en `ng-template`
- **Más claro:** Los nombres `menu-header` y `menu-footer` son más descriptivos que `#start` y `#end`
- **Más flexible:** Puedes usar componentes Angular directamente sin wrappers adicionales
- **Type-safe:** TypeScript completo en toda la API

**Características:**
- El template `#item` recibe el item completo como contexto a través de `let-item`
- Las directivas `menu-header` y `menu-footer` se renderizan antes y después de los items
- Puedes acceder a todas las propiedades del item incluyendo `badge`, `data`, y cualquier propiedad personalizada
- Todos los templates son completamente opcionales - si no se proporcionan, se usa el renderizado por defecto
- Compatibilidad con `#start` y `#end` mantenida (deprecados)

## ♿ Accesibilidad

- ✅ Navegación completa por teclado (Enter, Space, Arrow keys, Escape)
- ✅ Roles ARIA apropiados (`menu`, `menuitem`)
- ✅ Soporte para lectores de pantalla
- ✅ Focus visible y trappable dentro del menú
- ✅ Cierre con tecla Escape

## 📱 Responsive

El componente detecta automáticamente dispositivos móviles y ajusta su comportamiento:
- **Desktop**: Overlay posicionado junto al botón
- **Mobile**: Menú adaptado para pantallas pequeñas

## 🎨 Personalización

### Colores Disponibles

- `primary` (por defecto)
- `secondary`
- `success`
- `info`
- `warning`
- `danger`
- `accent`

### Tamaños Disponibles

- `xs` - Extra pequeño
- `s` - Pequeño
- `md` - Mediano (por defecto)
- `lg` - Grande
- `xl` - Extra grande

## 💡 Buenas Prácticas

1. **Usa iconos descriptivos** - Ayudan a identificar rápidamente las acciones
2. **Agrupa acciones relacionadas** - Usa separadores para organizar el menú
3. **Limita el número de items** - Evita menús muy largos (máximo 10-12 items)
4. **Usa variantes de color** - Resalta acciones destructivas con `variant="danger"`
5. **Deshabilita en lugar de ocultar** - Muestra items deshabilitados cuando sea útil para el contexto
6. **Maneja el evento menuClose** - Útil para analytics o limpiar estado

## 🔗 Ver También

- [Button Component](./button.md)
- [ContextMenu Component](./context-menu.md)
- [Dropdown Component](./dropdown.md)

---

**Última actualización:** Octubre 2025
