import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipDirective, ButtonDirective } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
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
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
})
export class TooltipPageComponent extends BaseComponentPage {
  override pageConfig = TOOLTIP_PAGE_CONFIG;

  isDisabled = signal(false);

  doAction(): void {
    console.log('Acción ejecutada desde tooltip interactivo');
  }

  toggleDisabled(): void {
    this.isDisabled.update(value => !value);
  }
}
