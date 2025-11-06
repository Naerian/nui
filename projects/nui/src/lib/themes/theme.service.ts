import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

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
  darkMode?: 'auto' | 'manual' | 'system';
  darkModeClass?: string;
}

export const NUI_THEME_CONFIG = Symbol('NUI_THEME_CONFIG');

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private styleElement: HTMLStyleElement | null = null;
  private currentPreset: ThemePreset;
  private isDark = false;
  private darkModeStrategy: 'auto' | 'manual' | 'system' = 'manual';
  private darkModeClass: string = 'dark-mode';
  private mediaQuery?: MediaQueryList;
  
  // Observable para notificar cambios de preset
  private currentPresetSubject: BehaviorSubject<ThemePreset>;
  public currentPreset$: Observable<ThemePreset>;

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
    
    this.currentPresetSubject = new BehaviorSubject<ThemePreset>(this.currentPreset);
    this.currentPreset$ = this.currentPresetSubject.asObservable();
    
    this.darkModeStrategy = config?.darkMode || 'manual';
    this.darkModeClass = config?.darkModeClass || 'dark-mode';
    
    this.init();
  }

  private init(): void {
    this.styleElement = this.document.getElementById('nui-theme-colors') as HTMLStyleElement;
    if (!this.styleElement) {
      this.styleElement = this.document.createElement('style');
      this.styleElement.id = 'nui-theme-colors';
      this.document.head.appendChild(this.styleElement);
    }
    
    // Initialize dark mode based on strategy
    if (this.darkModeStrategy === 'auto' || this.darkModeStrategy === 'system') {
      this.setupSystemDarkMode();
    }
    
    this.updateColors();
  }

  private setupSystemDarkMode(): void {
    if (typeof window === 'undefined') return;
    
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = this.mediaQuery.matches;
    this.updateDarkModeClass();
    
    // Only listen for changes if strategy is 'auto'
    if (this.darkModeStrategy === 'auto') {
      this.mediaQuery.addEventListener('change', this.handleSystemDarkModeChange.bind(this));
    }
  }

  private handleSystemDarkModeChange(e: MediaQueryListEvent): void {
    this.isDark = e.matches;
    this.updateDarkModeClass();
    this.updateColors();
  }

  private updateDarkModeClass(): void {
    if (this.isDark) {
      this.document.documentElement.classList.add(this.darkModeClass);
    } else {
      this.document.documentElement.classList.remove(this.darkModeClass);
    }
  }

  /**
   * Manually toggle dark mode. 
   * Only works when darkMode strategy is 'manual' or not set.
   */
  toggleDarkMode(): void {
    if (this.darkModeStrategy !== 'manual') {
      console.warn('toggleDarkMode() only works when darkMode strategy is "manual"');
      return;
    }
    
    this.isDark = !this.isDark;
    this.updateDarkModeClass();
    this.updateColors();
  }

  /**
   * Manually set dark mode. 
   * Only works when darkMode strategy is 'manual' or not set.
   */
  setDarkMode(enabled: boolean): void {
    if (this.darkModeStrategy !== 'manual') {
      console.warn('setDarkMode() only works when darkMode strategy is "manual"');
      return;
    }
    
    this.isDark = enabled;
    this.updateDarkModeClass();
    this.updateColors();
  }

  /**
   * Get current dark mode state
   */
  isDarkMode(): boolean {
    return this.isDark;
  }

  /**
   * Get current dark mode strategy
   */
  getDarkModeStrategy(): 'auto' | 'manual' | 'system' {
    return this.darkModeStrategy;
  }

  usePreset(preset: ThemePreset): void {
    this.currentPreset = preset;
    this.currentPresetSubject.next(preset);
    this.updateColors();
  }

  /**
   * Get current preset
   */
  getCurrentPreset(): ThemePreset {
    return this.currentPreset;
  }

  updateColors(): void {
    if (!this.styleElement) return;
    this.styleElement.textContent = this.generateComponentVariables();
  }

  private generateComponentVariables(): string {
    const colors = this.isDark ? this.currentPreset.colors.dark : this.currentPreset.colors.light;
    const grays = this.currentPreset.grays || this.getDefaultGrays();
    
    let css = ':root {\n';
    
    // Structural variables (grays, text, bg, borders, shadows, focus, overlay, backdrop, spinner, switch)
    css += this.generateStructuralVariables(grays);
    
    // Modal gradient (uses warning and danger from preset)
    css += `  --nui-color-modal-gradient: linear-gradient(90deg, ${colors.warning}, ${colors.danger});\n`;
    
    // Generate base color variables and their tints/shades
    Object.entries(colors).forEach(([name, baseColor]) => {
      // Base color
      css += `  --nui-color-${name}: ${baseColor};\n`;
      
      // Generate tints (lighter versions): 95, 90, 80, 70, 60, 50
      css += `  --nui-color-${name}-tint-95: ${this.tint(baseColor, 95)};\n`;
      css += `  --nui-color-${name}-tint-90: ${this.tint(baseColor, 90)};\n`;
      css += `  --nui-color-${name}-tint-80: ${this.tint(baseColor, 80)};\n`;
      css += `  --nui-color-${name}-tint-70: ${this.tint(baseColor, 70)};\n`;
      css += `  --nui-color-${name}-tint-60: ${this.tint(baseColor, 60)};\n`;
      css += `  --nui-color-${name}-tint-50: ${this.tint(baseColor, 50)};\n`;
      
      // Generate shades (darker versions): 10, 20, 30, 40, 50
      css += `  --nui-color-${name}-shade-10: ${this.shade(baseColor, 10)};\n`;
      css += `  --nui-color-${name}-shade-20: ${this.shade(baseColor, 20)};\n`;
      css += `  --nui-color-${name}-shade-30: ${this.shade(baseColor, 30)};\n`;
      css += `  --nui-color-${name}-shade-40: ${this.shade(baseColor, 40)};\n`;
      css += `  --nui-color-${name}-shade-50: ${this.shade(baseColor, 50)};\n`;
      
      // Generate alpha variants: 10, 20, 30, 40, 50, 60, 70, 80, 90
      css += `  --nui-color-${name}-alpha-10: ${this.withAlpha(baseColor, 0.1)};\n`;
      css += `  --nui-color-${name}-alpha-20: ${this.withAlpha(baseColor, 0.2)};\n`;
      css += `  --nui-color-${name}-alpha-30: ${this.withAlpha(baseColor, 0.3)};\n`;
      css += `  --nui-color-${name}-alpha-40: ${this.withAlpha(baseColor, 0.4)};\n`;
      css += `  --nui-color-${name}-alpha-50: ${this.withAlpha(baseColor, 0.5)};\n`;
      css += `  --nui-color-${name}-alpha-60: ${this.withAlpha(baseColor, 0.6)};\n`;
      css += `  --nui-color-${name}-alpha-70: ${this.withAlpha(baseColor, 0.7)};\n`;
      css += `  --nui-color-${name}-alpha-80: ${this.withAlpha(baseColor, 0.8)};\n`;
      css += `  --nui-color-${name}-alpha-90: ${this.withAlpha(baseColor, 0.9)};\n`;
      
      // Component-specific variables
      css += this.generateButtonVariables(name, baseColor);
      css += this.generateFabButtonVariables(name, baseColor);
      css += this.generateButtonGroupVariables(name, baseColor);
      css += this.generateChipVariables(name, baseColor);
      css += this.generateSwitchVariables(name, baseColor);
      css += this.generateModalVariables(name, baseColor);
      css += this.generateToastVariables(name, baseColor);
      css += this.generateProgressBarVariables(name, baseColor);
      css += this.generatePaginatorVariables(name, baseColor);
      css += this.generateAvatarVariables(name, baseColor);
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
  --nui-gray-50: ${grays[50]};
  --nui-gray-100: ${grays[100]};
  --nui-gray-200: ${grays[200]};
  --nui-gray-300: ${grays[300]};
  --nui-gray-400: ${grays[400]};
  --nui-gray-500: ${grays[500]};
  --nui-gray-600: ${grays[600]};
  --nui-gray-700: ${grays[700]};
  --nui-gray-800: ${grays[800]};
  --nui-gray-900: ${grays[900]};

  /* Background colors */
  --nui-bg-primary: ${isDark ? grays[900] : '#ffffff'};
  --nui-bg-secondary: ${isDark ? grays[800] : grays[50]};
  --nui-bg-tertiary: ${isDark ? grays[700] : grays[100]};

  /* Text colors */
  --nui-text-primary: ${isDark ? grays[50] : grays[900]};
  --nui-text-secondary: ${isDark ? grays[300] : grays[600]};
  --nui-text-tertiary: ${isDark ? grays[400] : grays[500]};
  --nui-text-disabled: ${isDark ? grays[600] : grays[400]};

  /* Border colors */
  --nui-border-primary: ${isDark ? grays[700] : grays[200]};
  --nui-border-secondary: ${isDark ? grays[800] : grays[100]};

  /* Shadow colors */
  --nui-shadow-sm: ${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
  --nui-shadow-md: ${isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.15)'};
  --nui-shadow-lg: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)'};
  --nui-shadow-xl: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.25)'};

  /* Focus ring */
  --nui-focus-ring-color: ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)'};
  --nui-focus-ring-width: 2px;
  --nui-focus-ring-offset: 2px;

  /* Text selection */
  --nui-color-selection-bg: ${isDark ? grays[500] : grays[200]};

  /* Overlay & Backdrop */
  --nui-overlay-bg: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  --nui-color-backdrop: ${isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)'};

  /* Spinner */
  --nui-color-spinner-border: ${isDark ? grays[700] : grays[200]};
  --nui-color-spinner-backdrop: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};

  /* Switch */
  --nui-color-switch-track-bg: ${isDark ? grays[700] : grays[200]};
  --nui-color-switch-track-border: ${isDark ? grays[600] : grays[300]};
  --nui-color-switch-track-hover-border: ${isDark ? grays[500] : grays[400]};
  --nui-color-switch-thumb-bg: ${isDark ? '#ffffff' : '#ffffff'};

  /* Avatar */
  --nui-avatar-default-bg: ${isDark ? 'var(--nui-color-secondary-shade-20)' : 'var(--nui-color-secondary)'};
  --nui-avatar-default-color: ${isDark ? '#f8fafc' : '#ffffff'};
  --nui-avatar-group-border-color: ${isDark ? '#f8fafc' : '#ffffff'};
  --nui-avatar-excess-bg: ${isDark ? grays[700] : grays[300]};
  --nui-avatar-excess-color: ${isDark ? grays[200] : grays[700]};
  --nui-avatar-excess-hover-bg: ${isDark ? grays[600] : grays[400]};
`;
  }

  private generateButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --nui-button-${name}-solid-bg: ${color};
  --nui-button-${name}-solid-text: ${textOnColor};
  --nui-button-${name}-solid-border: ${color};
  --nui-button-${name}-solid-hover-bg: ${hoverColor};
  --nui-button-${name}-solid-hover-text: ${textOnColor};
  --nui-button-${name}-solid-hover-border: ${hoverColor};
  --nui-button-${name}-solid-active-bg: ${activeColor};
  --nui-button-${name}-solid-active-border: ${activeColor};
  --nui-button-${name}-outline-bg: transparent;
  --nui-button-${name}-outline-text: ${color};
  --nui-button-${name}-outline-border: ${color};
  --nui-button-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-button-${name}-outline-hover-text: ${hoverColor};
  --nui-button-${name}-outline-hover-border: ${hoverColor};
  --nui-button-${name}-outline-active-bg: ${this.withAlpha(color, 0.2)};
  --nui-button-${name}-outline-active-border: ${activeColor};
  --nui-button-${name}-ghost-bg: transparent;
  --nui-button-${name}-ghost-text: ${color};
  --nui-button-${name}-ghost-border: transparent;
  --nui-button-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-button-${name}-ghost-hover-text: ${hoverColor};
  --nui-button-${name}-ghost-hover-border: transparent;
  --nui-button-${name}-ghost-active-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-button-${name}-ghost-active-border: transparent;
  --nui-button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateFabButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --nui-fab-button-${name}-solid-bg: ${color};
  --nui-fab-button-${name}-solid-text: ${textOnColor};
  --nui-fab-button-${name}-solid-border: ${color};
  --nui-fab-button-${name}-solid-hover-bg: ${hoverColor};
  --nui-fab-button-${name}-solid-hover-text: ${textOnColor};
  --nui-fab-button-${name}-solid-hover-border: ${hoverColor};
  --nui-fab-button-${name}-solid-active-bg: ${activeColor};
  --nui-fab-button-${name}-solid-active-border: ${activeColor};
  --nui-fab-button-${name}-outline-bg: transparent;
  --nui-fab-button-${name}-outline-text: ${color};
  --nui-fab-button-${name}-outline-border: ${color};
  --nui-fab-button-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-fab-button-${name}-outline-hover-text: ${hoverColor};
  --nui-fab-button-${name}-outline-hover-border: ${hoverColor};
  --nui-fab-button-${name}-outline-active-bg: ${activeColor};
  --nui-fab-button-${name}-outline-active-border: ${activeColor};
  --nui-fab-button-${name}-ghost-bg: ${this.withAlpha(color, 0.1)};
  --nui-fab-button-${name}-ghost-text: ${color};
  --nui-fab-button-${name}-ghost-border: transparent;
  --nui-fab-button-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-fab-button-${name}-ghost-hover-text: ${hoverColor};
  --nui-fab-button-${name}-ghost-hover-border: transparent;
  --nui-fab-button-${name}-ghost-active-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-fab-button-${name}-ghost-active-border: transparent;
  --nui-fab-button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateButtonGroupVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const hoverBg = this.withAlpha(color, 0.05);
    const inactiveBorder = this.isDark ? '#27272a' : '#e4e4e7';
    const inactiveBg = this.isDark ? '#18181b' : '#ffffff';
    return `
  --nui-button-group-${name}-solid-bg: ${color};
  --nui-button-group-${name}-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --nui-button-group-${name}-solid-border: ${color};
  --nui-button-group-${name}-solid-hover-bg: ${hoverColor};
  --nui-button-group-${name}-solid-inactive-text: ${color};
  --nui-button-group-${name}-solid-inactive-bg: ${inactiveBg};
  --nui-button-group-${name}-solid-inactive-border: ${inactiveBorder};
  --nui-button-group-${name}-solid-inactive-hover-bg: ${hoverBg};
  --nui-button-group-${name}-outline-bg: ${this.withAlpha(color, 0.1)};
  --nui-button-group-${name}-outline-text: ${color};
  --nui-button-group-${name}-outline-border: ${color};
  --nui-button-group-${name}-outline-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-button-group-${name}-outline-inactive-bg: transparent;
  --nui-button-group-${name}-outline-inactive-border: ${inactiveBorder};
  --nui-button-group-${name}-ghost-bg: ${this.withAlpha(color, 0.1)};
  --nui-button-group-${name}-ghost-text: ${color};
  --nui-button-group-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-button-group-${name}-ghost-inactive-bg: transparent;
`;
  }

  private generateChipVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const selectedBg = this.isDark ? this.shade(color, 15) : this.shade(color, 10);
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    return `
  --nui-chip-${name}-solid-bg: ${color};
  --nui-chip-${name}-solid-text: ${textOnColor};
  --nui-chip-${name}-solid-border: ${color};
  --nui-chip-${name}-solid-hover-bg: ${hoverColor};
  --nui-chip-${name}-solid-selected-bg: ${selectedBg};
  --nui-chip-${name}-outline-bg: transparent;
  --nui-chip-${name}-outline-text: ${color};
  --nui-chip-${name}-outline-border: ${color};
  --nui-chip-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-chip-${name}-outline-selected-bg: ${selectedBg};
  --nui-chip-${name}-outline-selected-text: ${textOnColor};
  --nui-chip-${name}-ghost-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-chip-${name}-ghost-text: ${color};
  --nui-chip-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-chip-${name}-ghost-selected-bg: ${this.isDark ? this.shade(color, 60) : this.tint(color, 80)};
  --nui-chip-${name}-ghost-selected-text: ${textOnColor};
  --nui-chip-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateSwitchVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    return `
  --nui-switch-${name}-color: ${color};
  --nui-switch-${name}-color-hover: ${hoverColor};
  --nui-switch-${name}-button-solid-bg: ${color};
  --nui-switch-${name}-button-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --nui-switch-${name}-button-solid-hover-bg: ${hoverColor};
  --nui-switch-${name}-button-solid-inactive-bg: ${this.withAlpha(color, 0.2)};
  --nui-switch-${name}-button-solid-inactive-text: ${color};
  --nui-switch-${name}-button-outline-bg: ${this.withAlpha(color, 0.1)};
  --nui-switch-${name}-button-outline-text: ${color};
  --nui-switch-${name}-button-outline-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-switch-${name}-button-ghost-bg: ${this.withAlpha(color, 0.1)};
  --nui-switch-${name}-button-ghost-text: ${color};
  --nui-switch-${name}-button-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
`;
  }

  private generateModalVariables(name: string, color: string): string {
    return `
  --nui-modal-${name}-icon-color: ${color};
  --nui-modal-${name}-text-color: ${color};
  --nui-modal-${name}-border-color: ${color};
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
  --nui-toast-${name}-bg: ${bgColor};
  --nui-toast-${name}-bg-hover: ${bgColorHover};
  --nui-toast-${name}-border: ${borderColor};
  --nui-toast-${name}-color: ${textColor};
  --nui-toast-${name}-title-color: ${titleColor};
  --nui-toast-${name}-icon-color: ${iconColor};
  --nui-toast-${name}-icon-bg: ${this.withAlpha(color, this.isDark ? 0.2 : 0.1)};
  --nui-toast-${name}-progress-bg: ${progressColor};
  --nui-toast-${name}-close-color: ${color};
  --nui-toast-${name}-close-hover: ${color};
`;
  }

  private generateProgressBarVariables(name: string, color: string): string {
    return `
  --nui-progress-bar-${name}-fill-bg: ${color};
  --nui-progress-bar-${name}-fill-hover-bg: ${this.shade(color, 10)};
  --nui-progress-bar-${name}-track-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-progress-bar-${name}-track-border: ${this.isDark ? this.shade(color, 70) : this.tint(color, 80)};
  --nui-progress-bar-${name}-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --nui-progress-bar-${name}-value-text: ${color};
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
  --nui-paginator--${name}-solid-bg: ${color};
  --nui-paginator--${name}-solid-text: ${this.isDark ? '#f8fafc' : '#ffffff'};
  --nui-paginator--${name}-solid-hover-bg: ${hoverColor};
  --nui-paginator--${name}-solid-active-bg: ${activeColor};
  --nui-paginator--${name}-solid-inactive-text: ${color};
  --nui-paginator--${name}-solid-inactive-bg: ${inactiveBg};
  --nui-paginator--${name}-solid-inactive-border: ${inactiveBorder};
  --nui-paginator--${name}-solid-inactive-hover-bg: ${hoverBg};
  --nui-paginator--${name}-outline-bg: transparent;
  --nui-paginator--${name}-outline-text: ${color};
  --nui-paginator--${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-paginator--${name}-outline-active-bg: ${ghostActive};
  --nui-paginator--${name}-outline-inactive-bg: transparent;
  --nui-paginator--${name}-ghost-bg: ${this.isDark ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-paginator--${name}-ghost-text: ${color};
  --nui-paginator--${name}-ghost-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-paginator--${name}-ghost-active-bg: ${ghostActive};
`;
  }

  private generateAvatarVariables(name: string, color: string): string {
    const shadeColor = this.isDark ? this.shade(color, 10) : color;
    const textOnColor = this.isDark ? '#f8fafc' : '#ffffff';
    
    return `
  --nui-avatar-${name}-bg: ${shadeColor};
  --nui-avatar-${name}-color: ${textOnColor};
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
