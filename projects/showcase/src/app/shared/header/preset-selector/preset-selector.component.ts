import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThemePreset, ThemeService } from 'nui';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

interface PresetOption {
  name: string;
  value: ThemePreset;
  translationKey: string;
  primaryColor: string;
  colors: string[];
}

@Component({
  selector: 'app-preset-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayModule],
  templateUrl: './preset-selector.component.html',
  styleUrls: ['./preset-selector.component.scss'],
})
export class PresetSelectorComponent implements OnInit {
  private themeService = inject(ThemeService);
  private showcaseConfig = inject(ShowcaseConfigService);
  private translateService = inject(TranslateService);

  isOpen = false;
  currentPreset = this.showcaseConfig.currentConfig.currentPreset;

  // Computed signal to get the list of preset options based on the current theme mode
  presets = computed<PresetOption[]>(() => {
    const dark = this.themeService.isDarkMode();
    const nuiPresets = this.themeService.getNuiPresets();
    return nuiPresets.map(preset => ({
      name: preset.name,
      value: preset,
      translationKey: `presets.${preset.name}`,
      primaryColor: dark ? preset.colors.dark.primary : preset.colors.light.primary,
      colors: [
        dark ? preset.colors.dark.primary : preset.colors.light.primary,
        dark ? preset.colors.dark.secondary : preset.colors.light.secondary,
        dark ? preset.colors.dark.accent : preset.colors.light.accent,
      ],
    }));
  });

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentPreset = config.currentPreset;
      this.themeService.usePreset(
        this.presets().find(p => p.name === this.currentPreset)?.value || this.presets()[0].value
      );
    });
  }

  getCurrentPreset(): PresetOption {
    return this.presets().find(p => p.name === this.currentPreset) || this.presets()[0];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectPreset(preset: PresetOption): void {
    this.showcaseConfig.setPreset(preset.name);
    this.themeService.usePreset(preset.value);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
