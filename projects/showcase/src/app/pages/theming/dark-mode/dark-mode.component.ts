import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent {
  themeService = inject(ThemeService);
  
  currentStrategy = signal(this.themeService.getDarkModeStrategy());

  strategies = [
    {
      value: 'manual',
      titleKey: 'pages.theming.darkMode.strategies.manual.title',
      descriptionKey: 'pages.theming.darkMode.strategies.manual.description',
      icon: 'ri-hand-coin-line',
      features: [
        'pages.theming.darkMode.strategies.manual.feat1',
        'pages.theming.darkMode.strategies.manual.feat2',
        'pages.theming.darkMode.strategies.manual.feat3',
      ]
    },
    {
      value: 'system',
      titleKey: 'pages.theming.darkMode.strategies.system.title',
      descriptionKey: 'pages.theming.darkMode.strategies.system.description',
      icon: 'ri-computer-line',
      features: [
        'pages.theming.darkMode.strategies.system.feat1',
        'pages.theming.darkMode.strategies.system.feat2',
      ]
    },
    {
      value: 'auto',
      titleKey: 'pages.theming.darkMode.strategies.auto.title',
      descriptionKey: 'pages.theming.darkMode.strategies.auto.description',
      icon: 'ri-loop-left-line',
      features: [
        'pages.theming.darkMode.strategies.auto.feat1',
        'pages.theming.darkMode.strategies.auto.feat2',
      ]
    },
  ];

  codeExamples: Record<string, string> = {
    manual: `provideNUI({
  preset: ocean,
  darkMode: 'manual'
});

// En el componente:
themeService.setDarkMode(true);
themeService.toggleDarkMode();`,
    system: `provideNUI({
  preset: aura,
  darkMode: 'system'
});`,
    auto: `provideNUI({
  preset: twilight,
  darkMode: 'auto'
});`,
    customClass: `provideNUI({
  preset: corporate,
  darkMode: 'manual',
  darkModeClass: 'theme-dark'
});`
  };

  getCodeExample(key: string): string {
    return this.codeExamples[key] || '';
  }

  toggleDarkMode(): void {
    if (this.currentStrategy() === 'manual') {
      this.themeService.toggleDarkMode();
    }
  }

  setDarkMode(enabled: boolean): void {
    if (this.currentStrategy() === 'manual') {
      this.themeService.setDarkMode(enabled);
    }
  }
}
