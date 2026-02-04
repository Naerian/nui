# SidebarPanel Component

Panel deslizante que se abre desde los bordes de la pantalla usando Angular CDK Overlay. Ideal para mostrar formularios, información adicional, o cualquier contenido sin abandonar el contexto actual.

## Características

- ✅ **Posiciones**: Derecha, izquierda, arriba, abajo
- ✅ **Tamaños**: Predefinidos (xs, sm, md, lg, xl, full) o custom
- ✅ **Componentes Dinámicos**: Carga cualquier componente con inyección de datos
- ✅ **Contenido Flexible**: HTML strings o Angular templates sin componente
- ✅ **Backdrop**: Configurable con click para cerrar
- ✅ **Accesibilidad**: Focus trap, ARIA labels, restauración de focus
- ✅ **Animaciones**: Transiciones suaves con Angular Animations
- ✅ **Múltiples Panels**: Soporta varios panels abiertos simultáneamente
- ✅ **Responsive**: Fullscreen automático en móvil (opcional)
- ✅ **Prevención de Cierre**: Confirmar antes de cerrar
- ✅ **Eventos**: Observables para opened, closed, backdrop click, keyboard
- ✅ **Templates**: Header y footer personalizables
- ✅ **Minimizable**: Reduce el panel a una pestaña lateral para liberar espacio
- ✅ **Restauración Inteligente**: Comportamiento singleton con ID obligatorio para panels minimizables

## Instalación

El componente usa Angular CDK Overlay y A11y:

```bash
npm install @angular/cdk
```

## Uso Básico

### 1. Importar el Servicio

```typescript
import { Component, inject } from '@angular/core';
import { SidebarPanelService } from '@shared/components/sidebar-panel/sidebar-panel.service';
import { MyPanelComponent } from './my-panel.component';

@Component({
  selector: 'app-my-feature',
  template: `
    <button (click)="openPanel()">Abrir Panel</button>
  `
})
export class MyFeatureComponent {
  private sidebarPanelService = inject(SidebarPanelService);

  openPanel(): void {
    const panelRef = this.sidebarPanelService.open(MyPanelComponent, {
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
import { SIDEBAR_PANEL_DATA, SIDEBAR_PANEL_REF } from '@shared/components/sidebar-panel/sidebar-panel.service';
import { SidebarPanelRef } from '@shared/components/sidebar-panel/sidebar-panel-ref';

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
  readonly data = inject(SIDEBAR_PANEL_DATA);
  readonly panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);

  confirm(): void {
    this.panelRef.close({ confirmed: true });
  }

  cancel(): void {
    this.panelRef.close({ confirmed: false });
  }
}
```

## API

### SidebarPanelService

#### Métodos

| Método | Descripción | Retorno |
|--------|-------------|---------|
| `open<T>(component, config?)` | Abre un panel con el componente especificado | `SidebarPanelRef<T>` |
| `open<D, R>(config)` | Abre un panel con contenido flexible (HTML o template) | `SidebarPanelRef<any, R>` |
| `close(id)` | Cierra el panel con el ID especificado | `void` |
| `closeAll()` | Cierra todos los panels abiertos | `void` |
| `getPanel(id)` | Obtiene el stack item de un panel | `SidebarPanelStackItem \| undefined` |
| `getAllPanels()` | Obtiene todos los panels abiertos | `SidebarPanelStackItem[]` |

#### Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `openPanelsCount` | `number` | Número de panels abiertos actualmente |

### SidebarPanelConfig

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
| `minimizable` | `boolean` | `false` | Panel minimizable con botón en header. **Requiere `id` obligatorio** |
| `id` | `string` | Auto | ID único del panel. **Obligatorio si `minimizable: true`** |
| `customButtons` | `SidebarPanelCustomButton[]` | - | Botones programáticos para el footer |
| `contentTemplate` | `TemplateRef<any>` | - | Template de Angular para contenido flexible |
| `htmlContent` | `string` | - | HTML string para contenido simple |
| `templateContext` | `any` | - | Contexto de datos para el template |
| `zIndex` | `number` | `1000` | Z-index base |
| `allowMultiple` | `boolean` | `false` | Permitir múltiples panels |
| `lazyLoad` | `boolean` | `true` | Carga lazy del componente |

### Tamaños Predefinidos

```typescript
const SIDEBAR_PANEL_MAP = {
  xs: '300px',
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  full: '100%'
};
```

### SidebarPanelRef

Referencia al panel abierto:

#### Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `id` | `string` | ID único del panel |
| `componentInstance` | `T` | Instancia del componente cargado |
| `config` | `SidebarPanelConfig` | Configuración del panel |
| `state` | `SidebarPanelState` | Estado actual |
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
| `stateChanged()` | Observable de cambios de estado | `Observable<SidebarPanelState>` |

## Ejemplos

### Contenido Flexible (Sin Componente)

El SidebarPanel soporta tres formas de mostrar contenido:

#### 1. Con Componente (Tradicional)

```typescript
const ref = this.sidebarPanelService.open(MyComponent, {
  title: 'My Panel',
  data: { userId: 123 }
});
```

#### 2. Con HTML String

Ideal para notificaciones simples o contenido estático:

```typescript
this.sidebarPanelService.open({
  title: 'Operation Successful',
  position: 'right',
  size: 'sm',
  htmlContent: `
    <div style="padding: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <i class="ri-check-circle-fill" style="font-size: 2rem; color: green;"></i>
        <div>
          <h3>Success!</h3>
          <p>Your changes have been saved.</p>
        </div>
      </div>
    </div>
  `
});
```

**Generación Dinámica:**

```typescript
const items = [
  { id: 1, name: 'Task Alpha', status: 'Completed' },
  { id: 2, name: 'Task Beta', status: 'In Progress' }
];

const htmlContent = `
  <div style="padding: 1rem;">
    <h3>Task Report</h3>
    <table style="width: 100%;">
      ${items.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.status}</td>
        </tr>
      `).join('')}
    </table>
  </div>
`;

this.sidebarPanelService.open({
  title: 'Report',
  htmlContent
});
```

#### 3. Con Angular Template

Ideal para contenido dinámico con datos y funciones:

```typescript
import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <!-- Define template con let-variables -->
    <ng-template #userDetailsTemplate 
      let-user="user" 
      let-onRefresh="onRefresh"
      let-onLogout="onLogout">
      <div style="padding: 1.5rem;">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Role: {{ user.role }}</p>
        <button (click)="onRefresh()">Refresh</button>
        <button (click)="onLogout()">Logout</button>
      </div>
    </ng-template>

    <button (click)="openPanel()">Open Panel</button>
  `
})
export class MyComponent {
  @ViewChild('userDetailsTemplate') 
  userDetailsTemplate!: TemplateRef<any>;

  currentUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator'
  };

  openPanel() {
    this.sidebarPanelService.open({
      title: 'User Profile',
      position: 'right',
      size: 'md',
      contentTemplate: this.userDetailsTemplate,
      templateContext: {
        user: this.currentUser,
        onRefresh: () => this.refreshUser(),
        onLogout: () => this.logout()
      }
    });
  }

  refreshUser() {
    console.log('Refreshing user data...');
    // Actualizar datos
  }

  logout() {
    console.log('Logging out...');
    // Cerrar sesión
  }
}
```

**Comparación de Métodos:**

| Método | Cuándo Usar | Ventajas | Limitaciones |
|--------|-------------|----------|--------------|
| **Componente** | Funcionalidad compleja, lógica de negocio | Completo, tipado, testeable | Requiere crear archivo |
| **htmlContent** | Notificaciones, mensajes simples | Rápido, directo, sin archivos | Estático, sin interactividad |
| **contentTemplate** | Contenido dinámico, interacción moderada | Reactivo, reutilizable, datos variables | Requiere acceso al TemplateRef |

### Diferentes Posiciones

```typescript
// Derecha (default)
sidebarPanelService.open(MyComponent, {
  position: 'right'
});

// Izquierda
sidebarPanelService.open(MyComponent, {
  position: 'left'
});

// Arriba
sidebarPanelService.open(MyComponent, {
  position: 'top'
});

// Abajo
sidebarPanelService.open(MyComponent, {
  position: 'bottom'
});
```

### Diferentes Tamaños

```typescript
// Tamaño predefinido
sidebarPanelService.open(MyComponent, {
  size: 'lg'
});

// Ancho custom
sidebarPanelService.open(MyComponent, {
  position: 'right',
  width: '500px'
});

// Alto custom
sidebarPanelService.open(MyComponent, {
  position: 'bottom',
  height: '400px'
});

// Con máximos
sidebarPanelService.open(MyComponent, {
  width: '80%',
  maxWidth: '1200px'
});
```

### Inyección de Datos

```typescript
// En el componente que abre el panel
sidebarPanelService.open(UserFormComponent, {
  data: {
    userId: 123,
    name: 'Juan',
    email: 'juan@example.com',
    mode: 'edit'
  }
});

// En UserFormComponent
export class UserFormComponent {
  readonly data = inject(SIDEBAR_PANEL_DATA);

  ngOnInit(): void {
    console.log(this.data.userId); // 123
    console.log(this.data.mode); // 'edit'
  }
}
```

### Manejar Resultados

```typescript
const panelRef = sidebarPanelService.open(ConfirmDialogComponent, {
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

### Comunicación con Eventos @Output()

Los componentes dinámicos pueden emitir eventos `@Output()` que son capturados directamente a través de `panelRef.componentInstance`. Esto permite **comunicación bidireccional en tiempo real** entre el panel y el componente padre.

#### Flujo de Comunicación

```
PADRE → service.open() → SERVICIO → crea componente → COMPONENTE DINÁMICO
  ↑                                                            ↓
  └─── componentInstance.event.subscribe() ←─── @Output() emite
```

#### Implementación Básica

**1. Componente Dinámico (dentro del panel):**

```typescript
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SIDEBAR_PANEL_REF } from '@shared/components/sidebar-panel';

@Component({
  selector: 'app-form-panel',
  template: `
    <div class="form-content">
      <input [(ngModel)]="value" (ngModelChange)="onValueChange($event)" />
      <button (click)="save()">Guardar</button>
    </div>
  `
})
export class FormPanelComponent {
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);
  
  value = '';
  
  // Eventos @Output() que pueden ser capturados
  @Output() formChanged = new EventEmitter<string>();
  @Output() beforeSave = new EventEmitter<string>();
  
  onValueChange(newValue: string): void {
    // Emite eventos en tiempo real
    this.formChanged.emit(newValue);
  }
  
  save(): void {
    this.beforeSave.emit(this.value);
    this.panelRef.close({ saved: true, value: this.value });
  }
}
```

**2. Componente Padre (captura eventos):**

```typescript
openFormPanel(): void {
  const panelRef = this.sidebarPanelService.open(FormPanelComponent, {
    title: 'Editar Formulario',
    position: 'right',
    size: 'md'
  });
  
  // Acceder a la instancia del componente dinámico
  const instance = panelRef.componentInstance;
  
  if (instance) {
    // Suscribirse a eventos @Output() en tiempo real
    instance.formChanged.subscribe(value => {
      console.log('Valor cambió:', value);
      this.updatePreview(value); // Actualizar preview externo
    });
    
    instance.beforeSave.subscribe(value => {
      console.log('A punto de guardar:', value);
      this.validateBeforeSave(value);
    });
  }
  
  // Capturar resultado final al cerrar
  panelRef.afterClosed().subscribe(result => {
    if (result?.saved) {
      console.log('Guardado exitoso:', result.value);
    }
  });
}
```

#### Patrones Comunes

**Patrón 1: Feedback en Tiempo Real**

```typescript
// Componente dinámico
@Output() statusChanged = new EventEmitter<{ status: string; message: string }>();

updateStatus(status: string): void {
  this.statusChanged.emit({ 
    status, 
    message: `Estado actualizado a ${status}` 
  });
}

// Padre
instance.statusChanged.subscribe(({ status, message }) => {
  this.notificationService.show(message);
  this.updateStatusIndicator(status);
});
```

**Patrón 2: Progreso de Operaciones**

```typescript
// Componente dinámico
@Output() progressChanged = new EventEmitter<number>();

async uploadFiles(): Promise<void> {
  for (let i = 0; i <= 100; i += 10) {
    await this.processChunk(i);
    this.progressChanged.emit(i);
  }
}

// Padre
instance.progressChanged.subscribe(progress => {
  this.progressBar.value = progress;
  console.log(`Progreso: ${progress}%`);
});
```

**Patrón 3: Validación Previa al Cierre**

```typescript
// Componente dinámico
@Output() beforeClose = new EventEmitter<boolean>();

async requestClose(): Promise<void> {
  const canClose = await this.checkUnsavedChanges();
  this.beforeClose.emit(canClose);
  
  if (canClose) {
    this.panelRef.close();
  }
}

// Padre
instance.beforeClose.subscribe(canClose => {
  if (!canClose) {
    this.showUnsavedChangesWarning();
  }
});
```

#### Características Clave

**✅ componentInstance siempre disponible**

```typescript
const panelRef = service.open(MyComponent);
console.log(panelRef.componentInstance); // Instancia de MyComponent
```

**✅ Múltiples eventos simultáneos**

```typescript
if (instance) {
  instance.dataChanged.subscribe(data => { /* ... */ });
  instance.statusChanged.subscribe(status => { /* ... */ });
  instance.progressChanged.subscribe(progress => { /* ... */ });
}
```

**✅ TypeScript Type Safety**

```typescript
const panelRef = service.open<FormPanelComponent, any, SaveResult>(
  FormPanelComponent,
  { /* config */ }
);

// componentInstance tiene el tipo correcto
panelRef.componentInstance?.formChanged.subscribe(/* ... */);
//                        ^? FormPanelComponent | null
```

**✅ Combinación con afterClosed()**

```typescript
// Eventos en tiempo real durante la vida del panel
instance.formChanged.subscribe(data => {
  console.log('Cambio inmediato:', data);
});

// Resultado final al cerrar
panelRef.afterClosed().subscribe(result => {
  console.log('Resultado final:', result);
});
```

#### Consideraciones

| Aspecto | @Output() Events | afterClosed() |
|---------|------------------|---------------|
| **Momento** | Durante la vida del panel | Solo al cerrar |
| **Frecuencia** | Múltiples veces | Una vez |
| **Uso típico** | Feedback en tiempo real | Resultado final |
| **Ejemplo** | formChanged, progressChanged | saveResult, userAction |

**Nota sobre limpieza**: Las suscripciones a eventos `@Output()` se limpian automáticamente cuando el componente se destruye. Si necesitas control manual:

```typescript
const subscription = instance.myEvent.subscribe(/* ... */);

panelRef.afterClosed().subscribe(() => {
  subscription.unsubscribe(); // Limpieza manual si es necesario
});
```

#### Casos de Uso Ideales

- ✅ **Formularios con preview**: Actualizar vista previa mientras el usuario escribe
- ✅ **Estados de progreso**: Mostrar barra de progreso de operaciones largas
- ✅ **Validaciones en tiempo real**: Validar datos conforme se ingresan
- ✅ **Confirmaciones dinámicas**: Solicitar confirmación antes de cerrar
- ✅ **Sincronización de estados**: Mantener estado sincronizado entre panel y padre

### Prevenir Cierre

```typescript
sidebarPanelService.open(FormComponent, {
  preventClose: () => {
    if (formHasUnsavedChanges()) {
      return confirm('Tienes cambios sin guardar. ¿Cerrar de todos modos?');
    }
    return true;
  }
});

// Con async
sidebarPanelService.open(FormComponent, {
  preventClose: async () => {
    const response = await showConfirmDialog();
    return response.confirmed;
  }
});
```

### Sin Backdrop

```typescript
sidebarPanelService.open(MyComponent, {
  hasBackdrop: false
});
```

### Backdrop sin Cerrar

```typescript
sidebarPanelService.open(MyComponent, {
  hasBackdrop: true,
  closeOnBackdropClick: false
});
```

### Mobile Fullscreen

```typescript
sidebarPanelService.open(MyComponent, {
  mobileFullScreen: true,
  breakpoint: 768 // En pantallas < 768px será fullscreen
});
```

### Panel Minimizable

Permite minimizar el panel a una pestaña lateral para liberar espacio en pantalla sin perder el contexto.

**⚠️ Requisito importante:** Cuando `minimizable: true`, el `id` es **OBLIGATORIO**. Esto garantiza que cada panel minimizable tenga una identidad única y permite el comportamiento de restauración inteligente.

```typescript
// ✅ CORRECTO - Con ID obligatorio
const panelRef = sidebarPanelService.open(ChatComponent, {
  id: 'chat-support',        // ID único OBLIGATORIO
  title: 'Chat de Soporte',
  position: 'right',
  size: 'md',
  minimizable: true
});

// ❌ ERROR - TypeScript no compilará
const panelRef = sidebarPanelService.open(ChatComponent, {
  title: 'Chat de Soporte',
  minimizable: true  // Error: Property 'id' is required when minimizable is true
});
```

**Comportamiento Singleton:**

Cada `id` actúa como identificador único del panel. Si intentas abrir un panel con el mismo `id` que ya está minimizado, **se restaurará el existente** en lugar de crear uno nuevo:

```typescript
// Primera vez: crea el panel
sidebarPanelService.open(ChatComponent, {
  id: 'chat-support',
  minimizable: true,
  title: 'Chat'
});

// Usuario minimiza el panel...

// Segunda vez con el mismo ID: restaura el panel existente
sidebarPanelService.open(ChatComponent, {
  id: 'chat-support',  // Mismo ID → restaura en lugar de crear nuevo
  minimizable: true,
  title: 'Chat'
});
```

**Cuándo usar cada estrategia:**

```typescript
// Caso 1: Panel único reutilizable (RECOMENDADO para minimizables)
sidebarPanelService.open(UserProfileComponent, {
  id: 'user-profile',        // Siempre el mismo panel
  minimizable: true,
  title: 'Perfil de Usuario'
});
// → Comportamiento: Si ya está minimizado, lo restaura
// → Ideal para: Chat, Perfil, Configuración, Notificaciones

// Caso 2: Múltiples instancias del mismo tipo
sidebarPanelService.open(ProductDetailComponent, {
  id: `product-${productId}`, // ID dinámico basado en datos
  minimizable: true,
  title: `Producto ${productName}`,
  data: { productId }
});
// → Comportamiento: Cada producto tiene su propio panel
// → Ideal para: Detalles de entidades, Múltiples documentos

// Caso 3: Panel no minimizable (ID opcional)
sidebarPanelService.open(QuickActionsComponent, {
  // Sin id necesario
  minimizable: false,
  title: 'Acciones Rápidas'
});
// → Comportamiento: Cierra el anterior si ya hay uno abierto
// → Ideal para: Formularios simples, Confirmaciones
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
- 🎯 **Inyección dinámica**: `SidebarPanelTabsService` crea el componente `<nui-sidebar-panel-tabs>` dinámicamente
- 🧹 **Auto-destrucción**: El componente se destruye automáticamente cuando no hay pestañas minimizadas
- 📍 **Sistema centralizado**: `SidebarPanelTabsService` gestiona todas las pestañas globalmente
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
sidebarPanelService.open(AssistantComponent, {
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
.sidebar-panel-tab-button {
  padding: var(--nui-spacing-sm);
  background: var(--surface-primary);
  border: 1px solid var(--nui-border-primary);
  box-shadow: var(--nui-box-shadow--sm);
  opacity: 0.8;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    box-shadow: var(--nui-box-shadow--md);
  }
}
```

### Customización de Pestañas Minimizadas

Personaliza completamente la apariencia de las pestañas minimizadas mediante la propiedad `minimizedTabCustomization`. Puedes cambiar el icono, agregar texto, aplicar CSS personalizado o incluso usar un template completamente custom.

#### Interface MinimizedTabCustomization

```typescript
interface MinimizedTabCustomization {
  /**
   * Icono personalizado (clase de Remix Icon)
   * Reemplaza el icono de flecha por defecto
   * @example 'ri-phone-line', 'ri-chat-3-line', 'ri-customer-service-line'
   */
  icon?: string;

  /**
   * Texto personalizado para mostrar junto al icono
   * Si no se proporciona, solo muestra el icono
   */
  label?: string;

  /**
   * Clase(s) CSS para personalizar el botón
   * Permite posicionamiento y estilos custom
   * @example 'floating-chat', 'bottom-right-button', ['custom', 'rounded']
   */
  cssClass?: string | string[];

  /**
   * Template completamente personalizado
   * Si se proporciona, sobrescribe todo el contenido
   * (icon, label y cssClass se ignoran)
   */
  template?: TemplateRef<any>;

  /**
   * Modo standalone: renderiza fuera del contenedor agrupado
   * 
   * Por defecto (false), las pestañas se agrupan en contenedores fijos:
   * - Right: Agrupadas verticalmente en el borde derecho
   * - Left: Agrupadas verticalmente en el borde izquierdo
   * - Top: Agrupadas horizontalmente en el borde superior
   * - Bottom: Agrupadas horizontalmente en el borde inferior
   * 
   * Con standalone: true:
   * - La pestaña se renderiza en un contenedor independiente
   * - Permite posicionamiento CSS completamente libre
   * - Ideal para botones flotantes (chat, ayuda, soporte)
   * - No está limitada por el transform del contenedor padre
   * 
   * @default false
   */
  standalone?: boolean;
}
```

#### Ejemplo 1: Icono y Label Personalizados

Cambia el icono de flecha por uno más descriptivo y agrega texto:

```typescript
sidebarPanelService.open(ChatComponent, {
  id: 'chat-support',
  title: 'Chat de Soporte',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-customer-service-line', // Icono de headset
    label: 'Soporte'                  // Texto junto al icono
  }
});
```

**Resultado:** Pestaña con icono de headset y texto "Soporte" al lado.

#### Ejemplo 2: Botón Flotante Bottom-Right

Crea un botón flotante tipo chat en la esquina inferior derecha usando `standalone: true`:

```typescript
sidebarPanelService.open(ChatComponent, {
  id: 'floating-chat',
  title: 'Chat en Vivo',
  minimizable: true,
  position: 'right',
  minimizedTabCustomization: {
    icon: 'ri-question-answer-line',
    label: 'Chat',
    cssClass: 'floating-chat-button',
    standalone: true  // 🔑 Clave: permite posicionamiento libre
  }
});
```

**CSS para botón flotante:**

```scss
// Estilos globales en tu styles.scss
::ng-deep .floating-chat-button {
  // Posicionamiento libre (gracias a standalone: true)
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  
  // Dimensiones automáticas (contenido + padding)
  width: auto !important;
  height: auto !important;
  padding: 14px 20px !important;
  
  // Forma pill
  border-radius: 50px !important;
  
  // Elevación con sombras multicapa
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1) !important;
  
  // Color primario con texto blanco
  background: var(--nui-color-primary) !important;
  color: white !important;
  border: none !important;
  
  // Efectos de hover
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.15) !important;
  }
  
  // Efecto de click
  &:active {
    transform: translateY(0) !important;
  }
  
  // Icono y label juntos
  i {
    margin-right: 8px;
    font-size: 20px;
  }
  
  // Responsive: ajustar en móvil
  @media (max-width: 768px) {
    bottom: 16px !important;
    right: 16px !important;
    padding: 12px 16px !important;
  }
}
```

**¿Por qué standalone: true es necesario?**

Sin `standalone: true`, el botón estaría dentro de un contenedor con `transform: translateY(-50%)`, lo que crea un nuevo **stacking context**. Esto hace que el `position: fixed` del hijo se comporte de forma relativa al padre transformado, no al viewport.

Con `standalone: true`:
- ✅ El botón se renderiza en su propio contenedor independiente
- ✅ No tiene restricciones de posicionamiento del contenedor padre
- ✅ Puedes usar `bottom: 24px; right: 24px` y funcionará correctamente
- ✅ Ideal para botones flotantes que necesitan posicionamiento libre

#### Ejemplo 3: Múltiples Estilos de Pestañas

Combina pestañas agrupadas normales con botones flotantes independientes:

```typescript
// Chat flotante (standalone)
sidebarPanelService.open(ChatComponent, {
  id: 'chat',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-chat-3-line',
    label: 'Chat',
    cssClass: 'floating-chat-button',
    standalone: true  // Botón flotante independiente
  }
});

// Notificaciones agrupadas (normal)
sidebarPanelService.open(NotificationsComponent, {
  id: 'notifications',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-notification-3-line',
    label: 'Notificaciones'
    // Sin standalone: se agrupa con otras pestañas en el borde
  }
});

// Configuración agrupada (normal)
sidebarPanelService.open(SettingsComponent, {
  id: 'settings',
  minimizable: true,
  minimizedTabCustomization: {
    icon: 'ri-settings-3-line',
    label: 'Ajustes'
    // Sin standalone: se agrupa junto a notificaciones
  }
});
```

**Resultado:**
- **Chat**: Botón flotante en bottom-right (independiente, posición libre)
- **Notificaciones y Ajustes**: Pestañas agrupadas verticalmente en el borde derecho

#### Ejemplo 4: Template Completamente Custom

Para control total sobre el renderizado, usa un template personalizado:

```html
<ng-template #customTab>
  <div class="custom-tab-content">
    <div class="badge">3</div>
    <i class="ri-mail-line"></i>
    <span>Mensajes</span>
  </div>
</ng-template>

<button (click)="openWithCustomTemplate()">Abrir</button>
```

```typescript
@ViewChild('customTab') customTabTemplate!: TemplateRef<any>;

openWithCustomTemplate(): void {
  this.sidebarPanelService.open(MessagesComponent, {
    id: 'messages',
    minimizable: true,
    minimizedTabCustomization: {
      template: this.customTabTemplate,
      standalone: true  // Para posicionamiento libre
    }
  });
}
```

#### Cuándo usar cada opción

| Opción | Uso recomendado | Ejemplo |
|--------|----------------|---------|
| **Solo icon** | Cambiar icono de flecha por uno más descriptivo | Soporte, Help, Favoritos |
| **icon + label** | Agregar contexto visual con texto | "Chat", "Soporte", "Ayuda" |
| **cssClass (sin standalone)** | Estilos visuales manteniendo agrupación | Colores, tamaños, sombras |
| **cssClass + standalone** | Botones flotantes con posición libre | Chat flotante, FAB, Ayuda contextual |
| **template** | Control total del renderizado | Badges, avatares, contenido complejo |

#### Comparativa: Agrupado vs Standalone

**Pestañas Agrupadas (standalone: false - default):**
```typescript
minimizedTabCustomization: {
  icon: 'ri-notification-line',
  label: 'Notificaciones'
  // Sin standalone: se agrupa con otras en el borde
}
```
- ✅ Pestañas apiladas en el mismo borde (right, left, top, bottom)
- ✅ Posicionamiento automático centrado
- ✅ Ideal para múltiples panels relacionados
- ❌ Limitado al borde especificado por `position`
- ❌ No puede moverse libremente por la pantalla

**Pestañas Standalone (standalone: true):**
```typescript
minimizedTabCustomization: {
  icon: 'ri-chat-line',
  label: 'Chat',
  cssClass: 'floating-chat-button',
  standalone: true
}
```
- ✅ Posicionamiento CSS completamente libre
- ✅ Ideal para botones flotantes (bottom-right, etc.)
- ✅ No afectado por otros panels
- ✅ Puede usar position: fixed sin restricciones
- ❌ No se agrupa con otras pestañas
- ❌ Requiere CSS manual para posicionamiento

### Múltiples Panels

**Con Minimizable (Recomendado):**

Para permitir múltiples panels que pueden apilarse y minimizarse, usa `minimizable: true` con IDs únicos:

```typescript
// Panel 1
sidebarPanelService.open(ChatComponent, {
  id: 'chat-support',
  position: 'right',
  minimizable: true,
  title: 'Chat de Soporte'
});

// Panel 2 - Se abre simultáneamente porque minimizable permite stack
sidebarPanelService.open(NotificationsComponent, {
  id: 'notifications',
  position: 'right',
  minimizable: true,
  title: 'Notificaciones'
});

// Ambos pueden existir simultáneamente
// Ambos pueden minimizarse independientemente
// Las pestañas se apilan una al lado de la otra
```

**Sin Minimizable (Comportamiento Clásico):**

Si `minimizable: false`, abrir un nuevo panel cierra automáticamente el anterior:

```typescript
// Panel 1
sidebarPanelService.open(Panel1Component, {
  position: 'right',
  minimizable: false  // O simplemente omitir
});

// Panel 2 - Cierra automáticamente Panel 1
sidebarPanelService.open(Panel2Component, {
  position: 'right',
  minimizable: false
});
// Solo Panel 2 estará visible
```

**Cerrar todos los panels:**

```typescript
// Cierra todos los panels abiertos (incluyendo minimizados)
sidebarPanelService.closeAll();
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
  this.sidebarPanelService.open(MyComponent, {
    headerTemplate: this.customHeader,
    footerTemplate: this.customFooter
  });
}
```

### Auto-focus Específico

```typescript
// Auto-focus al primer elemento
sidebarPanelService.open(MyComponent, {
  autoFocus: true
});

// Sin auto-focus
sidebarPanelService.open(MyComponent, {
  autoFocus: false
});

// Focus en elemento específico
sidebarPanelService.open(MyComponent, {
  autoFocus: '#username-input' // Selector CSS
});
```

### Escuchar Eventos

```typescript
const panelRef = sidebarPanelService.open(MyComponent);

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
const panelRef = sidebarPanelService.open(MyComponent, {
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
sidebarPanelService.open(MyComponent, {
  closeOnRouteChange: true
});
```

### Control del Stack

```typescript
// Obtener panel por ID
const panelItem = sidebarPanelService.getPanel('my-panel-id');

// Obtener todos los panels
const allPanels = sidebarPanelService.getAllPanels();

// Número de panels abiertos
const count = sidebarPanelService.openPanelsCount;
```

## Estilos y Theming

El componente usa variables CSS para theming:

```css
:root {
  /* Colores */
  --sidebar-panel-bg: var(--surface-primary);
  --sidebar-panel-header-bg: var(--surface-primary);
  --sidebar-panel-content-bg: var(--surface-primary);
  --sidebar-panel-footer-bg: var(--surface-secondary);
  
  /* Espaciado */
  --sidebar-panel-header-padding: 1.5rem;
  --sidebar-panel-content-padding: 1.5rem;
  --sidebar-panel-footer-padding: 1.5rem;
  
  /* Tipografía */
  --sidebar-panel-title-size: 1.25rem;
  --sidebar-panel-title-weight: 600;
  
  /* Sombras */
  --sidebar-panel-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}
```

### Clases Custom

```typescript
sidebarPanelService.open(MyComponent, {
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
sidebarPanelService.open(MyComponent, {
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

La directiva `SidebarPanelContentDirective` permite marcar templates como contenido específico para SidebarPanels:

### Uso Básico

```html
<!-- Marcar un template para identificarlo -->
<ng-template nuiSidebarPanelContent>
  <div class="panel-content">
    <p>Contenido del panel</p>
  </div>
</ng-template>

<!-- Con nombre para identificación -->
<ng-template nuiSidebarPanelContent="userForm">
  <form>...</form>
</ng-template>
```

### Obtener Referencia al Template

```typescript
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { SidebarPanelContentDirective } from '@shared/components/sidebar-panel';

@Component({
  template: `
    <ng-template nuiSidebarPanelContent #panelContent>
      <div>Contenido dinámico: {{ data }}</div>
    </ng-template>
    
    <button (click)="openWithTemplate()">Abrir Panel</button>
  `
})
export class MyComponent {
  @ViewChild(SidebarPanelContentDirective, { read: TemplateRef })
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
describe('SidebarPanelService', () => {
  let service: SidebarPanelService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [SidebarPanelService]
    });
    service = TestBed.inject(SidebarPanelService);
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
- **Injection Tokens**: `SIDEBAR_PANEL_DATA` y `SIDEBAR_PANEL_REF` para inyección
- **RxJS**: Observables para todos los eventos
- **Animations**: Angular Animations API con transforms
- **Signals**: Computed signals para optimización de performance
- **Accessibility**: ARIA attributes con aria-labelledby para títulos

## Footers

El SidebarPanel ofrece **tres formas** de agregar footers a tus panels, cada una con diferentes niveles de flexibilidad y control. Esta sección te ayudará a elegir el método más adecuado para tu caso de uso.

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
interface SidebarPanelCustomButton {
  text: string;                     // Texto del botón
  icon?: string;                    // Icono (Remix Icons: 'ri-save-line')
  color?: NUIColor;                 // Color del botón
  variant?: NUIVariant;             // Variante: 'solid' | 'outline' | 'ghost' | 'link'
  size?: NUISize;                   // Tamaño: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  callback: (panelRef: SidebarPanelRef) => void | Promise<void>; // Función al hacer click
  disabled?: boolean;               // Estado deshabilitado
  loading?: boolean;                // Mostrar spinner de carga
  class?: string;                   // Clases CSS adicionales
}
```

#### Ejemplo Básico

```typescript
openPanel() {
  const panelRef = this.sidebarPanelService.open(UserFormComponent, {
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
  const buttons: SidebarPanelCustomButton[] = [
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

  this.sidebarPanelService.open(FormComponent, {
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
import { SIDEBAR_PANEL_REF, SidebarPanelRef } from '@shared/components/sidebar-panel';

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
  private panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
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
    this.sidebarPanelService.open(FormPanelComponent, {
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
interface SidebarPanelAction {
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
register(actions: SidebarPanelAction[]): void

// Agregar una acción individual
add(action: SidebarPanelAction): void

// Actualizar una acción por índice
update(index: number, partial: Partial<SidebarPanelAction>): void

// Limpiar todas las acciones
clear(): void

// Helpers para estados comunes
setDisabled(index: number, disabled: boolean): void
setLoading(index: number, loading: boolean): void
```

#### Ejemplo Básico


```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SidebarPanelActionsService, SIDEBAR_PANEL_REF, SidebarPanelRef } from '@shared/components/sidebar-panel';

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
  private actionsService = inject(SidebarPanelActionsService);
  private panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
  
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
  const ref = this.sidebarPanelService.open(UserFormComponent, {
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
  private actionsService = inject(SidebarPanelActionsService);
  private panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
  
  step = 1;
  wizardData = { step1: {}, step2: {}, step3: {} };
  
  ngOnInit() {
    this.updateActions();
  }
  
  updateActions() {
    const actions: SidebarPanelAction[] = [];
    
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

El componente **hijo** define su propio template de footer usando la directiva `nuiSidebarPanelFooter`.

#### 🎯 Cuándo usar
- Footers con layouts complejos o personalizados
- Necesitas más que botones (badges, info, progress bars, etc.)
- Diseño específico que no sigue el estándar
- Control total sobre estilos y comportamiento

#### Ejemplo


```typescript
import { Component, inject } from '@angular/core';
import { SidebarPanelFooterDirective, SIDEBAR_PANEL_REF, SidebarPanelRef } from '@shared/components/sidebar-panel';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [SidebarPanelFooterDirective, ButtonComponent],
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
    <ng-template nuiSidebarPanelFooter>
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
  private panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
  
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
  this.sidebarPanelService.open(SettingsPanelComponent, {
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

Cuando se usan múltiples métodos simultáneamente, el SidebarPanel aplica la siguiente **precedencia** (de mayor a menor prioridad):

1. **`customButtons`** (configuración) - Se renderiza primero si está presente
2. **Footer Directive** (`nuiSidebarPanelFooter`) - Template del hijo
3. **Actions Service** (`SidebarPanelActionsService`) - Acciones del hijo
4. **`footerTemplate`** (configuración) - Template del padre

```typescript
// Ejemplo: Si abres un panel con customButtons, se ignoran los otros métodos
sidebarPanelService.open(MyComponent, {
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
    <ng-template nuiSidebarPanelFooter>
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
2. **nuiSidebarPanelFooter** (directiva) - Template personalizado del hijo
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

