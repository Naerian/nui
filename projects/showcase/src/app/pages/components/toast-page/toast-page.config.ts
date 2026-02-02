import { ComponentPageConfig } from '../../../core/models';

export const TOAST_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.toast.title',
  subtitle: 'components.toast.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.toast.basic.title',
      description: 'components.toast.basic.description',
      anchor: 'basico',
      examples: [
        {
          title: 'components.toast.basic.codeTitle',
          code: `// Diferentes tipos de toast
this.toastService.success('Operación completada exitosamente');
this.toastService.error('Ha ocurrido un error');
this.toastService.warning('Por favor, revisa esta información');
this.toastService.info('Nueva actualización disponible');`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'with-title',
      title: 'components.toast.withTitle.title',
      description: 'components.toast.withTitle.description',
      anchor: 'con-titulo',
      examples: [
        {
          title: 'components.toast.withTitle.codeTitle',
          code: `this.toastService.success('Los cambios se guardaron correctamente', {
  title: 'Guardado Exitoso'
});

this.toastService.error('No se pudo conectar con el servidor', {
  title: 'Error de Conexión'
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'with-actions',
      title: 'components.toast.withActions.title',
      description: 'components.toast.withActions.description',
      anchor: 'con-acciones',
      examples: [
        {
          title: 'components.toast.withActions.codeTitle',
          code: `const toastRef = this.toastService.success('Elemento eliminado', {
  title: 'Eliminado',
  actions: [
    {
      label: 'Deshacer',
      onClick: () => {
        console.log('Acción deshecha');
        toastRef.close();
      }
    }
  ]
});`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'positions',
      title: 'components.toast.positions.title',
      description: 'components.toast.positions.description',
      anchor: 'posiciones',
      examples: [
        {
          title: 'components.toast.positions.codeTitle',
          code: `// Posiciones superiores
this.toastService.success('Top Left', { position: 'top-left' });
this.toastService.success('Top Center', { position: 'top-center' });
this.toastService.success('Top Right', { position: 'top-right' });

// Posiciones inferiores
this.toastService.info('Bottom Left', { position: 'bottom-left' });
this.toastService.info('Bottom Center', { position: 'bottom-center' });
this.toastService.info('Bottom Right', { position: 'bottom-right' });`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'duration',
      title: 'components.toast.duration.title',
      description: 'components.toast.duration.description',
      anchor: 'duracion',
      examples: [
        {
          title: 'components.toast.duration.codeTitle',
          code: `// Toast rápido (2 segundos)
this.toastService.success('Mensaje rápido', { timeout: 2000 });

// Toast largo (10 segundos)
this.toastService.info('Mensaje largo', { timeout: 10000 });

// Toast persistente (no se cierra automáticamente)
this.toastService.warning('Toast persistente', { timeout: 0 });`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'loading',
      title: 'components.toast.loading.title',
      description: 'components.toast.loading.description',
      anchor: 'carga',
      examples: [
        {
          title: 'components.toast.loading.codeTitle',
          code: `const toastRef = this.toastService.loading('Procesando...');

// Actualizar después de completar
setTimeout(() => {
  toastRef.update({ type: 'success', message: '¡Éxito!' });
}, 2000);`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.toast.api.title',
      description: 'components.toast.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'components.toast.api.serviceCodeTitle',
          code: `// Métodos del ToastService
class ToastService {
  // Mostrar toast de éxito
  success(message: string, options?: ToastOptions): ToastRef
  
  // Mostrar toast de error
  error(message: string, options?: ToastOptions): ToastRef
  
  // Mostrar toast de advertencia
  warning(message: string, options?: ToastOptions): ToastRef
  
  // Mostrar toast informativo
  info(message: string, options?: ToastOptions): ToastRef
  
  // Mostrar toast de carga
  loading(message: string, options?: ToastOptions): ToastRef
  
  // Cerrar todos los toasts
  clear(): void
  
  // Cerrar toast específico
  close(id: string): void
}`,
          language: 'typescript',
        },
        {
          title: 'components.toast.api.interfacesCodeTitle',
          code: `// Interface ToastOptions
interface ToastOptions {
  title?: string;                    // Título del toast
  position?: ToastPosition;          // Posición en pantalla
  timeout?: number;                  // Duración en ms (0 = persistente)
  closeable?: boolean;               // Mostrar botón de cierre
  icon?: string;                     // Icono personalizado (Remix Icon)
  actions?: ToastAction[];           // Botones de acción
  progressBar?: boolean;             // Mostrar barra de progreso
  pauseOnHover?: boolean;            // Pausar timeout al hacer hover
  data?: any;                        // Datos personalizados
}

// Posiciones disponibles
type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Interface ToastAction
interface ToastAction {
  label: string;                     // Texto del botón
  onClick: () => void;               // Callback al hacer click
  color?: ButtonColor;               // Color del botón
  variant?: ButtonVariant;           // Variante del botón
}

// Interface ToastRef
interface ToastRef {
  id: string;                        // ID único del toast
  close(): void;                     // Cerrar el toast
  update(options: Partial<ToastOptions & { 
    type?: ToastType; 
    message?: string; 
  }>): void;                         // Actualizar el toast
  afterClosed(): Observable<void>;   // Observable que emite al cerrar
}`,
          language: 'typescript',
        },
        {
          title: 'components.toast.api.usageCodeTitle',
          code: `// Ejemplo completo de uso
import { Component, inject } from '@angular/core';
import { ToastService } from 'nui';

@Component({
  selector: 'app-example',
  template: \`
    <nui-button (onClick)="showSuccessToast()">Success</nui-button>
    <nui-button (onClick)="showLoadingToast()">Loading</nui-button>
    <nui-button (onClick)="showToastWithActions()">With Actions</nui-button>
  \`
})
export class ExampleComponent {
  private toastService = inject(ToastService);
  
  showSuccessToast(): void {
    this.toastService.success('Operación completada exitosamente', {
      title: 'Éxito',
      position: 'top-right',
      timeout: 5000,
      closeable: true,
      progressBar: true,
      pauseOnHover: true
    });
  }
  
  async showLoadingToast(): Promise<void> {
    const toastRef = this.toastService.loading('Procesando solicitud...', {
      title: 'Cargando',
      position: 'top-center',
      timeout: 0 // Persistente
    });
    
    try {
      // Simular operación asíncrona
      await this.someAsyncOperation();
      
      // Actualizar a éxito
      toastRef.update({
        type: 'success',
        message: 'Operación completada',
        timeout: 3000
      });
    } catch (error) {
      // Actualizar a error
      toastRef.update({
        type: 'error',
        message: 'Error en la operación',
        timeout: 5000
      });
    }
  }
  
  showToastWithActions(): void {
    const toastRef = this.toastService.warning(
      'Este elemento será eliminado permanentemente',
      {
        title: 'Confirmar Eliminación',
        position: 'bottom-center',
        timeout: 0,
        actions: [
          {
            label: 'Cancelar',
            onClick: () => {
              console.log('Acción cancelada');
              toastRef.close();
            },
            variant: 'outline'
          },
          {
            label: 'Eliminar',
            onClick: () => {
              console.log('Eliminando...');
              this.deleteItem();
              toastRef.close();
            },
            color: 'danger'
          }
        ]
      }
    );
    
    // Suscribirse al cierre
    toastRef.afterClosed().subscribe(() => {
      console.log('Toast cerrado');
    });
  }
  
  private async someAsyncOperation(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  private deleteItem(): void {
    console.log('Item eliminado');
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.toast.styling.title',
      description: 'components.toast.styling.description',
      anchor: 'estilos',
      examples: [
        {
          title: 'components.toast.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Contenedor del toast */
  --nui-toast-bg: var(--nui-bg-primary);
  --nui-toast-text: var(--nui-text-primary);
  --nui-toast-border: var(--nui-border-primary);
  --nui-toast-border-radius: var(--border-radius-lg);
  --nui-toast-shadow: var(--nui-shadow-xl);
  --nui-toast-padding: var(--spacing-md);
  --nui-toast-min-width: 300px;
  --nui-toast-max-width: 500px;
  
  /* Z-index */
  --nui-toast-z-index: 9999;
  
  /* Espaciado entre toasts */
  --nui-toast-gap: var(--spacing-sm);
  
  /* Título */
  --nui-toast-title-font-size: var(--font-size-md);
  --nui-toast-title-font-weight: var(--font-weight-semibold);
  --nui-toast-title-color: var(--nui-text-primary);
  --nui-toast-title-margin-bottom: var(--spacing-xs);
  
  /* Mensaje */
  --nui-toast-message-font-size: var(--font-size-sm);
  --nui-toast-message-color: var(--nui-text-secondary);
  --nui-toast-message-line-height: 1.5;
  
  /* Icono */
  --nui-toast-icon-size: 20px;
  --nui-toast-icon-margin-right: var(--spacing-sm);
  
  /* Botón de cierre */
  --nui-toast-close-button-size: 20px;
  --nui-toast-close-button-color: var(--nui-text-tertiary);
  --nui-toast-close-button-hover-color: var(--nui-text-primary);
  
  /* Barra de progreso */
  --nui-toast-progress-bar-height: 4px;
  --nui-toast-progress-bar-bg: rgba(255, 255, 255, 0.3);
  --nui-toast-progress-bar-color: currentColor;
  
  /* Colores por tipo */
  --nui-toast-success-color: var(--success-color);
  --nui-toast-success-bg: var(--success-bg-subtle);
  --nui-toast-success-border: var(--success-border);
  
  --nui-toast-error-color: var(--danger-color);
  --nui-toast-error-bg: var(--danger-bg-subtle);
  --nui-toast-error-border: var(--danger-border);
  
  --nui-toast-warning-color: var(--warning-color);
  --nui-toast-warning-bg: var(--warning-bg-subtle);
  --nui-toast-warning-border: var(--warning-border);
  
  --nui-toast-info-color: var(--info-color);
  --nui-toast-info-bg: var(--info-bg-subtle);
  --nui-toast-info-border: var(--info-border);
  
  /* Animaciones */
  --nui-toast-animation-duration: 300ms;
  --nui-toast-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

// Ejemplo de toast estilo iOS
.ios-toast {
  --nui-toast-bg: rgba(255, 255, 255, 0.95);
  --nui-toast-border: none;
  --nui-toast-border-radius: 14px;
  --nui-toast-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  --nui-toast-padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

// Ejemplo de toast compacto
.compact-toast {
  --nui-toast-padding: var(--spacing-sm) var(--spacing-md);
  --nui-toast-min-width: 200px;
  --nui-toast-title-font-size: var(--font-size-sm);
  --nui-toast-message-font-size: var(--font-size-xs);
  --nui-toast-icon-size: 16px;
}

// Ejemplo con animación personalizada
@keyframes toastSlideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-toast {
  animation: toastSlideInRight var(--nui-toast-animation-duration) var(--nui-toast-animation-timing);
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
