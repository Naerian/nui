# NUI - Angular UI Component Library

Modern, customizable Angular component library with theme support.

## Installation

```bash
npm install nui
```

> **Note:** NUI has `@angular/cdk` as a peer dependency. NPM will install it automatically.

## Styles Setup

NUI offers multiple ways to import styles. Choose the one that fits your needs:

### Option 1: Complete Bundle (Recommended - Easiest)

This includes all NUI styles AND required CDK Overlay styles in a single import.

**In angular.json:**

```json
{
  "styles": [
    "node_modules/nui/styles/nui-bundle.css",
    "src/styles.scss"
  ]
}
```

**Or in styles.scss:**

```scss
@import 'nui/styles/nui-bundle';
```

Then customize in your `styles.scss`:

```scss
:root {
  --button-primary-solid-bg: #007bff;
}
```

### Option 2: Manual Import (Advanced)

If you need more control or already have CDK styles imported elsewhere:

**In angular.json:**

```json
{
  "styles": [
    "node_modules/@angular/cdk/overlay-prebuilt.css",
    "node_modules/nui/styles/nui.css",
    "src/styles.scss"
  ]
}
```

**Or in styles.scss:**

```scss
@import '@angular/cdk/overlay-prebuilt.css';
@import 'nui/styles/nui';

:root {
  --button-primary-solid-bg: #007bff;
}
```

**For detailed styles documentation, see [README-STYLES.md](./README-STYLES.md)**

## Usage

```typescript
import { Component } from '@angular/core';
import { NuiButtonComponent } from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NuiButtonComponent],
  template: `
    <nui-button color="primary" variant="solid">
      Click me
    </nui-button>
  `
})
export class AppComponent {}
```

## Dark Theme

Add the `theme-dark` class to your `<html>` or `<body>` element:

```typescript
document.documentElement.classList.add('theme-dark');
```

---

## Development

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Code scaffolding

Run `ng generate component component-name --project nui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project nui`.
> Note: Don't forget to add `--project nui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `npm run build:nui` to build the project. This will compile both the library and CSS styles. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `npm run build:nui`, go to the dist folder `cd dist/nui` and run `npm publish`.

## Running unit tests

Run `ng test nui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
