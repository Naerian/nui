import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de API del Action Menu
 * Dividido en Inputs, Outputs e Interfaces para mejor organización
 */
export const ACTION_MENU_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.actionMenu.api.inputs.title',
    description: 'components.actionMenu.api.inputs.description',
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
          '<code>items</code>',
          'ActionMenuItem[]',
          '<code class="neutral">[]</code>',
          'Array de items del menú',
        ],
        [
          '<code>type</code>',
          "'static' | 'dynamic'",
          '<code class="neutral">dynamic</code>',
          'Modo de renderizado del menú',
        ],
        [
          '<code>color</code>',
          'NUIColor',
          '<code class="neutral">primary</code>',
          'Color del botón trigger',
        ],
        [
          '<code>size</code>',
          'NUISize',
          '<code class="neutral">md</code>',
          'Tamaño del botón trigger',
        ],
        [
          '<code>variant</code>',
          'NUIVariant',
          '<code class="neutral">solid</code>',
          'Variante del botón trigger',
        ],
        [
          '<code>width</code>',
          "'auto' | 'full'",
          '<code class="neutral">auto</code>',
          'Ancho del botón trigger',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Estado deshabilitado del menú',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">""</code>',
          'Título del botón (atributo title)',
        ],
        [
          '<code>label</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Texto del botón trigger',
        ],
        [
          '<code>icon</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Icono del botón (Remix Icon)',
        ],
        [
          '<code>iconPosition</code>',
          "'start' | 'end'",
          '<code class="neutral">start</code>',
          'Posición del icono',
        ],
        [
          '<code>iconSubmenu</code>',
          'string',
          '<code class="neutral">ri-arrow-right-s-line</code>',
          'Icono para indicar submenú',
        ],
        [
          '<code>ariaLabel</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Etiqueta de accesibilidad',
        ],
        [
          '<code>itemTemplate</code>',
          'TemplateRef<any>',
          '<code class="neutral">undefined</code>',
          'Template personalizado para items',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.actionMenu.api.outputs.title',
    description: 'components.actionMenu.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>onItemAction</code>',
          'EventEmitter<ActionMenuItem>',
          'Emitido al hacer clic en un item',
        ],
        [
          '<code>onSelectionChange</code>',
          'EventEmitter<ActionMenuItem>',
          'Emitido al cambiar la selección (modo selector)',
        ],
        ['<code>menuOpen</code>', 'EventEmitter<void>', 'Emitido cuando el menú se abre'],
        ['<code>menuClose</code>', 'EventEmitter<void>', 'Emitido cuando el menú se cierra'],
      ],
    },
  },
  {
    id: 'api-interface',
    title: 'components.actionMenu.api.interface.title',
    description: 'components.actionMenu.api.interface.description',
    anchor: 'api-interface',
    table: {
      headers: [ 'common.tables.property',  'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>action</code>', 'string', 'Identificador único de la acción'],
        ['<code>label</code>', 'string', 'Texto visible del item'],
        ['<code>subtitle</code>', 'string', 'Texto secundario debajo del label'],
        ['<code>title</code>', 'string', 'Texto para el atributo title (tooltip)'],
        ['<code>icon</code>', 'string', 'Clase del icono RemixIcon'],
        ['<code>shortcut</code>', 'string', 'Atajo de teclado (solo visual)'],
        ['<code>templateRef</code>', 'TemplateRef<any>', 'Template personalizado para el item'],
        ['<code>id</code>', 'string', 'ID único del item (autogenerado)'],
        ['<code>children</code>', 'ActionMenuItem[]', 'Items hijos para crear submenús'],
        ['<code>disabled</code>', 'boolean', 'Si está deshabilitado'],
        ['<code>selected</code>', 'boolean', 'Si está seleccionado (muestra checkmark)'],
        ['<code>separator</code>', 'boolean', 'Si es un separador visual'],
        ['<code>onAction</code>', 'Function', 'Callback al hacer clic en el item'],
        [
          '<code>data</code>',
          'any',
          'Datos personalizados adicionales para usar con TemplateRef<any>',
        ],
        ['<code>badge</code>', 'string', 'Badge o contador a mostrar'],
      ],
    },
  },
];
