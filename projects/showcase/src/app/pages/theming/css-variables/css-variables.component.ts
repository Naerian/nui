import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-css-variables',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './css-variables.component.html',
  styleUrls: ['./css-variables.component.scss'],
})
export class CssVariablesComponent {
  searchTerm = signal('');
  selectedCategory = signal('all');

  categories = [
    { value: 'all', labelKey: 'pages.theming.cssVars.categories.all' },
    { value: 'semantic', labelKey: 'pages.theming.cssVars.categories.semantic' },
    { value: 'structural', labelKey: 'pages.theming.cssVars.categories.structural' },
    { value: 'button', labelKey: 'pages.theming.cssVars.categories.button' },
    { value: 'avatar', labelKey: 'pages.theming.cssVars.categories.avatar' },
    { value: 'toast', labelKey: 'pages.theming.cssVars.categories.toast' },
    { value: 'paginator', labelKey: 'pages.theming.cssVars.categories.paginator' },
    { value: 'shadows', labelKey: 'pages.theming.cssVars.categories.shadows' },
  ];

  variableGroups = [
    {
      category: 'semantic',
      titleKey: 'pages.theming.cssVars.groups.semantic',
      variables: [
        '--nui-primary', '--nui-secondary', '--nui-accent', '--nui-success',
        '--nui-info', '--nui-warning', '--nui-danger', '--nui-neutral',
        '--nui-primary-contrast', '--nui-secondary-contrast', '--nui-accent-contrast',
        '--nui-success-contrast', '--nui-info-contrast', '--nui-warning-contrast',
        '--nui-danger-contrast', '--nui-neutral-contrast',
      ],
    },
    {
      category: 'structural',
      titleKey: 'pages.theming.cssVars.groups.structural',
      variables: [
        '--nui-bg-primary', '--nui-bg-secondary', '--nui-bg-tertiary',
        '--nui-text-primary', '--nui-text-secondary', '--nui-text-tertiary', '--nui-text-disabled',
        '--nui-border-primary', '--nui-border-secondary', '--nui-border-strong', '--nui-border-weak',
      ],
    },
    {
      category: 'button',
      titleKey: 'pages.theming.cssVars.groups.button',
      variables: [
        '--nui-btn-primary-solid-bg', '--nui-btn-primary-solid-hover-bg', '--nui-btn-primary-solid-text',
        '--nui-btn-primary-outline-border', '--nui-btn-primary-outline-hover-bg', '--nui-btn-primary-outline-text',
        '--nui-btn-primary-ghost-text', '--nui-btn-primary-ghost-hover-bg',
      ],
    },
    {
      category: 'avatar',
      titleKey: 'pages.theming.cssVars.groups.avatar',
      variables: [
        '--nui-avatar-primary-bg', '--nui-avatar-primary-color', '--nui-avatar-primary-hover',
        '--nui-avatar-default-bg', '--nui-avatar-default-color',
      ],
    },
    {
      category: 'toast',
      titleKey: 'pages.theming.cssVars.groups.toast',
      variables: [
        '--nui-toast-success-bg', '--nui-toast-success-border', '--nui-toast-success-title',
        '--nui-toast-danger-bg', '--nui-toast-danger-border', '--nui-toast-danger-title',
      ],
    },
    {
      category: 'paginator',
      titleKey: 'pages.theming.cssVars.groups.paginator',
      variables: [
        '--nui-pg-primary-solid-bg', '--nui-pg-primary-solid-hover-bg',
        '--nui-pg-primary-outline-border', '--nui-pg-primary-ghost-hover-bg',
      ],
    },
    {
      category: 'shadows',
      titleKey: 'pages.theming.cssVars.groups.shadows',
      variables: [
        '--nui-box-shadow-xs', '--nui-box-shadow-sm', '--nui-box-shadow-md',
        '--nui-box-shadow-lg', '--nui-box-shadow-xl', '--nui-shadow-container',
        '--nui-shadow-elevated', '--nui-shadow-interactive',
      ],
    },
  ];

  filteredGroups = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();

    return this.variableGroups
      .filter(group => category === 'all' || group.category === category)
      .map(group => ({
        ...group,
        variables: group.variables.filter(v => v.toLowerCase().includes(search)),
      }))
      .filter(group => group.variables.length > 0);
  });

  getCSSVariableValue(varName: string): string {
    const el = document.documentElement;
    return getComputedStyle(el).getPropertyValue(varName).trim() || 'N/A';
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }

  isColorVariable(varName: string): boolean {
    return !varName.includes('shadow') && !varName.includes('opacity');
  }
}
