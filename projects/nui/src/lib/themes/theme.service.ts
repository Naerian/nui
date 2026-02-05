import { Injectable, Inject, Optional, signal, computed, Signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  ThemeGrays,
  ThemePreset,
  ThemeConfig,
  DarkModeStrategy,
  DARK_MODE_CLASS,
  DarkModeStrategyEnum,
} from './models/theme.model';
import {
  PURE_COLORS,
  DEFAULT_GRAYS,
  DEFAULT_PRESET,
  NUI_THEME_CONFIG,
  LUMINANCE_UMBRAL,
} from './models/theme.config';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Internal variables
  private styleElement: HTMLStyleElement | null = null;
  private darkModeStrategy: DarkModeStrategy = DarkModeStrategyEnum.MANUAL;
  private darkModeClass: string = DARK_MODE_CLASS;
  private mediaQuery?: MediaQueryList;

  // Signals
  private _isDarkMode = signal(false);
  private _currentPreset = signal<ThemePreset>(DEFAULT_PRESET);

  // ReadonlySignals
  readonly isDarkMode: Signal<boolean> = this._isDarkMode.asReadonly();
  readonly currentPreset: Signal<ThemePreset> = this._currentPreset.asReadonly();

  // Computed signals
  readonly colors = computed(() =>
    this._isDarkMode() ? this._currentPreset().colors.dark : this._currentPreset().colors.light
  );

  // Observables for users who need RxJS interoperability
  readonly isDarkMode$: Observable<boolean> = toObservable(this._isDarkMode);
  readonly currentPreset$: Observable<ThemePreset> = toObservable(this._currentPreset);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(NUI_THEME_CONFIG) config?: ThemeConfig
  ) {
    // Inicializar preset desde config si existe
    if (config?.preset) {
      this._currentPreset.set(config.preset);
    }

    this.darkModeStrategy = config?.darkMode || DarkModeStrategyEnum.MANUAL;
    this.darkModeClass = config?.darkModeClass || DARK_MODE_CLASS;

    this.init();
  }

  /**
   * Initialize theme by creating the style element and setting up dark mode if needed.
   * This method creates a <style> element in the head of the document to dynamically inject CSS variables.
   */
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

  /**
   * Set up system dark mode detection using the 'prefers-color-scheme' media query.
   * This method listens for changes in the user's system dark mode preference and updates the theme accordingly.
   */
  private setupSystemDarkMode(): void {
    if (typeof window === 'undefined') return;

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this._isDarkMode.set(this.mediaQuery.matches);
    this.updateDarkModeClass();

    // Only listen for changes if strategy is 'auto'
    if (this.darkModeStrategy === 'auto') {
      this.mediaQuery.addEventListener('change', this.handleSystemDarkModeChange.bind(this));
    }
  }

  /**
   * Handle changes in system dark mode preference.
   * This method is called whenever the 'prefers-color-scheme' media query changes,
   * allowing the theme to react to system-level dark mode changes in real-time.
   */
  private handleSystemDarkModeChange(e: MediaQueryListEvent): void {
    this._isDarkMode.set(e.matches);
    this.updateDarkModeClass();
    this.updateColors();
  }

  /**
   * Update the document's class list to reflect the current dark mode state.
   * This method adds or removes the specified dark mode class on the document's root
   * element based on the current value of the isDarkMode signal.
   */
  private updateDarkModeClass(): void {
    if (this._isDarkMode()) {
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
    if (this.darkModeStrategy !== DarkModeStrategyEnum.MANUAL) {
      console.warn('toggleDarkMode() only works when darkMode strategy is "manual"');
      return;
    }

    this._isDarkMode.update(current => !current);
    this.updateDarkModeClass();
    this.updateColors();
  }

  /**
   * Manually set dark mode.
   * Only works when darkMode strategy is 'manual' or not set.
   */
  setDarkMode(enabled: boolean): void {
    if (this.darkModeStrategy !== DarkModeStrategyEnum.MANUAL) {
      console.warn('setDarkMode() only works when darkMode strategy is "manual"');
      return;
    }

    this._isDarkMode.set(enabled);
    this.updateDarkModeClass();
    this.updateColors();
  }

  /**
   * Get current dark mode strategy
   * This method returns the current dark mode strategy being used by the theme service, which can be 'auto', 'manual', or 'system'.
   * @returns {DarkModeStrategy} The current dark mode strategy.
   */
  getDarkModeStrategy(): DarkModeStrategy {
    return this.darkModeStrategy;
  }

  /**
   * Use a specific theme preset.
   * This method allows users to switch between different theme presets at runtime
   * by providing a ThemePreset object.
   */
  usePreset(preset: ThemePreset): void {
    this._currentPreset.set(preset);
    this.updateColors();
  }

  /**
   * Update CSS variables based on the current theme preset and dark mode state.
   * This method generates the necessary CSS variable definitions and injects them into
   * the style element in the document head,
   */
  updateColors(): void {
    if (!this.styleElement) return;
    this.styleElement.textContent = this.generateComponentVariables();
  }

  /**
   * Calculate a contrasting color (black or white) based on the luminance of the input color.
   * This method is used to ensure that text or icons placed on top of a background color have sufficient
   * contrast for readability.
   * @param {string} hexColor - The input color in hexadecimal format (e.g., '#ff0000').
   * @returns {string} - Returns '#000000' for light colors and '#ffffff' for dark colors to ensure contrast.
   */
  public getContrastColor(hexColor: string): string {
    let rgb: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 }; // Valor por defecto

    const isCssKeyword = this.isCSSColorKeyword(hexColor);

    if (!isCssKeyword) {
      rgb = this.hexToRgb(hexColor);
    } else {
      const hex = this.cssKeywordToHex(hexColor);
      rgb = this.hexToRgb(hex);
    }

    // Relative luminance formula (WCAG standard)
    const getLuminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const lum = getLuminance(rgb.r, rgb.g, rgb.b);
    // If luminance is high (light color), use black text. If low (dark), use white text.
    return lum > LUMINANCE_UMBRAL ? PURE_COLORS.BLACK : PURE_COLORS.WHITE;
  }

  /**
   * Generate CSS variable definitions for all components based on the current theme preset and dark mode state.
   * This method creates a string of CSS variable definitions that includes
   * base colors, tints, shades, alpha variants,
   */
  private generateComponentVariables(): string {
    const colors = this._isDarkMode()
      ? this._currentPreset().colors.dark
      : this._currentPreset().colors.light;
    const grays = this._currentPreset().grays || this.getDefaultGrays();

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
      css += this.generateSwitchButtonVariables(name, baseColor);
      css += this.generateModalVariables(name, baseColor);
      css += this.generateToastVariables(name, baseColor);
      css += this.generateProgressBarVariables(name, baseColor);
      css += this.generatePaginatorVariables(name, baseColor);
      css += this.generateAvatarVariables(name, baseColor);
      css += this.generateActionMenuVariables(name, baseColor);
    });

    // Generar variables de Tooltip y Popover (no dependen de colores semánticos)
    css += this.generateTooltipVariables();
    css += this.generatePopoverVariables();

    css += '}\n';
    return css;
  }

  /**
   * Get default gray scale colors.
   * This method returns a default set of gray colors that are used for structural elements like backgrounds, borders, and text when a custom preset does not provide its own grays.
   * @return {ThemeGrays} An object containing the default gray scale colors.
   */
  private getDefaultGrays(): ThemeGrays {
    return DEFAULT_GRAYS;
  }

  /**
   * Generate CSS variable definitions for structural colors and elements based on the provided gray scale.
   * This method creates CSS variable definitions for grays, background colors, text colors, border colors, shadow opacities, focus ring color, text selection color, overlay/backdrop colors, spinner colors, and switch colors.
   * The generated variables adapt based on whether the current theme is in dark mode or light mode, ensuring appropriate contrast and aesthetics for each mode.
   * @param {ThemeGrays} grays - An object containing the gray scale colors to be used in the theme.
   * @return {string} A string containing the CSS variable definitions for structural colors and elements.
   */
  private generateStructuralVariables(grays: ThemeGrays): string {
    const isDark = this._isDarkMode();
    const currentColors = this.colors();
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
  --nui-bg-primary: ${isDark ? grays[900] : PURE_COLORS.WHITE};
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

  /* Eliminamos las sombras terminadas y enviamos solo opacidades */
  --nui-shadow-opacity-sm: ${isDark ? '0.5' : '0.1'};
  --nui-shadow-opacity-md: ${isDark ? '0.6' : '0.15'};
  --nui-shadow-opacity-lg: ${isDark ? '0.7' : '0.2'};
  --nui-shadow-opacity-xl: ${isDark ? '0.8' : '0.25'};

  /* Shadow base (RGB para poder usarlo en rgba() de SCSS) */
  --nui-shadow-base-rgb: ${isDark ? '0, 0, 0' : '0, 0, 0'}; 

  /* Multiplicador para hacer las sombras más densas en Dark Mode si se desea */
  --nui-shadow-opacity-scale: ${isDark ? '2.5' : '1'};

  /* Focus ring */
  --nui-focus-ring-color: ${this.withAlpha(currentColors.primary, 0.5)};

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
  --nui-color-switch-thumb-bg: ${isDark ? PURE_COLORS.WHITE : PURE_COLORS.WHITE};

`;
  }

  /**
   * =====================================================================
   * Methods to generate component-specific CSS variables (buttons, chips, modals, etc.) based on the theme colors.
   * Each method generates a set of CSS variable definitions for a specific component, using the provided color as a base.
   * The generated variables include styles for different states (default, hover, active) and variants (solid, outline, ghost).
   * These methods ensure that all components have consistent styling that adapts to the current theme preset and dark mode state.
   * =====================================================================
   */

  private generateButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const contrastText = this.getContrastColor(color);

    return `
  --nui-button-${name}-solid-bg: ${color};
  --nui-button-${name}-solid-text: ${contrastText};
  --nui-button-${name}-solid-border: transparent;
  --nui-button-${name}-solid-hover-bg: ${hoverColor};
  --nui-button-${name}-solid-hover-text: ${contrastText};
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
  --nui-button-${name}-ghost-active-bg: ${this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-button-${name}-ghost-active-border: transparent;
  --nui-button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateFabButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const contrastText = this.getContrastColor(color);

    return `
  --nui-fab-button-${name}-solid-bg: ${color};
  --nui-fab-button-${name}-solid-text: ${contrastText};
  --nui-fab-button-${name}-solid-border: ${color};
  --nui-fab-button-${name}-solid-hover-bg: ${hoverColor};
  --nui-fab-button-${name}-solid-hover-text: ${contrastText};
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
  --nui-fab-button-${name}-ghost-active-bg: ${this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-fab-button-${name}-ghost-active-border: transparent;
  --nui-fab-button-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateButtonGroupVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const hoverBg = this.withAlpha(color, 0.05);
    const inactiveBorder = this._isDarkMode() ? DEFAULT_GRAYS[900] : DEFAULT_GRAYS[200];
    const inactiveBg = this._isDarkMode() ? DEFAULT_GRAYS[900] : PURE_COLORS.WHITE;
    const contrastText = this.getContrastColor(color);

    return `
  --nui-button-group-${name}-solid-bg: ${color};
  --nui-button-group-${name}-solid-text: ${contrastText};
  --nui-button-group-${name}-solid-border: ${color};
  --nui-button-group-${name}-solid-box-border: ${inactiveBg};
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
  --nui-button-group-${name}-outline-inactive-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-button-group-${name}-outline-inactive-text: ${color};
  --nui-button-group-${name}-outline-inactive-border: ${inactiveBorder};
  --nui-button-group-${name}-ghost-bg: ${this.withAlpha(color, 0.1)};
  --nui-button-group-${name}-ghost-text: ${color};
  --nui-button-group-${name}-ghost-border: transparent;
  --nui-button-group-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-button-group-${name}-ghost-hover-text: ${hoverColor};
  --nui-button-group-${name}-ghost-hover-border: transparent;
  --nui-button-group-${name}-ghost-inactive-bg: transparent;
  --nui-button-group-${name}-ghost-inactive-text: ${color};
  --nui-button-group-${name}-ghost-inactive-border: transparent;
  --nui-button-group-${name}-ghost-inactive-hover-bg: ${this.withAlpha(color, 0.08)};
`;
  }

  private generateChipVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const selectedBg = this._isDarkMode() ? this.shade(color, 15) : this.shade(color, 10);
    const contrastText = this.getContrastColor(color);

    return `
  --nui-chip-${name}-solid-bg: ${color};
  --nui-chip-${name}-solid-text: ${contrastText};
  --nui-chip-${name}-solid-border: ${color};
  --nui-chip-${name}-solid-hover-bg: ${hoverColor};
  --nui-chip-${name}-solid-selected-bg: ${selectedBg};
  --nui-chip-${name}-outline-bg: transparent;
  --nui-chip-${name}-outline-text: ${color};
  --nui-chip-${name}-outline-border: ${color};
  --nui-chip-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-chip-${name}-outline-selected-bg: ${selectedBg};
  --nui-chip-${name}-outline-selected-text: ${contrastText};
  --nui-chip-${name}-ghost-bg: ${this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-chip-${name}-ghost-text: ${color};
  --nui-chip-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.2)};
  --nui-chip-${name}-ghost-selected-bg: ${this._isDarkMode() ? this.shade(color, 60) : this.tint(color, 80)};
  --nui-chip-${name}-ghost-selected-text: ${contrastText};
  --nui-chip-${name}-focus-color: ${this.tint(color, 60)};
`;
  }

  private generateSwitchButtonVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    return `
  --nui-switch-${name}-color: ${color};
  --nui-switch-${name}-color-hover: ${hoverColor};
  --nui-switch-${name}-button-solid-bg: ${color};
  --nui-switch-${name}-button-solid-text: ${this._isDarkMode() ? PURE_COLORS.BLACK : PURE_COLORS.WHITE};
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
    const bgColor = this._isDarkMode() ? this.shade(color, 85) : this.tint(color, 96);
    const bgColorHover = this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 94);
    const borderColor = this._isDarkMode() ? this.shade(color, 70) : this.tint(color, 80);
    const textColor = this._isDarkMode() ? this.tint(color, 75) : this.shade(color, 25);
    const titleColor = this._isDarkMode() ? this.tint(color, 65) : this.shade(color, 30);
    const iconColor = this._isDarkMode() ? this.tint(color, 40) : color;
    const progressColor = this._isDarkMode() ? this.tint(color, 50) : color;
    return `
  --nui-toast-${name}-bg: ${bgColor};
  --nui-toast-${name}-bg-hover: ${bgColorHover};
  --nui-toast-${name}-border: ${borderColor};
  --nui-toast-${name}-color: ${textColor};
  --nui-toast-${name}-title-color: ${titleColor};
  --nui-toast-${name}-icon-color: ${iconColor};
  --nui-toast-${name}-icon-bg: ${this.withAlpha(color, this._isDarkMode() ? 0.2 : 0.1)};
  --nui-toast-${name}-progress-bg: ${progressColor};
  --nui-toast-${name}-close-color: ${color};
  --nui-toast-${name}-close-hover: ${color};
`;
  }

  private generateProgressBarVariables(name: string, color: string): string {
    return `
  --nui-progress-bar-${name}-fill-bg: ${color};
  --nui-progress-bar-${name}-fill-hover-bg: ${this.shade(color, 10)};
  --nui-progress-bar-${name}-track-bg: ${this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-progress-bar-${name}-track-border: ${this._isDarkMode() ? this.shade(color, 70) : this.tint(color, 80)};
  --nui-progress-bar-${name}-text: ${this._isDarkMode() ? PURE_COLORS.BLACK : PURE_COLORS.WHITE};
  --nui-progress-bar-${name}-value-text: ${color};
`;
  }

  private generatePaginatorVariables(name: string, color: string): string {
    const hoverColor = this.shade(color, 10);
    const activeColor = this.shade(color, 20);
    const hoverBg = this.withAlpha(color, 0.05);
    const inactiveBorder = this._isDarkMode() ? DEFAULT_GRAYS[900] : DEFAULT_GRAYS[200];
    const inactiveBg = this._isDarkMode() ? DEFAULT_GRAYS[900] : PURE_COLORS.WHITE;
    const inactiveHoverBg = this.withAlpha(color, 0.08);
    const ghostActive = this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90);
    const ghostInactiveBg = this._isDarkMode() ? this.shade(color, 85) : this.tint(color, 95);
    const ghostInactiveHoverBg = this.withAlpha(color, 0.12);
    const contrastText = this.getContrastColor(color);

    return `
  --nui-paginator-${name}-solid-bg: ${color};
  --nui-paginator-${name}-solid-text: ${contrastText};
  --nui-paginator-${name}-solid-border: ${color};
  --nui-paginator-${name}-solid-hover-bg: ${hoverColor};
  --nui-paginator-${name}-solid-hover-border: ${hoverColor};
  --nui-paginator-${name}-solid-active-bg: ${activeColor};
  --nui-paginator-${name}-solid-inactive-text: ${color};
  --nui-paginator-${name}-solid-inactive-bg: ${inactiveBg};
  --nui-paginator-${name}-solid-inactive-border: ${inactiveBorder};
  --nui-paginator-${name}-solid-inactive-hover-bg: ${hoverBg};
  --nui-paginator-${name}-outline-bg: transparent;
  --nui-paginator-${name}-outline-text: ${color};
  --nui-paginator-${name}-outline-border: ${color};
  --nui-paginator-${name}-outline-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-paginator-${name}-outline-hover-border: ${hoverColor};
  --nui-paginator-${name}-outline-active-bg: ${ghostActive};
  --nui-paginator-${name}-outline-inactive-text: ${color};
  --nui-paginator-${name}-outline-inactive-bg: transparent;
  --nui-paginator-${name}-outline-inactive-border: ${inactiveBorder};
  --nui-paginator-${name}-outline-inactive-hover-bg: ${inactiveHoverBg};
  --nui-paginator-${name}-ghost-bg: ${this._isDarkMode() ? this.shade(color, 80) : this.tint(color, 90)};
  --nui-paginator-${name}-ghost-text: ${color};
  --nui-paginator-${name}-ghost-border: transparent;
  --nui-paginator-${name}-ghost-hover-bg: ${this.withAlpha(color, 0.1)};
  --nui-paginator-${name}-ghost-hover-border: transparent;
  --nui-paginator-${name}-ghost-active-bg: ${ghostActive};
  --nui-paginator-${name}-ghost-inactive-text: ${color};
  --nui-paginator-${name}-ghost-inactive-bg: ${ghostInactiveBg};
  --nui-paginator-${name}-ghost-inactive-border: transparent;
  --nui-paginator-${name}-ghost-inactive-hover-bg: ${ghostInactiveHoverBg};
`;
  }

  private generateAvatarVariables(name: string, color: string): string {
    const shadeColor = this._isDarkMode() ? this.shade(color, 10) : color;
    const hoverColor = this.shade(color, 10);
    const contrastText = this.getContrastColor(color);
    const borderInsetShadow = this._isDarkMode() ? PURE_COLORS.BLACK : PURE_COLORS.WHITE;
    const borderShadow = `inset 0 0 1px 0px ${borderInsetShadow}, 0 0 1px 0px ${borderInsetShadow}`;

    return `
  --nui-avatar-default-bg: ${this._isDarkMode() ? 'var(--nui-color-secondary-shade-20)' : 'var(--nui-color-secondary)'};
  --nui-avatar-default-color: ${this._isDarkMode() ? PURE_COLORS.BLACK : PURE_COLORS.WHITE};
  --nui-avatar-${name}-excess-bg: ${color};
  --nui-avatar-${name}-excess-color: ${contrastText};
  --nui-avatar-${name}-excess-hover-bg: ${hoverColor};
  --nui-avatar-border-color: var(--nui-color-secondary);
  --nui-avatar-border-shadow: ${borderShadow};
  --nui-avatar-${name}-bg: ${shadeColor};
  --nui-avatar-${name}-color: ${contrastText};
`;
  }

  private generateActionMenuVariables(name: string, color: string): string {
    const hoverBg = this._isDarkMode() ? this.withAlpha(color, 0.15) : this.tint(color, 95);
    const hoverColor = this._isDarkMode() ? this.tint(color, 60) : color;
    const hoverIconColor = this._isDarkMode() ? this.tint(color, 50) : color;
    const hoverBorderColor = this._isDarkMode() ? this.tint(color, 35) : this.tint(color, 65);
    const hoverSubtitleColor = this._isDarkMode() ? this.tint(color, 40) : this.tint(color, 40);
    const checkColor = this._isDarkMode() ? this.tint(color, 50) : color;
    const selectedBg = this._isDarkMode() ? this.withAlpha(color, 0.15) : this.tint(color, 95);
    const selectedColor = this._isDarkMode() ? this.tint(color, 60) : color;
    const selectedIconColor = this._isDarkMode() ? this.tint(color, 50) : color;
    const selectedSubtitleColor = this._isDarkMode() ? this.tint(color, 40) : this.tint(color, 40);
    const selectedHoverBg = this._isDarkMode() ? this.withAlpha(color, 0.2) : this.tint(color, 90);
    const selectedHoverColor = this._isDarkMode() ? this.tint(color, 65) : color;
    const selectedHoverIconColor = this._isDarkMode() ? this.tint(color, 55) : color;
    const selectedHoverSubtitleColor = this._isDarkMode()
      ? this.tint(color, 45)
      : this.tint(color, 35);
    const focusColor = this._isDarkMode() ? this.withAlpha(color, 0.15) : this.tint(color, 95);

    return `
  --nui-action-menu-bg: var(--nui-bg-primary);
  
  --nui-action-menu-item-bg: transparent;
  --nui-action-menu-item-color: var(--nui-text-primary);
  --nui-action-menu-item-notify-selected: var(--nui-color-primary);

  --nui-action-menu-${name}-item-hover-bg: ${hoverBg};
  --nui-action-menu-${name}-item-hover-color: ${hoverColor};
  --nui-action-menu-${name}-item-hover-icon-color: ${hoverIconColor};
  --nui-action-menu-${name}-item-hover-border-color: ${hoverBorderColor};
  --nui-action-menu-${name}-item-hover-subtitle-color: ${hoverSubtitleColor};
  --nui-action-menu-${name}-item-check-color: ${checkColor};
  --nui-action-menu-${name}-item-selected-bg: ${selectedBg};
  --nui-action-menu-${name}-item-selected-color: ${selectedColor};
  --nui-action-menu-${name}-item-selected-icon-color: ${selectedIconColor};
  --nui-action-menu-${name}-item-selected-subtitle-color: ${selectedSubtitleColor};
  --nui-action-menu-${name}-item-selected-hover-bg: ${selectedHoverBg};
  --nui-action-menu-${name}-item-selected-hover-color: ${selectedHoverColor};
  --nui-action-menu-${name}-item-selected-hover-icon-color: ${selectedHoverIconColor};
  --nui-action-menu-${name}-item-selected-hover-subtitle-color: ${selectedHoverSubtitleColor};
  --nui-action-menu-${name}-item-focus-color: ${focusColor};
`;
  }

  /**
   * Genera variables de color para Tooltip según el tema.
   * El tooltip usa colores inversos al tema para mejor contraste.
   */
  private generateTooltipVariables(): string {
    // Tooltip usa el mismo fondo que popover (bg-primary) para consistencia
    return `
  --tooltip-bg: var(--nui-bg-primary);
  --tooltip-text: var(--nui-text-primary);
`;
  }

  /**
   * Genera variables de color para Popover según el tema.
   * El popover usa los colores del tema con un fondo ligeramente elevado.
   */
  private generatePopoverVariables(): string {
    if (this._isDarkMode()) {
      return `
  --popover-bg: var(--nui-bg-primary);
  --popover-text: var(--nui-text-primary);
  --popover-border-color: var(--nui-gray-600);
`;
    } else {
      return `
  --popover-bg: var(--nui-bg-primary);
  --popover-text: var(--nui-text-primary);
  --popover-border-color: var(--nui-gray-200);
`;
    }
  }

  /**
   * ======================================================================
   * Utility methods for color manipulation and validation.
   * These methods include checking if a value is a valid CSS color keyword, converting CSS color
   * keywords to hex format, converting between hex and RGB color formats, and generating shaded,
   * tinted, and alpha variants of colors.
   * These utilities are essential for generating the various color variants needed for the theme
   * based on the base colors defined in the presets.
   *  =====================================================================
   */

  /**
   * Checks if a given value is a valid CSS color keyword.
   * This method creates a temporary DOM element and attempts to set its color style to the provided value.
   * If the browser recognizes the value as a valid color, it will be reflected in the computed style of the element.
   * @param {unknown} value - The value to check for being a valid CSS color keyword.
   * @return {boolean} True if the value is a valid CSS color keyword, false otherwise.
   */
  private isCSSColorKeyword(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    const s = new Option().style;
    s.color = '';
    s.color = value;

    return s.color !== '';
  }

  /**
   * Converts a CSS color keyword to its hexadecimal color code representation.
   * This method creates a temporary DOM element, sets its color style to the provided
   * CSS keyword, and then retrieves the computed color value.
   * If the conversion fails for any reason, the method returns a default black color in hexadecimal format.
   * @param {string} color - The CSS color keyword to convert to hexadecimal format.
   * @return {string} The hexadecimal color code representation of the provided CSS color keyword, or '#000000' if conversion fails.
   */
  private cssKeywordToHex(color: string): string {
    const el = document.createElement('div');
    el.style.color = color;
    document.body.appendChild(el);

    const computed = getComputedStyle(el).color;
    document.body.removeChild(el);

    // computed será algo como: "rgb(255, 255, 255)"
    const match = computed.match(/\d+/g);

    // Si no se pudo convertir a RGB, devolvemos el color negro por defecto
    if (!match || match.length < 3) return '#000000';

    const [r, g, b] = match.map(Number);

    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Converts a hexadecimal color code to its RGB representation.
   * @param {string} hex - The hexadecimal color code to convert.
   * @return {{ r: number; g: number; b: number }} An object representing the RGB components of the color.
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 0, g: 0, b: 0 };
  }

  /**
   * Converts RGB color values to a hexadecimal color code.
   * @param {number} r - The red component of the color.
   * @param {number} g - The green component of the color.
   * @param {number} b - The blue component of the color.
   * @return {string} The hexadecimal color code representation of the RGB color.
   */
  private rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map(x => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  /**
   * Generates a shaded version of the given color by darkening it by a specified percentage.
   * @param {string} color - The base color in hexadecimal format to shade.
   * @param {number} percent - The percentage by which to darken the color (0-100).
   * @return {string} The shaded color in hexadecimal format.
   */
  private shade(color: string, percent: number): string {
    const rgb = this.hexToRgb(color);
    const factor = 1 - percent / 100;
    const r = Math.max(0, Math.min(255, Math.round(rgb.r * factor)));
    const g = Math.max(0, Math.min(255, Math.round(rgb.g * factor)));
    const b = Math.max(0, Math.min(255, Math.round(rgb.b * factor)));
    return this.rgbToHex(r, g, b);
  }

  /**
   * Generates a tinted version of the given color by lightening it by a specified percentage.
   * @param {string} color - The base color in hexadecimal format to tint.
   * @param {number} percent - The percentage by which to lighten the color (0-100).
   * @return {string} The tinted color in hexadecimal format.
   */
  private tint(color: string, percent: number): string {
    const rgb = this.hexToRgb(color);
    const factor = percent / 100;
    const r = Math.max(0, Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor)));
    const g = Math.max(0, Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor)));
    const b = Math.max(0, Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor)));
    return this.rgbToHex(r, g, b);
  }

  /**
   * Generates an RGBA color string by applying the specified alpha transparency to the given base color.
   * @param {string} color - The base color in hexadecimal format to which the alpha transparency will be applied.
   * @param {number} alpha - The alpha transparency value to apply to the color (0-1).
   * @return {string} The resulting RGBA color string with the applied alpha transparency.
   */
  private withAlpha(color: string, alpha: number): string {
    const rgb = this.hexToRgb(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
}
