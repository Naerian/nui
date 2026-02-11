import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de theming del Toast
 */
export const TOAST_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-container',
    title: 'components.toast.theming.container.title',
    description: 'components.toast.theming.container.description',
    anchor: 'theming-container',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-bg</code>',
          'Background del toast',
          '<code>var(--nui-bg-primary)</code>',
        ],
        [
          '<code>--nui-toast-text</code>',
          'Color del texto',
          '<code>var(--nui-text-primary)</code>',
        ],
        [
          '<code>--nui-toast-border</code>',
          'Color del borde',
          '<code>var(--nui-border-primary)</code>',
        ],
        [
          '<code>--nui-toast-border-radius</code>',
          'Radio del borde',
          '<code>var(--nui-border-radius-lg)</code>',
        ],
        [
          '<code>--nui-toast-shadow</code>',
          'Sombra del toast',
          '<code>var(--nui-shadow-xl)</code>',
        ],
        [
          '<code>--nui-toast-padding</code>',
          'Padding interno',
          '<code>var(--nui-spacing-md)</code>',
        ],
        [
          '<code>--nui-toast-min-width</code>',
          'Ancho mínimo',
          '<code>300px</code>',
        ],
        [
          '<code>--nui-toast-max-width</code>',
          'Ancho máximo',
          '<code>500px</code>',
        ],
        [
          '<code>--nui-toast-z-index</code>',
          'Z-index del contenedor',
          '<code>9999</code>',
        ],
        [
          '<code>--nui-toast-gap</code>',
          'Espaciado entre toasts',
          '<code>var(--nui-spacing-sm)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-typography',
    title: 'components.toast.theming.typography.title',
    description: 'components.toast.theming.typography.description',
    anchor: 'theming-typography',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-title-font-size</code>',
          'Tamaño del título',
          '<code>var(--nui-font-size-md)</code>',
        ],
        [
          '<code>--nui-toast-title-font-weight</code>',
          'Peso del título',
          '<code>var(--nui-font-weight-semibold)</code>',
        ],
        [
          '<code>--nui-toast-title-color</code>',
          'Color del título',
          '<code>var(--nui-text-primary)</code>',
        ],
        [
          '<code>--nui-toast-title-margin-bottom</code>',
          'Margen inferior del título',
          '<code>var(--nui-spacing-xs)</code>',
        ],
        [
          '<code>--nui-toast-message-font-size</code>',
          'Tamaño del mensaje',
          '<code>var(--nui-font-size-sm)</code>',
        ],
        [
          '<code>--nui-toast-message-color</code>',
          'Color del mensaje',
          '<code>var(--nui-text-secondary)</code>',
        ],
        [
          '<code>--nui-toast-message-line-height</code>',
          'Altura de línea del mensaje',
          '<code>1.5</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-icon',
    title: 'components.toast.theming.icon.title',
    description: 'components.toast.theming.icon.description',
    anchor: 'theming-icon',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-icon-size</code>',
          'Tamaño del icono',
          '<code>20px</code>',
        ],
        [
          '<code>--nui-toast-icon-margin-right</code>',
          'Margen derecho del icono',
          '<code>var(--nui-spacing-sm)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-close',
    title: 'components.toast.theming.close.title',
    description: 'components.toast.theming.close.description',
    anchor: 'theming-close',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-close-button-size</code>',
          'Tamaño del botón de cierre',
          '<code>20px</code>',
        ],
        [
          '<code>--nui-toast-close-button-color</code>',
          'Color del botón',
          '<code>var(--nui-text-tertiary)</code>',
        ],
        [
          '<code>--nui-toast-close-button-hover-color</code>',
          'Color en hover',
          '<code>var(--nui-text-primary)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-progress',
    title: 'components.toast.theming.progress.title',
    description: 'components.toast.theming.progress.description',
    anchor: 'theming-progress',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-progress-bar-height</code>',
          'Altura de la barra de progreso',
          '<code>4px</code>',
        ],
        [
          '<code>--nui-toast-progress-bar-bg</code>',
          'Background de la barra',
          '<code>rgba(255, 255, 255, 0.3)</code>',
        ],
        [
          '<code>--nui-toast-progress-bar-color</code>',
          'Color de progreso',
          '<code>currentColor</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-types',
    title: 'components.toast.theming.types.title',
    description: 'components.toast.theming.types.description',
    anchor: 'theming-types',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-success-color</code>',
          'Color de toast success',
          '<code>var(--success-color)</code>',
        ],
        [
          '<code>--nui-toast-success-bg</code>',
          'Background de toast success',
          '<code>var(--success-bg-subtle)</code>',
        ],
        [
          '<code>--nui-toast-success-border</code>',
          'Borde de toast success',
          '<code>var(--success-border)</code>',
        ],
        [
          '<code>--nui-toast-error-color</code>',
          'Color de toast error',
          '<code>var(--danger-color)</code>',
        ],
        [
          '<code>--nui-toast-error-bg</code>',
          'Background de toast error',
          '<code>var(--danger-bg-subtle)</code>',
        ],
        [
          '<code>--nui-toast-error-border</code>',
          'Borde de toast error',
          '<code>var(--danger-border)</code>',
        ],
        [
          '<code>--nui-toast-warning-color</code>',
          'Color de toast warning',
          '<code>var(--warning-color)</code>',
        ],
        [
          '<code>--nui-toast-warning-bg</code>',
          'Background de toast warning',
          '<code>var(--warning-bg-subtle)</code>',
        ],
        [
          '<code>--nui-toast-warning-border</code>',
          'Borde de toast warning',
          '<code>var(--warning-border)</code>',
        ],
        [
          '<code>--nui-toast-info-color</code>',
          'Color de toast info',
          '<code>var(--info-color)</code>',
        ],
        [
          '<code>--nui-toast-info-bg</code>',
          'Background de toast info',
          '<code>var(--info-bg-subtle)</code>',
        ],
        [
          '<code>--nui-toast-info-border</code>',
          'Borde de toast info',
          '<code>var(--info-border)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-animations',
    title: 'components.toast.theming.animations.title',
    description: 'components.toast.theming.animations.description',
    anchor: 'theming-animations',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-animation-duration</code>',
          'Duración de animaciones',
          '<code>300ms</code>',
        ],
        [
          '<code>--nui-toast-animation-timing</code>',
          'Función de timing',
          '<code>cubic-bezier(0.4, 0, 0.2, 1)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-examples',
    title: 'components.toast.theming.examples.title',
    description: 'components.toast.theming.examples.description',
    anchor: 'theming-examples',
    examples: [
      {
        title: 'codeExamples.cssVariables',
        code: `// Example of an iOS-style toast
.ios-toast {
  --nui-toast-bg: rgba(255, 255, 255, 0.95);
  --nui-toast-border: none;
  --nui-toast-border-radius: 14px;
  --nui-toast-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  --nui-toast-padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

// Example of a compact toast
.compact-toast {
  --nui-toast-padding: var(--nui-spacing-sm) var(--nui-spacing-md);
  --nui-toast-min-width: 200px;
  --nui-toast-title-font-size: var(--nui-font-size-sm);
  --nui-toast-message-font-size: var(--nui-font-size-xs);
  --nui-toast-icon-size: 16px;
}

// Example with custom animation
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
];
