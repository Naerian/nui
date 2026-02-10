# Component Tabs

Componente de tabs para organizar la documentación de los componentes NUI en el showcase.

## 📋 Características

- ✅ **Tabs flexibles**: Configura cualquier número de tabs según tus necesidades
- ✅ **Navegación por URL**: Soporta anchors en la URL (#examples.basic, #api, etc.)
- ✅ **Compatibilidad legacy**: Mantiene compatibilidad con anchors antiguos (#basic)
- ✅ **Responsive**: Diseño adaptativo con scroll horizontal en móvil
- ✅ **Accesibilidad**: ARIA attributes y navegación por teclado
- ✅ **Animaciones suaves**: Transiciones entre tabs
- ✅ **Content projection**: Slot para contenido personalizado de cada sección

## 🚀 Uso Básico

### 1. Definir configuración de tabs

```typescript
import { ComponentTab } from '../../../shared/components/component-tabs';

export class ButtonPageComponent {
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'variants-colors', 'sizes', 'icons', 'loading'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['styling'],
    },
  ];
}
```

### 2. Usar en el template

```html
<app-component-tabs [tabs]="tabs" [sections]="pageConfig.sections">
  <!-- Custom content for specific sections -->
  <div section-basic>
    <div class="example-preview">
      <nui-button>Click me</nui-button>
    </div>
  </div>

  <div section-variants-colors>
    <div class="example-preview">
      <!-- Your custom HTML here -->
    </div>
  </div>
</app-component-tabs>
```

## 📐 API del Componente

### Inputs

| Propiedad | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `tabs` | `ComponentTab[]` | Configuración de los tabs | ✅ |
| `sections` | `ComponentSection[]` | Todas las secciones de la página | ✅ |
| `initialTab` | `string` | Tab activo inicial (default: 'examples') | ❌ |

### Interface ComponentTab

```typescript
interface ComponentTab {
  id: string;           // Identificador único del tab
  label: string;        // Clave de traducción para el label
  icon?: string;        // Icono opcional (Remix Icon)
  sections: string[];   // IDs de las secciones que contiene
}
```

## 🔗 Navegación por URL

El componente soporta varios formatos de URL fragments:

### Tab + Sección
```
/components/button#examples.basic
/components/button#api.interfaces
/components/button#theming.variables
```

### Solo Tab
```
/components/button#examples
/components/button#api
```

### Legacy (solo anchor)
```
/components/button#basic
```
Automáticamente detecta en qué tab está la sección y activa ese tab.

## 🎨 Content Projection (Slots)

Para agregar contenido personalizado a una sección específica, usa el atributo selector `[section-{id}]`:

```html
<app-component-tabs [tabs]="tabs" [sections]="pageConfig.sections">
  <!-- La sección renderizará automáticamente:
       - Title
       - Description
       - Note (si existe)
       - Este contenido custom
       - Code examples
  -->
  <div section-basic>
    <div class="example-preview">
      <nui-button>Click me</nui-button>
    </div>
  </div>
</app-component-tabs>
```

## 🌍 Traducciones

Agregar las traducciones en `es.json`:

```json
{
  "common": {
    "tabs": {
      "examples": "Ejemplos",
      "api": "API",
      "theming": "Theming",
      "advanced": "Avanzado",
      "accessibility": "Accesibilidad"
    }
  }
}
```

## 📝 Ejemplo Completo

```typescript
// button-page.component.ts
import { Component, signal } from '@angular/core';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BUTTON_PAGE_CONFIG } from './button-page.config';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [ComponentTabsComponent, ...],
  templateUrl: './button-page.component.html',
})
export class ButtonPageComponent {
  pageConfig = BUTTON_PAGE_CONFIG;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'variants-colors', 'sizes'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['styling'],
    },
  ];

  isLoading = signal(false);

  simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}
```

```html
<!-- button-page.component.html -->
<div class="docs-page">
  <div class="page-header">
    <h1>{{ pageConfig.title | translate }}</h1>
    <p class="subtitle">{{ pageConfig.subtitle | translate }}</p>
  </div>

  <app-component-tabs [tabs]="tabs" [sections]="pageConfig.sections">
    <div section-basic>
      <div class="example-preview">
        <nui-button>Click me</nui-button>
      </div>
    </div>

    <div section-loading>
      <div class="example-preview">
        <nui-button [loading]="isLoading()" (onClick)="simulateLoading()">
          {{ isLoading() ? 'Loading...' : 'Click to Load' }}
        </nui-button>
      </div>
    </div>
  </app-component-tabs>
</div>
```

## 🎯 Casos de Uso Avanzados

### Tabs personalizados para componentes complejos

```typescript
tabs: ComponentTab[] = [
  {
    id: 'basic-examples',
    label: 'Ejemplos Básicos',
    sections: ['basic', 'sizes', 'positions']
  },
  {
    id: 'advanced-examples',
    label: 'Ejemplos Avanzados',
    sections: ['minimizable', 'multiple', 'events']
  },
  {
    id: 'api',
    label: 'API',
    sections: ['api']
  },
  {
    id: 'theming',
    label: 'Theming',
    sections: ['styling']
  },
  {
    id: 'accessibility',
    label: 'Accesibilidad',
    sections: ['a11y', 'keyboard-navigation']
  }
];
```

## ♿ Accesibilidad

- ✅ ARIA attributes (`role="tab"`, `aria-selected`)
- ✅ Focus visible con outline
- ✅ Navegación por teclado (Tab, Enter, Space)
- ✅ Scroll automático a secciones
- ✅ Offset para headers sticky (`scroll-margin-top`)

## 🎨 Personalización de Estilos

Las variables CSS se pueden sobrescribir en tu tema:

```scss
.nui-component-tabs {
  --tab-primary-color: var(--nui-primary-main);
  --tab-active-border: 2px;
  --tab-padding: 0.875rem 1.25rem;
  --tab-font-size: 0.9375rem;
  --tab-transition: all 0.2s ease;
}
```

## 📦 Migración desde estructura antigua

### Antes:
```html
<div class="docs-content">
  @for (section of pageConfig.sections; track section.id) {
    <section class="section">
      <app-section-title [title]="section.title" />
      <!-- ... content ... -->
      <app-code-block [examples]="section.examples" />
    </section>
  }
</div>
```

### Después:
```html
<app-component-tabs [tabs]="tabs" [sections]="pageConfig.sections">
  <div section-basic>
    <!-- custom content -->
  </div>
</app-component-tabs>
```

## ✅ Checklist de Migración

- [ ] Crear configuración `tabs` en el componente
- [ ] Importar `ComponentTabsComponent` y `ComponentTab`
- [ ] Reemplazar estructura `@for + @switch` por `<app-component-tabs>`
- [ ] Mover contenido custom a divs con `section-{id}`
- [ ] Verificar que todos los sections estén en algún tab
- [ ] Probar navegación por URL
- [ ] Verificar traducciones

## 🐛 Troubleshooting

### Las secciones no se muestran
- ✅ Verificar que el `id` de la sección coincida con el array `sections` del tab
- ✅ Verificar que `pageConfig.sections` contenga todas las secciones

### Los anchors no funcionan
- ✅ Verificar que cada sección tenga la propiedad `anchor` en el config
- ✅ Usar formato `tab.section` en la URL (#examples.basic)

### El contenido custom no aparece
- ✅ Verificar que el selector sea `section-{id}` sin espacios ni guiones adicionales
- ✅ El id debe coincidir exactamente con el id de la sección en el config
