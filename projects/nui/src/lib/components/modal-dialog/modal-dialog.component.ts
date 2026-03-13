import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  HostListener,
  ElementRef,
  inject,
  signal,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet, NgStyle } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { ButtonComponent } from '../button/button.component';
import {
  MODAL_DIALOG_CONFIG,
  ModalDialogAction,
  ModalDialogConfig,
  ModalDialogCustomButton,
  MODAL_FOCUS_TRAP_DELAY,
} from './models/modal-dialog.model';
import { ModalDialogRef } from './modal-dialog-ref';
import { MODAL_DIALOG_REF } from './services/modal-dialog.service';
import { ModalDialogActionsService } from './services/modal-dialog-actions.service';
import { ModalDialogDockService } from './services/modal-dialog-dock.service';
import { modalDialogAnimation } from './animations/modal-dialog.animations';
import { NuiI18nService } from '../../i18n';

/**
 * Shell (contenedor) del modal — análogo a SidebarPanelComponent.
 *
 * @internal — No instanciar directamente. Usar ModalDialogService.
 */
@Component({
  selector: 'nui-modal-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, NgStyle, ButtonComponent],
  templateUrl: './modal-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [modalDialogAnimation],
})
export class ModalDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _focusTrapFactory = inject(FocusTrapFactory);
  private readonly _elementRef = inject(ElementRef);
  private readonly _dockService = inject(ModalDialogDockService);
  private readonly _i18nService = inject(NuiI18nService);

  protected readonly _i18n = computed(() => this._i18nService.translations());

  protected readonly config = inject<ModalDialogConfig>(MODAL_DIALOG_CONFIG);
  readonly modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);
  protected readonly actionsService = inject(ModalDialogActionsService, { optional: true });

  readonly instanceId = `nui-md-${Math.random().toString(36).slice(2, 9)}`;

  animationState = signal<'void' | 'visible' | 'hidden'>('void');

  private readonly _animationParams = computed(() => ({
    value: this.animationState(),
    params: { duration: this.config.animationDuration ?? 220 },
  }));

  @HostBinding('@modal-dialog')
  get animationParams() {
    return this._animationParams();
  }

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['nui-modal-dialog'];
    if (this.config.modalType) classes.push(`nui-modal-dialog--${this.config.modalType}`);
    if (this.config.color) classes.push(`nui-modal-dialog--color-${this.config.color}`);
    if (this.modalRef?.isMinimized) classes.push('nui-modal-dialog--minimized');
    return classes.join(' ');
  }

  @HostBinding('attr.role') hostRole = 'dialog';
  @HostBinding('attr.aria-modal') hostAriaModal = 'true';

  @HostBinding('attr.aria-labelledby')
  get hostAriaLabelledBy(): string | null {
    return this.config.title && !this.config.hideDefaultHeader
      ? `${this.instanceId}-title`
      : null;
  }

  @HostBinding('style.width')
  get hostWidth(): string { return this.config.width ?? '500px'; }

  @HostBinding('style.min-width')
  get hostMinWidth(): string | null { return this.config.minWidth ?? null; }

  @HostBinding('style.max-width')
  get hostMaxWidth(): string | null { return this.config.maxWidth ?? null; }

  @HostBinding('style.min-height')
  get hostMinHeight(): string | null { return this.config.minHeight ?? null; }

  protected get footerActions(): ModalDialogAction[] {
    if (this.config.customButtons && this.config.customButtons.length > 0) {
      return this._customButtonsToActions(this.config.customButtons);
    }
    return this.actionsService?.actions() ?? [];
  }

  protected get footerTemplate() {
    return this.actionsService?.footerTemplate() ?? null;
  }

  protected get shouldShowFooter(): boolean {
    if (this.config.hideDefaultFooter) return false;
    if (this.config.customButtons && this.config.customButtons.length > 0) return true;
    if (this.footerTemplate !== null) return true;
    if (this.footerActions.length > 0) return true;
    if (this.config.footerTemplate) return true;
    return false;
  }

  protected get statusBarStyles(): Record<string, string> {
    const sb = this.config.statusBar;
    if (!sb || sb.position === 'none') return {};
    const thickness = `${sb.thickness ?? 4}px`;
    const color = sb.color ?? this._getSemanticColor();
    const base: Record<string, string> = { 'background-color': color, 'pointer-events': 'none' };
    switch (sb.position) {
      case 'left':   return { ...base, left: '0', top: '0', bottom: '0', width: thickness };
      case 'right':  return { ...base, right: '0', top: '0', bottom: '0', width: thickness };
      case 'top':    return { ...base, top: '0', left: '0', right: '0', height: thickness };
      case 'bottom': return { ...base, bottom: '0', left: '0', right: '0', height: thickness };
      default: return {};
    }
  }

  private _timeoutInterval?: ReturnType<typeof setInterval>;
  private _startTime?: number;
  private _pausedTime = 0;
  private _pauseStartTime?: number;
  private _isPaused = false;

  timeoutProgress = signal(0);
  remainingTime = signal(0);

  protected get effectiveShowProgressBar(): boolean {
    return this.config.timeout?.showProgressBar !== false;
  }

  protected get effectivePauseOnHover(): boolean {
    return this.config.timeout?.pauseOnHover !== false;
  }

  private _touchStartX = 0;
  private _touchStartY = 0;
  private _touchStartHandler?: (e: Event) => void;
  private _touchEndHandler?: (e: Event) => void;

  private _focusTrap?: FocusTrap;
  private _previouslyFocusedElement: HTMLElement | null = null;

  protected get showHeader(): boolean {
    return (this.config.showHeader ?? true) && !this.modalRef?.isMinimized;
  }

  protected get showCloseButton(): boolean {
    return (this.config.canBeClosed ?? true) && (this.config.showCloseButton ?? true);
  }

  ngOnInit(): void {
    this._previouslyFocusedElement = document.activeElement as HTMLElement;
    this._handleScrollStrategy();
    this._subscribeToStateChanges();
    if (this.config.timeout) this._startTimeout();
    if (this.config.gestures?.enabled) this._setupGestures();
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.animationState.set('visible');
      this._cdr.markForCheck();
    });
    if (this.config.autoFocus !== false) {
      setTimeout(() => this._setupFocusTrap(), MODAL_FOCUS_TRAP_DELAY);
    }
  }

  ngOnDestroy(): void {
    this._focusTrap?.destroy();
    this._clearTimeout();
    this._clearGestures();
    if (this.modalRef?.isMinimized) this._dockService.removeItem(this.modalRef.id);
    this._restoreScroll();
    if (
      this._previouslyFocusedElement &&
      typeof this._previouslyFocusedElement.focus === 'function'
    ) {
      setTimeout(() => this._previouslyFocusedElement?.focus(), 0);
    }
  }

  close(): void {
    this.animationState.set('hidden');
    this._cdr.markForCheck();
  }

  requestClose(): void {
    this.modalRef?.close({ confirmed: false, data: null, reason: 'cancelled' });
  }

  minimize(): void {
    if (!this.modalRef?.config?.minimizable) return;
    this.animationState.set('hidden');
    const duration = this.config.animationDuration ?? 220;
    setTimeout(() => {
      this.modalRef.minimize();
      this._dockService.addItem({
        id: this.modalRef.id,
        title: this.config.title ?? 'Modal',
        icon: this.config.iconTitle,
        color: this.config.color,
        restoreCallback: () => this._restore(),
      });
      this._cdr.detectChanges();
    }, duration);
  }

  private _restore(): void {
    this._dockService.removeItem(this.modalRef.id);
    this.modalRef.restore();
    this._cdr.detectChanges();
    requestAnimationFrame(() => {
      this.animationState.set('visible');
      this._cdr.detectChanges();
    });
  }

  pauseTimeout(): void {
    if (this.effectivePauseOnHover && !this._isPaused && this.config.timeout) {
      this._isPaused = true;
      this._pauseStartTime = Date.now();
    }
  }

  resumeTimeout(): void {
    if (this.effectivePauseOnHover && this._isPaused && this._pauseStartTime) {
      this._isPaused = false;
      this._pausedTime += Date.now() - this._pauseStartTime;
      this._pauseStartTime = undefined;
    }
  }

  @HostListener('mouseenter')
  onHostMouseEnter(): void { this.pauseTimeout(); }

  @HostListener('mouseleave')
  onHostMouseLeave(): void { this.resumeTimeout(); }

  private _startTimeout(): void {
    const timeout = this.config.timeout!;
    this._startTime = Date.now();
    this.remainingTime.set(Math.ceil(timeout.duration / 1000));
    this._timeoutInterval = setInterval(() => {
      if (this._isPaused) return;
      const elapsed = Date.now() - this._startTime! - this._pausedTime;
      this.timeoutProgress.set(Math.min((elapsed / timeout.duration) * 100, 100));
      this.remainingTime.set(Math.max(Math.ceil((timeout.duration - elapsed) / 1000), 0));
      this._cdr.markForCheck();
      if (elapsed >= timeout.duration) {
        this._clearTimeout();
        this._onTimeoutExpired();
      }
    }, 50);
  }

  private _onTimeoutExpired(): void {
    const timeout = this.config.timeout!;
    const action = timeout.timeoutAction ?? 'cancel';
    timeout.onTimeout?.(action);
    if (action === 'confirm') {
      this.modalRef.close({ confirmed: true, data: this.config.data ?? null, reason: 'timeout' });
    } else {
      this.modalRef.close({ confirmed: false, data: null, reason: 'timeout' });
    }
  }

  private _clearTimeout(): void {
    if (this._timeoutInterval) {
      clearInterval(this._timeoutInterval);
      this._timeoutInterval = undefined;
    }
  }

  private _subscribeToStateChanges(): void {
    this.modalRef?.stateChanged().subscribe((state) => {
      if (state === 'open' && this.animationState() === 'hidden') {
        this._dockService.removeItem(this.modalRef.id);
        requestAnimationFrame(() => {
          this.animationState.set('visible');
          this._cdr.detectChanges();
        });
      }
      this._cdr.detectChanges();
    });
  }

  private _setupFocusTrap(): void {
    const el = this._elementRef.nativeElement;
    if (el) {
      this._focusTrap = this._focusTrapFactory.create(el);
      this._focusTrap.focusInitialElementWhenReady();
    }
  }

  private _previousScrollPosition?: { x: number; y: number };

  private _handleScrollStrategy(): void {
    if ((this.config.scrollStrategy ?? 'block') === 'block') {
      this._previousScrollPosition = { x: window.scrollX, y: window.scrollY };
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private _restoreScroll(): void {
    if (this._previousScrollPosition) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.scrollTo(this._previousScrollPosition.x, this._previousScrollPosition.y);
      this._previousScrollPosition = undefined;
    }
  }

  private _setupGestures(): void {
    if (typeof window === 'undefined') return;
    const el: HTMLElement = this._elementRef.nativeElement;
    this._touchStartHandler = (e: Event) => this._onTouchStart(e as TouchEvent);
    this._touchEndHandler = (e: Event) => this._onTouchEnd(e as TouchEvent);
    el.addEventListener('touchstart', this._touchStartHandler, { passive: true });
    el.addEventListener('touchend', this._touchEndHandler, { passive: true });
  }

  private _onTouchStart(e: TouchEvent): void {
    this._touchStartX = e.touches[0].clientX;
    this._touchStartY = e.touches[0].clientY;
  }

  private _onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this._touchStartX;
    const dy = e.changedTouches[0].clientY - this._touchStartY;
    const gestures = this.config.gestures!;
    if (gestures.swipeDown?.enabled && dy > (gestures.swipeDown.threshold ?? 100) && Math.abs(dx) < 50) {
      this._triggerHaptic();
      this.modalRef.close({ confirmed: false, data: null, reason: 'cancelled' });
    } else if (gestures.swipeLeft?.enabled && dx < -(gestures.swipeLeft.threshold ?? 100) && Math.abs(dy) < 50) {
      this._triggerHaptic();
      this.modalRef.close({ confirmed: false, data: null, reason: 'cancelled' });
    } else if (gestures.swipeRight?.enabled && dx > (gestures.swipeRight.threshold ?? 100) && Math.abs(dy) < 50) {
      this._triggerHaptic();
      this.modalRef.close({ confirmed: true, data: this.config.data ?? null, reason: 'confirmed' });
    }
  }

  private _triggerHaptic(): void {
    if (this.config.gestures?.hapticFeedback && 'vibrate' in navigator) navigator.vibrate(50);
  }

  private _clearGestures(): void {
    const el: HTMLElement = this._elementRef.nativeElement;
    if (this._touchStartHandler) el.removeEventListener('touchstart', this._touchStartHandler);
    if (this._touchEndHandler) el.removeEventListener('touchend', this._touchEndHandler);
  }

  private _getSemanticColor(): string {
    const colorMap: Record<string, string> = {
      confirm: 'var(--nui-primary)',
      info: 'var(--nui-info)',
      warning: 'var(--nui-warning)',
      danger: 'var(--nui-danger)',
      success: 'var(--nui-success)',
      verification: 'var(--nui-success)',
    };
    return this.config.modalType
      ? colorMap[this.config.modalType] ?? 'var(--nui-primary)'
      : 'var(--nui-primary)';
  }

  private _customButtonsToActions(buttons: ModalDialogCustomButton[]): ModalDialogAction[] {
    return buttons.map((btn) => ({
      label: btn.text,
      prefixIcon: btn.prefixIcon,
      suffixIcon: btn.suffixIcon,
      color: btn.color,
      variant: btn.variant,
      size: btn.size,
      handler: async () => {
        await btn.callback(this.modalRef);
        if (btn.closeOnClick) {
          this.modalRef.close({ confirmed: true, data: null, reason: 'confirmed' });
        }
      },
      disabled: btn.disabled,
      loading: btn.loading,
      class: btn.class,
    }));
  }

  protected resolveBoolean(value: boolean | (() => boolean) | undefined): boolean {
    if (typeof value === 'function') return value();
    return value ?? false;
  }
}
