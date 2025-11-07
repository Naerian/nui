import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ThemeService } from 'nui';
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
  styleUrls: ['./preset-selector.component.scss']
})
export class PresetSelectorComponent implements OnInit {
  private themeService = inject(ThemeService);
  private showcaseConfig = inject(ShowcaseConfigService);

  isOpen = false;
  currentPreset = this.showcaseConfig.currentConfig.currentPreset;

  presets: PresetOption[] = [
    { 
      name: 'aura', 
      value: aura, 
      translationKey: 'presets.aura',
      primaryColor: '#14b8a6',
      colors: ['#14b8a6', '#a855f7', '#3b82f6']
    },
    { 
      name: 'warm', 
      value: warm, 
      translationKey: 'presets.warm',
      primaryColor: '#ff6b35',
      colors: ['#ff6b35', '#fbbf24', '#f97316']
    },
    { 
      name: 'neon', 
      value: neon, 
      translationKey: 'presets.neon',
      primaryColor: '#00f5ff',
      colors: ['#00f5ff', '#ff00ff', '#7c3aed']
    },
    { 
      name: 'dopamine', 
      value: dopamine, 
      translationKey: 'presets.dopamine',
      primaryColor: '#c0ff00',
      colors: ['#c0ff00', '#ff1493', '#fbbf24']
    },
    { 
      name: 'corporate', 
      value: corporate, 
      translationKey: 'presets.corporate',
      primaryColor: '#2563eb',
      colors: ['#2563eb', '#1e40af', '#3b82f6']
    },
    { 
      name: 'minimal', 
      value: minimal, 
      translationKey: 'presets.minimal',
      primaryColor: '#8b5cf6',
      colors: ['#8b5cf6', '#6366f1', '#a78bfa']
    },
    { 
      name: 'sunset', 
      value: sunset, 
      translationKey: 'presets.sunset',
      primaryColor: '#f43f5e',
      colors: ['#f43f5e', '#fb923c', '#f472b6']
    },
    { 
      name: 'ocean', 
      value: ocean, 
      translationKey: 'presets.ocean',
      primaryColor: '#0077be',
      colors: ['#0077be', '#00bcd4', '#29b6f6']
    }
  ];

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentPreset = config.currentPreset;
    });
  }

  getCurrentPreset(): PresetOption {
    return this.presets.find(p => p.name === this.currentPreset) || this.presets[0];
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
