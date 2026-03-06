import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab "Conf. global" del componente Toast.
 */
export const TOAST_GLOBAL_CONFIG_SECTIONS: ComponentSection[] = [
  {
    id: 'global-config-setup',
    title: 'components.toast.globalConfig.setup.title',
    description: 'components.toast.globalConfig.setup.description',
    anchor: 'global-config-setup',
    note: {
      type: 'info',
      content: 'components.toast.globalConfig.setup.note',
    },
    examples: [
      {
        title: 'codeExamples.configuration',
        language: 'typescript',
        code: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideNUI } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      config: {
        toast: {
          timeout: 4000,
          position: 'bottom-right',
          progressBar: true,
          closeButton: true,
          pauseOnHover: true,
          maxToasts: 4,
          animationIn: 'fade',
          stackingBehavior: 'limit',
        },
      },
    }),
  ],
};`,
      },
    ],
  },
  {
    id: 'global-config-defaults',
    title: 'components.toast.globalConfig.defaults.title',
    description: 'components.toast.globalConfig.defaults.description',
    anchor: 'global-config-defaults',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>timeout</code>',
          'number',
          '<code class="neutral">5000</code>',
          'components.toast.globalConfig.defaults.rows.timeout',
        ],
        [
          '<code>position</code>',
          'ToastPosition',
          '<code class="neutral">top-right</code>',
          'components.toast.globalConfig.defaults.rows.position',
        ],
        [
          '<code>preventDuplicates</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.preventDuplicates',
        ],
        [
          '<code>progressBar</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.progressBar',
        ],
        [
          '<code>closeButton</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.closeButton',
        ],
        [
          '<code>closeOnTouch</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.closeOnTouch',
        ],
        [
          '<code>maxToasts</code>',
          'number',
          '<code class="neutral">6</code>',
          'components.toast.globalConfig.defaults.rows.maxToasts',
        ],
        [
          '<code>maxToastsPerPosition</code>',
          'number',
          '<code class="neutral">3</code>',
          'components.toast.globalConfig.defaults.rows.maxToastsPerPosition',
        ],
        [
          '<code>animationIn</code>',
          'ToastAnimation',
          '<code class="neutral">slide</code>',
          'components.toast.globalConfig.defaults.rows.animationIn',
        ],
        [
          '<code>animationOut</code>',
          'ToastAnimation',
          '<code class="neutral">fade</code>',
          'components.toast.globalConfig.defaults.rows.animationOut',
        ],
        [
          '<code>animationDuration</code>',
          'number',
          '<code class="neutral">300</code>',
          'components.toast.globalConfig.defaults.rows.animationDuration',
        ],
        [
          '<code>pauseOnHover</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.pauseOnHover',
        ],
        [
          '<code>pauseOnFocusLoss</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.pauseOnFocusLoss',
        ],
        [
          '<code>stackingBehavior</code>',
          "'queue' | 'replace' | 'limit'",
          '<code class="neutral">queue</code>',
          'components.toast.globalConfig.defaults.rows.stackingBehavior',
        ],
        [
          '<code>stackDirection</code>',
          "'append' | 'prepend'",
          '<code class="neutral">append</code>',
          'components.toast.globalConfig.defaults.rows.stackDirection',
        ],
        [
          '<code>icon</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.icon',
        ],
        [
          '<code>iconPosition</code>',
          "'left' | 'right'",
          '<code class="neutral">left</code>',
          'components.toast.globalConfig.defaults.rows.iconPosition',
        ],
        [
          '<code>announceToScreenReader</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.announceToScreenReader',
        ],
        [
          '<code>ariaRole</code>',
          "'alert' | 'status'",
          '<code class="neutral">status</code>',
          'components.toast.globalConfig.defaults.rows.ariaRole',
        ],
        [
          '<code>ariaLive</code>',
          "'polite' | 'assertive'",
          '<code class="neutral">polite</code>',
          'components.toast.globalConfig.defaults.rows.ariaLive',
        ],
        [
          '<code>persistent</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.toast.globalConfig.defaults.rows.persistent',
        ],
        [
          '<code>expandable</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.toast.globalConfig.defaults.rows.expandable',
        ],
        [
          '<code>swipeToDismiss</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.toast.globalConfig.defaults.rows.swipeToDismiss',
        ],
        [
          '<code>swipeThreshold</code>',
          'number',
          '<code class="neutral">100</code>',
          'components.toast.globalConfig.defaults.rows.swipeThreshold',
        ],
        [
          '<code>sound</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.toast.globalConfig.defaults.rows.sound',
        ],
        [
          '<code>templateMode</code>',
          "'replace' | 'prepend' | 'append'",
          '<code class="neutral">replace</code>',
          'components.toast.globalConfig.defaults.rows.templateMode',
        ],
        [
          '<code>icons</code>',
          'ToastIcons',
          '<code class="neutral">{ success, danger, warning, info, loading }</code>',
          'components.toast.globalConfig.defaults.rows.icons',
        ],
        [
          '<code>buttonsSize</code>',
          'NUISize',
          '<code class="neutral">sm</code>',
          'components.toast.globalConfig.defaults.rows.buttonsSize',
        ],
        [
          '<code>buttonsVariant</code>',
          'NUIVariant',
          '<code class="neutral">ghost</code>',
          'components.toast.globalConfig.defaults.rows.buttonsVariant',
        ],
        [
          '<code>buttonsShape</code>',
          'ButtonShape',
          '<code class="neutral">rounded</code>',
          'components.toast.globalConfig.defaults.rows.buttonsShape',
        ],
      ],
    },
  },
  {
    id: 'global-config-priority',
    title: 'components.toast.globalConfig.priority.title',
    description: 'components.toast.globalConfig.priority.description',
    anchor: 'global-config-priority',
    note: {
      type: 'info',
      content: 'components.toast.globalConfig.priority.note',
    },
  },
];
