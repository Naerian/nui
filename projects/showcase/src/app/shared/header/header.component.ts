import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'nui';
import { aura, warm, neon, dopamine, corporate, minimal } from 'nui';
import { ShowcaseConfigService } from '../../core/services/showcase-config.service';

interface PresetOption {
  name: string;
  value: any;
  translationKey: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private translateService = inject(TranslateService);
  private themeService = inject(ThemeService);
  private showcaseConfig = inject(ShowcaseConfigService);

  // Initialize with current values from config
  isDark = this.showcaseConfig.currentConfig.isDarkMode;
  currentLanguage = this.showcaseConfig.currentConfig.language || 'en';
  currentVersion = this.showcaseConfig.currentConfig.version;
  currentPreset = this.showcaseConfig.currentConfig.currentPreset;

  presets: PresetOption[] = [
    { name: 'Aura', value: aura, translationKey: 'presets.aura' },
    { name: 'Warm', value: warm, translationKey: 'presets.warm' },
    { name: 'Neon', value: neon, translationKey: 'presets.neon' },
    { name: 'Dopamine', value: dopamine, translationKey: 'presets.dopamine' },
    { name: 'Corporate', value: corporate, translationKey: 'presets.corporate' },
    { name: 'Minimal', value: minimal, translationKey: 'presets.minimal' }
  ];

  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  versions = [
    { value: '1.0.0', label: 'v1.0.0 (Latest)' }
  ];

  ngOnInit(): void {
    // Subscribe to config changes and update local state
    this.showcaseConfig.config$.subscribe(config => {
      this.isDark = config.isDarkMode;
      this.currentLanguage = config.language;
      this.currentVersion = config.version;
      this.currentPreset = config.currentPreset;
    });
  }

  toggleDarkMode(): void {
    const newDarkMode = !this.isDark;
    this.showcaseConfig.setDarkMode(newDarkMode);
    this.themeService.setDarkMode(newDarkMode);
  }

  changePreset(presetName: string): void {
    const preset = this.presets.find(p => p.value.name === presetName);
    if (preset) {
      this.showcaseConfig.setPreset(presetName);
      this.themeService.usePreset(preset.value);
    }
  }

  changeLanguage(langCode: string): void {
    this.showcaseConfig.setLanguage(langCode);
    this.translateService.use(langCode);
  }

  changeVersion(version: string): void {
    this.showcaseConfig.setVersion(version);
    // In the future, this could navigate to different version documentation
  }

  toggleSidebar(): void {
    this.showcaseConfig.toggleSidebar();
  }
}
