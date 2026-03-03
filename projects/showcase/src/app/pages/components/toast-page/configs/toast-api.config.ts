import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Toast
 */
export const TOAST_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-service',
    title: 'components.toast.api.service.title',
    description: 'components.toast.api.service.description',
    anchor: 'api-service',
    table: {
      headers: [
        'common.tables.method',
        'common.tables.parameters',
        'common.tables.returns',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>success()</code>',
          'message: string<br>options?: ToastConfig',
          'ToastRef',
          'Shows success toast notification',
        ],
        [
          '<code>error()</code>',
          'message: string<br>options?: ToastConfig',
          'ToastRef',
          'Shows error toast notification',
        ],
        [
          '<code>warning()</code>',
          'message: string<br>options?: ToastConfig',
          'ToastRef',
          'Shows warning toast notification',
        ],
        [
          '<code>info()</code>',
          'message: string<br>options?: ToastConfig',
          'ToastRef',
          'Shows info toast notification',
        ],
        [
          '<code>loading()</code>',
          'message: string<br>options?: ToastConfig',
          'ToastRef',
          'Shows loading toast that can be updated',
        ],
        ['<code>clear()</code>', '-', 'void', 'Closes all active toasts'],
        ['<code>close()</code>', 'id: string', 'void', 'Closes specific toast by ID'],
      ],
    },
  },
  {
    id: 'api-config',
    title: 'components.toast.api.config.title',
    description: 'components.toast.api.config.description',
    anchor: 'api-config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>type</code>',
          'ToastType',
          '<code class="neutral">undefined</code>',
          'Toast type (success, danger, warning, info)',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Optional toast title',
        ],
        [
          '<code>message</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Toast message text',
        ],
        [
          '<code>icon</code>',
          'boolean | string',
          '<code class="neutral">true</code>',
          'Show icon (true/false) or custom icon class',
        ],
        [
          '<code>iconPosition</code>',
          "'left' | 'top'",
          '<code class="neutral">left</code>',
          'Icon position',
        ],
        [
          '<code>position</code>',
          'ToastPosition',
          '<code class="neutral">top-right</code>',
          'Toast container position',
        ],
        [
          '<code>timeout</code>',
          'number',
          '<code class="neutral">5000</code>',
          'Auto-close timeout in ms (0 = persistent)',
        ],
        [
          '<code>progressBar</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Show progress bar',
        ],
        [
          '<code>closeButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Show close button',
        ],
        [
          '<code>pauseOnHover</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Pause timeout on hover',
        ],
        [
          '<code>closeOnTouch</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Close on click/touch',
        ],
        [
          '<code>action</code>',
          'ToastAction',
          '<code class="neutral">undefined</code>',
          'Primary action button',
        ],
        [
          '<code>actions</code>',
          'ToastAction[]',
          '<code class="neutral">undefined</code>',
          'Multiple action buttons',
        ],
        [
          '<code>toastClass</code>',
          'string | string[]',
          '<code class="neutral">undefined</code>',
          'Extra CSS classes',
        ],
        [
          '<code>animationIn</code>',
          "'slide' | 'fade' | 'bounce' | 'zoom' | 'flip'",
          '<code class="neutral">slide</code>',
          'Entrance animation',
        ],
        [
          '<code>animationOut</code>',
          "'slide' | 'fade' | 'shrink' | 'zoom'",
          '<code class="neutral">fade</code>',
          'Exit animation',
        ],
      ],
    },
  },
  {
    id: 'api-global',
    title: 'components.toast.api.global.title',
    description: 'components.toast.api.global.description',
    anchor: 'api-global',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>position</code>',
          'ToastPosition',
          '<code class="neutral">top-right</code>',
          'Default container position',
        ],
        [
          '<code>timeout</code>',
          'number',
          '<code class="neutral">5000</code>',
          'Default auto-close timeout (ms)',
        ],
        [
          '<code>progressBar</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Show progress bar by default',
        ],
        [
          '<code>closeButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Show close button by default',
        ],
        [
          '<code>icon</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Show icon by default',
        ],
        [
          '<code>iconPosition</code>',
          "'left' | 'top'",
          '<code class="neutral">left</code>',
          'Default icon position',
        ],
        [
          '<code>pauseOnHover</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Pause timeout on hover',
        ],
        [
          '<code>closeOnTouch</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Close on click/touch',
        ],
        [
          '<code>maxToasts</code>',
          'number',
          '<code class="neutral">0</code>',
          'Max visible toasts (0 = unlimited)',
        ],
        [
          '<code>preventDuplicates</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Prevent duplicate messages',
        ],
        [
          '<code>animationIn</code>',
          "'slide' | 'fade' | 'bounce' | 'zoom' | 'flip'",
          '<code class="neutral">slide</code>',
          'Default entrance animation',
        ],
        [
          '<code>animationOut</code>',
          "'slide' | 'fade' | 'shrink' | 'zoom'",
          '<code class="neutral">fade</code>',
          'Default exit animation',
        ],
        [
          '<code>animationDuration</code>',
          'number',
          '<code class="neutral">300</code>',
          'Animation duration (ms)',
        ],
      ],
    },
  },
];
