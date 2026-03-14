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
        title: 'Basic',
        code: `this.modalService.open({
  title: 'Confirm Action',
  message: 'Choose an action for this item.',
  customButtons: [
    {
      text: 'Cancel',
      color: 'secondary',
      variant: 'outline',
      callback: (modalRef) => modalRef.close({ confirmed: false }),
    },
    {
      text: 'Save',
      prefixIcon: 'ri-save-line',
      color: 'primary',
      variant: 'solid',
      callback: (modalRef) => {
        this.save();
        modalRef.close({ confirmed: true });
      },
    },
  ],
});`,
        language: 'typescript',
      },
      {
        title: 'Variants',
        code: `this.modalService.open({
  title: 'Choose an Action',
  message: 'Select the appropriate action for this item.',
  customButtons: [
    {
      text: 'Delete',
      prefixIcon: 'ri-delete-bin-line',
      color: 'danger',
      variant: 'ghost',
      callback: (modalRef) => {
        this.delete();
        modalRef.close({ confirmed: false });
      },
    },
    {
      text: 'Archive',
      prefixIcon: 'ri-archive-line',
      color: 'secondary',
      variant: 'outline',
      callback: (modalRef) => {
        this.archive();
        modalRef.close({ confirmed: false });
      },
    },
    {
      text: 'Publish',
      prefixIcon: 'ri-send-plane-line',
      color: 'primary',
      variant: 'solid',
      callback: (modalRef) => {
        this.publish();
        modalRef.close({ confirmed: true });
      },
    },
  ],
});`,
        language: 'typescript',
      },
      {
        title: 'Loading States',
        code: `// Component template:
// <ng-template #footerRef>
//   <div style="display:flex; gap:8px; justify-content:flex-end">
//     <nui-button color="secondary" [disabled]="isProcessing()" (click)="cancelModal()">Cancel</nui-button>
//     <nui-button color="primary" [loading]="isProcessing()" [disabled]="isProcessing()" (click)="processAction()">Process</nui-button>
//   </div>
// </ng-template>

@ViewChild('footerRef') footerRef!: TemplateRef<any>;
isProcessing = signal(false);
currentModalRef: ModalDialogRef | null = null;

openModal() {
  this.isProcessing.set(false);
  this.currentModalRef = this.modalService.open({
    title: 'Process Data',
    message: 'Click Process to start the operation.',
    footerTemplate: this.footerRef,
  });
}

cancelModal() {
  this.currentModalRef?.close({ confirmed: false });
}

async processAction() {
  if (this.isProcessing()) return;
  this.isProcessing.set(true);
  try {
    await this.dataService.process();
    this.currentModalRef?.close({ confirmed: true });
  } catch (e) {
    console.error(e);
  } finally {
    this.isProcessing.set(false);
  }
}`,
        language: 'typescript',
      },
      {
        title: 'Conditionals',
        code: `// Static disabled state — set before opening
const hasUnsavedChanges = this.form.dirty;

this.modalService.open({
  title: 'Unsaved Changes',
  message: 'You have unsaved changes. What would you like to do?',
  customButtons: [
    {
      text: 'Discard',
      color: 'secondary',
      variant: 'ghost',
      disabled: !hasUnsavedChanges,
      callback: (modalRef) => modalRef.close({ confirmed: false }),
    },
    {
      text: 'Save & Close',
      prefixIcon: 'ri-save-line',
      color: 'primary',
      variant: 'solid',
      disabled: !hasUnsavedChanges,
      callback: (modalRef) => {
        this.saveChanges();
        modalRef.close({ confirmed: true });
      },
    },
  ],
});`,
        language: 'typescript',
      },
      {
        title: 'Template (nuiModalDialogFooter)',
        code: `// Inside a dynamic component loaded by ModalDialogService:
// The directive registers the template into the modal footer automatically.

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule, ModalDialogFooterDirective, ButtonComponent],
  template: \`
    <form [formGroup]="form">
      <input formControlName="name" placeholder="Name" />
    </form>

    <ng-template nuiModalDialogFooter>
      <div style="display:flex; gap:8px; justify-content:flex-end">
        <nui-button color="secondary" variant="outline" (click)="cancel()">
          Cancel
        </nui-button>
        <nui-button color="primary" [disabled]="form.invalid" (click)="save()">
          Save
        </nui-button>
      </div>
    </ng-template>
  \`,
})
export class MyFormComponent {
  private readonly modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);

  form = inject(FormBuilder).group({
    name: ['', Validators.required],
  });

  cancel() { this.modalRef.close({ confirmed: false }); }
  save()   { this.modalRef.close({ confirmed: true, data: this.form.value }); }
}`,
        language: 'typescript',
      },
      {
        title: 'Advanced',
        code: `this.modalService.open(MyFormComponent, {
  title: 'Edit Content',
  width: '640px',
  customButtons: [
    {
      text: 'Reset',
      prefixIcon: 'ri-restart-line',
      color: 'secondary',
      variant: 'ghost',
      callback: () => this.resetForm(),
    },
    {
      text: 'Preview',
      prefixIcon: 'ri-eye-line',
      color: 'info',
      variant: 'outline',
      callback: () => this.openPreview(),
    },
    {
      text: 'Save Draft',
      prefixIcon: 'ri-draft-line',
      color: 'secondary',
      variant: 'solid',
      callback: async () => {
        await this.saveDraft();
      },
      closeOnClick: false,  // Keep modal open after saving draft
    },
    {
      text: 'Publish',
      prefixIcon: 'ri-send-plane-fill',
      color: 'success',
      variant: 'solid',
      callback: async (modalRef) => {
        await this.publish();
        modalRef.close({ confirmed: true });
      },
    },
  ],
});`,
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
    note2: {
      type: 'info',
      icon: 'ri-lightbulb-line',
      content: 'components.modal-dialog.examples.child-footer-actions.note2',
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
  {
    id: 'html-content',
    title: 'components.modal-dialog.examples.html-content.title',
    description: 'components.modal-dialog.examples.html-content.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.html-content.note',
    },
    anchor: 'html-content',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `openOrderSummary() {
  this.modalService.open({
    title: 'Order summary',
    htmlContent: \`
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; justify-content: space-between;">
          <span>Product A × 2</span><strong>$58.00</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Product B × 1</span><strong>$14.00</strong>
        </div>
        <hr style="border: none; border-top: 1px solid var(--nui-border-high); margin: 0.25rem 0;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem;">
          <span>Total</span><span>$72.00</span>
        </div>
      </div>
    \`,
    confirmText: 'Proceed to checkout',
    cancelText: 'Cancel',
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'body-template',
    title: 'components.modal-dialog.examples.body-template.title',
    description: 'components.modal-dialog.examples.body-template.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.body-template.note',
    },
    anchor: 'body-template',
    examples: [
      {
        title: 'codeExamples.html',
        code: `<!-- Define the template in your component -->
<ng-template #userProfileTpl let-user="user">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <p style="margin: 0;"><strong>Name:</strong> {{ user.name }}</p>
    <p style="margin: 0;"><strong>Email:</strong> {{ user.email }}</p>
    <p style="margin: 0;"><strong>Role:</strong> {{ user.role }}</p>
  </div>
</ng-template>`,
        language: 'html',
      },
      {
        title: 'codeExamples.typescript',
        code: `@ViewChild('userProfileTpl') userProfileTpl!: TemplateRef<any>;

openUserProfile() {
  this.modalService.open({
    title: 'User profile',
    bodyTemplate: this.userProfileTpl,
    templateContext: {
      user: { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
    },
    confirmText: 'Close',
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'prevent-close',
    title: 'components.modal-dialog.examples.prevent-close.title',
    description: 'components.modal-dialog.examples.prevent-close.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.prevent-close.note',
    },
    anchor: 'prevent-close',
    examples: [
      {
        title: 'Sync guard',
        code: `openFormModal() {
  let hasUnsavedChanges = false;

  const ref = this.modalService.open({
    title: 'Edit settings',
    message: 'Make changes and try to close the modal.',
    preventClose: () => {
      if (!hasUnsavedChanges) return true;
      return confirm('You have unsaved changes. Discard them?');
    },
    customButtons: [
      {
        text: 'Mark as modified',
        color: 'secondary',
        variant: 'outline',
        closeOnClick: false,
        callback: () => { hasUnsavedChanges = true; },
      },
      {
        text: 'Save & close',
        color: 'primary',
        variant: 'solid',
        callback: (ref) => {
          hasUnsavedChanges = false;
          ref.close({ confirmed: true });
        },
      },
    ],
  });

  // React when a close attempt is blocked
  ref.closePrevented().subscribe(() => {
    console.log('Close was prevented — unsaved changes exist');
  });
}`,
        language: 'typescript',
      },
      {
        title: 'Async guard',
        code: `// Async guard — await another modal as confirmation dialog
openAsyncGuardModal() {
  this.modalService.open({
    title: 'Document editor',
    message: 'This modal uses an async preventClose guard.',
    preventClose: async () => {
      const result = await firstValueFrom(
        this.modalService
          .openWarning({
            title: 'Discard changes?',
            message: 'Your unsaved changes will be lost.',
            confirmText: 'Discard',
            cancelText: 'Keep editing',
          })
          .afterClosed()
      );
      return result?.confirmed ?? false;
    },
  });
}`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'backdrop',
    title: 'components.modal-dialog.examples.backdrop.title',
    description: 'components.modal-dialog.examples.backdrop.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.backdrop.note',
    },
    anchor: 'backdrop',
    examples: [
      {
        title: 'No backdrop',
        code: `// No dark overlay — page content remains visible and interactive
this.modalService.open({
  title: 'Floating panel',
  message: 'This modal has no backdrop. The page behind it is fully interactive.',
  hasBackdrop: false,
  confirmText: 'Close',
});`,
        language: 'typescript',
      },
      {
        title: 'Backdrop without auto-close',
        code: `// Backdrop visible but clicking it does NOT close the modal
this.modalService.open({
  title: 'Sticky modal',
  message: 'Clicking the backdrop will not close this modal. Use the X button.',
  closeOnBackdropClick: false,
  confirmText: 'Close',
});`,
        language: 'typescript',
      },
      {
        title: 'ESC disabled',
        code: `// The Escape key will not close this modal
this.modalService.open({
  title: 'ESC disabled',
  message: 'Pressing Escape will not close this modal. Use the X button.',
  closeOnEscape: false,
  confirmText: 'Close',
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'update-ref',
    title: 'components.modal-dialog.examples.update-ref.title',
    description: 'components.modal-dialog.examples.update-ref.description',
    note: {
      type: 'info',
      content: 'components.modal-dialog.examples.update-ref.note',
    },
    anchor: 'update-ref',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `openDataModal() {
  const ref = this.modalService.open({
    title: 'Loading data…',
    message: 'The title updates automatically when data arrives.',
    customButtons: [
      {
        text: 'Rename modal',
        color: 'secondary',
        variant: 'outline',
        prefixIcon: 'ri-edit-line',
        closeOnClick: false,
        callback: (ref) => {
          ref.updateTitle(\`Updated at \${new Date().toLocaleTimeString()}\`);
        },
      },
      {
        text: 'Close',
        color: 'secondary',
        variant: 'ghost',
        callback: (ref) => ref.close({ confirmed: false }),
      },
    ],
  });

  // Works correctly even when called outside Angular's zone
  ref.afterOpened().subscribe(() => {
    setTimeout(() => ref.updateTitle('Data loaded ✓'), 1500);
  });
}`,
        language: 'typescript',
      },
    ],
  },
];
