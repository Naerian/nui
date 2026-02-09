import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'nui';

@Component({
  selector: 'app-theme-architecture',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
})
export class ThemeArchitectureComponent {
  private themeService = inject(ThemeService);

  semanticColors = [
    { key: 'primary', purpose: 'pages.theming.architecture.semantic.primary' },
    { key: 'secondary', purpose: 'pages.theming.architecture.semantic.secondary' },
    { key: 'accent', purpose: 'pages.theming.architecture.semantic.accent' },
    { key: 'success', purpose: 'pages.theming.architecture.semantic.success' },
    { key: 'info', purpose: 'pages.theming.architecture.semantic.info' },
    { key: 'warning', purpose: 'pages.theming.architecture.semantic.warning' },
    { key: 'danger', purpose: 'pages.theming.architecture.semantic.danger' },
    { key: 'neutral', purpose: 'pages.theming.architecture.semantic.neutral' },
  ];

  currentColors = computed(() => this.themeService.colors());

  variantTypes = [
    {
      type: 'tints',
      titleKey: 'pages.theming.architecture.variants.tints.title',
      descriptionKey: 'pages.theming.architecture.variants.tints.description',
      examples: ['tint-95', 'tint-90', 'tint-80', 'tint-70', 'tint-60', 'tint-50'],
    },
    {
      type: 'shades',
      titleKey: 'pages.theming.architecture.variants.shades.title',
      descriptionKey: 'pages.theming.architecture.variants.shades.description',
      examples: ['shade-10', 'shade-20', 'shade-30', 'shade-40', 'shade-50'],
    },
    {
      type: 'alpha',
      titleKey: 'pages.theming.architecture.variants.alpha.title',
      descriptionKey: 'pages.theming.architecture.variants.alpha.description',
      examples: ['alpha-10', 'alpha-30', 'alpha-50', 'alpha-70', 'alpha-90'],
    },
  ];

  structuralVariables = [
    {
      category: 'pages.theming.architecture.structural.backgrounds',
      vars: ['--nui-bg-primary', '--nui-bg-secondary', '--nui-bg-tertiary'],
    },
    {
      category: 'pages.theming.architecture.structural.text',
      vars: ['--nui-text-primary', '--nui-text-secondary', '--nui-text-tertiary', '--nui-text-disabled'],
    },
    {
      category: 'pages.theming.architecture.structural.borders',
      vars: ['--nui-border-primary', '--nui-border-secondary', '--nui-border-strong', '--nui-border-weak'],
    },
    {
      category: 'pages.theming.architecture.structural.shadows',
      vars: ['--nui-box-shadow--xs', '--nui-box-shadow--sm', '--nui-box-shadow--md', '--nui-box-shadow--lg', '--nui-box-shadow--xl'],
    },
  ];

  componentSpecificExamples = [
    {
      component: 'Button',
      variablesKey: 'pages.theming.architecture.components.button',
      examples: [
        '--nui-btn-primary-solid-bg',
        '--nui-btn-primary-solid-hover-bg',
        '--nui-btn-primary-outline-border',
        '--nui-btn-primary-ghost-hover-bg',
      ],
    },
    {
      component: 'Avatar',
      variablesKey: 'pages.theming.architecture.components.avatar',
      examples: [
        '--nui-avatar-primary-bg',
        '--nui-avatar-primary-color',
        '--nui-avatar-default-bg',
      ],
    },
    {
      component: 'Toast',
      variablesKey: 'pages.theming.architecture.components.toast',
      examples: [
        '--nui-toast-success-bg',
        '--nui-toast-success-border',
        '--nui-toast-success-title',
        '--nui-toast-success-progress',
      ],
    },
  ];

  getColorValue(colorKey: string): string {
    return (this.currentColors() as any)[colorKey] || '#000000';
  }

  getVariantExample(colorKey: string, variant: string): string {
    const varName = `--nui-color-${colorKey}-${variant}`;
    const el = document.documentElement;
    return getComputedStyle(el).getPropertyValue(varName).trim() || '#cccccc';
  }

  getCSSVariableValue(varName: string): string {
    const el = document.documentElement;
    return getComputedStyle(el).getPropertyValue(varName).trim();
  }
}
