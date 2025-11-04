# NUI Theme System - Hybrid Approach

## Architecture

The NUI theme system uses a **hybrid approach** that combines the best of SCSS compilation and CSS-in-JS:

### Base CSS (SCSS Compiled)
- All structural CSS variables are pre-compiled from SCSS to `nui.css` (518KB)
- Includes ~500+ variables: spacing, sizing, borders, shadows, transitions, etc.
- Generated using complex SCSS mixins (tint, shade, complementary colors)
- **No `@import` required** in consumer projects
- **No `stylePreprocessorOptions` needed** in angular.json

### Dynamic Colors (CSS-in-JS)
- Only 7 semantic color values × 2 modes = **14 color variables**
- Injected dynamically via `ThemeService`
- Enables runtime theme switching
- Minimal overhead (~200 lines of TypeScript vs 2000+ for full CSS-in-JS)

## Why Hybrid?

### ❌ Pure CSS-in-JS Approach (Abandoned)
**Problem:** Would require replicating 900+ lines of SCSS mixin logic in TypeScript
- `generate-button-variables()` creates 8 variables per color per variant
- `generate-chip-variables()`, `generate-toast-variables()`, etc.
- Dynamic tint/shade calculations
- Complementary color generation (hue rotation)
- RGB component extraction

**Estimated time:** 7-10 hours with high error risk

### ✅ Hybrid Approach (Current)
**Solution:** Leverage existing SCSS compilation + dynamic colors only
- CSS base pre-compiled once
- CSS-in-JS only for theme colors
- **1-2 hours implementation**
- No maintenance burden

## Usage

### 1. Install the library
```bash
npm install @your-org/nui
```

### 2. Import base CSS

#### Option A: In angular.json (Recommended)
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@your-org/nui/styles/nui.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

#### Option B: In styles.scss
```scss
@import '@your-org/nui/styles/nui';
```

Note: For Option B, you'll need to configure `stylePreprocessorOptions` in `angular.json`:
```json
{
  "stylePreprocessorOptions": {
    "includePaths": ["node_modules"]
  }
}
```

#### Option C: In index.html
```html
<link rel="stylesheet" href="node_modules/@your-org/nui/styles/nui.css">
```

### 3. Configure theme provider
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNUI, dopamine } from '@your-org/nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({ preset: dopamine })
  ]
};
```

### 4. Use components
```html
<nui-button color="primary">Click me</nui-button>
```

## Available Presets

### Aura (Default)
Teal-based color palette with balanced, professional tones
```typescript
provideNUI({ preset: aura })
```

### Dopamine
Lime-based color palette with high-energy accents
```typescript
provideNUI({ preset: dopamine })
```

### Corporate
Blue-based color palette with conservative, trustworthy tones
```typescript
provideNUI({ preset: corporate })
```

### Minimal
Gray-based color palette with subtle, understated accents
```typescript
provideNUI({ preset: minimal })
```

### Neon
Cyan/purple-based color palette with bold, electric vibes
```typescript
provideNUI({ preset: neon })
```

### Warm
Orange/brown-based color palette with cozy, earthy tones
```typescript
provideNUI({ preset: warm })
```

## Runtime Theme Switching

```typescript
import { ThemeService, dopamine, aura } from '@your-org/nui';

export class AppComponent {
  constructor(private themeService: ThemeService) {}

  switchToDopamine() {
    this.themeService.usePreset(dopamine);
  }

  switchToAura() {
    this.themeService.usePreset(aura);
  }
}
```

## Dark Mode

### Auto (default)
Respects system preference
```typescript
provideNUI({ 
  preset: aura,
  options: { darkModeSelector: 'system' }
})
```

### Class-based
Toggle with a CSS class
```typescript
provideNUI({ 
  preset: aura,
  options: { darkModeSelector: '.dark-mode' }
})
```

Then add/remove the class:
```typescript
document.documentElement.classList.toggle('dark-mode');
```

## Creating Custom Presets

```typescript
import { ThemePreset } from '@your-org/nui';

export const myCustomPreset: ThemePreset = {
  name: 'custom',
  colors: {
    light: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      success: '#your-color',
      info: '#your-color',
      warning: '#your-color',
      danger: '#your-color',
    },
    dark: {
      primary: '#your-dark-color',
      secondary: '#your-dark-color',
      accent: '#your-dark-color',
      success: '#your-dark-color',
      info: '#your-dark-color',
      warning: '#your-dark-color',
      danger: '#your-dark-color',
    }
  }
};
```

## Technical Details

### What's in nui.css?
- CSS reset and base styles
- All component styles (buttons, inputs, modals, etc.)
- ~500+ CSS variables for:
  - Spacing (margins, paddings, gaps)
  - Sizing (widths, heights, font-sizes)
  - Borders (radius, width)
  - Shadows (box-shadow values)
  - Transitions (durations, easings)
  - Typography (font-family, line-height, letter-spacing)
  - Component-specific variables (button-gap, modal-padding, etc.)

### What's injected via CSS-in-JS?
Only 7 semantic colors × 2 modes = 14 values:
- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-success`
- `--color-info`
- `--color-warning`
- `--color-danger`

These override the default colors from `nui.css` when a preset is applied.

## Benefits

✅ **No `@import`** - Consumers don't need to configure `stylePreprocessorOptions`  
✅ **No build configuration** - Just add CSS file to styles array  
✅ **Fast builds** - No SCSS compilation in consumer projects  
✅ **Dynamic theming** - Switch themes at runtime  
✅ **Type-safe** - Full TypeScript support  
✅ **Tree-shakeable** - Only import presets you use  
✅ **Small bundle** - Only ~200 lines of runtime code  

## Comparison with Other Libraries

### PrimeNG
Uses similar hybrid approach:
- Pre-compiled CSS themes
- CSS-in-JS for runtime color customization
- Multiple pre-built themes (Aura, Lara, etc.)

### Material Angular
Pure CSS approach:
- All styles pre-compiled
- Theme switching requires loading different CSS files
- No runtime color customization

### Ant Design
CSS-in-JS approach:
- Generates all styles at runtime
- Higher bundle size
- More flexible but more complex

NUI combines the best aspects: pre-compiled efficiency with runtime flexibility.
