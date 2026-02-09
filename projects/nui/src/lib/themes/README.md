# NUI Theme System

## Overview

The NUI theme system is a production-grade, runtime-configurable theming solution for Angular applications. It provides a comprehensive color management architecture that supports dynamic theme switching, automatic dark mode detection, and generates a complete set of CSS custom properties (CSS variables) for consistent component styling across the entire library.

### Problem It Solves

- **Runtime Theme Switching**: Change themes dynamically without rebuilding the application
- **Dark Mode Support**: Automatic detection and manual control of light/dark modes with per-theme color variants
- **Design Token Generation**: Automatically generates tints, shades, and alpha variants from base colors
- **Component-Specific Theming**: Creates optimized CSS variables for each component type (buttons, avatars, toasts, etc.)
- **Type Safety**: Full TypeScript support with strongly-typed theme definitions
- **Zero SCSS Dependencies**: Pure TypeScript-driven system that generates CSS at runtime

### Integration with NUI Library

The theme system is the foundational layer of the NUI design system. It:

1. Generates all semantic color tokens used by components
2. Manages structural variables (backgrounds, borders, text colors, shadows)
3. Provides reactive state through Angular Signals
4. Integrates seamlessly with Angular's dependency injection system
5. Works with both standalone components and NgModule-based projects

---

## Folder Structure

```
themes/
├── index.ts                    # Public API exports
├── provider.ts                 # Angular provider function (provideNUI)
├── theme.service.ts           # Core theme management service
├── models/
│   ├── theme.model.ts         # TypeScript interfaces and types
│   └── theme.config.ts        # Constants and default 
│   └── theme.grays.ts         # Gray scales
│   └── theme.presets.ts       # Array of available theme presets.
configurations
└── presets/
    ├── aura.ts                # Default preset (teal/purple)
    ├── corporate.ts           # Professional business theme
    ├── dopamine.ts            # Vibrant, high-energy theme
    ├── minimal.ts             # Clean, understated grayscale theme
    ├── neon.ts                # Bold, electric cyan/purple theme
    ├── ocean.ts               # Deep blues and aqua tones
    ├── sunset.ts              # Warm reds and oranges
    ├── twilight.ts            # Purple-based evening theme
    └── warm.ts                # Earthy orange/brown tones
```

### File Purposes

#### `models/theme.model.ts`
Defines the core TypeScript interfaces:

- **`ThemeColors`**: 8 semantic color properties (primary, secondary, accent, success, info, warning, danger, neutral)
- **`ThemeGrays`**: 10-step gray scale (50-900) for structural elements
- **`ThemePreset`**: Complete theme definition with light and dark mode colors
- **`ThemeConfig`**: Configuration object for initializing the theme system
- **`DarkModeStrategy`**: Type definition for dark mode behaviors (`'auto' | 'manual' | 'system'`)

#### `models/theme.config.ts`
Contains constant definitions:

- **`LUMINANCE_UMBRAL`**: Threshold (0.4) for determining black vs white contrast text
- **`PURE_COLORS`**: Absolute black (`#0d1117`) and white (`#ffffff`) values
- **`DEFAULT_PRESET`**: References the `aura` preset as the library default
- **`NUI_THEME_CONFIG`**: Injection token for providing theme configuration

#### `models/theme-presets.ts`
Contains a array of NUI presets:
- **`NUI_PRESETS`**: Array of available NUI presets to use (aura, warm, minimal...)

#### `models/theme-grays.ts`
It contains the different grayscales available in NUI:
- **`SLATE`**: A neutral gray with a subtle blue undertone. Ideal for modern interfaces and dashboards, providing a clean and contemporary look without feeling cold.
- **`COOL`**: A cool-toned gray with a noticeable blue bias. Works especially well in dark mode and professional digital products where clarity and precision are key.
- **`ZINC`**: A balanced, slightly muted gray with no strong color dominance. An excellent neutral base for minimalist interfaces where content should take visual priority.
- **`NEUTRAL`**: A truly neutral gray with no warm or cool undertones. Perfect for versatile and accessible design systems, as it does not interfere with primary or accent colors.
- **`STONE`**: A warm gray with subtle earthy undertones. Adds a more organic and human feel, making it suitable for editorial, lifestyle, or nature-inspired interfaces.



#### `theme.service.ts`
The core runtime engine (956 lines). Key responsibilities:

- Injects a `<style id="nui-theme-colors">` element into `document.head`
- Generates 200+ CSS custom properties dynamically based on active theme
- Manages dark mode state using Angular Signals
- Listens to system color scheme changes (`prefers-color-scheme`)
- Provides color manipulation utilities (tint, shade, alpha, contrast calculation)
- Exposes reactive APIs via Signals and RxJS Observables

#### `provider.ts`
Exports the `provideNUI(config?: ThemeConfig)` function for Angular DI setup. Uses `APP_INITIALIZER` to ensure the theme is applied before the first render, preventing flash-of-unstyled-content (FOUC).

#### `presets/*.ts`
Pre-built theme configurations. Each defines:

- Light and dark mode color mappings
- Optional custom gray scale (falls back to `COOL_GRAYS` if omitted)
- Semantic color assignments optimized for the theme's personality

---

## Theme Architecture

### Core Concepts

#### 1. **Semantic Color System**

Every theme defines 8 semantic colors in both light and dark modes:

| Color      | Purpose                                    |
|------------|--------------------------------------------|
| `primary`  | Main brand color, CTA buttons              |
| `secondary`| Supporting brand color, secondary actions  |
| `accent`   | Highlight color for emphasis               |
| `success`  | Positive feedback, success states          |
| `info`     | Informational messages                     |
| `warning`  | Caution, non-critical alerts               |
| `danger`   | Errors, destructive actions                |
| `neutral`  | Neutral tones for secondary UI elements    |

#### 2. **Gray Scale System**

Each theme can optionally define a 10-step gray scale (50-900). If not provided, defaults to `COOL_GRAYS`. These are used for:

- Background layers (primary, secondary, tertiary)
- Text hierarchy (primary, secondary, tertiary, disabled)
- Borders and dividers
- Shadows and overlays

#### 3. **Color Variant Generation**

For each semantic color, the service automatically generates:

**Tints (lighter variants):**
- `--nui-color-{name}-tint-95` (5% toward white)
- `--nui-color-{name}-tint-90` (10% toward white)
- `--nui-color-{name}-tint-80` (20% toward white)
- `--nui-color-{name}-tint-70` (30% toward white)
- `--nui-color-{name}-tint-60` (40% toward white)
- `--nui-color-{name}-tint-50` (50% toward white)

**Shades (darker variants):**
- `--nui-color-{name}-shade-10` (10% toward black)
- `--nui-color-{name}-shade-20` (20% toward black)
- `--nui-color-{name}-shade-30` (30% toward black)
- `--nui-color-{name}-shade-40` (40% toward black)
- `--nui-color-{name}-shade-50` (50% toward black)

**Alpha variants (transparency):**
- `--nui-color-{name}-alpha-10` through `--nui-color-{name}-alpha-90` (10% increments)

#### 4. **Structural Variables**

The theme system generates structural tokens that adapt to light/dark modes:

```scss
/* Background layers */
--nui-bg-primary       // Main canvas (white in light, gray-900 in dark)
--nui-bg-secondary     // Subtle elevation
--nui-bg-tertiary      // Higher elevation

/* Text colors */
--nui-text-primary     // High emphasis text
--nui-text-secondary   // Medium emphasis
--nui-text-tertiary    // Low emphasis
--nui-text-disabled    // Disabled state

/* Borders */
--nui-border-primary
--nui-border-secondary
--nui-border-strong
--nui-border-weak

/* Shadows */
--nui-box-shadow-xs
--nui-box-shadow-sm
--nui-box-shadow-md
--nui-box-shadow-lg
--nui-box-shadow-xl
```

Shadows automatically adapt to dark mode by adding a subtle white border ring to maintain component definition against dark backgrounds.

#### 5. **Component-Specific Variables**

The service generates optimized variables for each component type:

- **Buttons**: Solid, outline, and ghost variants with hover/active states
- **Button Groups**: Multi-variant support (solid, outline, ghost, segmented)
- **Avatars**: Background and text colors with hover states
- **Toasts**: Background, border, icon, title, progress bar colors
- **Paginator**: All variants with ellipsis styling
- **Action Menu**: Selection states, borders, checkmarks
- **Popover**: Multi-variant support (solid, outline, ghost)
- **Tooltip**: Fixed high-contrast styling
- **Sidebar Panel**: Background, overlay, scrollbar styling
- **And more...**

#### 6. **Contrast Text Calculation**

The service uses WCAG's relative luminance formula to automatically calculate contrasting text colors (black or white) for any given background color. This ensures WCAG AA compliance for all themed components.

**Algorithm:**
- Converts color to RGB → Calculates relative luminance
- If **luminance > 0.4** → Use near-black (`#0d1117`)
- If **luminance ≤ 0.4** → Use white (`#ffffff`)

---

## Naming Conventions

### CSS Custom Property Patterns

```scss
/* Base semantic colors */
--nui-{semantic}                    // e.g., --nui-primary
--nui-{semantic}-contrast           // Contrasting text color

/* Variant suffixes */
--nui-color-{semantic}-tint-{n}     // Lighter (n = 50-95)
--nui-color-{semantic}-shade-{n}    // Darker (n = 10-50)
--nui-color-{semantic}-alpha-{n}    // Transparent (n = 10-90)

/* Component variables */
--nui-{component}-{semantic}-{variant}-{property}
// Examples:
--nui-btn-primary-solid-bg
--nui-btn-primary-solid-hover-bg
--nui-btn-primary-outline-border
--nui-pg-danger-ghost-hover-bg
--nui-toast-success-border
```

### Prefix Convention

All CSS variables use the `nui-` prefix to avoid namespace collisions with consumer applications.

### BEM-Inspired Component Prefixes

- `btn` → Buttons
- `btn-group` → Button Groups
- `pg` → Paginator
- `am` → Action Menu
- `avatar` → Avatar component
- `toast` → Toast notifications
- `popover` → Popover component
- `sidebar-panel` → Sidebar Panel

---

## Dark Mode Strategies

The theme system supports three dark mode behaviors configured via `darkMode` in `ThemeConfig`:

### 1. **`manual` (default)**

Full programmatic control. Dark mode does not react to system preferences.

```typescript
provideNUI({
  preset: ocean,
  darkMode: 'manual'
});

// In component:
themeService.setDarkMode(true);
themeService.toggleDarkMode();
```

### 2. **`system`**

Reads system preference once at initialization. Does not react to subsequent changes.

```typescript
provideNUI({
  preset: aura,
  darkMode: 'system'
});
```

### 3. **`auto`**

Continuously syncs with system preference via `prefers-color-scheme` media query. Automatically updates when user changes OS dark mode.

```typescript
provideNUI({
  preset: twilight,
  darkMode: 'auto'
});
```

### Dark Mode Class

By default, applies the `dark-mode` class to `<html>`. Customizable via `darkModeClass`:

```typescript
provideNUI({
  preset: corporate,
  darkMode: 'manual',
  darkModeClass: 'theme-dark'
});
```

---

## How Themes Are Consumed

### 1. **Application Configuration** (main.ts or app.config.ts)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNUI, aura, neon } from '@your-org/nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({
      preset: aura,           // Initial theme
      darkMode: 'auto',       // Auto-sync with system
      darkModeClass: 'dark'   // Optional: custom class name
    })
  ]
};
```

### 2. **Runtime Theme Switching**

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService, neon, minimal } from '@your-org/nui';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <button (click)="switchToNeon()">Neon Theme</button>
    <button (click)="switchToMinimal()">Minimal Theme</button>
    <button (click)="toggleDark()">Toggle Dark Mode</button>
  `
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  switchToNeon() {
    this.themeService.usePreset(neon);
  }

  switchToMinimal() {
    this.themeService.usePreset(minimal);
  }

  toggleDark() {
    this.themeService.toggleDarkMode(); // Only works with 'manual' strategy
  }
}
```

### 3. **Reactive State Access**

The service exposes reactive primitives for UI bindings:

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '@your-org/nui';

@Component({
  selector: 'app-header',
  template: `
    <header [class.dark]="themeService.isDarkMode()">
      <h1>Current Theme: {{ themeService.currentPreset().name }}</h1>
      <span>Primary Color: {{ themeService.colors().primary }}</span>
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
```

**Available Signals:**
- `isDarkMode: Signal<boolean>` - Current dark mode state
- `currentPreset: Signal<ThemePreset>` - Active theme preset
- `colors: Signal<ThemeColors>` - Current color palette (auto-switches between light/dark)

**RxJS Observables** (for compatibility):
- `isDarkMode$: Observable<boolean>`
- `currentPreset$: Observable<ThemePreset>`

### 4. **Using Generated CSS Variables**

Components consume the generated CSS variables:

```scss
// Button component example
.nui-btn {
  background-color: var(--nui-btn-primary-solid-bg);
  color: var(--nui-btn-primary-solid-text);
  box-shadow: var(--nui-shadow-interactive);

  &:hover {
    background-color: var(--nui-btn-primary-solid-hover-bg);
  }

  &:focus-visible {
    outline: 2px solid var(--nui-btn-primary-focus-ring);
  }
}
```

### 5. **Build-Time Considerations**

**No build-time configuration required.** The theme system is fully runtime-based:

- No SCSS compilation needed for theme changes
- No rebuild required to switch themes
- Themes can be loaded dynamically (e.g., from user preferences API)
- Tree-shakeable: Unused presets are not included in the bundle

---

## Customization & Extension

### Creating a Custom Theme

Define a new preset using the `ThemePreset` interface:

```typescript
import { ThemePreset, SLATE_GRAYS } from '@your-org/nui';

export const myBrand: ThemePreset = {
  name: 'my-brand',
  colors: {
    light: {
      primary: '#0066cc',
      secondary: '#6c757d',
      accent: '#ff6b35',
      success: '#28a745',
      info: '#17a2b8',
      warning: '#ffc107',
      danger: '#dc3545',
      neutral: '#6c757d'
    },
    dark: {
      primary: '#3399ff',
      secondary: '#adb5bd',
      accent: '#ff8c5a',
      success: '#33cc66',
      info: '#5bc0de',
      warning: '#ffcd3a',
      danger: '#ff5a5f',
      neutral: '#adb5bd'
    }
  },
  grays: SLATE_GRAYS  // Optional: Use pre-built or define custom
};
```

**Custom Gray Scale:**

```typescript
export const customTheme: ThemePreset = {
  name: 'custom',
  colors: { /* ... */ },
  grays: {
    50: '#fafafa',
    100: '#f0f0f0',
    200: '#e0e0e0',
    300: '#c8c8c8',
    400: '#a0a0a0',
    500: '#787878',
    600: '#585858',
    700: '#404040',
    800: '#282828',
    900: '#181818'
  }
};
```

### Overriding Default Configuration

```typescript
provideNUI({
  preset: myBrand,
  darkMode: 'system'
});
```

### Extending the Service

For advanced use cases, extend `ThemeService`:

```typescript
import { Injectable } from '@angular/core';
import { ThemeService } from '@your-org/nui';

@Injectable({ providedIn: 'root' })
export class CustomThemeService extends ThemeService {
  applyHighContrast() {
    // Custom logic to modify CSS variables for accessibility
  }
}
```

---

## Best Practices & Design Decisions

### Why Runtime Generation?

**Traditional Approach (SCSS-based):**
- Requires rebuild to change themes
- Limits dynamic theme switching
- Increases bundle size with multiple theme stylesheets

**NUI Approach (Runtime CSS Variables):**
- Zero-cost theme switching (no re-render needed)
- One stylesheet for all themes
- Themes can be user-selectable or API-driven
- Automatic variant generation reduces manual token maintenance

### Why Angular Signals?

- **Fine-grained Reactivity**: Components only re-render when theme actually changes
- **Zoneless Compatibility**: Works with Angular's future zoneless change detection
- **Developer Experience**: Simple, synchronous API (no subscription management)
- **Performance**: More efficient than traditional Observable-based state

### Contrast Calculation Rationale

The WCAG luminance formula ensures all text/background combinations meet AA accessibility standards. The 0.4 threshold was chosen empirically to balance readability across the full color spectrum.

### Shadow System Design

Shadows are challenging in dark mode because dark backgrounds absorb them. The solution:

1. Increase shadow opacity in dark mode (`--nui-shadow-opacity-scale: 2.5`)
2. Add a subtle white border ring (`0 0 0 1px rgba(255, 255, 255, 0.05)`)
3. Use semantic aliases (e.g., `--nui-shadow-container`) to map use cases to primitives

This ensures visual hierarchy is maintained regardless of mode.

### Component Variable Patterns

Each component gets a complete set of variables for all states:

- **Base state** (default appearance)
- **Hover state** (pointer interaction)
- **Active state** (pressed/clicked)
- **Focus state** (keyboard navigation)
- **Variant states** (solid, outline, ghost, etc.)

This eliminates the need for JavaScript-based style calculations in components.

---

## Limitations & Assumptions

### Assumptions

1. **Modern Browser Target**: Requires CSS custom properties (IE11 not supported)
2. **Angular 14+**: Uses modern Angular APIs (Signals require Angular 16+)
3. **Document Access**: Assumes `document` object is available (not SSR-safe without modifications)
4. **Color Format**: All colors must be in hex format (`#rrggbb`) or valid CSS keywords
5. **Gray Scale Completeness**: If custom `grays` are provided, all 10 steps (50-900) must be defined

### Known Limitations

1. **SSR Consideration**: The service injects styles into `document.head`, which requires special handling for server-side rendering. Use `APP_INITIALIZER` carefully or defer theme application to browser-only execution.

2. **No Gradient Support**: Semantic colors are solid colors only. Gradients must be defined manually (e.g., `--nui-color-modal-gradient`).

3. **Fixed Variant Steps**: Tint/shade/alpha steps are hardcoded (cannot be customized without forking the service).

4. **Component Coverage**: Only generates variables for components currently in the library. New components require updating `ThemeService.generateComponentVariables()`.

5. **No Animation Transitions**: CSS variable changes are instant. Smooth transitions must be implemented per-component using CSS transitions.

6. **System Dark Mode Detection**: Uses `prefers-color-scheme` media query, which is read-only. Cannot force system-level dark mode from the app.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application                             │
│  (configures via provideNUI in app.config.ts)                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │      ThemeService             │
         │  (Injectable, providedIn root)│
         └───────────┬───────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    ┌──────────┐         ┌──────────────┐
    │ Presets  │         │   Models     │
    │  (TS)    │         │ (Interfaces) │
    └──────────┘         └──────────────┘
          │                     │
          └──────────┬──────────┘
                     ▼
         ┌──────────────────────┐
         │  CSS Variable Engine  │
         │  (generateComponent   │
         │   Variables)          │
         └──────────┬─────────────┘
                    │
                    ▼
         ┌─────────────────────────┐
         │   <style> Element       │
         │   in document.head      │
         │   (--nui-* variables)   │
         └──────────┬──────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │   Component Stylesheets  │
         │   (consume CSS vars)     │
         └──────────────────────────┘
```

---

## Summary

The NUI theme system is a sophisticated, production-ready solution that balances flexibility, performance, and developer experience. By generating CSS custom properties at runtime through a TypeScript-driven service, it enables true dynamic theming while maintaining type safety and providing automatic variant generation. The architecture leverages Angular's modern reactive primitives (Signals) and dependency injection to create a seamless integration that requires minimal configuration while supporting advanced customization scenarios.

Key innovations:
- **200+ CSS variables** generated from 8 semantic colors
- **Automatic contrast calculation** for accessibility
- **Dark mode that actually works** (with proper shadows and borders)
- **Zero rebuild cost** for theme changes
- **Component-optimized** variables reduce CSS duplication

This system serves as the foundation for a consistent, accessible, and themeable component library that can adapt to any brand while maintaining design system coherence.
