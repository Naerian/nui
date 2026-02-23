import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'nui';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

interface PresetOption {
  name: string;
  translationKey: string;
  primaryColor: string;
  colors: string[];
  grays?: string[];
}

@Component({
  selector: 'app-presets',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.scss'],
})
export class PresetsComponent {
  private themeService = inject(ThemeService);
  private showcaseConfig = inject(ShowcaseConfigService);

  // Computed signal to get the list of presets based on the current theme mode
  presets = computed(() => {
    const dark = this.themeService.isDarkMode();
    const nuiPresets = this.themeService.getNuiPresets();
    const defaultGrays = this.themeService.getDefaultGrays();

    const presets = nuiPresets.map(preset => ({
      name: preset.name,
      translationKey: `presets.${preset.name}`,
      descriptionKey: `pages.theming.presetDescriptions.${preset.name}`,
      colors: dark ? preset.colors.dark : preset.colors.light,
      grays: preset.grays ? Object.values(preset.grays) : Object.values(defaultGrays),
    }));

    return presets;
  });

  currentPreset = computed<PresetOption>(() => {
    const current = this.themeService.currentPreset();
    const dark = this.themeService.isDarkMode();
    return {
      name: current.name,
      value: current,
      translationKey: `presets.${current.name}`,
      primaryColor: dark ? current.colors.dark.primary : current.colors.light.primary,
      colors: [
        dark ? current.colors.dark.primary : current.colors.light.primary,
        dark ? current.colors.dark.secondary : current.colors.light.secondary,
        dark ? current.colors.dark.accent : current.colors.light.accent,
      ],
    };
  });

  colorTypes = computed(() => {
    const presets = this.themeService.getNuiPresets();
    const colorKeys = Object.keys(presets[0].colors.light);
    return colorKeys.map(key => ({
      key,
      translationKey: `pages.theming.${key}`,
    }));
  });

  getColor(preset: any, colorKey: string): string {
    return preset.colors[colorKey];
  }

  getGrays(preset: any): string[] {
    return preset.grays;
  }

  selectPreset(presetName: string): void {
    const selectedPreset = this.themeService.getNuiPresets().find(p => p.name === presetName);
    if (selectedPreset) {
      this.themeService.usePreset(selectedPreset);
      this.showcaseConfig.setPreset(presetName);
    }
  }
}
