# Arquitectura de Estilos de NUI

Este documento describe la estructura del sistema de estilos de NUI y cómo trabajar con él.

---

## 📁 Estructura del Directorio

```
styles/
├── components/           → Mixins y estilos compartidos entre componentes
│   ├── _button.scss
│   ├── _modal-dialog.scss
│   ├── _popover.scss
│   └── _components.scss  → Entry point que importa todos
│
├── variables/            → Tokens de diseño por componente
│   ├── button/
│   │   ├── _button-tokens.scss      → Valores SCSS ($variables)
│   │   └── button-variables.scss    → CSS Custom Properties (--vars)
│   ├── modal-dialog/
│   ├── paginator/
│   └── README.md
│
├── icons/                → Estilos de iconos (RemixIcon)
│   └── _remixicon.scss
│
├── _base.scss            → Reset CSS y estilos fundacionales
├── _colors.scss          → Sistema de colores y paleta
├── _config.scss          → Configuración global del sistema
├── _functions.scss       → Funciones SCSS reutilizables
├── _mixins.scss          → Mixins compartidos (sizes, spacing, etc.)
├── _theme-config.scss    → Configuración de temas (light/dark)
├── _typography.scss      → Sistema tipográfico
│
├── nui.scss              → Entry point principal (componentes individuales)
└── nui-bundle.scss       → Bundle completo (todo incluido)
```

---

## 🎯 ¿Dónde va cada cosa?

### ✅ VA en `styles/components/`
- **Mixins compartidos** entre múltiples componentes
- **Estilos base** que se reutilizan (`.nui-btn`, `.nui-modal`, etc.)
- **Utilidades** que otros componentes pueden incluir con `@include`

**Ejemplo:**
```scss
// styles/components/_button.scss
@mixin button-base-styles {
  display: flex;
  gap: var(--nui-button-gap);
  border-radius: var(--nui-button-border-radius);
  // ...
}
```

### ✅ VA en `styles/variables/{component}/`
- **Tokens de diseño** específicos del componente
- **Variables CSS** que se exponen al consumidor
- **Valores SCSS** para cálculos y generación

**Ejemplo:**
```scss
// styles/variables/button/_button-tokens.scss
$button-gap: 8px;
$button-border-radius: 4px;

// styles/variables/button/button-variables.scss
@mixin nui-button-vars {
  --nui-button-gap: #{$button-gap};
  --nui-button-border-radius: #{$button-border-radius};
}
```

### ✅ VA en `src/lib/components/{name}/*.scss`
- **Estilos del host** (`:host { ... }`)
- **Estilos específicos** del componente que NO se comparten
- **Imports** de mixins desde `styles/`

**Ejemplo:**
```scss
// src/lib/components/button/button.component.scss
@use '../../../../styles/components/button';

:host {
  display: inline-block;
  &.full-width { width: 100%; }
}

.nui-btn {
  @include button.button-base-styles;
}
```

---

## 🔄 Flujo de Compilación

```
1. Desarrollo
   ├── styles/*.scss (mixins, variables, base)
   └── src/lib/components/**/*.scss (componentes usan @use)

2. Build (nx build nui)
   ├── SCSS → CSS compilation
   └── Genera: dist/nui/styles/nui.css (518KB)

3. Consumidor
   ├── Importa: node_modules/nui/styles/nui.css
   └── ThemeService inyecta colores dinámicos (CSS-in-JS)
```

---

## 🎨 Sistema de Tokens

### Colores Semánticos
```scss
// Inyectados dinámicamente por ThemeService
--nui-color-primary
--nui-color-secondary
--nui-color-accent
--nui-color-success
--nui-color-info
--nui-color-warning
--nui-color-danger
```

### Variables de Componentes
```scss
// Precompiladas en nui.css
--nui-button-gap: 8px;
--nui-button-border-radius: 4px;
--nui-modal-padding: 24px;
--nui-popover-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

### Variables Globales
```scss
// Sistema de espaciado
--nui-spacing-xs, --nui-spacing-sm, --nui-spacing-md, --nui-spacing-lg, --nui-spacing-xl

// Sistema de tamaños
--nui-font-size-xs, --nui-font-size-sm, --nui-font-size-md, --nui-font-size-lg

// Sistema de bordes
--nui-border-radius-sm, --nui-border-radius-md, --nui-border-radius-lg
--nui-border-width-s, --nui-border-width-m, --nui-border-width-l
```

---

## 💡 Ejemplos de Uso

### Usar Variables en Componentes
```scss
// src/lib/components/card/card.component.scss
.nui-card {
  padding: var(--nui-spacing-md);
  border-radius: var(--nui-border-radius-md);
  background: var(--nui-color-primary);
  box-shadow: var(--shadow-md);
}
```

### Crear un Mixin Compartido
```scss
// styles/components/_nuevo-componente.scss
@use "../mixins";

@mixin nuevo-componente-base {
  @include mixins.component-size(md);
  border-radius: var(--nui-border-radius-md);
  transition: all var(--nui-transition-duration-normal);
}
```

### Definir Variables del Componente
```scss
// styles/variables/nuevo-componente/_tokens.scss
$nuevo-gap: 12px;
$nuevo-padding: 16px;

// styles/variables/nuevo-componente/variables.scss
@use "tokens";

@mixin nui-nuevo-vars {
  --nui-nuevo-gap: #{tokens.$nuevo-gap};
  --nui-nuevo-padding: #{tokens.$nuevo-padding};
}
```

### Usar el Mixin en el Componente
```scss
// src/lib/components/nuevo-componente/nuevo.component.scss
@use '../../../../styles/components/nuevo-componente';

.nui-nuevo {
  @include nuevo-componente.nuevo-componente-base;
  gap: var(--nui-nuevo-gap);
  padding: var(--nui-nuevo-padding);
}
```

---

## 🎯 Entry Points

### `nui.scss` - Componentes Individuales
Importa solo los componentes que existen. Ideal para tree-shaking.

```scss
@use 'base';
@use 'typography';
@use 'components/button';
@use 'components/modal-dialog';
// etc...
```

### `nui-bundle.scss` - Bundle Completo
Importa TODO (componentes + iconos). Más pesado pero completo.

```scss
@use 'nui';
@use 'icons/remixicon';
```

---

## ✅ Mejores Prácticas

### Al Crear un Nuevo Componente

1. **Crea la estructura de variables:**
   ```
   styles/variables/mi-componente/
   ├── _mi-componente-tokens.scss
   └── mi-componente-variables.scss
   ```

2. **Define tokens SCSS:**
   ```scss
   // _mi-componente-tokens.scss
   $mi-componente-gap: 8px;
   $mi-componente-padding: 16px;
   ```

3. **Crea el mixin de variables CSS:**
   ```scss
   // mi-componente-variables.scss
   @use "mi-componente-tokens" as tokens;
   
   @mixin nui-mi-componente-vars {
     --nui-mi-componente-gap: #{tokens.$mi-componente-gap};
     --nui-mi-componente-padding: #{tokens.$mi-componente-padding};
   }
   ```

4. **Si hay estilos compartidos, crea mixin:**
   ```scss
   // styles/components/_mi-componente.scss
   @use "../config";
   @use "../mixins";
   
   @mixin mi-componente-base {
     // Estilos compartidos aquí
   }
   ```

5. **Importa en el componente:**
   ```scss
   // src/lib/components/mi-componente/mi-componente.component.scss
   @use '../../../../styles/components/mi-componente';
   
   .nui-mi-componente {
     @include mi-componente.mi-componente-base;
   }
   ```

6. **Registra en `nui.scss`:**
   ```scss
   @use 'components/mi-componente';
   @use 'variables/mi-componente/mi-componente-variables';
   
   :root {
     @include mi-componente-variables.nui-mi-componente-vars;
   }
   ```

### Reglas Generales

- ✅ **Usa siempre variables CSS** en vez de valores hardcodeados
- ✅ **Prefija variables** con `--nui-{component}-{property}`
- ✅ **Documenta** nuevas variables en este README
- ✅ **Reutiliza mixins** existentes (`component-size`, `focus-styles`, etc.)
- ✅ **Mantén consistencia** en nombres y estructura
- ❌ **NO uses valores hex directos** → Usa variables CSS
- ❌ **NO dupliques código** → Crea mixins compartidos
- ❌ **NO mezcles concerns** → Variables en `variables/`, mixins en `components/`

---

## 🔧 Comandos Útiles

```bash
# Compilar estilos
npm run build:styles

# Compilar solo nui.scss
npm run build:styles:nui

# Compilar solo nui-bundle.scss
npm run build:styles:bundle

# Build completo de la librería
npm run build:nui
```

---

## 📚 Recursos Relacionados

- [Sistema de Temas](../src/lib/themes/THEME.md) - Presets y dark mode
- [Componentes](../src/lib/components/) - Código TypeScript de componentes
- [Configuración](../../../README.md) - Configuración del workspace

---

## ❓ Preguntas Frecuentes

### ¿Por qué los estilos están separados de los componentes?

**Respuesta:** Por performance y mantenibilidad:
- ✅ Un solo `nui.css` compilado (518KB) → No recompilación en proyectos consumidores
- ✅ Sistema de diseño centralizado → Cambios en variables afectan todos los componentes
- ✅ Tree-shaking optimizado → Build más rápido
- ✅ Consistencia → Tokens compartidos entre componentes

### ¿Cuándo usar `nui.scss` vs `nui-bundle.scss`?

- **`nui.scss`**: Para aplicaciones (tree-shaking, solo componentes usados)
- **`nui-bundle.scss`**: Para demos o cuando necesitas iconos RemixIcon incluidos

### ¿Puedo sobreescribir variables CSS?

**Sí**, puedes sobreescribir cualquier variable CSS en tu aplicación:

```scss
// styles.scss de tu app
:root {
  --nui-button-border-radius: 12px; // Botones más redondeados
  --nui-modal-padding: 32px;        // Modales más espaciosos
}
```

### ¿Cómo agrego un nuevo preset de colores?

Ver [Sistema de Temas](../src/lib/themes/THEME.md) para crear presets personalizados.

---

**¿Dudas o sugerencias?** Actualiza este README para ayudar a otros desarrolladores. 🎨