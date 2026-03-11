import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  booleanAttribute,
  inject,
  input,
  output,
  computed,
  effect,
  contentChildren,
  contentChild,
  viewChild,
  TemplateRef,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ActionMenuType, ActionMenuItem } from './models/action-menu.model';
import { NuiI18nService } from '../../i18n';
import { ActionMenuItemComponent } from './action-menu-item/action-menu-item.component';
import { ActionMenuSubmenuComponent } from './action-menu-submenu/action-menu-submenu.component';
import { ButtonWidth } from '../button/models/button.model';
import {
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  NUIColor,
  NUISize,
  NUIVariant,
} from '../../configs';
import { ButtonDirective } from '../button';
import { injectActionMenuConfig } from '../../configs/action-menu';
import { dropdownFadeInAnimation } from '../../animations/dropdown-fade-in.animation';

@Component({
  selector: 'nui-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    ActionMenuSubmenuComponent,
    ButtonDirective,
  ],
  animations: [dropdownFadeInAnimation],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nui-action-menu--disabled]': 'disabled()',
    '[class.nui-action-menu--fullWidth]': 'width() === "full"',
  },
})
export class ActionMenuComponent {
  private readonly globalConfig = injectActionMenuConfig();
  private readonly _i18nService = inject(NuiI18nService);
  private readonly _i18n = computed(() => this._i18nService.translations());

  /** ID único por instancia para vincular trigger → panel de menú */
  readonly instanceId = `nui-am-${Math.random().toString(36).slice(2, 9)}`;

  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Lista de items del menú (Input data). */
  readonly items = input<ActionMenuItem[]>([]);

  /** Modo de renderizado: 'dropdown' (panel flotante con trigger) o 'inline' (integrado en el flujo). */
  readonly type = input<ActionMenuType>('dropdown');

  /** Color del trigger. */
  readonly color = input<NUIColor>();

  /** Tamaño del trigger. */
  readonly size = input<NUISize>();

  /** Variante del trigger. Default específico a 'ghost'. */
  readonly variant = input<NUIVariant>();

  /** Ancho del trigger. */
  readonly width = input<ButtonWidth>('auto');

  /** Estado deshabilitado. */
  readonly disabled = input(false, { transform: booleanAttribute });

  // --- Props del Botón Trigger ---
  readonly title = input<string>('');
  readonly label = input<string>();
  readonly prefixIcon = input<string>();
  readonly iconSubmenu = input<string>('ri-arrow-right-s-line');
  readonly ariaLabel = input<string>();

  readonly effectiveAriaLabel = computed(
    () => this.ariaLabel() ?? this._i18n().openActionsMenu
  );

  /** Distancia en px entre el trigger y el panel flotante (solo en modo 'dropdown'). */
  readonly offset = input<number>();

  /** Distancia en px entre el item padre y el panel del submenú anidado. */
  readonly offsetSubmenu = input<number>();

  /** Template personalizado para items. */
  readonly itemTemplateInput = input<TemplateRef<any> | undefined>(undefined, {
    alias: 'itemTemplate',
  });

  // ========================================================================
  // QUERIES (Signals)
  // ========================================================================

  /** Items proyectados vía <nui-action-menu-item> */
  readonly staticItems = contentChildren(ActionMenuItemComponent, {
    descendants: false,
  });

  /** Template proyectado vía #item (alternativa legacy a input). */
  readonly itemTemplateQuery = contentChild<TemplateRef<any>>('item');

  /** Referencias a CDK */
  readonly cdkMenu = viewChild(CdkMenu);
  readonly menuTrigger = viewChild(CdkMenuTrigger);

  // ========================================================================
  // OUTPUTS
  // ========================================================================

  readonly onItemAction = output<ActionMenuItem>();
  readonly onSelectionChange = output<ActionMenuItem>();
  readonly menuOpen = output<void>();
  readonly menuClose = output<void>();

  // ========================================================================
  // COMPUTED PROPERTIES
  // ========================================================================

  readonly effectiveColor = computed(
    () => this.color() ?? this.globalConfig?.color ?? DEFAULT_COLOR
  );

  readonly effectiveSize = computed(
    () => this.size() ?? this.globalConfig?.size ?? DEFAULT_SIZE
  );

  /** Action menu usa 'ghost' por defecto si no se especifica nada */
  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig?.variant ?? 'ghost'
  );

  /** Icono efectivo: si no hay label ni prefixIcon, ponemos un menú por defecto */
  readonly effectiveIcon = computed(() => {
    if (!this.label() && !this.prefixIcon()) return 'ri-menu-line';
    return this.prefixIcon();
  });

  readonly effectiveItemTemplate = computed(
    () => this.itemTemplateInput() ?? this.itemTemplateQuery()
  );

  readonly effectiveOffset = computed(
    () => this.offset() ?? this.globalConfig?.offset ?? 4
  );

  readonly effectiveOffsetSubmenu = computed(
    () => this.offsetSubmenu() ?? this.globalConfig?.offsetSubmenu ?? 4
  );

  /**
   * Posiciones del overlay CDK con el offset aplicado.
   * Replica las posiciones por defecto del CdkMenuTrigger añadiendo offsetY.
   */
  readonly menuPositions = computed<ConnectedPosition[]>(() => {
    const o = this.effectiveOffset();
    return [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY:  o },
      { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -o },
      { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top',    offsetY:  o },
      { originX: 'end',   originY: 'top',    overlayX: 'end',   overlayY: 'bottom', offsetY: -o },
    ];
  });

  /**
   * Posiciones laterales para los paneles de submenú anidados (offsetX).
   */
  readonly submenuPositions = computed<ConnectedPosition[]>(() => {
    const o = this.effectiveOffsetSubmenu();
    return [
      { originX: 'end',   originY: 'top', overlayX: 'start', overlayY: 'top',    offsetX:  o },
      { originX: 'start', originY: 'top', overlayX: 'end',   overlayY: 'top',    offsetX: -o },
      { originX: 'end',   originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX:  o },
      { originX: 'start', originY: 'bottom', overlayX: 'end',   overlayY: 'bottom', offsetX: -o },
    ];
  });

  /**
   * Combina items de Input + Proyección HTML
   * Se recalcula automáticamente si cambian los inputs o el contenido proyectado.
   */
  readonly mergedItems = computed(() => {
    // 1. Convertir componentes estáticos a objetos de datos
    const staticMapped = this.staticItems()
      .map((comp) => comp.toMenuItem())
      .filter((item): item is ActionMenuItem => !!item);

    // 2. Combinar
    const combined = [...(this.items() ?? []), ...staticMapped];

    // 3. Enriquecer (IDs, Titles)
    // Nota: Mutamos los objetos para añadir IDs. En un mundo ideal purista usaríamos immutabilidad,
    // pero por rendimiento y recursividad, enriquecer in-place es aceptable aquí.
    if (combined.length) {
      this.enrichItemsRecursive(combined);
    }

    return combined;
  });

  /** Detecta si estamos en modo selección (algún item tiene `selected: true`) */
  readonly isSelectionMode = computed(() =>
    this.hasAnySelected(this.mergedItems())
  );

  // ========================================================================
  // LIFECYCLE & EFFECTS
  // ========================================================================

  constructor() {
    // Efecto para cerrar menú al hacer scroll
    effect((onCleanup) => {
      // Este efecto se ejecuta una vez al inicio y luego gestiona el listener
      const handleScroll = () => {
        // Usamos untracked para leer el trigger sin registrar dependencia
        // (aunque viewChild es signal, aquí queremos acción imperativa)
        const trigger = untracked(this.menuTrigger);
        if (trigger?.isOpen()) {
          trigger.close();
        }
      };

      // Registrar listeners pasivos para performance
      window.addEventListener('scroll', handleScroll, {
        capture: true,
        passive: true,
      });
      document.addEventListener('scroll', handleScroll, {
        capture: true,
        passive: true,
      });

      onCleanup(() => {
        window.removeEventListener('scroll', handleScroll, { capture: true });
        document.removeEventListener('scroll', handleScroll, { capture: true });
      });
    });
  }

  // ========================================================================
  // LOGIC METHODS
  // ========================================================================

  onItemClick(item: ActionMenuItem) {
    // Lógica de selección única
    if (this.isSelectionMode() && !item.children && !item.separator) {
      // Necesitamos deseleccionar todo en los datos actuales
      // Al ser objetos, la mutación se reflejará, pero para disparar reactividad
      // idealmente deberíamos recrear el array, pero por complejidad mantenemos mutación
      // y Angular CD lo pillará por eventos.
      this.deselectAllRecursive(this.mergedItems());
      item.selected = true;
      this.onSelectionChange.emit(item);
    }

    if (item.onAction) {
      item.onAction();
    }

    this.onItemAction.emit(item);
  }

  // Wrappers para eventos CDK
  onCdkMenuOpened() {
    this.menuOpen.emit();
  }
  onCdkMenuClosed() {
    this.menuClose.emit();
  }

  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    const menu = this.cdkMenu();

    // Si no hay menú instanciado, nada que hacer
    if (!menu) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      
      // CDK Menu trigger suele manejar esto, pero forzamos cierre si es necesario
      this.menuTrigger()?.close();
      this.onCdkMenuClosed();
    }
    // Arrow keys las maneja CDK nativamente
  }

  // --- Helpers Recursivos ---

  private enrichItemsRecursive(items: ActionMenuItem[]): void {
    items.forEach((item) => {
      if (!item.id) item.id = `menu-item-${crypto.randomUUID()}`;
      if (!item.title) item.title = this.createItemTitle(item);
      if (item.children?.length) this.enrichItemsRecursive(item.children);
    });
  }

  private createItemTitle(item: ActionMenuItem): string {
    if (item.templateRef) {
      return 'custom-content';
    }
    const base = item.label ?? '';
    return item.badge ? `${base} (${item.badge})` : base;
  }

  hasSelectedChild(item: ActionMenuItem): boolean {
    if (item.selected) return true;
    return (
      item.children?.some((child) => this.hasSelectedChild(child)) ?? false
    );
  }

  private hasAnySelected(items: ActionMenuItem[]): boolean {
    return items.some((item) => {
      if (item.selected) return true;
      if (item.children?.length) return this.hasAnySelected(item.children);
      return false;
    });
  }

  private deselectAllRecursive(items: ActionMenuItem[]): void {
    items.forEach((item) => {
      item.selected = false;
      if (item.children?.length) this.deselectAllRecursive(item.children);
    });
  }
}
