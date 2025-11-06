import { Component } from '@angular/core';
import {
  ActionMenuItem,
  ButtonComponent,
  ButtonGroupComponent,
  ButtonGroupOption,
  AvatarGroupItem,
  AvatarComponent,
  AvatarGroupComponent,
  ActionMenuComponent,
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
  imports: [
    ButtonComponent,
    ButtonGroupComponent,
    ActionMenuComponent,
    AvatarComponent,
    AvatarGroupComponent,
  ],
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

  actionMenuItemsOnAction: ActionMenuItem[] = [
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

  /**
   * Lista de usuarios para el AvatarGroup
   */
  users: AvatarGroupItem[] = [
    {
      src: 'https://i.pravatar.cc/150?img=1',
      alt: 'María García',
      tooltip: 'María García - Desarrolladora',
    },
    {
      src: 'https://i.pravatar.cc/150?img=2',
      alt: 'Juan Pérez',
      tooltip: 'Juan Pérez - Diseñador',
    },
    {
      src: 'https://i.pravatar.cc/150?img=3',
      alt: 'Ana López',
      tooltip: 'Ana López - Product Manager',
    },
    {
      initials: 'RM',
      color: 'primary',
      alt: 'Roberto Martínez',
      tooltip: 'Roberto Martínez - DevOps',
    },
    {
      initials: 'LC',
      color: 'success',
      alt: 'Laura Castro',
      tooltip: 'Laura Castro - QA Engineer',
    },
    {
      initials: 'DS',
      color: 'warning',
      alt: 'Diego Sánchez',
      tooltip: 'Diego Sánchez - Backend Developer',
    },
    {
      initials: 'SM',
      color: 'info',
      alt: 'Sofía Morales',
      tooltip: 'Sofía Morales - Frontend Developer',
    },
  ];

  /**
   * Equipo pequeño
   */
  smallTeam: AvatarGroupItem[] = [
    {
      src: 'https://i.pravatar.cc/150?img=10',
      alt: 'Carlos Ruiz',
    },
    {
      initials: 'MT',
      color: 'primary',
      alt: 'Marta Torres',
    },
    {
      initials: 'PG',
      color: 'success',
      alt: 'Pablo González',
    },
  ];

  /**
   * Participantes del proyecto
   */
  projectParticipants: AvatarGroupItem[] = [
    {
      initials: 'JD',
      color: 'primary',
      tooltip: 'John Doe - Lead Developer',
    },
    {
      initials: 'AS',
      color: 'secondary',
      tooltip: 'Alice Smith - UX Designer',
    },
    {
      icon: 'ri-user-line',
      color: 'info',
      tooltip: 'Guest User',
    },
    {
      initials: 'BC',
      color: 'success',
      tooltip: 'Bob Cooper - Tester',
    },
    {
      initials: 'EJ',
      color: 'warning',
      tooltip: 'Emma Johnson - Analyst',
    },
  ];

  /**
   * URL de imagen de prueba
   */
  testImageUrl = 'https://i.pravatar.cc/150?img=5';

  /**
   * URL de imagen que falla (para probar fallback)
   */
  brokenImageUrl = 'https://invalid-url.com/image.jpg';

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
