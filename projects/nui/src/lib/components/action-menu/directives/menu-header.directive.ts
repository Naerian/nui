import { Directive } from '@angular/core';

/**
 * Directiva para marcar contenido que debe aparecer en el header del menú.
 * Permite agregar contenido personalizado al inicio del menú sin necesidad de ng-template.
 * 
 * @example
 * ```html
 * <nui-action-menu [items]="items">
 *   <div menu-header>
 *     <img src="avatar.jpg" />
 *     <span>John Doe</span>
 *   </div>
 * </nui-action-menu>
 * ```
 */
@Directive({
  selector: '[menu-header], [nuiMenuHeader]',
  standalone: true,
})
export class MenuHeaderDirective {}
