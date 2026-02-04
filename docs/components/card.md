# Card Component

**Card - Contenedor de Presentación Visual**

Componente para presentar contenido de forma estructurada y visualmente atractiva. 

> **⚠️ Para contenido colapsable, usa `<nui-panel>` en su lugar.**

## 🎯 Responsabilidad

Card es un componente de **presentación** diseñado para mostrar información de manera atractiva y estructurada. Se enfoca en el diseño visual y la organización del contenido, **no en interactividad compleja**.

## Cuándo Usar Card vs Panel

### ✅ Usa CARD cuando:
- Presentas productos, artículos, perfiles de usuario
- El contenido debe ser **siempre visible**
- Necesitas variedad visual (imágenes hero, badges, shadows)
- Es un elemento independiente de presentación

### ❌ Usa PANEL cuando:
- Necesitas **ocultar/mostrar contenido**
- Es parte de una sección organizada (settings, filtros, FAQ)
- Quieres guardar el estado de visibilidad
- Necesitas eventos de ciclo de vida (beforeCollapse, etc.)

## 📦 Importación

```typescript
import { CardModule } from '@shared/components/card';
```

## 🎨 Características

### ✅ Card TIENE:
- Estructura básica (Header, Content, Footer)
- Imagen Hero con aspect ratios, overlays, hover effects
- Badges sobre imágenes
- Variantes visuales (borders, shadows, backgrounds)
- Estilos personalizables (alineaciones, colores)

### ❌ Card NO TIENE:
- Funcionalidad de collapse/expand
- Estados interactivos complejos
- Animaciones de contenido
- Botones de toggle integrados
- Gestión de estado collapsed/expanded

## 💡 Uso Básico

### Card Simple

```html
<nui-card>
  <nui-card-header title="Título" subtitle="Subtítulo" />
  <p>Contenido siempre visible</p>
</nui-card>
```

### Card con Header Personalizado

```html
<nui-card>
  <nui-card-header 
    title="Mi Card" 
    subtitle="Descripción"
    icon="ri-star-line"
  />
  <p>Contenido de la card...</p>
</nui-card>
```

### Card con Footer

```html
<nui-card>
  <nui-card-header title="Producto Premium" />
  
  <div class="card-body">
    <p>Descripción del producto con todas sus características...</p>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
  </div>
  
  <nui-card-footer align="between">
    <span class="price">$99.99</span>
    <nui-button>Comprar Ahora</nui-button>
  </nui-card-footer>
</nui-card>
```

## 🖼️ Card con Imagen Hero

### Imagen Básica

```html
<nui-card>
  <img 
    nui-card-image 
    src="product.jpg" 
    alt="Producto" 
  />
  <nui-card-header title="Producto" />
  <p>Descripción...</p>
</nui-card>
```

### Imagen con Aspect Ratio

```html
<nui-card>
  <img 
    nui-card-image 
    [aspectRatio]="'16:9'"
    src="banner.jpg" 
    alt="Banner" 
  />
  <nui-card-header title="Banner Promocional" />
  <p>Promoción especial...</p>
</nui-card>
```

**Aspect Ratios Disponibles:**
- `'16:9'` - Widescreen (por defecto)
- `'4:3'` - Tradicional
- `'1:1'` - Cuadrado (ideal para perfiles)
- `'21:9'` - Ultra-wide
- `'3:2'` - Fotografía clásica

### Imagen con Overlay

```html
<nui-card>
  <img 
    nui-card-image 
    [overlay]="0.4"
    src="hero.jpg" 
    alt="Hero" 
  />
  <nui-card-header title="Con Overlay" />
  <p>El overlay oscurece la imagen para mejor legibilidad...</p>
</nui-card>
```

### Imagen con Hover Zoom

```html
<!-- Zoom al hacer hover en toda la card -->
<nui-card>
  <img 
    nui-card-image 
    [hoverZoom]="'card'"
    src="product.jpg" 
    alt="Producto" 
  />
  <nui-card-header title="Hover en Card" />
  <p>La imagen hace zoom al pasar sobre cualquier parte de la card</p>
</nui-card>

<!-- Zoom solo al hacer hover en la imagen -->
<nui-card>
  <img 
    nui-card-image 
    [hoverZoom]="'image'"
    src="product.jpg" 
    alt="Producto" 
  />
  <nui-card-header title="Hover en Imagen" />
  <p>La imagen hace zoom solo al pasar directamente sobre ella</p>
</nui-card>
```

## 🏷️ Badges sobre Imágenes

```html
<nui-card>
  <img nui-card-image src="product.jpg" alt="Producto" />
  
  <!-- Badges en diferentes posiciones -->
  <div nui-card-badge position="top-left" variant="danger">
    ¡OFERTA!
  </div>
  <div nui-card-badge position="top-right" variant="success">
    NUEVO
  </div>
  <div nui-card-badge position="bottom-right" variant="info">
    -20%
  </div>
  
  <nui-card-header title="Producto en Oferta" />
  <p>Ahorra un 20% en este producto...</p>
</nui-card>
```

**Variantes de Badge:**
- `primary` - Color primario
- `secondary` - Color secundario
- `success` - Verde
- `danger` - Rojo
- `warning` - Amarillo
- `info` - Azul
- `light` - Claro
- `dark` - Oscuro

**Posiciones de Badge:**
- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

## 📐 API del Card Header

```html
<nui-card-header 
  [title]="string"
  [subtitle]="string"
  [icon]="string"
  [align]="'start' | 'center' | 'end'"
/>
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | - | Título del header |
| `subtitle` | `string` | - | Subtítulo del header |
| `icon` | `string` | - | Icono (RemixIcon class) |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alineación del contenido |

## 📐 API del Card Footer

```html
<nui-card-footer 
  [align]="'start' | 'center' | 'end' | 'between' | 'around'"
  [variant]="'default' | 'subtle' | 'actions'"
  [noBorder]="boolean"
/>
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'center'` | Alineación del contenido |
| `variant` | `'default' \| 'subtle' \| 'actions'` | `'default'` | Estilo del footer |
| `noBorder` | `boolean` | `false` | Ocultar borde superior |

## 🎨 Ejemplos Avanzados

### Card de Producto E-commerce

```html
<nui-card>
  <img 
    nui-card-image 
    [aspectRatio]="'1:1'"
    [hoverZoom]="'card'"
    src="product.jpg" 
    alt="Zapatillas" 
  />
  
  <div nui-card-badge position="top-right" variant="danger">
    -30%
  </div>
  
  <nui-card-header 
    title="Zapatillas Deportivas" 
    subtitle="Nike Air Max 2024"
  />
  
  <div class="px-3">
    <div class="rating">★★★★☆ (4.5)</div>
    <p class="text-muted">Disponible en 5 colores</p>
  </div>
  
  <nui-card-footer align="between">
    <div>
      <span class="text-muted text-decoration-line-through">$129.99</span>
      <span class="h4 text-danger ms-2">$89.99</span>
    </div>
    <nui-button icon="ri-shopping-cart-line">
      Añadir al Carrito
    </nui-button>
  </nui-card-footer>
</nui-card>
```

### Card de Perfil de Usuario

```html
<nui-card>
  <img 
    nui-card-image 
    [aspectRatio]="'1:1'"
    src="avatar.jpg" 
    alt="Usuario" 
  />
  
  <nui-card-header 
    title="María García" 
    subtitle="Desarrolladora Full-Stack"
    icon="ri-user-line"
  />
  
  <div class="px-3">
    <p>Apasionada por crear experiencias de usuario excepcionales. 
       5+ años de experiencia en Angular y Node.js.</p>
    
    <div class="social-links mt-3">
      <a href="#"><i class="ri-linkedin-line"></i></a>
      <a href="#"><i class="ri-github-line"></i></a>
      <a href="#"><i class="ri-twitter-line"></i></a>
    </div>
  </div>
  
  <nui-card-footer align="center">
    <nui-button variant="outline">Ver Perfil Completo</nui-button>
  </nui-card-footer>
</nui-card>
```

### Card de Artículo/Blog

```html
<nui-card>
  <img 
    nui-card-image 
    [aspectRatio]="'16:9'"
    [overlay]="0.3"
    [hoverZoom]="'image'"
    src="article.jpg" 
    alt="Artículo" 
  />
  
  <div nui-card-badge position="top-left" variant="primary">
    TECNOLOGÍA
  </div>
  
  <nui-card-header 
    title="El Futuro de la IA en 2024" 
    subtitle="Publicado el 15 de Octubre, 2024"
  />
  
  <div class="px-3">
    <p>Descubre las tendencias más importantes en inteligencia artificial 
       que marcarán el próximo año y cómo afectarán tu negocio...</p>
  </div>
  
  <nui-card-footer align="between" variant="subtle">
    <div class="author">
      <img src="author.jpg" alt="Autor" class="avatar-sm" />
      <span>Juan Pérez</span>
    </div>
    <nui-button variant="ghost" icon="ri-arrow-right-line">
      Leer Más
    </nui-button>
  </nui-card-footer>
</nui-card>
```

## 🔄 Combinar Card + Panel

Para formularios complejos o configuraciones, puedes combinar ambos:

```html
<nui-card>
  <nui-card-header 
    title="Configuración de Cuenta" 
    subtitle="Personaliza tu experiencia"
  />
  
  <!-- Panels colapsables dentro de la Card -->
  <nui-panel title="Información Personal" [collapsed]="false">
    <form>
      <!-- Campos personales -->
    </form>
  </nui-panel>
  
  <nui-panel title="Preferencias" [collapsed]="true">
    <form>
      <!-- Preferencias -->
    </form>
  </nui-panel>
  
  <nui-panel title="Privacidad" [collapsed]="true">
    <form>
      <!-- Configuración privacidad -->
    </form>
  </nui-panel>
  
  <nui-card-footer align="end">
    <nui-button variant="outline">Cancelar</nui-button>
    <nui-button>Guardar Cambios</nui-button>
  </nui-card-footer>
</nui-card>
```

## 🎨 Estilos Personalizados

Las cards usan variables CSS para fácil personalización:

```scss
.my-custom-card {
  --card-bg: var(--surface-primary);
  --card-border: 1px solid var(--nui-border-primary);
  --card-shadow: var(--nui-box-shadow--lg);
  --card-footer-bg: var(--nui-bg-secondary);
}
```

## ♿ Accesibilidad

Las cards son accesibles por defecto:
- Estructura semántica HTML5 (`<header>`, `<main>`, `<footer>`)
- Imágenes con `alt` obligatorio
- Color contrast adecuado
- Tamaños de texto legibles

## 📱 Responsive

Las cards son responsive automáticamente:
- Padding reducido en móviles
- Imágenes adaptativas
- Footer con wrap en pantallas pequeñas

## 🆚 Comparación Card vs Panel

| Aspecto | Card | Panel |
|---------|------|-------|
| **Propósito** | Presentar contenido | Organizar contenido |
| **Interactividad** | Baja (clicks en botones) | Alta (collapse/expand) |
| **Estructura** | Flexible (header opcional) | Rígida (header obligatorio) |
| **Imagen** | ✅ Hero images, overlays, badges | ❌ No soporta |
| **Animaciones** | ✅ Hover effects en imágenes | ✅ Collapse/expand |
| **Estados** | ❌ No tiene estados | ✅ collapsed/expanded |
| **Persistencia** | ❌ No guarda estado | ✅ localStorage opcional |
| **Complejidad** | Simple (~80 líneas) | Media (~300 líneas) |
| **Casos de uso** | Productos, perfiles, artículos | Settings, filtros, FAQ |

---

**Resumen**: 
- **Card** = "Caja bonita para mostrar cosas" 📦
- **Panel** = "Sección plegable para organizar" 📑
