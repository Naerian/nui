import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ToastService } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
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
    ComponentTabsComponent,
  ],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
})
export class ToastPageComponent extends BaseComponentPage {
  override pageConfig = TOAST_PAGE_CONFIG;
  private toastService = inject(ToastService);

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'with-title',
        'with-actions',
        'positions',
        'icon-top',
        'custom-icons',
        'duration',
        'loading',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-service', 'api-config', 'api-global', 'api-types', 'api-usage'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: [
        'theming-container',
        'theming-typography',
        'theming-icon',
        'theming-close',
        'theming-progress',
        'theming-types',
        'theming-animations',
        'theming-examples',
      ],
    },
  ];

  // === BASIC TOASTS ===
  showSuccess(): void {
    this.toastService.success('Operation completed successfully');
  }

  showError(): void {
    this.toastService.error('An error occurred while processing your request');
  }

  showWarning(): void {
    this.toastService.warning('Please review this information carefully');
  }

  showInfo(): void {
    this.toastService.info('New update availables for your application');
  }

  // === WITH TITLE ===
  showSuccessWithTitle(): void {
    this.toastService.success('Changes saved successfully', {
      title: 'Save Successful',
    });
  }

  showErrorWithTitle(): void {
    this.toastService.error('Could not connect to the server', {
      title: 'Connection Error',
    });
  }

  // === WITH ACTIONS ===
  showWithActions(): void {
    const toastRef = this.toastService.success('Item deleted', {
      title: 'Deleted',
      timeout: 0, // Persistent until user action
      buttonsVariant: 'solid',
      actions: [
        {
          label: 'Undo',
          onClick: () => {
            console.log('Action undone');
            alert('You have undone the action');
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

  showMiddlePositions(): void {
    this.toastService.warning('Middle Left', { position: 'middle-left' });
    setTimeout(() => {
      this.toastService.warning('Middle Center', { position: 'middle-center' });
    }, 300);
    setTimeout(() => {
      this.toastService.warning('Middle Right', { position: 'middle-right' });
    }, 600);
  }

  // === ICON TOP ===
  showIconTopToast(): void {
    this.toastService.info('This toast has the icon at the top', {
      iconPosition: 'top',
    });
  }

  showIconTopWithTitle(): void {
    this.toastService.warning('This toast has the icon at the top', {
      title: 'Icon Top Toast',
      iconPosition: 'top',
    });
  }

  showIconTopWithActions(): void {
    const toastRef = this.toastService.success('This toast has the icon at the top', {
      title: 'Icon Top Toast with Actions',
      iconPosition: 'top',
      actions: [
        {
          label: 'Action',
          onClick: () => {
            console.log('Icon Top Action clicked');
            alert('You have clicked the action');
            toastRef.close();
          },
        },
        {
          label: 'Close',
          onClick: () => {
            toastRef.close();
          },
        },
      ],
    });
  }

  // == CUSTOM ICON ==
  showWithoutIconToast(): void {
    this.toastService.info('This toast has no icon', {
      icon: false,
    });
  }

  showCustomIconToast(): void {
    this.toastService.success('This toast has a custom icon', {
      icon: 'ri-star-line',
    });
  }

  // === DURATION ===
  showQuickToast(): void {
    this.toastService.success('Quick message', { timeout: 2000 });
  }

  showLongToast(): void {
    this.toastService.info('Long message', { timeout: 10000 });
  }

  showPersistentToast(): void {
    this.toastService.warning('Persistent toast (does not close automatically)', {
      timeout: 0,
    });
  }

  // === LOADING ===
  showLoading(): void {
    const toastRef = this.toastService.loading('Processing...');

    setTimeout(() => {
      toastRef.update({
        type: 'success',
        message: 'Success!',
        timeout: 3000,
        icon: 'ri-check-line',
      });
    }, 2000);
  }
}
