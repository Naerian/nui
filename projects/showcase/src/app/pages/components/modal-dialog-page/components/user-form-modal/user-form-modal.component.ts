import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ModalDialogActionsService,
  ModalDialogRef,
  MODAL_DIALOG_DATA,
  MODAL_DIALOG_REF,
} from 'nui';

export interface UserFormData {
  name: string;
  email: string;
}

/**
 * Componente demo que se carga dinámicamente dentro de un modal.
 * Registra sus propios botones de footer via ModalDialogActionsService.
 */
@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormModalComponent implements OnInit {
  private readonly _actionsService = inject(ModalDialogActionsService);
  private readonly _modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);
  readonly data = inject<Partial<UserFormData>>(MODAL_DIALOG_DATA);

  readonly form = inject(FormBuilder).group({
    name: [this.data?.name ?? '', Validators.required],
    email: [this.data?.email ?? '', [Validators.required, Validators.email]],
  });

  readonly isLoading = signal(false);

  private isInvalid = toSignal(this.form.statusChanges.pipe(map(s => s === 'INVALID')), {
    initialValue: this.form.invalid,
  });

  constructor() {
    effect(() => {
      const loading = this.isLoading();
      const invalid = this.isInvalid();
      untracked(() => {
        this._actionsService.update(0, { disabled: loading });
        this._actionsService.update(1, { disabled: invalid || loading, loading });
      });
    });
  }

  ngOnInit(): void {
    this._actionsService.register([
      {
        label: 'Cancel',
        color: 'secondary',
        variant: 'outline',
        handler: () => this._modalRef.close({ confirmed: false }),
      },
      {
        label: 'Save',
        color: 'primary',
        handler: () => this._save(),
      },
    ]);
  }

  private async _save(): Promise<void> {
    if (this.form.invalid) return;
    this.isLoading.set(true);

    // Simulate async save
    await new Promise(r => setTimeout(r, 1500));
    console.log('Saved user data from child:', this.form.value);
    this._modalRef.close({ confirmed: true, data: this.form.value });
  }
}
