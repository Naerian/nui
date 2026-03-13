import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ModalDialogService } from 'nui';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { MODAL_DIALOG_PAGE_CONFIG } from './modal-dialog-page.config';

/**
 * Página de documentación del componente Modal Dialog.
 *
 * Muestra ejemplos de uso del servicio con diferentes configuraciones:
 * - Modal básico de confirmación
 * - Tipos semánticos (info, warning, error, success)
 * - Modal de verificación
 * - Modal con Loading spinner
 * - Modal con componente dinámico
 * - Modal minimizable con dock
 * - Timeout con barra de progreso
 * - Footer con acciones customizadas
 * - Status bar de colores
 */
@Component({
  selector: 'app-modal-dialog-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    SectionTitleComponent,
    CodeBlockComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './modal-dialog-page.component.html',
  styleUrl: './modal-dialog-page.component.scss',
})
export class ModalDialogPageComponent extends BaseComponentPage {
  override pageConfig = MODAL_DIALOG_PAGE_CONFIG;

  private readonly _modalService = inject(ModalDialogService);

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'semantic-types',
        'verification',
        'loader',
        'dynamic-component',
        'minimizable',
        'timeout',
        'status-bar',
        'footer-custom',
        'child-footer-actions',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-file-list-3-line',
      sections: ['api-service', 'api-config', 'api-ref', 'api-tokens'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-layout', 'theming-dock'],
    },
    {
      id: 'i18n',
      label: 'common.tabs.i18n',
      icon: 'ri-translate-2',
      sections: ['i18n-keys', 'i18n-override'],
    },
    {
      id: 'a11y',
      label: 'common.tabs.a11y',
      icon: 'ri-accessibility-line',
      sections: ['a11y-roles', 'a11y-focus'],
    },
    {
      id: 'global-config',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-options', 'global-config-example'],
    },
  ];

  // ─── Ejemplos ─────────────────────────────────────────────────────────────

  openBasicConfirm(): void {
    this._modalService.openConfirm({
      title: 'Confirm action',
      message: 'Are you sure you want to proceed? This action cannot be undone.',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    });
  }

  openInfoModal(): void {
    this._modalService.openInfo({
      title: 'Information',
      message: 'Your session will expire in 5 minutes. Please save your work.',
    });
  }

  openWarningModal(): void {
    this._modalService.openWarning({
      title: 'Warning',
      message: 'Unsaved changes detected. Leaving the page will discard them.',
    });
  }

  openSuccessModal(): void {
    this._modalService.openSuccess({
      title: 'Success',
      message: 'Your changes have been saved successfully.',
    });
  }

  openErrorModal(): void {
    this._modalService.openError({
      title: 'Error',
      message: 'Something went wrong while processing your request. Please try again.',
    });
  }

  openVerificationModal(): void {
    this._modalService.openVerification({
      title: 'Delete project',
      message:
        'This action is permanent and cannot be undone. Type <strong>delete-project</strong> to confirm.',
      verificationText: 'delete-project',
      confirmText: 'Delete permanently',
      cancelText: 'Cancel',
      color: 'danger',
      modalType: 'danger',
    });
  }

  openLoaderModal(): void {
    const ref = this._modalService.openLoader({
      title: 'Processing',
      loadingLabel: 'Please wait while we process your request...',
      canBeClosed: false,
    });

    // Auto-close after 3 seconds for demo purposes
    setTimeout(() => ref.close({ confirmed: true }), 3000);
  }

  openDynamicComponentDemo(): void {
    this._modalService.open({
      title: 'Dynamic Component Demo',
      message:
        'A custom Angular component would be rendered here. Use <code>MODAL_DIALOG_DATA</code> to receive data and <code>MODAL_DIALOG_REF</code> to close the modal from within the component.',
      confirmText: 'Got it',
      modalType: 'info',
    });
  }

  openMinimizableModal(): void {
    this._modalService.open({
      id: 'showcase-minimizable-modal',
      minimizable: true,
      title: 'Minimizable Modal',
      message: 'This modal can be minimized to the dock at the bottom of the screen.',
      confirmText: 'OK',
    });
  }

  openTimedModal(): void {
    this._modalService.openInfo({
      title: 'Session expiring',
      message: 'Your session will expire in 10 seconds. Click confirm to stay logged in.',
      timeout: {
        duration: 10000,
        showProgressBar: true,
        pauseOnHover: true,
        timeoutAction: 'cancel',
      },
      confirmText: 'Stay logged in',
    });
  }

  openCustomButtonsModal(): void {
    this._modalService.open({
      title: 'Custom Footer',
      message: 'This modal uses customButtons for the footer.',
      customButtons: [
        {
          text: 'Save Draft',
          color: 'secondary',
          variant: 'outline',
          callback: () => console.log('Draft saved'),
        },
        {
          text: 'Publish',
          color: 'primary',
          variant: 'solid',
          callback: modalRef => {
            console.log('Published');
            modalRef.close({ confirmed: true });
          },
        },
      ],
    });
  }

  openChildFooterActionsModal(): void {
    const ref = this._modalService.open(UserFormModalComponent, {
      title: 'Edit User',
      data: { name: 'Jane Doe', email: 'jane@example.com' },
      width: '480px',
    });

    ref.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        console.log('User saved from parent:', result.data);
      }
    });
  }

  openStatusBarModal(): void {
    this._modalService.open({
      title: 'Important notice',
      message: 'This modal has a custom colored status bar at the top.',
      statusBar: {
        position: 'top',
        color: '#2bbeeb',
        thickness: 4,
      },
    });
  }

  openStatusBarModalSemantic(): void {
    this._modalService.open({
      title: 'Status Bar Example',
      message: 'This modal uses a semantic color for the status bar based on the modal type.',
      statusBar: {
        position: 'left',
        thickness: 4,
      },
      modalType: 'info',
    });
  }
}
