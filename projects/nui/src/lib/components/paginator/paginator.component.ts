import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  DestroyRef,
  ElementRef,
  signal,
  input,
  output,
  computed,
  model,
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
  NUI_SIZES,
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
  PLayoutAlign,
  PaginatorLayoutArea,
  PLayoutDirection,
  PaginatorMode,
  DEFAULT_PAGE_SIZE_OPTIONS,
  DEFAULT_MAX_VISIBLE_PAGES,
  DEFAULT_ITEMS_PER_PAGE,
  PaginatorModeEnum,
  DEFAULT_PAGINATOR_MODE,
  PAGINATOR_LAYOUT_AREAS,
  PLayoutDirectionEnum,
  DEFAULT_ICON_CONFIG,
  DEFAULT_INFINITE_STATE,
  DEFAULT_MINIMAL_LAYOUT,
  DEFAULT_COMPACT_LAYOUT,
  DEFAULT_FRACTIONAL_LAYOUT,
  DEFAULT_PAGINATOR_LAYOUT,
  PaginatorElementEnum,
  PLayoutAlignEnum,
  DEFAULT_GAP,
  PVerticalAlignEnum,
  PVerticalAlign,
  PaginatorLayoutAreaEnum,
} from './models/paginator.model';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { BtnGroupOption } from '../button-group/models/button-group.model';
import { ButtonDirective } from '../button/button.directive';

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
  imports: [CommonModule, FormsModule, ButtonGroupComponent, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Clase base para que el SCSS la detecte
    class: 'nui-paginator-container',

    // Clases condicionales (booleanos)
    '[class.nui-paginator-container--mobile]': 'isMobileDevice()',
    '[class.nui-paginator-container--wrap]': 'autoWrap()',
    '[class.nui-paginator-container--custom-layout]': 'effectiveLayout()',
    '[class.nui-paginator-container--layout-column]': 'getLayoutDirection() === "column"',

    // Clases dinámicas (Concatenación de strings para variantes)
    // Esto sustituye al [ngClass] del array
    '[class]':
      '"nui-paginator-container--" + effectiveSize() + " nui-paginator-container--" + color() + " nui-paginator-container--" + variant() + " nui-paginator-container--" + effectiveMode()',

    // Atributos de accesibilidad
    '[attr.aria-description]': 'getAriaDescription()',
  },
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private readonly globalConfig = inject(NUI_CONFIG);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  protected readonly _translations = inject(NUI_TRANSLATIONS);
  private readonly paginatorConfig: PaginatorGlobalConfig = this.globalConfig.paginator || {};

  // Caché para memoización de páginas visibles
  private _visiblePagesCache = new Map<string, (number | string)[]>();

  // Configuración de teclado
  private keyboardConfig: KeyboardConfig = {};

  // Temporizador para limpiar mensajes del aria-live
  private clearAriaLiveMsgTimeout?: ReturnType<typeof setTimeout>;

  /**
   * Color del paginador.
   * Valores posibles: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'accent'
   * @default 'primary' (o valor configurado globalmente)
   */
  color = model<NUIColor>(inject(NUI_CONFIG).defaultColor || DEFAULT_COLOR);

  /**
   * Tamaño del paginador.
   * Valores posibles: 'xs', 'sm', 'md', 'lg', 'xl'
   * @default 'md' (o valor configurado globalmente)
   */
  size = model<NUISize>(inject(NUI_CONFIG).defaultSize || DEFAULT_SIZE);

  /**
   * Variante visual del paginador.
   * - 'solid': Botón sólido con fondo de color completo (default)
   * - 'outline': Borde de color con fondo transparente
   * - 'ghost': Sin borde ni fondo, solo texto/icono
   * @default 'solid'
   */
  variant = input<NUIVariant>('solid');

  /**
   * Modo de visualización del paginador.
   * - 'default': Modo estándar con todos los elementos visibles
   * - 'compact': Solo anterior/siguiente y página actual (+ primera/última si está habilitado)
   * - 'fractional': Anterior/siguiente + página actual/total (ej: "3 de 10")
   * - 'minimal': Solo flechas anterior/siguiente
   * @default 'default'
   */
  mode = input<PaginatorMode>(DEFAULT_PAGINATOR_MODE);

  /**
   * Indica si el paginador está deshabilitado.
   * @default false
   */
  disabled = input(false, { transform: (value: unknown) => value === '' || value === true });

  /**
   * Número total de items/resultados.
   * Necesario para mostrar el rango de items y calcular páginas si itemsPerPage está configurado.
   */
  totalItems = input<number | undefined>(undefined);

  /**
   * Opciones para el selector de items por página.
   * @default DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] (o valor configurado globalmente)
   */
  pageSizeOptions = input<number[]>(DEFAULT_PAGE_SIZE_OPTIONS);

  /**
   * Mostrar selector de items por página.
   * Si no se especifica, se usará el valor de la configuración global.
   * @default undefined (usa config global)
   */
  showPageSizeSelector = input<boolean | undefined, boolean | string | undefined>(undefined, {
    transform: (value: boolean | string | undefined): boolean | undefined => {
      if (value === undefined || value === null) return undefined;
      return value === '' || value === true;
    },
  });

  /**
   * Mostrar información del rango de items.
   * Ejemplo: "Mostrando 11-20 de 150 resultados"
   * Si no se especifica, se usará el valor de la configuración global.
   * @default undefined (usa config global)
   */
  showItemRange = input<boolean | undefined, boolean | string | undefined>(undefined, {
    transform: (value: boolean | string | undefined): boolean | undefined => {
      if (value === undefined || value === null) return undefined;
      return value === '' || value === true;
    },
  });

  /**
   * Mostrar input para saltar a una página específica.
   * Si no se especifica, se usará el valor de la configuración global.
   * @default undefined (usa config global)
   */
  showPageJump = input<boolean | undefined, boolean | string | undefined>(undefined, {
    transform: (value: boolean | string | undefined): boolean | undefined => {
      if (value === undefined || value === null) return undefined;
      return value === '' || value === true;
    },
  });

  /**
   * Scroll automático al cambiar página.
   * @default false
   */
  autoScroll = input<boolean | undefined>(undefined);

  /**
   * Elemento target para scroll (selector CSS o elemento).
   * @default 'body'
   */
  scrollTarget = input<string | HTMLElement | undefined>(undefined);

  /**
   * Configuración avanzada del componente.
   */
  config = input<PaginatorConfig | undefined>(undefined);

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
  layout = input<PaginatorLayout | undefined>(undefined);

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
  mobileLayout = input<PaginatorLayout | undefined>(undefined);

  /**
   * Detectar automáticamente dispositivos móviles y cambiar a modo 'fractional'.
   * Cuando está activo, el paginador cambia automáticamente a modo 'fractional' en dispositivos móviles,
   * @default true
   */
  autoMobile = input(true, { transform: (value: unknown) => value === '' || value === true });

  /**
   * Autoajustar el paginador para envolver los botones en pantallas pequeñas.
   * @default true
   */
  autoWrap = input(true, { transform: (value: unknown) => value === '' || value === true });

  /**
   * Configuración de iconos personalizables.
   */
  iconConfig = input<IconConfig | undefined>(undefined);

  /**
   * Iconos específicos que sobreescriben la configuración global.
   * Se puede usar para cambiar iconos específicos sin afectar la configuración global.
   * @example
   * [icons]="{ next: 'custom-next-icon', previous: 'custom-prev-icon' }"
   */
  icons = input<Partial<IconConfig> | undefined>(undefined);

  /**
   * Configuración del modo infinito.
   */
  infiniteConfig = input<InfiniteConfig | undefined>(undefined);

  /**
   * Página actual (1-indexed).
   * @default 1
   */
  currentPage = model<number>(1);

  /**
   * Número total de páginas (para binding manual cuando NO hay totalItems).
   * Este input permite establecer manualmente el número de páginas.
   * Si se proporciona totalItems, este valor será ignorado y se calculará automáticamente.
   * @default 1
   */
  totalPagesInput = model<number>(1, { alias: 'totalPages' });

  /**
   * Número total de páginas (computed - solo lectura).
   * Si totalItems está definido, se calcula automáticamente como Math.ceil(totalItems / itemsPerPage).
   * De lo contrario, usa el valor manual establecido mediante [totalPages].
   */
  totalPages = computed(() => {
    const totalItems = this.totalItems();
    const itemsPerPage = this.itemsPerPage();

    // Si hay totalItems, calcular automáticamente
    if (totalItems !== undefined && totalItems > 0 && itemsPerPage > 0) {
      return Math.ceil(totalItems / itemsPerPage);
    }

    // De lo contrario, usar el valor manual del input
    return this.totalPagesInput();
  });

  /**
   * Número máximo de páginas visibles en el paginador.
   * El paginador mostrará un máximo de este número de botones de página.
   * @default DEFAULT_MAX_VISIBLE_PAGES = 5 (o valor configurado globalmente)
   */
  maxVisiblePages = input<number>(DEFAULT_MAX_VISIBLE_PAGES);

  /**
   * Mostrar botones de primera y última página.
   * Si no se especifica, se usará el valor de la configuración global.
   * @default undefined (usa config global)
   */
  showFirstLast = input<boolean | undefined, boolean | string | undefined>(undefined, {
    transform: (value: boolean | string | undefined): boolean | undefined => {
      if (value === undefined || value === null) return undefined;
      return value === '' || value === true;
    },
  });

  /**
   * Items por página.
   * @default DEFAULT_ITEMS_PER_PAGE = 10 (o valor configurado globalmente)
   */
  itemsPerPage = model<number>(DEFAULT_ITEMS_PER_PAGE);

  /**
   * Evento que se emite cuando cambia la página.
   * Emite el número de la nueva página (1-indexed).
   */
  pageChange = output<number>();

  /**
   * Evento que se emite cuando cambia el tamaño de página.
   * Emite el nuevo número de items por página.
   */
  pageSizeChange = output<number>();

  /**
   * Evento avanzado que se emite cuando cambia la página con más información.
   */
  pageChangeAdvanced = output<PageChangeEvent>();

  /**
   * Evento avanzado que se emite cuando cambia el tamaño de página con más información.
   */
  pageSizeChangeAdvanced = output<PageSizeChangeEvent>();

  /**
   * Valores efectivos que consideran la configuración global como fallback.
   * Estos computed signals leen primero del input explícito del usuario,
   * y si no está definido (undefined), usan el valor de la configuración global.
   */

  /**
   * Valor efectivo de showItemRange considerando configuración global
   */
  effectiveShowItemRange = computed(() => {
    const inputValue = this.showItemRange();
    // Si el input está explícitamente definido (true o false), usarlo
    // Sino, usar el valor de la configuración global, o true como último fallback
    return inputValue ?? this.paginatorConfig.config?.showItemRange ?? true;
  });

  /**
   * Valor efectivo de showPageJump considerando configuración global
   */
  effectiveShowPageJump = computed(() => {
    const inputValue = this.showPageJump();
    // Si el input está explícitamente definido (true o false), usarlo
    // Sino, usar el valor de la configuración global, o false como último fallback
    return inputValue ?? this.paginatorConfig.config?.showPageJump ?? false;
  });

  /**
   * Valor efectivo de showFirstLast considerando configuración global
   */
  effectiveShowFirstLast = computed(() => {
    const inputValue = this.showFirstLast();
    // Si el input está explícitamente definido (true o false), usarlo
    // Sino, usar el valor de la configuración global, o true como último fallback
    return inputValue ?? this.paginatorConfig.config?.showFirstLast ?? true;
  });

  /**
   * Valor efectivo de showPageSizeSelector considerando configuración global
   */
  effectiveShowPageSizeSelector = computed(() => {
    const inputValue = this.showPageSizeSelector();
    // Si el input está explícitamente definido (true o false), usarlo
    // Sino, usar el valor de la configuración global, o false como último fallback
    return inputValue ?? this.paginatorConfig.config?.showPageSizeSelector ?? false;
  });

  /**
   * Signal computado que devuelve si estamos en la primera página
   */
  isFirstPage = computed(() => this.currentPage() === 1);

  /**
   * Signal computado que devuelve si estamos en la última página
   */
  isLastPage = computed(() => this.currentPage() === this.totalPages());

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
  appliedIconConfig = signal<Required<IconConfig>>(DEFAULT_ICON_CONFIG);

  /**
   * Estado del modo infinito
   */
  infiniteState = signal<InfiniteState>(DEFAULT_INFINITE_STATE);

  /**
   * Computed para el rango de items que se están mostrando
   */
  itemRange = computed(() => {
    const total = this.totalItems();
    if (!total) return null;

    const current = this.currentPage();
    const perPage = this.itemsPerPage();
    const start = (current - 1) * perPage + 1;
    const end = Math.min(current * perPage, total);

    return { start, end, total };
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
    // Layout explícito = control total del desarrollador
    // NO aplicar autoMobile ni protecciones automáticas
    if (this.layout()) {
      return this.mode(); // Respetar modo explícito sin ninguna modificación
    }

    // AutoMobile solo si NO hay layout personalizado
    if (this.autoMobile() && this.isMobileDevice()) {
      return PaginatorModeEnum.FRACTIONAL; // Cambiar automáticamente a modo fractional en móviles
    }

    // Protección automática SOLO sin layout
    const currentMode = this.mode();
    if (this.isMobileDevice() && currentMode === PaginatorModeEnum.DEFAULT) {
      const total = this.totalPages();
      const showFirst = this.showFirstLast();
      const maxVisible = this.maxVisiblePages();

      if ((total > 2 && showFirst) || (total > 2 && maxVisible > 3 && !showFirst)) {
        return PaginatorModeEnum.FRACTIONAL;
      }
    }

    return currentMode;
  });

  /**
   * Genera un layout por defecto basado en el modo del paginador.
   * Este método garantiza que siempre haya un layout válido incluso cuando
   * no se proporciona configuración explícita.
   *
   * @param mode - Modo del paginador (default, minimal, compact, fractional)
   * @returns Layout configurado para el modo especificado
   *
   * @remarks
   * Layouts generados:
   * - **minimal**: Solo botones prev/next
   * - **compact**: Prev/next + página actual + opcionalmente first/last
   * - **fractional**: Prev/next + texto fraccionado (ej: "3 de 10") + opcionalmente first/last
   * - **default**: Layout completo con todas las opciones según las propiedades show*
   */
  private getDefaultLayoutForMode(mode: PaginatorMode): PaginatorLayout {
    switch (mode) {
      case PaginatorModeEnum.MINIMAL:
        // Solo botones de navegación básicos
        return DEFAULT_MINIMAL_LAYOUT;

      case PaginatorModeEnum.COMPACT:
        // Navegación compacta con página actual
        const compactElements: PaginatorElement[] = ['prevButton', 'currentPage', 'nextButton'];

        // Agregar first / last si está habilitado
        if (this.showFirstLast()) {
          compactElements.unshift('firstButton');
          compactElements.push('lastButton');
        }

        const defaultCompact = DEFAULT_COMPACT_LAYOUT;

        return {
          ...defaultCompact,
          center: compactElements,
        };

      case PaginatorModeEnum.FRACTIONAL:
        // Navegación con texto fraccionado (ej: "3 de 10")
        const fractionalElements: PaginatorElement[] = [
          'prevButton',
          'fractionalNumbers',
          'nextButton',
        ];

        // Agregar first/last si está habilitado
        if (this.showFirstLast()) {
          fractionalElements.unshift('firstButton');
          fractionalElements.push('lastButton');
        }

        const defaultFractional = DEFAULT_FRACTIONAL_LAYOUT;

        return {
          ...defaultFractional,
          center: fractionalElements,
        };

      case PaginatorModeEnum.DEFAULT:
      default:
        // Layout completo con 2 filas para mejor jerarquía visual
        const defaultLayout = DEFAULT_PAGINATOR_LAYOUT;

        // Fila superior: Controles secundarios e información
        if (this.showItemRange()) {
          defaultLayout.top!.push('itemRange');
        }
        if (this.showPageSizeSelector()) {
          defaultLayout.top!.push('pageSize');
        }
        if (this.showPageJump()) {
          defaultLayout.top!.push('pageJump');
        }

        // Fila central: Navegación principal (solo botones)
        if (this.showFirstLast()) {
          defaultLayout.center!.push('firstButton');
        }
        defaultLayout.center!.push('prevButton', 'pageNumbers', 'nextButton');
        if (this.showFirstLast()) {
          defaultLayout.center!.push('lastButton');
        }

        return defaultLayout;
    }
  }

  /**
   * Computed para el layout efectivo del paginador.
   * Considera layout explícito, mobileLayout y configuración global.
   * Siempre devuelve un layout válido, generando uno por defecto basado en el modo si es necesario.
   *
   * Prioriza en este orden:
   * 1. layout explícito
   * 2. infiniteLayout para modo infinito
   * 3. mobileLayout en móvil + fractional
   * 4. layout global
   * 5. layout por defecto basado en modo (FALLBACK - nunca undefined)
   *
   * @return {PaginatorLayout} Layout efectivo (nunca undefined)
   */
  effectiveLayout = computed<PaginatorLayout>(() => {
    const currentMode = this.effectiveMode();
    const isMobile = this.isMobileDevice();

    // 1. Layout explícito SIEMPRE tiene prioridad
    const explicitLayout = this.layout();
    if (explicitLayout) {
      return explicitLayout;
    }

    // 2. Layout para modo infinito
    if (this.isInfiniteMode()) {
      if (this.paginatorConfig.infiniteLayout) {
        return this.paginatorConfig.infiniteLayout;
      }
    }

    // 3. MobileLayout en móvil + fractional
    if (isMobile && currentMode === PaginatorModeEnum.FRACTIONAL) {
      const mobileLay = this.mobileLayout();
      if (mobileLay) return mobileLay;
      if (this.paginatorConfig.mobileLayout) return this.paginatorConfig.mobileLayout;
    }

    // 4. Layout global
    if (this.paginatorConfig.layout) {
      return this.paginatorConfig.layout;
    }

    // 5. FALLBACK: Generar layout por defecto basado en el modo
    // Esto garantiza que siempre haya un layout válido
    return this.getDefaultLayoutForMode(currentMode);
  });

  /**
   * Computed para el tamaño efectivo del paginador.
   * En móviles, reduce automáticamente el tamaño para mejorar UX.
   */
  effectiveSize = computed<NUISize>(() => {
    const currentSize = this.size();

    // En móviles, reducir automáticamente el tamaño
    if (this.isMobileDevice()) {
      // Mapa de reducción de tamaños: xl → lg, lg → md, md → sm, sm → xs, xs → xs
      const NUI_MOBILE_SIZE_MAP: Record<NUISize, NUISize> = NUI_SIZES.reduce(
        (acc, size, index, arr) => {
          acc[size] = arr[Math.max(index - 1, 0)];
          return acc;
        },
        {} as Record<NUISize, NUISize>
      );
      return NUI_MOBILE_SIZE_MAP[currentSize];
    }

    return currentSize;
  });

  /**
   * Computed para el número máximo de páginas visibles efectivo.
   * En móviles, reduce automáticamente el número de páginas visibles para mejorar UX.
   */
  effectiveMaxVisiblePages = computed<number>(() => {
    const maxVisible = this.maxVisiblePages();

    // En móviles, reducir automáticamente
    if (this.isMobileDevice()) {
      // Reducir proporcionalmente: valores grandes → 3, valores medianos → 2, valores pequeños → mantener
      if (maxVisible >= 7) return 3;
      if (maxVisible >= 5) return 2;
      return Math.max(1, maxVisible);
    }

    return maxVisible;
  });

  /**
   * Opciones para el selector de tamaño de página
   */
  pageSizeOptionsData = computed<BtnGroupOption[]>(() => {
    return this.pageSizeOptions().map((size: number) => ({
      label: size.toString(),
      tooltip: this._translations.paginator.itemsPerPage + ' ' + size.toString(),
      value: size.toString(),
    }));
  });

  constructor() {
    // Inicializar valores por defecto desde configuración global
    const defaultSize = this.globalConfig.defaultSize || DEFAULT_SIZE;
    const defaultColor = this.globalConfig.defaultColor || DEFAULT_COLOR;
    this.size.set(defaultSize);
    this.color.set(defaultColor);

    // Redimensión reactiva
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed()) // Detecta automáticamente el destroyRef por estar en el constructor
      .subscribe(() => {
        if (this.autoMobile()) {
          this.isMobileDevice.set(this.detectMobileDevice());
        }
      });
  }

  ngOnInit(): void {
    // Inicializar configuraciones desde el provider
    this.initializeFromProvider();

    // Detectar dispositivo móvil inicialmente
    this.isMobileDevice.set(this.detectMobileDevice());

    // Validación inicial
    const current = this.currentPage();
    const total = this.totalPages();

    // Asegurar que currentPage esté dentro de los límites válidos al iniciar
    if (current < 1) this.currentPage.set(1);

    // Si totalPages es 0 (no hay resultados), mantener currentPage en 1 para evitar estados inválidos
    if (current > total) this.currentPage.set(total);

    // Inicializar loadedItems en modo infinito
    const infiniteCfg = this.infiniteConfig();
    if (infiniteCfg?.enabled) {
      const itemsPerPage = this.itemsPerPage();
      const totalItems = this.totalItems();

      // Usar initialLoadedItems si está definido, sino calcular basándose en currentPage
      const loadedItems =
        infiniteCfg.initialLoadedItems !== undefined
          ? infiniteCfg.initialLoadedItems
          : current * itemsPerPage;

      this.infiniteState.update(state => ({
        ...state,
        loadedItems: loadedItems,
        hasMore: totalItems === undefined || loadedItems < totalItems,
      }));
    }

    // Configurar navegación por teclado
    this.setupKeyboardNavigation();
  }

  /**
   * Inicializa las configuraciones desde el provider global
   */
  private initializeFromProvider(): void {
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
      ...this.iconConfig(),
      ...this.icons(),
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
    const infiniteCfg = this.infiniteConfig();
    if (!infiniteCfg?.enabled || this.infiniteState().isLoading) return;

    const config = { ...this.paginatorConfig.infinite, ...infiniteCfg };
    const currentState = this.infiniteState();

    // Calcular cuántos items se van a cargar
    const itemsPerLoad = config.itemsPerLoad || this.paginatorConfig.infinite?.itemsPerLoad || 20;
    const potentialLoadedItems = currentState.loadedItems + itemsPerLoad;

    // Verificar límite de totalItems si está configurado
    const totalItems = this.totalItems();
    if (totalItems !== undefined && currentState.loadedItems >= totalItems) {
      this.infiniteState.update(state => ({ ...state, hasMore: false }));
      return;
    }

    // Verificar límite de maxItems si está configurado
    const maxItems = config.maxItems || 1000;
    if (currentState.loadedItems >= maxItems) {
      this.infiniteState.update(state => ({ ...state, hasMore: false }));
      return;
    }

    // Establecer estado de carga
    this.infiniteState.update(state => ({ ...state, isLoading: true }));

    try {
      // Ejecutar callback de carga
      if (config.onLoadMore && typeof config.onLoadMore === 'function') {
        await config.onLoadMore();
      }

      // Calcular los nuevos items cargados
      const newLoadedItems = currentState.loadedItems + itemsPerLoad;

      // Verificar si hay más items disponibles después de esta carga
      const willHaveMore =
        (totalItems === undefined || newLoadedItems < totalItems) && newLoadedItems < maxItems;

      // Actualizar estado después de cargar
      this.infiniteState.update(state => ({
        ...state,
        isLoading: false,
        loadCount: state.loadCount + 1,
        hasMore: willHaveMore,
        loadedItems: newLoadedItems,
      }));

      // Actualizar mensaje de accesibilidad
      const currentPage = this.currentPage();
      this.updateAriaLiveMessage(currentPage);

      // Limpiar caché
      this._visiblePagesCache.clear();
    } catch (error) {
      // Manejar error de carga
      this.infiniteState.update(state => ({ ...state, isLoading: false }));
      console.error('Error loading more items:', error);
    }
  }

  /**
   * Verifica si el modo infinito está habilitado
   * @return {boolean}
   */
  isInfiniteMode(): boolean {
    return this.infiniteConfig()?.enabled || false;
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
  /**
   * Obtiene el texto de carga
   * @return {string}
   */
  getLoadingText(): string {
    const infiniteCfg = this.infiniteConfig();
    const config = { ...this.paginatorConfig.loading, ...infiniteCfg };
    return config.loadingText || this._translations.paginator.loading;
  }

  /**
   * Obtiene el estado completo del paginador
   * @return {PaginatorState}
   */
  getCurrentState(): PaginatorState {
    const range = this.itemRange();

    return {
      currentPage: this.currentPage(),
      totalPages: this.totalPages(),
      itemsPerPage: this.itemsPerPage(),
      totalItems: this.totalItems(),
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
      .subscribe(event => {
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
  private handleKeyboardNavigation(event: KeyboardEvent, target: HTMLElement): void {
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
      setTimeout(() => this.focusPageButton(this.totalPages()), 50);
      return;
    }

    // Flechas solo funcionan si el foco está en un botón de página
    if (!isPageButton) return;

    // Flecha izquierda: Página anterior
    if (key === 'ArrowLeft' || this.keyboardConfig.previousPage?.includes(key)) {
      event.preventDefault();
      if (!this.isFirstPage()) {
        const targetPage = this.currentPage() - 1;
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
        const targetPage = this.currentPage() + 1;
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
    const buttons = hostElement.querySelectorAll('.nui-paginator__button--page');

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
    const total = this.totalPages();
    const current = this.currentPage();
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
    if (!this.disabled() && !this.isFirstPage()) {
      this.goToPage(1);
    }
  }

  /**
   * Navega a la página anterior
   */
  goToPreviousPage(): void {
    if (!this.disabled() && !this.isFirstPage()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  /**
   * Navega a la página siguiente
   */
  goToNextPage(): void {
    if (!this.disabled() && !this.isLastPage()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  /**
   * Navega a la última página
   */
  goToLastPage(): void {
    if (!this.disabled() && !this.isLastPage()) {
      this.goToPage(this.totalPages());
    }
  }

  /**
   * Navega a una página específica
   * @param {number} page - Número de página al que navegar
   */
  goToPage(page: number): void {
    if (this.disabled()) return;

    // Validación robusta
    if (page == null || isNaN(page) || !isFinite(page)) return;

    const total = this.totalPages();
    const newPage = Math.max(1, Math.min(Math.floor(page), total));
    const previousPage = this.currentPage();

    if (newPage !== previousPage) {
      this.currentPage.set(newPage);

      // Actualizar mensaje de accesibilidad
      this.updateAriaLiveMessage(newPage);

      // Emitir evento simple (backward compatibility)
      this.pageChange.emit(newPage);

      // Emitir evento avanzado con más información
      const advancedEvent: PageChangeEvent = {
        page: newPage,
        previousPage: previousPage,
        itemsPerPage: this.itemsPerPage(),
        totalPages: total,
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
    return typeof page === 'number' && page === this.currentPage();
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
      return this._translations.paginator.previousPage;
    } else if (page === 'ellipsis-end') {
      return this._translations.paginator.nextPage;
    }
    return this._translations.paginator.morePages;
  }

  /**
   * Cambia el tamaño de página
   * @param {string} size - Nuevo tamaño de página como string
   */
  onPageSizeChange(size: string): void {
    const newSize = parseInt(size, 10);
    if (isNaN(newSize) || newSize < 1) return;

    const previousSize = this.itemsPerPage();

    this.itemsPerPage.set(newSize);

    // Emitir evento simple (backward compatibility)
    this.pageSizeChange.emit(newSize);

    // totalPages se recalcula automáticamente mediante el computed()
    // Obtener el nuevo valor calculado
    const newTotalPages = this.totalPages();

    // Si la página actual queda fuera del nuevo rango, ajustar
    const current = this.currentPage();
    if (current > newTotalPages && newTotalPages > 0) {
      this.currentPage.set(newTotalPages);
    }

    // Emitir evento avanzado con más información
    const advancedEvent: PageSizeChangeEvent = {
      pageSize: newSize,
      previousPageSize: previousSize,
      currentPage: this.currentPage(),
      totalPages: newTotalPages,
    };
    this.pageSizeChangeAdvanced.emit(advancedEvent);

    // Limpiar caché
    this._visiblePagesCache.clear();

    // Actualizar mensaje de accesibilidad
    this.updateAriaLiveMessage(this.currentPage());
  }

  /**
   * Maneja el salto a una página específica desde el input
   */
  handlePageJump(): void {
    const pageValue = this.pageJumpValue();
    const pageNum = parseInt(pageValue, 10);
    const total = this.totalPages();

    if (isNaN(pageNum) || pageNum < 1 || pageNum > total) {
      // Mostrar mensaje de error accesible
      this.ariaLiveMessage.set(
        this._translations.paginator.pageJumpHelp.replace('{totalPages}', total.toString())
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
    const autoScrollValue = this.autoScroll();
    if (!autoScrollValue) return;

    let element: HTMLElement | null = null;
    const scrollTargetValue = this.scrollTarget();
    const scrollTarget = scrollTargetValue || this.paginatorConfig.config?.scrollTarget || 'body';

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
    const totalItems = this.totalItems();

    // Si no hay más elementos o no hay totalItems, solo mostrar los elementos cargados
    if (!state.hasMore || totalItems === undefined || totalItems === null || totalItems === 0) {
      // Mostrar solo la parte de "elementos cargados" sin el total
      return this._translations.paginator.infiniteLoadedItems
        .replace('{loaded}', state.loadedItems.toString())
        .replace(/\s+de\s+\{total\}/, ''); // Eliminar la parte "de {total}"
    }

    // Mostrar el texto completo con loaded y total
    return this._translations.paginator.infiniteLoadedItems
      .replace('{loaded}', state.loadedItems.toString())
      .replace('{total}', totalItems.toString());
  }

  /**
   * Genera etiqueta ARIA dinámica para una página
   * @param {number | string} page - Número o identificador de página
   * @return {string} - Etiqueta ARIA para la página
   */
  getPageAriaLabel(page: number | string): string {
    if (typeof page === 'string') return this._translations.paginator.ariaMorePages;

    const isActive = this.isPageActive(page);

    if (isActive)
      return this._translations.paginator.ariaCurrentPage.replace('{page}', page.toString());

    return this._translations.paginator.ariaGoToPage.replace('{page}', page.toString());
  }

  /**
   * Genera descripción ARIA para el estado actual
   * @return {string} - Descripción ARIA del estado actual
   */
  getAriaDescription(): string {
    const range = this.itemRange();
    if (range) {
      return this._translations.paginator.ariaCurrentPageWithRange
        .replace('{page}', this.currentPage().toString())
        .replace('{totalPages}', this.totalPages().toString())
        .replace('{start}', range.start.toString())
        .replace('{end}', range.end.toString())
        .replace('{total}', range.total.toString());
    }
    return this._translations.paginator.ariaCurrentPageNoRange
      .replace('{page}', this.currentPage().toString())
      .replace('{totalPages}', this.totalPages().toString());
  }

  /**
   * Actualiza el mensaje de aria-live para cambios de página
   * @param {number} page - Número de la nueva página
   */
  private updateAriaLiveMessage(page: number): void {
    const range = this.itemRange();
    const totalPages = this.totalPages();
    let message = this._translations.paginator.ariaPage.replace('{page}', page.toString());

    if (totalPages != 0) {
      message = this._translations.paginator.ariaCurrentPageNoRange
        .replace('{page}', page.toString())
        .replace('{totalPages}', totalPages.toString());
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
    this.clearAriaLiveMsgTimeout = setTimeout(() => this.ariaLiveMessage.set(''), 1000);
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
      currentPage: this.currentPage(),
      totalPages: this.totalPages(),
      itemsPerPage: this.itemsPerPage(),
      totalItems: this.totalItems(),
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

    const isMobileUserAgent = mobileUserAgents.some(agent => userAgent.includes(agent));

    // Detección por ancho de pantalla (tablets y móviles)
    const isMobileScreen = window.innerWidth <= 768;

    return isMobileUserAgent || isMobileScreen;
  }

  /**
   * Obtiene el texto para mostrar en modo fraccionado (ej: "3 de 10")
   * @return {string} - Texto formateado del modo fraccionado
   */
  getFractionalText(): string {
    return `${this.currentPage()} de ${this.totalPages()}`;
  }

  // ==================== Layout Methods ====================

  /**
   * Verifica si un elemento puede mostrarse según sus propiedades de visibilidad.
   * Esta función separa la lógica de DÓNDE va un elemento (layout) de SI debe mostrarse (visibilidad).
   *
   * @param element - Tipo de elemento a evaluar
   * @returns `true` si el elemento cumple sus condiciones de visibilidad, `false` en caso contrario
   *
   * @remarks
   * **IMPORTANTE**: Si hay un layout explícito, las propiedades show* se ignoran completamente.
   * El layout tiene control total sobre qué elementos renderizar y dónde.
   *
   * Cuando NO hay layout explícito, verifica propiedades show* y condiciones funcionales:
   * - `firstButton`/`lastButton`: Requiere `showFirstLast = true`
   * - `pageJump`: Requiere `showPageJump = true`
   * - `pageSize`: Requiere `showPageSizeSelector = true`
   * - `itemRange`: Requiere `showItemRange = true` y que haya datos
   * - `infiniteButton`/`infiniteCounter`/`infiniteEndMessage`: Requiere modo infinito habilitado
   * - Resto de elementos: Siempre visibles (la ubicación la controla el layout)
   *
   * @example
   * ```typescript
   * // Con layout explícito: ignorar show*
   * canShowElement('firstButton') // true (layout tiene control total)
   *
   * // Sin layout explícito: respetar show*
   * canShowElement('firstButton') // false si showFirstLast=false
   * canShowElement('pageNumbers') // true (siempre visible)
   * canShowElement('itemRange')   // true solo si showItemRange=true y hay datos
   * ```
   */
  protected canShowElement(element: PaginatorElement): boolean {
    // Si hay layout explícito, ignorar completamente las propiedades show*
    // El desarrollador tiene control total sobre qué renderizar y dónde
    const hasExplicitLayout = this.layout() !== undefined;

    if (hasExplicitLayout) {
      // Con layout explícito, solo verificar condiciones funcionales (no show*)
      switch (element) {
        case PaginatorElementEnum.ITEM_RANGE:
          // itemRange requiere datos para mostrarse
          return !!this.itemRange();

        case PaginatorElementEnum.INFINITE_COUNTER:
          return this.isInfiniteMode() && (this.infiniteConfig()?.showCounter ?? true);

        case PaginatorElementEnum.INFINITE_BUTTON:
          return (
            this.isInfiniteMode() &&
            this.infiniteState().hasMore &&
            this.infiniteConfig()?.mode !== 'scroll'
          );

        case PaginatorElementEnum.INFINITE_END_MESSAGE:
          return this.isInfiniteMode() && !this.infiniteState().hasMore;

        default:
          // Resto de elementos siempre visibles con layout explícito
          return true;
      }
    }

    // Sin layout explícito: usar propiedades show* y condiciones
    switch (element) {
      case PaginatorElementEnum.FIRST_BUTTON:
      case PaginatorElementEnum.LAST_BUTTON:
        return this.effectiveShowFirstLast();

      case PaginatorElementEnum.PAGE_JUMP:
        return this.effectiveShowPageJump();

      case PaginatorElementEnum.PAGE_SIZE:
        return this.effectiveShowPageSizeSelector();

      case PaginatorElementEnum.ITEM_RANGE:
        return this.effectiveShowItemRange() && !!this.itemRange();

      case PaginatorElementEnum.INFINITE_COUNTER:
        return this.isInfiniteMode() && (this.infiniteConfig()?.showCounter ?? true);

      case PaginatorElementEnum.INFINITE_BUTTON:
        return (
          this.isInfiniteMode() &&
          this.infiniteState().hasMore &&
          this.infiniteConfig()?.mode !== 'scroll'
        );

      case PaginatorElementEnum.INFINITE_END_MESSAGE:
        return this.isInfiniteMode() && !this.infiniteState().hasMore;

      default:
        // Elementos básicos de navegación siempre se pueden mostrar
        return true;
    }
  }

  /**
   * Obtiene los elementos que deben renderizarse en un área específica del layout
   * @param {PaginatorLayoutArea} area Área del layout (top, left, center, right, bottom)
   * @returns {PaginatorElement[]} Array de elementos a renderizar en el área especificada
   */
  getElementsForArea(area: PaginatorLayoutArea): PaginatorElement[] {
    const layout = this.effectiveLayout();
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
   * 2. **Visibilidad (SI)**: El elemento debe cumplir sus condiciones específicas mediante `canShowElement()`
   *
   * El layout siempre existe (nunca undefined) gracias a `getDefaultLayoutForMode()` como fallback.
   *
   * @example
   * ```typescript
   * // Elemento en layout pero condicionalmente oculto
   * shouldRenderElement('firstButton') // false si showFirstLast=false
   *
   * // Elemento con show*=true pero no en layout
   * shouldRenderElement('firstButton') // false si no está en ningún área del layout
   * ```
   *
   * @see {@link canShowElement} Para las reglas de visibilidad de cada elemento
   * @see {@link getDefaultLayoutForMode} Para el sistema de layouts por defecto
   * @see {@link PaginatorLayout} Para la estructura del sistema de layouts
   * @see {@link PaginatorElement} Para los tipos de elementos disponibles
   *
   * @internal
   * Esta función es llamada internamente por el template durante el proceso de renderizado.
   * Los desarrolladores normalmente no necesitan llamarla directamente.
   */
  shouldRenderElement(element: PaginatorElement): boolean {
    const layout = this.effectiveLayout();

    // 1. Verificar si el elemento está en el layout (DÓNDE)
    const isInLayout = this.isElementInLayout(element, layout);
    if (!isInLayout) {
      return false; // No está en el layout = no renderizar
    }

    // 2. Verificar condiciones de visibilidad (SI)
    return this.canShowElement(element);
  }

  /**
   * Verifica si un elemento está presente en el layout
   * @param {PaginatorElement} element El elemento a verificar
   * @param {PaginatorLayout} layout El layout actual
   * @returns {boolean} Verdadero si el elemento está en el layout, falso en caso contrario
   */
  private isElementInLayout(element: PaginatorElement, layout: PaginatorLayout): boolean {
    const areas: PaginatorLayoutArea[] = PAGINATOR_LAYOUT_AREAS; // ['top', 'left', 'center', 'right', 'bottom']
    return areas.some(area => {
      const elements = layout[area] || [];
      return elements.includes(element);
    });
  }

  /**
   * Obtiene la dirección de flexbox para un área
   * @returns {PLayoutDirection} Dirección del layout
   */
  getLayoutDirection(): PLayoutDirection {
    const layout = this.effectiveLayout();
    return layout?.direction || PLayoutDirectionEnum.ROW;
  }

  /**
   * Obtiene las clases CSS para un área basándose en su configuración de alineación vertical y horizontal
   * @param {string} area Área del layout ('left', 'center', 'right')
   * @returns {string[]} Array de clases CSS para el área
   */
  getAreaClasses(area: PaginatorLayoutArea): string[] {
    const layout = this.effectiveLayout();
    // Acceso dinámico seguro: topConfig, bottomConfig, etc.
    const config = layout?.[`${area}Config` as keyof PaginatorLayout] as any;
    const classes: string[] = [];

    // PRIORIDAD: Configuración específica por zona (ej: topConfig)
    if (config) {
      if (config.vertical) classes.push(`nui-paginator__area--self-${config.vertical}`);
      if (config.horizontal) classes.push(`nui-paginator__area--justify-${config.horizontal}`);
    }

    // FALLBACK: Si es TOP o BOTTOM y no tiene config específica,
    // usamos el 'align' global para mantener la compatibilidad.
    else if (
      (area === PaginatorLayoutAreaEnum.TOP || area === PaginatorLayoutAreaEnum.BOTTOM) &&
      layout?.align
    ) {
      // Mapeamos el antiguo 'align' global a la nueva clase de justificación horizontal
      classes.push(`nui-paginator__area--justify-${layout.align}`);
    }

    return classes;
  }

  /**
   * Obtiene la alineación vertical para un área
   * @returns {PVerticalAlign} Alineación vertical del layout
   */
  getLayoutVerticalAlign(): PVerticalAlign {
    const layout = this.effectiveLayout();
    return layout?.verticalAlign || PVerticalAlignEnum.CENTER;
  }

  /**
   * Obtiene el espaciado gap
   * @returns {string} Gap del layout
   */
  getLayoutGap(): string {
    const layout = this.effectiveLayout();
    return layout?.gap || DEFAULT_GAP;
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
