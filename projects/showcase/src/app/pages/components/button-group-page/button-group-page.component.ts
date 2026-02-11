import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonGroupComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { BUTTON_GROUP_PAGE_CONFIG } from './button-group-page.config';

@Component({
  selector: 'app-button-group-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Necesario para [(ngModel)]
    TranslateModule,
    ButtonGroupComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './button-group-page.component.html',
  styleUrls: ['./button-group-page.component.scss'],
})
export class ButtonGroupPageComponent extends BaseComponentPage {
  override pageConfig = BUTTON_GROUP_PAGE_CONFIG;

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
      sections: ['api-inputs', 'api-outputs'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-general', 'theming-segmented'],
    },
  ];

  // ==========================================
  // DATOS DE EJEMPLO
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
