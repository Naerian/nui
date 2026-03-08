import { ComponentSection } from '../../../../core/models';

export const PROGRESS_BAR_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.progressBar.examples.basic.title',
    description: 'components.progressBar.examples.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar [value]="70" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'compact',
    title: 'components.progressBar.examples.compact.title',
    description: 'components.progressBar.examples.compact.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.compact.note',
    },
    anchor: 'compact',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar [value]="60" compact />
<nui-progress-bar [value]="60" compact color="danger" />
<nui-progress-bar
  [value]="60"
  compact
  color="success"
  trailingIcon="ri-check-line"
/>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'colors',
    title: 'components.progressBar.examples.colors.title',
    description: 'components.progressBar.examples.colors.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.colors.note',
    },
    anchor: 'colors',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar color="primary"   [value]="70" />
<nui-progress-bar color="secondary" [value]="70" />
<nui-progress-bar color="success"   [value]="70" />
<nui-progress-bar color="info"      [value]="70" />
<nui-progress-bar color="warning"   [value]="70" />
<nui-progress-bar color="danger"    [value]="70" />
<nui-progress-bar color="accent"    [value]="70" />
<nui-progress-bar color="neutral"   [value]="70" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'variants',
    title: 'components.progressBar.examples.variants.title',
    description: 'components.progressBar.examples.variants.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.variants.note',
    },
    anchor: 'variants',
    examples: [
      {
        title: 'Solid',
        code: `<nui-progress-bar variant="solid" color="primary" [value]="70" />`,
        language: 'html',
      },
      {
        title: 'Outline',
        code: `<nui-progress-bar variant="outline" color="primary" [value]="70" />`,
        language: 'html',
      },
      {
        title: 'Ghost',
        code: `<nui-progress-bar variant="ghost" color="primary" [value]="70" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'indeterminate',
    title: 'components.progressBar.examples.indeterminate.title',
    description: 'components.progressBar.examples.indeterminate.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.indeterminate.note',
    },
    anchor: 'indeterminate',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar [indeterminate]="true" />
<nui-progress-bar [indeterminate]="true" color="success" />
<nui-progress-bar [indeterminate]="true" variant="outline" color="warning" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'value-positions',
    title: 'components.progressBar.examples.valuePositions.title',
    description: 'components.progressBar.examples.valuePositions.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.valuePositions.note',
    },
    anchor: 'value-positions',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar [value]="70" valuePosition="inside" />
<nui-progress-bar [value]="70" valuePosition="top" />
<nui-progress-bar [value]="70" valuePosition="bottom" />
<nui-progress-bar [value]="70" valuePosition="left" />
<nui-progress-bar [value]="70" valuePosition="right" />
<nui-progress-bar [value]="70" valuePosition="hidden" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'value-format',
    title: 'components.progressBar.examples.valueFormat.title',
    description: 'components.progressBar.examples.valueFormat.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.valueFormat.note',
    },
    anchor: 'value-format',
    examples: [
      {
        title: 'Percentage',
        code: `<nui-progress-bar [value]="35" [maxValue]="100" valueFormat="percentage" />`,
        language: 'html',
      },
      {
        title: 'Fractional',
        code: `<nui-progress-bar [value]="35" [maxValue]="100" valueFormat="fractional" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'label',
    title: 'components.progressBar.examples.label.title',
    description: 'components.progressBar.examples.label.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.label.note',
    },
    anchor: 'label',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar [value]="60" label="Uploading file..." labelPosition="top" />
<nui-progress-bar [value]="60" label="Uploading file..." labelPosition="bottom" />
<nui-progress-bar [value]="60" label="Uploading" labelPosition="left" />
<nui-progress-bar [value]="60" label="60%" labelPosition="right" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'combined',
    title: 'components.progressBar.examples.combined.title',
    description: 'components.progressBar.examples.combined.description',
    anchor: 'combined',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar
  [value]="60"
  label="Storage used"
  showValueInLabel
  labelPosition="top"
/>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'icons',
    title: 'components.progressBar.examples.icons.title',
    description: 'components.progressBar.examples.icons.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.icons.note',
    },
    anchor: 'icons',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar
  [value]="80"
  label="Upload"
  prefixIcon="ri-upload-cloud-2-line"
  labelPosition="top"
/>
<nui-progress-bar
  [value]="45"
  label="Download"
  suffixIcon="ri-download-cloud-2-line"
  showValueInLabel
  labelPosition="left"
/>
<nui-progress-bar
  [value]="65"
  label="Syncing..."
  prefixIcon="ri-refresh-line"
  trailingIcon="ri-check-fill"
  labelPosition="left"
/>
<nui-progress-bar
  [value]="65"
  label="Sync"
  prefixIcon="ri-refresh-line"
  suffixIcon="ri-check-line"
  labelPosition="top"
/>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'custom-colors',
    title: 'components.progressBar.examples.customColors.title',
    description: 'components.progressBar.examples.customColors.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.customColors.note',
    },
    anchor: 'custom-colors',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-progress-bar
  [value]="65"
  trackColor="#e8f4fc"
  fillColor="#2196f3"
  textColor="#0d47a1"
/>`,
        language: 'html',
      },
    ],
  },
];
