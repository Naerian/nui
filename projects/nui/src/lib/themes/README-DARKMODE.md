# Dark Mode System

NUI incluye un sistema de dark mode integrado con tres estrategias de detección.

## Configuración

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

## Estrategias de Dark Mode

### 1. **`'manual'`** (por defecto)
El desarrollador controla manualmente cuándo activar/desactivar el dark mode.

```typescript
import { ThemeService } from 'nui';

export class MyComponent {
  constructor(private themeService: ThemeService) {}

  toggleDark() {
    // Toggle dark mode
    this.themeService.toggleDarkMode();
    
    // O establecer explícitamente
    this.themeService.setDarkMode(true);
  }
  
  checkDarkMode() {
    const isDark = this.themeService.isDarkMode();
    console.log('Dark mode active:', isDark);
  }
}
```

**Ventajas:**
- Control total sobre cuándo cambiar
- Ideal para botones de tema
- Puedes guardar la preferencia en localStorage

### 2. **`'system'`**
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

### 3. **`'auto'`**
Detecta la preferencia del sistema y **sincroniza automáticamente** cualquier cambio.

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

**Desventajas:**
- No permite control manual (los métodos `toggleDarkMode()` y `setDarkMode()` mostrarán warnings)

## Clase CSS Personalizada

Por defecto, NUI agrega/quita la clase `dark-mode` al elemento `<html>`. Puedes personalizar esto:

```typescript
provideNUI({
  preset: aura,
  darkMode: 'auto',
  darkModeClass: 'mi-dark-mode' // usa tu propia clase
})
```

## Detección de Media Query

NUI usa el media query estándar de CSS:

```javascript
window.matchMedia('(prefers-color-scheme: dark)')
```

Esto detecta:
- Configuración del sistema operativo (Windows, macOS, Linux)
- Configuración del navegador (si permite override)

## Métodos del ThemeService

### `toggleDarkMode(): void`
Alterna entre modo claro y oscuro. Solo funciona con estrategia `'manual'`.

### `setDarkMode(enabled: boolean): void`
Establece el modo dark explícitamente. Solo funciona con estrategia `'manual'`.

### `isDarkMode(): boolean`
Retorna `true` si el dark mode está activo (funciona con todas las estrategias).

### `getDarkModeStrategy(): 'auto' | 'manual' | 'system'`
Retorna la estrategia actual configurada.

## Ejemplo Completo: Toggle Manual

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
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggle()">
      @if (isDark) {
        <i class="ri-sun-line"></i> Light Mode
      } @else {
        <i class="ri-moon-line"></i> Dark Mode
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

## Ejemplo Completo: Detección Automática

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

// En cualquier componente puedes verificar el estado:
import { Component, inject } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      Current mode: {{ isDark ? 'Dark' : 'Light' }}
      <p>Strategy: {{ strategy }}</p>
    </div>
  `,
  standalone: true
})
export class MyComponent {
  private themeService = inject(ThemeService);
  
  get isDark() {
    return this.themeService.isDarkMode();
  }
  
  get strategy() {
    return this.themeService.getDarkModeStrategy();
  }
}
```

## Combinar con localStorage

Si quieres guardar la preferencia del usuario:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-toggle',
  template: `<button (click)="toggle()">Toggle Dark Mode</button>`,
  standalone: true
})
export class ThemeToggleComponent implements OnInit {
  private themeService = inject(ThemeService);
  
  ngOnInit() {
    // Restaurar preferencia guardada
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.themeService.setDarkMode(savedMode === 'true');
    }
  }
  
  toggle() {
    this.themeService.toggleDarkMode();
    
    // Guardar preferencia
    const isDark = this.themeService.isDarkMode();
    localStorage.setItem('darkMode', isDark.toString());
  }
}
```

## Preguntas Frecuentes

### ¿Puedo cambiar la estrategia en runtime?
No, la estrategia se define en el provider y no puede cambiar después. Esto es intencional para mantener consistencia.

### ¿Qué pasa si uso `toggleDarkMode()` con estrategia `'auto'`?
Se mostrará un warning en consola y no hará nada. La estrategia `'auto'` es 100% automática.

### ¿Cómo detecto cambios de dark mode?
Actualmente solo con polling:

```typescript
setInterval(() => {
  const isDark = this.themeService.isDarkMode();
  // hacer algo
}, 1000);
```

En futuras versiones agregaremos un Observable para escuchar cambios.

### ¿El dark mode afecta todos los componentes?
Sí, cuando el dark mode está activo, **todos** los componentes de NUI usan automáticamente sus variantes dark definidas en los presets.

### ¿Puedo tener diferentes colores dark para cada preset?
Sí, cada preset define sus propios colores light y dark:

```typescript
const miPreset: ThemePreset = {
  name: 'mi-preset',
  colors: {
    light: {
      primary: '#ff0000',
      secondary: '#00ff00',
      // ...
    },
    dark: {
      primary: '#ff6666', // más claro en dark
      secondary: '#66ff66',
      // ...
    }
  }
};
```
