import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  Renderer2,
  inject,
  signal,
  WritableSignal,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ButtonWidth,
  ButtonIconPosition,
  ButtonType,
  ButtonLoadingPosition,
} from './models/button.model';
import {
  NUI_CONFIG,
  NUIColor,
  DEFAULT_COLOR,
  NUISize,
  DEFAULT_SIZE,
  NUIVariant,
} from '../../configs';

@Directive({
  selector: 'button[nuiButton], a[nuiButton]',
  standalone: true,
  host: {
    '[class.nui-btn]': 'true',
    '[attr.disabled]': 'isButton && disabled ? true : null',
    '[attr.aria-disabled]': 'disabled ? "true" : null',
  },
})
export class ButtonDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private readonly globalConfig = inject(NUI_CONFIG);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  _color = signal<NUIColor>(DEFAULT_COLOR);
  @Input() set color(value: NUIColor) {
    this._color.set(value || this.globalConfig.defaultColor || DEFAULT_COLOR);
  }

  _size = signal<NUISize>(DEFAULT_SIZE);
  @Input() set size(value: NUISize) {
    this._size.set(value || this.globalConfig.defaultSize || DEFAULT_SIZE);
  }

  _width: WritableSignal<ButtonWidth> = signal('auto');
  @Input() set width(value: ButtonWidth) {
    this._width.set(value || 'auto');
  }

  @Input() variant: NUIVariant = 'solid';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconPosition: ButtonIconPosition = 'start';
  @Input() type: ButtonType = 'button';
  @Output() onClick = new EventEmitter<Event>();

  private mutationObserver?: MutationObserver;
  private iconElement?: HTMLElement;
  private labelTextNode?: Text;
  private isInitialRender = true; // Control de renderizado inicial

  get isButton(): boolean {
    return this.el.nativeElement.tagName === 'BUTTON';
  }
  get isLink(): boolean {
    return this.el.nativeElement.tagName === 'A';
  }

  ngOnInit(): void {
    this.updateClasses();
    this.updateAttributes();
  }

  ngAfterViewInit(): void {
    // Ejecutamos la lógica de construcción de una vez
    this.buildButtonContent();
    this.setupContentObserver();

    // Una vez construido, marcamos como inicializado
    setTimeout(() => (this.isInitialRender = false));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialRender) return; // Evitamos ejecuciones redundantes antes de AfterViewInit

    if (
      changes['color'] ||
      changes['size'] ||
      changes['variant'] ||
      changes['disabled'] ||
      changes['loading']
    ) {
      this.updateClasses();
    }

    if (changes['icon'] || changes['label'] || changes['iconPosition']) {
      this.buildButtonContent();
    }
  }

  /**
   * Orquestador de contenido: Maneja Icono y Label de forma atómica
   */
  private buildButtonContent(): void {
    // 1. Renderizar Label (si aplica)
    this.renderLabelIfNeeded();
    // 2. Renderizar Icono y aplicar clase nui-btn--icon si es necesario
    this.handleIconAndLayout();
  }

  private setupContentObserver(): void {
    this.mutationObserver = new MutationObserver(mutations => {
      // Optimizamos: solo reaccionar si el cambio no fue provocado por nosotros
      const isExternalChange = mutations.some(
        mutation =>
          Array.from(mutation.addedNodes).some(
            node => node !== this.iconElement && node !== this.labelTextNode
          ) ||
          Array.from(mutation.removedNodes).some(
            node => node !== this.iconElement && node !== this.labelTextNode
          )
      );

      if (isExternalChange) {
        this.buildButtonContent();
      }
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      characterData: true,
      subtree: false, // Bajamos a false para evitar bucles profundos
    });
  }

  private handleIconAndLayout(): void {
    this.renderIconElement();
    const hasText = this.hasActualText();

    // Gestión de clases de layout
    if (this.icon && !hasText) {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--icon');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--icon');
    }

    if (this.icon && this.iconPosition === 'end') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--icon-end');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--icon-end');
    }
  }

  private renderIconElement(): void {
    const element = this.el.nativeElement;

    if (!this.icon) {
      this.iconElement?.remove();
      this.iconElement = undefined;
      return;
    }

    if (!this.iconElement) {
      this.iconElement = this.renderer.createElement('i');
      this.renderer.setAttribute(this.iconElement, 'aria-hidden', 'true');
    }

    // Actualización de clases del icono
    if (this.iconElement) {
      this.iconElement.className = `${this.icon} nui-btn__icon nui-btn__icon--${this.iconPosition}`;
    }

    // Posicionamiento inteligente
    if (this.iconPosition === 'start') {
      if (element.firstChild !== this.iconElement) {
        this.renderer.insertBefore(element, this.iconElement, element.firstChild);
      }
    } else {
      if (element.lastChild !== this.iconElement) {
        this.renderer.appendChild(element, this.iconElement);
      }
    }
  }

  private renderLabelIfNeeded(): void {
    if (!this.label) {
      this.labelTextNode?.remove();
      this.labelTextNode = undefined;
      return;
    }

    const element = this.el.nativeElement;
    if (!this.labelTextNode) {
      this.labelTextNode = this.renderer.createText(this.label);
    } else {
      this.labelTextNode.textContent = this.label;
    }

    // Evitamos re-insertar si ya está en el DOM
    if (this.labelTextNode?.parentElement !== element) {
      if (this.iconElement && this.iconPosition === 'end') {
        this.renderer.insertBefore(element, this.labelTextNode, this.iconElement);
      } else {
        this.renderer.appendChild(element, this.labelTextNode);
      }
    }
  }

  private hasActualText(): boolean {
    const element = this.el.nativeElement;
    if (!element) return !!this.label;

    const nodes = Array.from(element.childNodes);

    const hasVisibleContent = nodes.some((node: any) => {
      // 1. Ignorar el icono que la propia directiva ha insertado
      if (this.iconElement && node === this.iconElement) {
        return false;
      }

      // 2. Si es un nodo de texto, verificar que no esté vacío
      if (node.nodeType === 3) {
        // 3 es Node.TEXT_NODE
        return !!node.textContent?.trim();
      }

      // 3. Si es un elemento HTML
      if (node.nodeType === 1) {
        // 1 es Node.ELEMENT_NODE
        // Ignorar si es un icono <i> (asumimos que los <i> son decorativos)
        // Pero si es cualquier otra etiqueta (span, strong, etc), cuenta como texto/contenido
        return (node as HTMLElement).tagName !== 'I';
      }

      return false;
    });

    return hasVisibleContent || !!this.label;
  }

  private updateClasses(): void {
    const el = this.el.nativeElement;

    // Limpiamos clases dinámicas previas para evitar acumulación
    // (Ojo: mantenemos 'nui-btn' que viene por el host binding)
    const colorClass = `nui-btn--${this._color()}`;
    const sizeClass = `nui-btn--${this._size()}`;

    // Aplicamos color y tamaño
    this.renderer.addClass(el, colorClass);
    this.renderer.addClass(el, sizeClass);

    // --- Lógica de Width ---
    if (this._width() === 'full') {
      this.renderer.addClass(el, 'nui-btn--full');
      this.renderer.removeClass(el, 'nui-btn--fit');
    } else if (this._width() === 'fit') {
      this.renderer.addClass(el, 'nui-btn--fit');
      this.renderer.removeClass(el, 'nui-btn--full');
    } else {
      // Si es 'auto', quitamos ambas
      this.renderer.removeClass(el, 'nui-btn--full');
      this.renderer.removeClass(el, 'nui-btn--fit');
    }

    // Variantes
    if (this.variant !== 'solid') {
      this.renderer.addClass(el, `nui-btn--${this.variant}`);
    }

    // Estados
    if (this.disabled || this.loading) {
      this.renderer.addClass(el, 'nui-btn--disabled');
    } else {
      this.renderer.removeClass(el, 'nui-btn--disabled');
    }

    if (this.loading) {
      this.renderer.addClass(el, 'nui-btn--loading');
    } else {
      this.renderer.removeClass(el, 'nui-btn--loading');
    }
  }

  private updateAttributes(): void {
    const el = this.el.nativeElement;
    if (this.isButton) this.renderer.setAttribute(el, 'type', this.type);
    const aria = this.label || this.icon || 'button';
    this.renderer.setAttribute(el, 'aria-label', aria);
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick.emit(event);
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
  }
}
