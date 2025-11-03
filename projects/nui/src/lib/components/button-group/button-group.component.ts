import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectionStrategy,
  forwardRef,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ButtonGroupMode,
  ButtonGroupOption,
  ButtonGroupVisualVariant,
} from './models/button-group.model';
import { NUI_CONFIG, NUISize, NUIColor, NUIVariant, DEFAULT_COLOR, DEFAULT_SIZE, DEFAULT_VARIANT } from '../../configs';
import { ButtonWidth } from '../button/models/button.model';

/**
 * ButtonGroupComponent
 *
 * Componente de grupo de botones con selección tipo radio o checkbox.
 * Similar a toggle-button pero con soporte para multiselección.
 *
 * @example
 * // Modo radio (selección única)
 * <nui-button-group
 *   [options]="viewOptions"
 *   mode="radio"
 *   [(value)]="selectedView"
 * />
 *
 * @example
 * // Modo checkbox (multiselección)
 * <nui-button-group
 *   [options]="formatOptions"
 *   mode="checkbox"
 *   [(value)]="selectedFormats"
 * />
 *
 * @example
 * // Estilo segmented (iOS)
 * <nui-button-group
 *   [options]="periodOptions"
 *   mode="radio"
 *   visualVariant="segmented"
 *   [(value)]="selectedPeriod"
 * />
 *
 * @example
 * // Con iconos
 * <nui-button-group
 *   [options]="alignOptions"
 *   [iconOnly]="true"
 *   color="primary"
 * />
 */
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

  // ==================
  // INPUTS
  // ==================

  /**
   * Opciones disponibles
   */
  @Input({ required: true }) options: ButtonGroupOption[] | any[] = [];

  /**
   * Modo de selección
   * - 'radio': Selección única (default)
   * - 'checkbox': Multiselección
   */
  @Input() mode: ButtonGroupMode = 'radio';

  /**
   * Variante visual
   * - 'grouped': Botones separados con espacios (default)
   * - 'segmented': Botones unidos sin espacios, estilo iOS
   */
  @Input() visualVariant: ButtonGroupVisualVariant = 'grouped';

  /**
   * Nombre de la propiedad para el label
   */
  @Input() labelBy = 'label';

  /**
   * Nombre de la propiedad para el value
   */
  @Input() valueBy = 'value';

  /**
   * Nombre de la propiedad para el icon
   */
  @Input() iconBy = 'icon';

  /**
   * Nombre de la propiedad para disabled
   */
  @Input() disabledBy = 'disabled';

  /**
   * Tamaño de los botones
   * @default 'md' (o valor configurado globalmente)
   */
  @Input() size?: NUISize;

  /**
   * Color de los botones
   * @default 'primary' (o valor configurado globalmente)
   */
  @Input() color?: NUIColor;

  /**
   * Variante visual
   * @default 'solid' (o valor configurado globalmente)
   */
  @Input() variant?: NUIVariant;

  /**
   * Obtiene el color con fallback: Personalizado > Global > Por defecto
   */
  protected get effectiveColor(): NUIColor {
    return this.color ?? this._nuiConfig?.defaultColor ?? DEFAULT_COLOR;
  }

  /**
   * Obtiene el tamaño con fallback: Personalizado > Global > Por defecto
   */
  protected get effectiveSize(): NUISize {
    return this.size ?? this._nuiConfig?.defaultSize ?? DEFAULT_SIZE;
  }

  /**
   * Obtiene la variante con fallback: Personalizado > Global > Por defecto
   */
  protected get effectiveVariant(): NUIVariant {
    return this.variant ?? this._nuiConfig?.defaultVariant ?? DEFAULT_VARIANT;
  }

  /**
   * Si el componente está deshabilitado
   */
  @Input() disabled = false;

  /**
   * Si muestra solo iconos (sin texto)
   */
  @Input() iconOnly = false;

  /**
   * Ancho del botón.
   * - 'auto': Ancho automático basado en el contenido (default)
   * - 'full': Ocupa todo el ancho del contenedor (100%)
   * - 'fit': Se ajusta exactamente al contenido (fit-content)
   * @default 'auto'
   */
  @Input() width: ButtonWidth = 'auto';

  /**
   * Valor seleccionado
   */
  @Input() set value(val: any) {
    this.writeValue(val);
  }
  get value(): any {
    return this.selectedValue();
  }

  // ==================
  // OUTPUTS
  // ==================

  /**
   * Emite cuando cambia el valor
   */
  @Output() valueChange = new EventEmitter<any>();

  // ==================
  // SIGNALS
  // ==================

  /**
   * Valor(es) seleccionado(s)
   */
  selectedValue = signal<any>(null);

  /**
   * Índice del elemento con foco actual para navegación por teclado
   */
  private focusedIndex = signal<number>(-1);

  /**
   * Referencia al elemento host del componente
   */
  private hostElement = inject(ElementRef<HTMLElement>);

  // ==================
  // CONTROL VALUE ACCESSOR
  // ==================

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (this.mode === 'checkbox') {
      this.selectedValue.set(Array.isArray(value) ? value : []);
    } else {
      this.selectedValue.set(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ==================
  // MÉTODOS PÚBLICOS
  // ==================

  /**
   * Obtiene el label de una opción
   */
  getOptionLabel(option: any): string {
    return option[this.labelBy] ?? '';
  }

  /**
   * Obtiene el value de una opción
   */
  getOptionValue(option: any): any {
    return option[this.valueBy];
  }

  /**
   * Obtiene el icon de una opción
   */
  getOptionIcon(option: any): string | undefined {
    return option[this.iconBy];
  }

  /**
   * Obtiene si una opción está disabled
   */
  getOptionDisabled(option: any): boolean {
    return option[this.disabledBy] ?? false;
  }

  /**
   * Verifica si una opción está seleccionada
   */
  isSelected(option: any): boolean {
    const value = this.getOptionValue(option);
    const selected = this.selectedValue();

    if (this.mode === 'checkbox') {
      return Array.isArray(selected) && selected.includes(value);
    } else {
      return selected === value;
    }
  }

  /**
   * Selecciona/Deselecciona una opción
   */
  toggleOption(option: any): void {
    if (this.disabled || this.getOptionDisabled(option)) return;

    const value = this.getOptionValue(option);
    let newValue: any;

    if (this.mode === 'checkbox') {
      const current = Array.isArray(this.selectedValue())
        ? [...this.selectedValue()]
        : [];
      const index = current.indexOf(value);

      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }

      newValue = current;
    } else {
      // En modo radio, siempre se selecciona (no se puede deseleccionar)
      newValue = value;
    }

    this.selectedValue.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    this.onTouched();
  }

  /**
   * Obtiene las clases CSS para el contenedor
   */
  getContainerClasses(): string {
    const classes = [
      'nui-button-group',
      `nui-button-group--${this.effectiveSize}`,
      `nui-button-group--${this.effectiveVariant}`,
      `nui-button-group--${this.effectiveColor}`,
    ];

    if (this.disabled) {
      classes.push('nui-button-group--disabled');
    }

    if (this.iconOnly) {
      classes.push('nui-button-group--icon-only');
    }

    if (this.visualVariant === 'segmented') {
      classes.push('nui-button-group--segmented');
    }

    return classes.join(' ');
  }

  /**
   * Obtiene las clases CSS para una opción
   */
  getOptionClasses(option: any): string {
    const classes = ['nui-button-group__option'];

    if (this.isSelected(option)) {
      classes.push('nui-button-group__option--selected');
    }

    if (this.getOptionDisabled(option)) {
      classes.push('nui-button-group__option--disabled');
    }

    return classes.join(' ');
  }

  // ==================
  // KEYBOARD NAVIGATION
  // ==================

  /**
   * Maneja la navegación por teclado
   */
  onKeydown(event: KeyboardEvent, optionIndex: number): void {
    if (this.disabled) return;

    const key = event.key;
    const isRadioMode = this.mode === 'radio';

    // Teclas de navegación
    if (
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(key)
    ) {
      event.preventDefault();
      this.handleNavigation(key, optionIndex, isRadioMode);
    }
    // Space para checkbox mode
    else if (key === ' ' && !isRadioMode) {
      event.preventDefault();
      this.toggleOption(this.options[optionIndex]);
    }
  }

  /**
   * Maneja la navegación entre opciones
   */
  private handleNavigation(
    key: string,
    currentIndex: number,
    isRadioMode: boolean,
  ): void {
    let newIndex = currentIndex;

    switch (key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = this.getPreviousEnabledIndex(currentIndex);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = this.getNextEnabledIndex(currentIndex);
        break;
      case 'Home':
        newIndex = this.getFirstEnabledIndex();
        break;
      case 'End':
        newIndex = this.getLastEnabledIndex();
        break;
    }

    if (newIndex !== -1) {
      this.focusedIndex.set(newIndex);
      this.focusOption(newIndex);

      // En modo radio, navegar también selecciona
      if (isRadioMode) {
        this.toggleOption(this.options[newIndex]);
      }
    }
  }

  /**
   * Obtiene el índice de la opción anterior habilitada
   */
  private getPreviousEnabledIndex(currentIndex: number): number {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!this.getOptionDisabled(this.options[i])) {
        return i;
      }
    }
    // Circular: volver al final
    return this.getLastEnabledIndex();
  }

  /**
   * Obtiene el índice de la opción siguiente habilitada
   */
  private getNextEnabledIndex(currentIndex: number): number {
    for (let i = currentIndex + 1; i < this.options.length; i++) {
      if (!this.getOptionDisabled(this.options[i])) {
        return i;
      }
    }
    // Circular: volver al inicio
    return this.getFirstEnabledIndex();
  }

  /**
   * Obtiene el índice de la primera opción habilitada
   */
  private getFirstEnabledIndex(): number {
    for (let i = 0; i < this.options.length; i++) {
      if (!this.getOptionDisabled(this.options[i])) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Obtiene el índice de la última opción habilitada
   */
  private getLastEnabledIndex(): number {
    for (let i = this.options.length - 1; i >= 0; i--) {
      if (!this.getOptionDisabled(this.options[i])) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Enfoca la opción en el índice especificado
   */
  private focusOption(index: number): void {
    setTimeout(() => {
      // Buscar solo dentro de esta instancia del componente
      const buttons = this.hostElement.nativeElement.querySelectorAll(
        '.nui-button-group__option',
      );
      const targetButton = buttons[index] as HTMLElement;
      if (targetButton) {
        targetButton.focus();
      }
    }, 0);
  }

  /**
   * Obtiene el tabindex para una opción (roving tabindex pattern)
   */
  getTabIndex(option: any, index: number): number {
    if (this.disabled || this.getOptionDisabled(option)) return -1;

    if (this.mode === 'radio') {
      // En modo radio, solo el seleccionado (o el primero si no hay selección) es tabulable
      const isSelected = this.isSelected(option);
      const isFirstEnabled = index === this.getFirstEnabledIndex();
      const hasSelection =
        this.selectedValue() !== null && this.selectedValue() !== undefined;

      return isSelected || (!hasSelection && isFirstEnabled) ? 0 : -1;
    } else {
      // En modo checkbox, todos los botones habilitados son tabulables
      return 0;
    }
  }
}
