import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Examples del componente TimePicker
 * Contiene todas las demostraciones interactivas
 */
export const TIME_PICKER_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.timePicker.basic.title',
    description: 'components.timePicker.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'modes',
    title: 'components.timePicker.modes.title',
    description: 'components.timePicker.modes.description',
    note: {
      type: 'info',
      content: 'components.timePicker.modes.note',
    },
    anchor: 'modes',
    examples: [
      {
        title: 'HOUR_24',
        code: `<nui-time-picker mode="HOUR_24"></nui-time-picker>`,
        language: 'html',
      },
      {
        title: 'HOUR_12',
        code: `<nui-time-picker mode="HOUR_12"></nui-time-picker>`,
        language: 'html',
      },
      {
        title: 'HOUR_MINUTE_24',
        code: `<nui-time-picker mode="HOUR_MINUTE_24"></nui-time-picker>`,
        language: 'html',
      },
      {
        title: 'HOUR_MINUTE_12',
        code: `<nui-time-picker mode="HOUR_MINUTE_12"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'presets',
    title: 'components.timePicker.presets.title',
    description: 'components.timePicker.presets.description',
    note: {
      type: 'info',
      content: 'components.timePicker.presets.note',
    },
    anchor: 'presets',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `presets: TimePreset[] = [
  { label: 'Ahora', time: { hour: new Date().getHours(), minute: new Date().getMinutes() } },
  { label: 'Desayuno', time: { hour: 8, minute: 0 }, icon: 'ri-cup-line' },
  { label: 'Almuerzo', time: { hour: 14, minute: 0 }, icon: 'ri-restaurant-line' },
  { label: 'Cena', time: { hour: 21, minute: 0 }, icon: 'ri-moon-line' },
];

config: TimePickerConfig = {
  presets: this.presets,
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker [config]="config"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'steps',
    title: 'components.timePicker.steps.title',
    description: 'components.timePicker.steps.description',
    note: {
      type: 'info',
      content: 'components.timePicker.steps.note',
    },
    anchor: 'steps',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimePickerConfig = {
  hourStep: 2,      // Saltos de 2 horas
  minuteStep: 15,   // Saltos de 15 minutos
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker [config]="config"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'time-range',
    title: 'components.timePicker.timeRange.title',
    description: 'components.timePicker.timeRange.description',
    note: {
      type: 'info',
      content: 'components.timePicker.timeRange.note',
    },
    anchor: 'time-range',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimePickerConfig = {
  minTime: { hour: 9, minute: 0 },
  maxTime: { hour: 18, minute: 0 },
  showRangeIndicator: true,
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker [config]="config"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled-times',
    title: 'components.timePicker.disabledTimes.title',
    description: 'components.timePicker.disabledTimes.description',
    note: {
      type: 'info',
      content: 'components.timePicker.disabledTimes.note',
    },
    anchor: 'disabled-times',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimePickerConfig = {
  disabledHours: [12, 13, 14],  // Bloquear mediodía
  disabledMinutes: [15, 45],     // Bloquear ciertos minutos
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker [config]="config"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'duration-mode',
    title: 'components.timePicker.durationMode.title',
    description: 'components.timePicker.durationMode.description',
    note: {
      type: 'info',
      content: 'components.timePicker.durationMode.note',
    },
    anchor: 'duration-mode',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `config: TimePickerConfig = {
  duration: {
    maxHours: 8,
    showSeconds: true,
  },
};`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker mode="DURATION" [config]="config"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'default-strategies',
    title: 'components.timePicker.defaultStrategies.title',
    description: 'components.timePicker.defaultStrategies.description',
    note: {
      type: 'info',
      content: 'components.timePicker.defaultStrategies.note',
    },
    anchor: 'default-strategies',
    examples: [
      {
        title: 'Now',
        code: `<nui-time-picker defaultStrategy="now"></nui-time-picker>`,
        language: 'html',
      },
      {
        title: 'Smart (current time + 30 min rounded)',
        code: `<nui-time-picker 
  defaultStrategy="smart" 
  [smartOffset]="30"
></nui-time-picker>`,
        language: 'html',
      },
      {
        title: 'Custom',
        code: `<nui-time-picker 
  defaultStrategy="custom"
  [defaultValue]="{ hour: 9, minute: 0 }"
></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'disabled',
    title: 'components.timePicker.disabled.title',
    description: 'components.timePicker.disabled.description',
    note: {
      type: 'info',
      content: 'components.timePicker.disabled.note',
    },
    anchor: 'disabled',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<nui-time-picker [disabled]="true"></nui-time-picker>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'reactive-forms',
    title: 'components.timePicker.reactiveForms.title',
    description: 'components.timePicker.reactiveForms.description',
    note: {
      type: 'info',
      content: 'components.timePicker.reactiveForms.note',
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
        code: `<nui-time-picker [formControl]="timeControl"></nui-time-picker>

<p>Selected time: {{ timeControl.value | json }}</p>`,
        language: 'html',
      },
    ],
  },
];
