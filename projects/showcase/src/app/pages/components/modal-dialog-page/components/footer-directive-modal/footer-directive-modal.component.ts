import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  ButtonComponent,
  ModalDialogFooterDirective,
  ModalDialogRef,
  MODAL_DIALOG_REF,
} from 'nui';

/**
 * Componente demo que demuestra el uso de la directiva nuiModalDialogFooter
 * para registrar un footer personalizado desde el componente hijo.
 */
@Component({
  selector: 'app-footer-directive-modal',
  standalone: true,
  imports: [ButtonComponent, ModalDialogFooterDirective],
  template: `
    <p style="margin: 0; color: var(--nui-text-secondary)">
      The footer below is defined <strong>inside this component</strong> using the
      <code>nuiModalDialogFooter</code> directive—it is automatically registered
      into the modal shell without any configuration in the parent.
    </p>

    <ng-template nuiModalDialogFooter>
      <div style="display: flex; gap: 0.5rem; justify-content: flex-end">
        <nui-button color="secondary" variant="outline" (click)="cancel()">Cancel</nui-button>
        <nui-button color="primary" (click)="confirm()">Confirm</nui-button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterDirectiveModalComponent {
  private readonly _modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);

  cancel(): void {
    this._modalRef.close({ confirmed: false });
  }

  confirm(): void {
    this._modalRef.close({ confirmed: true });
  }
}
