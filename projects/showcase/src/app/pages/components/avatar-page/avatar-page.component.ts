import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { CodeExample } from '../../../core/models';

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AvatarComponent,
    CodeBlockComponent,
    SectionTitleComponent,
  ],
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.scss'],
})
export class AvatarPageComponent {
  // 1. Uso Básico (Imagen)
  basicExamples: CodeExample[] = [
    {
      title: 'components.avatar.basic.codeTitle',
      code: `<nui-avatar src="https://i.pravatar.cc/150?img=12" alt="John Doe"></nui-avatar>`,
      language: 'html',
    },
  ];

  // 2. Tipos de Contenido y Prioridad
  contentTypeExamples: CodeExample[] = [
    {
      title: 'components.avatar.types.codeTitle',
      code: `<nui-avatar src="https://i.pravatar.cc/150?img=5" alt="User"></nui-avatar>

<nui-avatar initials="JD" color="primary"></nui-avatar>

<nui-avatar icon="ri-user-star-line" color="secondary"></nui-avatar>

<nui-avatar alt="Alan Turing" color="accent"></nui-avatar>

<nui-avatar></nui-avatar>`,
      language: 'html',
    },
  ];

  // 3. Variantes de Forma
  variantExamples: CodeExample[] = [
    {
      title: 'components.avatar.variants.codeTitle',
      code: `<nui-avatar src="..." variant="circular"></nui-avatar>
<nui-avatar src="..." variant="rounded"></nui-avatar>
<nui-avatar src="..." variant="square"></nui-avatar>`,
      language: 'html',
    },
  ];

  // 4. Tamaños
  sizeExamples: CodeExample[] = [
    {
      title: 'components.avatar.sizes.codeTitle',
      code: `<nui-avatar size="xs" initials="XS"></nui-avatar>
<nui-avatar size="sm" initials="SM"></nui-avatar>
<nui-avatar size="md" initials="MD"></nui-avatar>
<nui-avatar size="lg" initials="LG"></nui-avatar>
<nui-avatar size="xl" initials="XL"></nui-avatar>`,
      language: 'html',
    },
  ];

  // 5. Colores
  colorExamples: CodeExample[] = [
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
  ];

  // 6. Tamaño Personalizado
  customSizeExamples: CodeExample[] = [
    {
      title: 'components.avatar.customSize.codeTitle',
      code: `<nui-avatar [customSize]="120" src="..." variant="rounded"></nui-avatar>
<nui-avatar [customSize]="80" initials="CS" color="primary"></nui-avatar>`,
      language: 'html',
    },
  ];

  // 7. Manejo de Errores (Fallback automático)
  errorExamples: CodeExample[] = [
    {
      title: 'components.avatar.error.codeTitle',
      code: `<nui-avatar 
  src="invalid-url.jpg" 
  initials="ER" 
  color="danger"
  alt="Error Fallback">
</nui-avatar>`,
      language: 'html',
    },
  ];

  // URL de ejemplo para las imágenes
  avatarUrl1 = 'https://i.pravatar.cc/150?img=12';
  avatarUrl2 = 'https://i.pravatar.cc/150?img=5';
  avatarUrl3 = 'https://i.pravatar.cc/150?img=3';
}
