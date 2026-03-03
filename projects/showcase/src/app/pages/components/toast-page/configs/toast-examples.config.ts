import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos interactivos del Toast
 */
export const TOAST_EXAMPLES_SECTIONS: ComponentSection[] = [
  {
    id: 'basic',
    title: 'components.toast.examples.basic.title',
    description: 'components.toast.examples.basic.description',
    anchor: 'basic',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `this.toastService.success('Operation completed successfully');
this.toastService.error('An error occurred');
this.toastService.warning('Please review this information');
this.toastService.info('New update available');`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'with-title',
    title: 'components.toast.examples.withTitle.title',
    description: 'components.toast.examples.withTitle.description',
    anchor: 'with-title',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `this.toastService.success('Changes saved successfully', {
  title: 'Save Successful'
});

this.toastService.error('Could not connect to the server', {
  title: 'Connection Error'
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'with-actions',
    title: 'components.toast.examples.withActions.title',
    description: 'components.toast.examples.withActions.description',
    anchor: 'with-actions',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `const toastRef = this.toastService.success('Item deleted', {
  title: 'Deleted',
  timeout: 0, // Persistent until user action
  buttonsVariant: 'solid',
  actions: [
    {
      label: 'Undo',
      onClick: () => {
        console.log('Action undone');
        toastRef.close();
      }
    }
  ]
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'positions',
    title: 'components.toast.examples.positions.title',
    description: 'components.toast.examples.positions.description',
    anchor: 'positions',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `this.toastService.success('Top Left', { position: 'top-left' });
this.toastService.success('Top Center', { position: 'top-center' });
this.toastService.success('Top Right', { position: 'top-right' });
this.toastService.info('Bottom Left', { position: 'bottom-left' });
this.toastService.info('Bottom Center', { position: 'bottom-center' });
this.toastService.info('Bottom Right', { position: 'bottom-right' });`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'icon-top',
    title: 'components.toast.examples.iconTop.title',
    description: 'components.toast.examples.iconTop.description',
    note: {
      type: 'info',
      content: 'components.toast.examples.iconTop.note',
    },
    anchor: 'icon-top',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Toast with icon at the top
this.toastService.info('This toast has the icon at the top', {
  iconPosition: 'top'
});

// Toast with icon at the top and title
this.toastService.warning('This toast has the icon at the top', {
  title: 'Icon Top Toast',
  iconPosition: 'top',
});

// Toast with icon at the top, title and actions
const toastRef = this.toastService.success('This toast has the icon at the top', {
  title: 'Icon Top Toast',
  iconPosition: 'top',
  actions: [
    {
      label: 'Action',
      onClick: () => {
        console.log('Icon Top Action clicked');
        toastRef.close();
      },
    },
  ],
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'custom-icons',
    title: 'components.toast.examples.icons.title',
    description: 'components.toast.examples.icons.description',
    note: {
      type: 'info',
      content: 'components.toast.examples.icons.note',
    },
    anchor: 'custom-icons',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Toast without icon
this.toastService.info('This toast has no icon', {
  icon: false
});

// Toast with custom icon
this.toastService.success('This toast has a custom icon', {
  icon: 'ri-star-line'
});`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'duration',
    title: 'components.toast.examples.duration.title',
    description: 'components.toast.examples.duration.description',
    anchor: 'duration',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Fast toast (2 seconds)
this.toastService.success('Fast toast', { timeout: 2000 });

// Long toast (10 seconds)
this.toastService.info('Long toast', { timeout: 10000 });

// Persistent toast (does not close automatically)
this.toastService.warning('Persistent toast', { timeout: 0 });`,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'loading',
    title: 'components.toast.examples.loading.title',
    description: 'components.toast.examples.loading.description',
    anchor: 'loading',
    examples: [
      {
        title: 'codeExamples.typescript',
        code: `// Show loading toast and get reference
const toastRef = this.toastService.loading('Processing...');

// Update after completion using the reference
setTimeout(() => {
  toastRef.update({
    type: 'success',        // New type
    message: 'Success!',    // New message
    timeout: 3000,          // Auto close after 3 seconds
    icon: 'ri-check-line',  // Change icon to success
  });
}, 2000);`,
        language: 'typescript',
      },
    ],
  },
];
