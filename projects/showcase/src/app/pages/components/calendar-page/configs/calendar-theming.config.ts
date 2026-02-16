import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Theming del componente Calendar
 * Documenta variables CSS y personalización
 */
export const CALENDAR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.calendar.theming.colors.title',
    description: 'components.calendar.theming.colors.description',
    anchor: 'theming-colors',
    note: {
      type: 'info',
      icon: 'ri-palette-line',
      content: 'components.calendar.theming.colors.note',
    },
    examples: [
      {
        title: 'Variables de color del calendario',
        code: `.nui-calendar {
  /* El calendario usa principalmente las variables del tema global */
  background-color: var(--nui-bg-primary);
  color: var(--nui-text-primary);
  border-color: var(--nui-border-primary);
  
  /* Días seleccionados usan el color primario del tema */
  --nui-color-primary: /* Color del tema activo */;
  --nui-color-primary-hover: /* Color hover del tema */;
  --nui-color-primary-contrast: /* Color de contraste del tema */;
}`,
        language: 'scss',
      },
    ],
  },
  {
    id: 'theming-sizes',
    title: 'components.calendar.theming.sizes.title',
    description: 'components.calendar.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.values'],
      rows: [
        [
          '<code>--calendar-width-xs</code>',
          'Ancho del calendario en tamaño extra pequeño',
          '200px',
        ],
        ['<code>--calendar-padding-xs</code>', 'Padding interno en tamaño xs', '0.5rem'],
        ['<code>--calendar-gap-xs</code>', 'Espaciado entre elementos en xs', '0.25rem'],
        ['<code>--calendar-day-size-xs</code>', 'Tamaño de los días en xs', '1.5rem'],
        ['<code>--calendar-day-font-size-xs</code>', 'Tamaño de fuente de días en xs', '0.6875rem'],
        
        ['<code>--calendar-width-sm</code>', 'Ancho del calendario en tamaño pequeño', '260px'],
        ['<code>--calendar-padding-sm</code>', 'Padding interno en tamaño sm', '0.75rem'],
        ['<code>--calendar-gap-sm</code>', 'Espaciado entre elementos en sm', '0.375rem'],
        ['<code>--calendar-day-size-sm</code>', 'Tamaño de los días en sm', '2rem'],
        ['<code>--calendar-day-font-size-sm</code>', 'Tamaño de fuente de días en sm', '0.8125rem'],
        
        ['<code>--calendar-width-md</code>', 'Ancho del calendario en tamaño mediano', '320px'],
        ['<code>--calendar-padding-md</code>', 'Padding interno en tamaño md', '1rem'],
        ['<code>--calendar-gap-md</code>', 'Espaciado entre elementos en md', '0.5rem'],
        ['<code>--calendar-day-size-md</code>', 'Tamaño de los días en md', '2.5rem'],
        ['<code>--calendar-day-font-size-md</code>', 'Tamaño de fuente de días en md', '0.875rem'],
        
        ['<code>--calendar-width-lg</code>', 'Ancho del calendario en tamaño grande', '380px'],
        ['<code>--calendar-padding-lg</code>', 'Padding interno en tamaño lg', '1.25rem'],
        ['<code>--calendar-gap-lg</code>', 'Espaciado entre elementos en lg', '0.625rem'],
        ['<code>--calendar-day-size-lg</code>', 'Tamaño de los días en lg', '3rem'],
        ['<code>--calendar-day-font-size-lg</code>', 'Tamaño de fuente de días en lg', '1rem'],
        
        ['<code>--calendar-width-xl</code>', 'Ancho del calendario en tamaño extra grande', '440px'],
        ['<code>--calendar-padding-xl</code>', 'Padding interno en tamaño xl', '1.5rem'],
        ['<code>--calendar-gap-xl</code>', 'Espaciado entre elementos en xl', '0.75rem'],
        ['<code>--calendar-day-size-xl</code>', 'Tamaño de los días en xl', '3.5rem'],
        ['<code>--calendar-day-font-size-xl</code>', 'Tamaño de fuente de días en xl', '1.125rem'],
      ],
    },
  },
  {
    id: 'theming-structure',
    title: 'components.calendar.theming.structure.title',
    description: 'components.calendar.theming.structure.description',
    anchor: 'theming-structure',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--calendar-tabs-border-width</code>',
          'Grosor del borde de las pestañas',
          '1px',
        ],
        [
          '<code>--calendar-day-border-width</code>',
          'Grosor del borde de los días',
          '1px',
        ],
        [
          '<code>--calendar-day-other-month-opacity</code>',
          'Opacidad de días de otros meses',
          '0.4',
        ],
        [
          '<code>--calendar-preset-border-width</code>',
          'Grosor del borde de los presets',
          '1px',
        ],
        [
          '<code>--calendar-preset-hover-translateY</code>',
          'Desplazamiento en Y al hacer hover en preset',
          '-2px',
        ],
        [
          '<code>--calendar-preset-active-translateY</code>',
          'Desplazamiento en Y al activar preset',
          '-4px',
        ],
        [
          '<code>--calendar-focus-outline-width</code>',
          'Grosor del outline de foco',
          '2px',
        ],
        [
          '<code>--calendar-focus-outline-offset</code>',
          'Offset del outline de foco',
          '2px',
        ],
        [
          '<code>--calendar-full-min-width</code>',
          'Ancho mínimo en modo full',
          '280px',
        ],
      ],
    },
  },
  {
    id: 'theming-customization',
    title: 'components.calendar.theming.customization.title',
    description: 'components.calendar.theming.customization.description',
    anchor: 'theming-customization',
    examples: [
      {
        title: 'Personalización con SCSS',
        code: `@use '@nui/styles/variables/calendar-vars';

.my-custom-calendar {
  @include calendar-vars.nui-calendar-vars;
  
  // Personalizar colores
  --nui-color-primary: #ff6b6b;
  --nui-color-primary-contrast: #ffffff;
  
  // Personalizar tamaños
  --calendar-day-size-md: 3rem;
  --calendar-gap-md: 0.75rem;
  
  // Personalizar animaciones
  --nui-transition-fast: 0.15s ease-in-out;
}`,
        language: 'scss',
      },
      {
        title: 'Personalización desde TypeScript',
        code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-calendar',
  template: \`
    <nui-calendar
      class="custom-theme"
      [type]="CalendarType.DAY"
    ></nui-calendar>
  \`,
  styles: [\`
    :host ::ng-deep .custom-theme {
      --nui-color-primary: #4ecdc4;
      --calendar-day-size-md: 3.5rem;
      --calendar-gap-md: 1rem;
    }
  \`]
})
export class CustomCalendarComponent {}`,
        language: 'typescript',
      },
    ],
  },
];
