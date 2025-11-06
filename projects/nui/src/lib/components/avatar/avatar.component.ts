import {
  Component,
  Input,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarVariant } from './models/avatar.model';
import { NUIColor, NUISize } from '../../configs';

/**
 * Componente Avatar para representar usuarios o entidades
 * 
 * Características:
 * - Muestra imágenes, iniciales o iconos
 * - 3 variantes de forma: circular, rounded, square
 * - 5 tamaños predefinidos: xs, sm, md, lg, xl
 * - Fallback automático si la imagen falla
 * - Colores personalizables del sistema de diseño
 * 
 * @example
 * // Avatar con imagen
 * <nui-avatar src="user.jpg" alt="John Doe" />
 * 
 * @example
 * // Avatar con iniciales
 * <nui-avatar initials="JD" color="primary" />
 * 
 * @example
 * // Avatar con icono
 * <nui-avatar icon="ri-user-line" color="success" />
 */
@Component({
  selector: 'nui-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.nui-avatar]': 'true',
    '[class.nui-avatar--circular]': 'variantValue() === "circular"',
    '[class.nui-avatar--rounded]': 'variantValue() === "rounded"',
    '[class.nui-avatar--square]': 'variantValue() === "square"',
    '[class]': 'hostClasses()',
    '[style.width.px]': 'customSizeValue()',
    '[style.height.px]': 'customSizeValue()',
  },
})
export class AvatarComponent {

  // ===== INPUTS =====
  /**
   * Variante de forma del avatar
   */
  @Input() variant: AvatarVariant = 'circular';

  /**
   * Tamaño predefinido
   */
  @Input() size: NUISize = 'md';

  /**
   * Color de fondo
   */
  @Input() color?: NUIColor;

  /**
   * URL de la imagen
   */
  @Input() set src(value: string | undefined) {
    this._src.set(value);
    if (value) {
      this.imageError.set(false); // Resetear error al cambiar src
    }
  }

  /**
   * Texto alternativo (fallback)
   */
  @Input() alt?: string;

  /**
   * Iniciales a mostrar
   */
  @Input() initials?: string;

  /**
   * Icono a mostrar (clase RemixIcon)
   */
  @Input() icon?: string;

  /**
   * Tamaño personalizado (en píxeles)
   */
  @Input() customSize?: number;

  // ===== PRIVATE SIGNALS =====

  private readonly _src = signal<string | undefined>(undefined);

  // ===== STATE =====

  /**
   * Indica si hubo error al cargar la imagen
   */
  protected readonly imageError = signal(false);

  // ===== COMPUTED =====

  /**
   * Valor reactivo de variant
   */
  protected readonly variantValue = computed(() => this.variant);

  /**
   * Valor reactivo de customSize
   */
  protected readonly customSizeValue = computed(() => this.customSize);

  /**
   * Clases del host
   */
  protected readonly hostClasses = computed(() => {
    const classes: string[] = [`nui-avatar--${this.size}`];
    
    if (this.color) {
      classes.push(`nui-avatar--${this.color}`);
    }
    
    return classes.join(' ');
  });

  /**
   * Determina qué contenido mostrar (prioridad)
   */
  protected readonly contentType = computed<'image' | 'initials' | 'icon' | 'fallback'>(() => {
    // 1. Imagen (si no hubo error)
    if (this._src() && !this.imageError()) {
      return 'image';
    }

    // 2. Iniciales
    if (this.initials) {
      return 'initials';
    }

    // 3. Icono
    if (this.icon) {
      return 'icon';
    }

    // 4. Fallback: Primera letra del alt
    if (this.alt) {
      return 'fallback';
    }

    // 5. Icono genérico por defecto
    return 'icon';
  });

  /**
   * Primera letra del alt (para fallback)
   */
  protected readonly firstLetter = computed(() => {
    return this.alt ? this.alt.charAt(0).toUpperCase() : '';
  });

  /**
   * Icono a usar (personalizado o por defecto)
   */
  protected readonly displayIcon = computed(() => {
    return this.icon || 'ri-user-line';
  });

  /**
   * Src de la imagen
   */
  protected readonly srcValue = computed(() => this._src());

  /**
   * Maneja el error de carga de imagen
   */
  protected onImageError(): void {
    this.imageError.set(true);
  }
}
