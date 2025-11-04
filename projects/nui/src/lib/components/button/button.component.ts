import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  inject,
  signal,
  AfterContentInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { ButtonIconPosition, ButtonType, ButtonWidth, ButtonLoadingPosition } from './models/button.model';
import { NUI_CONFIG, NUIColor, NUISize, NUIVariant, DEFAULT_COLOR, DEFAULT_SIZE, DEFAULT_VARIANT } from '../../configs';

/**
 * @name
 * nui-button
 * @description
 * Componente para crear un botón personalizado con diferentes tamaños, colores y estilos.
 * Soporta accesibilidad completa y configuración global.
 * 
 * @example
 * // Botón básico
 * <nui-button (onClick)="handleClick()">Click me</nui-button>
 * 
 * @example
 * // Botón con configuración
 * <nui-button 
 *   [color]="'primary'" 
 *   [size]="'md'" 
 *   [type]="'submit'"
 *   (onClick)="handleSubmit($event)">
 *   Submit
 * </nui-button>
 * 
 * @example
 * // Botón solo con icono
 * <nui-button icon="ri-settings-line" aria-label="Settings"></nui-button>
 * 
 * @example
 * // Botón con icono y texto
 * <nui-button icon="ri-user-line" [color]="'primary'">
 *   Profile
 * </nui-button>
 * 
 * @example
 * // Botón con icono al final
 * <nui-button icon="ri-arrow-right-line" iconPosition="end">
 *   Next
 * </nui-button>
 * 
 * @example
 * // Botón ghost (sin fondo)
 * <nui-button variant="ghost" [color]="'danger'">
 *   Delete
 * </nui-button>
 * 
 * @example
 * // Botón outline (solo borde)
 * <nui-button variant="outline" [color]="'primary'">
 *   Outline Button
 * </nui-button>
 * 
 * @example
 * // Botón ancho completo
 * <nui-button width="full" [color]="'success'">
 *   Full Width Button
 * </nui-button>
 * 
 * @example
 * // Botón ajustado al contenido
 * <nui-button width="fit" [color]="'info'">
 *   Fit Content
 * </nui-button>
 */
@Component({
  selector: 'nui-button',
  host: {
    '[class.disabled]': 'disabled',
    '[class.full-width]': 'width === "full"',
    '[class.fit-width]': 'width === "fit"',
    '[class.outline]': 'effectiveVariant === "outline"',
    '[class.ghost]': 'effectiveVariant === "ghost"',
    '[class.icon-only]': 'isIconOnly',
  },
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ButtonComponent implements OnInit, AfterContentInit {
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private readonly globalConfig = inject(NUI_CONFIG);
  
  // Signal para controlar si hay contenido visible
  private _hasContent = signal(false);

  /**
   * Color del botón.
   * Valores posibles: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'accent'
   * @default 'primary' (o valor configurado globalmente)
   */
  @Input() color?: NUIColor;

  /**
   * Tamaño del botón.
   * Valores posibles: 'xs', 'sm', 'md', 'lg', 'xl'
   * @default 'md' (o valor configurado globalmente)
   */
  @Input() size?: NUISize;

  /**
   * Variante visual del botón.
   * - 'solid': Botón sólido con fondo de color completo (default)
   * - 'outline': Borde de color con fondo transparente
   * - 'ghost': Sin borde ni fondo, solo texto/icono
   * @default 'solid' (o valor configurado globalmente)
   */
  @Input() variant?: NUIVariant;

  /**
   * Obtiene el color con fallback: Personalizado > Global > Por defecto
   */
  protected get effectiveColor(): NUIColor {
    return this.color ?? this.globalConfig?.defaultColor ?? DEFAULT_COLOR;
  }

  /**
   * Obtiene el tamaño con fallback: Personalizado > Global > Por defecto
   */
  protected get effectiveSize(): NUISize {
    return this.size ?? this.globalConfig?.defaultSize ?? DEFAULT_SIZE;
  }

  /**
   * Obtiene la variante con fallback: Personalizada > Global > Por defecto
   */
  protected get effectiveVariant(): NUIVariant {
    return this.variant ?? this.globalConfig?.defaultVariant ?? DEFAULT_VARIANT;
  }

  /**
   * Indica si el botón está en estado de carga.
   * Muestra un spinner y deshabilita las interacciones.
   * @default false
   */
  @Input({ transform: booleanAttribute }) loading: boolean = false;

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
  }
  get title(): string {
    return this._title();
  }

  /**
   * Icono del botón (clase de RemixIcon o similar).
   * Si se proporciona, se muestra automáticamente.
   * Cuando solo hay icono sin contenido, el botón se renderiza como botón de icono circular.
   * @example
   * // Solo icono
   * <nui-button icon="ri-settings-line" aria-label="Settings"></nui-button>
   * // Icono + texto
   * <nui-button icon="ri-user-line">Profile</nui-button>
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
   * Indica si el botón está deshabilitado.
   * Cuando está deshabilitado, no responde a eventos de click.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /**
   * Ancho del botón.
   * - 'auto': Ancho automático basado en el contenido (default)
   * - 'full': Ocupa todo el ancho del contenedor (100%)
   * - 'fit': Se ajusta exactamente al contenido (fit-content)
   * @default 'auto'
   */
  @Input() width: ButtonWidth = 'auto';

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
   */
  @Input() type: ButtonType = 'button';

  /**
   * Evento que se emite al hacer click en el botón.
   * No se emite si el botón está deshabilitado.
   */
  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  ngOnInit(): void {
    // Ya no es necesario setProperties() porque usamos getters
  }

  ngAfterContentInit(): void {
    // Detectar si hay contenido proyectado después de que se inicialice
    this.checkContent();
  }

  /**
   * Verifica si hay contenido proyectado en el botón
   */
  private checkContent(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    // Usamos un pequeño timeout para asegurar que el contenido se haya proyectado
    setTimeout(() => {
      // Buscar el elemento button dentro del componente
      const buttonElement = hostElement.querySelector('button');
      if (!buttonElement) {
        this._hasContent.set(false);
        return;
      }

      // Buscar el span con clase nui-btn__content que contiene el ng-content
      const contentSpan = buttonElement.querySelector('.nui-btn__content');
      if (!contentSpan) {
        this._hasContent.set(false);
        return;
      }

      // Verificar si hay nodos de texto o elementos dentro del span
      let hasText = false;
      const nodes = Array.from(contentSpan.childNodes);
      
      for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim() || '';
          if (text.length > 0) {
            hasText = true;
            break;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Si hay elementos HTML (no solo texto), también cuenta como contenido
          hasText = true;
          break;
        }
      }
      
      this._hasContent.set(hasText);
      this.cdr.detectChanges();
    }, 0);
  }

  /**
   * Maneja el evento de click en el botón.
   * No emite el evento si el botón está deshabilitado o en estado de carga.
   * @param {Event} event - El evento de click
   */
  clickOnButton(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
  }

  /**
   * Método para verificar si el botón tiene contenido visible.
   * Esto es útil para determinar si el botón tiene texto o iconos visibles.
   */
  get hasVisibleContent(): boolean {
    return this._hasContent();
  }

  /**
   * Determina si el botón es de solo icono (sin texto).
   * Un botón se considera "solo icono" cuando tiene un icono pero no tiene contenido de texto.
   */
  get isIconOnly(): boolean {
    return !!this.icon && !this.hasVisibleContent;
  }

  /**
   * Método para obtener el aria-label del botón.
   * Si no se proporciona, se usa el título del botón como valor por defecto.
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    if (this.isIconOnly && this._title()) return this._title();
    if (!this.hasVisibleContent && this._title()) return this._title();
    return null;
  }

  /**
   * Método para obtener el elemento HTML del botón.
   */
  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
