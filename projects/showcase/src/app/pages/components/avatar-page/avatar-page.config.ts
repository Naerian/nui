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
      anchor: 'basico',
      examples: [
        {
          title: 'components.avatar.basic.codeTitle',
          code: `<nui-avatar src="https://i.pravatar.cc/150?img=12" alt="John Doe"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'types',
      title: 'components.avatar.types.title',
      description: 'components.avatar.types.description',
      anchor: 'tipos',
      note: {
        type: 'info',
        content: 'components.avatar.types.note',
      },
      examples: [
        {
          title: 'components.avatar.types.codeTitle',
          code: `<!-- 1. Imagen (prioridad más alta) -->
<nui-avatar src="https://i.pravatar.cc/150?img=5" alt="User"></nui-avatar>

<!-- 2. Iniciales (si no hay imagen) -->
<nui-avatar initials="JD" color="primary"></nui-avatar>

<!-- 3. Icono (si no hay imagen ni iniciales) -->
<nui-avatar icon="ri-user-star-line" color="secondary"></nui-avatar>

<!-- 4. Iniciales desde alt (si no hay nada más) -->
<nui-avatar alt="Alan Turing" color="accent"></nui-avatar>

<!-- 5. Icono por defecto (fallback final) -->
<nui-avatar></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'variants',
      title: 'components.avatar.variants.title',
      description: 'components.avatar.variants.description',
      anchor: 'variantes',
      examples: [
        {
          title: 'components.avatar.variants.codeTitle',
          code: `<!-- Circular (default) -->
<nui-avatar src="..." variant="circular"></nui-avatar>

<!-- Rounded (bordes redondeados) -->
<nui-avatar src="..." variant="rounded"></nui-avatar>

<!-- Square (rectangular) -->
<nui-avatar src="..." variant="square"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'sizes',
      title: 'components.avatar.sizes.title',
      description: 'components.avatar.sizes.description',
      anchor: 'tamanos',
      examples: [
        {
          title: 'components.avatar.sizes.codeTitle',
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
      anchor: 'colores',
      examples: [
        {
          title: 'components.avatar.colors.codeTitle',
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
      anchor: 'tamano-custom',
      note: {
        type: 'info',
        content: 'components.avatar.customSize.note',
      },
      examples: [
        {
          title: 'components.avatar.customSize.codeTitle',
          code: `<!-- Avatar de 120px -->
<nui-avatar [customSize]="120" src="..." variant="rounded"></nui-avatar>

<!-- Avatar de 80px con iniciales -->
<nui-avatar [customSize]="80" initials="CS" color="primary"></nui-avatar>`,
          language: 'html',
        },
      ],
    },
    {
      id: 'error',
      title: 'components.avatar.error.title',
      description: 'components.avatar.error.description',
      anchor: 'manejo-errores',
      examples: [
        {
          title: 'components.avatar.error.codeTitle',
          code: `<!-- Si la imagen falla, automáticamente usa las iniciales o icono -->
<nui-avatar 
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
          title: 'components.avatar.api.inputsCodeTitle',
          code: `// Inputs del componente
@Input() src?: string;                          // URL de la imagen
@Input() alt?: string;                          // Texto alternativo
@Input() initials?: string;                     // Iniciales a mostrar
@Input() icon?: string;                         // Icono (Remix Icon)
@Input() size: AvatarSize = 'md';              // Tamaño: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
@Input() customSize?: number;                  // Tamaño personalizado en píxeles
@Input() variant: AvatarVariant = 'circular';  // Forma: 'circular' | 'rounded' | 'square'
@Input() color?: ThemeColor;                   // Color de fondo cuando no hay imagen
@Input() textColor?: string;                   // Color del texto/icono

// Outputs del componente
@Output() imageError = new EventEmitter<Event>(); // Se emite cuando falla la carga de imagen`,
          language: 'typescript',
        },
        {
          title: 'components.avatar.api.usageCodeTitle',
          code: `// Ejemplo completo de uso
import { Component } from '@angular/core';

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
    // El componente automáticamente muestra el fallback
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
      anchor: 'estilos',
      examples: [
        {
          title: 'components.avatar.styling.codeTitle',
          code: `// Personalización de variables CSS
:root {
  /* Tamaños predefinidos */
  --nui-avatar-size-xs: 24px;
  --nui-avatar-size-sm: 32px;
  --nui-avatar-size-md: 40px;
  --nui-avatar-size-lg: 48px;
  --nui-avatar-size-xl: 64px;
  
  /* Tipografía y escalado */
  --nui-avatar-font-size-xs: 10px;
  --nui-avatar-font-size-sm: 12px;
  --nui-avatar-font-size-md: 14px;
  --nui-avatar-font-size-lg: 16px;
  --nui-avatar-font-size-xl: 20px;
  --nui-avatar-font-weight: var(--font-weight-semibold);
  
  /* Tamaño de iconos */
  --nui-avatar-icon-size-xs: 14px;
  --nui-avatar-icon-size-sm: 16px;
  --nui-avatar-icon-size-md: 20px;
  --nui-avatar-icon-size-lg: 24px;
  --nui-avatar-icon-size-xl: 32px;
  
  /* Bordes redondeados */
  --nui-avatar-border-radius-circular: 50%;
  --nui-avatar-border-radius-rounded: var(--border-radius-md);
  --nui-avatar-border-radius-square: 0;
  
  /* Colores por defecto */
  --nui-avatar-bg-default: var(--nui-bg-tertiary);
  --nui-avatar-text-default: var(--nui-text-secondary);
  
  /* Borde opcional */
  --nui-avatar-border-width: 0;
  --nui-avatar-border-color: transparent;
}

// Ejemplo de customización
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
