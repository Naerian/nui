import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShowcaseConfigService } from '../../core/services/showcase-config.service';
import { PresetSelectorComponent } from './preset-selector/preset-selector.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { VersionSelectorComponent } from './version-selector/version-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule,
    PresetSelectorComponent,
    LanguageSelectorComponent,
    ThemeToggleComponent,
    VersionSelectorComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private showcaseConfig = inject(ShowcaseConfigService);

  toggleSidebar(): void {
    this.showcaseConfig.toggleSidebar();
  }
}
