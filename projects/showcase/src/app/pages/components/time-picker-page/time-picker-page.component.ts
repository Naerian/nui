import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent, TimePickerConfig, TimeValue, DurationValue, TimePreset, TimePickerItemDirective, TimePickerFooterDirective, TimePickerHeaderDirective, ButtonDirective } from 'nui';
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
    ButtonDirective,
    TranslateModule,
    TimePickerComponent,
    TimePickerItemDirective,
    TimePickerFooterDirective,
    TimePickerHeaderDirective,
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
        'custom-footer',
        'custom-header',
        'custom-item',
        'disabled',
        'reactive-forms',
        'overlay-integration',
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
        'api-content-directives',
        'api-item-context',
        'api-footer-context',
        'api-header-context',
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
    {
      id: 'i18n',
      label: 'common.tabs.i18n',
      icon: 'ri-translate-2',
      sections: ['i18n-tokens', 'i18n-duration-presets', 'i18n-a11y-tokens'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-accessibility-line',
      sections: ['a11y-roles', 'a11y-naming', 'a11y-keyboard', 'a11y-templates'],
    },
    {
      id: 'globalconfig',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-setup', 'global-config-defaults', 'global-config-priority'],
    },
  ];

  // Examples data
  selectedTime = signal<TimeValue | null>(null);
  selectedTimeWithPresets = signal<TimeValue | null>(null);
  timeForCustomFooter = signal<TimeValue | null>(null);
  timeForCustomHeader = signal<TimeValue | null>(null);
  timeForCustomItem = signal<TimeValue | null>(null);
  
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

  // Overlay integration example
  autoCloseEventCount = signal<number>(0);

  onSelectFinished(): void {
    this.autoCloseEventCount.update(n => n + 1);
  }

  // Event handlers
  onTimeChange(time: TimeValue | null): void {
    this.selectedTime.set(time);
  }

  onTimeWithPresetsChange(time: TimeValue | DurationValue | null): void {
    this.selectedTimeWithPresets.set(time as TimeValue | null);
  }

  onCustomFooterChange(time: TimeValue | DurationValue | null): void {
    this.timeForCustomFooter.set(time as TimeValue | null);
  }

  onCustomHeaderChange(time: TimeValue | DurationValue | null): void {
    this.timeForCustomHeader.set(time as TimeValue | null);
  }

  onCustomItemChange(time: TimeValue | DurationValue | null): void {
    this.timeForCustomItem.set(time as TimeValue | null);
  }
}
