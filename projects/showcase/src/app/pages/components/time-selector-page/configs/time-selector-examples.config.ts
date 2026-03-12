import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Examples del componente TimeSelector
 * Contiene todas las demostraciones interactivas
 */
export const TIME_SELECTOR_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.timeSelector.basic.title',
    description: 'components.timeSelector.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'modes',
    title: 'components.timeSelector.modes.title',
    description: 'components.timeSelector.modes.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.modes.note',
    },
    anchor: 'modes',
    examples: [
      {
        title: '23-hour format',
        code: `<nui-time-selector mode="HOUR_24"></nui-time-selector>`,
        language: 'html',
      },
      {
        title: '12-hour format',
        code: `<nui-time-selector mode="HOUR_12"></nui-time-selector>`,
        language: 'html',
      },
      {
        title: '24-hour format with minutes',
        code: `<nui-time-selector mode="HOUR_MINUTE_24"></nui-time-selector>`,
        language: 'html',
      },
      {
        title: '12-hour format with minutes',
        code: `<nui-time-selector mode="HOUR_MINUTE_12"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'presets',
    title: 'components.timeSelector.presets.title',
    description: 'components.timeSelector.presets.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.presets.note',
    },
    anchor: 'presets',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `presets: TimePreset[] = [
  { label: 'Now', time: { hour: new Date().getHours(), minute: new Date().getMinutes() } },
  { label: 'Breakfast', time: { hour: 8, minute: 0 }, icon: 'ri-cup-line' },
  { label: 'Lunch', time: { hour: 14, minute: 0 }, icon: 'ri-restaurant-line' },
  { label: 'Dinner', time: { hour: 21, minute: 0 }, icon: 'ri-moon-line' },
];

config: TimeSelectorConfig = {
  presets: this.presets,
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [config]="config"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'steps',
    title: 'components.timeSelector.steps.title',
    description: 'components.timeSelector.steps.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.steps.note',
    },
    anchor: 'steps',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimeSelectorConfig = {
  hourStep: 2,      // 2-hour increments
  minuteStep: 15,   // 15-minute increments
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [config]="config"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'time-range',
    title: 'components.timeSelector.timeRange.title',
    description: 'components.timeSelector.timeRange.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.timeRange.note',
    },
    anchor: 'time-range',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimeSelectorConfig = {
  minTime: { hour: 9, minute: 0 },
  maxTime: { hour: 18, minute: 0 },
  showRangeIndicator: true,
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [config]="config"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled-times',
    title: 'components.timeSelector.disabledTimes.title',
    description: 'components.timeSelector.disabledTimes.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.disabledTimes.note',
    },
    anchor: 'disabled-times',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimeSelectorConfig = {
  disabledHours: [12, 13, 14],  // Block noon
  disabledMinutes: [15, 45],     // Block certain minutes
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [config]="config"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'duration-mode',
    title: 'components.timeSelector.durationMode.title',
    description: 'components.timeSelector.durationMode.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.durationMode.note',
    },
    anchor: 'duration-mode',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimeSelectorConfig = {
  duration: {
    maxHours: 8,
    showSeconds: true,
  },
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector mode="DURATION" [config]="config"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'default-strategies',
    title: 'components.timeSelector.defaultStrategies.title',
    description: 'components.timeSelector.defaultStrategies.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.defaultStrategies.note',
    },
    anchor: 'default-strategies',
    examples: [
      {
        title: 'Now',
        code: `<nui-time-selector defaultStrategy="now"></nui-time-selector>`,
        language: 'html',
      },
      {
        title: 'Smart (current time + 30 min rounded)',
        code: `<nui-time-selector 
  defaultStrategy="smart" 
  [smartOffset]="30"
></nui-time-selector>`,
        language: 'html',
      },
      {
        title: 'Custom',
        code: `<nui-time-selector 
  defaultStrategy="custom"
  [defaultValue]="{ hour: 9, minute: 0 }"
></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled',
    title: 'components.timeSelector.disabled.title',
    description: 'components.timeSelector.disabled.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.disabled.note',
    },
    anchor: 'disabled',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [disabled]="true"></nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'custom-footer',
    title: 'components.timeSelector.customFooter.title',
    description: 'components.timeSelector.customFooter.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.customFooter.note',
    },
    anchor: 'custom-footer',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { TimeSelectorFooterDirective } from 'nui';

// En el componente consumidor:
timeForCustomFooter = signal<TimeValue | null>(null);`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector (valueChange)="onCustomFooterChange($event)">
  <ng-template nuiTimeSelectorFooter let-currentTime let-actions="actions">
    <div class="my-footer">
      <span>{{ currentTime ? currentTime.hour + ':' + (currentTime.minute | number:'2.0-0') : '--:--' }}</span>
      <div class="my-footer__actions">
        <button type="button" (click)="actions.setToNow()">Ahora</button>
        <button type="button" (click)="actions.clear()">Limpiar</button>
      </div>
    </div>
  </ng-template>
</nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'custom-header',
    title: 'components.timeSelector.customHeader.title',
    description: 'components.timeSelector.customHeader.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.customHeader.note',
    },
    anchor: 'custom-header',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { TimeSelectorHeaderDirective } from 'nui';

// En el componente consumidor:
timeForCustomHeader = signal<TimeValue | null>(null);`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector (valueChange)="onCustomHeaderChange($event)">
  <ng-template
    nuiTimeSelectorHeader
    let-currentTime
    let-formattedTime="formattedTime"
    let-normalization="normalization"
    let-range="range"
  >
    <div class="my-header">
      <strong>{{ formattedTime }}</strong>
      @if (normalization) {
        <small>Normalizado desde {{ normalization.original }}</small>
      }
      @if (range.min && range.max) {
        <span>Rango: {{ range.min.hour }}:00 — {{ range.max.hour }}:00</span>
      }
    </div>
  </ng-template>
</nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'custom-item',
    title: 'components.timeSelector.customItem.title',
    description: 'components.timeSelector.customItem.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.customItem.note',
    },
    anchor: 'custom-item',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `import { TimeSelectorItemDirective } from 'nui';`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector>
  <ng-template nuiTimeSelectorItem
    let-value
    let-type="type"
    let-selected="selected"
  >
    <span [style.fontWeight]="selected ? '700' : '400'">
      {{ value }}{{ type === 'hour' ? 'h' : 'm' }}
    </span>
  </ng-template>
</nui-time-selector>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'reactive-forms',
    title: 'components.timeSelector.reactiveForms.title',
    description: 'components.timeSelector.reactiveForms.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.reactiveForms.note',
    },
    anchor: 'reactive-forms',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `timeControl = new FormControl<TimeValue | null>(null);`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-selector [formControl]="timeControl"></nui-time-selector>

<p>Selected time: {{ timeControl.value | json }}</p>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'overlay-integration',
    title: 'components.timeSelector.overlayIntegration.title',
    description: 'components.timeSelector.overlayIntegration.description',
    note: {
      type: 'info',
      content: 'components.timeSelector.overlayIntegration.note',
    },
    anchor: 'overlay-integration',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<!-- Dentro del host del datepicker/overlay -->
<nui-time-selector
  [autoClose]="true"
  (selectFinished)="closePicker()"
  (valueChange)="onTimeChange($event)"
></nui-time-selector>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `isPickerOpen = signal<boolean>(false);
selectedTime = signal<TimeValue | null>(null);

onTimeChange(time: TimeValue | null): void {
  this.selectedTime.set(time);
}

// Llamado automáticamente al completar la selección cuando autoClose=true
closePicker(): void {
  this.isPickerOpen.set(false);
}`,
        language: 'typescript',
      },
    ],
  },
];
