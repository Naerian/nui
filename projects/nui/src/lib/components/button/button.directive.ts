import {
  Directive,
  ElementRef,
  inject,
  input,
  computed,
  output,
  booleanAttribute,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  effect,
  signal,
} from '@angular/core';
import {
  ButtonType,
  ButtonWidth,
  ButtonLoadingPosition,
  ButtonTypeEnum,
  ButtonWidthEnum,
  ButtonLoadingPositionEnum,
} from './models/button.model';
import {
  NUIColor,
  NUISize,
  NUIVariant,
  NUIShape,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_SHAPE,
} from '../../configs';
import { injectButtonConfig } from '../../configs/button';

@Directive({
  selector: 'button[nuiButton], a[nuiButton]',
  standalone: true,
  host: {
    '[class]': 'hostClasses()',
    '[attr.type]': 'isButton ? effectiveType() : null',
    '[attr.disabled]': 'isButton && (disabled() || loading()) ? true : null',
    '[attr.aria-disabled]': 'disabled() || loading() ? "true" : null',
    '[attr.aria-label]': 'computedAriaLabel()',
    '(click)': 'handleClick($event)',
  },
})
export class ButtonDirective implements AfterViewInit, OnDestroy {
  private readonly globalConfig = injectButtonConfig();
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================
  readonly color = input<NUIColor>();
  readonly size = input<NUISize>();
  readonly variant = input<NUIVariant | 'link'>();
  readonly shape = input<NUIShape>();
  readonly width = input<ButtonWidth>();
  readonly type = input<ButtonType>();
  readonly raised = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingPosition = input<ButtonLoadingPosition>();

  // Inputs adicionales para contenido dinámico en directiva
  readonly label = input<string>();
  readonly prefixIcon = input<string>();
  readonly suffixIcon = input<string>();

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

  readonly effectiveRaised = computed(() => this.raised() ?? this.globalConfig?.raised ?? false);

  // ========================================================================
  // ESTADO INTERNO Y DOM
  // ========================================================================
  private mutationObserver?: MutationObserver;
  private prefixIconElement?: HTMLElement;
  private suffixIconElement?: HTMLElement;
  private spinnerElement?: HTMLElement;
  private labelTextNode?: Text;

  protected readonly isButton = this.el.nativeElement.tagName === 'BUTTON';
  private readonly _hasExternalContent = signal(false);

  /**
   * Clases calculadas reactivamente.
   * Utiliza las escalas de altura (xs-xl) definidas en _config.scss.
   */
  readonly hostClasses = computed(() => {
    return [
      'nui-btn',
      `nui-btn--${this.effectiveVariant()}`,
      `nui-btn--${this.effectiveColor()}`,
      `nui-btn--${this.effectiveSize()}`,
      `nui-btn--${this.effectiveShape()}`,
      `nui-btn--${this.effectiveWidth()}`,
      this.effectiveRaised() ? 'nui-btn--raised' : '',
      this.disabled() || this.loading() ? 'nui-btn--disabled' : '',
      this.loading() ? 'nui-btn--loading' : '',
      this.isIconOnly() ? 'nui-btn--icon' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly isIconOnly = computed(
    () =>
      (!!this.prefixIcon() || !!this.suffixIcon()) &&
      !this.label() &&
      !this._hasExternalContent()
  );

  readonly computedAriaLabel = computed(
    () => this.label() || this.prefixIcon() || this.suffixIcon() || 'button'
  );

  constructor() {
    /**
     * Sincronización automática del DOM cuando cambian los signals de contenido.
     * Reemplaza la lógica manual de ngOnChanges.
     */
    effect(
      () => {
        this.buildDOMStructure();
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    this.setupContentObserver();
    this.buildDOMStructure();
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
  }

  // ========================================================================
  // LÓGICA DE MANIPULACIÓN DEL DOM (Renderer2)
  // ========================================================================

  private buildDOMStructure(): void {
    const host = this.el.nativeElement;

    // 1. Manejo del Spinner (Loading)
    this.syncSpinner(host);

    // 2. Manejo de la Label (Input label)
    this.syncLabel(host);

    // 3. Manejo del Icono prefijo
    this.syncPrefixIcon(host);

    // 4. Manejo del Icono sufijo
    this.syncSuffixIcon(host);
  }

  private syncSpinner(host: HTMLElement): void {
    if (!this.loading()) {
      this.spinnerElement?.remove();
      this.spinnerElement = undefined;
      return;
    }

    if (!this.spinnerElement) {
      this.spinnerElement = this.renderer.createElement('span');
      this.renderer.setAttribute(this.spinnerElement, 'aria-hidden', 'true');
    }

    this.spinnerElement!.className = `nui-btn__spinner nui-btn__spinner--${this.effectiveLoadingPosition()}`;

    // Posicionamiento
    if (this.effectiveLoadingPosition() === ButtonLoadingPositionEnum.START) {
      this.renderer.insertBefore(host, this.spinnerElement, host.firstChild);
    } else {
      this.renderer.appendChild(host, this.spinnerElement);
    }
  }

  private syncLabel(host: HTMLElement): void {
    if (!this.label()) {
      this.labelTextNode?.remove();
      this.labelTextNode = undefined;
      return;
    }

    if (!this.labelTextNode) {
      this.labelTextNode = this.renderer.createText(this.label()!);
      this.renderer.appendChild(host, this.labelTextNode);
    } else {
      this.labelTextNode.textContent = this.label()!;
    }
  }

  private syncPrefixIcon(host: HTMLElement): void {
    if (!this.prefixIcon() || this.loading()) {
      this.prefixIconElement?.remove();
      this.prefixIconElement = undefined;
      return;
    }

    if (!this.prefixIconElement) {
      this.prefixIconElement = this.renderer.createElement('i');
      this.renderer.setAttribute(this.prefixIconElement, 'aria-hidden', 'true');
    }

    this.prefixIconElement!.className = `${this.prefixIcon()} nui-btn__icon nui-btn__icon--prefix`;
    // Siempre al inicio, antes del label/content
    this.renderer.insertBefore(host, this.prefixIconElement, host.firstChild);
  }

  private syncSuffixIcon(host: HTMLElement): void {
    if (!this.suffixIcon() || this.loading()) {
      this.suffixIconElement?.remove();
      this.suffixIconElement = undefined;
      return;
    }

    if (!this.suffixIconElement) {
      this.suffixIconElement = this.renderer.createElement('i');
      this.renderer.setAttribute(this.suffixIconElement, 'aria-hidden', 'true');
    }

    this.suffixIconElement!.className = `${this.suffixIcon()} nui-btn__icon nui-btn__icon--suffix`;
    // Siempre al final
    this.renderer.appendChild(host, this.suffixIconElement);
  }

  private setupContentObserver(): void {
    this.mutationObserver = new MutationObserver(() => {
      // Convertimos childNodes a un array de Node para que TS pueda inferir
      const nodes: Node[] = Array.from(this.el.nativeElement.childNodes);

      const hasExtra = nodes.some((node: Node) => {
        // 1. Ignorar nodos que son gestionados internamente por la directiva
        const isInternal =
          node === this.prefixIconElement ||
          node === this.suffixIconElement ||
          node === this.spinnerElement ||
          node === this.labelTextNode;

        if (isInternal) return false;

        // 2. Si es un elemento HTML (Ej: <span>, <strong>)
        if (node.nodeType === Node.ELEMENT_NODE) return true;

        // 3. Si es un nodo de texto, verificar que no sea solo espacio en blanco
        if (node.nodeType === Node.TEXT_NODE) {
          return !!node.textContent?.trim();
        }

        return false;
      });

      // Actualizamos la señal reactiva
      this._hasExternalContent.set(hasExtra);
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      characterData: true,
      subtree: false,
    });
  }

  handleClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick.emit(event);
  }
}
