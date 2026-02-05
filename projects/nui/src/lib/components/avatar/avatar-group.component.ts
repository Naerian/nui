import {
  Component,
  ChangeDetectionStrategy,
  computed,
  ViewEncapsulation,
  inject,
  input,
  numberAttribute, // Importamos la función input de signals
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AvatarConfig, AvatarVariant } from './models/avatar.model';
import {
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  NUI_CONFIG,
  NUIColor,
  NUISize,
} from '../../configs';
import { NUI_TRANSLATIONS } from '../../translations';

/**
 * Componente para agrupar múltiples avatares con superposición
 */
@Component({
  selector: 'nui-avatar-group',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupComponent {
  // ===== DEPENDENCIES =====
  protected readonly translation = inject(NUI_TRANSLATIONS);
  private readonly globalConfig = inject(NUI_CONFIG, { optional: true });

  // ===== SIGNAL INPUTS =====

  /** Lista de avatares a mostrar */
  readonly avatars = input<AvatarConfig[]>([]);

  /** Número máximo de avatares visibles */
  readonly max = input<number | undefined, unknown>(undefined, {
    transform: value => {
      const num = Number(value);
      return num && num > 0 ? num : undefined;
    },
  });

  /** Espaciado entre avatares (píxeles negativos) */
  readonly spacing = input<number>(-8);

  /** Layout del grupo de avatares */
  readonly layout = input<'stacked' | 'inline'>('inline');

  /** Tamaño de todos los avatares */
  readonly size = input<NUISize>();

  /** Variante de forma */
  readonly variant = input<AvatarVariant>('circular');

  /** Color del fondo */
  readonly color = input<NUIColor>();

  /** Mostrar borde alrededor de cada avatar */
  readonly bordered = input<boolean>(true);

  /** Tamaño personalizado en PX (sobrescribe 'size') */
  readonly customSize = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  // ===== COMPUTED =====

  /**
   * Resolución reactiva del color final.
   * Prioridad: Input > Global Config > Default Constant
   */
  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig?.defaultColor ?? DEFAULT_COLOR
  );

  readonly effectiveSize = computed(
    () => this.size() ?? this.globalConfig?.defaultSize ?? DEFAULT_SIZE
  );

  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig?.defaultVariant ?? DEFAULT_VARIANT
  );

  /**
   * Genera las clases CSS de modificadores (size y color)
   */
  protected readonly listClasses = computed(() => {
    const classes: string[] = [];

    if (this.layout()) {
      classes.push(`nui-avatar-group__list--${this.layout()}`);
    }
    return classes.join(' ');
  });

  /**
   * Genera las clases CSS de modificadores (size y color)
   */
  protected readonly excessClasses = computed(() => {
    const classes: string[] = [];

    // Solo añadimos clase de tamaño si NO hay tamaño custom
    if (this.effectiveSize()) {
      classes.push(`nui-avatar-group__excess--${this.effectiveSize()}`);
    }

    if (this.effectiveColor()) {
      classes.push(`nui-avatar-group__excess--${this.effectiveColor()}`);
    }

    if (this.effectiveVariant()) {
      classes.push(`nui-avatar-group__excess--${this.effectiveVariant()}`);
    }

    return classes.join(' ');
  });

  /** Avatares visibles (respetando el límite max) */
  protected readonly visibleAvatars = computed(() => {
    const avatarsList = this.avatars();
    const maxVal = this.max();

    if (!maxVal || avatarsList.length <= maxVal) {
      return avatarsList;
    }
    return avatarsList.slice(0, maxVal);
  });

  /** Número de avatares ocultos (excedente) */
  protected readonly hiddenCount = computed(() => {
    const total = this.avatars().length;
    const maxVal = this.max();

    if (!maxVal || total <= maxVal) return 0;
    return total - maxVal;
  });

  /** Indica si hay avatares ocultos */
  protected readonly hasHidden = computed(() => this.hiddenCount() > 0);

  /** Valor de espaciado como string CSS */
  protected readonly spacingValue = computed(() => `${this.spacing()}px`);

  /** Texto del indicador "+N" */
  protected readonly excessText = computed(() => {
    const count = this.hiddenCount();
    return count > 0 ? `+${count}` : '';
  });

  /** Tooltip para el indicador "+N" */
  protected readonly excessTooltip = computed(() => {
    const count = this.hiddenCount();
    const maxVal = this.max();

    if (count === 0 || maxVal === undefined) return '';

    // Usamos la traducción con pluralización
    return this.translation.avatar.moreProfiles.replace('{count}', count.toString());
  });
}
