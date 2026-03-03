# Calendar Component

Componente de calendario avanzado con selección de fechas individuales, semanas o rangos, integración con TimePicker y soporte para fechas deshabilitadas. Utiliza **Signals API** de Angular 18+ y un patrón de **Adapter Pattern** para encapsular la lógica de manipulación de fechas.

## 📦 Importación

```typescript
import { CalendarComponent } from '@nui/components';
```

## 🎯 Selector

```html
<nui-calendar></nui-calendar>
```

---

## 🏗️ Arquitectura Interna

El componente utiliza una arquitectura de **tres capas** que encapsula completamente la dependencia de `date-fns`:

### 1. **NuiDateAdapter** (Capa de Abstracción)

Interface que define 40+ métodos para todas las operaciones con fechas. **ÚNICO lugar donde se importa date-fns** en toda la librería.

**🎯 Propósito:**  
El `NuiDateAdapter` está diseñado específicamente para **desacoplar la librería de fechas** de los componentes. Si en el futuro decides cambiar de `date-fns` a otra librería (Day.js, Luxon, Moment, etc.) o implementar tu propio sistema de fechas, **solo necesitas crear un nuevo adapter** sin tocar ningún componente.

```typescript
// src/lib/adapters/nui-date-adapter.ts
export interface NuiDateAdapter {
  // Operaciones de formato
  format(date: Date, format: string, locale?: string): string;
  parse(dateString: string, format: string, locale?: string): Date;

  // Navegación
  addDays(date: Date, days: number): Date;
  addMonths(date: Date, months: number): Date;
  addYears(date: Date, years: number): Date;

  // Comparación
  isBefore(date: Date, compare: Date): boolean;
  isAfter(date: Date, compare: Date): boolean;
  isSameDay(date: Date, compare: Date): boolean;

  // Rango y validación
  isWithinInterval(date: Date, start: Date, end: Date): boolean;
  getWeekOfYear(date: Date, locale?: string): number;
  getDaysInMonth(date: Date): number;

  // Y muchas más (40+ métodos totales)
}
```

**Beneficios:**

- ✅ **Sin cambios en componentes** si cambias la librería de fechas
- ✅ **Implementación única**: `NuiDateFnsAdapter` (providedIn: root)
- ✅ **Facilita testing** y mocking de operaciones de fechas
- ✅ **Centraliza imports** de librerías externas en un solo lugar

#### Ejemplo: Cambiar a Day.js

Si decides migrar a **Day.js**, solo creas un nuevo adapter:

```typescript
// src/lib/adapters/nui-dayjs-adapter.ts
import { Injectable } from '@angular/core';
import { NuiDateAdapter } from './nui-date-adapter';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);

@Injectable({ providedIn: 'root' })
export class NuiDayjsAdapter implements NuiDateAdapter {
  format(date: Date, format: string, locale?: string): string {
    return dayjs(date)
      .locale(locale || 'es')
      .format(format);
  }

  parse(dateString: string, format: string, locale?: string): Date {
    return dayjs(dateString, format)
      .locale(locale || 'es')
      .toDate();
  }

  addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'day').toDate();
  }

  addMonths(date: Date, months: number): Date {
    return dayjs(date).add(months, 'month').toDate();
  }

  isBefore(date: Date, compare: Date): boolean {
    return dayjs(date).isBefore(dayjs(compare));
  }

  isSameDay(date: Date, compare: Date): boolean {
    return dayjs(date).isSame(dayjs(compare), 'day');
  }

  // ... implementar los 40+ métodos restantes
}
```

**Activar el nuevo adapter:**

```typescript
// En app.config.ts
import { NUI_DATE_ADAPTER } from '@nui/components';
import { NuiDayjsAdapter } from './adapters/nui-dayjs-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NUI_DATE_ADAPTER,
      useClass: NuiDayjsAdapter, // ✅ Ahora usa Day.js
    },
  ],
};
```

**Resultado:** Todos los componentes (Calendar, DatePicker, TimePicker, etc.) ahora usan Day.js sin cambiar una sola línea de código en ellos. 🎉

#### Ejemplo: Adapter Personalizado

También puedes crear tu propio sistema de fechas:

```typescript
// src/lib/adapters/custom-date-adapter.ts
import { Injectable } from '@angular/core';
import { NuiDateAdapter } from './nui-date-adapter';

@Injectable({ providedIn: 'root' })
export class CustomDateAdapter implements NuiDateAdapter {
  private readonly MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  format(date: Date, format: string, locale?: string): string {
    // Tu lógica personalizada
    if (format === 'MMMM yyyy') {
      return `${this.MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    }
    // ... más formatos personalizados
    return date.toLocaleDateString(locale);
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // ... implementar métodos según tus necesidades
}
```

**Ventajas del patrón:**

- 🔄 **Migración sin riesgo**: Cambia de librería gradualmente
- 🧪 **Testing simplificado**: Mockea el adapter en tests
- 📦 **Bundle size optimizado**: Usa solo la librería que necesites
- 🛡️ **Protección ante breaking changes**: Si la librería cambia, solo ajustas el adapter

### 2. **CalendarService** (Capa de Negocio)

Servicio que orquesta toda la lógica de negocio sin conocimiento directo de `date-fns`. Mantiene estado de meses activos y calcula estados de días.

```typescript
// Método clave: getDaysViewModel()
public getDaysViewModel(options: {
  currentDate: Date;
  weekStartsOn: FirstDayOfWeek;
  disabledDates?: (Date | string)[];
  minDate?: Date | string;
  maxDate?: Date | string;
  selectedDate?: Date;
  selectedRange?: [Date, Date];
  hoveredDate?: Date;
}): CalendarDay[]
```

**Responsabilidades:**

- ✅ Generar matriz de días del mes con estados calculados
- ✅ Validar rangos de fechas seleccionables
- ✅ Calcular días deshabilitados según reglas
- ✅ Mantener semanas activas para navegación por teclado

**Estados calculados por día:**

- `isToday`, `isOutOfMonth`, `isCurrentMonth`
- `isDisabled`, `isSelected`, `isInRange`
- `isRangeStart`, `isRangeEnd`, `isHovered`

### 3. **CalendarComponent** (Capa de Presentación)

Componente puramente de presentación. **Cero imports de date-fns**. Todo delegado al servicio.

**Responsabilidades:**

- ✅ Gestión de eventos UI (clicks, teclado, mouse hover)
- ✅ Inyección de configuración global desde `NUI_CONFIG`
- ✅ Emit de valores seleccionados con formato `CalendarValue`
- ✅ Integración con TimePicker
- ✅ Sistema de tabs (Calendar/Presets/Time)

---

## ⚙️ Configuración Global

El Calendar soporta **configuración global** a través del token `NUI_CONFIG`. Esto permite establecer valores por defecto para toda la aplicación sin necesidad de pasarlos en cada instancia.

### Interface CalendarGlobalConfig

```typescript
interface CalendarGlobalConfig {
  // Localization (3 propiedades)
  firstDayOfWeek?: FirstDayOfWeek; // Default: 1 (Lunes)
  format?: string; // Default: 'yyyy-MM-dd'
  locale?: string; // Default: 'es'

  // Behavior (5 propiedades)
  showTodayButton?: boolean; // Default: true
  autoClose?: boolean; // Default: true
  displayCount?: number; // Default: 1

  // Visual (3 propiedades)
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
  width?: CalendarWidth; // Default: 'compact'
  timePickerMode?: '12h' | '24h'; // Default: '24h'

  // Presets (1 propiedad)
  customPresets?: DateRangePreset[]; // Default: undefined

  // TimePicker
  startTime?: TimeValue | Date | string | null;
  endTime?: TimeValue | Date | string | null;
}
```

### Configurar Globalmente

Establece la configuración en tu `app.config.ts`:

```typescript
import { NUI_CONFIG } from '@nui/components';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NUI_CONFIG,
      useValue: {
        calendar: {
          locale: 'es',
          firstDayOfWeek: 1, // Lunes
          showTodayButton: true,
          size: 'md',
          width: 'compact',
          customPresets: [
            { label: 'Hoy', value: new Date(), icon: 'ri-calendar-today-line' },
            { label: 'Próximos 7 días', value: [new Date(), addDays(new Date(), 7)] },
          ],
        },
      },
    },
  ],
};
```

### Jerarquía de Resolución de Valores

El componente resuelve valores en este orden de prioridad:

```
1. Input local (🥇 Mayor prioridad)
2. Configuración global (🥈 Prioridad media)
3. Default del componente (🥉 Fallback)
```

**Ejemplo práctico:**

```typescript
// Configuración global
{ calendar: { size: 'lg' } }

// Componente A: usa global
<nui-calendar type="DAY"></nui-calendar>  // → size='lg'

// Componente B: sobreescribe global
<nui-calendar type="DAY" size="md"></nui-calendar>  // → size='md'

// Componente C: sin global config
<nui-calendar type="DAY"></nui-calendar>  // → size='md' (default)
```

---

## 📋 API del Componente

### Inputs (Signals API)

| Propiedad             | Tipo                                  | Default            | Global | Descripción                                                                                                         |
| --------------------- | ------------------------------------- | ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------- |
| `type`                | `CalendarType`                        | `'DAY'`            | ❌     | Tipo de selección (`'DAY' \| 'WEEK' \| 'RANGE'`)                                                                    |
| `date`                | `Date \| Date[] \| string \| null`    | `null`             | ❌     | Fecha inicial seleccionada                                                                                          |
| `size`                | `NUISize`                             | `'md'`             | ✅     | Tamaño del calendario (`'xs' \| 's' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'auto'`)                                     |
| `width`               | `CalendarWidth`                       | `'compact'`        | ✅     | Ancho: `compact` (fijo) o `full` (100% contenedor)                                                                  |
| `firstDayOfWeek`      | `FirstDayOfWeek`                      | `1`                | ✅     | Primer día de la semana (`0`=Domingo, `1`=Lunes)                                                                    |
| `showTimePicker`      | `CalendarTimePickerMode`              | `false`            | ❌     | Mostrar selector de hora (`true \| 'start' \| 'end' \| 'both'`)                                                     |
| `timePickerMode`            | `TimePickerMode`                      | `'HOUR_MINUTE_24'` | ❌     | Modo del time picker (`'HOUR_MINUTE_12' \| 'HOUR_MINUTE_24' \| 'HOUR_MINUTE_SECOND_12' \| 'HOUR_MINUTE_SECOND_24'`) |
| `timePickerConfig`          | `TimePickerConfig`                    | `{}`               | ❌     | Config del time picker (steps, min/max, disabled hours/minutes)                                                     |
| `startTime`           | `TimeValue \| Date \| string \| null` | `null`             | ❌     | Hora de inicio inicial (para RANGE con timepicker)                                                                  |
| `endTime`             | `TimeValue \| Date \| string \| null` | `null`             | ❌     | Hora de fin inicial (para RANGE con timepicker)                                                                     |
| `minDate`             | `Date \| string \| null`              | `null`             | ❌     | Fecha mínima seleccionable                                                                                          |
| `maxDate`             | `Date \| string \| null`              | `null`             | ❌     | Fecha máxima seleccionable                                                                                          |
| `disabledDates`       | `(Date \| string)[]`                  | `[]`               | ❌     | Array de fechas deshabilitadas                                                                                      |
| `isDateEnabledFn`     | `IsDateEnabledFn`                     | `undefined`        | ❌     | Función de validación dinámica (prevalece sobre `disabledDates`)                                                    |
| `dateStatusFn`        | `DateStatusFn`                        | `undefined`        | ❌     | Función para asignar estados visuales a fechas                                                                      |
| `showTodayButton`     | `boolean`                             | `true`             | ✅     | Mostrar botón "Hoy"                                                                                                 |
| `showPresets`         | `boolean`                             | `false`            | ❌     | Mostrar panel de presets (solo RANGE)                                                                               |
| `customPresets`       | `DateRangePreset[]`                   | `[]`               | ✅     | Presets personalizados de rangos                                                                                    |
| `isOpenedByOverlay`   | `boolean`                             | `false`            | ❌     | ¿Se abrió desde overlay? (uso interno DatePicker)                                                                   |                                                                             |
| `autoClose`           | `boolean`                             | `true`             | ✅     | Cerrar calendar automáticamente al seleccionar                                                                      |                                                                   |

### Outputs

| Evento        | Tipo                          | Descripción                                                    |
| ------------- | ----------------------------- | -------------------------------------------------------------- |
| `valueChange` | `EventEmitter<CalendarValue>` | Emite cuando se selecciona fecha/rango/semana con toda la info |

### ControlValueAccessor

El componente implementa `ControlValueAccessor` y puede usarse directamente con reactive forms:

```typescript
// En FormBuilder
this.form = this.fb.group({
  birthDate: [new Date(), Validators.required],
  dateRange: [null, Validators.required],
});
```

**Valores según el tipo:**

- **DAY**: Single `Date` object
- **WEEK**: Array de 7 `Date` objects (lunes a domingo de esa semana)
- **RANGE**: Array de 2+ `Date` objects `[startDate, endDate]`

---

## 📝 Tipos e Interfaces

### Enums y Types

```typescript
// Tipo de selección
type CalendarType = 'DAY' | 'WEEK' | 'RANGE';

// Lógica de negocio
type DateStatus = 'success' | 'warning' | 'danger' | 'info';
type DateStatusFn = (date: Date) => DateStatus | null;
type IsDateEnabledFn = (date: Date) => boolean;

// Primera día de la semana
type FirstDayOfWeek = 0 | 1; // 0 = Domingo, 1 = Lunes

// Mostrar time picker
type CalendarTimePickerMode = boolean | 'start' | 'end' | 'both';

// Ancho del calendario
type CalendarWidth = 'compact' | 'full';

// Modo de vista
enum ViewMode {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
```

### Interfaces

```typescript
// Preset para selección rápida de rangos
interface DateRangePreset {
  label: string; // Ej: "Últimos 7 días"
  value: Date | Date[]; // Fecha o rango
  icon?: string; // Ej: 'ri-calendar-line' (RemixIcon)
}

// Valor emitido por el componente
interface CalendarValue {
  type: CalendarType;

  // DAY
  date?: Date;

  // WEEK y RANGE
  dates?: Date[];
  week?: WeekRange; // Solo WEEK
  range?: DateRange; // Solo RANGE

  // Con TimePicker
  time?: TimeValue; // DAY + time
  startTime?: TimeValue; // RANGE + time='start'|'both'
  endTime?: TimeValue; // RANGE + time='end'|'both'
}

interface WeekRange {
  start: Date; // Lunes de la semana
  end: Date; // Domingo de la semana
}

interface DateRange {
  start: Date; // Fecha de inicio
  end: Date; // Fecha de fin
}

interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
  period?: 'AM' | 'PM'; // Solo formato 12h
}

interface TimePickerConfig {
  hourStep?: number; // Incremento de horas
  minuteStep?: number; // Incremento de minutos
  secondStep?: number; // Incremento de segundos
  minTime?: TimeValue; // Hora mínima permitida
  maxTime?: TimeValue; // Hora máxima permitida
  disabledHours?: number[]; // Horas deshabilitadas
  disabledMinutes?: number[]; // Minutos deshabilitados
  disabledSeconds?: number[]; // Segundos deshabilitados
}

interface CalendarDay {
  date: Date;
  dayOfMonth: number;

  // Estados
  isOutOfMonth: boolean; // Pertenece a otro mes
  isToday: boolean; // Es hoy
  isDisabled: boolean; // No puede seleccionarse
  isSelected: boolean; // Está seleccionado
  isInRange: boolean; // Está dentro de rango seleccionado
  isRangeStart: boolean; // Es el inicio de rango
  isRangeEnd: boolean; // Es el fin de rango
  isHovered: boolean; // Es la fecha hover (al arrastrar)
  isRangeHovered: boolean; // Está en rango hover

  // Lógica de negocio (nuevas propiedades)
  isWeekend: boolean; // Es sábado o domingo
  status?: DateStatus; // Estado visual de negocio
  ariaLabel: string; // Etiqueta para accesibilidad
}
```

---

## 💡 Ejemplos de Uso

### 1. Selección de Día Simple

```html
<nui-calendar type="DAY" (valueChange)="onDateSelect($event)"></nui-calendar>
```

```typescript
import { Component } from '@angular/core';
import { CalendarValue } from '@nui/components';

@Component({
  selector: 'app-example',
  template: `
    ...
  `,
})
export class ExampleComponent {
  onDateSelect(value: CalendarValue) {
    console.log('Fecha seleccionada:', value.date);
    // value.date = Date object
  }
}
```

### 2. Con FormControl

```html
<form [formGroup]="myForm">
  <nui-calendar
    formControlName="birthDate"
    type="DAY"
    [minDate]="'1900-01-01'"
    [maxDate]="today"
  ></nui-calendar>

  <button [disabled]="myForm.invalid">Enviar</button>
</form>
```

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-example',
  template: `
    ...
  `,
})
export class FormExampleComponent {
  today = new Date();
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      birthDate: [new Date(1990, 0, 1), Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Fecha:', this.myForm.value.birthDate);
    }
  }
}
```

### 3. Selección de Semana

```html
<nui-calendar type="WEEK" (valueChange)="onWeekSelect($event)"></nui-calendar>
```

```typescript
onWeekSelect(value: CalendarValue) {
  if (value.type === 'WEEK' && value.week) {
    console.log('Semana:', {
      inicio: value.week.start,  // Lunes
      fin: value.week.end,       // Domingo
      todasLasFechas: value.dates  // 7 fechas de lunes a domingo
    });
  }
}
```

### 4. Selección de Rango

```html
<nui-calendar
  type="RANGE"
  [showPresets]="true"
  [customPresets]="rangePresets"
  (valueChange)="onRangeSelect($event)"
></nui-calendar>
```

```typescript
onRangeSelect(value: CalendarValue) {
  if (value.type === 'RANGE' && value.range) {
    console.log('Rango seleccionado:', {
      inicio: value.range.start,
      fin: value.range.end,
      diasTotales: value.dates?.length
    });
  }
}
```

### 5. Con TimePicker Integrado

```html
<!-- Seleccionar fecha y hora (DAY) -->
<nui-calendar
  type="DAY"
  [showTimePicker]="true"
  timePickerMode="HOUR_MINUTE_12"
  (valueChange)="onDateTimeSelect($event)"
></nui-calendar>

<!-- Rango con hora de inicio y fin -->
<nui-calendar
  type="RANGE"
  [showTimePicker]="'both'"
  timePickerMode="HOUR_MINUTE_24"
  [timePickerConfig]="{ hourStep: 1, minuteStep: 15 }"
  (valueChange)="onRangeWithTimeSelect($event)"
></nui-calendar>
```

```typescript
onDateTimeSelect(value: CalendarValue) {
  console.log({
    fecha: value.date,
    hora: value.time // { hour: 14, minute: 30, period: 'PM' }
  });
}

onRangeWithTimeSelect(value: CalendarValue) {
  console.log({
    rango: value.range,
    horaInicio: value.startTime,
    horaFin: value.endTime
  });
}
```

### 6. Con Configuración Global

Después de configurar `NUI_CONFIG` en `app.config.ts`:

```html
<!-- Hereda de configuración global -->
<nui-calendar type="DAY"></nui-calendar>

<!-- Sobreescribe configuración global -->
<nui-calendar type="DAY" [firstDayOfWeek]="0"></nui-calendar>
```

```typescript
// En app.config.ts
import { NUI_CONFIG } from '@nui/components';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NUI_CONFIG,
      useValue: {
        calendar: {
          locale: 'es', // Aplicado a todos los calendarios
          firstDayOfWeek: 1, // Lunes por defecto
          showTodayButton: true, // Botón "Hoy" por defecto
          customPresets: [
            // Presets globales
            {
              label: 'Hoy',
              value: new Date(),
              icon: 'ri-calendar-today-line',
            },
            {
              label: 'Últimos 7 días',
              value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
            },
          ],
        },
      },
    },
  ],
};
```

### 9. Fechas Mínima y Máxima

```html
<nui-calendar type="RANGE" [minDate]="'2024-01-01'" [maxDate]="'2024-12-31'"></nui-calendar>
```

```typescript
export class ExampleComponent {
  minDate = new Date(2024, 0, 1); // 1 enero 2024
  maxDate = new Date(2024, 11, 31); // 31 diciembre 2024
}
```

### 10. Deshabilitar Fechas Específicas

```html
<nui-calendar type="RANGE" [disabledDates]="holidays"></nui-calendar>
```

```typescript
export class ExampleComponent {
  holidays = [
    new Date(2024, 11, 25), // 25 diciembre
    new Date(2024, 0, 1), // 1 enero
    '2024-12-31', // También acepta strings ISO
    '2024-07-04',
  ];
}
```

### 11. Presets Personalizados

```html
<nui-calendar
  type="RANGE"
  [showPresets]="true"
  [customPresets]="myPresets"
  (valueChange)="onRangeSelect($event)"
></nui-calendar>
```

```typescript
import { DateRangePreset } from '@nui/components';

export class ExampleComponent {
  myPresets: DateRangePreset[] = [
    {
      label: 'Hoy',
      value: new Date(),
      icon: 'ri-calendar-today-line',
    },
    {
      label: 'Últimos 7 días',
      value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      icon: 'ri-calendar-2-line',
    },
    {
      label: 'Este mes',
      value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    },
    {
      label: 'Último mes completo',
      value: this.getLastMonthRange(),
    },
  ];

  private getLastMonthRange(): [Date, Date] {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
    return [firstDay, lastDay];
  }
}
```

### 12. Validación con Reserva de Hotel

```html
<form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
  <label>Check-in:</label>
  <nui-calendar
    type="DAY"
    formControlName="checkIn"
    [minDate]="today"
    (valueChange)="updateCheckOutMin()"
  ></nui-calendar>

  <label>Check-out:</label>
  <nui-calendar type="DAY" formControlName="checkOut" [minDate]="checkOutMinDate"></nui-calendar>

  <button type="submit" [disabled]="bookingForm.invalid">Reservar</button>
</form>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  template: `
    ...
  `,
})
export class BookingComponent implements OnInit {
  today = new Date();
  checkOutMinDate = new Date();
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required],
    });
  }

  updateCheckOutMin() {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    if (checkIn) {
      // Check-out mínimo: 1 día después del check-in
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      this.checkOutMinDate = nextDay;

      // Resetear check-out si es anterior
      const checkOut = this.bookingForm.get('checkOut')?.value;
      if (checkOut && checkOut < this.checkOutMinDate) {
        this.bookingForm.patchValue({ checkOut: null });
      }
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Reserva:', this.bookingForm.value);
    }
  }
}
```

### 13. En Modal

```html
<nui-button label="Seleccionar fecha" (click)="showCalendarModal = true"></nui-button>

<nui-modal [(visible)]="showCalendarModal" title="Selecciona un rango">
  <nui-calendar
    type="RANGE"
    [showPresets]="true"
    [customPresets]="rangePresets"
    (valueChange)="onRangeSelected($event)"
  ></nui-calendar>
</nui-modal>
```

```typescript
export class ModalExampleComponent {
  showCalendarModal = false;
  selectedRange: [Date, Date] | null = null;

  rangePresets: DateRangePreset[] = [
    { label: 'Últimos 7 días', value: [...] },
    { label: 'Este mes', value: [...] }
  ];

  onRangeSelected(value: CalendarValue) {
    if (value.type === 'RANGE' && value.range) {
      this.selectedRange = [value.range.start, value.range.end];
      this.showCalendarModal = false;
    }
  }
}
```

### 14. Con Multiple Calendarios

```html
<nui-calendar type="RANGE" [displayCount]="2" (valueChange)="onRangeSelect($event)"></nui-calendar>
```

Muestra 2 calendarios lado a lado para seleccionar rangos más fácilmente.

### 15. Primer Día de la Semana

```html
<!-- Lunes como primer día (Europa) -->
<nui-calendar [firstDayOfWeek]="1"></nui-calendar>

<!-- Domingo como primer día (USA) -->
<nui-calendar [firstDayOfWeek]="0"></nui-calendar>
```

O configura globalmente:

```typescript
// En app.config.ts
{
  provide: NUI_CONFIG,
  useValue: {
    calendar: {
      locale: 'en',
      firstDayOfWeek: 0  // Domingo para USA
    }
  }
}
```

---

## � Lógica de Negocio Avanzada

### Estados Visuales con `dateStatusFn`

Asigna estados visuales a fechas para mostrar información de negocio: disponibilidad, prioridad, eventos, etc.

#### Tipos

```typescript
// Estados disponibles
type DateStatus = 'success' | 'warning' | 'danger' | 'info';

// Función de status
type DateStatusFn = (date: Date) => DateStatus | null;
```

#### Ejemplo: Sistema de Reservas Hoteleras

```typescript
import { Component, signal } from '@angular/core';
import { DateStatusFn } from 'nui';

@Component({
  selector: 'app-hotel-booking',
  template: `
    <nui-calendar type="day" [dateStatusFn]="dateStatusFn"></nui-calendar>

    <div class="legend">
      <span class="success">≥10 habitaciones</span>
      <span class="info">5-9 habitaciones</span>
      <span class="warning">1-4 habitaciones</span>
      <span class="danger">Sin disponibilidad</span>
    </div>
  `,
})
export class HotelBookingComponent {
  // Mapa de disponibilidad (normalmente viene de una API)
  private availabilityMap = new Map<string, number>([
    ['2026-02-18', 2], // warning
    ['2026-02-19', 0], // danger
    ['2026-02-20', 12], // success
    ['2026-02-21', 15], // success
    ['2026-02-22', 3], // warning
    ['2026-02-23', 8], // info
  ]);

  // Función de status
  dateStatusFn: DateStatusFn = date => {
    const availability = this.getAvailability(date);

    if (availability === 0) return 'danger'; // Sin habitaciones
    if (availability < 5) return 'warning'; // Pocas habitaciones
    if (availability >= 10) return 'success'; // Buena disponibilidad
    return 'info'; // Disponibilidad normal
  };

  private getAvailability(date: Date): number {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    return this.availabilityMap.get(key) ?? 5;
  }
}
```

#### Estilos de Estados

Los estados se muestran como una **línea de color sutil** en la parte superior de cada día:

- **success** (verde): Ideal para indicar disponibilidad alta, confirmaciones, días positivos
- **info** (azul): Para información neutral, eventos programados, disponibilidad normal
- **warning** (ámbar): Para advertencias, disponibilidad limitada, fechas próximas a vencer
- **danger** (rojo): Para errores, sin disponibilidad, días críticos

Los colores se adaptan automáticamente al tema activo (light/dark) y usan las variables semánticas del sistema de temas NUI.

---

### Validación Dinámica con `isDateEnabledFn`

Deshabilita fechas según lógica de negocio compleja. **Prevalece sobre el array estático `disabledDates`**.

#### Tipo

```typescript
type IsDateEnabledFn = (date: Date) => boolean;
```

#### Ejemplo: Calendario Corporativo

```typescript
import { Component } from '@angular/core';
import { IsDateEnabledFn } from 'nui';

@Component({
  selector: 'app-corporate-calendar',
  template: `
    <nui-calendar type="day" [isDateEnabledFn]="isDateEnabledFn"></nui-calendar>

    <div class="rules">
      <p><strong>Reglas aplicadas:</strong></p>
      <ul>
        <li>Solo días laborables (lunes a viernes)</li>
        <li>Sin festivos nacionales</li>
      </ul>
    </div>
  `,
})
export class CorporateCalendarComponent {
  // Función de validación
  isDateEnabledFn: IsDateEnabledFn = date => {
    // 1. No permitir fines de semana
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;

    // 2. No permitir festivos nacionales
    if (this.isNationalHoliday(date)) return false;

    return true;
  };

  private isNationalHoliday(date: Date): boolean {
    const holidays = [
      '2026-01-01', // Año Nuevo
      '2026-02-16', // Carnaval
      '2026-02-17', // Carnaval
      '2026-04-03', // Viernes Santo
      '2026-05-01', // Día del Trabajo
      '2026-12-25', // Navidad
    ];

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return holidays.includes(`${year}-${month}-${day}`);
  }
}
```

#### Validación Compleja por Zona

```typescript
export class DeliverySchedulerComponent {
  deliveryZone = signal<string>('ZONE_A');

  isDateEnabledFn: IsDateEnabledFn = date => {
    const zone = this.deliveryZone();
    const dayOfWeek = date.getDay();

    // Zonas con días específicos de entrega
    if (zone === 'ZONE_A' && ![1, 3, 5].includes(dayOfWeek)) {
      return false; // Solo L-M-V
    }

    if (zone === 'ZONE_B' && ![2, 4].includes(dayOfWeek)) {
      return false; // Solo M-J
    }

    // Validar capacidad de almacén
    const capacity = this.getWarehouseCapacity(date);
    const scheduled = this.getScheduledDeliveries(date).length;

    return scheduled < capacity;
  };

  private getWarehouseCapacity(date: Date): number {
    // Simular capacidad de 10 entregas por día
    return 10;
  }

  private getScheduledDeliveries(date: Date): any[] {
    // Simular entregas programadas
    return [];
  }
}
```

#### Combinando Ambas Funciones

Puedes usar `dateStatusFn` e `isDateEnabledFn` simultáneamente:

```html
<nui-calendar
  type="range"
  [dateStatusFn]="statusFn"
  [isDateEnabledFn]="validationFn"
  [minDate]="today"
  [maxDate]="maxDate"
></nui-calendar>
```

```typescript
// Estado visual basado en eventos
statusFn: DateStatusFn = date => {
  const events = this.getEventsForDate(date);

  if (events.some(e => e.priority === 'high')) return 'danger';
  if (events.some(e => e.priority === 'medium')) return 'warning';
  if (events.some(e => e.type === 'meeting')) return 'info';
  if (events.some(e => e.type === 'holiday')) return 'success';

  return null; // Sin estado especial
};

// Validación compleja
validationFn: IsDateEnabledFn = date => {
  // Tu lógica de validación
  return true;
};
```

---

## �🎨 Temas y Personalización

El Calendar utiliza **CSS Custom Properties** del sistema de temas NUI. Los estilos se adaptan automáticamente según el tema activo (light/dark) y el preset de color seleccionado.

### Variables CSS Heredadas

```scss
.nui-calendar {
  // Colores primarios (heredados del tema global)
  --nui-primary-600: /* Color primario */ --nui-primary-100: /* Color primario claro */
    --nui-primary-contrast: /* Color de texto sobre primario */ // Backgrounds y bordes
    --nui-bg-base: /* Background principal */ --nui-bg-raised: /* Background elevado */
    --nui-border-base: /* Color de bordes */ // Estados interactivos
    --nui-hover-bg: /* Fondo hover */ --nui-active-bg: /* Fondo activo */
    --nui-disabled-bg: /* Fondo deshabilitado */ --nui-transition: /* Duración de transiciones */;
}
```

### Personalización CSS

Para personalizar estilos específicos en tu componente:

```scss
// my-calendar.component.scss
.my-calendar {
  ::ng-deep {
    // Día seleccionado
    .nui-calendar__day--selected {
      background-color: #ff6b6b;
      color: white;
      font-weight: 600;
    }

    // Indicador "Hoy"
    .nui-calendar__day--today::after {
      background-color: #ff6b6b;
    }

    // Rango seleccionado
    .nui-calendar__day--in-range {
      background-color: rgba(255, 107, 107, 0.2);
    }

    // Días deshabilitados
    .nui-calendar__day--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
```

### Tamaños Predefinidos

| Tamaño | Ancho Fijo | Casos de Uso                        |
| ------ | ---------- | ----------------------------------- |
| `xs`   | 240px      | Mobiles pequeños, widgets compactos |
| `s`    | 280px      | Teléfonos estándar                  |
| `sm`   | 300px      | Tablets pequeños                    |
| `md`   | 320px      | Default, tablets y desktop          |
| `lg`   | 360px      | Desktop amplio                      |
| `xl`   | 440px      | Pantallas grandes, modales anchos   |
| `auto` | Responsive | Adapta xs→sm→md según viewport      |

---

## ♿ Accesibilidad

### Navegación por Teclado

| Tecla               | Acción                                              |
| ------------------- | --------------------------------------------------- |
| `Tab` / `Shift+Tab` | Navega entre elementos interactivos (botones, días) |
| `↑` `↓` `←` `→`     | Navega entre días del mes                           |
| `Enter` / `Space`   | Selecciona el día en foco                           |
| `Escape`            | Cierra el calendario (si se abrió desde overlay)    |
| `Home`              | Va al primer día del mes actual                     |
| `End`               | Va al último día del mes actual                     |
| `PageUp`            | Navega al mes anterior                              |
| `PageDown`          | Navega al mes siguiente                             |
| `Shift+PageUp`      | Navega al año anterior                              |
| `Shift+PageDown`    | Navega al año siguiente                             |

### Atributos ARIA

El componente implementa automáticamente:

- ✅ **Roles ARIA**: `grid`, `gridcell`, `button`, `presentation`
- ✅ **Estados**: `aria-selected`, `aria-disabled`, `aria-current="date"`
- ✅ **Propiedades**: `aria-label`, `aria-describedby`, `aria-labelledby`
- ✅ **Live regions**: Anuncios de cambios de mes/año para lectores de pantalla
- ✅ **Focus management**: Indicadores claros de foco

### Cumplimiento WCAG 2.1

- ✅ **Nivel AA** - Contraste de colores conforme
- ✅ **Navegación completa por teclado** - Sin requerir ratón
- ✅ **Screen reader friendly** - Etiquetas descriptivas
- ✅ **Focus visible** - Indicadores de foco claramente visibles
- ✅ **Color no es la única medio** - Indicadores visuales adicionales

### Ejemplo de Uso Accesible

```html
<fieldset>
  <legend>Selecciona un rango de fechas</legend>
  <nui-calendar type="RANGE" [showPresets]="true"></nui-calendar>
</fieldset>
```

---

## 📱 Responsive Design

### Size Auto

El tamaño `auto` se adapta automáticamente al viewport:

```typescript
// Breakpoints internos
Mobile    (< 576px):  Size → xs (240px)
Tablet    (576-768px): Size → sm (300px)
Desktop   (> 768px):  Size → md (320px)
```

```html
<nui-calendar size="auto"></nui-calendar>
```

### Width Full con Container Queries

En modo `width="full"`, el Calendar utiliza **CSS Container Queries** para escalar proporcionalmente:

```html
<div class="calendar-container" style="width: 100%; max-width: 900px">
  <nui-calendar width="full" size="md"></nui-calendar>
</div>
```

**Fórmula de escalado:**

```css
font-size: clamp(0.6875rem, 3cqw, 1.5rem);
```

- **0.6875rem** - Mínimo (tamaño base pequeño)
- **3cqw** - Fluido (3% del ancho del contenedor)
- **1.5rem** - Máximo (escala máxima)

**Beneficios:**

- ✅ Fuentes se adaptan automáticamente al contenedor
- ✅ No requiere media queries
- ✅ Escalado fluido y natural
- ✅ Ideal para dashboards y layouts complejos

---

## 💡 Mejores Prácticas

### 1. Configuración Global

Centraliza la configuración en `app.config.ts`:

```typescript
// ✅ BIEN: Configuración centralizada
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NUI_CONFIG,
      useValue: {
        calendar: {
          locale: 'es',
          firstDayOfWeek: 1,
          customPresets: [...],
          size: 'md'
        }
      }
    }
  ]
};

// En tus componentes: Solo usa los calendarios
<nui-calendar type="DAY"></nui-calendar>
```

```typescript
// ❌ EVITA: Configuración repetida en cada componente
<nui-calendar
  type="DAY"
  locale="es"
  [firstDayOfWeek]="1"
  [customPresets]="[...]"
  size="md">
</nui-calendar>
```

### 2. Usa Size Responsivo

```typescript
// ✅ BIEN: Auto-responsive
<nui-calendar size="auto"></nui-calendar>

// ❌ EVITA: Size fijo en móviles
<nui-calendar size="lg"></nui-calendar>
```

### 3. Mode Full para Dashboards

```typescript
// ✅ BIEN: Full width con Container Queries
<div style="width: 100%">
  <nui-calendar width="full"></nui-calendar>
</div>

// ❌ EVITA: Ancho fijo en pantallas grandes
<nui-calendar width="compact" size="lg"></nui-calendar>
```

### 4. Presets para Rangos Comunes

```typescript
// ✅ BIEN: Presets útiles
<nui-calendar
  type="RANGE"
  [showPresets]="true"
  [customPresets]="commonRanges">
</nui-calendar>

// ❌ EVITA: Dejar que usuarios escriban rangos manualmente
<nui-calendar type="RANGE"></nui-calendar>
```

### 5. Validación de Fechas

```typescript
// ✅ BIEN: Validar en servidor
if (bookingForm.valid) {
  this.api.submitBooking(formValue).subscribe(/* ... */);
}

// ❌ EVITA: Solo validar en cliente
if (startDate < endDate) {
  // Esto puede ser modificado en DevTools
}
```

### 6. Restringe Rango Seleccionable

```typescript
// ✅ BIEN: Limitar fechas disponibles
<nui-calendar
  [minDate]="today"
  [maxDate]="nextYear">
</nui-calendar>

// ❌ EVITA: Permitir cualquier fecha
<nui-calendar></nui-calendar>
```

### 8. timePickerConfig Apropiado

```typescript
// ✅ BIEN: Configurar según caso de uso
<nui-calendar
  type="DAY"
  [showTimePicker]="true"
  [timePickerConfig]="{
    hourStep: 1,
    minuteStep: 15,
    minTime: { hour: 9 },
    maxTime: { hour: 18 },
    disabledHours: [12, 13]  // Pausa de almuerzo
  }">
</nui-calendar>

// ❌ EVITA: Time picker sin restricciones
<nui-calendar
  type="DAY"
  [showTimePicker]="true">
</nui-calendar>
```

### 9. Manejo de Timezones

```typescript
// ✅ BIEN: Usar UTC en API, mostrar local
const selectedDate = new Date(value.date?.getTime()); // Date objeto local
const isoString = selectedDate.toISOString(); // Enviar a API

// ❌ EVITA: Asumir timezone del navegador
const date = value.date; // puede variar según navegador
```

### 10. Locale según Región

```typescript
// ✅ BIEN: Configurar según idioma del navegador
{
  provide: NUI_CONFIG,
  useValue: {
    calendar: {
      locale: navigator.language || 'es',
      firstDayOfWeek: navigator.language.startsWith('en') ? 0 : 1
    }
  }
}

// ❌ EVITA: Hardcodear locale
{
  provide: NUI_CONFIG,
  useValue: {
    calendar: { locale: 'es' }  // ¿Y si el usuario es de USA?
  }
}
```

---

## 🔧 Troubleshooting

### Problema: Las fechas deshabilitadas no funcionan

**Causa:** El formato de fecha no coincide.

**Solución:**

```typescript
// ✅ Asegúrate de usar Date objects o strings ISO válidos
disabledDates = [
  new Date(2024, 11, 25), // ✅ Date object
  '2024-12-25', // ✅ ISO string
  new Date('2024-12-25'), // ✅ Date from string
];

// ❌ EVITA: Formatos inconsistentes
disabledDates = [
  '25/12/2024', // ❌ Formato no estándar
  '2024-12-25 12:00:00', // ❌ Incluye hora
];
```

### Problema: El calendario no respeta la configuración global

**Causa:** `NUI_CONFIG` no está correctamente inyectado.

**Solución:**

```typescript
// En app.config.ts
import { NUI_CONFIG } from '@nui/components';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NUI_CONFIG, // ✅ Token correcto
      useValue: {
        calendar: {
          /* ... */
        },
      },
    },
  ],
};
```

### Problema: Width="full" no escala correctamente

**Causa:** Contenedor padre no tiene ancho definido.

**Solución:**

```html
<!-- ✅ BIEN: Contenedor con ancho definido -->
<div style="width: 600px; max-width: 100%">
  <nui-calendar width="full"></nui-calendar>
</div>

<!-- ❌ EVITA: Contenedor sin ancho -->
<div>
  <nui-calendar width="full"></nui-calendar>
</div>
```

### Problema: ControlValueAccessor no actualiza form

**Causa:** No estás usando `formControlName` correctamente.

**Solución:**

```typescript
// ✅ BIEN: Usa formControlName
<nui-calendar
  formControlName="date"
  (valueChange)="onDateChange($event)">
</nui-calendar>

onDateChange(value: CalendarValue) {
  // El formulario se actualiza automáticamente
  // gracias a ControlValueAccessor
}
```

---

## 🔗 Componentes Relacionados

- [TimePicker Component](./time-picker.md) - Selector de hora complementario
- [DatePicker Component](./date-picker.md) - Wrapper con input de fecha
- [Button Component](./button.md) - Para controles adicionales
- [Modal Component](./modal.md) - Para calendarios en modal

---

## 📚 Referencias Técnicas

| Concepto                  | Descripción                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| **date-fns**              | Librería de manipulación de fechas (encapsulada en NuiDateAdapter) |
| **Angular Signals**       | API reactiva (input, output, signal, computed, effect)             |
| **CSS Container Queries** | Para responsive design basado en contenedor                        |
| **ControlValueAccessor**  | Integración con Angular Reactive Forms                             |
| **Adapter Pattern**       | Abstracción de librería de fechas (tres capas)                     |
| **WCAG 2.1 AA**           | Estándar de accesibilidad web                                      |

---

## 📋 Changelog

### v2.0.0 (Febrero 2026)

- ✨ **Nuevo**: Configuración global con `CalendarGlobalConfig`
- ✨ **Nuevo**: Patrón de tres capas con `NuiDateAdapter`
- ✨ **Nuevo**: Signals de efectivos (`effectiveSize`, `effectiveShowTodayButton`, etc.)
- 🔧 **Mejorado**: Sincronización con configuración global
- 📚 **Mejorado**: Documentación completa de arquitectura

### v1.5.0 (Octubre 2025)

- ✨ **Nuevo**: Width modes (compact/full) con Container Queries
- ✨ **Nuevo**: Sistema de tabs para presets + timepicker
- 🔧 **Mejorado**: Escalado fluido de fuentes en full mode
- 📦 **Mejorado**: 85% menos código CSS con mixins

### v1.0.0 (2025)

- ✨ Initial release con Angular 17+ Signals API
