# Button Group Component

Componente de grupo de botones con selección tipo radio o checkbox. Similar a toggle-button pero con soporte para multiselección y mejor configurabilidad.

## 📦 Importación

```typescript
import { ButtonGroupComponent } from '@shared/components/button-group';
```

## 🎯 Selector

```html
<nui-button-group></nui-button-group>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `options` | `ButtonGroupOption[] \| any[]` | `[]` | **Requerido**. Opciones disponibles |
| `mode` | `ButtonGroupMode` | `'radio'` | Modo de selección (`'radio' \| 'checkbox'`) |
| `width` | `ButtonWidth` | `'auto'` | Ancho del componente (`'auto' \| 'fit' \| 'full'`) |
| `labelBy` | `string` | `'label'` | Nombre de la propiedad para el label |
| `valueBy` | `string` | `'value'` | Nombre de la propiedad para el value |
| `iconBy` | `string` | `'icon'` | Nombre de la propiedad para el icon |
| `disabledBy` | `string` | `'disabled'` | Nombre de la propiedad para disabled |
| `size` | `NUISize` | `'md'` | Tamaño de los botones (`'xs' \| 's' \| 'md' \| 'lg' \| 'xl'`) |
| `color` | `NUIColor` | `'primary'` | Color de los botones |
| `variant` | `NUIVariant` | `'solid'` | Variante visual (`'solid' \| 'outline' \| 'ghost'`) |
| `disabled` | `boolean` | `false` | Si el componente está deshabilitado |
| `iconOnly` | `boolean` | `false` | Si muestra solo iconos (sin texto) |
| `value` | `any \| any[]` | `null` | Valor(es) seleccionado(s) |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `valueChange` | `EventEmitter<any \| any[]>` | Se emite cuando cambia la selección |

### Tipos

```typescript
type ButtonGroupMode = 'radio' | 'checkbox';
type NUIVariant = 'solid' | 'outline' | 'ghost';
type ButtonWidth = 'auto' | 'fit' | 'full';
type NUIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
type NUISize = 'xs' | 's' | 'md' | 'lg' | 'xl';

interface ButtonGroupOption {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}
```

### Integración con Formularios

ButtonGroup implementa `ControlValueAccessor` para integración con Angular Forms:

```typescript
// Template-driven
<nui-button-group [(ngModel)]="selectedView"></nui-button-group>

// Reactive forms
<nui-button-group formControlName="view"></nui-button-group>
```

## 💡 Ejemplos de Uso

### Modo Radio (Selección Única)

```typescript
export class MyComponent {
  viewOptions: ButtonGroupOption[] = [
    { label: 'Lista', value: 'list', icon: 'ri-list-check' },
    { label: 'Cuadrícula', value: 'grid', icon: 'ri-grid-line' },
    { label: 'Tablero', value: 'board', icon: 'ri-dashboard-line' }
  ];
  
  selectedView = 'list';
  
  onViewChange(value: string) {
    console.log('Vista seleccionada:', value);
  }
}
```

```html
<!-- Selección única - solo un botón puede estar activo -->
<nui-button-group
  [options]="viewOptions"
  mode="radio"
  [(value)]="selectedView"
  (valueChange)="onViewChange($event)">
</nui-button-group>
```

### Modo Checkbox (Multiselección)

```typescript
export class MyComponent {
  formatOptions: ButtonGroupOption[] = [
    { label: 'Negrita', value: 'bold', icon: 'ri-bold' },
    { label: 'Cursiva', value: 'italic', icon: 'ri-italic' },
    { label: 'Subrayado', value: 'underline', icon: 'ri-underline' }
  ];
  
  selectedFormats: string[] = [];
}
```

```html
<!-- Multiselección - múltiples botones pueden estar activos -->
<nui-button-group
  [options]="formatOptions"
  mode="checkbox"
  [(value)]="selectedFormats"
  color="primary">
</nui-button-group>

<!-- selectedFormats puede ser: [], ['bold'], ['bold', 'italic'], etc. -->
```

### Solo Iconos (Icon Only)

```typescript
export class MyComponent {
  alignOptions: ButtonGroupOption[] = [
    { label: 'Izquierda', value: 'left', icon: 'ri-align-left' },
    { label: 'Centro', value: 'center', icon: 'ri-align-center' },
    { label: 'Derecha', value: 'right', icon: 'ri-align-right' },
    { label: 'Justificado', value: 'justify', icon: 'ri-align-justify' }
  ];
  
  textAlign = 'left';
}
```

```html
<!-- Muestra solo los iconos, sin texto -->
<nui-button-group
  [options]="alignOptions"
  mode="radio"
  [(value)]="textAlign"
  [iconOnly]="true"
  color="accent">
</nui-button-group>
```

### Variantes de Estilo

```html
<!-- Solid (por defecto) - Botones con fondo completo -->
<nui-button-group
  [options]="options"
  variant="solid"
  color="primary">
</nui-button-group>

<!-- Outline - Botones con solo borde -->
<nui-button-group
  [options]="options"
  variant="outline"
  color="primary">
</nui-button-group>

<!-- Ghost - Botones con fondo suave -->
<nui-button-group
  [options]="options"
  variant="ghost"
  color="primary">
</nui-button-group>
```

### Colores

```html
<nui-button-group [options]="options" color="primary"></nui-button-group>
<nui-button-group [options]="options" color="secondary"></nui-button-group>
<nui-button-group [options]="options" color="success"></nui-button-group>
<nui-button-group [options]="options" color="info"></nui-button-group>
<nui-button-group [options]="options" color="warning"></nui-button-group>
<nui-button-group [options]="options" color="danger"></nui-button-group>
<nui-button-group [options]="options" color="accent"></nui-button-group>
```

### Tamaños

```html
<nui-button-group [options]="options" size="xs"></nui-button-group>
<nui-button-group [options]="options" size="s"></nui-button-group>
<nui-button-group [options]="options" size="md"></nui-button-group>
<nui-button-group [options]="options" size="lg"></nui-button-group>
<nui-button-group [options]="options" size="xl"></nui-button-group>
```

### Opciones con Objetos Personalizados

```typescript
export class MyComponent {
  // Objetos personalizados con propiedades diferentes
  customOptions = [
    { name: 'Hoy', id: 'today', inactive: false },
    { name: 'Semana', id: 'week', inactive: false },
    { name: 'Mes', id: 'month', inactive: false },
    { name: 'Año', id: 'year', inactive: true } // Esta opción está deshabilitada
  ];
  
  selectedPeriod = 'today';
}
```

```html
<!-- Mapeo de propiedades personalizadas -->
<nui-button-group
  [options]="customOptions"
  mode="radio"
  [(value)]="selectedPeriod"
  labelBy="name"
  valueBy="id"
  disabledBy="inactive">
</nui-button-group>
```

### Integración con Reactive Forms

```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

export class SettingsComponent {
  settingsForm: FormGroup;
  
  themeOptions: ButtonGroupOption[] = [
    { label: 'Claro', value: 'light', icon: 'ri-sun-line' },
    { label: 'Oscuro', value: 'dark', icon: 'ri-moon-line' },
    { label: 'Auto', value: 'auto', icon: 'ri-contrast-line' }
  ];

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      theme: ['light']
    });
  }
  
  onSubmit() {
    console.log(this.settingsForm.value.theme);
    // Output: 'light', 'dark', o 'auto'
  }
}
```

```html
<form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
  <nui-button-group
    [options]="themeOptions"
    formControlName="theme"
    mode="radio"
    color="primary">
  </nui-button-group>
  
  <button type="submit">Guardar</button>
</form>
```

### Botones Deshabilitados

```typescript
export class MyComponent {
  options: ButtonGroupOption[] = [
    { label: 'Opción 1', value: 1 },
    { label: 'Opción 2', value: 2, disabled: true }, // Esta opción está deshabilitada
    { label: 'Opción 3', value: 3 }
  ];
  
  // O deshabilitar todo el componente
  isDisabled = false;
}
```

```html
<!-- Opción individual deshabilitada -->
<nui-button-group [options]="options"></nui-button-group>

<!-- Todo el componente deshabilitado -->
<nui-button-group 
  [options]="options"
  [disabled]="isDisabled">
</nui-button-group>
```

## 🎯 Casos de Uso

### Selector de Vista

```typescript
export class DataViewComponent {
  viewModes: ButtonGroupOption[] = [
    { label: 'Lista', value: 'list', icon: 'ri-list-check' },
    { label: 'Cuadrícula', value: 'grid', icon: 'ri-grid-line' },
    { label: 'Kanban', value: 'kanban', icon: 'ri-trello-line' }
  ];
  
  currentView = 'list';
  
  onViewChange(view: string) {
    this.loadData(view);
  }
}
```

```html
<div class="toolbar">
  <h2>Proyectos</h2>
  <nui-button-group
    [options]="viewModes"
    [(value)]="currentView"
    (valueChange)="onViewChange($event)"
    [iconOnly]="true"
    size="s"
    variant="outline">
  </nui-button-group>
</div>
```

### Editor de Texto (Formato)

```typescript
export class TextEditorComponent {
  textFormat: string[] = [];
  
  formatOptions: ButtonGroupOption[] = [
    { label: 'B', value: 'bold', icon: 'ri-bold' },
    { label: 'I', value: 'italic', icon: 'ri-italic' },
    { label: 'U', value: 'underline', icon: 'ri-underline' },
    { label: 'S', value: 'strikethrough', icon: 'ri-strikethrough' }
  ];
  
  onFormatChange(formats: string[]) {
    this.applyFormatting(formats);
  }
}
```

```html
<div class="editor-toolbar">
  <!-- Multiselección para formato de texto -->
  <nui-button-group
    [options]="formatOptions"
    mode="checkbox"
    [(value)]="textFormat"
    (valueChange)="onFormatChange($event)"
    [iconOnly]="true"
    size="s"
    color="accent">
  </nui-button-group>
</div>
```

### Filtro de Período

```typescript
export class DashboardComponent {
  periods: ButtonGroupOption[] = [
    { label: 'Día', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Año', value: 'year' }
  ];
  
  selectedPeriod = 'week';
  
  onPeriodChange(period: string) {
    this.loadAnalytics(period);
  }
}
```

```html
<div class="dashboard-header">
  <h1>Analíticas</h1>
  <nui-button-group
    [options]="periods"
    [(value)]="selectedPeriod"
    (valueChange)="onPeriodChange($event)"
    variant="solid"
    color="primary">
  </nui-button-group>
</div>
```

### Alineación de Texto

```typescript
export class DocumentEditorComponent {
  textAlignOptions: ButtonGroupOption[] = [
    { label: 'Izquierda', value: 'left', icon: 'ri-align-left' },
    { label: 'Centro', value: 'center', icon: 'ri-align-center' },
    { label: 'Derecha', value: 'right', icon: 'ri-align-right' },
    { label: 'Justificar', value: 'justify', icon: 'ri-align-justify' }
  ];
  
  alignment = 'left';
}
```

```html
<nui-button-group
  [options]="textAlignOptions"
  [(value)]="alignment"
  [iconOnly]="true"
  mode="radio"
  size="s"
  variant="ghost">
</nui-button-group>
```

### Selector de Idioma

```typescript
export class HeaderComponent {
  languages: ButtonGroupOption[] = [
    { label: 'ES', value: 'es', icon: 'ri-translate' },
    { label: 'EN', value: 'en', icon: 'ri-translate' },
    { label: 'FR', value: 'fr', icon: 'ri-translate' }
  ];
  
  currentLang = 'es';
  
  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
```

```html
<nui-button-group
  [options]="languages"
  [(value)]="currentLang"
  (valueChange)="changeLanguage($event)"
  mode="radio"
  size="s"
  variant="outline"
  color="secondary">
</nui-button-group>
```

## 🎨 Estados Visuales

### Botón Seleccionado

Los botones seleccionados muestran indicadores visuales según la variante:

- **Solid**: Fondo de color completo con el color seleccionado
- **Outline**: Borde y texto con el color, fondo transparente cuando no está seleccionado
- **Ghost**: Fondo suave del color cuando está seleccionado

```html
<nui-button-group
  [options]="options"
  [(value)]="selected"
  variant="solid">
  <!-- El botón seleccionado se resalta automáticamente -->
</nui-button-group>
```

### Hover y Focus

- **Hover**: El botón cambia ligeramente de color
- **Focus**: Muestra un outline para accesibilidad
- **Active**: Efecto visual al hacer clic

### Estados Deshabilitados

```html
<!-- Componente completo deshabilitado -->
<nui-button-group
  [options]="options"
  [disabled]="true">
</nui-button-group>

<!-- Opción individual deshabilitada -->
<nui-button-group
  [options]="[
    { label: 'Activo', value: 1 },
    { label: 'Deshabilitado', value: 2, disabled: true }
  ]">
</nui-button-group>
```

## 📐 Estructura Visual

Los botones se organizan horizontalmente con:
- **Borde compartido**: Los botones adyacentes comparten el borde
- **Border-radius**: Solo el primer y último botón tienen esquinas redondeadas
- **Sin separación**: Los botones están unidos sin espacios entre ellos

```
┌─────────┬─────────┬─────────┐
│ Botón 1 │ Botón 2 │ Botón 3 │
└─────────┴─────────┴─────────┘
  ↑                           ↑
Redondeado               Redondeado
```

## ♿ Accesibilidad

ButtonGroup implementa un sistema completo de accesibilidad que cumple con las pautas **WCAG 2.1 AA**, proporcionando navegación por teclado intuitiva y roles ARIA apropiados para ambos modos de funcionamiento.

### 🎯 Especificación ARIA

#### Modo Radio (Selección Única)

En modo radio, ButtonGroup utiliza el patrón **radiogroup** siguiendo las especificaciones ARIA:

```html
<div role="radiogroup" aria-labelledby="group-label">
  <button role="radio" aria-checked="false" tabindex="-1">Opción 1</button>
  <button role="radio" aria-checked="true" tabindex="0">Opción 2</button>
  <button role="radio" aria-checked="false" tabindex="-1">Opción 3</button>
</div>
```

**Roles y Estados:**
- `role="radiogroup"`: Contenedor principal que agrupa las opciones mutuamente excluyentes
- `role="radio"`: Cada botón actúa como un radio button
- `aria-checked`: Estado de selección (`true`/`false`)
- `aria-disabled`: Estado de deshabilitado cuando aplique
- `tabindex`: Gestión de foco usando roving tabindex pattern

#### Modo Checkbox (Selección Múltiple)

En modo checkbox, cada botón funciona independientemente:

```html
<div role="group" aria-labelledby="group-label">
  <button role="checkbox" aria-checked="false" tabindex="0">Opción 1</button>
  <button role="checkbox" aria-checked="true" tabindex="0">Opción 2</button>
  <button role="checkbox" aria-checked="false" tabindex="0">Opción 3</button>
</div>
```

**Roles y Estados:**
- `role="group"`: Contenedor que agrupa checkboxes relacionados
- `role="checkbox"`: Cada botón actúa como checkbox independiente
- `aria-checked`: Estado individual de cada opción
- `aria-disabled`: Estado de deshabilitado por opción
- `tabindex="0"`: Todos los elementos son accesibles por Tab

### ⌨️ Navegación por Teclado

#### Modo Radio - Roving Tabindex Pattern

La navegación en modo radio sigue el patrón estándar de radiogroup con **roving tabindex**:

| Tecla | Acción |
|-------|---------|
| `Tab` | Entra al grupo (foco al elemento seleccionado o primero) |
| `Shift + Tab` | Sale del grupo hacia el elemento anterior |
| `↑ ← (Flecha Arriba/Izquierda)` | Selecciona la opción anterior (circular) |
| `↓ → (Flecha Abajo/Derecha)` | Selecciona la opción siguiente (circular) |
| `Home` | Selecciona la primera opción disponible |
| `End` | Selecciona la última opción disponible |
| `Space/Enter` | Confirma la selección actual |

**Comportamiento Circular:**
- Desde el primer elemento, flecha izquierda/arriba va al último
- Desde el último elemento, flecha derecha/abajo va al primero
- Se omiten automáticamente las opciones deshabilitadas

#### Modo Checkbox - Standard Tabbing

En modo checkbox, cada elemento es independiente y sigue navegación estándar:

| Tecla | Acción |
|-------|---------|
| `Tab` | Navega al siguiente botón del grupo |
| `Shift + Tab` | Navega al botón anterior |
| `Space/Enter` | Alterna el estado del botón actual |
| `↑ ← (Flechas)` | Navega al botón anterior (sin cambiar estado) |
| `↓ → (Flechas)` | Navega al botón siguiente (sin cambiar estado) |

### 🎨 Estados Visuales de Foco

ButtonGroup utiliza el sistema de focus del componente Button base:

#### Estados de Foco por Variante

```scss
// Solid variant - Contraste alto
.nui-button-group--solid .nui-button:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--focus-ring-shadow);
}

// Outline variant - Ring más prominente
.nui-button-group--outline .nui-button:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 1px;
  box-shadow: 0 0 0 1px var(--button-outline-border);
}

// Ghost variant - Background + ring
.nui-button-group--ghost .nui-button:focus-visible {
  background-color: var(--button-ghost-hover-bg);
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 1px;
}
```

#### Personalización de Variables de Foco

```scss
.nui-button-group {
  // Variables base
  --focus-ring-color: rgb(59 130 246); // blue-500
  --focus-ring-shadow: rgb(59 130 246 / 0.5);
  --focus-offset-width: 2px;

  // Adaptación por tema
  &[data-theme="dark"] {
    --focus-ring-color: rgb(147 197 253); // blue-300
    --focus-ring-shadow: rgb(147 197 253 / 0.5);
  }

  // Modo de alto contraste
  @media (prefers-contrast: high) {
    --focus-ring-color: currentColor;
    --focus-offset-width: 3px;
  }

  // Modo de reducción de movimiento
  @media (prefers-reduced-motion: reduce) {
    .nui-button {
      transition: none;
    }
  }
}
```

### 🧪 Testing de Accesibilidad

#### Pruebas Manuales Recomendadas

**Navegación por Teclado:**
```bash
# Modo Radio
1. Tab → Verificar entrada al primer elemento
2. Flechas → Comprobar navegación circular
3. Space/Enter → Validar selección
4. Tab → Confirmar salida del grupo

# Modo Checkbox  
1. Tab → Navegar por todos los elementos
2. Space → Alternar cada checkbox independientemente
3. Flechas → Navegar sin cambiar estado
```

**Screen Readers:**
```bash
# Verificar anuncios
- "Radio group, [Label del grupo]"
- "Radio button, [Opción], [1 of 3], [checked/unchecked]"
- "Group, [Label del grupo]"
- "Checkbox, [Opción], [checked/unchecked]"
```

#### Configuración de Tests Automatizados

```typescript
// button-group-accessibility.spec.ts
describe('ButtonGroup Accessibility', () => {
  describe('ARIA Compliance', () => {
    it('should have correct radiogroup structure in radio mode', () => {
      const fixture = createComponent({ mode: 'radio' });
      const group = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      const radios = fixture.debugElement.queryAll(By.css('[role="radio"]'));
      
      expect(group).toBeTruthy();
      expect(radios.length).toBe(3);
      expect(radios.every(r => r.attributes['aria-checked'])).toBeTruthy();
    });

    it('should manage tabindex correctly in radio mode', () => {
      const fixture = createComponent({ 
        mode: 'radio',
        value: 'option2'
      });
      
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const tabindexes = buttons.map(b => b.attributes['tabindex']);
      
      expect(tabindexes).toEqual(['-1', '0', '-1']); // Solo el seleccionado
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrows in radio mode', fakeAsync(() => {
      const fixture = createComponent({ mode: 'radio' });
      const firstButton = fixture.debugElement.query(By.css('button'));
      
      firstButton.nativeElement.focus();
      firstButton.triggerEventHandler('keydown', { 
        key: 'ArrowRight', 
        preventDefault: jasmine.createSpy() 
      });
      
      tick();
      fixture.detectChanges();
      
      expect(component.value).toBe('option2');
    }));

    it('should handle Home/End keys', fakeAsync(() => {
      const fixture = createComponent({ mode: 'radio' });
      const secondButton = fixture.debugElement.queryAll(By.css('button'))[1];
      
      secondButton.triggerEventHandler('keydown', { 
        key: 'End',
        preventDefault: jasmine.createSpy() 
      });
      
      tick();
      expect(component.value).toBe('option3'); // Última opción
    }));
  });
});
```

### 📋 Checklist de Implementación

#### Cumplimiento WCAG 2.1 AA

- [x] **1.3.1 Info and Relationships**: Roles ARIA correctos (`radiogroup`/`group`, `radio`/`checkbox`)
- [x] **1.4.1 Use of Color**: Estados indicados por más que solo color (aria-checked, focus visible)
- [x] **1.4.3 Contrast**: Focus ring con contraste mínimo 3:1
- [x] **1.4.11 Non-text Contrast**: Focus indicators con contraste suficiente
- [x] **2.1.1 Keyboard**: Toda funcionalidad accesible por teclado
- [x] **2.1.2 No Keyboard Trap**: Tab permite salir del componente
- [x] **2.4.3 Focus Order**: Orden lógico de navegación
- [x] **2.4.7 Focus Visible**: Indicadores de foco claramente visibles
- [x] **3.2.2 On Input**: Cambios de estado predecibles
- [x] **4.1.2 Name, Role, Value**: Roles, nombres y valores correctos para AT

#### Soporte de Tecnologías Asistivas

- [x] **Screen Readers**: NVDA, JAWS, VoiceOver, TalkBack
- [x] **Navegación por Teclado**: Todas las funciones accesibles
- [x] **Magnificadores de Pantalla**: Focus visible en alto zoom
- [x] **Navegación por Voz**: Comandos de dictado funcionalmente
- [x] **Alto Contraste**: Personalización de variables CSS
- [x] **Reducción de Movimiento**: Transiciones opcionales

## 🎨 Personalización

### Variables CSS Disponibles

```scss
.nui-button-group {
  // Colores se toman del tema
  --btn-group-bg-color: var(--button-primary-bg);
  --btn-group-text-color: var(--button-primary-text);
  --btn-group-border-color: var(--button-primary-bg);
  
  // Tamaños
  --btn-group-padding-x: 1rem;
  --btn-group-padding-y: 0.5rem;
  --btn-group-font-size: 0.875rem;
  
  // Bordes
  --btn-group-border-width: 1px;
  --nui-border-radius-md: 0.375rem;
}
```

## 🔄 Diferencias con ToggleButton

| Característica | ButtonGroup | ToggleButton |
|---------------|-------------|--------------|
| **Multiselección** | ✅ Soporta (modo checkbox) | ❌ Solo selección única |
| **Variantes** | ✅ solid, outline, ghost | ✅ solid, outline, ghost |
| **Iconos** | ✅ Con iconOnly | ❌ No soporta iconos |
| **Deshabilitado** | ✅ Por opción o global | ✅ Global |
| **Objetos custom** | ✅ Con mapeo de props | ✅ Con mapeo de props |
| **Uso ideal** | Toolbars, filtros, editor | Switches simples, opciones binarias |

## 📝 Notas

- **Variantes estandarizadas**: Usa el mismo sistema de variantes que Button y Chip (`solid`, `outline`, `ghost`)
- **Tema consistente**: Utiliza las variables de tema `--button-*` para mantener consistencia visual
- **Modo de selección**: Soporta tanto selección única (`radio`) como múltiple (`checkbox`)
- **FormControl**: Compatible con Angular Forms (template-driven y reactive)
- **Performance**: Utiliza `ChangeDetectionStrategy.OnPush` y signals para optimizar el rendimiento
- **Border-radius mejorado**: Los bordes redondeados se aplican correctamente solo al primer y último botón

## 🔗 Componentes Relacionados

- **[Button](./button.md)**: Comparte el mismo sistema de colores y variantes
- **[ToggleButton](./toggle-button.md)**: Alternativa más simple para selección única
- **[Chip](./chip.md)**: Alternativa con estilo de tags/etiquetas para selección
