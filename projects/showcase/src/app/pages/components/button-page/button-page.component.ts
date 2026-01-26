import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ButtonDirective } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { BUTTON_PAGE_CONFIG } from './button-page.config';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    ButtonComponent, 
    ButtonDirective, 
    CodeBlockComponent,
    SectionTitleComponent
  ],
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
})
export class ButtonPageComponent extends BaseComponentPage {
  // Configuration from external file
  override pageConfig = BUTTON_PAGE_CONFIG;

  // Interactive demo state (only logic that needs to be in component)
  isLoading = signal(false);

  simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  onButtonClick(event: Event): void {
    console.log('Button clicked:', event);
  }
}
