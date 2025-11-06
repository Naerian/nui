# Progress Bar Component

## 📋 Descripción

El componente `nui-progress-bar` es una barra de progreso altamente personalizable que permite mostrar el avance de una tarea o proceso. Incluye soporte completo para el sistema de diseño NUI con múltiples variantes, colores, tamaños y opciones de visualización.

## 🎯 Características Principales

- ✅ **7 colores NUI**: primary, secondary, success, info, warning, danger, accent
- ✅ **3 variantes**: solid, outline, ghost
- ✅ **6 tamaños**: xs, s, sm, md, lg, xl
- ✅ **Múltiples posiciones de valor**: inside, outside (top, bottom, left, right), hidden
- ✅ **2 formatos de valor**: percentage, fractional
- ✅ **Etiquetas personalizables**: con iconos y combinación con valores
- ✅ **Modo indeterminado**: para progreso desconocido
- ✅ **Accesibilidad**: atributos ARIA automáticos
- ✅ **Tematización**: soporte automático para temas light/dark
- ✅ **Animaciones suaves**: transiciones y efectos hover

## 📦 Importación

```typescript
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [ProgressBarComponent],
  // ...
})
export class MyComponent {}
```

## 🚀 Uso Básico

### Ejemplo Simple

```html
<nui-progress-bar
  [value]="50"
  [maxValue]="100"
></nui-progress-bar>
```

### Con Etiqueta

```html
<nui-progress-bar
  [value]="75"
  [maxValue]="100"
  label="Procesando archivo"
  icon="ri-file-line"
></nui-progress-bar>
```

### Modo Indeterminado

```html
<nui-progress-bar
  [indeterminate]="true"
  label="Cargando..."
  icon="ri-loader-4-line"
></nui-progress-bar>
```

## 🎨 Propiedades (Inputs)

### Básicas

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `value` | `number \| null` | `0` | Valor actual del progreso |
| `maxValue` | `number \| null` | `100` | Valor máximo del progreso |
| `size` | `NUISize` | `'md'` | Tamaño de la barra: `'xs' \| 's' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |
| `color` | `NUIColor` | `'primary'` | Color de la barra: `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'accent'` |
| `variant` | `ProgressBarVariant` | `'solid'` | Variante visual: `'solid' \| 'outline' \| 'ghost'` |

### Visualización

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `valuePosition` | `ProgressBarValuePosition` | `'inside'` | Posición del valor: `'inside' \| 'hidden' \| 'top' \| 'bottom' \| 'left' \| 'right'` |
| `valueFormat` | `ProgressBarValueFormat` | `'percentage'` | Formato del valor: `'percentage' \| 'fractional'` |
| `labelPosition` | `ProgressBarLabelPosition` | `'top'` | Posición de la etiqueta: `'top' \| 'bottom' \| 'left' \| 'right'` |
| `label` | `string \| null` | `null` | Texto de la etiqueta descriptiva |
| `icon` | `string \| null` | `null` | Clase del icono (ej: 'ri-upload-line') |

### Configuración

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `indeterminate` | `boolean` | `false` | Activa el modo de progreso indeterminado |
| `hideValue` | `boolean` | `false` | Oculta el valor numérico |
| `combineLabelValue` | `boolean` | `false` | Combina etiqueta y valor en una sola línea |

### Personalización

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `trackColor` | `string \| null` | `null` | Color personalizado para el track (fondo). Sobrescribe el color NUI |
| `fillColor` | `string \| null` | `null` | Color personalizado para el fill (relleno). Sobrescribe el color NUI |

## 🎨 Variantes

### Solid (Por Defecto)

Barra con fondo de color sólido y track con tinte suave.

```html
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  color="primary"
  variant="solid"
></nui-progress-bar>
```

**Características:**
- Fondo de color sólido en el fill
- Track con color tintado al 90%
- Borde con color tintado al 50%
- Efecto hover oscureciendo 10%

### Outline

Barra con borde de color y fondo transparente.

```html
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  color="success"
  variant="outline"
></nui-progress-bar>
```

**Características:**
- Track transparente
- Borde de color del tema
- Fill de color sólido
- Ideal para fondos claros

### Ghost

Barra con color semitransparente y aspecto sutil.

```html
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  color="info"
  variant="ghost"
></nui-progress-bar>
```

**Características:**
- Track con tinte sutil
- Fill con opacidad del 70%
- Sin borde visible
- Hover aumenta opacidad al 85%

## 📏 Tamaños

```html
<!-- Extra Small -->
<nui-progress-bar [value]="50" [maxValue]="100" size="xs"></nui-progress-bar>

<!-- Small -->
<nui-progress-bar [value]="50" [maxValue]="100" size="s"></nui-progress-bar>

<!-- Small-Medium -->
<nui-progress-bar [value]="50" [maxValue]="100" size="sm"></nui-progress-bar>

<!-- Medium (Default) -->
<nui-progress-bar [value]="50" [maxValue]="100" size="md"></nui-progress-bar>

<!-- Large -->
<nui-progress-bar [value]="50" [maxValue]="100" size="lg"></nui-progress-bar>

<!-- Extra Large -->
<nui-progress-bar [value]="50" [maxValue]="100" size="xl"></nui-progress-bar>
```

**Alturas:**
- `xs`: 8px
- `s`: 10px
- `sm`: 12px
- `md`: 16px (por defecto)
- `lg`: 24px
- `xl`: 32px

> **⚠️ Nota importante**: Los tamaños `xs`, `s` y `sm` ocultan automáticamente el valor interno (`valuePosition="inside"`) porque el texto quedaría cortado. Para estos tamaños, se recomienda usar `valuePosition="outside"`, `valuePosition="top"`, `valuePosition="bottom"` o `valuePosition="hidden"`.

## 🎨 Colores

```html
<!-- Primary (Teal) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="primary"></nui-progress-bar>

<!-- Secondary (Slate) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="secondary"></nui-progress-bar>

<!-- Success (Green) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="success"></nui-progress-bar>

<!-- Info (Blue) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="info"></nui-progress-bar>

<!-- Warning (Amber) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="warning"></nui-progress-bar>

<!-- Danger (Red) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="danger"></nui-progress-bar>

<!-- Accent (Purple) -->
<nui-progress-bar [value]="50" [maxValue]="100" color="accent"></nui-progress-bar>
```

## 📍 Posiciones del Valor

### Inside (Dentro de la Barra)

```html
<nui-progress-bar
  [value]="75"
  [maxValue]="100"
  valuePosition="inside"
></nui-progress-bar>
```

### Hidden (Oculto)

```html
<nui-progress-bar
  [value]="75"
  [maxValue]="100"
  valuePosition="hidden"
  label="Sin valor visible"
></nui-progress-bar>
```

### Outside Positions (Fuera de la Barra)

```html
<!-- Arriba -->
<nui-progress-bar [value]="75" [maxValue]="100" valuePosition="top"></nui-progress-bar>

<!-- Abajo -->
<nui-progress-bar [value]="75" [maxValue]="100" valuePosition="bottom"></nui-progress-bar>

<!-- Izquierda -->
<nui-progress-bar [value]="75" [maxValue]="100" valuePosition="left"></nui-progress-bar>

<!-- Derecha -->
<nui-progress-bar [value]="75" [maxValue]="100" valuePosition="right"></nui-progress-bar>
```

> **💡 Recomendación**: Para tamaños pequeños (`xs`, `s`, `sm`), usa siempre posiciones externas (`top`, `bottom`, `left`, `right`) o `hidden` para mejor legibilidad.

## 🏷️ Posiciones de Etiqueta

```html
<!-- Etiqueta arriba -->
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  label="Procesando"
  labelPosition="top"
></nui-progress-bar>

<!-- Etiqueta abajo -->
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  label="Procesando"
  labelPosition="bottom"
></nui-progress-bar>

<!-- Etiqueta izquierda -->
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  label="Procesando"
  labelPosition="left"
></nui-progress-bar>

<!-- Etiqueta derecha -->
<nui-progress-bar
  [value]="60"
  [maxValue]="100"
  label="Procesando"
  labelPosition="right"
></nui-progress-bar>
```

## 📊 Formatos de Valor

### Porcentaje (Percentage)

```html
<nui-progress-bar
  [value]="45"
  [maxValue]="100"
  valueFormat="percentage"
  label="Descarga"
></nui-progress-bar>
<!-- Mostrará: 45% -->
```

### Fraccional (Fractional)

```html
<nui-progress-bar
  [value]="7"
  [maxValue]="15"
  valueFormat="fractional"
  label="Pasos completados"
></nui-progress-bar>
<!-- Mostrará: 7/15 -->
```

## 🔄 Modo Indeterminado

Para mostrar progreso cuando no se conoce el valor exacto:

```html
<nui-progress-bar
  [indeterminate]="true"
  color="primary"
  label="Cargando..."
  icon="ri-loader-4-line"
></nui-progress-bar>
```

**Características:**
- Animación continua de izquierda a derecha
- No muestra valor numérico
- Ideal para operaciones de duración desconocida

## 🎭 Iconos y Etiquetas

### Con Icono y Etiqueta

```html
<nui-progress-bar
  [value]="65"
  [maxValue]="100"
  label="Subiendo archivo"
  icon="ri-upload-cloud-line"
></nui-progress-bar>
```

### Combinando Etiqueta y Valor

```html
<nui-progress-bar
  [value]="75"
  [maxValue]="100"
  label="Instalación"
  icon="ri-settings-3-line"
  [combineLabelValue]="true"
  labelPosition="top"
  valuePosition="hidden"
></nui-progress-bar>
<!-- Mostrará: "🔧 Instalación 75%" en la misma línea -->
```

## 💡 Casos de Uso

### 1. Subida de Archivo

```typescript
// Component
uploadProgress = signal<number>(0);

uploadFile(file: File) {
  // Simulación de subida
  const interval = setInterval(() => {
    const current = this.uploadProgress();
    if (current >= 100) {
      clearInterval(interval);
    } else {
      this.uploadProgress.set(current + 10);
    }
  }, 500);
}
```

```html
<!-- Template -->
<nui-progress-bar
  [value]="uploadProgress()"
  [maxValue]="100"
  color="primary"
  size="md"
  label="Subiendo documento.pdf"
  icon="ri-upload-cloud-line"
  labelPosition="top"
  valuePosition="inside"
></nui-progress-bar>

<button (click)="uploadFile()">Subir Archivo</button>
```

### 2. Instalación de Paquetes

```html
<div class="package-installation">
  <nui-progress-bar
    [value]="100"
    [maxValue]="100"
    color="success"
    size="sm"
    label="@angular/core"
    icon="ri-checkbox-circle-fill"
  ></nui-progress-bar>
  
  <nui-progress-bar
    [value]="75"
    [maxValue]="100"
    color="primary"
    size="sm"
    label="rxjs"
    icon="ri-loader-4-line"
  ></nui-progress-bar>
  
  <nui-progress-bar
    [value]="0"
    [maxValue]="100"
    color="secondary"
    size="sm"
    label="typescript"
    icon="ri-time-line"
  ></nui-progress-bar>
</div>
```

### 3. Niveles de Habilidades

```html
<nui-progress-bar
  [value]="95"
  [maxValue]="100"
  color="success"
  size="md"
  label="TypeScript"
  labelPosition="left"
  valuePosition="inside"
></nui-progress-bar>

<nui-progress-bar
  [value]="90"
  [maxValue]="100"
  color="primary"
  size="md"
  label="Angular"
  labelPosition="left"
  valuePosition="inside"
></nui-progress-bar>
```

### 4. Dashboard con Múltiples Métricas

```html
<nui-card>
  <nui-card-header>
    <div>Métricas del Sistema</div>
  </nui-card-header>
  
  <nui-progress-bar
    [value]="85"
    [maxValue]="100"
    color="success"
    variant="solid"
    size="lg"
    label="Ventas del mes"
    icon="ri-money-dollar-circle-line"
    labelPosition="top"
    valuePosition="inside"
  ></nui-progress-bar>
  
  <nui-progress-bar
    [value]="120"
    [maxValue]="150"
    color="primary"
    variant="ghost"
    size="md"
    label="Clientes activos"
    valueFormat="fractional"
    icon="ri-user-line"
    [combineLabelValue]="true"
    labelPosition="top"
  ></nui-progress-bar>
  
  <nui-progress-bar
    [value]="90"
    [maxValue]="100"
    color="danger"
    variant="outline"
    size="md"
    label="Uso de almacenamiento"
    icon="ri-hard-drive-line"
    [combineLabelValue]="true"
    labelPosition="top"
  ></nui-progress-bar>
</nui-card>
```

## ♿ Accesibilidad

El componente incluye automáticamente los siguientes atributos ARIA:

```html
<div
  role="progressbar"
  [attr.aria-valuenow]="!indeterminate() ? value() : null"
  [attr.aria-valuemin]="0"
  [attr.aria-valuemax]="!indeterminate() ? maxValue() : null"
  [attr.aria-valuetext]="_ariaValueText()"
  [attr.aria-labelledby]="label() ? _labelId() : null"
>
  <!-- ... -->
</div>
```

**Características de accesibilidad:**
- `role="progressbar"`: Identifica el elemento como barra de progreso
- `aria-valuenow`: Valor actual del progreso
- `aria-valuemin`: Valor mínimo (0)
- `aria-valuemax`: Valor máximo
- `aria-valuetext`: Descripción textual del progreso
- `aria-labelledby`: Referencia a la etiqueta descriptiva

## 🎨 Personalización

### Colores Personalizados

Puedes usar colores personalizados sin depender del sistema NUI usando los inputs `trackColor` y `fillColor`:

```html
<!-- Color personalizado completo -->
<nui-progress-bar
  [value]="60"
  trackColor="#e0e0e0"
  fillColor="#ff6b35"
></nui-progress-bar>

<!-- Solo fill personalizado -->
<nui-progress-bar
  [value]="75"
  fillColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
></nui-progress-bar>

<!-- Colores de marca (ej: Spotify) -->
<nui-progress-bar
  [value]="45"
  trackColor="#282828"
  fillColor="#1db954"
  label="Spotify Style"
></nui-progress-bar>
```

> **💡 Nota**: Los colores personalizados tienen prioridad sobre los colores NUI. Si no se especifican `trackColor` o `fillColor`, el componente usará las variables CSS del sistema de temas.

### Variables CSS Disponibles

El componente utiliza las siguientes variables CSS que se generan automáticamente por color:

```scss
// Ejemplo para color="primary"
--progress-bar-primary-fill-bg          // Color del relleno
--progress-bar-primary-fill-hover-bg    // Color del relleno en hover
--progress-bar-primary-track-bg         // Color del track (fondo)
--progress-bar-primary-track-border     // Color del borde del track
--progress-bar-primary-text             // Color del texto interior
--progress-bar-primary-value-text       // Color del valor exterior
--progress-bar-primary-label-text       // Color de la etiqueta
```

### Sobrescribir Colores Globalmente

```scss
// Personalizar color primary en tema custom
:root {
  --progress-bar-primary-fill-bg: #custom-color;
  --progress-bar-primary-track-bg: #custom-track-color;
}
```

### Clases CSS

```scss
.nui-progress-bar                        // Contenedor principal
.nui-progress-bar--{size}                // Modificador de tamaño (xs, s, sm, md, lg, xl)
.nui-progress-bar--{color}               // Modificador de color (primary, secondary, etc.)
.nui-progress-bar--{variant}             // Modificador de variante (solid, outline, ghost)
.nui-progress-bar--indeterminate         // Modo indeterminado
.nui-progress-bar__track                 // Track (fondo de la barra)
.nui-progress-bar__fill                  // Fill (relleno de progreso)
.nui-progress-bar__value                 // Valor numérico
.nui-progress-bar__value--inside         // Valor dentro de la barra
.nui-progress-bar__value--outside        // Valor fuera de la barra
.nui-progress-bar__label                 // Etiqueta descriptiva
```

## 🔧 Configuración Global

Puedes configurar valores por defecto globalmente usando `NUI_CONFIG`:

```typescript
import { provideNUIConfig } from '@shared/configs/NUI.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUIConfig({
      defaultSize: 'md',
      defaultColor: 'primary'
    })
  ]
};
```

## ⚠️ Notas Importantes

1. **Valores Válidos**: El valor (`value`) siempre debe ser menor o igual al máximo (`maxValue`)
2. **Formato Fraccional**: Útil para mostrar progreso tipo "3/10 archivos"
3. **Modo Indeterminado**: No requiere `value` ni `maxValue`, muestra animación continua
4. **Posiciones Combinadas**: Puedes combinar `labelPosition` y `valuePosition` para layouts complejos
5. **Tematización Automática**: Los colores se adaptan automáticamente al tema light/dark activo
6. **Tamaños Pequeños**: Los tamaños `xs`, `s` y `sm` ocultan automáticamente el valor interior para evitar corte de texto
7. **Colores Personalizados**: `trackColor` y `fillColor` tienen prioridad sobre los colores NUI y el sistema de temas

## 📱 Responsive

El componente es totalmente responsive:
- La barra siempre ocupa el 100% del ancho del contenedor
- Los tamaños de fuente se ajustan según el tamaño seleccionado
- Las etiquetas con `labelPosition="left"` o `"right"` pueden causar overflow en pantallas pequeñas

## 🎯 Mejores Prácticas

### ✅ Hacer

```html
<!-- Usar colores semánticos -->
<nui-progress-bar [value]="progress" color="success" label="Operación exitosa"></nui-progress-bar>

<!-- Proporcionar etiquetas descriptivas -->
<nui-progress-bar [value]="50" label="Descargando archivo.pdf" icon="ri-download-line"></nui-progress-bar>

<!-- Usar modo indeterminado cuando no se conoce el progreso -->
<nui-progress-bar [indeterminate]="true" label="Procesando..."></nui-progress-bar>

<!-- Usar posiciones externas en tamaños pequeños -->
<nui-progress-bar [value]="60" size="xs" valuePosition="right"></nui-progress-bar>

<!-- Usar colores personalizados para branding -->
<nui-progress-bar [value]="75" trackColor="#f0f0f0" fillColor="#your-brand-color"></nui-progress-bar>

<!-- Formato fraccional para contadores -->
<nui-progress-bar [value]="7" [maxValue]="10" valueFormat="fractional" label="Archivos procesados"></nui-progress-bar>
```

### ❌ Evitar

```html
<!-- No usar valores fuera de rango -->
<nui-progress-bar [value]="150" [maxValue]="100"></nui-progress-bar>

<!-- No usar colores arbitrarios con estilos inline (usar trackColor/fillColor) -->
<nui-progress-bar style="--custom-color: red"></nui-progress-bar>

<!-- No combinar indeterminate con value -->
<nui-progress-bar [indeterminate]="true" [value]="50"></nui-progress-bar>

<!-- No usar valuePosition="inside" en tamaños pequeños -->
<nui-progress-bar size="xs" valuePosition="inside"></nui-progress-bar>
```

## 🔗 Componentes Relacionados

- **Spinner**: Para indicadores de carga circulares
- **Button**: Con estado de loading
- **Card**: Para contener barras de progreso en dashboards

## 📚 Recursos

- [Ejemplos en Componente Test](../../src/app/features/test/test.component.html)
- [Código Fuente](../../src/app/shared/components/progress-bar/)
- [NUI System](../typography-utilities.md)

## 🐛 Troubleshooting

### La barra no se actualiza

**Solución**: Asegúrate de que el valor sea un signal o que esté enlazado correctamente:
```typescript
// ✅ Correcto
progress = signal<number>(0);

// ❌ Incorrecto
progress: number = 0; // No reactivo
```

### Los colores no se aplican

**Solución**: Verifica que el tema esté cargado correctamente y que uses valores de `NUIColor`:
```html
<!-- ✅ Correcto -->
<nui-progress-bar color="primary"></nui-progress-bar>

<!-- ❌ Incorrecto -->
<nui-progress-bar color="blue"></nui-progress-bar>
```

### El valor no se muestra

**Solución**: Verifica que `valuePosition` no esté en `'hidden'` y que `hideValue` sea `false`:
```html
<!-- ✅ Correcto -->
<nui-progress-bar [value]="50" valuePosition="inside"></nui-progress-bar>

<!-- ❌ No mostrará valor -->
<nui-progress-bar [value]="50" valuePosition="hidden"></nui-progress-bar>
```

### El valor se corta en tamaños pequeños

**Problema**: Cuando uso `size="xs"`, `size="s"` o `size="sm"` con `valuePosition="inside"`, el texto se corta.

**Solución**: Esto es comportamiento esperado. Los tamaños pequeños ocultan automáticamente el valor interno. Usa posiciones externas:
```html
<!-- ✅ Correcto para tamaños pequeños -->
<nui-progress-bar size="xs" valuePosition="right"></nui-progress-bar>
<nui-progress-bar size="s" valuePosition="top"></nui-progress-bar>
<nui-progress-bar size="sm" valuePosition="hidden"></nui-progress-bar>

<!-- ❌ El valor estará oculto automáticamente -->
<nui-progress-bar size="xs" valuePosition="inside"></nui-progress-bar>
```

### Los colores personalizados no funcionan

**Solución**: Asegúrate de pasar cadenas de texto válidas con formato CSS:
```html
<!-- ✅ Correcto -->
<nui-progress-bar trackColor="#e0e0e0" fillColor="#ff6b35"></nui-progress-bar>
<nui-progress-bar fillColor="rgb(255, 107, 53)"></nui-progress-bar>
<nui-progress-bar fillColor="linear-gradient(90deg, #667eea, #764ba2)"></nui-progress-bar>

<!-- ❌ Incorrecto (sin comillas o sintaxis inválida) -->
<nui-progress-bar [trackColor]="e0e0e0"></nui-progress-bar>
```

---

**Versión**: 2.0.0 (Refactorizada con NUI)  
**Última actualización**: Octubre 2025
