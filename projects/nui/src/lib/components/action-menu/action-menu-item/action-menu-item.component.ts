import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChildren,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ActionMenuItem } from '../models/action-menu.model';

@Component({
  selector: 'nui-action-menu-item',
  templateUrl: './action-menu-item.component.html',
})
export class ActionMenuItemComponent {
  @Input() action?: string; // Nombre o identificador de la acción a ejecutar
  @Input() label?: string; // Texto que se muestra en el item del menú
  @Input() title?: string; // Título para accesibilidad
  @Input() icon?: string; // Icono asociado al item (puede ser una clase de icono)
  @Input() shortcut?: string; // Atajo de teclado para el item (visual, no funcional)
  @Input() id?: string; // ID único para el item
  @Input() disabled = false; // Indica si el item está deshabilitado

  @Output() onAction = new EventEmitter<void>();

  // Capturamos solo los hijos directos (<action-menu-item> dentro de este)
  @ContentChildren(ActionMenuItemComponent, { descendants: false })
  childrenComponents!: QueryList<ActionMenuItemComponent>;

  // Para renderizar contenido personalizado si no usan [label]
  @ViewChild('contentTpl', { read: TemplateRef, static: true })
  contentTpl!: TemplateRef<any>;

  /**
   * Función para crear un ID único para cada item del menú.
   * Se utiliza para identificar los items en el menú.
   */
  createItemId(): string {
    return `menu-item-${crypto.randomUUID()}`;
  }

  // Método para convertir este componente a un MenuItem
  // Esto es útil para convertir componentes hijos en items del menú
  toMenuItem(): ActionMenuItem {
    const children = this.childrenComponents
      .map((c) => c.toMenuItem())
      .filter(Boolean);

    // Creamos el objeto
    const menuItem: ActionMenuItem = {
      action: this.action || '',
      label: this.label || '',
      icon: this.icon,
      shortcut: this.shortcut,
      templateRef: !this.label ? this.contentTpl : null,
      id: this.id || this.createItemId(),
      children: children.length ? children : undefined,
      disabled: this.disabled,
      onAction: () => this.onAction.emit(),
      title: this.title || this.label || '',
    };

    // Si no tiene label ni templateRef, no lo incluimos
    if (!menuItem.label && !menuItem.templateRef) return null as any;

    return menuItem;
  }
}
