# Sistema de Temas de NUI

## Arquitectura

El sistema de temas de NUI utiliza un **enfoque híbrido** que combina lo mejor de la compilación SCSS y CSS-in-JS.

### ¿Por qué este enfoque?

**Problema que resuelve:**
- Librerías CSS puras (Angular Material): No permiten cambio de temas en runtime
- CSS-in-JS completo (Ant Design): Bundle grande, procesamiento en runtime, impacto en performance
- SCSS puro: Requiere configuración compleja en proyectos consumidores, builds lentos

**Nuestra solución:**

#### CSS Base Precompilado (518KB nui.css)
**Ventajas:**
- Build instantáneo para consumidores (CSS ya compilado)
- Sin configuración SCSS necesaria
- Variables CSS estructurales optimizadas (~500+ variables)
- Funciones SCSS complejas ejecutadas en build time (tint, shade, complementarios)

**Contiene:**
- Espaciado, tamaños, bordes, sombras, transiciones
- Todos los estilos de componentes
- Colores por defecto (aura preset)

#### Colores Dinámicos CSS-in-JS (Minimal)
**Ventajas:**
- Solo 14 variables (7 colores × 2 modos)
- Cambio de temas instantáneo en runtime
- ~200 líneas de TS (vs 2000+ para CSS-in-JS completo)
- Tree-shakeable: solo importas presets que usas

**Inyecta solo:**
- `--nui-color-primary`, `secondary`, `accent`, `success`, `info`, `warning`, `danger`
- Versiones light y dark de cada color

**Resultado:** Lo mejor de ambos mundos - performance de CSS precompilado + flexibilidad de temas dinámicos.

---

## Uso

### 1. Instalar la librería
```bash
npm install nui
```

### 2. Importar CSS base

Tienes 3 opciones para importar los estilos de NUI. Elige según tu configuración de proyecto:

#### Opción A: En angular.json (Recomendado)
```json
{
  "projects": {
    "tu-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/nui/styles/nui.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

**Mejor opción porque:**
- Angular CLI se encarga de la resolución de rutas automáticamente
- Funciona con builds de producción sin configuración extra
- Optimización automática (minificación, tree-shaking de CSS no usado)
- Sin necesidad de `stylePreprocessorOptions`
- Funciona tanto en workspace clásico como en monorepo Nx

#### Opción B: En styles.scss (Para usuarios de SCSS avanzado)
```scss
// En src/styles.scss
@import 'nui/styles/nui';
```

**Requiere configuración adicional en angular.json:**
```json
{
  "projects": {
    "tu-app": {
      "architect": {
        "build": {
          "options": {
            "stylePreprocessorOptions": {
              "includePaths": ["node_modules"]
            }
          }
        }
      }
    }
  }
}
```

**Desventajas:**
- Configuración más compleja
- SCSS debe resolver el path en tiempo de compilación
- Puede causar problemas en monorepos o configuraciones custom

**Cuándo usar:**
- Si ya tienes `stylePreprocessorOptions` configurado
- Si necesitas sobrescribir variables antes del import
- Si quieres usar mixins o funciones SCSS de NUI

#### Opción C: En index.html (Solo para demos / testing)
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Mi App</title>
  <link rel="stylesheet" href="node_modules/nui/styles/nui.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**NO recomendado para producción porque:**
- El path `node_modules/` no funciona en builds de producción
- Sin optimizaciones del build pipeline de Angular
- Sin minificación automática
- Carga bloqueante en el render inicial

**Cuándo usar:**
- Prototipos rápidos o pruebas locales
- Stackblitz o CodeSandbox
- Si lo usas, ajusta el path según tu setup: `assets/nui.css`

---

**Recomendación final:** Lo mejor sería utilizar la **Opción A** (*angular.json*) en el 99% de los casos.

### 3. Configurar el provider de tema
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNUI, dopamine } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({ preset: dopamine })
  ]
};
```

### 4. Usar componentes
```html
<nui-button color="primary">Click me</nui-button>
```

---

## Presets Disponibles

### Aura (Por Defecto)
Paleta de colores basada en teal con tonos balanceados y profesionales
```typescript
provideNUI({ preset: aura })
```

### Dopamine
Paleta de colores basada en lima con acentos de alta energía
```typescript
provideNUI({ preset: dopamine })
```

### Corporate
Paleta de colores basada en azul con tonos conservadores y confiables
```typescript
provideNUI({ preset: corporate })
```

### Minimal
Paleta de colores basada en grises con acentos sutiles y discretos
```typescript
provideNUI({ preset: minimal })
```

### Neon
Paleta de colores basada en cyan/púrpura con vibras eléctricas y audaces
```typescript
provideNUI({ preset: neon })
```

### Warm
Paleta de colores basada en naranja/marrón con tonos cálidos y terrenales
```typescript
provideNUI({ preset: warm })
```

### Sunset
Paleta de colores basada en rosa/coral con tonos cálidos vibrantes, ideal para apps creativas
```typescript
provideNUI({ preset: sunset })
```

### Ocean
Paleta de colores basada en azul profundo/aqua con tonos tranquilos, ideal para productividad
```typescript
provideNUI({ preset: ocean })
```

### Twilight
Paleta de colores basada en índigo/púrpura con tonos nocturnos elegantes
```typescript
provideNUI({ preset: twilight })
```

---

## Cambio de Tema en Tiempo de Ejecución

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService, dopamine, aura } from 'nui';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <button (click)="switchToDopamine()">Dopamine</button>
    <button (click)="switchToAura()">Aura</button>
  `,
  standalone: true
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  switchToDopamine() {
    this.themeService.usePreset(dopamine);
  }

  switchToAura() {
    this.themeService.usePreset(aura);
  }
}
```

---

## Sistema de Dark Mode

NUI incluye un sistema de dark mode integrado con tres estrategias de detección.

### Configuración

Configura el dark mode al inicializar NUI en `app.config.ts`:

```typescript
import { provideNUI, aura } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      preset: aura,
      darkMode: 'auto', // 'auto' | 'manual' | 'system'
      darkModeClass: 'dark-mode' // opcional, por defecto 'dark-mode'
    })
  ]
};
```

### Estrategias de Dark Mode

#### 1. **`'manual'`** (Control Total)
El desarrollador controla manualmente cuándo activar/desactivar el dark mode.

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggle()">
      @if (isDark) {
        <i class="ri-sun-line"></i> Modo Claro
      } @else {
        <i class="ri-moon-line"></i> Modo Oscuro
      }
    </button>
  `,
  standalone: true
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  
  get isDark() {
    return this.themeService.isDarkMode();
  }
  
  toggle() {
    this.themeService.toggleDarkMode();
  }
}
```

**Ventajas:**
- Control total sobre cuándo cambiar
- Ideal para botones de tema personalizados
- Puedes guardar la preferencia en localStorage

**Desventajas:**
- Requiere implementación manual del toggle

#### 2. **`'system'`** (Detección Inicial)
Detecta la preferencia del sistema operativo al iniciar la aplicación, pero **no sincroniza** cambios posteriores.

```typescript
provideNUI({
  preset: aura,
  darkMode: 'system'
})
```

**Ventajas:**
- Respeta la preferencia inicial del usuario
- No requiere código adicional del desarrollador
- Ligero (no escucha cambios)

**Desventajas:**
- No se actualiza si el usuario cambia la preferencia del sistema mientras la app está abierta

#### 3. **`'auto'`** (Sincronización Automática)
Detecta la preferencia del sistema y **sincroniza automáticamente** cualquier cambio en tiempo real.

```typescript
provideNUI({
  preset: aura,
  darkMode: 'auto'
})
```

**Ventajas:**
- 100% automático
- Respeta cambios en tiempo real del sistema operativo
- El desarrollador no necesita implementar nada
- Mejor experiencia de usuario

**Desventajas:**
- No permite control manual (los métodos `toggleDarkMode()` y `setDarkMode()` mostrarán warnings)

### Clase CSS Personalizada

Por defecto, NUI agrega/quita la clase `dark-mode` al elemento `<html>`. Puedes personalizar esto:

```typescript
provideNUI({
  preset: aura,
  darkMode: 'auto',
  darkModeClass: 'mi-dark-mode' // usa tu propia clase
})
```

### Detección de Media Query

NUI usa el media query estándar de CSS:

```javascript
window.matchMedia('(prefers-color-scheme: dark)')
```

Esto detecta:
- Configuración del sistema operativo (Windows, macOS, Linux)
- Configuración del navegador (si permite override)

---

## API del ThemeService

NUI usa **Signals** como API principal para un mejor rendimiento y experiencia de desarrollo. También ofrece Observables para casos avanzados que requieran operadores de RxJS.

### 🔥 Signals (API Principal - Recomendado)

#### `isDarkMode: Signal<boolean>`
Signal que contiene el estado actual del dark mode. Funciona con todas las estrategias.

```typescript
import { Component, inject, computed } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-status',
  template: `
    <div class="status">
      <p>Modo: {{ isDark() ? 'Oscuro' : 'Claro' }}</p>
      <i [class]="iconClass()"></i>
    </div>
  `,
  standalone: true
})
export class ThemeStatusComponent {
  private themeService = inject(ThemeService);
  
  // Acceso directo al signal
  isDark = this.themeService.isDarkMode;
  
  // Computed signals derivados
  iconClass = computed(() => 
    this.isDark() ? 'ri-moon-line' : 'ri-sun-line'
  );
}
```

#### `currentPreset: Signal<ThemePreset>`
Signal que contiene el preset actual.

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-display',
  template: `
    <div class="theme-info">
      <p>Tema actual: {{ preset().name }}</p>
      <p>Color primario: {{ preset().colors.light.primary }}</p>
    </div>
  `,
  standalone: true
})
export class ThemeDisplayComponent {
  private themeService = inject(ThemeService);
  preset = this.themeService.currentPreset;
}
```

#### `colors: Signal<ThemeColors>`
Computed signal que retorna los colores activos según el modo (light/dark).

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-color-palette',
  template: `
    <div class="palette">
      <div [style.background]="colors().primary">Primary</div>
      <div [style.background]="colors().secondary">Secondary</div>
      <div [style.background]="colors().accent">Accent</div>
    </div>
  `,
  standalone: true
})
export class ColorPaletteComponent {
  private themeService = inject(ThemeService);
  colors = this.themeService.colors;
}
```

#### Usando `effect()` para Side Effects

```typescript
import { Component, inject, effect } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-logger',
  standalone: true
})
export class ThemeLoggerComponent {
  private themeService = inject(ThemeService);
  
  constructor() {
    // Reaccionar a cambios de dark mode
    effect(() => {
      const isDark = this.themeService.isDarkMode();
      console.log('Dark mode cambió:', isDark);
      
      // Guardar preferencia en localStorage
      localStorage.setItem('darkMode', isDark.toString());
      
      // Analytics, etc.
      this.trackThemeChange(isDark);
    });
    
    // Reaccionar a cambios de preset
    effect(() => {
      const preset = this.themeService.currentPreset();
      console.log('Preset cambió:', preset.name);
      document.title = `Mi App - ${preset.name}`;
    });
  }
  
  private trackThemeChange(isDark: boolean) {
    // Tu código de analytics
  }
}
```

### 📡 Observables (Interoperabilidad con RxJS)

Para casos avanzados donde necesites operadores de RxJS, NUI expone Observables generados automáticamente desde los Signals.

#### `isDarkMode$: Observable<boolean>`
Observable que emite cada vez que el estado de dark mode cambia.

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-component',
  template: `
    <p>Modo: {{ (isDark$ | async) ? 'Oscuro' : 'Claro' }}</p>
  `,
  standalone: true,
  imports: [AsyncPipe]
})
export class MyComponent {
  private themeService = inject(ThemeService);
  
  // Usar Observable con operadores RxJS
  isDark$ = this.themeService.isDarkMode$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );
}
```

#### `currentPreset$: Observable<ThemePreset>`
Observable que emite cada vez que el preset cambia.

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';
import { map } from 'rxjs';

@Component({
  selector: 'app-preset-name',
  template: `<p>{{ presetName$ | async }}</p>`,
  standalone: true,
  imports: [AsyncPipe]
})
export class PresetNameComponent {
  private themeService = inject(ThemeService);
  
  presetName$ = this.themeService.currentPreset$.pipe(
    map(preset => preset.name.toUpperCase())
  );
}
```

### Métodos de Control

#### `toggleDarkMode(): void`
Alterna entre modo claro y oscuro. Solo funciona con estrategia `'manual'`.

```typescript
themeService.toggleDarkMode();
```

#### `setDarkMode(enabled: boolean): void`
Establece el modo dark explícitamente. Solo funciona con estrategia `'manual'`.

```typescript
themeService.setDarkMode(true);  // Activar dark mode
themeService.setDarkMode(false); // Desactivar dark mode
```

#### `usePreset(preset: ThemePreset): void`
Cambia el preset de tema en tiempo de ejecución.

```typescript
import { dopamine, aura } from 'nui';

themeService.usePreset(dopamine);
themeService.usePreset(aura);
```

---

## Ejemplo Completo: Toggle Manual con localStorage + Signals

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUI, aura } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      preset: aura,
      darkMode: 'manual'
    })
  ]
};

// theme-toggle.component.ts
import { Component, inject, OnInit, effect, computed } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggle()" class="theme-toggle">
      @if (isDark()) {
        <i class="ri-sun-line"></i>
        <span>Modo Claro</span>
      } @else {
        <i class="ri-moon-line"></i>
        <span>Modo Oscuro</span>
      }
    </button>
  `,
  standalone: true
})
export class ThemeToggleComponent implements OnInit {
  private themeService = inject(ThemeService);
  
  // Signal directamente del servicio
  isDark = this.themeService.isDarkMode;
  
  constructor() {
    // Guardar automáticamente cada cambio
    effect(() => {
      const isDark = this.isDark();
      localStorage.setItem('darkMode', isDark.toString());
    });
  }
  
  ngOnInit() {
    // Restaurar preferencia guardada
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.themeService.setDarkMode(savedMode === 'true');
    }
  }
  
  toggle() {
    this.themeService.toggleDarkMode();
    // No necesitas guardar aquí, el effect() lo hace automáticamente
  }
}
```

---

## Ejemplo Completo: Detección Automática con Signals

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUI, aura } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      preset: aura,
      darkMode: 'auto' // ¡Eso es todo! No necesitas más código
    })
  ]
};

// En cualquier componente puedes verificar el estado usando signals:
import { Component, inject, computed } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-my-component',
  template: `
    <div class="status">
      <p>Modo actual: {{ modeText() }}</p>
      <p>Estrategia: {{ strategy() }}</p>
      <p>Color primario: {{ primaryColor() }}</p>
    </div>
  `,
  standalone: true
})
export class MyComponent {
  private themeService = inject(ThemeService);
  
  // Signals del servicio
  isDark = this.themeService.isDarkMode;
  preset = this.themeService.currentPreset;
  colors = this.themeService.colors;
  
  // Computed signals derivados
  modeText = computed(() => 
    this.isDark() ? 'Oscuro' : 'Claro'
  );
  
  strategy = computed(() => 
    this.themeService.getDarkModeStrategy()
  );
  
  primaryColor = computed(() => 
    this.colors().primary
  );
}
```

---

## Crear Presets Personalizados

```typescript
import { ThemePreset } from 'nui';

export const miPresetPersonalizado: ThemePreset = {
  name: 'mi-preset',
  colors: {
    light: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      success: '#10b981',
      info: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    dark: {
      primary: '#60a5fa',    // Más claro para dark mode
      secondary: '#a78bfa',
      accent: '#fbbf24',
      success: '#34d399',
      info: '#22d3ee',
      warning: '#fbbf24',
      danger: '#f87171',
    }
  }
};

// Usar el preset personalizado
provideNUI({ preset: miPresetPersonalizado })
```

---

## Detalles Técnicos

### ¿Qué contiene nui.css?

- CSS reset y estilos base
- Todos los estilos de componentes (botones, inputs, modales, etc.)
- ~500+ variables CSS para:
  - **Espaciado**: margins, paddings, gaps
  - **Tamaños**: widths, heights, font-sizes
  - **Bordes**: radius, width
  - **Sombras**: box-shadow values
  - **Transiciones**: durations, easings
  - **Tipografía**: font-family, line-height, letter-spacing
  - **Variables específicas de componentes**: button-gap, modal-padding, etc.

### ¿Qué se inyecta via CSS-in-JS?

Solo 7 colores semánticos × 2 modos = 14 valores:
- `--nui-color-primary`
- `--nui-color-secondary`
- `--nui-color-accent`
- `--nui-color-success`
- `--nui-color-info`
- `--nui-color-warning`
- `--nui-color-danger`

Estos sobreescriben los colores por defecto de `nui.css` cuando se aplica un preset.

---

## Beneficios

**Sin `@import`** - Los consumidores no necesitan configurar `stylePreprocessorOptions`  
**Sin configuración de build** - Solo agregar el archivo CSS al array de styles  
**Builds rápidos** - Sin compilación SCSS en proyectos consumidores  
**Temas dinámicos** - Cambiar temas en tiempo de ejecución  
**Type-safe** - Soporte completo de TypeScript  
**Tree-shakeable** - Solo importar presets que uses  
**Bundle pequeño** - Solo ~200 líneas de código en runtime  
**Dark mode automático** - Tres estrategias de detección  ✅ **Signals-first** - API moderna con Angular Signals (compatibilidad con Observables)  **Presets listos** - 9 temas predefinidos para empezar (aura, dopamine, corporate, minimal, neon, warm, sunset, ocean, twilight)  

---

## Preguntas Frecuentes

### ¿Puedo cambiar la estrategia de dark mode en runtime?
No, la estrategia se define en el provider y no puede cambiar después. Esto es intencional para mantener consistencia.

### ¿Qué pasa si uso `toggleDarkMode()` con estrategia `'auto'`?
Se mostrará un warning en consola y no hará nada. La estrategia `'auto'` es 100% automática.

### ¿Cómo detecto cambios de dark mode?

**⭐ Opción 1: Signals (Recomendado)**
```typescript
import { Component, inject, effect } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-my-component',
  template: `<p>Modo: {{ isDark() ? 'Oscuro' : 'Claro' }}</p>`,
  standalone: true
})
export class MyComponent {
  private themeService = inject(ThemeService);
  isDark = this.themeService.isDarkMode;
  
  constructor() {
    // Reaccionar a cambios
    effect(() => {
      console.log('Dark mode:', this.isDark());
    });
  }
}
```

**Opción 2: Observables (Para RxJS avanzado)**
```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-component',
  template: `<p>Modo: {{ (darkMode$ | async) ? 'Oscuro' : 'Claro' }}</p>`,
  standalone: true,
  imports: [AsyncPipe]
})
export class MyComponent {
  private themeService = inject(ThemeService);
  darkMode$ = this.themeService.isDarkMode$;
}
```

Ambas opciones funcionan con todas las estrategias ('auto', 'manual', 'system').

### ¿El dark mode afecta todos los componentes?
Sí, cuando el dark mode está activo, **todos** los componentes de NUI usan automáticamente sus variantes dark definidas en los presets.

### ¿Puedo tener diferentes colores dark para cada preset?
Sí, cada preset define sus propios colores light y dark. Ver sección "Crear Presets Personalizados".

### ¿Puedo usar múltiples presets en la misma aplicación?
Sí, puedes cambiar entre presets en runtime usando `themeService.usePreset()`. Solo uno estará activo a la vez.

### ¿Los presets afectan el bundle size?
Solo los presets que importes serán incluidos en el bundle final (tree-shaking). Cada preset es ~500 bytes.

### ¿Por qué nui.css es tan grande (518KB)?
Contiene **todo** lo necesario para la librería:
- Reset CSS y estilos base
- Estilos de todos los componentes (button, modal, tooltip, etc.)
- ~500+ variables CSS
- Variantes light y dark de cada componente
- Todas las utilidades de espaciado, tipografía, etc.

**Pero en producción:**
- Angular CLI elimina CSS no usado (PurgeCSS/tree-shaking)
- Se minifica automáticamente
- Se comprime con gzip/brotli
- **Bundle final típico: ~50-80KB** (dependiendo de qué componentes uses)

### ¿Puedo usar solo algunos componentes para reducir el bundle?
Actualmente no, pero está en el roadmap implementar imports selectivos:

```typescript
// Futuro (no disponible aún)
import '@nui/button/styles';
import '@nui/modal/styles';
```

Por ahora, usa la versión completa y confía en el tree-shaking de Angular CLI.

---

## Comparación con Otras Librerías

### PrimeNG
Usa enfoque híbrido similar:
- CSS temas precompilados
- CSS-in-JS para personalización de colores en runtime
- Múltiples temas pre-construidos (Aura, Lara, etc.)

### Angular Material
Enfoque CSS puro:
- Todos los estilos precompilados
- Cambio de tema requiere cargar diferentes archivos CSS
- Sin personalización de colores en runtime

### Ant Design
Enfoque CSS-in-JS:
- Genera todos los estilos en runtime
- Bundle size más grande
- Más flexible pero más complejo

**NUI combina los mejores aspectos: eficiencia de precompilación con flexibilidad en runtime.**
