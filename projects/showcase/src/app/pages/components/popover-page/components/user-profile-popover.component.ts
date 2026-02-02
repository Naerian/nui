import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POPOVER_DATA, POPOVER_CLOSE, ButtonComponent } from 'nui';

/**
 * Componente de ejemplo para mostrar un popover con información de usuario
 */
@Component({
  selector: 'app-user-profile-popover',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="user-profile-popover">
      <div class="user-profile-popover__header">
        <div class="user-profile-popover__avatar">
          {{ getInitials() }}
        </div>
        <div class="user-profile-popover__info">
          <h3 class="user-profile-popover__name">{{ data.userName }}</h3>
          <p class="user-profile-popover__id">ID: {{ data.userId }}</p>
        </div>
      </div>
      <div class="user-profile-popover__body">
        <p class="user-profile-popover__description">
          Este es un ejemplo de componente dinámico dentro de un popover.
          Los datos se inyectan usando el token POPOVER_DATA.
        </p>
      </div>
      <div class="user-profile-popover__footer">
        <nui-button size="sm" variant="outline" (onClick)="close()">
          Cerrar
        </nui-button>
        <nui-button size="sm" (onClick)="viewProfile()">
          Ver perfil completo
        </nui-button>
      </div>
    </div>
  `,
  styles: [`
    .user-profile-popover {
      min-width: 280px;

      &__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      &__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--nui-color-primary), var(--nui-color-secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1.125rem;
        flex-shrink: 0;
      }

      &__info {
        flex: 1;
        min-width: 0;
      }

      &__name {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--nui-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__id {
        margin: 0.25rem 0 0 0;
        font-size: 0.75rem;
        color: var(--nui-text-tertiary);
      }

      &__body {
        margin-bottom: 1rem;
      }

      &__description {
        margin: 0;
        font-size: 0.875rem;
        color: var(--nui-text-secondary);
        line-height: 1.5;
      }

      &__footer {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    }
  `]
})
export class UserProfilePopoverComponent {
  data = inject(POPOVER_DATA);
  close = inject(POPOVER_CLOSE);

  getInitials(): string {
    const name = this.data.userName || '';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  viewProfile(): void {
    console.log('Ver perfil completo de:', this.data);
    this.close();
  }
}
