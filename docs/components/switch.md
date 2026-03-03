# Switch Component 🔄

> **Componente versátil de alternancia con dos modos de visualización: deslizador tradicional y botón toggle**

Implementa control de estado on/off con soporte para valores personalizados, labels dinámicos, iconos, variantes visuales y completa integración con Angular Forms.

---

## 📋 Tabla de Contenidos

1. [Características](#características-)
2. [Tipos de Switch](#tipos-de-switch)
3. [Instalación](#instalación)
4. [Uso Básico](#uso-básico)
5. [API Completa](#api-completa)
6. [Ejemplos por Tipo](#ejemplos-por-tipo)
7. [Tamaños](#tamaños)
8. [Colores](#colores)
9. [Variantes (Type Button)](#variantes-type-button)
10. [Valores Personalizados](#valores-personalizados)
11. [Integración con Forms](#integración-con-forms)
12. [Accesibilidad](#accesibilidad)
13. [Casos de Uso](#casos-de-uso)
14. [Theming](#theming)

---

## Características ✨

### 🎯 Funcionalidad

- ✅ **Dos tipos de visualización**: Switch (deslizador) y Button (toggle)
- ✅ **Valores personalizados**: No limitado a booleanos (ej: 'premium'/'basic')
- ✅ **Labels dinámicos**: Diferentes textos para on/off
- ✅ **Iconos dinámicos**: Diferentes iconos con alineación configurable
- ✅ **5 tamaños**: xs, sm, md, lg, xl (responsive)
- ✅ **7 colores**: primary, secondary, success, info, warning, danger, accent
- ✅ **3 variantes** (type button): solid, outline, ghost
- ✅ **Integración Forms**: ngModel, FormControl, Reactive Forms

### ♿ Accesibilidad

- ✅ **Role ARIA**: `role="switch"` o `role="button"`
- ✅ **States**: `aria-checked`, `aria-disabled`
- ✅ **Navegación teclado**: Space, Enter
- ✅ **Focus visible**: Outline 2px
- ✅ **Screen readers**: Labels descriptivos

### 💻 Developer Experience

- ✅ **API declarativa**: Inputs signal-based
- ✅ **Type-safe**: TypeScript estricto
- ✅ **Computed properties**: Rendimiento optimizado
- ✅ **ControlValueAccessor**: Integración nativa con Forms
- ✅ **Change detection**: OnPush strategy

---

## Tipos de Switch

### 1️⃣ Type: Switch (Deslizador Tradicional)

Interruptor clásico con una bola que se desliza de izquierda a derecha.

**Ideal para:**
- ✅ Configuraciones on/off
- ✅ Activar/desactivar features
- ✅ Preferencias de usuario
- ✅ Toggles simples

**Características visuales:**
- Track (fondo) que cambia de color
- Thumb (bola) que se desplaza
- Transición suave
- Colores del tema

### 2️⃣ Type: Button (Botón de Alternancia)

Botón que cambia completamente su apariencia entre dos estados.

**Ideal para:**
- ✅ Cambiar entre dos modos (día/noche, lista/grid)
- ✅ Seleccionar entre dos opciones
- ✅ Estados con valores personalizados
- ✅ Toggles con contexto visual

**Características visuales:**
- Labels diferentes para on/off
- Iconos diferentes para cada estado
- 3 variantes visuales (solid/outline/ghost)
- Transformación completa del botón

---

## Instalación

El componente es standalone. Impórtalo donde lo necesites:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from '@shared/components/switch/switch.component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [SwitchComponent, FormsModule],
  template: `
    <nui-switch [(ngModel)]="isActive" />
  `
})
export class MyComponent {
  isActive = false;
}
```

---

## Uso Básico

### Switch Simple (Type: Switch)

```html
<nui-switch 
  type="switch"
  [(ngModel)]="isEnabled"
/>
```

### Switch con Label

```html
<nui-switch 
  type="switch"
  label="Notificaciones"
  [(ngModel)]="notificationsEnabled"
/>
```

### Button Simple (Type: Button)

```html
<nui-switch 
  type="button"
  onLabel="Activo"
  offLabel="Inactivo"
  [(ngModel)]="status"
/>
```

### Button con Iconos

```html
<nui-switch 
  type="button"
  variant="solid"
  color="primary"
  onIcon="ri-sun-line"
  onLabel="Día"
  offIcon="ri-moon-line"
  offLabel="Noche"
  [(ngModel)]="themeMode"
/>
```

---

## API Completa

### Inputs

| Input | Type | Default | Descripción |
|-------|------|---------|-------------|
| `type` | `'switch' \| 'button'` | `'switch'` | Tipo de visualización |
| `checked` | `boolean` | `false` | Estado inicial (para uso sin forms) |
| `label` | `string` | `undefined` | Label estático junto al switch |
| `onLabel` | `string` | `undefined` | Label cuando está activo |
| `offLabel` | `string` | `undefined` | Label cuando está inactivo |
| `onIcon` | `string` | `undefined` | Icono cuando está activo (Remix Icons) |
| `offIcon` | `string` | `undefined` | Icono cuando está inactivo |
| `onIconAlign` | `'left' \| 'right'` | `'left'` | Posición del icono ON |
| `offIconAlign` | `'left' \| 'right'` | `'left'` | Posición del icono OFF |
| `onValue` | `any` | `true` | Valor cuando está activo |
| `offValue` | `any` | `false` | Valor cuando está inactivo |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Variante visual (solo type="button") |
| `color` | `NUIColor` | `'primary'` | Color del tema |
| `inputSize` | `NUISize` | `'md'` | Tamaño del componente |
| `disabled` | `boolean` | `false` | Deshabilitar el switch |
| `name` | `string` | `undefined` | Atributo name del input |
| `id` | `string` | `undefined` | ID del componente |

### Outputs

| Output | Type | Descripción |
|--------|------|-------------|
| `changed` | `EventEmitter<any>` | Emite cuando el valor cambia |

### Types

```typescript
// Tipos disponibles
type SwitchType = 'switch' | 'button';
type SwitchIconAlign = 'left' | 'right';
type NUIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
type NUISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type NUIVariant = 'solid' | 'outline' | 'ghost';
```

---

## Ejemplos por Tipo

### Type: Switch (Deslizador)

#### 1. Basic Switch

```html
<nui-switch 
  type="switch"
  [(ngModel)]="value"
/>
```

#### 2. Con Label Estático

```html
<nui-switch 
  type="switch"
  label="Modo Oscuro"
  color="primary"
  [(ngModel)]="darkMode"
/>
```

#### 3. Con Labels Dinámicos

```html
<nui-switch 
  type="switch"
  onLabel="ON"
  offLabel="OFF"
  [(ngModel)]="status"
/>
```

#### 4. Con Iconos

```html
<nui-switch 
  type="switch"
  onIcon="ri-check-line"
  offIcon="ri-close-line"
  color="success"
  [(ngModel)]="isValid"
/>
```

#### 5. Iconos + Labels

```html
<nui-switch 
  type="switch"
  onIcon="ri-sun-line"
  onLabel="Día"
  offIcon="ri-moon-line"
  offLabel="Noche"
  color="warning"
  [(ngModel)]="dayNight"
/>
```

### Type: Button (Toggle)

#### 1. Button Básico

```html
<nui-switch 
  type="button"
  variant="solid"
  onLabel="Activado"
  offLabel="Desactivado"
  [(ngModel)]="buttonState"
/>
```

#### 2. Button con Iconos

```html
<nui-switch 
  type="button"
  variant="solid"
  color="success"
  onIcon="ri-play-fill"
  onLabel="Playing"
  offIcon="ri-pause-fill"
  offLabel="Paused"
  [(ngModel)]="playState"
/>
```

#### 3. Button Outline

```html
<nui-switch 
  type="button"
  variant="outline"
  color="primary"
  onLabel="Lista"
  onIcon="ri-list-check"
  offLabel="Grid"
  offIcon="ri-grid-fill"
  [(ngModel)]="viewMode"
/>
```

#### 4. Button Ghost

```html
<nui-switch 
  type="button"
  variant="ghost"
  color="info"
  onIcon="ri-heart-fill"
  onLabel="Favorito"
  offIcon="ri-heart-line"
  offLabel="Me gusta"
  [(ngModel)]="isFavorite"
/>
```

---

## Tamaños

Los switches soportan 5 tamaños que se adaptan al sistema de diseño:

### Type: Switch (Tamaños del Track y Thumb)

```html
<!-- Extra Small -->
<nui-switch 
  type="switch"
  inputSize="xs"
  label="Extra Small"
  [(ngModel)]="xs"
/>
<!-- Track: 16px × 30px, Thumb: 12px -->

<!-- Small -->
<nui-switch 
  type="switch"
  inputSize="sm"
  label="Small"
  [(ngModel)]="sm"
/>
<!-- Track: 20px × 36px, Thumb: 16px -->

<!-- Medium (default) -->
<nui-switch 
  type="switch"
  inputSize="md"
  label="Medium"
  [(ngModel)]="md"
/>
<!-- Track: 24px × 44px, Thumb: 18px -->

<!-- Large -->
<nui-switch 
  type="switch"
  inputSize="lg"
  label="Large"
  [(ngModel)]="lg"
/>
<!-- Track: 28px × 52px, Thumb: 22px -->

<!-- Extra Large -->
<nui-switch 
  type="switch"
  inputSize="xl"
  label="Extra Large"
  [(ngModel)]="xl"
/>
<!-- Track: 32px × 60px, Thumb: 26px -->
```

### Type: Button (Tamaños de Padding y Font)

```html
<!-- Los tamaños afectan padding, font-size y height -->
<nui-switch 
  type="button"
  variant="solid"
  inputSize="xs"
  onLabel="XS"
  offLabel="XS"
  [(ngModel)]="buttonXs"
/>

<nui-switch 
  type="button"
  variant="solid"
  inputSize="sm"
  onLabel="SM"
  offLabel="SM"
  [(ngModel)]="buttonSm"
/>

<!-- ... lg, xl -->
```

---

## Colores

### Colores Disponibles

| Color | Uso Recomendado |
|-------|----------------|
| `primary` | Acciones principales, features destacados |
| `secondary` | Acciones secundarias, opciones alternativas |
| `success` | Confirmaciones, estados positivos |
| `info` | Información, notificaciones neutras |
| `warning` | Advertencias, precauciones |
| `danger` | Errores, acciones destructivas |
| `accent` | Elementos destacados, promociones |

### Ejemplos

```html
<!-- Primary (Teal) -->
<nui-switch 
  type="switch"
  color="primary"
  label="Primary"
  [(ngModel)]="value1"
/>

<!-- Success (Green) -->
<nui-switch 
  type="switch"
  color="success"
  label="Success"
  [(ngModel)]="value2"
/>

<!-- Warning (Amber) -->
<nui-switch 
  type="switch"
  color="warning"
  label="Warning"
  [(ngModel)]="value3"
/>

<!-- Danger (Red) -->
<nui-switch 
  type="switch"
  color="danger"
  label="Danger"
  [(ngModel)]="value4"
/>
```

### Type: Button con Colores

```html
<!-- Cada color se adapta a las variantes -->
<nui-switch 
  type="button"
  variant="solid"
  color="warning"
  onIcon="ri-vip-crown-line"
  onLabel="Premium"
  offLabel="Básico"
  [(ngModel)]="plan"
/>
```

---

## Variantes (Type Button)

Las variantes solo aplican a `type="button"`:

### 1. Solid (Relleno)

Fondo completamente relleno que cambia de color.

```html
<nui-switch 
  type="button"
  variant="solid"
  color="primary"
  onLabel="Sí"
  offLabel="No"
  [(ngModel)]="solidValue"
/>
```

**Estados:**
- **Off**: Fondo gris, texto secundario
- **On**: Fondo del color, texto blanco
- **Hover Off**: Fondo gris más oscuro
- **Hover On**: Color más oscuro

### 2. Outline (Borde)

Transparente con borde que cambia de color.

```html
<nui-switch 
  type="button"
  variant="outline"
  color="success"
  onLabel="Activo"
  offLabel="Inactivo"
  [(ngModel)]="outlineValue"
/>
```

**Estados:**
- **Off**: Borde gris, fondo transparente
- **On**: Borde del color, texto del color
- **Hover Off**: Fondo gris sutil
- **Hover On**: Borde más oscuro

### 3. Ghost (Transparente)

Completamente transparente, solo cambia el fondo en hover.

```html
<nui-switch 
  type="button"
  variant="ghost"
  color="info"
  onLabel="Visible"
  offLabel="Oculto"
  [(ngModel)]="ghostValue"
/>
```

**Estados:**
- **Off**: Sin fondo, texto secundario
- **On**: Fondo sutil, texto del color
- **Hover**: Fondo más visible

### Comparativa Visual

```html
<div style="display: flex; gap: 1rem;">
  <!-- Solid -->
  <nui-switch 
    type="button"
    variant="solid"
    color="primary"
    onLabel="Solid"
    offLabel="Solid"
    [(ngModel)]="v1"
  />
  
  <!-- Outline -->
  <nui-switch 
    type="button"
    variant="outline"
    color="primary"
    onLabel="Outline"
    offLabel="Outline"
    [(ngModel)]="v2"
  />
  
  <!-- Ghost -->
  <nui-switch 
    type="button"
    variant="ghost"
    color="primary"
    onLabel="Ghost"
    offLabel="Ghost"
    [(ngModel)]="v3"
  />
</div>
```

---

## Valores Personalizados

No estás limitado a `true/false`. Puedes usar cualquier valor:

### Ejemplo: Plan de Suscripción

```typescript
planType: 'basic' | 'premium' = 'basic';
```

```html
<nui-switch 
  type="button"
  variant="solid"
  color="warning"
  [onValue]="'premium'"
  [offValue]="'basic'"
  onLabel="Premium"
  onIcon="ri-vip-crown-line"
  offLabel="Básico"
  offIcon="ri-user-line"
  [(ngModel)]="planType"
/>

<p>Plan seleccionado: <strong>{{ planType }}</strong></p>
```

### Ejemplo: Tema de Aplicación

```typescript
theme: 'light' | 'dark' = 'light';
```

```html
<nui-switch 
  type="button"
  variant="outline"
  color="primary"
  [onValue]="'dark'"
  [offValue]="'light'"
  onLabel="Tema Oscuro"
  onIcon="ri-moon-line"
  offLabel="Tema Claro"
  offIcon="ri-sun-line"
  [(ngModel)]="theme"
/>
```

### Ejemplo: Modo de Vista

```typescript
viewMode: 'list' | 'grid' = 'list';
```

```html
<nui-switch 
  type="button"
  variant="ghost"
  color="info"
  [onValue]="'grid'"
  [offValue]="'list'"
  onLabel="Grid"
  onIcon="ri-grid-fill"
  offLabel="Lista"
  offIcon="ri-list-check"
  [(ngModel)]="viewMode"
/>
```

---

## Integración con Forms

### Template-Driven Forms (ngModel)

```typescript
export class MyComponent {
  isEnabled = false;
  notifications = true;
}
```

```html
<form #form="ngForm">
  <nui-switch 
    type="switch"
    name="enabled"
    label="Habilitado"
    [(ngModel)]="isEnabled"
  />
  
  <nui-switch 
    type="switch"
    name="notifications"
    label="Notificaciones"
    [(ngModel)]="notifications"
  />
  
  <pre>{{ form.value | json }}</pre>
</form>
```

### Reactive Forms (FormControl)

```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

export class MyComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      darkMode: [false],
      emailNotifications: [true],
      planType: ['basic']
    });
  }
  
  onSubmit(): void {
    console.log(this.form.value);
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Switch tradicional -->
  <nui-switch 
    type="switch"
    formControlName="darkMode"
    label="Modo Oscuro"
    color="primary"
  />
  
  <!-- Switch con valores personalizados -->
  <nui-switch 
    type="button"
    variant="solid"
    formControlName="planType"
    [onValue]="'premium'"
    [offValue]="'basic'"
    onLabel="Premium"
    offLabel="Básico"
    color="warning"
  />
  
  <button type="submit">Guardar</button>
</form>
```

### Validación

```typescript
this.form = this.fb.group({
  terms: [false, Validators.requiredTrue],
  age: [false, this.customValidator]
});
```

```html
<nui-switch 
  type="switch"
  formControlName="terms"
  label="Acepto los términos"
/>

<div *ngIf="form.get('terms')?.invalid && form.get('terms')?.touched">
  Debes aceptar los términos
</div>
```

---

## Accesibilidad ♿

### Resumen de Mejoras WCAG 2.1 AA

Se han implementado mejoras integrales de accesibilidad para el componente `Switch`, basándose en los patrones de estilos de foco del sistema de botones y siguiendo las mejores prácticas de WCAG 2.1 AA.

### 🎯 Tipos de Switch

#### 1. Switch Clásico (`type="switch"`)
- **Uso**: Interruptor tradicional con bola deslizante
- **Semántica**: `role="switch"` con `aria-checked`
- **Visual**: Track con thumb animado

#### 2. Toggle Button (`type="button"`)
- **Uso**: Botón que alterna entre dos estados visuales
- **Semántica**: `role="button"` con `aria-checked`
- **Visual**: Botón sólido que cambia de apariencia

### ⌨️ Navegación por Teclado

#### Teclas Soportadas

| Tecla | Acción | Notas |
|-------|--------|-------|
| `Tab` | Enfoca el switch | Navegación estándar |
| `Shift+Tab` | Enfoque anterior | Navegación estándar |
| `Enter` | Alterna el estado | Funciona en ambos tipos |
| `Space` | Alterna el estado | Funciona en ambos tipos |

#### Comportamiento de Foco
1. **Entrada**: Tab enfoca el switch completo
2. **Activación**: Enter o Space cambia el estado
3. **Salida**: Tab continúa la navegación
4. **Visual**: Indicador de foco claro y consistente

### 🏗️ ARIA y Semántica

#### Switch Clásico
```html
<div 
  role="switch"
  aria-checked="true|false"
  aria-disabled="true|false"
  aria-labelledby="label-id"
  tabindex="0">
  <!-- Contenido del switch -->
</div>
```

#### Toggle Button
```html
<div 
  role="button"
  aria-checked="true|false"
  aria-disabled="true|false" 
  aria-labelledby="label-id"
  tabindex="0">
  <!-- Contenido del botón -->
</div>
```

#### Propiedades ARIA Implementadas

- **`role`**: `"switch"` o `"button"` según el tipo
- **`aria-checked`**: Estado true/false del toggle
- **`aria-disabled`**: Indica si está deshabilitado
- **`aria-labelledby`**: Referencia al label asociado
- **`tabindex`**: 0 para habilitado, -1 para deshabilitado

### 🎨 Estilos de Foco Mejorados

#### Patrón Base Aplicado
Se utilizó el mismo patrón de foco que `_button.scss` para mantener consistencia:

```scss
&:focus,
&:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
  z-index: 2;
}
```

#### Variantes de Focus por Tipo de Botón

**Solid Button (Estado inactivo)**
```scss
&:focus,
&:focus-visible {
  .nui-switch__button {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
    z-index: 2;
  }
}
```

**Solid Button (Estado activo/checked)**
```scss
&.nui-switch--checked {
  &:focus,
  &:focus-visible {
    .nui-switch__button {
      outline-color: var(--surface-primary);
      box-shadow: 
        0 0 0 2px var(--switch-color),
        0 0 0 4px var(--color-focus);
    }
  }
}
```

#### Beneficios del Nuevo Sistema de Foco

1. **Consistencia visual**: Mismo patrón que otros botones del sistema
2. **Contraste mejorado**: Usa `--color-focus` para mejor visibilidad
3. **Estados diferenciados**: Foco especial para estado checked en solid buttons
4. **Z-index apropiado**: Foco siempre visible por encima de otros elementos

### 🔧 Implementación Técnica

#### Métodos Clave

```typescript
// Navegación por teclado
protected onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    this.toggle();
  }
}

// Manejo de click
handleClick(event: Event): void {
  if (!this.isDisabled()) {
    this.toggle();
  }
}

// Alternancia de estado
private toggle(): void {
  const newValue = this.isChecked() ? this.offValue() : this.onValue();
  this.writeValue(newValue);
  this.valueChange.emit(newValue);
  this.onChange(newValue);
  this.onTouched();
}
```

#### Características de Robustez

1. **Event.preventDefault()**: Previene comportamiento por defecto de Space
2. **Estados validados**: Verifica `isDisabled()` antes de alternar
3. **ControlValueAccessor**: Integración completa con formularios reactive
4. **Eventos emitidos**: `valueChange` para binding bidireccional

### 📱 Estados Visuales

#### Indicadores de Estado

| Estado | Visual | Accesibilidad |
|--------|---------|---------------|
| **Normal** | Colores por defecto | `aria-checked="false"` |
| **Checked** | Colores activos | `aria-checked="true"` |
| **Hover** | Background hover | Sin cambios ARIA |
| **Focus** | Outline azul | Foco visible |
| **Disabled** | Opacidad reducida | `aria-disabled="true"`, `tabindex="-1"` |

### 🧪 Testing y Validación WCAG 2.1 AA

#### Criterios Cumplidos

- ✅ **2.1.1 Keyboard**: Todas las funciones accesibles por teclado
- ✅ **2.1.2 No Keyboard Trap**: Navegación fluida sin trampas
- ✅ **2.4.3 Focus Order**: Orden lógico de navegación
- ✅ **2.4.7 Focus Visible**: Indicador de foco siempre visible
- ✅ **3.2.1 On Focus**: No cambios inesperados al recibir foco
- ✅ **4.1.2 Name, Role, Value**: Roles y estados ARIA correctos

#### Testing Manual Recomendado

1. **Navegación por Tab**: Verificar que el foco se mueva correctamente
2. **Activación**: Enter y Space deben alternar el estado
3. **Estados visuales**: Foco visible en todos los temas
4. **Screen readers**: Anuncios correctos de estado y rol
5. **Formularios**: Integración con FormControl y validaciones

### 💡 Ejemplos de Uso Accesible

#### Switch Básico con Label
```html
<nui-switch 
  type="switch"
  label="Notificaciones"
  [(ngModel)]="notificationsEnabled">
</nui-switch>
```

#### Toggle Button con Estados Claros
```html
<nui-switch 
  type="button"
  variant="solid"
  color="primary"
  onLabel="Activo"
  offLabel="Inactivo"
  onIcon="ri-play-line"
  offIcon="ri-pause-line"
  [(ngModel)]="serviceStatus">
</nui-switch>
```

#### Switch con Validación Accesible
```html
<nui-switch 
  type="switch"
  label="Acepto los términos"
  formControlName="termsAccepted"
  [attr.aria-describedby]="'terms-error'"
  [attr.aria-invalid]="settingsForm.get('termsAccepted')?.invalid">
</nui-switch>

<div 
  id="terms-error" 
  *ngIf="settingsForm.get('termsAccepted')?.errors?.['required']"
  role="alert"
  class="error-message">
  Debe aceptar los términos para continuar
</div>
```

### 🎨 Personalización Accesible

#### CSS Custom Properties para Foco
```css
.my-custom-switch {
  /* Color de foco personalizado */
  --color-focus: #0066cc;
  
  /* Colores con suficiente contraste */
  --switch-color: #28a745;
  --switch-color-hover: #218838;
}
```

#### Temas con Consideraciones de Accesibilidad
```scss
// Tema oscuro con contraste apropiado
.dark-theme {
  --color-focus: #66b3ff;          // Azul claro para fondo oscuro
  --switch-color: #4ade80;         // Verde accesible
  --switch-button-inactive-bg: #374151; // Contraste suficiente
  --switch-button-inactive-text: #f3f4f6; // Texto legible
}
```

---

## Casos de Uso

### 1. Configuración de Perfil

```html
<h3>Preferencias de Usuario</h3>

<nui-switch 
  type="switch"
  label="Notificaciones por email"
  color="primary"
  [(ngModel)]="settings.email"
/>

<nui-switch 
  type="switch"
  label="Recibir newsletter"
  color="info"
  [(ngModel)]="settings.newsletter"
/>

<nui-switch 
  type="switch"
  label="Perfil público"
  color="success"
  [(ngModel)]="settings.publicProfile"
/>
```

### 2. Control de Reproducción

```html
<div style="display: flex; gap: 1rem;">
  <nui-switch 
    type="button"
    variant="solid"
    color="success"
    onIcon="ri-play-fill"
    onLabel="Play"
    offIcon="ri-pause-fill"
    offLabel="Pause"
    [(ngModel)]="playerState"
  />
  
  <nui-switch 
    type="button"
    variant="outline"
    color="primary"
    onIcon="ri-repeat-line"
    onLabel="Repetir"
    offIcon="ri-repeat-line"
    offLabel="No repetir"
    [(ngModel)]="playerRepeat"
  />
  
  <nui-switch 
    type="button"
    variant="ghost"
    color="danger"
    onIcon="ri-heart-fill"
    onLabel="Favorito"
    offIcon="ri-heart-line"
    offLabel="Me gusta"
    [(ngModel)]="playerFavorite"
  />
</div>
```

### 3. Filtros de Búsqueda

```html
<h4>Filtrar por:</h4>

<nui-switch 
  type="switch"
  label="Solo disponibles"
  color="success"
  [(ngModel)]="filters.available"
/>

<nui-switch 
  type="switch"
  label="Con descuento"
  color="warning"
  [(ngModel)]="filters.onSale"
/>

<nui-switch 
  type="switch"
  label="Nuevos"
  color="info"
  [(ngModel)]="filters.new"
/>
```

### 4. Toggle de Vista

```html
<nui-switch 
  type="button"
  variant="outline"
  color="primary"
  [onValue]="'grid'"
  [offValue]="'list'"
  onIcon="ri-grid-fill"
  onLabel="Grid"
  offIcon="ri-list-check"
  offLabel="Lista"
  [(ngModel)]="viewMode"
/>

<!-- Renderizado condicional -->
<div *ngIf="viewMode === 'grid'" class="grid-view">
  <!-- Grid layout -->
</div>

<div *ngIf="viewMode === 'list'" class="list-view">
  <!-- List layout -->
</div>
```

### 5. Modo Oscuro de Aplicación

```typescript
export class AppComponent {
  theme: 'light' | 'dark' = 'light';
  
  ngOnInit() {
    // Cargar tema guardado
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) this.theme = saved;
    this.applyTheme();
  }
  
  onThemeChange(newTheme: 'light' | 'dark') {
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    this.applyTheme();
  }
  
  private applyTheme() {
    document.body.classList.toggle('theme-dark', this.theme === 'dark');
  }
}
```

```html
<nui-switch 
  type="button"
  variant="solid"
  color="primary"
  [onValue]="'dark'"
  [offValue]="'light'"
  onIcon="ri-moon-line"
  onLabel="Modo Oscuro"
  offIcon="ri-sun-line"
  offLabel="Modo Claro"
  [(ngModel)]="theme"
  (changed)="onThemeChange($event)"
/>
```

---

## Theming

### Variables CSS Disponibles

El switch usa variables del sistema de diseño en `_theme.scss`:

```scss
// Colores base para cada tipo de switch
--switch-{color}-color: #{$color};
--switch-{color}-color-hover: #{shade($color, 10%)};

// Type: Button - Solid
--switch-{color}-button-solid-bg: #{$color};
--switch-{color}-button-solid-text: #{$color-white};
--switch-{color}-button-solid-hover-bg: #{shade($color, 10%)};

// Type: Button - Outline
--switch-{color}-button-outline-border: #{$color};
--switch-{color}-button-outline-text: #{$color};
--switch-{color}-button-outline-hover-border: #{shade($color, 10%)};
--switch-{color}-button-outline-hover-text: #{shade($color, 10%)};
--switch-{color}-button-outline-hover-bg: #{with-alpha($color, 0.1)};

// Type: Button - Ghost
--switch-{color}-button-ghost-text: #{$color};
--switch-{color}-button-ghost-hover-text: #{shade($color, 10%)};

// Estados por defecto
--switch-track-bg: var(--field-border-color);
--switch-track-border: var(--field-border-color);
--switch-track-hover-border: var(--field-border-hover-color);
--switch-thumb-bg: var(--field-bg);
--switch-button-inactive-bg: var(--nui-bg-secondary);
--switch-button-inactive-text: var(--text-secondary);
--switch-button-inactive-border: var(--nui-border-primary);
--switch-button-inactive-hover-bg: var(--nui-bg-neutral);
```

### Personalización

Puedes sobrescribir las variables en tu tema:

```scss
:root {
  // Personalizar colores del switch
  --switch-primary-color: #ff6b6b;
  --switch-primary-color-hover: #ee5a52;
  
  // Personalizar track
  --switch-track-bg: #e0e0e0;
  --switch-thumb-bg: #ffffff;
}

.theme-dark {
  // Colores para tema oscuro
  --switch-track-bg: #30363d;
  --switch-thumb-bg: #0d1117;
}
```

### Tema Oscuro

El switch se adapta automáticamente al tema oscuro:

```html
<body class="theme-dark">
  <nui-switch 
    type="switch"
    label="Notificaciones"
    color="primary"
    [(ngModel)]="value"
  />
  <!-- Automáticamente usa variables de tema oscuro -->
</body>
```

---

## Comparativa: Switch vs Button

¿Cuándo usar cada tipo?

### Usa `type="switch"` cuando:

✅ Necesitas un toggle on/off simple  
✅ El contexto es configuración o ajustes  
✅ El estado es binario (encendido/apagado)  
✅ Quieres el look tradicional de iOS/Material

**Ejemplos:**
- Activar/desactivar notificaciones
- Modo oscuro
- Opciones de privacidad
- Features on/off

### Usa `type="button"` cuando:

✅ Necesitas labels descriptivos en ambos estados  
✅ Los valores no son booleanos  
✅ Quieres destacar la diferencia entre estados  
✅ El contexto requiere más información visual

**Ejemplos:**
- Cambiar entre modos (lista/grid)
- Seleccionar plan (básico/premium)
- Play/Pause de audio
- Estados con contexto (día/noche)

### Ejemplo Lado a Lado

```html
<h4>Mismo estado, diferentes presentaciones</h4>

<!-- Type: Switch -->
<nui-switch 
  type="switch"
  onIcon="ri-wifi-line"
  offIcon="ri-wifi-off-line"
  color="primary"
  [(ngModel)]="wifiState"
/>

<!-- Type: Button -->
<nui-switch 
  type="button"
  variant="solid"
  color="primary"
  onIcon="ri-wifi-line"
  onLabel="WiFi ON"
  offIcon="ri-wifi-off-line"
  offLabel="WiFi OFF"
  [(ngModel)]="wifiState"
/>

<p>Estado: {{ wifiState ? 'Conectado' : 'Desconectado' }}</p>
```

---

## Performance

### Change Detection: OnPush

El componente usa `ChangeDetectionStrategy.OnPush` para optimizar el rendimiento:

```typescript
@Component({
  selector: 'nui-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

### Computed Properties

Las propiedades calculadas se actualizan solo cuando sus dependencias cambian:

```typescript
readonly isChecked = computed(() => {
  const currentValue = this._internalValue() ?? this.checked();
  const onVal = this.onValue();
  
  if (onVal !== true || this.offValue() !== false) {
    return currentValue === onVal;
  }
  
  return !!currentValue;
});
```

---

## Testing

### Unit Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent, FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
  });
  
  it('should toggle value on click', () => {
    const compiled = fixture.nativeElement;
    const switchElement = compiled.querySelector('.nui-switch');
    
    expect(component.isChecked()).toBe(false);
    
    switchElement.click();
    fixture.detectChanges();
    
    expect(component.isChecked()).toBe(true);
  });
  
  it('should support custom values', () => {
    fixture.componentRef.setInput('onValue', 'premium');
    fixture.componentRef.setInput('offValue', 'basic');
    fixture.detectChanges();
    
    const switchElement = fixture.nativeElement.querySelector('.nui-switch');
    switchElement.click();
    fixture.detectChanges();
    
    expect(component._internalValue()).toBe('premium');
  });
});
```

---

## Troubleshooting

### El switch no responde a clicks

**Problema:** El switch no cambia de estado al hacer click.

**Solución:**
- Verifica que no esté `disabled="true"`
- Asegúrate de usar `[(ngModel)]` o `[formControlName]`
- Comprueba que no haya CSS que bloquee `pointer-events`

### Los tamaños no se aplican

**Problema:** Todos los switches tienen el mismo tamaño.

**Solución:**
- Usa `inputSize` en lugar de `size`
- Verifica que las variables CSS estén cargadas
- Asegúrate de que el tipo sea correcto (`type="switch"` o `type="button"`)

### Los colores no funcionan en tema oscuro

**Problema:** Los colores no se ven bien en dark mode.

**Solución:**
- Verifica que `.theme-dark` esté en el body
- Comprueba que las variables de tema oscuro estén definidas en `_theme.scss`
- Refresca el navegador para recargar estilos

---

## Roadmap

### Futuras Mejoras

- [ ] **Animación de desplazamiento**: Suavizar movimiento del thumb
- [ ] **Loading state**: Indicador de carga durante operaciones async
- [ ] **Tamaños personalizados**: Variables CSS para dimensiones custom
- [ ] **Gestos táctiles**: Swipe para toggle en móvil
- [ ] **Sonidos**: Feedback auditivo opcional (click sound)
- [ ] **Haptic feedback**: Vibración en dispositivos móviles

---

## Conclusión

El SwitchComponent es una solución versátil que combina:

✅ **Dos tipos de visualización** (switch/button)  
✅ **Valores personalizados** (no solo booleanos)  
✅ **Sistema completo de theming** (colores, tamaños, variantes)  
✅ **Integración nativa con Forms**  
✅ **Accesibilidad WCAG 2.1 AA**  
✅ **Performance optimizado** (OnPush, signals)  

Perfecto para cualquier caso de uso que requiera toggles, desde configuraciones simples hasta controles complejos con estados personalizados.

---

**Documentación actualizada:** Octubre 2025  
**Versión:** 2.0.0  
**Autor:** NUI Design System
