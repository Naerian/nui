import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ActionMenuSubmenuComponent } from './action-menu-submenu/action-menu-submenu.component';
import { ActionMenuComponent } from './action-menu.component';
import { ActionMenuItemComponent } from './action-menu-item/action-menu-item.component';
import { ButtonDirective } from '../button/button.directive';

@NgModule({
  declarations: [
    ActionMenuComponent,
    ActionMenuSubmenuComponent,
    ActionMenuItemComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    ButtonDirective,
  ],
  exports: [
    ActionMenuComponent,
    ActionMenuSubmenuComponent,
    ActionMenuItemComponent,
  ],
})
export class ActionMenuModule {}
