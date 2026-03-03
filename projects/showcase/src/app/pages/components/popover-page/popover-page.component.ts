import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, PopoverDirective } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { POPOVER_PAGE_CONFIG } from './popover-page.config';
import { UserProfilePopoverComponent } from './components/user-profile-popover.component';

/**
 * Página de documentación del componente Popover
 *
 * Muestra ejemplos de uso del componente Popover con diferentes configuraciones:
 * - Uso básico con texto
 * - Posiciones (top, bottom, left, right)
 * - Eventos de activación (click, hover, focus)
 * - Templates personalizados
 * - Componentes dinámicos
 * - Delays de show/hide
 * - Personalización (ancho, flecha, clase CSS)
 * - Opciones de cierre
 * - Backdrop
 * - Estado deshabilitado
 */
@Component({
  selector: 'app-popover-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    PopoverDirective,
    SectionTitleComponent,
    CodeBlockComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './popover-page.component.html',
  styleUrl: './popover-page.component.scss',
})
export class PopoverPageComponent extends BaseComponentPage {
  override pageConfig = POPOVER_PAGE_CONFIG;
  UserProfilePopoverComponent = UserProfilePopoverComponent;

  // Estado para ejemplos interactivos
  isDisabled = signal(false);

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: [
        'basic',
        'colors',
        'positions',
        'events',
        'template',
        'component',
        'delays',
        'customization',
        'closeOptions',
        'backdrop',
        'disabled',
      ],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs', 'api-config', 'api-context', 'api-tokens'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: [
        'theming-spacing',
        'theming-typography',
        'theming-borders',
        'theming-shadow',
        'theming-zindex',
        'theming-animation',
      ],
    },
  ];

  /**
   * Manejador de acción para el ejemplo de template
   */
  handleAction(): void {
    console.log('Acción confirmada desde el popover');
  }

  /**
   * Toggle del estado disabled
   */
  toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }
}
