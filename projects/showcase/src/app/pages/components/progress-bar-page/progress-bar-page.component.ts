import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarComponent } from 'nui';
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
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './progress-bar-page.component.html',
  styleUrls: ['./progress-bar-page.component.scss'],
})
export class ProgressBarPageComponent extends BaseComponentPage {
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
}
