import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  booleanAttribute,
  inject,
  input,
  output,
  computed,
  signal,
  effect,
  untracked,
  viewChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';

import { ButtonDirective } from '../button/button.directive';
import { ActionMenuItem } from '../action-menu/models/action-menu.model';
import { ActionMenuSubmenuComponent } from '../action-menu/action-menu-submenu/action-menu-submenu.component';
import { dropdownFadeInAnimation } from '../../animations/dropdown-fade-in.animation';

import {
  NUIColor,
  NUISize,
  NUIVariant,
  NUIShape,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_SHAPE,
} from '../../configs';
import { ButtonType, ButtonWidth } from '../button/models/button.model';
import { injectSplitButtonConfig } from '../../configs/split-button';
import { NuiI18nService } from '../../i18n';

@Component({
  selector: 'nui-split-button',
  standalone: true,
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonDirective,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    ActionMenuSubmenuComponent,
  ],
  animations: [dropdownFadeInAnimation],
  host: {
    class: 'nui-split-btn-host',
    '[class.nui-split-btn-host--full]': 'effectiveWidth() === "full"',
    '[style.display]': 'effectiveWidth() === "full" ? "flex" : "inline-flex"',
    '[style.width]': 'effectiveWidth() === "full" ? "100%" : "auto"',
  },
})
export class SplitButtonComponent {
  private readonly globalConfig = injectSplitButtonConfig();
  private readonly _i18nService = inject(NuiI18nService);
  private readonly _i18n = computed(() => this._i18nService.translations());

  // ========================================================================
  // INPUTS
  // ========================================================================

  /** Texto del botón principal. */
  readonly label = input<string>();

  /** Icono prefijo del botón principal. */
  readonly prefixIcon = input<string>();

  /** Color del componente. */
  readonly color = input<NUIColor>();

  /** Tamaño del componente. */
  readonly size = input<NUISize>();

  /** Variante visual (solid, outline, ghost). */
  readonly variant = input<NUIVariant>();

  /** Forma del borde (rounded, square, pill). */
  readonly shape = input<NUIShape>();

  /** Sombra elevada. */
  readonly raised = input<boolean | undefined, unknown>(undefined, { transform: booleanAttribute });

  /** Estado de carga: afecta solo al botón principal. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** Deshabilita ambos botones (principal y disparador). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Deshabilita únicamente el botón disparador del menú. */
  readonly disabledTrigger = input(false, { transform: booleanAttribute });

  /** Ancho del conjunto: 'auto' | 'full'. */
  readonly width = input<ButtonWidth>('auto');

  /** Items del menú desplegable. */
  readonly items = input<ActionMenuItem[]>([]);

  /** Tipo HTML del botón principal. */
  readonly type = input<ButtonType>('button');

  /** Icono del disparador (caret). */
  readonly triggerIcon = input<string>();

  /** Icono de flecha para submenús anidados. */
  readonly iconSubmenu = input<string>('ri-arrow-right-s-line');

  /** Distancia en px entre el disparador y el panel flotante. */
  readonly offset = input<number>();

  /** Distancia en px entre el item padre y el submenú. */
  readonly offsetSubmenu = input<number>();

  /** Plantilla personalizada para los items del menú. */
  readonly itemTemplate = input<TemplateRef<any> | undefined>(undefined);

  /** Aria-label del botón principal. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Aria-label del botón disparador del menú. Prioridad: Input > Config global > Default. */
  readonly triggerAriaLabel = input<string>();

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  /** Clic en el botón principal (no se emite si está disabled o loading). */
  readonly onClick = output<Event>();

  /** Item del menú accionado. */
  readonly onItemAction = output<ActionMenuItem>();

  /** Menú abierto. */
  readonly menuOpen = output<void>();

  /** Menú cerrado. */
  readonly menuClose = output<void>();

  // ========================================================================
  // INTERNAL STATE
  // ========================================================================

  protected readonly isOpen = signal(false);

  /** Referencia al CdkMenuTrigger del botón disparador para cerrarlo al hacer scroll. */
  private readonly menuTrigger = viewChild(CdkMenuTrigger);

  constructor() {
    // Cierra el menú cuando el usuario hace scroll (igual que action-menu)
    effect((onCleanup) => {
      const handleScroll = () => {
        const trigger = untracked(this.menuTrigger);
        if (trigger?.isOpen()) {
          trigger.close();
        }
      };

      window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
      document.addEventListener('scroll', handleScroll, { capture: true, passive: true });

      onCleanup(() => {
        window.removeEventListener('scroll', handleScroll, { capture: true });
        document.removeEventListener('scroll', handleScroll, { capture: true });
      });
    });
  }

  // ========================================================================
  // COMPUTED — Resolución de valores con prioridad: Input > Config > Default
  // ========================================================================

  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig?.color ?? DEFAULT_COLOR
  );

  readonly effectiveSize = computed(
    () => this.size() ?? this.globalConfig?.size ?? DEFAULT_SIZE
  );

  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig?.variant ?? DEFAULT_VARIANT
  );

  readonly effectiveShape = computed(
    () => this.shape() ?? this.globalConfig?.shape ?? DEFAULT_SHAPE
  );

  readonly effectiveRaised = computed(
    () => this.raised() ?? this.globalConfig?.raised ?? false
  );

  readonly effectiveWidth = computed(
    () => this.width() ?? this.globalConfig?.width ?? 'auto'
  );

  readonly effectiveTriggerIcon = computed(
    () => this.triggerIcon() ?? this.globalConfig?.triggerIcon ?? 'ri-arrow-down-s-line'
  );

  readonly effectiveOffset = computed(
    () => this.offset() ?? this.globalConfig?.offset ?? 4
  );

  readonly effectiveOffsetSubmenu = computed(
    () => this.offsetSubmenu() ?? this.globalConfig?.offsetSubmenu ?? 4
  );

  readonly effectiveTriggerAriaLabel = computed(
    () => this.triggerAriaLabel() ?? this._i18n().openActionsMenu
  );

  readonly wrapperClasses = computed(() => ({
    'nui-split-btn': true,
    [`nui-split-btn--${this.effectiveColor()}`]: true,
    [`nui-split-btn--${this.effectiveVariant()}`]: true,
    [`nui-split-btn--${this.effectiveShape()}`]: true,
    [`nui-split-btn--${this.effectiveSize()}`]: true,
    'nui-split-btn--raised': this.effectiveRaised(),
    'nui-split-btn--disabled': this.disabled(),
    'nui-split-btn--open': this.isOpen(),
    'nui-split-btn--full': this.effectiveWidth() === 'full',
  }));

  /** Posiciones del overlay CDK para el menú principal. */
  readonly menuPositions = computed<ConnectedPosition[]>(() => {
    const o = this.effectiveOffset();
    return [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY:  o },
      { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -o },
      { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top', offsetY:  o },
      { originX: 'end',   originY: 'top',    overlayX: 'end',   overlayY: 'bottom', offsetY: -o },
    ];
  });

  /** Posiciones CDK para submenús anidados. */
  readonly submenuPositions = computed<ConnectedPosition[]>(() => {
    const o = this.effectiveOffsetSubmenu();
    return [
      { originX: 'end',   originY: 'top',    overlayX: 'start', overlayY: 'top',    offsetX:  o },
      { originX: 'start', originY: 'top',    overlayX: 'end',   overlayY: 'top',    offsetX: -o },
      { originX: 'end',   originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX:  o },
      { originX: 'start', originY: 'bottom', overlayX: 'end',   overlayY: 'bottom', offsetX: -o },
    ];
  });

  // ========================================================================
  // HANDLERS
  // ========================================================================

  protected handleMainClick(event: Event): void {
    if (this.disabled() || this.loading()) return;
    this.onClick.emit(event);
  }

  protected onMenuOpened(): void {
    this.isOpen.set(true);
    this.menuOpen.emit();
  }

  protected onMenuClosed(): void {
    this.isOpen.set(false);
    this.menuClose.emit();
  }

  protected handleItemClick(item: ActionMenuItem): void {
    item.onAction?.();
    this.onItemAction.emit(item);
  }
}
