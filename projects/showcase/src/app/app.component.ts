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
import { DEFAULT_LANGUAGE, LANGUAGES } from './core/models/language.model';

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

    // Language codes
    const availableLangs = LANGUAGES.map(lang => lang.code);

    // Initialize language
    if (config.language) {
      this.translate.use(config.language);
      this.nuiI18n.setLang(config.language);
    } else {
      const browserLang = this.translate.getBrowserLang();

      // If browser language is not available, default to English
      if (!browserLang) {
        this.translate.use(DEFAULT_LANGUAGE);
        this.nuiI18n.setLang(DEFAULT_LANGUAGE);
        this.showcaseConfig.setLanguage(DEFAULT_LANGUAGE);
        return;
      }

      const langToUse = availableLangs.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
      this.translate.use(langToUse);
      this.nuiI18n.setLang(langToUse);
      this.showcaseConfig.setLanguage(langToUse);
    }

    // Initialize preset
    const preset = this.presetMap[config.currentPreset];
    if (preset) {
      this.themeService.usePreset(preset);
    }

    // Listen for language changes to update i18n service
    this.translate.onLangChange.subscribe(event => {
      const nTranslations = event.translations['NUI'];
      this.nuiI18n.setLang(event.lang);
      if (nTranslations) this.nuiI18n.setTranslations(nTranslations as Partial<NuiI18n>);
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
        // Scroll to top on route change on ".showcase-content" container
        const contentContainer = document.querySelector('.showcase-content');
        if (contentContainer) {
          contentContainer.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
  }

  closeSidebarOnMobile(): void {
    // Only close on mobile/tablet
    if (window.innerWidth < 992) {
      this.showcaseConfig.setSidebarCollapsed(true);
    }
  }
}
