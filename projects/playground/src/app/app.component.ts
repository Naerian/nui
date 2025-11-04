import { Component } from '@angular/core';
import { ButtonComponent, ButtonGroupComponent, ButtonGroupOption } from 'nui';
import { ThemeService, aura, dopamine, corporate, minimal, neon, warm, sunset, twilight } from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, ButtonGroupComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NUI Theme System - Hybrid Approach';

  buttonGroups: ButtonGroupOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Middle', value: 'middle' },
    { label: 'Right', value: 'right' },
  ];

  buttonGroupsWithDisabled: ButtonGroupOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Middle', value: 'middle', disabled: true },
    { label: 'Right', value: 'right' },
  ];

  buttonGroupsWithIcons: ButtonGroupOption[] = [
    { label: 'Left', value: 'left', icon: 'ri-arrow-left-line' },
    { label: 'Middle', value: 'middle', icon: 'ri-arrow-right-line' },
    { label: 'Right', value: 'right', icon: 'ri-arrow-up-line' },
  ];

  constructor(private themeService: ThemeService) {}

  switchTheme(presetName: string) {
    const presets: any = { aura, dopamine, corporate, minimal, neon, warm, sunset, twilight };
    this.themeService.usePreset(presets[presetName]);
  }
}
