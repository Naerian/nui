import { Directive, TemplateRef } from '@angular/core';
import { FabButtonItemResolved } from '../models/fab-button.model';

/** Context exposed to each `fabItem` template instance. */
export interface FabItemContext {
  /** The resolved item object (shorthand: `let-item`). */
  $implicit: FabButtonItemResolved;
  /** Zero-based position in `resolvedItems()`. */
  index: number;
  /** Whether the FAB menu is currently open. */
  isOpen: boolean;
}

/**
 * Structural directive that marks an `<ng-template>` as the custom item template.
 * The template is stamped once per item through `@for` in the FAB menu list.
 *
 * @example
 * ```html
 * <nui-fab-button [items]="actions">
 *   <ng-template fabItem let-item let-idx="index" let-open="isOpen">
 *     <span class="badge">{{ idx + 1 }}</span>
 *     <i [class]="item.icon"></i>
 *     <span>{{ item.label }}</span>
 *   </ng-template>
 * </nui-fab-button>
 * ```
 */
@Directive({
  selector: 'ng-template[fabItem]',
  standalone: true,
})
export class FabItemDirective {
  constructor(public readonly tpl: TemplateRef<FabItemContext>) {}

  /** Type guard for strongly-typed template context. */
  static ngTemplateContextGuard(
    _dir: FabItemDirective,
    ctx: unknown,
  ): ctx is FabItemContext {
    return true;
  }
}
