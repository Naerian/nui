# SlidePanel Component

Panel deslizante que se abre desde los bordes de la pantalla usando Angular CDK Overlay. Ideal para mostrar formularios, información adicional, o cualquier contenido sin abandonar el contexto actual.

## Características

- ✅ **Posiciones**: Derecha, izquierda, arriba, abajo
- ✅ **Tamaños**: Predefinidos (xs, sm, md, lg, xl, full) o custom
- ✅ **Componentes Dinámicos**: Carga cualquier componente con inyección de datos
- ✅ **Backdrop**: Configurable con click para cerrar
- ✅ **Accesibilidad**: Focus trap, ARIA labels, restauración de focus
- ✅ **Animaciones**: Transiciones suaves con Angular Animations
- ✅ **Múltiples Panels**: Soporta varios panels abiertos simultáneamente
- ✅ **Responsive**: Fullscreen automático en móvil (opcional)
- ✅ **Prevención de Cierre**: Confirmar antes de cerrar
- ✅ **Eventos**: Observables para opened, closed, backdrop click, keyboard
- ✅ **Templates**: Header y footer personalizables
- ✅ **Minimizable**: Reduce el panel a una pestaña lateral para liberar espacio
- ✅ **Restauración Inteligente**: Al abrir el mismo panel minimizado, se restaura automáticamente

## Instalación

El componente usa Angular CDK Overlay y A11y:

```bash
npm install @angular/cdk
```

## Uso Básico

### 1. Importar el Servicio

```typescript
import { Component, inject } from '@angular/core';
import { SlidePanelService } from '@shared/components/slidepanel/slidepanel.service';
import { MyPanelComponent } from './my-panel.component';

@Component({
  selector: 'app-my-feature',
  template: `
    <button (click)="openPanel()">Abrir Panel</button>
  `
})
export class MyFeatureComponent {
  private slidePanelService = inject(SlidePanelService);

  openPanel(): void {
    const panelRef = this.slidePanelService.open(MyPanelComponent, {
      position: 'right',
      size: 'md',
      title: 'Mi Panel'
    });

    panelRef.afterClosed().subscribe(result => {
      console.log('Panel cerrado con resultado:', result);
    });
  }
}
```

### 2. Crear Componente de Contenido

```typescript
import { Component, inject } from '@angular/core';
import { SLIDEPANEL_DATA, SLIDEPANEL_REF } from '@shared/components/slidepanel/slidepanel.service';
import { SlidePanelRef } from '@shared/components/slidepanel/slidepanel-ref';

@Component({
  selector: 'app-my-panel',
  standalone: true,
  template: `
    <div class="panel-content">
      <h3>{{ data.title }}</h3>
      <p>{{ data.message }}</p>
      
      <div class="actions">
        <button (click)="confirm()">Confirmar</button>
        <button (click)="cancel()">Cancelar</button>
      </div>
    </div>
  `
})
export class MyPanelComponent {
  readonly data = inject(SLIDEPANEL_DATA);
  readonly panelRef = inject<SlidePanelRef>(SLIDEPANEL_REF);

  confirm(): void {
    this.panelRef.close({ confirmed: true });
  }

  cancel(): void {
    this.panelRef.close({ confirmed: false });
  }
}
```

## API

### SlidePanelService

#### Métodos

| Método | Descripción | Retorno |
|--------|-------------|---------|
| `open<T>(component, config?)` | Abre un panel con el componente especificado | `SlidePanelRef<T>` |
| `close(id)` | Cierra el panel con el ID especificado | `void` |
| `closeAll()` | Cierra todos los panels abiertos | `void` |
| `getPanel(id)` | Obtiene el stack item de un panel | `SlidePanelStackItem \| undefined` |
| `getAllPanels()` | Obtiene todos los panels abiertos | `SlidePanelStackItem[]` |

#### Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `openPanelsCount` | `number` | Número de panels abiertos actualmente |

### SlidePanelConfig

Configuración completa del panel:

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Posición del panel |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Tamaño predefinido |
| `width` | `string` | - | Ancho custom (sobrescribe `size` para left/right) |
| `height` | `string` | - | Alto custom (sobrescribe `size` para top/bottom) |
| `maxWidth` | `string` | - | Ancho máximo |
| `maxHeight` | `string` | - | Alto máximo |
| `data` | `any` | - | Datos para el componente dinámico |
| `id` | `string` | auto | ID único del panel |
| `title` | `string` | - | Título en el header |
| `showHeader` | `boolean` | `true` | Mostrar header |
| `showCloseButton` | `boolean` | `true` | Mostrar botón cerrar |
| `headerTemplate` | `TemplateRef` | - | Template custom del header |
| `footerTemplate` | `TemplateRef` | - | Template custom del footer |
| `hasBackdrop` | `boolean` | `true` | Mostrar backdrop |
| `backdropClass` | `string \| string[]` | - | Clases CSS del backdrop |
| `closeOnBackdropClick` | `boolean` | `true` | Cerrar al click en backdrop |
| `closeOnEscape` | `boolean` | `true` | Cerrar con tecla Escape |
| `closeOnRouteChange` | `boolean` | `false` | Cerrar al cambiar de ruta |
| `preventClose` | `() => boolean \| Promise<boolean>` | - | Función para prevenir cierre |
| `autoFocus` | `boolean \| string` | `true` | Auto-focus: true, false, o selector CSS |
| `mobileFullScreen` | `boolean` | `false` | Fullscreen en móvil |
| `breakpoint` | `number` | `768` | Breakpoint para mobile fullscreen (px) |
| `panelClass` | `string \| string[]` | - | Clases CSS del panel |
| `scrollStrategy` | `'block' \| 'reposition' \| 'close'` | `'block'` | Estrategia de scroll |
| `ariaLabel` | `string` | `'Slide Panel'` | Label ARIA |
| `ariaDescribedBy` | `string` | - | ID del elemento descripción |
| `animationDuration` | `number` | `300` | Duración animación (ms) |
| `minimizable` | `boolean` | `false` | Panel minimizable con botón en header |
| `customButtons` | `SlidePanelCustomButton[]` | - | Botones programáticos para el footer |
| `zIndex` | `number` | `1000` | Z-index base |
| `allowMultiple` | `boolean` | `false` | Permitir múltiples panels |
| `lazyLoad` | `boolean` | `true` | Carga lazy del componente |

### Tamaños Predefinidos

```typescript
const SLIDEPANEL_SIZE_MAP = {
  xs: '300px',
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  full: '100%'
};
```

### SlidePanelRef

Referencia al panel abierto:

#### Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `id` | `string` | ID único del panel |
| `componentInstance` | `T` | Instancia del componente cargado |
| `config` | `SlidePanelConfig` | Configuración del panel |
| `state` | `SlidePanelState` | Estado actual |
| `isOpen` | `boolean` | Si está abierto |
| `isClosed` | `boolean` | Si está cerrado |
| `isMinimized` | `boolean` | Si está minimizado |

#### Métodos

| Método | Descripción | Retorno |
|--------|-------------|---------|
| `close(result?)` | Cierra el panel | `Promise<void>` |
| `minimize()` | Minimiza el panel | `void` |
| `restore()` | Restaura desde minimizado | `void` |
| `updateTitle(title)` | Actualiza el título | `void` |
| `updateHeaderTemplate(template)` | Actualiza template del header | `void` |
| `updateFooterTemplate(template)` | Actualiza template del footer | `void` |
| `afterOpened()` | Observable que se emite al abrir | `Observable<void>` |
| `afterClosed()` | Observable que se emite al cerrar | `Observable<R>` |
| `backdropClick()` | Observable de clicks en backdrop | `Observable<MouseEvent>` |
| `keydownEvents()` | Observable de eventos de teclado | `Observable<KeyboardEvent>` |
| `closePrevented()` | Observable cuando se previene el cierre | `Observable<void>` |
| `stateChanged()` | Observable de cambios de estado | `Observable<SlidePanelState>` |

## Ejemplos

### Diferentes Posiciones

```typescript
// Derecha (default)
slidePanelService.open(MyComponent, {
  position: 'right'
});

// Izquierda
slidePanelService.open(MyComponent, {
  position: 'left'
});

// Arriba
slidePanelService.open(MyComponent, {
  position: 'top'
});

// Abajo
slidePanelService.open(MyComponent, {
  position: 'bottom'
});
```

### Diferentes Tamaños

```typescript
// Tamaño predefinido
slidePanelService.open(MyComponent, {
  size: 'lg'
});

// Ancho custom
slidePanelService.open(MyComponent, {
  position: 'right',
  width: '500px'
});

// Alto custom
slidePanelService.open(MyComponent, {
  position: 'bottom',
  height: '400px'
});

// Con máximos
slidePanelService.open(MyComponent, {
  width: '80%',
  maxWidth: '1200px'
});
```

### Inyección de Datos

```typescript
// En el componente que abre el panel
slidePanelService.open(UserFormComponent, {
  data: {
    userId: 123,
    name: 'Juan',
    email: 'juan@example.com',
    mode: 'edit'
  }
});

// En UserFormComponent
export class UserFormComponent {
  readonly data = inject(SLIDEPANEL_DATA);

  ngOnInit(): void {
    console.log(this.data.userId); // 123
    console.log(this.data.mode); // 'edit'
  }
}
```

### Manejar Resultados

```typescript
const panelRef = slidePanelService.open(ConfirmDialogComponent, {
  title: 'Confirmar Acción',
  data: { message: '¿Estás seguro?' }
});

panelRef.afterClosed().subscribe(result => {
  if (result?.confirmed) {
    console.log('Usuario confirmó');
    // Ejecutar acción
  } else {
    console.log('Usuario canceló');
  }
});
```

### Prevenir Cierre

```typescript
slidePanelService.open(FormComponent, {
  preventClose: () => {
    if (formHasUnsavedChanges()) {
      return confirm('Tienes cambios sin guardar. ¿Cerrar de todos modos?');
    }
    return true;
  }
});

// Con async
slidePanelService.open(FormComponent, {
  preventClose: async () => {
    const response = await showConfirmDialog();
    return response.confirmed;
  }
});
```

### Sin Backdrop

```typescript
slidePanelService.open(MyComponent, {
  hasBackdrop: false
});
```

### Backdrop sin Cerrar

```typescript
slidePanelService.open(MyComponent, {
  hasBackdrop: true,
  closeOnBackdropClick: false
});
```

### Mobile Fullscreen

```typescript
slidePanelService.open(MyComponent, {
  mobileFullScreen: true,
  breakpoint: 768 // En pantallas < 768px será fullscreen
});
```

### Panel Minimizable

Permite minimizar el panel a una pestaña lateral para liberar espacio en pantalla sin perder el contexto:

```typescript
const panelRef = slidePanelService.open(ChatComponent, {
  title: 'Chat de Soporte',
  position: 'right',
  size: 'md',
  minimizable: true // Muestra botón de minimizar en el header
});
```

**Comportamiento:**
- Aparece un botón con icono `-` en el header del panel
- Al minimizar, el panel se oculta con animación suave
- Se muestra una **pestaña minimalista** con icono de flecha en el borde de la pantalla
- La pestaña muestra un tooltip con el título del panel al hacer hover
- Al hacer clic en la pestaña o en el botón original, el panel se restaura automáticamente
- El backdrop permanece visible pero translúcido cuando está minimizado
- Si haces clic en el backdrop mientras está minimizado, el panel se restaura (no se cierre)

**Arquitectura de Pestañas (Automática):**
- ✨ **Sin configuración manual**: El componente de pestañas se crea automáticamente cuando minimizas el primer panel
- 🎯 **Inyección dinámica**: `SlidePanelTabsService` crea el componente `<nui-sidebar-panel-tabs>` dinámicamente
- 🧹 **Auto-destrucción**: El componente se destruye automáticamente cuando no hay pestañas minimizadas
- 📍 **Sistema centralizado**: `SlidePanelTabsService` gestiona todas las pestañas globalmente
- 🎨 **Agrupación automática**: Las pestañas se agrupan por posición (right, left, top, bottom)
- 💡 **Zero-config**: No necesitas añadir nada en tu HTML - todo funciona automáticamente

**Importante:**
> ⚠️ **NO es necesario** instanciar `<nui-sidebar-panel-tabs />` en tu `app.component.html`.
> El componente se crea dinámicamente cuando es necesario y se destruye cuando no hay pestañas.

**Diseño de Pestañas:**
- Diseño minimalista: Solo icono de flecha (32×48px vertical, 48×32px horizontal)
- Posicionamiento inteligente: Centradas en el borde correspondiente
- Estilos sutiles: `opacity: 0.8` por defecto, `opacity: 1` al hover
- Animaciones suaves al aparecer/desaparecer

**Restauración Inteligente:**
```typescript
// Si abres el mismo componente minimizado, se restaura automáticamente
slidePanelService.open(ChatComponent, { position: 'right' });
// Si ya hay un ChatComponent minimizado en 'right', se restaura en lugar de crear uno nuevo
```

**Control programático:**

```typescript
// Minimizar desde código
panelRef.minimize();

// Restaurar desde minimizado
panelRef.restore();

// Verificar estado
if (panelRef.isMinimized) {
  console.log('El panel está minimizado');
}

// Suscribirse a cambios de estado
panelRef.stateChanged().subscribe(state => {
  console.log('Nuevo estado:', state); // 'open', 'minimized', 'closing', etc.
});
```

**Caso de uso típico:**
```typescript
// Chat o asistente que el usuario puede minimizar para seguir trabajando
slidePanelService.open(AssistantComponent, {
  title: 'Asistente IA',
  position: 'right',
  size: 'sm',
  minimizable: true,
  closeOnBackdropClick: false, // No cerrar accidentalmente
  closeOnEscape: false
});
```

**Posiciones de Pestañas:**
- **Right**: Pestañas verticales centradas en el borde derecho, icono apunta hacia la izquierda
- **Left**: Pestañas verticales centradas en el borde izquierdo, icono apunta hacia la derecha  
- **Top**: Pestañas horizontales centradas en el borde superior, icono apunta hacia abajo
- **Bottom**: Pestañas horizontales centradas en el borde inferior, icono apunta hacia arriba

**Estilos de Pestañas:**
```scss
.slidepanel-tab-button {
  padding: var(--spacing-sm);
  background: var(--surface-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--box-shadow-sm);
  opacity: 0.8;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    box-shadow: var(--box-shadow-md);
  }
}
```

### Múltiples Panels

```typescript
// Abrir múltiples panels
slidePanelService.open(Panel1Component, {
  position: 'right',
  allowMultiple: true,
  zIndex: 1000
});

slidePanelService.open(Panel2Component, {
  position: 'left',
  allowMultiple: true,
  zIndex: 1001
});

// Cerrar todos
slidePanelService.closeAll();
```

### Templates Personalizados

```html
<!-- En tu componente -->
<ng-template #customHeader>
  <div class="custom-header">
    <img src="logo.png" />
    <h2>Mi Header Custom</h2>
    <button (click)="panelRef.close()">×</button>
  </div>
</ng-template>

<ng-template #customFooter>
  <div class="custom-footer">
    <button (click)="save()">Guardar</button>
    <button (click)="panelRef.close()">Cancelar</button>
  </div>
</ng-template>

<button (click)="openWithTemplates()">Abrir</button>
```

```typescript
@ViewChild('customHeader') customHeader!: TemplateRef<any>;
@ViewChild('customFooter') customFooter!: TemplateRef<any>;

openWithTemplates(): void {
  this.slidePanelService.open(MyComponent, {
    headerTemplate: this.customHeader,
    footerTemplate: this.customFooter
  });
}
```

### Auto-focus Específico

```typescript
// Auto-focus al primer elemento
slidePanelService.open(MyComponent, {
  autoFocus: true
});

// Sin auto-focus
slidePanelService.open(MyComponent, {
  autoFocus: false
});

// Focus en elemento específico
slidePanelService.open(MyComponent, {
  autoFocus: '#username-input' // Selector CSS
});
```

### Escuchar Eventos

```typescript
const panelRef = slidePanelService.open(MyComponent);

// Después de abrir
panelRef.afterOpened().subscribe(() => {
  console.log('Panel abierto completamente');
});

// Después de cerrar
panelRef.afterClosed().subscribe(result => {
  console.log('Panel cerrado con resultado:', result);
});

// Clicks en backdrop
panelRef.backdropClick().subscribe(event => {
  console.log('Click en backdrop');
});

// Eventos de teclado
panelRef.keydownEvents().subscribe(event => {
  console.log('Tecla presionada:', event.key);
});

// Cuando se previene el cierre
panelRef.closePrevented().subscribe(() => {
  console.log('Cierre cancelado por preventClose');
});

// Cambios de estado
panelRef.stateChanged().subscribe(state => {
  console.log('Nuevo estado:', state);
});
```

### Minimizar/Restaurar

```typescript
const panelRef = slidePanelService.open(MyComponent, {
  minimizable: true
});

// Minimizar
panelRef.minimize();

// Restaurar
panelRef.restore();

// Verificar estado
console.log(panelRef.isMinimized); // true/false
```

### Cerrar al Cambiar de Ruta

```typescript
slidePanelService.open(MyComponent, {
  closeOnRouteChange: true
});
```

### Control del Stack

```typescript
// Obtener panel por ID
const panelItem = slidePanelService.getPanel('my-panel-id');

// Obtener todos los panels
const allPanels = slidePanelService.getAllPanels();

// Número de panels abiertos
const count = slidePanelService.openPanelsCount;
```

## Estilos y Theming

El componente usa variables CSS para theming:

```css
:root {
  /* Colores */
  --slidepanel-bg: var(--surface-primary);
  --slidepanel-header-bg: var(--surface-primary);
  --slidepanel-content-bg: var(--surface-primary);
  --slidepanel-footer-bg: var(--surface-secondary);
  
  /* Espaciado */
  --slidepanel-header-padding: 1.5rem;
  --slidepanel-content-padding: 1.5rem;
  --slidepanel-footer-padding: 1.5rem;
  
  /* Tipografía */
  --slidepanel-title-size: 1.25rem;
  --slidepanel-title-weight: 600;
  
  /* Sombras */
  --slidepanel-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}
```

### Clases Custom

```typescript
slidePanelService.open(MyComponent, {
  panelClass: 'my-custom-panel',
  backdropClass: 'my-custom-backdrop'
});
```

```scss
.my-custom-panel {
  border-left: 4px solid var(--primary-color);
}

::ng-deep .my-custom-backdrop {
  background: rgba(0, 0, 255, 0.3);
}
```

## Accesibilidad

El componente implementa:

- **Focus Trap**: El foco queda atrapado dentro del panel
- **Focus Restore**: Al cerrar, restaura el foco al elemento que abrió el panel
- **ARIA Labels**: `role="dialog"`, `aria-label`, `aria-describedby`, `aria-modal`
- **Keyboard**: Cierre con Escape (configurable)
- **Screen Readers**: Anuncia la apertura del panel

```typescript
slidePanelService.open(MyComponent, {
  ariaLabel: 'Diálogo de configuración',
  ariaDescribedBy: 'config-description'
});
```

## Performance

- **Lazy Loading**: Los componentes se cargan solo al abrir el panel (configurable)
- **Change Detection**: OnPush para rendimiento óptimo
- **Animaciones**: GPU-accelerated transforms
- **Disposal**: Limpieza automática de recursos al cerrar

## Mejores Prácticas

1. **Usa `allowMultiple: false`** para evitar demasiados panels abiertos
2. **Implementa `preventClose`** en formularios con cambios sin guardar
3. **Usa `mobileFullScreen: true`** para mejor UX en móvil
4. **Maneja siempre `afterClosed()`** para limpiar state
5. **Usa tamaños predefinidos** en lugar de custom cuando sea posible
6. **Implementa `ariaLabel`** para accesibilidad
7. **Usa `closeOnRouteChange: true`** en contexts de navegación

## Content Directive

La directiva `SlidePanelContentDirective` permite marcar templates como contenido específico para SlidePanels:

### Uso Básico

```html
<!-- Marcar un template para identificarlo -->
<ng-template nuiSlidePanelContent>
  <div class="panel-content">
    <p>Contenido del panel</p>
  </div>
</ng-template>

<!-- Con nombre para identificación -->
<ng-template nuiSlidePanelContent="userForm">
  <form>...</form>
</ng-template>
```

### Obtener Referencia al Template

```typescript
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { SlidePanelContentDirective } from '@shared/components/slidepanel';

@Component({
  template: `
    <ng-template nuiSlidePanelContent #panelContent>
      <div>Contenido dinámico: {{ data }}</div>
    </ng-template>
    
    <button (click)="openWithTemplate()">Abrir Panel</button>
  `
})
export class MyComponent {
  @ViewChild(SlidePanelContentDirective, { read: TemplateRef })
  panelTemplate!: TemplateRef<any>;
  
  data = 'Hola desde el template';
  
  openWithTemplate() {
    // El template está listo para ser usado
    // (requeriría extensión del servicio para soportar TemplateRef)
    console.log('Template disponible:', this.panelTemplate);
  }
}
```

### Ventajas

- **Claridad**: Marca explícitamente templates destinados a panels
- **Reutilización**: Define templates una vez, úsalos múltiples veces
- **Type Safety**: Tipado correcto con ViewChild/ContentChild
- **Organización**: Separa templates de lógica de componente

### Casos de Uso

- Templates de confirmación reutilizables
- Formularios complejos que se usan en múltiples lugares
- Contenido condicional según contexto
- Múltiples variantes de contenido para el mismo tipo de panel

## Testing

```typescript
describe('SlidePanelService', () => {
  let service: SlidePanelService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [SlidePanelService]
    });
    service = TestBed.inject(SlidePanelService);
  });

  it('should open a panel', () => {
    const panelRef = service.open(TestComponent);
    expect(panelRef).toBeDefined();
    expect(service.openPanelsCount).toBe(1);
  });

  it('should close panel', fakeAsync(() => {
    const panelRef = service.open(TestComponent);
    panelRef.close();
    tick(300); // Esperar animación
    expect(service.openPanelsCount).toBe(0);
  }));
});
```

## Notas Técnicas

- **CDK Overlay**: Usa `@angular/cdk/overlay` para gestión del overlay
- **CDK A11y**: Usa `@angular/cdk/a11y` para focus trap
- **Portal Pattern**: Componentes dinámicos con `ComponentPortal`
- **Injection Tokens**: `SLIDEPANEL_DATA` y `SLIDEPANEL_REF` para inyección
- **RxJS**: Observables para todos los eventos
- **Animations**: Angular Animations API con transforms
- **Signals**: Computed signals para optimización de performance
- **Accessibility**: ARIA attributes con aria-labelledby para títulos

## Footers

El SlidePanel ofrece **tres formas** de agregar footers a tus panels, cada una con diferentes niveles de flexibilidad y control. Esta sección te ayudará a elegir el método más adecuado para tu caso de uso.

### Tabla de Contenidos - Footers

- [Métodos Disponibles](#métodos-disponibles)
- [1. Custom Buttons (Configuración)](#1-custom-buttons-configuración)
- [2. Footer Template (Configuración)](#2-footer-template-configuración)
- [3. Actions Service (Recomendado)](#3-actions-service-recomendado)
- [4. Footer Directive (Control Total)](#4-footer-directive-control-total)
- [Precedencia de Footers](#precedencia-de-footers)
- [Comparación de Métodos](#comparación-de-métodos-1)
- [Best Practices - Footers](#best-practices-footers)

---

### Métodos Disponibles

| Método | Complejidad | Flexibilidad | Auto-contenido | Mejor para |
|--------|-------------|--------------|----------------|------------|
| **Custom Buttons** | ⭐ Baja | Media | ⭐ ✅ | **Botones programáticos** ⭐ |
| **Template Config** | Media | Media | ❌ | Footers compartidos |
| **Actions Service** | ⭐ Baja | Baja | ⭐ ✅ | **Formularios en hijo** ⭐ |
| **Footer Directive** | Alta | ⭐ Alta | ⭐ ✅ | Diseños personalizados |

---

### 1. Custom Buttons (Configuración)

El componente **padre** define botones programáticamente en la configuración. Los callbacks reciben el `panelRef` para control total.

#### 🎯 Cuándo usar
- ✅ Botones simples controlados desde el padre
- ✅ Lógica del footer en el componente padre
- ✅ No necesitas template personalizado
- ✅ Quieres configuración declarativa
- ✅ Necesitas acceso al panelRef en los callbacks

#### Interfaces

```typescript
interface SlidePanelCustomButton {
  text: string;                     // Texto del botón
  icon?: string;                    // Icono (Remix Icons: 'ri-save-line')
  color?: NUIColor;                 // Color del botón
  variant?: NUIVariant;             // Variante: 'solid' | 'outline' | 'ghost' | 'link'
  size?: NUISize;                   // Tamaño: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  callback: (panelRef: SlidePanelRef) => void | Promise<void>; // Función al hacer click
  disabled?: boolean;               // Estado deshabilitado
  loading?: boolean;                // Mostrar spinner de carga
  class?: string;                   // Clases CSS adicionales
}
```

#### Ejemplo Básico

```typescript
openPanel() {
  const panelRef = this.slidePanelService.open(UserFormComponent, {
    title: 'Editar Usuario',
    data: { userId: 123 },
    customButtons: [
      {
        text: 'Cancelar',
        variant: 'outline',
        color: 'secondary',
        callback: (ref) => ref.close()
      },
      {
        text: 'Guardar',
        icon: 'ri-save-line',
        variant: 'solid',
        color: 'primary',
        callback: async (ref) => {
          const data = ref.componentInstance.getData();
          await this.userService.save(data);
          ref.close({ saved: true });
        }
      }
    ]
  });
}
```

#### Ejemplo con Estilos Personalizados

```typescript
customButtons: [
  {
    text: 'Cancelar',
    variant: 'ghost',
    size: 'sm',
    callback: (ref) => ref.close()
  },
  {
    text: 'Borrador',
    icon: 'ri-draft-line',
    variant: 'outline',
    color: 'warning',
    size: 'md',
    callback: async (ref) => {
      await this.saveDraft(ref.componentInstance.getData());
      console.log('Borrador guardado');
    }
  },
  {
    text: 'Publicar',
    icon: 'ri-send-plane-fill',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    class: 'publish-btn',
    callback: async (ref) => {
      await this.publish(ref.componentInstance.getData());
      ref.close({ published: true });
    }
  }
]
```

#### Ejemplo con Estados Dinámicos

```typescript
openPanel() {
  const buttons: SlidePanelCustomButton[] = [
    {
      text: 'Cancelar',
      variant: 'outline',
      callback: (ref) => ref.close()
    },
    {
      text: 'Guardar',
      icon: 'ri-save-line',
      variant: 'solid',
      color: 'primary',
      disabled: false, // Inicialmente habilitado
      callback: async (ref) => {
        // Deshabilitar botón durante guardado
        buttons[1].loading = true;
        
        try {
          await this.save(ref.componentInstance.getData());
          ref.close({ saved: true });
        } catch (error) {
          buttons[1].loading = false;
          this.handleError(error);
        }
      }
    }
  ];

  this.slidePanelService.open(FormComponent, {
    title: 'Formulario',
    customButtons: buttons
  });
}
```

#### ✅ Ventajas
- **Programático**: Definición declarativa de botones
- **Acceso al panelRef**: Los callbacks reciben la referencia al panel
- **Styling completo**: variant, size, color, icon
- **Simple**: No requiere servicio ni directiva
- **Configuración centralizada**: Todo en un lugar

#### ❌ Desventajas
- Lógica en el padre (no auto-contenido del hijo)
- No soporta layouts complejos (solo botones)
- Menos flexible que templates personalizados

---

### 2. Footer Template (Configuración)

El componente **padre** pasa un template de footer al abrir el panel.

#### 🎯 Cuándo usar
- El padre necesita controlar las acciones
- Footer compartido entre múltiples componentes
- Lógica del footer en el componente padre

#### Ejemplo

**Componente hijo:**

```typescript
import { Component, inject } from '@angular/core';
import { SLIDEPANEL_REF, SlidePanelRef } from '@shared/components/slidepanel';

@Component({
  selector: 'app-form-panel',
  template: `
    <div class="p-4">
      <form>
        <input [(ngModel)]="name" />
      </form>
    </div>
  `
})
export class FormPanelComponent {
  private panelRef = inject<SlidePanelRef>(SLIDEPANEL_REF);
  name = '';
  
  // Métodos públicos llamados desde el footer template
  save(): void {
    this.panelRef.close({ saved: true, data: { name: this.name } });
  }
  
  cancel(): void {
    this.panelRef.close();
  }
}
```

**Componente padre:**

```typescript
import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  template: `
    <button (click)="openPanel()">Abrir</button>

    <ng-template #footer let-component="componentInstance">
      <div class="footer-actions">
        <button (click)="component.cancel()">Cancelar</button>
        <button (click)="component.save()">Guardar</button>
      </div>
    </ng-template>
  `
})
export class ParentComponent {
  @ViewChild('footer') footerTemplate!: TemplateRef<any>;
  
  openPanel() {
    this.slidePanelService.open(FormPanelComponent, {
      footerTemplate: this.footerTemplate
    });
  }
}
```

#### ✅ Ventajas
- Footer reutilizable entre componentes
- Control total desde el padre

#### ❌ Desventajas
- Acoplamiento padre-hijo
- El componente no es auto-contenido
- Más verbose

---

### 3. Actions Service (Recomendado)

El componente **hijo** registra acciones (botones) programáticamente. **Este es el método recomendado cuando el hijo controla su propio footer**.

#### 🎯 Cuándo usar
- ✅ Formularios con botones estándar (Guardar, Cancelar, Eliminar, etc.)
- ✅ No necesitas diseño personalizado del footer
- ✅ Quieres que el componente sea auto-contenido
- ✅ Necesitas estados reactivos (disabled, loading)
- ✅ Prototipado rápido

#### Interfaz

```typescript
interface SlidePanelAction {
  label: string;                    // Texto del botón
  icon?: string;                    // Icono (Remix Icons: 'ri-save-line')
  color?: NUIColor;                 // Color del botón
  variant?: NUIVariant;             // Variante: 'solid' | 'outline' | 'ghost' | 'link'
  size?: NUISize;                   // Tamaño: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  handler: () => void | Promise<void>; // Función al hacer click
  disabled?: boolean;               // Estado deshabilitado
  loading?: boolean;                // Mostrar spinner de carga
  class?: string;                   // Clases CSS adicionales
}
```

#### Métodos del Servicio

```typescript
// Registrar todas las acciones (reemplaza existentes)
register(actions: SlidePanelAction[]): void

// Agregar una acción individual
add(action: SlidePanelAction): void

// Actualizar una acción por índice
update(index: number, partial: Partial<SlidePanelAction>): void

// Limpiar todas las acciones
clear(): void

// Helpers para estados comunes
setDisabled(index: number, disabled: boolean): void
setLoading(index: number, loading: boolean): void
```

#### Ejemplo Básico


```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SlidePanelActionsService, SLIDEPANEL_REF, SlidePanelRef } from '@shared/components/slidepanel';

@Component({
  selector: 'app-user-form',
  template: `
    <form class="p-4">
      <div>
        <label>Nombre</label>
        <input [(ngModel)]="name" (input)="updateSaveButton()" />
      </div>
      <div>
        <label>Email</label>
        <input [(ngModel)]="email" (input)="updateSaveButton()" />
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  private actionsService = inject(SlidePanelActionsService);
  private panelRef = inject<SlidePanelRef>(SLIDEPANEL_REF);
  
  name = '';
  email = '';
  
  ngOnInit() {
    // Registrar las acciones del footer
    this.actionsService.register([
      {
        label: 'Cancelar',
        color: 'secondary',
        variant: 'outline',
        handler: () => this.cancel()
      },
      {
        label: 'Guardar',
        color: 'primary',
        variant: 'solid',
        icon: 'ri-save-line',
        handler: () => this.save(),
        disabled: true  // Inicialmente deshabilitado
      }
    ]);
  }
  
  updateSaveButton() {
    // Habilitar/deshabilitar el botón Guardar según validación
    const isValid = this.name.trim() && this.email.trim();
    this.actionsService.update(1, { disabled: !isValid });
  }
  
  cancel() {
    if (this.name || this.email) {
      if (confirm('¿Descartar cambios?')) {
        this.panelRef.close();
      }
    } else {
      this.panelRef.close();
    }
  }
  
  async save() {
    // Mostrar loading en el botón Guardar
    this.actionsService.setLoading(1, true);
    
    try {
      await this.userService.create({ name: this.name, email: this.email });
      this.panelRef.close({ saved: true });
    } catch (error) {
      this.actionsService.setLoading(1, false);
      alert('Error al guardar');
    }
  }
}
```

#### Ejemplo con Variant y Size

```typescript
ngOnInit() {
  this.actionsService.register([
    {
      label: 'Cancelar',
      color: 'secondary',
      variant: 'ghost',     // Estilo fantasma
      size: 'sm',          // Tamaño pequeño
      handler: () => this.cancel()
    },
    {
      label: 'Borrador',
      color: 'warning',
      variant: 'outline',  // Estilo outline
      size: 'md',
      icon: 'ri-draft-line',
      handler: () => this.saveDraft()
    },
    {
      label: 'Publicar',
      color: 'primary',
      variant: 'solid',    // Estilo sólido (default)
      size: 'md',
      icon: 'ri-send-plane-fill',
      handler: () => this.publish()
    }
  ]);
}
```

**Abrir el panel (muy simple):**

```typescript
openUserForm() {
  const ref = this.slidePanelService.open(UserFormComponent, {
    title: 'Nuevo Usuario'
  });
  
  ref.afterClosed().subscribe(result => {
    if (result?.saved) {
      this.loadUsers();
    }
  });
}
```

#### Ejemplo Avanzado - Wizard con Estados

```typescript
@Component({
  selector: 'app-wizard',
  template: `
    <div class="wizard">
      @if (step === 1) {
        <step-one [(data)]="wizardData.step1" />
      } @else if (step === 2) {
        <step-two [(data)]="wizardData.step2" />
      } @else {
        <step-three [(data)]="wizardData.step3" />
      }
    </div>
  `
})
export class WizardComponent implements OnInit {
  private actionsService = inject(SlidePanelActionsService);
  private panelRef = inject<SlidePanelRef>(SLIDEPANEL_REF);
  
  step = 1;
  wizardData = { step1: {}, step2: {}, step3: {} };
  
  ngOnInit() {
    this.updateActions();
  }
  
  updateActions() {
    const actions: SlidePanelAction[] = [];
    
    // Botón "Anterior" (solo si no es el primer paso)
    if (this.step > 1) {
      actions.push({
        label: 'Anterior',
        color: 'secondary',
        icon: 'ri-arrow-left-line',
        handler: () => {
          this.step--;
          this.updateActions();
        }
      });
    }
    
    // Botón "Cancelar" siempre presente
    actions.push({
      label: 'Cancelar',
      color: 'secondary',
      handler: () => this.panelRef.close()
    });
    
    // Botón "Siguiente" o "Finalizar"
    if (this.step < 3) {
      actions.push({
        label: 'Siguiente',
        color: 'primary',
        icon: 'ri-arrow-right-line',
        handler: () => {
          this.step++;
          this.updateActions();
        }
      });
    } else {
      actions.push({
        label: 'Finalizar',
        color: 'success',
        icon: 'ri-check-line',
        handler: () => this.finish()
      });
    }
    
    this.actionsService.register(actions);
  }
  
  async finish() {
    this.actionsService.setLoading(this.actionsService.actions.length - 1, true);
    await this.submitWizard();
    this.panelRef.close({ completed: true });
  }
}
```

#### ✅ Ventajas
- **Simple**: Solo defines un array de acciones
- **Auto-contenido**: El componente posee sus acciones
- **Reactivo**: Estados disabled/loading incluidos
- **Consistente**: Estilos automáticos
- **Testeable**: Componente funciona standalone
- **Clean**: No necesitas crear templates

#### ❌ Desventajas
- Limitado a botones (no layouts complejos)
- Estilos predefinidos (menos personalización)

---

### 3. Footer Directive (Control Total)

El componente **hijo** define su propio template de footer usando la directiva `nuiSlidePanelFooter`.

#### 🎯 Cuándo usar
- Footers con layouts complejos o personalizados
- Necesitas más que botones (badges, info, progress bars, etc.)
- Diseño específico que no sigue el estándar
- Control total sobre estilos y comportamiento

#### Ejemplo


```typescript
import { Component, inject } from '@angular/core';
import { SlidePanelFooterDirective, SLIDEPANEL_REF, SlidePanelRef } from '@shared/components/slidepanel';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [SlidePanelFooterDirective, ButtonComponent],
  template: `
    <div class="settings-content">
      <h3>Configuración</h3>
      
      <div class="options">
        <label>
          <input type="checkbox" [(ngModel)]="option1" (change)="updateFooter()" />
          Opción 1
        </label>
        <label>
          <input type="checkbox" [(ngModel)]="option2" (change)="updateFooter()" />
          Opción 2
        </label>
        <label>
          <input type="checkbox" [(ngModel)]="option3" (change)="updateFooter()" />
          Opción 3
        </label>
      </div>
    </div>

    <!-- Footer personalizado con la directiva -->
    <ng-template nuiSlidePanelFooter>
      <div class="custom-footer">
        <!-- Sección de información -->
        <div class="footer-info">
          <i class="ri-information-line"></i>
          <span>{{ selectedCount }} opción(es) seleccionada(s)</span>
          
          @if (selectedCount > 0) {
            <button class="link-button" (click)="clearAll()">
              Limpiar todo
            </button>
          }
        </div>
        
        <!-- Acciones -->
        <div class="footer-actions">
          <!-- Botón secundario alineado a la izquierda -->
          <nui-button
            [icon]="'ri-history-line'"
            [color]="'secondary'"
            [variant]="'ghost'"
            (onClick)="reset()">
            Restablecer
          </nui-button>
          
          <!-- Botones principales alineados a la derecha -->
          <div class="main-actions">
            <nui-button
              [color]="'secondary'"
              (onClick)="cancel()">
              Cancelar
            </nui-button>
            
            <nui-button
              [color]="'primary'"
              [icon]="'ri-check-line'"
              [disabled]="selectedCount === 0"
              (onClick)="apply()">
              Aplicar cambios
            </nui-button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .custom-footer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--color-gray-50);
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }
    
    .footer-info i {
      color: var(--color-primary);
    }
    
    .link-button {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--color-primary);
      cursor: pointer;
      font-weight: 500;
    }
    
    .footer-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .main-actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class SettingsPanelComponent {
  private panelRef = inject<SlidePanelRef>(SLIDEPANEL_REF);
  
  option1 = false;
  option2 = false;
  option3 = false;
  
  get selectedCount(): number {
    return [this.option1, this.option2, this.option3].filter(Boolean).length;
  }
  
  updateFooter() {
    // El template se actualiza automáticamente por cambios en selectedCount
  }
  
  clearAll() {
    this.option1 = this.option2 = this.option3 = false;
  }
  
  reset() {
    // Restaurar a valores iniciales
    this.option1 = this.option2 = this.option3 = false;
  }
  
  cancel() {
    this.panelRef.close();
  }
  
  apply() {
    this.panelRef.close({
      applied: true,
      options: {
        option1: this.option1,
        option2: this.option2,
        option3: this.option3
      }
    });
  }
}
```

**Abrir el panel:**

```typescript
openSettings() {
  this.slidePanelService.open(SettingsPanelComponent, {
    title: 'Configuración'
  });
}
```

#### ✅ Ventajas
- **Control total**: Diseño y layout completamente personalizado
- **Flexibilidad**: Cualquier contenido (no solo botones)
- **Auto-contenido**: El componente es dueño de su footer
- **Reutilizable**: Funciona dentro o fuera del panel
- **Testeable**: Componente independiente

#### ❌ Desventajas
- Más código (template + estilos)
- Debes manejar estados manualmente
- Mayor complejidad inicial

---

### Precedencia de Footers

Cuando se usan múltiples métodos simultáneamente, el SlidePanel aplica la siguiente **precedencia** (de mayor a menor prioridad):

1. **`customButtons`** (configuración) - Se renderiza primero si está presente
2. **Footer Directive** (`nuiSlidePanelFooter`) - Template del hijo
3. **Actions Service** (`SlidePanelActionsService`) - Acciones del hijo
4. **`footerTemplate`** (configuración) - Template del padre

```typescript
// Ejemplo: Si abres un panel con customButtons, se ignoran los otros métodos
slidePanelService.open(MyComponent, {
  customButtons: [/* ... */],      // ✅ Esto se usa
  footerTemplate: myTemplate       // ❌ Esto se ignora
});

// Si MyComponent tiene Footer Directive y Actions Service registradas:
// - customButtons tiene prioridad y se renderiza
// - Footer Directive y Actions Service se ignoran
```

**Recomendación**: Usa solo **un método** por panel para evitar confusión.

---

### Comparación de Métodos

| Característica | Custom Buttons | Template Config | Actions Service | Directiva |
|---------------|----------------|-----------------|-----------------|-----------|
| **Configuración** | Padre | Padre | Hijo | Hijo |
| **Complejidad** | ⭐ Baja | Media | ⭐ Baja | Alta |
| **Código necesario** | ⭐ Mínimo | Medio | ⭐ Mínimo | Alto |
| **Flexibilidad diseño** | Media | Media | Baja | ⭐ Alta |
| **Estilos** | ⭐ Built-in | Manual | ⭐ Automáticos | Manual |
| **Estados reactivos** | Manual | Manual | ⭐ Built-in | Manual |
| **Auto-contenido** | ❌ | ❌ | ⭐ ✅ | ⭐ ✅ |
| **Layouts complejos** | ❌ | Medio | ❌ | ⭐ ✅ |
| **Testeable standalone** | ❌ | ❌ | ⭐ ✅ | ⭐ ✅ |
| **Acceso panelRef** | ⭐ ✅ | ✅ | ✅ | ✅ |
| **Styling (variant/size)** | ⭐ ✅ | Manual | ⭐ ✅ | Manual |
| **Mejor para** | Botones desde padre | Footers compartidos | Formularios en hijo | Diseños custom |

#### ¿Cuál usar?

**Usa Custom Buttons si:**
- ✅ El padre controla la lógica del footer
- ✅ Necesitas botones simples con styling (variant/size)
- ✅ Quieres acceso al panelRef en callbacks
- ✅ Configuración declarativa

**Usa Actions Service si:**
- ✅ El hijo controla su propio footer
- ✅ Tu footer tiene 2-4 botones estándar
- ✅ No necesitas layout personalizado
- ✅ Quieres código mínimo
- ✅ Necesitas disabled/loading automáticos

**Usa Footer Directive si:**
- ✅ Necesitas layout complejo (no solo botones)
- ✅ Quieres información adicional en el footer
- ✅ Necesitas control total sobre estilos
- ✅ Elementos interactivos no estándar

**Usa Template Config si:**
- ✅ El padre controla múltiples componentes con el mismo footer
- ✅ Footer compartido y reutilizable entre panels
- ✅ Template más complejo que solo botones

---

### Best Practices - Footers

#### 1. Validación de Formularios

```typescript
ngOnInit() {
  this.actionsService.register([
    { label: 'Cancelar', color: 'secondary', handler: () => this.cancel() },
    { 
      label: 'Guardar', 
      color: 'primary',
      handler: () => this.save(),
      disabled: true // Inicialmente deshabilitado
    }
  ]);
}

onFormChange() {
  const isValid = this.form.valid;
  this.actionsService.update(1, { disabled: !isValid });
}
```

#### 2. Confirmación antes de Cancelar

```typescript
cancel() {
  if (this.form.dirty) {
    if (confirm('¿Descartar cambios sin guardar?')) {
      this.panelRef.close();
    }
  } else {
    this.panelRef.close();
  }
}
```

#### 3. Loading States durante Guardado

```typescript
async save() {
  // Deshabilitar ambos botones durante el guardado
  this.actionsService.setDisabled(0, true); // Cancelar
  this.actionsService.setLoading(1, true);  // Guardar (con spinner)
  
  try {
    await this.apiService.save(this.data);
    this.panelRef.close({ saved: true });
  } catch (error) {
    // Re-habilitar en caso de error
    this.actionsService.setDisabled(0, false);
    this.actionsService.setLoading(1, false);
    this.handleError(error);
  }
}
```

#### 4. Acciones Múltiples

```typescript
ngOnInit() {
  this.actionsService.register([
    { label: 'Cancelar', color: 'secondary', handler: () => this.cancel() },
    { label: 'Guardar borrador', color: 'warning', handler: () => this.saveDraft() },
    { label: 'Publicar', color: 'primary', icon: 'ri-send-plane-line', handler: () => this.publish() }
  ]);
}
```

#### 5. Footer Sticky con Scroll

El footer siempre es sticky automáticamente. Si tienes contenido largo:

```typescript
@Component({
  template: `
    <div class="panel-content">
      <!-- Contenido largo que hace scroll -->
      <div *ngFor="let item of longList">
        {{ item }}
      </div>
    </div>
    
    <!-- El footer siempre visible -->
    <ng-template nuiSlidePanelFooter>
      <div>Footer siempre visible</div>
    </ng-template>
  `
})
```

#### 6. Estilos Personalizados en Actions

```typescript
this.actionsService.register([
  {
    label: 'Eliminar',
    color: 'danger',
    icon: 'ri-delete-bin-line',
    class: 'custom-delete-btn',
    handler: () => this.delete()
  }
]);
```

```scss
::ng-deep .custom-delete-btn {
  min-width: 120px;
  font-weight: 600;
}
```

---

### Resumen - Footers

**4 métodos disponibles** con precedencia (de mayor a menor):
1. **customButtons** (config) - Botones programáticos desde padre
2. **nuiSlidePanelFooter** (directiva) - Template personalizado del hijo
3. **Actions Service** - Acciones programáticas del hijo
4. **footerTemplate** (config) - Template desde padre

**Recomendaciones:**
- **Custom Buttons**: Botones simples controlados desde el padre con styling
- **Actions Service**: Formularios en el hijo (recomendado para 80% de casos)
- **Footer Directive**: Layouts complejos con diseño personalizado
- **Template Config**: Footers compartidos entre múltiples componentes

**Características clave:**
- Footers son siempre **sticky** (visibles con scroll)
- Soporte para **variant** y **size** en Custom Buttons y Actions Service
- **Estados reactivos** (disabled, loading) en Actions y Custom Buttons
- Mantén componentes **auto-contenidos** cuando sea posible

¿Dudas? Consulta los ejemplos completos en la sección de test del proyecto.



## Roadmap

- [ ] Drag to close (arrastrar para cerrar)
- [ ] Resizable panels (redimensionar con mouse)
- [ ] Persistent state (guardar estado en localStorage)
- [ ] Keyboard shortcuts (atajos de teclado custom)
- [ ] Panel groups (agrupar panels relacionados)
- [ ] Nested panels (panels dentro de panels)
- [ ] Template support en servicio (abrir panels con TemplateRef)

