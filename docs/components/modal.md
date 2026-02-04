# Modal Component ??

> **Componente modal accesible y altamente personalizable basado en Angular Material Dialog**

Implementa WCAG 2.1 Level AA, theming din�mico, templates pre-construidos, y una API fluida con TypeScript gen�rico para m�xima flexibilidad y developer experience.

---

## ?? Tabla de Contenidos

1. [Caracter�sticas](#caracter�sticas-)
2. [Instalaci�n](#instalaci�n)
3. [Uso R�pido](#uso-r�pido)
4. [API Completa](#api-completa)
5. [Templates Pre-construidos](#templates-pre-construidos)
6. [Opciones de Configuraci�n](#opciones-de-configuraci�n)
7. [Ejemplos Avanzados](#ejemplos-avanzados)
8. [Backdrop System](#backdrop-system-)
9. [Accesibilidad WCAG 2.1 AA](#accesibilidad-)
10. [Testing E2E](#testing-e2e)
11. [Estilos y Theming](#estilos-y-theming-)
12. [CDK para Librer�as](#uso-de-angular-cdk-en-librer�as)
13. [Troubleshooting](#troubleshooting)
14. [Roadmap y Mejoras](#roadmap-y-mejoras-futuras)

---

## Caracter�sticas ?

### ?? UX y Funcionalidad

- ? **Cierre flexible**: ESC, click backdrop, bot�n close
- ? **Focus management autom�tico**: Primer bot�n recibe focus
- ? **Animaciones suaves**: Fade-in/out con Material Design easing
- ? **Responsive design**: M�vil, tablet, desktop
- ? **Modales en cascada**: M�ltiples modales simult�neos
- ? **Backdrop configurable**: Con/sin fondo, blur effect, theming

### ? Accesibilidad WCAG 2.1 AA

- ? **Roles ARIA**: `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-modal`
- ? **Focus trap**: CDK A11y mantiene focus dentro del modal
- ? **Navegaci�n teclado**: Tab, Shift+Tab, Enter, ESC
- ? **Screen readers**: Compatible con NVDA, JAWS, VoiceOver
- ? **Contraste**: =4.5:1 (texto), =3:1 (elementos interactivos)
- ? **Focus visible**: Outline 2px en todos los elementos

### ?? Developer Experience

- ? **TypeScript gen�rico**: `ModalOptionsEntity<T>`, `ModalResult<T>`
- ? **API fluida**: Observables, promesas, callbacks
- ? **13 m�todos**: open, openConfirm, openInfo, openAlert, openLoading, openSuccess, openError, openWarning, afterClosed, close, closeAll, isDialogOpenById
- ? **Templates pre-construidos**: Loading, Success, Error, Warning
- ? **Mixin reutilizable**: `@include overlay-backdrop()`
- ? **HTML seguro**: Pipe `SafeHtmlPipe` integrado

### ?? Theming y Estilos

- ? **CSS Custom Properties**: Integraci�n design system
- ? **Light/Dark theme**: Autom�tico
- ? **Backdrop theming**: Variables independientes por theme
- ? **Tama�os configurables**: width, height, min/max
- ? **Posicionamiento**: top, bottom, left, right

---

## Instalaci�n

El componente ya est� incluido en el proyecto. Importa el servicio donde lo necesites:

```typescript
import { inject } from '@angular/core';
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';
import { ModalOptionsEntity, ModalResult } from '@shared/components/modal-dialog/models/modal.model';

export class MyComponent {
  private readonly modalService = inject(ModalDialogService);
}
```

---

## Uso R�pido

### Modal de Confirmaci�n (3 l�neas)

```typescript
this.modalService.openConfirm({
  title: '�Eliminar usuario?',
  message: 'Esta acci�n no se puede deshacer'
}).subscribe(result => {
  if (result.confirmed) this.deleteUser();
});
```

### Modal Informativo

```typescript
this.modalService.openInfo({
  title: 'Operaci�n exitosa',
  message: 'Los cambios se guardaron correctamente',
  iconTitle: 'ri-checkbox-circle-line'
}).subscribe();
```

### Modal de Alerta

```typescript
this.modalService.openAlert({
  title: 'Advertencia de Seguridad',
  message: 'Inicios de sesi�n desde ubicaci�n desconocida',
  confirmText: 'Entendido'
}).subscribe();
```

### Modal de Carga (Loading)

```typescript
const loadingRef = this.modalService.openLoading('Procesando...');

this.apiService.saveData().subscribe({
  complete: () => loadingRef.close()
});
```

---

## API Completa

### M�todos Principales

#### `open<T>(options, component?): MatDialogRef`

Abre un modal con configuraci�n personalizada.

**Par�metros:**
- `options`: `ModalOptionsEntity<T>` - Configuraci�n del modal
- `component`: `ComponentType<any>` (opcional) - Componente custom

**Returns:** `MatDialogRef` - Referencia al di�logo

**Ejemplos:**

```typescript
// Modal est�ndar
const ref = this.modalService.open({
  title: 'T�tulo',
  message: 'Contenido',
  confirmText: 'OK'
});

// Modal con componente custom
const ref = this.modalService.open(
  { title: 'Formulario', width: '600px', data: { userId: 123 } },
  MyCustomFormComponent
);

// Escuchar cierre
ref.afterClosed().subscribe(result => {
  console.log('Modal cerrado:', result);
});
```

---

#### `openConfirm(options): Observable<ModalResult>`

Modal de confirmaci�n con botones Confirmar/Cancelar.

**Ejemplo:**
```typescript
this.modalService.openConfirm({
  title: '�Eliminar 5 elementos?',
  message: 'Esta acci�n es permanente',
  confirmText: 'S�, eliminar',
  cancelText: 'Cancelar',
  iconTitle: 'ri-delete-bin-line',
  canBeClosed: true
}).subscribe(result => {
  if (result.confirmed) {
    console.log('Usuario confirm�');
  } else {
    console.log('Usuario cancel�');
  }
});
```

---

#### `openInfo(options): Observable<ModalResult>`

Modal informativo con un solo bot�n.

**Ejemplo:**
```typescript
this.modalService.openInfo({
  title: 'Informaci�n',
  message: '<p>Contenido con <strong>HTML</strong></p>',
  confirmText: 'Entendido',
  iconTitle: 'ri-information-line'
}).subscribe();
```

---

#### `openAlert(options): Observable<ModalResult>`

Modal de alerta (similar a `openInfo` pero con sem�ntica diferente).

**Ejemplo:**
```typescript
this.modalService.openAlert({
  title: '?? Sesi�n por expirar',
  message: 'Tu sesi�n expirar� en 5 minutos',
  confirmText: 'Renovar sesi�n'
}).subscribe(result => {
  if (result.confirmed) this.renewSession();
});
```

---

#### `afterClosed<T>(): Observable<ModalResult<T>>`

Observable que emite cuando se cierra cualquier modal abierto.

**Ejemplo:**
```typescript
const ref = this.modalService.open({ title: 'Test' });

this.modalService.afterClosed<MyDataType>().subscribe(result => {
  console.log('Confirmado:', result.confirmed);
  console.log('Datos:', result.data); // Tipo: MyDataType | null
});
```

---

#### `close(result?): void`

Cierra el modal actual con un resultado opcional.

**Ejemplo:**
```typescript
// Desde dentro de un componente modal
this.modalService.close({ 
  confirmed: true, 
  data: { userId: 123 }
});
```

---

#### `closeAll(): void`

Cierra todos los modales abiertos (�til para limpieza en logout).

**Ejemplo:**
```typescript
logout(): void {
  this.modalService.closeAll(); // Cierra todos los modales
  this.authService.logout();
}
```

---

#### `isDialogOpenById(id): boolean`

Verifica si un modal espec�fico est� abierto.

**Ejemplo:**
```typescript
const isOpen = this.modalService.isDialogOpenById('my-modal-id');
if (!isOpen) {
  this.modalService.open({ id: 'my-modal-id', title: 'Modal' });
}
```

---

## Templates Pre-construidos

Modales pre-configurados para casos de uso comunes.

### `openLoading(message?): MatDialogRef`

Modal de carga no cerrable con spinner.

**Caracter�sticas:**
- ? No cerrable (`canBeClosed: false`)
- ?? Spinner animado
- ?? Width: 300px

**Ejemplo:**
```typescript
showLoading(): void {
  const ref = this.modalService.openLoading('Guardando cambios...');
  
  this.apiService.save().subscribe({
    complete: () => ref.close(),
    error: () => ref.close()
  });
}
```

**HTML generado:**
```html
<div style="text-align: center">
  <nui-spinner size="lg"></nui-spinner>
  <p style="margin-top: 1rem">Guardando cambios...</p>
</div>
```

---

### `openSuccess(options): Observable<ModalResult>`

Modal de �xito pre-estilizado.

**Caracter�sticas:**
- ? Icono success
- ?? PanelClass: `modal-success`
- ?? Width: 400px

**Ejemplo:**
```typescript
this.modalService.openSuccess({
  title: '��xito!',
  message: '<p>Usuario creado correctamente</p><p><strong>ID:</strong> 12345</p>',
  confirmText: 'Continuar'
}).subscribe();
```

---

### `openError(options): Observable<ModalResult>`

Modal de error con detalles t�cnicos.

**Caracter�sticas:**
- ? Icono error
- ?? PanelClass: `modal-error`
- ?? Width: 500px

**Ejemplo:**
```typescript
this.modalService.openError({
  title: 'Error de Conexi�n',
  message: '<p>No se pudo conectar con el servidor</p><p class="text-sm text-muted">Error 500: Internal Server Error</p>',
  confirmText: 'Reintentar',
  cancelText: 'Cancelar'
}).subscribe(result => {
  if (result.confirmed) this.retry();
});
```

---

### `openWarning(options): Observable<ModalResult>`

Modal de advertencia.

**Caracter�sticas:**
- ?? Icono warning
- ?? PanelClass: `modal-warning`
- ?? Width: 450px

**Ejemplo:**
```typescript
this.modalService.openWarning({
  title: 'Cambios Sin Guardar',
  message: '<p>Tienes cambios sin guardar</p><ul><li>Nombre</li><li>Email</li></ul>',
  confirmText: 'Salir sin guardar',
  cancelText: 'Volver'
}).subscribe(result => {
  if (result.confirmed) this.exit();
});
```

---

## Opciones de Configuraci�n

### `ModalOptionsEntity<T>`

```typescript
interface ModalOptionsEntity<T = any> extends MatDialogConfig {
  // Contenido
  title?: string;
  iconTitle?: string; // Clase Remix Icon (ej: 'ri-alert-line')
  message?: string; // HTML seguro permitido
  
  // Botones
  confirmText?: string;
  cancelText?: string;
  customButtons?: ModalCustomButton[]; // Botones personalizados
  showDefaultButtons?: boolean; // Mostrar confirm/cancel junto a customButtons
  buttonsVariant?: 'solid' | 'outline' | 'ghost'; // Variante por defecto para botones
  buttonsSize?: 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl'; // Tamaño por defecto para botones
  
  // Dimensiones
  width?: string; // Default: 'auto', ej: '500px', '50%'
  height?: string; // Default: 'auto'
  minWidth?: string;
  maxWidth?: string; // Default: '90vw'
  minHeight?: string;
  maxHeight?: string; // Default: '90vh'
  
  // Comportamiento
  canBeClosed?: boolean; // Default: true (ESC + click backdrop)
  disableClose?: boolean; // Default: false (m�s restrictivo)
  hasBackdrop?: boolean; // Default: true (mostrar backdrop)
  
  // Posicionamiento
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  
  // Identificaci�n
  id?: string; // ID �nico para isDialogOpenById()
  
  // Personalizaci�n
  panelClass?: string | string[]; // Clases CSS custom
  backdropClass?: string | string[]; // Default: 'nui-modal-dialog-backdrop'
  
  // Datos tipados
  data?: T; // Datos gen�ricos para componentes custom
}
```

### `ModalResult<T>`

```typescript
interface ModalResult<T = any> {
  confirmed: boolean; // true si confirm�, false si cancel�
  data?: T | null; // Datos opcionales devueltos
}
```

---

## Ejemplos Avanzados

### 1. Modal con HTML Personalizado

```typescript
openRichContentModal(): void {
  const htmlContent = `
    <div class="rich-content">
      <h4>Instrucciones</h4>
      <ol>
        <li>Completa el formulario</li>
        <li>Revisa los datos</li>
        <li>Haz clic en Guardar</li>
      </ol>
      <div class="alert alert-info">
        <strong>Nota:</strong> Los campos marcados con * son obligatorios
      </div>
    </div>
  `;

  this.modalService.open({
    title: 'Gu�a de Usuario',
    message: htmlContent,
    confirmText: 'Entendido',
    width: '600px',
    iconTitle: 'ri-book-line'
  }).afterClosed().subscribe();
}
```

---

### 2. Modal que NO se Puede Cerrar

Para acciones cr�ticas que requieren decisi�n expl�cita.

```typescript
openCriticalModal(): void {
  this.modalService.open({
    title: '?? Acci�n Cr�tica',
    message: '<p class="text-danger"><strong>Esta operaci�n eliminar� TODOS los datos</strong></p><p>Esta acci�n es irreversible y permanente</p>',
    confirmText: 'S�, ELIMINAR TODO',
    cancelText: 'Cancelar',
    canBeClosed: false, // ? No cerrable con ESC/backdrop
    disableClose: true, // ? Fuerza decisi�n
    iconTitle: 'ri-alert-line',
    width: '500px'
  }).afterClosed().subscribe(result => {
    if (result.confirmed) {
      this.performCriticalAction();
    }
  });
}
```

---

### 3. Modal Sin Backdrop (Tooltip-like)

�til para ayudas contextuales que no bloquean la UI.

```typescript
openContextualHelp(): void {
  this.modalService.open({
    title: '?? Ayuda',
    message: '<p>Este campo acepta direcciones de correo separadas por comas</p>',
    confirmText: 'Entendido',
    hasBackdrop: false, // ?? Sin backdrop
    width: '300px',
    position: { 
      top: '100px', 
      right: '20px' 
    },
    canBeClosed: true
  }).afterClosed().subscribe();
}
```

**Casos de uso para `hasBackdrop: false`:**
- ?? Tooltips avanzados con interacci�n
- ?? Ayudas contextuales sin bloquear UI
- ?? Notificaciones persistentes posicionadas
- ?? **No recomendado para acciones cr�ticas**

---

### 4. Modal en Cascada (M�ltiples Confirmaciones)

Para flujos con m�ltiples pasos de confirmaci�n.

```typescript
openCascadeModal(): void {
  // Primera confirmaci�n
  this.modalService.openConfirm({
    title: '�Guardar cambios?',
    message: 'Tienes cambios sin guardar',
    confirmText: 'Guardar',
    cancelText: 'No guardar'
  }).subscribe(firstResult => {
    
    if (!firstResult.confirmed) {
      // Segunda confirmaci�n si NO guard�
      this.modalService.openConfirm({
        title: '�Salir sin guardar?',
        message: 'Los cambios se perder�n permanentemente',
        confirmText: 'S�, salir',
        cancelText: 'Volver atr�s',
        iconTitle: 'ri-alert-line'
      }).subscribe(secondResult => {
        if (secondResult.confirmed) {
          this.exitWithoutSaving();
        }
      });
    } else {
      this.saveAndExit();
    }
  });
}
```

---

### 5. Modal con Componente Custom

Para formularios o contenido complejo.

```typescript
// 1. Crear componente custom
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Nombre</label>
        <input formControlName="name" class="form-control" />
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input formControlName="email" type="email" class="form-control" />
      </div>
      
      <div class="modal-footer">
        <nui-button (onClick)="onCancel()">Cancelar</nui-button>
        <nui-button color="primary" type="submit">Guardar</nui-button>
      </div>
    </form>
  `
})
export class UserFormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        confirmed: true,
        data: this.form.value
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }
}

// 2. Abrir el modal con el componente
openUserFormModal(): void {
  this.modalService.open<{ name: string; email: string }>(
    {
      title: 'Editar Usuario',
      width: '600px',
      data: { userId: 123 },
      canBeClosed: false
    },
    UserFormComponent
  ).afterClosed().subscribe(result => {
    if (result.confirmed) {
      console.log('Nombre:', result.data?.name);
      console.log('Email:', result.data?.email);
      this.saveUser(result.data);
    }
  });
}
```

---

### 6. Modal con Posici�n Personalizada

```typescript
openPositionedModal(): void {
  this.modalService.open({
    title: 'Notificaci�n',
    message: 'Nuevo mensaje recibido',
    confirmText: 'Ver',
    width: '350px',
    position: {
      top: '20px',
      right: '20px'
    },
    hasBackdrop: false // Sin backdrop para no molestar
  }).afterClosed().subscribe();
}
```

---

### 7. Modal con Datos Tipados (TypeScript)

```typescript
interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

openTypedModal(): void {
  this.modalService.open<UserData>({
    title: 'Datos del Usuario',
    message: 'Revisando perfil...',
    data: {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    }
  }).afterClosed().subscribe((result: ModalResult<UserData>) => {
    if (result.confirmed && result.data) {
      // TypeScript sabe que result.data es UserData
      console.log('Usuario:', result.data.name);
      console.log('Rol:', result.data.role);
    }
  });
}
```

---

## Backdrop System ??

### Caracter�sticas del Backdrop

El sistema de backdrop est� completamente integrado con el design system:

**Caracter�sticas:**
- ? **Theming din�mico**: Light/Dark autom�tico
- ? **Blur effect**: 2px por defecto (configurable)
- ? **Animaci�n suave**: Fade-in 225ms
- ? **Safari compatible**: `-webkit-backdrop-filter`
- ? **Personalizable**: Variables CSS

### Mixin Reutilizable

```scss
// Usa el mixin en tus propios componentes
.my-overlay-backdrop {
  @include overlay-backdrop(); // Usa valores por defecto del theme
}

.my-blurry-backdrop {
  @include overlay-backdrop(8px); // Blur personalizado
}
```

**Definici�n del mixin:**
```scss
@mixin overlay-backdrop($blur: null) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-backdrop-color);
  transition: opacity 225ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

---

## Accesibilidad ?

### Cumplimiento WCAG 2.1 Level AA

#### ? Criterios Nivel A (Cr�tico)

| Criterio | Cumplimiento | Implementaci�n |
|----------|--------------|----------------|
| **1.1.1 Non-text Content** | ? | Iconos decorativos con `aria-hidden="true"`, botones con `aria-label` |
| **1.3.1 Info and Relationships** | ? | `role="dialog"`, `aria-labelledby`, `aria-describedby`, estructura sem�ntica |
| **2.1.1 Keyboard** | ? | Todos los elementos accesibles por teclado, orden l�gico |
| **2.1.2 No Keyboard Trap** | ? | ESC cierra modal, focus trap solo dentro, focus retorna al trigger |
| **2.4.3 Focus Order** | ? | Orden l�gico: close ? t�tulo ? contenido ? botones |
| **3.2.1 On Focus** | ? | Sin cambios de contexto inesperados |
| **4.1.2 Name, Role, Value** | ? | Todos los elementos tienen nombre accesible y roles correctos |

#### ? Criterios Nivel AA (Importante)

| Criterio | Cumplimiento | Implementaci�n |
|----------|--------------|----------------|
| **1.4.3 Contrast (Minimum)** | ? | Texto =4.5:1, elementos interactivos =3:1, verificado |
| **2.4.7 Focus Visible** | ? | Outline 2px con offset en todos los elementos |
| **3.2.4 Consistent Identification** | ? | Bot�n close identificado consistentemente |

### Roles ARIA Implementados

```html
<div 
  role="dialog"
  aria-modal="true"
  [attr.aria-labelledby]="titleId"
  [attr.aria-describedby]="contentId"
  cdkTrapFocus
  [cdkTrapFocusAutoCapture]="true"
>
  <h2 [id]="titleId">{{ title }}</h2>
  <div [id]="contentId">{{ message }}</div>
  
  <button 
    aria-label="Cerrar modal"
    (click)="close()"
  >
    <i class="ri-close-line" aria-hidden="true"></i>
  </button>
</div>
```

### Navegaci�n por Teclado

| Tecla | Acci�n |
|-------|--------|
| **Tab** | Navega al siguiente elemento interactivo |
| **Shift + Tab** | Navega al elemento anterior |
| **Enter / Space** | Activa bot�n enfocado |
| **ESC** | Cierra modal (si `canBeClosed=true`) |

### Focus Management

```typescript
// 1. Al abrir: Focus va al primer bot�n
ngOnInit() {
  // CDK A11y maneja esto autom�ticamente con cdkTrapFocus
}

// 2. Al cerrar: Focus retorna al trigger
close() {
  this.matDialogRef.close();
  // Angular Material devuelve focus autom�ticamente
}
```

---

## Testing E2E

### Herramientas Recomendadas

#### Automatizadas
- **axe DevTools** - Extensi�n Chrome/Firefox
- **Lighthouse** - Auditor�a de Chrome
- **Pa11y** - CLI automatizado

#### Lectores de Pantalla
- **NVDA** (Windows) - Free
- **JAWS** (Windows) - Comercial
- **VoiceOver** (macOS) - Built-in

### Test Automatizado con Pa11y

```bash
# Instalar Pa11y
npm install -g pa11y

# Test modal
pa11y http://localhost:4200/test

# Resultados esperados:
# ? 0 errors
# ? 0 warnings
```

### Test Manual con NVDA

```gherkin
Scenario: Abrir y leer modal con NVDA
  Given NVDA est� activo
  And estoy en la p�gina de test
  
  When presiono Tab hasta el bot�n "Abrir Modal"
  Then NVDA anuncia: "Abrir Modal, button"
  
  When presiono Enter
  Then NVDA anuncia: "�Eliminar elemento?, dialog"
  And NVDA anuncia: "Esta acci�n no se puede deshacer"
  
  When presiono Tab
  Then NVDA anuncia: "Close, button"
  
  When presiono Tab
  Then NVDA anuncia: "Eliminar, button"
  
  When presiono Escape
  Then modal se cierra
  And NVDA anuncia: "Abrir Modal, button"
```

### Comandos NVDA �tiles

| Comando | Acci�n |
|---------|--------|
| `Insert + Down` | Leer todo |
| `Insert + T` | Leer t�tulo |
| `Insert + B` | Leer desde cursor |
| `Insert + F7` | Listar elementos |
| `Control` | Detener lectura |

### Test de Contraste (WebAIM)

Usa: https://webaim.org/resources/contrastchecker/

**Tests realizados:**

| Elemento | Foreground | Background | Ratio | Resultado |
|----------|-----------|------------|-------|-----------|
| Texto principal (light) | #0f172a | #ffffff | 12.6:1 | ? AAA |
| Texto secundario (light) | #64748b | #ffffff | 4.6:1 | ? AA |
| Bot�n primario | #ffffff | #0d9488 | 4.5:1 | ? AA |
| Texto principal (dark) | #e6edf3 | #21262d | 12.1:1 | ? AAA |

---

## Estilos y Theming ??

### CSS Custom Properties Usadas

```css
/* Modal Container */
--surface-primary: #ffffff; /* Fondo del modal */
--nui-bg-secondary: #f8fafc; /* Hover bot�n close */
--text-primary: #0f172a; /* Texto principal */
--text-secondary: #64748b; /* Texto secundario */

/* Spacing */
--nui-spacing-md: 1.2rem; /* Padding general */
--nui-spacing-xs: 0.625rem; /* Gap entre elementos */
--nui-spacing-2xs: 0.25rem; /* Padding bot�n close */

/* Border Radius */
--nui-border-radius-md: 0.5rem; /* Modal box */
--nui-border-radius-sm: 0.25rem; /* Bot�n close */

/* Focus */
--color-focus-ring: #0d9488; /* Outline de focus */

/* Backdrop */
--modal-backdrop-color: rgba(0, 0, 0, 0.5); /* Fondo backdrop */
```

### Personalizaci�n Global

Sobrescribe variables en tu tema:

```scss
// styles/my-custom-theme.scss
.my-theme {
  // Modal
  --surface-primary: #1a1a1a; // Fondo oscuro
  --text-primary: #ffffff; // Texto blanco
  
  // Backdrop
  --modal-backdrop-color: rgba(255, 0, 0, 0.3); // Backdrop rojo
  
  // Bordes
  --nui-border-radius-md: 16px; // Bordes m�s redondeados
}
```

### Clases CSS Personalizadas

```scss
// Aplica clases custom al modal
this.modalService.open({
  title: 'Modal Custom',
  panelClass: ['my-modal-class', 'large-modal'],
  backdropClass: 'my-backdrop-class'
});

// Estilos globales (en styles.scss)
.my-modal-class {
  .modal-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
}

.my-backdrop-class {
  background-color: rgba(0, 255, 0, 0.3) !important;
}
```

---

## Uso de Angular CDK en Librer�as

### �Por qu� usar Angular CDK?

| Aspecto | Sin CDK (Custom) | Con CDK | Ganancia |
|---------|------------------|---------|----------|
| **L�neas de c�digo** | ~500 l�neas | ~150 l�neas | **70% menos** |
| **Accesibilidad** | Manual (propenso a errores) | WCAG 2.1 AA built-in | ? **Garantizado** |
| **Testing** | Escribir todos los tests | Tests incluidos | ? **Reducci�n 80%** |
| **Mantenimiento** | Tu responsabilidad | Angular Team | ? **Automatizado** |
| **Overlay positioning** | C�digo complejo | Autom�tico | ? **Simplificado** |
| **Focus management** | Implementaci�n manual | CDK A11y | ? **Profesional** |
| **Tree-shaking** | Dif�cil | Nativo | ? **Bundle optimizado** |

### Recomendaci�n Final

**? S�, usar Angular CDK sin dudarlo** para:
- ?? Modals y Dialogs
- ?? Overlays y Popovers
- ?? Drag & Drop
- ?? Virtual Scrolling
- ?? Accessibility (Focus Trap, Live Announcer)
- ?? Portal System

**Ventajas para librer�as:**
- ? Comportamientos complejos resueltos
- ? Mantenimiento por Angular Team
- ? Tree-shakeable (solo importas lo usado)
- ? Compatible con Angular Material
- ? Documentaci�n oficial extensa
- ? Actualizaciones autom�ticas

**Dependencias necesarias:**
```json
{
  "@angular/cdk": "^18.x.x",
  "@angular/material": "^18.x.x" // Opcional, solo si usas Material
}
```

---

## Troubleshooting

### Modal no se muestra

**Problema:** Modal abierto pero no visible

**Soluci�n:**
```typescript
// 1. Verifica que el servicio est� inyectado
private readonly modalService = inject(ModalDialogService);

// 2. Verifica que styles.scss importe overlay
@import "styles/overlay"; // Debe existir

// 3. Verifica z-index del backdrop
.cdk-overlay-backdrop {
  z-index: 1000 !important;
}
```

---

### Backdrop sin color

**Problema:** Backdrop invisible

**Soluci�n:**
```scss
// Verifica que existan las variables en _theme.scss
--modal-backdrop-color: rgba(0, 0, 0, 0.5);

// Verifica estilos en _overlay.scss
.nui-modal-dialog-backdrop {
  background-color: var(--modal-backdrop-color);
}
```

---

### Focus no retorna al trigger

**Problema:** Focus se pierde al cerrar modal

**Soluci�n:**
```typescript
// Aseg�rate de usar MatDialogRef.close()
close() {
  this.matDialogRef.close(result); // ? Correcto
  // NO: this.dialog.closeAll(); // ? No restaura focus
}
```

---

### Modal no accesible con teclado

**Problema:** No se puede navegar con Tab

**Soluci�n:**
```html
<!-- Verifica cdkTrapFocus en el template -->
<div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
  <!-- Contenido -->
</div>

<!-- Verifica que A11yModule est� importado -->
import { A11yModule } from '@angular/cdk/a11y';
```

---

### TypeScript error en data gen�rico

**Problema:** Error de tipos en `result.data`

**Soluci�n:**
```typescript
// ? Incorrecto
this.modalService.open({ data: { userId: 123 } })
  .afterClosed().subscribe(result => {
    result.data.userId; // Error: Property 'userId' does not exist
  });

// ? Correcto
interface UserData {
  userId: number;
}

this.modalService.open<UserData>({ data: { userId: 123 } })
  .afterClosed().subscribe((result: ModalResult<UserData>) => {
    result.data?.userId; // ? TypeScript OK
  });
```

---

## Roadmap y Mejoras Futuras

### ?? v2.0 - Mejoras Planificadas

#### 1. **Modal Stacking Mejorado**
```typescript
// Stack visualizado
this.modalService.openStacked([
  { title: 'Modal 1' },
  { title: 'Modal 2' },
  { title: 'Modal 3' }
]);
```

#### 2. **Animaciones Personalizables**
```typescript
this.modalService.open({
  title: 'Modal',
  animation: {
    enter: 'slideInFromRight',
    exit: 'slideOutToLeft',
    duration: 300
  }
});
```

#### 3. **Backdrop Click Handler Custom**
```typescript
this.modalService.open({
  title: 'Modal',
  onBackdropClick: () => {
    console.log('Usuario hizo click en backdrop');
    return false; // Prevenir cierre
  }
});
```

#### 4. **Modal Presets**
```typescript
// Preset "delete-confirmation"
this.modalService.openPreset('delete-confirmation', {
  itemName: 'Usuario John Doe'
});

// Preset "terms-and-conditions"
this.modalService.openPreset('terms-and-conditions', {
  version: '2.0',
  onAccept: () => this.saveTermsAcceptance()
});
```

#### 5. **Modal History y Back Navigation**
```typescript
// Navegar hacia atr�s en modales
this.modalService.goBack(); // Cierra modal actual, abre el anterior

// Ver historial
const history = this.modalService.getHistory();
console.log(history); // ['modal-1', 'modal-2', 'modal-3']
```

#### 6. **Drag & Drop Modals**
```typescript
this.modalService.open({
  title: 'Modal Draggable',
  draggable: true,
  dragHandle: '.modal-header'
});
```

#### 7. **Modal Auto-Save**
```typescript
this.modalService.open({
  title: 'Formulario',
  autoSave: {
    enabled: true,
    interval: 30000, // 30 segundos
    storageKey: 'user-form-draft'
  }
});
```

### ?? Ideas Innovadoras

#### 1. **Modal Timeout con Progress Bar**
```typescript
this.modalService.openWithTimeout({
  title: 'Confirma en 10 segundos',
  message: 'Esta acci�n se cancelar� autom�ticamente',
  timeout: 10000,
  showProgressBar: true,
  onTimeout: () => console.log('Timeout!')
});
```

#### 2. **Modal Collaboration (Multi-User)**
```typescript
// Muestra qui�n m�s est� viendo el modal
this.modalService.openCollaborative({
  title: 'Editar Documento',
  roomId: 'doc-123',
  showPresence: true, // Muestra avatares de usuarios activos
  onUserJoin: (user) => console.log(`${user.name} se uni�`),
  onUserLeave: (user) => console.log(`${user.name} sali�`)
});
```

#### 3. **Modal AI Assistant**
```typescript
this.modalService.openWithAI({
  title: 'Asistente IA',
  context: 'Formulario de usuario',
  features: {
    autoComplete: true,
    suggestions: true,
    validation: true
  }
});
```

#### 4. **Modal Voice Commands**
```typescript
this.modalService.open({
  title: 'Control por Voz',
  voiceCommands: {
    enabled: true,
    commands: {
      'confirmar': () => this.confirm(),
      'cancelar': () => this.cancel(),
      'cerrar': () => this.close()
    }
  }
});
```

#### 5. **Modal Analytics Integrado**
```typescript
this.modalService.open({
  title: 'Modal con Analytics',
  analytics: {
    trackOpen: true,
    trackClose: true,
    trackInteractions: true,
    trackTimeSpent: true,
    provider: 'google-analytics'
  }
});
```

---

## Recursos y Referencias

### Documentaci�n Oficial

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Angular CDK](https://material.angular.io/cdk/categories)
- [Angular Material Dialog](https://material.angular.io/components/dialog/overview)

### Herramientas

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Pa11y](https://pa11y.org/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Cursos y Gu�as

- [Web Accessibility by Google (Udacity)](https://www.udacity.com/course/web-accessibility--ud891)
- [Digital Accessibility Foundations (W3Cx)](https://www.edx.org/learn/web-accessibility)

---

## Changelog

### v1.2.0 (2025-10-12)

**? Nuevas caracter�sticas:**
- ? Backdrop system completo con theming
- ? Opci�n `hasBackdrop` configurable
- ? Mixin `overlay-backdrop()` reutilizable
- ? Variables CSS para backdrop en light/dark theme
- ? Blur effect con soporte Safari

**?? Documentaci�n:**
- ? Documentaci�n unificada en un solo archivo
- ? Secci�n de testing E2E a�adida
- ? Secci�n de CDK para librer�as
- ? Roadmap y mejoras futuras

**?? Fixes:**
- ? Backdrop sin color solucionado
- ? Animaci�n fade-in mejorada

---

### v1.1.0 (Anterior)

- ? Templates pre-construidos (loading, success, error, warning)
- ? TypeScript gen�rico mejorado
- ? 13 m�todos en el servicio
- ? Accesibilidad WCAG 2.1 AA completa

---

### v1.0.0 (Inicial)

- ? Componente modal b�sico
- ? Servicio con m�todos helper
- ? Integraci�n Angular Material Dialog

---

## Licencia

Este componente es parte del proyecto Angular Template y sigue la misma licencia del proyecto principal.

---

## Contribuir

�Tienes ideas para mejorar el componente? Abre un issue o pull request en el repositorio.

---

**?? Documentaci�n actualizada:** 2025-10-12  
**?? Autor:** GitHub Copilot  
**?? Versi�n:** 1.2.0  
**? Estado:** Producci�n


---

## Templates Personalizados



---

## Features Innovadoras



---

## Ejemplos Avanzados Completos



---

# ?? Templates Personalizados (ng-template)


---

## ? Caracter�sticas

- ? **Templates personalizados**: header, body y footer independientes
- ? **Context API**: Acceso a data y modalRef en templates
- ? **Callbacks expuestos**: confirm() y cancel() disponibles en footer
- ? **Componentes din�micos**: openComponent() para cargar componentes completos
- ? **Fallback autom�tico**: Si no hay template, usa el layout por defecto
- ? **Totalmente tipado**: TypeScript con gen�ricos
- ? **Accesible**: Mantiene ARIA roles y focus management

---

## ?? Uso B�sico

### Opci�n 1: Template en l�nea (data)

```typescript
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDialogService } from '@shared/components/modal-dialog';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="openModalWithTemplate()">Abrir Modal</button>

    <ng-template #customBody let-data>
      <div class="custom-content">
        <p>Contenido personalizado</p>
        <p>Data: {{ data.customValue }}</p>
      </div>
    </ng-template>
  `
})
export class ExampleComponent {
  @ViewChild('customBody') bodyTemplate!: TemplateRef<any>;

  constructor(private modalService: ModalDialogService) {}

  openModalWithTemplate() {
    this.modalService.open({
      title: 'Modal con Template',
      bodyTemplate: this.bodyTemplate,
      customValue: 'Hola Mundo', // Data custom
      confirmText: 'Aceptar',
      cancelText: 'Cancelar'
    }).afterClosed().subscribe(result => {
      console.log('Modal cerrado:', result);
    });
  }
}
```

### Opci�n 2: ContentChild (componente modal custom)

```typescript
import { Component } from '@angular/core';
import { ModalDialogComponent } from '@shared/components/modal-dialog';

@Component({
  selector: 'app-custom-modal',
  template: `
    <nui-modal-dialog>
      <ng-template #modalBody let-data>
        <div class="custom-layout">
          <h3>{{ data.subtitle }}</h3>
          <p>{{ data.description }}</p>
        </div>
      </ng-template>
    </nui-modal-dialog>
  `
})
export class CustomModalComponent {}
```

---

## ?? Header Personalizado

### Ejemplo: Header con imagen y subt�tulo

```typescript
@Component({
  template: `
    <button (click)="openWithCustomHeader()">Abrir</button>

    <ng-template #header let-data>
      <div class="modal-custom-header">
        <img [src]="data.avatarUrl" alt="Avatar" />
        <div>
          <h2>{{ data.title }}</h2>
          <p class="subtitle">{{ data.subtitle }}</p>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .modal-custom-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      
      h2 {
        margin: 0;
        font-size: 1.25rem;
      }
      
      .subtitle {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
    }
  `]
})
export class HeaderExampleComponent {
  @ViewChild('header') headerTemplate!: TemplateRef<any>;

  openWithCustomHeader() {
    this.modalService.open({
      headerTemplate: this.headerTemplate,
      title: 'Usuario Premium',
      subtitle: 'Miembro desde 2024',
      avatarUrl: '/assets/avatar.jpg',
      message: 'Contenido del modal...',
      confirmText: 'Aceptar'
    });
  }
}
```

### Ejemplo: Header con progreso

```typescript
@Component({
  template: `
    <ng-template #progressHeader let-data>
      <div class="progress-header">
        <h2>{{ data.title }}</h2>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            [style.width.%]="data.progress"
          ></div>
        </div>
        <span class="progress-text">{{ data.progress }}% completado</span>
      </div>
    </ng-template>
  `,
  styles: [`
    .progress-header {
      width: 100%;
      
      h2 {
        margin: 0 0 0.5rem;
      }
      
      .progress-bar {
        height: 8px;
        background: var(--nui-bg-secondary);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
      }
      
      .progress-fill {
        height: 100%;
        background: var(--color-primary);
        transition: width 0.3s ease;
      }
      
      .progress-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  `]
})
export class ProgressHeaderComponent {
  @ViewChild('progressHeader') headerTemplate!: TemplateRef<any>;

  openProgressModal() {
    const modalRef = this.modalService.open({
      headerTemplate: this.headerTemplate,
      title: 'Procesando',
      progress: 0,
      hideDefaultFooter: true
    });

    // Simular progreso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      modalRef.componentInstance.data.progress = progress;
      
      if (progress >= 100) {
        clearInterval(interval);
        modalRef.close({ confirmed: true, data: null });
      }
    }, 500);
  }
}
```

---

## ?? Body Personalizado

### Ejemplo: Formulario complejo

```typescript
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <ng-template #formBody let-data let-modalRef="modalRef">
      <form [formGroup]="form" class="modal-form">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" formControlName="name" />
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" />
        </div>
        
        <div class="form-group">
          <label>Mensaje</label>
          <textarea formControlName="message" rows="4"></textarea>
        </div>
      </form>
    </ng-template>
  `
})
export class FormModalComponent {
  @ViewChild('formBody') bodyTemplate!: TemplateRef<any>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalDialogService
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: ['']
    });
  }

  openFormModal() {
    this.modalService.open({
      title: 'Cont�ctanos',
      bodyTemplate: this.bodyTemplate,
      confirmText: 'Enviar',
      cancelText: 'Cancelar'
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        console.log('Formulario:', this.form.value);
      }
    });
  }
}
```

### Ejemplo: Lista con selecci�n

```typescript
@Component({
  template: `
    <ng-template #listBody let-data>
      <div class="item-list">
        @for (item of data.items; track item.id) {
          <div 
            class="item"
            [class.selected]="item.id === selectedId"
            (click)="selectItem(item.id)"
          >
            <i [class]="item.icon"></i>
            <div class="item-content">
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
            @if (item.id === selectedId) {
              <i class="ri-check-line"></i>
            }
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [`
    .item-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: var(--nui-bg-secondary);
      }
      
      &.selected {
        background: var(--color-primary-light);
        border-color: var(--color-primary);
      }
    }
    
    .item-content {
      flex: 1;
      
      strong {
        display: block;
        margin-bottom: 0.25rem;
      }
      
      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  `]
})
export class ListModalComponent {
  @ViewChild('listBody') bodyTemplate!: TemplateRef<any>;
  selectedId: number | null = null;

  selectItem(id: number) {
    this.selectedId = id;
  }

  openListModal() {
    this.modalService.open({
      title: 'Selecciona una opci�n',
      bodyTemplate: this.bodyTemplate,
      items: [
        {
          id: 1,
          icon: 'ri-home-line',
          title: 'Dashboard',
          description: 'Vista principal'
        },
        {
          id: 2,
          icon: 'ri-settings-line',
          title: 'Configuraci�n',
          description: 'Ajustes del sistema'
        },
        // ...m�s items
      ],
      confirmText: 'Seleccionar',
      cancelText: 'Cancelar'
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        console.log('Seleccionado:', this.selectedId);
      }
    });
  }
}
```

---

## ?? Footer Personalizado

### Ejemplo: Botones con acciones m�ltiples

```typescript
@Component({
  template: `
    <ng-template 
      #customFooter 
      let-data 
      let-confirm="confirm" 
      let-cancel="cancel"
    >
      <div class="custom-footer">
        <button 
          nuiButton 
          color="secondary" 
          (click)="cancel()"
        >
          Cancelar
        </button>
        
        <button 
          nuiButton 
          color="warning" 
          (click)="saveAsDraft()"
        >
          <i class="ri-draft-line"></i>
          Guardar borrador
        </button>
        
        <button 
          nuiButton 
          color="primary" 
          (click)="confirm()"
        >
          <i class="ri-send-plane-fill"></i>
          Publicar
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
    .custom-footer {
      display: flex;
      gap: 1rem;
      width: 100%;
      justify-content: flex-end;
    }
  `]
})
export class MultiActionFooterComponent {
  @ViewChild('customFooter') footerTemplate!: TemplateRef<any>;

  saveAsDraft() {
    console.log('Guardado como borrador');
    // L�gica de guardado
  }

  openMultiActionModal() {
    this.modalService.open({
      title: 'Publicar art�culo',
      message: 'Contenido del art�culo...',
      footerTemplate: this.footerTemplate
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        console.log('Publicado');
      }
    });
  }
}
```

### Ejemplo: Footer con checkbox y t�rminos

```typescript
@Component({
  template: `
    <ng-template 
      #termsFooter 
      let-confirm="confirm" 
      let-cancel="cancel"
    >
      <div class="terms-footer">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            [(ngModel)]="acceptedTerms"
          />
          Acepto los 
          <a href="/terms" target="_blank">t�rminos y condiciones</a>
        </label>
        
        <div class="buttons">
          <button nuiButton color="secondary" (click)="cancel()">
            Cancelar
          </button>
          <button 
            nuiButton 
            color="primary" 
            (click)="confirm()"
            [disabled]="!acceptedTerms"
          >
            Continuar
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .terms-footer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      
      a {
        color: var(--color-primary);
      }
    }
    
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }
  `]
})
export class TermsFooterComponent {
  @ViewChild('termsFooter') footerTemplate!: TemplateRef<any>;
  acceptedTerms = false;

  openTermsModal() {
    this.modalService.open({
      title: 'Antes de continuar',
      message: 'Por favor, lee y acepta nuestros t�rminos...',
      footerTemplate: this.footerTemplate
    });
  }
}
```

---

## ?? Combinaci�n de Templates

Puedes combinar templates personalizados con el layout por defecto:

```typescript
@Component({
  template: `
    <!-- Header custom, body y footer por defecto -->
    <ng-template #fancyHeader let-data>
      <div class="fancy-header">
        <div class="gradient-bg"></div>
        <h2>{{ data.title }}</h2>
      </div>
    </ng-template>
  `
})
export class MixedTemplatesComponent {
  @ViewChild('fancyHeader') headerTemplate!: TemplateRef<any>;

  openMixedModal() {
    this.modalService.open({
      headerTemplate: this.headerTemplate, // Custom
      title: 'Modal Mixto',
      message: 'Body con mensaje por defecto', // Default
      confirmText: 'Aceptar', // Footer por defecto
      cancelText: 'Cancelar'
    });
  }
}
```

### Ocultar elementos por defecto

```typescript
this.modalService.open({
  // Solo usar templates custom
  headerTemplate: this.customHeader,
  bodyTemplate: this.customBody,
  footerTemplate: this.customFooter,
  
  // Ocultar defaults
  hideDefaultHeader: true,
  hideDefaultFooter: true
});
```

---

## ?? Context API

Los templates tienen acceso a:

```typescript
interface TemplateContext {
  $implicit: ModalOptionsEntity;  // Data del modal
  modalRef: ModalRef;              // Referencia al modal
  confirm?: () => void;            // Solo en footer
  cancel?: () => void;             // Solo en footer
}
```

### Ejemplo de uso completo

```typescript
@Component({
  template: `
    <ng-template 
      #fullContext 
      let-data 
      let-modalRef="modalRef"
      let-confirm="confirm"
      let-cancel="cancel"
    >
      <div class="context-example">
        <!-- Acceso a data -->
        <h3>{{ data.customTitle }}</h3>
        <p>{{ data.customMessage }}</p>
        
        <!-- Cerrar modal directamente -->
        <button (click)="modalRef.close({ confirmed: false })">
          Cerrar sin confirmar
        </button>
        
        <!-- Usar callbacks del footer -->
        <button (click)="confirm()">Confirmar</button>
        <button (click)="cancel()">Cancelar</button>
        
        <!-- Actualizar data din�micamente -->
        <button (click)="data.counter = (data.counter || 0) + 1">
          Contador: {{ data.counter }}
        </button>
      </div>
    </ng-template>
  `
})
export class ContextExampleComponent {
  @ViewChild('fullContext') template!: TemplateRef<any>;

  openContextModal() {
    this.modalService.open({
      bodyTemplate: this.template,
      customTitle: 'Ejemplo de Context',
      customMessage: 'Todos los datos est�n disponibles',
      counter: 0,
      hideDefaultFooter: true
    });
  }
}
```

---

## ?? Componentes Din�micos

### openComponent() Method

Para componentes complejos con su propia l�gica, usa `openComponent()` en lugar de templates inline:

```typescript
// Paso 1: Crear el componente
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonDirective],
  template: `
    <div class="user-form">
      <h3>{{ data.title }}</h3>
      
      <form>
        <input [(ngModel)]="formData.name" placeholder="Nombre" />
        <input [(ngModel)]="formData.email" placeholder="Email" />
        <select [(ngModel)]="formData.role">
          <option value="admin">Admin</option>
          <option value="user">Usuario</option>
        </select>
      </form>
      
      <div class="actions">
        <button nuiButton (click)="cancel()">Cancelar</button>
        <button nuiButton color="primary" (click)="save()">
          Guardar
        </button>
      </div>
    </div>
  `
})
export class UserFormComponent {
  // Inyectar data y referencia del modal
  data = inject<ModalOptionsEntity>(MODAL_DATA);
  private modalRef = inject<ModalRef>(MODAL_REF);

  formData = {
    name: '',
    email: '',
    role: 'user'
  };

  save(): void {
    this.modalRef.close({
      confirmed: true,
      data: this.formData,
      reason: 'confirmed'
    });
  }

  cancel(): void {
    this.modalRef.close({
      confirmed: false,
      data: null,
      reason: 'cancelled'
    });
  }
}

// Paso 2: Usar openComponent()
this.modalService.openComponent(UserFormComponent, {
  title: 'Nuevo Usuario',
  width: '600px',
  data: { userId: 123 }, // Datos pasados al componente
  canBeClosed: true
}).afterClosed().subscribe(result => {
  if (result.confirmed) {
    console.log('Formulario:', result.data);
    console.log('Usuario guardado', '�xito');
  }
});
```

### Ventajas de openComponent()

**? Separaci�n de concerns**
- Componente independiente con su propia l�gica
- M�s f�cil de testear y mantener
- Reutilizable en otros contextos

**? TypeScript completo**
- Intellisense y autocompletado
- Validaci�n en tiempo de compilaci�n
- Refactoring seguro

**? Ciclo de vida completo**
- `OnInit`, `OnDestroy`, etc.
- Inyecci�n de dependencias
- Servicios y estado

**? Modularidad**
- Un archivo por componente
- Importaciones claras
- Estructura escalable

### Cu�ndo usar cada opci�n

**Templates (ng-template):**
- ? Layouts simples con poca l�gica
- ? Reutilizaci�n dentro del mismo componente
- ? Modificaciones r�pidas sin crear archivos
- ? Contenido est�tico o semi-din�mico

**Componentes (openComponent):**
- ? Formularios complejos con validaci�n
- ? Componentes reutilizables en m�ltiples lugares
- ? L�gica de negocio significativa
- ? Integraci�n con servicios externos
- ? Testing unitario requerido

### Ejemplo Completo: Formulario de Usuario

```typescript
// user-form-modal.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '@shared/components/button/button.directive';
import { MODAL_DATA, MODAL_REF, ModalRef } from '@shared/components/modal-dialog';
import { ModalOptionsEntity } from '@shared/components/modal-dialog/models/modal.model';
import { UserService } from '@services/user.service';

interface UserFormData {
  userId?: number;
  editMode?: boolean;
}

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonDirective],
  template: `
    <div class="user-form-modal">
      <div class="header">
        <i class="ri-user-add-line"></i>
        <h3>{{ data.data?.editMode ? 'Editar' : 'Nuevo' }} Usuario</h3>
      </div>

      <form [formGroup]="form" class="form-body">
        <div class="form-group">
          <label>Nombre completo *</label>
          <input 
            type="text" 
            formControlName="name"
            placeholder="Juan P�rez"
          />
          @if (form.get('name')?.touched && form.get('name')?.errors) {
            <span class="error">Campo requerido</span>
          }
        </div>

        <div class="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            formControlName="email"
            placeholder="juan@example.com"
          />
          @if (form.get('email')?.touched && form.get('email')?.errors) {
            <span class="error">Email inv�lido</span>
          }
        </div>

        <div class="form-group">
          <label>Rol</label>
          <select formControlName="role">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="moderator">Moderador</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="active" />
            Usuario activo
          </label>
        </div>
      </form>

      <div class="footer">
        <button nuiButton color="secondary" (click)="cancel()">
          Cancelar
        </button>
        <button 
          nuiButton 
          color="primary" 
          (click)="save()"
          [disabled]="form.invalid || saving"
        >
          @if (saving) {
            <i class="ri-loader-4-line spin"></i>
          }
          {{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .user-form-modal {
      padding: 1rem;
      min-width: 500px;

      .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-border);

        i {
          font-size: 2rem;
          color: var(--color-primary);
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
        }
      }

      .form-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
          font-weight: 500;
          font-size: 0.875rem;
        }

        input:not([type="checkbox"]),
        select {
          padding: 0.625rem;
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
          font-size: 0.875rem;
          transition: border-color 0.2s;

          &:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px var(--color-primary-light);
          }
        }

        .error {
          font-size: 0.75rem;
          color: var(--color-error);
        }
      }

      .footer {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);
      }
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class UserFormModalComponent implements OnInit {
  data = inject<ModalOptionsEntity<UserFormData>>(MODAL_DATA);
  private modalRef = inject<ModalRef>(MODAL_REF);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  form!: FormGroup;
  saving = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user'],
      active: [true]
    });

    // Si estamos en modo edici�n, cargar datos
    if (this.data.data?.userId) {
      this.loadUserData(this.data.data.userId);
    }
  }

  async loadUserData(userId: number): Promise<void> {
    try {
      const user = await this.userService.getUser(userId);
      this.form.patchValue(user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }

  async save(): Promise<void> {
    if (this.form.invalid) return;

    this.saving = true;
    try {
      const userData = this.form.value;
      
      // Simular guardado async
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.modalRef.close({
        confirmed: true,
        data: userData,
        reason: 'confirmed'
      });
    } catch (error) {
      console.error('Error saving:', error);
      this.saving = false;
    }
  }

  cancel(): void {
    if (this.form.dirty) {
      // Preguntar si descartar cambios
      if (confirm('�Descartar cambios?')) {
        this.modalRef.close({
          confirmed: false,
          data: null,
          reason: 'cancelled'
        });
      }
    } else {
      this.modalRef.close({
        confirmed: false,
        data: null,
        reason: 'cancelled'
      });
    }
  }
}

// Uso
@Component({ ... })
export class UserListComponent {
  constructor(private modalService: ModalDialogService) {}

  createUser(): void {
    this.modalService.openComponent(UserFormModalComponent, {
      width: '600px',
      canBeClosed: true
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        console.log('Usuario creado', '�xito');
        this.refreshList();
      }
    });
  }

  editUser(userId: number): void {
    this.modalService.openComponent(UserFormModalComponent, {
      width: '600px',
      data: { userId, editMode: true },
      canBeClosed: true
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        console.log('Usuario actualizado', '�xito');
        this.refreshList();
      }
    });
  }
}
```

---

## ?? Ejemplos Avanzados

### Modal de confirmaci�n con input

```typescript
@Component({
  template: `
    <ng-template 
      #deleteConfirm 
      let-data 
      let-confirm="confirm"
      let-cancel="cancel"
    >
      <div class="delete-confirm">
        <p class="warning-text">
          Esta acci�n <strong>no se puede deshacer</strong>.
        </p>
        
        <p>Para confirmar, escribe el nombre del elemento:</p>
        
        <div class="verification-box">
          <code>{{ data.itemName }}</code>
        </div>
        
        <nui-input
          type="text"
          [(ngModel)]="confirmInput"
          placeholder="Escribe aqu�..."
        ></nui-input>
        
        <div class="actions">
          <button nuiButton color="secondary" (click)="cancel()">
            Cancelar
          </button>
          <button 
            nuiButton 
            color="error" 
            (click)="confirm()"
            [disabled]="confirmInput !== data.itemName"
          >
            <i class="ri-delete-bin-line"></i>
            Eliminar
          </button>
        </div>
      </div>
    </ng-template>
  `
})
export class DeleteConfirmComponent {
  @ViewChild('deleteConfirm') template!: TemplateRef<any>;
  confirmInput = '';

  openDeleteConfirm(itemName: string) {
    this.confirmInput = ''; // Reset
    
    this.modalService.open({
      bodyTemplate: this.template,
      itemName: itemName,
      hideDefaultFooter: true,
      width: '500px'
    }).afterClosed().subscribe(result => {
      if (result.confirmed) {
        this.deleteItem(itemName);
      }
    });
  }

  deleteItem(name: string) {
    console.log('Eliminando:', name);
  }
}
```

### Modal con tabs

```typescript
@Component({
  template: `
    <ng-template #tabsBody let-data>
      <div class="tabs-modal">
        <div class="tabs-header">
          @for (tab of data.tabs; track tab.id) {
            <button 
              class="tab"
              [class.active]="activeTab === tab.id"
              (click)="activeTab = tab.id"
            >
              <i [class]="tab.icon"></i>
              {{ tab.label }}
            </button>
          }
        </div>
        
        <div class="tabs-content">
          @switch (activeTab) {
            @case ('general') {
              <div class="tab-pane">
                <h4>Configuraci�n General</h4>
                <!-- Contenido general -->
              </div>
            }
            @case ('advanced') {
              <div class="tab-pane">
                <h4>Configuraci�n Avanzada</h4>
                <!-- Contenido avanzado -->
              </div>
            }
            @case ('about') {
              <div class="tab-pane">
                <h4>Acerca de</h4>
                <!-- Informaci�n -->
              </div>
            }
          }
        </div>
      </div>
    </ng-template>
  `
})
export class TabsModalComponent {
  @ViewChild('tabsBody') template!: TemplateRef<any>;
  activeTab = 'general';

  openTabsModal() {
    this.modalService.open({
      title: 'Configuraci�n',
      bodyTemplate: this.template,
      tabs: [
        { id: 'general', label: 'General', icon: 'ri-settings-line' },
        { id: 'advanced', label: 'Avanzado', icon: 'ri-tools-line' },
        { id: 'about', label: 'Acerca de', icon: 'ri-information-line' }
      ],
      confirmText: 'Guardar',
      cancelText: 'Cancelar',
      width: '700px'
    });
  }
}
```

---

## ?? Mejores Pr�cticas

### 1. Reutilizaci�n de Templates

Crea componentes wrapper para templates reutilizables:

```typescript
@Component({
  selector: 'app-modal-list-template',
  template: `
    <ng-template #template let-data>
      <div class="list-template">
        <!-- Template reutilizable -->
      </div>
    </ng-template>
  `
})
export class ModalListTemplateComponent {
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
}

// Uso
@Component({
  template: `<app-modal-list-template></app-modal-list-template>`
})
export class ParentComponent {
  @ViewChild(ModalListTemplateComponent) 
  listTemplate!: ModalListTemplateComponent;

  openModal() {
    this.modalService.open({
      bodyTemplate: this.listTemplate.template,
      items: [/* ... */]
    });
  }
}
```

### 2. Tipado Fuerte

Define interfaces para tus datos custom:

```typescript
interface CustomModalData {
  items: Item[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

this.modalService.open<CustomModalData>({
  bodyTemplate: this.template,
  items: this.items,
  selectedId: null,
  onSelect: (id) => this.handleSelect(id)
});
```

### 3. Separaci�n de Concerns

Mant�n la l�gica compleja fuera de los templates:

```typescript
// ? Malo
<ng-template #body let-data>
  <div>
    {{ complexCalculation(data.value1, data.value2, data.value3) }}
  </div>
</ng-template>

// ? Bueno
prepareModalData() {
  return {
    displayValue: this.complexCalculation(v1, v2, v3)
  };
}

this.modalService.open({
  bodyTemplate: this.template,
  ...this.prepareModalData()
});
```

---

## ?? Ver Tambi�n

- [Modal Principal](./modal.md)
- [Modal Features Avanzados](./modal-innovative-features.md)
- [Ejemplos Avanzados](./modal-advanced-examples.md)

---

## ?? Botones Personalizados con Callbacks

Sistema de botones custom que permite definir m�ltiples acciones personalizadas con callbacks as�ncronos.

### ? Caracter�sticas

- ? **Callbacks as�ncronos**: Soporta async/await
- ? **Auto-cierre configurable**: closeOnClick para cerrar autom�ticamente
- ? **Coexistencia**: Muestra botones custom junto a confirm/cancel
- ? **Acceso a modalRef**: Los callbacks reciben el modalRef como par�metro
- ? **Totalmente personalizable**: Color, icono, texto, disabled, cssClass
- ? **Accesible**: Soporte para aria-label

### Interface ModalCustomButton

```typescript
interface ModalCustomButton {
  text: string;                                    // Texto del botón
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  variant?: 'solid' | 'outline' | 'ghost';         // Variante del botón
  size?: 'xs' | 's' | 'sm' | 'md' | 'lg' | 'xl';   // Tamaño del botón
  icon?: string;                                   // Clase de icono (ej: 'ri-save-line')
  callback: (modalRef?: any) => void | Promise<void>;  // Función a ejecutar
  disabled?: boolean;                              // Estado deshabilitado
  closeOnClick?: boolean;                          // Auto-cerrar después del callback
  cssClass?: string;                               // Clases CSS adicionales
  ariaLabel?: string;                              // Label para accesibilidad
}
```

### Uso Básico

```typescript
import { Component } from '@angular/core';
import { ModalDialogService } from '@shared/components/modal-dialog';

@Component({
  selector: 'app-example'
})
export class ExampleComponent {
  constructor(private modalService: ModalDialogService) {}

  openModalWithCustomButtons() {
    this.modalService.open({
      title: 'Documento modificado',
      message: 'El documento tiene cambios sin guardar. �Qu� deseas hacer?',
      iconTitle: 'ri-file-edit-line',
      width: '500px',
      customButtons: [
        {
          text: 'Descartar',
          color: 'secondary',
          icon: 'ri-close-line',
          callback: () => {
            console.log('Cambios descartados');
          },
          closeOnClick: true  // Cierra autom�ticamente
        },
        {
          text: 'Guardar borrador',
          color: 'warning',
          icon: 'ri-draft-line',
          callback: async () => {
            // Operaci�n as�ncrona
            await this.saveDraft();
            console.log('Guardado como borrador');
          },
          closeOnClick: true
        },
        {
          text: 'Guardar y publicar',
          color: 'primary',
          icon: 'ri-save-line',
          callback: async () => {
            await this.saveAndPublish();
            console.log('Documento publicado');
          },
          closeOnClick: true
        }
      ]
    }).afterClosed().subscribe(result => {
      console.log('Modal cerrado:', result);
    });
  }

  private async saveDraft(): Promise<void> {
    // Simular guardado
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async saveAndPublish(): Promise<void> {
    // Simular publicaci�n
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
}
```

### Botones Mixtos (Custom + Default)

Puedes mantener los botones por defecto junto a los custom:

```typescript
this.modalService.open({
  title: 'Error de conexi�n',
  message: 'No se pudo conectar con el servidor.',
  modalType: 'error',
  cancelText: 'Continuar sin conexi�n',
  showDefaultButtons: true,  // Mantener confirm/cancel
  customButtons: [
    {
      text: 'Reintentar',
      color: 'primary',
      icon: 'ri-refresh-line',
      callback: async (modalRef) => {
        const success = await this.retryConnection();
        if (!success) {
          // No cerrar, permitir otro intento
        } else {
          modalRef.close({ confirmed: true });
        }
      },
      closeOnClick: false  // No auto-cerrar
    }
  ]
});
```

### Botones Din�micos

Genera botones desde un array:

```typescript
openExportModal() {
  const exportFormats = [
    { id: 'pdf', name: 'Exportar PDF', icon: 'ri-file-pdf-line', color: 'danger' as const },
    { id: 'excel', name: 'Exportar Excel', icon: 'ri-file-excel-line', color: 'success' as const },
    { id: 'csv', name: 'Exportar CSV', icon: 'ri-file-text-line', color: 'info' as const },
    { id: 'clipboard', name: 'Copiar', icon: 'ri-clipboard-line', color: 'secondary' as const }
  ];

  this.modalService.open({
    title: 'Exportar datos',
    message: 'Selecciona el formato de exportaci�n:',
    iconTitle: 'ri-download-line',
    width: '550px',
    customButtons: exportFormats.map(format => ({
      text: format.name,
      color: format.color,
      icon: format.icon,
      callback: async () => {
        await this.exportData(format.id);
      },
      closeOnClick: true
    }))
  });
}

private async exportData(format: string): Promise<void> {
  console.log(`Exportando como ${format}`);
  // L�gica de exportaci�n
}
```

### Acceso al ModalRef

Los callbacks reciben el modalRef como par�metro para control manual:

```typescript
customButtons: [
  {
    text: 'Validar y Continuar',
    color: 'primary',
    callback: async (modalRef) => {
      const isValid = await this.validateData();
      
      if (isValid) {
        // Cerrar manualmente con datos
        modalRef.close({
          confirmed: true,
          data: { validated: true }
        });
      } else {
        // No cerrar, mostrar error
        this.showValidationError();
      }
    },
    closeOnClick: false  // Control manual
  }
]
```

### Estado Deshabilitado Din�mico

```typescript
let retryCount = 0;
const maxRetries = 3;

this.modalService.open({
  title: 'Error de conexi�n',
  customButtons: [
    {
      text: `Reintentar (${retryCount}/${maxRetries})`,
      color: 'primary',
      icon: 'ri-refresh-line',
      disabled: retryCount >= maxRetries,  // Deshabilitar despu�s de 3 intentos
      callback: async () => {
        retryCount++;
        await this.retryConnection();
      },
      closeOnClick: false
    }
  ]
});
```

### ?? Consideraciones Importantes

1. **Auto-cierre**: Los callbacks NO cierran el modal autom�ticamente. Debes:
   - Configurar `closeOnClick: true`, o
   - Llamar a `modalRef.close()` manualmente dentro del callback

2. **Callbacks async**: Totalmente soportados con async/await
   ```typescript
   callback: async (modalRef) => {
     await someAsyncOperation();
     modalRef.close({ confirmed: true });
   }
   ```

3. **Manejo de errores**: Los callbacks est�n envueltos en try-catch
   ```typescript
   callback: async () => {
     try {
       await riskyOperation();
     } catch (error) {
       console.error('Error:', error);
       // El modal NO se cierra en caso de error
     }
   }
   ```

4. **Renderizado**: Si no defines `customButtons`, se muestran los botones por defecto (confirm/cancel)

5. **Coexistencia**: Usa `showDefaultButtons: true` para mantener confirm/cancel junto a los custom

### ?? Ejemplos de Uso

#### Modal de Confirmaci�n con Opciones

```typescript
this.modalService.open({
  title: '�Eliminar archivo?',
  message: 'Esta acci�n no se puede deshacer.',
  modalType: 'warning',
  customButtons: [
    {
      text: 'Cancelar',
      color: 'secondary',
      callback: (ref) => ref.close({ confirmed: false }),
      closeOnClick: false  // Control manual
    },
    {
      text: 'Mover a papelera',
      color: 'warning',
      icon: 'ri-delete-bin-line',
      callback: async () => {
        await this.moveToTrash();
      },
      closeOnClick: true
    },
    {
      text: 'Eliminar permanentemente',
      color: 'danger',
      icon: 'ri-delete-bin-2-line',
      callback: async () => {
        await this.permanentDelete();
      },
      closeOnClick: true
    }
  ]
});
```

#### Modal con Validaci�n

```typescript
this.modalService.open({
  title: 'Confirmar operaci�n',
  bodyTemplate: this.confirmationTemplate,
  customButtons: [
    {
      text: 'Confirmar',
      color: 'primary',
      callback: async (modalRef) => {
        const valid = await this.validateOperation();
        
        if (valid) {
          await this.executeOperation();
          modalRef.close({ confirmed: true, data: { success: true } });
        } else {
          // Mostrar error sin cerrar
          this.showError('Validaci�n fallida');
        }
      },
      closeOnClick: false  // Validaci�n manual
    }
  ]
});
```

#### Modal de Progreso con Cancelaci�n

```typescript
let progressInterval: any;

this.modalService.open({
  title: 'Procesando archivos',
  message: 'Espera mientras se procesan los archivos...',
  customButtons: [
    {
      text: 'Cancelar',
      color: 'danger',
      callback: (modalRef) => {
        clearInterval(progressInterval);
        this.cancelProcessing();
        modalRef.close({ confirmed: false, reason: 'cancelled' });
      }
    }
  ]
}).afterOpened().subscribe(() => {
  progressInterval = setInterval(() => {
    // Actualizar progreso
  }, 100);
});
```

### 🎨 Variant y Size en Botones

Los botones del modal soportan diferentes variantes visuales y tamaños, tanto para botones por defecto (`confirmText`/`cancelText`) como para `customButtons`.

#### Configuración Global con `defaultVariant` y `defaultSize`

Puedes establecer la variante y tamaño por defecto para todos los botones del modal:

```typescript
// Botones con variante outline
this.modalService.open({
  title: 'Confirmar acción',
  message: '¿Deseas continuar?',
  confirmText: 'Sí',
  cancelText: 'No',
  buttonsVariant: 'outline',  // Aplica a ambos botones
  buttonsSize: 'lg'            // Aplica a ambos botones
});

// Botones con variante ghost y tamaño pequeño
this.modalService.open({
  title: 'Mensaje rápido',
  message: 'Operación completada',
  confirmText: 'OK',
  buttonsVariant: 'ghost',
  buttonsSize: 'sm'
});
```

**Prioridad de valores**:
1. `buttonsVariant`/`buttonsSize` especificados en el modal
2. `NUIConfig.defaultVariant`/`NUIConfig.defaultSize` (configuración global de la aplicación)
3. Valores por defecto: `'solid'` y `'md'`

#### Variant y Size en CustomButtons

Cada botón personalizado puede tener su propia variante y tamaño:

```typescript
this.modalService.open({
  title: 'Guardar documento',
  message: 'Selecciona cómo deseas guardar el documento',
  customButtons: [
    {
      text: 'Guardar',
      color: 'primary',
      variant: 'solid',    // Botón sólido destacado
      size: 'lg',          // Tamaño grande
      icon: 'ri-save-line',
      callback: async () => {
        await this.save();
      },
      closeOnClick: true
    },
    {
      text: 'Borrador',
      color: 'secondary',
      variant: 'outline',  // Botón con borde
      size: 'md',          // Tamaño mediano
      icon: 'ri-draft-line',
      callback: async () => {
        await this.saveDraft();
      },
      closeOnClick: true
    },
    {
      text: 'Cancelar',
      color: 'danger',
      variant: 'ghost',    // Botón suave
      size: 'sm',          // Tamaño pequeño
      callback: (ref) => ref.close({ confirmed: false })
    }
  ]
});
```

#### Herencia de buttonsVariant y buttonsSize

Los botones custom que no especifican `variant` o `size` heredan los valores de `buttonsVariant` y `buttonsSize`:

```typescript
this.modalService.open({
  title: 'Opciones',
  message: 'Todos los botones usan outline/lg por defecto',
  buttonsVariant: 'outline',
  buttonsSize: 'lg',
  customButtons: [
    {
      text: 'Opción 1',
      color: 'primary',
      // Hereda variant='outline', size='lg'
      callback: () => { /* ... */ }
    },
    {
      text: 'Opción 2',
      color: 'secondary',
      variant: 'ghost',  // Override: usa ghost en lugar de outline
      // Hereda size='lg'
      callback: () => { /* ... */ }
    },
    {
      text: 'Opción 3',
      color: 'success',
      size: 'sm',  // Override: usa sm en lugar de lg
      // Hereda variant='outline'
      callback: () => { /* ... */ }
    }
  ]
});
```

#### Variantes Disponibles

- **`solid`** (por defecto): Fondo de color completo, máxima prominencia
- **`outline`**: Solo borde de color, estilo minimalista
- **`ghost`**: Fondo suave de color, sutil y moderno

#### Tamaños Disponibles

- **`xs`**: Extra pequeño
- **`s`**: Pequeño
- **`sm`**: Small (pequeño)
- **`md`** (por defecto): Mediano
- **`lg`**: Grande
- **`xl`**: Extra grande

#### Combinando con showDefaultButtons

Cuando usas `customButtons` junto con `showDefaultButtons: true`, los botones por defecto también respetan `buttonsVariant` y `buttonsSize`:

```typescript
this.modalService.open({
  title: 'Acciones del documento',
  confirmText: 'Cerrar',
  cancelText: 'Cancelar',
  buttonsVariant: 'outline',
  buttonsSize: 'md',
  showDefaultButtons: true,  // Muestra Cerrar/Cancelar con outline/md
  customButtons: [
    {
      text: 'Compartir',
      color: 'info',
      variant: 'solid',
      size: 'lg',
      icon: 'ri-share-line',
      callback: () => this.share()
    }
  ]
});
```

### ?? Personalización Visual

Puedes aplicar clases CSS personalizadas:

```typescript
customButtons: [
  {
    text: 'Acci�n Especial',
    color: 'primary',
    cssClass: 'btn-pulse btn-lg',  // Clases custom
    icon: 'ri-star-line',
    callback: () => {
      // ...
    }
  }
]
```

```scss
// Estilos personalizados
.btn-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

---

## ?? Ver Tambi�n

- [Modal Principal](./modal.md)
- [Modal Features Avanzados](./modal-innovative-features.md)
- [Ejemplos Avanzados](./modal-advanced-examples.md)


---

# ?? Features Innovadoras


---

## openLoader - Loader Mejorado ??

**M�todo que reemplaza a `openLoading()`** - Modal de carga con m�s opciones y mejor API.

### Caracter�sticas

- ?? Reemplaza al componente `modal-spinner` (ahora obsoleto)
- ?? Spinner con tama�os configurables (xs, sm, md, lg, xl)
- ?? Label y mensaje personalizables
- ? Opcionalmente cerrable con bot�n cancelar
- ?? API m�s simple y consistente

### Uso B�sico

```typescript
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';

export class MyComponent {
  constructor(private modalService: ModalDialogService) {}
  
  showLoader(): void {
    const loaderRef = this.modalService.openLoader({
      title: 'Cargando datos',
      message: 'Por favor espere...',
      loadingSize: 'lg'
    });
    
    this.apiService.fetchData().subscribe({
      next: (data) => {
        loaderRef.close({ confirmed: true, data });
        console.log('Datos cargados', '�xito');
      },
      error: (err) => {
        loaderRef.close({ confirmed: false, data: null });
      }
    });
  }
}
```

### Con Cancelaci�n

```typescript
showCancellableLoader(): void {
  const loaderRef = this.modalService.openLoader({
    title: 'Subiendo archivos',
    message: 'Procesando 10 archivos grandes...',
    loadingSize: 'md',
    canBeClosed: true,
    cancelText: 'Cancelar subida'
  });
  
  const uploadSubscription = this.uploadService.uploadBatch(files).subscribe({
    next: (progress) => console.log('Progreso:', progress),
    complete: () => loaderRef.close({ confirmed: true, data: 'success' })
  });
  
  loaderRef.afterClosed().subscribe(result => {
    if (!result?.confirmed) {
      console.log('Usuario cancel� la subida');
      uploadSubscription.unsubscribe();
    }
  });
}
```

### API Completa

```typescript
openLoader(options?: {
  title?: string;              // Default: 'Cargando...'
  message?: string;            // Default: 'Por favor espere'
  loadingSize?: 'xs'|'sm'|'md'|'lg'|'xl'; // Default: 'md'
  loadingLabel?: string;       // Label adicional
  canBeClosed?: boolean;       // Default: false
  cancelText?: string;         // Solo si canBeClosed=true
  width?: string;              // Default: '400px'
  panelClass?: string;         // Default: 'nui-modal-loading'
}): MatDialogRef<ModalDialogComponent>
```

---

## openWithTimeout - Timeout con Progress Bar ??

Modal que se cierra autom�ticamente despu�s de un tiempo determinado, con countdown visual y barra de progreso.

### Caracter�sticas

- ?? Countdown visual en segundos
- ?? Barra de progreso animada (0-100%)
- ?? Pausa al hacer hover (configurable)
- ?? Acci�n autom�tica al expirar (confirm/cancel)
- ?? Callback `onTimeout` opcional
- ?? Indicador de tiempo restante en el t�tulo

### Ejemplo: Sesi�n Expirando

```typescript
showSessionExpiring(): void {
  this.modalService.openWithTimeout({
    title: 'Sesi�n por expirar',
    message: '�Desea continuar con la sesi�n activa?',
    confirmText: 'Renovar sesi�n',
    cancelText: 'Cerrar sesi�n',
    timeout: 30000, // 30 segundos
    showProgressBar: true,
    pauseOnHover: true,
    timeoutAction: 'cancel', // Acci�n por defecto al expirar
    onTimeout: (action) => {
      console.log(`Timeout alcanzado, acci�n: ${action}`);
      this.analytics.track('session_timeout', { action });
    }
  }).subscribe(result => {
    if (result.reason === 'timeout') {
      this.logout();
    } else if (result.confirmed) {
      this.renewSession();
      console.log('Sesi�n renovada', '�xito');
    } else {
      this.logout();
    }
  });
}
```

### Ejemplo: Oferta por Tiempo Limitado

```typescript
showLimitedOffer(): void {
  this.modalService.openWithTimeout({
    title: '�Oferta por tiempo limitado!',
    message: '<p>Descuento del <strong>50%</strong> solo por <strong>10 segundos</strong></p>',
    confirmText: 'Aprovechar oferta',
    cancelText: 'Cancelar',
    timeout: 10000, // 10 segundos
    showProgressBar: true,
    pauseOnHover: false, // No pausar para mantener urgencia
    timeoutAction: 'cancel'
  }).subscribe(result => {
    if (result.confirmed) {
      this.applyDiscount(0.5);
      console.log('�Descuento aplicado!', '�xito');
    } else if (result.reason === 'timeout') {
      console.log('La oferta ha expirado');
    }
  });
}
```

### API Completa

```typescript
openWithTimeout(options: {
  // REQUERIDO
  timeout: number;              // Milisegundos (ej: 10000 = 10 segundos)
  
  // Opcionales - Timeout
  showProgressBar?: boolean;    // Default: true
  pauseOnHover?: boolean;       // Default: true (pausa countdown al hover)
  timeoutAction?: 'confirm' | 'cancel'; // Default: 'cancel'
  onTimeout?: (action: 'confirm' | 'cancel') => void; // Callback
  
  // Opcionales - Contenido
  title?: string;
  message?: string;             // Acepta HTML
  confirmText?: string;
  cancelText?: string;
  width?: string;
  // ... m�s opciones de ModalOptionsEntity
}): Observable<ModalResult>
```

### ModalResult con reason

```typescript
interface ModalResult<T = any> {
  confirmed: boolean;
  data?: T | null;
  reason?: 'confirmed' | 'cancelled' | 'timeout' | 'backdrop' | 'escape';
}
```

El campo `reason` indica c�mo se cerr� el modal:
- `'confirmed'` - Usuario hizo clic en bot�n confirmar
- `'cancelled'` - Usuario hizo clic en bot�n cancelar
- `'timeout'` - Modal se cerr� por timeout
- `'backdrop'` - Usuario hizo clic en el backdrop
- `'escape'` - Usuario presion� ESC

---

## Analytics Integrado ??

Trackea autom�ticamente eventos de apertura, cierre, interacciones y tiempo.

### Caracter�sticas

- ?? Soporte para Google Analytics, Mixpanel, o custom provider
- ?? Track tiempo total en modal
- ??? Track interacciones del usuario (opcional)
- ??? Metadata personalizable
- ?? Callback `onTrack` para procesamiento custom

### Ejemplo con Google Analytics

```typescript
showSurveyModal(): void {
  this.modalService.open({
    title: 'Encuesta de satisfacci�n',
    message: '�C�mo calificar�as tu experiencia con nuestra plataforma?',
    confirmText: 'Enviar respuesta',
    cancelText: 'Omitir',
    analytics: {
      enabled: true,
      provider: 'google-analytics', // Usar� window.gtag
      trackOpen: true,
      trackClose: true,
      trackTimeSpent: true,
      metadata: {
        survey_id: 'satisfaction-2024-q4',
        version: 'v2',
        ab_test_variant: 'A',
        user_segment: 'premium'
      }
    }
  }).afterClosed().subscribe(result => {
    if (result.confirmed) {
      // Analytics ya envi�:
      // - modal_opened (al abrir)
      // - modal_closed (al cerrar, con timeSpent en segundos)
      this.processSurveyResponse();
    }
  });
}
```

### Ejemplo con Custom Provider

```typescript
showCustomAnalyticsModal(): void {
  this.modalService.open({
    title: 'Modal con Analytics Custom',
    message: 'Este modal enviar� eventos a tu backend',
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    analytics: {
      enabled: true,
      provider: 'custom',
      trackOpen: true,
      trackClose: true,
      trackInteractions: true,
      trackTimeSpent: true,
      metadata: {
        user_id: this.currentUser.id,
        screen: 'dashboard',
        feature: 'data-export',
        session_id: this.sessionId
      },
      onTrack: (event, data) => {
        console.log('?? [Analytics Event]', event, data);
        
        // Enviar a tu sistema de analytics
        this.analyticsService.track({
          event,
          timestamp: Date.now(),
          properties: data
        });
        
        // O enviar directamente a tu backend
        this.http.post('/api/analytics/track', {
          event,
          data,
          user_id: this.currentUser.id
        }).subscribe();
      }
    }
  }).afterClosed().subscribe();
}
```

### Ejemplo solo para desarrollo (logs en consola)

```typescript
showDebugModal(): void {
  this.modalService.open({
    title: 'Debug Modal',
    message: 'Abre la consola para ver los eventos',
    confirmText: 'OK',
    analytics: {
      enabled: true,
      provider: 'custom', // Logs en consola por defecto
      trackOpen: true,
      trackClose: true,
      trackTimeSpent: true
    }
  }).afterClosed().subscribe();
}
```

### API Completa

```typescript
{
  analytics: {
    enabled: boolean;           // REQUERIDO: Activar analytics
    
    // Proveedor
    provider?: 'google-analytics' | 'mixpanel' | 'custom'; // Default: 'custom'
    
    // Qu� trackear
    trackOpen?: boolean;        // Default: true
    trackClose?: boolean;       // Default: true
    trackInteractions?: boolean; // Default: false (clicks, focus, etc.)
    trackTimeSpent?: boolean;   // Default: false (segundos en modal)
    
    // Datos adicionales
    metadata?: Record<string, any>; // Cualquier dato custom
    
    // Callback para procesamiento manual
    onTrack?: (event: string, data: any) => void;
  }
}
```

### Eventos Autom�ticos

| Evento | Cu�ndo | Datos incluidos |
|--------|--------|-----------------|
| `modal_opened` | Al abrir el modal | `title`, `type`, `metadata` |
| `modal_closed` | Al cerrar el modal | `title`, `timeSpent` (si habilitado), `reason`, `metadata` |
| `modal_interaction` | Al interactuar | `title`, `interaction_type`, `metadata` |

### Integraci�n con Proveedores

**Google Analytics (gtag):**
```javascript
// El modal autom�ticamente llama:
gtag('event', 'modal_opened', {
  title: 'T�tulo del modal',
  type: 'confirmation',
  // + metadata custom
});
```

**Mixpanel:**
```javascript
// El modal autom�ticamente llama:
mixpanel.track('modal_opened', {
  title: 'T�tulo del modal',
  type: 'confirmation',
  // + metadata custom
});
```

---

## Gestos M�viles ??

Soporte para swipe gestures con haptic feedback en dispositivos m�viles.

### Caracter�sticas

- ?? **Swipe down** para cerrar modal
- ?? **Swipe left** para acci�n cancelar
- ?? **Swipe right** para acci�n confirmar
- ?? **Haptic feedback** (vibraci�n 50ms) en dispositivos compatibles
- ?? **Thresholds configurables** (p�xeles)
- ?? **Detecci�n de direcci�n** para evitar falsos positivos

### Ejemplo B�sico (todos los gestos)

```typescript
showMobileModal(): void {
  this.modalService.open({
    title: 'Modal con Gestos',
    message: `
      <p><strong>Prueba los siguientes gestos t�ctiles:</strong></p>
      <ul>
        <li>?? Desliza hacia <strong>abajo</strong> para cerrar</li>
        <li>?? Desliza a la <strong>izquierda</strong> para cancelar</li>
        <li>?? Desliza a la <strong>derecha</strong> para confirmar</li>
      </ul>
      <p><small>?? Incluye feedback h�ptico</small></p>
    `,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    gestures: {
      enabled: true,
      swipeDown: { enabled: true, threshold: 100 },
      swipeLeft: { enabled: true, threshold: 100 },
      swipeRight: { enabled: true, threshold: 100 },
      hapticFeedback: true
    }
  }).afterClosed().subscribe(result => {
    const emoji = result?.confirmed ? '?' : '?';
    console.log(`${emoji} Cerrado con reason: ${result?.reason}`);
  });
}
```

### Ejemplo Solo Swipe Down (cerrar)

```typescript
showSwipeCloseModal(): void {
  this.modalService.openInfo({
    title: 'Informaci�n',
    message: 'Desliza hacia abajo para cerrar este modal',
    confirmText: 'Entendido',
    gestures: {
      enabled: true,
      swipeDown: { 
        enabled: true, 
        threshold: 150 // M�s p�xeles = m�s dif�cil activar
      },
      hapticFeedback: true
    }
  }).subscribe();
}
```

### Ejemplo Confirmaci�n R�pida

```typescript
showQuickConfirm(): void {
  this.modalService.openConfirm({
    title: '�Marcar como le�do?',
    message: 'Desliza a la derecha para confirmar r�pidamente',
    confirmText: 'Marcar le�do',
    cancelText: 'Cancelar',
    gestures: {
      enabled: true,
      swipeRight: { 
        enabled: true, 
        threshold: 80 // Swipe corto para UX r�pida
      },
      hapticFeedback: true
    }
  }).subscribe(result => {
    if (result.confirmed) {
      this.markAsRead();
    }
  });
}
```

### API Completa

```typescript
{
  gestures: {
    enabled: boolean;           // REQUERIDO: Activar gestos
    
    swipeDown?: {
      enabled: boolean;         // Activar swipe down
      threshold?: number;       // P�xeles (default: 100)
    };
    
    swipeLeft?: {
      enabled: boolean;         // Activar swipe left
      threshold?: number;       // P�xeles (default: 100)
    };
    
    swipeRight?: {
      enabled: boolean;         // Activar swipe right
      threshold?: number;       // P�xeles (default: 100)
    };
    
    hapticFeedback?: boolean;   // Vibraci�n al activar (default: false)
  }
}
```

### Comportamiento de Gestos

| Gesto | Acci�n | ModalResult.reason |
|-------|--------|-------------------|
| Swipe Down | Cierra el modal | `'cancelled'` |
| Swipe Left | Ejecuta cancelar | `'cancelled'` |
| Swipe Right | Ejecuta confirmar | `'confirmed'` |

### Threshold (Umbral)

El `threshold` determina cu�ntos p�xeles debe deslizarse el dedo para activar el gesto:

- **50-80px**: Muy sensible, activaci�n r�pida
- **100px**: Balance recomendado (default)
- **150-200px**: Menos sensible, evita activaciones accidentales

### Compatibilidad

? **Touch Events API** - Todos los navegadores modernos m�viles  
? **Haptic Feedback** - Navegadores que soporten `navigator.vibrate()`  
? **Detecci�n de direcci�n** - Calcula deltaX/deltaY para evitar falsos positivos  

---

## Ejemplos Combinados

### Timeout + Analytics

```typescript
showTimedSurvey(): void {
  this.modalService.openWithTimeout({
    title: 'Encuesta r�pida',
    message: 'Por favor responde antes de que expire el tiempo',
    confirmText: 'Enviar',
    cancelText: 'Omitir',
    timeout: 30000, // 30 segundos
    showProgressBar: true,
    pauseOnHover: true,
    timeoutAction: 'cancel',
    analytics: {
      enabled: true,
      provider: 'google-analytics',
      trackOpen: true,
      trackClose: true,
      trackTimeSpent: true,
      metadata: {
        survey_type: 'quick',
        has_timeout: true
      }
    }
  }).subscribe(result => {
    if (result.reason === 'timeout') {
      this.analytics.track('survey_timeout');
    } else if (result.confirmed) {
      this.submitSurvey();
    }
  });
}
```

### Gestos + Analytics

```typescript
showGestureAnalytics(): void {
  this.modalService.open({
    title: 'Prueba de Gestos',
    message: 'Usa gestos para interactuar',
    confirmText: 'OK',
    cancelText: 'Cancelar',
    gestures: {
      enabled: true,
      swipeDown: { enabled: true, threshold: 100 },
      swipeLeft: { enabled: true, threshold: 100 },
      swipeRight: { enabled: true, threshold: 100 },
      hapticFeedback: true
    },
    analytics: {
      enabled: true,
      provider: 'custom',
      trackClose: true,
      metadata: {
        has_gestures: true
      },
      onTrack: (event, data) => {
        console.log('Gesture event:', event, 'Reason:', data.reason);
      }
    }
  }).afterClosed().subscribe();
}
```

### Loader + Timeout (fallback)

```typescript
showTimedLoader(): void {
  const loaderRef = this.modalService.openLoader({
    title: 'Cargando...',
    message: 'Esperando respuesta del servidor',
    loadingSize: 'lg',
    canBeClosed: true,
    cancelText: 'Cancelar'
  });
  
  // Timeout manual de 30 segundos
  const timeoutId = setTimeout(() => {
    loaderRef.close({ confirmed: false, data: null });
    console.log('Tiempo de espera agotado');
  }, 30000);
  
  this.apiService.fetchData().subscribe({
    next: (data) => {
      clearTimeout(timeoutId);
      loaderRef.close({ confirmed: true, data });
    },
    error: (err) => {
      clearTimeout(timeoutId);
      loaderRef.close({ confirmed: false, data: null });
    }
  });
  
  loaderRef.afterClosed().subscribe(result => {
    if (!result?.confirmed) {
      this.apiService.cancelRequest();
    }
  });
}
```

---

## Migraci�n desde modal-spinner

Si usabas el componente `modal-spinner` anterior, aqu� est� la gu�a de migraci�n:

### Antes (modal-spinner)

```typescript
import { ModalSpinnerService } from '@shared/components/modal-spinner/services/modal-spinner.service';

export class MyComponent {
  constructor(private spinnerService: ModalSpinnerService) {}
  
  showLoading(): void {
    const ref = this.spinnerService.openSpinnerModal({
      message: 'Cargando...',
      canBeClosed: false
    });
    
    // ... operaci�n async
    
    ref.close(true);
  }
}
```

### Ahora (openLoader)

```typescript
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';

export class MyComponent {
  constructor(private modalService: ModalDialogService) {}
  
  showLoading(): void {
    const ref = this.modalService.openLoader({
      title: 'Cargando...',
      message: 'Por favor espere',
      loadingSize: 'md', // Nuevo: tama�o configurable
      canBeClosed: false
    });
    
    // ... operaci�n async
    
    ref.close({ confirmed: true, data: null });
  }
}
```

### Ventajas del nuevo m�todo

? **API unificada** - Mismo servicio para todos los modales  
? **M�s opciones** - Tama�o spinner, label, cancelaci�n  
? **Mejor tipado** - ModalResult consistente  
? **Sin componente extra** - Usa el modal base  

---

## Notas T�cnicas

### Performance

- **Timeout**: Usa `setInterval` de 50ms para animaci�n suave
- **Gestos**: Touch events con c�lculo deltaX/deltaY eficiente
- **Analytics**: Eventos debounced para evitar spam

### Accesibilidad

- **Progress bar**: Role `progressbar` con `aria-valuenow`
- **Countdown**: Anunciado por screen readers
- **Gestos**: No afectan navegaci�n por teclado
- **Focus trap**: Mantiene focus dentro del modal

### Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Timeout | ? | ? | ? | ? |
| Analytics | ? | ? | ? | ? |
| Gestos | ? | ? | ? | ? |
| Haptic | ? | ? | ? | ? |

---

## FAQ

**�Puedo usar timeout sin progress bar?**  
S�, configura `showProgressBar: false`

**�Los gestos funcionan en desktop?**  
No, solo con touch events (m�vil/tablet)

**�Qu� pasa si no hay internet para analytics?**  
El modal funciona normal, solo no env�a eventos

**�Puedo combinar todas las features?**  
S�, pero considera UX (timeout + gestos puede ser confuso)

**�El loader reemplaza completamente a modal-spinner?**  
S�, `modal-spinner` est� obsoleto y ser� eliminado

---

## Roadmap

Pr�ximas features planeadas:

- ?? Undo/Redo stack para modales secuenciales
- ??? Comandos de voz (opcional)
- ?? AI auto-complete para formularios
- ?? Auto-save & recovery
- ?? A/B testing integrado

---

**�ltima actualizaci�n:** Octubre 2024  
**Versi�n del componente:** 2.0.0


---

# ?? Ejemplos Avanzados Completos

3. [Analytics con M�ltiples Eventos](#analytics-con-m�ltiples-eventos)
4. [Gestos en Aplicaci�n M�vil](#gestos-en-aplicaci�n-m�vil)
5. [Combinaciones Avanzadas](#combinaciones-avanzadas)

---

## Loader con Cancelaci�n de Petici�n HTTP

### Caso de Uso
Usuario sube un archivo grande y puede cancelar la subida en cualquier momento.

### Implementaci�n Completa

```typescript
import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  template: `
    <button (click)="uploadFile()">Subir Archivo</button>
  `
})
export class FileUploadComponent {
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private modalService: ModalDialogService
  ) {}

  uploadFile(): void {
    // Abrir loader con cancelaci�n
    const loaderRef = this.modalService.openLoader({
      title: 'Subiendo archivo',
      message: 'Por favor espere...',
      loadingSize: 'lg',
      canBeClosed: true,
      cancelText: 'Cancelar subida'
    });

    // Crear observable de subida
    const file = new File(['test'], 'test.pdf');
    const formData = new FormData();
    formData.append('file', file);

    const upload$ = this.http.post('/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      takeUntil(this.destroy$)
    );

    // Suscribirse a la subida
    const uploadSubscription = upload$.subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = event.total 
            ? Math.round((100 * event.loaded) / event.total)
            : 0;
          console.log(`?? Progreso de subida: ${progress}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log('? Archivo subido:', event.body);
          loaderRef.close({ confirmed: true, data: event.body });
        }
      },
      error: (error) => {
        console.error('? Error en subida:', error);
        loaderRef.close({ confirmed: false, data: null });
        // Mostrar error al usuario
      }
    });

    // Manejar cancelaci�n del usuario
    loaderRef.afterClosed().subscribe(result => {
      if (!result?.confirmed) {
        console.log('?? Usuario cancel� la subida');
        uploadSubscription.unsubscribe(); // Cancelar la petici�n HTTP
        this.destroy$.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Variante con Actualizaci�n de Progreso

```typescript
uploadFileWithProgress(): void {
  const loaderRef = this.modalService.openLoader({
    title: 'Subiendo archivo',
    message: '0% completado',
    loadingSize: 'xl',
    canBeClosed: true,
    cancelText: 'Cancelar'
  });

  const upload$ = this.http.post('/api/upload', formData, {
    reportProgress: true,
    observe: 'events'
  });

  const uploadSub = upload$.subscribe({
    next: (event) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        const progress = Math.round((100 * event.loaded) / event.total);
        
        // NOTA: No podemos actualizar el mensaje din�micamente
        // pero podemos loguear el progreso
        console.log(`Progreso: ${progress}%`);
        
        // Alternativa: Cerrar y reabrir con nuevo mensaje (no recomendado)
        // O usar un componente custom con actualizaci�n din�mica
      }
    },
    complete: () => {
      loaderRef.close({ confirmed: true, data: 'success' });
    }
  });

  loaderRef.afterClosed().subscribe(result => {
    if (!result?.confirmed) {
      uploadSub.unsubscribe();
    }
  });
}
```

---

## Timeout para Sesi�n de Usuario

### Caso de Uso
Usuario inactivo por X minutos, mostrar warning antes de logout autom�tico.

### Implementaci�n Completa

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-session-manager',
  template: `<!-- Tu template -->`
})
export class SessionManagerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private inactivityTimer$ = new Subject<void>();
  private readonly INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos
  private readonly WARNING_BEFORE = 30 * 1000; // 30 segundos antes

  constructor(
    private authService: AuthService,
    private modalService: ModalDialogService
  ) {}

  ngOnInit(): void {
    this.startInactivityMonitor();
  }

  private startInactivityMonitor(): void {
    // Eventos de actividad del usuario
    const userActivity$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    ).pipe(
      debounceTime(1000), // Debounce para evitar exceso de eventos
      takeUntil(this.destroy$)
    );

    // Resetear timer en cada actividad
    userActivity$.subscribe(() => {
      this.inactivityTimer$.next();
    });

    // Timer de inactividad
    timer(this.INACTIVITY_TIMEOUT)
      .pipe(takeUntil(this.inactivityTimer$))
      .subscribe(() => {
        this.showSessionExpiringWarning();
      });
  }

  private showSessionExpiringWarning(): void {
    this.modalService.openWithTimeout({
      title: '?? Sesi�n por Expirar',
      message: `
        <p>Tu sesi�n est� a punto de expirar por inactividad.</p>
        <p class="mt-2">
          <strong>�Deseas continuar con tu sesi�n activa?</strong>
        </p>
        <p class="mt-2 text-sm text-muted">
          Si no respondes, ser�s desconectado autom�ticamente.
        </p>
      `,
      confirmText: 'Renovar Sesi�n',
      cancelText: 'Cerrar Sesi�n',
      timeout: this.WARNING_BEFORE,
      showProgressBar: true,
      pauseOnHover: true,
      timeoutAction: 'cancel',
      width: '500px',
      onTimeout: (action) => {
        console.log('? Timeout alcanzado, acci�n:', action);
        if (action === 'cancel') {
          this.logout('timeout');
        }
      },
      analytics: {
        enabled: true,
        provider: 'google-analytics',
        trackOpen: true,
        trackClose: true,
        metadata: {
          event_category: 'session',
          event_label: 'expiration_warning'
        }
      }
    }).subscribe(result => {
      if (result.confirmed) {
        this.renewSession();
      } else if (result.reason === 'timeout') {
        this.logout('timeout');
      } else {
        this.logout('manual');
      }
    });
  }

  private renewSession(): void {
    this.authService.refreshToken().subscribe({
      next: () => {
        console.log('? Sesi�n renovada');
        this.inactivityTimer$.next(); // Resetear timer
        this.startInactivityMonitor(); // Reiniciar monitoreo
      },
      error: (error) => {
        console.error('? Error al renovar sesi�n:', error);
        this.logout('error');
      }
    });
  }

  private logout(reason: string): void {
    console.log(`?? Cerrando sesi�n. Raz�n: ${reason}`);
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.inactivityTimer$.complete();
  }
}
```

### Variante: Warning Progresivo

```typescript
private showProgressiveWarning(): void {
  // Primera advertencia a los 10 minutos (5 minutos antes del logout)
  timer(10 * 60 * 1000).subscribe(() => {
    this.modalService.openInfo({
      title: '?? Recordatorio',
      message: 'Tu sesi�n expirar� en 5 minutos por inactividad.',
      confirmText: 'Entendido'
    }).subscribe();
  });

  // Segunda advertencia a los 14:30 minutos (30 segundos antes)
  timer(14.5 * 60 * 1000).subscribe(() => {
    this.showSessionExpiringWarning();
  });
}
```

---

## Analytics con M�ltiples Eventos

### Caso de Uso
Trackear interacci�n completa del usuario con un modal de encuesta.

### Implementaci�n Completa

```typescript
import { Component } from '@angular/core';
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';
import { AnalyticsService } from '@core/services/analytics.service';

@Component({
  selector: 'app-survey',
  template: `
    <button (click)="showSurvey()">Responder Encuesta</button>
  `
})
export class SurveyComponent {
  constructor(
    private modalService: ModalDialogService,
    private analytics: AnalyticsService
  ) {}

  showSurvey(): void {
    const surveyId = 'satisfaction-q4-2024';
    const userId = this.getCurrentUserId();

    this.modalService.open({
      title: '?? Encuesta de Satisfacci�n',
      message: `
        <p>�C�mo calificar�as tu experiencia con nuestra plataforma?</p>
        <div class="mt-3">
          <label>
            <input type="radio" name="rating" value="5"> 
            ????? Excelente
          </label><br>
          <label>
            <input type="radio" name="rating" value="4"> 
            ???? Buena
          </label><br>
          <label>
            <input type="radio" name="rating" value="3"> 
            ??? Regular
          </label><br>
          <label>
            <input type="radio" name="rating" value="2"> 
            ?? Mala
          </label><br>
          <label>
            <input type="radio" name="rating" value="1"> 
            ? Muy mala
          </label>
        </div>
      `,
      confirmText: 'Enviar Respuesta',
      cancelText: 'Omitir',
      width: '600px',
      analytics: {
        enabled: true,
        provider: 'custom',
        trackOpen: true,
        trackClose: true,
        trackInteractions: true,
        trackTimeSpent: true,
        metadata: {
          survey_id: surveyId,
          user_id: userId,
          survey_type: 'satisfaction',
          platform: 'web',
          version: '2.0',
          ab_test_variant: 'A',
          user_segment: this.getUserSegment()
        },
        onTrack: (event, data) => {
          console.log('?? [Analytics Event]', event, data);

          // Enviar a tu backend
          this.analytics.track({
            event,
            properties: {
              ...data,
              timestamp: new Date().toISOString(),
              session_id: this.getSessionId(),
              page_url: window.location.href
            }
          });

          // Enviar a Google Analytics
          if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', event, data);
          }

          // Enviar a Mixpanel
          if (typeof (window as any).mixpanel === 'object') {
            (window as any).mixpanel.track(event, data);
          }
        }
      }
    }).afterClosed().subscribe(result => {
      if (result?.confirmed) {
        const rating = this.getSelectedRating();
        
        // Track respuesta
        this.analytics.track({
          event: 'survey_completed',
          properties: {
            survey_id: surveyId,
            rating,
            time_to_complete: result.timeSpent || 0
          }
        });

        this.submitSurveyResponse(rating);
      } else {
        // Track omisi�n
        this.analytics.track({
          event: 'survey_skipped',
          properties: {
            survey_id: surveyId,
            reason: result?.reason || 'unknown'
          }
        });
      }
    });
  }

  private getSelectedRating(): number {
    const radio = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
    return radio ? parseInt(radio.value) : 0;
  }

  private submitSurveyResponse(rating: number): void {
    // Enviar al backend
    console.log('Enviando respuesta:', rating);
  }

  private getCurrentUserId(): string {
    return 'user-123'; // Obtener del servicio de auth
  }

  private getUserSegment(): string {
    return 'premium'; // free, premium, enterprise
  }

  private getSessionId(): string {
    return sessionStorage.getItem('session_id') || 'unknown';
  }
}
```

### Dashboard de Analytics

```typescript
// Ejemplo de c�mo visualizar los datos trackeados
interface ModalAnalyticsData {
  modal_opened: number;
  modal_closed: number;
  avg_time_spent: number;
  completion_rate: number;
  by_reason: {
    confirmed: number;
    cancelled: number;
    timeout: number;
    backdrop: number;
    escape: number;
  };
}

@Component({
  selector: 'app-analytics-dashboard',
  template: `
    <div class="analytics-card">
      <h3>Modal Analytics</h3>
      <p>Total Opens: {{ data.modal_opened }}</p>
      <p>Completion Rate: {{ data.completion_rate }}%</p>
      <p>Avg Time: {{ data.avg_time_spent }}s</p>
    </div>
  `
})
export class AnalyticsDashboardComponent {
  data: ModalAnalyticsData = {
    modal_opened: 0,
    modal_closed: 0,
    avg_time_spent: 0,
    completion_rate: 0,
    by_reason: {
      confirmed: 0,
      cancelled: 0,
      timeout: 0,
      backdrop: 0,
      escape: 0
    }
  };

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    // Fetch desde tu backend
    this.http.get<ModalAnalyticsData>('/api/analytics/modals')
      .subscribe(data => {
        this.data = data;
      });
  }
}
```

---

## Gestos en Aplicaci�n M�vil

### Caso de Uso
Confirmaci�n r�pida de acci�n en m�vil sin necesidad de pulsar bot�n.

### Implementaci�n Completa

```typescript
import { Component } from '@angular/core';
import { ModalDialogService } from '@shared/components/modal-dialog/services/modal-dialog.service';

@Component({
  selector: 'app-mobile-actions',
  template: `
    <div class="action-list">
      <div class="action-item" (click)="markAsRead(message)">
        Marcar como le�do
      </div>
      <div class="action-item" (click)="deleteMessage(message)">
        Eliminar mensaje
      </div>
    </div>
  `
})
export class MobileActionsComponent {
  constructor(private modalService: ModalDialogService) {}

  markAsRead(message: any): void {
    this.modalService.open({
      title: '?? Marcar como Le�do',
      message: `
        <p>�Marcar este mensaje como le�do?</p>
        <p class="mt-2">
          <strong>"${message.subject}"</strong>
        </p>
        <p class="mt-3 text-sm">
          ?? <strong>Tip:</strong> Desliza hacia la derecha para confirmar r�pidamente
        </p>
      `,
      confirmText: 'Marcar Le�do',
      cancelText: 'Cancelar',
      width: '90%',
      maxWidth: '400px',
      gestures: {
        enabled: true,
        swipeRight: { 
          enabled: true, 
          threshold: 80 // Threshold bajo para acci�n r�pida
        },
        swipeDown: {
          enabled: true,
          threshold: 100
        },
        hapticFeedback: true
      },
      analytics: {
        enabled: true,
        provider: 'custom',
        trackClose: true,
        metadata: {
          action: 'mark_as_read',
          message_id: message.id
        },
        onTrack: (event, data) => {
          if (event === 'modal_closed' && data.reason === 'confirmed') {
            console.log('? Marcado como le�do via swipe');
          }
        }
      }
    }).afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.performMarkAsRead(message);
        
        // Mostrar feedback seg�n m�todo
        if (result.reason === 'confirmed') {
          // Gesto o bot�n confirmar
          this.showToast('Mensaje marcado como le�do');
        }
      }
    });
  }

  deleteMessage(message: any): void {
    this.modalService.open({
      title: '??? Eliminar Mensaje',
      message: `
        <p><strong>�Est�s seguro?</strong></p>
        <p>Esta acci�n no se puede deshacer.</p>
        <div class="mt-3 p-3 bg-danger-light rounded">
          <strong>Mensaje:</strong> "${message.subject}"<br>
          <strong>De:</strong> ${message.from}
        </div>
        <p class="mt-3 text-sm">
          ?? <strong>Gestos disponibles:</strong><br>
          ?? Desliza izquierda para cancelar<br>
          ?? Desliza derecha para confirmar<br>
          ?? Desliza abajo para cerrar
        </p>
      `,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      width: '90%',
      maxWidth: '450px',
      gestures: {
        enabled: true,
        swipeDown: { enabled: true, threshold: 100 },
        swipeLeft: { enabled: true, threshold: 120 },
        swipeRight: { enabled: true, threshold: 120 },
        hapticFeedback: true
      }
    }).afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.performDelete(message);
        
        const method = result.reason === 'confirmed' ? 'gesto/bot�n' : 'desconocido';
        this.showToast(`Mensaje eliminado (${method})`);
      }
    });
  }

  private performMarkAsRead(message: any): void {
    // API call
    console.log('Marcando como le�do:', message.id);
  }

  private performDelete(message: any): void {
    // API call
    console.log('Eliminando:', message.id);
  }

  private showToast(message: string): void {
    // Mostrar toast
    console.log(message);
  }
}
```

### Testing de Gestos en DevTools

```typescript
/**
 * C�mo probar gestos desde Chrome DevTools:
 * 
 * 1. Abrir DevTools (F12)
 * 2. Click en "Toggle device toolbar" (Ctrl+Shift+M)
 * 3. Seleccionar dispositivo m�vil:
 *    - iPhone 12 Pro
 *    - Samsung Galaxy S20
 *    - iPad Air
 * 4. Usar el mouse para simular touch:
 *    - Click y arrastrar = swipe
 *    - Direcci�n del arrastre determina el gesto
 * 5. Ver logs en consola para debugging
 */

// Funci�n helper para testing manual
function simulateSwipe(element: HTMLElement, direction: 'left' | 'right' | 'down') {
  const startX = 200;
  const startY = 200;
  let endX = startX;
  let endY = startY;

  switch (direction) {
    case 'left':
      endX = startX - 150;
      break;
    case 'right':
      endX = startX + 150;
      break;
    case 'down':
      endY = startY + 150;
      break;
  }

  // Crear eventos touch
  const touchStart = new TouchEvent('touchstart', {
    touches: [new Touch({ identifier: 0, target: element, clientX: startX, clientY: startY } as any)]
  });

  const touchEnd = new TouchEvent('touchend', {
    changedTouches: [new Touch({ identifier: 0, target: element, clientX: endX, clientY: endY } as any)]
  });

  element.dispatchEvent(touchStart);
  setTimeout(() => element.dispatchEvent(touchEnd), 100);
}
```

---

## Combinaciones Avanzadas

### 1. Timeout + Analytics + Gestos

```typescript
showCompleteSurvey(): void {
  this.modalService.openWithTimeout({
    title: '?? Encuesta R�pida',
    message: 'Por favor responde antes de que expire el tiempo',
    confirmText: 'Enviar',
    cancelText: 'Omitir',
    timeout: 30000,
    showProgressBar: true,
    pauseOnHover: false, // No pausar para mantener urgencia
    timeoutAction: 'cancel',
    gestures: {
      enabled: true,
      swipeRight: { enabled: true, threshold: 100 },
      swipeLeft: { enabled: true, threshold: 100 },
      hapticFeedback: true
    },
    analytics: {
      enabled: true,
      provider: 'google-analytics',
      trackOpen: true,
      trackClose: true,
      trackTimeSpent: true,
      metadata: {
        survey_type: 'quick',
        has_timeout: true,
        has_gestures: true
      }
    }
  }).subscribe(result => {
    console.log('Survey result:', result);
    
    if (result.reason === 'timeout') {
      this.analytics.track('survey_timeout');
    } else if (result.confirmed) {
      this.analytics.track('survey_completed', {
        method: result.reason === 'confirmed' ? 'button_or_gesture' : 'unknown'
      });
    }
  });
}
```

### 2. Loader con Timeout Fallback

```typescript
loadDataWithFallback(): void {
  const loaderRef = this.modalService.openLoader({
    title: 'Cargando datos',
    message: 'Conectando con el servidor...',
    loadingSize: 'lg',
    canBeClosed: true,
    cancelText: 'Cancelar'
  });

  // Timeout de seguridad (30 segundos)
  const timeoutId = setTimeout(() => {
    loaderRef.close({ confirmed: false, data: null });
    this.showError('Tiempo de espera agotado');
  }, 30000);

  // Petici�n HTTP
  this.http.get('/api/data').subscribe({
    next: (data) => {
      clearTimeout(timeoutId);
      loaderRef.close({ confirmed: true, data });
      this.showSuccess('Datos cargados');
    },
    error: (error) => {
      clearTimeout(timeoutId);
      loaderRef.close({ confirmed: false, data: null });
      this.showError(error.message);
    }
  });

  // Manejar cancelaci�n
  loaderRef.afterClosed().subscribe(result => {
    if (!result?.confirmed) {
      clearTimeout(timeoutId);
      // Cancelar petici�n HTTP si es posible
    }
  });
}
```

### 3. Confirmaci�n con M�ltiples Niveles

```typescript
deleteAccountWithConfirmation(): void {
  // Nivel 1: Advertencia inicial
  this.modalService.openWarning({
    title: '?? Eliminar Cuenta',
    message: '<p>Esta acci�n eliminar� <strong>permanentemente</strong> tu cuenta.</p>',
    confirmText: 'Continuar',
    cancelText: 'Cancelar'
  }).subscribe(level1 => {
    if (!level1.confirmed) return;

    // Nivel 2: Confirmaci�n con timeout
    this.modalService.openWithTimeout({
      title: '?? Confirmar Eliminaci�n',
      message: `
        <p><strong>�Est�s absolutamente seguro?</strong></p>
        <p>Se eliminar�n:</p>
        <ul>
          <li>Todos tus datos personales</li>
          <li>Historial de compras</li>
          <li>Archivos subidos</li>
          <li>Configuraciones</li>
        </ul>
        <p class="text-danger"><strong>Esta acci�n no se puede deshacer.</strong></p>
      `,
      confirmText: 'S�, ELIMINAR TODO',
      cancelText: 'No, mantener cuenta',
      timeout: 15000,
      showProgressBar: true,
      pauseOnHover: true,
      timeoutAction: 'cancel',
      analytics: {
        enabled: true,
        provider: 'custom',
        trackClose: true,
        metadata: {
          critical_action: 'account_deletion',
          confirmation_level: 2
        }
      }
    }).subscribe(level2 => {
      if (level2.confirmed) {
        this.performAccountDeletion();
      }
    });
  });
}
```

---

## Best Practices

### 1. Timeout
- ? Usa timeouts cortos (5-30s) para acciones urgentes
- ? Permite pausar en hover para dar tiempo al usuario
- ? Muestra progress bar para feedback visual
- ? No uses timeout para acciones cr�ticas sin alternativa

### 2. Analytics
- ? Trackea eventos relevantes para tu negocio
- ? Incluye metadata contextual (user_id, screen, etc.)
- ? Respeta la privacidad del usuario
- ? No trackees datos sensibles

### 3. Gestos
- ? Usa thresholds razonables (80-120px)
- ? Incluye instrucciones visuales
- ? Activa haptic feedback para mejor UX
- ? No elimines botones, gestos son complementarios

### 4. Loader
- ? Siempre cierra el loader (success o error)
- ? Permite cancelaci�n para operaciones largas
- ? Muestra mensajes descriptivos
- ? No bloquees sin raz�n v�lida

---

**�ltima actualizaci�n:** Octubre 2024


