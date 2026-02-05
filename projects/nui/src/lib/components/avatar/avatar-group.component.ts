import {
  Component,
  Input,
  ChangeDetectionStrategy,
  computed,
  signal,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AvatarGroupItem, AvatarVariant } from './models/avatar.model';
import { NUISize } from '../../configs';
import { NUI_TRANSLATIONS } from '../../translations';

/**
 * Componente para agrupar múltiples avatares con superposición
 *
 * Características:
 * - Apila avatares con superposición configurable
 * - Límite de avatares visibles con indicador "+N"
 * - Bordes opcionales para separar visualmente
 * - Tamaño y variante unificados para todos los avatares
 * - Tooltips opcionales en cada avatar
 *
 * @example
 * <nui-avatar-group [avatars]="users" [max]="3" />
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
  // ===== INPUTS =====

  /**
   * Lista de avatares a mostrar
   */
  @Input() set avatars(value: AvatarGroupItem[]) {
    this._avatars.set(value || []);
  }
  private readonly _avatars = signal<AvatarGroupItem[]>([]);

  /**
   * Número máximo de avatares visibles, validando que el valor sea positivo
   * El resto se muestra como "+N"
   */
  @Input() set max(value: number | undefined) {
    this._max = value && value > 0 ? value : undefined;
  }
  private _max?: number;
  get max() {
    return this._max;
  }

  /**
   * Espaciado entre avatares (en píxeles negativos para superposición)
   * @default -8
   */
  @Input() spacing: number = -8;

  /**
   * Layout del grupo de avatares
   * @default 'stacked'
   */
  @Input() layout: 'stacked' | 'inline' = 'inline';

  /**
   * Tamaño de todos los avatares
   * @default 'md'
   */
  @Input() size: NUISize = 'md';

  /**
   * Variante de forma para todos los avatares
   * @default 'circular'
   */
  @Input() variant: AvatarVariant = 'circular';

  // ===== DEPENDENCIES =====
  protected readonly translation = inject(NUI_TRANSLATIONS);

  // ===== COMPUTED =====

  /**
   * Avatares visibles (respetando el límite max)
   */
  protected readonly visibleAvatars = computed(() => {
    const avatars = this._avatars();
    if (!this.max || avatars.length <= this.max) {
      return avatars;
    }
    return avatars.slice(0, this.max);
  });

  /**
   * Número de avatares ocultos (excedente)
   */
  protected readonly hiddenCount = computed(() => {
    const avatars = this._avatars();
    if (!this.max || avatars.length <= this.max) {
      return 0;
    }
    return avatars.length - this.max;
  });

  /**
   * Indica si hay avatares ocultos
   */
  protected readonly hasHidden = computed(() => this.hiddenCount() > 0);

  /**
   * Valor de espaciado como string CSS
   */
  protected readonly spacingValue = computed(() => `${this.spacing}px`);

  /**
   * Texto del indicador "+N"
   */
  protected readonly excessText = computed(() => {
    const count = this.hiddenCount();
    return count > 0 ? `+${count}` : '';
  });

  /**
   * Tooltip para el indicador "+N"
   */
  protected readonly excessTooltip = computed(() => {
    const count = this.hiddenCount();
    if (count === 0) return '';

    const hidden = this._avatars().slice(this.max);
    const names = hidden
      .map((a) => a.alt || a.tooltip)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ');

    return names
      ? `${names}${count > 5 ? ` +${count - 3} más` : ''}`
      : this.translation.avatar.moreProfiles.replace(
          '{count}',
          count.toString(),
        );
  });
}
