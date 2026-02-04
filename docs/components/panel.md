# Panel Component

Contenedor colapsable para organizar y ocultar/mostrar contenido mediante interacción del usuario.

## 🎯 Responsabilidad

**Panel** es un componente de **organización funcional** que permite al usuario controlar la visibilidad del contenido. A diferencia de Card (presentación), Panel está diseñado para casos donde la interactividad y el estado son importantes.

## Cuándo Usar Panel vs Card

### ✅ Usa PANEL cuando:
- Necesitas ocultar/mostrar contenido
- El usuario debe controlar la visibilidad
- Es parte de una sección organizada (settings, filtros, FAQ)
- Forma parte de un accordion o lista colapsable
- Quieres guardar el estado (localStorage)

### ❌ Usa CARD cuando:
- Necesitas presentar información siempre visible
- Requieres variedad visual (imágenes, badges, shadows)
- Es un elemento independiente (producto, perfil, artículo)
- El contenido no necesita ocultarse

## Características

- ✅ **Funcionalidad de collapse/expand** con animaciones suaves
- ✅ **Control programático**: `collapse()`, `expand()`, `toggle()`
- ✅ **Eventos de ciclo de vida**: before/after collapse/expand
- ✅ **Accesibilidad completa**: ARIA, keyboard navigation, heading levels dinámicos
- ✅ **Estado persistente**: Guarda estado en localStorage
- ✅ **Icons Slot**: Añade botones/iconos personalizados en el header
- ✅ **Header personalizado**: Usa `<nui-panel-header>` para contenido complejo
- ✅ **Footer flexible**: Proyección de contenido con `<nui-panel-footer>`
- ✅ **Estilo consistente**: Visual coherente con Card component
- ✅ **Customización CSS**: Variables CSS para personalización avanzada

## Uso Básico

```html
<!-- Panel simple -->
<nui-panel title="Sección">
  <p>Contenido colapsable</p>
</nui-panel>

<!-- Panel colapsado por defecto -->
<nui-panel title="Configuración Avanzada" [collapsed]="true">
  <form><!-- Formulario --></form>
</nui-panel>

<!-- Panel con icono -->
<nui-panel 
  title="Filtros" 
  subtitle="Personaliza tu búsqueda"
  icon="ri-filter-line"
>
  <!-- Controles de filtros -->
</nui-panel>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `''` | Título del panel |
| `subtitle` | `string` | `''` | Subtítulo del panel |
| `icon` | `string` | `''` | Icono del header (RemixIcon) |
| `collapsed` | `boolean` | `false` | Estado inicial colapsado |
| `toggleButtonSize` | `NUISize` | `'s'` | Tamaño del botón toggle |
| `expandIcon` | `string` | `'ri-arrow-down-s-line'` | Icono para expandir |
| `collapseIcon` | `string` | `'ri-arrow-up-s-line'` | Icono para colapsar |
| `collapseAriaLabel` | `string` | `'Colapsar panel'` | Aria-label para colapsar |
| `expandAriaLabel` | `string` | `'Expandir panel'` | Aria-label para expandir |
| `persistent` | `boolean` | `false` | Guardar estado en localStorage |
| `persistentKey` | `string` | `''` | Key para localStorage (requerido si persistent=true) |
| `noAnimation` | `boolean` | `false` | Desactivar animaciones |
| `animationDuration` | `number` | `320` | Duración de animación en milisegundos |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Nivel de heading para el título (h2-h6) |
| `panelId` | `string` | `auto-generated` | ID único del panel |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `collapsedChange` | `EventEmitter<PanelCollapseEvent>` | Emite cuando cambia el estado |
| `beforeCollapse` | `EventEmitter<void>` | Antes de colapsar |
| `afterCollapse` | `EventEmitter<void>` | Después de colapsar |
| `beforeExpand` | `EventEmitter<void>` | Antes de expandir |
| `afterExpand` | `EventEmitter<void>` | Después de expandir |

## Métodos Públicos

```typescript
// Colapsar programáticamente
panel.collapse();

// Expandir programáticamente
panel.expand();

// Alternar estado
panel.toggle();

// Consultar estado
const isCollapsed = panel.isCollapsed();
```

## Directivas y Slots

### `<nui-panel-header>`

Contenido personalizado para el header (reemplaza title/subtitle/icon).

```html
<nui-panel>
  <nui-panel-header>
    <div class="custom-header">
      <img src="logo.png" alt="Logo" />
      <h3>Custom Title</h3>
      <span class="badge">New</span>
    </div>
  </nui-panel-header>
  
  <p>Contenido...</p>
</nui-panel>
```

### `<nui-panel-icons>`

Añade botones o iconos adicionales antes del botón de toggle.

```html
<nui-panel title="Settings">
  <nui-panel-icons>
    <nui-button icon="ri-refresh-line" variant="ghost" size="s" />
    <nui-button icon="ri-settings-line" variant="ghost" size="s" />
  </nui-panel-icons>
  
  <p>Contenido...</p>
</nui-panel>
```

**Orden visual del header:**
```
[Header Content] → [Icons Slot] → [Toggle Button]
```

### `<nui-panel-footer>`

Footer con alineación configurable.

```html
<nui-panel title="Edit Profile">
  <form><!-- Formulario --></form>
  
  <nui-panel-footer justify="between">
    <nui-button variant="outline">Cancel</nui-button>
    <nui-button>Save Changes</nui-button>
  </nui-panel-footer>
</nui-panel>
```

**Prop `justify`:** `'start' | 'center' | 'end' | 'between'`

## Ejemplos Avanzados

### Panel con Icons Slot (Acciones Personalizadas)

```html
<!-- Panel con botones de acción adicionales -->
<nui-panel 
  title="Configuración Avanzada" 
  subtitle="Personaliza tu experiencia"
  icon="ri-settings-line"
>
  <nui-panel-icons>
    <nui-button 
      icon="ri-refresh-line" 
      variant="ghost" 
      size="s"
      ariaLabel="Refrescar"
      (click)="refresh()"
    />
    <nui-button 
      icon="ri-more-2-line" 
      variant="ghost" 
      size="s"
      ariaLabel="Más opciones"
      (click)="showMenu()"
    />
  </nui-panel-icons>

  <form><!-- Formulario de configuración --></form>
</nui-panel>
```

### Panel Estilo PrimeNG (Header Complejo + Icons + Footer)

```html
<nui-panel [collapsed]="false">
  <!-- Header personalizado con avatar -->
  <nui-panel-header>
    <div class="flex items-center gap-2">
      <img 
        src="avatar.png" 
        alt="Amy Elsner"
        class="avatar-circle"
        style="width: 32px; height: 32px; border-radius: 50%;"
      />
      <div>
        <div class="font-semibold">Amy Elsner</div>
        <div class="text-sm text-secondary">Developer</div>
      </div>
    </div>
  </nui-panel-header>

  <!-- Icons adicionales -->
  <nui-panel-icons>
    <nui-button icon="ri-star-line" variant="ghost" size="s" />
    <nui-button icon="ri-share-line" variant="ghost" size="s" />
  </nui-panel-icons>

  <!-- Contenido -->
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
  </p>

  <!-- Footer con acciones y metadata -->
  <nui-panel-footer justify="between">
    <div class="flex items-center gap-2">
      <nui-button icon="ri-user-line" variant="ghost" size="s" />
      <nui-button icon="ri-bookmark-line" variant="ghost" size="s" />
    </div>
    <span class="text-secondary text-sm">Updated 2 hours ago</span>
  </nui-panel-footer>
</nui-panel>
```

### Panel con Header Personalizado

```html
<nui-panel>
  <nui-panel-header title="Configuración" icon="ri-settings-line">
    <button class="custom-action">Reset</button>
  </nui-panel-header>
  <form><!-- Contenido --></form>
</nui-panel>
```

### Panel con Footer

```html
<nui-panel title="Editar Perfil">
  <form><!-- Formulario --></form>
  
  <nui-panel-footer align="between">
    <nui-button variant="ghost">Cancelar</nui-button>
    <nui-button>Guardar</nui-button>
  </nui-panel-footer>
</nui-panel>
```

### Panel Persistente (guarda estado)

```html
<nui-panel 
  title="Filtros Avanzados" 
  [persistent]="true" 
  persistentKey="search-filters-panel"
>
  <!-- El estado se guarda en localStorage -->
</nui-panel>
```

### Panel Controlado Programáticamente

```typescript
import { Component, ViewChild } from '@angular/core';
import { PanelComponent } from '@shared/components/panel/panel.component';

@Component({
  template: `
    <nui-panel 
      #myPanel
      title="Panel Controlado"
      (afterExpand)="onExpand()"
      (afterCollapse)="onCollapse()"
    >
      <p>Contenido</p>
    </nui-panel>
    
    <button (click)="myPanel.toggle()">Toggle</button>
    <button (click)="myPanel.expand()">Expandir</button>
    <button (click)="myPanel.collapse()">Colapsar</button>
  `
})
export class MyComponent {
  @ViewChild('myPanel') panel!: PanelComponent;
  
  onExpand() {
    console.log('Panel expandido');
  }
  
  onCollapse() {
    console.log('Panel colapsado');
  }
}
```

### Accordion (múltiples panels)

```html
<div class="settings-accordion">
  <nui-panel 
    title="Información Personal" 
    [collapsed]="false"
    (collapsedChange)="onPanelChange($event, 'personal')"
  >
    <form><!-- Campos personales --></form>
  </nui-panel>

  <nui-panel 
    title="Preferencias" 
    [collapsed]="true"
    (collapsedChange)="onPanelChange($event, 'preferences')"
  >
    <form><!-- Preferencias --></form>
  </nui-panel>

  <nui-panel 
    title="Seguridad" 
    [collapsed]="true"
    (collapsedChange)="onPanelChange($event, 'security')"
  >
    <form><!-- Seguridad --></form>
  </nui-panel>
</div>
```

```typescript
onPanelChange(event: PanelCollapseEvent, panelName: string) {
  console.log(`Panel ${panelName}:`, event.collapsed ? 'collapsed' : 'expanded');
  
  // Implementar lógica de accordion (solo uno abierto)
  if (!event.collapsed) {
    // Cerrar otros panels...
  }
}
```

### Variantes Visuales (CSS Custom Properties)

```html
<!-- Panel con estilos personalizados -->
<nui-panel 
  title="Panel Personalizado"
  style="
    --panel-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --panel-border: 2px solid #667eea;
    --panel-border-radius: 16px;
    --panel-title-color: white;
    --panel-content-color: rgba(255, 255, 255, 0.95);
  "
>
  <p>Este panel usa CSS custom properties para personalización.</p>
</nui-panel>

<!-- Panel con tema oscuro personalizado -->
<nui-panel 
  title="Dark Theme Panel"
  style="
    --panel-bg: #1a1a1a;
    --panel-border: 1px solid #333;
    --panel-title-color: #fff;
    --panel-subtitle-color: #888;
    --panel-icon-color: #3b82f6;
  "
>
  <p>Tema oscuro personalizado sin variantes.</p>
</nui-panel>
```

#### Variables CSS Disponibles:

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--panel-bg` | `var(--surface-primary)` | Color de fondo |
| `--panel-border` | `var(--nui-border-container)` | Borde del panel |
| `--panel-border-radius` | `var(--nui-border-radius-md)` | Radio de esquinas |
| `--panel-shadow` | `none` | Sombra del panel |
| `--panel-spacing` | `var(--nui-spacing-md)` | Espaciado general |
| `--panel-header-bg` | `transparent` | Fondo del header |
| `--panel-title-color` | `var(--text-primary)` | Color del título |
| `--panel-subtitle-color` | `var(--text-secondary)` | Color del subtítulo |
| `--panel-icon-color` | `var(--color-primary)` | Color del icono |

### Heading Level Semántico

```html
<!-- Usa h2 para títulos principales -->
<nui-panel 
  title="Configuración Principal" 
  [headingLevel]="2"
>
  <p>Contenido...</p>
</nui-panel>

<!-- Usa h4 para subsecciones -->
<nui-panel 
  title="Opciones Avanzadas" 
  [headingLevel]="4"
>
  <p>Contenido...</p>
</nui-panel>
```

### Animación Configurable

```html
<!-- Animación más lenta -->
<nui-panel 
  title="Panel Slow" 
  [animationDuration]="600"
>
  <p>Collapse/expand con animación de 600ms</p>
</nui-panel>

<!-- Sin animación (útil para tests o preferencias) -->
<nui-panel 
  title="Panel Sin Animación" 
  [noAnimation]="true"
>
  <p>Cambio instantáneo</p>
</nui-panel>
```

## Combinar Card + Panel

```html
<!-- Card que contiene múltiples panels organizados -->
<nui-card>
  <nui-card-header title="Configuración del Producto" />
  
  <nui-panel title="Información Básica" [collapsed]="false" variant="bordered">
    <form><!-- Campos básicos --></form>
  </nui-panel>
  
  <nui-panel title="Opciones Avanzadas" [collapsed]="true" variant="bordered">
    <form><!-- Campos avanzados --></form>
  </nui-panel>
  
  <nui-panel title="SEO y Metadata" [collapsed]="true" variant="bordered">
    <form><!-- Campos SEO --></form>
  </nui-panel>
  
  <nui-card-footer align="between">
    <nui-button variant="outline">Cancelar</nui-button>
    <nui-button>Guardar Cambios</nui-button>
  </nui-card-footer>
</nui-card>
```

## Accesibilidad

El componente Panel incluye:

- ✅ `role="region"` en el panel
- ✅ `role="button"` explícito en el botón toggle
- ✅ `aria-expanded` dinámico en el botón
- ✅ `aria-controls` conectando toggle con contenido
- ✅ `aria-labelledby` conectando panel con título
- ✅ `aria-hidden="true"` en iconos decorativos
- ✅ Navegación por teclado completa (Enter, Space)
- ✅ `aria-label` personalizable en botones
- ✅ Focus visible en controles interactivos
- ✅ Heading levels configurables (h2-h6) para jerarquía semántica
- ✅ Validación: Warning si no hay título (problemas de accesibilidad)

### Ejemplo Accesible:

```html
<nui-panel 
  title="Configuración de Privacidad"
  [headingLevel]="2"
  collapseAriaLabel="Ocultar configuración de privacidad"
  expandAriaLabel="Mostrar configuración de privacidad"
>
  <form><!-- Formulario --></form>
</nui-panel>
```

## Animaciones

Las animaciones usan variables SASS configurables:
- **Duración**: `$panel-animation-duration` (320ms por defecto)
- **Easing**: `$panel-animation-easing` - `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design)
- **Propiedades animadas**: height, opacity, visibility

Puedes:
- Desactivarlas con `[noAnimation]="true"`
- Ajustar duración con `[animationDuration]="600"` (en milisegundos)
- Modificar globalmente en `src/styles/_config.scss`

## Best Practices

### ✅ DO
- Usa Panel para contenido que el usuario puede querer ocultar
- Agrupa panels relacionados en accordions
- Usa `persistent` para recordar preferencias del usuario
- Proporciona títulos descriptivos para accesibilidad
- Usa iconos para identificación visual rápida
- Configura `headingLevel` apropiado para la jerarquía semántica
- Usa `<nui-panel-icons>` para acciones relacionadas con el contenido
- Personaliza con CSS custom properties en lugar de CSS inline general
- Añade `aria-label` descriptivo cuando uses iconos sin texto

### ❌ DON'T
- No uses Panel solo por estética (usa Card)
- No anides panels dentro de panels (complejidad innecesaria)
- No uses demasiados panels abiertos por defecto
- No omitas `persistentKey` si usas `persistent`
- No uses Panel para contenido crítico que siempre debe estar visible
- No uses estilos inline generales (usa CSS custom properties)
- No pongas muchos botones en `<nui-panel-icons>` (máximo 2-3)
- No omitas el título (causa warning de accesibilidad)

## Casos de Uso

1. **Settings/Configuración**: Organizar opciones en secciones colapsables
2. **Filtros**: Mostrar/ocultar filtros avanzados
3. **FAQ**: Preguntas con respuestas colapsables
4. **Formularios Extensos**: Dividir en secciones manejables
5. **Dashboards**: Widgets que el usuario puede minimizar
6. **Detalles Opcionales**: Información adicional no crítica

## Diferencias con Card

| Aspecto | Panel | Card |
|---------|-------|------|
| **Propósito** | Organizar contenido | Presentar contenido |
| **Interactividad** | Alta (collapse/expand) | Baja (clicks en botones) |
| **Estado** | Dinámico (collapsed/expanded) | Estático |
| **Animaciones** | Funcionales (collapse) | Visuales (hover) |
| **Imágenes** | No soporta | Hero images, overlays, badges |
| **Complejidad** | Media (~300 líneas) | Simple (~150 líneas) |
| **Casos de uso** | Settings, filtros, FAQ | Productos, perfiles, posts |

---

**Resumen**: Panel = "Sección plegable para organizar" 📑 | Card = "Caja bonita para mostrar" 📦

## Comparación con PrimeNG Panel

Tu Panel component es comparable con PrimeNG Panel y ofrece características similares:

| Característica | NUI Panel | PrimeNG Panel |
|----------------|-----------|---------------|
| **Toggle/Collapse** | ✅ | ✅ |
| **Header personalizado** | ✅ `<nui-panel-header>` | ✅ `#header` template |
| **Footer personalizado** | ✅ `<nui-panel-footer>` | ✅ `#footer` template |
| **Icons slot** | ✅ `<nui-panel-icons>` | ✅ `#icons` template |
| **Eventos de ciclo de vida** | ✅ 5 eventos | ✅ 2 eventos |
| **Estado persistente** | ✅ localStorage | ❌ |
| **Control programático** | ✅ `collapse()`, `expand()`, `toggle()` | ✅ `toggle()` |
| **Animación configurable** | ✅ `[animationDuration]` | ❌ |
| **CSS custom properties** | ✅ 20+ variables | ✅ Design tokens |
| **Heading level dinámico** | ✅ h2-h6 | ❌ |
| **Validación accesibilidad** | ✅ Warning en consola | ❌ |
| **Standalone** | ✅ Angular 18+ | ❌ Module-based |

### Ejemplo de Migración de PrimeNG:

```html
<!-- PrimeNG -->
<p-panel [toggleable]="true">
  <ng-template #header>
    <span>Title</span>
  </ng-template>
  <ng-template #icons>
    <button pButton icon="pi pi-cog"></button>
  </ng-template>
  <p>Content</p>
</p-panel>

<!-- NUI Panel (equivalente) -->
<nui-panel>
  <nui-panel-header>
    <span>Title</span>
  </nui-panel-header>
  <nui-panel-icons>
    <nui-button icon="ri-settings-line" variant="ghost" size="s" />
  </nui-panel-icons>
  <p>Content</p>
</nui-panel>
```

---

## Changelog

### v2.0.0 (Latest)
- ✅ Añadido `<nui-panel-icons>` slot para acciones personalizadas
- ✅ Añadido `headingLevel` prop para jerarquía semántica (h2-h6)
- ✅ Añadido `animationDuration` prop configurable
- ✅ Eliminado sistema de variantes (usar CSS custom properties)
- ✅ Mejorado: 20+ CSS custom properties para personalización
- ✅ Mejorado: Validación de accesibilidad (warning si no hay título)
- ✅ Mejorado: `role="button"` explícito en toggle
- ✅ Mejorado: `aria-hidden` en iconos decorativos
- ✅ Mejorado: Alineación vertical del icono con título
- ✅ Mejorado: Responsive usando CSS custom properties

### v1.0.0
- ✅ Release inicial con collapse/expand
- ✅ Sistema de variantes (default, bordered, filled)
- ✅ Estado persistente con localStorage
- ✅ Header y footer personalizables
