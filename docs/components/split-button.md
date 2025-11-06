# Split Button Component

## Descripción

El componente **Split Button** combina un botón principal con acción directa y un menú dropdown con opciones adicionales relacionadas. Es ideal para escenarios donde hay una acción primaria principal pero se quieren ofrecer alternativas o variaciones de esa acción sin saturar la interfaz.

Este componente reutiliza internamente:
- **Button Component** para el botón principal
- **Action Menu Component** para el menú desplegable

## Características principales

- ✅ **Acción principal directa**: Click en el botón principal ejecuta la acción inmediatamente
- ✅ **Menú de opciones adicionales**: Dropdown con acciones relacionadas
- ✅ **Múltiples colores**: 8 variantes de color (primary, secondary, success, danger, warning, info, light, dark)
- ✅ **Múltiples tamaños**: 6 tamaños disponibles (xs, sm, md, lg, xl, xxl)
- ✅ **Variantes de estilo**: Solid, outline, ghost
- ✅ **Posición del dropdown**: Configurable a la izquierda o derecha del botón principal
- ✅ **Iconos personalizables**: En botón principal y dropdown
- ✅ **Accesibilidad**: Soporte para aria-label
- ✅ **Estado deshabilitado**: Para ambos botones simultáneamente
- ✅ **Standalone**: Componente standalone, fácil de importar

## Importación

```typescript
import { SplitButtonComponent } from '@shared/components/split-button/split-button.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SplitButtonComponent],
  // ...
})
export class ExampleComponent {}
```

## Uso básico

### HTML

```html
<nui-split-button
  label="Guardar"
  icon="ri-save-line"
  color="primary"
  [items]="menuItems"
  (onClick)="handleSave()"
  (onMenuItemClick)="handleMenuAction($event)"
></nui-split-button>
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { SplitButtonComponent } from '@shared/components/split-button/split-button.component';
import { ActionMenuItem } from '@shared/components/action-menu/models/action-menu.model';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SplitButtonComponent],
  template: `
    <nui-split-button
      label="Guardar"
      icon="ri-save-line"
      color="primary"
      [items]="saveOptions"
      (onClick)="save()"
      (onMenuItemClick)="handleMenuAction($event)"
    ></nui-split-button>
  `
})
export class ExampleComponent {
  saveOptions: ActionMenuItem[] = [
    {
      id: 'save-close',
      label: 'Guardar y cerrar',
      icon: 'ri-save-line',
      shortcut: 'Ctrl+S',
      onAction: () => this.saveAndClose()
    },
    {
      id: 'save-new',
      label: 'Guardar y crear nuevo',
      icon: 'ri-file-add-line',
      onAction: () => this.saveAndNew()
    },
    {
      id: 'save-as',
      label: 'Guardar como...',
      icon: 'ri-file-copy-line',
      shortcut: 'Ctrl+Shift+S',
      onAction: () => this.saveAs()
    }
  ];

  save(): void {
    console.log('Guardado normal');
  }

  saveAndClose(): void {
    console.log('Guardar y cerrar');
  }

  saveAndNew(): void {
    console.log('Guardar y crear nuevo');
  }

  saveAs(): void {
    console.log('Guardar como...');
  }

  handleMenuAction(item: ActionMenuItem): void {
    console.log('Acción del menú:', item.label);
  }
}
```

## API del componente

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `label` | `string` | `''` | Texto del botón principal |
| `ariaLabel` | `string` | `undefined` | Etiqueta aria-label para accesibilidad |
| `tooltip` | `string` | `undefined` | Tooltip que se muestra al hacer hover en el botón principal |
| `icon` | `string` | `undefined` | Icono del botón principal (clase de RemixIcon) |
| `iconPosition` | `'start' \| 'end'` | `'start'` | Posición del icono en el botón principal |
| `size` | `NUISize` | `'md'` | Tamaño del componente (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`) |
| `variant` | `NUIVariant` | `'solid'` | Variante visual (`solid`, `outline`, `ghost`) |
| `color` | `NUIColor` | `'primary'` | Color del componente (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`) |
| `disabled` | `boolean` | `false` | Deshabilita ambos botones |
| `loading` | `boolean` | `false` | Muestra spinner en el botón principal y lo deshabilita |
| `items` | `ActionMenuItem[]` | `[]` | Items del menú dropdown |
| `styleClass` | `string` | `undefined` | Clase CSS adicional |
| `dropdownLabel` | `string` | `undefined` | Texto opcional del botón dropdown |
| `dropdownPosition` | `'start' \| 'end'` | `'end'` | Posición del dropdown (izquierda o derecha) |
| `dropdownAriaLabel` | `string` | `undefined` | Aria-label del botón dropdown |
| `dropdownIcon` | `string` | `'ri-arrow-down-s-line'` | Icono del botón dropdown |
| `dropdownIconPosition` | `'start' \| 'end'` | `'end'` | Posición del icono del dropdown |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClick` | `EventEmitter<Event>` | Se emite al hacer click en el botón principal |
| `onMenuItemClick` | `EventEmitter<ActionMenuItem>` | Se emite al seleccionar un item del menú |
| `onMenuOpen` | `EventEmitter<void>` | Se emite cuando el menú se abre |
| `onMenuClose` | `EventEmitter<void>` | Se emite cuando el menú se cierra |

### Propiedades públicas

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `menuOpen` | `Signal<boolean>` | Estado del menú (abierto/cerrado) |

## Ejemplos de uso

### 1. Botón de guardado

```html
<nui-split-button
  label="Guardar"
  icon="ri-save-line"
  color="primary"
  [items]="saveOptions"
  (onClick)="save()"
></nui-split-button>
```

```typescript
saveOptions: ActionMenuItem[] = [
  {
    id: 'save-close',
    label: 'Guardar y cerrar',
    icon: 'ri-save-line',
    shortcut: 'Ctrl+S'
  },
  {
    id: 'save-new',
    label: 'Guardar y crear nuevo',
    icon: 'ri-file-add-line'
  },
  {
    id: 'save-as',
    label: 'Guardar como...',
    icon: 'ri-file-copy-line',
    shortcut: 'Ctrl+Shift+S'
  }
];
```

### 2. Botón de exportación

```html
<nui-split-button
  label="Exportar"
  icon="ri-download-line"
  color="info"
  [items]="exportOptions"
  (onClick)="exportPDF()"
></nui-split-button>
```

```typescript
exportOptions: ActionMenuItem[] = [
  {
    id: 'export-pdf',
    label: 'Exportar como PDF',
    icon: 'ri-file-pdf-line'
  },
  {
    id: 'export-excel',
    label: 'Exportar como Excel',
    icon: 'ri-file-excel-line'
  },
  {
    id: 'export-word',
    label: 'Exportar como Word',
    icon: 'ri-file-word-line'
  },
  {
    id: 'export-csv',
    label: 'Exportar como CSV',
    icon: 'ri-file-text-line'
  }
];
```

### 3. Diferentes tamaños

```html
<!-- Extra small -->
<nui-split-button
  label="XS"
  size="xs"
  [items]="items"
></nui-split-button>

<!-- Small -->
<nui-split-button
  label="SM"
  size="sm"
  [items]="items"
></nui-split-button>

<!-- Medium (default) -->
<nui-split-button
  label="MD"
  size="md"
  [items]="items"
></nui-split-button>

<!-- Large -->
<nui-split-button
  label="LG"
  size="lg"
  [items]="items"
></nui-split-button>

<!-- Extra large -->
<nui-split-button
  label="XL"
  size="xl"
  [items]="items"
></nui-split-button>

<!-- Extra extra large -->
<nui-split-button
  label="XXL"
  size="xxl"
  [items]="items"
></nui-split-button>
```

### 4. Diferentes variantes

```html
<!-- Solid (default) -->
<nui-split-button
  label="Solid"
  variant="solid"
  [items]="items"
></nui-split-button>

<!-- Outline -->
<nui-split-button
  label="Outline"
  variant="outline"
  [items]="items"
></nui-split-button>

<!-- Ghost -->
<nui-split-button
  label="Ghost"
  variant="ghost"
  [items]="items"
></nui-split-button>
```

### 5. Diferentes colores

```html
<nui-split-button label="Primary" color="primary" [items]="items"></nui-split-button>
<nui-split-button label="Secondary" color="secondary" [items]="items"></nui-split-button>
<nui-split-button label="Success" color="success" [items]="items"></nui-split-button>
<nui-split-button label="Danger" color="danger" [items]="items"></nui-split-button>
<nui-split-button label="Warning" color="warning" [items]="items"></nui-split-button>
<nui-split-button label="Info" color="info" [items]="items"></nui-split-button>
```

### 6. Dropdown a la izquierda

```html
<nui-split-button
  label="Acción"
  dropdownPosition="start"
  [items]="items"
></nui-split-button>
```

### 7. Con iconos personalizados

```html
<nui-split-button
  label="Compartir"
  icon="ri-share-line"
  iconPosition="start"
  dropdownIcon="ri-arrow-down-s-line"
  [items]="shareOptions"
></nui-split-button>
```

### 8. Estado deshabilitado

```html
<nui-split-button
  label="Guardado"
  [disabled]="true"
  [items]="items"
></nui-split-button>
```

### 9. Estado loading

```html
<nui-split-button
  label="Guardando..."
  [loading]="isLoading"
  [items]="saveOptions"
  (onClick)="save()"
></nui-split-button>
```

```typescript
isLoading = false;

async save(): Promise<void> {
  this.isLoading = true;
  try {
    await this.apiService.save();
  } finally {
    this.isLoading = false;
  }
}
```

### 10. Con tooltip

```html
<nui-split-button
  label="Guardar"
  tooltip="Guardar el documento actual"
  [items]="saveOptions"
></nui-split-button>
```

### 11. Con atajos de teclado

```typescript
menuItems: ActionMenuItem[] = [
  {
    id: '1',
    label: 'Nuevo',
    icon: 'ri-add-line',
    shortcut: 'Ctrl+N',
    onAction: () => this.new()
  },
  {
    id: '2',
    label: 'Abrir',
    icon: 'ri-folder-open-line',
    shortcut: 'Ctrl+O',
    onAction: () => this.open()
  }
];
```

### 10. Manejo de eventos

```typescript
handleMainButtonClick(): void {
  console.log('Click en botón principal');
  // Ejecutar acción principal
  this.executeMainAction();
}

handleMenuItemClick(item: ActionMenuItem): void {
  console.log('Click en item del menú:', item.label);
  // Ejecutar acción del item
  if (item.onAction) {
    item.onAction();
  }
}
```

```html
<nui-split-button
  label="Acción"
  [items]="items"
  (onClick)="handleMainButtonClick()"
  (onMenuItemClick)="handleMenuItemClick($event)"
></nui-split-button>
```

## Casos de uso comunes

### 1. Formularios de edición

```html
<nui-split-button
  label="Guardar cambios"
  icon="ri-save-line"
  color="primary"
  [items]="formActions"
  (onClick)="saveForm()"
></nui-split-button>
```

```typescript
formActions: ActionMenuItem[] = [
  { id: 'save-close', label: 'Guardar y cerrar', icon: 'ri-save-line' },
  { id: 'save-continue', label: 'Guardar y continuar', icon: 'ri-arrow-right-line' },
  { id: 'save-draft', label: 'Guardar borrador', icon: 'ri-draft-line' }
];
```

### 2. Acciones de tabla

```html
<nui-split-button
  label="Acciones"
  size="sm"
  color="secondary"
  variant="outline"
  [items]="rowActions"
  (onMenuItemClick)="handleRowAction($event)"
></nui-split-button>
```

```typescript
rowActions: ActionMenuItem[] = [
  { id: 'view', label: 'Ver detalles', icon: 'ri-eye-line' },
  { id: 'edit', label: 'Editar', icon: 'ri-edit-line' },
  { id: 'duplicate', label: 'Duplicar', icon: 'ri-file-copy-line' },
  { id: 'delete', label: 'Eliminar', icon: 'ri-delete-bin-line' }
];
```

### 3. Toolbar de documentos

```html
<div class="toolbar">
  <nui-split-button
    label="Nuevo documento"
    icon="ri-file-add-line"
    [items]="documentTypes"
    (onClick)="createDocument('blank')"
  ></nui-split-button>
</div>
```

```typescript
documentTypes: ActionMenuItem[] = [
  { id: 'blank', label: 'Documento en blanco', icon: 'ri-file-line' },
  { id: 'template', label: 'Desde plantilla', icon: 'ri-file-text-line' },
  { id: 'import', label: 'Importar archivo', icon: 'ri-file-upload-line' }
];
```

## Estructura del componente

El split button está compuesto por:

1. **Botón principal** (`nui-button`):
   - Ejecuta la acción principal al hacer click
   - Muestra el label e icono configurados
   - Comparte el mismo color, tamaño y variante que el dropdown

2. **Botón dropdown** (`nui-action-menu`):
   - Abre el menú de opciones adicionales
   - Muestra un icono de dropdown (por defecto `ri-arrow-down-s-line`)
   - Puede mostrar un label opcional
   - Mantiene los items del menú

## Personalización de estilos

### Clases CSS generadas

El componente genera las siguientes clases en el elemento host:

- `.nui-split-button`: Clase base
- `.nui-split-button-{size}`: Clase del tamaño (xs, sm, md, lg, xl, xxl)
- `.nui-split-button-{variant}`: Clase de variante (solid, outline, ghost)
- `.nui-split-button-{position}`: Clase de posición del dropdown (start, end)
- `.nui-split-button-disabled`: Aplicada cuando está deshabilitado
- `.nui-split-button-menu-open`: Aplicada cuando el menú está abierto

### Efecto hover conjunto

Cuando haces hover sobre el split button, ambos botones reaccionan visualmente:

```scss
.nui-split-button:hover:not(.nui-split-button-disabled) {
  .nui-split-button-main button:not(:disabled),
  .nui-split-button-dropdown button:not(:disabled) {
    filter: brightness(0.95);
  }
}
```

### Elementos internos

- `.nui-split-button-main`: Botón principal
- `.nui-split-button-dropdown`: Botón dropdown con menú

### Ejemplo de personalización

```scss
// Personalizar el split button en tu componente
.my-custom-split-button {
  ::ng-deep {
    .nui-split-button-main {
      // Personalizar botón principal
      min-width: 150px;
    }

    .nui-split-button-dropdown {
      // Personalizar dropdown
      button {
        min-width: 40px;
      }
    }
  }
}
```

## Accesibilidad

El componente implementa las siguientes características de accesibilidad:

- ✅ **Aria Labels**: Soporte para `ariaLabel` en ambos botones
- ✅ **Role Group**: El componente tiene `role="group"` para agrupar semánticamente los botones
- ✅ **Aria Label Descriptivo**: Label automático del grupo que describe la funcionalidad
- ✅ **Navegación por teclado**: Funciona con Tab, Enter y Space
- ✅ **Estados visuales**: Focus, hover y disabled claramente indicados
- ✅ **Roles semánticos**: Estructura HTML semántica
- ✅ **Contraste de colores**: Cumple con WCAG 2.1 AA
- ✅ **Tooltips**: Soporte para información adicional al hacer hover

### Ejemplo con aria-label

```html
<nui-split-button
  label="Guardar"
  ariaLabel="Guardar documento actual"
  tooltip="Haz clic para guardar o elige una opción"
  dropdownAriaLabel="Más opciones de guardado"
  [items]="saveOptions"
></nui-split-button>
```

El componente automáticamente genera un `aria-label` para el grupo basado en el label:
```html
<!-- Resultado en DOM -->
<nui-split-button 
  role="group" 
  aria-label="Guardar con opciones adicionales"
  class="nui-split-button..."
>
  <!-- ... -->
</nui-split-button>
```

## Modelo de datos

### ActionMenuItem

Los items del menú utilizan el modelo `ActionMenuItem`:

```typescript
interface ActionMenuItem {
  id: string;                    // Identificador único
  label: string;                 // Texto visible
  icon?: string;                 // Icono (clase RemixIcon)
  shortcut?: string;             // Atajo de teclado (ej: "Ctrl+S")
  disabled?: boolean;            // Item deshabilitado
  separator?: boolean;           // Mostrar separador después
  onAction?: () => void;         // Función callback
  children?: ActionMenuItem[];   // Submenú (opcional)
}
```

## Diferencias con otros componentes

| Característica | Split Button | Button | Action Menu |
|---------------|--------------|--------|-------------|
| Acción principal directa | ✅ | ✅ | ❌ |
| Menú de opciones | ✅ | ❌ | ✅ |
| Click inmediato | ✅ Botón principal | ✅ | ❌ Requiere abrir menú |
| Opciones adicionales | ✅ Dropdown | ❌ | ✅ |
| Complejidad visual | Media | Baja | Media |

**Usa Split Button cuando:**
- Hay una acción principal clara que se ejecuta frecuentemente
- Existen variaciones o alternativas de esa acción
- Quieres minimizar clicks para la acción principal
- Necesitas ofrecer opciones relacionadas sin saturar la UI

**Usa Button cuando:**
- Solo hay una acción sin alternativas
- La interfaz debe ser lo más simple posible

**Usa Action Menu cuando:**
- No hay una acción principal clara
- Todas las opciones tienen similar importancia
- El usuario siempre necesita elegir entre opciones

## Compatibilidad

- ✅ Angular 17+
- ✅ Standalone Components
- ✅ OnPush Change Detection
- ✅ Reactive Forms compatible
- ✅ SSR compatible

## Troubleshooting

### El menú no se abre

**Problema**: El menú dropdown no se despliega al hacer click.

**Solución**: Verifica que hayas importado el `ActionMenuModule` correctamente y que el array `items` tenga al menos un elemento.

### Los estilos no se aplican correctamente

**Problema**: Los botones no tienen los estilos esperados.

**Solución**: Asegúrate de que el componente use `ViewEncapsulation.None` y que los estilos globales estén importados en `styles.scss`.

### Los eventos no se disparan

**Problema**: Los eventos `onClick` o `onMenuItemClick` no se ejecutan.

**Solución**: Verifica que no estés usando el modificador `[disabled]="true"` y que los event handlers estén correctamente vinculados.

## Recursos adicionales

- [Button Component Documentation](./button.md)
- [Action Menu Component Documentation](./action-menu.md)
- [RemixIcon Icons](https://remixicon.com/)
- [Showcase Examples](/test/split-button)

## Changelog

### v1.1.0 (2025-10-28)
- ✨ **Loading state**: Soporte para estado de carga con spinner
- ✨ **Eventos mejorados**: Agregados `onMenuOpen` y `onMenuClose`
- ✨ **Validación de inputs**: Validación automática en `ngOnInit`
- ✨ **Tooltips**: Soporte para tooltips en el botón principal
- ✨ **Accesibilidad mejorada**: `role="group"` y aria-label descriptivo
- ✨ **Hover conjunto**: Efecto visual cuando haces hover sobre el componente
- ✨ **Separador visual**: Línea entre botones para mejor UX
- 🐛 **Tests actualizados**: Selectores y casos de prueba corregidos
- 🐛 **Signal sincronizado**: `menuOpen` ahora refleja el estado real del menú
- ♻️ **Código optimizado**: CommonModule eliminado, métodos no usados removidos

### v1.0.0 (2025-01-28)
- ✨ Versión inicial del componente
- ✨ Integración con Button y Action Menu
- ✨ Soporte para 8 colores y 6 tamaños
- ✨ Variantes solid, outline y ghost
- ✨ Posición configurable del dropdown
- ✨ Eventos onClick y onMenuItemClick
- ✨ Soporte completo de accesibilidad
