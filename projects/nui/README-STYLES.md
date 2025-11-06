# Guía de Uso de Estilos NUI

NUI ofrece **tres formas** de importar los estilos, dependiendo de tus necesidades:

## Opción 1: CSS Pre-compilado (Recomendado - Más Simple)

Esta es la forma más sencilla, similar a PrimeNG. No requiere `@import` en tu `styles.scss`.

### Configuración en `angular.json`:

```json
{
  "projects": {
    "tu-proyecto": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/nui/styles/nui.css",  // ← Estilos de NUI
              "src/styles.scss"                     // ← Tus estilos
            ]
          }
        }
      }
    }
  }
}
```

### En tu `styles.scss`:

```scss
// No necesitas @import de NUI

// Puedes sobrescribir variables CSS:
:root {
  --nui-button-primary-solid-bg: #007bff;
  --nui-color-primary: #custom-color;
}
```

**Ventajas:**
- ✅ Más simple, no requiere `@import`
- ✅ Más rápido de compilar
- ✅ Funciona como PrimeNG y otras librerías populares

**Desventajas:**
- ❌ No puedes usar variables SCSS de NUI
- ❌ Solo puedes sobrescribir CSS custom properties

---

## Opción 2: SCSS Completo (Máxima Personalización)

Importa los archivos SCSS de NUI para tener acceso total a variables y mixins SCSS.

### En tu `styles.scss`:

```scss
// Opcional: Sobrescribir variables SCSS ANTES de importar
$button-gap: 0.75rem;
$color-primary: #custom-color;

// Importar NUI
@import "nui/styles/nui";

// Sobrescribir CSS custom properties DESPUÉS
:root {
  --nui-button-primary-solid-bg: #007bff;
}
```

**Ventajas:**
- ✅ Control total sobre variables SCSS
- ✅ Acceso a mixins y funciones de NUI
- ✅ Puedes personalizar antes de compilar

**Desventajas:**
- ❌ Compilación más lenta
- ❌ Requiere `@import` explícito

---

## Opción 3: Híbrida (CSS + Personalizaciones SCSS)

Usa el CSS pre-compilado pero importa solo las partes que necesitas personalizar.

### Configuración en `angular.json`:

```json
{
  "styles": [
    "node_modules/nui/styles/nui.css",
    "src/styles.scss"
  ]
}
```

### En tu `styles.scss`:

```scss
// Importar solo config y mixins para usar funciones
@import "nui/styles/config";
@import "nui/styles/mixins";

// Ahora puedes usar mixins de NUI
.mi-componente {
  @include button-base-styles;
}

// Y sobrescribir variables CSS
:root {
  --nui-button-primary-solid-bg: #007bff;
}
```

**Ventajas:**
- ✅ Balance entre simplicidad y flexibilidad
- ✅ Acceso a mixins sin compilar todo

**Desventajas:**
- ❌ Más complejo que la Opción 1

---

## Recomendación

- **Para proyectos nuevos o simples**: Usa **Opción 1** (CSS pre-compilado)
- **Para personalización avanzada**: Usa **Opción 2** (SCSS completo)
- **Para casos específicos**: Usa **Opción 3** (Híbrida)

## Temas

### Tema Oscuro

Con cualquier opción, puedes activar el tema oscuro agregando la clase `theme-dark` al elemento `<html>` o `<body>`:

```typescript
// En tu app.component.ts
document.documentElement.classList.add('theme-dark');
```

O en tu template:

```html
<html class="theme-dark">
  <!-- tu app -->
</html>
```
