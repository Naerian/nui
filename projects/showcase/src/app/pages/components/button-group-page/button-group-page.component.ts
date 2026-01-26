import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonGroupComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { CodeExample } from '../../../core/models';

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
export class ButtonGroupPageComponent {
  // ==========================================
  // DATOS DE EJEMPLO
  // ==========================================

  // Strings simples
  cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

  // Objetos para segmented
  periods = [
    { label: 'Diario', value: 'daily' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensual', value: 'monthly' },
    { label: 'Anual', value: 'yearly' },
  ];

  // Objetos con Iconos
  textFormats = [
    { id: 'bold', icon: 'ri-bold', label: 'Negrita' },
    { id: 'italic', icon: 'ri-italic', label: 'Cursiva' },
    { id: 'underline', icon: 'ri-underline', label: 'Subrayado' },
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

  selectedCity = signal<string>('Madrid');
  selectedPeriod = signal<string>('weekly');
  selectedFormats = signal<string[]>(['bold']); // Array para checkbox mode
  selectedUser = signal<number>(102); // Guardamos el ID

  // ==========================================
  // EJEMPLOS DE CÓDIGO
  // ==========================================

  // 1. Básico
  basicExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.basic.codeTitle',
      code: `<nui-button-group 
  [options]="['Madrid', 'Barcelona', 'Valencia', 'Sevilla']" 
  [(ngModel)]="selectedCity">
</nui-button-group>

<p>Seleccionado: {{ selectedCity() }}</p>`,
      language: 'html',
    },
  ];

  // 2. Modos (Radio vs Checkbox)
  modeExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.modes.codeTitle',
      code: `<nui-button-group 
  mode="checkbox"
  [options]="formats" 
  labelBy="label"
  valueBy="id"
  [(ngModel)]="selectedFormats">
</nui-button-group>`,
      language: 'html',
    },
  ];

  // 3. Segmented (iOS Style)
  segmentedExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.segmented.codeTitle',
      code: `<nui-button-group 
  visualVariant="segmented"
  [options]="periods"
  [(ngModel)]="selectedPeriod">
</nui-button-group>`,
      language: 'html',
    },
  ];

  // 4. Objetos Complejos
  complexExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.complex.codeTitle',
      code: `<nui-button-group 
  [options]="users"
  labelBy="name"    
  valueBy="id"      
  disabledBy="disabled" 
  [(ngModel)]="selectedUserId">
</nui-button-group>`,
      language: 'html',
    },
  ];

  // 5. Iconos
  iconExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.icons.codeTitle',
      code: `<nui-button-group 
  [options]="textFormats" 
  iconBy="icon"
  [iconOnly]="true" 
  mode="checkbox">
</nui-button-group>`,
      language: 'html',
    },
  ];

  // 6. Colores y Tamaños
  styleExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.styles.codeTitle',
      code: `<nui-button-group color="primary" variant="solid" ... />
<nui-button-group color="danger" variant="ghost" ... />
<nui-button-group color="danger" variant="outline" ... />
<nui-button-group size="xs" visualVariant="segmented" ... />
<nui-button-group size="sm" visualVariant="segmented" ... />`,
      language: 'html',
    },
  ];

  // 7. Width
  widthExample: CodeExample[] = [
    {
      title: 'components.buttonGroup.width.codeTitle',
      code: `<nui-button-group width="full" [options]="..." />`,
      language: 'html',
    },
  ];
}
