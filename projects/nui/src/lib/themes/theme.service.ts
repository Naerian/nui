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
import { PURE_COLORS, DEFAULT_PRESET, NUI_LUMINANCE_THRESHOLD } from './models/theme.config';
import { NUI_PRESETS } from './models/theme-presets';
import { ZINC_GRAYS } from './models/theme-grays';
import { NUI_CONFIG } from '../configs/nui.token';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Internal variables
  private styleElement: HTMLStyleElement | null = null;
  private darkModeStrategy: DarkModeStrategy = DarkModeStrategyEnum.MANUAL;
  private darkModeClass: string = DARK_MODE_CLASS;
  private mediaQuery?: MediaQueryList;

  /**
   * Caché de CSS generado por preset + modo dark/light.
   * Key format: "presetName-isDarkMode"
   * Esto evita regenerar TODO el CSS en cada cambio de tema, mejorando performance significativamente.
   */
  private cssCache = new Map<string, string>();

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

  // If the preset doesn't define its own grays, we fall back to the default grays
  readonly grays = computed(() => this._currentPreset().grays || this.getDefaultGrays());

  // Observables for users who need RxJS interoperability
  readonly isDarkMode$: Observable<boolean> = toObservable(this._isDarkMode);
  readonly currentPreset$: Observable<ThemePreset> = toObservable(this._currentPreset);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(NUI_CONFIG) config?: ThemeConfig
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
    } else if (this.darkModeStrategy === DarkModeStrategyEnum.MANUAL) {
      // En modo manual, leer estado persistido de localStorage
      this.loadDarkModeFromStorage();
    }

    // Pre-generar ambos modos para hacer el primer toggle instantáneo
    this.preGenerateBothModes();

    this.updateColors();
  }

  /**
   * Pre-generar CSS para ambos modos (light y dark) al iniciar.
   * Esto hace que el primer toggle entre modos sea instantáneo.
   *
   * Estrategia:
   * 1. Genera inmediatamente el CSS del modo actual (se cachea)
   * 2. Programa con requestIdleCallback generar el modo opuesto cuando el navegador esté idle
   * 3. Así el primer toggle ya encuentra el CSS pre-generado en caché
   */
  private preGenerateBothModes(): void {
    const currentMode = this._isDarkMode();
    const presetName = this._currentPreset().name;

    // Generar el modo actual inmediatamente
    const currentKey = `${presetName}-${currentMode}`;
    if (!this.cssCache.has(currentKey)) {
      this.cssCache.set(currentKey, this.generateComponentVariables());
    }

    // Generar el modo opuesto cuando el navegador esté idle (no bloquea carga inicial)
    const scheduleOppositeMode = () => {
      // Temporalmente cambiar el modo para generar el CSS opuesto
      this._isDarkMode.set(!currentMode);
      const oppositeKey = `${presetName}-${!currentMode}`;

      if (!this.cssCache.has(oppositeKey)) {
        this.cssCache.set(oppositeKey, this.generateComponentVariables());
      }

      // Restaurar el modo original
      this._isDarkMode.set(currentMode);
    };

    // Usar requestIdleCallback si está disponible, sino setTimeout como fallback
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(scheduleOppositeMode, { timeout: 2000 });
    } else {
      setTimeout(scheduleOppositeMode, 100);
    }
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
   * Guarda el estado de dark mode en localStorage para persistirlo entre recargas.
   */
  private saveDarkModeToStorage(isDark: boolean): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('nui-dark-mode', JSON.stringify(isDark));
    }
  }

  /**
   * Lee el estado de dark mode desde localStorage.
   */
  private loadDarkModeFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('nui-dark-mode');
      if (stored !== null) {
        try {
          const isDark = JSON.parse(stored);
          this._isDarkMode.set(isDark);
          this.updateDarkModeClass();
        } catch (e) {
          console.warn('Error parsing stored dark mode value:', e);
        }
      }
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
    this.saveDarkModeToStorage(this._isDarkMode());
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
    this.saveDarkModeToStorage(enabled);
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
    const previousPresetName = this._currentPreset().name;
    this._currentPreset.set(preset);

    // Limpiar caché del preset anterior (ya que ahora es irrelevante)
    if (previousPresetName !== preset.name) {
      this.cssCache.delete(`${previousPresetName}-true`);
      this.cssCache.delete(`${previousPresetName}-false`);
    }

    this.updateColors();
  }

  /**
   * Update CSS variables based on the current theme preset and dark mode state.
   * This method generates the necessary CSS variable definitions and injects them into
   * the style element in the document head.
   *
   * Optimizado con caché: Solo regenera CSS cuando es la primera vez que se usa
   * una combinación de preset + isDarkMode. Esto hace que el cambio entre light/dark
   * sea instantáneo después de la primera generación.
   */
  updateColors(): void {
    if (!this.styleElement) return;

    // Generar clave de caché basada en preset + modo dark
    const cacheKey = `${this._currentPreset().name}-${this._isDarkMode()}`;

    // Verificar si ya tenemos el CSS generado en caché
    let css = this.cssCache.get(cacheKey);

    // Si no está en caché, generarlo y guardarlo
    if (!css) {
      css = this.generateComponentVariables();
      this.cssCache.set(cacheKey, css);
    }

    // Aplicar el CSS (instantáneo si estaba cacheado)
    this.styleElement.textContent = css;
  }

  /**
   * Calculate a contrasting text color (light or dark) based on the background color for accessibility.
   * This method determines whether to use a light or dark text color based on the luminance of the provided background color. It supports various color formats (HEX, RGB/RGBA, CSS keywords) and uses the WCAG formula for relative luminance to ensure sufficient contrast for readability.
   * @backgroundColor The background color for which to calculate the contrast text color. Can be in HEX, RGB/RGBA, or CSS keyword format.
   * @lightToken The color to use for text if the background is dark (default: white).
   * @darkToken The color to use for text if the background is light (default: a dark gray instead of pure black for better visual DX).
   */
  public getContrastColor(
    backgroundColor: string,
    lightToken: string = 'var(--nui-text-light, #FFFFFF)',
    darkToken: string = 'var(--nui-text-dark, #1A1A1A)'
  ): string {
    const rgb = this.isCSSColorKeyword(backgroundColor)
      ? this.hexToRgb(this.cssKeywordToHex(backgroundColor))
      : this.hexToRgb(backgroundColor);

    if (!rgb) return darkToken;

    // Use the luminance to determine if we should return the light or dark token
    const LUMINANCE = this.getLuminance(rgb.r, rgb.g, rgb.b);

    // The standard WCAG threshold for contrast is 0.179 on relative luminance
    return LUMINANCE > NUI_LUMINANCE_THRESHOLD ? darkToken : lightToken;
  }

  /**
   * Calculate the relative luminance of a color based on its RGB components.
   * This method uses the WCAG formula for relative luminance, which accounts for human perception of brightness. It converts RGB values to a linear space and applies the appropriate coefficients to calculate the final luminance value, which is used to determine contrast and accessibility compliance.
   * @param r The red component of the color (0-255).
   * @param g The green component of the color (0-255).
   * @param b The blue component of the color (0-255).
   * @return The relative luminance of the color, a value between 0 (darkest) and 1 (lightest).
   */
  private getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
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

    let css = ':root {\n';

    // Transitions to smoothly animate color changes when toggling dark mode or switching presets
    css += ` 
      transition:
        background-color 150ms ease-out,
        color 150ms ease-out,
        border-color 150ms ease-out,
        box-shadow 150ms ease-out;
    `;

    // Structural variables (grays, text, bg, borders, shadows, focus, overlay, backdrop, spinner, switch)
    css += this.generateStructuralVariables();

    // Overlay variables (used for modals, popovers, action menus, etc.)
    css += this.generateOverlayVariables();

    // Shadow variables
    css += this.generateShadowVariables();

    // Generate base color variables and their tints/shades
    Object.entries(colors).forEach(([name, baseColor]) => {
      // Component-specific variables
      css += this.generateButtonVariables(name, baseColor);
      css += this.generateFabButtonVariables(name, baseColor);
      css += this.generateSelectButtonVariables(name, baseColor);
      css += this.generateToastVariables(name, baseColor);
      css += this.generateAvatarVariables(name, baseColor);
      css += this.generateActionMenuVariables(name, baseColor);
      css += this.generatePopoverVariables(name, baseColor);
      css += this.generateProgressBarVariables(name, baseColor);
      css += this.generateSplitButtonVariables(name, baseColor);
    });

    // Paginator uses a single color token set (preset primary) — no per-color variants
    const primaryColor = colors['primary'] ?? Object.values(colors)[0];
    css += this.generatePaginatorVariables(primaryColor);

    // Generar variables de Tooltip (no depende de colores semánticos)
    css += this.generateTooltipVariables();
    css += this.generateSidebarPanelVariables();
    css += this.generateCalendarVariables();
    css += this.generateTimePickerVariables();

    css += '}\n';
    return css;
  }

  /**
   * Get default gray scale colors.
   * This method returns a default set of gray colors that are used for structural elements like backgrounds, borders, and text when a custom preset does not provide its own grays.
   * @return {ThemeGrays} An object containing the default gray scale colors.
   */
  getDefaultGrays(): ThemeGrays {
    return ZINC_GRAYS;
  }

  /**
   * Generate CSS variable definitions for structural colors and elements based on the provided gray scale.
   * This method creates CSS variable definitions for grays, background colors, text colors, border colors, shadow opacities, focus ring color, text selection color, overlay/backdrop colors, spinner colors, and switch colors.
   * The generated variables adapt based on whether the current theme is in dark mode or light mode, ensuring appropriate contrast and aesthetics for each mode.
   * @return {string} A string containing the CSS variable definitions for structural colors and elements.
   */
  private generateStructuralVariables(): string {
    const isDark = this._isDarkMode();
    const colors = this.colors();
    const grays = this.grays();

    let css = '';

    // Base text colors (used for contrast calculations and as fallbacks)
    css += ` 
      --nui-text-primary: ${isDark ? grays[50] : grays[900]};
      --nui-text-secondary: ${isDark ? grays[400] : grays[500]};
      --nui-text-weak: ${isDark ? grays[500] : grays[400]};
      --nui-text-disabled: ${isDark ? grays[600] : grays[400]};

      --nui-text-light: ${PURE_COLORS.WHITE};
      --nui-text-dark: ${PURE_COLORS.BLACK};
      --nui-text-inverted: ${isDark ? grays[900] : PURE_COLORS.WHITE};
      --nui-text-disabled: ${isDark ? grays[600] : grays[400]};
      --nui-text-muted: ${isDark ? grays[500] : grays[300]};
      
      --nui-link: ${colors.primary};
      --nui-link-hover: ${this.tint(colors.primary, 20)};
      --nui-link-active: ${this.shade(colors.primary, 20)};
      --nui-link-visited: ${this.shade(colors.primary, 40)};
      --nui-link-disabled: ${isDark ? grays[600] : grays[400]};

      --nui-placeholder-text: ${isDark ? grays[600] : grays[400]};

      --nui-focus-ring-color: ${this.withAlpha(colors.primary, 0.4)};
    `;

    // Selection color (used for text selection)
    css += ` 
      --nui-selection: ${isDark ? grays[500] : grays[200]};
      --nui-on-selection: ${this.getContrastColor(isDark ? grays[500] : grays[200])};
    `;

    // Border colors (used for borders and dividers)
    css += `
      --nui-border-high: ${isDark ? grays[600] : grays[300]};
      --nui-border-default: ${isDark ? grays[700] : grays[200]};
      --nui-border-subtle: ${isDark ? grays[800] : grays[100]};
    `;

    // Surfaces (used for backgrounds of components like cards, modals, popovers)
    css += `
      --nui-surface: ${isDark ? grays[900] : PURE_COLORS.WHITE};
      --nui-surface-secondary: ${isDark ? grays[800] : grays[50]};
      --nui-surface-neutral: ${isDark ? grays[700] : grays[100]};

      --nui-on-surface: ${this.getContrastColor(isDark ? grays[900] : PURE_COLORS.WHITE)};
      --nui-on-surface-secondary: ${this.getContrastColor(isDark ? grays[800] : grays[50])};
      --nui-on-surface-neutral: ${this.getContrastColor(isDark ? grays[700] : grays[100])};
    `;

    // Generate gray variables
    Object.entries(grays).forEach(([name, value]) => {
      // Gray variables (used for structural elements like backgrounds, borders, text)
      css += `  --nui-gray-${name}: ${value};\n`;

      // Generate border color variants for grays (used for borders and dividers in components that use gray as background)
      const borderTint = this.tint(value, 80);
      css += `  --nui-border-gray-${name}: ${borderTint};\n`;

      // Generate contrast text colors for grays
      css += `  --nui-on-gray-${name}: ${this.getContrastColor(value)};\n`;
    });

    // Generate base color variables and their tints / shades
    Object.entries(colors).forEach(([name, baseColor]) => {
      // Base color
      css += `  --nui-${name}: ${baseColor};\n`;

      // Generate tints (lighter versions): 95, 90, 80, 70, 60, 50
      css += `  --nui-${name}-tint-95: ${this.tint(baseColor, 95)};\n`;
      css += `  --nui-${name}-tint-90: ${this.tint(baseColor, 90)};\n`;
      css += `  --nui-${name}-tint-80: ${this.tint(baseColor, 80)};\n`;
      css += `  --nui-${name}-tint-70: ${this.tint(baseColor, 70)};\n`;
      css += `  --nui-${name}-tint-60: ${this.tint(baseColor, 60)};\n`;
      css += `  --nui-${name}-tint-50: ${this.tint(baseColor, 50)};\n`;

      // Generate shades (darker versions): 10, 20, 30, 40, 50
      css += `  --nui-${name}-shade-10: ${this.shade(baseColor, 10)};\n`;
      css += `  --nui-${name}-shade-20: ${this.shade(baseColor, 20)};\n`;
      css += `  --nui-${name}-shade-30: ${this.shade(baseColor, 30)};\n`;
      css += `  --nui-${name}-shade-40: ${this.shade(baseColor, 40)};\n`;
      css += `  --nui-${name}-shade-50: ${this.shade(baseColor, 50)};\n`;

      // Generate alpha variants: 10, 20, 30, 40, 50, 60, 70, 80, 90
      css += `  --nui-${name}-alpha-10: ${this.withAlpha(baseColor, 0.1)};\n`;
      css += `  --nui-${name}-alpha-20: ${this.withAlpha(baseColor, 0.2)};\n`;
      css += `  --nui-${name}-alpha-30: ${this.withAlpha(baseColor, 0.3)};\n`;
      css += `  --nui-${name}-alpha-40: ${this.withAlpha(baseColor, 0.4)};\n`;
      css += `  --nui-${name}-alpha-50: ${this.withAlpha(baseColor, 0.5)};\n`;
      css += `  --nui-${name}-alpha-60: ${this.withAlpha(baseColor, 0.6)};\n`;
      css += `  --nui-${name}-alpha-70: ${this.withAlpha(baseColor, 0.7)};\n`;
      css += `  --nui-${name}-alpha-80: ${this.withAlpha(baseColor, 0.8)};\n`;
      css += `  --nui-${name}-alpha-90: ${this.withAlpha(baseColor, 0.9)};\n`;

      // Generate contrast text colors
      css += `  --nui-on-${name}: ${this.getContrastColor(baseColor)};\n`;

      // Border color variants (used for borders and dividers in components that use this color as background)
      const borderTint = this.tint(baseColor, 80);
      css += `  --nui-border-${name}: ${borderTint};\n`;

      // Dark & light variants (used for hover/active states, backgrounds, etc.)
      css += `  --nui-${name}-light: ${this.tint(baseColor, 40)};\n`;
      css += `  --nui-${name}-dark: ${this.shade(baseColor, 40)};\n`;
    });

    return css;
  }

  /**
   * Generate CSS variable definitions for overlay colors based on the current theme preset and dark mode state.
   * This method creates CSS variable definitions for overlay backgrounds and backdrops that are used in components like modals, popovers, and action menus. The colors adapt based on whether the current theme is in dark mode or light mode, ensuring appropriate contrast and aesthetics for each mode.
   * In dark mode, the overlay background is typically a darker, more opaque color to provide better contrast against the dark background, while in light mode, it is lighter and less opaque to maintain a softer appearance. The backdrop color also adjusts accordingly to ensure that it complements the overall theme and provides sufficient separation between the overlay content and the underlying page.
   * @return {string} A string containing the CSS variable definitions for overlay colors.
   */
  generateOverlayVariables(): string {
    const isDark = this._isDarkMode();

    return `
      /* Overlay colors */
      --nui-overlay-bg: ${isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
      --nui-color-backdrop: ${isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)'};
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

    // Shadow Color
    const shadowBase = '0, 0, 0';

    // Ring (separación en dark mode)
    const ring = isDark ? '0 0 0 1px rgba(255, 255, 255, 0.1), ' : '';

    const interactiveRest = isDark
      ? `${ring}0 4px 6px -1px rgba(${shadowBase}, 0.35), 0 2px 4px -1px rgba(${shadowBase}, 0.25)`
      : `0 4px 6px -1px rgba(${shadowBase}, 0.14), 0 2px 4px -1px rgba(${shadowBase}, 0.1)`;

    const interactiveHover = isDark
      ? `${ring}0 10px 20px -3px rgba(${shadowBase}, 0.75), 0 4px 8px -2px rgba(${shadowBase}, 0.6)`
      : `0 10px 15px -3px rgba(${shadowBase}, 0.16), 0 4px 6px -2px rgba(${shadowBase}, 0.1)`;

    const interactiveActive = isDark
      ? `${ring}0 1px 2px rgba(${shadowBase}, 0.5)`
      : `0 1px 2px rgba(${shadowBase}, 0.1)`;

    return `
    /* === SHADOW PRIMITIVES === */
    --nui-box-shadow-xs: ${isDark ? '0 0 0 1px rgba(255,255,255,0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)'};
    --nui-box-shadow-sm: ${ring}0 1px 3px 0 rgba(${shadowBase}, ${isDark ? 0.4 : 0.1});
    --nui-box-shadow-md: ${ring}0 4px 6px -1px rgba(${shadowBase}, ${isDark ? 0.5 : 0.1});
    --nui-box-shadow-lg: ${ring}0 10px 15px -3px rgba(${shadowBase}, ${isDark ? 0.6 : 0.15});

    /* === INTERACTIVE RAISING SYSTEM === */
    --nui-shadow-interactive-rest: ${interactiveRest};
    --nui-shadow-interactive-hover: ${interactiveHover};
    --nui-shadow-interactive-active: ${interactiveActive};

    /* === SEMANTIC ALIASES === */
    --nui-shadow-none: none;
    --nui-shadow-container: var(--nui-box-shadow-sm);
    --nui-shadow-elevated: var(--nui-box-shadow-lg);
    --nui-shadow-field: var(--nui-box-shadow-xs);
    --nui-sidebar-panel-shadow: var(--nui-box-shadow-md);
    
    /* El alias que usará el componente Raised Button */
    --nui-shadow-interactive: var(--nui-shadow-interactive-rest);
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

  /**
   * Generate CSS custom property definitions for all FAB button variants of a given colour.
   *
   * Follows the same pattern as generateButtonVariables:
   *  - Uses shade/tint for hover and active states
   *  - Uses withAlpha for outline and ghost backgrounds
   *  - Adapts results for dark mode automatically via _isDarkMode()
   *
   * Generated variables are consumed by styles/components/_fab-button.scss via
   * CSS expressions like var(--nui-fab-primary-solid-bg).
   */
  private generateFabButtonVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);
    const isDark = this._isDarkMode();
    const hoverBg = isDark ? this.shade(color, 10) : this.tint(color, 10);
    const activeBg = isDark ? this.shade(color, 20) : this.tint(color, 20);

    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);
    const focusRing = this.withAlpha(color, 0.4);

    return `
      /* ── FAB Button: ${name} ── */

      /* Base reference (used in JS/computed helpers) */
      --nui-fab-${name}-color:  ${color};
      --nui-fab-${name}-hover:  ${hoverBg};
      --nui-fab-${name}-active: ${activeBg};

      /* Focus ring */
      --nui-fab-${name}-focus-ring: ${focusRing};

      /* Solid */
      --nui-fab-${name}-solid-bg: ${color};
      --nui-fab-${name}-solid-border: ${color};
      --nui-fab-${name}-solid-text: ${contrastText};
      --nui-fab-${name}-solid-hover-bg: ${hoverBg};
      --nui-fab-${name}-solid-hover-border: transparent;
      --nui-fab-${name}-solid-hover-text: ${contrastText};
      --nui-fab-${name}-solid-active-bg: ${activeBg};

      /* Outline */
      --nui-fab-${name}-outline-bg: transparent;
      --nui-fab-${name}-outline-border: ${alpha20};
      --nui-fab-${name}-outline-text: ${color};
      --nui-fab-${name}-outline-hover-bg: ${alpha10};
      --nui-fab-${name}-outline-hover-border: ${alpha20};
      --nui-fab-${name}-outline-hover-text: ${color};
      --nui-fab-${name}-outline-active-bg: ${alpha20};

      /* Ghost */
      --nui-fab-${name}-ghost-bg: transparent;
      --nui-fab-${name}-ghost-border: transparent;
      --nui-fab-${name}-ghost-text: ${color};
      --nui-fab-${name}-ghost-hover-bg: ${alpha10};
      --nui-fab-${name}-ghost-hover-border: transparent;
      --nui-fab-${name}-ghost-hover-text: ${color};
      --nui-fab-${name}-ghost-active-bg: ${alpha20};

      /* Others */
      --nui-fab-badge-border: var(--nui-border-subtle);
    `;
  }

  private generateButtonVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);
    const isDark = this._isDarkMode();
    const hoverBg = isDark ? this.shade(color, 10) : this.tint(color, 10);
    const activeBg = isDark ? this.shade(color, 20) : this.tint(color, 20);

    // Opacidades para outline y ghost
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);

    return `
      /* Base color for the button (used for text in outline/ghost variants and background in solid variant) */
      --nui-btn-${name}-color: ${color};
      --nui-btn-${name}-hover: ${hoverBg};
      --nui-btn-${name}-active: ${activeBg};
      
      /* Solid States */
      --nui-btn-${name}-solid-bg: ${color};
      --nui-btn-${name}-solid-border: ${color};
      --nui-btn-${name}-solid-text: ${contrastText};
      --nui-btn-${name}-solid-hover-bg: ${hoverBg};
      --nui-btn-${name}-solid-hover-border: transparent;
      --nui-btn-${name}-solid-hover-text: ${contrastText};
      --nui-btn-${name}-solid-active-bg: ${activeBg};
      --nui-btn-${name}-solid-active-border: transparent;
      
      /* Outline States */
      --nui-btn-${name}-outline-bg: transparent;
      --nui-btn-${name}-outline-border: ${alpha20};
      --nui-btn-${name}-outline-text: ${color};
      --nui-btn-${name}-outline-hover-bg: ${alpha10};
      --nui-btn-${name}-outline-hover-border: ${alpha20};
      --nui-btn-${name}-outline-hover-text: ${color};
      --nui-btn-${name}-outline-active-bg: ${alpha20};
      --nui-btn-${name}-outline-active-border: ${alpha20};
      
      /* Ghost States */
      --nui-btn-${name}-ghost-bg: transparent;
      --nui-btn-${name}-ghost-border: transparent;
      --nui-btn-${name}-ghost-text: ${color};
      --nui-btn-${name}-ghost-hover-bg: ${alpha10};
      --nui-btn-${name}-ghost-hover-border: transparent;
      --nui-btn-${name}-ghost-hover-text: ${color};
      --nui-btn-${name}-ghost-active-bg: ${alpha20};
      --nui-btn-${name}-ghost-active-border: transparent;

      /* Link States (variant that looks like a hyperlink) */
      --nui-btn-${name}-link-bg: transparent;
      --nui-btn-${name}-link-border: transparent;
      --nui-btn-${name}-link-text: ${color};
      --nui-btn-${name}-link-hover-bg: transparent;
      --nui-btn-${name}-link-hover-border: transparent;
      --nui-btn-${name}-link-hover-text: ${hoverBg};
      --nui-btn-${name}-link-active-bg: transparent;
      --nui-btn-${name}-link-active-border: transparent;
      --nui-btn-${name}-link-active-text: ${activeBg};

      /* Focus Ring */
      --nui-btn-${name}-focus-ring: ${this.withAlpha(color, 0.4)};
    `;
  }

  private generateSelectButtonVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);

    // Opacidades para hover states
    const alpha10 = this.withAlpha(color, 0.1);
    const alpha20 = this.withAlpha(color, 0.2);

    // Variables de superficie (para el estado 'base' de la variante Solid)
    const sysBg = 'var(--nui-surface)';
    const sysBorder = 'var(--nui-border-subtle)';
    const sysTextSec = 'var(--nui-on-surface-secondary)';

    return `
    /* === VARIANT: SOLID === */
    --nui-slc-btn-${name}-solid-bg: ${sysBg};
    --nui-slc-btn-${name}-solid-text: ${sysTextSec};
    --nui-slc-btn-${name}-solid-border: ${sysBorder};
    --nui-slc-btn-${name}-solid-sel-bg: ${color};
    --nui-slc-btn-${name}-solid-sel-text: ${contrastText};
    --nui-slc-btn-${name}-solid-sel-border: ${sysBg};
    --nui-slc-btn-${name}-solid-hover-bg: ${alpha10};
    --nui-slc-btn-${name}-solid-hover-text: ${contrastText};
    --nui-slc-btn-${name}-solid-hover-border: ${alpha20};

    /* === VARIANT: OUTLINE === */
    --nui-slc-btn-${name}-outline-bg: transparent;
    --nui-slc-btn-${name}-outline-text: ${color};
    --nui-slc-btn-${name}-outline-border: ${alpha20};
    --nui-slc-btn-${name}-outline-sel-bg: ${alpha20};
    --nui-slc-btn-${name}-outline-sel-text: ${color};
    --nui-slc-btn-${name}-outline-sel-border: ${color};
    --nui-slc-btn-${name}-outline-hover-bg: ${alpha10};
    --nui-slc-btn-${name}-outline-hover-text: ${color};
    --nui-slc-btn-${name}-outline-hover-border: ${alpha20};

    /* === VARIANT: GHOST === */
    --nui-slc-btn-${name}-ghost-bg: transparent;
    --nui-slc-btn-${name}-ghost-text: ${color};
    --nui-slc-btn-${name}-ghost-border: transparent;
    --nui-slc-btn-${name}-ghost-sel-bg: ${alpha20};
    --nui-slc-btn-${name}-ghost-sel-text: ${color};
    --nui-slc-btn-${name}-ghost-sel-border: transparent;
    --nui-slc-btn-${name}-ghost-hover-bg: ${alpha10};
    --nui-slc-btn-${name}-ghost-hover-text: ${color};
    --nui-slc-btn-${name}-ghost-hover-border: transparent;

    /* === VARIANT: SEGMENTED === */
    --nui-slc-btn-${name}-segmented-track-bg: ${sysBg};
    --nui-slc-btn-${name}-segmented-track-border: ${sysBorder};
    --nui-slc-btn-${name}-segmented-bg: transparent;
    --nui-slc-btn-${name}-segmented-text: ${sysTextSec};
    --nui-slc-btn-${name}-segmented-border: transparent;
    --nui-slc-btn-${name}-segmented-sel-bg: ${color};
    --nui-slc-btn-${name}-segmented-sel-text: ${contrastText};
    --nui-slc-btn-${name}-segmented-sel-border: transparent;
    --nui-slc-btn-${name}-segmented-hover-bg: ${alpha10};
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

  /**
   * Genera variables CSS para el Paginator con sistema "Shapeshifter".
   *
   * Arquitectura de variantes:
   * - Botones inactivos: Siempre Ghost (transparente, solo texto)
   * - Botón activo: Según variante elegida (Solid/Outline/Ghost)
   * - Botones de navegación: Ghost o Outline para sobriedad
   *
   * Esta arquitectura evita interfaces "cargadas" y dirige la atención al botón activo.
   */
  /**
   * Genera las variables CSS del Paginator usando el color primario del preset.
   * Sin dimensión de color semántico — un solo conjunto de tokens flat.
   */
  private generatePaginatorVariables(color: string): string {
    const isDark = this._isDarkMode();
    const contrastText = this.getContrastColor(color);
    const grays = this.grays();

    const alpha10 = this.withAlpha(color, 0.1);
    const alpha15 = this.withAlpha(color, 0.15);
    const hoverBg = this.withAlpha(color, 0.05);

    return `
      /* Paginator inactive buttons (always ghost) */
      --nui-pg-ghost-bg: transparent;
      --nui-pg-ghost-text: ${isDark ? grays[300] : grays[700]};
      --nui-pg-ghost-border: transparent;
      --nui-pg-ghost-hover-bg: ${hoverBg};
      --nui-pg-ghost-hover-border: transparent;

      /* Paginator active button: Solid */
      --nui-pg-solid-active-bg: ${color};
      --nui-pg-solid-active-text: ${contrastText};
      --nui-pg-solid-active-border: ${color};

      /* Paginator active button: Outline */
      --nui-pg-outline-active-bg: ${alpha10};
      --nui-pg-outline-active-text: ${color};
      --nui-pg-outline-active-border: ${color};

      /* Paginator active button: Ghost */
      --nui-pg-ghost-active-bg: ${alpha15};
      --nui-pg-ghost-active-text: ${isDark ? this.tint(color, 30) : this.shade(color, 10)};
      --nui-pg-ghost-active-border: transparent;

      /* Paginator navigation buttons (prev/next/first/last) */
      --nui-pg-nav-bg: transparent;
      --nui-pg-nav-text: ${isDark ? grays[400] : grays[600]};
      --nui-pg-nav-border: transparent;
      --nui-pg-nav-hover-bg: ${hoverBg};
      --nui-pg-nav-hover-text: ${isDark ? grays[200] : grays[800]};
      --nui-pg-nav-hover-border: transparent;

      /* Paginator misc */
      --nui-pg-ellipsis-color: ${isDark ? grays[500] : grays[400]};
      --nui-pg-focus-ring: ${this.withAlpha(color, 0.4)};
      --nui-pg-jump-border: var(--nui-border-subtle);
      --nui-pg-jump-separator: var(--nui-border-subtle);
      --nui-pg-jump-hover-bg: ${hoverBg};
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
      --nui-avatar-default-bg: ${isDark ? 'var(--nui-surface-neutral)' : 'var(--nui-surface-secondary)'};
      --nui-avatar-default-color: ${isDark ? 'var(--nui-on-surface-neutral)' : 'var(--nui-on-surface-secondary)'};
      --nui-avatar-border-outset: var(--nui-surface);
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
      
      --nui-am-${name}-active-bg: ${isDark ? this.withAlpha(color, 0.25) : this.tint(color, 90)};

      --nui-am-bg: var(--nui-surface);
      --nui-am-color: var(--nui-on-surface);
      --nui-am-border-color: var(--nui-border-high);

      --nui-am-shortcut-bg: var(--nui-surface-neutral);
      --nui-am-shortcut-color: var(--nui-on-surface-neutral);
      --nui-am-shortcut-border-color: var(--nui-border-subtle);

      --nui-am-separator-color: var(--nui-border-subtle);
      --nui-am-separator-label-color: var(--nui-text-muted);
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
    const border = isDark ? 'var(--nui-border-subtle)' : 'transparent';

    return `
      --tooltip-bg: ${bg};
      --tooltip-text: ${text};
      --tooltip-border-color: ${border};
    `;
  }

  private generateSidebarPanelVariables(): string {
    const bg = 'var(--nui-surface-secondary)';
    const text = 'var(--nui-on-surface-secondary)';
    const border = 'var(--nui-border-subtle)';

    const overlayBg = 'var(--nui-overlay-bg)';

    return `
      --nui-sidebar-panel-bg: ${bg};
      --nui-sidebar-panel-text: ${text};
      --nui-sidebar-panel-border: ${border};
      --nui-sidebar-panel-overlay-bg: ${overlayBg};
      
      --nui-sidebar-panel-scroll-bg: var(--nui-surface-secondary);
      --nui-sidebar-panel-scroll-thumb-bg: var(--nui-border-high);
      --nui-sidebar-panel-scroll-thumb-hover-bg: var(--nui-border-high);

      /* Tabs minimized state */
      --nui-sidebar-panel-tab-minimized-bg: ${bg};
      --nui-sidebar-panel-tab-minimized-indenty: var(--nui-primary);
      --nui-sidebar-panel-tab-minimized-border: var(--nui-border-subtle);
      --nui-sidebar-panel-tab-minimized-text: ${text};
      --nui-sidebar-panel-tab-minimized-hover-bg: var(--nui-surface-neutral);
      --nui-sidebar-panel-tab-minimized-hover-text: var(--nui-primary);
      --nui-sidebar-panel-tab-minimized-hover-border: var(--nui-border-default);
      --nui-sidebar-panel-tab-minimized-shadow: var(--nui-box-shadow-sm);
      --nui-sidebar-panel-tab-minimized-hover-shadow: var(--nui-box-shadow-md);
    `;
  }

  /**
   * Genera variables de color para Calendar según el tema.
   * El calendario usa colores del tema principal para interacciones.
   */
  private generateCalendarVariables(): string {
    const isDark = this._isDarkMode();
    const grays = this._currentPreset().grays || this.getDefaultGrays();
    const colors = this._isDarkMode()
      ? this._currentPreset().colors.dark
      : this._currentPreset().colors.light;

    // Calendar surface
    const sysBg = 'var(--nui-surface)';
    const sysBorder = 'var(--nui-border-subtle)';
    const sysShadow = 'var(--nui-box-shadow-sm)';

    // Background and text for calendar days
    const dayBg = 'transparent';
    const dayText = 'var(--nui-on-surface)';

    // Selected states
    const daySelectedBg = this.withAlpha(colors.primary, 0.2);
    const daySelectedBorder = colors.primary;
    const daySelectedText = 'var(--nui-on-surface)';
    const daySelectedHoverBg = this.withAlpha(colors.primary, 0.3);
    const daySelectedHoverBorder = colors.primary;

    // Hover states
    const dayHoverBg = this.withAlpha(colors.primary, 0.2);
    const dayHoverText = 'var(--nui-on-surface)';

    // Today state (dot)
    const todayBg = isDark ? this.tint(colors.primary, 60) : this.shade(colors.primary, 20);
    const todaySelectedBg = this.shade(todayBg, 20);

    // In-range states (para rangos de fechas)
    const dayRangeBg = this.withAlpha(colors.primary, 0.1);
    const dayRangeText = 'var(--nui-on-surface)';
    const dayRangeBorder = this.withAlpha(colors.primary, 0.4);
    const dayRangeHoverBg = this.withAlpha(colors.primary, 0.15);
    const dayRangeHoverBorder = this.withAlpha(colors.primary, 0.5);

    // Smart Service - Status indicators (usando colores semánticos)
    const statusSuccess = colors.success;
    const statusInfo = colors.info;
    const statusWarning = colors.warning;
    const statusDanger = colors.danger;

    // Calendar Navigation Button States (Ghost variant style)
    const navBtnBg = 'transparent';
    const navBtnText = isDark ? grays[200] : grays[700];
    const navBtnBorder = 'transparent';

    const navBtnHoverBg = isDark ? grays[800] : grays[100];
    const navBtnHoverText = isDark ? grays[50] : grays[900];
    const navBtnHoverBorder = 'transparent';

    const navBtnActiveBg = isDark ? grays[700] : grays[200];
    const navBtnActiveBorder = 'transparent';

    const navBtnDisabledBg = 'transparent';
    const navBtnDisabledText = isDark ? grays[600] : grays[400];
    const navBtnDisabledBorder = 'transparent';

    return `
      --nui-calendar-bg: ${sysBg};

      --nui-calendar-border: ${sysBorder};
      --nui-calendar-box-shadow: ${sysShadow};

      --nui-calendar-day-bg: ${dayBg};
      --nui-calendar-day-text: ${dayText};
      --nui-calendar-day-current-month-text: ${dayText};
      --nui-calendar-day-today-bg: ${todayBg};
      
      --nui-calendar-day-hover-bg: ${dayHoverBg};
      --nui-calendar-day-hover-text: ${dayHoverText};
      
      --nui-calendar-day-selected-bg: ${daySelectedBg};
      --nui-calendar-day-selected-text: ${daySelectedText};
      --nui-calendar-day-selected-border: ${daySelectedBorder};
      --nui-calendar-day-selected-today-bg: ${todaySelectedBg};
      
      --nui-calendar-day-selected-hover-bg: ${daySelectedHoverBg};
      --nui-calendar-day-selected-hover-border: ${daySelectedHoverBorder};
      
      --nui-calendar-day-range-bg: ${dayRangeBg};
      --nui-calendar-day-range-text: ${dayRangeText};
      --nui-calendar-day-range-border: ${dayRangeBorder};

      --nui-calendar-day-range-hover-bg: ${dayRangeHoverBg};
      --nui-calendar-day-range-hover-border: ${dayRangeHoverBorder};

      /* Smart Service - Status Indicators (subtle top border) */
      --nui-calendar-day-status-success: ${statusSuccess};
      --nui-calendar-day-status-info: ${statusInfo};
      --nui-calendar-day-status-warning: ${statusWarning};
      --nui-calendar-day-status-danger: ${statusDanger};
      
      /* Calendar Navigation Buttons (customizable ghost-style buttons) */
      --nui-calendar-nav-btn-bg: ${navBtnBg};
      --nui-calendar-nav-btn-text: ${navBtnText};
      --nui-calendar-nav-btn-border: ${navBtnBorder};
      
      --nui-calendar-nav-btn-hover-bg: ${navBtnHoverBg};
      --nui-calendar-nav-btn-hover-text: ${navBtnHoverText};
      --nui-calendar-nav-btn-hover-border: ${navBtnHoverBorder};
      
      --nui-calendar-nav-btn-active-bg: ${navBtnActiveBg};
      --nui-calendar-nav-btn-active-border: ${navBtnActiveBorder};
      
      --nui-calendar-nav-btn-disabled-bg: ${navBtnDisabledBg};
      --nui-calendar-nav-btn-disabled-text: ${navBtnDisabledText};
      --nui-calendar-nav-btn-disabled-border: ${navBtnDisabledBorder};
    `;
  }

  /**
   * Genera variables CSS para el componente Time Picker
   */
  private generateTimePickerVariables(): string {
    const isDark = this._isDarkMode();
    const grays = this._currentPreset().grays || this.getDefaultGrays();
    const colors = this._isDarkMode()
      ? this._currentPreset().colors.dark
      : this._currentPreset().colors.light;

    // Time Picker surface
    const sysBg = 'var(--nui-surface)';
    const sysBorder = 'var(--nui-border-subtle)';
    const sysShadow = 'var(--nui-box-shadow-sm)';

    // Background and text for time options
    const timeBg = 'transparent';
    const timeText = 'var(--nui-on-surface)';

    // Hover states for time options
    const timeSelectedBg = this.withAlpha(colors.primary, 0.2);
    const timeSelectedBorder = colors.primary;
    const timeSelectedText = 'var(--nui-on-surface)';
    const timeSelectedHoverBg = this.withAlpha(colors.primary, 0.3);
    const timeSelectedHoverBorder = colors.primary;

    // Hover states
    const timeHoverBg = this.withAlpha(colors.primary, 0.2);
    const timeHoverText = 'var(--nui-on-surface)';

    // Navigation Button States (Ghost variant style)
    const navBtnBg = 'transparent';
    const navBtnText = isDark ? grays[200] : grays[700];
    const navBtnBorder = 'transparent';

    const navBtnHoverBg = isDark ? grays[800] : grays[100];
    const navBtnHoverText = isDark ? grays[50] : grays[900];
    const navBtnHoverBorder = 'transparent';

    const navBtnActiveBg = isDark ? grays[700] : grays[200];
    const navBtnActiveBorder = 'transparent';

    const navBtnDisabledBg = 'transparent';
    const navBtnDisabledText = isDark ? grays[600] : grays[400];
    const navBtnDisabledBorder = 'transparent';

    return `
      --nui-time-picker-bg: ${sysBg};

      --nui-time-picker-border: ${sysBorder};
      --nui-time-picker-box-shadow: ${sysShadow};

      --nui-time-picker-item-bg: ${timeBg};
      --nui-time-picker-item-text: ${timeText};

      --nui-time-picker-item-hover-bg: ${timeHoverBg};
      --nui-time-picker-item-hover-text: ${timeHoverText};

      --nui-time-picker-item-selected-bg: ${timeSelectedBg};
      --nui-time-picker-item-selected-border: ${timeSelectedBorder};
      --nui-time-picker-item-selected-text: ${timeSelectedText};
      --nui-time-picker-item-selected-border: ${timeSelectedBg};

      --nui-time-picker-item-selected-hover-bg: ${timeSelectedHoverBg};
      --nui-time-picker-item-selected-hover-border: ${timeSelectedHoverBorder};

      --nui-time-picker-item-disabled-bg: transparent;
      --nui-time-picker-item-disabled-text: var(--nui-text-disabled);

      /* Time Picker Footer Buttons (customizable ghost-style buttons) */
      --nui-time-picker-nav-btn-bg: ${navBtnBg};
      --nui-time-picker-nav-btn-text: ${navBtnText};
      --nui-time-picker-nav-btn-border: ${navBtnBorder};
      
      --nui-time-picker-nav-btn-hover-bg: ${navBtnHoverBg};
      --nui-time-picker-nav-btn-hover-text: ${navBtnHoverText};
      --nui-time-picker-nav-btn-hover-border: ${navBtnHoverBorder};
      
      --nui-time-picker-nav-btn-active-bg: ${navBtnActiveBg};
      --nui-time-picker-nav-btn-active-border: ${navBtnActiveBorder};
      
      --nui-time-picker-nav-btn-disabled-bg: ${navBtnDisabledBg};
      --nui-time-picker-nav-btn-disabled-text: ${navBtnDisabledText};
      --nui-time-picker-nav-btn-disabled-border: ${navBtnDisabledBorder};
    `;
  }

  /**
   * Genera variables de color para Popover según el tema.
   * El popover usa los colores del tema con un fondo ligeramente elevado.
   */
  private generatePopoverVariables(name: string, color: string): string {
    const contrastText = this.getContrastColor(color);

    // Variables auxiliares
    const alpha80 = this.withAlpha(color, 0.7); // Para Ghost/Glass BG
    const alpha40 = this.withAlpha(color, 0.4); // Para Outline Border

    // Colores base de superficie según modo
    const surfaceBg = this._isDarkMode() ? 'var(--nui-surface-secondary)' : 'var(--nui-surface)';
    const surfaceText = this._isDarkMode()
      ? 'var(--nui-on-surface-secondary)'
      : 'var(--nui-on-surface)';
    const surfaceBorder = 'var(--nui-border-high)';

    return `
    /* Base */
    --nui-popover-surface-bg: ${surfaceBg};
    --nui-popover-surface-text: ${surfaceText};
    --nui-popover-surface-border: ${surfaceBorder};

    /* Variant: Solid */
    --nui-popover-${name}-solid-bg: ${color};
    --nui-popover-${name}-solid-text: ${contrastText};
    --nui-popover-${name}-solid-border: ${color};

    /* Variant: Outline */
    --nui-popover-${name}-outline-bg: ${surfaceBg};
    --nui-popover-${name}-outline-text: ${color};
    --nui-popover-${name}-outline-border: ${alpha40};

    /* Variant: Ghost */
    --nui-popover-${name}-ghost-bg: ${alpha80};
    --nui-popover-${name}-ghost-text: ${contrastText};
    --nui-popover-${name}-ghost-border: transparent;

    /* Others */
    --nui-popover-shadow: var(--nui-box-shadow-md);
  `;
  }

  private generateProgressBarVariables(name: string, color: string): string {
    const isDark = this._isDarkMode();
    const pbText = this.getContrastColor(color);
    const pbTextShadow = this.withAlpha(color, 0.8);

    // Solid: always darkens on hover → weight and solidity
    const solidFillHover = this.shade(color, 12);

    // Outline: stronger border, lightens on hover → open and airy
    const outlineBorder = this.withAlpha(color, 0.55);
    const outlineFillHover = isDark ? this.shade(color, 8) : this.tint(color, 12);

    // Ghost: translucent fill → ethereal, becomes more opaque on hover
    const ghostFill = this.withAlpha(color, 0.72);
    const ghostFillHover = this.withAlpha(color, 0.88);
    const ghostValueText = isDark ? this.tint(color, 45) : this.shade(color, 20);
    const ghostLabelText = isDark ? this.tint(color, 35) : this.shade(color, 30);

    return `
      /* ── Progress Bar: ${name} ── */

      /* Solid: neutral groove + opaque fill, darkens on hover */
      --nui-pb-${name}-solid-track-bg: var(--nui-surface-neutral);
      --nui-pb-${name}-solid-track-border: var(--nui-border-default);
      --nui-pb-${name}-solid-fill-bg: ${color};
      --nui-pb-${name}-solid-fill-hover-bg: ${solidFillHover};
      --nui-pb-${name}-solid-value-text: var(--nui-text-secondary);
      --nui-pb-${name}-solid-label-text: var(--nui-text-primary);

      /* Outline: open transparent groove + stronger border + brand-colored text, lightens on hover */
      --nui-pb-${name}-outline-track-bg: transparent;
      --nui-pb-${name}-outline-track-border: ${outlineBorder};
      --nui-pb-${name}-outline-fill-bg: ${color};
      --nui-pb-${name}-outline-fill-hover-bg: ${outlineFillHover};
      --nui-pb-${name}-outline-value-text: ${color};
      --nui-pb-${name}-outline-label-text: ${color};

      /* Ghost: barely-there tinted groove + translucent fill, reveals itself on hover */
      --nui-pb-${name}-ghost-track-bg: ${this.withAlpha(color, 0.1)};
      --nui-pb-${name}-ghost-track-border: transparent;
      --nui-pb-${name}-ghost-fill-bg: ${ghostFill};
      --nui-pb-${name}-ghost-fill-hover-bg: ${ghostFillHover};
      --nui-pb-${name}-ghost-value-text: ${ghostValueText};
      --nui-pb-${name}-ghost-label-text: ${ghostLabelText};

      /* Misc */
      --nui-pb-text: ${pbText};
    `;
  }

  private generateSplitButtonVariables(name: string, color: string): string {
    const isDark = this._isDarkMode();

    // solid → divider white semi-transparent sobre fondo de color
    const solidDivider = isDark ? this.withAlpha('#ffffff', 0.2) : this.withAlpha('#ffffff', 0.3);

    // outline → ligeramente más opaco que el borde del botón outline
    const alpha30 = this.withAlpha(color, 0.3);

    // ghost → ligero, mismo tono que el hover ghost
    const alpha15 = this.withAlpha(color, 0.15);

    return `
      /* ── Split Button: ${name} ── */
      --nui-split-btn-${name}-solid-divider: ${solidDivider};
      --nui-split-btn-${name}-outline-divider: ${alpha30};
      --nui-split-btn-${name}-ghost-divider: ${alpha15};
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
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, '');

    // If it's a short format (3 digits: F00), expand it to long format (6 digits: FF0000)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(char => char + char)
        .join('');
    }

    // Match the hexadecimal color code and extract the RGB components
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    // If the hex code is valid, convert the RGB components from hexadecimal to decimal and return them as an object.
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
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
}
