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
  contentChild,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgTemplateOutlet } from '@angular/common';
import { FabTriggerDirective } from './directives/fab-trigger.directive';
import { FabItemDirective } from './directives/fab-item.directive';
import {
  FabButtonDirection,
  FabButtonAnimation,
  FabButtonLayoutType,
  FabButtonShape,
  FabButtonItem,
  FabButtonItemResolved,
  FabButtonTooltipSide,
  FabButtonTooltipSideEnum,
  FabButtonDirectionEnum,
  FabButtonItemDisplay,
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
import { DEFAULT_FAB_BUTTON_I18N } from './models';
import { NuiI18nService } from '../../i18n';

// Unique ID counter – shared across instances (module-level)
let _fabIdCounter = 0;

@Component({
  selector: 'nui-fab-button',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
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
    '[class.nui-fab--loading]': 'loading()',
    '[class.nui-fab--hover-mode]': 'effectiveOpenOn() === "hover"',
    '[attr.role]': '"group"',
    '[attr.aria-label]': 'hostAriaLabel()',
  },
})
export class FabButtonComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly globalConfig = injectFabButtonConfig();
  protected readonly _i18nService = inject(NuiI18nService);
  protected readonly _i18n = computed(() => this._i18nService.translations().fabButton);

  /** Unique instance ID used for aria-controls / aria-labelledby. */
  readonly instanceId = `nui-fab-${++_fabIdCounter}`;
  readonly itemsId = `${this.instanceId}-items`;

  // ========================================================================
  // ViewChild
  // ========================================================================
  readonly triggerBtn = viewChild<ElementRef<HTMLButtonElement>>('triggerBtn');
  /** Reference to the <ul> menu list — used to focus items programmatically. */
  readonly itemsList = viewChild<ElementRef<HTMLUListElement>>('itemsList');

  /** Optional custom template for the trigger button interior. */
  readonly customTriggerTpl = contentChild(FabTriggerDirective);
  /** Optional custom template for each menu item. */
  readonly customItemTpl = contentChild(FabItemDirective);

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
   * Icon CSS class shown in the trigger when the dial is **open**.
   * When set, the `triggerIcon` is replaced while expanded — avoids the
   * need for a custom `fabTrigger` template just for an icon swap.
   * @example 'ri-close-line'
   */
  readonly triggerIconOpen = input<string | undefined>(undefined);

  /**
   * Static label shown next to the trigger icon (Extended FAB pill pattern).
   * The label hides automatically while the dial is open when `triggerIconOpen`
   * is also set; otherwise it stays visible in both states.
   */
  readonly triggerLabel = input<string | undefined>(undefined);

  /**
   * Notification badge value shown on the trigger corner.
   * Accepts a number or short string (e.g. `'99+'`).
   * Set to `undefined` to hide the badge.
   */
  readonly triggerBadge = input<number | string | undefined>(undefined);

  /**
   * Shows a loading spinner inside the trigger button.
   * While `true` the trigger does not toggle the dial.
   */
  readonly loading = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Close the dial after an action item is clicked.
   * Set to `false` to keep the dial open for multi-action / selection patterns.
   */
  readonly closeOnItemClick = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /**
   * Close the dial when the nearest scroll container scrolls.
   * Useful when the FAB is anchored inside a scrollable panel.
   */
  readonly closeOnScroll = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /**
   * How to open the dial: `'click'` (default) or `'hover'`.
   * In `'hover'` mode the dial opens on pointer entry and closes on leave.
   * Keyboard navigation is unaffected in either mode (WAI-ARIA spec).
   */
  readonly openOn = input<'click' | 'hover'>();

  /**
   * Controls how action items render their content:
   * - `'icon'` (default) — icon-only; tooltip appears on hover.
   * - `'icon-text'` — icon + label text visible inside the button;
   *   tooltip is suppressed (the visible label already conveys the action).
   */
  readonly itemDisplay = input<FabButtonItemDisplay>();

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

  /** Event when menu hidden */
  readonly menuHidden = output<void>();

  /** Event when menu shown */
  readonly menuShown = output<void>();

  // ========================================================================
  // INTERNAL STATE
  // ========================================================================

  private readonly _expanded = signal(false);

  /**
   * Runtime tooltip-side overrides keyed by item index.
   * Populated after measuring viewport space each time the FAB opens.
   * Cleared on close so stale values don't leak into the next open.
   */
  private readonly _runtimeTooltipSides = signal<Record<number, FabButtonTooltipSide>>({});

  // ========================================================================
  // EFFECTIVE COMPUTED PROPS (input → global config → library default)
  // ========================================================================

  readonly effectiveDirection = computed(() => this.direction() ?? this.globalConfig.direction);
  readonly effectiveLayout = computed(() => this.layout() ?? this.globalConfig.layout);
  readonly effectiveAnimation = computed(() => this.animation() ?? this.globalConfig.animation);
  readonly effectiveShape = computed(() => this.shape() ?? this.globalConfig.shape);
  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig.color ?? DEFAULT_COLOR
  );
  readonly effectiveSize = computed(() => this.size() ?? this.globalConfig.size ?? DEFAULT_SIZE);
  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig.variant ?? DEFAULT_VARIANT
  );
  readonly effectiveBackdrop = computed(() => this.backdrop() ?? this.globalConfig.backdrop);
  readonly effectiveCloseOnOutsideClick = computed(
    () => this.closeOnOutsideClick() ?? this.globalConfig.closeOnOutsideClick
  );
  readonly effectiveCloseOnEsc = computed(() => this.closeOnEsc() ?? this.globalConfig.closeOnEsc);
  readonly effectiveCloseOnItemClick = computed(
    () => this.closeOnItemClick() ?? this.globalConfig.closeOnItemClick
  );
  readonly effectiveCloseOnScroll = computed(
    () => this.closeOnScroll() ?? this.globalConfig.closeOnScroll
  );
  readonly effectiveOpenOn = computed(() => this.openOn() ?? this.globalConfig.openOn);
  readonly effectiveItemDisplay = computed(
    () => this.itemDisplay() ?? this.globalConfig.itemDisplay
  );

  /**
   * Active trigger icon: shows `triggerIconOpen` while expanded (when set),
   * falling back to `triggerIcon` in all other states.
   */
  readonly activeTriggerIcon = computed(() =>
    this.isOpen() && this.triggerIconOpen() ? this.triggerIconOpen()! : this.triggerIcon()
  );

  /**
   * Whether the trigger label should be visible.
   * Hidden when the dial is open AND `triggerIconOpen` is configured
   * (the open-icon communicates the state instead).
   */
  readonly showTriggerLabel = computed(
    () => !!this.triggerLabel() && !(this.isOpen() && !!this.triggerIconOpen())
  );

  readonly effectiveI18n = computed(() => {
    return {
      ...DEFAULT_FAB_BUTTON_I18N,
      ...this._i18n(),
    };
  });

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
    this.isOpen() ? this.effectiveI18n().triggerAriaLabel : this.ariaLabel()
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
    'nui-fab--loading': this.loading(),
    'nui-fab--hover-mode': this.effectiveOpenOn() === 'hover',
    'nui-fab--icon-text': this.effectiveItemDisplay() === 'icon-text',
  }));

  // ========================================================================
  // RESOLVED ITEMS (with computed positions)
  // Recomputed reactively whenever items, layout, or direction change.
  // ========================================================================

  readonly resolvedItems = computed<FabButtonItemResolved[]>(() => {
    const items = this.items();
    const layout = this.effectiveLayout();
    const direction = this.effectiveDirection();
    const runtimeSides = this._runtimeTooltipSides(); // reactive dependency
    return items.map((item, i) => {
      const base = {
        ...item,
        index: i,
        ...this._resolveItemTransform(i, items.length, layout, direction),
      };
      // Apply viewport-measured override when available
      return runtimeSides[i] !== undefined ? { ...base, tooltipSide: runtimeSides[i] } : base;
    });
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

    // Close on scroll: register a capture-phase scroll listener when open
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (this.isOpen() && this.effectiveCloseOnScroll()) {
        this._registerScroll();
      } else {
        this._unregisterScroll();
      }
    });

    // Measure available viewport space for each item tooltip after opening.
    // queueMicrotask defers until after Angular has committed the DOM update
    // so CSS variables and trigger position are stable.
    effect(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;
        const open = this.isOpen();
        if (!open) {
          this._runtimeTooltipSides.set({});
          return;
        }
        queueMicrotask(() => this._measureAndUpdateTooltipSides());
      },
      { allowSignalWrites: true }
    );
  }

  ngOnDestroy(): void {
    this._unregisterOutsideClick();
    this._unregisterScroll();
    if (this._hoverLeaveTimer !== null) {
      clearTimeout(this._hoverLeaveTimer);
    }
  }

  // ========================================================================
  // KEYBOARD HANDLERS — WAI-ARIA Menu Button Pattern
  // https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
  //
  // A single @HostListener on the host element is used instead of (keydown)
  // bindings on individual children. This guarantees:
  //  • Events are captured BEFORE the browser processes Home/End page-scroll.
  //  • No reliance on bubbling from <button> → <ul>, which can be unreliable
  //    when inert or pointer-events affect intermediate nodes.
  // ========================================================================

  @HostListener('keydown', ['$event'])
  _onHostKeydown(event: KeyboardEvent): void {
    const active = document.activeElement;
    const trigger = this.triggerBtn()?.nativeElement;
    const onTrigger = active === trigger;
    const onItem = !onTrigger && !!this.itemsList()?.nativeElement.contains(active);

    if (onTrigger) {
      this._handleTriggerKey(event);
    } else if (onItem && this.isOpen()) {
      this._handleItemKey(event);
    }
  }

  /**
   * Keyboard handler for the trigger button.
   *
   * | Key           | Behaviour                                          |
   * |---------------|----------------------------------------------------|
   * | Enter / Space | Toggle; if opening → focus visually-first item     |
   * | ArrowDown     | Open menu → focus visually-first item              |
   * | ArrowUp       | Open menu → focus visually-last item               |
   * | Escape        | Close (respects closeOnEsc)                        |
   */
  private _handleTriggerKey(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.isOpen() ? this.close() : this._openAndFocus('visual-first');
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._openAndFocus('visual-first');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._openAndFocus('visual-last');
        break;
      case 'Escape':
        if (this.isOpen() && this.effectiveCloseOnEsc()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  /**
   * Keyboard handler for the items list (focus is on a menu item).
   *
   * Navigation step is direction-aware so ArrowDown/Up always match the
   * visual layout regardless of expansion direction:
   *   - Upward expansions (up / up-left / up-right): step = -1
   *     (ArrowDown → toward trigger → visually downward)
   *   - All other directions: step = +1 (standard)
   *
   * | Key       | Behaviour                                               |
   * |-----------|---------------------------------------------------------|
   * | ArrowDown | Move focus to the next visually-lower item (circular)   |
   * | ArrowUp   | Move focus to the next visually-higher item (circular)  |
   * | Home      | Focus visually-first (topmost) item                     |
   * | End       | Focus visually-last (bottommost) item                   |
   * | Escape    | Close and return focus to trigger                       |
   * | Tab       | Close (focus moves naturally to next page element)      |
   */
  private _handleItemKey(event: KeyboardEvent): void {
    const buttons = this._getEnabledMenuItems();
    if (!buttons.length) return;

    const current = document.activeElement;
    const currentIdx = buttons.indexOf(current as HTMLButtonElement | HTMLAnchorElement);
    // step = +1 for downward/radial layouts, -1 for upward layouts.
    // This ensures ArrowDown always moves focus in the visually ‘downward’ direction.
    const step = this._getNavStep();

    // Visual-first index: the item at the top of the visual reading order.
    const visualFirst = step > 0 ? 0 : buttons.length - 1;
    const visualLast = step > 0 ? buttons.length - 1 : 0;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = (currentIdx + step + buttons.length) % buttons.length;
        buttons[next].focus({ preventScroll: true });
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = (currentIdx - step + buttons.length) % buttons.length;
        buttons[prev].focus({ preventScroll: true });
        break;
      }
      case 'Home':
        event.preventDefault();
        buttons[visualFirst].focus({ preventScroll: true });
        break;
      case 'End':
        event.preventDefault();
        buttons[visualLast].focus({ preventScroll: true });
        break;
      case 'Escape':
        if (this.effectiveCloseOnEsc()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        this.close();
        break;
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
    this.menuShown.emit();
  }

  close(): void {
    this._setExpanded(false);
    // Return focus to trigger for proper accessibility flow.
    // preventScroll avoids undesired page scroll when the trigger is off-screen.
    this.triggerBtn()?.nativeElement.focus({ preventScroll: true });
    this.menuHidden.emit();
  }

  // ========================================================================
  // TEMPLATE HANDLERS
  // ========================================================================

  /** Mouse-click handler on the trigger (keyboard is handled in handleTriggerKeydown). */
  handleTriggerClick(): void {
    if (this.disabled() || this.loading()) return;
    // In hover mode on touch devices, the browser synthesizes a `click` event
    // immediately after the `touchend` that also triggered `mouseenter` → open().
    // If we toggled here the dial would close on the very first tap.
    // Consume the flag and bail out — the dial is already open.
    if (this._touchTriggeredOpen) {
      this._touchTriggeredOpen = false;
      return;
    }
    // In hover mode a click still toggles (keyboard/touch accessibility fallback)
    this.toggle();
  }

  /**
   * HostListeners for hover mode (openOn='hover').
   * The dial opens on pointer entry and closes on pointer leave.
   * Keyboard navigation (Enter/Space/ArrowDown/ArrowUp) is unaffected.
   *
   * WHY A TIMER: items are children of the host but the gap between the trigger
   * top edge and the first item bottom edge falls on `pointer-events: none`
   * intermediate elements.  The browser sees the pointer enter the page
   * background (outside any host descendant) and fires `mouseleave` on the host.
   * A 120 ms grace-period lets the pointer cross that gap without closing the dial.
   *
   * MOBILE / TOUCH: mobile browsers synthesize a `mouseenter` event from a tap,
   * immediately followed by a synthetic `click`.  Without special handling the
   * sequence is: touch → mouseenter (opens) → click → toggle() → closes — so
   * the user must tap twice.  We detect this by comparing `touchstart` and
   * `mouseenter` timestamps: if they are within 400 ms we consider the
   * mouseenter touch-triggered and suppress the subsequent synthetic click.
   */
  private _hoverLeaveTimer: ReturnType<typeof setTimeout> | null = null;
  /** Timestamp of the last `touchstart` on this host (0 on pointer-only devices). */
  private _lastTouchTime = 0;
  /**
   * True when `mouseenter` just opened the dial via a touch-triggered event.
   * Cleared as soon as the first synthetic click is consumed.
   */
  private _touchTriggeredOpen = false;

  @HostListener('touchstart')
  _onHostTouchStart(): void {
    this._lastTouchTime = Date.now();
  }

  @HostListener('mouseenter')
  _onHostMouseEnter(): void {
    if (this._hoverLeaveTimer !== null) {
      clearTimeout(this._hoverLeaveTimer);
      this._hoverLeaveTimer = null;
    }
    if (this.effectiveOpenOn() === 'hover' && !this.disabled() && !this.loading()) {
      // Mark as touch-triggered when: dial is currently closed AND the mouseenter
      // arrived within 400 ms of a touchstart (mobile synthetic event window).
      this._touchTriggeredOpen = !this.isOpen() && Date.now() - this._lastTouchTime < 400;
      this.open();
    }
  }

  @HostListener('mouseleave')
  _onHostMouseLeave(): void {
    if (this.effectiveOpenOn() === 'hover') {
      this._hoverLeaveTimer = setTimeout(() => {
        this._hoverLeaveTimer = null;
        this.close();
      }, 120);
    }
  }

  handleItemClick(item: FabButtonItem, event: Event): void {
    if (item.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.itemClick.emit({ item, event });
    item.command?.(event);
    if (this.effectiveCloseOnItemClick()) {
      this.close();
    }
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
    direction: FabButtonDirection
  ): { tx: string; ty: string; tooltipSide: FabButtonTooltipSide } {
    switch (layout) {
      case 'linear': {
        const v = this._directionVector(direction);
        // Each item steps (i+1) units along the direction vector.
        const mx = +(v.x * (i + 1)).toFixed(4);
        const my = +(v.y * (i + 1)).toFixed(4);
        return {
          tx: mx === 0 ? '0px' : `calc(${mx} * var(--nui-fab-spacing))`,
          ty: my === 0 ? '0px' : `calc(${my} * var(--nui-fab-spacing))`,
          tooltipSide: this._tooltipSideFromVector(v.x, v.y),
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
        const step = total > 1 ? Math.PI / 2 / (total - 1) : 0;
        return this._radialTransform(startAngle + i * step);
      }
    }
  }

  /**
   * Converts a polar angle (radians) to a CSS calc() translate pair.
   * Uses the same perpendicular heuristic as _tooltipSideFromVector so the
   * tooltip always appears on the face of the item that is furthest from the
   * trigger centre.
   */
  private _radialTransform(angle: number): {
    tx: string;
    ty: string;
    tooltipSide: FabButtonTooltipSide;
  } {
    const cx = +Math.cos(angle).toFixed(4);
    const cy = +Math.sin(angle).toFixed(4);
    return {
      tx: cx === 0 ? '0px' : `calc(${cx} * var(--nui-fab-radius))`,
      ty: cy === 0 ? '0px' : `calc(${cy} * var(--nui-fab-radius))`,
      tooltipSide: this._tooltipSideFromVector(cx, cy),
    };
  }

  /**
   * Determines on which face of the item button the tooltip should appear,
   * based on the item's displacement vector from the trigger centre.
   *
   * Rule — tooltip is placed PERPENDICULAR to the expansion axis,
   * always on the face furthest from the trigger ("centrifugal" placement):
   *
   *   │vy│ ≥ │vx│  (vertical / diagonal dominance)
   *     → 'right' when vx ≥ 0  /  'left'  when vx < 0
   *
   *   │vx│ > │vy│  (purely horizontal expansion: left / right)
   *     → 'top'  (above the item — perpendicular and never overlaps siblings)
   *
   * This avoids:
   *  - Tooltip going in the same direction as the expansion (off-screen risk)
   *  - Tooltip pointing back toward the trigger (overlap risk)
   *  - One item's tooltip hiding behind an adjacent item (z-index fix handles this)
   */
  private _tooltipSideFromVector(vx: number, vy: number): FabButtonTooltipSide {
    if (Math.abs(vy) >= Math.abs(vx)) {
      // Vertical or diagonal: go sideways away from centre
      return vx >= 0 ? FabButtonTooltipSideEnum.RIGHT : FabButtonTooltipSideEnum.LEFT;
    }
    // Purely horizontal (left / right direction): tooltip above
    return FabButtonTooltipSideEnum.TOP;
  }

  // ========================================================================
  // VIEWPORT-AWARE TOOLTIP PLACEMENT
  // ========================================================================

  /**
   * Reads CSS custom-property values and the trigger's live bounding rect to
   * calculate each item's final position in the viewport WITHOUT waiting for
   * the CSS enter-transition to finish. Tooltip elements are already in the
   * DOM (opacity: 0) so their real dimensions are measurable.
   */
  private _measureAndUpdateTooltipSides(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.elementRef.nativeElement as HTMLElement;
    // Read spacing/radius from the container element — that is where the
    // per-size class rules (and the developer's inline-style override) live.
    const container = host.querySelector<HTMLElement>('.nui-fab__container') ?? host;
    const containerStyle = getComputedStyle(container);
    const hostStyle = getComputedStyle(host);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

    const toPx = (val: string): number => {
      const n = parseFloat(val);
      if (!isNaN(n)) {
        if (val.trim().endsWith('rem')) return n * rootFontSize;
        return n; // px or unitless
      }
      return 0;
    };

    const spacing = toPx(containerStyle.getPropertyValue('--nui-fab-spacing').trim()) || 48;
    const radius = toPx(containerStyle.getPropertyValue('--nui-fab-radius').trim()) || 56;
    const tooltipOffset = toPx(hostStyle.getPropertyValue('--nui-fab-tooltip-offset').trim()) || 8;

    const triggerEl = this.triggerBtn()?.nativeElement;
    if (!triggerEl) return;
    const tr = triggerEl.getBoundingClientRect();
    const triggerCx = tr.left + tr.width / 2;
    const triggerCy = tr.top + tr.height / 2;
    const halfBtn = tr.width / 2; // item button ≈ same size as trigger (close enough)

    // Helper: parse "calc(N * var(--nui-fab-spacing|radius))" → pixel value
    const parseCalc = (s: string): number => {
      if (!s || s === '0px') return 0;
      const m = s.match(/calc\((-?[\d.]+)\s*\*\s*var\(--nui-fab-(spacing|radius)\)\)/);
      if (!m) return 0;
      return parseFloat(m[1]) * (m[2] === 'spacing' ? spacing : radius);
    };

    const items = this.resolvedItems();
    const overrides: Record<number, FabButtonTooltipSide> = {};

    const liElements = host.querySelectorAll<HTMLElement>('.nui-fab__item');

    items.forEach((item, i) => {
      if (!item.tooltip) return; // nothing to position

      const li = liElements[i];
      const tooltipEl = li?.querySelector<HTMLElement>('.nui-fab__item-tooltip');

      // Tooltip dimensions — real values from DOM (opacity:0 elements still have layout)
      const tooltipW = tooltipEl?.offsetWidth || 100;
      const tooltipH = tooltipEl?.offsetHeight || 28;

      // Item button centre in viewport coordinates (computed from trigger + vector)
      const txPx = parseCalc(item.tx);
      const tyPx = parseCalc(item.ty);
      const itemCx = triggerCx + txPx;
      const itemCy = triggerCy + tyPx;

      const btnRect = {
        left: itemCx - halfBtn,
        right: itemCx + halfBtn,
        top: itemCy - halfBtn,
        bottom: itemCy + halfBtn,
      };

      overrides[i] = this._bestTooltipSide(
        btnRect,
        item.tooltipSide,
        tooltipW,
        tooltipH,
        tooltipOffset
      );
    });

    this._runtimeTooltipSides.set(overrides);
  }

  /**
   * Picks the best side for a tooltip so it stays inside the viewport.
   *
   * Priority order:
   *   1. `preferred` (heuristic side from direction vector)
   *   2. Opposite of preferred
   *   3. Perpendicular sides (in order)
   *   4. Preferred as last-resort fallback
   */
  private _bestTooltipSide(
    btnRect: { left: number; right: number; top: number; bottom: number },
    preferred: FabButtonTooltipSide,
    tooltipW: number,
    tooltipH: number,
    offset: number
  ): FabButtonTooltipSide {
    // clientWidth/clientHeight excludes the scrollbar (window.innerWidth includes it)
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    // Extra safety margin so the tooltip never touches the edge
    const MARGIN = 6;

    const fits: Record<FabButtonTooltipSide, boolean> = {
      [FabButtonTooltipSideEnum.RIGHT]: btnRect.right + offset + tooltipW + MARGIN <= vw,
      [FabButtonTooltipSideEnum.LEFT]: btnRect.left - offset - tooltipW - MARGIN >= 0,
      [FabButtonTooltipSideEnum.TOP]: btnRect.top - offset - tooltipH - MARGIN >= 0,
      [FabButtonTooltipSideEnum.BOTTOM]: btnRect.bottom + offset + tooltipH + MARGIN <= vh,
    };

    const opposites: Record<FabButtonTooltipSide, FabButtonTooltipSide> = {
      [FabButtonTooltipSideEnum.RIGHT]: FabButtonTooltipSideEnum.LEFT,
      [FabButtonTooltipSideEnum.LEFT]: FabButtonTooltipSideEnum.RIGHT,
      [FabButtonTooltipSideEnum.TOP]: FabButtonTooltipSideEnum.BOTTOM,
      [FabButtonTooltipSideEnum.BOTTOM]: FabButtonTooltipSideEnum.TOP,
    };
    const perpendiculars: Record<
      FabButtonTooltipSide,
      [FabButtonTooltipSide, FabButtonTooltipSide]
    > = {
      [FabButtonTooltipSideEnum.RIGHT]: [
        FabButtonTooltipSideEnum.TOP,
        FabButtonTooltipSideEnum.BOTTOM,
      ],
      [FabButtonTooltipSideEnum.LEFT]: [
        FabButtonTooltipSideEnum.TOP,
        FabButtonTooltipSideEnum.BOTTOM,
      ],
      [FabButtonTooltipSideEnum.TOP]: [
        FabButtonTooltipSideEnum.RIGHT,
        FabButtonTooltipSideEnum.LEFT,
      ],
      [FabButtonTooltipSideEnum.BOTTOM]: [
        FabButtonTooltipSideEnum.RIGHT,
        FabButtonTooltipSideEnum.LEFT,
      ],
    };

    if (fits[preferred]) return preferred;
    if (fits[opposites[preferred]]) return opposites[preferred];
    for (const p of perpendiculars[preferred]) {
      if (fits[p]) return p;
    }
    return preferred; // last resort: preferred even if it clips
  }

  /**
   * Unit-vector for `direction` in screen-coordinate space (x→right, y→down).
   * Used exclusively for `linear` layout.
   */
  private _directionVector(direction: FabButtonDirection): { x: number; y: number } {
    const s = 1 / Math.sqrt(2); // ≈ 0.7071 (diagonal unit)
    const map: Record<FabButtonDirection, { x: number; y: number }> = {
      [FabButtonDirectionEnum.UP]: { x: 0, y: -1 },
      [FabButtonDirectionEnum.DOWN]: { x: 0, y: 1 },
      [FabButtonDirectionEnum.LEFT]: { x: -1, y: 0 },
      [FabButtonDirectionEnum.RIGHT]: { x: 1, y: 0 },
      [FabButtonDirectionEnum.UP_LEFT]: { x: -s, y: -s },
      [FabButtonDirectionEnum.UP_RIGHT]: { x: s, y: -s },
      [FabButtonDirectionEnum.DOWN_LEFT]: { x: -s, y: s },
      [FabButtonDirectionEnum.DOWN_RIGHT]: { x: s, y: s },
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
      [FabButtonDirectionEnum.RIGHT]: 0,
      [FabButtonDirectionEnum.DOWN_RIGHT]: Math.PI / 4,
      [FabButtonDirectionEnum.DOWN]: Math.PI / 2,
      [FabButtonDirectionEnum.DOWN_LEFT]: (3 * Math.PI) / 4,
      [FabButtonDirectionEnum.LEFT]: Math.PI,
      [FabButtonDirectionEnum.UP_LEFT]: -(3 * Math.PI) / 4,
      [FabButtonDirectionEnum.UP]: -Math.PI / 2,
      [FabButtonDirectionEnum.UP_RIGHT]: -Math.PI / 4,
    };
    return map[direction];
  }

  // ========================================================================
  // FOCUS MANAGEMENT HELPERS (WAI-ARIA menu navigation)
  // ========================================================================

  /**
   * Opens the menu and moves focus to the visually-first or visually-last
   * enabled item, taking the expansion direction into account.
   *
   * For upward expansions the DOM order is inverted relative to the visual
   * reading order (item 0 is nearest = visually bottom). We compensate so
   * ‘visual-first’ always means the topmost visible item.
   */
  private _openAndFocus(target: 'visual-first' | 'visual-last'): void {
    if (this.disabled()) return;
    this._setExpanded(true);
    queueMicrotask(() => {
      const btns = this._getEnabledMenuItems();
      if (!btns.length) return;
      const step = this._getNavStep();
      // step > 0: DOM order matches visual order (index 0 = visual top)
      // step < 0: DOM order is inverted (index 0 = visual bottom)
      const visualFirstIdx = step > 0 ? 0 : btns.length - 1;
      const visualLastIdx = step > 0 ? btns.length - 1 : 0;
      const idx = target === 'visual-first' ? visualFirstIdx : visualLastIdx;
      btns[idx]?.focus({ preventScroll: true });
    });
  }

  /**
   * Navigation step based on the current expansion direction.
   *
   * Returns +1 for downward / rightward / radial layouts (standard order).
   * Returns -1 for upward directions so ArrowDown always moves focus
   * toward the trigger and ArrowUp moves it away — matching the visual layout.
   *
   * RTL note: arrow-key navigation uses only Up/Down (and Home/End).
   * The horizontal axis is mirrored by CSS via `--nui-fab-item-tx` negation
   * in `[dir="rtl"]`, so the DOM order and focus sequence remain unchanged.
   */
  private _getNavStep(): 1 | -1 {
    if (this.effectiveLayout() !== 'linear') return 1;
    const dir = this.effectiveDirection();
    return dir === 'up' || dir === 'up-left' || dir === 'up-right' ? -1 : 1;
  }

  /**
   * Returns all non-disabled focusable item elements inside the menu list.
   * Covers both <button> and <a> rendered items.
   */
  private _getEnabledMenuItems(): (HTMLButtonElement | HTMLAnchorElement)[] {
    const list = this.itemsList()?.nativeElement;
    if (!list) return [];
    return Array.from(
      list.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
        '.nui-fab__item-btn:not([disabled]):not([aria-disabled="true"])'
      )
    );
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

  // ── Scroll close handler ────────────────────────────────

  private _scrollHandler: ((e: Event) => void) | null = null;

  /**
   * Registers a capture-phase scroll listener on `window` that closes the
   * dial when any scrollable ancestor fires a scroll event.
   * Only active when `closeOnScroll` resolves to `true` and the dial is open.
   */
  private _registerScroll(): void {
    if (this._scrollHandler) return;
    this._scrollHandler = () => {
      if (this.isOpen()) this.close();
    };
    // Capture phase catches scroll from nested scrollable containers too
    window.addEventListener('scroll', this._scrollHandler, { capture: true, passive: true });
  }

  private _unregisterScroll(): void {
    if (!this._scrollHandler) return;
    window.removeEventListener('scroll', this._scrollHandler, true);
    this._scrollHandler = null;
  }
}
