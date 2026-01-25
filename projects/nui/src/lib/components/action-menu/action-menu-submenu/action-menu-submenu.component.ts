import {
  Component,
  ViewEncapsulation,
  HostListener,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ActionMenuItem } from '../models/action-menu.model';
import {
  NUISize,
  NUIColor,
  DEFAULT_SIZE,
  DEFAULT_COLOR,
} from '../../../configs';

@Component({
  selector: 'nui-action-menu-submenu',
  templateUrl: './action-menu-submenu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    ActionMenuSubmenuComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuSubmenuComponent {
  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Lista de items del submenú. */
  readonly items = input<ActionMenuItem[]>([]);

  /** Icono de flecha para submenús anidados. */
  readonly iconSubmenu = input<string>('ri-arrow-right-s-line');

  /** Tamaño heredado del padre. */
  readonly size = input<NUISize>(DEFAULT_SIZE);

  /** Color heredado del padre. */
  readonly color = input<NUIColor>(DEFAULT_COLOR);

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  /** Emite cuando se acciona un item final (hoja). */
  readonly onItemAction = output<ActionMenuItem>();

  // ========================================================================
  // LOGIC METHODS
  // ========================================================================

  /**
   * Maneja el click. Solo emite si es un nodo hoja (sin hijos).
   */
  onItemClick(item: ActionMenuItem) {
    if (!item.children || item.children.length === 0) {
      if (item.onAction) {
        item.onAction();
      }
      this.onItemAction.emit(item);
    }
  }

  /**
   * Manejo de teclado específico para submenús (cerrar con flecha izquierda).
   */
  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        // CDK Menu gestiona la navegación, pero a veces necesitamos forzar
        // el cierre o permitir la propagación para que el padre lo cierre.
        break;

      // Prevenir scroll con teclas de navegación
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End':
        event.preventDefault();
        break;
    }
  }
}
