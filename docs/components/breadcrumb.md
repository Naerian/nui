# Breadcrumb Component

Componente de navegación jerárquica que muestra la ruta actual del usuario en la aplicación. Soporta colapso automático, temas visuales, modo responsive y visualización optimizada para móviles.

## 📦 Importación

```typescript
import { BreadcrumbComponent } from '@shared/components/breadcrumb';
```

## 🎯 Selector

```html
<nui-breadcrumb></nui-breadcrumb>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `homeLabel` | `string` | `'Home'` | Texto para el enlace de inicio |
| `homeIcon` | `string` | `'ri-home-line'` | Icono de RemixIcon para el inicio |
| `items` | `BreadCrumbEntity[]` | `[]` | Items del breadcrumb (modo manual). Si no se proporciona, se construye automáticamente desde las rutas |
| `maxVisibleItems` | `number \| undefined` | `undefined` | Número máximo de items visibles antes de colapsar. Si es undefined, muestra todos |
| `collapseMode` | `'start' \| 'middle' \| 'end'` | `'middle'` | Modo de colapso: 'start' (colapsa primeros), 'middle' (colapsa medio), 'end' (colapsa últimos) |
| `maxItemLength` | `number` | `30` | Longitud máxima del texto de cada item. Si excede, se trunca con "..." |
| `responsiveBreakpoints` | `BreadcrumbResponsiveBreakpoints` | `{ mobile: 3, tablet: 4 }` | Configura cuántos items mostrar según tamaño de pantalla |
| `separator` | `'arrow' \| 'slash' \| 'chevron' \| 'dot'` | `'arrow'` | Tipo de separador visual entre items |
| `variant` | `'primary' \| 'secondary' \| 'accent'` | `'primary'` | Tema visual del breadcrumb siguiendo la paleta de colores de la app |
| `mobileDisplayMode` | `'full' \| 'icons-only' \| 'compact'` | `'full'` | **NUEVO** - Controla cómo se muestran los items en mobile (<576px) |
| `loading` | `boolean` | `false` | Muestra estado de carga con skeleton |
| `enableSEO` | `boolean` | `true` | Habilita JSON-LD structured data para SEO |
| `showCopyButton` | `boolean` | `false` | Muestra botón para copiar el path completo |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `breadcrumbClick` | `EventEmitter<BreadcrumbClickEvent>` | Se emite al hacer clic en un item del breadcrumb |
| `pathCopied` | `EventEmitter<string>` | Se emite cuando se copia el path completo (requiere `showCopyButton="true"`) |

### Tipos

```typescript
interface BreadCrumbEntity {
  label: string;        // Texto a mostrar
  url: string;          // URL de navegación
  icon?: string;        // Icono opcional (clase RemixIcon, ej: 'ri-home-line')
}

interface BreadcrumbResponsiveBreakpoints {
  mobile?: number;      // Items visibles en mobile (<576px)
  tablet?: number;      // Items visibles en tablet (576px-768px)
  desktop?: number;     // Items visibles en desktop (>768px)
}

interface BreadcrumbClickEvent {
  label: string;        // Label del item clickeado
  url: string;          // URL del item clickeado
  index: number;        // Posición del item (0-based, 0 = Home)
  timestamp: number;    // Timestamp UNIX del click
}

type BreadcrumbCollapseMode = 'start' | 'middle' | 'end';
type BreadcrumbSeparator = 'arrow' | 'slash' | 'chevron' | 'dot';
type BreadcrumbColor = 'primary' | 'secondary' | 'accent';
type BreadcrumbMobileDisplay = 'full' | 'icons-only' | 'compact';
```

## 💡 Ejemplos de Uso

### Modo Automático (Recomendado)

El breadcrumb se construye automáticamente desde las rutas de Angular Router:

```html
<!-- En tu layout principal -->
<nui-breadcrumb></nui-breadcrumb>
```

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'admin',
    data: { breadcrumb: 'Administración' },
    children: [
      {
        path: 'users',
        data: { breadcrumb: 'Usuarios' },
        children: [
          {
            path: ':id',
            data: { breadcrumb: 'Detalle' },
            component: UserDetailComponent
          }
        ]
      }
    ]
  }
];

// Navegando a /admin/users/123 mostrará:
// Home > Administración > Usuarios > Detalle
```

### Modo Manual

Define manualmente los items del breadcrumb:

```html
<nui-breadcrumb 
  [items]="breadcrumbItems"
  (breadcrumbClick)="handleClick($event)">
</nui-breadcrumb>
```

```typescript
import { Component } from '@angular/core';
import { BreadCrumbEntity } from '@shared/components/breadcrumb';

@Component({
  selector: 'app-example',
  template: `
    <nui-breadcrumb 
      [items]="breadcrumbItems"
      (breadcrumbClick)="handleClick($event)">
    </nui-breadcrumb>
  `
})
export class ExampleComponent {
  breadcrumbItems: BreadCrumbEntity[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'ri-dashboard-line' },
    { label: 'Proyectos', url: '/projects' },
    { label: 'Proyecto A', url: '/projects/a' },
    { label: 'Configuración', url: '' }  // Item actual (sin URL navega)
  ];

  handleClick(event: BreadcrumbClickEvent) {
    console.log('Navegando a:', event);
    // Implementar lógica personalizada
  }
}
```

### Personalización del Home

```html
<!-- Personalizar label e icono de Home -->
<nui-breadcrumb 
  homeLabel="Inicio"
  homeIcon="ri-home-3-line">
</nui-breadcrumb>

<!-- Sin icono de Home -->
<nui-breadcrumb 
  homeLabel="Dashboard"
  [homeIcon]="undefined">
</nui-breadcrumb>
```

### Separadores

```html
<!-- Separador con flecha doble (default) -->
<nui-breadcrumb separator="arrow"></nui-breadcrumb>
<!-- Home >> Products >> Category -->

<!-- Separador con barra diagonal -->
<nui-breadcrumb separator="slash"></nui-breadcrumb>
<!-- Home / Products / Category -->

<!-- Separador con chevron -->
<nui-breadcrumb separator="chevron"></nui-breadcrumb>
<!-- Home › Products › Category -->

<!-- Separador con punto -->
<nui-breadcrumb separator="dot"></nui-breadcrumb>
<!-- Home • Products • Category -->
```

### Temas Visuales

```html
<!-- Tema Primary (Teal - #0d9488) - Default -->
<nui-breadcrumb variant="primary"></nui-breadcrumb>

<!-- Tema Secondary (Slate gris - #64748b) -->
<nui-breadcrumb variant="secondary"></nui-breadcrumb>

<!-- Tema Accent (Púrpura - #9333ea) -->
<nui-breadcrumb variant="accent"></nui-breadcrumb>
```

### Colapso Automático

```html
<!-- Colapsar automáticamente cuando hay más de 4 items -->
<nui-breadcrumb 
  [items]="longItems"
  [maxVisibleItems]="4"
  collapseMode="middle">
</nui-breadcrumb>
<!-- Resultado con 8 items: Home > Item 1 > ... > Item 7 > Item 8 -->

<!-- Colapsar al inicio (muestra últimos items) -->
<nui-breadcrumb 
  [maxVisibleItems]="4"
  collapseMode="start">
</nui-breadcrumb>
<!-- Resultado: ... > Item 5 > Item 6 > Item 7 > Item 8 -->

<!-- Colapsar al final (muestra primeros items) -->
<nui-breadcrumb 
  [maxVisibleItems]="4"
  collapseMode="end">
</nui-breadcrumb>
<!-- Resultado: Home > Item 1 > Item 2 > Item 3 > ... -->
```

### 📱 Modo de Visualización Mobile (NUEVO)

Controla cómo se muestran los breadcrumbs en pantallas pequeñas (<576px):

```html
<!-- Full: Labels completos (default) -->
<nui-breadcrumb mobileDisplayMode="full"></nui-breadcrumb>

<!-- Icons Only: Solo íconos en mobile -->
<nui-breadcrumb 
  [items]="[
    { label: 'Home', url: '/', icon: 'ri-home-line' },
    { label: 'Products', url: '/products', icon: 'ri-shopping-bag-line' },
    { label: 'Electronics', url: '/electronics', icon: 'ri-smartphone-line' }
  ]"
  mobileDisplayMode="icons-only"
  variant="primary">
</nui-breadcrumb>
<!-- En mobile muestra: 🏠 > 🛍️ > 📱 -->
<!-- Si no hay ícono, muestra primeras 2 letras: 🏠 > Pr > El -->

<!-- Compact: Trunca automáticamente -->
<nui-breadcrumb 
  [maxItemLength]="30"
  mobileDisplayMode="compact">
</nui-breadcrumb>
<!-- En mobile, maxItemLength se reduce a 15 automáticamente -->

<!-- Combinado con responsive breakpoints -->
<nui-breadcrumb 
  mobileDisplayMode="icons-only"
  [responsiveBreakpoints]="{ mobile: 3, tablet: 5 }"
  variant="secondary">
</nui-breadcrumb>
<!-- mobileDisplayMode controla CÓMO se muestran -->
<!-- responsiveBreakpoints controla CUÁNTOS se muestran -->
```

### Responsive Breakpoints

```html
<!-- Configuración personalizada por tamaño de pantalla -->
<nui-breadcrumb 
  [responsiveBreakpoints]="{
    mobile: 2,    // Máximo 2 items en mobile (<576px)
    tablet: 4,    // Máximo 4 items en tablet (576-768px)
    desktop: 6    // Máximo 6 items en desktop (>768px)
  }">
</nui-breadcrumb>
```

### Truncado de Texto

```html
<!-- Truncar labels largos -->
<nui-breadcrumb [maxItemLength]="20"></nui-breadcrumb>
<!-- "Very Long Product Name" → "Very Long Produ..." -->

<!-- El texto completo se muestra en el atributo title al hacer hover -->
```

### Breadcrumb con Iconos

```typescript
breadcrumbItems: BreadCrumbEntity[] = [
  { 
    label: 'Dashboard', 
    url: '/dashboard', 
    icon: 'ri-dashboard-line' 
  },
  { 
    label: 'Usuarios', 
    url: '/users', 
    icon: 'ri-user-line' 
  },
  { 
    label: 'Juan Pérez',
    url: '',
    icon: 'ri-user-3-line' 
  }
];
```

### Estado de Carga (Loading)

```html
<nui-breadcrumb [loading]="isLoading"></nui-breadcrumb>
<!-- Muestra skeleton animado mientras carga -->
```

### SEO con JSON-LD

```html
<!-- Habilita structured data para mejorar SEO -->
<nui-breadcrumb [enableSEO]="true"></nui-breadcrumb>
<!-- Genera automáticamente JSON-LD siguiendo schema.org -->
```

### Botón para Copiar Path

```html
<nui-breadcrumb 
  [showCopyButton]="true"
  (pathCopied)="onPathCopied($event)">
</nui-breadcrumb>
```

```typescript
onPathCopied(path: string) {
  console.log('Path copiado:', path);
  // Ejemplo: "Home > Products > Electronics > Phones"
  this.showToast('Path copiado al portapapeles');
}
```

### Eventos de Click

```html
<nui-breadcrumb (breadcrumbClick)="onBreadcrumbClick($event)"></nui-breadcrumb>
```

```typescript
onBreadcrumbClick(event: BreadcrumbClickEvent) {
  console.log('Item clickeado:', event.label);
  console.log('URL:', event.url);
  console.log('Posición:', event.index);
  console.log('Timestamp:', new Date(event.timestamp));
  
  // Enviar a analytics
  this.analytics.track('Breadcrumb Navigation', {
    label: event.label,
    url: event.url,
    position: event.index
  });
}
```

## 🎨 Estilos Personalizados

```scss
// Personalizar colores del breadcrumb
nui-breadcrumb {
  --breadcrumb-separator-color: #999;
  --separator-breadcrumb-color: #999;
}

// Variables disponibles (se heredan del tema)
nui-breadcrumb {
  --text-primary: #333;
  --text-secondary: #666;
  --surface-primary: #fff;
  --nui-bg-secondary: #f5f5f5;
  --border-primary: 1px solid #e0e0e0;
}
```

## ♿ Accesibilidad

- ✅ Usa `<nav>` con `aria-label="Breadcrumb"`
- ✅ Lista semántica con enlaces navegables
- ✅ Último item marcado con `aria-current="page"`
- ✅ Navegable por teclado (Tab, Enter)
- ✅ Separadores visuales ignorados por lectores de pantalla
- ✅ Soporte completo para atributos `title` en texto truncado
- ✅ Botón de colapso con `aria-expanded` y `aria-label`
- ✅ JSON-LD structured data para SEO

## 📱 Responsive

El componente adapta su comportamiento automáticamente:

- **Desktop (>768px)**: Muestra todos los items (con colapso según configuración)
- **Tablet (576-768px)**: Reduce padding y espaciado
- **Mobile (<576px)**: 
  - Aplica `responsiveBreakpoints.mobile` (default: 3 items)
  - Respeta el `mobileDisplayMode` configurado
  - Adapta el scroll horizontal en caso necesario

### Configuración Responsive Recomendada

```html
<!-- Para dashboards y admin panels -->
<nui-breadcrumb 
  [responsiveBreakpoints]="{ mobile: 3, tablet: 5 }"
  mobileDisplayMode="icons-only"
  variant="primary">
</nui-breadcrumb>

<!-- Para e-commerce -->
<nui-breadcrumb 
  [responsiveBreakpoints]="{ mobile: 2, tablet: 4 }"
  mobileDisplayMode="compact"
  [maxItemLength]="25"
  variant="accent">
</nui-breadcrumb>

<!-- Para blogs y contenido -->
<nui-breadcrumb 
  [responsiveBreakpoints]="{ mobile: 3, tablet: 4 }"
  mobileDisplayMode="full"
  [maxItemLength]="30"
  variant="secondary">
</nui-breadcrumb>
```

## 💡 Buenas Prácticas

1. **Usa modo automático cuando sea posible** - Define breadcrumbs en `app.routes.ts` con la propiedad `data: { breadcrumb: '...' }`
2. **Limita el número de niveles** - Máximo 5-6 niveles de profundidad para mantener claridad
3. **Usa nombres cortos y descriptivos** - Evita textos muy largos, usa `maxItemLength` si es necesario
4. **Mantén consistencia en separadores** - Usa el mismo separador en toda la app
5. **El último item no debe ser clickeable** - Representa la página actual
6. **Usa íconos con moderación** - Solo en items importantes (Home, secciones principales)
7. **Habilita SEO** - Deja `enableSEO="true"` para mejorar indexación
8. **Configura responsive** - Define `responsiveBreakpoints` y `mobileDisplayMode` según tu caso de uso
9. **Usa temas coherentes** - Selecciona `variant` según la paleta de tu app:
   - **primary** (Teal): Para dashboards y secciones principales
   - **secondary** (Slate): Para áreas administrativas y configuración
   - **accent** (Púrpura): Para destacar secciones especiales o de negocio

## 🔧 Configuración Avanzada

### Breadcrumb Dinámico con Resolvers

```typescript
// user.resolver.ts
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']);
  }
}

// app.routes.ts
export const routes: Routes = [
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: { user: UserResolver },
    data: { 
      breadcrumb: 'breadcrumbFromResolver'  // Clave especial
    }
  }
];

// user-detail.component.ts
export class UserDetailComponent implements OnInit {
  breadcrumbItems: BreadCrumbEntity[] = [];
  
  ngOnInit() {
    const user = this.route.snapshot.data['user'];
    this.breadcrumbItems = [
      { label: 'Users', url: '/users', icon: 'ri-user-line' },
      { label: user.name, url: '', icon: 'ri-user-3-line' }
    ];
  }
}
```

### Integración con Eventos de Analytics

```typescript
export class LayoutComponent {
  constructor(private analytics: AnalyticsService) {}
  
  onBreadcrumbClick(event: BreadcrumbClickEvent) {
    this.analytics.trackEvent('Breadcrumb Navigation', {
      label: event.label,
      url: event.url,
      position: event.index,
      timestamp: event.timestamp
    });
  }
  
  onPathCopied(path: string) {
    this.analytics.trackEvent('Breadcrumb Path Copied', {
      path: path,
      length: path.length
    });
    this.toastService.success('Path copiado al portapapeles');
  }
}
```

## 🚀 Performance

- **Lazy Loading**: Compatible con rutas lazy loaded
- **Change Detection**: Usa signals para optimizar renders
- **CSS Variables**: Estilos optimizados con variables CSS
- **Tree Shaking**: Standalone component, solo importa lo necesario

## 🔗 Ver También

- [Router Configuration](https://angular.dev/guide/routing)
- [Button Component](./button.md)
- [Card Component](./card.md)

---

**Última actualización:** Octubre 2025  
**Versión:** 2.0 (Con soporte para `mobileDisplayMode` y temas `primary`/`secondary`/`accent`)
