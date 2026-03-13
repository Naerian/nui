import { ComponentSection } from '../../../../core';

export const MODAL_DIALOG_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.modal-dialog.examples.basic.title',
    description: 'components.modal-dialog.examples.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Use openError() for a pre-configured danger modal
readonly modalService = inject(ModalDialogService);

openDeleteConfirm() {
  const ref = this.modalService.openError({
    title: 'Delete item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  });

  ref.afterClosed().subscribe(result => {
    if (result?.confirmed) {
      console.log('Item deleted');
    }
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'semantic-types',
    title: 'components.modal-dialog.examples.semanticTypes.title',
    description: 'components.modal-dialog.examples.semanticTypes.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.semanticTypes.note',
    },
    anchor: 'semantic-types',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Convenience helpers for common semantic types
openInfo() {
  this.modalService.openInfo({ title: 'Information', message: 'Your session will expire in 5 minutes.' });
}

openWarning() {
  this.modalService.openWarning({ title: 'Warning', message: 'Unsaved changes will be lost.' });
}

openSuccess() {
  this.modalService.openSuccess({ title: 'Success', message: 'Your changes have been saved.' });
}

openError() {
  this.modalService.openError({ title: 'Error', message: 'Something went wrong. Please try again.' });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'verification',
    title: 'components.modal-dialog.examples.verification.title',
    description: 'components.modal-dialog.examples.verification.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.verification.note',
    },
    anchor: 'verification',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `openVerification() {
  const ref = this.modalService.openVerification({
    title: 'Delete project',
    message: 'This action is irreversible. Type the project name to confirm.',
    verificationText: 'my-project',
    confirmText: 'Delete permanently',
    cancelText: 'Cancel',
    modalType: 'danger',
  });

  ref.afterClosed().subscribe(result => {
    if (result?.confirmed) {
      this.deleteProject();
    }
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'loader',
    title: 'components.modal-dialog.examples.loader.title',
    description: 'components.modal-dialog.examples.loader.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.loader.note',
    },
    anchor: 'loader',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `async processData() {
  const loaderRef = this.modalService.openLoader({
    title: 'Processing',
    loadingLabel: 'Please wait while we process your data...',
    canBeClosed: false,
  });

  try {
    await this.dataService.processLargeDataset();
    loaderRef.close({ confirmed: true });
  } catch (e) {
    loaderRef.close({ confirmed: false });
  }
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'dynamic-component',
    title: 'components.modal-dialog.examples.dynamicComponent.title',
    description: 'components.modal-dialog.examples.dynamicComponent.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.dynamicComponent.note',
    },
    anchor: 'dynamic-component',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Open with a custom component
openUserForm() {
  const ref = this.modalService.open(UserFormComponent, {
    title: 'Edit User',
    width: '640px',
    data: { userId: 42 },
  });

  ref.afterClosed().subscribe(result => {
    if (result?.confirmed) {
      this.refreshUsers();
    }
  });
}

// Inside UserFormComponent:
// readonly data = inject<{ userId: number }>(MODAL_DIALOG_DATA);
// readonly modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'minimizable',
    title: 'components.modal-dialog.examples.minimizable.title',
    description: 'components.modal-dialog.examples.minimizable.description',
    anchor: 'minimizable',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.minimizable.note',
    },
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Minimizable modals require a unique ID
openMinimizableForm() {
  const ref = this.modalService.open(LongFormComponent, {
    id: 'user-form-modal',   // Required for minimizable
    minimizable: true,
    title: 'Long Form',
    width: '700px',
  });
}

// Calling open() with the same ID restores the minimized modal
openOrRestoreForm() {
  this.modalService.open(LongFormComponent, {
    id: 'user-form-modal',
    minimizable: true,
    title: 'Long Form',
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'timeout',
    title: 'components.modal-dialog.examples.timeout.title',
    description: 'components.modal-dialog.examples.timeout.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.timeout.note',
    },
    anchor: 'timeout',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `openTimedModal() {
  this.modalService.openInfo({
    title: 'Session expiring',
    message: 'Your session will expire. Click confirm to stay logged in.',
    timeout: {
      duration: 10000,        // 10 seconds
      showProgressBar: true,
      pauseOnHover: true,     // Pause countdown on mouse hover (entire modal)
      timeoutAction: 'cancel', // Action when time runs out: 'confirm' | 'cancel'
    },
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'status-bar',
    title: 'components.modal-dialog.examples.statusBar.title',
    description: 'components.modal-dialog.examples.statusBar.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.statusBar.note',
    },
    anchor: 'status-bar',
    examples: [
      {
        title: 'Custom color',
        code: `this.modalService.open(MyContent, {
  title: 'Important notice',
  statusBar: {
    position: 'top',
    color: '#f59e0b',
    thickness: 4,
  },
});`,
        language: 'typescript',
      },
      {
        title: 'Semantic color (modalType)',
        code: `this._modalService.open({
  title: 'Status Bar Example',
  message: 'This modal has a colored status bar on the left side.',
  statusBar: { 
    position: 'left', 
    thickness: 4 
  },
  modalType: 'info',
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'footer-custom',
    title: 'components.modal-dialog.examples.footer-custom.title',
    description: 'components.modal-dialog.examples.footer-custom.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.footer-custom.note',
    },
    anchor: 'footer-custom',
    examples: [
      {
        title: 'CustomButtons',
        code: `openWithCustomButtons() {
  const ref = this.modalService.open({
    title: 'Custom Footer',
    message: 'Choose an action for this item.',
    customButtons: [
      {
        text: 'Save Draft',
        color: 'secondary',
        variant: 'outline',
        callback: () => this.saveDraft(),
        closeOnClick: true,   // Close modal after callback
      },
      {
        text: 'Publish',
        color: 'primary',
        variant: 'solid',
        callback: (modalRef) => {
          this.publish();
          modalRef.close({ confirmed: true });
        },
      },
    ],
  });
}`,
        language: 'typescript',
      },
      {
        title: 'Template (nuiModalDialogFooter)',
        code: `<ng-template nuiModalDialogFooter>
  <div style="display:flex; gap: 8px; justify-content: flex-end">
    <nui-button color="secondary" (onClick)="cancel()">Cancel</nui-button>
    <nui-button color="primary" (onClick)="save()">Save</nui-button>
  </div>
</ng-template>`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'child-footer-actions',
    title: 'components.modal-dialog.examples.child-footer-actions.title',
    description: 'components.modal-dialog.examples.child-footer-actions.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.child-footer-actions.note',
    },
    anchor: 'child-footer-actions',
    examples: [
      {
        title: 'Child Component (TS)',
        code: `
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
}`,
        language: 'typescript',
      },
      {
        title: 'Parent Component (TS)',
        code: `openEditUserModal(user: User) {
  const ref = this.modalService.open(EditUserFormComponent, {
    title: 'Edit User',
    data: { name: user.name, email: user.email },
    width: '480px',
  });

  ref.afterClosed().subscribe(result => {
    if (result?.confirmed) {
      console.log('User saved from parent:', result.data);
    }
  });
}`,
        language: 'typescript',
      },
    ],
  },
];
