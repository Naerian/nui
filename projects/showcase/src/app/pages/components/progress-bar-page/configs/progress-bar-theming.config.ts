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
        ['<code>--nui-pb-track-bg</code>', 'components.progressBar.theming.colors.rows.trackBg.description'],
        ['<code>--nui-pb-track-border</code>', 'components.progressBar.theming.colors.rows.trackBorder.description'],
        ['<code>--nui-pb-fill-bg</code>', 'components.progressBar.theming.colors.rows.fillBg.description'],
        ['<code>--nui-pb-fill-hover-bg</code>', 'components.progressBar.theming.colors.rows.fillHoverBg.description'],
        ['<code>--nui-pb-text</code>', 'components.progressBar.theming.colors.rows.text.description'],
        ['<code>--nui-pb-value-text</code>', 'components.progressBar.theming.colors.rows.valueText.description'],
        ['<code>--nui-pb-label-text</code>', 'components.progressBar.theming.colors.rows.labelText.description'],
        ['<code>--nui-pb-step-divider</code>', 'components.progressBar.theming.colors.rows.stepDivider.description'],
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
        ['<code>--nui-pb-height-xs</code>', '0.25rem', 'components.progressBar.theming.sizes.rows.heightXs.description'],
        ['<code>--nui-pb-height-sm</code>', '0.375rem', 'components.progressBar.theming.sizes.rows.heightSm.description'],
        ['<code>--nui-pb-height-md</code>', '0.5rem', 'components.progressBar.theming.sizes.rows.heightMd.description'],
        ['<code>--nui-pb-height-lg</code>', '0.75rem', 'components.progressBar.theming.sizes.rows.heightLg.description'],
        ['<code>--nui-pb-height-xl</code>', '1rem', 'components.progressBar.theming.sizes.rows.heightXl.description'],
        ['<code>--nui-pb-border-width</code>', 'var(--nui-border-width-xs)', 'components.progressBar.theming.sizes.rows.borderWidth.description'],
        ['<code>--nui-pb-transition-duration</code>', '0.3s', 'components.progressBar.theming.sizes.rows.transitionDuration.description'],
        ['<code>--nui-pb-indeterminate-duration</code>', '1.5s', 'components.progressBar.theming.sizes.rows.indeterminateDuration.description'],
        ['<code>--nui-pb-step-width</code>', '0.188rem', 'components.progressBar.theming.sizes.rows.stepWidth.description'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.scss',
        code: `/* Sobreescribir tokens en tu componente */
nui-progress-bar {
  --nui-pb-height-md: 0.75rem;
  --nui-pb-indeterminate-duration: 2s;
  --nui-pb-step-width: 4px;
}`,
        language: 'scss',
      },
    ],
  },
];
