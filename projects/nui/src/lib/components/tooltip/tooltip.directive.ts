import {
  Directive,
  Input,
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
import { NUI_CONFIG } from '../../configs';

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
 * <button nuiTooltip="Eliminar" tooltipPosition="bottom">Eliminar</button>
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
 *   [tooltipShowDelay]="500"
 *   [tooltipHideDelay]="200">
 *   Hover me
 * </button>
 * 
 * @example
 * // Tooltip deshabilitado condicionalmente
 * <button 
 *   nuiTooltip="Este tooltip está deshabilitado" 
 *   [tooltipDisabled]="true">
 *   No tooltip
 * </button>
 * 
 * @example
 * // Tooltip con clase personalizada
 * <button 
 *   nuiTooltip="Tooltip con estilo" 
 *   tooltipClass="custom-tooltip-style">
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
  private globalConfig = inject(NUI_CONFIG);

  private overlayRef?: OverlayRef;
  private componentRef?: ComponentRef<TooltipComponent>;
  private showTimeoutId?: ReturnType<typeof setTimeout>;
  private hideTimeoutId?: ReturnType<typeof setTimeout>;
  private currentPosition: TooltipPosition = 'top';
  private tooltipId = `nui-tooltip-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Contenido del tooltip (texto o template)
   */
  @Input('nuiTooltip') content: string | TemplateRef<any> = '';

  /**
   * Posición del tooltip
   * @default 'top' (o valor global configurado)
   */
  @Input() tooltipPosition?: TooltipPosition;

  /**
   * Evento que dispara el tooltip
   * @default 'hover' (o valor global configurado)
   */
  @Input() tooltipEvent?: TooltipEvent;

  /**
   * Delay antes de mostrar el tooltip (ms)
   * @default 300 (o valor global configurado)
   */
  @Input() tooltipShowDelay?: number;

  /**
   * Delay antes de ocultar el tooltip (ms)
   * @default 0 (o valor global configurado)
   */
  @Input() tooltipHideDelay?: number;

  /**
   * Desactiva el tooltip
   * @default false
   */
  @Input({ transform: booleanAttribute }) tooltipDisabled = false;

  /**
   * Clase CSS personalizada para el tooltip
   */
  @Input() tooltipClass?: string;

  /**
   * Muestra una flecha apuntando al elemento
   * @default true (o valor global configurado)
   */
  @Input({ transform: booleanAttribute }) tooltipShowArrow?: boolean;

  /**
   * Permite interactuar con el contenido del tooltip (hover sobre el tooltip)
   * @default false (o valor global configurado)
   */
  @Input({ transform: booleanAttribute }) tooltipInteractive?: boolean;

  private isVisible = signal(false);
  private isMouseOverHost = false;
  private isMouseOverTooltip = false;

  // Getters para valores con fallback a configuración global
  private get position(): TooltipPosition {
    return this.tooltipPosition ?? this.globalConfig.tooltip?.position ?? 'top';
  }

  private get event(): TooltipEvent {
    return this.tooltipEvent ?? this.globalConfig.tooltip?.event ?? 'hover';
  }

  private get showDelay(): number {
    return this.tooltipShowDelay ?? this.globalConfig.tooltip?.showDelay ?? 300;
  }

  private get hideDelay(): number {
    return this.tooltipHideDelay ?? this.globalConfig.tooltip?.hideDelay ?? 0;
  }

  private get showArrow(): boolean {
    return this.tooltipShowArrow ?? this.globalConfig.tooltip?.showArrow ?? true;
  }

  private get interactive(): boolean {
    return this.tooltipInteractive ?? this.globalConfig.tooltip?.interactive ?? false;
  }

  constructor() {
    // Optimizado: effect con onCleanup para mejor gestión de recursos
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
    this.createOverlay();
    
    const element = this.elementRef.nativeElement as HTMLElement;
    
    // Asegurar que el elemento pueda recibir focus si el evento es 'focus'
    if (this.event === 'focus') {
      const tagName = element.tagName;
      const isFocusableElement = tagName === 'BUTTON' || tagName === 'INPUT' || 
                                  tagName === 'A' || tagName === 'SELECT' || 
                                  tagName === 'TEXTAREA';
      
      if (!element.hasAttribute('tabindex') && !isFocusableElement) {
        element.setAttribute('tabindex', '0');
      }
    }

    // Agregar aria-describedby para accesibilidad
    element.setAttribute('aria-describedby', this.tooltipId);
  }

  ngOnDestroy(): void {
    // Limpiar event listeners si existen
    if (this.interactive) {
      this.removeInteractiveListeners();
    }
    
    // El cleanup adicional ahora se maneja en el constructor con DestroyRef
    // Este método se mantiene para compatibilidad pero el trabajo se hace automáticamente
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.event === 'hover') {
      if (this.interactive) {
        this.isMouseOverHost = true;
      }
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.event === 'hover') {
      if (this.interactive) {
        this.isMouseOverHost = false;
      }
      this.hide();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.event === 'click') {
      event.stopPropagation();
      this.toggle();
    }
  }

  @HostListener('focusin')
  onFocus(): void {
    if (this.event === 'focus') {
      this.show();
    }
  }

  @HostListener('focusout')
  onBlur(): void {
    if (this.event === 'focus') {
      this.hide();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    // Cerrar tooltip con evento click cuando se hace click fuera
    if (this.event === 'click' && this.isVisible()) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.hide();
      }
    }
  }

  /**
   * Muestra el tooltip
   */
  show(): void {
    if (this.tooltipDisabled || !this.content) {
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
    }, this.showDelay);
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
    if (this.interactive && (this.isMouseOverHost || this.isMouseOverTooltip)) {
      return;
    }

    // Para tooltips interactivos, añadir un pequeño delay adicional para dar tiempo
    // al usuario de mover el mouse hacia el tooltip
    const delay = this.interactive && !this.isMouseOverHost && !this.isMouseOverTooltip
      ? Math.max(this.hideDelay, 100)
      : this.hideDelay;

    this.hideTimeoutId = setTimeout(() => {
      // Verificar nuevamente antes de ocultar (por si el usuario entró al tooltip)
      if (this.interactive && (this.isMouseOverHost || this.isMouseOverTooltip)) {
        return;
      }
      this.isVisible.set(false);
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
    if (this.tooltipClass) {
      panelClasses.push(this.tooltipClass);
    }
    if (this.interactive) {
      panelClasses.push('nui-tooltip-interactive');
    }

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: panelClasses,
    });

    // Suscribirse a los cambios de posición para actualizar la flecha si el overlay se reposiciona
    positionStrategy.positionChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
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

    const primary = positions[this.position];
    this.currentPosition = this.position;
    const fallbacks = Object.values(positions).filter(p => p !== primary);

    return [primary, ...fallbacks];
  }

  private attach(): void {
    if (!this.overlayRef || this.overlayRef.hasAttached()) {
      return;
    }

    const portal = new ComponentPortal(TooltipComponent, this.viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);

    // Establecer el contenido
    this.componentRef.setInput('content', this.content);
    
    // Establecer la posición (se actualizará inmediatamente después)
    this.componentRef.setInput('position', this.currentPosition);
    
    // Establecer si muestra flecha
    this.componentRef.setInput('showArrow', this.showArrow);
    
    // Establecer el ID para aria-describedby
    this.componentRef.setInput('tooltipId', this.tooltipId);
    
    // Indicar si es un template
    const isTemplate = this.content instanceof TemplateRef;
    this.componentRef.instance.isTemplate.set(isTemplate);

    // IMPORTANTE: Forzar actualización inmediata de la posición
    // El overlay ya ha calculado la posición, así que la detectamos de inmediato
    setTimeout(() => {
      this.detectAndUpdatePosition();
    }, 0);

    // Si el tooltip es interactivo, agregar event listeners al overlay
    if (this.interactive && this.overlayRef) {
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
  private detectPositionFromCoordinates(
    overlayRect: DOMRect,
    hostRect: DOMRect
  ): TooltipPosition {
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
      // Limpiar event listeners si es interactivo
      if (this.interactive) {
        this.removeInteractiveListeners();
      }
      
      this.overlayRef.detach();
      this.componentRef = undefined;
      
      // Resetear estado de tracking
      this.isMouseOverTooltip = false;
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
}
