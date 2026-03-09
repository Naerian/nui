import { Directive, inject, input, TemplateRef } from '@angular/core';

export type NuiProgressBarTemplateSlot = 'value' | 'label';

/**
 * Unified template directive for nui-progress-bar.
 * Use `slot="value"` to replace the value display and `slot="label"` to replace the label.
 * Both can be active simultaneously, each rendered in its own position slot.
 *
 * Template context (identical for both slots):
 * - `$implicit` / `let-text`          — pre-formatted value string (e.g. '80 %' or '3 / 5')
 * - `let-percent="percent"`           — computed percentage (0–100)
 * - `let-v="value"` / `let-value`     — raw numeric value
 * - `let-max="max"`                   — raw maxValue
 * - `let-label="label"`               — string from the [label] input (null if not set)
 *
 * @example
 * <!-- Custom value (right) + custom label (left) simultaneously -->
 * <nui-progress-bar [value]="80" labelPosition="left" valuePosition="right">
 *   <ng-template nuiPbTemplate slot="label">
 *     <i class="ri-upload-cloud-2-line"></i> Upload
 *   </ng-template>
 *   <ng-template nuiPbTemplate slot="value" let-percent="percent">
 *     {{ percent | number:'1.0-0' }}%
 *   </ng-template>
 * </nui-progress-bar>
 */
@Directive({
  selector: '[nuiPbTemplate]',
  standalone: true,
})
export class ProgressBarTemplateDirective {
  readonly slot = input<NuiProgressBarTemplateSlot>('value');
  readonly templateRef = inject(TemplateRef);
}
