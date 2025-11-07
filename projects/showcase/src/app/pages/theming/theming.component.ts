import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss']
})
export class ThemingComponent {
  presets = [
    {
      name: 'aura',
      translationKey: 'presets.aura',
      descriptionKey: 'pages.theming.presetDescriptions.aura',
      colors: {
        primary: '#0d9488',
        secondary: '#64748b',
        accent: '#9333ea',
        success: '#059669',
        info: '#0e7490',
        warning: '#d97706',
        danger: '#dc2626'
      }
    },
    {
      name: 'warm',
      translationKey: 'presets.warm',
      descriptionKey: 'pages.theming.presetDescriptions.warm',
      colors: {
        primary: '#ea580c',
        secondary: '#92400e',
        accent: '#dc2626',
        success: '#65a30d',
        info: '#0891b2',
        warning: '#d97706',
        danger: '#b91c1c'
      }
    },
    {
      name: 'neon',
      translationKey: 'presets.neon',
      descriptionKey: 'pages.theming.presetDescriptions.neon',
      colors: {
        primary: '#06b6d4',
        secondary: '#d946ef',
        accent: '#8b5cf6',
        success: '#10b981',
        info: '#0ea5e9',
        warning: '#f59e0b',
        danger: '#ef4444'
      }
    },
    {
      name: 'dopamine',
      translationKey: 'presets.dopamine',
      descriptionKey: 'pages.theming.presetDescriptions.dopamine',
      colors: {
        primary: '#84cc16',
        secondary: '#ec4899',
        accent: '#f59e0b',
        success: '#22c55e',
        info: '#3b82f6',
        warning: '#eab308',
        danger: '#ef4444'
      }
    },
    {
      name: 'corporate',
      translationKey: 'presets.corporate',
      descriptionKey: 'pages.theming.presetDescriptions.corporate',
      colors: {
        primary: '#1e40af',
        secondary: '#475569',
        accent: '#0891b2',
        success: '#16a34a',
        info: '#2563eb',
        warning: '#ca8a04',
        danger: '#dc2626'
      }
    },
    {
      name: 'minimal',
      translationKey: 'presets.minimal',
      descriptionKey: 'pages.theming.presetDescriptions.minimal',
      colors: {
        primary: '#18181b',
        secondary: '#71717a',
        accent: '#3f3f46',
        success: '#14532d',
        info: '#1e3a8a',
        warning: '#78350f',
        danger: '#7f1d1d'
      }
    }
  ];

  colorTypes = [
    { key: 'primary', translationKey: 'pages.theming.primary' },
    { key: 'secondary', translationKey: 'pages.theming.secondary' },
    { key: 'accent', translationKey: 'pages.theming.accent' },
    { key: 'success', translationKey: 'pages.theming.success' },
    { key: 'info', translationKey: 'pages.theming.info' },
    { key: 'warning', translationKey: 'pages.theming.warning' },
    { key: 'danger', translationKey: 'pages.theming.danger' }
  ];

  getColor(preset: any, colorKey: string): string {
    return preset.colors[colorKey];
  }
}
