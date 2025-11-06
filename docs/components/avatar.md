# Avatar Component 👤

> **Sistema completo de avatares con soporte para imágenes, iniciales, iconos y agrupación inteligente**

Componente moderno y flexible para representar usuarios, entidades o cualquier elemento visual mediante imágenes, iniciales o iconos. Incluye componente de grupo con apilamiento, límites configurables y sistema de fallback robusto.

---

## 📑 Tabla de Contenidos

1. [Características](#características-)
2. [Instalación](#instalación)
3. [Uso Rápido](#uso-rápido)
4. [Avatar Simple](#avatar-simple)
5. [Avatar Group](#avatar-group)
6. [Configuración](#configuración)
7. [Sistema de Fallback](#sistema-de-fallback)
8. [Variantes y Estilos](#variantes-y-estilos)
9. [Accesibilidad](#accesibilidad-)
10. [Theming y Variables CSS](#theming-y-variables-css)
11. [Ejemplos Completos](#ejemplos-completos)
12. [API Reference](#api-reference)
13. [Troubleshooting](#troubleshooting)

---

## Características ✨

### 🎯 Avatar Simple

- ✅ **3 tipos de contenido**: Imagen, Iniciales, Icono
- ✅ **3 variantes de forma**: Circular, Rounded, Square
- ✅ **5 tamaños predefinidos**: xs (24px), sm (32px), md (40px), lg (56px), xl (80px)
- ✅ **7 colores semánticos**: primary, secondary, accent, success, info, warning, danger
- ✅ **Tamaño personalizado**: Píxeles, rem, em
- ✅ **Sistema de fallback**: Imagen → Iniciales → Icono → Primera letra → Icono genérico
- ✅ **Soporte para imágenes**: Con manejo de errores automático
- ✅ **Iconos RemixIcon**: Integración nativa con la librería de iconos

### 👥 Avatar Group

- ✅ **Apilamiento inteligente**: Superposición configurable con margen negativo
- ✅ **Límite de avatares**: Muestra solo N avatares + indicador "+X"
- ✅ **Espaciado personalizable**: Control fino del solapamiento
- ✅ **Bordes opcionales**: Para separación visual en fondos claros
- ✅ **Hover effects**: Elevación y escala al pasar el mouse
- ✅ **Tooltips opcionales**: Información adicional en cada avatar
- ✅ **Unificación**: Tamaño y variante consistentes para todos

### 🎨 Diseño y UX

- 🌓 **Theming**: Soporte automático para temas claro/oscuro
- 📱 **Responsive**: Funciona en todos los dispositivos
- ♿ **Accesible**: ARIA labels, alt text, navegación por teclado
- 🎭 **Animaciones**: Transiciones suaves y profesionales
- 💅 **Customizable**: Variables CSS, mixins SCSS, clases utility
- 🎯 **ViewEncapsulation.None**: Estilos globales y reutilizables

### 💎 Developer Experience

- 📘 **TypeScript completo**: Interfaces tipadas, validación en tiempo de compilación
- 🧩 **Standalone components**: No requiere módulos adicionales
- 🔍 **OnPush**: Optimización automática de detección de cambios
- 🎯 **Signals API**: Reactividad moderna con computed signals
- 📦 **Tree-shakeable**: Solo importa lo que necesitas
- 🧪 **Testeable**: Componentes aislados y fáciles de mockear

---

## Instalación

El componente ya está incluido en el proyecto. Importa donde lo necesites:

```typescript
import { Component } from '@angular/core';
import { AvatarComponent } from '@shared/components/avatar';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <nui-avatar src="user.jpg" alt="John Doe" />
  `
})
export class MyComponent {}
```

---

## Uso Rápido

### Avatar Básico (1 línea)

```html
<!-- Con imagen -->
<nui-avatar src="https://i.pravatar.cc/150?img=5" alt="Usuario" />

<!-- Con iniciales -->
<nui-avatar initials="JD" />

<!-- Con icono -->
<nui-avatar icon="ri-user-line" />
```

### Avatar Group (1 línea)

```typescript
// En el componente
users = [
  { src: 'user1.jpg', alt: 'John Doe' },
  { initials: 'AM', color: 'primary' },
  { icon: 'ri-user-line', color: 'success' }
];
```

```html
<nui-avatar-group [avatars]="users" [max]="3" />
```

---

## Avatar Simple

### Tipos de Contenido

El avatar puede mostrar **imagen**, **iniciales** o **icono**. La prioridad de visualización es:

1. **Imagen** (`src`) - Si está presente y carga correctamente
2. **Iniciales** (`initials`) - Si no hay imagen o falla
3. **Icono** (`icon`) - Si no hay iniciales
4. **Fallback automático** - Primera letra de `alt` o icono genérico

#### 1. Avatar con Imagen

```html
<nui-avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="John Doe"
  size="md"
  variant="circular"
/>
```

**Características:**
- Manejo automático de errores de carga
- Fallback a iniciales/icono si falla
- `object-fit: cover` para mantener aspecto
- Alt text para accesibilidad

#### 2. Avatar con Iniciales

```html
<nui-avatar
  initials="JD"
  color="primary"
  size="lg"
  variant="rounded"
/>
```

**Características:**
- Texto transformado a mayúsculas automáticamente
- Centrado vertical y horizontal
- Color de fondo personalizable
- Máximo 2-3 caracteres recomendado

#### 3. Avatar con Icono

```html
<nui-avatar
  icon="ri-user-line"
  color="success"
  size="xl"
  variant="square"
/>
```

**Características:**
- Iconos de RemixIcon
- Tamaño del icono escalado automáticamente
- Color de fondo del sistema de diseño
- Centrado perfecto

---

## Avatar Group

### Uso Básico

El componente `AvatarGroupComponent` permite agrupar múltiples avatares con superposición visual.

```typescript
import { Component } from '@angular/core';
import { AvatarGroupComponent } from '@shared/components/avatar';
import { AvatarGroupItem } from '@shared/components/avatar/models/avatar.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [AvatarGroupComponent],
  template: `
    <nui-avatar-group
      [avatars]="teamMembers"
      [max]="5"
      [spacing]="-8"
      [bordered]="true"
      size="md"
      variant="circular"
    />
  `
})
export class TeamComponent {
  teamMembers: AvatarGroupItem[] = [
    { src: 'user1.jpg', alt: 'John Doe', tooltip: 'John Doe - CEO' },
    { initials: 'AM', color: 'primary', alt: 'Anna Marie', tooltip: 'Anna Marie - CTO' },
    { initials: 'RC', color: 'success', alt: 'Robert Chen', tooltip: 'Robert Chen - Developer' },
    { icon: 'ri-user-line', color: 'info', alt: 'Guest User' },
    { initials: 'SK', color: 'warning', alt: 'Sarah Kim' },
    { initials: 'MJ', color: 'danger', alt: 'Mike Johnson' }
  ];
}
```

**Resultado:**
- Muestra 5 avatares apilados
- El 6º avatar se convierte en "+1"
- Bordes blancos alrededor de cada avatar
- Tooltips al hacer hover (si están definidos)

### Configuración del Grupo

#### Límite de Avatares

```html
<!-- Muestra máximo 3 avatares -->
<nui-avatar-group [avatars]="users" [max]="3" />

<!-- Sin límite (muestra todos) -->
<nui-avatar-group [avatars]="users" />
```

#### Espaciado Personalizado

```html
<!-- Superposición ligera -->
<nui-avatar-group [avatars]="users" [spacing]="-4" />

<!-- Superposición media (default) -->
<nui-avatar-group [avatars]="users" [spacing]="-8" />

<!-- Superposición pronunciada -->
<nui-avatar-group [avatars]="users" [spacing]="-12" />

<!-- Sin superposición -->
<nui-avatar-group [avatars]="users" [spacing]="4" />
```

#### Bordes

```html
<!-- Con bordes (recomendado en fondos claros) -->
<nui-avatar-group [avatars]="users" [bordered]="true" />

<!-- Sin bordes -->
<nui-avatar-group [avatars]="users" [bordered]="false" />
```

#### Tamaño y Variante Unificados

```html
<!-- Todos los avatares del grupo tendrán tamaño 'lg' y forma 'rounded' -->
<nui-avatar-group
  [avatars]="users"
  size="lg"
  variant="rounded"
/>
```

---

## Configuración

### Propiedades del Avatar Simple

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `variant` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Forma del avatar |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamaño predefinido |
| `color` | `NUIColor` | `'secondary'` | Color de fondo (para iniciales/iconos) |
| `src` | `string` | `undefined` | URL de la imagen |
| `alt` | `string` | `''` | Texto alternativo (accesibilidad + fallback) |
| `initials` | `string` | `undefined` | Iniciales a mostrar |
| `icon` | `string` | `undefined` | Clase del icono RemixIcon |
| `customSize` | `number` | `undefined` | Tamaño en píxeles (sobrescribe `size`) |

### Propiedades del Avatar Group

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `avatars` | `AvatarGroupItem[]` | `[]` | Lista de avatares a mostrar |
| `max` | `number` | `undefined` | Número máximo de avatares visibles |
| `spacing` | `number \| string` | `'-8px'` | Espaciado entre avatares (valores negativos = superposición) |
| `size` | `NUISize` | `'md'` | Tamaño para todos los avatares del grupo |
| `variant` | `AvatarVariant` | `'circular'` | Variante para todos los avatares |
| `bordered` | `boolean` | `false` | Añade bordes a los avatares |

### Tamaños Predefinidos

| Tamaño | Dimensiones | Font Size | Icon Size | Uso Recomendado |
|--------|-------------|-----------|-----------|-----------------|
| `xs` | 24×24px | 12px | 14px | Avatares inline, comentarios |
| `sm` | 32×32px | 14px | 16px | Listas compactas, chips |
| `md` | 40×40px | 16px | 20px | **Default**, navegación, cards |
| `lg` | 56×56px | 20px | 28px | Perfiles, headers |
| `xl` | 80×80px | 24px | 40px | Perfiles destacados, páginas de usuario |

### Variantes de Forma

```html
<!-- Circular (default) - Ideal para personas -->
<nui-avatar variant="circular" initials="JD" />

<!-- Rounded - Versátil, moderno -->
<nui-avatar variant="rounded" initials="JD" />

<!-- Square - Para logos, iconos de app -->
<nui-avatar variant="square" initials="JD" />
```

### Colores Disponibles

```html
<nui-avatar initials="P" color="primary" />   <!-- Teal -->
<nui-avatar initials="S" color="secondary" /> <!-- Slate -->
<nui-avatar initials="A" color="accent" />    <!-- Purple -->
<nui-avatar initials="S" color="success" />   <!-- Green -->
<nui-avatar initials="I" color="info" />      <!-- Cyan -->
<nui-avatar initials="W" color="warning" />   <!-- Amber -->
<nui-avatar initials="D" color="danger" />    <!-- Red -->
```

---

## Sistema de Fallback

El avatar tiene un sistema inteligente de fallback en cascada:

### Orden de Prioridad

1. **Imagen cargada** (`src`)
   - Si la URL carga correctamente → Muestra la imagen

2. **Iniciales** (`initials`)
   - Si no hay imagen o falla → Muestra las iniciales

3. **Icono** (`icon`)
   - Si no hay iniciales → Muestra el icono especificado

4. **Primera letra de `alt`**
   - Si no hay icono pero hay `alt` → Extrae la primera letra

5. **Icono genérico**
   - Si nada más está disponible → Muestra `ri-user-line`

### Ejemplo de Fallback en Acción

```html
<!-- Intenta cargar imagen, si falla muestra iniciales -->
<nui-avatar
  src="https://example.com/broken-link.jpg"
  initials="JD"
  alt="John Doe"
/>
```

**Flujo:**
1. Intenta cargar `src` → ❌ Falla
2. Muestra `initials` ("JD") → ✅ Éxito

```html
<!-- Solo alt text, sin imagen ni iniciales -->
<nui-avatar alt="Maria Garcia" />
```

**Flujo:**
1. No hay `src` → ⏭️ Salta
2. No hay `initials` → ⏭️ Salta
3. No hay `icon` → ⏭️ Salta
4. Extrae primera letra de `alt` → Muestra "M"

---

## Variantes y Estilos

### Tamaño Personalizado

Además de los tamaños predefinidos, puedes especificar un tamaño exacto:

```html
<!-- Tamaño de 64px -->
<nui-avatar initials="JD" [customSize]="64" />

<!-- Combina con variante -->
<nui-avatar
  initials="JD"
  variant="rounded"
  [customSize]="100"
/>
```

### Combinaciones Populares

#### Avatar de Usuario Estándar
```html
<nui-avatar
  src="user.jpg"
  alt="John Doe"
  size="md"
  variant="circular"
/>
```

#### Badge de Aplicación
```html
<nui-avatar
  src="app-logo.png"
  alt="MyApp"
  size="lg"
  variant="square"
/>
```

#### Placeholder de Usuario
```html
<nui-avatar
  icon="ri-user-line"
  color="secondary"
  size="xl"
  variant="circular"
/>
```

#### Avatar con Iniciales Coloridas
```html
<div class="avatar-list">
  <nui-avatar initials="JD" color="primary" />
  <nui-avatar initials="AM" color="success" />
  <nui-avatar initials="RC" color="info" />
  <nui-avatar initials="SK" color="warning" />
</div>
```

---

## Accesibilidad ♿

### ARIA y Alt Text

```html
<!-- Imagen con alt text -->
<nui-avatar
  src="user.jpg"
  alt="John Doe, CEO de Acme Corp"
/>

<!-- Iniciales con información contextual -->
<nui-avatar
  initials="JD"
  alt="John Doe"
/>

<!-- Icono descriptivo -->
<nui-avatar
  icon="ri-admin-line"
  alt="Administrador del sistema"
/>
```

### Navegación por Teclado

Aunque los avatares son típicamente elementos no interactivos, si están dentro de botones o links:

```html
<button type="button" (click)="openProfile()">
  <nui-avatar src="user.jpg" alt="Ver perfil de John Doe" />
  <span class="sr-only">Ver perfil</span>
</button>
```

### Screen Readers

El componente automáticamente:
- Usa `alt` para el texto alternativo de imágenes
- Genera ARIA labels apropiados
- Mantiene el orden de lectura correcto

---

## Theming y Variables CSS

### Variables CSS Disponibles

El avatar utiliza variables CSS del sistema de diseño que se adaptan automáticamente al tema:

#### Variables de Dimensiones
```css
--avatar-size-xs: 24px;
--avatar-size-sm: 32px;
--avatar-size-md: 40px;
--avatar-size-lg: 56px;
--avatar-size-xl: 80px;

--avatar-font-size-xs: 0.75rem;
--avatar-font-size-sm: 0.875rem;
--avatar-font-size-md: 1rem;
--avatar-font-size-lg: 1.25rem;
--avatar-font-size-xl: 1.5rem;

--avatar-icon-size-xs: 14px;
--avatar-icon-size-sm: 16px;
--avatar-icon-size-md: 20px;
--avatar-icon-size-lg: 28px;
--avatar-icon-size-xl: 40px;
```

#### Variables de Color (Tema Claro)
```css
--avatar-default-bg: var(--color-secondary);
--avatar-default-color: var(--color-white);

--avatar-primary-bg: var(--color-primary);
--avatar-primary-color: var(--color-white);

--avatar-success-bg: var(--color-success);
--avatar-success-color: var(--color-white);
/* ... y así para cada color */
```

#### Variables de Forma
```css
--avatar-border-radius-circular: 50%;
--avatar-border-radius-rounded: 8px;
--avatar-border-radius-square: 0;
```

#### Variables de Avatar Group
```css
--avatar-group-spacing: -8px;
--avatar-group-border-width: 2px;
--avatar-group-border-color: var(--color-white); /* Tema claro */
--avatar-group-border-color: var(--color-gray-800); /* Tema oscuro */
--avatar-group-hover-scale: 1.1;
--avatar-group-z-index-hover: 10;
```

### Personalización con CSS

```scss
// Sobrescribir variables globalmente
:root {
  --avatar-border-radius-rounded: 12px; // Bordes más redondeados
  --avatar-group-spacing: -12px; // Más superposición
}

// Personalizar una instancia específica
.my-custom-avatar {
  --avatar-size-md: 48px; // Avatar md más grande
}
```

### Mixins SCSS Disponibles

Si usas SCSS, puedes aprovechar los mixins del sistema:

```scss
@use 'mixins' as *;

.my-avatar-wrapper {
  nui-avatar {
    @include avatar-base(); // Estilos base
  }
}

// Generar todas las variantes
.my-avatar-container {
  @include generate-avatar-sizes();
  @include generate-avatar-variants();
  @include generate-avatar-colors();
}
```

---

## Ejemplos Completos

### 1. Lista de Usuarios con Avatares

```typescript
import { Component } from '@angular/core';
import { AvatarComponent } from '@shared/components/avatar';

interface User {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="user-list">
      @for (user of users; track user.id) {
        <div class="user-item">
          <nui-avatar
            [src]="user.avatar"
            [initials]="user.initials"
            [alt]="user.name"
            size="md"
            variant="circular"
          />
          <div class="user-info">
            <h4>{{ user.name }}</h4>
            <p>{{ user.role }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .user-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      
      &:hover {
        background: var(--color-gray-50);
      }
    }
    
    .user-info {
      h4 { margin: 0; font-size: 0.9375rem; }
      p { margin: 0; font-size: 0.8125rem; color: var(--color-text-secondary); }
    }
  `]
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', initials: 'JD', role: 'CEO', avatar: 'user1.jpg' },
    { id: 2, name: 'Anna Marie', initials: 'AM', role: 'CTO' },
    { id: 3, name: 'Robert Chen', initials: 'RC', role: 'Developer' },
  ];
}
```

### 2. Selector de Tamaños

```typescript
@Component({
  selector: 'app-avatar-sizes',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="size-demo">
      <div class="size-row">
        <span>XS (24px)</span>
        <nui-avatar initials="JD" size="xs" color="primary" />
      </div>
      <div class="size-row">
        <span>SM (32px)</span>
        <nui-avatar initials="JD" size="sm" color="primary" />
      </div>
      <div class="size-row">
        <span>MD (40px)</span>
        <nui-avatar initials="JD" size="md" color="primary" />
      </div>
      <div class="size-row">
        <span>LG (56px)</span>
        <nui-avatar initials="JD" size="lg" color="primary" />
      </div>
      <div class="size-row">
        <span>XL (80px)</span>
        <nui-avatar initials="JD" size="xl" color="primary" />
      </div>
    </div>
  `,
  styles: [`
    .size-demo {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .size-row {
      display: flex;
      align-items: center;
      gap: 2rem;
      
      span {
        min-width: 100px;
        font-family: monospace;
      }
    }
  `]
})
export class AvatarSizesComponent {}
```

### 3. Grupo de Equipo con Tooltips

```typescript
import { Component } from '@angular/core';
import { AvatarGroupComponent } from '@shared/components/avatar';
import { AvatarGroupItem } from '@shared/components/avatar/models/avatar.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [AvatarGroupComponent],
  template: `
    <div class="team-card">
      <div class="team-header">
        <h3>Equipo de Desarrollo</h3>
        <span class="team-count">{{ teamMembers.length }} miembros</span>
      </div>
      
      <nui-avatar-group
        [avatars]="teamMembers"
        [max]="5"
        [bordered]="true"
        size="md"
        variant="circular"
      />
      
      <button class="view-all-btn">Ver todos</button>
    </div>
  `,
  styles: [`
    .team-card {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      background: var(--surface-primary);
    }
    
    .team-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h3 {
        margin: 0;
        font-size: 1.125rem;
      }
      
      .team-count {
        font-size: 0.875rem;
        color: var(--color-text-secondary);
      }
    }
    
    .view-all-btn {
      margin-top: 1rem;
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--color-primary);
      background: transparent;
      color: var(--color-primary);
      border-radius: 6px;
      cursor: pointer;
      
      &:hover {
        background: var(--color-primary-tint-95);
      }
    }
  `]
})
export class TeamCardComponent {
  teamMembers: AvatarGroupItem[] = [
    { 
      src: 'https://i.pravatar.cc/150?img=1',
      alt: 'John Doe',
      tooltip: 'John Doe - Team Lead'
    },
    { 
      initials: 'AM',
      color: 'primary',
      alt: 'Anna Marie',
      tooltip: 'Anna Marie - Senior Dev'
    },
    { 
      initials: 'RC',
      color: 'success',
      alt: 'Robert Chen',
      tooltip: 'Robert Chen - Full Stack'
    },
    { 
      initials: 'SK',
      color: 'info',
      alt: 'Sarah Kim',
      tooltip: 'Sarah Kim - Frontend'
    },
    { 
      initials: 'MJ',
      color: 'warning',
      alt: 'Mike Johnson',
      tooltip: 'Mike Johnson - Backend'
    },
    { 
      initials: 'LW',
      color: 'danger',
      alt: 'Lisa Wang',
      tooltip: 'Lisa Wang - QA Engineer'
    }
  ];
}
```

### 4. Avatar con Indicador de Estado

```typescript
@Component({
  selector: 'app-avatar-status',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="avatar-with-status">
      <nui-avatar
        [src]="user.avatar"
        [alt]="user.name"
        size="lg"
      />
      <span class="status-indicator" [class]="'status-' + user.status"></span>
    </div>
  `,
  styles: [`
    .avatar-with-status {
      position: relative;
      display: inline-flex;
    }
    
    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--surface-primary);
      
      &.status-online { background: var(--color-success); }
      &.status-away { background: var(--color-warning); }
      &.status-busy { background: var(--color-danger); }
      &.status-offline { background: var(--color-gray-400); }
    }
  `]
})
export class AvatarStatusComponent {
  user = {
    name: 'John Doe',
    avatar: 'user.jpg',
    status: 'online' // 'online' | 'away' | 'busy' | 'offline'
  };
}
```

### 5. Avatar Clickable con Menú

```typescript
import { Component, signal } from '@angular/core';
import { AvatarComponent } from '@shared/components/avatar';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="user-menu">
      <button 
        class="avatar-button"
        (click)="toggleMenu()"
        type="button"
        aria-label="Abrir menú de usuario"
      >
        <nui-avatar
          src="user.jpg"
          alt="John Doe"
          size="md"
        />
      </button>
      
      @if (menuOpen()) {
        <div class="dropdown-menu">
          <a href="/profile">Mi Perfil</a>
          <a href="/settings">Configuración</a>
          <hr />
          <button (click)="logout()">Cerrar Sesión</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-menu {
      position: relative;
    }
    
    .avatar-button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      border-radius: 50%;
      transition: opacity 0.2s;
      
      &:hover { opacity: 0.8; }
      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    }
    
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      min-width: 200px;
      background: var(--surface-primary);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 0.5rem 0;
      z-index: 100;
      
      a, button {
        display: block;
        width: 100%;
        padding: 0.75rem 1rem;
        text-align: left;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--color-text);
        text-decoration: none;
        
        &:hover {
          background: var(--color-gray-50);
        }
      }
      
      hr {
        margin: 0.5rem 0;
        border: none;
        border-top: 1px solid var(--color-border);
      }
    }
  `]
})
export class UserMenuComponent {
  menuOpen = signal(false);
  
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
  
  logout() {
    console.log('Cerrando sesión...');
    this.menuOpen.set(false);
  }
}
```

---

## API Reference

### Avatar Component

#### Inputs

```typescript
class AvatarComponent {
  /** Variante de forma del avatar */
  @Input() variant: AvatarVariant = 'circular';
  
  /** Tamaño predefinido */
  @Input() size: NUISize = 'md';
  
  /** Color de fondo */
  @Input() color: NUIColor = 'secondary';
  
  /** URL de la imagen */
  @Input() src?: string;
  
  /** Texto alternativo */
  @Input() alt: string = '';
  
  /** Iniciales a mostrar */
  @Input() initials?: string;
  
  /** Icono RemixIcon */
  @Input() icon?: string;
  
  /** Tamaño personalizado en píxeles */
  @Input() customSize?: number;
}
```

#### Computed Signals

```typescript
/** Tipo de contenido a mostrar (image | initials | icon | fallback) */
contentType = computed<'image' | 'initials' | 'icon' | 'fallback'>(() => { ... });

/** Clases del host element */
hostClasses = computed<string>(() => { ... });
```

#### Métodos

```typescript
/** Maneja errores de carga de imagen */
onImageError(): void;
```

### Avatar Group Component

#### Inputs

```typescript
class AvatarGroupComponent {
  /** Lista de avatares */
  @Input() avatars: AvatarGroupItem[] = [];
  
  /** Máximo de avatares visibles */
  @Input() max?: number;
  
  /** Espaciado entre avatares */
  @Input() spacing: number | string = '-8px';
  
  /** Tamaño para todos los avatares */
  @Input() size: NUISize = 'md';
  
  /** Variante para todos los avatares */
  @Input() variant: AvatarVariant = 'circular';
  
  /** Añade bordes */
  @Input() bordered: boolean = false;
}
```

#### Computed Signals

```typescript
/** Avatares visibles según el límite */
visibleAvatars = computed<AvatarGroupItem[]>(() => { ... });

/** Número de avatares ocultos */
hiddenCount = computed<number>(() => { ... });

/** Valor del espaciado con unidades */
spacingValue = computed<string>(() => { ... });
```

### Interfaces TypeScript

#### AvatarConfig

```typescript
interface AvatarConfig {
  variant?: AvatarVariant;
  size?: NUISize;
  color?: NUIColor;
  src?: string;
  alt?: string;
  initials?: string;
  icon?: string;
  customSize?: number;
  cssClass?: string;
}
```

#### AvatarGroupItem

```typescript
interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: string;
  color?: NUIColor;
  tooltip?: string;
  cssClass?: string;
}
```

#### AvatarGroupConfig

```typescript
interface AvatarGroupConfig {
  max?: number;
  spacing?: number | string;
  size?: NUISize;
  variant?: AvatarVariant;
  bordered?: boolean;
}
```

#### Types

```typescript
type AvatarVariant = 'circular' | 'rounded' | 'square';
type NUISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type NUIColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
```

---

## Troubleshooting

### Problema: La imagen no se carga

**Síntomas:** El avatar muestra el fallback en lugar de la imagen

**Soluciones:**
1. Verifica que la URL sea accesible
2. Revisa CORS si es un dominio externo
3. Asegúrate de que el formato sea compatible (jpg, png, webp, svg)
4. Usa `alt` o `initials` como fallback

```html
<!-- ✅ Buena práctica: Siempre incluye fallback -->
<nui-avatar
  src="https://api.example.com/user/1/avatar"
  initials="JD"
  alt="John Doe"
/>
```

### Problema: Los avatares en grupo no se superponen

**Síntomas:** Los avatares aparecen separados en lugar de apilados

**Soluciones:**
1. Verifica que `spacing` sea negativo
2. Asegúrate de que las variables CSS estén cargadas
3. Revisa que no haya CSS personalizado sobrescribiendo

```html
<!-- ✅ Correcto -->
<nui-avatar-group [avatars]="users" [spacing]="-8" />

<!-- ❌ Incorrecto -->
<nui-avatar-group [avatars]="users" [spacing]="8" />
```

### Problema: Tamaño personalizado no funciona

**Síntomas:** El avatar ignora `customSize`

**Soluciones:**
1. Verifica que sea un número (no string)
2. No combines `size` y `customSize` (customSize tiene prioridad)
3. Revisa que no haya `max-width` o `max-height` en CSS padre

```typescript
// ✅ Correcto
<nui-avatar [customSize]="64" />

// ❌ Incorrecto
<nui-avatar customSize="64px" />
```

### Problema: Los colores no se aplican en tema oscuro

**Síntomas:** Los avatares tienen colores incorrectos al cambiar tema

**Soluciones:**
1. Verifica que `_theme-mixins.scss` esté importado
2. Asegúrate de que `generate-component-variables()` incluya avatares
3. Revisa que el tema oscuro esté aplicado correctamente

```scss
// En _theme-mixins.scss
@mixin generate-component-variables($colors, $is-dark: false) {
  // ... otros componentes ...
  
  @if $is-dark {
    @include avatar-dark-theme();
  } @else {
    @include avatar-light-theme();
  }
}
```

### Problema: El indicador "+N" no aparece

**Síntomas:** Todos los avatares son visibles aunque haya límite

**Soluciones:**
1. Verifica que `max` esté definido y sea menor que el total de avatares
2. Asegúrate de que `avatars` tenga más elementos que `max`
3. Revisa la consola por errores

```typescript
// ✅ Correcto: 6 avatares, max 3 → muestra 3 + "+3"
teamMembers: AvatarGroupItem[] = [ /* 6 elementos */ ];
<nui-avatar-group [avatars]="teamMembers" [max]="3" />

// ❌ No muestra indicador: 6 avatares, max 10
<nui-avatar-group [avatars]="teamMembers" [max]="10" />
```

### Problema: Bordes no visibles en tema oscuro

**Síntomas:** Los bordes del avatar group no se ven en tema oscuro

**Solución:**
Los bordes son blancos por defecto (tema claro) y grises en tema oscuro. Esto es intencional. Si necesitas personalizar:

```scss
.my-avatar-group {
  --avatar-group-border-color: var(--color-primary); // Color personalizado
}
```

---

## Performance Tips

### 1. Usa Tamaños Predefinidos

```html
<!-- ✅ Mejor performance -->
<nui-avatar size="md" />

<!-- ⚠️ Menos óptimo (genera estilos inline) -->
<nui-avatar [customSize]="40" />
```

### 2. Lazy Load de Imágenes en Listas Largas

```typescript
@Component({
  template: `
    @for (user of users; track user.id) {
      <nui-avatar
        [src]="user.avatar"
        [alt]="user.name"
        loading="lazy"
      />
    }
  `
})
```

### 3. OnPush Change Detection

El componente ya usa `ChangeDetectionStrategy.OnPush` por defecto, pero asegúrate de no forzar detección innecesaria:

```typescript
// ✅ Buena práctica
users = signal<User[]>([]);

// ❌ Evita
users: User[] = [];
setInterval(() => this.users = [...this.users], 100); // Re-renderiza constantemente
```

### 4. Reutiliza Avatares en Grupos

```html
<!-- ✅ Eficiente: Un solo array -->
<nui-avatar-group [avatars]="teamMembers" />

<!-- ❌ Menos eficiente: Múltiples componentes -->
@for (member of teamMembers; track member.id) {
  <nui-avatar [src]="member.avatar" />
}
```

---

## Recursos Adicionales

- **[Página de Demo](/test/avatar)** - Todos los ejemplos interactivos
- **[Sistema de Diseño NUI](/docs/design-system.md)** - Guía completa del design system
- **[Variables CSS](/docs/theming.md)** - Lista completa de variables customizables
- **[Mixins SCSS](/docs/mixins.md)** - Documentación de mixins disponibles
- **[RemixIcon](https://remixicon.com/)** - Biblioteca de iconos utilizada

---

## Changelog

### v1.0.0 - 2025-10-27

**Nuevas características:**
- ✨ Componente `AvatarComponent` con imagen/iniciales/icono
- ✨ Componente `AvatarGroupComponent` con apilamiento
- ✨ Sistema de fallback en cascada
- ✨ 3 variantes de forma (circular, rounded, square)
- ✨ 5 tamaños predefinidos (xs, sm, md, lg, xl)
- ✨ 7 colores semánticos
- ✨ Soporte para theming claro/oscuro
- ✨ Variables CSS customizables
- ✨ Mixins SCSS reutilizables
- ✨ Documentación completa

---

## Licencia

Este componente es parte del sistema de diseño NUI y está disponible bajo la misma licencia del proyecto.

---

**¿Encontraste un bug o tienes una sugerencia?** Abre un issue en el repositorio del proyecto.

**¿Necesitas ayuda?** Consulta la [documentación general](/docs/README.md) o revisa los [ejemplos en vivo](/test/avatar).
