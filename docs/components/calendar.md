# Calendar Component

Componente de calendario avanzado con selección de fechas individuales, semanas o rangos, integración con TimePicker y soporte para fechas deshabilitadas.

## 📦 Importación

```typescript
import { CalendarComponent } from '@shared/components/calendar/calendar.component';
```

## 🎯 Selector

```html
<nui-calendar></nui-calendar>
```

## 📋 API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `type` | `CalendarType` | `'DAY'` | Tipo de selección (`'DAY' \| 'WEEK' \| 'RANGE'`) |
| `date` | `Date \| Date[] \| string \| null` | - | Fecha inicial seleccionada (signal) |
| `size` | `NUISize` | `'md'` | Tamaño del calendario (`'xs' \| 's' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'auto'`) |
| `width` | `'compact' \| 'full'` | `'compact'` | Ancho: compact (fijo) o full (100% contenedor con fuentes proporcionales) |
| `firstDayOfWeek` | `0 \| 1` | `1` | Primer día de la semana (0 = Domingo, 1 = Lunes) |
| `showTimePicker` | `boolean \| 'start' \| 'end' \| 'both'` | `false` | Mostrar selector de hora integrado |
| `timeMode` | `TimePickerMode` | `'HOUR_MINUTE_24'` | Modo del time picker (`'HOUR_MINUTE_12' \| 'HOUR_MINUTE_24' \| 'HOUR_MINUTE_SECOND_12' \| 'HOUR_MINUTE_SECOND_24'`) |
| `timeConfig` | `TimePickerConfig` | `{}` | Configuración del time picker (steps, min/max, etc.) |
| `startTime` | `TimeValue \| Date \| string \| null` | `null` | Hora de inicio inicial |
| `endTime` | `TimeValue \| Date \| string \| null` | `null` | Hora de fin inicial |
| `minDate` | `Date \| string \| null` | - | Fecha mínima seleccionable |
| `maxDate` | `Date \| string \| null` | - | Fecha máxima seleccionable |
| `disabledDates` | `(Date \| string)[]` | - | Array de fechas deshabilitadas |
| `blockDisabledRanges` | `boolean` | `false` | Bloquear selección de rangos con fechas deshabilitadas |
| `showTodayButton` | `boolean` | `true` | Mostrar botón "Hoy" |
| `showPresets` | `boolean` | `false` | Mostrar panel de presets |
| `customPresets` | `DateRangePreset[]` | - | Presets personalizados de rangos |
| `isOpenedByOverlay` | `boolean` | `false` | Indica si se abrió desde un overlay (DatePicker) |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `valueChange` | `EventEmitter<CalendarValue>` | Emite el valor seleccionado con toda la información (fecha, rango, tiempo) |

### ControlValueAccessor

El componente implementa `ControlValueAccessor` y puede usarse con `FormControl`:

```typescript
// Valor del control según el tipo:
// - DAY: Date
// - WEEK: Date[] (7 fechas)
// - RANGE: Date[] (2 fechas: inicio y fin)
```

### Tipos

```typescript
type CalendarType = 'DAY' | 'WEEK' | 'RANGE';

type FirstDayOfWeek = 0 | 1; // 0 = Domingo, 1 = Lunes

type CalendarTimePickerMode = boolean | 'start' | 'end' | 'both';

interface DateRangePreset {
  label: string;
  value: Date | Date[];
  icon?: string;
}

interface CalendarValue {
  type: CalendarType;
  date?: Date;              // Para DAY
  dates?: Date[];           // Para WEEK y RANGE
  week?: WeekRange;         // Para WEEK
  range?: DateRange;        // Para RANGE
  time?: TimeValue;         // Para DAY con timepicker
  startTime?: TimeValue;    // Para WEEK/RANGE con 'start' o 'both'
  endTime?: TimeValue;      // Para WEEK/RANGE con 'end' o 'both'
}

interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
  period?: 'AM' | 'PM';  // Solo en formato 12h
}

interface TimePickerConfig {
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  minTime?: TimeValue;
  maxTime?: TimeValue;
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledSeconds?: number[];
}
```

## 💡 Ejemplos de Uso

### Selección de Día Simple

```html
<nui-calendar 
  type="DAY"
  (valueChange)="onDateSelect($event)">
</nui-calendar>
```

```typescript
import { Component } from '@angular/core';
import { CalendarValue } from '@shared/components/calendar/models/calendar.model';

@Component({
  selector: 'app-example',
  template: `...`
})
export class ExampleComponent {
  onDateSelect(value: CalendarValue) {
    console.log('Fecha seleccionada:', value.date);
    // value.type === 'DAY'
    // value.date contiene la fecha seleccionada
  }
}
```

### Con FormControl

```html
<form [formGroup]="myForm">
  <nui-calendar 
    formControlName="birthDate"
    type="DAY">
  </nui-calendar>
</form>
```

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ExampleComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      birthDate: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    console.log('Fecha:', this.myForm.value.birthDate);
  }
}
```

### Selección de Semana

```html
<nui-calendar 
  type="WEEK"
  (valueChange)="onWeekSelect($event)">
</nui-calendar>
```

```typescript
onWeekSelect(value: CalendarValue) {
  console.log('Semana seleccionada:', value.dates);
  // value.type === 'WEEK'
  // value.dates es un array de 7 fechas
  // value.week contiene { start: Date, end: Date }
  const startDate = value.week?.start;
  const endDate = value.week?.end;
}
```

### Selección de Rango

```html
<nui-calendar 
  type="RANGE"
  (valueChange)="onRangeSelect($event)">
</nui-calendar>
```

```typescript
onRangeSelect(value: CalendarValue) {
  console.log('Rango seleccionado:', value.dates);
  // value.type === 'RANGE'
  // value.dates es un array con las fechas
  // value.range contiene { start: Date, end: Date }
  const startDate = value.range?.start;
  const endDate = value.range?.end;
}
```

### Con TimePicker

```html
<!-- DAY con hora -->
<nui-calendar 
  type="DAY"
  [showTimePicker]="true"
  timeMode="HOUR_MINUTE_12"
  (valueChange)="onDateTimeSelect($event)">
</nui-calendar>

<!-- RANGE con hora de inicio y fin -->
<nui-calendar 
  type="RANGE"
  [showTimePicker]="'both'"
  timeMode="HOUR_MINUTE_24"
  [timeConfig]="{ hourStep: 1, minuteStep: 15 }"
  (valueChange)="onRangeWithTimeSelect($event)">
</nui-calendar>
```

```typescript
onDateTimeSelect(value: CalendarValue) {
  console.log('Fecha:', value.date);
  console.log('Hora:', value.time); // { hour: 14, minute: 30, period: 'PM' }
}

onRangeWithTimeSelect(value: CalendarValue) {
  console.log('Rango:', value.range);
  console.log('Hora inicio:', value.startTime);
  console.log('Hora fin:', value.endTime);
}
```

### Tamaños del Calendar

```html
<!-- Extra pequeño -->
<nui-calendar size="xs"></nui-calendar>

<!-- Pequeño -->
<nui-calendar size="s"></nui-calendar>

<!-- Pequeño-mediano -->
<nui-calendar size="sm"></nui-calendar>

<!-- Mediano (por defecto) -->
<nui-calendar size="md"></nui-calendar>

<!-- Grande -->
<nui-calendar size="lg"></nui-calendar>

<!-- Extra grande -->
<nui-calendar size="xl"></nui-calendar>

<!-- Auto-responsive (xs → sm → md según viewport) -->
<nui-calendar size="auto"></nui-calendar>
```

### Ancho: Compact vs Full

```html
<!-- Compact: Ancho fijo según tamaño (por defecto) -->
<nui-calendar width="compact" size="md"></nui-calendar>

<!-- Full: Ocupa 100% del contenedor con fuentes proporcionales -->
<div style="width: 800px">
  <nui-calendar width="full" size="md"></nui-calendar>
</div>
```

> **💡 Nota sobre width="full":**
> - Ocupa el 100% del ancho del contenedor
> - Usa CSS Container Queries para escalar fuentes proporcionalmente
> - Las fuentes de los días crecen con `clamp(0.6875rem, 3cqw, 1.5rem)`
> - Ideal para dashboards, modales grandes o pantallas anchas

### Fechas Mínima y Máxima

```html
<nui-calendar 
  [minDate]="minDate"
  [maxDate]="maxDate">
</nui-calendar>
```

```typescript
export class ExampleComponent {
  minDate = new Date(2024, 0, 1);  // 1 enero 2024
  maxDate = new Date(2024, 11, 31); // 31 diciembre 2024
}
```

### Deshabilitar Fechas Específicas

```html
<nui-calendar 
  [disabledDates]="disabledDates">
</nui-calendar>
```

```typescript
export class ExampleComponent {
  disabledDates = [
    new Date(2024, 11, 25), // 25 diciembre
    new Date(2024, 0, 1),   // 1 enero
    new Date(2024, 6, 4),   // 4 julio
    '2024-12-31'            // También acepta strings ISO
  ];
}
```

### Bloquear Rangos con Fechas Deshabilitadas

```html
<!-- En modo RANGE, impide seleccionar rangos que contengan fechas deshabilitadas -->
<nui-calendar 
  type="RANGE"
  [disabledDates]="holidays"
  [blockDisabledRanges]="true">
</nui-calendar>
```

### Botón "Hoy"

```html
<!-- Mostrar botón "Hoy" (por defecto) -->
<nui-calendar [showTodayButton]="true"></nui-calendar>

<!-- Ocultar botón "Hoy" -->
<nui-calendar [showTodayButton]="false"></nui-calendar>
```

### Con Presets de Rango

```html
<nui-calendar 
  type="RANGE"
  [showPresets]="true"
  [customPresets]="datePresets">
</nui-calendar>
```

```typescript
import { DateRangePreset } from '@shared/components/calendar/models/calendar.model';

export class ExampleComponent {
  datePresets: DateRangePreset[] = [
    {
      label: 'Hoy',
      value: new Date(),
      icon: 'ri-calendar-line'
    },
    {
      label: 'Últimos 7 días',
      value: [
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        new Date()
      ],
      icon: 'ri-calendar-2-line'
    },
    {
      label: 'Últimos 30 días',
      value: [
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        new Date()
      ]
    },
    {
      label: 'Este mes',
      value: [
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        new Date()
      ]
    },
    {
      label: 'Mes anterior',
      value: this.getLastMonthRange()
    }
  ];

  private getLastMonthRange(): Date[] {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return [lastMonth, lastDayOfLastMonth];
  }
}
```

### Configuración de TimeConfig

```html
<nui-calendar 
  type="DAY"
  [showTimePicker]="true"
  [timeConfig]="{
    hourStep: 1,
    minuteStep: 15,
    minTime: { hour: 8, minute: 0 },
    maxTime: { hour: 18, minute: 0 }
  }">
</nui-calendar>
```

```typescript
import { TimePickerConfig, TimeValue } from '@shared/components/time-picker/models/time-picker.model';

export class ExampleComponent {
  // Horario de oficina
  officeHoursConfig: TimePickerConfig = {
    hourStep: 1,
    minuteStep: 30,
    minTime: { hour: 9, minute: 0 },
    maxTime: { hour: 17, minute: 0 },
    disabledHours: [12, 13] // Hora de comida
  };
}
```

### Primer Día de la Semana

```html
<!-- Comenzar el domingo -->
<nui-calendar [firstDayOfWeek]="0"></nui-calendar>

<!-- Comenzar el lunes (por defecto) -->
<nui-calendar [firstDayOfWeek]="1"></nui-calendar>
```

### Calendario con Validación

```html
<form [formGroup]="bookingForm">
  <nui-calendar 
    formControlName="checkIn"
    [minDate]="today"
    (dateSelect)="updateCheckOutMin($event)">
  </nui-calendar>
  
  <nui-calendar 
    formControlName="checkOut"
    [minDate]="checkOutMinDate">
  </nui-calendar>
  
  <button 
    type="submit" 
    [disabled]="bookingForm.invalid">
    Reservar
  </button>
</form>
```

```typescript
export class BookingComponent {
  today = new Date();
  checkOutMinDate = new Date();

  bookingForm = this.fb.group({
    checkIn: [null, Validators.required],
    checkOut: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  updateCheckOutMin(checkInDate: Date) {
    // Check-out mínimo: 1 día después del check-in
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    this.checkOutMinDate = nextDay;
    
    // Resetear check-out si es anterior al nuevo mínimo
    const checkOut = this.bookingForm.get('checkOut')?.value;
    if (checkOut && checkOut < this.checkOutMinDate) {
      this.bookingForm.patchValue({ checkOut: null });
    }
  }
}
```

### Calendario en Modal

```html
<nui-button 
  label="Seleccionar fecha" 
  (onClick)="openCalendar()">
</nui-button>

<nui-modal [(visible)]="showCalendar" title="Selecciona una fecha">
  <nui-calendar 
    type="RANGE"
    [presets]="presets"
    (dateSelect)="onDateSelected($event)">
  </nui-calendar>
</nui-modal>
```

```typescript
export class ExampleComponent {
  showCalendar = false;
  selectedRange: Date[] = [];

  openCalendar() {
    this.showCalendar = true;
  }

  onDateSelected(dates: Date[]) {
    this.selectedRange = dates;
    this.showCalendar = false;
    console.log('Rango seleccionado:', dates);
  }
}
```

### Calendario Inline con TimePicker

```html
<div class="date-time-picker">
  <nui-calendar 
    type="DAY"
    [showTimePicker]="true"
    formControlName="appointmentDate">
  </nui-calendar>
</div>
```

### Calendario de Eventos

```html
<nui-calendar 
  [highlightedDates]="eventDates"
  (dateSelect)="showEventsForDate($event)">
</nui-calendar>

<div *ngIf="selectedDateEvents.length">
  <h3>Eventos para {{ selectedDate | date:'longDate' }}</h3>
  <ul>
    <li *ngFor="let event of selectedDateEvents">
      {{ event.title }} - {{ event.time }}
    </li>
  </ul>
</div>
```

```typescript
export class EventsComponent {
  eventDates: Date[] = [];
  selectedDate: Date;
  selectedDateEvents: any[] = [];
  
  events = [
    { date: new Date(2024, 11, 15), title: 'Reunión', time: '10:00' },
    { date: new Date(2024, 11, 20), title: 'Presentación', time: '14:00' }
  ];

  ngOnInit() {
    this.eventDates = this.events.map(e => e.date);
  }

  showEventsForDate(date: Date) {
    this.selectedDate = date;
    this.selectedDateEvents = this.events.filter(e => 
      e.date.toDateString() === date.toDateString()
    );
  }
}
```

### Sistema de Tabs (Calendar, Presets, Time)

```html
<!-- Calendar con tabs para presets y timepicker -->
<nui-calendar 
  type="RANGE"
  [showPresets]="true"
  [showTimePicker]="'both'"
  [customPresets]="presets">
</nui-calendar>
```

> **💡 Nota:** El sistema de tabs se muestra automáticamente cuando:
> - `showPresets` es `true` (solo para tipo RANGE)
> - `showTimePicker` no es `false`

Las tabs permiten cambiar entre:
- **Calendar**: Vista principal del calendario
- **Presets**: Rangos predefinidos (solo RANGE)
- **Time**: Selector de hora integrado

## 🎨 Personalización y Temas

El Calendar utiliza **CSS Custom Properties** del sistema de temas NUI. Los estilos se adaptan automáticamente según el tema activo (light/dark) y el preset seleccionado.

### Variables de Tema

```scss
// Las siguientes variables se heredan del tema global
.nui-calendar {
  // Colores base (heredados del tema)
  --nui-primary-600: /* Color primario */
  --nui-primary-100: /* Color primario claro */
  --nui-primary-contrast: /* Texto sobre primario */
  
  // Backgrounds y borders (heredados del tema)
  --nui-bg-base: /* Background principal */
  --nui-bg-raised: /* Background elevado */
  --nui-border-base: /* Color de bordes */
  
  // Estados (heredados del tema)
  --nui-hover-bg: /* Background hover */
  --nui-selected-bg: /* Background seleccionado */
}
```

### Tamaños Responsivos

El Calendar usa un sistema de tamaños con valores predefinidos:

| Tamaño | Ancho | Uso |
|--------|-------|-----|
| `xs` | 240px | Móviles pequeños, widgets compactos |
| `s` | 280px | Móviles estándar |
| `sm` | 300px | Tablets pequeñas |
| `md` | 320px | Default, tablets y desktop |
| `lg` | 360px | Desktop amplio |
| `xl` | 440px | Pantallas grandes, modales |
| `auto` | Responsive | xs→sm→md según viewport |

### Width Modes

```html
<!-- Compact: Ancho fijo según size -->
<nui-calendar width="compact" size="md"></nui-calendar>

<!-- Full: 100% del contenedor con scaling proporcional -->
<div style="width: 600px">
  <nui-calendar width="full"></nui-calendar>
</div>
```

### Personalización Avanzada

Si necesitas personalizar colores específicos, puedes crear un preset personalizado o usar CSS custom properties localmente:

```scss
// Estilo personalizado en tu componente
.my-calendar {
  ::ng-deep {
    .nui-calendar__day--selected {
      background-color: #ff6b6b;
      color: white;
    }
    
    .nui-calendar__day--today {
      &::after {
        background-color: #ff6b6b;
      }
    }
  }
}
```

## ♿ Accesibilidad

### Navegación por Teclado

| Tecla | Acción |
|-------|--------|
| `Tab` / `Shift+Tab` | Navegar entre elementos interactivos |
| `↑` `↓` `←` `→` | Navegar entre días del mes |
| `Enter` / `Space` | Seleccionar día actual |
| `Escape` | Cerrar calendario (si es overlay) |
| `Home` | Ir al primer día del mes |
| `End` | Ir al último día del mes |
| `PageUp` | Mes anterior |
| `PageDown` | Mes siguiente |
| `Shift+PageUp` | Año anterior |
| `Shift+PageDown` | Año siguiente |

### Características ARIA

- ✅ Roles ARIA apropiados (`grid`, `gridcell`, `button`)
- ✅ Estados anunciados (`aria-selected`, `aria-disabled`, `aria-current`)
- ✅ Labels descriptivos para lectores de pantalla
- ✅ Navegación completa sin mouse
- ✅ Focus visible en todos los elementos interactivos
- ✅ Anuncios de cambio de mes/año

### Cumplimiento WCAG

- ✅ **WCAG 2.1 AA** - Contraste de colores adecuado
- ✅ **Keyboard accessible** - Navegación completa por teclado
- ✅ **Screen reader friendly** - Etiquetas y anuncios apropiados
- ✅ **Focus visible** - Indicadores claros de foco

## 📱 Responsive

### Size "auto"

El tamaño `auto` se adapta automáticamente al viewport:

- **Mobile** (< 576px): Usa tamaño `xs` (240px)
- **Tablet** (576px - 768px): Usa tamaño `sm` (300px)
- **Desktop** (> 768px): Usa tamaño `md` (320px)

```html
<nui-calendar size="auto"></nui-calendar>
```

### Width "full" con Container Queries

En modo `width="full"`, el calendario usa **CSS Container Queries** para escalar proporcionalmente:

```html
<div style="width: 100%; max-width: 800px">
  <nui-calendar width="full" size="md"></nui-calendar>
</div>
```

Las fuentes de los días escalan con `clamp(0.6875rem, 3cqw, 1.5rem)` basándose en el ancho del contenedor.

## 💡 Buenas Prácticas

1. **Usa size="auto"** - Para aplicaciones responsive que se adaptan al viewport
2. **Usa width="full"** - Para modales grandes, sidebars o dashboards donde el calendario debe llenar el espacio
3. **Usa presets para rangos comunes** - Facilita la UX con `[showPresets]="true"` y `customPresets`
4. **Valida fechas en el servidor** - No confíes solo en validación client-side
5. **Configura minDate/maxDate** - Previene selecciones inválidas desde el inicio
6. **Usa blockDisabledRanges** - En modo RANGE para evitar rangos con fechas deshabilitadas
7. **Configura timeConfig apropiadamente** - Define steps y restricciones según tu caso de uso
8. **Sistema de tabs** - Aprovecha las tabs automáticas cuando combines presets + timepicker
9. **Maneja timezones correctamente** - Considera zonas horarias en aplicaciones multi-región
10. **FirstDayOfWeek** - Configura según la región (0=Domingo para US, 1=Lunes para Europa)

## � Nuevas Características (Octubre 2025)

### Width Modes con Container Queries

El calendario ahora soporta dos modos de ancho:

1. **Compact** (default): Ancho fijo basado en el tamaño
2. **Full**: Ocupa 100% del contenedor con escalado proporcional de fuentes

```html
<nui-calendar width="full"></nui-calendar>
```

Cuando `width="full"`, las fuentes de los días escalan proporcionalmente usando:
- **CSS Container Queries** (`container-type: inline-size`)
- **Fluid typography** con `clamp(min, 3cqw, max)`

### Sistema de Tabs Mejorado

Navegación por tabs cuando hay múltiples funcionalidades:

```html
<nui-calendar 
  type="RANGE"
  [showPresets]="true"
  [showTimePicker]="'both'">
</nui-calendar>
```

Muestra automáticamente tabs para:
- 📅 **Calendar**: Vista principal
- ⚡ **Presets**: Rangos rápidos
- 🕐 **Time**: Selector de hora

### Refactorización de Estilos

- ✅ **85% menos código** - Uso de mixins `calendar-size()`
- ✅ **Mejor mantenibilidad** - Cambios centralizados
- ✅ **Compilación optimizada** - Reduce bundle size

## 🔗 Ver También

- [TimePicker Component](./time-picker.md)
- [Button Component](./button.md)
- [Button Group Component](./button-group.md)
- [Modal Component](./modal.md)

## 📚 Referencias Técnicas

- **date-fns**: Librería de manipulación de fechas
- **Angular Signals**: Sistema de reactividad (Angular 17+)
- **CSS Container Queries**: Responsive design moderno
- **ControlValueAccessor**: Integración con Angular Forms

---

**Última actualización:** 21 Octubre 2025  
**Versión:** Angular 18+  
**Estado:** ✅ Production Ready
