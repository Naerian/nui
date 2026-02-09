import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent {
  steps = [
    {
      number: 1,
      titleKey: 'pages.theming.customization.steps.step1.title',
      descriptionKey: 'pages.theming.customization.steps.step1.description',
      codeKey: 'pages.theming.customization.steps.step1.code',
    },
    {
      number: 2,
      titleKey: 'pages.theming.customization.steps.step2.title',
      descriptionKey: 'pages.theming.customization.steps.step2.description',
      codeKey: 'pages.theming.customization.steps.step2.code',
    },
    {
      number: 3,
      titleKey: 'pages.theming.customization.steps.step3.title',
      descriptionKey: 'pages.theming.customization.steps.step3.description',
      codeKey: 'pages.theming.customization.steps.step3.code',
    },
  ];

  grayScaleExample = `export const customTheme: ThemePreset = {
  name: 'custom',
  colors: { 
    light: { /* ... */ },
    dark: { /* ... */ }
  },
  grays: {
    50: '#fafafa',
    100: '#f0f0f0',
    200: '#e0e0e0',
    300: '#c8c8c8',
    400: '#a0a0a0',
    500: '#787878',
    600: '#585858',
    700: '#404040',
    800: '#282828',
    900: '#181818'
  }
};`;

  bestPractices = [
    'pages.theming.customization.bestPractices.practice1',
    'pages.theming.customization.bestPractices.practice2',
    'pages.theming.customization.bestPractices.practice3',
    'pages.theming.customization.bestPractices.practice4',
    'pages.theming.customization.bestPractices.practice5',
  ];

  advancedTips = [
    {
      titleKey: 'pages.theming.customization.advanced.tip1.title',
      descriptionKey: 'pages.theming.customization.advanced.tip1.description',
      icon: 'ri-palette-line',
    },
    {
      titleKey: 'pages.theming.customization.advanced.tip2.title',
      descriptionKey: 'pages.theming.customization.advanced.tip2.description',
      icon: 'ri-contrast-2-line',
    },
    {
      titleKey: 'pages.theming.customization.advanced.tip3.title',
      descriptionKey: 'pages.theming.customization.advanced.tip3.description',
      icon: 'ri-test-tube-line',
    },
  ];
}
