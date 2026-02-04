import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThemeService, twilight } from 'nui';
import { aura, warm, neon, dopamine, corporate, minimal, sunset, ocean } from 'nui';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

interface PresetOption {
  name: string;
  value: any;
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

  isOpen = false;
  currentPreset = this.showcaseConfig.currentConfig.currentPreset;

  // Computed signal to get the list of preset options based on the current theme mode
  presets = computed<PresetOption[]>(() => {
    const dark = this.themeService.isDarkMode();
    return [
      {
        name: 'aura',
        value: aura,
        translationKey: 'presets.aura',
        primaryColor: dark ? aura.colors.dark.primary : aura.colors.light.primary,
        colors: [
          dark ? aura.colors.dark.primary : aura.colors.light.primary,
          dark ? aura.colors.dark.secondary : aura.colors.light.secondary,
          dark ? aura.colors.dark.accent : aura.colors.light.accent,
        ],
      },
      {
        name: 'warm',
        value: warm,
        translationKey: 'presets.warm',
        primaryColor: dark ? warm.colors.dark.primary : warm.colors.light.primary,
        colors: [
          dark ? warm.colors.dark.primary : warm.colors.light.primary,
          dark ? warm.colors.dark.secondary : warm.colors.light.secondary,
          dark ? warm.colors.dark.accent : warm.colors.light.accent,
        ],
      },
      {
        name: 'neon',
        value: neon,
        translationKey: 'presets.neon',
        primaryColor: dark ? neon.colors.dark.primary : neon.colors.light.primary,
        colors: [
          dark ? neon.colors.dark.primary : neon.colors.light.primary,
          dark ? neon.colors.dark.secondary : neon.colors.light.secondary,
          dark ? neon.colors.dark.accent : neon.colors.light.accent,
        ],
      },
      {
        name: 'dopamine',
        value: dopamine,
        translationKey: 'presets.dopamine',
        primaryColor: dark ? dopamine.colors.dark.primary : dopamine.colors.light.primary,
        colors: [
          dark ? dopamine.colors.dark.primary : dopamine.colors.light.primary,
          dark ? dopamine.colors.dark.secondary : dopamine.colors.light.secondary,
          dark ? dopamine.colors.dark.accent : dopamine.colors.light.accent,
        ],
      },
      {
        name: 'corporate',
        value: corporate,
        translationKey: 'presets.corporate',
        primaryColor: dark ? corporate.colors.dark.primary : corporate.colors.light.primary,
        colors: [
          dark ? corporate.colors.dark.primary : corporate.colors.light.primary,
          dark ? corporate.colors.dark.secondary : corporate.colors.light.secondary,
          dark ? corporate.colors.dark.accent : corporate.colors.light.accent,
        ],
      },
      {
        name: 'minimal',
        value: minimal,
        translationKey: 'presets.minimal',
        primaryColor: dark ? minimal.colors.dark.primary : minimal.colors.light.primary,
        colors: [
          dark ? minimal.colors.dark.primary : minimal.colors.light.primary,
          dark ? minimal.colors.dark.secondary : minimal.colors.light.secondary,
          dark ? minimal.colors.dark.accent : minimal.colors.light.accent,
        ],
      },
      {
        name: 'sunset',
        value: sunset,
        translationKey: 'presets.sunset',
        primaryColor: dark ? sunset.colors.dark.primary : sunset.colors.light.primary,
        colors: [
          dark ? sunset.colors.dark.primary : sunset.colors.light.primary,
          dark ? sunset.colors.dark.secondary : sunset.colors.light.secondary,
          dark ? sunset.colors.dark.accent : sunset.colors.light.accent,
        ],
      },
      {
        name: 'twilight',
        value: twilight,
        translationKey: 'presets.twilight',
        primaryColor: dark ? twilight.colors.dark.primary : twilight.colors.light.primary,
        colors: [
          dark ? twilight.colors.dark.primary : twilight.colors.light.primary,
          dark ? twilight.colors.dark.secondary : twilight.colors.light.secondary,
          dark ? twilight.colors.dark.accent : twilight.colors.light.accent,
        ],
      },
      {
        name: 'ocean',
        value: ocean,
        translationKey: 'presets.ocean',
        primaryColor: dark ? ocean.colors.dark.primary : ocean.colors.light.primary,
        colors: [
          dark ? ocean.colors.dark.primary : ocean.colors.light.primary,
          dark ? ocean.colors.dark.secondary : ocean.colors.light.secondary,
          dark ? ocean.colors.dark.accent : ocean.colors.light.accent,
        ],
      },
    ];
  });

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentPreset = config.currentPreset;
      this.themeService.usePreset(this.presets().find(p => p.name === this.currentPreset)?.value || this.presets()[0].value);
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
