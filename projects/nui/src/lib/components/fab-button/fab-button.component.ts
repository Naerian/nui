import {
  Component,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  booleanAttribute,
  inject,
  input,
  output,
  computed,
  signal,
  effect,
  viewChild,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  FabButtonDirection,
  FabButtonAnimation,
  FabButtonLayoutType,
  FabButtonShape,
  FabButtonItem,
  FabButtonItemResolved,
} from './models/fab-button.model';
import {
  NUIColor,
  NUISize,
  NUIVariant,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
} from '../../configs';
import { injectFabButtonConfig } from '../../configs/fab-button';

// Unique ID counter – shared across instances (module-level)
let _fabIdCounter = 0;

@Component({
  selector: 'nui-fab-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nui-fab',
    // State classes on host for CSS selector convenience
    '[class.nui-fab--expanded]': 'isOpen()',
    '[class.nui-fab--backdrop]': 'effectiveBackdrop()',
    '[class.nui-fab--anim-scale]': 'effectiveAnimation() === "scale"',
    '[class.nui-fab--anim-fade]': 'effectiveAnimation() === "fade"',
    '[class.nui-fab--anim-slide]': 'effectiveAnimation() === "slide"',
    '[class.nui-fab--disabled]': 'disabled()',
    '[attr.role]': '"group"',
    '[attr.aria-label]': 'hostAriaLabel()',
    // Expose radius/spacing as CSS custom props (allow inline override)
    '[style.--nui-fab-radius]': 'radius() ?? null',
    '[style.--nui-fab-spacing]': 'spacing() ?? null',
  },
})
export class FabButtonComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly globalConfig = injectFabButtonConfig();

  /** Unique instance ID used for aria-controls / aria-labelledby. */
  readonly instanceId = `nui-fab-${++_fabIdCounter}`;
  readonly itemsId = `${this.instanceId}-items`;

  // ========================================================================
  // ViewChild
  // ========================================================================
  readonly triggerBtn = viewChild<ElementRef<HTMLButtonElement>>('triggerBtn');

  // ========================================================================
  // INPUTS
  // ========================================================================

  /** Array of action items shown when the FAB is expanded. */
  readonly items = input<FabButtonItem[]>([]);

  /** Direction in which items expand from the trigger. */
  readonly direction = input<FabButtonDirection>();

  /** Spatial distribution of items. */
  readonly layout = input<FabButtonLayoutType>();

  /** Enter/leave animation for items. */
  readonly animation = input<FabButtonAnimation>();

  /** Shape (border-radius) for trigger and item buttons. */
  readonly shape = input<FabButtonShape>();

  /** Semantic color for trigger and items. */
  readonly color = input<NUIColor>();

  /** Size token for trigger and items. */
  readonly size = input<NUISize>();

  /** Visual variant for trigger and items. */
  readonly variant = input<NUIVariant>();

  /**
   * Controlled-mode expansion state.
   * When provided, overrides the internal toggle state.
   */
  readonly expanded = input<boolean | undefined>(undefined);

  /** CSS length for radial layouts (circle, semi-circle, quarter-circle). */
  readonly radius = input<string | undefined>(undefined);

  /** CSS length for linear layout spacing between items. */
  readonly spacing = input<string | undefined>(undefined);

  /** Show a translucent backdrop behind the items. */
  readonly backdrop = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /** Close the dial when the user clicks outside the component. */
  readonly closeOnOutsideClick = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /** Close the dial when the user presses the ESC key. */
  readonly closeOnEsc = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /** Disables the trigger button (also visually disables the component). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Icon CSS class for the main trigger button. */
  readonly triggerIcon = input<string>('ri-add-line');

  /**
   * Accessible label for the component host.
   * Also used as aria-label on the trigger button if not overridden.
   */
  readonly ariaLabel = input<string>('Open actions');

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  /** Emits `true` on open, `false` on close. Enables controlled-mode binding. */
  readonly expandedChange = output<boolean>();

  /** Emits when an item is clicked (before close). */
  readonly itemClick = output<{ item: FabButtonItem; event: Event }>();

  // ========================================================================
  // INTERNAL STATE
  // ========================================================================

  private readonly _expanded = signal(false);

  // ========================================================================
  // EFFECTIVE COMPUTED PROPS (input → global config → library default)
  // ========================================================================

  readonly effectiveDirection = computed(
    () => this.direction() ?? this.globalConfig.direction,
  );
  readonly effectiveLayout = computed(
    () => this.layout() ?? this.globalConfig.layout,
  );
  readonly effectiveAnimation = computed(
    () => this.animation() ?? this.globalConfig.animation,
  );
  readonly effectiveShape = computed(
    () => this.shape() ?? this.globalConfig.shape,
  );
  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig.color ?? DEFAULT_COLOR,
  );
  readonly effectiveSize = computed(
    () => this.size() ?? this.globalConfig.size ?? DEFAULT_SIZE,
  );
  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig.variant ?? DEFAULT_VARIANT,
  );
  readonly effectiveBackdrop = computed(
    () => this.backdrop() ?? this.globalConfig.backdrop,
  );
  readonly effectiveCloseOnOutsideClick = computed(
    () => this.closeOnOutsideClick() ?? this.globalConfig.closeOnOutsideClick,
  );
  readonly effectiveCloseOnEsc = computed(
    () => this.closeOnEsc() ?? this.globalConfig.closeOnEsc,
  );

  /**
   * Expansion state surface:
   * - Controlled mode  → reads the `expanded` input.
   * - Uncontrolled mode → reads internal `_expanded` signal.
   */
  readonly isOpen = computed(() => this.expanded() ?? this._expanded());

  // ========================================================================
  // ARIA helpers
  // ========================================================================

  readonly hostAriaLabel = computed(() => this.ariaLabel() || null);

  readonly triggerAriaLabel = computed(() =>
    this.isOpen() ? 'Close actions' : this.ariaLabel(),
  );

  // ========================================================================
  // CONTAINER CLASSES (colour/size/variant/shape/layout on inner container)
  // ========================================================================

  readonly containerClasses = computed(() => ({
    [`nui-fab--${this.effectiveColor()}`]: true,
    [`nui-fab--${this.effectiveSize()}`]: true,
    [`nui-fab--${this.effectiveVariant()}`]: true,
    [`nui-fab--${this.effectiveShape()}`]: true,
    [`nui-fab--${this.effectiveLayout()}`]: true,
  }));

  // ========================================================================
  // RESOLVED ITEMS (with computed positions)
  // Recomputed reactively whenever items, layout, or direction change.
  // ========================================================================

  readonly resolvedItems = computed<FabButtonItemResolved[]>(() => {
    const items = this.items();
    const layout = this.effectiveLayout();
    const direction = this.effectiveDirection();
    return items.map((item, i) => ({
      ...item,
      index: i,
      ...this._resolveItemTransform(i, items.length, layout, direction),
    }));
  });

  // ========================================================================
  // Constructor + click-outside effect
  // ========================================================================

  constructor() {
    // Register/unregister outside-click listener reactively
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.isOpen() && this.effectiveCloseOnOutsideClick()) {
        this._registerOutsideClick();
      } else {
        this._unregisterOutsideClick();
      }
    });
  }

  ngOnDestroy(): void {
    this._unregisterOutsideClick();
  }

  // ========================================================================
  // KEYBOARD HANDLERS
  // ========================================================================

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (this.isOpen() && this.effectiveCloseOnEsc()) {
      this.close();
    }
  }

  // ========================================================================
  // PUBLIC API
  // ========================================================================

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled()) return;
    this._setExpanded(true);
  }

  close(): void {
    this._setExpanded(false);
    // Return focus to trigger for proper accessibility flow.
    // preventScroll avoids undesired page scroll when the trigger is off-screen.
    this.triggerBtn()?.nativeElement.focus({ preventScroll: true });
  }

  // ========================================================================
  // TEMPLATE HANDLERS
  // ========================================================================

  handleTriggerClick(): void {
    if (this.disabled()) return;
    this.toggle();
  }

  handleItemClick(item: FabButtonItem, event: Event): void {
    if (item.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.itemClick.emit({ item, event });
    item.command?.(event);
    this.close();
  }

  /** Track-by function for @for directive. */
  trackItem(index: number, item: FabButtonItem): string {
    return item.id ?? String(index);
  }

  // ========================================================================
  // LAYOUT MATH
  // ========================================================================

  /**
   * Computes the CSS `translate` values for item at position `i`.
   *
   * Strategy:
   * - TypeScript computes the dimensionless multipliers (unit-vector components
   *   for linear; cos/sin values for radial layouts).
   * - The multipliers are embedded as constants in CSS `calc()` expressions that
   *   reference the CSS custom properties `--nui-fab-spacing` (linear) and
   *   `--nui-fab-radius` (radial). This means no pixel values are hardcoded in
   *   TypeScript; adjusting the CSS variables is sufficient to resize the layout.
   */
  private _resolveItemTransform(
    i: number,
    total: number,
    layout: FabButtonLayoutType,
    direction: FabButtonDirection,
  ): { tx: string; ty: string; tooltipSide: 'left' | 'right' } {
    switch (layout) {
      case 'linear': {
        const v = this._directionVector(direction);
        // Each item steps (i+1) units along the direction vector.
        const mx = +(v.x * (i + 1)).toFixed(4);
        const my = +(v.y * (i + 1)).toFixed(4);
        return {
          tx: mx === 0 ? '0px' : `calc(${mx} * var(--nui-fab-spacing))`,
          ty: my === 0 ? '0px' : `calc(${my} * var(--nui-fab-spacing))`,
          tooltipSide: v.x > 0 ? 'right' : 'left',
        };
      }

      case 'circle': {
        // Full 360° distribution starting at the given direction angle.
        const startAngle = this._directionAngle(direction);
        const angle = startAngle + (i * 2 * Math.PI) / total;
        return this._radialTransform(angle);
      }

      case 'semi-circle': {
        // 180° arc centred on the direction angle.
        // Example: direction='up' → arc spans from left (−90° fwd) to right (+90° fwd).
        const center = this._directionAngle(direction);
        const startAngle = center - Math.PI / 2;
        const step = total > 1 ? Math.PI / (total - 1) : 0;
        return this._radialTransform(startAngle + i * step);
      }

      case 'quarter-circle': {
        // 90° arc symmetrically centred on the direction angle.
        // Example: direction='up' → arc spans from up-left to up-right.
        const center = this._directionAngle(direction);
        const startAngle = center - Math.PI / 4;
        const step = total > 1 ? (Math.PI / 2) / (total - 1) : 0;
        return this._radialTransform(startAngle + i * step);
      }
    }
  }

  /**
   * Converts a polar angle (radians) to a CSS calc() translate pair.
   * Returns tooltipSide based on the sign of the X cosine: items in the
   * right half-plane show their tooltip to the right so the trigger doesn't
   * obscure it.
   */
  private _radialTransform(angle: number): { tx: string; ty: string; tooltipSide: 'left' | 'right' } {
    const cx = +Math.cos(angle).toFixed(4);
    const cy = +Math.sin(angle).toFixed(4);
    return {
      tx: cx === 0 ? '0px' : `calc(${cx} * var(--nui-fab-radius))`,
      ty: cy === 0 ? '0px' : `calc(${cy} * var(--nui-fab-radius))`,
      tooltipSide: cx > 0 ? 'right' : 'left',
    };
  }

  /**
   * Unit-vector for `direction` in screen-coordinate space (x→right, y→down).
   * Used exclusively for `linear` layout.
   */
  private _directionVector(direction: FabButtonDirection): { x: number; y: number } {
    const s = 1 / Math.sqrt(2); // ≈ 0.7071 (diagonal unit)
    const map: Record<FabButtonDirection, { x: number; y: number }> = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      'up-left': { x: -s, y: -s },
      'up-right': { x: s, y: -s },
      'down-left': { x: -s, y: s },
      'down-right': { x: s, y: s },
    };
    return map[direction];
  }

  /**
   * Angle in radians using screen-coordinate convention (clockwise from East).
   *   right=0, down=π/2, left=π, up=−π/2
   * This ensures: cos(angle) = X component, sin(angle) = Y component (screen-Y down).
   */
  private _directionAngle(direction: FabButtonDirection): number {
    const map: Record<FabButtonDirection, number> = {
      right: 0,
      'down-right': Math.PI / 4,
      down: Math.PI / 2,
      'down-left': (3 * Math.PI) / 4,
      left: Math.PI,
      'up-left': -(3 * Math.PI) / 4,
      up: -Math.PI / 2,
      'up-right': -Math.PI / 4,
    };
    return map[direction];
  }

  // ========================================================================
  // PRIVATE HELPERS
  // ========================================================================

  private _setExpanded(value: boolean): void {
    if (this.expanded() === undefined) {
      // Uncontrolled mode: update internal signal
      this._expanded.set(value);
    }
    // Always emit for controlled mode and side-effect listeners
    this.expandedChange.emit(value);
  }

  private _outsideClickHandler: ((e: Event) => void) | null = null;

  private _registerOutsideClick(): void {
    if (this._outsideClickHandler) return;
    this._outsideClickHandler = (event: Event) => {
      if (!this.elementRef.nativeElement.contains(event.target as Node)) {
        this.close();
      }
    };
    // Capture phase ensures we receive the event before inner handlers stop propagation
    document.addEventListener('pointerdown', this._outsideClickHandler, true);
  }

  private _unregisterOutsideClick(): void {
    if (!this._outsideClickHandler) return;
    document.removeEventListener('pointerdown', this._outsideClickHandler, true);
    this._outsideClickHandler = null;
  }
}
