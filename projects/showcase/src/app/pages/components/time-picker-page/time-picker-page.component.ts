import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent, TimePickerConfig, TimeValue, DurationValue, TimePreset } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { TIME_PICKER_PAGE_CONFIG } from './time-picker-page.config';

@Component({
  selector: 'app-time-picker-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TimePickerComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './time-picker-page.component.html',
  styleUrls: ['./time-picker-page.component.scss'],
})
export class TimePickerPageComponent extends BaseComponentPage {
  // Configuration from external file
  override pageConfig = TIME_PICKER_PAGE_CONFIG;

  // Tabs configuration
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'modes',
        'presets',
        'steps',
        'time-range',
        'disabled-times',
        'duration-mode',
        'default-strategies',
        'disabled',
        'reactive-forms',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: [
        'api-inputs',
        'api-outputs',
        'api-config',
        'api-duration-config',
        'api-time-value',
        'api-duration-value',
        'api-time-preset',
        'api-duration-preset',
        'api-time-picker-mode',
        'api-time-picker-strategy',
        'api-time-picker-variant',
        'api-time-picker-value',
        'api-methods',
      ],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-sizes', 'theming-structure', 'theming-customization'],
    },
  ];

  // Examples data
  selectedTime = signal<TimeValue | null>(null);
  selectedTimeWithPresets = signal<TimeValue | null>(null);
  
  // Presets example
  presets: TimePreset[] = [
    { label: 'Ahora', time: { hour: new Date().getHours(), minute: new Date().getMinutes() }, icon: 'ri-time-line' },
    { label: 'Desayuno', time: { hour: 8, minute: 0 }, icon: 'ri-cup-line' },
    { label: 'Almuerzo', time: { hour: 14, minute: 0 }, icon: 'ri-restaurant-line' },
    { label: 'Cena', time: { hour: 21, minute: 0 }, icon: 'ri-moon-line' },
  ];

  configWithPresets: TimePickerConfig = {
    presets: this.presets,
  };

  // Steps example
  configWithSteps: TimePickerConfig = {
    hourStep: 2,
    minuteStep: 15,
  };

  // Time range example
  configWithRange: TimePickerConfig = {
    minTime: { hour: 9, minute: 0 },
    maxTime: { hour: 18, minute: 0 },
    showRangeIndicator: true,
  };

  // Disabled times example
  configWithDisabled: TimePickerConfig = {
    disabledHours: [12, 13, 14],
    disabledMinutes: [15, 45],
  };

  // Duration mode example
  configDuration: TimePickerConfig = {
    duration: {
      maxHours: 8,
      showSeconds: true,
    },
  };

  // Reactive forms example
  timeControl = new FormControl<TimeValue | null>(null);

  // Event handlers
  onTimeChange(time: TimeValue | null): void {
    this.selectedTime.set(time);
  }

  onTimeWithPresetsChange(time: TimeValue | DurationValue | null): void {
    this.selectedTimeWithPresets.set(time as TimeValue | null);
  }
}
