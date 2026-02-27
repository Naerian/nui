import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShowcaseConfigService } from './core/services/showcase-config.service';
import { NuiI18n, ThemeService } from 'nui';
import { filter } from 'rxjs/operators';
import { NuiI18nService } from 'nui';

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
  private router = inject(Router);

  isSidebarCollapsed = false;

  private presets = this.themeService.getNuiPresets();
  private presetMap = this.presets.reduce(
    (map, preset) => {
      map[preset.name] = preset;
      return map;
    },
    {} as Record<string, any>
  );

  private nuiI18n = inject(NuiI18nService);

  ngOnInit(): void {
    // Set default language
    this.translate.setFallbackLang('en');

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

    // Listen for language changes to update i18n service
    this.translate.onLangChange.subscribe(event => {
      const res = event.translations['NUI'];
      if (res) this.nuiI18n.setTranslations(res as Partial<NuiI18n>);
    });

    // Initialize dark mode
    this.themeService.setDarkMode(config.isDarkMode);

    // Subscribe to sidebar state
    this.showcaseConfig.config$.subscribe(config => {
      this.isSidebarCollapsed = config.sidebarCollapsed;
    });

    // Scroll to top on route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
  }

  closeSidebarOnMobile(): void {
    // Only close on mobile/tablet
    if (window.innerWidth < 992) {
      this.showcaseConfig.setSidebarCollapsed(true);
    }
  }
}
