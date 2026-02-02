# Configuración NUI - Estructura Modular

Esta carpeta contiene toda la configuración global de la librería NUI (Narian UI) organizada de forma modular.

## 📁 Estructura

```
configs/
├── common/                    # Tipos comunes compartidos
│   ├── types.ts              # NUISize, NUIVariant, NUIColor
│   └── index.ts              # Barrel export
│
├── paginator/                 # Configuración del Paginator
│   ├── paginator.config.ts   # Factory function con defaults
│   └── index.ts              # Barrel export
│
├── tabs/                      # Configuración de Tabs
│   ├── tabs.config.ts        # Factory function con defaults
│   └── index.ts              # Barrel export
│
├── modal/                     # Configuración de Modales
│   ├── modal.config.ts       # Factory function con defaults
│   └── index.ts              # Barrel export
│
├── sidebar-panel/             # Configuración de Sidebar Panel
│   ├── sidebar-panel.config.ts  # Factory function con defaults
│   └── index.ts              # Barrel export
│
├── nui.model.ts              # Interface principal NUIConfig
├── nui.config.ts             # Provider y tokens de inyección
├── nui.consts.ts             # Constantes globales
└── index.ts                  # Barrel export principal
```

## 🎯 Responsabilidades

### common/
Contiene los tipos base compartidos por todos los componentes:
- `NUISize`: Tamaños disponibles ('xs', 's', 'sm', 'md', 'lg', 'xl')
- `NUIVariant`: Variantes visuales ('solid', 'outline', 'ghost')
- `NUIColor`: Colores del sistema ('primary', 'accent', 'secondary', etc.)

### paginator/
Toda la configuración relacionada con el componente Paginator:
- **Model**: Interfaces para configuración, textos, teclado, loading, responsive, layout, iconos, modo infinito
- **Config**: Factory `createDefaultPaginatorConfig()` con valores por defecto y traducciones

### tabs/
Configuración del componente Tabs:
- **Model**: `TabsConfig` interface
- **Config**: Factory `createDefaultTabsConfig()` con valores por defecto

### modal/
Toda la configuración relacionada con modales:
- **Model**: Interfaces para configuración de modales, status bar, timeout, gestures, analytics, verificación, loading
- **Config**: Factory `createDefaultModalConfig()` con valores por defecto para todos los aspectos de los modales

### sidebar-panel/
Toda la configuración relacionada con sidebar panels:
- **Config**: Factory `createDefaultSidebarPanelConfig()` con valores por defecto (posición, tamaño, animaciones, backdrop, accesibilidad, z-index, etc.)
- Permite centralizar el comportamiento de todos los panels en la aplicación

### nui.model.ts
Interface principal que agrupa toda la configuración:
```typescript
export interface NUIConfig {
  defaultVariant?: NUIVariant;
  defaultSize?: NUISize;
  defaultColor?: NUIColor;
  dropdownItemSize?: NUISize;
  paginator?: PaginatorGlobalConfig;
  tabs?: TabsConfig;
  modal?: ModalConfig;
  sidebarPanel?: SidebarPanelConfig;
}
```

### nui.config.ts
Provider y tokens de inyección:
- `NUI_CONFIG`: Token de inyección
- `provideNUIConfig()`: Función para configurar el provider
- `mergeNUIConfig()`: Helper para merge de configuraciones
- `createDefaultNUIConfig()`: Factory principal que combina todos los módulos

## 📝 Uso

### Importar configuración global
```typescript
import { inject } from '@angular/core';
import { NUI_CONFIG } from '@shared/configs';

export class MyComponent {
  private readonly config = inject(NUI_CONFIG);
  
  size = this.config.defaultSize ?? 'md';
  variant = this.config.defaultVariant ?? 'solid';
}
```

### Importar tipos específicos
```typescript
// Tipos comunes
import { NUISize, NUIVariant, NUIColor } from '@shared/configs/common';

// Tipos del paginator
import { PaginatorConfig, PaginatorLayout } from '@shared/configs/paginator';

// Tipos de tabs
import { TabsConfig } from '@shared/configs/tabs';
```

### Configurar en app.config.ts
```typescript
import { provideNUIConfig } from '@shared/configs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      defaultSize: 'md',
      defaultVariant: 'solid',
      defaultColor: 'primary',
      paginator: {
        config: {
          maxVisiblePages: 5,
          showPageSizeSelector: true
        }
      },
      tabs: {
        variant: 'underline',
        enableAnimations: true
      },
      modal: {
        defaultWidth: '600px',
        defaultVariant: 'solid',
        defaultSize: 'md',
        defaultCanBeClosed: true,
        defaultStatusBar: {
          position: 'top',
          thickness: 4
        }
      },
      sidebarPanel: {
        position: 'right',
        size: 'md',
        showCloseButton: true,
        hasBackdrop: true,
        closeOnBackdropClick: true,
        closeOnEscape: true,
        animationDuration: 225,
        zIndex: 1000,
        mobileFullScreen: false,
        breakpoint: 768
      }
    })
  ]
};
```

## ✨ Beneficios de esta Estructura

1. **Separación de responsabilidades**: Cada módulo tiene su propia carpeta
2. **Escalabilidad**: Fácil añadir nuevas configuraciones (modal, dropdown, etc.)
3. **Mantenibilidad**: Cada archivo es más pequeño y enfocado
4. **Reutilización**: Los tipos comunes están centralizados
5. **Tree-shaking**: Imports específicos mejoran el bundle size
6. **Compatibilidad**: Re-exports mantienen la API existente

## 🔄 Compatibilidad hacia atrás

Todos los imports existentes siguen funcionando:
```typescript
// Esto sigue funcionando ✅
import { NUISize, NUIVariant, NUIColor } from '@shared/configs/nui.model';
import { NUI_CONFIG } from '@shared/configs/nui.config';
```

Gracias a los re-exports en `nui.model.ts` y el barrel export en `index.ts`.

## 🚀 Añadir nueva configuración

Para añadir una nueva configuración (ej: Modal):

1. Crear carpeta `modal/`
2. Crear `modal/modal.model.ts` con las interfaces
3. Crear `modal/modal.config.ts` con el factory
4. Crear `modal/index.ts` con los exports
5. Actualizar `nui.model.ts` para incluir la nueva config
6. Actualizar `nui.config.ts` para incluir el default
7. Actualizar `index.ts` para exportar el nuevo módulo

```typescript
// modal/modal.model.ts
export interface ModalConfig {
  width?: string;
  height?: string;
  // ...
}

// modal/modal.config.ts
export function createDefaultModalConfig(): ModalConfig {
  return {
    width: '500px',
    height: 'auto'
  };
}

// modal/index.ts
export * from './modal.model';
export * from './modal.config';
```
