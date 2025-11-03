/**
 * Interfaz para las traducciones de la librería
 */
export interface NUITranslations {
  // Textos genéricos
  expand: string;
  collapse: string;
  close: string;
  minimize: string;
  actions: string;
  openSearch: string;
  closeSearch: string;
  toDarkMode: string;
  toLightMode: string;

  // Textos del componente Avatar
  avatar: {
    moreProfiles: string; // "Más {count} perfiles"
  };

  formfield: {
    // Textos del componente Select
    multipleChoices: string;
    selectOption: string;
    selectOptions: string;
    search: string;
    noResults: string;
    loadingOptions: string;

    // Textos del componente InputFile
    inputFileLabel: string;
    inputFileLabelMultiple: string;

    // Texto del componete InputPassword
    showPassword: string;
    hidePassword?: string;

    // Texto del componente InputNumber
    incrementBtn: string;
    decrementBtn: string;

    // Textos generales de los campos de formulario
    clearButton: string;
  };

  // Textos del componente Breadcrumb
  breadcrumb: {
    showHiddenPaths: string;
    showHiddenPathsTitle: string;
    intermediateRoutes: string;
  };

  // Textos del componente Calendar
  calendar: {
    weekDaysShort: string[];
    weekDays: string[];
    selectDay: string;
    months: string[];
    shortMonths: string[];
    prevMonth: string;
    nextMonth: string;
    prevYears: string;
    nextYears: string;
    changeMonth: string;
    changeYear: string;
    year: string;
    dayDisabled: string;
    monthAria: string;
    yearsAria: string;
    openCalendar: string;
    today: string;
    showTime: string;
    hideTime: string;
    timePicker: string;
    timePickerStart: string;
    timePickerEnd: string;
    presets: {
      shortcuts: string;
      today: string;
      last7Days: string;
      last30Days: string;
      thisMonth: string;
      lastMonth: string;
      thisYear: string;
    };
    tabs: {
      calendar: string;
      presets: string;
      time: string;
    };
  };

  // Textos del componente timepicker
  timePicker: {
    setToCurrentTime: string;
    selectTime: string;
    clear: string;
    hour: string;
    minutes: string;
    hour12: string;
    hour24: string;
    period: string;
    normalizedTime: string;
    rangeLabel: string;
    timeSelected: string;
    duration: {
      hours: string;
      minutes: string;
      seconds: string;
      hoursShort: string;
      minutesShort: string;
      secondsShort: string;
      selectDuration: string;
      durationSelected: string;
    };
    tabs: {
      selector: string;
      presets: string;
    };
  };

  // Textos de validadores de formularios de Angular
  validators: {
    required: string;
    requiredTrue: string;
    minlength: string;
    maxlength: string;
    min: string;
    max: string;
    pattern: string;
    email: string;
    nullValidator: string;
  };

  // Texto del pipe Async-Loading:
  asyncLoading: {
    error: string;
  };

  // Texto del pipe Time-Ago:
  timeAgo: {
    minutePast: string;
    hourPast: string;
    dayPast: string;
    weekPast: string;
    monthPast: string;
    yearPast: string;
    minuteFuture: string;
    hourFuture: string;
    dayFuture: string;
    weekFuture: string;
    monthFuture: string;
    yearFuture: string;
    secondsPast: string;
    minutesPast: string;
    hoursPast: string;
    daysPast: string;
    weeksPast: string;
    monthsPast: string;
    yearsPast: string;
    secondsFuture: string;
    minutesFuture: string;
    hoursFuture: string;
    daysFuture: string;
  };

  // Texto del pipe Age:
  age: {
    year: string;
    years: string;
    month: string;
    months: string;
    day: string;
    days: string;
    and: string;
  };

  // Textos botón de Fullscreen
  fullScreen: {
    enter: string;
    exit: string;
  };

  // Texto del pipe Unit-Converter
  unitConverter: {
    storage: {
      bits: { singular: string; plural: string };
      bytes: { singular: string; plural: string };
      KB: { singular: string; plural: string };
      MB: { singular: string; plural: string };
      GB: { singular: string; plural: string };
      TB: { singular: string; plural: string };
      KiB: { singular: string; plural: string };
      MiB: { singular: string; plural: string };
      GiB: { singular: string; plural: string };
      TiB: { singular: string; plural: string };
      PB: { singular: string; plural: string };
      EB: { singular: string; plural: string };
      ZB: { singular: string; plural: string };
      YB: { singular: string; plural: string };
    };
    network: {
      bps: { singular: string; plural: string };
      Kbps: { singular: string; plural: string };
      Mbps: { singular: string; plural: string };
      Gbps: { singular: string; plural: string };
      Tbps: { singular: string; plural: string };
    };
    length: {
      nm: { singular: string; plural: string };
      μm: { singular: string; plural: string };
      mm: { singular: string; plural: string };
      cm: { singular: string; plural: string };
      dm: { singular: string; plural: string };
      meters: { singular: string; plural: string };
      km: { singular: string; plural: string };
      mil: { singular: string; plural: string };
      inches: { singular: string; plural: string };
      feet: { singular: string; plural: string };
      yards: { singular: string; plural: string };
      miles: { singular: string; plural: string };
      nauticalMiles: { singular: string; plural: string };
      lightYears: { singular: string; plural: string };
    };
    weight: {
      μg: { singular: string; plural: string };
      mg: { singular: string; plural: string };
      grams: { singular: string; plural: string };
      kg: { singular: string; plural: string };
      tons: { singular: string; plural: string };
      carats: { singular: string; plural: string };
      grains: { singular: string; plural: string };
      ounces: { singular: string; plural: string };
      pounds: { singular: string; plural: string };
      stones: { singular: string; plural: string };
      troyOz: { singular: string; plural: string };
      troyLb: { singular: string; plural: string };
      shortTons: { singular: string; plural: string };
      longTons: { singular: string; plural: string };
    };
    temperature: {
      celsius: { singular: string; plural: string };
      fahrenheit: { singular: string; plural: string };
      kelvin: { singular: string; plural: string };
      rankine: { singular: string; plural: string };
    };
    time: {
      microseconds: { singular: string; plural: string; symbol: string };
      milliseconds: { singular: string; plural: string; symbol: string };
      seconds: { singular: string; plural: string; symbol: string };
      minutes: { singular: string; plural: string; symbol: string };
      hours: { singular: string; plural: string; symbol: string };
      days: { singular: string; plural: string; symbol: string };
      weeks: { singular: string; plural: string; symbol: string };
      months: { singular: string; plural: string; symbol: string };
      years: { singular: string; plural: string; symbol: string };
      decades: { singular: string; plural: string; symbol: string };
      centuries: { singular: string; plural: string; symbol: string };
    };
    speed: {
      mps: { singular: string; plural: string };
      fps: { singular: string; plural: string };
      kmh: { singular: string; plural: string };
      mph: { singular: string; plural: string };
      knots: { singular: string; plural: string };
      mach: { singular: string; plural: string };
      lightSpeed: { singular: string; plural: string };
    };
    area: {
      mm2: { singular: string; plural: string };
      cm2: { singular: string; plural: string };
      in2: { singular: string; plural: string };
      m2: { singular: string; plural: string };
      ft2: { singular: string; plural: string };
      yd2: { singular: string; plural: string };
      hectares: { singular: string; plural: string };
      acres: { singular: string; plural: string };
      km2: { singular: string; plural: string };
      mi2: { singular: string; plural: string };
    };
    volume: {
      ml: { singular: string; plural: string };
      cl: { singular: string; plural: string };
      dl: { singular: string; plural: string };
      liters: { singular: string; plural: string };
      dal: { singular: string; plural: string };
      hl: { singular: string; plural: string };
      m3: { singular: string; plural: string };
      floz: { singular: string; plural: string };
      cups: { singular: string; plural: string };
      pints: { singular: string; plural: string };
      quarts: { singular: string; plural: string };
      gallons: { singular: string; plural: string };
      pintsUK: { singular: string; plural: string };
      gallonsUK: { singular: string; plural: string };
    };
  };

  // Texto del pipe Duration
  duration: {
    hours: string;
    hour: string;
    minutes: string;
    minute: string;
    seconds: string;
    second: string;
    shortHours: string;
    shortMinutes: string;
    shortSeconds: string;
  };

  // Texto del pipe Diff-Time
  diffTime: {
    now: string;
    second: string;
    seconds: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
    week: string;
    weeks: string;
    month: string;
    months: string;
    year: string;
    years: string;
  };

  // Textos del componente Modal
  modal: {
    close: string;
    confirm: string;
    cancel: string;
    accept: string;
    understood: string;
    continue: string;
    verificationMismatch: string;
  };

  // Textos del componente Paginator
  paginator: {
    itemsPerPage: string;
    showingItems: string; // "Mostrando {start}-{end} de {total} resultados"
    page: string; // "Página"
    of: string; // "de"
    goToPage: string; // "Ir a página"
    go: string; // "Ir"
    invalidPage: string; // "Página inválida"
    firstPage: string; // "Primera página"
    lastPage: string; // "Última página"
    previousPage: string; // "Página anterior"
    nextPage: string; // "Página siguiente"
    pageLabel: string; // "Página {page}"
    loadMore: string; // "Cargar más"
    loading: string; // "Cargando..."
    pageJumpHelp: string; // "Página inválida. Ingrese un número entre 1 y {totalPages}."
    infiniteLoadedItems: string; // "{loaded} elementos cargados"
    infiniteLoadHasMore: string; // "de {total} totales"
    infiniteLoadEnd: string; // "No hay más elementos que mostrar"
    // ARIA labels
    ariaPagination: string; // "Paginación"
    ariaMorePages: string; // "Más páginas"
    ariaPage: string; // "Página {page}"
    ariaCurrentPage: string; // "página actual"
    ariaGoToPage: string; // "Ir a página {page}"
    ariaCurrentPageWithRange: string; // "Página {page} de {totalPages}, mostrando items {start} a {end} de {total} resultados"
    ariaCurrentPageNoRange: string; // "Página {page} de {totalPages}"
    ariaShowingItems: string; // "Mostrando items {start} a {end} de {total} resultados"
    ariaLoading: string; // "Cargando nueva página..."
  };

  // Textos de las Tabs
  tabs: {
    ariaLabel: string; // "Pestañas"
    scrollPrev: string; // "Desplazar pestañas a la izquierda"
    scrollNext: string; // "Desplazar pestañas a la derecha"
    announceChange: string; // "Navegado a {label}, pestaña {index} de {totalTabs}"
  };
}
