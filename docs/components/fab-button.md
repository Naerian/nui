# Fab Button Component

Componente de botón de acción flotante (Floating Action Button) que puede desplegar una lista de acciones secundarias. Similar al SpeedDial de PrimeNG, pero siguiendo el sistema de diseño NUI.

## 📦 Importación

```typescript
import { FabButtonComponent } from '@shared/components/fab-button/fab-button.component';
```

## 🎯 Selector

```html
<nui-fab-button></nui-fab-button>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `icon` | `string` | `'ri-add-line'` | Icono del botón principal (clase Remix Icon) |
| `tooltip` | `string` | - | Tooltip del botón principal |
| `ariaLabel` | `string` | - | Etiqueta ARIA para accesibilidad |
| `items` | `FabButtonItem[]` | `[]` | Items del menú desplegable |
| `size` | `NUISize` | `'md'` | Tamaño del botón |
| `variant` | `NUIVariant` | `'solid'` | Variante visual del botón |
| `color` | `NUIColor` | `'primary'` | Color del botón |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `direction` | `FabButtonDirection` | `'up'` | Dirección del despliegue de items |
| `animation` | `FabButtonAnimation` | `'scale'` | Tipo de animación para el despliegue |
| `showLabels` | `boolean` | `false` | Mostrar labels inline junto a los items |
| `styleClass` | `string` | - | Clase CSS adicional |
| `animationDuration` | `number` | `var(--fab-button-transition-duration)` | Duración de la animación en milisegundos (sobrescribe CSS) |
| `itemSpacing` | `number` | `var(--fab-button-item-spacing)` | Espaciado entre items en pixels (sobrescribe CSS) |
| `hideOnItemClick` | `boolean` | `true` | Cerrar el menú al hacer clic en un item |
| `hideOnClickOutside` | `boolean` | `true` | Cerrar el menú al hacer clic fuera |
| `hideOverlay` | `boolean` | `true` | Ocultar el overlay de fondo |
| `iconRotation` | `number` | `135` | Rotación del icono principal al abrir (en grados) |
| `buttonTemplate` | `TemplateRef<any>` | - | Template personalizado para el botón principal |
| `itemTemplate` | `TemplateRef<any>` | - | Template personalizado para los items |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClick` | `EventEmitter<Event>` | Se emite al hacer clic en el botón principal |
| `onItemClick` | `EventEmitter<FabButtonItem>` | Se emite al hacer clic en un item del menú |
| `onOpen` | `EventEmitter<void>` | Se emite cuando el menú se abre |
| `onClose` | `EventEmitter<void>` | Se emite cuando el menú se cierra |

### Tipos

```typescript
type FabButtonDirection = 'up' | 'down' | 'left' | 'right';
type FabButtonAnimation = 'scale' | 'fade' | 'slide';
type NUIVariant = 'solid' | 'outline' | 'ghost';
type NUIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
type NUISize = 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';

interface FabButtonItem {
  id?: string;
  icon?: string;
  label?: string;
  tooltip?: string;
  color?: NUIColor;
  size?: NUISize;
  variant?: NUIVariant;
  disabled?: boolean;
  data?: any;
  styleClass?: string;
  url?: string;
  target?: string;
  command?: (event?: any) => void;
}
```

## 💡 Ejemplos de Uso

### FAB Básico

```html
<!-- FAB simple -->
<nui-fab-button
  icon="ri-add-line"
  tooltip="Agregar">
</nui-fab-button>
```

### FAB con Items

```typescript
// En el componente
fabItems: FabButtonItem[] = [
  {
    id: 'new',
    icon: 'ri-file-add-line',
    label: 'Nuevo documento',
    tooltip: 'Crear un nuevo documento',
    command: () => this.createDocument()
  },
  {
    id: 'upload',
    icon: 'ri-upload-line',
    label: 'Subir archivo',
    tooltip: 'Subir un archivo existente',
    command: () => this.uploadFile()
  },
  {
    id: 'folder',
    icon: 'ri-folder-add-line',
    label: 'Nueva carpeta',
    tooltip: 'Crear una nueva carpeta',
    command: () => this.createFolder()
  }
];
```

```html
<nui-fab-button
  icon="ri-add-line"
  [items]="fabItems"
  color="primary"
  size="lg"
  direction="up"
  (onItemClick)="handleItemClick($event)">
</nui-fab-button>
```

### Direcciones de Despliegue

```html
<!-- Hacia arriba (por defecto) -->
<nui-fab-button
  [items]="fabItems"
  direction="up">
</nui-fab-button>

<!-- Hacia abajo -->
<nui-fab-button
  [items]="fabItems"
  direction="down">
</nui-fab-button>

<!-- Hacia la izquierda -->
<nui-fab-button
  [items]="fabItems"
  direction="left">
</nui-fab-button>

<!-- Hacia la derecha -->
<nui-fab-button
  [items]="fabItems"
  direction="right">
</nui-fab-button>
```

### Tipos de Animación

```html
<!-- Animación scale (por defecto) -->
<nui-fab-button
  [items]="fabItems"
  animation="scale">
</nui-fab-button>

<!-- Animación fade -->
<nui-fab-button
  [items]="fabItems"
  animation="fade">
</nui-fab-button>

<!-- Animación slide -->
<nui-fab-button
  [items]="fabItems"
  animation="slide">
</nui-fab-button>
```

### Con Labels Visibles

```html
<!-- Mostrar labels inline -->
<nui-fab-button
  [items]="fabItems"
  [showLabels]="true"
  direction="up">
</nui-fab-button>
```

### Variantes de Estilo

```html
<!-- Solid (por defecto) -->
<nui-fab-button
  [items]="fabItems"
  variant="solid">
</nui-fab-button>

<!-- Outline -->
<nui-fab-button
  [items]="fabItems"
  variant="outline">
</nui-fab-button>

<!-- Ghost -->
<nui-fab-button
  [items]="fabItems"
  variant="ghost">
</nui-fab-button>
```

### Colores

```html
<nui-fab-button [items]="fabItems" color="primary"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="secondary"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="success"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="info"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="warning"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="danger"></nui-fab-button>
<nui-fab-button [items]="fabItems" color="accent"></nui-fab-button>
```

### Tamaños

```html
<nui-fab-button [items]="fabItems" size="xs"></nui-fab-button>
<nui-fab-button [items]="fabItems" size="s"></nui-fab-button>
<nui-fab-button [items]="fabItems" size="sm"></nui-fab-button>
<nui-fab-button [items]="fabItems" size="md"></nui-fab-button>
<nui-fab-button [items]="fabItems" size="lg"></nui-fab-button>
<nui-fab-button [items]="fabItems" size="xl"></nui-fab-button>
```

### Items con Diferentes Propiedades

```typescript
// Items con diferentes colores, tamaños y variantes
mixedItems: FabButtonItem[] = [
  {
    icon: 'ri-save-line',
    label: 'Guardar',
    color: 'success',
    variant: 'solid'
  },
  {
    icon: 'ri-edit-line',
    label: 'Editar',
    color: 'info',
    variant: 'outline'
  },
  {
    icon: 'ri-delete-bin-line',
    label: 'Eliminar',
    color: 'danger',
    variant: 'ghost',
    disabled: false
  }
];
```

### Items con Colores Personalizados

Los items pueden tener colores completamente personalizados usando las propiedades `backgroundColor` y `textColor`:

```typescript
// Items con colores personalizados
customColorItems: FabButtonItem[] = [
  {
    icon: 'ri-save-line',
    label: 'Guardar',
    backgroundColor: '#10b981', // Verde personalizado
    textColor: '#ffffff'
  },
  {
    icon: 'ri-palette-line',
    label: 'Diseño',
    backgroundColor: '#8b5cf6', // Púrpura personalizado
    textColor: '#ffffff'
  },
  {
    icon: 'ri-star-line',
    label: 'Premium',
    backgroundColor: '#fbbf24', // Amarillo personalizado
    textColor: '#000000'
  }
];
```

**Notas sobre colores personalizados**:
- Los colores personalizados tienen prioridad sobre los colores predefinidos del sistema de diseño
- Los estados hover, focus y active se generan automáticamente aplicando un shade del 10% y 20% respectivamente
- El componente soporta colores en formato hexadecimal (`#RGB`, `#RRGGBB`) y `rgb(r, g, b)`
- El efecto de hover/active simula el comportamiento del sistema de diseño usando la función `shade()` de SCSS

### Items con Enlaces

```typescript
// Items como enlaces
linkItems: FabButtonItem[] = [
  {
    icon: 'ri-home-line',
    label: 'Inicio',
    url: '/home'
  },
  {
    icon: 'ri-settings-line',
    label: 'Configuración',
    url: '/settings'
  },
  {
    icon: 'ri-external-link-line',
    label: 'Ayuda',
    url: 'https://example.com/help',
    target: '_blank'
  }
];
```

### Con Templates Personalizados

```html
<nui-fab-button [items]="fabItems">
  <!-- Template personalizado para el botón principal -->
  <ng-template #buttonTemplate>
    <div class="custom-button-content">
      <i class="ri-menu-line"></i>
      <span class="pulse-animation"></span>
    </div>
  </ng-template>

  <!-- Template personalizado para los items -->
  <ng-template #itemTemplate let-item>
    <div class="custom-item-content">
      <i [class]="item.icon"></i>
      <span class="item-badge">{{ item.data?.count }}</span>
    </div>
  </ng-template>
</nui-fab-button>
```

### Configuración Avanzada

```html
<!-- FAB con configuración personalizada -->
<nui-fab-button
  icon="ri-more-line"
  [items]="fabItems"
  direction="up"
  animation="slide"
  [showLabels]="true"
  [animationDuration]="400"
  [itemSpacing]="20"
  [hideOnItemClick]="false"
  [hideOnClickOutside]="true"
  [hideOverlay]="false"
  [iconRotation]="180"
  (onClick)="handleMainClick($event)"
  (onItemClick)="handleItemClick($event)"
  (onOpen)="handleOpen()"
  (onClose)="handleClose()">
</nui-fab-button>
```

### Manejo de Eventos

```typescript
// En el componente
handleMainClick(event: Event): void {
  console.log('Botón principal clickeado', event);
}

handleItemClick(item: FabButtonItem): void {
  console.log('Item clickeado', item);
  
  // Realizar acción según el item
  switch (item.id) {
    case 'new':
      this.createNew();
      break;
    case 'edit':
      this.edit();
      break;
    case 'delete':
      this.delete();
      break;
  }
}

handleOpen(): void {
  console.log('Menú abierto');
}

handleClose(): void {
  console.log('Menú cerrado');
}
```

## 🎨 Configuración Global

Puedes configurar valores por defecto globalmente usando `provideNUIConfig`:

```typescript
// En app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      fabButton: {
        direction: 'up',
        animation: 'scale',
        showLabels: false,
        animationDuration: 300,
        itemSpacing: 16,
        hideOnItemClick: true,
        hideOnClickOutside: true,
        hideOverlay: false,
        iconRotation: 135
      }
    })
  ]
};
```

## 🎯 Casos de Uso Comunes

### FAB de Acciones Rápidas

```typescript
quickActions: FabButtonItem[] = [
  {
    icon: 'ri-phone-line',
    label: 'Llamar',
    color: 'success',
    command: () => this.makeCall()
  },
  {
    icon: 'ri-message-line',
    label: 'Mensaje',
    color: 'info',
    command: () => this.sendMessage()
  },
  {
    icon: 'ri-mail-line',
    label: 'Email',
    color: 'primary',
    command: () => this.sendEmail()
  }
];
```

### FAB de Compartir

```typescript
shareActions: FabButtonItem[] = [
  {
    icon: 'ri-facebook-fill',
    label: 'Facebook',
    color: 'primary',
    command: () => this.shareOnFacebook()
  },
  {
    icon: 'ri-twitter-fill',
    label: 'Twitter',
    color: 'info',
    command: () => this.shareOnTwitter()
  },
  {
    icon: 'ri-linkedin-fill',
    label: 'LinkedIn',
    color: 'primary',
    command: () => this.shareOnLinkedIn()
  },
  {
    icon: 'ri-whatsapp-fill',
    label: 'WhatsApp',
    color: 'success',
    command: () => this.shareOnWhatsApp()
  }
];
```

### FAB de Navegación

```typescript
navActions: FabButtonItem[] = [
  {
    icon: 'ri-home-line',
    label: 'Inicio',
    url: '/home'
  },
  {
    icon: 'ri-dashboard-line',
    label: 'Dashboard',
    url: '/dashboard'
  },
  {
    icon: 'ri-settings-line',
    label: 'Configuración',
    url: '/settings'
  },
  {
    icon: 'ri-user-line',
    label: 'Perfil',
    url: '/profile'
  }
];
```

## 🔧 Personalización

### Estilos Personalizados

```scss
// Personalizar variables CSS
:root {
  --fab-button-item-spacing: 20px;
  --fab-button-transition-duration: 400ms;
}

// Estilos personalizados para el componente
.my-custom-fab {
  .nui-fab-button-main {
    // Personalizar el botón principal
    border-radius: 12px;
  }

  .nui-fab-button-item-button {
    // Personalizar los botones de items
    border-radius: 8px;
  }
}
```

## ♿ Accesibilidad

El componente incluye soporte completo de accesibilidad:

- Atributos `aria-label`, `aria-expanded` y `aria-haspopup`
- Soporte de navegación por teclado
- Focus visible
- Estados deshabilitados
- Tooltips descriptivos

## 📱 Responsive

El componente es responsive y se adapta a diferentes tamaños de pantalla. Se recomienda posicionarlo en esquinas de la pantalla para una mejor experiencia de usuario:

```css
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}
```

## 🎨 Temas

El componente respeta automáticamente el tema activo de la aplicación (claro/oscuro) y ajusta sus colores según corresponda.

## 📌 Notas

- Los items heredan las propiedades (color, tamaño, variante) del botón principal a menos que se especifiquen individualmente
- Los colores personalizados (`backgroundColor` y `textColor`) tienen prioridad sobre los colores predefinidos del sistema de diseño y generan automáticamente estados hover/focus/active con shade del 10% y 20%
- El overlay de fondo ayuda a indicar que el menú está abierto y facilita cerrarlo haciendo clic fuera
- La animación y dirección se pueden combinar para crear diferentes efectos visuales
- Los items pueden ser tanto botones como enlaces (`<a>` tags)
