import { InjectionToken, Provider, inject } from '@angular/core';
import { NUIConfig } from './nui.model';
import { createDefaultPaginatorConfig } from './paginator';
import { createDefaultToastConfig } from './toast';
import { createDefaultTooltipConfig } from './tooltip';
import { createDefaultPopoverConfig } from './popover';
import { createDefaultFabButtonConfig } from './fab-button/fab-button.config';
import { DEFAULT_VARIANT, DEFAULT_COLOR, DEFAULT_SIZE } from './nui.consts';
import { NUI_TRANSLATIONS } from '../translations';

// Configuración base de la librería (puede estar vacía o con algunos defaults críticos)
function createDefaultNUIConfig(): Partial<NUIConfig> {
  return {
    defaultSize: DEFAULT_SIZE, // Tamaño por defecto para los componentes
    defaultColor: DEFAULT_COLOR, // Color por defecto para los componentes
    defaultVariant: DEFAULT_VARIANT, // Valor por defecto para los botones
    paginator: createDefaultPaginatorConfig(),
    toast: createDefaultToastConfig(),
    tooltip: createDefaultTooltipConfig(),
    popover: createDefaultPopoverConfig(),
    fabButton: createDefaultFabButtonConfig(),
  };
}

/**
 * Token de inyección para la configuración global de NUI
 */
export const NUI_CONFIG = new InjectionToken<Partial<NUIConfig>>('NUIConfig', {
  providedIn: 'root',
  factory: () => createDefaultNUIConfig(),
});

/**
 * Proporciona la configuración global de la librería NUI.
 * Los componentes usarán estos valores como override de sus defaults locales.
 *
 * @param {config} config Configuración parcial para override global
 * @returns {Provider} Un Provider que configura la inyección de dependencias.
 *
 * @example
 * // En app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideNUIConfig({
 *       defaultSize: 'md',           // Todos los componentes usarán 'md' por defecto
 *       defaultColor: 'primary',    // Todos los componentes usarán 'primary' por defecto
 *       dropdownItemSize: 'sm',     // Todos los items de los dropdowns usarán 'sm' por defecto
 *       defaultDateFormat: {        // Configuración por defecto para pipes de fecha
 *         diffTimeFormat: 'DD/MM/YYYY'    // Pipes como DiffTimePipe usarán 'DD/MM/YYYY' por defecto
 *       },
 *       paginator: {               // Configuración global del paginator
 *         config: {
 *           maxVisiblePages: 5,
 *           showPageSizeSelector: true,
 *           pageSizeOptions: [5, 10, 25, 50]
 *         },
 *         icons: {
 *           next: 'custom-next-icon',
 *           previous: 'custom-prev-icon'
 *         },
 *         compact: {
 *           enabled: true
 *         }
 *       }
 *     })
 *   ]
 * };
 *
 * @example
 * // En un componente
 * export class MyButtonComponent {
 *   private config = inject(NUI_CONFIG);
 *
 *   // El componente usa su default local si no hay configuración global
 *   size = this.config.defaultSize ?? 'md';
 *   color = this.config.defaultColor ?? 'primary';
 * }
 */
/**
 * Función para fusionar configuraciones de paginator profundamente
 */
function mergeNUIConfigs(
  defaultConfig: Partial<NUIConfig>,
  customConfig: Partial<NUIConfig>,
): Partial<NUIConfig> {
  const merged = { ...defaultConfig, ...customConfig };

  // Fusión profunda para la configuración del paginator
  if (defaultConfig.paginator || customConfig.paginator) {
    merged.paginator = {
      config: {
        ...defaultConfig.paginator?.config,
        ...customConfig.paginator?.config,
      },
      texts: {
        ...defaultConfig.paginator?.texts,
        ...customConfig.paginator?.texts,
      },
      keyboard: {
        ...defaultConfig.paginator?.keyboard,
        ...customConfig.paginator?.keyboard,
      },
      loading: {
        ...defaultConfig.paginator?.loading,
        ...customConfig.paginator?.loading,
      },
      responsive: {
        mobile: {
          ...defaultConfig.paginator?.responsive?.mobile,
          ...customConfig.paginator?.responsive?.mobile,
        },
        tablet: {
          ...defaultConfig.paginator?.responsive?.tablet,
          ...customConfig.paginator?.responsive?.tablet,
        },
        breakpoints: {
          ...defaultConfig.paginator?.responsive?.breakpoints,
          ...customConfig.paginator?.responsive?.breakpoints,
        },
      },
      icons: {
        ...defaultConfig.paginator?.icons,
        ...customConfig.paginator?.icons,
      },
      infinite: {
        ...defaultConfig.paginator?.infinite,
        ...customConfig.paginator?.infinite,
      },
      appearance: {
        ...defaultConfig.paginator?.appearance,
        ...customConfig.paginator?.appearance,
      },
    };
  }

  // Fusión para la configuración del fab button
  if (defaultConfig.fabButton || customConfig.fabButton) {
    merged.fabButton = {
      ...defaultConfig.fabButton,
      ...customConfig.fabButton,
    };
  }

  return merged;
}

export function provideNUIConfig(config: Partial<NUIConfig>): Provider {
  return {
    provide: NUI_CONFIG,
    useFactory: () => {
      const defaultConfig = createDefaultNUIConfig();
      return mergeNUIConfigs(defaultConfig, config);
    },
    deps: [NUI_TRANSLATIONS],
  };
}

/**
 * Helper para usar en componentes, combinando configuración global con defaults locales.
 * Los valores globales tienen prioridad sobre los locales. Esto permite que los
 * componentes tengan defaults razonables, pero puedan ser fácilmente sobreescritos
 * por la configuración global de la librería.
 * @param {Partial<NUIConfig>} globalConfig Configuración global inyectada
 * @param {T} localDefaults Defaults locales del componente
 * @returns {T & Partial<NUIConfig>} Configuración combinada
 *
 * @example
 * // En un componente
 * export class MyButtonComponent {
 *   private globalConfig = inject(NUI_CONFIG);
 *   private localDefaults = { defaultSize: 'm', defaultColor: 'primary' };
 *   config = mergeNUIConfig(this.globalConfig, this.localDefaults);
 *
 *   size = this.config.defaultSize; // Usa 'm' si no hay override global
 *   color = this.config.defaultColor; // Usa 'primary' si no hay override global
 * }
 */
export function mergeNUIConfig<T extends Partial<NUIConfig>>(
  globalConfig: Partial<NUIConfig>,
  localDefaults: T,
): T & Partial<NUIConfig> {
  return { ...localDefaults, ...globalConfig };
}
