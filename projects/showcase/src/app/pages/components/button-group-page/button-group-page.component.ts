import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonGroupComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
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
  ],
  templateUrl: './button-group-page.component.html',
  styleUrls: ['./button-group-page.component.scss'],
})
export class ButtonGroupPageComponent extends BaseComponentPage {
  pageConfig = BUTTON_GROUP_PAGE_CONFIG;

  // ==========================================
  // DATOS DE EJEMPLO
  // ==========================================

  // Strings simples
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  // Objetos para segmented
  periods = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
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
    { id: 101, name: 'Ana García', role: 'Admin', status: 'active' },
    { id: 102, name: 'Carlos Ruíz', role: 'Editor', status: 'busy' },
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
