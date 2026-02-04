import { ComponentPageConfig } from '../../../core/models';

/**
 * Configuración de la página de documentación del componente Avatar
 */
export const AVATAR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.avatar.title',
  subtitle: 'components.avatar.subtitle',
  sections: [
    {
      id: 'basic',
      title: 'components.avatar.basic.title',
      description: 'components.avatar.basic.description',
      anchor: 'basic',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-avatar src="https://i.pravatar.cc/150?img=12" alt="John Doe"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'types',
      title: 'components.avatar.types.title',
      description: 'components.avatar.types.description',
      anchor: 'types',
      note: {
        type: 'info',
        content: 'components.avatar.types.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- 1. Image (highest priority) -->
<nui-avatar src="https://i.pravatar.cc/150?img=5" alt="User"></nui-avatar>

<!-- 2. Initials (if no image) -->
<nui-avatar initials="JD" color="primary"></nui-avatar>

<!-- 3. Icon (if no image or initials) -->
<nui-avatar icon="ri-user-star-line" color="secondary"></nui-avatar>

<!-- 4. Initials from alt (if nothing else) -->
<nui-avatar alt="Alan Turing" color="accent"></nui-avatar>

<!-- 5. Default icon (final fallback) -->
<nui-avatar></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'variants',
      title: 'components.avatar.variants.title',
      description: 'components.avatar.variants.description',
      note: {
        type: 'info',
        content: 'components.avatar.variants.note',
      },
      anchor: 'variants',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- Circular (default) -->
<nui-avatar src="..." variant="circular"></nui-avatar>

<!-- Rounded (rounded corners) -->
<nui-avatar src="..." variant="rounded"></nui-avatar>

<!-- Square (square corners) -->
<nui-avatar src="..." variant="square"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.avatar.sizes.title',
      description: 'components.avatar.sizes.description',
      note: {
        type: 'info',
        content: 'components.avatar.sizes.note',
      },
      anchor: 'sizes',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-avatar size="xs" initials="XS"></nui-avatar>
<nui-avatar size="sm" initials="SM"></nui-avatar>
<nui-avatar size="md" initials="MD"></nui-avatar>
<nui-avatar size="lg" initials="LG"></nui-avatar>
<nui-avatar size="xl" initials="XL"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'colors',
      title: 'components.avatar.colors.title',
      description: 'components.avatar.colors.description',
      anchor: 'colors',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-avatar initials="P" color="primary"></nui-avatar>
<nui-avatar initials="S" color="secondary"></nui-avatar>
<nui-avatar initials="A" color="accent"></nui-avatar>
<nui-avatar initials="S" color="success"></nui-avatar>
<nui-avatar initials="I" color="info"></nui-avatar>
<nui-avatar initials="W" color="warning"></nui-avatar>
<nui-avatar initials="D" color="danger"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'customSize',
      title: 'components.avatar.customSize.title',
      description: 'components.avatar.customSize.description',
      anchor: 'custom-size',
      note: {
        type: 'info',
        content: 'components.avatar.customSize.note',
      },
      examples: [
        {
          title: 'codeExamples.html',
          code: `<!-- 120px avatar -->
<nui-avatar [customSize]="120" src="..." variant="rounded"></nui-avatar>

<!-- 80px avatar with initials -->
<nui-avatar [customSize]="80" initials="CS" color="primary"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'grouped',
      title: 'components.avatar.grouped.title',
      description: 'components.avatar.grouped.description',
      note: {
        type: 'info',
        content: 'components.avatar.grouped.note',
      },
      anchor: 'grouped',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-avatar-group [max]="3" [avatars]="avatars" />`,
          language: 'html',
        },
        {
          title: 'codeExamples.typescript',
          code: `avatars: AvatarGroupItem[] = [
              { src: this.avatarUrl1, alt: 'John Doe' },
              { initials: 'JD', color: 'primary' },
              { src: this.avatarUrl2, alt: 'User Image' },
              { icon: 'ri-user-star-line', color: 'secondary' },
              { initials: 'AT', color: 'accent' },
              { alt: 'Alan Turing', color: 'success' },
            ];`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'error',
      title: 'components.avatar.error.title',
      description: 'components.avatar.error.description',
      anchor: 'error-handling',
      examples: [
        {
          title: 'codeExamples.html',
          code: `<nui-avatar 
  src="invalid-url.jpg" 
  initials="ER" 
  color="danger"
  alt="Error Fallback">
</nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'api',
      title: 'components.avatar.api.title',
      description: 'components.avatar.api.description',
      anchor: 'api',
      examples: [
        {
          title: 'codeExamples.componentCode',
          code: `@Input() src?: string;                          // Image URL
@Input() alt?: string;                          // Alternative text
@Input() initials?: string;                     // Initials to display
@Input() icon?: string;                         // Icon (Remix Icon)
@Input() size: AvatarSize = 'md';              // Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() customSize?: number;                  // Custom size in pixels
@Input() variant: AvatarVariant = 'circular';  // Shape: 'circular' | 'rounded' | 'square'
@Input() color?: ThemeColor;                   // Background color when no image
@Input() textColor?: string;                   // Text/icon color

@Output() imageError = new EventEmitter<Event>(); // Emitted when image loading fails`,
          language: 'typescript',
        },
        {
          title: 'codeExamples.usageCode',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <nui-avatar
      [src]="userImage"
      [alt]="userName"
      [initials]="userInitials"
      size="lg"
      variant="rounded"
      color="primary"
      (imageError)="onImageError($event)">
    </nui-avatar>
  \`
})
export class ExampleComponent {
  userImage = 'https://example.com/user.jpg';
  userName = 'John Doe';
  userInitials = 'JD';

  onImageError(event: Event): void {
    console.log('Error loading image:', event);
    // The component automatically shows the fallback
  }
}`,
          language: 'typescript',
        },
      ],
    },
    {
      id: 'styling',
      title: 'components.avatar.styling.title',
      description: 'components.avatar.styling.description',
      anchor: 'styling',
      examples: [
        {
          title: 'codeExamples.cssVariables',
          code: `:root {
  /* Predefined sizes */
  --nui-avatar-size-xs: 24px;
  --nui-avatar-size-sm: 32px;
  --nui-avatar-size-md: 40px;
  --nui-avatar-size-lg: 48px;
  --nui-avatar-size-xl: 64px;
  
  /* Typography and scaling */
  --nui-avatar-font-size-xs: 10px;
  --nui-avatar-font-size-sm: 12px;
  --nui-avatar-font-size-md: 14px;
  --nui-avatar-font-size-lg: 16px;
  --nui-avatar-font-size-xl: 20px;
  --nui-avatar-font-weight: var(--nui-font-weight-semibold);
  
  /* Icon size */
  --nui-avatar-icon-size-xs: 14px;
  --nui-avatar-icon-size-sm: 16px;
  --nui-avatar-icon-size-md: 20px;
  --nui-avatar-icon-size-lg: 24px;
  --nui-avatar-icon-size-xl: 32px;
  
  /* Border radius */
  --nui-avatar-border-radius-circular: 50%;
  --nui-avatar-border-radius-rounded: var(--nui-border-radius-md);
  --nui-avatar-border-radius-square: 0;
  
  /* Default colors */
  --nui-avatar-bg-default: var(--nui-bg-tertiary);
  --nui-avatar-text-default: var(--nui-text-secondary);
  
  /* Optional border */
  --nui-avatar-border-width: 0;
  --nui-avatar-border-color: transparent;
}

// Example of customizing the avatar styles
.my-custom-avatar {
  --nui-avatar-size-md: 56px;
  --nui-avatar-font-size-md: 18px;
  --nui-avatar-border-radius-rounded: 12px;
  --nui-avatar-border-width: 2px;
  --nui-avatar-border-color: var(--primary-color);
}`,
          language: 'scss',
        },
      ],
    },
  ],
};
