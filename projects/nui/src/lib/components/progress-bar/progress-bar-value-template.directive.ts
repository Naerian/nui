import { Directive } from '@angular/core';

/**
 * Marker directive for the custom value template slot.
 *
 * @example
 * <nui-progress-bar [value]="70" valuePosition="right">
 *   <ng-template nuiPbValue let-percent>
 *     {{ percent >= 80 ? '🔥' : '🚀' }} {{ percent | number:'1.0-0' }}%
 *   </ng-template>
 * </nui-progress-bar>
 *
 * Template context:
 * - `$implicit` / `let-value` — raw numeric value (same as the `value` input)
 * - `let-percent` — computed percentage (0-100, two-decimal precision)
 * - `let-max` — raw maxValue
 * - `let-text` — pre-formatted string (percentage or fractional, controlled by `valueFormat`)
 */
@Directive({
  selector: '[nuiPbValue]',
  standalone: true,
})
export class NuiProgressBarValueTemplateDirective {}
