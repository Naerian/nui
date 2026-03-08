import { ComponentSection } from '../../../../core/models';

export const PROGRESS_BAR_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-colors',
    title: 'components.progressBar.theming.colors.title',
    description: 'components.progressBar.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: [
        'common.tables.cssVariable',
        'common.tables.description',
      ],
      rows: [
        ['<code>--nui-pb-track-bg</code>', 'Color de fondo del track (resuelto por tema y variante)'],
        ['<code>--nui-pb-track-border</code>', 'Color de borde del track'],
        ['<code>--nui-pb-fill-bg</code>', 'Color de fondo del fill'],
        ['<code>--nui-pb-fill-hover-bg</code>', 'Color de fondo del fill en hover'],
        ['<code>--nui-pb-text</code>', 'Color del texto dentro del fill (inside)'],
        ['<code>--nui-pb-value-text</code>', 'Color del texto del valor fuera del fill'],
        ['<code>--nui-pb-label-text</code>', 'Color del texto de la etiqueta'],
      ],
    },
  },
  {
    id: 'theming-sizes',
    title: 'components.progressBar.theming.sizes.title',
    description: 'components.progressBar.theming.sizes.description',
    anchor: 'theming-sizes',
    table: {
      headers: [
        'common.tables.cssVariable',
        'common.tables.defaultValue',
        'common.tables.description',
      ],
      rows: [
        ['<code>--nui-pb-height-xs</code>', '0.25rem', 'Altura de la barra en tamaño xs'],
        ['<code>--nui-pb-height-sm</code>', '0.375rem', 'Altura de la barra en tamaño sm'],
        ['<code>--nui-pb-height-md</code>', '0.5rem', 'Altura de la barra en tamaño md'],
        ['<code>--nui-pb-height-lg</code>', '0.75rem', 'Altura de la barra en tamaño lg'],
        ['<code>--nui-pb-height-xl</code>', '1rem', 'Altura de la barra en tamaño xl'],
        ['<code>--nui-pb-border-width</code>', 'var(--nui-border-width-xs)', 'Anchura del borde del track'],
        ['<code>--nui-pb-transition-duration</code>', '0.3s', 'Duración de la transición del fill'],
        ['<code>--nui-pb-indeterminate-duration</code>', '1.5s', 'Duración del ciclo de animación indeterminada'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.scss',
        code: `/* Sobreescribir tokens en tu componente */
nui-progress-bar {
  --nui-pb-height-md: 0.75rem;
  --nui-pb-indeterminate-duration: 2s;
}`,
        language: 'scss',
      },
    ],
  },
];
