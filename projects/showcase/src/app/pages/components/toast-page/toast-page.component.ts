import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ToastService } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { TOAST_PAGE_CONFIG } from './toast-page.config';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    CodeBlockComponent,
    SectionTitleComponent,
  ],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
})
export class ToastPageComponent extends BaseComponentPage {
  override pageConfig = TOAST_PAGE_CONFIG;
  private toastService = inject(ToastService);

  // === BASIC TOASTS ===
  showSuccess(): void {
    this.toastService.success('Operación completada exitosamente');
  }

  showError(): void {
    this.toastService.error('Ha ocurrido un error');
  }

  showWarning(): void {
    this.toastService.warning('Por favor, revisa esta información');
  }

  showInfo(): void {
    this.toastService.info('Nueva actualización disponible');
  }

  // === WITH TITLE ===
  showSuccessWithTitle(): void {
    this.toastService.success('Los cambios se guardaron correctamente', {
      title: 'Guardado Exitoso',
    });
  }

  showErrorWithTitle(): void {
    this.toastService.error('No se pudo conectar con el servidor', {
      title: 'Error de Conexión',
    });
  }

  // === WITH ACTIONS ===
  showWithActions(): void {
    const toastRef = this.toastService.success('Elemento eliminado', {
      title: 'Eliminado',
      actions: [
        {
          label: 'Deshacer',
          onClick: () => {
            console.log('Acción deshecha');
            toastRef.close();
          },
        },
      ],
    });
  }

  // === POSITIONS ===
  showTopPositions(): void {
    this.toastService.success('Top Left', { position: 'top-left' });
    setTimeout(() => {
      this.toastService.success('Top Center', { position: 'top-center' });
    }, 300);
    setTimeout(() => {
      this.toastService.success('Top Right', { position: 'top-right' });
    }, 600);
  }

  showBottomPositions(): void {
    this.toastService.info('Bottom Left', { position: 'bottom-left' });
    setTimeout(() => {
      this.toastService.info('Bottom Center', { position: 'bottom-center' });
    }, 300);
    setTimeout(() => {
      this.toastService.info('Bottom Right', { position: 'bottom-right' });
    }, 600);
  }

  // === DURATION ===
  showQuickToast(): void {
    this.toastService.success('Mensaje rápido', { timeout: 2000 });
  }

  showLongToast(): void {
    this.toastService.info('Mensaje largo', { timeout: 10000 });
  }

  showPersistentToast(): void {
    this.toastService.warning('Toast persistente (no se cierra solo)', {
      timeout: 0,
    });
  }

  // === LOADING ===
  showLoading(): void {
    const toastRef = this.toastService.loading('Procesando...');

    setTimeout(() => {
      toastRef.update({ type: 'success', message: '¡Éxito!' });
    }, 2000);
  }
}
