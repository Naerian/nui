import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ButtonGroupMode,
  ButtonGroupLayout,
  NormalizedOption,
} from './models/button-group.model';
import {
  NUI_CONFIG,
  NUISize,
  NUIColor,
  NUIVariant,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
} from '../../configs';
import { ButtonWidth } from '../button/models/button.model';

@Component({
  selector: 'nui-button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonGroupComponent),
      multi: true,
    },
  ],
})
export class ButtonGroupComponent implements ControlValueAccessor {
  private readonly _nuiConfig = inject(NUI_CONFIG);

  // ========================================================================
  // INPUTS
  // ========================================================================

  /** Opciones disponibles (Objetos o Primitivos) */
  readonly options = input.required<any[]>();

  /** Modo de selección: 'radio' | 'checkbox' */
  readonly mode = input<ButtonGroupMode>('radio');

  /** Estilo visual: 'grouped' (separados) | 'segmented' (iOS style) */
  readonly layout = input<ButtonGroupLayout>('grouped');

  // Mappers para objetos complejos
  readonly labelBy = input('label');
  readonly valueBy = input('value');
  readonly tooltipBy = input('tooltip');
  readonly iconBy = input('icon');
  readonly disabledBy = input('disabled');

  /** Configuración visual */
  readonly size = input<NUISize>();
  readonly color = input<NUIColor>();
  readonly variant = input<NUIVariant>();
  readonly width = input<ButtonWidth>('auto');

  /** Estados globales */
  readonly disabled = input(false);
  readonly iconOnly = input(false);

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  readonly valueChange = output<any>();

  // ========================================================================
  // STATE & COMPUTED
  // ========================================================================

  /** Valor interno controlado por CVA */
  protected readonly innerValue = signal<any>(null);

  /** Referencia a los botones del DOM para gestión de foco */
  private readonly buttonElements = viewChildren<ElementRef<HTMLButtonElement>>('btnOption');

  /**
   * Normalizamos las opciones una sola vez.
   * El template itera sobre esto, que ya tiene formato { label, value, icon, disabled }
   */
  protected readonly normalizedOptions = computed<NormalizedOption[]>(() => {
    const rawOptions = this.options();
    if (!rawOptions) return [];

    const labelKey = this.labelBy();
    const valueKey = this.valueBy();
    const tooltipKey = this.tooltipBy();
    const iconKey = this.iconBy();
    const disabledKey = this.disabledBy();

    const options = rawOptions.map(opt => {
      // Soporte para array de primitivos o de objetos
      const isObject = typeof opt === 'object' && opt !== null;

      const option = {
        label: isObject ? opt[labelKey] : String(opt),
        value: isObject ? opt[valueKey] : opt,
        tooltip: isObject ? opt[tooltipKey] : String(opt),
        icon: isObject ? opt[iconKey] : undefined,
        disabled: isObject ? !!opt[disabledKey] : false,
        original: opt,
      };

      return option;
    });

    return options;
  });

  /** Configuración efectiva (Global vs Local) */
  protected readonly effectiveSize = computed(
    () => this.size() ?? this._nuiConfig?.defaultSize ?? DEFAULT_SIZE
  );
  protected readonly effectiveColor = computed(
    () => this.color() ?? this._nuiConfig?.defaultColor ?? DEFAULT_COLOR
  );
  protected readonly effectiveVariant = computed(
    () => this.variant() ?? this._nuiConfig?.defaultVariant ?? DEFAULT_VARIANT
  );

  /** Clases CSS del contenedor principal */
  protected readonly containerClasses = computed(() => {
    const classes = [
      'nui-button-group',
      `nui-button-group--${this.effectiveSize()}`,
      `nui-button-group--${this.effectiveVariant()}`,
      `nui-button-group--${this.effectiveColor()}`,
    ];

    if (this.disabled()) classes.push('nui-button-group--disabled');
    if (this.iconOnly()) classes.push('nui-button-group--icon-only');
    if (this.layout() === 'segmented') classes.push('nui-button-group--segmented');

    // Clases de ancho
    if (this.width() === 'full') classes.push('nui-button-group--full');
    if (this.width() === 'fit') classes.push('nui-button-group--fit');
    if (this.width() === 'auto') classes.push('nui-button-group--auto');

    return classes.join(' ');
  });

  // ========================================================================
  // CONTROL VALUE ACCESSOR
  // ========================================================================

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (this.mode() === 'checkbox') {
      this.innerValue.set(Array.isArray(value) ? value : []);
    } else {
      this.innerValue.set(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ========================================================================
  // PUBLIC METHODS (Used by Template)
  // ========================================================================

  /** Sirve para comprobar si un botón está seleccionado */
  isSelected(optionValue: any): boolean {
    const selected = this.innerValue();

    if (this.mode() === 'checkbox') {
      return Array.isArray(selected) && selected.includes(optionValue);
    }
    return selected === optionValue;
  }

  /** Permite alternar entre marcado y desmarcado */
  toggleOption(option: NormalizedOption): void {
    if (this.disabled() || option.disabled) return;

    const value = option.value;
    let newValue: any;

    if (this.mode() === 'checkbox') {
      const current = Array.isArray(this.innerValue()) ? [...this.innerValue()] : [];
      const index = current.indexOf(value);

      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      newValue = current;
    } else {
      // Radio mode: siempre selecciona
      newValue = value;
    }

    this.innerValue.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    this.onTouched();
  }

  // ========================================================================
  // KEYBOARD NAVIGATION
  // ========================================================================

  onKeydown(event: KeyboardEvent, currentIndex: number): void {
    if (this.disabled()) return;

    const key = event.key;
    const isRadio = this.mode() === 'radio';
    const options = this.normalizedOptions();

    // Navegación
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
      event.preventDefault();

      let newIndex = currentIndex;

      if (key === 'Home') newIndex = this.findNextEnabled(options, -1, 1);
      else if (key === 'End') newIndex = this.findNextEnabled(options, options.length, -1);
      else if (key === 'ArrowLeft' || key === 'ArrowUp')
        newIndex = this.findNextEnabled(options, currentIndex, -1);
      else if (key === 'ArrowRight' || key === 'ArrowDown')
        newIndex = this.findNextEnabled(options, currentIndex, 1);

      if (newIndex !== -1 && newIndex !== currentIndex) {
        this.focusOption(newIndex);
        if (isRadio) {
          this.toggleOption(options[newIndex]);
        }
      }
    }
    // Selección con Espacio en Checkbox
    else if (key === ' ' && !isRadio) {
      event.preventDefault();
      this.toggleOption(options[currentIndex]);
    }
  }

  /** Lógica simplificada de búsqueda circular */
  private findNextEnabled(
    options: NormalizedOption[],
    startIndex: number,
    direction: 1 | -1
  ): number {
    let i = startIndex + direction;
    const len = options.length;

    // Loop de seguridad para evitar bucles infinitos si todos están disabled
    let attempts = 0;
    while (attempts < len) {
      // Wrap around logic
      if (i < 0) i = len - 1;
      if (i >= len) i = 0;

      if (!options[i].disabled) return i;

      i += direction;
      attempts++;
    }
    return -1; // Nada habilitado
  }

  private focusOption(index: number): void {
    const buttons = this.buttonElements();
    buttons[index]?.nativeElement.focus();
  }

  /** Devuelve el índice del botón (pestaña) */
  getTabIndex(option: NormalizedOption, index: number): number {
    if (this.disabled() || option.disabled) return -1;

    // Checkbox: Todos tabulables
    if (this.mode() !== 'radio') return 0;

    // Radio: Roving Tabindex
    const isSelected = this.isSelected(option.value);
    const hasSelection = this.innerValue() != null;

    // Si está seleccionado -> 0
    // Si NO hay nada seleccionado en todo el grupo y es el primero habilitado -> 0
    if (isSelected) return 0;
    if (!hasSelection) {
      const firstEnabled = this.findNextEnabled(this.normalizedOptions(), -1, 1);
      if (index === firstEnabled) return 0;
    }

    return -1;
  }
}
