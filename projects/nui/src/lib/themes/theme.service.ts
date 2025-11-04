import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
}

export interface ThemeGrays {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemePreset {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  grays?: ThemeGrays; // Optional, falls back to default neutral grays
}

export interface ThemeConfig {
  preset?: ThemePreset;
  options?: {
    darkModeSelector?: string | 'system';
  };
}

export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private styleElement: HTMLStyleElement | null = null;
  private currentPreset: ThemePreset;
  private isDark = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(NUI_THEME_CONFIG) config?: ThemeConfig
  ) {
    this.currentPreset = config?.preset || {
      name: 'aura',
      colors: {
        light: { primary: '#0d9488', secondary: '#64748b', accent: '#9333ea', success: '#059669', info: '#0e7490', warning: '#d97706', danger: '#dc2626' },
        dark: { primary: '#14b8a6', secondary: '#94a3b8', accent: '#a855f7', success: '#10b981', info: '#06b6d4', warning: '#f59e0b', danger: '#ef4444' }
      }
    };
    this.init();
  }

  private init(): void {
    this.styleElement = this.document.getElementById('nui-theme-colors') as HTMLStyleElement;
    if (!this.styleElement) {
      this.styleElement = this.document.createElement('style');
      this.styleElement.id = 'nui-theme-colors';
      this.document.head.appendChild(this.styleElement);
    }
    this.updateColors();
  }

  usePreset(preset: ThemePreset): void {
    this.currentPreset = preset;
    this.updateColors();
  }

  updateColors(): void {
    if (!this.styleElement) return;
    this.styleElement.textContent = this.generateComponentVariables();
  }

  private generateComponentVariables(): string {
    const colors = this.isDark ? this.currentPreset.colors.dark : this.currentPreset.colors.light;
    const grays = this.currentPreset.grays || this.getDefaultGrays();
    
    let css = ':root {\n';
    
    // Structural variables (grays, text, bg, borders, shadows, focus, overlay)
    css += this.generateStructuralVariables(grays);
    
    // Component color variables
    Object.entries(colors).forEach(([name, baseColor]) => {
      css += this.generateButtonVariables(name, baseColor);
      css += this.generateFabButtonVariables(name, baseColor);
      css += this.generateButtonGroupVariables(name, baseColor);
      css += this.generateChipVariables(name, baseColor);
      css += this.generateSwitchVariables(name, baseColor);
      css += this.generateModalVariables(name, baseColor);
      css += this.generateToastVariables(name, baseColor);
      css += this.generateProgressBarVariables(name, baseColor);
      css += this.generatePaginatorVariables(name, baseColor);
    });
    css += '}\n';
    return css;
  }

  private getDefaultGrays(): ThemeGrays {
    return {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    };
  }

  private generateStructuralVariables(grays: ThemeGrays): string {
    const isDark = this.isDark;
    return `
  /* Gray scale */
  --gray-50: ${grays[50]};
  --gray-100: ${grays[100]};
  --gray-200: ${grays[200]};
  --gray-300: ${grays[300]};
  --gray-400: ${grays[400]};
  --gray-500: ${grays[500]};
  --gray-600: ${grays[600]};
  --gray-700: ${grays[700]};
  --gray-800: ${grays[800]};
  --gray-900: ${grays[900]};

  /* Background colors */
  --bg-primary: ${isDark ? grays[900] : '#ffffff'};
  --bg-secondary: ${isDark ? grays[800] : grays[50]};
  --bg-tertiary: ${isDark ? grays[700] : grays[100]};

  /* Text colors */
  --text-primary: ${isDark ? grays[50] : grays[900]};
  --text-secondary: ${isDark ? grays[300] : grays[600]};
  --text-tertiary: ${isDark ? grays[400] : grays[500]};
  --text-disabled: ${isDark ? grays[600] : grays[400]};

  /* Border colors */
  --border-primary: ${isDark ? grays[700] : grays[200]};
  --border-secondary: ${isDark ? grays[800] : grays[100]};

  /* Shadow colors */
  --shadow-sm: ${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
  --shadow-md: ${isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.15)'};
  --shadow-lg: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)'};
  --shadow-xl: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.25)'};

  /* Focus ring */
  --focus-ring-color: ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)'};
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;

  /* Overlay */
  --overlay-bg: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
`;
  }

  private generateButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --button-${name}-solid-bg: ${color};
  --button-${name}-solid-text: ${textOnColor};
  --button-${name}-solid-border: ${color};
  --button-${name}-solid-hover-bg: ${hoverColor};
  --button-${name}-solid-hover-text: ${textOnColor};
  --button-${name}-solid-hover-border: ${hoverColor};
  --button-${name}-solid-active-bg: ${activeColor};
  --button-${name}-solid-active-border: ${activeColor};
  --button-${name}-outline-bg: transparent;
  --button-${name}-outline-text: ${color};
  --button-${name}-outline-border: ${color};
  --button-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --button-${name}-outline-hover-text: ${hoverColor};
  --button-${name}-outline-hover-border: ${hoverColor};
  --button-${name}-outline-active-bg: ${this.withAlpha(color, 0.2)};
  --button-${name}-outline-active-border: ${activeColor};
  --button-${name}-ghost-bg: transparent;
  --button-${name}-ghost-text: ${color};
  --button-${name}-ghost-border: transparent;
  --button-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.1)};
  --button-${name}-ghost-hover-text: ${hoverColor};
  --button-${name}-ghost-hover-border: transparent;
  --button-${name}-ghost-active-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --button-${name}-ghost-active-border: transparent;
  --button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateFabButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --fab-button-${name}-solid-bg: ${color};
  --fab-button-${name}-solid-text: ${textOnColor};
  --fab-button-${name}-solid-border: ${color};
  --fab-button-${name}-solid-hover-bg: ${hoverColor};
  --fab-button-${name}-solid-hover-text: ${textOnColor};
  --fab-button-${name}-solid-hover-border: ${hoverColor};
  --fab-button-${name}-solid-active-bg: ${activeColor};
  --fab-button-${name}-solid-active-border: ${activeColor};
  --fab-button-${name}-outline-bg: transparent;
  --fab-button-${name}-outline-text: ${color};
  --fab-button-${name}-outline-border: ${color};
  --fab-button-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --fab-button-${name}-outline-hover-text: ${hoverColor};
  --fab-button-${name}-outline-hover-border: ${hoverColor};
  --fab-button-${name}-outline-active-bg: ${activeColor};
  --fab-button-${name}-outline-active-border: ${activeColor};
  --fab-button-${name}-ghost-bg: ${this.withAlpha(color, 0.1)};
  --fab-button-${name}-ghost-text: ${color};
  --fab-button-${name}-ghost-border: transparent;
  --fab-button-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --fab-button-${name}-ghost-hover-text: ${hoverColor};
  --fab-button-${name}-ghost-hover-border: transparent;
  --fab-button-${name}-ghost-active-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --fab-button-${name}-ghost-active-border: transparent;
  --fab-button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateButtonGroupVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const hoverBg = this.withAlpha(color, 0.05);
    const inactiveBorder = this.isDark ? '#27272a' : '#e4e4e7';
    const inactiveBg = this.isDark ? '#18181b' : '#ffffff';
    return `
  --button-group-${name}-solid-bg: ${color};
  --button-group-${name}-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --button-group-${name}-solid-border: ${color};
  --button-group-${name}-solid-hover-bg: ${hoverColor};
  --button-group-${name}-solid-inactive-text: ${color};
  --button-group-${name}-solid-inactive-bg: ${inactiveBg};
  --button-group-${name}-solid-inactive-border: ${inactiveBorder};
  --button-group-${name}-solid-inactive-hover-bg: ${hoverBg};
  --button-group-${name}-outline-bg: ${this.withAlpha(color, 0.1)};
  --button-group-${name}-outline-text: ${color};
  --button-group-${name}-outline-border: ${color};
  --button-group-${name}-outline-hover-bg: ${this.withAlpha(color, 0.2)};
  --button-group-${name}-outline-inactive-bg: transparent;
  --button-group-${name}-outline-inactive-border: ${inactiveBorder};
  --button-group-${name}-ghost-bg: ${this.withAlpha(color, 0.1)};
  --button-group-${name}-ghost-text: ${color};
  --button-group-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --button-group-${name}-ghost-inactive-bg: transparent;
`;
  }

  private generateChipVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const selectedBg = this.isDark ? this.shade(color, 15) : this.shade(color, 10);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --chip-${name}-solid-bg: ${color};
  --chip-${name}-solid-text: ${textOnColor};
  --chip-${name}-solid-border: ${color};
  --chip-${name}-solid-hover-bg: ${hoverColor};
  --chip-${name}-solid-selected-bg: ${selectedBg};
  --chip-${name}-outline-bg: transparent;
  --chip-${name}-outline-text: ${color};
  --chip-${name}-outline-border: ${color};
  --chip-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --chip-${name}-outline-selected-bg: ${selectedBg};
  --chip-${name}-outline-selected-text: ${textOnColor};
  --chip-${name}-ghost-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --chip-${name}-ghost-text: ${color};
  --chip-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --chip-${name}-ghost-selected-bg: ${this.isDark ? this.shade(color, 60) : this.tint(color, 80)};
  --chip-${name}-ghost-selected-text: ${textOnColor};
  --chip-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateSwitchVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    return `
  --switch-${name}-color: ${color};
  --switch-${name}-color-hover: ${hoverColor};
  --switch-${name}-button-solid-bg: ${color};
  --switch-${name}-button-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --switch-${name}-button-solid-hover-bg: ${hoverColor};
  --switch-${name}-button-solid-inactive-bg: ${this.withAlpha(color, 0.2)};
  --switch-${name}-button-solid-inactive-text: ${color};
  --switch-${name}-button-outline-bg: ${this.withAlpha(color, 0.1)};
  --switch-${name}-button-outline-text: ${color};
  --switch-${name}-button-outline-hover-bg: ${this.withAlpha(color, 0.2)};
  --switch-${name}-button-ghost-bg: ${this.withAlpha(color, 0.1)};
  --switch-${name}-button-ghost-text: ${color};
  --switch-${name}-button-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
`;
  }

  private generateModalVariables(name: string, color: string): string {
    return `
  --modal-${name}-icon-color: ${color};
  --modal-${name}-text-color: ${color};
  --modal-${name}-border-color: ${color};
`;
  }

  private generateToastVariables(name: string, color: string): string {
    const bgColor = this.isDark ? this.shade(color, 85) : this.tint(color, 96);
    const bgColorHover = this.isDark ? this.shade(color, 80) : this.tint(color, 94);
    const borderColor = this.isDark ? this.shade(color, 70) : this.tint(color, 80);
    const textColor = this.isDark ? this.tint(color, 75) : this.shade(color, 25);
    const titleColor = this.isDark ? this.tint(color, 65) : this.shade(color, 30);
    const iconColor = this.isDark ? this.tint(color, 40) : color;
    const progressColor = this.isDark ? this.tint(color, 50) : color;
    return `
  --toast-${name}-bg: ${bgColor};
  --toast-${name}-bg-hover: ${bgColorHover};
  --toast-${name}-border: ${borderColor};
  --toast-${name}-color: ${textColor};
  --toast-${name}-title-color: ${titleColor};
  --toast-${name}-icon-color: ${iconColor};
  --toast-${name}-icon-bg: ${this.withAlpha(color, this.isDark ? 0.2 : 0.1)};
  --toast-${name}-progress-bg: ${progressColor};
  --toast-${name}-close-color: ${color};
  --toast-${name}-close-hover: ${color};
`;
  }

  private generateProgressBarVariables(name: string, color: string): string {
    return `
  --progress-bar-${name}-fill-bg: ${color};
  --progress-bar-${name}-fill-hover-bg: ${this.shade(color, 10)};
  --progress-bar-${name}-track-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --progress-bar-${name}-track-border: ${this.isDark ? this.shade(color, 70) : this.tint(color, 80)};
  --progress-bar-${name}-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --progress-bar-${name}-value-text: ${color};
`;
  }

  private generatePaginatorVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const hoverBg = this.withAlpha(color, 0.05);
    const inactiveBorder = this.isDark ? '#27272a' : '#e4e4e7';
    const inactiveBg = this.isDark ? '#18181b' : '#ffffff';
    const ghostActive = this.isDark ? this.shade(color, 80) : this.tint(color, 90);
    return `
  --paginator-${name}-solid-bg: ${color};
  --paginator-${name}-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --paginator-${name}-solid-hover-bg: ${hoverColor};
  --paginator-${name}-solid-active-bg: ${activeColor};
  --paginator-${name}-solid-inactive-text: ${color};
  --paginator-${name}-solid-inactive-bg: ${inactiveBg};
  --paginator-${name}-solid-inactive-border: ${inactiveBorder};
  --paginator-${name}-solid-inactive-hover-bg: ${hoverBg};
  --paginator-${name}-outline-bg: transparent;
  --paginator-${name}-outline-text: ${color};
  --paginator-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --paginator-${name}-outline-active-bg: ${ghostActive};
  --paginator-${name}-outline-inactive-bg: transparent;
  --paginator-${name}-ghost-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --paginator-${name}-ghost-text: ${color};
  --paginator-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.1)};
  --paginator-${name}-ghost-active-bg: ${ghostActive};
`;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => { const hex = Math.round(x).toString(16); return hex.length === 1 ? '0' + hex : hex; }).join('');
  }

  private shade(color: string, percent: number): string {
    const rgb = this.hexToRgb(color);
    const factor = 1 - percent / 100;
    return this.rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
  }

  private tint(color: string, percent: number): string {
    const rgb = this.hexToRgb(color);
    const factor = percent / 100;
    return this.rgbToHex(rgb.r + (255 - rgb.r) * factor, rgb.g + (255 - rgb.g) * factor, rgb.b + (255 - rgb.b) * factor);
  }

  private withAlpha(color: string, alpha: number): string {
    const rgb = this.hexToRgb(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
}
