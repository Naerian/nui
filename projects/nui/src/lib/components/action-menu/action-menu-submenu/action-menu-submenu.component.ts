import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { ActionMenuItem } from '../models/action-menu.model';
import { NUISize, DEFAULT_SIZE } from '../../../configs';

@Component({
  selector: 'nui-action-menu-submenu',
  templateUrl: './action-menu-submenu.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuSubmenuComponent {
  /**
   * Lista de items del submenú.
   * Se espera que cada item tenga una estructura compatible con ActionMenuItem.
   */
  @Input() items: ActionMenuItem[] | undefined = [];

  /**
   * Icono de la flecha del submenú.
   * Se utiliza para mostrar un icono en el botón que abre el menú.
   */
  @Input() iconSubmenu: string = 'ri-arrow-right-s-line';

  /**
   * Tamaño de los elementos del submenú, en base al tamaño del padre.
   * Se utiliza para definir el tamaño del botón que abre el menú.
   */
  @Input() size: NUISize = DEFAULT_SIZE;

  /**
   * Evento que se emite cuando se hace clic en un item del submenú.
   */
  @Output() onItemAction = new EventEmitter<ActionMenuItem>();

  /**
   * Maneja el click en un item del submenú.
   * Solo ejecuta la acción si el item no tiene hijos (es un item final).
   * Esto evita la propagación múltiple del evento en submenús anidados.
   * @param {ActionMenuItem} item - El item clicado
   */
  onItemClick(item: ActionMenuItem) {
    // Solo ejecutar la acción si el item no tiene hijos (es un item final)
    // Esto evita que se ejecute múltiples veces en submenús anidados
    if (!item.children || item.children.length === 0) {
      if (item.onAction) {
        item.onAction();
      }
      this.onItemAction.emit(item);
    }
  }

  /**
   * Maneja la navegación por teclado en el submenú.
   * Soporta las teclas Escape, ArrowLeft para cerrar el submenú.
   * @param {KeyboardEvent} event - El evento de teclado.
   */
  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
      case 'ArrowLeft':
        // Permitir que el evento se propague para cerrar el submenú
        // El CDK Menu maneja esto automáticamente
        break;

      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End':
        // El CDK Menu ya maneja estas teclas por defecto
        event.preventDefault();
        break;
    }
  }
}
