import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  signal,
  effect,
  HostListener,
  DestroyRef,
  ComponentRef,
  booleanAttribute,
  input,
  computed,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip.component';
import { TooltipPosition, TooltipEvent } from './models/tooltip.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectTooltipConfig } from '../../configs/tooltip/tooltip.config';

/**
 * @name
 * nuiTooltip
 * @description
 * Directiva para mostrar tooltips personalizables con soporte para texto simple y templates.
 * Utiliza Angular CDK Overlay para un posicionamiento preciso y responsive.
 *
 * @example
 * // Tooltip básico con texto
 * <button nuiTooltip="Guardar cambios">Guardar</button>
 *
 * @example
 * // Tooltip con posición específica
 * <button nuiTooltip="Eliminar" nuiTooltipPosition="bottom">Eliminar</button>
 *
 * @example
 * // Tooltip con template personalizado
 * <button [nuiTooltip]="tooltipTemplate">Ver más</button>
 * <ng-template #tooltipTemplate>
 *   <div class="custom-tooltip">
 *     <strong>Información importante</strong>
 *     <p>Contenido detallado aquí</p>
 *   </div>
 * </ng-template>
 *
 * @example
 * // Tooltip con configuración de delays
 * <button
 *   nuiTooltip="Texto del tooltip"
 *   [nuiTooltipShowDelay]="500"
 *   [nuiTooltipHideDelay]="200">
 *   Hover me
 * </button>
 *
 * @example
 * // Tooltip deshabilitado condicionalmente
 * <button
 *   nuiTooltip="Este tooltip está deshabilitado"
 *   [nuiTooltipDisabled]="true">
 *   No tooltip
 * </button>
 *
 * @example
 * // Tooltip con clase personalizada
 * <button
 *   nuiTooltip="Tooltip con estilo"
 *   nuiTooltipClass="custom-tooltip-style">
 *   Custom style
 * </button>
 */
@Directive({
  selector: '[nuiTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  private tooltipConfig = injectTooltipConfig();

  private overlayRef?: OverlayRef;
  private componentRef?: ComponentRef<TooltipComponent>;
  private showTimeoutId?: ReturnType<typeof setTimeout>;
  private hideTimeoutId?: ReturnType<typeof setTimeout>;
  private currentPosition: TooltipPosition = 'top';
  readonly tooltipId = `nui-tooltip-${Math.random().toString(36).substring(2, 11)}`;

  // ========================================================================
  // INPUTS (Signals — API moderna NUI)
  // ========================================================================

  /** Contenido del tooltip (texto o template) */
  readonly content = input.required<string | TemplateRef<any>>({ alias: 'nuiTooltip' });

  /** 
   * Posición del tooltip. 
   * @default 'top' 
   */
  readonly nuiTooltipPosition = input<TooltipPosition | undefined>(undefined);

  /** 
   * Evento disparador. 
   * @default 'hover' 
   */
  readonly nuiTooltipEvent = input<TooltipEvent | undefined>(undefined);

  /** 
   * Delay antes de mostrar (ms). 
   * @default 300 
   */
  readonly nuiTooltipShowDelay = input<number | undefined>(undefined);

  /** 
   * Delay antes de ocultar (ms). 
   * @default 0 
   */
  readonly nuiTooltipHideDelay = input<number | undefined>(undefined);

  /**
   * Desactiva el tooltip.
   * @default false
   */
  readonly nuiTooltipDisabled = input(false, { transform: booleanAttribute });

  /** Clase CSS personalizada. */
  readonly nuiTooltipClass = input<string | undefined>(undefined);

  /** 
   * Mostrar flecha. 
   * @default true 
   */
  readonly nuiTooltipShowArrow = input(undefined, { transform: booleanAttribute });

  /**
   * Permitir HTML en el contenido (solo si es string).
   * Angular sanitiza automáticamente con [innerHTML]. Usar con precaución si el
   * contenido proviene de bypassSecurityTrustHtml().
   * @default false
   */
  readonly nuiTooltipAllowHtml = input(undefined, { transform: booleanAttribute });

  /**
   * Permite interactuar con el contenido del tooltip (hover sobre el tooltip).
   * @default false
   */
  readonly nuiTooltipInteractive = input(undefined, { transform: booleanAttribute });

  // ========================================================================
  // COMPUTED — valores efectivos con fallback a configuración global
  // ========================================================================

  private readonly position = computed<TooltipPosition>(
    () => this.nuiTooltipPosition() ?? this.tooltipConfig?.position ?? 'top'
  );

  private readonly event = computed<TooltipEvent>(
    () => this.nuiTooltipEvent() ?? this.tooltipConfig?.event ?? 'hover'
  );

  private readonly showDelay = computed(
    () => this.nuiTooltipShowDelay() ?? this.tooltipConfig?.showDelay ?? 300
  );

  private readonly hideDelay = computed(
    () => this.nuiTooltipHideDelay() ?? this.tooltipConfig?.hideDelay ?? 0
  );

  private readonly showArrow = computed(
    () => this.nuiTooltipShowArrow() ?? this.tooltipConfig?.showArrow ?? true
  );

  /**
   * Fix allowHtml: el default del input es false. El fallback global puede activarlo.
   * La prioridad es: input explícito > config global > false (nunca true por defecto).
   */
  private readonly allowHtml = computed(
    () => this.nuiTooltipAllowHtml() || (this.tooltipConfig?.allowHtml ?? false)
  );

  private readonly interactive = computed(
    () => this.nuiTooltipInteractive() ?? this.tooltipConfig?.interactive ?? false
  );

  // ========================================================================
  // ESTADO INTERNO
  // ========================================================================
  private isVisible = signal(false);
  private isMouseOverHost = false;
  private isMouseOverTooltip = false;
  private scrollListenerCleanup?: () => void;

  constructor() {
    // Optimizado: effect con onCleanup para mejor gestión de recursos
    effect(onCleanup => {
      if (!this.isVisible() && this.overlayRef) {
        this.detach();
      }

      onCleanup(() => {
        this.clearTimeouts();
      });
    });

    // Cleanup automático al destruir
    this.destroyRef.onDestroy(() => {
      this.clearTimeouts();
      if (this.overlayRef) {
        this.overlayRef.dispose();
      }
    });
  }

  ngOnInit(): void {
    this.createOverlay();

    const element = this.elementRef.nativeElement as HTMLElement;

    // Asegurar que el elemento pueda recibir focus si el evento es 'focus'
    if (this.event() === 'focus') {
      const tagName = element.tagName;
      const isFocusableElement =
        tagName === 'BUTTON' ||
        tagName === 'INPUT' ||
        tagName === 'A' ||
        tagName === 'SELECT' ||
        tagName === 'TEXTAREA';

      if (!element.hasAttribute('tabindex') && !isFocusableElement) {
        element.setAttribute('tabindex', '0');
      }
    }

    // Fix aria-describedby: NO lo ponemos permanentemente en ngOnInit porque el
    // elemento role="tooltip" no existe en el DOM hasta que el overlay se adjunta.
    // Se añade/quita dinámicamente en attach()/detach() para que la referencia sea válida.
  }

  ngOnDestroy(): void {
    if (this.interactive()) {
      this.removeInteractiveListeners();
    }

    // Limpiar scroll listener si existe
    this.removeScrollListener();

    // El cleanup adicional ahora se maneja en el constructor con DestroyRef
    // Este método se mantiene para compatibilidad pero el trabajo se hace automáticamente
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.event() === 'hover') {
      if (this.interactive()) {
        this.isMouseOverHost = true;
      }
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.event() === 'hover') {
      if (this.interactive()) {
        this.isMouseOverHost = false;
      }
      this.hide();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (this.event() === 'click') {
      event.preventDefault();
      this.toggle();
    } else if (this.event() === 'hover') {
      if (this.interactive()) {
        this.isMouseOverHost = true;
      }
      this.show();
    }
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    if (this.event() === 'hover' && !this.interactive()) {
      this.hide();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.event() === 'click') {
      event.stopPropagation();
      this.toggle();
    }
  }

  @HostListener('focusin')
  onFocus(): void {
    if (this.event() === 'focus') {
      this.show();
    }
  }

  @HostListener('focusout')
  onBlur(): void {
    if (this.event() === 'focus') {
      this.hide();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (this.event() === 'click' && this.isVisible()) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.hide();
      }
    }
  }

  /**
   * Fix a11y: ESC cierra el tooltip inmediatamente (WCAG 2.1.1 - Keyboard).
   * Solo actúa si el tooltip está visible para no interferir con otros handlers.
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isVisible()) {
      this.clearTimeouts();
      this.isVisible.set(false);
    }
  }

  /**
   * Muestra el tooltip
   */
  show(): void {
    if (this.nuiTooltipDisabled() || !this.content()) {
      return;
    }

    // Cancelar cualquier timeout pendiente
    this.clearTimeouts();

    // Si ya está visible, no hacer nada
    if (this.isVisible()) {
      return;
    }

    this.showTimeoutId = setTimeout(() => {
      this.attach();
      this.isVisible.set(true);

      // Siempre escuchar scroll para cerrar el tooltip (incluye mobile/touch)
      this.setupScrollListener();
    }, this.showDelay());
  }

  /**
   * Oculta el tooltip
   */
  hide(): void {
    // Cancelar cualquier timeout pendiente (IMPORTANTE para evitar múltiples tooltips)
    this.clearTimeouts();

    if (!this.isVisible()) {
      return;
    }

    // Si el tooltip es interactivo, solo ocultar cuando el mouse no esté sobre ninguno
    if (this.interactive() && (this.isMouseOverHost || this.isMouseOverTooltip)) {
      return;
    }

    const delay =
      this.interactive() && !this.isMouseOverHost && !this.isMouseOverTooltip
        ? Math.max(this.hideDelay(), 100)
        : this.hideDelay();

    this.hideTimeoutId = setTimeout(() => {
      if (this.interactive() && (this.isMouseOverHost || this.isMouseOverTooltip)) {
        return;
      }
      this.isVisible.set(false);

      // Limpiar scroll listener cuando se oculta
      this.removeScrollListener();
    }, delay);
  }

  /**
   * Alterna la visibilidad del tooltip
   */
  toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  private createOverlay(): void {
    const positionStrategy = this.getPositionStrategy();

    const panelClasses = ['nui-tooltip-overlay'];
    if (this.nuiTooltipClass()) {
      panelClasses.push(this.nuiTooltipClass()!);
    }
    if (this.interactive()) {
      panelClasses.push('nui-tooltip-interactive');
    }

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: panelClasses,
    });

    // Suscribirse a los cambios de posición para actualizar la flecha si el overlay se reposiciona
    positionStrategy.positionChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      // Cuando hay un cambio de posición (ej: scroll), detectar la nueva posición
      this.detectAndUpdatePosition();
    });
  }

  /**
   * Actualiza la posición del tooltip en el componente
   */
  private updateTooltipPosition(): void {
    if (this.componentRef) {
      this.componentRef.setInput('position', this.currentPosition);
    }
  }

  private getPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positions = this.getPositions();

    return this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8);
  }

  private getPositions(): ConnectedPosition[] {
    const positions: Record<TooltipPosition, ConnectedPosition> = {
      top: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      },
      bottom: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 8,
      },
      left: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -8,
      },
      right: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: 8,
      },
    };

    const primary = positions[this.position()];
    this.currentPosition = this.position();
    const fallbacks = Object.values(positions).filter(p => p !== primary);

    return [primary, ...fallbacks];
  }

  private attach(): void {
    if (!this.overlayRef || this.overlayRef.hasAttached()) {
      return;
    }

    const portal = new ComponentPortal(TooltipComponent, this.viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);

    this.componentRef.setInput('content', this.content());
    this.componentRef.setInput('position', this.currentPosition);
    this.componentRef.setInput('showArrow', this.showArrow());
    this.componentRef.setInput('allowHtml', this.allowHtml());
    this.componentRef.setInput('tooltipId', this.tooltipId);

    setTimeout(() => {
      this.detectAndUpdatePosition();
    }, 0);

    // Fix aria-describedby dinámico: solo cuando el tooltip existe en el DOM
    this.elementRef.nativeElement.setAttribute('aria-describedby', this.tooltipId);

    if (this.interactive() && this.overlayRef) {
      this.addInteractiveListeners();
    }
  }

  /**
   * Detecta y actualiza la posición actual del tooltip
   */
  private detectAndUpdatePosition(): void {
    if (!this.overlayRef) return;

    const overlayElement = this.overlayRef.overlayElement;
    const hostElement = this.elementRef.nativeElement as HTMLElement;

    if (!overlayElement || !hostElement) return;

    const overlayRect = overlayElement.getBoundingClientRect();
    const hostRect = hostElement.getBoundingClientRect();

    // Detectar posición basándose en las coordenadas relativas
    const actualPosition = this.detectPositionFromCoordinates(overlayRect, hostRect);

    if (actualPosition !== this.currentPosition) {
      this.currentPosition = actualPosition;
      this.updateTooltipPosition();
    }
  }

  /**
   * Detecta la posición real comparando las coordenadas del overlay y el host
   */
  private detectPositionFromCoordinates(overlayRect: DOMRect, hostRect: DOMRect): TooltipPosition {
    const overlayCenterY = overlayRect.top + overlayRect.height / 2;
    const hostCenterY = hostRect.top + hostRect.height / 2;
    const overlayCenterX = overlayRect.left + overlayRect.width / 2;
    const hostCenterX = hostRect.left + hostRect.width / 2;

    const verticalDiff = Math.abs(overlayCenterY - hostCenterY);
    const horizontalDiff = Math.abs(overlayCenterX - hostCenterX);

    // Si la diferencia vertical es mayor, está arriba o abajo
    if (verticalDiff > horizontalDiff) {
      return overlayRect.bottom < hostRect.top ? 'top' : 'bottom';
    } else {
      // Si la diferencia horizontal es mayor, está a la izquierda o derecha
      return overlayRect.right < hostRect.left ? 'left' : 'right';
    }
  }

  /**
   * Handler para mouseenter en el tooltip (usando arrow function para mantener contexto)
   */
  private onTooltipMouseEnter = (): void => {
    this.isMouseOverTooltip = true;
    // Cancelar cualquier timeout de hide pendiente
    this.clearTimeouts();
  };

  /**
   * Handler para mouseleave en el tooltip (usando arrow function para mantener contexto)
   */
  private onTooltipMouseLeave = (): void => {
    this.isMouseOverTooltip = false;
    this.hide();
  };

  /**
   * Añade event listeners al overlay para tooltips interactivos
   */
  private addInteractiveListeners(): void {
    if (!this.overlayRef) return;

    const overlayElement = this.overlayRef.overlayElement;
    if (!overlayElement) return;

    overlayElement.addEventListener('mouseenter', this.onTooltipMouseEnter);
    overlayElement.addEventListener('mouseleave', this.onTooltipMouseLeave);
  }

  /**
   * Remueve event listeners del overlay
   */
  private removeInteractiveListeners(): void {
    if (!this.overlayRef) return;

    const overlayElement = this.overlayRef.overlayElement;
    if (!overlayElement) return;

    overlayElement.removeEventListener('mouseenter', this.onTooltipMouseEnter);
    overlayElement.removeEventListener('mouseleave', this.onTooltipMouseLeave);
  }

  private detach(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      if (this.interactive()) {
        this.removeInteractiveListeners();
      }
      this.removeScrollListener();
      this.overlayRef.detach();
      this.componentRef = undefined;
      this.isMouseOverTooltip = false;

      // Fix aria-describedby dinámico: eliminar cuando el tooltip ya no está en el DOM
      this.elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  private clearTimeouts(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = undefined;
    }

    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  /**
   * Configura un listener de scroll para cerrar el tooltip cuando se hace scroll
   * Solo se usa para eventos no-hover (click, focus)
   */
  private setupScrollListener(): void {
    // Limpiar listener anterior si existe
    this.removeScrollListener();

    const scrollHandler = () => {
      // Cerrar el tooltip inmediatamente al hacer scroll
      this.hide();
    };

    // Escuchar scroll en la ventana y en todos los ancestros scrollables
    window.addEventListener('scroll', scrollHandler, true);

    // Guardar función de cleanup
    this.scrollListenerCleanup = () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }

  /**
   * Remueve el listener de scroll
   */
  private removeScrollListener(): void {
    if (this.scrollListenerCleanup) {
      this.scrollListenerCleanup();
      this.scrollListenerCleanup = undefined;
    }
  }
}
