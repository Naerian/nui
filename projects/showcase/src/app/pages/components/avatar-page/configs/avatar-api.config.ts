import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Avatar
 * Dividido en Inputs y Outputs para mejor organización
 */
export const AVATAR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.avatar.api.inputs.title',
    description: 'components.avatar.api.inputs.description',
    anchor: 'api-inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>src</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'URL de la imagen del avatar',
        ],
        [
          '<code>alt</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Texto alternativo (se usa para generar iniciales si no hay src)',
        ],
        [
          '<code>initials</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Iniciales a mostrar (sobrescribe las generadas desde alt)',
        ],
        [
          '<code>icon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Clase de icono RemixIcon a mostrar',
        ],
        ['<code>size</code>', 'NUISize', "'md'", 'Tamaño predefinido del avatar'],
        [
          '<code>customSize</code>',
          'number',
          '<code class="neutral">undefined</code>',
          'Tamaño personalizado en píxeles (sobrescribe size)',
        ],
        [
          '<code>variant</code>',
          "'circular' | 'rounded' | 'square'",
          "'circular'",
          'Forma del avatar',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">undefined</code>',
          'Color de fondo cuando no hay imagen (acepta colores del tema o personalizados)',
        ],
        [
          '<code>textColor</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Color del texto/icono (se calcula automáticamente si no se especifica)',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.avatar.api.outputs.title',
    description: 'components.avatar.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>imageError</code>',
          'EventEmitter<Event>',
          'Emitido cuando la imagen no se puede cargar. El componente automáticamente muestra el fallback.',
        ],
      ],
    },
  },
];
