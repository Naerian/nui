# Tabs Component

Componente de pestañas (tabs) que permite organizar contenido en secciones navegables. Soporta múltiples variantes visuales, orientaciones, navegación por teclado, scroll horizontal con botones y templates personalizados.

## Características Principales

✨ **5 variantes visuales**: underline, enclosed, pills, soft, buttons  
📏 **6 tamaños**: xs, s, sm, md, lg, xl  
🎨 **7 colores del theme**: primary, secondary, accent, success, warning, danger, info  
⌨️ **Navegación por teclado completa** con ARIA best practices  
🔄 **Integración con Angular Router**  
⚡ **Lazy loading automático** sin necesidad de `@if` manual  
🖱️ **Scroll horizontal con botones** para muchos tabs  
🎨 **Templates personalizados** con contexto completo  
📱 **Responsive** con orientación vertical/horizontal

## 📦 Importación

```typescript
import { TabsComponent } from '@shared/components/tab/tabs.component';
import { TabComponent } from '@shared/components/tab/tab.component';

@Component({
  imports: [TabsComponent, TabComponent],
  // ...
})
```

## 🎯 Selector

```html
<nui-tabs>
  <nui-tab></nui-tab>
</nui-tabs>
```

## 💡 Uso Básico

```html
<nui-tabs>
  <nui-tab label="Tab 1">
    <p>Contenido del primer tab</p>
  </nui-tab>
  <nui-tab label="Tab 2">
    <p>Contenido del segundo tab</p>
  </nui-tab>
  <nui-tab label="Tab 3">
    <p>Contenido del tercer tab</p>
  </nui-tab>
</nui-tabs>
```

## 📋 API

### TabsComponent (@Input)

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `preset` | `TabPresetName` | - | 🎨 **Preset de configuración** (ver sección Presets) |
| `variant` | `TabVariant` | `'underline'` | Variante visual: `'underline'`, `'enclosed'`, `'pills'`, `'soft'`, `'buttons'` |
| `orientation` | `TabOrientation` | `'horizontal'` | Orientación: `'horizontal'` o `'vertical'` |
| `color` | `NUIColor` | `'primary'` | Color del theme |
| `size` | `NUISize` | `'md'` | Tamaño: `'xs'`, `'s'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `selectedIndex` | `number` | `0` | Índice del tab activo (two-way binding) |
| `disabled` | `boolean` | `false` | Deshabilita todos los tabs |
| `scrollable` | `boolean` | `false` | ✨ **Habilita scroll horizontal con botones de navegación** |
| `routingMode` | `'routes' \| 'query' \| 'hash'` | `'routes'` | 🔄 **Modo de routing** (solo con `nui-tab-route`) |
| `queryParam` | `string` | `'tab'` | 🔄 **Nombre del query param** (solo con `routingMode="query"`) |
| `useExternalOutlet` | `boolean` | `false` | 🔄 **Usa router-outlet externo** (solo con `routingMode="routes"`) |
| `centerActiveTab` | `boolean` | `false` | Centra el tab activo en el scroll |
| `autoScroll` | `boolean` | `false` | Hace scroll al top al cambiar de tab |
| `ariaLabel` | `string` | - | Label ARIA para accesibilidad |

**Nota**: Las propiedades marcadas con 🔄 son específicas para integración con Router. Ver sección [Integración con Angular Router](#-integración-con-angular-router).

### TabsComponent (@Output)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `selectedIndexChange` | `EventEmitter<number>` | Se emite cuando cambia el índice del tab activo |
| `tabChange` | `EventEmitter<TabChangeEvent>` | Se emite cuando cambia el tab con información detallada |

### TabComponent (@Input)

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `label` | `string` | - | Label del tab |
| `icon` | `string` | - | Clase del icono (ej: `'ri-home-line'`) |
| `badge` | `number \| string` | - | Badge numérico o texto |
| `badgeColor` | `string` | - | Color personalizado del badge (hex, rgb, etc.) |
| `disabled` | `boolean` | `false` | Deshabilita el tab |
| `lazy` | `boolean` | `false` | Habilita lazy loading automático del contenido |
| `route` | `string \| any[]` | - | Ruta de router asociada |
| `id` | `string` | auto | ID único del tab (se genera automáticamente) |
| `tooltip` | `string` | - | Tooltip personalizado (usa `label` por defecto) |

### TabComponent (Templates)

| Template | Contexto | Descripción |
|----------|----------|-------------|
| `#tabLabel` | - | Personaliza solo el label (mantiene icono y badge) |
| `#tabHeader` | `{active, disabled, index}` | ✨ **Personaliza COMPLETAMENTE el header del tab** |

**Contexto de `#tabHeader`:**
- `let-active="active"` → `boolean` - Indica si el tab está activo
- `let-disabled="disabled"` → `boolean` - Indica si el tab está deshabilitado  
- `let-index="index"` → `number` - Índice del tab (0-based)

### Tipos TypeScript

```typescript
type TabVariant = 'underline' | 'enclosed' | 'pills' | 'soft' | 'buttons';
type TabOrientation = 'horizontal' | 'vertical';
type NUIColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
type NUISize = 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';

interface TabChangeEvent {
  previousIndex: number;
  currentIndex: number;
  label: string;
  tabId: string;
}
```

## 🎨 Variantes

### Underline (Default)

Tabs con línea inferior en el tab activo. Ideal para navegación principal.

```html
<nui-tabs variant="underline" color="primary">
  <nui-tab label="Overview">...</nui-tab>
  <nui-tab label="Features">...</nui-tab>
  <nui-tab label="Pricing">...</nui-tab>
</nui-tabs>
```

### Enclosed

Tabs con bordes que parecen pestañas de carpeta. Perfecto para configuraciones.

```html
<nui-tabs variant="enclosed" color="secondary">
  <nui-tab label="General">...</nui-tab>
  <nui-tab label="Security">...</nui-tab>
  <nui-tab label="Notifications">...</nui-tab>
</nui-tabs>
```

### Pills

Tabs con forma de píldora redondeada. Moderno y compacto.

```html
<nui-tabs variant="pills" color="accent">
  <nui-tab label="Dashboard">...</nui-tab>
  <nui-tab label="Analytics">...</nui-tab>
  <nui-tab label="Reports">...</nui-tab>
</nui-tabs>
```

### Soft

Tabs con fondo suave sin bordes marcados. Sutil y elegante.

```html
<nui-tabs variant="soft" color="success">
  <nui-tab label="Profile">...</nui-tab>
  <nui-tab label="Settings">...</nui-tab>
  <nui-tab label="Billing">...</nui-tab>
</nui-tabs>
```

### Buttons

Tabs con aspecto de botones separados. Ideal para filtros o selectores de vista.

```html
<nui-tabs variant="buttons" color="warning">
  <nui-tab label="Week">...</nui-tab>
  <nui-tab label="Month">...</nui-tab>
  <nui-tab label="Year">...</nui-tab>
</nui-tabs>
```

## 📏 Tamaños

```html
<nui-tabs size="xs">...</nui-tabs>
<nui-tabs size="s">...</nui-tabs>
<nui-tabs size="sm">...</nui-tabs>
<nui-tabs size="md">...</nui-tabs> <!-- Default -->
<nui-tabs size="lg">...</nui-tabs>
<nui-tabs size="xl">...</nui-tabs>
```

## 🎨 Colores

```html
<nui-tabs color="primary">...</nui-tabs>
<nui-tabs color="secondary">...</nui-tabs>
<nui-tabs color="accent">...</nui-tabs>
<nui-tabs color="success">...</nui-tabs>
<nui-tabs color="warning">...</nui-tabs>
<nui-tabs color="danger">...</nui-tabs>
<nui-tabs color="info">...</nui-tabs>
```

## 🎯 Presets de Configuración

Los presets son configuraciones predefinidas que aplican un conjunto de opciones comunes para casos de uso específicos. Simplifican el código y garantizan consistencia visual en toda la aplicación.

### Presets Disponibles

#### `navigation` - Navegación Principal
Ideal para: Menús principales, navegación top-level

```html
<nui-tabs preset="navigation">
  <nui-tab label="Dashboard" icon="ri-dashboard-line">...</nui-tab>
  <nui-tab label="Reports" icon="ri-file-chart-line">...</nui-tab>
  <nui-tab label="Settings" icon="ri-settings-line">...</nui-tab>
</nui-tabs>
```

**Configuración aplicada**: `variant="enclosed"`, `size="md"`, `color="primary"`, `scrollable="true"`

#### `settings` - Páginas de Configuración
Ideal para: Settings, configuración, preferencias

```html
<nui-tabs preset="settings">
  <nui-tab label="Profile">...</nui-tab>
  <nui-tab label="Privacy">...</nui-tab>
  <nui-tab label="Notifications">...</nui-tab>
</nui-tabs>
```

**Configuración aplicada**: `variant="pills"`, `orientation="vertical"`, `size="sm"`, `color="primary"`

#### `mobile` - Optimizado para Móviles
Ideal para: Interfaces responsive, mobile-first

```html
<nui-tabs preset="mobile">
  <nui-tab label="Feed">...</nui-tab>
  <nui-tab label="Explore">...</nui-tab>
  <nui-tab label="Profile">...</nui-tab>
</nui-tabs>
```

**Configuración aplicada**: `variant="underline"`, `size="sm"`, `scrollable="true"`, `centerActiveTab="true"`

#### `documentation` - Documentación y FAQs
Ideal para: Docs, ayuda, landing pages, guías

```html
<nui-tabs preset="documentation">
  <nui-tab-route label="Overview" route="overview">...</nui-tab-route>
  <nui-tab-route label="API" route="api">...</nui-tab-route>
  <nui-tab-route label="Examples" route="examples">...</nui-tab-route>
</nui-tabs>
```

**Configuración aplicada**: `variant="soft"`, `size="md"`, `routingMode="hash"`, `color="primary"`

#### `dashboard` - Dashboards y Analytics
Ideal para: Paneles de control, reportes, visualización de datos

```html
<nui-tabs preset="dashboard">
  <nui-tab label="Overview">...</nui-tab>
  <nui-tab label="Analytics">...</nui-tab>
  <nui-tab label="Reports">...</nui-tab>
</nui-tabs>
```

**Configuración aplicada**: `variant="buttons"`, `size="md"`, `color="secondary"`, `scrollable="true"`

#### `wizard` - Formularios Paso a Paso
Ideal para: Wizards, onboarding, procesos multi-paso

```html
<nui-tabs preset="wizard" #wizard>
  <nui-tab label="Step 1: Basic Info">...</nui-tab>
  <nui-tab label="Step 2: Details">...</nui-tab>
  <nui-tab label="Step 3: Review">...</nui-tab>
</nui-tabs>

<button (click)="wizard.selectPreviousTab()">Back</button>
<button (click)="wizard.selectNextTab()">Next</button>
```

**Configuración aplicada**: `variant="enclosed"`, `size="lg"`, `color="accent"`, `autoScroll="true"`

#### `minimal` - Contenido Secundario
Ideal para: Sidebars, widgets, contenido discreto

```html
<nui-tabs preset="minimal">
  <nui-tab label="Recent">...</nui-tab>
  <nui-tab label="Popular">...</nui-tab>
</nui-tabs>
```

**Configuración aplicada**: `variant="underline"`, `size="xs"`, `color="secondary"`

#### `views` - Vistas Alternativas
Ideal para: Cambio de vista (grid/list), filtros visuales

```html
<nui-tabs preset="views">
  <nui-tab-route label="Grid" route="grid" icon="ri-grid-line">...</nui-tab-route>
  <nui-tab-route label="List" route="list" icon="ri-list-check">...</nui-tab-route>
</nui-tabs>
```

**Configuración aplicada**: `variant="pills"`, `size="sm"`, `routingMode="query"`, `color="secondary"`

### Personalización de Presets

Puedes combinar un preset con propiedades personalizadas. Las propiedades explícitas tienen prioridad sobre el preset:

```html
<!-- Usa preset navigation pero cambia el color -->
<nui-tabs preset="navigation" color="secondary">
  <nui-tab label="Home">...</nui-tab>
</nui-tabs>

<!-- Usa preset mobile pero cambia a vertical -->
<nui-tabs preset="mobile" orientation="vertical">
  <nui-tab label="Tab 1">...</nui-tab>
</nui-tabs>
```

### Tabla de Comparación de Presets

| Preset | Variant | Orientation | Size | Scrollable | Routing Mode | Caso de Uso |
|--------|---------|-------------|------|------------|--------------|-------------|
| `navigation` | enclosed | horizontal | md | ✅ | routes | Navegación principal |
| `settings` | pills | vertical | sm | ❌ | routes | Páginas de config |
| `mobile` | underline | horizontal | sm | ✅ | routes | Interfaces móviles |
| `documentation` | soft | horizontal | md | ❌ | hash | Docs y FAQs |
| `dashboard` | buttons | horizontal | md | ✅ | routes | Dashboards |
| `wizard` | enclosed | horizontal | lg | ❌ | routes | Procesos multi-paso |
| `minimal` | underline | horizontal | xs | ❌ | routes | Contenido secundario |
| `views` | pills | horizontal | sm | ❌ | query | Vistas alternativas |

## 🚀 Características Avanzadas

### 1. ⚡ Lazy Loading Automático

El contenido de los tabs solo se renderiza cuando se activan por primera vez:

```html
<nui-tabs>
  <!-- Se renderiza inmediatamente -->
  <nui-tab label="Overview">
    <app-overview />
  </nui-tab>

  <!-- Solo se renderiza al hacer clic en él -->
  <nui-tab label="Heavy Reports" [lazy]="true">
    <app-heavy-reports />
  </nui-tab>
  
  <!-- Solo se renderiza al hacer clic en él -->
  <nui-tab label="Large Dataset" [lazy]="true">
    <app-large-dataset />
  </nui-tab>
</nui-tabs>
```

**Ventajas:**
- ✅ Mejor rendimiento inicial
- ✅ Ahorro de memoria
- ✅ Peticiones HTTP diferidas
- ✅ Sin código adicional (no necesitas `@if` manual)
- ✅ El contenido permanece en el DOM una vez renderizado

### 2. 🖱️ Scroll Horizontal con Botones

Para interfaces con muchos tabs, activa el scroll horizontal con botones de navegación:

```html
<nui-tabs 
  variant="enclosed" 
  color="primary"
  [scrollable]="true">
  <nui-tab label="Tab 1" icon="ri-home-line">...</nui-tab>
  <nui-tab label="Tab 2" icon="ri-file-line">...</nui-tab>
  <nui-tab label="Tab 3" icon="ri-folder-line">...</nui-tab>
  <!-- ... muchos más tabs ... -->
  <nui-tab label="Tab 15" icon="ri-settings-line">...</nui-tab>
</nui-tabs>
```

**Características:**
- ✅ Botones prev/next aparecen automáticamente cuando hay overflow
- ✅ Barra de scroll nativa oculta para diseño limpio
- ✅ Navegación por teclado completa (`Enter`, `Space`, flechas)
- ✅ Foco automático al botón opuesto al llegar al límite
- ✅ Scroll suave (smooth) del 70% del ancho visible

**Navegación por teclado en botones de scroll:**
- `Enter` / `Space` → Hacer scroll
- `→` (en botón prev) → Saltar al primer tab
- `←` (en botón next) → Saltar al último tab

### 3. 🎨 Templates Personalizados

Personaliza completamente el header del tab con `#tabHeader`:

```html
<nui-tabs variant="soft" color="primary">
  <nui-tab>
    <ng-template #tabHeader let-active="active">
      <img [src]="user.avatar" class="avatar" />
      <div class="user-info">
        <div class="name" [class.active]="active">{{ user.name }}</div>
        <div class="role">{{ user.role }}</div>
      </div>
      @if (user.unreadMessages > 0) {
        <span class="badge">{{ user.unreadMessages }}</span>
      }
    </ng-template>

    <!-- Contenido del tab -->
    <app-user-profile [user]="user" />
  </nui-tab>
</nui-tabs>
```

**Perfecto para:**
- Avatares con información de usuario
- Contadores en tiempo real
- Layouts multi-línea
- Iconos animados
- Estados dinámicos (online/offline)

**Ejemplo con contador en tiempo real:**

```typescript
// Component
liveNotifications = signal(0);

addNotification() {
  this.liveNotifications.update(n => n + 1);
}
```

```html
<nui-tab>
  <ng-template #tabHeader>
    <i class="ri-notification-3-line"></i>
    <span>Notificaciones</span>
    <span class="live-counter" [class.has-notifications]="liveNotifications() > 0">
      {{ liveNotifications() }}
    </span>
  </ng-template>
  
  <div>
    <p>Tienes {{ liveNotifications() }} notificaciones nuevas</p>
    <button (click)="addNotification()">➕ Agregar</button>
  </div>
</nui-tab>
```

### Combinar las 3 Características

```html
<nui-tabs 
  variant="pills" 
  color="primary"
  [scrollable]="true">
  @for (project of projects; track project.id) {
    <nui-tab [lazy]="true">
      <!-- Template personalizado -->
      <ng-template #tabHeader let-active="active">
        <i [class]="project.icon" [class.active]="active"></i>
        <div>
          <div class="name">{{ project.name }}</div>
          <div class="tasks">{{ project.tasks }} tareas</div>
        </div>
        @if (project.priority === 'high') {
          <span class="priority">⚡ Alta</span>
        }
      </ng-template>

      <!-- Contenido lazy loaded -->
      <app-project-detail [project]="project" />
    </nui-tab>
  }
</nui-tabs>
```

## 🎯 Iconos y Badges

```html
<nui-tabs variant="pills">
  <!-- Tab con icono -->
  <nui-tab label="Home" icon="ri-home-line">
    <p>Home content</p>
  </nui-tab>

  <!-- Tab con icono y badge numérico -->
  <nui-tab 
    label="Notifications" 
    icon="ri-notification-line"
    [badge]="notifications()">
    <p>You have {{ notifications() }} notifications</p>
  </nui-tab>

  <!-- Tab con badge personalizado -->
  <nui-tab 
    label="Messages"
    icon="ri-message-line"
    badge="New"
    badgeColor="#28a745">
    <p>New messages</p>
  </nui-tab>

  <!-- Badge condicional -->
  <nui-tab 
    label="Activity"
    icon="ri-line-chart-line"
    [badge]="activity() > 0 ? activity() : undefined">
    <p>Recent activity</p>
  </nui-tab>
</nui-tabs>
```

## 📱 Orientación Vertical

```html
<nui-tabs orientation="vertical" variant="soft">
  <nui-tab label="Dashboard">
    <h3>Dashboard</h3>
    <p>Vertical orientation is great for sidebars.</p>
  </nui-tab>
  <nui-tab label="Settings">
    <h3>Settings</h3>
    <p>Perfect for configuration panels.</p>
  </nui-tab>
  <nui-tab label="Profile">
    <h3>Profile</h3>
    <p>Works well with detailed content.</p>
  </nui-tab>
</nui-tabs>
```

## 🚫 Tab Deshabilitado

```html
<nui-tabs variant="pills">
  <nui-tab label="Available">
    <p>Este tab está disponible y funcional.</p>
  </nui-tab>
  
  <nui-tab label="Premium Feature" icon="ri-lock-line" [disabled]="true">
    <p>Este contenido no debería verse nunca.</p>
  </nui-tab>
  
  <nui-tab label="Active">
    <p>Este tab también está disponible.</p>
  </nui-tab>
</nui-tabs>
```

## 🎛️ Control Programático

```typescript
@Component({
  template: `
    <nui-tabs 
      [(selectedIndex)]="activeTab"
      (tabChange)="onTabChange($event)">
      <nui-tab label="Tab 1">...</nui-tab>
      <nui-tab label="Tab 2">...</nui-tab>
      <nui-tab label="Tab 3">...</nui-tab>
    </nui-tabs>

    <button (click)="activeTab = 1">Go to Tab 2</button>
  `
})
export class MyComponent {
  activeTab = 0;

  onTabChange(event: TabChangeEvent) {
    console.log('Previous tab:', event.previousIndex);
    console.log('Current tab:', event.currentIndex);
    console.log('Tab label:', event.label);
    console.log('Tab ID:', event.tabId);
  }
}
```

## 📡 Eventos

```typescript
@Component({
  template: `
    <nui-tabs 
      (tabChange)="onTabChange($event)"
      (selectedIndexChange)="onIndexChange($event)">
      <nui-tab label="First">...</nui-tab>
      <nui-tab label="Second">...</nui-tab>
    </nui-tabs>
  `
})
export class MyComponent {
  onTabChange(event: TabChangeEvent) {
    console.log('Tab changed:', event);
  }

  onIndexChange(index: number) {
    console.log('New index:', index);
  }
}
```

## 🔄 Integración con Router

Para integrar tabs con Angular Router, usa el componente especializado `<nui-tab-route>` que maneja la navegación automáticamente. 

**Por defecto**, `<nui-tabs>` incluye un **router-outlet INTERNO** automáticamente cuando detecta tabs de ruta. No necesitas agregar nada extra.

### Uso Básico (Router-outlet Interno)

```typescript
// 1. Configurar rutas (children del componente padre)
export const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  }
];
```

```typescript
// 2. Usar nui-tab-route (router-outlet INTERNO automático)
import { TabsComponent } from '@shared/components/tab/tabs.component';
import { TabRouteComponent } from '@shared/components/tab/tab-route.component';

@Component({
  standalone: true,
  imports: [TabsComponent, TabRouteComponent],
  template: `
    <nui-tabs>
      <nui-tab-route 
        label="Overview" 
        icon="ri-dashboard-line"
        route="/dashboard/overview">
      </nui-tab-route>
      
      <nui-tab-route 
        label="Analytics" 
        icon="ri-line-chart-line"
        route="/dashboard/analytics">
      </nui-tab-route>
      
      <nui-tab-route 
        label="Reports" 
        icon="ri-file-list-line"
        route="/dashboard/reports">
      </nui-tab-route>
    </nui-tabs>

    <!-- NO necesitas agregar router-outlet aquí -->
    <!-- nui-tabs lo incluye automáticamente -->
  `
})
export class DashboardPageComponent {}
```

### Características de `nui-tab-route`

✅ **Router-outlet interno automático** - Incluido por defecto, sin configuración extra  
✅ **Router-outlet externo opcional** - Usa `[externalOutlet]="true"` para control manual  
✅ **Sincronización automática** - URL ↔ Tab activo en ambas direcciones  
✅ **Deep linking** - Navega directamente a cualquier tab mediante URL  
✅ **Historial del navegador** - Botones atrás/adelante funcionan perfectamente  
✅ **Todas las features** - Iconos, badges, templates, disabled, etc.

### API de `nui-tab-route`

Todos los @Input de `nui-tab` más:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `route` | `string \| any[]` | **Requerido** - Ruta a navegar (ej: `"/dashboard"` o `["./settings"]`) |

### API de `nui-tabs` para Router

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `externalOutlet` | `boolean` | `false` | Si es `true`, NO incluye router-outlet interno. Debes agregarlo manualmente |
| `outletName` | `string?` | `undefined` | Nombre del outlet (para outlets con nombre). Solo con `externalOutlet=true` |

### Ejemplo Completo (Outlet Interno)

```typescript
// routes.ts
export const routes: Route[] = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: 'general', component: GeneralSettingsComponent },
      { path: 'security', component: SecuritySettingsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'billing', component: BillingComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  }
];
```

```typescript
// settings.component.ts
@Component({
  standalone: true,
  imports: [TabsComponent, TabRouteComponent],
  template: `
    <div class="settings-container">
      <h1>Settings</h1>
      
      <nui-tabs 
        variant="pills" 
        color="primary">
        <!-- Router-outlet INTERNO automático -->
        <nui-tab-route 
          label="General" 
          icon="ri-settings-3-line"
          route="/settings/general">
        </nui-tab-route>

        <nui-tab-route 
          label="Security" 
          icon="ri-shield-check-line"
          route="/settings/security">
        </nui-tab-route>

        <nui-tab-route 
          label="Notifications" 
          icon="ri-notification-3-line"
          route="/settings/notifications"
          [badge]="unreadNotifications()">
        </nui-tab-route>

        <nui-tab-route 
          label="Billing" 
          icon="ri-bank-card-line"
          route="/settings/billing">
        </nui-tab-route>
      </nui-tabs>
      <!-- NO necesitas router-outlet aquí, es automático -->
    </div>
  `
})
export class SettingsComponent {
  unreadNotifications = signal(3);
}
```

### Outlet Externo (Control Manual)

Si necesitas más control sobre dónde y cómo se renderiza el contenido:

```typescript
@Component({
  imports: [TabsComponent, TabRouteComponent, RouterOutlet],
  template: `
    <nui-tabs [externalOutlet]="true">
      <nui-tab-route label="Tab 1" route="/page/tab1" />
      <nui-tab-route label="Tab 2" route="/page/tab2" />
    </nui-tabs>

    <!-- Debes agregar router-outlet MANUALMENTE -->
    <div class="custom-outlet-container">
      <router-outlet />
    </div>
  `
})
```

**Con outlet con nombre:**

```typescript
// routes.ts
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: 'main', component: MainContent, outlet: 'tabs' },
    { path: 'secondary', component: SecondaryContent, outlet: 'tabs' }
  ]
}

// dashboard.component.ts
@Component({
  template: `
    <nui-tabs 
      [externalOutlet]="true" 
      outletName="tabs">
      <nui-tab-route label="Main" route="main" />
      <nui-tab-route label="Secondary" route="secondary" />
    </nui-tabs>

    <router-outlet name="tabs" />
  `
})
```

### Navegación Programática

```typescript
@Component({
  template: `
    <nui-tabs>
      <nui-tab-route label="Tab 1" route="/page/tab1"></nui-tab-route>
      <nui-tab-route label="Tab 2" route="/page/tab2"></nui-tab-route>
    </nui-tabs>
    <!-- Router-outlet interno automático -->

    <button (click)="goToTab2()">Ir a Tab 2</button>
  `
})
export class MyComponent {
  private router = inject(Router);

  goToTab2() {
    this.router.navigate(['/page/tab2']);
    // El tab se activará automáticamente
  }
}
```

### Diferencias entre `nui-tab` y `nui-tab-route`

| Característica | `nui-tab` | `nui-tab-route` |
|----------------|-----------|-----------------|
| Contenido | Proyectado (`<ng-content>`) | Router (via router-outlet) |
| Navegación | Control manual | Router automático |
| URL sync | No | Sí |
| Uso principal | Contenido estático/dinámico | Rutas de navegación |
| Router-outlet | No necesario | Interno por defecto (o externo opcional) |

### Rutas Relativas vs Absolutas

```typescript
// Rutas relativas (recomendado)
<nui-tab-route route="./general"></nui-tab-route>
<nui-tab-route route="../other"></nui-tab-route>

// Rutas absolutas
<nui-tab-route route="/settings/general"></nui-tab-route>

// Con parámetros
<nui-tab-route [route]="['./user', userId]"></nui-tab-route>
```

### Combinar ambos tipos

Puedes mezclar `nui-tab` y `nui-tab-route` en el mismo `nui-tabs`:

```typescript
<nui-tabs>
  <!-- Tab normal con contenido estático -->
  <nui-tab label="Welcome">
    <h2>Bienvenido!</h2>
    <p>Contenido estático aquí</p>
  </nui-tab>

  <!-- Tabs con rutas (router-outlet interno automático) -->
  <nui-tab-route label="Dashboard" route="/dashboard"></nui-tab-route>
  <nui-tab-route label="Settings" route="/settings"></nui-tab-route>
</nui-tabs>
<!-- NO necesitas router-outlet aquí -->
```

## ⌨️ Navegación por Teclado

El componente sigue las mejores prácticas de ARIA con activación automática:

**Teclas soportadas:**

| Tecla | Acción (Horizontal) | Acción (Vertical) |
|-------|---------------------|-------------------|
| `→` | Siguiente tab y activa | - |
| `←` | Tab anterior y activa | - |
| `↓` | - | Siguiente tab y activa |
| `↑` | - | Tab anterior y activa |
| `Home` | Primer tab y activa | Primer tab y activa |
| `End` | Último tab y activa | Último tab y activa |
| `Tab` | Siguiente elemento focusable | Siguiente elemento focusable |
| `Shift + Tab` | Elemento anterior focusable | Elemento anterior focusable |

**En botones de scroll (`[scrollable]="true"`):**

| Tecla | Acción en botón Prev | Acción en botón Next |
|-------|----------------------|----------------------|
| `Enter` | Scroll a la izquierda | Scroll a la derecha |
| `Space` | Scroll a la izquierda | Scroll a la derecha |
| `→` | Saltar al primer tab | - |
| `←` | - | Saltar al último tab |

## ♿ Accesibilidad

✅ **Roles ARIA correctos**
- `role="tablist"` en el contenedor de navegación
- `role="tab"` en cada botón de tab
- `role="tabpanel"` en cada panel de contenido

✅ **Atributos ARIA**
- `aria-selected` indica el tab activo
- `aria-controls` conecta tab con su panel
- `aria-labelledby` conecta panel con su tab
- `aria-disabled` para tabs deshabilitados
- `aria-label` personalizable en el contenedor

✅ **Gestión de foco**
- `tabindex="0"` en tab activo
- `tabindex="-1"` en tabs inactivos
- Navegación circular con las flechas
- Activación automática al navegar con teclado

✅ **Lectores de pantalla**
- Anuncios correctos del estado del tab
- Información de posición (ej: "Tab 2 de 5")
- Soporte completo para NVDA, JAWS, VoiceOver

## 🎨 Personalización con CSS

El componente usa CSS custom properties del theme:

```scss
// Variables de espaciado
--nui-spacing-xs, --nui-spacing-s, --nui-spacing-sm, --nui-spacing-md, --nui-spacing-lg, --nui-spacing-xl

// Variables de borde
--nui-border-width-xs, --nui-border-width-s
--nui-border-radius-sm, --nui-border-radius-md, --nui-border-radius-pill

// Variables de tipografía
--nui-font-size-xs, --nui-font-size-sm, --nui-font-size-md, --nui-font-size-lg
--nui-font-weight-medium, --nui-font-weight-semibold

// Variables de transición
--nui-transition-duration-normal
--nui-transition-timing-function

// Variables generadas por color y variante
--tabs-{color}-{variant}-active-bg
--tabs-{color}-{variant}-active-text
--tabs-{color}-{variant}-active-border
--tabs-{color}-{variant}-inactive-hover-bg
--tabs-{color}-{variant}-inactive-hover-border

// Variables de botones de scroll
--tabs-{color}-scroll-btn-bg
--tabs-{color}-scroll-btn-color
--tabs-{color}-scroll-btn-border
--tabs-{color}-scroll-btn-hover-bg
--tabs-{color}-scroll-btn-hover-border
```

## ✅ Mejores Prácticas

### ✅ Hacer

- Usar lazy loading en tabs con componentes pesados o peticiones HTTP
- Usar iconos para mejorar la identificación visual
- Limitar el número de tabs a 5-7 para mejor UX (usa `[scrollable]="true"` si necesitas más)
- Usar badges para mostrar notificaciones o conteo
- Aprovechar la navegación por teclado
- Usar templates personalizados para casos complejos (avatares, estados en tiempo real)
- Usar `[scrollable]="true"` cuando tengas más de 8 tabs
- Añadir tooltips descriptivos para tabs con labels cortos

### ❌ Evitar

- Más de 10-12 tabs sin scroll (considera un menú lateral o navegación diferente)
- Labels muy largos (usa tooltips para info adicional)
- Lazy loading en el primer tab (siempre se renderiza de todos modos)
- Deshabilitar tabs sin dar feedback al usuario sobre por qué
- Templates complejos que afecten el rendimiento
- Usar templates personalizados para casos simples (usa `icon` y `badge`)

## � Integración con Angular Router

El sistema de tabs incluye integración completa con Angular Router mediante el componente especializado `nui-tab-route` y tres modos de routing diferentes.

### Componente TabRoute

```typescript
import { TabsComponent } from '@shared/components/tab/tabs.component';
import { TabRouteComponent } from '@shared/components/tab/tab-route.component';

@Component({
  imports: [TabsComponent, TabRouteComponent],
  // ...
})
```

### Modos de Routing

#### 1. **Routes Mode** (Rutas tradicionales)

Usa rutas completas de Angular Router. Ideal para navegación principal con URL limpias.

```html
<nui-tabs routingMode="routes">
  <nui-tab-route label="Dashboard" route="/app/dashboard" icon="ri-dashboard-line" />
  <nui-tab-route label="Analytics" route="/app/analytics" icon="ri-bar-chart-line" />
  <nui-tab-route label="Settings" route="/app/settings" icon="ri-settings-line" />
</nui-tabs>

<!-- Router outlet externo (opcional) -->
<router-outlet />
```

**URL resultante**: `/app/dashboard`, `/app/analytics`, `/app/settings`

**Características**:
- ✅ URLs limpias y SEO-friendly
- ✅ Navegación browser (back/forward) funciona
- ✅ Puede usar router-outlet externo o interno
- ✅ Perfecto para navegación de nivel superior

#### 2. **Query Params Mode**

Usa query parameters para mantener el estado. Ideal cuando quieres preservar la ruta base.

```html
<nui-tabs routingMode="query" queryParam="view">
  <nui-tab-route label="Grid View" route="grid" icon="ri-grid-line">
    <app-grid-view />
  </nui-tab-route>
  
  <nui-tab-route label="List View" route="list" icon="ri-list-check">
    <app-list-view />
  </nui-tab-route>
  
  <nui-tab-route label="Card View" route="card" icon="ri-layout-grid-line">
    <app-card-view />
  </nui-tab-route>
</nui-tabs>
```

**URL resultante**: `/page?view=grid`, `/page?view=list`, `/page?view=card`

**Características**:
- ✅ Mantiene la ruta base intacta
- ✅ Convive con otros query params
- ✅ Contenido inline con `<ng-content>`
- ✅ Ideal para filtros y vistas alternativas

#### 3. **Hash Mode** (Fragments)

Usa hash fragments para navegación en la misma página. Ideal para "anclas" y navegación suave.

```html
<nui-tabs routingMode="hash">
  <nui-tab-route label="Overview" route="overview" icon="ri-eye-line">
    <section id="overview">
      <h2>Overview Section</h2>
      <p>Content here...</p>
    </section>
  </nui-tab-route>
  
  <nui-tab-route label="Details" route="details" icon="ri-file-list-line">
    <section id="details">
      <h2>Details Section</h2>
      <p>Content here...</p>
    </section>
  </nui-tab-route>
</nui-tabs>
```

**URL resultante**: `/page#overview`, `/page#details`

**Características**:
- ✅ No requiere configuración de rutas
- ✅ Scroll automático a secciones (con IDs)
- ✅ Perfecto para documentación y landing pages
- ✅ Convive con rutas y query params

### Convivencia de Modos

**Los tres modos pueden convivir en la misma página sin conflictos:**

```html
<!-- Navegación principal por rutas -->
<nui-tabs routingMode="routes">
  <nui-tab-route label="Dashboard" route="/dashboard" />
  <nui-tab-route label="Reports" route="/reports" />
</nui-tabs>

<!-- Vista alternativa por query params -->
<nui-tabs routingMode="query" queryParam="layout">
  <nui-tab-route label="Grid" route="grid">...</nui-tab-route>
  <nui-tab-route label="List" route="list">...</nui-tab-route>
</nui-tabs>

<!-- Secciones de contenido por hash -->
<nui-tabs routingMode="hash">
  <nui-tab-route label="Section 1" route="section1">...</nui-tab-route>
  <nui-tab-route label="Section 2" route="section2">...</nui-tab-route>
</nui-tabs>
```

**URL completa**: `/dashboard?layout=grid#section1`

Cada grupo de tabs es completamente independiente y mantiene su propia selección.

### TabRouteComponent API

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `label` | `string` | - | Label del tab |
| `route` | `string \| any[]` | - | **Requerido**. Ruta, query value o fragment según el modo |
| `icon` | `string` | - | Clase del icono |
| `badge` | `number \| string` | - | Badge numérico o texto |
| `badgeColor` | `string` | - | Color personalizado del badge |
| `disabled` | `boolean` | `false` | Deshabilita el tab |
| `id` | `string` | auto | ID único del tab |
| `tooltip` | `string` | - | Tooltip personalizado |

### TabsComponent (Router-specific)

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `routingMode` | `'routes' \| 'query' \| 'hash'` | `'routes'` | Modo de routing a usar |
| `queryParam` | `string` | `'tab'` | Nombre del query param (solo para `routingMode="query"`) |

### Características Avanzadas

#### Preservación de URL completa

Cada modo preserva las otras partes de la URL:

- **Routes mode** preserva query params y hash
- **Query mode** preserva ruta y hash
- **Hash mode** preserva ruta y query params

```typescript
// URL inicial: /dashboard?layout=grid#section1

// Cambias el tab de Routes a /reports
// Resultado: /reports?layout=grid#section1 ✅

// Cambias el tab de Query a list
// Resultado: /reports?layout=list#section1 ✅

// Cambias el tab de Hash a section2
// Resultado: /reports?layout=list#section2 ✅
```

#### Sincronización automática

Los tabs se sincronizan automáticamente con la URL:

- Al navegar con browser back/forward
- Al cambiar la URL programáticamente
- Al recargar la página
- Al copiar/pegar URLs

#### Router Outlet: Interno vs Externo

**Modo Routes** soporta dos configuraciones:

```html
<!-- Router-outlet INTERNO (default) -->
<nui-tabs routingMode="routes">
  <nui-tab-route label="Tab 1" route="route1" />
  <nui-tab-route label="Tab 2" route="route2" />
  <!-- El router-outlet se renderiza automáticamente dentro -->
</nui-tabs>

<!-- Router-outlet EXTERNO (para layouts complejos) -->
<nui-tabs routingMode="routes" [useExternalOutlet]="true">
  <nui-tab-route label="Tab 1" route="route1" />
  <nui-tab-route label="Tab 2" route="route2" />
</nui-tabs>

<div class="custom-layout">
  <router-outlet /> <!-- Outlet externo -->
</div>
```

#### Control externo

Puedes controlar los tabs programáticamente:

```typescript
export class MyComponent {
  selectedIndex = signal(0);

  // Cambiar tab programáticamente
  goToTab(index: number) {
    this.selectedIndex.set(index);
    // La navegación a la ruta correspondiente ocurre automáticamente
  }
}
```

```html
<nui-tabs 
  routingMode="routes"
  [(selectedIndex)]="selectedIndex">
  <nui-tab-route label="Tab 1" route="/tab1" />
  <nui-tab-route label="Tab 2" route="/tab2" />
</nui-tabs>

<button (click)="goToTab(1)">Go to Tab 2</button>
```

### Ejemplo Completo

```typescript
import { Component } from '@angular/core';
import { TabsComponent } from '@shared/components/tab/tabs.component';
import { TabRouteComponent } from '@shared/components/tab/tab-route.component';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [TabsComponent, TabRouteComponent],
  template: `
    <!-- Navegación principal -->
    <nui-tabs routingMode="routes" variant="enclosed" color="primary">
      <nui-tab-route 
        label="Dashboard" 
        route="/app/dashboard" 
        icon="ri-dashboard-line" />
      <nui-tab-route 
        label="Analytics" 
        route="/app/analytics" 
        icon="ri-bar-chart-line" />
    </nui-tabs>

    <router-outlet />

    <!-- Vista alternativa en la misma página -->
    <nui-tabs routingMode="query" queryParam="view" variant="pills">
      <nui-tab-route label="Grid" route="grid" icon="ri-grid-line">
        <app-grid-view />
      </nui-tab-route>
      <nui-tab-route label="List" route="list" icon="ri-list-check">
        <app-list-view />
      </nui-tab-route>
    </nui-tabs>
  `
})
export class MyPageComponent {}
```

## �🔧 Notas Técnicas

- **Signals-based**: Usa Angular signals para reactividad óptima
- **OnPush**: Change detection optimizada
- **Standalone**: No requiere módulos
- **CSS Variables**: Totalmente tematizable
- **ViewEncapsulation.None**: Permite personalización global
- **Auto-ID Generation**: IDs únicos automáticos para accesibilidad
- **Smooth Scroll**: Animaciones suaves en scroll horizontal
- **Router Integration**: Sincronización automática bidireccional con Angular Router

## 🌐 Soporte de Navegadores

| Navegador | Versión Mínima | Notas |
|-----------|----------------|-------|
| Chrome | 90+ | ✅ Soporte completo |
| Edge | 90+ | ✅ Soporte completo |
| Firefox | 88+ | ✅ Soporte completo |
| Safari | 14+ | ✅ Soporte completo |
| Opera | 76+ | ✅ Soporte completo |

## 📚 Recursos Adicionales

- **Ejemplos interactivos**: `src/app/features/test/sections/tab/tab-section.component.ts`
- **Código fuente**: `src/app/shared/components/tab/`
- **ARIA Authoring Practices**: [W3C Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- **RemixIcon**: [https://remixicon.com/](https://remixicon.com/)

## 🐛 Troubleshooting

### Los botones de scroll no aparecen

Asegúrate de que:
1. `[scrollable]="true"` está configurado
2. El contenedor de tabs tiene un ancho limitado que causa overflow
3. Hay suficientes tabs para que se desborden del contenedor

### El lazy loading no funciona

Recuerda que:
- El primer tab siempre se renderiza inmediatamente
- Una vez renderizado, el contenido permanece en el DOM
- Solo usa `[lazy]="true"` en tabs con contenido pesado

### Los templates personalizados no se muestran

Verifica que:
- Estás usando `#tabHeader` (no `#tabLabel`)
- El template está dentro del `<nui-tab>`
- No estás usando `label` junto con `#tabHeader` (el template reemplaza todo)

### La navegación por router no funciona

Verifica que:
- Estás usando `<nui-tab-route>` (no `<nui-tab>`)
- La propiedad `route` está configurada en cada tab
- Las rutas están configuradas en tu `app.routes.ts` (solo para `routingMode="routes"`)
- El componente tiene acceso al Router (importado en la app)

### Los tabs pierden su selección al cambiar entre grupos

Esto **no debería ocurrir** si estás usando diferentes `routingMode` para cada grupo:
- Cada grupo es completamente independiente
- Cada `nui-tab-route` verifica su propia configuración de routing
- Si ocurre, verifica que no haya conflictos en los nombres de `queryParam`

```html
<!-- ✅ CORRECTO: Diferentes modos o diferentes queryParams -->
<nui-tabs routingMode="routes">...</nui-tabs>
<nui-tabs routingMode="query" queryParam="view">...</nui-tabs>
<nui-tabs routingMode="hash">...</nui-tabs>

<!-- ❌ INCORRECTO: Mismo modo y mismo queryParam -->
<nui-tabs routingMode="query" queryParam="tab">...</nui-tabs>
<nui-tabs routingMode="query" queryParam="tab">...</nui-tabs>
```

### El contenido no cambia en modo query/hash

Asegúrate de que:
- Estás usando `<ng-content>` dentro de `<nui-tab-route>` para contenido inline
- El contenido está correctamente proyectado entre las etiquetas del tab

```html
<!-- ✅ CORRECTO -->
<nui-tab-route label="Grid" route="grid">
  <app-grid-view />
</nui-tab-route>

<!-- ❌ INCORRECTO: Sin contenido -->
<nui-tab-route label="Grid" route="grid" />
```

### El router-outlet no muestra contenido (Routes mode)

Verifica:
1. Las rutas están correctamente configuradas en `app.routes.ts`
2. Usas router-outlet interno (default) o externo con `[useExternalOutlet]="true"`
3. Los componentes de las rutas están correctamente importados

---

## 📊 Tests y Cobertura

El componente incluye tests unitarios completos que cubren:

- ✅ **Routes Mode**: Navegación y sincronización con rutas completas
- ✅ **Query Params Mode**: Sincronización con query parameters
- ✅ **Hash Mode**: Sincronización con fragments
- ✅ **Múltiples Grupos**: Independencia entre grupos de tabs
- ✅ **Preservación de URL**: Verificación de que se mantienen todas las partes de la URL
- ✅ **LiveAnnouncer**: Anuncios a screen readers
- ✅ **Presets**: Aplicación correcta de configuraciones predefinidas
- ✅ **Optimización**: Verificación de syncs solo cuando es relevante
- ✅ **Edge Cases**: Casos límite y manejo de errores

**Archivo de tests**: `src/app/shared/components/tab/tabs.component.spec.ts`

---

**Versión**: 2.0.0  
**Última actualización**: Octubre 2025  
**Mejoras recientes**:
- ✅ LiveAnnouncer para accesibilidad mejorada
- ✅ 8 Presets de configuración listos para usar
- ✅ Optimización de Router Sync (reducción de renders innecesarios)
- ✅ Documentación JSDoc exhaustiva con ejemplos
- ✅ Tests unitarios completos
