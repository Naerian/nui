import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, ModalDialogService, SidebarPanelService } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { DOCK_PAGE_CONFIG } from './dock-page.config';
import { CommonModule } from '@angular/common';

/**
 * Página de documentación del componente NuiDock.
 *
 * Documenta el dock unificado que gestiona modales y paneles minimizados.
 * El dock se crea automáticamente por NuiDockService cuando el primer ítem
 * es añadido, por lo que los ejemplos de esta página se demuestran mediante
 * los propios componentes que lo utilizan (ModalDialog y SidebarPanel).
 */
@Component({
  selector: 'app-dock-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './dock-page.component.html',
  styleUrl: './dock-page.component.scss',
})
export class DockPageComponent extends BaseComponentPage {
  override pageConfig = DOCK_PAGE_CONFIG;

  private readonly _modalService = inject(ModalDialogService);
  private readonly _sidebarService = inject(SidebarPanelService);

  tabs: ComponentTab[] = [
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-file-list-3-line',
      sections: ['api-service', 'api-dock-item', 'api-dock-tab-config'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-colors', 'theming-layout'],
    },
    {
      id: 'i18n',
      label: 'common.tabs.i18n',
      icon: 'ri-translate-2',
      sections: ['i18n-tokens'],
    },
    {
      id: 'global-config',
      label: 'common.tabs.globalConfig',
      icon: 'ri-settings-3-line',
      sections: ['global-config-options', 'global-config-example'],
    },
  ];

  openMinimizableModal(): void {
    this._modalService.open({
      id: 'dock-page-demo-modal',
      minimizable: true,
      title: 'Minimizable Modal',
      message: 'Minimize this modal to see the NuiDock appear at the bottom of the screen.',
      confirmText: 'Close',
    });
  }

  openMinimizablePanel(): void {
    this._sidebarService.open({
      id: 'dock-page-demo-panel',
      title: 'Minimizable Panel',
      minimizable: true,
      position: 'right',
      htmlContent: 'Minimize this panel to see the NuiDock chip.',
    });
  }
}
