import {
  APP_INITIALIZER,
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { NUIConfig } from './nui.model';
import { ThemeService } from '../themes';
import { NuiDateFnsAdapter } from '../adapters';
import { NUI_DATE_ADAPTER } from '../i18n/i18n-dates/i18n-dates.token';

/**
 * Token de inyección para la configuración global de NUI.
 * Permite a los usuarios proporcionar una configuración parcial que se fusionará
 * con los valores predeterminados internos de cada componente.
 */
export const NUI_CONFIG = new InjectionToken<Partial<NUIConfig>>('NUIConfig');

/**
 * Proporciona la configuración global de la librería NUI.
 * Solo almacena los overrides del usuario. La fusión con los defaults
 * se delega a cada componente para proteger el tree-shaking.
 *
 * @param config Configuración parcial para override global
 * @returns Provider para inyección de dependencias
 */
export function provideNUI(config: Partial<NUIConfig> = {}): EnvironmentProviders {
  const providers: Provider[] = [
    ThemeService,

    // Proveedor del adaptador de fechas. Por defecto usamos la implementación con date-fns,
    {
      provide: NUI_CONFIG,
      useValue: config,
    },

    // Proveedor del adaptador de fechas. Por defecto usamos la implementación con date-fns, pero permitimos override para flexibilidad futura.
    {
      provide: NUI_DATE_ADAPTER,
      useClass: NuiDateFnsAdapter,
    },

    // Inicializador para aplicar la configuración global al arrancar la app. Actualmente no hace nada, pero es el hook ideal para futuras inicializaciones (ej: aplicar tema oscuro).
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => () => {
        return;
      },
      deps: [ThemeService],
      multi: true,
    },
  ];

  return makeEnvironmentProviders(providers);
}
