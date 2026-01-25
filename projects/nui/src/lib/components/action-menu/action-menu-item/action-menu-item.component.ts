import {
  Component,
  TemplateRef,
  input,
  output,
  contentChildren,
  viewChild,
  booleanAttribute,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActionMenuItem } from '../models/action-menu.model';

@Component({
  selector: 'nui-action-menu-item',
  standalone: true,
  templateUrl: './action-menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuItemComponent {
  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Nombre o identificador de la acción. */
  readonly action = input<string>();

  /** Texto visible. */
  readonly label = input<string>();

  /** Título accesible. */
  readonly title = input<string>();

  /** Clase del icono. */
  readonly icon = input<string>();

  /** Atajo visual (ej: 'Ctrl+C'). */
  readonly shortcut = input<string>();

  /** ID único (opcional, se genera si falta). */
  readonly id = input<string>();

  /** Estado deshabilitado. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** * Indica si es un separador.
   * Útil si alguien quiere usar el componente para pintar una línea.
   */
  readonly separator = input(false, { transform: booleanAttribute });

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  readonly onAction = output<void>();

  // ========================================================================
  // QUERIES (Signals)
  // ========================================================================

  /** * Capturamos hijos directos para soportar anidación declarativa
   * <nui-action-menu-item>
   * <nui-action-menu-item>...</nui-action-menu-item>
   * </nui-action-menu-item>
   */
  readonly childrenComponents = contentChildren(ActionMenuItemComponent, {
    descendants: false,
  });

  /** Referencia al template interno para proyección de contenido custom */
  readonly contentTpl = viewChild.required<TemplateRef<any>>('contentTpl');

  // ========================================================================
  // PUBLIC API (Used by Parent)
  // ========================================================================

  /**
   * Convierte este componente (declarativo) en un objeto de datos (ActionMenuItem).
   * El componente padre (ActionMenu) llama a esto para construir su modelo.
   */
  toMenuItem(): ActionMenuItem | null {
    // 1. Convertir hijos recursivamente
    const children = this.childrenComponents()
      .map((c) => c.toMenuItem())
      .filter((item): item is ActionMenuItem => !!item);

    // 2. Determinar si usamos el template custom
    // Si no hay label, asumimos que el contenido proyectado es lo que se debe mostrar
    const hasCustomContent = !this.label() && !this.separator();
    const templateRef = hasCustomContent ? this.contentTpl() : undefined;

    // 3. Generar ID si no existe
    const finalId = this.id() || `menu-item-${crypto.randomUUID()}`;

    // 4. Construir objeto
    const menuItem: ActionMenuItem = {
      id: finalId,
      action: this.action(),
      label: this.label(),
      title: this.title() || this.label() || '',
      icon: this.icon(),
      shortcut: this.shortcut(),
      disabled: this.disabled(),
      separator: this.separator(),
      templateRef: templateRef,
      children: children.length ? children : undefined,

      // La función onAction debe capturar el emit del output
      onAction: () => this.onAction.emit(),
    };

    // Validación básica: Si no es separador y no tiene label ni template, es inválido
    if (!menuItem.separator && !menuItem.label && !menuItem.templateRef) {
      return null;
    }

    return menuItem;
  }
}
