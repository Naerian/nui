import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la sección API del componente Popover
 */
export const POPOVER_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.popover.api.inputs.title',
    description: 'components.popover.api.inputs.description',
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
          '<code>nuiPopover</code>',
          'string | TemplateRef<PopoverContext> | Type<any>',
          '<code class="neutral">undefined</code>',
          'Texto simple, template o componente dinámico',
        ],
        [
          '<code>nuiPopoverPosition</code>',
          "'top' | 'bottom' | 'left' | 'right'",
          '<code class="neutral">top</code>',
          'Posición del popover respecto al elemento trigger',
        ],
        [
          '<code>nuiPopoverEvent</code>',
          "'hover' | 'click' | 'focus'",
          '<code class="neutral">click</code>',
          'Evento que dispara el popover',
        ],
        [
          '<code>nuiPopoverColor</code>',
          'NUIColor',
          '<code class="neutral">null</code>',
          'primary, danger, warning, success, info',
        ],
        [
          '<code>nuiPopoverVariant</code>',
          'NUIVariant',
          '<code class="neutral">null</code>',
          'solid, outline, ghost',
        ],
        [
          '<code>nuiPopoverShowDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay en ms antes de mostrar el popover',
        ],
        [
          '<code>nuiPopoverHideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay en ms antes de ocultar el popover. Para event="hover" sin hideDelay configurado, se aplica automáticamente 100ms',
        ],
        [
          '<code>nuiPopoverDisabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Desactiva el popover completamente',
        ],
        [
          '<code>nuiPopoverClass</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Clase CSS personalizada para el contenedor del popover',
        ],
        [
          '<code>nuiPopoverShowArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Muestra una flecha apuntando al elemento trigger',
        ],
        [
          '<code>nuiPopoverCloseOnClickOutside</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Cierra el popover al hacer click fuera de él',
        ],
        [
          '<code>nuiPopoverCloseOnEscape</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Cierra el popover al presionar la tecla Escape',
        ],
        [
          '<code>nuiPopoverMaxWidth</code>',
          'string',
          '<code class="neutral">\'300px\'</code>',
          'Ancho máximo del popover (CSS value)',
        ],
        [
          '<code>nuiPopoverMinWidth</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Ancho mínimo del popover (CSS value)',
        ],
        [
          '<code>nuiPopoverOffset</code>',
          'number',
          '<code class="neutral">8</code>',
          'Separación en píxeles del popover respecto al elemento trigger',
        ],
        [
          '<code>nuiPopoverData</code>',
          'any',
          '<code class="neutral">undefined</code>',
          'Datos para pasar al componente dinámico o template',
        ],
        [
          '<code>nuiPopoverAllowMultiple</code>',
          'boolean',
          '<code class="neutral">undefined</code>',
          'Permite múltiples popovers abiertos simultáneamente. Si es false, al abrir un popover se cierran los demás',
        ],
        [
          '<code>nuiPopoverBackdrop</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Muestra un backdrop (fondo oscuro) detrás del popover',
        ],
        [
          '<code>nuiBackdropClose</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Cierra el popover al hacer click en el backdrop (solo si <code>nuiPopoverBackdrop</code>=true)',
        ],
        [
          '<code>nuiPopoverZIndex</code>',
          'number',
          '<code class="neutral">1000</code>',
          'Z-index del popover para controlar el orden de apilamiento',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.popover.api.outputs.title',
    description: 'components.popover.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>nuiPopoverShow</code>',
          'EventEmitter<void>',
          'Se emite cuando el popover se muestra',
        ],
        [
          '<code>nuiPopoverHide</code>',
          'EventEmitter<void>',
          'Se emite cuando el popover se oculta',
        ],
      ],
    },
  },
  {
    id: 'api-config',
    title: 'components.popover.api.config.title',
    description: 'components.popover.api.config.description',
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
          '<code>position</code>',
          'PopoverPosition',
          '<code class="neutral">top</code>',
          'Posición del popover respecto al elemento',
        ],
        [
          '<code>event</code>',
          'PopoverEvent',
          '<code class="neutral">click</code>',
          'Evento que dispara el popover',
        ],
        [
          '<code>showDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay antes de mostrar el popover (ms)',
        ],
        [
          '<code>hideDelay</code>',
          'number',
          '<code class="neutral">0</code>',
          'Delay antes de ocultar el popover (ms)',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Desactiva el popover',
        ],
        [
          '<code>popoverClass</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Clase CSS personalizada para el popover',
        ],
        [
          '<code>showArrow</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Muestra una flecha apuntando al elemento',
        ],
        [
          '<code>closeOnClickOutside</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Cierra el popover al hacer click fuera',
        ],
        [
          '<code>closeOnEscape</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'Cierra el popover al presionar Escape',
        ],
        [
          '<code>maxWidth</code>',
          'string',
          '<code class="neutral">\'300px\'</code>',
          'Ancho máximo del popover (CSS value)',
        ],
        [
          '<code>minWidth</code>',
          'string',
          '<code class="neutral">undefined</code>',
          'Ancho mínimo del popover (CSS value)',
        ],
        [
          '<code>allowMultiple</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'Permite múltiples popovers abiertos simultáneamente',
        ],
      ],
    },
  },
  {
    id: 'api-context',
    title: 'components.popover.api.context.title',
    description: 'components.popover.api.context.description',
    anchor: 'api-context',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>close</code>', '() => void', 'Función para cerrar el popover desde el contenido'],
        [
          '<code>data</code>',
          'any',
          'Datos opcionales pasados al popover desde el componente padre',
        ],
      ],
    },
  },
  {
    id: 'api-tokens',
    title: 'components.popover.api.tokens.title',
    description: 'components.popover.api.tokens.description',
    anchor: 'api-tokens',
    table: {
      headers: ['Token', 'Tipo', 'Descripción'],
      rows: [
        [
          '<code>POPOVER_DATA</code>',
          'InjectionToken<any>',
          'Token para inyectar los datos pasados al popover dinámico',
        ],
        [
          '<code>POPOVER_CLOSE</code>',
          'InjectionToken<() => void>',
          'Token para inyectar la función que cierra el popover',
        ],
      ],
    },
  },
];
