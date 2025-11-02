# Carpeta de Temas

Esta carpeta contiene toda la lógica relacionada con los temas (light/dark) de la aplicación.

## Archivos

### `_theme-mixins.scss`
Contiene todos los mixins relacionados con la generación de variables de temas:
- `generate-color-variables()` - Genera variables de color base y tints
- `generate-button-variables()` - Genera variables de botones por tema
- `generate-chip-variables()` - Genera variables de chips por tema
- `generate-switch-variables()` - Genera variables de switches por tema
- `generate-component-variables()` - Wrapper que genera todas las variables de componentes
- `theme-specific-variables()` - Variables específicas de cada tema (surfaces, fields, etc.)

### `_light.scss`
Define el tema claro (`apply-light-theme` mixin) con:
- Paleta de colores para el tema light
- Colores de superficie (surface-primary, secondary, tertiary)
- Variables específicas de componentes (cards, modals, spinners, etc.)

### `_dark.scss`
Define el tema oscuro (`apply-dark-theme` mixin) con:
- Paleta de colores para el tema dark (más vibrantes para contraste)
- Colores de superficie adaptados para fondo oscuro
- Variables específicas de componentes para tema oscuro

## Uso

Los mixins `apply-light-theme` y `apply-dark-theme` se aplican en `_theme.scss` según la preferencia del usuario.

## Añadir un nuevo tema

Para añadir un nuevo tema:
1. Crea un nuevo archivo `_nombre-tema.scss`
2. Define tu paleta de colores
3. Crea un mixin `apply-nombre-tema`
4. Usa los mixins de `_theme-mixins.scss` para generar las variables
5. Importa y aplica tu tema en `_theme.scss`
