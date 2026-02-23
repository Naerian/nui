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

  currentColors = computed(() => this.themeService.colors());
  currentPreset = computed(() => this.themeService.currentPreset());
  isDarkMode = computed(() => this.themeService.isDarkMode());

  // Layer 1: Semantic Colors (from preset)
  semanticColors = [
    {
      key: 'primary',
      icon: 'ri-fingerprint-line',
      purpose: 'pages.theming.architecture.layer1.primary',
    },
    {
      key: 'secondary',
      icon: 'ri-contrast-2-line',
      purpose: 'pages.theming.architecture.layer1.secondary',
    },
    { key: 'accent', icon: 'ri-star-line', purpose: 'pages.theming.architecture.layer1.accent' },
    {
      key: 'success',
      icon: 'ri-checkbox-circle-line',
      purpose: 'pages.theming.architecture.layer1.success',
    },
    { key: 'info', icon: 'ri-information-line', purpose: 'pages.theming.architecture.layer1.info' },
    {
      key: 'warning',
      icon: 'ri-error-warning-line',
      purpose: 'pages.theming.architecture.layer1.warning',
    },
    {
      key: 'danger',
      icon: 'ri-close-circle-line',
      purpose: 'pages.theming.architecture.layer1.danger',
    },
    {
      key: 'neutral',
      icon: 'ri-gradienter-line',
      purpose: 'pages.theming.architecture.layer1.neutral',
    },
  ];

  // Layer 2: Structural Variables
  structuralGroups = [
    {
      title: 'pages.theming.architecture.layer2.surfaces.title',
      icon: 'ri-layout-line',
      vars: [
        { name: '--nui-surface', desc: 'pages.theming.architecture.layer2.surfaces.surface' },
        {
          name: '--nui-surface-secondary',
          desc: 'pages.theming.architecture.layer2.surfaces.surfaceSecondary',
        },
        {
          name: '--nui-surface-neutral',
          desc: 'pages.theming.architecture.layer2.surfaces.surfaceNeutral',
        },
      ],
    },
    {
      title: 'pages.theming.architecture.layer2.text.title',
      icon: 'ri-text',
      vars: [
        { name: '--nui-text-primary', desc: 'pages.theming.architecture.layer2.text.primary' },
        { name: '--nui-text-secondary', desc: 'pages.theming.architecture.layer2.text.secondary' },
        { name: '--nui-text-weak', desc: 'pages.theming.architecture.layer2.text.weak' },
        { name: '--nui-text-disabled', desc: 'pages.theming.architecture.layer2.text.disabled' },
      ],
    },
    {
      title: 'pages.theming.architecture.layer2.borders.title',
      icon: 'ri-border-outer',
      vars: [
        { name: '--nui-border-high', desc: 'pages.theming.architecture.layer2.borders.high' },
        { name: '--nui-border-default', desc: 'pages.theming.architecture.layer2.borders.default' },
        { name: '--nui-border-subtle', desc: 'pages.theming.architecture.layer2.borders.subtle' },
      ],
    },
  ];

  // Layer 3: Variant Generation
  variantTypes = [
    {
      type: 'tints',
      icon: 'ri-sun-line',
      title: 'pages.theming.architecture.layer3.tints.title',
      description: 'pages.theming.architecture.layer3.tints.description',
      examples: ['tint-95', 'tint-90', 'tint-80', 'tint-70', 'tint-60', 'tint-50'],
    },
    {
      type: 'shades',
      icon: 'ri-moon-line',
      title: 'pages.theming.architecture.layer3.shades.title',
      description: 'pages.theming.architecture.layer3.shades.description',
      examples: ['shade-10', 'shade-20', 'shade-30', 'shade-40', 'shade-50'],
    },
    {
      type: 'alpha',
      icon: 'ri-contrast-drop-line',
      title: 'pages.theming.architecture.layer3.alpha.title',
      description: 'pages.theming.architecture.layer3.alpha.description',
      examples: ['alpha-10', 'alpha-30', 'alpha-50', 'alpha-70', 'alpha-90'],
    },
  ];

  // Layer 4: Shadow System
  shadowPrimitives = [
    {
      name: '--nui-box-shadow-xs',
      level: 'XS',
      usage: 'pages.theming.architecture.layer4.primitives.xs',
    },
    {
      name: '--nui-box-shadow-sm',
      level: 'SM',
      usage: 'pages.theming.architecture.layer4.primitives.sm',
    },
    {
      name: '--nui-box-shadow-md',
      level: 'MD',
      usage: 'pages.theming.architecture.layer4.primitives.md',
    },
    {
      name: '--nui-box-shadow-lg',
      level: 'LG',
      usage: 'pages.theming.architecture.layer4.primitives.lg',
    },
    {
      name: '--nui-box-shadow-xl',
      level: 'XL',
      usage: 'pages.theming.architecture.layer4.primitives.xl',
    },
  ];

  shadowAliases = [
    {
      name: '--nui-shadow-field',
      maps: 'xs',
      usage: 'pages.theming.architecture.layer4.aliases.field',
    },
    {
      name: '--nui-shadow-container',
      maps: 'sm',
      usage: 'pages.theming.architecture.layer4.aliases.container',
    },
    {
      name: '--nui-shadow-interactive',
      maps: 'sm',
      usage: 'pages.theming.architecture.layer4.aliases.interactive',
    },
    {
      name: '--nui-shadow-elevated',
      maps: 'lg',
      usage: 'pages.theming.architecture.layer4.aliases.elevated',
    },
  ];

  // Layer 5: Component Variables
  componentExamples = [
    {
      component: 'Button',
      icon: 'ri-checkbox-blank-circle-line',
      description: 'pages.theming.architecture.layer5.button.description',
      variants: [
        { variant: 'Solid', vars: ['bg', 'hover-bg', 'active-bg', 'text'] },
        { variant: 'Outline', vars: ['border', 'hover-bg', 'hover-border', 'text'] },
        { variant: 'Ghost', vars: ['hover-bg', 'active-bg', 'text'] },
      ],
    },
    {
      component: 'Toast',
      icon: 'ri-notification-line',
      description: 'pages.theming.architecture.layer5.toast.description',
      variants: [
        {
          variant: 'Success / Info / Warning / Danger',
          vars: ['bg', 'border', 'title', 'text', 'progress', 'icon'],
        },
      ],
    },
    {
      component: 'Paginator',
      icon: 'ri-pages-line',
      description: 'pages.theming.architecture.layer5.paginator.description',
      variants: [
        {
          variant: 'Page Buttons (Shapeshifter)',
          vars: ['inactive-bg', 'active-bg', 'active-border', 'active-text'],
        },
        { variant: 'Nav Buttons (Always Ghost)', vars: ['hover-bg', 'text'] },
      ],
    },
  ];

  // Performance Layer
  performanceFeatures = [
    {
      icon: 'ri-flashlight-line',
      title: 'pages.theming.architecture.performance.cache.title',
      description: 'pages.theming.architecture.performance.cache.description',
    },
    {
      icon: 'ri-time-line',
      title: 'pages.theming.architecture.performance.pregeneration.title',
      description: 'pages.theming.architecture.performance.pregeneration.description',
    },
    {
      icon: 'ri-layout-masonry-line',
      title: 'pages.theming.architecture.performance.containment.title',
      description: 'pages.theming.architecture.performance.containment.description',
    },
  ];

  getColorValue(colorKey: string): string {
    return (this.currentColors() as any)[colorKey] || '#000000';
  }

  getVariantColor(colorKey: string, variant: string): string {
    const varName = `--nui-${colorKey}-${variant}`;
    return this.getCSSVar(varName);
  }

  getCSSVar(varName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }

  getContrastColor(bgColor: string): string {
    return this.themeService.getContrastColor(bgColor);
  }
}
