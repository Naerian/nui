import {
  Directive,
  input,
  output,
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
  Type,
  Injector,
  untracked,
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
import { PopoverContext, PopoverEvent, PopoverPosition } from './models/popover.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PopoverManagerService } from './services/popover-manager.service';
import { PopoverComponent } from './popover.component';
import { NUI_CONFIG } from '../../configs';

/**
 * @name
 * nuiPopover
 * @description
 * Directiva para mostrar popovers interactivos con soporte para texto, templates y componentes dinámicos.
 * Utiliza Angular CDK Overlay para un posicionamiento preciso y responsive.
 * A diferencia del tooltip, el popover permite interacción completa con el contenido.
 * 
 * @example
 * // Popover básico con texto
 * <button nuiPopover="Información adicional">Ver info</button>
 * 
 * @example
 * // Popover con posición específica
 * <button nuiPopover="Contenido" popoverPosition="bottom">Mostrar</button>
 * 
 * @example
 * // Popover con template personalizado
 * <button [nuiPopover]="popoverTemplate">Ver detalles</button>
 * <ng-template #popoverTemplate let-close="close">
 *   <div class="custom-popover">
 *     <h3>Título</h3>
 *     <p>Contenido interactivo</p>
 *     <button (click)="close()">Cerrar</button>
 *   </div>
 * </ng-template>
 * 
 * @example
 * // Popover con componente dinámico
 * <button [nuiPopover]="MyCustomComponent">Abrir</button>
 * 
 * @example
 * // Popover con configuración personalizada
 * <button 
 *   nuiPopover="Contenido" 
 *   popoverPosition="right"
 *   [popoverShowDelay]="200"
 *   [popoverMaxWidth]="'400px'"
 *   [popoverCloseOnClickOutside]="true">
 *   Configurado
 * </button>
 */
@Directive({
  selector: '[nuiPopover]',
  standalone: true,
  exportAs: 'nuiPopover',
  host: {
    '[attr.aria-describedby]': 'isVisible() ? popoverId : null',
    '[attr.aria-expanded]': 'isVisible()',
    '[attr.aria-haspopup]': '"dialog"',
  },
})
export class PopoverDirective implements OnInit, OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  private globalConfig = inject(NUI_CONFIG);
  private popoverManager = inject(PopoverManagerService);

  private overlayRef?: OverlayRef;
  private componentRef?: ComponentRef<PopoverComponent>;
  private showTimeoutId?: ReturnType<typeof setTimeout>;
  private hideTimeoutId?: ReturnType<typeof setTimeout>;
  private currentPosition: PopoverPosition = 'top';
  readonly popoverId = `nui-popover-${Math.random().toString(36).substring(2, 11)}`;
  private hoverSubscriptions: { unsubscribe: () => void }[] = [];

  /**
   * Contenido del popover (texto, template o componente)
   */
  readonly content = input.required<string | TemplateRef<PopoverContext> | Type<any>>({ alias: 'nuiPopover' });

  /**
   * Posición del popover
   * @default 'top' (o valor global configurado)
   */
  readonly popoverPosition = input<PopoverPosition | undefined>(undefined);

  /**
   * Evento que dispara el popover
   * Opciones: 'hover', 'click', 'focus'
   * @default 'click' (o valor global configurado)
   */
  readonly popoverEvent = input<PopoverEvent | undefined>(undefined);

  /**
   * Delay antes de mostrar el popover (ms)
   * @default 0 (o valor global configurado)
   */
  readonly popoverShowDelay = input<number | undefined>(undefined);

  /**
   * Delay antes de ocultar el popover (ms)
   * 
   * NOTAS IMPORTANTES:
   * - El hideDelay NO se aplica al hacer scroll (cierre inmediato para mejor UX)
   * - Para popovers con event="hover" sin hideDelay configurado, se aplica 
   *   automáticamente un delay mínimo de 100ms para permitir mover el mouse al popover
   * - Si configuras explícitamente hideDelay=0 en modo hover, se respetará el 0
   * 
   * @default 0 (o valor global configurado)
   */
  readonly popoverHideDelay = input<number | undefined>(undefined);

  /**
   * Desactiva el popover
   * @default false
   */
  readonly popoverDisabled = input(false);

  /**
   * Clase CSS personalizada para el popover
   */
  readonly popoverClass = input<string | undefined>(undefined);

  /**
   * Muestra una flecha apuntando al elemento
   * @default true (o valor global configurado)
   */
  readonly popoverShowArrow = input<boolean | undefined>(undefined);

  /**
   * Cierra el popover al hacer click fuera
   * @default true (o valor global configurado)
   */
  readonly popoverCloseOnClickOutside = input<boolean | undefined>(undefined);

  /**
   * Cierra el popover al presionar Escape
   * @default true (o valor global configurado)
   */
  readonly popoverCloseOnEscape = input<boolean | undefined>(undefined);

  /**
   * Ancho máximo del popover
   * @default '300px' (o valor global configurado)
   */
  readonly popoverMaxWidth = input<string | undefined>(undefined);

  /**
   * Ancho mínimo del popover
   */
  readonly popoverMinWidth = input<string | undefined>(undefined);

  /**
   * Offset (separación) del popover respecto al elemento trigger en píxeles
   * @default 8
   */
  readonly popoverOffset = input<number | undefined>(undefined);

  /**
   * Datos para pasar al componente dinámico o template
   */
  readonly popoverData = input<any>(undefined);

  /**
   * Permite múltiples popovers abiertos simultáneamente
   * Si es false, al abrir un popover se cierran todos los demás
   * 
   * NOTA: Los popovers con event="hover" permiten múltiples abiertos por defecto
   * (allowMultiple=true automático) para mejor experiencia de usuario.
   * Puedes forzar el comportamiento estableciendo explícitamente este valor.
   * 
   * @default false para click/focus/manual, true para hover (o valor global configurado)
   */
  readonly popoverAllowMultiple = input<boolean | undefined>(undefined);

  /**
   * Muestra un backdrop (fondo oscuro) detrás del popover
   * @default false
   */
  readonly popoverBackdrop = input(false);

  /**
   * Cierra el popover al hacer click en el backdrop
   * Solo tiene efecto si popoverBackdrop=true
   * @default true
   */
  readonly backdropClose = input(true);

  /**
   * Z-index del popover (útil para controlar el orden de apilamiento)
   * @default 1000
   */
  readonly popoverZIndex = input(1000);

  /**
   * Evento que se emite cuando el popover se muestra
   */
  readonly popoverShow = output<void>();

  /**
   * Evento que se emite cuando el popover se oculta
   */
  readonly popoverHide = output<void>();

  readonly isVisible = signal(false);

  // Computed signals para valores con fallback a configuración global
  private readonly position = computed<PopoverPosition>(() => 
    this.popoverPosition() ?? this.globalConfig.popover?.position ?? 'top'
  );

  private readonly event = computed<PopoverEvent>(() => 
    this.popoverEvent() ?? this.globalConfig.popover?.event ?? 'click'
  );

  private readonly showDelay = computed(() => 
    this.popoverShowDelay() ?? this.globalConfig.popover?.showDelay ?? 0
  );

  private readonly hideDelay = computed(() => 
    this.popoverHideDelay() ?? this.globalConfig.popover?.hideDelay ?? 0
  );

  private readonly showArrow = computed(() => 
    this.popoverShowArrow() ?? this.globalConfig.popover?.showArrow ?? true
  );

  private readonly closeOnClickOutside = computed(() => 
    this.popoverCloseOnClickOutside() ?? this.globalConfig.popover?.closeOnClickOutside ?? true
  );

  private readonly closeOnEscape = computed(() => 
    this.popoverCloseOnEscape() ?? this.globalConfig.popover?.closeOnEscape ?? true
  );

  private readonly maxWidth = computed(() => 
    this.popoverMaxWidth() ?? this.globalConfig.popover?.maxWidth ?? '300px'
  );

  private readonly minWidth = computed<string | undefined>(() => 
    this.popoverMinWidth() ?? this.globalConfig.popover?.minWidth
  );

  /**
   * Obtiene el delay efectivo para ocultar el popover.
   * Para modo hover sin hideDelay configurado, aplica 100ms mínimo
   * para permitir mover el mouse al popover.
   */
  private readonly effectiveHideDelay = computed(() => {
    if (this.event() === 'hover' && this.popoverHideDelay() === undefined) {
      // Si no se configuró explícitamente, usar 100ms mínimo para hover
      return Math.max(100, this.hideDelay());
    }
    return this.hideDelay();
  });

  /**
   * Obtiene si se permiten múltiples popovers abiertos.
   * Los popovers con event="hover" permiten múltiples por defecto
   * para mejor experiencia de usuario.
   */
  private readonly allowMultiple = computed(() => {
    // Si se configuró explícitamente, usar ese valor
    if (this.popoverAllowMultiple() !== undefined) {
      return this.popoverAllowMultiple()!;
    }
    
    // Si es hover, permitir múltiples por defecto
    if (this.event() === 'hover') {
      return true;
    }
    
    // Fallback a configuración global o false
    return this.globalConfig.popover?.allowMultiple ?? false;
  });

  constructor() {
    // Escuchar cuando otros popovers se abren
    this.popoverManager.onCloseOthers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((openingPopoverId) => {
        // Si no es este popover y está visible, cerrarlo
        if (openingPopoverId !== this.popoverId && this.isVisible()) {
          untracked(() => this.hide());
        }
      });

    // Effect para gestionar la visibilidad
    effect((onCleanup) => {
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
    // Si el evento es focus, asegurar que el elemento sea focusable
    if (this.event() === 'focus' && !this.isNaturallyFocusable()) {
      this.elementRef.nativeElement.setAttribute('tabindex', '0');
    }

    // Configurar listeners según el evento
    if (this.event() === 'hover') {
      // Para hover, manejamos manualmente
    } else if (this.event() === 'focus') {
      // Focus se maneja con HostListener
    }
    // Click se maneja con HostListener
  }

  ngOnDestroy(): void {
    this.hide();
  }

  /**
   * Maneja el evento de click
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.popoverDisabled() || !this.content()) return;

    if (this.event() === 'click') {
      event.stopPropagation();
      this.toggle();
    }
  }

  /**
   * Maneja el evento de mouseenter
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.popoverDisabled() || !this.content()) return;

    if (this.event() === 'hover') {
      this.clearTimeouts();
      this.show();
    }
  }

  /**
   * Maneja el evento de mouseleave
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.event() === 'hover') {
      // Usar hideDelay para dar tiempo a mover el mouse al popover
      this.hide();
    }
  }

  /**
   * Configura el comportamiento hover interactivo
   * Permite que el usuario mueva el mouse al popover sin que se cierre
   */
  /**
   * Configura el comportamiento hover para permitir interacción con el popover
   */
  private setupHoverBehavior(): void {
    if (this.event() !== 'hover' || !this.overlayRef) return;

    // Limpiar suscripciones anteriores para evitar memory leaks
    this.cleanupHoverSubscriptions();

    // Permitir interacción con el popover
    // Cuando el mouse entra al overlay, cancelar el timeout de cierre
    const enterSub = fromEvent(this.overlayRef.overlayElement, 'mouseenter')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.clearTimeouts();
      });

    // Cuando el mouse sale del overlay, cerrar el popover
    const leaveSub = fromEvent(this.overlayRef.overlayElement, 'mouseleave')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.hide();
      });

    this.hoverSubscriptions.push(enterSub, leaveSub);
  }

  /**
   * Limpia las suscripciones de hover para evitar memory leaks
   */
  private cleanupHoverSubscriptions(): void {
    this.hoverSubscriptions.forEach(sub => sub.unsubscribe());
    this.hoverSubscriptions = [];
  }

  /**
   * Maneja el evento de focus
   */
  @HostListener('focus')
  onFocus(): void {
    if (this.popoverDisabled() || !this.content()) return;

    if (this.event() === 'focus') {
      this.show();
    }
  }

  /**
   * Maneja el evento de blur
   */
  @HostListener('blur')
  onBlur(): void {
    if (this.event() === 'focus') {
      this.hide();
    }
  }

  /**
   * Muestra el popover
   * @returns true si se inició el proceso de mostrar, false si no se pudo
   */
  show(): boolean {
    if (this.popoverDisabled() || !this.content() || this.isVisible()) {
      return false;
    }

    this.clearTimeouts();

    if (this.showDelay() > 0) {
      this.showTimeoutId = setTimeout(() => this.displayPopover(), this.showDelay());
    } else {
      this.displayPopover();
    }
    
    return true;
  }

  /**
   * Oculta el popover
   * @returns true si se inició el proceso de ocultar, false si ya estaba oculto
   */
  hide(): boolean {
    if (!this.isVisible()) {
      return false;
    }

    this.clearTimeouts();

    // Usar el delay efectivo calculado (considera hover sin configuración explícita)
    if (this.effectiveHideDelay() > 0) {
      this.hideTimeoutId = setTimeout(() => this.hidePopover(), this.effectiveHideDelay());
    } else {
      this.hidePopover();
    }
    
    return true;
  }

  /**
   * Alterna la visibilidad del popover
   */
  toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Verifica si el popover está abierto
   * @returns true si el popover está visible, false en caso contrario
   */
  isOpen(): boolean {
    return this.isVisible();
  }

  /**
   * Muestra el popover inmediatamente
   */
  private displayPopover(): void {
    if (!this.overlayRef) {
      this.createOverlay();
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      // Registrar en el manager (cierra otros si allowMultiple es false)
      this.popoverManager.register(this.popoverId, !this.allowMultiple());

      const portal = new ComponentPortal(PopoverComponent, this.viewContainerRef);
      this.componentRef = this.overlayRef.attach(portal);

      // Configurar el componente usando signals
      this.componentRef.setInput('content', this.content());
      this.componentRef.setInput('showArrow', this.showArrow());
      this.componentRef.setInput('position', this.currentPosition);
      this.componentRef.setInput('popoverClass', this.popoverClass());
      this.componentRef.setInput('maxWidth', this.maxWidth());
      this.componentRef.setInput('minWidth', this.minWidth());
      this.componentRef.setInput('popoverId', this.popoverId);

      // Pasar contexto con función close y datos
      this.componentRef.setInput('context', {
        close: () => this.hide(),
        data: this.popoverData(),
      });

      this.componentRef.changeDetectorRef.detectChanges();

      this.isVisible.set(true);

      // Emitir evento de mostrar
      this.popoverShow.emit();

      // Configurar listeners para cerrar
      // NOTA: No configurar clickOutsideListener cuando hay backdrop,
      // ya que el backdrop maneja sus propios clicks
      if (this.closeOnClickOutside() && !this.popoverBackdrop()) {
        this.setupClickOutsideListener();
      }

      if (this.closeOnEscape()) {
        this.setupEscapeListener();
      }

      // Configurar hover interactivo
      this.setupHoverBehavior();
    }
  }

  /**
   * Oculta el popover inmediatamente
   */
  private hidePopover(): void {
    this.isVisible.set(false);
    this.popoverManager.unregister(this.popoverId); // Desregistrar del manager
    
    // Emitir evento de ocultar
    this.popoverHide.emit();
  }

  /**
   * Desadjunta el popover del overlay
   */
  private detach(): void {
    this.cleanupHoverSubscriptions(); // Limpiar suscripciones de hover
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    this.componentRef = undefined;
  }

  /**
   * Crea el overlay con la estrategia de posicionamiento
   */
  private createOverlay(): void {
    const positionStrategy = this.getPositionStrategy();
    // Usar reposition en lugar de close para controlar manualmente el cierre
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    // Combinar clases del panel: clase base + clase personalizada (si existe)
    const panelClasses = ['nui-popover-overlay-pane'];
    if (this.popoverClass()) {
      panelClasses.push(this.popoverClass()!);
    }

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: this.popoverBackdrop(),
      backdropClass: this.popoverBackdrop() ? 'nui-popover-backdrop' : undefined,
      panelClass: panelClasses,
    });

    // Aplicar z-index personalizado
    if (this.overlayRef.overlayElement) {
      this.overlayRef.overlayElement.style.zIndex = this.popoverZIndex().toString();
    }

    // Listener para clicks en el backdrop (si está habilitado)
    if (this.popoverBackdrop() && this.backdropClose()) {
      this.overlayRef.backdropClick()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.hide();
        });
    }

    // Configurar listener de scroll para cerrar manualmente (respetando hideDelay)
    this.setupScrollListener();

    // Listener para actualizar estado cuando el overlay se detach
    this.overlayRef.detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // Actualizar el estado cuando el overlay se cierra automáticamente
        // Usar untracked para evitar errores de escritura en signals dentro de efectos
        untracked(() => {
          this.isVisible.set(false);
          this.detach();
        });
      });

    // Listener para actualizar la posición cuando cambia
    positionStrategy.positionChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((change) => {
        if (this.componentRef) {
          const position = this.getPositionFromConnectionPair(change.connectionPair);
          this.currentPosition = position;
          this.componentRef.instance.position.set(position);
          this.componentRef.changeDetectorRef.detectChanges();
        }
      });
  }

  /**
   * Obtiene la estrategia de posicionamiento
   */
  private getPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positions = this.getPositions();

    return this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8);
  }

  /**
   * Obtiene las posiciones de conexión preferidas
   */
  private getPositions(): ConnectedPosition[] {
    const positions: ConnectedPosition[] = [];
    const offset = this.popoverOffset() ?? 8;

    // Posición preferida
    switch (this.position()) {
      case 'top':
        positions.push(
          { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
          { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset },
          { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
          { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset }
        );
        break;

      case 'bottom':
        positions.push(
          { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset },
          { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
          { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
          { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset }
        );
        break;

      case 'left':
        positions.push(
          { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset },
          { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
          { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
          { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset }
        );
        break;

      case 'right':
        positions.push(
          { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset },
          { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset },
          { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset },
          { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset }
        );
        break;
    }

    return positions;
  }

  /**
   * Convierte ConnectedPosition a PopoverPosition
   */
  private getPositionFromConnectionPair(pair: ConnectedPosition): PopoverPosition {
    if (pair.overlayY === 'bottom') {
      return 'top';
    } else if (pair.overlayY === 'top') {
      return 'bottom';
    } else if (pair.overlayX === 'end') {
      return 'left';
    } else {
      return 'right';
    }
  }

  /**
   * Configura el listener para cerrar al hacer click fuera
   */
  private setupClickOutsideListener(): void {
    if (!this.overlayRef) return;

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          const hostElement = this.elementRef.nativeElement;
          const popoverElement = this.overlayRef?.overlayElement;

          return (
            this.isVisible() &&
            !hostElement.contains(clickTarget) &&
            (!popoverElement || !popoverElement.contains(clickTarget))
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.hide());
  }

  /**
   * Configura el listener para cerrar con Escape
   */
  private setupEscapeListener(): void {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape' && this.isVisible()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.hide());
  }

  /**
   * Configura el listener para cerrar el popover al hacer scroll (cierre inmediato)
   */
  private setupScrollListener(): void {
    fromEvent(window, 'scroll', { passive: true, capture: true })
      .pipe(
        filter(() => this.isVisible()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.hidePopover());
  }

  /**
   * Verifica si el elemento es naturalmente focusable (input, button, etc.)
   */
  private isNaturallyFocusable(): boolean {
    const element = this.elementRef.nativeElement;
    const tagName = element.tagName.toLowerCase();
    const focusableTags = ['input', 'button', 'select', 'textarea', 'a'];
    
    return focusableTags.includes(tagName) || element.hasAttribute('tabindex');
  }

  /**
   * Limpia los timeouts activos
   */
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
}

