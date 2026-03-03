import { Directive, TemplateRef } from '@angular/core';

/** Context exposed to the `fabTrigger` template. */
export interface FabTriggerContext {
  /** Whether the FAB is currently open. */
  isOpen: boolean;
}

/**
 * Structural directive that marks an `<ng-template>` as a custom trigger template.
 *
 * @example
 * ```html
 * <nui-fab-button [items]="actions">
 *   <ng-template fabTrigger let-open="isOpen">
 *     <i class="ri-menu-line" *ngIf="!open"></i>
 *     <i class="ri-close-line" *ngIf="open"></i>
 *   </ng-template>
 * </nui-fab-button>
 * ```
 */
@Directive({
  selector: 'ng-template[fabTrigger]',
  standalone: true,
})
export class FabTriggerDirective {
  constructor(public readonly tpl: TemplateRef<FabTriggerContext>) {}

  /** Type guard for strongly-typed template context. */
  static ngTemplateContextGuard(
    _dir: FabTriggerDirective,
    ctx: unknown,
  ): ctx is FabTriggerContext {
    return true;
  }
}
