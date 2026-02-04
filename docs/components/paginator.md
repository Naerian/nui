# Paginator Component

Componente de paginación robusto y altamente configurable que permite navegar entre páginas de resultados. Soporta múltiples modos de visualización, layouts personalizables, navegación por teclado y detección automática de dispositivos móviles.

## Características Principales

🎯 **4 modos de visualización**: default, compact, fractional, minimal  
📏 **6 tamaños**: xs, s, sm, md, lg, xl  
🎨 **7 colores del theme**: primary, secondary, accent, success, warning, danger, info  
⌨️ **Navegación por teclado completa** con ARIA best practices  
📱 **Detección automática de móvil** con layout responsive  
🎨 **Layouts personalizables** para cada área (top, left, center, right, bottom)  
🔢 **Selector de items por página** con opciones configurables  
🎯 **Salto a página específica** con input numérico  
📊 **Rango de items visible** (ej: "Mostrando 11-20 de 150 resultados")  
🚀 **Auto-scroll** al cambiar de página  
♾️ **Soporte para scroll infinito** (infinite mode)

## � Configuración Global

El paginador soporta configuración global a través del sistema de configuración de NUI. Esto te permite establecer valores por defecto para toda tu aplicación sin tener que repetirlos en cada instancia del componente.

### Configurar Valores Globales

```typescript
// app.config.ts o main.ts
import { ApplicationConfig } from '@angular/core';
import { provideNuiConfig } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiConfig({
      paginator: {
        config: {
          maxVisiblePages: 7,
          showFirstLast: true,
          showPageSizeSelector: true,
          showItemRange: true,
          showPageJump: true,  // ← Configuración global
          pageSizeOptions: [10, 25, 50, 100],
          autoScroll: false,
          scrollTarget: 'body',
        },
        layout: {
          // Layout por defecto para toda la app
          left: ['itemRange', 'pageSize'],
          center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
          right: ['pageJump'],
          direction: 'row',
          align: 'center',
          gap: '0.5rem',
        },
        mobileLayout: {
          // Layout optimizado para móviles
          top: ['itemRange'],
          center: ['firstButton', 'prevButton', 'fractionalNumbers', 'nextButton', 'lastButton'],
          bottom: ['pageSize'],
          direction: 'column',
          align: 'center',
          gap: '0.5rem',
        },
        infinite: {
          enabled: false,
          mode: 'button',
          itemsPerLoad: 20,  // ← Cuántos items cargar en modo infinito
          scrollOffset: 100,
          maxItems: 1000,
          showCounter: true,
        }
      }
    })
  ]
};
```

### Prioridad de Configuración

El sistema sigue esta jerarquía (de mayor a menor prioridad):

1. **Valores explícitos en el componente**: `[showPageJump]="false"`
2. **Configuración global**: `config.showPageJump: true`
3. **Valores por defecto del componente**

```html
<!-- Usa configuración global (showPageJump: true) -->
<nui-paginator [currentPage]="1" [totalPages]="10" />

<!-- Sobrescribe configuración global -->
<nui-paginator 
  [currentPage]="1" 
  [totalPages]="10"
  [showPageJump]="false" />
```

### ⚠️ Layout Explícito Ignora show\* Properties

**IMPORTANTE**: Cuando se proporciona un `layout` explícito, las propiedades `show*` son completamente ignoradas. El layout tiene control total sobre qué elementos renderizar y dónde.

```typescript
// ❌ ESTO NO FUNCIONARÁ COMO ESPERAS
<nui-paginator 
  [showPageJump]="false"  // ← Ignorado cuando hay layout
  [layout]="{
    center: ['pageNumbers'],
    right: ['pageJump']   // ← pageJump se renderizará
  }" />

// ✅ CORRECTO: El layout controla todo
<nui-paginator 
  [layout]="{
    center: ['pageNumbers']
    // pageJump NO está en el layout, no se renderizará
  }" />
```

**Razón**: El layout es una API de más bajo nivel que te da control completo. Si especificas un layout personalizado, se asume que sabes exactamente qué quieres mostrar.

## �📦 Importación

```typescript
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

@Component({
  imports: [PaginatorComponent],
  // ...
})
```

## 🎯 Selector

```html
<nui-paginator></nui-paginator>
```

## 💡 Uso Básico

```html
<!-- Paginador simple -->
<nui-paginator 
  [currentPage]="1" 
  [totalPages]="10"
  (pageChange)="onPageChange($event)">
</nui-paginator>
```

```typescript
// Component
currentPage = signal(1);

onPageChange(newPage: number) {
  this.currentPage.set(newPage);
  // Cargar datos de la nueva página
  this.loadData(newPage);
}
```

### ✨ Cálculo Automático de totalPages

Si proporcionas `totalItems` y `itemsPerPage`, `totalPages` se calcula automáticamente:

```html
<nui-paginator 
  [currentPage]="currentPage()"
  [totalItems]="150"          <!-- Total de items -->
  [itemsPerPage]="10"          <!-- Items por página -->
  (pageChange)="onPageChange($event)">
</nui-paginator>
<!-- totalPages se calcula automáticamente como 15 (150 / 10) -->
```

```typescript
// Component
currentPage = signal(1);
totalItems = signal(150);
itemsPerPage = signal(10);

// totalPages se calcula reactivamente
totalPages = computed(() => 
  Math.ceil(this.totalItems() / this.itemsPerPage())
);

onPageChange(newPage: number) {
  this.currentPage.set(newPage);
  this.loadData(newPage, this.itemsPerPage());
}
```

**Ventajas**:
- ✅ Menos props manuales
- ✅ Sincronización automática
- ✅ Reactivo a cambios de `totalItems` o `itemsPerPage`

## 📋 API

### @Input Properties

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `variant` | `NUIVariant` | `'solid'` | Variante visual: `'solid'`, `'outline'`, `'ghost'` |
| `color` | `NUIColor` | `'primary'` | Color del theme |
| `size` | `NUISize` | `'md'` | Tamaño: `'xs'`, `'s'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `currentPage` | `number` | `1` | Página actual (1-indexed) - Signal bidireccional con `model()` |
| `totalPages` | `number` | `1` | Número total de páginas (computed automático si se proporciona `totalItems`) |
| `maxVisiblePages` | `number` | `7` | Máximo de botones de página visibles |
| `disabled` | `boolean` | `false` | Deshabilita todo el paginador |
| `showFirstLast` | `boolean \| undefined` | `undefined` | Muestra botones de primera/última página (usa config global si no se especifica) |
| `mode` | `PaginatorMode` | `'default'` | Modo de visualización |
| `totalItems` | `number` | - | Total de items/resultados (para calcular rango y totalPages automáticamente) |
| `itemsPerPage` | `number` | `10` | Items por página - Signal bidireccional con `model()` |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Opciones para selector de tamaño de página |
| `showPageSizeSelector` | `boolean \| undefined` | `undefined` | Muestra selector de items por página (usa config global si no se especifica) |
| `showItemRange` | `boolean \| undefined` | `undefined` | Muestra rango de items (usa config global si no se especifica) |
| `showPageJump` | `boolean \| undefined` | `undefined` | Muestra input para saltar a página (usa config global si no se especifica) |
| `autoScroll` | `boolean` | `false` | Hace scroll automático al cambiar página |
| `scrollTarget` | `string \| HTMLElement` | `'body'` | Elemento target para auto-scroll |
| `autoMobile` | `boolean` | `true` | Detecta móviles y cambia a modo fractional |
| `autoWrap` | `boolean` | `true` | Permite wrap en pantallas pequeñas |
| `layout` | `PaginatorLayout` | - | Configuración personalizada de layout (**ignora propiedades show\* cuando está definido**) |
| `mobileLayout` | `PaginatorLayout` | - | Layout específico para móviles |
| `iconConfig` | `IconConfig` | - | Configuración de iconos |
| `icons` | `Partial<IconConfig>` | - | Iconos específicos a sobreescribir |
| `infiniteConfig` | `InfiniteConfig` | - | Configuración de modo infinito |

### @Output Events

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `pageChange` | `EventEmitter<number>` | Se emite cuando cambia la página (emite el número de página) |
| `pageSizeChange` | `EventEmitter<number>` | Se emite cuando cambia el tamaño de página |
| `pageChangeAdvanced` | `EventEmitter<PageChangeEvent>` | Evento avanzado con información detallada del cambio |
| `pageSizeChangeAdvanced` | `EventEmitter<PageSizeChangeEvent>` | Evento avanzado con información detallada del cambio de tamaño |

### Tipos TypeScript

```typescript
type NUIVariant = 'solid' | 'outline' | 'ghost';
type NUIColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
type NUISize = 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';
type PaginatorMode = 'default' | 'compact' | 'fractional' | 'minimal';

type PaginatorElement =
  | 'firstButton'
  | 'prevButton'
  | 'pageNumbers'
  | 'currentPage'
  | 'nextButton'
  | 'lastButton'
  | 'itemRange'
  | 'pageSize'
  | 'pageJump';

type PaginatorLayoutArea = 'top' | 'left' | 'center' | 'right' | 'bottom';

interface PaginatorLayout {
  top?: PaginatorElement[];
  left?: PaginatorElement[];
  center?: PaginatorElement[];
  right?: PaginatorElement[];
  bottom?: PaginatorElement[];
  direction?: 'row' | 'column';
  gap?: string;
  align?: 'start' | 'center' | 'end' | 'space-between';
}

interface PageChangeEvent {
  currentPage: number;
  previousPage: number;
  totalPages: number;
  itemsPerPage: number;
  firstItemIndex: number;
  lastItemIndex: number;
}

interface PageSizeChangeEvent {
  newSize: number;
  oldSize: number;
  currentPage: number;
  totalPages: number;
}

interface IconConfig {
  first: string;
  previous: string;
  next: string;
  last: string;
}
```

## 📏 Tamaños

```html
<nui-paginator size="xs" [currentPage]="1" [totalPages]="10" />
<nui-paginator size="s" [currentPage]="1" [totalPages]="10" />
<nui-paginator size="sm" [currentPage]="1" [totalPages]="10" />
<nui-paginator size="md" [currentPage]="1" [totalPages]="10" /> <!-- Default -->
<nui-paginator size="lg" [currentPage]="1" [totalPages]="10" />
<nui-paginator size="xl" [currentPage]="1" [totalPages]="10" />
```

## 🎨 Colores

```html
<nui-paginator color="primary" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="secondary" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="accent" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="success" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="warning" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="danger" [currentPage]="1" [totalPages]="5" />
<nui-paginator color="info" [currentPage]="1" [totalPages]="5" />
```

## 🎨 Variantes

### Solid (Default)

Botones con fondo sólido de color completo. Máxima visibilidad.

```html
<nui-paginator 
  variant="solid" 
  color="primary"
  [currentPage]="1" 
  [totalPages]="10">
</nui-paginator>
```

### Outline

Solo borde de color con fondo transparente. Diseño más sutil.

```html
<nui-paginator 
  variant="outline" 
  color="primary"
  [currentPage]="1" 
  [totalPages]="10">
</nui-paginator>
```

### Ghost

Sin borde ni fondo, solo texto/icono. Mínima intrusión visual.

```html
<nui-paginator 
  variant="ghost" 
  color="primary"
  [currentPage]="1" 
  [totalPages]="10">
</nui-paginator>
```

## 🎯 Modos de Visualización

### Mode: Default

Modo estándar con todos los elementos visibles (números de página, botones prev/next, primera/última).

```html
<nui-paginator 
  mode="default"
  [currentPage]="5" 
  [totalPages]="20"
  [maxVisiblePages]="7">
</nui-paginator>
```

**Muestra:** `[<<] [<] [3] [4] [5] [6] [7] [>] [>>]`

### Mode: Compact

Solo anterior/siguiente y página actual. Ideal para espacios reducidos.

```html
<nui-paginator 
  mode="compact"
  [currentPage]="5" 
  [totalPages]="20">
</nui-paginator>
```

**Muestra:** `[<<] [<] Página 5 [>] [>>]`

### Mode: Fractional

Anterior/siguiente con indicador de página actual/total. Perfecto para móviles.

```html
<nui-paginator 
  mode="fractional"
  [currentPage]="5" 
  [totalPages]="20">
</nui-paginator>
```

**Muestra:** `[<] 5 de 20 [>]`

### Mode: Minimal

Solo flechas anterior/siguiente. Máxima simplicidad.

```html
<nui-paginator 
  mode="minimal"
  [currentPage]="5" 
  [totalPages]="20">
</nui-paginator>
```

**Muestra:** `[<] [>]`

## 🚀 Características Avanzadas

### 1. 📊 Rango de Items y Total

Muestra información contextual sobre qué items se están visualizando:

```html
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [totalItems]="totalItems()"
  [itemsPerPage]="pageSize()"
  [showItemRange]="true"
  (pageChange)="onPageChange($event)">
</nui-paginator>
```

**Muestra:** `Mostrando 11-20 de 150 resultados`

```typescript
// Component
totalItems = signal(150);
pageSize = signal(10);
currentPage = signal(2);
totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

onPageChange(page: number) {
  this.currentPage.set(page);
  this.loadData(page, this.pageSize());
}
```

### 2. 🔢 Selector de Tamaño de Página

Permite al usuario cambiar cuántos items se muestran por página:

```html
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [itemsPerPage]="pageSize()"
  [pageSizeOptions]="[10, 25, 50, 100]"
  [showPageSizeSelector]="true"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)">
</nui-paginator>
```

```typescript
// Component
pageSize = signal(10);
currentPage = signal(1);

onPageSizeChange(newSize: number) {
  this.pageSize.set(newSize);
  this.currentPage.set(1); // Volver a la primera página
  this.loadData(1, newSize);
}
```

### 3. 🎯 Salto a Página Específica

Input para saltar directamente a cualquier página:

```html
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [showPageJump]="true"
  (pageChange)="onPageChange($event)">
</nui-paginator>
```

**Muestra:** Input con placeholder "Ir a página..."

### 4. 📱 Detección Automática de Móvil

El paginador cambia automáticamente a modo `fractional` en dispositivos móviles:

```html
<!-- Se adapta automáticamente -->
<nui-paginator 
  [currentPage]="1"
  [totalPages]="20"
  [autoMobile]="true">
</nui-paginator>

<!-- Desactivar detección automática -->
<nui-paginator 
  [currentPage]="1"
  [totalPages]="20"
  [autoMobile]="false"
  mode="default">
</nui-paginator>
```

### 5. 🎨 Layouts Personalizables

Controla exactamente dónde aparece cada elemento del paginador:

```html
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [totalItems]="totalItems()"
  [itemsPerPage]="pageSize()"
  [showPageSizeSelector]="true"
  [showItemRange]="true"
  [layout]="{
    top: ['itemRange', 'pageSize'],
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
    direction: 'row',
    gap: 'md',
    align: 'center'
  }"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)">
</nui-paginator>
```

**Elementos disponibles:**
- `firstButton` → Botón primera página
- `prevButton` → Botón página anterior
- `pageNumbers` → Números de página
- `currentPage` → Indicador de página actual (modos compact/fractional)
- `nextButton` → Botón página siguiente
- `lastButton` → Botón última página
- `itemRange` → Rango de items ("11-20 de 150")
- `pageSize` → Selector de tamaño de página
- `pageJump` → Input para saltar a página

**Áreas disponibles:**
- `top` → Arriba del paginador
- `left` → Izquierda
- `center` → Centro (default para botones)
- `right` → Derecha
- `bottom` → Abajo del paginador

**Layout móvil específico:**

```html
<nui-paginator 
  [layout]="{
    top: ['itemRange'],
    center: ['pageNumbers'],
    bottom: ['pageSize']
  }"
  [mobileLayout]="{
    top: ['itemRange'],
    center: ['prevButton', 'currentPage', 'nextButton'],
    bottom: ['pageSize'],
    direction: 'column',
    gap: '0.75rem'
  }">
</nui-paginator>
```

### 6. 🚀 Auto-scroll al Cambiar Página

Scroll automático al top al cambiar de página:

```html
<!-- Scroll al body -->
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [autoScroll]="true"
  (pageChange)="onPageChange($event)">
</nui-paginator>

<!-- Scroll a un elemento específico -->
<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [autoScroll]="true"
  [scrollTarget]="'#content-container'"
  (pageChange)="onPageChange($event)">
</nui-paginator>
```

```html
<!-- HTML con contenedor target -->
<div id="content-container">
  <!-- Lista de items -->
  @for (item of items(); track item.id) {
    <div class="item">{{ item.name }}</div>
  }
</div>

<nui-paginator 
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [autoScroll]="true"
  [scrollTarget]="'#content-container'"
  (pageChange)="onPageChange($event)">
</nui-paginator>
```

### 7. 🎨 Iconos Personalizados

Cambia los iconos de navegación:

```html
<nui-paginator 
  [currentPage]="1"
  [totalPages]="10"
  [icons]="{
    first: 'ri-arrow-left-double-line',
    previous: 'ri-arrow-left-s-line',
    next: 'ri-arrow-right-s-line',
    last: 'ri-arrow-right-double-line'
  }">
</nui-paginator>
```

### 8. ♾️ Modo Infinito (Infinite Scroll)

Carga progresiva de datos con scroll infinito o botón "Cargar más":

```html
<div class="content-list">
  @for (item of items(); track item.id) {
    <div class="item">{{ item.name }}</div>
  }
</div>

<nui-paginator 
  [totalItems]="totalItems()"
  [infiniteConfig]="{
    enabled: true,
    mode: 'button',              // 'button' o 'scroll'
    showCounter: true,
    initialLoadedItems: 20,      // Items ya cargados inicialmente
    itemsPerLoad: 20,            // Cuántos items cargar cada vez
    onLoadMore: loadMoreData.bind(this)
  }">
</nui-paginator>
```

```typescript
// Component
items = signal<Item[]>([]);
totalItems = signal(100);

async loadMoreData() {
  // Simular carga de API
  await this.apiService.loadMore();
  
  // Los items nuevos se agregan a la lista
  const newItems = await this.apiService.getNextBatch();
  this.items.update(current => [...current, ...newItems]);
}
```

#### InfiniteConfig Interface

```typescript
interface InfiniteConfig {
  enabled: boolean;                    // Activar modo infinito
  mode: 'button' | 'scroll';          // Botón o scroll automático
  showCounter: boolean;               // Mostrar contador de items cargados
  initialLoadedItems?: number;        // Items pre-cargados (para el contador)
  itemsPerLoad: number;               // Cuántos items cargar por vez (default: 20)
  scrollOffset: number;               // Offset de px para trigger de scroll
  maxItems: number;                   // Límite máximo de items
  onLoadMore: () => Promise<void>;    // Callback cuando se solicita más datos
}
```

**Diferencias clave con paginación normal**:
- ❌ No usa `itemsPerPage` (usa `itemsPerLoad` en su lugar)
- ❌ No usa `currentPage` (carga es incremental)
- ✅ Usa `initialLoadedItems` para sincronizar el contador
- ✅ Completamente independiente del sistema de páginas

## 📡 Eventos

### Evento Simple

```typescript
@Component({
  template: `
    <nui-paginator 
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      (pageChange)="onPageChange($event)">
    </nui-paginator>
  `
})
export class MyComponent {
  currentPage = signal(1);
  totalPages = signal(10);

  onPageChange(newPage: number) {
    console.log('Nueva página:', newPage);
    this.currentPage.set(newPage);
  }
}
```

### Evento Avanzado

```typescript
@Component({
  template: `
    <nui-paginator 
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      [totalItems]="totalItems()"
      [itemsPerPage]="pageSize()"
      (pageChangeAdvanced)="onPageChangeAdvanced($event)">
    </nui-paginator>
  `
})
export class MyComponent {
  currentPage = signal(1);
  totalPages = signal(10);
  totalItems = signal(100);
  pageSize = signal(10);

  onPageChangeAdvanced(event: PageChangeEvent) {
    console.log('Página anterior:', event.previousPage);
    console.log('Página actual:', event.currentPage);
    console.log('Total de páginas:', event.totalPages);
    console.log('Items por página:', event.itemsPerPage);
    console.log('Primer item (índice):', event.firstItemIndex);
    console.log('Último item (índice):', event.lastItemIndex);
    
    this.currentPage.set(event.currentPage);
  }
}
```

### Evento de Cambio de Tamaño

```typescript
@Component({
  template: `
    <nui-paginator 
      [itemsPerPage]="pageSize()"
      [showPageSizeSelector]="true"
      [pageSizeOptions]="[10, 25, 50, 100]"
      (pageSizeChangeAdvanced)="onPageSizeChange($event)">
    </nui-paginator>
  `
})
export class MyComponent {
  pageSize = signal(10);
  currentPage = signal(1);

  onPageSizeChange(event: PageSizeChangeEvent) {
    console.log('Tamaño anterior:', event.oldSize);
    console.log('Nuevo tamaño:', event.newSize);
    console.log('Página actual:', event.currentPage);
    console.log('Total de páginas:', event.totalPages);
    
    this.pageSize.set(event.newSize);
    this.currentPage.set(1); // Reset a primera página
  }
}
```

## 🎛️ Control Programático

### Paginación Controlada

```typescript
@Component({
  template: `
    <nui-paginator 
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      (pageChange)="onPageChange($event)">
    </nui-paginator>

    <button (click)="goToPage(1)">Primera</button>
    <button (click)="previousPage()">Anterior</button>
    <button (click)="nextPage()">Siguiente</button>
    <button (click)="goToPage(totalPages())">Última</button>
  `
})
export class MyComponent {
  currentPage = signal(1);
  totalPages = signal(10);

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadData(page);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadData(page);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadData(this.currentPage());
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.loadData(this.currentPage());
    }
  }

  loadData(page: number) {
    console.log('Cargando página:', page);
    // Aquí iría la lógica de carga de datos
  }
}
```

### Paginación con API

```typescript
@Component({
  template: `
    <nui-paginator 
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      [totalItems]="totalItems()"
      [itemsPerPage]="pageSize()"
      [showPageSizeSelector]="true"
      [showItemRange]="true"
      [disabled]="loading()"
      (pageChange)="loadPage($event)"
      (pageSizeChange)="changePageSize($event)">
    </nui-paginator>

    @if (loading()) {
      <nui-spinner />
    }

    <div class="items">
      @for (item of items(); track item.id) {
        <div class="item">{{ item.name }}</div>
      }
    </div>
  `
})
export class MyComponent {
  private apiService = inject(ApiService);
  
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));
  items = signal<Item[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading.set(true);
    this.currentPage.set(page);

    this.apiService.getItems(page, this.pageSize())
      .subscribe({
        next: (response) => {
          this.items.set(response.items);
          this.totalItems.set(response.total);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error al cargar:', error);
          this.loading.set(false);
        }
      });
  }

  changePageSize(newSize: number) {
    this.pageSize.set(newSize);
    this.loadPage(1); // Volver a primera página
  }
}
```

## ⌨️ Navegación por Teclado

El componente sigue las mejores prácticas de ARIA:

**Teclas soportadas en botones:**

| Tecla | Acción |
|-------|--------|
| `Enter` | Navega a la página del botón presionado |
| `Space` | Navega a la página del botón presionado |
| `Tab` | Siguiente botón focusable |
| `Shift + Tab` | Botón anterior focusable |
| `Home` | Primer botón de página (1) |
| `End` | Último botón de página |
| `→` | Siguiente botón |
| `←` | Botón anterior |

**Teclas en input de salto a página:**

| Tecla | Acción |
|-------|--------|
| `Enter` | Navega a la página ingresada |
| `Esc` | Limpia el input |

## ♿ Accesibilidad

✅ **Roles ARIA correctos**
- `role="navigation"` en el contenedor principal
- `aria-label="Paginación"` descriptivo

✅ **Atributos ARIA en botones**
- `aria-label` descriptivo (ej: "Ir a página 5")
- `aria-current="page"` en la página activa
- `aria-disabled` en botones deshabilitados

✅ **Región de anuncios**
- `aria-live="polite"` para anunciar cambios de página
- Anuncios claros del tipo "Página 5 de 20"

✅ **Estados visuales claros**
- Disabled state con opacidad reducida
- Current page claramente destacada
- Focus visible en todos los botones

✅ **Lectores de pantalla**
- Anuncios automáticos de cambios de página
- Información de contexto completa
- Soporte total para NVDA, JAWS, VoiceOver

## 🎨 Personalización con CSS

El componente usa CSS custom properties del theme:

```scss
// Variables de color y variante
--paginator-{color}-{variant}-bg
--paginator-{color}-{variant}-text
--paginator-{color}-{variant}-border
--paginator-{color}-{variant}-hover-bg
--paginator-{color}-{variant}-hover-text
--paginator-{color}-{variant}-active-bg
--paginator-{color}-{variant}-active-text
--paginator-{color}-{variant}-disabled-bg
--paginator-{color}-{variant}-disabled-text

// Variables de espaciado
--nui-spacing-xs, --nui-spacing-s, --nui-spacing-sm, --nui-spacing-md, --nui-spacing-lg

// Variables de borde
--nui-border-width-s
--nui-border-radius-sm, --nui-border-radius-md

// Variables de tipografía
--nui-font-size-xs, --nui-font-size-sm, --nui-font-size-md, --nui-font-size-lg
--nui-font-weight-medium, --nui-font-weight-semibold

// Variables de transición
--nui-transition-duration-fast, --nui-transition-duration-normal
```

## ✅ Mejores Prácticas

### ✅ Hacer

- Usar `[disabled]="loading()"` mientras se cargan datos
- Implementar `showItemRange` para dar contexto al usuario
- Usar `showPageSizeSelector` en listas largas para mejor UX
- Calcular `totalPages` automáticamente con `computed()`
- Usar `autoScroll` en páginas largas
- Aprovechar `autoMobile` para responsive automático
- Usar eventos avanzados (`pageChangeAdvanced`) para logging/analytics
- Mantener `maxVisiblePages` entre 5-9 para mejor UX
- Usar layouts personalizados cuando el diseño lo requiera

### ❌ Evitar

- Cambiar `currentPage` manualmente sin actualizar datos
- Tener más de 1000 páginas sin búsqueda/filtros adicionales
- Mostrar paginador si solo hay 1 página
- Usar `showPageJump` con pocas páginas (< 10)
- `maxVisiblePages` muy alto (> 11) en móvil
- Layouts complejos que confundan al usuario
- Desactivar `autoMobile` sin un diseño responsive específico

## 🔧 Ejemplos de Uso Real

### Tabla de Usuarios con Paginación

```typescript
@Component({
  template: `
    <div class="user-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users(); track user.id) {
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
          }
        </tbody>
      </table>

      <nui-paginator 
        [currentPage]="currentPage()"
        [totalPages]="totalPages()"
        [totalItems]="totalUsers()"
        [itemsPerPage]="pageSize()"
        [showPageSizeSelector]="true"
        [pageSizeOptions]="[10, 25, 50, 100]"
        [showItemRange]="true"
        [autoScroll]="true"
        [scrollTarget]="'.user-table'"
        color="primary"
        variant="solid"
        (pageChange)="loadUsers($event)"
        (pageSizeChange)="changePageSize($event)">
      </nui-paginator>
    </div>
  `
})
export class UserTableComponent {
  private userService = inject(UserService);

  currentPage = signal(1);
  pageSize = signal(25);
  totalUsers = signal(0);
  totalPages = computed(() => Math.ceil(this.totalUsers() / this.pageSize()));
  users = signal<User[]>([]);

  ngOnInit() {
    this.loadUsers(1);
  }

  loadUsers(page: number) {
    this.userService.getUsers(page, this.pageSize()).subscribe(response => {
      this.users.set(response.users);
      this.totalUsers.set(response.total);
      this.currentPage.set(page);
    });
  }

  changePageSize(newSize: number) {
    this.pageSize.set(newSize);
    this.loadUsers(1);
  }
}
```

### Galería de Imágenes

```typescript
@Component({
  template: `
    <div class="image-gallery">
      <div class="gallery-grid">
        @for (image of images(); track image.id) {
          <div class="image-card">
            <img [src]="image.url" [alt]="image.title" />
            <p>{{ image.title }}</p>
          </div>
        }
      </div>

      <nui-paginator 
        mode="fractional"
        [currentPage]="currentPage()"
        [totalPages]="totalPages()"
        color="accent"
        variant="solid"
        size="lg"
        (pageChange)="loadImages($event)">
      </nui-paginator>
    </div>
  `
})
export class ImageGalleryComponent {
  currentPage = signal(1);
  totalPages = signal(10);
  images = signal<Image[]>([]);

  loadImages(page: number) {
    // Cargar imágenes de la página
    this.currentPage.set(page);
  }
}
```

### Blog Posts con Layout Personalizado

```typescript
@Component({
  template: `
    <div class="blog-posts">
      @for (post of posts(); track post.id) {
        <article class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <time>{{ post.date | date }}</time>
        </article>
      }

      <nui-paginator 
        [currentPage]="currentPage()"
        [totalPages]="totalPages()"
        [totalItems]="totalPosts()"
        [itemsPerPage]="postsPerPage()"
        [showPageSizeSelector]="true"
        [showItemRange]="true"
        [layout]="{
          top: ['itemRange'],
          center: ['pageNumbers'],
          bottom: ['pageSize'],
          gap: '1.5rem',
          align: 'center'
        }"
        color="primary"
        variant="outline"
        (pageChange)="loadPosts($event)"
        (pageSizeChange)="changePostsPerPage($event)">
      </nui-paginator>
    </div>
  `
})
export class BlogPostsComponent {
  currentPage = signal(1);
  postsPerPage = signal(10);
  totalPosts = signal(150);
  totalPages = computed(() => Math.ceil(this.totalPosts() / this.postsPerPage()));
  posts = signal<Post[]>([]);

  loadPosts(page: number) {
    // Cargar posts
    this.currentPage.set(page);
  }

  changePostsPerPage(newSize: number) {
    this.postsPerPage.set(newSize);
    this.loadPosts(1);
  }
}
```

## 🐛 Troubleshooting

### Los botones de primera/última no aparecen

**Posibles causas:**

1. **Configuración Global**: La configuración global tiene `showFirstLast: false`
   ```typescript
   // ❌ Global config deshabilitándolo
   provideNuiConfig({ paginator: { config: { showFirstLast: false } } })
   ```
   
2. **Layout Explícito**: Usas un layout personalizado sin incluir el elemento `first-last`
   ```html
   <!-- ❌ Layout sin first-last -->
   <nui-paginator [layout]="['prev-next', 'pages']">
   ```

**Soluciones:**
- Habilítalo explícitamente: `[showFirstLast]="true"`
- O ajusta la configuración global si aplica a todos los paginadores
- O incluye `first-last` en el layout personalizado

---

### El rango de items no se muestra correctamente

**Asegúrate de configurar:**
- `[totalItems]="..."` con el total real de items
- `[itemsPerPage]="..."` con el tamaño de página actual
- `[showItemRange]="true"` (o habilitado en config global)

**Problema común:**
```typescript
// ❌ totalPages calculado manualmente incorrectamente
totalPages = signal(10);

// ✅ Deja que el componente lo calcule
totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
```

---

### El selector de tamaño de página no aparece

**Verifica:**
1. Que `showPageSizeSelector` esté habilitado (explícitamente o via config global)
2. Que `pageSizeOptions` tenga valores válidos:
   ```typescript
   // ✅ Bueno
   [pageSizeOptions]="[10, 20, 50, 100]"
   
   // ❌ Malo (array vacío)
   [pageSizeOptions]="[]"
   ```
3. Si usas layout personalizado, incluye el elemento `page-size`:
   ```html
   <nui-paginator [layout]="['first-last', 'prev-next', 'pages', 'page-size']">
   ```

---

### Configuré show* properties pero no se aplican

**Problema**: Usas un `layout` explícito y esperas que las propiedades `show*` lo afecten.

```html
<!-- ❌ El layout ignora showFirstLast -->
<nui-paginator 
  [showFirstLast]="true"
  [showPageJump]="true"
  [layout]="['pages']">
</nui-paginator>
<!-- Resultado: solo muestra páginas, ignora first-last y page-jump -->
```

**Explicación**: Cuando defines `layout`, tienes control total sobre qué elementos se muestran. Las propiedades `show*` **NO tienen efecto**.

**Soluciones:**

1. **Remover el layout** y dejar que `show*` controle:
   ```html
   <nui-paginator 
     [showFirstLast]="true"
     [showPageJump]="true">
   </nui-paginator>
   ```

2. **O incluir explícitamente** los elementos en el layout:
   ```html
   <nui-paginator 
     [layout]="['first-last', 'pages', 'page-jump']">
   </nui-paginator>
   ```

---

### La configuración global no se aplica

**Verifica que:**

1. Hayas registrado la config en el provider:
   ```typescript
   // app.config.ts
   export const appConfig: ApplicationConfig = {
     providers: [
       provideNuiConfig({
         paginator: {
           config: { /* ... */ },
           layout: { /* ... */ }
         }
       })
     ]
   };
   ```

2. Que no haya un input explícito sobreescribiéndola:
   ```html
   <!-- ❌ El input [showFirstLast] sobreescribe la config global -->
   <nui-paginator [showFirstLast]="false">
   ```

**Prioridad de configuración**: `Input explícito > Config global > Default del componente`

---

### El layout personalizado no se aplica

**Recuerda que:**
- El layout debe incluir al menos un área con elementos válidos
- Los elementos solo se muestran si son válidos: `first-last`, `prev-next`, `pages`, `page-size`, `page-jump`, `item-range`
- El `mobileLayout` solo se aplica si:
  - `autoMobile="true"` (default)
  - Y el dispositivo es móvil (width < 768px)
  - Y `mobileLayout` está definido

**Ejemplo de layout no válido:**
```typescript
// ❌ Elementos inválidos
layout = ['first', 'last', 'previous']; // No existen como elementos individuales

// ✅ Válido
layout = ['first-last', 'prev-next', 'pages'];
```

---

### El paginador no responde al cambio de página

**Asegúrate de:**

1. **Usar el binding bidireccional con model()**:
   ```typescript
   currentPage = model(1); // ✅ Signal bidireccional
   ```

2. **O escuchar el evento manualmente**:
   ```html
   <nui-paginator 
     [currentPage]="currentPage()"
     (pageChange)="currentPage.set($event)">
   </nui-paginator>
   ```

3. **Cargar datos cuando cambie la página**:
   ```typescript
   effect(() => {
     const page = this.currentPage();
     this.loadData(page);
   });
   ```

---

### En modo infinito, el contador no refleja los items cargados

**Problema**: Cargas 20 items inicialmente, pero el contador dice "0 / 100".

**Causa**: No configuraste `initialLoadedItems`.

```typescript
// ❌ Sin initialLoadedItems
infiniteConfig = {
  enabled: true,
  itemsPerLoad: 20,
  // ...
}

// ✅ Con initialLoadedItems
infiniteConfig = {
  enabled: true,
  itemsPerLoad: 20,
  initialLoadedItems: 20, // Items pre-cargados
  // ...
}
```

El paginador necesita saber cuántos items ya tienes cargados para sincronizar el contador.

---

**Versión**: 2.0.0  
**Última actualización**: Diciembre 2024
