import { EnvironmentProviders, makeEnvironmentProviders, APP_INITIALIZER } from '@angular/core';
import { NuiDateAdapter, NUI_DATE_ADAPTER } from './nui-date-adapter';

/**
 * Proporciona locales personalizados para el adaptador de fechas de NUI.
 * Este provider se encarga de registrar los locales en el adaptador de fechas al arrancar la aplicación.
 * Es importante destacar que este provider no inyecta directamente el adaptador,
 * sino que utiliza un APP_INITIALIZER para acceder a él en tiempo de inicialización, lo que permite mantener la flexibilidad y desacoplamiento.
 *
 * @param locales Objeto con locales personalizados (ej: { es: esLocale, en: enLocale })
 * @returns EnvironmentProviders para inyección de dependencias
 */
export function provideNuiDateLocales(locales: Record<string, any>): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (adapter: NuiDateAdapter) => () => {
        // Comprobamos si el adaptador tiene el método registerLocales antes de llamarlo,
        // para evitar errores en caso de que se use un adaptador sin soporte de locales
        if ('registerLocales' in adapter) adapter.registerLocales(locales);
      },
      // CAMBIAMOS ESTO: Usamos el Token, no la Interface
      deps: [NUI_DATE_ADAPTER],
      multi: true,
    },
  ]);
}
