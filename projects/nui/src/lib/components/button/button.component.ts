import {
  Component,
  ElementRef,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  booleanAttribute,
  inject,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import {
  ButtonIconPosition,
  ButtonType,
  ButtonWidth,
  ButtonLoadingPosition,
  ButtonIconPositionEnum,
  ButtonLoadingPositionEnum,
  ButtonTypeEnum,
  ButtonWidthEnum,
} from './models/button.model';
import {
  NUI_CONFIG,
  NUIColor,
  NUISize,
  NUIVariant,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  NUIShape,
  DEFAULT_SHAPE,
} from '../../configs';
import { injectButtonConfig } from '../../configs/button';

@Component({
  selector: 'nui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nui-button-host',
    '[attr.role]': '"button"',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '[class.nui-btn-full]': 'width() === "full"',
    '[style.display]': 'width() === "full" ? "flex" : "inline-flex"',
    '[style.width]': 'width() === "full" ? "100%" : "auto"',
  },
})
export class ButtonComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);
  private readonly globalConfig = injectButtonConfig();

  protected ButtonIconPositionEnum = ButtonIconPositionEnum;
  protected ButtonLoadingPositionEnum = ButtonLoadingPositionEnum;
  protected ButtonTypeEnum = ButtonTypeEnum;
  protected ButtonWidthEnum = ButtonWidthEnum;

  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Color del botón. Fallback a configuración global o default. */
  readonly color = input<NUIColor>();

  /** Tamaño del botón. Fallback a configuración global o default. */
  readonly size = input<NUISize>();

  /** Variante visual (solid, outline, ghost). */
  readonly variant = input<NUIVariant>();

  /** Forma del botón (rounded, square, pill). */
  readonly shape = input<NUIShape>();

  /** Si el botón tiene estilo "elevado" (sombra). */
  readonly raised = input(false, { alias: 'raised', transform: booleanAttribute });

  /** Texto del botón (alternativa a ng-content). */
  readonly label = input<string>();

  /** Icono (clase CSS, ej: 'ri-home-line'). */
  readonly icon = input<string>();

  /** Posición del icono ('start' | 'end'). */
  readonly iconPosition = input<ButtonIconPosition>('start');

  /** Estado de carga. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** Posición del spinner de carga. */
  readonly loadingPosition = input<ButtonLoadingPosition>('start');

  /** Estado deshabilitado. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Ancho del botón ('auto' | 'full' | 'fit'). */
  readonly width = input<ButtonWidth>('auto');

  /** Tipo de botón HTML nativo. */
  readonly type = input<ButtonType>('button');

  /** Título y Aria Label (Accessibility). */
  readonly title = input<string>('');
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });

  // ========================================================================
  // OUTPUTS (Modern API)
  // ========================================================================

  /** Evento click. No se emite si está disabled o loading. */
  readonly onClick = output<Event>();

  // ========================================================================
  // COMPUTED PROPERTIES
  // ========================================================================

  /**
   * Resolución reactiva del color final.
   * Prioridad: Input > Global Config > Default Constant
   */
  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig?.color ?? DEFAULT_COLOR
  );

  readonly effectiveSize = computed(() => this.size() ?? this.globalConfig?.size ?? DEFAULT_SIZE);

  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig?.variant ?? DEFAULT_VARIANT
  );

  readonly effectiveShape = computed(
    () => this.shape() ?? this.globalConfig?.shape ?? DEFAULT_SHAPE
  );

  readonly effectiveIconPosition = computed(
    () => this.iconPosition() ?? this.globalConfig?.iconPosition ?? ButtonIconPositionEnum.START
  );

  readonly effectiveLoadingPosition = computed(
    () =>
      this.loadingPosition() ??
      this.globalConfig?.loadingPosition ??
      ButtonLoadingPositionEnum.START
  );

  readonly effectiveType = computed(
    () => this.type() ?? this.globalConfig?.type ?? ButtonTypeEnum.BUTTON
  );

  readonly effectiveWidth = computed(
    () => this.width() ?? this.globalConfig?.width ?? ButtonWidthEnum.AUTO
  );

  readonly effectiveRaised = computed(
    () => this.raised() ?? this.globalConfig?.raised ?? false
  );

  // ========================================================================
  // INTERNAL STATE & LOGIC
  // ========================================================================

  /** Signal interna para saber si el ng-content tiene nodos reales */
  private readonly _hasProjectedContent = signal(true);

  /** Determina si mostramos contenido (Label Input O Proyección HTML) */
  readonly hasVisibleContent = computed(() => this._hasProjectedContent() || !!this.label());

  /** Determina si es un botón cuadrado (solo icono, sin texto) */
  readonly isIconOnly = computed(() => !!this.icon() && !this.hasVisibleContent());

  /** Cálculo inteligente del aria-label para asegurar a11y */
  readonly computedAriaLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();
    // Si es icon-only, necesitamos un label textual obligatoriamente (usamos title)
    if (this.isIconOnly() && this.title()) return this.title();
    return null;
  });

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  ngAfterContentInit(): void {
    // Mantenemos la lógica de inspección del DOM porque detectar text-nodes
    // en ng-content sigue requiriendo acceso al elemento nativo.
    this.checkProjectedContent();
  }

  /**
   * Manejador del click.
   * Intercepta para prevenir acción si está disabled/loading.
   */
  handleClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick.emit(event);
  }

  /**
   * Inspecciona el DOM para ver si hay contenido real proyectado.
   * Esto evita botones con padding extraño cuando están "vacíos".
   */
  private checkProjectedContent(): void {
    // Usamos setTimeout(0) para asegurar que el DOM se ha renderizado inicialmente
    const element = this.elementRef.nativeElement as HTMLElement;
    const contentSpan = element.querySelector('.nui-btn__content');

    if (!contentSpan) {
      this._hasProjectedContent.set(false);
      return;
    }

    // Verificamos si hay nodos de texto con longitud > 0 o elementos HTML
    const hasContent = Array.from(contentSpan.childNodes).some(node => {
      // Si es nodo de texto, verificamos longitud
      if (node.nodeType === Node.TEXT_NODE) return (node.textContent?.trim().length ?? 0) > 0;
      // Si hay etiquetas, hay contenido
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      return false;
    });

    this._hasProjectedContent.set(hasContent);
  }
}
