import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  computed,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { tooltipAnimation } from './animations/tooltip.animations';

/**
 * @name
 * nui-tooltip
 * @description
 * Componente interno que renderiza el contenido del tooltip.
 * No debe ser usado directamente. Usa la directiva `nuiTooltip` en su lugar.
 *
 * @internal
 */
@Component({
  selector: 'nui-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tooltipAnimation],
})
export class TooltipComponent {
  /** Contenido del tooltip (string o TemplateRef) */
  readonly content = input.required<string | TemplateRef<any>>();

  /** Posición del tooltip */
  readonly position = input<string>('top');

  /** Mostrar flecha */
  readonly showArrow = input<boolean>(true);

  /** ID único para el atributo aria-describedby del trigger */
  readonly tooltipId = input<string>('');

  /**
   * Permitir HTML en el contenido (solo si es string).
   * Angular sanitiza automáticamente con [innerHTML].
   * @default false
   */
  readonly allowHtml = input<boolean>(false);

  /**
   * Computed que sustituye al signal mutable externo.
   * La directiva ya NO necesita hacer instance.isTemplate.set().
   */
  readonly isTemplate = computed(() => this.content() instanceof TemplateRef);
}
