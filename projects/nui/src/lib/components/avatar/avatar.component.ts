import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  signal,
  computed,
  effect,
  untracked,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarVariant } from './models/avatar.model';
import { NUIColor, NUISize } from '../../configs';

@Component({
  selector: 'nui-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Variante de forma: circular | rounded | square */
  readonly variant = input<AvatarVariant>('circular');

  /** Tamaño predefinido: xs | sm | md | lg | xl */
  readonly size = input<NUISize>('md');

  /** Color del fondo (opcional, usa default del CSS si no se pasa) */
  readonly color = input<NUIColor>();

  /** URL de la imagen */
  readonly src = input<string>();

  /** Texto alternativo (usado para fallback de letra) */
  readonly alt = input<string>();

  /** Iniciales explícitas (ej: "JD") */
  readonly initials = input<string>();

  /** Icono explícito (clase CSS) */
  readonly icon = input<string>();

  /** Tamaño personalizado en PX (sobrescribe 'size') */
  readonly customSize = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  // ========================================================================
  // INTERNAL STATE
  // ========================================================================

  /** Signal mutable para trackear si la imagen falló al cargar */
  protected readonly imageError = signal(false);

  constructor() {
    // EFECTO: Resetear el error si cambia la URL (src)
    effect(
      () => {
        // Leemos src() para registrar la dependencia
        const source = this.src();

        // Usamos untracked para escribir en la signal sin crear bucles
        // (aunque aquí no habría bucle, es buena práctica)
        untracked(() => {
          if (source) {
            this.imageError.set(false);
          }
        });
      },
      { allowSignalWrites: true }
    );
  }

  // ========================================================================
  // COMPUTED PROPERTIES
  // ========================================================================

  /**
   * Genera las clases CSS de modificadores (size y color)
   */
  protected readonly mainClasses = computed(() => {
    const classes: string[] = [];

    // Solo añadimos clase de tamaño si NO hay tamaño custom
    if (!this.customSize()) {
      classes.push(`nui-avatar--${this.size()}`);
    }

    if (this.color()) {
      classes.push(`nui-avatar--${this.color()}`);
    }

    return classes.join(' ');
  });

  /**
   * Calcula un tamaño de fuente proporcional si se usa customSize.
   * Asumimos aprox el 40% del tamaño del contenedor.
   */
  protected readonly customFontSize = computed(() => {
    const size = this.customSize();
    return size ? Math.round(size * 0.4) : null;
  });

  /**
   * Lógica central de qué mostrar.
   * Orden de prioridad: Imagen > Iniciales > Icono > Alt (Letra) > Default Icon
   */
  protected readonly contentType = computed<'image' | 'initials' | 'icon' | 'fallback'>(() => {
    // 1. Imagen (si existe URL y no ha dado error)
    if (this.src() && !this.imageError()) {
      return 'image';
    }

    // 2. Iniciales explícitas
    if (this.initials()) {
      return 'initials';
    }

    // 3. Icono explícito
    if (this.icon()) {
      return 'icon';
    }

    // 4. Fallback: Primera letra del Alt
    if (this.alt()) {
      return 'fallback';
    }

    // 5. Nada disponible: Icono por defecto
    return 'icon';
  });

  /** Primera letra del ALT para el fallback */
  protected readonly firstLetter = computed(() => {
    return this.alt()?.charAt(0).toUpperCase() ?? '';
  });

  /** Icono a mostrar (el pasado por input o el default) */
  protected readonly displayIcon = computed(() => {
    return this.icon() || 'ri-user-line';
  });

  // ========================================================================
  // ACTIONS
  // ========================================================================

  protected onImageError(): void {
    this.imageError.set(true);
  }
}
