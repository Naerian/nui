# Toast Component 🍞

> **Sistema de notificaciones toast enterprise-grade con soporte completo para animaciones, acciones, templates personalizados y accesibilidad WCAG 2.1 AA**

Sistema robusto de notificaciones toast con arquitectura multi-container, límites por posición, animaciones CSS avanzadas, soporte para promesas, templates personalizados, y API fluida con TypeScript para máxima flexibilidad.

---

## 📑 Tabla de Contenidos

1. [Características](#características-)
2. [Instalación](#instalación)
3. [Uso Rápido](#uso-rápido)
4. [API del Servicio](#api-del-servicio)
5. [Configuración](#configuración)
6. [Posiciones](#posiciones)
7. [Animaciones](#animaciones)
8. [Templates Personalizados](#templates-personalizados)
9. [Toast de Promesas](#toast-de-promesas)
10. [Acciones y Botones](#acciones-y-botones)
11. [Gestión Avanzada](#gestión-avanzada)
12. [Accesibilidad](#accesibilidad-)
13. [Configuración Global](#configuración-global)
14. [Ejemplos Completos](#ejemplos-completos)
15. [Troubleshooting](#troubleshooting)

---

## Características ✨

### 🎯 UX y Funcionalidad

- ✅ **5 tipos predefinidos**: success, error, warning, info, custom
- ✅ **11 posiciones**: top-left/center/right/full, middle-left/center/right, bottom-left/center/right/full
- ✅ **6 animaciones de entrada**: slide, fade, bounce, zoom, flip
- ✅ **4 animaciones de salida**: slide, fade, shrink, zoom
- ✅ **Multi-container**: Un contenedor por posición para mejor organización
- ✅ **Límites configurables**: Global y por posición específica
- ✅ **Swipe to dismiss**: Deslizar para cerrar (táctil)
- ✅ **Progress bar**: Barra de progreso con sincronización 60fps
- ✅ **Auto-close**: Cierre automático con timeout configurable
- ✅ **Pause on hover**: Pausa el timeout al pasar el mouse
- ✅ **Acciones inline**: Botones de acción con callbacks

### 🚀 Features Avanzados

- 🔄 **Promise toast**: Loading → Success/Error automático
- 📦 **Sistema de cola**: Encola toasts cuando se alcanza el límite
- 🎭 **Templates personalizados**: TemplateRef para contenido custom
- 🔔 **Prevención de duplicados**: No muestra toasts idénticos
- 💾 **Persistencia**: Guarda toasts entre recargas (opcional)
- 🎵 **Sonidos**: Reproduce sonidos según tipo
- 📱 **Responsive**: Optimizado para móvil, tablet, desktop
- 🌐 **Offline-aware**: Encola si no hay conexión
- 📊 **Agrupación**: Agrupa toasts relacionados
- 🎨 **Theming dinámico**: Integrado con sistema de diseño NUI

### ♿ Accesibilidad WCAG 2.1 AA

- ✅ **Roles ARIA**: `role="status"`, `role="alert"`, `role="log"`
- ✅ **Live regions**: `aria-live="polite"`, `aria-live="assertive"`
- ✅ **Screen reader friendly**: Anuncia mensajes importantes
- ✅ **Navegación teclado**: ESC para cerrar, Tab entre acciones
- ✅ **Focus management**: Focus en primer botón de acción
- ✅ **Contraste**: ≥4.5:1 (texto), ≥3:1 (elementos)

### 💎 Developer Experience

- 📘 **TypeScript completo**: Interfaces tipadas, genéricos
- 🎯 **API fluida**: Métodos encadenables, observables
- 📝 **9 métodos principales**: success, error, warning, info, custom, loading, promise, update, close
- 🔍 **Debugging**: IDs únicos, logging opcional
- 🧪 **Testeable**: Servicio injectable, fácil de mockear
- 📦 **Tree-shakeable**: Standalone components

---

## Instalación

El componente ya está incluido en el proyecto. Importa el servicio donde lo necesites:

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from '@shared/components/toast';

@Component({
  selector: 'app-my-component',
  standalone: true,
  template: `...`
})
export class MyComponent {
  private readonly toastService = inject(ToastService);
}
```

---

## Uso Rápido

### Toast Básico (1 línea)

```typescript
// Éxito
this.toastService.success('¡Operación completada!');

// Error
this.toastService.error('No se pudo guardar');

// Advertencia
this.toastService.warning('Tu sesión expirará pronto');

// Información
this.toastService.info('Nueva versión disponible');

// Personalizado
this.toastService.custom('Mensaje neutral');
```

### Con Título

```typescript
this.toastService.success('Cambios guardados correctamente', {
  title: 'Éxito'
});

this.toastService.error('No se pudo conectar', {
  title: 'Error de Conexión'
});
```

### Con Acción

```typescript
this.toastService.success('Elemento eliminado', {
  action: {
    label: 'Deshacer',
    onClick: () => {
      console.log('Elemento restaurado');
    }
  }
});
```

### Toast de Carga

```typescript
const loadingToast = this.toastService.loading('Guardando cambios...');

// Después de completar
this.toastService.close(loadingToast.id);
```

---

## API del Servicio

### Métodos Principales

#### `success(message: string, config?: ToastConfig): ToastRef`

Muestra un toast de éxito con icono verde de check.

```typescript
this.toastService.success('¡Usuario creado!', {
  timeout: 5000,
  position: 'top-right'
});
```

#### `error(message: string, config?: ToastConfig): ToastRef`

Muestra un toast de error con icono rojo de alerta.

```typescript
this.toastService.error('Error al procesar solicitud', {
  timeout: 0, // No cierra automáticamente
  closeButton: true
});
```

#### `warning(message: string, config?: ToastConfig): ToastRef`

Muestra un toast de advertencia con icono amarillo.

```typescript
this.toastService.warning('Sesión expirará en 5 minutos', {
  timeout: 10000
});
```

#### `info(message: string, config?: ToastConfig): ToastRef`

Muestra un toast informativo con icono azul.

```typescript
this.toastService.info('Hay 3 mensajes nuevos', {
  action: {
    label: 'Ver',
    onClick: () => this.viewMessages()
  }
});
```

#### `custom(message: string, config?: ToastConfig): ToastRef`

Muestra un toast personalizado.

```typescript
this.toastService.custom('Mensaje neutral', {
  icon: 'ri-notification-line',
  toastClass: 'my-custom-toast'
});
```

#### `loading(message: string, config?: ToastConfig): ToastRef`

Muestra un toast de carga (spinner animado, sin timeout, sin botón cerrar).

```typescript
const toast = this.toastService.loading('Cargando datos...');

// Cerrar manualmente
setTimeout(() => {
  this.toastService.close(toast.id);
}, 3000);
```

#### `promise<T>(promise: Promise<T>, messages: {...}): Promise<T>`

Toast automático para promesas (loading → success/error).

```typescript
await this.toastService.promise(
  this.apiService.saveUser(data),
  {
    loading: 'Guardando usuario...',
    success: 'Usuario guardado correctamente',
    error: 'Error al guardar usuario'
  }
);

// Con funciones dinámicas
await this.toastService.promise(
  this.apiService.deleteItems(ids),
  {
    loading: 'Eliminando elementos...',
    success: (count) => `${count} elementos eliminados`,
    error: (err) => `Error: ${err.message}`
  }
);
```

### Métodos de Gestión

#### `update(id: string, options: Partial<ToastConfig>): void`

Actualiza un toast existente.

```typescript
const toast = this.toastService.loading('Procesando...');

// Después de completar
this.toastService.update(toast.id, {
  type: 'success',
  message: '¡Completado!',
  icon: true,
  timeout: 3000
});
```

#### `close(id: string): void`

Cierra un toast específico.

```typescript
this.toastService.close(toastRef.id);
```

#### `closeAll(): void`

Cierra todos los toasts activos.

```typescript
this.toastService.closeAll();
```

#### `closeByGroup(group: string): void`

Cierra todos los toasts de un grupo.

```typescript
this.toastService.closeByGroup('file-operations');
```

#### `get(id: string): ToastRef | undefined`

Obtiene referencia a un toast específico.

```typescript
const toast = this.toastService.get('my-toast-id');
if (toast) {
  toast.pause();
}
```

### Signals Reactivos

#### `activeToasts: Signal<ToastRef[]>`

Signal con todos los toasts activos.

```typescript
effect(() => {
  console.log('Toasts activos:', this.toastService.activeToasts());
});
```

#### `activeCount: Signal<number>`

Número de toasts activos.

```typescript
<div>{{ toastService.activeCount() }} notificaciones</div>
```

#### `hasErrors: Signal<boolean>`

Indica si hay toasts de error activos.

```typescript
@if (toastService.hasErrors()) {
  <div class="error-indicator"></div>
}
```

#### `hasWarnings: Signal<boolean>`

Indica si hay toasts de advertencia activos.

```typescript
@if (toastService.hasWarnings()) {
  <div class="warning-indicator"></div>
}
```

---

## Configuración

### ToastConfig Interface

```typescript
interface ToastConfig {
  // ===== CONTENIDO =====
  type?: ToastType;                    // 'success' | 'danger' | 'warning' | 'info' | ...
  title?: string;                      // Título opcional
  message?: string;                    // Mensaje principal
  template?: TemplateRef<any>;         // Template personalizado
  templateContext?: any;               // Datos para el template
  templateMode?: 'replace' | 'append'; // Modo del template
  html?: string;                       // HTML sanitizado

  // ===== VISUAL =====
  icon?: boolean | string;             // true | false | 'ri-icon-name'
  iconPosition?: 'left' | 'top';       // Posición del icono
  toastClass?: string | string[];      // Clases CSS adicionales

  // ===== ACCIONES =====
  action?: ToastAction;                // Acción principal
  actions?: ToastAction[];             // Acciones adicionales

  // ===== COMPORTAMIENTO =====
  timeout?: number;                    // Duración (ms), 0 = infinito
  progressBar?: boolean;               // Mostrar barra de progreso
  closeButton?: boolean;               // Botón de cerrar
  pauseOnHover?: boolean;              // Pausar en hover
  pauseOnFocusLoss?: boolean;          // Pausar al perder foco
  closeOnTouch?: boolean;              // Cerrar al hacer click
  swipeToDismiss?: boolean;            // Deslizar para cerrar
  swipeThreshold?: number;             // Umbral de deslizamiento (px)

  // ===== ANIMACIONES =====
  animationIn?: 'slide' | 'fade' | 'bounce' | 'zoom' | 'flip';
  animationOut?: 'slide' | 'fade' | 'shrink' | 'zoom';
  animationDuration?: number;          // Duración (ms)

  // ===== POSICIÓN =====
  position?: ToastPosition;            // Posición específica

  // ===== AVANZADO =====
  group?: string;                      // Grupo del toast
  priority?: number;                   // Prioridad (mayor = más importante)
  id?: string;                         // ID único
  persistent?: boolean;                // Persistir en localStorage
  persistentId?: string;               // ID para persistencia
  sound?: boolean | string;            // Sonido
  expandable?: boolean;                // Permitir expandir
  expandedContent?: string | TemplateRef<any>; // Contenido expandido
  requireOnline?: boolean;             // Solo mostrar si hay conexión

  // ===== ACCESIBILIDAD =====
  ariaRole?: 'status' | 'alert' | 'log';
  ariaLive?: 'polite' | 'assertive' | 'off';
  announceToScreenReader?: boolean;

  // ===== CALLBACKS =====
  onShown?: () => void;
  onClosed?: () => void;
  onClick?: () => void;
  onTimeout?: () => void;
  onPause?: () => void;
  onResume?: () => void;

  // ===== BOTONES =====
  buttonsSize?: NUISize;
  buttonsColor?: NUIColor;
  buttonsVariant?: NUIVariant;
}
```

### ToastAction Interface

```typescript
interface ToastAction {
  label: string;                       // Texto del botón
  onClick: () => void | Promise<void>; // Callback
  closeOnClick?: boolean;              // Cerrar después (default: true)
  class?: string;                      // Clase CSS adicional
}
```

---

## Posiciones

### Posiciones Disponibles

```typescript
type ToastPosition =
  | 'top-left'       // Esquina superior izquierda
  | 'top-center'     // Centro superior
  | 'top-right'      // Esquina superior derecha (DEFAULT)
  | 'top-full'       // Ancho completo superior
  | 'middle-left'    // Centro izquierda
  | 'middle-center'  // Centro absoluto (Snackbar style)
  | 'middle-right'   // Centro derecha
  | 'bottom-left'    // Esquina inferior izquierda
  | 'bottom-center'  // Centro inferior
  | 'bottom-right'   // Esquina inferior derecha
  | 'bottom-full';   // Ancho completo inferior
```

### Ejemplos de Posición

```typescript
// Posición superior central
this.toastService.success('Guardado', {
  position: 'top-center'
});

// Snackbar estilo Material (centro inferior)
this.toastService.info('Cambios pendientes', {
  position: 'middle-center',
  timeout: 3000
});

// Banner completo superior
this.toastService.warning('Actualización del sistema', {
  position: 'top-full',
  timeout: 0,
  closeButton: true
});

// Banner completo inferior
this.toastService.info('Cookies policy', {
  position: 'bottom-full',
  action: {
    label: 'Aceptar',
    onClick: () => this.acceptCookies()
  }
});
```

---

## Animaciones

### Animaciones de Entrada

```typescript
// Slide (default)
this.toastService.success('Mensaje', {
  animationIn: 'slide'
});

// Fade
this.toastService.info('Mensaje', {
  animationIn: 'fade'
});

// Bounce
this.toastService.success('Mensaje', {
  animationIn: 'bounce'
});

// Zoom
this.toastService.error('Mensaje', {
  animationIn: 'zoom'
});

// Flip
this.toastService.warning('Mensaje', {
  animationIn: 'flip'
});
```

### Animaciones de Salida

```typescript
// Slide (default)
this.toastService.success('Mensaje', {
  animationOut: 'slide'
});

// Fade
this.toastService.info('Mensaje', {
  animationOut: 'fade'
});

// Shrink
this.toastService.error('Mensaje', {
  animationOut: 'shrink'
});

// Zoom
this.toastService.warning('Mensaje', {
  animationOut: 'zoom'
});
```

### Duración de Animación

```typescript
this.toastService.success('Mensaje', {
  animationIn: 'bounce',
  animationOut: 'zoom',
  animationDuration: 500 // ms
});
```

---

## Templates Personalizados

### Template Replace (reemplaza todo el contenido)

```typescript
@Component({
  template: `
    <ng-template #customTemplate let-data>
      <div class="custom-content">
        <h4>{{ data.title }}</h4>
        <p>{{ data.description }}</p>
        <ul>
          <li *ngFor="let item of data.items">{{ item }}</li>
        </ul>
      </div>
    </ng-template>

    <button (click)="showCustom()">Mostrar Custom</button>
  `
})
export class MyComponent {
  @ViewChild('customTemplate') customTemplate!: TemplateRef<any>;

  showCustom(): void {
    this.toastService.custom('', {
      template: this.customTemplate,
      templateContext: {
        title: 'Lista de Tareas',
        description: 'Tienes 3 tareas pendientes',
        items: ['Tarea 1', 'Tarea 2', 'Tarea 3']
      },
      templateMode: 'replace',
      timeout: 0,
      closeButton: true
    });
  }
}
```

### Template Append (después del contenido estándar)

```typescript
@Component({
  template: `
    <ng-template #detailsTemplate>
      <div class="additional-info">
        <small>Detalles adicionales aquí</small>
      </div>
    </ng-template>

    <button (click)="showWithDetails()">Mostrar</button>
  `
})
export class MyComponent {
  @ViewChild('detailsTemplate') detailsTemplate!: TemplateRef<any>;

  showWithDetails(): void {
    this.toastService.info('Operación completada', {
      title: 'Éxito',
      template: this.detailsTemplate,
      templateMode: 'append' // Añade después del mensaje
    });
  }
}
```

### Template con Progress Bar

```typescript
@Component({
  template: `
    <ng-template #uploadTemplate let-data>
      <div class="upload-progress">
        <div class="file-name">{{ data.fileName }}</div>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="data.progress"></div>
        </div>
        <div class="progress-text">{{ data.progress }}%</div>
      </div>
    </ng-template>
  `
})
export class MyComponent {
  @ViewChild('uploadTemplate') uploadTemplate!: TemplateRef<any>;

  uploadFile(): void {
    const toast = this.toastService.custom('', {
      template: this.uploadTemplate,
      templateContext: {
        fileName: 'document.pdf',
        progress: 0
      },
      timeout: 0,
      closeButton: false
    });

    // Simular progreso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.toastService.update(toast.id, {
        templateContext: {
          fileName: 'document.pdf',
          progress
        }
      });

      if (progress >= 100) {
        clearInterval(interval);
        this.toastService.update(toast.id, {
          type: 'success',
          message: 'Archivo subido correctamente',
          template: undefined,
          timeout: 3000
        });
      }
    }, 500);
  }
}
```

---

## Toast de Promesas

### Uso Básico

```typescript
async saveData(): Promise<void> {
  await this.toastService.promise(
    this.apiService.saveData(this.formData),
    {
      loading: 'Guardando datos...',
      success: 'Datos guardados correctamente',
      error: 'Error al guardar datos'
    }
  );
}
```

### Con Mensajes Dinámicos

```typescript
async deleteItems(ids: number[]): Promise<void> {
  const result = await this.toastService.promise(
    this.apiService.deleteItems(ids),
    {
      loading: `Eliminando ${ids.length} elementos...`,
      success: (deletedCount) => `${deletedCount} elementos eliminados`,
      error: (error) => `Error: ${error.message}`
    }
  );

  console.log('Eliminados:', result);
}
```

### Con Configuración Adicional

```typescript
async uploadFile(file: File): Promise<void> {
  await this.toastService.promise(
    this.apiService.uploadFile(file),
    {
      loading: 'Subiendo archivo...',
      success: 'Archivo subido correctamente',
      error: 'Error al subir archivo'
    },
    {
      position: 'bottom-right',
      timeout: 5000,
      icon: 'ri-upload-cloud-line'
    }
  );
}
```

---

## Acciones y Botones

### Acción Simple

```typescript
this.toastService.success('Elemento eliminado', {
  action: {
    label: 'Deshacer',
    onClick: () => {
      this.restoreElement();
    }
  }
});
```

### Múltiples Acciones

```typescript
this.toastService.info('Nueva actualización disponible', {
  timeout: 0,
  closeButton: true,
  actions: [
    {
      label: 'Actualizar ahora',
      onClick: async () => {
        await this.updateApp();
        this.toastService.success('Actualización completada');
      }
    },
    {
      label: 'Más tarde',
      onClick: () => {},
      closeOnClick: true
    }
  ]
});
```

### Acción con Promise

```typescript
this.toastService.warning('¿Confirmar acción?', {
  timeout: 0,
  action: {
    label: 'Confirmar',
    onClick: async () => {
      await this.performAction();
      this.toastService.success('Acción completada');
    },
    closeOnClick: false // Mantener abierto hasta completar
  }
});
```

### Personalizar Botones

```typescript
this.toastService.info('Mensaje con botones personalizados', {
  buttonsSize: 'sm',
  buttonsColor: 'primary',
  buttonsVariant: 'solid',
  actions: [
    {
      label: 'Aceptar',
      onClick: () => console.log('Aceptado')
    },
    {
      label: 'Cancelar',
      onClick: () => {},
      class: 'btn-secondary'
    }
  ]
});
```

---

## Gestión Avanzada

### Agrupación de Toasts

```typescript
// Crear grupo
this.toastService.info('Archivo 1 procesado', {
  group: 'file-operations'
});

this.toastService.info('Archivo 2 procesado', {
  group: 'file-operations'
});

// Cerrar todo el grupo
this.toastService.closeByGroup('file-operations');
```

### Prioridad

```typescript
// Toast de alta prioridad (se muestra primero)
this.toastService.error('Error crítico', {
  priority: 10,
  timeout: 0
});

// Toast de baja prioridad (puede encolarse)
this.toastService.info('Información general', {
  priority: 1
});
```

### Prevención de Duplicados

```typescript
// Si ya existe un toast con el mismo mensaje, lo resetea en vez de crear uno nuevo
this.toastService.success('Elemento guardado'); // Primera vez
this.toastService.success('Elemento guardado'); // Resetea el timeout del primero
```

### Persistencia

```typescript
// Persistir en localStorage
this.toastService.warning('Aviso importante', {
  persistent: true,
  persistentId: 'important-notice',
  timeout: 0,
  closeButton: true
});

// Se mantiene entre recargas hasta que el usuario lo cierre
```

### Toast Expandible

```typescript
this.toastService.info('Error detallado', {
  title: 'Error en la petición',
  message: 'Ver detalles para más información',
  expandable: true,
  expandedContent: `
    Stack trace:
    at fetchData (api.service.ts:42)
    at processRequest (handler.ts:15)
    ...
  `
});
```

### Control Manual del Ciclo de Vida

```typescript
const toast = this.toastService.loading('Procesando...');

// Pausar
toast.pause();

// Reanudar
toast.resume();

// Resetear timeout
toast.resetTimeout();

// Actualizar
toast.update({
  message: 'Casi listo...',
  type: 'info'
});

// Cerrar
toast.close();
```

---

## Accesibilidad ♿

### Roles ARIA

```typescript
// Status (default) - Cambios no urgentes
this.toastService.info('Operación completada', {
  ariaRole: 'status',
  ariaLive: 'polite'
});

// Alert - Información urgente
this.toastService.error('Error crítico', {
  ariaRole: 'alert',
  ariaLive: 'assertive'
});

// Log - Información de registro
this.toastService.custom('Debug info', {
  ariaRole: 'log',
  ariaLive: 'off'
});
```

### Anuncios a Screen Readers

```typescript
this.toastService.success('Cambios guardados', {
  announceToScreenReader: true, // Anuncia el mensaje
  ariaLive: 'polite'
});
```

### Navegación por Teclado

- **ESC**: Cierra el toast
- **Tab**: Navega entre botones de acción
- **Enter**: Activa el botón enfocado

---

## Configuración Global

### provideNUIConfig

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNUIConfig } from '@shared/configs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      toast: {
        // ===== POSICIÓN Y LÍMITES =====
        position: 'top-right',              // Posición por defecto
        maxToasts: 6,                       // Máximo de toasts globales
        maxToastsPerPosition: 3,            // Máximo por posición

        // ===== TIEMPO =====
        timeout: 5000,                      // Duración por defecto (ms)
        extendedTimeout: 10000,             // Duración extendida
        
        // ===== COMPORTAMIENTO =====
        progressBar: true,                  // Mostrar barra de progreso
        closeButton: false,                 // Botón de cerrar
        pauseOnHover: true,                 // Pausar en hover
        pauseOnFocusLoss: true,             // Pausar al perder foco
        closeOnTouch: false,                // Cerrar al hacer click
        swipeToDismiss: true,               // Deslizar para cerrar
        swipeThreshold: 100,                // Umbral de deslizamiento (px)
        preventDuplicates: true,            // No mostrar duplicados
        resetTimeoutOnDuplicate: true,      // Resetear timeout en duplicados
        newestOnTop: true,                  // Nuevos arriba

        // ===== ANIMACIONES =====
        animationIn: 'slide',               // Animación de entrada
        animationOut: 'slide',              // Animación de salida
        animationDuration: 300,             // Duración (ms)
        easing: 'ease-out',                 // Easing CSS

        // ===== VISUAL =====
        iconPosition: 'left',               // 'left' | 'top'
        
        // ===== ICONOS POR TIPO =====
        icons: {
          success: 'ri-checkbox-circle-line',
          danger: 'ri-error-warning-line',
          warning: 'ri-alert-line',
          info: 'ri-information-line',
          loading: 'ri-loader-4-line'
        },

        // ===== CALLBACKS GLOBALES =====
        onShown: () => console.log('Toast shown'),
        onClosed: () => console.log('Toast closed'),

        // ===== BOTONES =====
        buttonsSize: 'sm',
        buttonsColor: 'primary',
        buttonsVariant: 'ghost'
      }
    })
  ]
};
```

---

## Ejemplos Completos

### Notificación de Error con Stack Trace

```typescript
showDetailedError(error: Error): void {
  this.toastService.error(error.message, {
    title: 'Error en la Aplicación',
    timeout: 0,
    closeButton: true,
    expandable: true,
    expandedContent: error.stack || 'No stack trace available',
    action: {
      label: 'Reportar',
      onClick: () => this.reportError(error)
    }
  });
}
```

### Sistema de Notificaciones en Tiempo Real

```typescript
@Component({...})
export class NotificationComponent implements OnInit {
  private toastService = inject(ToastService);
  private webSocketService = inject(WebSocketService);

  ngOnInit(): void {
    this.webSocketService.notifications$.subscribe(notification => {
      this.showNotification(notification);
    });
  }

  private showNotification(notification: Notification): void {
    const typeMap = {
      'info': () => this.toastService.info(notification.message),
      'success': () => this.toastService.success(notification.message),
      'warning': () => this.toastService.warning(notification.message),
      'error': () => this.toastService.error(notification.message)
    };

    typeMap[notification.type]?.();
  }
}
```

### Toast con Countdown

```typescript
showSessionExpiring(): void {
  let secondsRemaining = 60;
  
  const toast = this.toastService.warning(
    `Tu sesión expirará en ${secondsRemaining} segundos`,
    {
      title: 'Sesión por Expirar',
      timeout: 0,
      closeButton: true,
      action: {
        label: 'Extender Sesión',
        onClick: () => {
          this.extendSession();
          clearInterval(interval);
        }
      }
    }
  );

  const interval = setInterval(() => {
    secondsRemaining--;
    
    if (secondsRemaining <= 0) {
      clearInterval(interval);
      this.logout();
      return;
    }

    this.toastService.update(toast.id, {
      message: `Tu sesión expirará en ${secondsRemaining} segundos`
    });
  }, 1000);
}
```

### Operación Batch con Progreso

```typescript
async processBatchOperation(items: Item[]): Promise<void> {
  const toast = this.toastService.info('Procesando...', {
    timeout: 0,
    closeButton: false
  });

  for (let i = 0; i < items.length; i++) {
    await this.processItem(items[i]);
    
    const progress = Math.round(((i + 1) / items.length) * 100);
    this.toastService.update(toast.id, {
      message: `Procesando... ${i + 1}/${items.length} (${progress}%)`
    });
  }

  this.toastService.update(toast.id, {
    type: 'success',
    message: `${items.length} elementos procesados`,
    timeout: 3000,
    closeButton: true
  });
}
```

### Toast Queue System

```typescript
class ToastQueue {
  private queue: Array<() => void> = [];
  private processing = false;

  constructor(private toastService: ToastService) {}

  add(showFn: () => void): void {
    this.queue.push(showFn);
    this.processNext();
  }

  private async processNext(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const showFn = this.queue.shift()!;
    showFn();

    // Esperar a que el toast se cierre
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    this.processing = false;
    this.processNext();
  }
}

// Uso
const queue = new ToastQueue(this.toastService);

queue.add(() => this.toastService.success('Mensaje 1'));
queue.add(() => this.toastService.info('Mensaje 2'));
queue.add(() => this.toastService.warning('Mensaje 3'));
```

---

## Troubleshooting

### ❌ Los toasts no se muestran

**Problema**: No se ve ningún toast en pantalla.

**Soluciones**:
1. Verificar que el servicio esté inyectado correctamente
2. Revisar la consola por errores
3. Verificar que no haya estilos CSS que oculten los toasts
4. Comprobar que el límite de toasts no esté en 0

### ❌ Los toasts se apilan incorrectamente

**Problema**: Los toasts se superponen o no respetan la posición.

**Soluciones**:
1. Verificar la configuración de `position`
2. Revisar `maxToastsPerPosition`
3. Comprobar que no haya CSS custom conflictivo

### ❌ La barra de progreso no se sincroniza

**Problema**: La barra de progreso salta o no es fluida.

**Soluciones**:
1. Verificar que `progressBar: true`
2. No usar CSS transitions en `.nui-toast__progress-bar`
3. El sistema ya actualiza a 60fps automáticamente

### ❌ Los botones de acción no funcionan

**Problema**: Los callbacks no se ejecutan.

**Soluciones**:
1. Verificar que `onClick` sea una función válida
2. Revisar errores en la consola
3. Asegurarse de que no haya event propagation bloqueada

### ❌ Memory leaks

**Problema**: Pérdida de memoria con muchos toasts.

**Soluciones**:
1. Llamar a `closeAll()` al destruir componentes
2. Limitar `maxToasts` a un número razonable (6-10)
3. No crear toasts en loops sin control

### ❌ Templates no se actualizan

**Problema**: El template no refleja cambios.

**Soluciones**:
1. Usar `update()` para actualizar el toast
2. Pasar nuevo `templateContext` al actualizar
3. Verificar change detection del componente

---

## Best Practices 🎯

### ✅ DO

```typescript
// Usar tipos específicos
this.toastService.success('Guardado');
this.toastService.error('Error');

// Limitar duración para mensajes informativos
this.toastService.info('Actualizado', { timeout: 3000 });

// Proporcionar acciones útiles
this.toastService.success('Eliminado', {
  action: {
    label: 'Deshacer',
    onClick: () => this.undo()
  }
});

// Cerrar toasts de carga manualmente
const toast = this.toastService.loading('Cargando...');
await this.loadData();
this.toastService.close(toast.id);

// Usar promise() para operaciones async
await this.toastService.promise(
  this.saveData(),
  {
    loading: 'Guardando...',
    success: 'Guardado',
    error: 'Error'
  }
);
```

### ❌ DON'T

```typescript
// No crear toasts en loops sin control
items.forEach(item => {
  this.toastService.success(`Procesado ${item.name}`); // ❌ Spamea toasts
});

// No usar timeouts muy largos
this.toastService.info('Mensaje', { timeout: 999999 }); // ❌ Molesto

// No olvidar cerrar toasts de carga
const toast = this.toastService.loading('Cargando...');
await this.loadData();
// ❌ Toast se queda abierto para siempre

// No usar HTML sin sanitizar
this.toastService.custom(userInput, { html: userInput }); // ❌ XSS risk

// No crear toasts sin mensaje
this.toastService.success(''); // ❌ Toast vacío
```

---

## Migración desde Otros Sistemas

### Desde NGX-Toastr

```typescript
// Antes (ngx-toastr)
this.toastr.success('Message', 'Title', {
  timeOut: 5000,
  positionClass: 'toast-top-right'
});

// Ahora
this.toastService.success('Message', {
  title: 'Title',
  timeout: 5000,
  position: 'top-right'
});
```

### Desde Angular Material Snackbar

```typescript
// Antes (Material)
this.snackBar.open('Message', 'Action', {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom'
});

// Ahora
this.toastService.info('Message', {
  timeout: 3000,
  position: 'bottom-center',
  action: {
    label: 'Action',
    onClick: () => {}
  }
});
```

---

## API Reference Completa

### ToastService Methods

| Método | Parámetros | Retorno | Descripción |
|--------|-----------|---------|-------------|
| `success()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast de éxito |
| `error()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast de error |
| `warning()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast de advertencia |
| `info()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast informativo |
| `custom()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast personalizado |
| `loading()` | `message: string, config?: ToastConfig` | `ToastRef` | Toast de carga |
| `promise()` | `promise: Promise<T>, messages: {...}, config?: ToastConfig` | `Promise<T>` | Toast automático para promesas |
| `update()` | `id: string, options: Partial<ToastConfig>` | `void` | Actualiza un toast |
| `close()` | `id: string` | `void` | Cierra un toast |
| `closeAll()` | - | `void` | Cierra todos |
| `closeByGroup()` | `group: string` | `void` | Cierra por grupo |
| `get()` | `id: string` | `ToastRef \| undefined` | Obtiene referencia |
| `clear()` | - | `void` | Limpia todos (alias de closeAll) |

### ToastRef Methods

| Método | Parámetros | Descripción |
|--------|-----------|-------------|
| `close()` | - | Cierra el toast |
| `pause()` | - | Pausa el timeout |
| `resume()` | - | Reanuda el timeout |
| `resetTimeout()` | - | Reinicia el timeout |
| `update()` | `options: Partial<ToastConfig>` | Actualiza configuración |

### ToastRef Properties

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `id` | `string` | ID único del toast |
| `type` | `ToastType` | Tipo del toast |
| `config` | `ToastConfig` | Configuración completa |
| `createdAt` | `Date` | Fecha de creación |
| `state` | `Signal<ToastAnimationState>` | Estado de animación |

---

**🎉 ¡Sistema Toast completamente funcional y listo para producción!**

Para más ejemplos, visita la sección de test en `/test/toast`.
