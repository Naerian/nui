# NUI - Angular UI Component Library

Modern, flexible UI component library for Angular 17+ with hybrid theming system.

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=nui)](https://nui-zeta.vercel.app)
![License](https://img.shields.io/badge/license-MIT-green)
![Angular](https://img.shields.io/badge/Angular-v17+-dd0031?logo=angular&logoColor=white)

## Demo

Check out the live showcase of the components here:
> **[Live Demo on Vercel](https://[TU-APP].vercel.app)**

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start showcase dev server
npm start

# Build library (includes CSS compilation)
npm run build:nui

# Run tests
npm run test:nui
```

### Using the Library

```typescript
import { provideNUI, dopamine } from '@your-org/nui';

export const appConfig: ApplicationConfig = {
  providers: [provideNUI({ preset: dopamine })],
};
```

## Project Structure

```
nui/
├── projects/
│   ├── nui/                    # Component library source
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/ # UI components
│   │   │   │   ├── themes/     # Hybrid theme system
│   │   │   │   ├── configs/    # Configuration utilities
│   │   │   │   └── translations/
│   │   │   └── public-api.ts
│   │   └── styles/             # SCSS source files
│   │       ├── nui.scss        # Main stylesheet
│   │       ├── themes/         # Theme mixins
│   │       ├── components/     # Component styles
│   │       └── variables/      # CSS variable definitions
│   └── showcase/             # Development/testing app
├── dist/
│   └── nui/
│       ├── styles/
│       │   └── nui.css         # Compiled CSS (518KB)
│       └── ...                 # Compiled library
└── docs/                       # Documentation
```

## Theming System

NUI uses a **hybrid theming approach**:

- **Base CSS**: Pre-compiled SCSS with ~500+ CSS variables (spacing, sizing, shadows, etc.)
- **Dynamic Colors**: Only 7 semantic colors injected at runtime via CSS-in-JS

### Why Hybrid?

✅ No `@import` required in consumer projects  
✅ No `stylePreprocessorOptions` configuration needed  
✅ Fast builds - no SCSS compilation in consumer apps  
✅ Dynamic theme switching at runtime  
✅ Small bundle - only ~200 lines of runtime code

See [Theme System Documentation](./projects/nui/src/lib/themes/README.md) for details.

## Available Components

- **Button** - Flexible button component with variants
- **ButtonGroup** - Group multiple buttons
- **Toast** - Toast notifications
- **Tooltip** - Contextual tooltips
- **Paginator** - Pagination controls
- **Popover** - Floating content panels

## Scripts

| Command                | Description                 |
| ---------------------- | --------------------------- |
| `npm start`            | Start showcase dev server   |
| `npm run build:nui`    | Build library + compile CSS |
| `npm run build:styles` | Compile SCSS to CSS only    |
| `npm run build:play`   | Build showcase app          |
| `npm run test:nui`     | Run library tests           |

## Build Process

The library uses a two-step build:

1. **Angular Build** - Compiles TypeScript and creates bundle
2. **SCSS Compilation** - Generates `nui.css` from SCSS sources

```bash
npm run build:nui
# Runs: ng build nui && sass projects/nui/styles/nui.scss dist/nui/styles/nui.css
```

## Documentation

- [Theme System](./projects/nui/src/lib/themes/README.md) - Hybrid theming architecture
- [Styles Guide](./projects/nui/styles/README.md) - SCSS structure and variables
- [Component Docs](./docs/) - Individual component documentation

### Built With

![NX](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

## License

![License](https://img.shields.io/badge/license-MIT-blue.svg)
