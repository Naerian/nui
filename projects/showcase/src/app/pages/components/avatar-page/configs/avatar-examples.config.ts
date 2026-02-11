import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de las secciones de ejemplos interactivos del Avatar
 */
export const AVATAR_EXAMPLES_SECTIONS: ComponentSection[] = [
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
    note: {
      type: 'info',
      content: 'components.avatar.colors.note',
    },
    anchor: 'colors',
    examples: [
      {
        title: 'codeExamples.html',
        code: `
<!-- Using predefined theme colors -->
<nui-avatar initials="P" color="primary"></nui-avatar>
<nui-avatar initials="S" color="secondary"></nui-avatar>
<nui-avatar initials="A" color="accent"></nui-avatar>
<nui-avatar initials="S" color="success"></nui-avatar>
<nui-avatar initials="I" color="info"></nui-avatar>
<nui-avatar initials="W" color="warning"></nui-avatar>
<nui-avatar initials="D" color="danger"></nui-avatar>

<!-- Custom color (not in theme) -->
<nui-avatar initials="Z" color="white"></nui-avatar>`,
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
        code: `<!-- Avatar group with max 3 visible avatars and rounded variant -->
<nui-avatar-group [max]="3" [avatars]="avatars" [variant]="'rounded'" />

<!-- Avatar group with max 3 visible avatars and circular variant -->
<nui-avatar-group [max]="3" [avatars]="avatars" [variant]="'circular'" />

<!-- Avatar group with max 3 visible avatars and square variant -->
<nui-avatar-group [max]="3" [avatars]="avatars" [variant]="'square'" />

<!-- Avatar group with max 3 visible avatars, circular variant and no borders -->
<nui-avatar-group [max]="3" [avatars]="avatars" [variant]="'circular'" [bordered]="false" />

<!-- Avatar group with max 3 visible avatars, circular variant, no borders and xs size -->
<nui-avatar-group [max]="3" [avatars]="avatars" [variant]="'circular'" [bordered]="false" [size]="'xs'" />`,
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
];
