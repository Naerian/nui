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
  ],
};
