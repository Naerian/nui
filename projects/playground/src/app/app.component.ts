import { Component } from '@angular/core';
import { ButtonComponent } from '../../../nui/src/public-api';
import { ThemeService, aura, dopamine, corporate, minimal, neon, warm } from '../../../nui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NUI Theme System - Hybrid Approach';

  constructor(private themeService: ThemeService) {}

  switchTheme(presetName: string) {
    const presets: any = { aura, dopamine, corporate, minimal, neon, warm };
    this.themeService.usePreset(presets[presetName]);
  }
}
