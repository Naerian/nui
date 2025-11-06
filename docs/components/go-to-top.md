# Go To Top Component

Botón flotante que aparece al hacer scroll y permite volver rápidamente al inicio del contenedor.

## Características

- 🎯 **Scroll Suave**: Animación personalizable con easing
- 📍 **Posicionamiento Flexible**: 4 posiciones disponibles (esquinas)
- 🎨 **Totalmente Personalizable**: Hereda todas las variantes del ButtonComponent
- 🔧 **Target Configurable**: Funciona con window o cualquier contenedor con scroll
- ♿ **Accesible**: Incluye aria-label y comportamiento de teclado
- 📱 **Responsive**: Se adapta automáticamente a móviles

## Uso Básico

```html
<!-- Detecta automáticamente el contenedor padre con scroll (por defecto) -->
<nui-go-to-top></nui-go-to-top>

<!-- Scroll del window -->
<nui-go-to-top scrollTarget="window"></nui-go-to-top>

<!-- Scroll de un contenedor específico -->
<nui-go-to-top scrollTarget=".main-content"></nui-go-to-top>
<nui-go-to-top scrollTarget="#scroll-container"></nui-go-to-top>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `scrollTarget` | `string` | `'parent'` | Selector CSS del contenedor con scroll. Use 'window' para el documento completo, 'parent' para buscar automáticamente el contenedor padre con scroll, o cualquier selector CSS |
| `showAfter` | `number` | `300` | Píxeles de scroll necesarios para mostrar el botón |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Posición del botón en la pantalla |
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` | Variante del botón |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Color del botón |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamaño del botón |
| `icon` | `string` | `'ri-arrow-up-line'` | Icono a mostrar (RemixIcon) |
| `label` | `string` | `''` | Texto del botón (opcional) |
| `shape` | `'rounded' \| 'circle' \| 'square'` | `'circle'` | Forma del botón |
| `scrollDuration` | `number` | `600` | Duración de la animación de scroll (ms) |
| `offset` | `number` | `1.5` | Distancia desde los bordes en rem |

## Ejemplos

### Diferentes Posiciones

```html
<!-- Esquina inferior derecha (por defecto) -->
<nui-go-to-top position="bottom-right"></nui-go-to-top>

<!-- Esquina inferior izquierda -->
<nui-go-to-top position="bottom-left"></nui-go-to-top>

<!-- Esquina superior derecha -->
<nui-go-to-top position="top-right"></nui-go-to-top>

<!-- Esquina superior izquierda -->
<nui-go-to-top position="top-left"></nui-go-to-top>
```

### Diferentes Variantes

```html
<!-- Sólido (por defecto) -->
<nui-go-to-top variant="solid" color="primary"></nui-go-to-top>

<!-- Outline -->
<nui-go-to-top variant="outline" color="secondary"></nui-go-to-top>

<!-- Ghost -->
<nui-go-to-top variant="ghost" color="success"></nui-go-to-top>
```

### Diferentes Tamaños y Formas

```html
<!-- Pequeño y circular -->
<nui-go-to-top size="sm" shape="circle"></nui-go-to-top>

<!-- Grande y redondeado -->
<nui-go-to-top size="lg" shape="rounded"></nui-go-to-top>

<!-- Con label -->
<nui-go-to-top 
  size="md" 
  shape="rounded" 
  label="Subir"
></nui-go-to-top>
```

### Personalización Avanzada

```html
<!-- Aparece antes (menos scroll necesario) -->
<nui-go-to-top 
  showAfter="150"
  scrollDuration="400"
></nui-go-to-top>

<!-- Scroll más lento y offset personalizado -->
<nui-go-to-top 
  scrollDuration="1000"
  offset="2.5"
></nui-go-to-top>

<!-- Con icono personalizado -->
<nui-go-to-top 
  icon="ri-rocket-line"
  color="success"
></nui-go-to-top>
```

### Scroll en Contenedor Específico

```html
<div class="scroll-container" style="height: 500px; overflow-y: auto;">
  <!-- Tu contenido largo aquí -->
  
  <nui-go-to-top 
    scrollTarget=".scroll-container"
    position="bottom-right"
  ></nui-go-to-top>
</div>
```

## Notas de Implementación

### Animación de Scroll

El componente usa `requestAnimationFrame` con easing `ease-out-cubic` para una animación suave y natural.

### Z-Index

El botón usa `var(--z-index-floating)` para asegurar que aparezca sobre el contenido pero debajo de modales y notificaciones.

### Responsive

En móviles, todas las posiciones se convierten en `bottom-right` con offset reducido para mejorar la experiencia táctil.

### Accesibilidad

- Incluye `aria-label` automático o personalizado
- El botón es navegable por teclado
- El tamaño mínimo en móviles cumple con las guías de accesibilidad (44px)

## Casos de Uso

1. **Páginas Largas**: En páginas con mucho contenido scrollable
2. **Dashboards**: Para volver rápido al menú superior
3. **Documentación**: En páginas de docs extensas
4. **Listas Largas**: Cuando se navega por listas o tablas extensas
5. **Modales con Scroll**: En modales con contenido largo

## Best Practices

- ✅ Usa el botón circular sin label para un diseño más limpio
- ✅ Ajusta `showAfter` según la longitud de tu contenido
- ✅ Usa `variant="outline"` o `"ghost"` si quieres menos intrusión visual
- ✅ En móviles, el botón siempre debe ser fácilmente accesible
- ❌ No uses múltiples botones Go To Top en la misma vista
- ❌ No uses posiciones que puedan obstruir contenido importante
