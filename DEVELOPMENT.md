# Guía de Desarrollo - NUI

Esta guía es para desarrolladores que trabajan en la librería NUI, no para usuarios finales.

## Estructura del Proyecto

```
nui/
├── projects/
│   ├── nui/              # Código de la librería
│   │   ├── src/          # Componentes TypeScript
│   │   └── styles/       # Estilos SCSS
│   └── playground/       # Aplicación de prueba/desarrollo
│       └── src/
│           └── styles.scss
├── dist/
│   └── nui/              # Librería compilada (después de build)
│       ├── fesm2022/     # Bundles JavaScript
│       └── styles/
│           ├── nui.css   # CSS pre-compilado
│           └── *.scss    # Archivos SCSS copiados
└── angular.json
```

## Comandos Principales

### Desarrollo

```bash
# Iniciar servidor de desarrollo (playground)
npm start

# Esto ejecuta: ng serve playground
# El playground usa SCSS directamente desde projects/nui/styles/
```

### Build

```bash
# Construir la librería
npm run build:nui

# Esto hace:
# 1. ng build nui (compila TypeScript y copia archivos)
# 2. npm run build:styles (compila nui.scss → nui.css)
```

### Testing

```bash
npm run test:nui
```

## Estilos en Desarrollo vs Producción

### Durante Desarrollo (Playground)

El playground importa SCSS directamente:

```scss
// projects/playground/src/styles.scss
@import "../../nui/styles/nui";
```

**Por qué:**
- No necesitas ejecutar `npm run build:nui` cada vez
- Los cambios en SCSS se reflejan inmediatamente
- Acceso a variables y mixins SCSS

### Para Usuarios Finales (Después de npm install nui)

Los usuarios tienen dos opciones:

**Opción 1: CSS Pre-compilado**
```json
// angular.json
"styles": ["node_modules/nui/styles/nui.css"]
```

**Opción 2: SCSS**
```scss
// styles.scss
@import "nui/styles/nui";
```

## Workflow de Desarrollo

### 1. Trabajar en componentes

```bash
# 1. Inicia el playground
npm start

# 2. Edita archivos en projects/nui/src/
# 3. Los cambios se reflejan automáticamente
```

### 2. Trabajar en estilos

```bash
# 1. Inicia el playground
npm start

# 2. Edita archivos en projects/nui/styles/
# 3. Los cambios se reflejan automáticamente
```

### 3. Antes de publicar

```bash
# 1. Construye la librería completa
npm run build:nui

# 2. Verifica que dist/nui/ tiene todo:
#    - Archivos .d.ts (TypeScript declarations)
#    - fesm2022/ (JavaScript bundles)
#    - styles/nui.css (CSS compilado)
#    - styles/*.scss (SCSS source)

# 3. Publica
cd dist/nui
npm publish
```

## Solución de Problemas Comunes

### Error: "Could not resolve node_modules/nui/styles/nui.css"

**Problema:** Estás intentando usar `node_modules/nui/styles/nui.css` en el playground.

**Solución:** En el playground, usa la ruta relativa:
```scss
@import "../../nui/styles/nui";
```

La ruta `node_modules/nui/` solo existe cuando alguien **instala** tu librería.

### Error: "Can't find stylesheet to import"

**Problema:** El build de la librería no se ejecutó o falló.

**Solución:**
```bash
npm run build:nui
```

### Los cambios en estilos no se reflejan

**Problema:** Estás usando el CSS compilado en lugar del SCSS.

**Solución:** En el playground, asegúrate de importar SCSS:
```scss
@import "../../nui/styles/nui";
```

## Estructura de Estilos

### Orden de importación en nui.scss

```scss
// 1. Configuración base
@import "config";
@import "functions";

// 2. Mixins
@import "mixins";

// 3. Temas (generan CSS variables)
@import "theme-config";
@import "theme";

// 4. Estilos base
@import "base";
@import "typography";
@import "icons/remixicon";

// 5. Componentes globales
@import "components/components";
```

### Variables CSS vs Variables SCSS

**Variables SCSS ($variable):**
- Se resuelven en tiempo de compilación
- Usuarios deben importar SCSS para sobrescribirlas
- Definidas en `_config.scss`, `_colors.scss`, etc.

**CSS Custom Properties (--variable):**
- Se resuelven en runtime
- Usuarios pueden sobrescribirlas en `:root`
- Generadas por mixins en `themes/_theme-mixins.scss`

## Testing Local de la Librería

Para probar cómo funcionará cuando se instale desde NPM:

```bash
# 1. Construye la librería
npm run build:nui

# 2. En otro proyecto Angular de prueba:
npm install /ruta/a/nui/dist/nui

# 3. Configura angular.json:
"styles": ["node_modules/nui/styles/nui.css"]

# 4. Usa los componentes:
import { NuiButtonComponent } from 'nui';
```

## Iconos RemixIcon

La librería usa RemixIcon desde CDN por defecto:

```scss
// projects/nui/styles/icons/_remixicon.scss
@import url('https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css');
```

**Por qué CDN:**
- Evita problemas de resolución de rutas de fuentes
- Funciona tanto con SCSS como con CSS pre-compilado
- Sin configuración adicional para usuarios

**Para auto-hospedar:**
Edita `_remixicon.scss` y usa `@font-face` con rutas locales.

## Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Desarrolla en el playground
3. Ejecuta tests: `npm run test:nui`
4. Build: `npm run build:nui`
5. Commit y push
6. Crea Pull Request

## Recursos

- [Angular Library Guide](https://angular.io/guide/libraries)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)
- [Sass Documentation](https://sass-lang.com/documentation/)
- [RemixIcon](https://remixicon.com/)
