# Button Component

Componente de botón altamente configurable con soporte para iconos, estados de carga y múltiples variantes.

## 📦 Importación

```typescript
import { ButtonModule } from '@shared/components/button';
```

## 🎯 Selector

```html
<nui-button></nui-button>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `label` | `string` | - | Texto del botón |
| `icon` | `string` | - | Icono del botón (clase Remix Icon) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posición del icono respecto al texto |
| `color` | `NUIColor` | `'primary'` | Color del botón |
| `size` | `NUISize` | `'md'` | Tamaño del botón (`'xs' \| 's' \| 'md' \| 'lg' \| 'xl'`) |
| `variant` | `NUIVariant` | `'solid'` | Variante visual del botón (`'solid' \| 'outline' \| 'ghost'`) |
| `shape` | `NUIShape` | `'rounded'` | Forma del botón (`'rounded' \| 'square' \| 'pill'`) |
| `width` | `ButtonWidth` | `'auto'` | Ancho del botón (`'auto' \| 'fit' \| 'full'`) |
| `raised` | `boolean` | `false` | Elevación con sombra para el botón |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML del botón |
| `disabled` | `boolean` | `false` | Deshabilitar el botón |
| `loading` | `boolean` | `false` | Mostrar estado de carga |
| `iconOnly` | `boolean` | `false` | Mostrar solo icono (sin texto) |
| `title` | `string` | - | Tooltip del botón |
| `ariaLabel` | `string` | - | Etiqueta ARIA para accesibilidad |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClick` | `EventEmitter<Event>` | Se emite al hacer clic en el botón |

### Tipos

```typescript
type NUIVariant = 'solid' | 'outline' | 'ghost';
type NUIShape = 'rounded' | 'pill' | 'square';
type ButtonWidth = 'auto' | 'fit' | 'full';
type NUIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
type NUISize = 'xs' | 's' | 'md' | 'lg' | 'xl';
```

## 💡 Ejemplos de Uso

### Botón Básico

```html
<!-- Botón simple -->
<nui-button label="Click me"></nui-button>

<!-- Botón con icono -->
<nui-button 
  label="Guardar" 
  icon="ri-save-line">
</nui-button>

<!-- Icono a la derecha -->
<nui-button 
  label="Siguiente" 
  icon="ri-arrow-right-line"
  iconPosition="right">
</nui-button>
```

### Variantes de Estilo

```html
<!-- Solid (por defecto) -->
<nui-button label="Solid" variant="solid"></nui-button>

<!-- Outline -->
<nui-button label="Outline" variant="outline"></nui-button>

<!-- Ghost -->
<nui-button label="Ghost" variant="ghost"></nui-button>
```

### Colores

```html
<nui-button label="Primary" color="primary"></nui-button>
<nui-button label="Secondary" color="secondary"></nui-button>
<nui-button label="Success" color="success"></nui-button>
<nui-button label="Info" color="info"></nui-button>
<nui-button label="Warning" color="warning"></nui-button>
<nui-button label="Danger" color="danger"></nui-button>
<nui-button label="Accent" color="accent"></nui-button>
```

### Tamaños

```html
<nui-button label="Extra Small" size="xs"></nui-button>
<nui-button label="Small" size="s"></nui-button>
<nui-button label="Medium" size="md"></nui-button>
<nui-button label="Large" size="lg"></nui-button>
<nui-button label="Extra Large" size="xl"></nui-button>
```

### Ancho del Botón

```html
<!-- Auto: ancho según contenido (default) -->
<nui-button label="Auto Width" width="auto"></nui-button>

<!-- Fit: ancho mínimo del contenido -->
<nui-button label="Fit" width="fit"></nui-button>

<!-- Full: ancho completo del contenedor -->
<nui-button label="Full Width" width="full"></nui-button>
```

### Estado de Carga

```html
<nui-button 
  label="Guardar" 
  icon="ri-save-line"
  [loading]="isLoading"
  (onClick)="save()">
</nui-button>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `...`
})
export class ExampleComponent {
  isLoading = false;

  async save() {
    this.isLoading = true;
    try {
      await this.apiService.save();
      console.log('Guardado exitoso');
    } finally {
      this.isLoading = false;
    }
  }
}
```

### Botón Solo Icono

```html
<!-- Botón circular con solo icono -->
<nui-button 
  icon="ri-add-line" 
  [iconOnly]="true"
  title="Agregar">
</nui-button>

<!-- Icono con variantes -->
<nui-button 
  icon="ri-settings-line" 
  [iconOnly]="true"
  variant="outline">
</nui-button>

<nui-button 
  icon="ri-delete-bin-line" 
  [iconOnly]="true"
  color="danger">
</nui-button>
```

### Botón Deshabilitado

```html
<nui-button 
  label="Disabled" 
  [disabled]="true">
</nui-button>

<!-- Deshabilitado condicionalmente -->
<nui-button 
  label="Submit" 
  type="submit"
  [disabled]="!form.valid">
</nui-button>
```

### Tipos de Botón (Submit, Reset)

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  
  <div class="form-actions">
    <nui-button 
      label="Enviar" 
      type="submit"
      [disabled]="myForm.invalid">
    </nui-button>
    
    <nui-button 
      label="Limpiar" 
      type="reset"
      variant="outline">
    </nui-button>
  </div>
</form>
```

### Grupos de Botones

```html
<div class="button-group">
  <nui-button 
    label="Cancelar" 
    variant="outline"
    (onClick)="cancel()">
  </nui-button>
  
  <nui-button 
    label="Guardar" 
    icon="ri-save-line"
    [loading]="isSaving"
    (onClick)="save()">
  </nui-button>
</div>
```

```scss
.button-group {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
```

### Botón con Confirmación

```html
<nui-button 
  label="Eliminar" 
  icon="ri-delete-bin-line"
  color="danger"
  (onClick)="confirmDelete()">
</nui-button>
```

```typescript
async confirmDelete() {
  const confirmed = await this.confirmationService.confirm({
    title: '¿Eliminar elemento?',
    message: 'Esta acción no se puede deshacer',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar'
  });
  
  if (confirmed) {
    this.delete();
  }
}
```

### Botones en Toolbar

```html
<div class="toolbar">
  <nui-button 
    icon="ri-add-line" 
    label="Nuevo"
    color="primary">
  </nui-button>
  
  <nui-button 
    icon="ri-refresh-line" 
    [iconOnly]="true"
    variant="ghost"
    title="Refrescar">
  </nui-button>
  
  <nui-button 
    icon="ri-filter-line" 
    [iconOnly]="true"
    variant="ghost"
    title="Filtrar">
  </nui-button>
  
  <nui-button 
    icon="ri-download-line" 
    label="Exportar"
    variant="outline">
  </nui-button>
</div>
```

### Botón de Acción Flotante (FAB)

```html
<nui-button 
  icon="ri-add-line" 
  [iconOnly]="true"
  size="lg"
  color="primary"
  class="fab">
</nui-button>
```

```scss
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
}
```

### Botón con Badge

```html
<div style="position: relative; display: inline-block;">
  <nui-button 
    icon="ri-notification-line" 
    [iconOnly]="true"
    variant="ghost">
  </nui-button>
  
  <span class="badge">5</span>
</div>
```

```scss
.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-danger);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
}
```

### Botón con Dropdown

```html
<div class="button-with-dropdown">
  <nui-button 
    label="Acciones" 
    icon="ri-more-line"
    iconPosition="right">
  </nui-button>
  
  <!-- Usar con ActionMenu o ContextMenu -->
</div>
```

### Botones Responsivos

```html
<!-- Ocultar texto en móvil, mostrar solo icono -->
<nui-button 
  label="Guardar" 
  icon="ri-save-line"
  [iconOnly]="isMobile"
  title="Guardar">
</nui-button>
```

```typescript
isMobile = window.innerWidth < 768;

@HostListener('window:resize')
onResize() {
  this.isMobile = window.innerWidth < 768;
}
```

### Combinación de Variantes y Colores

```html
<!-- Danger Outline -->
<nui-button 
  label="Eliminar" 
  color="danger" 
  variant="outline">
</nui-button>

<!-- Success Ghost -->
<nui-button 
  label="Aprobado" 
  icon="ri-check-line"
  color="success" 
  variant="ghost">
</nui-button>

<!-- Secondary Solid -->
<nui-button 
  label="Cancelar" 
  color="secondary" 
  variant="solid">
</nui-button>
```

### Botón con Event Handler

```html
<nui-button 
  label="Click me" 
  (onClick)="handleClick($event)">
</nui-button>
```

```typescript
handleClick(event: Event) {
  console.log('Button clicked', event);
  
  // Prevenir propagación si es necesario
  event.stopPropagation();
  
  // Tu lógica aquí
  this.doSomething();
}
```

## 🎨 Personalización CSS

```scss
// Personalizar colores
nui-button {
  --button-primary-bg: #0066cc;
  --button-primary-hover: #0052a3;
  --button-text-color: white;
}

// Personalizar border radius
nui-button {
  --button-border-radius: 8px;
}

// Personalizar padding
nui-button {
  --button-padding-x: 1.5rem;
  --button-padding-y: 0.75rem;
}

// Personalizar transiciones
nui-button {
  --button-transition: all 0.2s ease;
}
```

## ♿ Accesibilidad

- ✅ Roles ARIA apropiados
- ✅ Soporte completo para teclado (Enter, Space)
- ✅ Estados visuales claros (hover, focus, disabled)
- ✅ Atributo `aria-label` para botones solo icono
- ✅ Estado `aria-busy` durante loading
- ✅ Atributo `disabled` previene interacción

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla:
- **Desktop**: Tamaño completo con todos los elementos
- **Tablet**: Padding reducido
- **Mobile**: Opción de mostrar solo icono para ahorrar espacio

## 💡 Buenas Prácticas

1. **Usa etiquetas descriptivas** - Texto claro que indique la acción
2. **Iconos consistentes** - Usa la misma librería de iconos (Remix Icons)
3. **Colores semánticos** - `danger` para eliminar, `success` para aprobar
4. **Loading states** - Siempre muestra feedback durante operaciones asíncronas
5. **Disabled vs Hidden** - Deshabilita en lugar de ocultar cuando sea apropiado
6. **Accesibilidad** - Incluye `ariaLabel` o `title` en botones solo icono
7. **Tamaño apropiado** - No uses `xl` para acciones secundarias
8. **Width consistente** - Usa `full` en formularios, `auto` en toolbars

## 🔗 Ver También

- [ActionMenu Component](./action-menu.md)
- [IconButton Component](./icon-button.md)
- [Loading Spinner Component](./loading-spinner.md)

---

**Última actualización:** Octubre 2025
