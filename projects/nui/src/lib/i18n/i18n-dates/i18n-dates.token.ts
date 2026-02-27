import { APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { NuiDateAdapter, NuiDateFnsAdapter } from "../../adapters";

/**
 * Token de inyección para el adaptador de fechas de NUI
 * Permite a los usuarios proporcionar su propia implementación de adaptador de fechas
 * para desacoplar la lógica de componentes de librerías específicas como date-fns.
 *
 * Por defecto, se proporciona una implementación basada en date-fns, pero el usuario
 * puede override esto para usar otra librería (ej: Day.js) o su propia lógica personalizada.
 * Todos los métodos del adaptador deben devolver objetos Date nativos de JavaScript para mantener la transparencia en la API pública.
 */
export const NUI_DATE_ADAPTER = new InjectionToken<NuiDateAdapter>('NuiDateAdapter');


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
        // Importante: aquí 'adapter' ya viene tipado correctamente
        if (adapter instanceof NuiDateFnsAdapter) {
          adapter.registerLocales(locales);
        }
      },
      // CAMBIAMOS ESTO: Usamos el Token, no la Interface
      deps: [NUI_DATE_ADAPTER], 
      multi: true,
    },
  ]);
}