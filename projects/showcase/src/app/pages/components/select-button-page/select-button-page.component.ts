import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { SELECT_BUTTON_PAGE_CONFIG } from './select-button-page.config';

@Component({
  selector: 'app-select-button-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Necesario para [(ngModel)]
    TranslateModule,
    SelectButtonComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './select-button-page.component.html',
  styleUrls: ['./select-button-page.component.scss'],
})
export class SelectButtonPageComponent extends BaseComponentPage {
  override pageConfig = SELECT_BUTTON_PAGE_CONFIG;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'modes', 'complex', 'icons', 'colors', 'segmented', 'sizes', 'width'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-import', 'api-inputs', 'api-outputs', 'api-models'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-general', 'theming-segmented'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-accessibility-line',
      sections: ['a11y-roles', 'a11y-naming', 'a11y-keyboard'],
    },
    {
      id: 'globalconfig',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-setup', 'global-config-defaults', 'global-config-priority'],
    },
  ];
  // ==========================================

  // Strings simples
  cities = ['New York', 'Los Angeles'];

  // Objetos para segmented
  periods = [
    { label: 'Daily', value: 'daily' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  // Objetos con Iconos
  textFormats = [
    { id: 'bold', icon: 'ri-bold', label: 'Bold' },
    { id: 'italic', icon: 'ri-italic', label: 'Italic' },
    { id: 'underline', icon: 'ri-underline', label: 'Underline' },
  ];

  // Objetos Complejos (Usuarios)
  users = [
    { id: 101, name: 'Ana G.', role: 'Admin', status: 'active' },
    { id: 103, name: 'Lucía M.', role: 'Viewer', status: 'offline', disabled: true },
  ];

  // ==========================================
  // ESTADO (Signals para reactividad)
  // ==========================================

  selectedCity = signal<string>('Chicago');
  selectedPeriod = signal<string>('weekly');
  selectedFormats = signal<string[]>(['bold']); // Array para checkbox mode
  selectedFormatsRadio = signal<string>('italic'); // String para radio mode
  selectedUser = signal<number>(102); // Guardamos el ID
}
