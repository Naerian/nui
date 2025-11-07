# NUI Showcase

Showcase profesional para la librería de componentes NUI con soporte multiidioma, múltiples presets de color y modo oscuro.

## ✨ Características Implementadas

### 🎨 Sistema de Temas
- **6 Presets predefinidos**: Aura, Warm, Neon, Dopamine, Corporate, Minimal
- **Dark Mode**: Modo claro/oscuro con transiciones suaves
- **Cambio dinámico**: Los presets y el modo oscuro se pueden cambiar en tiempo real
- **Persistencia**: La configuración se guarda en localStorage

### 🌍 Internacionalización (i18n)
- **Idiomas soportados**: Español e Inglés
- **Traducción completa**: Todas las interfaces están traducidas
- **Detección automática**: Usa el idioma del navegador por defecto

### 📱 Diseño Responsive
- **Bootstrap Grid**: Sistema de grid responsive
- **Sidebar colapsable**: Se adapta a dispositivos móviles
- **Diseño fluido**: Optimizado para todas las pantallas

### 📄 Páginas Implementadas

#### Home (`/home`)
- Página de bienvenida con hero section
- Features destacadas
- Enlaces de navegación rápida

#### Getting Started
- **Installation** (`/getting-started/installation`): Guía de instalación paso a paso
- **Configuration** (`/getting-started/configuration`): Configuración de presets y dark mode

#### Theming (`/theming`)
- Vista de todos los presets disponibles
- Paleta de colores de cada preset
- Descripción de cada tema
- Preview visual de colores

### 🧩 Componentes Creados

#### Header (`app/shared/header`)
- Logo y título
- Selector de preset
- Toggle de dark/light mode
- Selector de idioma
- Selector de versión
- Botón para colapsar sidebar

#### Sidebar (`app/shared/sidebar`)
- Navegación jerárquica
- Menú colapsable
- Estados activos
- Footer con licencia de Remix Icon

### 🛠️ Servicios

#### ShowcaseConfigService
- Gestión del estado global del showcase
- Persistencia en localStorage
- Observables reactivos para cambios de configuración

## 📂 Estructura de Archivos

```
showcase/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       └── showcase-config.service.ts
│   │   ├── shared/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   └── sidebar/
│   │   │       ├── sidebar.component.ts
│   │   │       ├── sidebar.component.html
│   │   │       └── sidebar.component.scss
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── getting-started/
│   │   │   │   ├── installation/
│   │   │   │   └── configuration/
│   │   │   └── theming/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── i18n/
│   │       ├── en.json
│   │       └── es.json
│   ├── styles.scss
│   └── index.html
```

## 🚀 Características Profesionales

### Variables CSS de NUI
- Uso completo de las variables CSS de NUI
- Compatibilidad con todos los presets
- Transiciones suaves entre temas

### Accesibilidad
- Etiquetas ARIA apropiadas
- Navegación por teclado
- Contraste de colores adecuado

### Performance
- Lazy loading de rutas
- Componentes standalone
- Optimización de bundles

## 🎯 Próximos Pasos

Para continuar desarrollando el showcase:

1. **Componentes**: Crear páginas para cada componente de NUI
2. **Ejemplos**: Implementar la sección de ejemplos interactivos
3. **Playground**: Crear un sandbox para probar componentes
4. **Sistema de versiones**: Implementar documentación multi-versión
5. **Search**: Agregar búsqueda en la documentación
6. **Code snippets**: Mejorar los bloques de código con syntax highlighting

## 🎨 Guía de Uso

### Cambiar el Preset
1. Usar el selector en el header
2. Los cambios se aplican inmediatamente
3. La configuración se guarda automáticamente

### Activar Dark Mode
1. Click en el botón de sol/luna en el header
2. Los colores cambian según el preset activo
3. El estado se persiste en localStorage

### Cambiar Idioma
1. Usar el selector de idioma en el header
2. Todo el contenido se traduce automáticamente

## 📝 Notas Importantes

- **Remix Icon**: El showcase usa iconos de Remix Icon (MIT License)
- **Bootstrap**: Solo se importa el grid system, no todos los componentes
- **Variables NUI**: Todos los estilos usan las variables CSS de la librería para máxima compatibilidad

## 🔧 Configuración

El showcase usa `ngx-translate` para i18n y está configurado en `app.config.ts`:

```typescript
provideNUI({ 
  preset: aura,
  darkMode: 'manual'
})
```

Los archivos de traducción están en `assets/i18n/` y se cargan dinámicamente.
