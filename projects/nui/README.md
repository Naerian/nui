# NUI - Angular UI Component Library

Modern, customizable Angular component library with theme support.

## Installation

```bash
npm install nui
```

## Styles Setup

NUI offers multiple ways to import styles. Choose the one that fits your needs:

### Option 1: Pre-compiled CSS (Recommended - Simplest)

Add to your `angular.json`:

```json
{
  "styles": [
    "node_modules/nui/styles/nui.css",
    "src/styles.scss"
  ]
}
```

Then customize in your `styles.scss`:

```scss
:root {
  --button-primary-solid-bg: #007bff;
}
```

### Option 2: Full SCSS (Maximum Customization)

Import in your `styles.scss`:

```scss
@import "nui/styles/nui";

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
