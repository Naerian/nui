import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de theming del Toast
 */
export const TOAST_THEMING_SECTIONS: ComponentSection[] = [
  {
    id: 'theming-layout',
    title: 'components.toast.theming.layout.title',
    description: 'components.toast.theming.layout.description',
    anchor: 'theming-layout',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-width</code>',
          'components.toast.theming.layout.rows.width.description',
          '<code>24rem</code>',
        ],
        [
          '<code>--nui-toast-width-mobile</code>',
          'components.toast.theming.layout.rows.widthMobile.description',
          '<code>calc(100vw - 1.5rem)</code>',
        ],
        [
          '<code>--nui-toast-min-height</code>',
          'components.toast.theming.layout.rows.minHeight.description',
          '<code>3.5rem</code>',
        ],
        [
          '<code>--nui-toast-max-width</code>',
          'components.toast.theming.layout.rows.maxWidth.description',
          '<code>32rem</code>',
        ],
        [
          '<code>--nui-toast-padding</code>',
          'components.toast.theming.layout.rows.padding.description',
          '<code>1rem</code>',
        ],
        [
          '<code>--nui-toast-padding-compact</code>',
          'components.toast.theming.layout.rows.paddingCompact.description',
          '<code>0.75rem</code>',
        ],
        [
          '<code>--nui-toast-gap</code>',
          'components.toast.theming.layout.rows.gap.description',
          '<code>0.75rem</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-border',
    title: 'components.toast.theming.border.title',
    description: 'components.toast.theming.border.description',
    anchor: 'theming-border',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-radius</code>',
          'components.toast.theming.border.rows.radius.description',
          '<code>var(--nui-border-radius-md)</code>',
        ],
        [
          '<code>--nui-toast-border-width</code>',
          'components.toast.theming.border.rows.borderWidth.description',
          '<code>1px</code>',
        ],
        [
          '<code>--nui-toast-shadow</code>',
          'components.toast.theming.border.rows.shadow.description',
          '<code>var(--nui-box-shadow-xl)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-typography',
    title: 'components.toast.theming.typography.title',
    description: 'components.toast.theming.typography.description',
    anchor: 'theming-typography',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-title-size</code>',
          'components.toast.theming.typography.rows.titleSize.description',
          '<code>0.938rem</code>',
        ],
        [
          '<code>--nui-toast-title-weight</code>',
          'components.toast.theming.typography.rows.titleWeight.description',
          '<code>600</code>',
        ],
        [
          '<code>--nui-toast-message-size</code>',
          'components.toast.theming.typography.rows.messageSize.description',
          '<code>0.875rem</code>',
        ],
        [
          '<code>--nui-toast-message-weight</code>',
          'components.toast.theming.typography.rows.messageWeight.description',
          '<code>400</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-animations',
    title: 'components.toast.theming.animations.title',
    description: 'components.toast.theming.animations.description',
    anchor: 'theming-animations',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-duration</code>',
          'components.toast.theming.animations.rows.duration.description',
          '<code>300ms</code>',
        ],
        [
          '<code>--nui-toast-easing</code>',
          'components.toast.theming.animations.rows.easing.description',
          '<code>cubic-bezier(0.4, 0, 0.2, 1)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-zindex',
    title: 'components.toast.theming.zindex.title',
    description: 'components.toast.theming.zindex.description',
    anchor: 'theming-zindex',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-z-index</code>',
          'components.toast.theming.zindex.rows.zIndex.description',
          '<code>var(--nui-z-index-status)</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-stacking',
    title: 'components.toast.theming.stacking.title',
    description: 'components.toast.theming.stacking.description',
    anchor: 'theming-stacking',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-stack-gap</code>',
          'components.toast.theming.stacking.rows.stackGap.description',
          '<code>0.75rem</code>',
        ],
        [
          '<code>--nui-toast-stack-scale-1</code>',
          'components.toast.theming.stacking.rows.stackScale1.description',
          '<code>0.96</code>',
        ],
        [
          '<code>--nui-toast-stack-scale-2</code>',
          'components.toast.theming.stacking.rows.stackScale2.description',
          '<code>0.92</code>',
        ],
        [
          '<code>--nui-toast-stack-y-1</code>',
          'components.toast.theming.stacking.rows.stackY1.description',
          '<code>-0.5rem</code>',
        ],
        [
          '<code>--nui-toast-stack-y-2</code>',
          'components.toast.theming.stacking.rows.stackY2.description',
          '<code>-1rem</code>',
        ],
      ],
    },
  },
  {
    id: 'theming-colors',
    title: 'components.toast.theming.colors.title',
    description: 'components.toast.theming.colors.description',
    anchor: 'theming-colors',
    table: {
      headers: ['common.tables.cssVariable', 'common.tables.description', 'common.tables.default'],
      rows: [
        [
          '<code>--nui-toast-{color}-bg</code>',
          'components.toast.theming.colors.rows.colorBg.description',
          'components.toast.theming.colors.rows.colorBg.default',
        ],
        [
          '<code>--nui-toast-{color}-hover-bg</code>',
          'components.toast.theming.colors.rows.colorHoverBg.description',
          'components.toast.theming.colors.rows.colorHoverBg.default',
        ],
        [
          '<code>--nui-toast-{color}-border</code>',
          'components.toast.theming.colors.rows.colorBorder.description',
          'components.toast.theming.colors.rows.colorBorder.default',
        ],
        [
          '<code>--nui-toast-{color}-title</code>',
          'components.toast.theming.colors.rows.colorTitle.description',
          'components.toast.theming.colors.rows.colorTitle.default',
        ],
        [
          '<code>--nui-toast-{color}-icon</code>',
          'components.toast.theming.colors.rows.colorIcon.description',
          'components.toast.theming.colors.rows.colorIcon.default',
        ],
        [
          '<code>--nui-toast-{color}-text</code>',
          'components.toast.theming.colors.rows.colorText.description',
          'components.toast.theming.colors.rows.colorText.default',
        ],
        [
          '<code>--nui-toast-{color}-progress</code>',
          'components.toast.theming.colors.rows.colorProgress.description',
          'components.toast.theming.colors.rows.colorProgress.default',
        ],
      ],
    },
  },
  {
    id: 'theming-examples',
    title: 'components.toast.theming.examples.title',
    description: 'components.toast.theming.examples.description',
    anchor: 'theming-examples',
    examples: [
      {
        title: 'codeExamples.scss',
        code: `// Example of an iOS-style toast
.ios-toast {
  --nui-toast-radius: 14px;
  --nui-toast-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  --nui-toast-padding: 1rem 1.25rem;
}

// Example of a compact toast
.compact-toast {
  --nui-toast-padding: 0.5rem 0.75rem;
  --nui-toast-padding-compact: 0.375rem 0.5rem;
  --nui-toast-title-size: 0.813rem;
  --nui-toast-message-size: 0.75rem;
}

// Example with custom animation timing
.smooth-toast {
  --nui-toast-duration: 500ms;
  --nui-toast-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
}`,
        language: 'scss',
      },
    ],
  },
];
