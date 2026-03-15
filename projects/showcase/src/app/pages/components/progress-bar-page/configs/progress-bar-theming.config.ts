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
        ['<code>--nui-pb-height</code>', '1.25rem', 'components.progressBar.theming.sizes.rows.height.description'],
        ['<code>--nui-pb-height-compact</code>', '0.375rem', 'components.progressBar.theming.sizes.rows.heightCompact.description'],
        ['<code>--nui-pb-radius</code>', 'var(--nui-border-radius-md)', 'components.progressBar.theming.sizes.rows.radius.description'],
        ['<code>--nui-pb-radius-compact</code>', 'var(--nui-border-radius-sm)', 'components.progressBar.theming.sizes.rows.radiusCompact.description'],
        ['<code>--nui-pb-border-width</code>', 'var(--nui-border-width-xs)', 'components.progressBar.theming.sizes.rows.borderWidth.description'],
        ['<code>--nui-pb-font-weight-inside</code>', '600', 'components.progressBar.theming.sizes.rows.fontWeightInside.description'],
        ['<code>--nui-pb-transition-duration</code>', '0.6s', 'components.progressBar.theming.sizes.rows.transitionDuration.description'],
        ['<code>--nui-pb-transition-timing</code>', 'ease', 'components.progressBar.theming.sizes.rows.transitionTiming.description'],
        ['<code>--nui-pb-indeterminate-duration</code>', '1.5s', 'components.progressBar.theming.sizes.rows.indeterminateDuration.description'],
        ['<code>--nui-pb-indeterminate-timing</code>', 'ease-in-out', 'components.progressBar.theming.sizes.rows.indeterminateTiming.description'],
        ['<code>--nui-pb-step-gap</code>', '0rem', 'components.progressBar.theming.sizes.rows.stepGap.description'],
      ],
    },
    examples: [
      {
        title: 'codeExamples.scss',
        code: `/* Override tokens on your component */
nui-progress-bar {
  --nui-pb-height: 1rem;
  --nui-pb-transition-duration: 1s;
  --nui-pb-step-gap: 4px;
}`,
        language: 'scss',
      },
    ],
  },
];
