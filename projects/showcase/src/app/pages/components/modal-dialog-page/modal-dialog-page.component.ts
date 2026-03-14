import { Component, inject, signal, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ModalDialogService, ModalDialogRef } from 'nui';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { FooterDirectiveModalComponent } from './components/footer-directive-modal/footer-directive-modal.component';
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

  @ViewChild('footerRef') footerRef!: TemplateRef<any>;
  @ViewChild('userProfileModalTemplate', { read: TemplateRef }) userProfileModalTemplate?: TemplateRef<any>;
  readonly isProcessing = signal(false);
  private _loadingModalRef: ModalDialogRef | null = null;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'html-content',
        'semantic-types',
        'verification',
        'loader',
        'dynamic-component',
        'minimizable',
        'timeout',
        'status-bar',
        'footer-custom',
        'child-footer-actions',
        'body-template',
        'prevent-close',
        'backdrop',
        'update-ref',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-file-list-3-line',
      sections: [
        'api-service',
        'api-ref',
        'api-config',
        'api-custom-button',
        'api-modal-action',
        'api-actions-service',
        'api-footer-directive',
        'api-tokens',
      ],
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
      message: 'This operation may take a few moments.',
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

  openBasicModal(): void {
    this._modalService.open({
      title: 'Confirm Action',
      message: 'Choose an action for this item.',
      customButtons: [
        {
          text: 'Cancel',
          color: 'secondary',
          variant: 'outline',
          callback: modalRef => modalRef.close({ confirmed: false }),
        },
        {
          text: 'Save',
          prefixIcon: 'ri-save-line',
          color: 'primary',
          variant: 'solid',
          callback: modalRef => modalRef.close({ confirmed: true }),
        },
      ],
    });
  }

  openVariantsModal(): void {
    this._modalService.open({
      title: 'Choose an Action',
      message: 'Select the appropriate action for this item.',
      customButtons: [
        {
          text: 'Delete',
          prefixIcon: 'ri-delete-bin-line',
          color: 'danger',
          variant: 'ghost',
          callback: modalRef => modalRef.close({ confirmed: false }),
        },
        {
          text: 'Archive',
          prefixIcon: 'ri-archive-line',
          color: 'secondary',
          variant: 'outline',
          callback: modalRef => modalRef.close({ confirmed: false }),
        },
        {
          text: 'Publish',
          prefixIcon: 'ri-send-plane-line',
          color: 'primary',
          variant: 'solid',
          callback: modalRef => modalRef.close({ confirmed: true }),
        },
      ],
    });
  }

  openLoadingStatesModal(): void {
    this.isProcessing.set(false);
    this._loadingModalRef = this._modalService.open({
      title: 'Process Data',
      message: 'Click Process to start the operation.',
      footerTemplate: this.footerRef,
    });
  }

  cancelProcess(): void {
    this._loadingModalRef?.close({ confirmed: false });
    this._loadingModalRef = null;
  }

  async runProcess(): Promise<void> {
    if (this.isProcessing()) return;
    this.isProcessing.set(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      this._loadingModalRef?.close({ confirmed: true });
      this._loadingModalRef = null;
    } finally {
      this.isProcessing.set(false);
    }
  }

  openConditionalsModal(): void {
    const hasChanges = false; // static value at open-time
    this._modalService.open({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. What would you like to do?',
      customButtons: [
        {
          text: 'Discard',
          color: 'secondary',
          variant: 'ghost',
          disabled: !hasChanges,
          callback: modalRef => modalRef.close({ confirmed: false }),
        },
        {
          text: 'Save & Close',
          prefixIcon: 'ri-save-line',
          color: 'primary',
          variant: 'solid',
          callback: modalRef => modalRef.close({ confirmed: true }),
        },
      ],
    });
  }

  openFooterDirectiveModal(): void {
    this._modalService.open(FooterDirectiveModalComponent, {
      title: 'Template (nuiModalDialogFooter)',
      width: '480px',
    });
  }

  openAdvancedModal(): void {
    this._modalService.open({
      title: 'Edit Content',
      width: '640px',
      customButtons: [
        {
          text: 'Reset',
          prefixIcon: 'ri-restart-line',
          color: 'secondary',
          variant: 'ghost',
          callback: () => console.log('Reset'),
          closeOnClick: false,
        },
        {
          text: 'Preview',
          prefixIcon: 'ri-eye-line',
          color: 'info',
          variant: 'outline',
          callback: () => console.log('Preview'),
          closeOnClick: false,
        },
        {
          text: 'Save Draft',
          prefixIcon: 'ri-draft-line',
          color: 'secondary',
          variant: 'solid',
          callback: () => console.log('Draft saved'),
          closeOnClick: false,
        },
        {
          text: 'Publish',
          prefixIcon: 'ri-send-plane-fill',
          color: 'success',
          variant: 'solid',
          callback: modalRef => modalRef.close({ confirmed: true }),
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

  openHtmlContentModal(): void {
    this._modalService.open({
      title: 'Order summary',
      message: `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between;">
            <span>Product A &times; 2</span><strong>$58.00</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Product B &times; 1</span><strong>$14.00</strong>
          </div>
          <hr style="border: none; border-top: 1px solid var(--nui-border-high); margin: 0.25rem 0;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem;">
            <span>Total</span><span>$72.00</span>
          </div>
        </div>
      `,
      confirmText: 'Proceed to checkout',
      cancelText: 'Cancel',
    });
  }

  opencontentTemplateModal(): void {
    if (!this.userProfileModalTemplate) return;
    this._modalService.open({
      title: 'User profile',
      contentTemplate: this.userProfileModalTemplate,
      templateContext: {
        user: { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
      },
      confirmText: 'Close',
    });
  }

  openPreventCloseModal(): void {
    let hasUnsavedChanges = false;

    const ref = this._modalService.open({
      title: 'Edit settings',
      message:
        'Click "Mark as modified", then try to close the modal via ESC, backdrop click, or the X button.',
      preventClose: () => {
        if (!hasUnsavedChanges) return true;
        return confirm('You have unsaved changes. Discard them?');
      },
      customButtons: [
        {
          text: 'Mark as modified',
          color: 'secondary',
          variant: 'outline',
          prefixIcon: 'ri-edit-line',
          closeOnClick: false,
          callback: () => {
            hasUnsavedChanges = true;
            alert('Now try to close the modal — it will be blocked.');
          },
        },
        {
          text: 'Save & close',
          color: 'primary',
          variant: 'solid',
          prefixIcon: 'ri-save-line',
          callback: ref => {
            hasUnsavedChanges = false;
            ref.close({ confirmed: true });
          },
        },
      ],
    });

    ref.closePrevented().subscribe(() => {
      console.log('[preventClose] Close was blocked — unsaved changes exist');
    });
  }

  openNoBackdropModal(): void {
    this._modalService.open({
      title: 'No backdrop',
      message:
        'This modal has no backdrop overlay. The page content behind is visible and interactive.',
      hasBackdrop: false,
      confirmText: 'Close',
    });
  }

  openBackdropNoCloseModal(): void {
    this._modalService.open({
      title: 'Backdrop does not close',
      message: 'Clicking the backdrop will not close this modal. Use the X button.',
      closeOnBackdropClick: false,
      confirmText: 'Close',
    });
  }

  openNoEscapeModal(): void {
    this._modalService.open({
      title: 'ESC disabled',
      message: 'Pressing the Escape key will not close this modal. Use the X button.',
      closeOnEscape: false,
      confirmText: 'Close',
    });
  }

  openCustomBackdropModal(): void {
    this._modalService.open({
      title: 'Custom backdrop',
      message: 'This modal has a custom backdrop with a blur effect.',
      backdropClass: 'custom-backdrop-blur',
      confirmText: 'Close',
    });
  }

  openUpdateRefModal(): void {
    const ref = this._modalService.open({
      title: 'Loading data…',
      message: 'The title updates in 1.5 seconds. You can also rename it manually.',
      customButtons: [
        {
          text: 'Rename modal',
          color: 'secondary',
          variant: 'outline',
          prefixIcon: 'ri-edit-line',
          closeOnClick: false,
          callback: ref => {
            ref.updateTitle(`Updated at ${new Date().toLocaleTimeString()}`);
          },
        },
        {
          text: 'Close',
          color: 'secondary',
          variant: 'ghost',
          callback: ref => ref.close({ confirmed: false }),
        },
      ],
    });

    ref.afterOpened().subscribe(() => {
      setTimeout(() => ref.updateTitle('Data loaded ✓'), 1500);
    });
  }
}
