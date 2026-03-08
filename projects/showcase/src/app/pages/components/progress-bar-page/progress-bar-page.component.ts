import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NuiProgressBarValueTemplateDirective, ProgressBarComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { PROGRESS_BAR_PAGE_CONFIG } from './progress-bar-page.config';

@Component({
  selector: 'app-progress-bar-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ProgressBarComponent,
    NuiProgressBarValueTemplateDirective,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './progress-bar-page.component.html',
  styleUrls: ['./progress-bar-page.component.scss'],
})
export class ProgressBarPageComponent extends BaseComponentPage implements OnDestroy {
  override pageConfig = PROGRESS_BAR_PAGE_CONFIG;

  readonly colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'accent',
    'neutral',
  ] as const;
  readonly variants = ['solid', 'outline', 'ghost'] as const;
  readonly valuePositions = ['inside', 'top', 'bottom', 'left', 'right', 'hidden'] as const;

  dynamicColorValue = signal({
    value: 0,
    trackColor: '#e8f4fc',
    fillColor: '#2196f3',
    textColor: '#0d47a1',
  });

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'compact',
        'colors',
        'variants',
        'indeterminate',
        'steps',
        'value-template',
        'value-positions',
        'value-format',
        'label',
        'combined',
        'icons',
        'custom-colors',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-sizes'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-accessibility-line',
      sections: ['a11y-roles'],
    },
    {
      id: 'globalconfig',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-setup', 'global-config-defaults', 'global-config-priority'],
    },
  ];

  constructor() {
    super();
    this.startProgressAnimation();
  }

  // ── Animation internals ────────────────────────────────────────────────────────
  private animationFrameId: number | null = null;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    if (this.animationTimeoutId !== null) clearTimeout(this.animationTimeoutId);
  }

  /**
   * Animates value 0→100 over 8 s (red→green hue shift).
   * When complete, holds at 100 % for ~2.5 s then restarts from 0.
   *
   * The “jump” artefact (value at 100 before the bar visually reaches the end)
   * is inherent to the 0.6 s CSS transition lag when driving at 60 fps.
   * Waiting `TRANSITION_MS` before restarting lets the bar settle visually.
   */
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
          fillColor: `hsl(${hue}, 80%, 50%)`,
          // Same hue, dark shade — always readable, no abrupt flip
          textColor: `hsl(${hue}, 80%, 18%)`,
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
  }
}
