import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipDirective, ButtonDirective } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { TOOLTIP_PAGE_CONFIG } from './tooltip-page.config';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TooltipDirective,
    ButtonDirective,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
})
export class TooltipPageComponent extends BaseComponentPage {
  override pageConfig = TOOLTIP_PAGE_CONFIG;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'positions', 'events', 'delays', 'templates', 'interactive', 'disabled'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs', 'api-usage'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-container', 'theming-arrow', 'theming-animation', 'theming-examples'],
    },
  ];

  isDisabled = signal(false);

  doAction(): void {
    console.log('Acción ejecutada desde tooltip interactivo');
  }

  toggleDisabled(): void {
    this.isDisabled.update(value => !value);
  }
}
