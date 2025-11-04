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

export interface ThemePreset {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
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
    let css = ':root {\n';
    Object.entries(colors).forEach(([name, baseColor]) => {
      css += this.generateButtonVariables(name, baseColor);
      css += this.generateFabButtonVariables(name, baseColor);
    });
    css += '}\n';
    return css;
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
