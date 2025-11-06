# Tooltip Component

Directiva y componente para mostrar tooltips informativos con soporte para texto simple y templates personalizados. Utiliza Angular CDK Overlay para un posicionamiento preciso y responsive.

## 📦 Importación

```typescript
import { TooltipDirective } from '@shared/components/tooltip';
```

## 🎯 Selector

```html
<element nuiTooltip="texto del tooltip"></element>
```

## 📋 API

### Directiva: nuiTooltip

#### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `nuiTooltip` | `string \| TemplateRef<any>` | - | Contenido del tooltip (texto o template) |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posición del tooltip respecto al elemento |
| `tooltipEvent` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | Evento que dispara el tooltip |
| `tooltipShowDelay` | `number` | `300` | Delay antes de mostrar el tooltip (ms) |
| `tooltipHideDelay` | `number` | `0` | Delay antes de ocultar el tooltip (ms) |
| `tooltipDisabled` | `boolean` | `false` | Desactiva el tooltip |
| `tooltipShowArrow` | `boolean` | `true` | Muestra una flecha apuntando al elemento |
| `tooltipInteractive` | `boolean` | `false` | Permite interactuar con el contenido del tooltip (hover sobre el tooltip) |
| `tooltipClass` | `string` | - | Clase CSS personalizada para el tooltip |

### Tipos

```typescript
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipEvent = 'hover' | 'click' | 'focus' | 'manual';

interface TooltipConfig {
  position?: TooltipPosition;
  event?: TooltipEvent;
  showDelay?: number;
  hideDelay?: number;
  disabled?: boolean;
  showArrow?: boolean;
  interactive?: boolean;
  tooltipClass?: string;
  maxWidth?: string;
  zIndex?: number;
}
```

## ⚙️ Configuración Global

Puedes configurar valores por defecto para todos los tooltips de la aplicación usando `provideNUIConfig`:

```typescript
// En app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUIConfig } from '@shared/configs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      tooltip: {
        position: 'bottom',      // Todos los tooltips se mostrarán abajo por defecto
        event: 'hover',          // Evento por defecto
        showDelay: 500,          // Delay global de 500ms
        hideDelay: 0,
        showArrow: true,
        interactive: false,
        tooltipClass: 'my-custom-tooltip'  // Clase global
      }
    })
  ]
};
```

**Nota**: Los valores individuales en cada tooltip tienen prioridad sobre la configuración global.

```html
<!-- Este tooltip usará position='bottom' y showDelay=500 de la config global -->
<button nuiTooltip="Texto">Botón</button>

<!-- Este tooltip sobrescribe la posición pero mantiene el delay global -->
<button nuiTooltip="Texto" tooltipPosition="top">Botón</button>
```

## 💡 Ejemplos de Uso

### Tooltip Básico

```html
<!-- Tooltip simple con texto -->
<button nuiTooltip="Guardar cambios">Guardar</button>

<!-- Con posición específica -->
<button nuiTooltip="Eliminar" tooltipPosition="bottom">
  <i class="ri-delete-bin-line"></i>
</button>

<!-- En un ícono -->
<i class="ri-information-line" nuiTooltip="Información adicional"></i>
```

### Posiciones

```html
<!-- Arriba (por defecto) -->
<button nuiTooltip="Tooltip arriba" tooltipPosition="top">Top</button>

<!-- Abajo -->
<button nuiTooltip="Tooltip abajo" tooltipPosition="bottom">Bottom</button>

<!-- Izquierda -->
<button nuiTooltip="Tooltip izquierda" tooltipPosition="left">Left</button>

<!-- Derecha -->
<button nuiTooltip="Tooltip derecha" tooltipPosition="right">Right</button>
```

### Eventos

```html
<!-- Hover (por defecto) - se muestra al pasar el mouse -->
<button nuiTooltip="Aparece con hover" tooltipEvent="hover">Hover</button>

<!-- Click - se muestra/oculta al hacer click -->
<button nuiTooltip="Aparece con click" tooltipEvent="click">Click</button>

<!-- Focus - se muestra al hacer focus (tabulación) y hover -->
<button nuiTooltip="Aparece con focus" tooltipEvent="focus">Focus</button>

<!-- Focus también funciona en elementos no interactivos (se agrega tabindex automáticamente) -->
<span nuiTooltip="Elemento con focus" tooltipEvent="focus">
  Presiona Tab para enfocar
</span>
```

**Nota sobre el evento 'focus'**: 
- El tooltip se muestra tanto con focus (Tab) como con hover
- Si el elemento no es naturalmente enfocable (como `<span>`, `<div>`), se agrega automáticamente `tabindex="0"`
- Útil para accesibilidad por teclado

### Tooltip con Template Personalizado

```html
<!-- Definir el template -->
<button [nuiTooltip]="tooltipTemplate">Ver detalles</button>

<ng-template #tooltipTemplate>
  <div class="custom-tooltip-content">
    <strong>Usuario</strong>
    <p>Juan Pérez</p>
    <small>Última conexión: hace 2 horas</small>
  </div>
</ng-template>
```

### Configuración de Delays

```html
<!-- Tooltip que aparece inmediatamente -->
<button 
  nuiTooltip="Aparece rápido" 
  [tooltipShowDelay]="0">
  Hover rápido
</button>

<!-- Tooltip con delay largo -->
<button 
  nuiTooltip="Aparece después de 1 segundo" 
  [tooltipShowDelay]="1000">
  Hover lento
</button>

<!-- Tooltip que permanece visible un momento -->
<button 
  nuiTooltip="Tarda en desaparecer" 
  [tooltipHideDelay]="500">
  Con delay al cerrar
</button>
```

### Tooltip sin Flecha

```html
<!-- Con flecha (por defecto) -->
<button nuiTooltip="Tooltip con flecha">Con flecha</button>

<!-- Sin flecha -->
<button 
  nuiTooltip="Tooltip sin flecha" 
  [tooltipShowArrow]="false">
  Sin flecha
</button>
```

### Tooltip Deshabilitado

```html
<!-- Tooltip deshabilitado condicionalmente -->
<button 
  nuiTooltip="Este tooltip está deshabilitado" 
  [tooltipDisabled]="true">
  Sin tooltip
</button>

<!-- Habilitado solo bajo condición -->
<button 
  nuiTooltip="Información importante" 
  [tooltipDisabled]="!showTooltip">
  Tooltip condicional
</button>
```

### Tooltip Interactivo

El tooltip interactivo permite a los usuarios interactuar con el contenido del tooltip (hover sobre él, hacer clic en enlaces, etc.). 
Perfecto para tooltips con enlaces, botones o contenido seleccionable.

```html
<!-- Tooltip con enlace interactivo -->
<button 
  [nuiTooltip]="interactiveTemplate"
  [tooltipInteractive]="true">
  Info con enlace
</button>

<ng-template #interactiveTemplate>
  <div>
    <p>Visita nuestra documentación</p>
    <a href="/docs" target="_blank">Leer más</a>
  </div>
</ng-template>
```

```html
<!-- Tooltip con contenido seleccionable -->
<span 
  [nuiTooltip]="codeTemplate"
  [tooltipInteractive]="true">
  Hover para ver código
</span>

<ng-template #codeTemplate>
  <div>
    <p>Copia este comando:</p>
    <code>npm install @angular/cdk</code>
  </div>
</ng-template>
```

**Características del tooltip interactivo:**
- `pointer-events: auto` - Permite interacción con el contenido
- `user-select: text` - Permite seleccionar texto
- No se oculta cuando el mouse sale del elemento host pero está sobre el tooltip
- Se oculta solo cuando el mouse sale de ambos (host y tooltip)
- Estilos mejorados para enlaces, botones y código
- Gestión automática de event listeners para evitar memory leaks

### Tooltip con Clase Personalizada

```html
<!-- Aplicar clase personalizada -->
<button 
  nuiTooltip="Tooltip con estilo custom" 
  tooltipClass="custom-tooltip-style">
  Estilo personalizado
</button>
```

```scss
// En tu archivo SCSS
.custom-tooltip-style {
  .nui-tooltip {
    background-color: var(--color-primary);
    color: white;
    padding: 1rem;
    border-radius: var(--border-radius-lg);
  }
}
```

## 🎨 Personalización

### Variables SCSS

El componente utiliza tokens SCSS que pueden ser personalizados:

```scss
// En tu archivo custom-variables.scss (antes de importar el tema)

// Espaciado
$tooltip-padding-y: 0.5rem;
$tooltip-padding-x: 0.75rem;
$tooltip-max-width: 20rem;

// Tipografía
$tooltip-font-size: var(--font-size-s);
$tooltip-font-weight: var(--font-weight-semibold);

// Bordes
$tooltip-border-radius: var(--border-radius-md);

// Animación
$tooltip-transition-duration: 200ms;

// Z-index
$tooltip-z-index: 1100;

// Flecha
$tooltip-arrow-size: 0.625rem;
```

### CSS Variables

También puedes sobrescribir las CSS variables directamente:

```scss
:root {
  --tooltip-padding-y: 0.5rem;
  --tooltip-padding-x: 0.75rem;
  --tooltip-max-width: 20rem;
  --tooltip-font-size: 0.875rem;
  --tooltip-border-radius: 0.5rem;
  --tooltip-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --tooltip-arrow-size: 0.625rem;
  --tooltip-z-index: 1100;
}

// Los colores se ajustan automáticamente según el tema
// Tema claro: fondo oscuro, texto claro
// Tema oscuro: fondo claro, texto oscuro
```

## ♿ Accesibilidad

El componente tooltip implementa las siguientes características de accesibilidad según WCAG 2.1:

- **role="tooltip"**: Identifica el componente como tooltip para lectores de pantalla
- **aria-describedby**: Se agrega automáticamente al elemento host vinculando con el ID único del tooltip
- **ID único**: Cada tooltip tiene un ID único generado automáticamente
- **Eventos de teclado**: El tooltip se muestra al hacer focus en el elemento y se oculta al perder el focus
- **Eventos de mouse**: El tooltip se muestra al hacer hover y se oculta al salir del elemento
- **tabindex automático**: Para elementos no enfocables con `tooltipEvent="focus"`, se agrega `tabindex="0"` automáticamente
- **Contraste**: Los colores del tooltip están optimizados para cumplir con WCAG 2.1 AA

### Características Automáticas

La directiva agrega automáticamente:
- `aria-describedby="nui-tooltip-[id-único]"` en el elemento host
- `role="tooltip"` en el componente tooltip
- `id="nui-tooltip-[id-único]"` en el componente tooltip

### Ejemplo

```html
<!-- La directiva maneja la accesibilidad automáticamente -->
<button nuiTooltip="Eliminar elemento">
  <i class="ri-delete-bin-line"></i>
</button>

<!-- Resultado en el DOM: -->
<!-- <button aria-describedby="nui-tooltip-abc123">... -->
<!-- <div role="tooltip" id="nui-tooltip-abc123" class="nui-tooltip">Eliminar elemento</div> -->
```

## 🎯 Mejores Prácticas

### ✅ Buenas Prácticas

```html
<!-- Tooltip conciso y descriptivo -->
<button nuiTooltip="Guardar cambios">Guardar</button>

<!-- Template para contenido complejo -->
<span [nuiTooltip]="userInfoTemplate">
  @{{ username }}
</span>

<!-- Posición apropiada según el contexto -->
<button 
  nuiTooltip="Acción destructiva" 
  tooltipPosition="top"
  class="delete-button">
  Eliminar
</button>
```

### ❌ Malas Prácticas

```html
<!-- ❌ Tooltip demasiado largo -->
<button nuiTooltip="Este es un texto muy largo que probablemente no se lea completamente y debería estar en un modal o panel lateral">
  Ver
</button>

<!-- ❌ Información crítica solo en tooltip -->
<button nuiTooltip="IMPORTANTE: Esta acción no se puede deshacer">
  Eliminar
</button>

<!-- ❌ Tooltip innecesario (el texto ya es descriptivo) -->
<button nuiTooltip="Guardar">Guardar cambios</button>
```

## 🔧 Características Técnicas

### Posicionamiento y Overlay
- **CDK Overlay**: Utiliza Angular CDK para posicionamiento preciso
- **Estrategia de posicionamiento**: FlexibleConnectedPositionStrategy con fallbacks automáticos
- **Detección de posición real**: 
  - Detección inmediata al mostrar el tooltip (mediante `setTimeout(0)`)
  - Compara coordenadas del overlay con el elemento host usando `getBoundingClientRect()`
  - Actualiza la flecha automáticamente según la posición real, no la preferida
  - Se actualiza también cuando el overlay se reposiciona (scroll, resize)
- **Reposicionamiento**: Se ajusta automáticamente al hacer scroll
- **Margen del viewport**: 8px para evitar que el tooltip quede fuera de la pantalla

### UI y Animaciones
- **Animaciones**: Entrada y salida suaves con transformación y opacidad
- **Flecha indicadora**: Apunta al elemento de referencia con posicionamiento dinámico que se actualiza según la posición real

### Eventos y Comportamiento
- **Control de eventos**: Múltiples eventos disponibles (hover, click, focus, manual)
- **Prevención de múltiples tooltips**: Cancela tooltips pendientes al cambiar de elemento rápidamente
- **Click outside**: Los tooltips con evento 'click' se cierran automáticamente al hacer click fuera

### Performance y Memory Management
- **Change Detection**: OnPush para máxima performance
- **DestroyRef**: Cleanup automático usando el nuevo DestroyRef de Angular
- **Effect optimizado**: Usa onCleanup para mejor gestión de recursos
- **Tipos estrictos**: `ReturnType<typeof setTimeout>` para timeouts
- **Sin memory leaks**: Gestión automática de suscripciones y recursos

### Accesibilidad
- **ARIA completo**: role="tooltip", aria-describedby e IDs únicos automáticos
- **Tabindex automático**: Se agrega a elementos no enfocables cuando sea necesario
- **WCAG 2.1 AA**: Cumple con estándares de accesibilidad

### Testing
- **Unit tests**: Tests completos para componente y directiva
- **Coverage**: Todos los casos de uso principales cubiertos
- **Standalone**: Componente y directiva standalone para importación individual

## 📱 Responsive

El tooltip se adapta automáticamente al viewport:

- Se reposiciona si no hay espacio en la posición preferida
- Mantiene un margen de 8px respecto a los bordes del viewport
- Funciona correctamente en dispositivos móviles (táctiles)

## 🎨 Temas

El tooltip respeta el tema actual de la aplicación:

- **Tema claro**: Fondo oscuro (`gray-900`), texto claro (`gray-50`)
- **Tema oscuro**: Fondo claro (`gray-50`), texto oscuro (`gray-900`)

Los colores se ajustan automáticamente usando el mixin `generate-tooltip-variables` en `_theme-mixins.scss`.

## 🐛 Solución de Problemas

### El tooltip no aparece

1. Verifica que el contenido no esté vacío
2. Comprueba que `tooltipDisabled` no esté en `true`
3. Asegúrate de importar los estilos globales en `styles.scss`
4. Verifica que el `tooltipEvent` sea correcto para tu caso de uso

### Aparecen múltiples tooltips al pasar rápido por varios elementos

Este problema ya está solucionado. La directiva cancela automáticamente los tooltips pendientes cuando cambias de elemento.

### El tooltip aparece en posición incorrecta

1. Verifica que el elemento padre tenga posición relativa o estática
2. Comprueba que no haya overflow:hidden en los contenedores padres
3. Revisa que el z-index del tooltip sea suficiente

### La flecha no apunta correctamente

1. Verifica que `tooltipShowArrow` esté en `true` (es el valor por defecto)
2. Comprueba que no haya CSS personalizado interfiriendo con `.nui-tooltip__arrow`
3. **Solución automática**: La directiva detecta la posición real usando `getBoundingClientRect()` inmediatamente después de mostrar el tooltip (con `setTimeout(0)`), por lo que la flecha siempre debería apuntar correctamente desde el primer render

### El template personalizado no se renderiza

1. Asegúrate de pasar un `TemplateRef` con `[nuiTooltip]` (con corchetes)
2. Verifica que el template esté definido con `<ng-template #nombre>`
3. Comprueba que el template tenga contenido

### El tooltip no se cierra con 'click' event

Con `tooltipEvent="click"`, el tooltip funciona como un toggle. Haz click de nuevo en el mismo elemento para cerrarlo, o click fuera para que se cierre automáticamente.

### El evento 'focus' no funciona

1. **Elementos interactivos**: Los elementos como `<button>`, `<input>`, `<a>` funcionan automáticamente
2. **Elementos no interactivos**: Para elementos como `<span>` o `<div>`, la directiva agrega automáticamente `tabindex="0"`
3. **Comportamiento mixto**: Con `tooltipEvent="focus"`, el tooltip se muestra tanto con focus (Tab) como con hover para mejor UX
4. **Verificación**: Asegúrate de que el elemento pueda recibir focus usando Tab en el navegador

## 📚 Recursos Relacionados

- [Angular CDK Overlay](https://material.angular.io/cdk/overlay/overview)
- [WCAG 2.1 - Tooltips](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
- [Sistema de Diseño - Colores](../typography-utilities.md)
