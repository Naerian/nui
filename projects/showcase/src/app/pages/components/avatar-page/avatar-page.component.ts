import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent, AvatarConfig, AvatarGroupComponent } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { AVATAR_PAGE_CONFIG } from './avatar-page.config';

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AvatarComponent,
    AvatarGroupComponent,
    CodeBlockComponent,
    SectionTitleComponent,
    ComponentTabsComponent,
  ],
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.scss'],
})
export class AvatarPageComponent extends BaseComponentPage {
  override pageConfig = AVATAR_PAGE_CONFIG;

  // Tabs configuration
  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'types', 'variants', 'sizes', 'colors', 'customSize', 'grouped', 'error'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: ['api-inputs', 'api-outputs'],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: ['theming-sizes', 'theming-styles'],
    },
  ];

  // URL de ejemplo para las imágenes
  avatarUrl1 = 'https://i.pravatar.cc/150?img=12';
  avatarUrl2 = 'https://i.pravatar.cc/150?img=5';
  avatarUrl3 = 'https://i.pravatar.cc/150?img=3';

  // Grupo de avatares
  avatars: AvatarConfig[] = [
    { src: this.avatarUrl1, alt: 'John Doe' },
    { initials: 'JD', color: 'primary' },
    { src: this.avatarUrl2, alt: 'User Image' },
    { icon: 'ri-user-star-line', color: 'secondary' },
    { initials: 'AT', color: 'accent' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
    { alt: 'Alan Turing', color: 'success' },
  ];
}
