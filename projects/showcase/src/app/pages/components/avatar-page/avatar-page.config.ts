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
  ],
};
