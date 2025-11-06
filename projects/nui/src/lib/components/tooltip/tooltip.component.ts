import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TOOLTIP_ANIMATIONS } from './animations/tooltip.animations';

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
  host: {
    class: 'nui-tooltip',
    role: 'tooltip',
    '[@fadeIn]': 'true',
    '[attr.data-position]': 'position()',
    '[attr.id]': 'tooltipId()',
  },
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: TOOLTIP_ANIMATIONS,
})
export class TooltipComponent {
  /**
   * Contenido del tooltip (string o TemplateRef)
   */
  content = input.required<string | TemplateRef<any>>();

  /**
   * Posición del tooltip
   */
  position = input<string>('top');

  /**
   * Mostrar flecha
   */
  showArrow = input<boolean>(true);

  /**
   * ID único para accesibilidad
   */
  tooltipId = input<string>('');

  /**
   * Indica si el contenido es un template
   */
  isTemplate = signal(false);
}
