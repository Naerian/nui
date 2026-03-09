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
<nui-progress-bar [indeterminate]="true" color="success" compact="" />
<nui-progress-bar [indeterminate]="true" color="danger" compact="" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'progress-bar-template',
    title: 'components.progressBar.examples.progress-bar-template.title',
    description: 'components.progressBar.examples.progress-bar-template.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.progress-bar-template.note',
    },
    anchor: 'progress-bar-template',
    examples: [
      {
        title: 'slot="value"',
        code: `<!-- let-percent="percent": named key, local variable name is free -->
<nui-progress-bar [value]="70" valuePosition="right">
  <ng-template nuiPbTemplate slot="value" let-percent="percent">
    @if (percent >= 80) { 🔥 } @else if (percent >= 50) { 🚀 } @else { 🐢 }
    {{ percent | number:'1.0-0' }}%
  </ng-template>
</nui-progress-bar>`,
        language: 'html',
      },
      {
        title: 'slot="label" + slot="value"',
        code: `<!-- Both slots active simultaneously -->
<nui-progress-bar [value]="80" labelPosition="left" valuePosition="right">
  <ng-template nuiPbTemplate slot="label">
    <i class="ri-upload-cloud-2-line"></i> Upload
  </ng-template>
  <ng-template nuiPbTemplate slot="value" let-percent="percent">
    @if (percent >= 100) { OK } @else { {{ percent | number:'1.0-0' }}% }
  </ng-template>
</nui-progress-bar>`,
        language: 'html',
      },
      {
        title: 'slot="label" — $implicit',
        code: `<!-- let-text binds to $implicit — no ="..." needed -->
<nui-progress-bar [value]="3" [maxValue]="5" labelPosition="left" color="success" valuePosition="hidden">
  <ng-template nuiPbTemplate slot="label" let-text>
    <i class="ri-file-line"></i> Files {{ text }}
  </ng-template>
</nui-progress-bar>`,
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
        code: `<nui-progress-bar [value]="80" label="Upload complete" trailingIcon="ri-check-line" color="success" />
<nui-progress-bar [value]="45" label="Syncing..." trailingIcon="ri-loader-line" />
<nui-progress-bar [value]="20" label="Storage critical" trailingIcon="ri-error-warning-line" color="danger" />`,
        language: 'html',
      },
    ],
  },
  {
    id: 'steps',
    title: 'components.progressBar.examples.steps.title',
    description: 'components.progressBar.examples.steps.description',
    note: {
      type: 'info',
      content: 'components.progressBar.examples.steps.note',
    },
    anchor: 'steps',
    examples: [
      {
        title: 'Basic steps',
        code: `<nui-progress-bar [value]="60" [steps]="5" label="Step 3 / 5" labelPosition="top" />
<nui-progress-bar [value]="3" [maxValue]="4" [steps]="4" color="success" valueFormat="fractional" />`,
        language: 'html',
      },
      {
        title: 'Steps + variants',
        code: `<nui-progress-bar [value]="70" [steps]="10" variant="outline" color="warning" />
<nui-progress-bar [value]="70" [steps]="10" variant="ghost" color="info" />`,
        language: 'html',
      },
      {
        title: 'Steps + compact',
        code: `<nui-progress-bar [value]="75" [steps]="4" compact color="danger" trailingIcon="ri-error-warning-line" />`,
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
  textColor="#000ba3"
/>
<nui-progress-bar
  [value]="40"
  trackColor="#fde8e8"
  fillColor="#e53935"
  textColor="#b71c1c"
/>
<nui-progress-bar
  [value]="80"
  trackColor="#e8f5e9"
  fillColor="#43a047"
  textColor="#001c01"
/>
<nui-progress-bar
  [value]="dynamicColorValue().value"
  [trackColor]="dynamicColorValue().trackColor"
  [fillColor]="dynamicColorValue().fillColor"
  [textColor]="dynamicColorValue().textColor"
/>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `// Signal example
dynamicColorValue = signal({
    value: 0,
    trackColor: '#e8f4fc',
    fillColor: '#2196f3',
    textColor: '#0d47a1',
});

// Method for dynamically changing color and value
startProgressAnimation(): void {
    const FILL_DURATION = 8000; // ms for a full 0→100 cycle
    const PAUSE_MS = 2500;      // pause at 100 % before restarting

    const run = (): void => {
      let startTime: number | null = null;

      const animate = (timestamp: number): void => {
        if (startTime === null) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / FILL_DURATION, 1);
        const pct = progress * 100;
        const hue = progress * 120; // 0° (red) → 120° (green)

        this.dynamicColorValue.set({
          value: pct,
          trackColor: 'rgba(232, 244, 252, 1)',
          fillColor: \`hsl(\${hue}, 80%, 50%)\`,
          // Same hue, dark shade — always readable, no abrupt flip
          textColor: \`hsl(\${hue}, 80%, 18%)\`,
        });

        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          // Bar has --nui-pb-transition-duration: 0s so the snap to 0 is instant.
          // Just wait for the user to see 100 %, then restart.
          this.animationTimeoutId = setTimeout(() => {
            this.dynamicColorValue.set({
              value: 0,
              trackColor: 'rgba(232, 244, 252, 1)',
              fillColor: 'hsl(0, 80%, 50%)',
              textColor: 'hsl(0, 80%, 18%)',
            });
            run();
          }, PAUSE_MS);
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    };

    run();
  }`,
        language: 'typescript',
      },
    ],
  },
];
