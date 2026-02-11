import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Button Group
 * Dividido en Inputs y Outputs para mejor organización
 */
export const BUTTON_GROUP_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.buttonGroup.api.inputs.title',
    description: 'components.buttonGroup.api.inputs.description',
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
          '<code>options</code>',
          'T[]',
          '<code class="neutral">[]</code>',
          'Array de opciones (strings simples u objetos complejos)',
        ],
        [
          '<code>mode</code>',
          "'radio' | 'checkbox'",
          '<code class="neutral">radio</code>',
          'Tipo de selección: única (radio) o múltiple (checkbox)',
        ],
        [
          '<code>labelBy</code>',
          'keyof T',
          '<code class="neutral">undefined</code>',
          'Propiedad del objeto a usar como etiqueta (solo para objetos)',
        ],
        [
          '<code>valueBy</code>',
          'keyof T',
          '<code class="neutral">undefined</code>',
          'Propiedad del objeto a usar como valor (solo para objetos)',
        ],
        [
          '<code>iconBy</code>',
          'keyof T',
          '<code class="neutral">undefined</code>',
          'Propiedad del objeto con la clase de icono RemixIcon',
        ],
        [
          '<code>disabledBy</code>',
          'keyof T',
          '<code class="neutral">undefined</code>',
          'Propiedad del objeto que indica si está deshabilitado',
        ],
        [
          '<code>iconOnly</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Muestra solo iconos sin texto (botones compactos)',
        ],
        [
          '<code>layout</code>',
          "'default' | 'segmented'",
          '<code class="neutral">default</code>',
          'Estilo visual: default (botones separados) o segmented (iOS style)',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          "Variante del botón: 'solid', 'outline', 'ghost'",
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          "Color del tema: 'primary', 'secondary', 'accent', etc.",
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          "Tamaño: 'xs', 'sm', 'md', 'lg', 'xl'",
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'Ancho del grupo: auto (ajustado) o full (100%)',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Deshabilita todo el grupo de botones',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.buttonGroup.api.outputs.title',
    description: 'components.buttonGroup.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>valueChange</code>',
          'EventEmitter<T | T[]>',
          'Emitido cuando cambia la selección. Retorna valor único (radio) o array (checkbox)',
        ],
      ],
    },
  },
];
