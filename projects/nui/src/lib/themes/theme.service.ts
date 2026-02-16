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
  DEFAULT_PRESET,
  NUI_THEME_CONFIG,
  LUMINANCE_UMBRAL,
} from './models/theme.config';
import { NUI_PRESETS } from './models/theme-presets';
import { COOL_GRAYS } from './models/theme-grays';

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
   * Get the list of available NUI theme presets.
   * This method returns an array of ThemePreset objects that are
   * defined in the theme presets configuration.
   */
  getNuiPresets(): ThemePreset[] {
    return NUI_PRESETS;
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

    // Semantic color variables + contrast text colors
    css += this.generateSemanticVariables();

    // Shadow variables
    css += this.generateShadowVariables();

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
      css += this.generateButtonGroupVariables(name, baseColor);
      css += this.generatePaginatorVariables(name, baseColor);
      css += this.generateToastVariables(name, baseColor);
      css += this.generateAvatarVariables(name, baseColor);
      css += this.generateActionMenuVariables(name, baseColor);
      css += this.generatePopoverVariables(name, baseColor);
      css += this.generateTimePickerVariables(name, baseColor);
    });

    // Generar variables de Tooltip (no depende de colores semánticos)
    css += this.generateTooltipVariables();
    css += this.generateSidebarPanelVariables();
    css += this.generateCalendarVariables();

    css += '}\n';
    return css;
  }

  /**
   * Get default gray scale colors.
   * This method returns a default set of gray colors that are used for structural elements like backgrounds, borders, and text when a custom preset does not provide its own grays.
   * @return {ThemeGrays} An object containing the default gray scale colors.
   */
  private getDefaultGrays(): ThemeGrays {
    return COOL_GRAYS;
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

  /* Base colors */
  --nui-primary: ${currentColors.primary};
  --nui-secondary: ${currentColors.secondary};
  --nui-neutral: ${currentColors.neutral};

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
  --nui-bg-neutral: ${isDark ? grays[800] : grays[100]};

  /* Contrasting text colors for primary and secondary colors */
  --nui-primary-contrast: ${this.getContrastColor(currentColors.primary)};
  --nui-secondary-contrast: ${this.getContrastColor(currentColors.secondary)};
  --nui-neutral-contrast: ${this.getContrastColor(currentColors.neutral)};

  /* Alpha variants for primary, secondary, and neutral colors */
  --nui-primary-alpha-50: ${this.withAlpha(currentColors.primary, 0.5)};
  --nui-secondary-alpha-50: ${this.withAlpha(currentColors.secondary, 0.5)};
  --nui-neutral-alpha-50: ${this.withAlpha(currentColors.neutral, 0.5)};

  /* Text colors */
  --nui-text-primary: ${isDark ? grays[50] : grays[900]};
  --nui-text-secondary: ${isDark ? grays[300] : grays[600]};
  --nui-text-tertiary: ${isDark ? grays[400] : grays[500]};
  --nui-text-neutral: ${isDark ? grays[400] : grays[600]};
  --nui-text-inverted: ${isDark ? grays[900] : PURE_COLORS.WHITE};
  --nui-text-disabled: ${isDark ? grays[600] : grays[400]};

  /* Border colors */
  --nui-border-primary: ${isDark ? grays[700] : grays[200]};
  --nui-border-secondary: ${isDark ? grays[800] : grays[100]};
  --nui-border-neutral: ${isDark ? grays[700] : grays[200]};
  --nui-border-strong: ${isDark ? grays[600] : grays[300]};
  --nui-border-weak: ${isDark ? grays[800] : grays[100]};

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
`;
  }

  /**
   * Generate CSS variable definitions for semantic color aliases and their contrasting text colors based
   * on the current theme preset and dark mode state.
   * This method creates CSS variable definitions for semantic color aliases
   * (primary, secondary, accent, success, info, warning, danger, neutral) and their corresponding
   * contrasting text colors.
   * The contrasting text colors are calculated using the getContrastColor method to ensure sufficient
   * contrast against the background color for readability.
   * @return {string} A string containing the CSS variable definitions for semantic color aliases and their contrasting text colors.
   */
  generateSemanticVariables(): string {
    const colors = this.colors();
    return `
      /* Semantic color aliases */
      --nui-accent: ${colors.accent};
      --nui-success: ${colors.success};
      --nui-info: ${colors.info};
      --nui-warning: ${colors.warning};
      --nui-danger: ${colors.danger};

      --nui-bg-accent: ${this.withAlpha(colors.accent, 0.1)};
      --nui-bg-success: ${this.withAlpha(colors.success, 0.1)};
      --nui-bg-info: ${this.withAlpha(colors.info, 0.1)};
      --nui-bg-warning: ${this.withAlpha(colors.warning, 0.1)};
      --nui-bg-danger: ${this.withAlpha(colors.danger, 0.1)};

      --nui-border-accent: ${this.withAlpha(colors.accent, 0.5)};
      --nui-border-success: ${this.withAlpha(colors.success, 0.5)};
      --nui-border-info: ${this.withAlpha(colors.info, 0.5)};
      --nui-border-warning: ${this.withAlpha(colors.warning, 0.5)};
      --nui-border-danger: ${this.withAlpha(colors.danger, 0.5)};

      /* Contrasting text colors for semantic colors */
      --nui-accent-contrast: ${this.getContrastColor(colors.accent)};
      --nui-success-contrast: ${this.getContrastColor(colors.success)};
      --nui-info-contrast: ${this.getContrastColor(colors.info)};
      --nui-warning-contrast: ${this.getContrastColor(colors.warning)};
      --nui-danger-contrast: ${this.getContrastColor(colors.danger)};

      /* Alpha values for semantic colors */
      --nui-accent-alpha-50: ${this.withAlpha(colors.accent, 0.5)};
      --nui-success-alpha-50: ${this.withAlpha(colors.success, 0.5)};
      --nui-info-alpha-50: ${this.withAlpha(colors.info, 0.5)};
      --nui-warning-alpha-50: ${this.withAlpha(colors.warning, 0.5)};
      --nui-danger-alpha-50: ${this.withAlpha(colors.danger, 0.5)};
    `;
  }

  /**
   * Generate CSS variable definitions for shadow styles based on the current theme preset and dark mode state.
   * This method creates CSS variable definitions for different shadow levels (xs, sm, md, lg, xl) and a
   * specific shadow for button hover states.
   * The shadow definitions adapt based on whether the current theme is in dark mode or light mode, ensuring that shadows are appropriately visible and aesthetically pleasing in both modes.
   * In dark mode, shadows are typically more pronounced to provide better contrast against dark backgrounds, while in light mode, shadows are subtler.
   * Additionally, in dark mode, a faint white border is added to help define the edges of components where shadows might not be as visible.
   * @return {string} A string containing the CSS variable definitions for shadow styles.
   */
  private generateShadowVariables(): string {
    const isDark = this._isDarkMode();

    // Base color of the shadow (RGB)
    const shadowColor = '0, 0, 0';

    // Opacities: In dark mode we need much more opacity for it to be visible
    const o = isDark
      ? { xs: 0, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6, hover: 0.25 } // Dark
      : { xs: 0, sm: 0.05, md: 0.1, lg: 0.15, xl: 0.25, hover: 0.1 }; // Light

    // In dark mode, we add a 1px white border at 5% opacity.
    // This defines the component's border when the black shadow is lost against the black background.
    const ring = isDark ? '0 0 0 1px rgba(255, 255, 255, 0.05), ' : '';

    // We build the shadows: [Optional Ring] + [Main Shadow]
    // XS: Only for inputs (field), very subtle
    const shadowXs = isDark
      ? '0 0 0 1px rgba(255, 255, 255, 0.1)' // En dark, un borde sutil
      : '0 1px 2px 0 rgba(0, 0, 0, 0.05)';

    const shadowSm = `${ring}0 1px 2px 0 rgba(${shadowColor}, ${o.sm})`;
    const shadowMd = `${ring}0 4px 6px -1px rgba(${shadowColor}, ${o.md}), 0 2px 4px -1px rgba(${shadowColor}, 0.06)`;
    const shadowLg = `${ring}0 10px 15px -3px rgba(${shadowColor}, ${o.lg}), 0 4px 6px -2px rgba(${shadowColor}, 0.05)`;
    const shadowXl = `${ring}0 20px 25px -5px rgba(${shadowColor}, ${o.xl}), 0 10px 10px -5px rgba(${shadowColor}, 0.04)`;

    // Specific shadow for button hover (Medium elevation)
    const shadowBtnHover = `${ring}0 4px 12px 0 rgba(${shadowColor}, ${o.hover})`;

    return `
    /* === SHADOW PRIMITIVES === */
    --nui-box-shadow-xs: ${shadowXs};
    --nui-box-shadow-sm: ${shadowSm};
    --nui-box-shadow-md: ${shadowMd};
    --nui-box-shadow-lg: ${shadowLg};
    --nui-box-shadow-xl: ${shadowXl};
    
    --nui-box-shadow-button-hover: ${shadowBtnHover};

    /* === SEMANTIC ALIASES === */
    /* We map use cases to primitives */
    
    --nui-shadow-none: none;
    
    /* Containers (Cards, Side Panels) */
    --nui-shadow-container: var(--nui-box-shadow-sm);
    
    /* Floating Elements (Popovers, Dropdowns, Menus, Modals) */
    --nui-shadow-elevated: var(--nui-box-shadow-lg);
    
    /* Interactive Elements (Buttons, Clickable Chips) */
    --nui-shadow-interactive: var(--nui-box-shadow-sm);
    
    /* Form Fields (Inputs, Selects) */
    --nui-shadow-field: var(--nui-box-shadow-xs);
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
    const contrastText = this.getContrastColor(color);
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);
    const alpha40 = this.withAlpha(color, 0.4);
    const alpha50 = this.withAlpha(color, 0.5);
    const alpha70 = this.withAlpha(color, 0.7);
    const alpha80 = this.withAlpha(color, 0.8);

    return `
      --nui-btn-${name}-color: ${color};
      --nui-btn-${name}-hover: ${alpha70};
      --nui-btn-${name}-active: ${alpha80};
      --nui-btn-${name}-contrast: ${contrastText};
      
      /* Solid States */
      --nui-btn-${name}-solid-bg: ${color};
      --nui-btn-${name}-solid-text: ${contrastText};
      --nui-btn-${name}-solid-hover-bg: ${alpha70};
      --nui-btn-${name}-solid-active-bg: ${alpha80};
      
      /* Outline States */
      --nui-btn-${name}-outline-border: ${alpha40};
      --nui-btn-${name}-outline-text: ${color};
      --nui-btn-${name}-outline-hover-bg: ${alpha10};
      --nui-btn-${name}-outline-hover-border: ${alpha50};
      --nui-btn-${name}-outline-active-bg: ${alpha20};
      --nui-btn-${name}-outline-active-border: ${alpha40};
      
      /* Ghost States */
      --nui-btn-${name}-ghost-text: ${color};
      --nui-btn-${name}-ghost-hover-bg: ${alpha10};
      --nui-btn-${name}-ghost-active-bg: ${alpha20};

      /* Focus Ring */
      --nui-btn-${name}-focus-ring: ${this.withAlpha(color, 0.4)};
    `;
  }

  private generateButtonGroupVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);

    // Opacidades
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);
    const alpha40 = this.withAlpha(color, 0.4);

    // Variables de superficie (para el estado 'base' de la variante Solid)
    const sysBg = 'var(--nui-bg-primary)';
    const sysBgSecondary = 'var(--nui-bg-secondary)';
    const sysBorder = this._isDarkMode()
      ? 'var(--nui-border-primary)'
      : 'var(--nui-border-secondary)';
    const sysTextSec = 'var(--nui-text-secondary)';

    return `
    /* === VARIANT: SOLID === */
    --nui-btn-group-${name}-solid-base-bg: ${sysBg};
    --nui-btn-group-${name}-solid-base-text: ${sysTextSec};
    --nui-btn-group-${name}-solid-base-border: ${sysBorder};
    --nui-btn-group-${name}-solid-sel-bg: ${color};
    --nui-btn-group-${name}-solid-sel-text: ${contrastText};
    --nui-btn-group-${name}-solid-sel-border: ${color};
    --nui-btn-group-${name}-solid-hover-bg: ${alpha10};

    /* === VARIANT: OUTLINE === */
    --nui-btn-group-${name}-outline-base-bg: transparent;
    --nui-btn-group-${name}-outline-base-text: ${color};
    --nui-btn-group-${name}-outline-base-border: ${alpha40};
    --nui-btn-group-${name}-outline-sel-bg: ${alpha20};
    --nui-btn-group-${name}-outline-sel-text: ${color};
    --nui-btn-group-${name}-outline-sel-border: ${color};
    --nui-btn-group-${name}-outline-hover-bg: ${alpha10};

    /* === VARIANT: GHOST === */
    --nui-btn-group-${name}-ghost-base-bg: transparent;
    --nui-btn-group-${name}-ghost-base-text: ${color};
    --nui-btn-group-${name}-ghost-base-border: transparent;
    --nui-btn-group-${name}-ghost-sel-bg: ${alpha20};
    --nui-btn-group-${name}-ghost-sel-text: ${color};
    --nui-btn-group-${name}-ghost-sel-border: transparent;
    --nui-btn-group-${name}-ghost-hover-bg: ${alpha10};

    /* === VARIANT: SEGMENTED === */
    --nui-btn-group-${name}-segmented-track-bg: ${sysBgSecondary};
    --nui-btn-group-${name}-segmented-track-border: ${sysBorder};
    --nui-btn-group-${name}-segmented-base-bg: transparent;
    --nui-btn-group-${name}-segmented-base-text: var(--nui-text-secondary);
    --nui-btn-group-${name}-segmented-base-border: transparent;
    --nui-btn-group-${name}-segmented-sel-bg: ${color};
    --nui-btn-group-${name}-segmented-sel-text: ${contrastText};
    --nui-btn-group-${name}-segmented-sel-border: transparent; /* Generalmente sin borde */
    --nui-btn-group-${name}-segmented-hover-bg: ${alpha10};
  `;
  }

  private generateToastVariables(name: string, color: string): string {
    const isDark = this._isDarkMode();
    const bg = isDark ? this.shade(color, 85) : this.tint(color, 95);
    const bgAlpha = isDark ? this.withAlpha(bg, 0.6) : this.withAlpha(bg, 0.8);
    const bgHover = isDark ? this.shade(color, 80) : this.tint(color, 85);
    const bgAlphaHover = isDark ? this.withAlpha(bgHover, 0.6) : this.withAlpha(bgHover, 0.8);
    const border = isDark ? this.withAlpha(color, 0.5) : this.withAlpha(color, 0.15);
    const header = isDark ? this.tint(color, 70) : this.shade(color, 20);
    const contrast = isDark ? PURE_COLORS.WHITE : PURE_COLORS.BLACK;
    const progress = color;

    return `
      --nui-toast-${name}-bg: ${bgAlpha};
      --nui-toast-${name}-hover-bg: ${bgAlphaHover};
      --nui-toast-${name}-border: ${border};
      --nui-toast-${name}-title: ${header};
      --nui-toast-${name}-icon: ${header};
      --nui-toast-${name}-text: ${contrast};
      --nui-toast-${name}-progress: ${progress};
    `;
  }

  private generatePaginatorVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);
    const isDark = this._isDarkMode();
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);
    const alpha30 = this.withAlpha(color, 0.3);
    const alpha40 = this.withAlpha(color, 0.4);
    const alpha50 = this.withAlpha(color, 0.5);
    const alpha70 = this.withAlpha(color, 0.7);

    return `      
      --nui-pg-${name}-color: ${color};
      --nui-pg-${name}-contrast: ${contrastText};
      
      /* VARIANT: SOLID */
      --nui-pg-${name}-solid-bg: ${color};
      --nui-pg-${name}-solid-text: ${contrastText};
      --nui-pg-${name}-solid-hover-bg: ${alpha70};
      --nui-pg-${name}-solid-active-bg: ${isDark ? alpha40 : alpha50};
      --nui-pg-${name}-solid-active-border: ${alpha30};
      
      /* VARIANT: OUTLINE */
      --nui-pg-${name}-outline-border: ${alpha40};
      --nui-pg-${name}-outline-text: ${color};
      --nui-pg-${name}-outline-hover-bg: ${alpha10};
      --nui-pg-${name}-outline-hover-border: ${alpha50};
      --nui-pg-${name}-outline-active-bg: ${alpha20};
      --nui-pg-${name}-outline-active-border: ${alpha40};
      
      /* VARIANT: GHOST */
      --nui-pg-${name}-ghost-text: ${color};
      --nui-pg-${name}-ghost-hover-bg: ${alpha10};
      --nui-pg-${name}-ghost-active-bg: ${alpha20};

      /* Ellipsis */
      --nui-pg-${name}-ellipsis-color: ${color};

      /* Focus Ring */
      --nui-pg-${name}-focus-ring: ${this.withAlpha(color, 0.4)};
    `;
  }

  private generateAvatarVariables(name: string, color: string): string {
    const isDark = this._isDarkMode();
    const hoverColor = this.shade(color, 15);
    const contrastText = this.getContrastColor(color);

    // Solo inyectamos lo que cambia por cada preset de color
    return `
      --nui-avatar-${name}-bg: ${isDark ? this.shade(color, 10) : color};
      --nui-avatar-${name}-color: ${contrastText};
      --nui-avatar-${name}-hover: ${hoverColor};

      /*Generic variables for avatars without a specific color, using the preset color as a base */
      --nui-avatar-default-bg: ${isDark ? 'var(--nui-bg-tertiary)' : 'var(--nui-bg-secondary)'};
      --nui-avatar-default-color: ${isDark ? 'var(--nui-text-primary)' : 'var(--nui-text-secondary)'};
      --nui-avatar-border-outset: var(--nui-bg-secondary);
    `;
  }

  private generateActionMenuVariables(name: string, color: string): string {
    const isDark = this._isDarkMode();

    // Tokens base de interacción
    const baseInteractiveBg = isDark ? this.withAlpha(color, 0.15) : this.tint(color, 95);
    const baseInteractiveColor = isDark ? this.tint(color, 60) : color;

    // Variables de contraste y refinamiento
    const borderTint = isDark ? this.tint(color, 35) : this.tint(color, 65);

    return `
      --nui-am-${name}-base-bg: ${baseInteractiveBg};
      --nui-am-${name}-base-color: ${baseInteractiveColor};
      --nui-am-${name}-border: ${borderTint};
      --nui-am-${name}-check: ${isDark ? this.tint(color, 50) : color};
      
      /* For strong selection states or hovering over selected */
      --nui-am-${name}-active-bg: ${isDark ? this.withAlpha(color, 0.25) : this.tint(color, 90)};
    `;
  }

  /**
   * Genera variables de color para Tooltip según el tema.
   * El tooltip usa colores inversos al tema para mejor contraste.
   */
  private generateTooltipVariables(): string {
    const isDark = this._isDarkMode();
    const grays = this._currentPreset().grays || this.getDefaultGrays();
    const bg = isDark ? grays[700] : grays[900];
    const text = PURE_COLORS.WHITE;
    const border = isDark ? 'var(--nui-border-weak)' : 'transparent';

    return `
      --tooltip-bg: ${bg};
      --tooltip-text: ${text};
      --tooltip-border-color: ${border};
    `;
  }

  private generateSidebarPanelVariables(): string {
    const isDark = this._isDarkMode();

    const bg = isDark ? 'var(--nui-bg-secondary)' : 'var(--nui-bg-primary)';
    const text = 'var(--nui-text-primary)';
    const border = isDark ? 'var(--nui-border-primary)' : 'var(--nui-border-secondary)';

    const overlayBg = 'var(--nui-overlay-bg)';

    return `
      --nui-sidebar-panel-bg: ${bg};
      --nui-sidebar-panel-text: ${text};
      --nui-sidebar-panel-border: ${border};
      --nui-sidebar-panel-overlay-bg: ${overlayBg};
      
      --nui-sidebar-panel-scroll-bg: var(--nui-bg-secondary);
      --nui-sidebar-panel-scroll-thumb-bg: var(--nui-border-primary);
      --nui-sidebar-panel-scroll-thumb-hover-bg: var(--nui-border-primary);
    `;
  }

  /**
   * Genera variables de color para Calendar según el tema.
   * El calendario usa colores del tema principal para interacciones.
   */
  private generateCalendarVariables(): string {
    const isDark = this._isDarkMode();
    const grays = this._currentPreset().grays || this.getDefaultGrays();
    
    // El calendario usa principalmente las CSS variables del tema
    // Pero añadimos algunas propiedades específicas si es necesario
    const tabsBorder = isDark ? grays[700] : grays[200];
    const presetBorder = isDark ? grays[700] : grays[300];
    
    return `
      --calendar-tabs-border-width: 1px;
      --calendar-day-border-width: 1px;
      --calendar-day-other-month-opacity: 0.4;
      --calendar-preset-border-width: 1px;
      --calendar-preset-hover-translateY: -2px;
      --calendar-preset-active-translateY: -4px;
      --calendar-focus-outline-width: 2px;
      --calendar-focus-outline-offset: 2px;
      --calendar-full-min-width: 280px;
    `;
  }

  /**
   * Genera variables de color para Popover según el tema.
   * El popover usa los colores del tema con un fondo ligeramente elevado.
   */
  private generatePopoverVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);
    const grays = this._currentPreset().grays || this.getDefaultGrays();

    // Variables auxiliares
    const alpha80 = this.withAlpha(color, 0.7); // Para Ghost/Glass BG
    const alpha40 = this.withAlpha(color, 0.4); // Para Outline Border

    // Colores base de superficie según modo
    const surfaceBg = this._isDarkMode() ? 'var(--nui-bg-secondary)' : 'var(--nui-bg-primary)';
    const surfaceText = 'var(--nui-text-primary)';
    const surfaceBorder = this._isDarkMode() ? grays[700] : grays[200];

    return `
    /* === BASE SURFACE COLORS === */
    --nui-popover-surface-bg: ${surfaceBg};
    --nui-popover-surface-text: ${surfaceText};
    --nui-popover-surface-border: ${surfaceBorder};

    /* === VARIANT: SOLID (Default) === */
    --nui-popover-${name}-solid-bg: ${color};
    --nui-popover-${name}-solid-text: ${contrastText};
    --nui-popover-${name}-solid-border: ${color};

    /* === VARIANT: OUTLINE === */
    --nui-popover-${name}-outline-bg: ${surfaceBg};
    --nui-popover-${name}-outline-text: ${color};
    --nui-popover-${name}-outline-border: ${alpha40};

    /* === VARIANT: GHOST === */
    --nui-popover-${name}-ghost-bg: ${alpha80};
    --nui-popover-${name}-ghost-text: ${contrastText};
    --nui-popover-${name}-ghost-border: transparent;
  `;
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
   * Converts RGB color values to HSL (Hue, Saturation, Lightness) format.
   * This method takes RGB values as input and calculates the corresponding HSL values,
   * which can be useful for generating color variants such as shades and tints.
   * @param {number} r - The red component of the color (0-255).
   * @param {number} g - The green component of the color (0-255).
   * @param {number} b - The blue component of the color (0-255).
   * @return {{ h: number; s: number; l: number }} An object representing the HSL components of the color, where h is the hue (0-360), s is the saturation (0-100), and l is the lightness (0-100).
   */
  rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  /**
   * Converts HSL (Hue, Saturation, Lightness) color values to RGB format.
   * This method takes HSL values as input and calculates the corresponding RGB values,
   * which can be useful for applying color transformations such as shading and tinting.
   * @param {number} h - The hue component of the color (0-360).
   * @param {number} s - The saturation component of the color (0-100).
   * @param {number} l - The lightness component of the color (0-100).
   * @return {{ r: number; g: number; b: number }} An object representing the RGB components of the color, where r is the red component (0-255), g is the green component (0-255), and b is the blue component (0-255).
   */
  hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    let r: number, g: number, b: number;
    h /= 360;
    s /= 100;
    l /= 100;
    if (s === 0) {
      r = g = b = l; // achromatic (gray)
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + 6 * (q - p) * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + 6 * (q - p) * (2 / 3 - t);
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
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

  /**
   * Genera variables CSS para el componente Time Picker
   */
  private generateTimePickerVariables(name: string, color: string): string {
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);
    const selectedBg = this._isDarkMode() ? this.shade(color, 15) : color;
    const selectedText = this.getContrastColor(selectedBg);

    return `
      --time-picker-${name}-item-bg: transparent;
      --time-picker-${name}-item-text: var(--nui-text-primary);
      --time-picker-${name}-item-hover-bg: ${alpha10};
      --time-picker-${name}-item-hover-text: ${color};
      --time-picker-${name}-item-selected-bg: ${selectedBg};
      --time-picker-${name}-item-selected-text: ${selectedText};
      --time-picker-${name}-item-selected-hover-bg: ${this._isDarkMode() ? this.shade(color, 20) : this.tint(color, 10)};
      --time-picker-${name}-item-disabled-bg: transparent;
      --time-picker-${name}-item-disabled-text: var(--nui-text-disabled);
      --time-picker-${name}-accent: ${color};
      --time-picker-${name}-accent-hover: ${alpha20};
      --time-picker-${name}-focus-ring: ${this.withAlpha(color, 0.4)};
    `;
  }
}
