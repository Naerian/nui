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
    id: 'footer-actions',
    title: 'components.modal-dialog.examples.footerActions.title',
    description: 'components.modal-dialog.examples.footerActions.description',
    anchor: 'footer-actions',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Option 1: Custom buttons via config (use text + callback)
openWithCustomButtons() {
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
}

// Option 2: Register actions inside the dynamic component
// readonly actionsService = inject(ModalDialogActionsService);
//
// ngOnInit() {
//   this.actionsService.register([
//     { label: 'Cancel', color: 'secondary', handler: () => this.modalRef.close({ confirmed: false }) },
//     { label: 'Save', color: 'primary', handler: () => this.save() },
//   ]);
// }`,
        language: 'typescript',
      },
      {
        title: 'codeExamples.html',
        code: `<!-- Option 3: Footer directive in the component template -->
<ng-template nuiModalDialogFooter>
  <div style="display:flex; gap: 8px; justify-content: flex-end">
    <nui-button color="secondary" (onClick)="cancel()">Cancel</nui-button>
    <nui-button color="primary" (onClick)="save()">Save</nui-button>
  </div>
</ng-template>`,
        language: 'html',
      },
    ],
  },
  {
    id: 'status-bar',
    title: 'components.modal-dialog.examples.statusBar.title',
    description: 'components.modal-dialog.examples.statusBar.description',
    anchor: 'status-bar',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `this.modalService.open(MyContent, {
  title: 'Important notice',
  statusBar: {
    position: 'top',      // 'top' | 'bottom' | 'left' | 'right' | 'none'
    color: '#f59e0b',     // Any CSS color or leave undefined for semantic color
    thickness: 4,         // px, default: 4
  },
});`,
        language: 'typescript',
      },
    ],
  },
];
