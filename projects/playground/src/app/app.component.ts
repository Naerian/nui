import { Component } from '@angular/core';
import {
  ActionMenuItem,
  ButtonComponent,
  ButtonGroupComponent,
  ButtonGroupOption,
  ActionMenuModule,
} from 'nui';
import {
  ThemeService,
  aura,
  dopamine,
  corporate,
  minimal,
  neon,
  warm,
  sunset,
  twilight,
} from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, ButtonGroupComponent, ActionMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'NUI Theme System - Hybrid Approach';

  buttonGroups: ButtonGroupOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Middle', value: 'middle' },
    { label: 'Right', value: 'right' },
  ];

  buttonGroupsWithDisabled: ButtonGroupOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Middle', value: 'middle', disabled: true },
    { label: 'Right', value: 'right' },
  ];

  buttonGroupsWithIcons: ButtonGroupOption[] = [
    { label: 'Left', value: 'left', icon: 'ri-arrow-left-line' },
    { label: 'Middle', value: 'middle', icon: 'ri-arrow-right-line' },
    { label: 'Right', value: 'right', icon: 'ri-arrow-up-line' },
  ];

  actionMenuItems = [
    { label: 'Ver detalles', icon: 'ri-eye-line', action: 'view' },
    { label: 'Editar', icon: 'ri-edit-line', action: 'edit' },
    { label: 'Descargar', icon: 'ri-download-2-line', action: 'download' },
    { label: 'Archivar', icon: 'ri-archive-line', action: 'archive' },
    { label: 'Eliminar', icon: 'ri-delete-bin-line', action: 'delete' },
  ];

  menuItems: ActionMenuItem[] = [
    {
      label: 'Copiar',
      icon: 'ri-file-copy-line',
      onAction: () => this.copyToClipboard(),
    },
    {
      label: 'Pegar',
      icon: 'ri-clipboard-line',
      onAction: () => this.pasteFromClipboard(),
    },
  ];

  constructor(private themeService: ThemeService) {}

  switchTheme(presetName: string) {
    const presets: any = {
      aura,
      dopamine,
      corporate,
      minimal,
      neon,
      warm,
      sunset,
      twilight,
    };
    this.themeService.usePreset(presets[presetName]);
  }

  onActionSelected(action: ActionMenuItem) {
    console.log(`Acción seleccionada: ${action}`);
  }

  private copyToClipboard() {
    // Lógica de copiar
    console.log('Copiado al portapapeles');
  }

  private pasteFromClipboard() {
    // Lógica de pegar
    console.log('Pegado desde portapapeles');
  }
}
