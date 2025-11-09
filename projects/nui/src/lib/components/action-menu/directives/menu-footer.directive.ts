import { Directive } from '@angular/core';

/**
 * Directiva para marcar contenido que debe aparecer en el footer del menú.
 * Permite agregar contenido personalizado al final del menú sin necesidad de ng-template.
 * 
 * @example
 * ```html
 * <nui-action-menu [items]="items">
 *   <div menu-footer>
 *     <button (click)="logout()">
 *       <i class="ri-logout-box-line"></i>
 *       Cerrar Sesión
 *     </button>
 *   </div>
 * </nui-action-menu>
 * ```
 */
@Directive({
  selector: '[menu-footer], [nuiMenuFooter]',
  standalone: true,
})
export class MenuFooterDirective {}
