import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShowcaseConfigService } from './core/services/showcase-config.service';
import { ThemeService } from 'nui';
import { aura, warm, neon, dopamine, corporate, minimal } from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);
  private showcaseConfig = inject(ShowcaseConfigService);
  private themeService = inject(ThemeService);

  isSidebarCollapsed = false;

  private presetMap: { [key: string]: any } = {
    'aura': aura,
    'warm': warm,
    'neon': neon,
    'dopamine': dopamine,
    'corporate': corporate,
    'minimal': minimal
  };

  ngOnInit(): void {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Load saved config
    const config = this.showcaseConfig.currentConfig;
    
    // Initialize language
    if (config.language) {
      this.translate.use(config.language);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const langToUse = browserLang?.match(/en|es/) ? browserLang : 'en';
      this.translate.use(langToUse);
      this.showcaseConfig.setLanguage(langToUse);
    }

    // Initialize preset
    const preset = this.presetMap[config.currentPreset];
    if (preset) {
      this.themeService.usePreset(preset);
    }

    // Initialize dark mode
    this.themeService.setDarkMode(config.isDarkMode);

    // Subscribe to sidebar state
    this.showcaseConfig.config$.subscribe(config => {
      this.isSidebarCollapsed = config.sidebarCollapsed;
    });
  }

  closeSidebarOnMobile(): void {
    // Only close on mobile/tablet
    if (window.innerWidth < 992) {
      this.showcaseConfig.setSidebarCollapsed(true);
    }
  }
}
