import {
  Directive,
  ElementRef,
  HostBinding,
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
import { NUI_CONFIG, NUIColor, DEFAULT_COLOR, NUISize, DEFAULT_SIZE, NUIVariant } from '../../configs';

/**
 * @name nuiButton
 * @description
 * Directiva para aplicar estilos de botón a elementos HTML nativos.
 * Úsala en elementos `<button>` o `<a>` para obtener los estilos del sistema de diseño.
 *
 * Para casos más complejos (botones de solo icono, contenido personalizado),
 * considera usar el componente `<nui-button>` en su lugar.
 *
 * @example
 * // Botón simple
 * <button nuiButton color="primary">Click me</button>
 *
 * @example
 * // Botón de formulario
 * <button nuiButton color="success" type="submit" [disabled]="!form.valid">
 *   Guardar
 * </button>
 *
 * @example
 * // Link con estilo de botón
 * <a nuiButton color="secondary" routerLink="/home">Home</a>
 *
 * @example
 * // Botón con ancho completo
 * <button nuiButton width="full" color="primary">
 *   Full Width Button
 * </button>
 *
 * @example
 * // Botón ghost (sin fondo)
 * <button nuiButton variant="ghost" color="danger">
 *   Delete
 * </button>
 *
 * @example
 * // Botón outline (solo borde)
 * <button nuiButton variant="outline" color="primary">
 *   Outline
 * </button>
 */
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

  /**
   * Color del botón.
   * Valores posibles: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'accent'
   * @default 'primary' (o valor configurado globalmente)
   */
  _color: WritableSignal<NUIColor> = signal(DEFAULT_COLOR);
  @Input()
  set color(value: NUIColor) {
    this._color.set(value || this.globalConfig.defaultColor || DEFAULT_COLOR);
  }
  get color(): NUIColor {
    return this._color();
  }

  /**
   * Tamaño del botón.
   * Valores posibles: 'xs', 'sm', 'md', 'lg', 'xl'
   * @default 'md' (o valor configurado globalmente)
   */
  _size: WritableSignal<NUISize> = signal(DEFAULT_SIZE);
  @Input()
  set size(value: NUISize) {
    this._size.set(value || this.globalConfig.defaultSize || DEFAULT_SIZE);
  }
  get size(): NUISize {
    return this._size();
  }

  /**
   * Ancho del botón.
   * - 'auto': Ancho automático basado en el contenido (default)
   * - 'full': Ocupa todo el ancho del contenedor (100%)
   * - 'fit': Se ajusta exactamente al contenido (fit-content)
   * @default 'auto'
   */
  _width: WritableSignal<ButtonWidth> = signal('auto');
  @Input()
  set width(value: ButtonWidth) {
    this._width.set(value || 'auto');
  }
  get width(): ButtonWidth {
    return this._width();
  }

  /**
   * Variante visual del botón.
   * - 'solid': Botón sólido con fondo de color completo (default)
   * - 'outline': Borde de color con fondo transparente
   * - 'ghost': Sin borde ni fondo, solo texto/icono
   * @default 'solid'
   */
  @Input() variant: NUIVariant = 'solid';

  /**
   * Indica si el botón está deshabilitado.
   * Cuando está deshabilitado, no responde a eventos de click.
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Indica si el botón está en estado de carga.
   * Muestra un spinner y deshabilita las interacciones.
   * @default false
   */
  @Input() loading: boolean = false;

  /**
   * Posición del spinner de carga en el botón.
   * - 'start': Spinner a la izquierda del texto
   * - 'end': Spinner a la derecha del texto
   * - 'center': Spinner centrado, reemplaza el contenido
   * @default 'start'
   */
  @Input() loadingPosition: ButtonLoadingPosition = 'start';

  /**
   * Título del botón que se muestra como tooltip al pasar el mouse.
   * También se usa como aria-label si el botón no tiene contenido visible.
   */
  _title: WritableSignal<string> = signal('');
  @Input()
  set title(value: string) {
    this._title.set(value);
    if (value) {
      this.renderer.setAttribute(this.el.nativeElement, 'title', value);
    }
  }
  get title(): string {
    return this._title();
  }

  /**
   * Icono del botón (clase de RemixIcon o similar).
   * Si se proporciona, se muestra automáticamente como contenido del botón.
   * Nota: Para la directiva, el icono debe agregarse manualmente al contenido del elemento.
   * @example
   * <button nuiButton icon="ri-settings-line">Settings</button>
   */
  @Input() icon?: string;

  /**
   * Posición del icono respecto al texto.
   * - 'start': Icono a la izquierda del texto (por defecto)
   * - 'end': Icono a la derecha del texto
   * Solo aplica cuando hay tanto icono como contenido de texto.
   * @default 'start'
   */
  @Input() iconPosition: ButtonIconPosition = 'start';

  /**
   * Atributo aria-label para accesibilidad.
   * Si no se proporciona, se usa el título del botón como valor por defecto.
   * Importante para botones de solo icono.
   */
  @Input('aria-label') ariaLabel!: string;

  /**
   * Tipo del botón HTML.
   * - 'button': Botón estándar (comportamiento por defecto)
   * - 'submit': Envía el formulario
   * - 'reset': Resetea el formulario
   * @default 'button'
   * Nota: Solo aplica para elementos <button>, no para <a>
   */
  @Input() type: ButtonType = 'button';

  /**
   * Evento que se emite al hacer click en el botón.
   * No se emite si el botón está deshabilitado o en estado de carga.
   */
  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  /**
   * Verifica si el elemento es un <button> nativo
   */
  get isButton(): boolean {
    return this.el.nativeElement.tagName === 'BUTTON';
  }

  /**
   * Verifica si el elemento es un <a> nativo
   */
  get isLink(): boolean {
    return this.el.nativeElement.tagName === 'A';
  }

  constructor() {
    // Inicializamos los atributos con los valores de configuración global o por defecto
    this._size.set(this.globalConfig.defaultSize || DEFAULT_SIZE);
    this._color.set(this.globalConfig.defaultColor || DEFAULT_COLOR);
  }

  private mutationObserver?: MutationObserver;
  private iconElement?: HTMLElement;

  ngOnInit(): void {
    this.updateClasses();
    this.updateAttributes();
  }

  ngAfterViewInit(): void {
    // Después de que la vista esté lista, evaluar el contenido y configurar observer
    // Usamos setTimeout para asegurar que el contenido esté completamente renderizado
    setTimeout(() => {
      this.handleIconInput();
      this.setupContentObserver();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Actualizar clases cuando cambian los inputs
    if (
      changes['color'] ||
      changes['size'] ||
      changes['width'] ||
      changes['variant'] ||
      changes['disabled'] ||
      changes['loading']
    ) {
      this.updateClasses();
    }

    // Actualizar atributos cuando cambian
    if (changes['type'] || changes['ariaLabel'] || changes['title']) {
      this.updateAttributes();
    }

    // Manejar icono - solo si ya se ha inicializado la vista
    if (changes['icon'] || changes['iconPosition']) {
      // Usar setTimeout para asegurar que el cambio se procese después del render
      setTimeout(() => {
        this.handleIconInput();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    // Limpiar el observer cuando se destruye el componente
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    // Limpiar el elemento del icono si existe
    if (this.iconElement) {
      this.iconElement.remove();
      this.iconElement = undefined;
    }
  }

  /**
   * Configura un MutationObserver para detectar cambios en el contenido del botón
   * Esto permite actualizar la clase nui-btn--icon cuando el contenido cambia dinámicamente
   */
  private setupContentObserver(): void {
    // Crear el observer
    this.mutationObserver = new MutationObserver(() => {
      // Cuando cambia el contenido, re-evaluar si es solo icono
      this.handleIconInput();
    });

    // Observar cambios en el contenido (childList) y en el texto (characterData)
    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  /**
   * Función para controlar cuándo se pasa un icono mediante input
   * y agregar la clase correspondiente al elemento.
   * 
   * IMPORTANTE: La clase 'nui-btn--icon' solo debe añadirse cuando el botón
   * es de SOLO ICONO (sin contenido de texto). Si hay texto + icono, NO se añade.
   */
  private handleIconInput(): void {
    // Primero, manejar el elemento del icono
    this.renderIconElement();
    
    // Verificar si el botón tiene contenido de texto
    const hasTextContent = this.hasTextContent();

    // La clase nui-btn--icon SOLO se añade si hay icono PERO NO hay texto
    // Esto hace que el botón sea cuadrado (width = height) y sin padding
    if (this.icon && !hasTextContent) {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--icon');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--icon');
    }

    // Si el botón tiene un icono Y texto, manejamos la posición del icono
    if (this.icon && this.iconPosition === 'end') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--icon-end');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--icon-end');
    }
  }

  /**
   * Renderiza o actualiza el elemento del icono dentro del botón
   * Similar a cómo lo hace ButtonComponent en su template
   */
  private renderIconElement(): void {
    const element = this.el.nativeElement;
    
    // Si no hay icono, eliminar el elemento si existe
    if (!this.icon) {
      if (this.iconElement) {
        this.iconElement.remove();
        this.iconElement = undefined;
      }
      return;
    }

    // Si ya existe el elemento del icono, solo actualizar las clases
    if (this.iconElement) {
      // Limpiar clases anteriores del icono (por si cambió el icon input)
      this.iconElement.className = '';
      // Añadir las nuevas clases
      this.renderer.addClass(this.iconElement, this.icon);
      this.renderer.addClass(this.iconElement, 'nui-btn__icon');
      
      // Añadir clase de posición
      if (this.iconPosition === 'start') {
        this.renderer.addClass(this.iconElement, 'nui-btn__icon--start');
        this.renderer.removeClass(this.iconElement, 'nui-btn__icon--end');
      } else {
        this.renderer.addClass(this.iconElement, 'nui-btn__icon--end');
        this.renderer.removeClass(this.iconElement, 'nui-btn__icon--start');
      }
      
      // Mover el icono a la posición correcta
      if (this.iconPosition === 'start') {
        element.insertBefore(this.iconElement, element.firstChild);
      } else {
        element.appendChild(this.iconElement);
      }
      
      return;
    }

    // Crear el elemento <i> para el icono
    this.iconElement = this.renderer.createElement('i');
    
    // Añadir las clases necesarias
    this.renderer.addClass(this.iconElement, this.icon);
    this.renderer.addClass(this.iconElement, 'nui-btn__icon');
    
    // Añadir clase de posición
    if (this.iconPosition === 'start') {
      this.renderer.addClass(this.iconElement, 'nui-btn__icon--start');
    } else {
      this.renderer.addClass(this.iconElement, 'nui-btn__icon--end');
    }
    
    // Atributo aria-hidden para accesibilidad
    this.renderer.setAttribute(this.iconElement, 'aria-hidden', 'true');
    
    // Insertar el icono en la posición correcta
    if (this.iconPosition === 'start') {
      // Insertar al inicio (antes del primer hijo)
      element.insertBefore(this.iconElement, element.firstChild);
    } else {
      // Insertar al final
      element.appendChild(this.iconElement);
    }
  }

  /**
   * Verifica si el botón tiene contenido de texto visible o elementos HTML
   * Usa la misma lógica que ButtonComponent.checkContent() para consistencia
   * @returns true si hay contenido visible, false si está vacío o solo tiene iconos
   */
  private hasTextContent(): boolean {
    const element = this.el.nativeElement;
    const nodes = Array.from(element.childNodes) as Node[];
    
    for (const node of nodes) {
      // Verificar nodos de texto
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || '';
        if (text.length > 0) {
          return true;
        }
      } 
      // Verificar elementos HTML (excepto iconos <i>)
      else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;
        // Ignorar elementos <i> que son iconos (tanto el que creamos nosotros como otros)
        // También ignorar si es el iconElement que creamos
        if (elementNode.tagName !== 'I' && elementNode !== this.iconElement) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Actualiza las clases CSS del elemento
   */
  private updateClasses(): void {
    this.applyHostClasses();
  }

  /**
   * Actualiza los atributos HTML del elemento
   */
  private updateAttributes(): void {
    // Configurar type solo para botones
    if (this.isButton && this.type) {
      this.renderer.setAttribute(this.el.nativeElement, 'type', this.type);
    }

    // Configurar aria-label
    if (this.ariaLabel) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'aria-label',
        this.ariaLabel,
      );
    } else if (this.title) {
      // Si no hay aria-label pero hay title, usar title como aria-label
      this.renderer.setAttribute(
        this.el.nativeElement,
        'aria-label',
        this.title,
      );
    }
  }

  /**
   * Aplica las clases CSS dinámicamente al elemento host
   */
  private applyHostClasses(): void {
    // Clase de color
    this.renderer.addClass(this.el.nativeElement, `nui-btn--${this._color()}`);

    // Clase de tamaño
    this.renderer.addClass(this.el.nativeElement, `nui-btn--${this._size()}`);

    // Clase de ancho
    if (this._width() === 'full') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--full');
    } else if (this._width() === 'fit') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--fit');
    }

    // Clases de variante
    if (this.variant === 'outline') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--outline');
    } else if (this.variant === 'ghost') {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--ghost');
    }

    // Clase de deshabilitado (para ambos button y link)
    if (this.disabled || this.loading) {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--disabled');

      // Para links, prevenir navegación
      if (this.isLink) {
        this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      }
    } else {
      // Remover clase si ya no está deshabilitado
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--disabled');

      if (this.isLink) {
        this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
      }
    }

    // Clase de loading
    if (this.loading) {
      this.renderer.addClass(this.el.nativeElement, 'nui-btn--loading');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nui-btn--loading');
    }
  }

  /**
   * Maneja el evento de click del botón.
   * Previene el click si el botón está deshabilitado o cargando.
   * Emite el evento onClick si está habilitado.
   */
  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Emitir el evento onClick
    this.onClick.emit(event);
  }
}
