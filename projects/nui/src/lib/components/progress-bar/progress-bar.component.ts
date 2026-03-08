import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  ProgressBarValuePosition,
  ProgressBarLabelPosition,
  ProgressBarValueFormat,
  DEFAULT_PB_VALUE_POSITION,
  DEFAULT_PB_LABEL_POSITION,
  DEFAULT_PB_VALUE_FORMAT,
} from './models/progress-bar.model';
import { NUIColor, NUIVariant } from '../../configs';
import { DEFAULT_COLOR, DEFAULT_VARIANT } from '../../configs/nui.consts';
import { injectProgressBarConfig } from '../../configs/progress-bar';
import { NuiProgressBarValueTemplateDirective } from './progress-bar-value-template.directive';

@Component({
  selector: 'nui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  private readonly globalConfig = injectProgressBarConfig();

  // ─── Inputs ─────────────────────────────────────────────────────────────────
  readonly compact = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly color = input<NUIColor | undefined>(undefined);
  readonly variant = input<NUIVariant | undefined>(undefined);
  readonly trackColor = input<string | null>(null);
  readonly fillColor = input<string | null>(null);
  readonly textColor = input<string | null>(null);
  readonly value = input<number | null>(0);
  readonly maxValue = input<number | null>(100);
  readonly indeterminate = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly valuePosition = input<ProgressBarValuePosition>(DEFAULT_PB_VALUE_POSITION);
  readonly valueFormat = input<ProgressBarValueFormat>(DEFAULT_PB_VALUE_FORMAT);
  readonly label = input<string | null>(null);
  readonly prefixIcon = input<string | null>(null);
  readonly suffixIcon = input<string | null>(null);
  readonly trailingIcon = input<string | null>(null);
  readonly labelPosition = input<ProgressBarLabelPosition>(DEFAULT_PB_LABEL_POSITION);
  readonly showValueInLabel = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly steps = input<number>(0);

  // ─── Content template ────────────────────────────────────────────────────────
  /** Optional custom template for the value display. Receives {value, percent, max, text} context. */
  readonly valueTemplate = contentChild(NuiProgressBarValueTemplateDirective, { read: TemplateRef });

  // ─── Static IDs (generados una vez) ─────────────────────────────────────────────
  readonly id = `nui-pb-${Math.random().toString(36).substring(2, 9)}`;
  readonly labelId = `${this.id}-label`;

  // ─── Effective values: Input → Config global → Default ─────────────────────────
  readonly effectiveColor = computed(() => this.color() ?? this.globalConfig.color ?? DEFAULT_COLOR);
  readonly effectiveVariant = computed(() => this.variant() ?? this.globalConfig.variant ?? DEFAULT_VARIANT);

  /** Sanitized steps count: must be an integer ≥ 2 to make sense visually. */
  readonly stepsCount = computed(() => {
    const s = Math.floor(this.steps());
    return s >= 2 ? s : 0;
  });

  /**
   * Segment fill ratios (0..1) for stepped mode.
   * Returns null → use standard single-fill render.
   * Semantically incompatible with indeterminate → returns null.
   */
  readonly segments = computed<number[] | null>(() => {
    const n = this.stepsCount();
    if (!n || this.indeterminate()) return null;
    const val = this.value();
    const max = this.maxValue();
    if (val === null || max === null || max === 0) {
      return Array.from({ length: n }, () => 0);
    }
    const filledFloat = Math.max(0, Math.min(n, (val / max) * n));
    const filledWhole = Math.floor(filledFloat);
    return Array.from({ length: n }, (_, i) => {
      if (i < filledWhole) return 1;
      if (i === filledWhole) return filledFloat - filledWhole;
      return 0;
    });
  });

  // ─── Computed ────────────────────────────────────────────────────────────────
  readonly progressBarWidth = computed<string>(() => {
    if (this.indeterminate()) return '100%';
    const val = this.value();
    const max = this.maxValue();
    if (val === null || max === null || max === 0) return '0%';
    return `${Math.max(0, Math.min(100, (val / max) * 100))}%`;
  });

  readonly computedValueText = computed<string>(() => {
    if (this.indeterminate()) return '';
    const val = this.value();
    const max = this.maxValue();
    if (val === null || max === null) return '';
    return this.valueFormat() === 'percentage'
      ? `${Math.round((val / max) * 100)} %`
      : `${val} / ${max}`;
  });

  readonly finalLabelText = computed<string | null>(() => {
    const lbl = this.label();
    const prefix = this.prefixIcon();
    const suffix = this.suffixIcon();
    const showValue = this.showValueInLabel();

    if (!lbl && !prefix && !suffix && !showValue) return null;

    const prefixHtml = prefix ? `<i class="${prefix}"></i>` : '';
    const suffixHtml = suffix ? `<i class="${suffix}"></i>` : '';

    if (this.indeterminate()) {
      const parts = [prefixHtml, lbl, suffixHtml].filter(Boolean);
      return parts.length > 0 ? parts.join(' ') : null;
    }

    const valueText = showValue ? this.computedValueText() : '';
    const parts = [prefixHtml, lbl, valueText, suffixHtml].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : null;
  });

  readonly ariaValueText = computed<string | null>(() => {
    if (this.indeterminate()) return null;
    if (this.showValueInLabel() && this.finalLabelText()) return this.finalLabelText();
    if (this.label()) return this.label();
    if (this.valuePosition() !== 'hidden' && this.computedValueText()) return this.computedValueText();
    return null;
  });

  readonly valueTemplateContext = computed(() => {
    const val = this.value();
    const max = this.maxValue();
    const percent =
      val !== null && max !== null && max !== 0
        ? Math.max(0, Math.min(100, (val / max) * 100))
        : 0;
    return { $implicit: val, value: val, percent, max, text: this.computedValueText() };
  });

  readonly showOutsideValue = computed<boolean>(
    () =>
      !this.showValueInLabel() &&
      this.effectiveValuePosition() !== 'hidden' &&
      this.effectiveValuePosition() !== 'inside' &&
      (!!this.computedValueText() || !!this.valueTemplate())
  );

  /**
   * In steps mode, 'inside' has no single fill element to anchor to.
   * Remap it to 'right' so the value is always visible.
   */
  readonly effectiveValuePosition = computed<ProgressBarValuePosition>(() => {
    if (this.segments() !== null && this.valuePosition() === 'inside') return 'right';
    return this.valuePosition();
  });
}
