# Chip Components

Sistema modular de componentes para gestión de chips con tres componentes especializados: `ChipComponent`, `ChipListComponent` y `ChipSelectorComponent`.

## 📦 Componentes Disponibles

| Componente | Propósito | Uso Principal |
|------------|-----------|---------------|
| **nui-chip** | Chip individual base | Elemento básico reutilizable, tags simples |
| **nui-chip-list** | Lista de chips con gestión | Tags dinámicos, elementos removibles, drag & drop |
| **nui-chip-selector** | Selección con opciones predefinidas | Filtros, categorías, multiselección con búsqueda |

---

## 🔹 nui-chip

Componente base para mostrar chips individuales. Es el elemento fundamental que usan los otros componentes.

### Importación

```typescript
import { ChipComponent } from '@shared/components/chip';
```

### Selector

```html
<nui-chip></nui-chip>
```

### API

#### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `color` | `NUIColor` | `'primary'` | Color del chip |
| `size` | `NUISize` | `'md'` | Tamaño del chip |
| `variant` | `NUIVariant` | `'solid'` | Variante visual |
| `icon` | `string` | `undefined` | Icono RemixIcon (ej: 'ri-star-line') |
| `image` | `string` | `undefined` | URL de imagen a mostrar |
| `imageAlign` | `'left' \| 'right'` | `'left'` | Posición de imagen/icono |
| `selected` | `boolean` | `false` | Estado seleccionado |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `clickable` | `boolean` | `false` | Si es clickeable |
| `removable` | `boolean` | `false` | Si muestra botón de eliminar |
| `removeIcon` | `string` | `'ri-close-line'` | Icono del botón eliminar |
| `value` | `any` | `undefined` | Valor asociado al chip |

#### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `chipClick` | `EventEmitter<any>` | Emite el valor cuando se hace click |
| `onRemove` | `EventEmitter<any>` | Emite el valor cuando se elimina |

### Ejemplos

#### 1. Chip básico

```html
<nui-chip>Simple</nui-chip>
<nui-chip color="primary">Primary</nui-chip>
<nui-chip color="success" icon="ri-check-line">Completado</nui-chip>
```

#### 2. Chip con imagen

```html
<nui-chip 
  image="https://i.pravatar.cc/32?img=1"
  imageAlign="left">
  Usuario
</nui-chip>
```

#### 3. Chip interactivo

```html
<nui-chip 
  [clickable]="true"
  [selected]="isSelected"
  (chipClick)="onChipClick($event)">
  Clickeable
</nui-chip>
```

#### 4. Chip removible

```html
<nui-chip 
  [removable]="true"
  [value]="chipValue"
  (onRemove)="onRemove($event)">
  Removible
</nui-chip>
```

---

## 🎯 nui-chip-selector

Componente para seleccionar una o múltiples opciones mediante chips interactivos.

### Importación

```typescript
import { ChipSelectorComponent } from '@shared/components/chip';
```

### Selector

```html
<nui-chip-selector></nui-chip-selector>
```

### API

#### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `options` | `ChipOption[] \| any[]` | `[]` | **Requerido**. Opciones disponibles |
| `mode` | `'single' \| 'multiple'` | `'multiple'` | Modo de selección |
| `labelBy` | `string` | `'label'` | Propiedad para el label |
| `valueBy` | `string` | `'value'` | Propiedad para el value |
| `iconBy` | `string` | `'icon'` | Propiedad para el icon |
| `imageBy` | `string` | `'image'` | Propiedad para la imagen |
| `disabledBy` | `string` | `'disabled'` | Propiedad para disabled |
| `size` | `NUISize` | `'md'` | Tamaño del chip |
| `color` | `NUIColor` | `'primary'` | Color del chip |
| `variant` | `NUIVariant` | `'solid'` | Variante visual |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientación |
| `imageAlign` | `'left' \| 'right'` | `'left'` | Posición imagen/icono |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `searchable` | `boolean` | `false` | Muestra input de búsqueda |
| `searchPlaceholder` | `string` | `''` | Placeholder del input de búsqueda |
| `searchLabel` | `string` | `''` | Label del input de búsqueda |
| `searchIcon` | `string` | `'ri-search-line'` | Icono del botón de búsqueda |
| `showCounter` | `boolean` | `false` | Muestra contador X/Y |
| `maxItems` | `number` | `undefined` | Máximo de items seleccionables |
| `value` | `any \| any[]` | `null` | Valor(es) seleccionado(s) |

#### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `valueChange` | `EventEmitter<any>` | Emite cuando cambia la selección |
| `chipClick` | `EventEmitter<any>` | Emite cuando se hace click en un chip |
| `imageError` | `EventEmitter<{event: Event; item: any}>` | Emite al fallar carga de imagen |

### Ejemplos

#### 1. Selección múltiple básica

```html
<nui-chip-selector
  [options]="technologies"
  
  [(value)]="selectedTech"
/>
```

```typescript
technologies: ChipOption[] = [
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
];
selectedTech: string[] = [];
```

#### 2. Selección única con iconos

```html
<nui-chip-selector
  [options]="categories"
  mode="single"
  color="primary"
  [(value)]="category"
/>
```

```typescript
categories: ChipOption[] = [
  { label: 'Frontend', value: 'frontend', icon: 'ri-window-line' },
  { label: 'Backend', value: 'backend', icon: 'ri-server-line' },
];
category: string | null = null;
```

#### 3. Con búsqueda integrada

```html
<nui-chip-selector
  [options]="skills"
  searchable
  searchPlaceholder="Buscar habilidades..."
  showCounter
  [(value)]="selectedSkills"
/>
```

#### 4. Con límite máximo

```html
<nui-chip-selector
  [options]="tags"
  [maxItems]="3"
  showCounter
  [(value)]="selectedTags"
/>
```

#### 5. Orientación vertical

```html
<nui-chip-selector
  [options]="options"
  orientation="vertical"
  mode="single"
  [(value)]="selected"
/>
```

---

## �️ nui-chip-list

Componente orquestador completo para gestionar listas de chips con selección, drag & drop y funcionalidades avanzadas.

### Importación

```typescript
import { ChipListComponent } from '@shared/components/chip';
```

### Selector

```html
<nui-chip-list></nui-chip-list>
```

### API

#### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `items` | `any[]` | **Requerido** | Items en la lista |
| `mode` | `'single' \| 'multiple' \| 'none'` | `'none'` | Modo de selección |
| `value` | `any \| any[]` | Varies | Valor(es) seleccionado(s) |
| `labelBy` | `string` | `'label'` | Propiedad para el label |
| `valueBy` | `string` | `'value'` | Propiedad para el value |
| `iconBy` | `string` | `'icon'` | Propiedad para el icon |
| `imageBy` | `string` | `'image'` | Propiedad para la imagen |
| `disabledBy` | `string` | `'disabled'` | Propiedad para disabled |
| `size` | `NUISize` | `'md'` | Tamaño del chip |
| `color` | `NUIColor` | `'primary'` | Color del chip |
| `variant` | `NUIVariant` | `'solid'` | Variante visual |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientación |
| `imageAlign` | `'left' \| 'right'` | `'left'` | Posición imagen/icono |
| `removable` | `boolean` | `false` | Si los chips son removibles |
| `removeIcon` | `string` | `'ri-close-line'` | Icono del botón remover |
| `reorderable` | `boolean` | `false` | Permite drag & drop |
| `disabled` | `boolean` | `false` | Deshabilitado |

#### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `valueChange` | `EventEmitter<any>` | Emite cuando cambia la selección |
| `itemRemove` | `EventEmitter<any>` | Emite cuando se remueve item |
| `orderChange` | `EventEmitter<any[]>` | Emite cuando se reordena |
| `chipClick` | `EventEmitter<any>` | Emite cuando se hace click en chip |
| `imageError` | `EventEmitter<{event: Event; item: any}>` | Emite al fallar imagen |

### Ejemplos

#### 1. Lista removible básica

```html
<nui-chip-list
  [items]="activeTags"
  [removable]="true"
  (itemRemove)="onTagRemoved($event)"
/>
```

```typescript
activeTags: ChipOption[] = [
  { label: 'Angular', value: 'angular', icon: 'ri-angularjs-line' },
  { label: 'TypeScript', value: 'ts', icon: 'ri-file-code-line' },
];

onTagRemoved(tag: ChipOption) {
  console.log('Tag removido:', tag);
  // Remover del array
  this.activeTags = this.activeTags.filter(t => t.value !== tag.value);
}
```

#### 2. Con reordenamiento y selección

```html
<nui-chip-list
  [items]="priorities"
  mode="single"
  [(value)]="selectedPriority"
  [reorderable]="true"
  color="warning"
  (orderChange)="onReorder($event)"
/>
```

```typescript
priorities: ChipOption[] = [
  { label: 'Alta', value: 'high' },
  { label: 'Media', value: 'medium' },
  { label: 'Baja', value: 'low' },
];
selectedPriority: string | null = null;

onReorder(newOrder: ChipOption[]) {
  console.log('Nuevo orden:', newOrder);
  this.priorities = newOrder;
}
```

#### 3. Con icono personalizado y modo múltiple

```html
<nui-chip-list
  [items]="filters"
  mode="multiple"
  [(value)]="selectedFilters"
  [removable]="true"
  removeIcon="ri-delete-bin-line"
  color="danger"
  variant="outline"
/>
```

```typescript
filters: ChipOption[] = [
  { label: 'Activos', value: 'active' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Completados', value: 'completed' },
];
selectedFilters: string[] = [];
```

#### 4. Orientación vertical con display únicamente

```html
<nui-chip-list
  [items]="team"
  mode="none"
  orientation="vertical"
  color="primary"
/>
```

```typescript
team: ChipOption[] = [
  { label: 'Ana García', value: 'ana', image: 'https://i.pravatar.cc/32?img=1' },
  { label: 'Carlos López', value: 'carlos', image: 'https://i.pravatar.cc/32?img=2' },
  { label: 'María Silva', value: 'maria', image: 'https://i.pravatar.cc/32?img=3' },
];
```



---

## 🎨 Configuración Común

### Tamaños Disponibles

```typescript
size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
```

**Nota:** Se usa `'sm'` en lugar de `'s'`.

### Colores Disponibles

```typescript
color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent' = 'primary'
```

### Variantes Visuales

```typescript
variant: 'solid' | 'outline' | 'ghost' = 'solid'
```

- **solid**: Fondo de color sólido
- **outline**: Solo borde de color
- **ghost**: Fondo suave de color

---

## 🔧 Integración con Formularios

Los componentes `nui-chip-selector` y `nui-chip-list` soportan `ControlValueAccessor`:

```html
<!-- Reactive Forms con ChipSelectorComponent -->
<nui-chip-selector
  [options]="options"
  formControlName="selectedTags"
/>

<!-- ngModel con ChipListComponent -->
<nui-chip-list
  [items]="availableTags"
  mode="multiple"
  [(value)]="selectedTags"
/>

<!-- Reactive Forms con ChipListComponent -->
<nui-chip-list
  [items]="options"
  mode="single"
  formControlName="selectedOption"
/>
```

```typescript
form = new FormGroup({
  selectedTags: new FormControl<string[]>([]),
  selectedOption: new FormControl<string | null>(null)
});
```

---

## 📊 Comparación de Componentes

| Característica | ChipComponent | ChipListComponent | ChipSelectorComponent |
|----------------|---------------|-------------------|----------------------|
| Uso individual | ✅ | ❌ | ❌ |
| Selección | ❌ | ✅ Single/Multiple/None | ✅ Single/Multiple |
| Removible | ✅ | ✅ | ❌ |
| Reordenable | ❌ | ✅ Drag & Drop | ❌ |
| Búsqueda | ❌ | ❌ | ✅ |
| Límite máximo | ❌ | ❌ | ✅ |
| Predefined Options | ❌ | ❌ | ✅ |
| ControlValueAccessor | ❌ | ✅ | ✅ |
| Clickable | ✅ | Via selection | Via selection |

---

## 💡 Guía de Uso

### ¿Cuándo usar cada componente?

#### nui-chip (ChipComponent)
- ✅ Chips individuales simples
- ✅ Tags estáticos
- ✅ Badges informativos
- ✅ Elementos clickeable individuales

#### nui-chip-list (ChipListComponent)
- ✅ Lista de elementos removibles
- ✅ Tags dinámicos editables
- ✅ Lista de prioridades reordenables (drag & drop)
- ✅ Colaboradores asignados con selección
- ✅ Gestión completa de elementos

#### nui-chip-selector (ChipSelectorComponent)
- ✅ Filtros de productos con opciones predefinidas
- ✅ Selección de categorías de un catálogo
- ✅ Selección de habilidades con búsqueda
- ✅ Multi-selección con límites y contador

---

## ⚠️ Mejores Prácticas

### ✅ Hacer

- Usa labels cortos (1-2 palabras)
- Agrupa chips por categoría cuando haya muchos
- Usa colores consistentes por tipo
- Máximo 15-20 chips visibles
- Usa iconos para identificación rápida
- Implementa búsqueda si hay > 10 opciones

### ❌ Evitar

- Labels demasiado largos
- Más de 3-4 líneas de chips
- Mezclar chips de diferentes propósitos
- Usar sin label descriptivo
- Demasiados colores diferentes
- Chips muy pequeños en móvil

---

## 🆚 vs. Otros Componentes

| Componente | Uso | Aspecto |
|------------|-----|---------|
| **nui-chip-*** | Tags, filtros, categorías, selección | Redondeado, separado, removible |
| **nui-select-btn** | Radio/checkbox, configuraciones | Botones unidos, toggle |
| **nui-button** | Acciones, navegación | Rectangular, acciones |

---

## 🔗 Tipos Compartidos

```typescript
interface ChipOption {
  label: string;
  value: any;
  icon?: string;
  image?: string;
  disabled?: boolean;
}
```

---

## 📝 Notas

- `nui-chip` (ChipComponent) **SÍ** está diseñado para uso independiente
- `nui-chip-list` usa internamente `nui-chip` para cada elemento
- `nui-chip-selector` usa internamente `nui-chip-list` que a su vez usa `nui-chip`  
- Todos los componentes soportan iconos e imágenes
- Usar tamaño `'sm'` en lugar de `'s'` (corregido en la implementación)
- Los tres componentes forman una jerarquía: Chip → ChipList → ChipSelector
