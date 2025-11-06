import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  DestroyRef,
  ElementRef,
  HostListener,
  WritableSignal,
  signal,
  Input,
  Output,
  EventEmitter,
  computed,
  booleanAttribute,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { fromEvent } from 'rxjs';
import {
  NUI_CONFIG,
  NUIColor,
  DEFAULT_COLOR,
  NUISize,
  DEFAULT_SIZE,
  NUIVariant,
} from '../../configs';
import { NUI_TRANSLATIONS } from '../../translations';
import {
  PaginatorGlobalConfig,
  KeyboardConfig,
  PaginatorConfig,
  IconConfig,
  InfiniteConfig,
  PageChangeEvent,
  PageSizeChangeEvent,
  InfiniteState,
  PaginatorState,
  PaginatorElement,
  PaginatorLayout,
  PaginatorLayoutAlign,
  PaginatorLayoutArea,
  PaginatorLayoutDirection,
  PaginatorMode,
} from './models/paginator.model';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { ButtonGroupOption } from '../button-group/models/button-group.model';

/**
 * @name
 * nui-paginator
 * @description
 * Componente de paginación que permite navegar entre páginas de resultados.
 * Soporta diferentes tamaños, colores y variantes visuales.
 *
 * @example
 * // Paginador básico
 * <nui-paginator
 *   [currentPage]="1"
 *   [totalPages]="10"
 *   (pageChange)="onPageChange($event)">
 * </nui-paginator>
 *
 * @example
 * // Paginador con configuración personalizada
 * <nui-paginator
 *   [currentPage]="currentPage"
 *   [totalPages]="totalPages"
 *   [color]="'primary'"
 *   [size]="'md'"
 *   [variant]="'solid'"
 *   [showFirstLast]="true"
 *   (pageChange)="handlePageChange($event)">
 * </nui-paginator>
 *
 * @example
 * // Paginador con límite de botones visibles
 * <nui-paginator
 *   [currentPage]="5"
 *   [totalPages]="20"
 *   [maxVisiblePages]="5"
 *   [color]="'accent'"
 *   (pageChange)="onPageChange($event)">
 * </nui-paginator>
 */
@Component({
  selector: 'nui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private readonly globalConfig = inject(NUI_CONFIG);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  protected readonly _translations = inject(NUI_TRANSLATIONS);
  private readonly paginatorConfig: PaginatorGlobalConfig =
    this.globalConfig.paginator || {};

  // Caché para memoización de páginas visibles
  private _visiblePagesCache = new Map<string, (number | string)[]>();

  // Configuración de teclado
  private keyboardConfig: KeyboardConfig = {};

  // Temporizador para limpiar mensajes del aria-live
  private clearAriaLiveMsgTimeout?: ReturnType<typeof setTimeout>;

  // Configuraciones del componente

  /**
   * Listener para detectar cambios de tamaño de ventana y actualizar detección móvil
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (this.autoMobile) {
      this.updateMobileDetection();
    }
  }

  /**
   * Color del paginador.
   * Valores posibles: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'accent'
   * @default 'primary' (o valor configurado globalmente)
   */
  _color: WritableSignal<NUIColor> = signal(DEFAULT_COLOR);
  @Input()
  set color(value: NUIColor) {
    this._color.set(value || this.globalConfig.defaultColor || DEFAULT_COLOR);
  }
  get color(): NUIColor {
    return this._color();
  }

  /**
   * Tamaño del paginador.
   * Valores posibles: 'xs', 's', 'sm', 'md', 'lg', 'xl'
   * @default 'md' (o valor configurado globalmente)
   */
  _size: WritableSignal<NUISize> = signal(DEFAULT_SIZE);
  private _hasExplicitSize = false;

  @Input()
  set size(value: NUISize) {
    if (value) {
      this._hasExplicitSize = true;
    }
    this._size.set(value || this.globalConfig.defaultSize || DEFAULT_SIZE);
  }
  get size(): NUISize {
    return this._size();
  }

  /**
   * Variante visual del paginador.
   * - 'solid': Botón sólido con fondo de color completo (default)
   * - 'outline': Borde de color con fondo transparente
   * - 'ghost': Sin borde ni fondo, solo texto/icono
   * @default 'solid'
   */
  @Input() variant: NUIVariant = 'solid';

  /**
   * Página actual (1-indexed).
   * @default 1
   */
  _currentPage: WritableSignal<number> = signal(1);
  @Input()
  set currentPage(value: number) {
    // Validación robusta
    if (value == null || isNaN(value) || !isFinite(value)) return;

    // No limitar por totalPages aquí, se validará después si es necesario
    const validValue = Math.max(1, Math.floor(value));

    // Solo actualizar si el valor cambió
    if (validValue !== this._currentPage()) {
      this._currentPage.set(validValue);
      // Limpiar caché cuando cambia la página
      this._visiblePagesCache.clear();
    }
  }
  get currentPage(): number {
    return this._currentPage();
  }

  /**
   * Número total de páginas.
   * @default 1
   */
  _totalPages: WritableSignal<number> = signal(1);
  @Input()
  set totalPages(value: number) {
    // Validación robusta
    if (value == null || isNaN(value) || !isFinite(value)) return;

    const validValue = Math.max(1, Math.floor(value));

    // Solo actualizar si el valor cambió
    if (validValue !== this._totalPages()) {
      this._totalPages.set(validValue);

      // Si la página actual excede el total, ajustar
      if (this.currentPage > validValue) {
        this._currentPage.set(validValue);
      }

      // Limpiar caché cuando cambia el total
      this._visiblePagesCache.clear();
    }
  }
  get totalPages(): number {
    return this._totalPages();
  }

  /**
   * Número máximo de páginas visibles en el paginador.
   * El paginador mostrará un máximo de este número de botones de página.
   * @default 7
   */
  _maxVisiblePages: number = 7;
  private _hasExplicitMaxVisiblePages = false;

  @Input()
  set maxVisiblePages(value: number) {
    if (value != null) {
      this._hasExplicitMaxVisiblePages = true;
    }
    this._maxVisiblePages = value || 7;
  }
  get maxVisiblePages(): number {
    return this._maxVisiblePages;
  }

  /**
   * Mostrar botones de primera y última página.
   * @default true
   */
  @Input({ transform: booleanAttribute }) showFirstLast: boolean = true;

  /**
   * Indica si el paginador está deshabilitado.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /**
   * Número total de items/resultados.
   * Necesario para mostrar el rango de items y calcular páginas si itemsPerPage está configurado.
   */
  @Input() totalItems?: number;

  /**
   * Items por página.
   * @default 10
   */
  _itemsPerPage: WritableSignal<number> = signal(10);
  @Input()
  set itemsPerPage(value: number) {
    // Validación robusta
    if (value == null || isNaN(value) || !isFinite(value)) return;

    const validValue = Math.max(1, Math.floor(value));

    // Solo actualizar si el valor cambió
    if (validValue !== this._itemsPerPage()) {
      this._itemsPerPage.set(validValue);
    }
  }
  get itemsPerPage(): number {
    return this._itemsPerPage();
  }

  /**
   * Opciones para el selector de items por página.
   * @default [10, 25, 50, 100]
   */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  /**
   * Mostrar selector de items por página.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showPageSizeSelector: boolean = false;

  /**
   * Mostrar información del rango de items.
   * Ejemplo: "Mostrando 11-20 de 150 resultados"
   * @default true
   */
  @Input({ transform: booleanAttribute }) showItemRange: boolean = true;

  /**
   * Mostrar input para saltar a una página específica.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showPageJump: boolean = false;

  /**
   * Scroll automático al cambiar página.
   * @default false
   */
  @Input({ transform: booleanAttribute }) autoScroll?: boolean;

  /**
   * Elemento target para scroll (selector CSS o elemento).
   * @default 'body'
   */
  @Input() scrollTarget?: string | HTMLElement;

  /**
   * Configuración avanzada del componente.
   */
  @Input() config?: PaginatorConfig;

  /**
   * Modo de visualización del paginador.
   * - 'default': Modo estándar con todos los elementos visibles
   * - 'compact': Solo anterior/siguiente y página actual (+ primera/última si está habilitado)
   * - 'fractional': Anterior/siguiente + página actual/total (ej: "3 de 10")
   * - 'minimal': Solo flechas anterior/siguiente
   * @default 'default'
   */
  @Input() mode: PaginatorMode = 'default';

  /**
   * Configuración de layout para posicionar elementos del paginador.
   * Permite especificar qué elementos aparecen en cada área (top, left, center, right, bottom)
   * y cómo se distribuyen (dirección, alineación, espaciado).
   * Esta configuración es opcional; si no se proporciona, se usa el layout definido en la configuración global.
   * @example
   * // Layout con elementos arriba y centro
   * [layout]="{
   *   top: ['itemRange', 'pageSize'],
   *   center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
   *   direction: 'row',
   *   gap: 'md'
   * }"
   */
  @Input() layout?: PaginatorLayout;

  /**
   * Configuración personalizada del layout específico para móviles.
   * Se usa automáticamente cuando el dispositivo es móvil y el modo es 'compact'.
   * Si no se especifica, se usa la configuración global de mobileLayout.
   * @example
   * // Layout vertical optimizado para móvil
   * [mobileLayout]="{
   *   top: ['itemRange'],
   *   center: ['firstButton', 'prevButton', 'currentPage', 'nextButton', 'lastButton'],
   *   bottom: ['pageSize'],
   *   direction: 'column',
   *   gap: '0.75rem'
   * }"
   */
  @Input() mobileLayout?: PaginatorLayout;

  /**
   * Detectar automáticamente dispositivos móviles y cambiar a modo 'fractional'.
   * Cuando está activo, el paginador cambia automáticamente a modo 'fractional' en dispositivos móviles,
   * @default true
   */
  @Input({ transform: booleanAttribute }) autoMobile: boolean = true;

  /**
   * Autoajustar el paginador para envolver los botones en pantallas pequeñas.
   * @default true
   */
  @Input({ transform: booleanAttribute }) autoWrap: boolean = true;

  /**
   * Configuración de iconos personalizables.
   */
  _iconConfig?: IconConfig;
  @Input()
  set iconConfig(value: IconConfig | undefined) {
    this._iconConfig = value;
    this.applyIconConfiguration();
  }
  get iconConfig(): IconConfig | undefined {
    return this._iconConfig;
  }

  /**
   * Iconos específicos que sobreescriben la configuración global.
   * Se puede usar para cambiar iconos específicos sin afectar la configuración global.
   * @example
   * [icons]="{ next: 'custom-next-icon', previous: 'custom-prev-icon' }"
   */
  _icons?: Partial<IconConfig>;
  @Input()
  set icons(value: Partial<IconConfig> | undefined) {
    this._icons = value;
    this.applyIconConfiguration();
  }
  get icons(): Partial<IconConfig> | undefined {
    return this._icons;
  }

  /**
   * Configuración del modo infinito.
   */
  @Input() infiniteConfig?: InfiniteConfig;

  /**
   * Evento que se emite cuando cambia la página.
   * Emite el número de la nueva página (1-indexed).
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Evento que se emite cuando cambia el tamaño de página.
   * Emite el nuevo número de items por página.
   */
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Evento avanzado que se emite cuando cambia la página con más información.
   */
  @Output() pageChangeAdvanced: EventEmitter<PageChangeEvent> =
    new EventEmitter<PageChangeEvent>();

  /**
   * Evento avanzado que se emite cuando cambia el tamaño de página con más información.
   */
  @Output() pageSizeChangeAdvanced: EventEmitter<PageSizeChangeEvent> =
    new EventEmitter<PageSizeChangeEvent>();

  /**
   * Signal computado que devuelve si estamos en la primera página
   */
  isFirstPage = computed(() => this._currentPage() === 1);

  /**
   * Signal computado que devuelve si estamos en la última página
   */
  isLastPage = computed(() => this._currentPage() === this._totalPages());

  /**
   * Signal computado que devuelve el array de números de página a mostrar
   */
  visiblePages = computed(() => {
    return this.calculateVisiblePages();
  });

  /**
   * Signal para el input de salto de página
   */
  pageJumpValue = signal<string>('');

  /**
   * Estado de loading
   */
  isLoading = signal<boolean>(false);

  /**
   * Mensaje para aria-live
   */
  ariaLiveMessage = signal<string>('');

  /**
   * Configuración de iconos aplicada
   */
  appliedIconConfig = signal<Required<IconConfig>>({
    first: 'ri-arrow-left-double-line',
    previous: 'ri-arrow-left-s-line',
    next: 'ri-arrow-right-s-line',
    last: 'ri-arrow-right-double-line',
    loadMore: 'ri-add-line',
    loading: 'ri-loader-4-line',
    prefix: 'ri-',
  });

  /**
   * Estado del modo infinito
   */
  infiniteState = signal<InfiniteState>({
    isLoading: false,
    hasMore: true,
    loadedItems: 0,
    loadCount: 0,
  });

  /**
   * Computed para el rango de items que se están mostrando
   */
  itemRange = computed(() => {
    if (!this.totalItems) return null;

    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

    return { start, end, total: this.totalItems };
  });

  /**
   * Signal para detectar dispositivos móviles
   */
  isMobileDevice = signal(this.detectMobileDevice());

  /**
   * Computed para el modo efectivo del paginador.
   * Prioriza en este orden:
   * 1. Si hay layout explícito → NO aplicar autoMobile ni protecciones (control total del desarrollador)
   * 2. autoMobile → detectar móvil y cambiar a fractional automáticamente
   * 3. protección automática en móvil → evitar configuraciones problemáticas
   * 4. modo explícito o default
   * @return {PaginatorMode}
   */
  effectiveMode = computed<PaginatorMode>(() => {
    // FILOSOFÍA: Layout explícito = control total del desarrollador
    // NO aplicar autoMobile ni protecciones automáticas
    if (this.layout) {
      return this.mode; // Respetar modo explícito sin ninguna modificación
    }

    // AutoMobile solo si NO hay layout personalizado
    if (this.autoMobile && this.isMobileDevice()) {
      return 'fractional';
    }

    // Protección automática SOLO sin layout
    if (this.isMobileDevice() && this.mode === 'default') {
      if (
        (this.totalPages > 2 && this.showFirstLast) ||
        (this.totalPages > 2 && this.maxVisiblePages > 3 && !this.showFirstLast)
      ) {
        return 'fractional';
      }
    }

    return this.mode;
  });

  /**
   * Computed para el layout efectivo del paginador.
   * Considera layout explícito, mobileLayout y configuración global.
   * Prioriza en este orden:
   * 1. layout explícito
   * 2. mobileLayout en móvil + fractional
   * 3. layout global en modo default
   * @return {PaginatorLayout | undefined}
   */
  effectiveLayout = computed<PaginatorLayout | undefined>(() => {
    const currentMode = this.effectiveMode();
    const isMobile = this.isMobileDevice();

    // 1. Layout explícito SIEMPRE tiene prioridad
    if (this.layout) {
      return this.layout;
    }

    // 2. Layout para modo infinito
    if (this.isInfiniteMode()) {
      if (this.paginatorConfig.infiniteLayout) {
        return this.paginatorConfig.infiniteLayout;
      }
    }

    // 3. MobileLayout en móvil + fractional
    if (isMobile && currentMode === 'fractional') {
      if (this.mobileLayout) return this.mobileLayout;
      if (this.paginatorConfig.mobileLayout)
        return this.paginatorConfig.mobileLayout;
    }

    // 4. Layout global solo en modo default
    if (currentMode !== 'default') {
      return undefined;
    }

    if (this.paginatorConfig.layout) {
      return this.paginatorConfig.layout;
    }

    return undefined;
  });

  /**
   * Computed para el tamaño efectivo del paginador.
   * En móviles, reduce automáticamente el tamaño para mejorar UX.
   * Si el desarrollador especifica un tamaño explícito, se respeta siempre.
   */
  effectiveSize = computed<NUISize>(() => {
    // Si el desarrollador estableció un tamaño explícitamente, usarlo siempre
    if (this._hasExplicitSize) {
      return this._size();
    }

    // En móviles sin tamaño explícito, reducir automáticamente el tamaño
    if (this.isMobileDevice()) {
      const sizeMap: Record<NUISize, NUISize> = {
        xl: 'lg',
        lg: 'md',
        md: 's',
        sm: 'xs',
        s: 'xs',
        xs: 'xs',
      };
      return sizeMap[this._size()];
    }

    return this._size();
  });

  /**
   * Computed para el número máximo de páginas visibles efectivo.
   * En móviles, reduce automáticamente el número de páginas visibles para mejorar UX.
   * Si el desarrollador especifica explícitamente el valor, se respeta siempre.
   */
  effectiveMaxVisiblePages = computed<number>(() => {
    // Si el desarrollador configuró explícitamente, respetar siempre
    if (this._hasExplicitMaxVisiblePages) {
      return this.maxVisiblePages;
    }

    // En móviles sin configuración explícita, reducir automáticamente
    if (this.isMobileDevice()) {
      // Reducir proporcionalmente: valores grandes → 3, valores medianos → 2, valores pequeños → mantener
      if (this.maxVisiblePages >= 7) return 3;
      if (this.maxVisiblePages >= 5) return 2;
      return Math.max(1, this.maxVisiblePages);
    }

    return this.maxVisiblePages;
  });

  /**
   * Opciones para el selector de tamaño de página
   */
  pageSizeOptionsData = computed<ButtonGroupOption[]>(() => {
    return this.pageSizeOptions.map((size) => ({
      label: size.toString(),
      value: size.toString(),
    }));
  });

  constructor() {
    // Inicializamos los atributos con los valores de configuración global o por defecto
    this._size.set(this.globalConfig.defaultSize || DEFAULT_SIZE);
    this._color.set(this.globalConfig.defaultColor || DEFAULT_COLOR);
  }

  ngOnInit(): void {
    // Inicializar configuraciones desde el provider
    this.initializeFromProvider();

    // Aplicar configuración avanzada si está disponible
    this.applyConfiguration();

    // Validación inicial
    if (this.currentPage < 1) {
      this._currentPage.set(1);
    }
    if (this.currentPage > this.totalPages) {
      this._currentPage.set(this.totalPages);
    }

    // Configurar navegación por teclado
    this.setupKeyboardNavigation();
  }

  /**
   * Inicializa las configuraciones desde el provider global
   */
  private initializeFromProvider(): void {
    // Usar valores del provider si no se han proporcionado inputs
    if (this.autoScroll === undefined) {
      this.autoScroll = this.paginatorConfig.config?.autoScroll || false;
    }
    if (this.scrollTarget === undefined) {
      this.scrollTarget = this.paginatorConfig.config?.scrollTarget || 'body';
    }

    // Configurar teclado
    this.keyboardConfig = {
      // Fallbacks por defecto para evitar problemas si no hay configuración global
      firstPage: ['Home'],
      lastPage: ['End'],
      previousPage: ['ArrowLeft'],
      nextPage: ['ArrowRight'],
      enabled: true,
      // Override con config global si existe que sobreescribirá los valores por defecto
      ...(this.paginatorConfig.keyboard || {}),
    };

    // Aplicar configuración de iconos
    this.applyIconConfiguration();
  }

  /**
   * Aplica la configuración avanzada
   */
  private applyConfiguration(): void {
    if (!this.config) return;

    // Aplicar configuración básica
    if (this.config.maxVisiblePages !== undefined) {
      this.maxVisiblePages = this.config.maxVisiblePages;
    }
    if (this.config.showFirstLast !== undefined) {
      this.showFirstLast = this.config.showFirstLast;
    }
    if (this.config.showPageSizeSelector !== undefined) {
      this.showPageSizeSelector = this.config.showPageSizeSelector;
    }
    if (this.config.showItemRange !== undefined) {
      this.showItemRange = this.config.showItemRange;
    }
    if (this.config.showPageJump !== undefined) {
      this.showPageJump = this.config.showPageJump;
    }
    if (this.config.pageSizeOptions) {
      this.pageSizeOptions = this.config.pageSizeOptions;
    }
    if (this.config.autoScroll !== undefined) {
      this.autoScroll = this.config.autoScroll;
    }
    if (this.config.scrollTarget !== undefined) {
      this.scrollTarget = this.config.scrollTarget;
    }

    // Aplicar configuraciones adicionales
    this.applyIconConfiguration();
  }

  ngOnDestroy(): void {
    // Los observables se limpian automáticamente con takeUntilDestroyed
    // Limpiar caché si es necesario
    this._visiblePagesCache.clear();
  }

  /**
   * Aplica la configuración de iconos
   * @return {void}
   */
  private applyIconConfiguration(): void {
    const config = {
      ...this.paginatorConfig.icons,
      ...this.iconConfig,
      ...this.icons,
    };
    this.appliedIconConfig.set(config as Required<IconConfig>);
  }

  /**
   * Obtiene el icono para un tipo específico
   * @param {keyof IconConfig} type - Tipo de icono
   * @return {string} - Nombre del icono
   */
  getIcon(type: keyof IconConfig): string {
    const config = this.appliedIconConfig();
    return config[type] || '';
  }

  /**
   * Carga más elementos en modo infinito
   * @return {Promise<void>}
   */
  async loadMore(): Promise<void> {
    if (!this.infiniteConfig?.enabled || this.infiniteState().isLoading) return;

    const config = { ...this.paginatorConfig.infinite, ...this.infiniteConfig };
    const currentState = this.infiniteState();

    // En modo infinito, respetar totalPages como límite principal
    // Si ya estamos en la última página, no cargar más
    if (this.currentPage >= this.totalPages) {
      this.infiniteState.update((state) => ({ ...state, hasMore: false }));
      return;
    }

    // Verificar límite de maxItems si está configurado
    const maxItems = config.maxItems || this.totalPages * this.itemsPerPage;
    if (currentState.loadedItems >= maxItems) {
      this.infiniteState.update((state) => ({ ...state, hasMore: false }));
      return;
    }

    // Establecer estado de carga
    this.infiniteState.update((state) => ({ ...state, isLoading: true }));

    try {
      // Incrementar la página actual para el modo infinito
      const previousPage = this.currentPage;
      const newPage = previousPage + 1;
      this._currentPage.set(newPage);

      // Emitir evento de cambio de página
      this.pageChange.emit(newPage);

      // Emitir evento avanzado con más información
      const advancedEvent: PageChangeEvent = {
        page: newPage,
        previousPage: previousPage,
        itemsPerPage: this.itemsPerPage,
        totalPages: this.totalPages,
      };
      this.pageChangeAdvanced.emit(advancedEvent);

      // Ejecutar callback de carga
      if (config.onLoadMore && typeof config.onLoadMore === 'function') {
        await config.onLoadMore();
      }

      // Calcular el número de items cargados en esta iteración
      const itemsToLoad = config.itemsPerLoad || this.itemsPerPage;
      const newLoadedItems = currentState.loadedItems + itemsToLoad;

      // Verificar si hay más páginas disponibles después de esta carga
      const willHaveMore =
        newPage < this.totalPages && newLoadedItems < maxItems;

      // Actualizar estado después de cargar
      this.infiniteState.update((state) => ({
        ...state,
        isLoading: false,
        loadedItems: newLoadedItems,
        loadCount: state.loadCount + 1,
        hasMore: willHaveMore,
      }));

      // Actualizar mensaje de accesibilidad
      this.updateAriaLiveMessage(newPage);

      // Limpiar caché
      this._visiblePagesCache.clear();
    } catch (error) {
      // Manejar error de carga
      this.infiniteState.update((state) => ({ ...state, isLoading: false }));
      console.error('Error al cargar más elementos:', error);
    }
  }

  /**
   * Verifica si el modo infinito está habilitado
   * @return {boolean}
   */
  isInfiniteMode(): boolean {
    return this.infiniteConfig?.enabled || false;
  }

  /**
   * Obtiene el texto del botón "Cargar más"
   * @return {string}
   */
  getLoadMoreText(): string {
    const config = { ...this.paginatorConfig.infinite, ...this.infiniteConfig };
    return config.loadMoreText || this._translations.paginator.loadMore;
  }

  /**
   * Obtiene el texto de carga
   * @return {string}
   */
  getLoadingText(): string {
    const config = { ...this.paginatorConfig.loading, ...this.infiniteConfig };
    return config.loadingText || this._translations.paginator.loading;
  }

  /**
   * Obtiene el estado completo del paginador
   * @return {PaginatorState}
   */
  getCurrentState(): PaginatorState {
    const range = this.itemRange();

    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.totalItems,
      isFirstPage: this.isFirstPage(),
      isLastPage: this.isLastPage(),
      visiblePages: this.visiblePages(),
      itemRange: range
        ? {
            start: range.start,
            end: range.end,
            total: range.total,
          }
        : undefined,
    };
  }

  /**
   * Configurar navegación por teclado
   * Permite navegar con flechas (cambian foco Y página inmediatamente)
   * y atajos Home/End para primera/última página
   */
  private setupKeyboardNavigation(): void {
    if (!this.keyboardConfig.enabled) return;

    // Escuchar eventos de teclado en FASE DE CAPTURA para interceptar antes que el navegador
    fromEvent<KeyboardEvent>(document, 'keydown', { capture: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        // Solo procesar si el foco está en el componente paginador
        const target = event.target as HTMLElement;
        if (!this.isWithinPaginator(target)) return;

        this.handleKeyboardNavigation(event, target);
      });
  }

  /**
   * Verificar si el elemento está dentro de ESTE paginador específico
   * @param {HTMLElement} element - Elemento a verificar
   * @return {boolean} - True si está dentro de ESTE paginador, false en caso contrario
   */
  private isWithinPaginator(element: HTMLElement): boolean {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    return hostElement.contains(element);
  }

  /**
   * Maneja la navegación por teclado
   * Implementa:
   * - Flechas ←/→: Cambian página Y mueven foco inmediatamente
   * - Home/End: Primera/última página con cambio inmediato
   * - Tab/Shift+Tab: Navegación estándar del navegador (no interceptamos)
   *
   * @param {KeyboardEvent} event - Evento de teclado
   * @param {HTMLElement} target - Elemento que tiene el foco
   */
  private handleKeyboardNavigation(
    event: KeyboardEvent,
    target: HTMLElement
  ): void {
    const { key } = event;

    // Solo interceptar teclas de navegación si el foco está en un botón del paginador
    const isPageButton = target.hasAttribute('data-paginator-button');

    // Home: Ir a primera página
    if (this.keyboardConfig.firstPage?.includes(key)) {
      event.preventDefault();
      event.stopPropagation(); // Evitar que el navegador haga scroll
      this.goToFirstPage();
      // Enfocar el botón de la página 1 después del cambio
      setTimeout(() => this.focusPageButton(1), 50);
      return;
    }

    // End: Ir a última página
    if (this.keyboardConfig.lastPage?.includes(key)) {
      event.preventDefault();
      event.stopPropagation(); // Evitar que el navegador haga scroll
      this.goToLastPage();
      // Enfocar el botón de la última página después del cambio
      setTimeout(() => this.focusPageButton(this.totalPages), 50);
      return;
    }

    // Flechas solo funcionan si el foco está en un botón de página
    if (!isPageButton) return;

    // Flecha izquierda: Página anterior
    if (
      key === 'ArrowLeft' ||
      this.keyboardConfig.previousPage?.includes(key)
    ) {
      event.preventDefault();
      if (!this.isFirstPage()) {
        const targetPage = this.currentPage - 1;
        this.goToPreviousPage();
        // Enfocar el botón de la página anterior después del cambio
        setTimeout(() => this.focusPageButton(targetPage), 50);
      }
      return;
    }

    // Flecha derecha: Página siguiente
    if (key === 'ArrowRight' || this.keyboardConfig.nextPage?.includes(key)) {
      event.preventDefault();
      if (!this.isLastPage()) {
        const targetPage = this.currentPage + 1;
        this.goToNextPage();
        // Enfocar el botón de la página siguiente después del cambio
        setTimeout(() => this.focusPageButton(targetPage), 50);
      }
      return;
    }
  }

  /**
   * Enfoca un botón de página específico si está visible EN ESTE PAGINADOR
   * @param {number} pageNumber - Número de página a enfocar
   */
  private focusPageButton(pageNumber: number): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;

    // Buscar el botón de la página específica SOLO en este paginador
    const buttons = hostElement.querySelectorAll(
      '.nui-paginator__button--page'
    );

    for (const button of Array.from(buttons)) {
      const buttonElement = button as HTMLButtonElement;
      const buttonText = buttonElement.textContent?.trim();

      if (buttonText === pageNumber.toString()) {
        buttonElement.focus();
        return;
      }
    }

    // Si el botón no está visible (por maxVisiblePages), enfocar el primer botón navegable de ESTE paginador
    const firstButton = hostElement.querySelector(
      '.nui-paginator__button:not([disabled])'
    ) as HTMLButtonElement;
    if (firstButton) {
      firstButton.focus();
    }
  }

  /**
   * Calcula qué páginas deben ser visibles en el paginador con memoización
   * @return {(number | string)[]}
   */
  private calculateVisiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = this.effectiveMaxVisiblePages();

    // Crear clave para caché
    const cacheKey = `${total}-${current}-${maxVisible}`;

    // Verificar caché
    if (this._visiblePagesCache.has(cacheKey)) {
      return this._visiblePagesCache.get(cacheKey)!;
    }

    // Si hay pocas páginas, mostrar todas
    if (total <= maxVisible) {
      const result = Array.from({ length: total }, (_, i) => i + 1);
      this._visiblePagesCache.set(cacheKey, result);
      return result;
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, current - halfVisible);
    let endPage = Math.min(total, current + halfVisible);

    // Ajustar el rango si está al inicio o al final
    if (current <= halfVisible) {
      endPage = maxVisible;
    } else if (current >= total - halfVisible) {
      startPage = total - maxVisible + 1;
    }

    // Añadir primera página y ellipsis si es necesario
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
    }

    // Añadir páginas visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Añadir ellipsis y última página si es necesario
    if (endPage < total) {
      if (endPage < total - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(total);
    }

    // Guardar en caché (limitar tamaño del caché)
    if (this._visiblePagesCache.size > 100) {
      const firstKey = this._visiblePagesCache.keys().next().value;
      if (firstKey) {
        this._visiblePagesCache.delete(firstKey);
      }
    }
    this._visiblePagesCache.set(cacheKey, pages);

    return pages;
  }

  /**
   * Navega a la primera página
   */
  goToFirstPage(): void {
    if (!this.disabled && !this.isFirstPage()) {
      this.goToPage(1);
    }
  }

  /**
   * Navega a la página anterior
   */
  goToPreviousPage(): void {
    if (!this.disabled && !this.isFirstPage()) {
      this.goToPage(this.currentPage - 1);
    }
  }

  /**
   * Navega a la página siguiente
   */
  goToNextPage(): void {
    if (!this.disabled && !this.isLastPage()) {
      this.goToPage(this.currentPage + 1);
    }
  }

  /**
   * Navega a la última página
   */
  goToLastPage(): void {
    if (!this.disabled && !this.isLastPage()) {
      this.goToPage(this.totalPages);
    }
  }

  /**
   * Navega a una página específica
   * @param {number} page - Número de página al que navegar
   */
  goToPage(page: number): void {
    if (this.disabled) return;

    // Validación robusta
    if (page == null || isNaN(page) || !isFinite(page)) return;

    const newPage = Math.max(1, Math.min(Math.floor(page), this.totalPages));
    const previousPage = this.currentPage;

    if (newPage !== previousPage) {
      this._currentPage.set(newPage);

      // Actualizar mensaje de accesibilidad
      this.updateAriaLiveMessage(newPage);

      // Emitir evento simple (backward compatibility)
      this.pageChange.emit(newPage);

      // Emitir evento avanzado con más información
      const advancedEvent: PageChangeEvent = {
        page: newPage,
        previousPage: previousPage,
        itemsPerPage: this.itemsPerPage,
        totalPages: this.totalPages,
      };
      this.pageChangeAdvanced.emit(advancedEvent);

      // Realizar auto-scroll si está habilitado
      this.performAutoScroll();

      // Limpiar caché
      this._visiblePagesCache.clear();

      // Scroll automático si está habilitado
      this.performAutoScroll();
    }
  }

  /**
   * Verifica si una página está activa
   * @param {number | string} page - Número o identificador de página
   * @return {boolean} - True si la página está activa, false en caso contrario
   */
  isPageActive(page: number | string): boolean {
    return typeof page === 'number' && page === this.currentPage;
  }

  /**
   * Verifica si un elemento de página es un ellipsis
   * @param {number | string} page - Número o identificador de página
   * @return {boolean} - True si es un ellipsis, false en caso contrario
   */
  isEllipsis(page: number | string): boolean {
    return typeof page === 'string' && page.startsWith('ellipsis');
  }

  /**
   * Obtiene el texto a mostrar para un ellipsis.
   * Se usa 'ellipsis-start' y 'ellipsis-end' como identificadores para
   * diferenciar entre ellipsis al inicio y al final.
   * @param {string} page - Identificador de ellipsis
   * @return {string} - Texto del ellipsis
   */
  getEllipsisText(page: string): string {
    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
      return '...';
    }
    return page;
  }

  /**
   * Obtiene la etiqueta ARIA para un ellipsis
   * @param {string} page - Identificador de ellipsis
   * @return {string} - Etiqueta ARIA del ellipsis
   */
  getEllipsisAriaLabel(page: string): string {
    if (page === 'ellipsis-start') {
      return 'Páginas anteriores';
    } else if (page === 'ellipsis-end') {
      return 'Páginas siguientes';
    }
    return 'Más páginas';
  }

  /**
   * Cambia el tamaño de página
   * @param {string} size - Nuevo tamaño de página como string
   */
  onPageSizeChange(size: string): void {
    const newSize = parseInt(size, 10);
    if (isNaN(newSize) || newSize < 1) return;

    const previousSize = this.itemsPerPage;

    this._itemsPerPage.set(newSize);

    // Emitir evento simple (backward compatibility)
    this.pageSizeChange.emit(newSize);

    // Recalcular totalPages si tenemos totalItems
    let newTotalPages = this.totalPages;
    if (this.totalItems) {
      newTotalPages = Math.ceil(this.totalItems / newSize);
      this._totalPages.set(newTotalPages);

      // Si la página actual queda fuera del nuevo rango, ajustar
      if (this.currentPage > newTotalPages) {
        this._currentPage.set(newTotalPages);
      }
    }

    // Emitir evento avanzado con más información
    const advancedEvent: PageSizeChangeEvent = {
      pageSize: newSize,
      previousPageSize: previousSize,
      currentPage: this.currentPage,
      totalPages: newTotalPages,
    };
    this.pageSizeChangeAdvanced.emit(advancedEvent);

    // Limpiar caché
    this._visiblePagesCache.clear();

    // Actualizar mensaje de accesibilidad
    this.updateAriaLiveMessage(this.currentPage);
  }

  /**
   * Maneja el salto a una página específica desde el input
   */
  handlePageJump(): void {
    const pageValue = this.pageJumpValue();
    const pageNum = parseInt(pageValue, 10);

    if (isNaN(pageNum) || pageNum < 1 || pageNum > this.totalPages) {
      // Mostrar mensaje de error accesible
      this.ariaLiveMessage.set(
        this._translations.paginator.pageJumpHelp.replace(
          '{totalPages}',
          this.totalPages.toString()
        )
      );
      this.pageJumpValue.set('');
      return;
    }

    this.goToPage(pageNum);
    this.pageJumpValue.set('');
  }

  /**
   * Realiza scroll automático si está habilitado
   */
  private performAutoScroll(): void {
    if (!this.autoScroll) return;

    let element: HTMLElement | null = null;
    const scrollTarget =
      this.scrollTarget || this.paginatorConfig.config?.scrollTarget || 'body';

    if (typeof scrollTarget === 'string') {
      element = document.querySelector(scrollTarget);
    } else {
      element = scrollTarget;
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      // Fallback a window scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  /**
   * Formatea el texto del rango de items usando la traducción
   * @return {string} - Texto formateado del rango de items
   */
  getItemRangeText(): string {
    const range = this.itemRange();
    if (!range) return '';

    return this._translations.paginator.showingItems
      .replace('{start}', range.start.toString())
      .replace('{end}', range.end.toString())
      .replace('{total}', range.total.toString());
  }

  /**
   * Formatea el texto para el contador de la carga infinita
   * @return {string} - Texto formateado del estado de carga infinita
   */
  getInfiniteLoadedText(): string {
    const state = this.infiniteState();
    const loadedText = this._translations.paginator.infiniteLoadedItems.replace(
      '{loaded}',
      state.loadedItems.toString()
    );

    if (
      !state.hasMore ||
      this.totalItems === undefined ||
      this.totalItems === null ||
      this.totalItems === 0
    ) {
      return loadedText;
    }

    return `${loadedText} ${this._translations.paginator.infiniteLoadHasMore.replace(
      '{total}',
      this.totalItems.toString()
    )}`;
  }

  /**
   * Genera etiqueta ARIA dinámica para una página
   * @param {number | string} page - Número o identificador de página
   * @return {string} - Etiqueta ARIA para la página
   */
  getPageAriaLabel(page: number | string): string {
    if (typeof page === 'string')
      return this._translations.paginator.ariaMorePages;

    const isActive = this.isPageActive(page);
    const baseLabel = this._translations.paginator.ariaGoToPage.replace(
      '{page}',
      page.toString()
    );

    if (isActive)
      return this._translations.paginator.ariaCurrentPage.replace(
        '{page}',
        page.toString()
      );

    return this._translations.paginator.ariaGoToPage.replace(
      '{page}',
      page.toString()
    );
  }

  /**
   * Genera descripción ARIA para el estado actual
   * @return {string} - Descripción ARIA del estado actual
   */
  getAriaDescription(): string {
    const range = this.itemRange();
    if (range) {
      return this._translations.paginator.ariaCurrentPageWithRange
        .replace('{page}', this.currentPage.toString())
        .replace('{totalPages}', this.totalPages.toString())
        .replace('{start}', range.start.toString())
        .replace('{end}', range.end.toString())
        .replace('{total}', range.total.toString());
    }
    return this._translations.paginator.ariaCurrentPageNoRange
      .replace('{page}', this.currentPage.toString())
      .replace('{totalPages}', this.totalPages.toString());
  }

  /**
   * Actualiza el mensaje de aria-live para cambios de página
   * @param {number} page - Número de la nueva página
   */
  private updateAriaLiveMessage(page: number): void {
    const range = this.itemRange();
    let message = this._translations.paginator.ariaPage.replace(
      '{page}',
      page.toString()
    );

    if (this.totalPages != 0) {
      message = this._translations.paginator.ariaCurrentPageNoRange
        .replace('{page}', page.toString())
        .replace('{totalPages}', this.totalPages.toString());
    }

    if (range) {
      message +=
        ', ' +
        this._translations.paginator.ariaShowingItems
          .replace('{start}', range.start.toString())
          .replace('{end}', range.end.toString())
          .replace('{total}', range.total.toString());
    }

    this.ariaLiveMessage.set(message);

    clearTimeout(this.clearAriaLiveMsgTimeout);
    this.clearAriaLiveMsgTimeout = setTimeout(
      () => this.ariaLiveMessage.set(''),
      1000
    );
  }

  /**
   * Configura el estado de loading
   * @param {boolean} loading - Estado de loading
   */
  setLoading(loading: boolean): void {
    this.isLoading.set(loading);

    if (loading) {
      this.ariaLiveMessage.set(this._translations.paginator.ariaLoading);
    }
  }

  /**
   * Obtiene el estado completo del paginator
   * @return {PaginatorState}
   */
  getState(): PaginatorState {
    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.totalItems,
      isFirstPage: this.isFirstPage(),
      isLastPage: this.isLastPage(),
      visiblePages: this.visiblePages(),
      itemRange: this.itemRange() || undefined,
    };
  }

  /**
   * Detecta si el dispositivo es móvil basándose en el user agent y el ancho de pantalla
   * @return {boolean} - True si es un dispositivo móvil, false en caso contrario
   */
  private detectMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    // Detección por user agent
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileUserAgents = [
      'android',
      'webos',
      'iphone',
      'ipad',
      'ipod',
      'blackberry',
      'windows phone',
    ];

    const isMobileUserAgent = mobileUserAgents.some((agent) =>
      userAgent.includes(agent)
    );

    // Detección por ancho de pantalla (tablets y móviles)
    const isMobileScreen = window.innerWidth <= 768;

    return isMobileUserAgent || isMobileScreen;
  }

  /**
   * Actualiza la detección de dispositivo móvil (llamado por resize events)
   */
  private updateMobileDetection(): void {
    this.isMobileDevice.set(this.detectMobileDevice());
  }

  /**
   * Obtiene si debe mostrar un elemento específico basado en el modo actual
   * @param element - Tipo de elemento a evaluar
   * @returns `true` si debe mostrarse, `false` en caso contrario
   */
  shouldShowElement(
    element: 'firstLast' | 'pageNumbers' | 'pageJump' | 'itemRange' | 'pageSize'
  ): boolean {
    const mode = this.effectiveMode();

    switch (mode) {
      case 'minimal':
        return false; // Solo flechas anterior/siguiente

      case 'compact':
        // Solo anterior/siguiente, página actual y opcionalmente primera/última
        return element === 'firstLast';

      case 'fractional':
        // Anterior/siguiente + información fraccionada, opcionalmente primera/última
        return element === 'firstLast';

      case 'default':
      default:
        // Mostrar todos los elementos según configuración individual
        if (element === 'pageNumbers') return true; // Siempre mostrar números de página en modo default
        if (element === 'firstLast') return this.showFirstLast;
        if (element === 'pageJump') return this.showPageJump;
        if (element === 'itemRange') return this.showItemRange;
        if (element === 'pageSize') return this.showPageSizeSelector;
        return true;
    }
  }

  /**
   * Obtiene el texto para mostrar en modo fraccionado (ej: "3 de 10")
   * @return {string} - Texto formateado del modo fraccionado
   */
  getFractionalText(): string {
    return `${this.currentPage} de ${this.totalPages}`;
  }

  // ==================== Layout Methods ====================

  /**
   * Obtiene los elementos que deben renderizarse en un área específica del layout
   * @param {PaginatorLayoutArea} area Área del layout (top, left, center, right, bottom)
   * @returns {PaginatorElement[]} Array de elementos a renderizar en el área especificada
   */
  getElementsForArea(area: PaginatorLayoutArea): PaginatorElement[] {
    const layout = this.effectiveLayout();
    if (!layout) return [];

    return layout[area] || [];
  }

  /**
   * Determina si un elemento debe renderizarse basándose en el layout y sus condiciones de visibilidad.
   *
   * @param element - Tipo de elemento a evaluar
   * @returns `true` si debe renderizarse, `false` en caso contrario
   *
   * @remarks
   * Aplica dos verificaciones en orden:
   * 1. **Layout (DÓNDE)**: El elemento debe estar en alguna área del layout (top, left, center, right, bottom)
   * 2. **Visibilidad (SI)**: El elemento debe cumplir sus condiciones específicas (showFirstLast, showPageJump, etc.)
   *
   * Si no hay layout configurado, usa la lógica legacy basada en el modo actual.
   *
   * @example
   * // Elemento en layout pero condicionalmente oculto
   * shouldRenderElement('firstButton') // false si showFirstLast=false
   *
   * // Elemento con show*=true pero no en layout
   * shouldRenderElement('firstButton') // false si no está en ningún área del layout
   *
   * @see {@link shouldShowElementLegacy} Para la lógica cuando no hay layout configurado
   * @see {@link PaginatorLayout} Para la estructura del sistema de layouts
   * @see {@link PaginatorElement} Para los tipos de elementos disponibles
   *
   * @internal
   * Esta función es llamada internamente por el template durante el proceso de renderizado.
   * Los desarrolladores normalmente no necesitan llamarla directamente.
   */
  shouldRenderElement(element: PaginatorElement): boolean {
    const layout = this.effectiveLayout();

    // Si no hay layout configurado, usar la lógica basada en modo
    if (!layout) {
      return this.shouldShowElementLegacy(element);
    }

    // Verificar si el elemento está en alguna de las áreas del layout
    // Si el elemento no está en el layout, no se renderiza
    const isInLayout = this.isElementInLayout(element, layout);
    if (!isInLayout) {
      return false; // No está en el layout = no renderizar
    }

    // Verificar configuraciones específicas de visibilidad
    // FILOSOFÍA: Si el desarrollador puso el elemento en el layout explícitamente,
    // es porque quiere que se muestre. Solo verificar propiedades show* para elementos
    // que tienen implicaciones funcionales (firstButton, lastButton, pageJump)
    switch (element) {
      case 'firstButton':
      case 'lastButton':
        // Respetar showFirstLast porque tiene implicaciones funcionales
        return this.showFirstLast;

      case 'pageJump':
        // Respetar showPageJump porque tiene implicaciones funcionales
        return this.showPageJump;

      case 'pageSize':
        // Si está en el layout, mostrar siempre (el layout indica intención explícita)
        return this.showPageSizeSelector;

      case 'itemRange':
        // Si está en el layout, mostrar (solo verificar que haya datos)
        return this.showItemRange && !!this.itemRange();

      case 'infiniteCounter':
        // Mostrar solo en modo infinito si la configuración lo permite
        return (
          this.isInfiniteMode() && (this.infiniteConfig?.showCounter ?? true)
        );

      case 'infiniteButton':
        // Mostrar solo en modo infinito si la configuración lo permite
        return (
          this.isInfiniteMode() &&
          this.infiniteState().hasMore &&
          this.infiniteConfig?.mode !== 'scroll'
        );

      case 'infiniteEndMessage':
        // Mostrar solo en modo infinito cuando no hay más elementos
        return this.isInfiniteMode() && !this.infiniteState().hasMore;

      default:
        // Elementos que siempre se muestran si están en el layout
        return true;
    }
  }

  /**
   * Verifica si un elemento está presente en el layout
   * @param {PaginatorElement} element El elemento a verificar
   * @param {PaginatorLayout} layout El layout actual
   * @returns {boolean} Verdadero si el elemento está en el layout, falso en caso contrario
   */
  private isElementInLayout(
    element: PaginatorElement,
    layout: PaginatorLayout
  ): boolean {
    const areas: PaginatorLayoutArea[] = [
      'top',
      'left',
      'center',
      'right',
      'bottom',
    ];
    return areas.some((area) => {
      const elements = layout[area] || [];
      return elements.includes(element);
    });
  }

  /**
   * Lógica legacy para determinar visibilidad basada en modo (cuando no hay layout configurado)
   * @param {PaginatorElement} element El elemento a evaluar
   * @returns {boolean} Verdadero si debe mostrarse, falso en caso contrario
   */
  private shouldShowElementLegacy(element: PaginatorElement): boolean {
    const mode = this.effectiveMode();

    switch (mode) {
      case 'minimal':
        // Solo flechas anterior/siguiente
        return element === 'prevButton' || element === 'nextButton';

      case 'compact':
        // Anterior/siguiente, página actual y opcionalmente primera/última
        return (
          element === 'prevButton' ||
          element === 'nextButton' ||
          element === 'currentPage' ||
          (element === 'firstButton' && this.showFirstLast) ||
          (element === 'lastButton' && this.showFirstLast)
        );

      case 'fractional':
        // Anterior/siguiente + información fraccionada, opcionalmente primera/última
        return (
          element === 'prevButton' ||
          element === 'nextButton' ||
          element === 'fractionalNumbers' ||
          (element === 'firstButton' && this.showFirstLast) ||
          (element === 'lastButton' && this.showFirstLast)
        );

      case 'default':
      default:
        // Mostrar todos los elementos según configuración individual
        if (element === 'pageNumbers') return true; // Siempre mostrar números de página en modo default
        if (element === 'firstButton' || element === 'lastButton')
          return this.showFirstLast;
        if (element === 'pageJump') return this.showPageJump;
        if (element === 'itemRange') return this.showItemRange;
        if (element === 'pageSize') return this.showPageSizeSelector;
        // Botones de navegación siempre visibles
        if (element === 'prevButton' || element === 'nextButton') return true;
        if (element === 'currentPage') return false; // No se usa en modo default
        if (element === 'fractionalNumbers') return false; // No se usa en modo default
        return true;
    }
  }

  /**
   * Obtiene la dirección de flexbox para un área
   * @returns {PaginatorLayoutDirection} Dirección del layout
   */
  getLayoutDirection(): PaginatorLayoutDirection {
    const layout = this.effectiveLayout();
    return layout?.direction || 'row';
  }

  /**
   * Obtiene la alineación para un área
   * @returns {PaginatorLayoutAlign} Alineación del layout
   */
  getLayoutAlign(): PaginatorLayoutAlign {
    const layout = this.effectiveLayout();
    return layout?.align || 'center';
  }

  /**
   * Obtiene el espaciado gap
   * @returns {string} Gap del layout
   */
  getLayoutGap(): string {
    const layout = this.effectiveLayout();
    return layout?.gap || '0.5rem';
  }

  /**
   * Verifica si hay elementos en un área específica
   * @param {PaginatorLayoutArea} area Área del layout
   * @returns {boolean} True si hay elementos, false en caso contrario
   */
  hasElementsInArea(area: PaginatorLayoutArea): boolean {
    return this.getElementsForArea(area).length > 0;
  }

  // ==================== End Layout Methods ====================

  /**
   * Método público para limpiar la caché manualmente
   */
  clearCache(): void {
    this._visiblePagesCache.clear();
  }

  /**
   * Método público para recalcular páginas visibles
   */
  recalculateVisiblePages(): void {
    this.clearCache();
    // Forzar recálculo accediendo al computed
    this.visiblePages();
  }
}
