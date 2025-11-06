# Spinner Component

Componente de spinner (indicador de carga) altamente configurable con soporte para múltiples tamaños, colores personalizables, posicionamiento flexible y accesibilidad completa.

## 📦 Importación

```typescript
import { SpinnerComponent } from '@shared/components/spinner';
```

## 🎯 Selector

```html
<nui-spinner></nui-spinner>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `label` | `string \| null` | `null` | Texto opcional a mostrar como etiqueta del spinner |
| `labelColor` | `string` | `'var(--color-primary)'` | Color del texto de la etiqueta (Variable CSS, hex, o nombre de color) |
| `spinnerColor` | `string` | `'var(--color-primary)'` | Color del spinner (Variable CSS, hex, o nombre de color) |
| `backdropColor` | `string \| null` | `null` | Color del fondo cuando position es 'absolute' |
| `size` | `NUISize` | `'md'` | Tamaño del spinner (`'xs' \| 's' \| 'sm' \| 'md' \| 'lg' \| 'xl'`) |
| `position` | `SpinnerPosition` | `'inline'` | Posición del spinner (`'absolute' \| 'inline'`) |

### Tipos

```typescript
type SpinnerPosition = 'absolute' | 'inline';
type NUISize = 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';
```

## 💡 Ejemplos de Uso

### Spinner Básico

```html
<!-- Spinner simple -->
<nui-spinner></nui-spinner>

<!-- Spinner con etiqueta -->
<nui-spinner label="Cargando..."></nui-spinner>

<!-- Spinner con tamaño personalizado -->
<nui-spinner size="lg" label="Procesando datos..."></nui-spinner>
```

### Tamaños

```html
<nui-spinner size="xs"></nui-spinner>
<nui-spinner size="s"></nui-spinner>
<nui-spinner size="sm"></nui-spinner>
<nui-spinner size="md"></nui-spinner>  <!-- Default -->
<nui-spinner size="lg"></nui-spinner>
<nui-spinner size="xl"></nui-spinner>
```

### Colores Personalizados

```html
<!-- Con variables CSS del sistema de diseño -->
<nui-spinner spinnerColor="var(--color-primary)"></nui-spinner>
<nui-spinner spinnerColor="var(--color-success)"></nui-spinner>
<nui-spinner spinnerColor="var(--color-warning)"></nui-spinner>
<nui-spinner spinnerColor="var(--color-danger)"></nui-spinner>

<!-- Con colores hex -->
<nui-spinner spinnerColor="#3b82f6"></nui-spinner>
<nui-spinner spinnerColor="#10b981"></nui-spinner>

<!-- Con etiqueta de color personalizado -->
<nui-spinner 
  label="Guardando..." 
  spinnerColor="var(--color-success)" 
  labelColor="var(--color-success)">
</nui-spinner>
```

### Posicionamiento

#### Inline (Default)
```html
<!-- Spinner en el flujo normal del documento -->
<p>
  Cargando datos <nui-spinner size="xs"></nui-spinner> por favor espere...
</p>

<!-- En botones -->
<button class="btn btn-primary">
  <nui-spinner size="s" spinnerColor="white"></nui-spinner>
  Procesando...
</button>
```

#### Absolute
```html
<!-- Spinner que cubre todo el contenedor -->
<div style="position: relative; height: 200px;">
  <h3>Contenido de la página</h3>
  <p>Este contenido está cubierto por el spinner.</p>
  
  <nui-spinner 
    position="absolute" 
    label="Cargando..."
    backdropColor="rgba(255, 255, 255, 0.8)">
  </nui-spinner>
</div>
```

### Backdrop Personalizado

```html
<!-- Backdrop semi-transparente blanco -->
<nui-spinner 
  position="absolute"
  label="Cargando..." 
  backdropColor="rgba(255, 255, 255, 0.9)">
</nui-spinner>

<!-- Backdrop oscuro -->
<nui-spinner 
  position="absolute"
  size="lg"
  label="Procesando..." 
  backdropColor="rgba(0, 0, 0, 0.6)"
  spinnerColor="white"
  labelColor="white">
</nui-spinner>
```

## 🎨 Casos de Uso Comunes

### Estado de Carga en Formularios

```html
<form>
  <input type="text" placeholder="Nombre" [disabled]="isSubmitting">
  <input type="email" placeholder="Email" [disabled]="isSubmitting">
  
  <button type="submit" [disabled]="isSubmitting">
    <nui-spinner 
      *ngIf="isSubmitting" 
      size="s" 
      spinnerColor="white">
    </nui-spinner>
    {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
  </button>
</form>
```

```typescript
export class FormComponent {
  isSubmitting = false;

  async onSubmit() {
    this.isSubmitting = true;
    try {
      await this.apiService.submitForm();
    } finally {
      this.isSubmitting = false;
    }
  }
}
```

### Carga de Datos en Tablas

```html
<div class="table-container" style="position: relative;">
  <table class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      <!-- Contenido de la tabla -->
    </tbody>
  </table>

  <!-- Spinner de carga -->
  <nui-spinner 
    *ngIf="isLoading"
    position="absolute"
    label="Cargando datos..."
    backdropColor="rgba(255, 255, 255, 0.9)">
  </nui-spinner>
</div>
```

### Dashboard con Múltiples Indicadores

```html
<div class="dashboard-grid">
  <div class="dashboard-card">
    <h4>Ventas</h4>
    <nui-spinner 
      *ngIf="!salesData" 
      size="xs" 
      label="Cargando...">
    </nui-spinner>
    <div *ngIf="salesData">{{ salesData }}</div>
  </div>

  <div class="dashboard-card">
    <h4>Usuarios</h4>
    <nui-spinner 
      *ngIf="!usersData" 
      size="xs" 
      label="Cargando..." 
      spinnerColor="var(--color-success)"
      labelColor="var(--color-success)">
    </nui-spinner>
    <div *ngIf="usersData">{{ usersData }}</div>
  </div>
</div>
```

### Subida de Archivos

```html
<div class="upload-area" [class.uploading]="isUploading">
  <div *ngIf="!isUploading">
    <i class="ri-upload-line"></i>
    <p>Arrastra archivos aquí o haz clic para seleccionar</p>
  </div>
  
  <div *ngIf="isUploading" class="upload-progress">
    <nui-spinner 
      label="Subiendo archivo... {{ uploadProgress }}%"
      spinnerColor="var(--color-primary)"
      labelColor="var(--color-primary)">
    </nui-spinner>
    <div class="progress-bar">
      <div class="progress-fill" [style.width.%]="uploadProgress"></div>
    </div>
  </div>
</div>
```

## ♿ Accesibilidad

El componente Spinner incluye características de accesibilidad automáticas:

### Características Incorporadas

- **ARIA Labels**: Se generan automáticamente labels descriptivos
- **role="status"**: Para lectores de pantalla
- **aria-live="polite"**: Para actualizaciones en vivo
- **prefers-reduced-motion**: Respeta las preferencias de movimiento del usuario
- **Contraste**: Colores con contraste adecuado usando variables del sistema

### Mejores Prácticas

```html
<!-- ✅ Bueno: Con etiqueta descriptiva -->
<nui-spinner label="Cargando datos del usuario"></nui-spinner>

<!-- ✅ Bueno: Contexto claro -->
<div aria-label="Tabla de usuarios">
  <nui-spinner position="absolute" label="Cargando tabla..."></nui-spinner>
</div>

<!-- ❌ Evitar: Sin contexto -->
<nui-spinner></nui-spinner>
```

## 🚀 Performance

### Optimizaciones Incorporadas

- **Animaciones CSS**: Sin JavaScript en las animaciones
- **cubic-bezier**: Curvas de animación optimizadas
- **CSS Custom Properties**: Theming eficiente
- **Standalone Component**: Tree-shakeable
- **prefers-reduced-motion**: Desactiva animaciones si el usuario lo prefiere

### Configuración de Variables CSS

```scss
// Personalización global en tu archivo de estilos
:root {
  --spinner-animation-duration: 1s;
  --spinner-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --spinner-backdrop-color: rgba(255, 255, 255, 0.8);
}
```

## 🎯 Mejores Prácticas

### ✅ Recomendado

```html
<!-- Spinner con contexto claro -->
<nui-spinner label="Cargando datos..."></nui-spinner>

<!-- Tamaño apropiado para el contexto -->
<nui-spinner size="xs"></nui-spinner> <!-- En texto inline -->
<nui-spinner size="lg"></nui-spinner> <!-- En áreas grandes -->

<!-- Colores consistentes con el sistema de diseño -->
<nui-spinner spinnerColor="var(--color-primary)"></nui-spinner>

<!-- Backdrop para bloquear interacción -->
<nui-spinner position="absolute" backdropColor="rgba(255,255,255,0.9)"></nui-spinner>
```

### ❌ Evitar

```html
<!-- Sin etiqueta descriptiva -->
<nui-spinner></nui-spinner>

<!-- Colores hardcodeados -->
<nui-spinner spinnerColor="#ff0000"></nui-spinner>

<!-- Tamaño inadecuado para el contexto -->
<nui-spinner size="xl"></nui-spinner> <!-- En un botón pequeño -->
```

## 🔧 Configuración Avanzada

### Personalización de Estilos

```scss
// Personalizar colores globalmente
.nui-spinner-container {
  --spinner-primary-color: #your-color;
  --spinner-secondary-color: #your-secondary-color;
}

// Personalizar tamaños
.nui-spinner-circle--custom {
  width: 32px;
  height: 32px;
}
```

### Integración con Servicios

```typescript
@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}

// En el componente
@Component({
  template: `
    <nui-spinner 
      *ngIf="loadingService.loading$ | async"
      position="absolute"
      label="Cargando..."
      backdropColor="rgba(255,255,255,0.9)">
    </nui-spinner>
  `
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
}
```

## 🔍 Troubleshooting

### Problemas Comunes

**Spinner no se muestra correctamente**
- Verificar que el contenedor padre tenga `position: relative` para spinners absolutos
- Comprobar que las variables CSS estén definidas correctamente

**Animación no funciona**
- Verificar configuración de `prefers-reduced-motion`
- Comprobar que no haya conflictos CSS

**Tamaño incorrecto**
- Verificar que el tamaño sea apropiado para el contexto
- Comprobar que no haya CSS que override los estilos del componente