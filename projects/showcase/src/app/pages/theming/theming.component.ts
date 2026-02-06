import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  aura,
  corporate,
  dopamine,
  minimal,
  neon,
  ocean,
  sunset,
  ThemeService,
  twilight,
  warm,
} from 'nui';

interface PresetOption {
  name: string;
  value: any;
  translationKey: string;
  primaryColor: string;
  colors: string[];
}

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
})
export class ThemingComponent {
  private themeService = inject(ThemeService);

  // Computed signal to get the list of presets based on the current theme mode
  presets = computed(() => {
    const dark = this.themeService.isDarkMode();
    return [
      {
        name: 'aura',
        translationKey: 'presets.aura',
        descriptionKey: 'pages.theming.presetDescriptions.aura',
        colors: dark ? aura.colors.dark : aura.colors.light,
      },
      {
        name: 'warm',
        translationKey: 'presets.warm',
        descriptionKey: 'pages.theming.presetDescriptions.warm',
        colors: dark ? warm.colors.dark : warm.colors.light,
      },
      {
        name: 'neon',
        translationKey: 'presets.neon',
        descriptionKey: 'pages.theming.presetDescriptions.neon',
        colors: dark ? neon.colors.dark : neon.colors.light,
      },
      {
        name: 'dopamine',
        translationKey: 'presets.dopamine',
        descriptionKey: 'pages.theming.presetDescriptions.dopamine',
        colors: dark ? dopamine.colors.dark : dopamine.colors.light,
      },
      {
        name: 'corporate',
        translationKey: 'presets.corporate',
        descriptionKey: 'pages.theming.presetDescriptions.corporate',
        colors: dark ? corporate.colors.dark : corporate.colors.light,
      },
      {
        name: 'minimal',
        translationKey: 'presets.minimal',
        descriptionKey: 'pages.theming.presetDescriptions.minimal',
        colors: dark ? minimal.colors.dark : minimal.colors.light,
      },
      {
        name: 'sunset',
        translationKey: 'presets.sunset',
        descriptionKey: 'pages.theming.presetDescriptions.sunset',
        colors: dark ? sunset.colors.dark : sunset.colors.light,
      },
      {
        name: 'twilight',
        translationKey: 'presets.twilight',
        descriptionKey: 'pages.theming.presetDescriptions.twilight',
        colors: dark ? twilight.colors.dark : twilight.colors.light,
      },
      {
        name: 'ocean',
        translationKey: 'presets.ocean',
        descriptionKey: 'pages.theming.presetDescriptions.ocean',
        colors: dark ? ocean.colors.dark : ocean.colors.light,
      },
    ];
  });

  currentPreset = computed<PresetOption>(() => {
    const current = this.themeService.currentPreset();
    const dark = this.themeService.isDarkMode();
    console.log('Current preset:', current.name, 'Dark mode:', dark);
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

  colorTypes = [
    { key: 'primary', translationKey: 'pages.theming.primary' },
    { key: 'secondary', translationKey: 'pages.theming.secondary' },
    { key: 'accent', translationKey: 'pages.theming.accent' },
    { key: 'success', translationKey: 'pages.theming.success' },
    { key: 'info', translationKey: 'pages.theming.info' },
    { key: 'warning', translationKey: 'pages.theming.warning' },
    { key: 'danger', translationKey: 'pages.theming.danger' },
    { key: 'neutral', translationKey: 'pages.theming.neutral' },
  ];

  getColor(preset: any, colorKey: string): string {
    return preset.colors[colorKey];
  }
}
