import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  HostListener,
  inject,
} from '@angular/core';
import { ActionMenuType, ActionMenuItem } from './models/action-menu.model';
import { ActionMenuItemComponent } from './action-menu-item/action-menu-item.component';
import { ButtonIconPosition, ButtonWidth } from '../button/models/button.model';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Subject, takeUntil, merge, fromEvent, throttleTime } from 'rxjs';
import { FADE_IN_OUT_SCALE } from '../../animations';
import {
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  NUI_CONFIG,
  NUIColor,
  NUISize,
  NUIVariant,
} from '../../configs';
import { ActionMenuSubmenuComponent } from './action-menu-submenu/action-menu-submenu.component';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../button';

@Component({
  selector: 'nui-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
  host: {
    '[class.nui-action-menu--disabled]': 'disabled',
    '[class.nui-action-menu--fullWidth]': 'width === "full"',
  },
  standalone: true,
  imports: [
    CommonModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    ActionMenuItemComponent,
    ActionMenuSubmenuComponent,
    ButtonDirective,
  ],
  animations: [FADE_IN_OUT_SCALE],
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuComponent {
  private readonly _nuiConfig = inject(NUI_CONFIG);

  /**
   * Lista de items del menú.
   * Puede contener tanto items estáticos como dinámicos.
   * Los items estáticos se definen mediante el componente `<nui-action-menu-item>`.
   */
  @Input() items: ActionMenuItem[] | undefined = [];

  /**
   * Indica si el menú es estático o dinámico.
   * Si es `static`, el menú se renderiza en el DOM y no se utiliza el overlay.
   * Si es `dynamic`, el menú se renderiza en un overlay y se utiliza para menús contextuales o dinámicos.
   * Por defecto es `dynamic`.
   */
  @Input() type: ActionMenuType = 'dynamic';

  /**
   * Color del botón del menú.
   * Se utiliza para definir el color del botón que abre el menú.
   * @default 'primary' (o valor configurado globalmente)
   */
  @Input() color?: NUIColor;

  /**
   * Tamaño del botón del menú.
   * Se utiliza para definir el tamaño del botón que abre el menú.
   * @default 'md' (o valor configurado globalmente)
   */
  @Input() size?: NUISize;

  /*
   * Indica si el botón del menú ocupará todo el ancho disponible.
   */
  @Input() width: ButtonWidth = 'auto';

  /**
   * Indica la variante del botón
   * @default 'ghost' (o valor configurado globalmente)
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
   * Obtiene la variante con fallback: Personalizada > Global > Por defecto
   * Para action-menu, el default específico es 'ghost' en lugar de 'solid'
   */
  protected get effectiveVariant(): NUIVariant {
    return this.variant ?? this._nuiConfig?.defaultVariant ?? 'ghost';
  }

  /**
   * Indica si el menú está deshabilitado.
   */
  @Input() disabled = false;

  /**
   * Título del botón del menú.
   * Se utiliza para mostrar un tooltip al pasar el ratón por encima del botón.
   */
  @Input() title: string = '';

  /**
   * Icono del botón del menú.
   * Se utiliza para mostrar un icono en el botón que abre el menú.
   */
  @Input() icon?: string;

  /**
   * Posición del icono en el botón del menú.
   * Puede ser `start` o `end`.
   */
  @Input() iconPosition: ButtonIconPosition = 'start';

  /**
   * Icono de la flecha del submenú.
   * Se utiliza para mostrar un icono en el botón que abre el menú.
   */
  @Input() iconSubmenu: string = 'ri-arrow-right-s-line';

  /**
   * Texto del botón del menú.
   * Se utiliza para mostrar un texto en el botón que abre el menú.
   */
  @Input() label?: string;

  /**
   * Atributo aria-label para el botón del menú (opcional)
   */
  @Input() ariaLabel?: string;

  /**
   * Evento que se emite cuando se hace clic en un item del menú.
   * El item clicado se pasa como parámetro.
   */
  @Output() onItemAction = new EventEmitter<ActionMenuItem>();

  /**
   * Evento que se emite cuando el menú se abre.
   */
  @Output() menuOpen = new EventEmitter<void>();

  /**
   * Evento que se emite cuando el menú se cierra.
   */
  @Output() menuClose = new EventEmitter<void>();

  /**
   * Lista de items estáticos proyectados.
   * Estos items se definen mediante el componente `<nui-action-menu-item>`.
   */
  @ContentChildren(ActionMenuItemComponent, { descendants: false })
  staticItems!: QueryList<ActionMenuItemComponent>;

  /**
   * Referencia al menú CDK.
   */
  @ViewChild(CdkMenu)
  cdkMenu!: CdkMenu;

  @ViewChild(CdkMenuTrigger) menuTrigger?: CdkMenuTrigger;

  mergedItems: ActionMenuItem[] = [];

  private readonly ngUnsubscribe$ = new Subject<void>();

  ngOnInit() {
    // Si no se ha definido ni label ni icono, asignamos un icono por defecto
    if (!this.label && !this.icon) this.icon = 'ri-menu-line';
  }

  ngAfterContentInit() {
    this.updateMenuItems(); // Llama a la fusión inicial

    // Suscribirse a los cambios si los elementos proyectados pueden cambiar dinámicamente
    this.staticItems.changes
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.updateMenuItems());
  }

  ngAfterViewInit() {
    // Escuchar scroll en múltiples contextos
    const scroll$ = merge(
      fromEvent(window, 'scroll', { capture: true, passive: true }),
      fromEvent(document, 'scroll', { capture: true, passive: true })
    ).pipe(throttleTime(16), takeUntil(this.ngUnsubscribe$)); // ~60fps

    scroll$.subscribe(() => {
      if (this.menuTrigger?.isOpen()) this.menuTrigger.close();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  /**
   * Actualiza la lista de items del menú combinando los items del Input
   * con los items estáticos proyectados. Y así
   */
  private updateMenuItems(): void {
    const staticItemsFormatted = this.staticItems
      .map((comp) => comp.toMenuItem())
      .filter((item) => item !== (null as any)); // Filtra los nulos si `toMenuItem` devuelve null

    // Combina los items del Input con los items estáticos proyectados
    this.mergedItems = [...(this.items ?? []), ...staticItemsFormatted];

    // Si no hay items, no hacemos nada
    if (!this.mergedItems.length) return;

    // Añadimos IDs y titles únicos a cada item del menú
    this.addIdsAndTitles(this.mergedItems);
  }

  /**
   * Función para crear un ID único para cada item del menú.
   * Se utiliza para identificar los items en el menú.
   */
  createItemId(): string {
    return `menu-item-${crypto.randomUUID()}`;
  }

  /**
   * Función para crear un title único para cada item del menú, en base a su label o su templateRef.
   * Si es un templateRef, lo convertimos a un string legible eliminnndo espacios y caracteres especiales.
   * @param {ActionMenuItem} item - El item del menú al que se le quiere crear el title.
   * @returns {string} - El title único para el item del menú.
   */
  createItemTitle(item: ActionMenuItem): string {
    if (item.templateRef) {
      // Convertimos el templateRef a un string legible
      return item.templateRef
        .toString()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '');
    }
    return item.label ?? '';
  }

  /**
   * Método para añadir IDs y titles únicos a cada item del menú.
   * Recorre recursivamente los items y sus hijos, asignando un ID y title únicos a cada uno.
   * @param {ActionMenuItem[]} items - Lista de items del menú.
   */
  addIdsAndTitles(items: ActionMenuItem[]): void {
    items.forEach((item) => {
      item.id = this.createItemId();
      item.title = this.createItemTitle(item);

      // Si el item tiene hijos, los recorremos recursivamente
      if (item.children?.length) this.addIdsAndTitles(item.children);
    });
  }

  /**
   * Método que se ejecuta cuando se hace clic en un item del menú.
   * @param {ActionMenuItem} item - El item del menú que se ha clicado.
   */
  onItemClick(item: ActionMenuItem) {
    if (item.onAction) {
      item.onAction();
    }

    this.onItemAction.emit(item);
  }

  /**
   * Método que se ejecuta cuando el menú se abre desde el botón.
   */
  onMenuOpened() {
    this.menuOpen.emit();
  }

  /**
   * Método que se ejecuta cuando el menú se cierra desde el botón.
   */
  onMenuClosed() {
    this.menuClose.emit();
  }

  /**
   * Maneja la navegación por teclado en el menú.
   * Soporta las teclas Escape, ArrowDown, ArrowUp, Home, End.
   * @param {KeyboardEvent} event - El evento de teclado.
   */
  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Solo manejamos eventos de teclado si el menú está abierto
    if (!this.cdkMenu) return;

    switch (event.key) {
      case 'Escape':
        // Cerrar el menú al presionar Escape
        event.preventDefault();
        event.stopPropagation();
        if (this.cdkMenu) {
          this.cdkMenu.ngOnDestroy();
        }
        this.onMenuClosed();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End':
        // El CDK Menu ya maneja estas teclas por defecto
        // Solo prevenimos el comportamiento por defecto del navegador
        event.preventDefault();
        break;
    }
  }
}
