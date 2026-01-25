import {
  Component,
  ElementRef,
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
import { ActionMenuType, ActionMenuItem } from './models/action-menu.model';
import { ActionMenuItemComponent } from './action-menu-item/action-menu-item.component';
import { ActionMenuSubmenuComponent } from './action-menu-submenu/action-menu-submenu.component';
import { ButtonIconPosition, ButtonWidth } from '../button/models/button.model';
import { FADE_IN_OUT_SCALE } from '../../animations';
import {
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  NUI_CONFIG,
  NUIColor,
  NUISize,
  NUIVariant,
} from '../../configs';
import { ButtonDirective } from '../button';
import { MenuHeaderDirective, MenuFooterDirective } from './directives';

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
  animations: [FADE_IN_OUT_SCALE],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nui-action-menu--disabled]': 'disabled()',
    '[class.nui-action-menu--fullWidth]': 'width() === "full"',
    // Accesibilidad
    '[attr.aria-haspopup]': 'type() === "dynamic" ? "menu" : null',
    '[attr.aria-expanded]': 'menuTrigger()?.isOpen()',
  },
})
export class ActionMenuComponent {
  private readonly globalConfig = inject(NUI_CONFIG, { optional: true });

  // ========================================================================
  // INPUTS (Signals)
  // ========================================================================

  /** Lista de items del menú (Input data). */
  readonly items = input<ActionMenuItem[]>([]);

  /** Tipo de menú: 'static' (inline) o 'dynamic' (popover). */
  readonly type = input<ActionMenuType>('dynamic');

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
  readonly icon = input<string>();
  readonly iconPosition = input<ButtonIconPosition>('start');
  readonly iconSubmenu = input<string>('ri-arrow-right-s-line');
  readonly ariaLabel = input<string>();

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
    () => this.color() ?? this.globalConfig?.defaultColor ?? DEFAULT_COLOR
  );

  readonly effectiveSize = computed(
    () => this.size() ?? this.globalConfig?.defaultSize ?? DEFAULT_SIZE
  );

  /** Action menu usa 'ghost' por defecto si no se especifica nada */
  readonly effectiveVariant = computed(
    () => this.variant() ?? this.globalConfig?.defaultVariant ?? 'ghost'
  );

  /** Icono efectivo: si no hay label ni icono, ponemos un menú por defecto */
  readonly effectiveIcon = computed(() => {
    if (!this.label() && !this.icon()) return 'ri-menu-line';
    return this.icon();
  });

  readonly effectiveItemTemplate = computed(
    () => this.itemTemplateInput() ?? this.itemTemplateQuery()
  );

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
      return 'custom-content'; // Simplificado para no parsear strings complejos
    }
    return item.label ?? '';
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
