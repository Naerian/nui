import { InjectionToken, Provider } from '@angular/core';
import { NuiI18n } from './nui-i18n.model';
import { NUI_I18N_DEFAULT } from './nui-i18n';
import { deepMerge } from '../utils';

/**
 * Token de inyección para proporcionar traducciones personalizadas al componente Select.
 */
export const NUI_I18N = new InjectionToken<NuiI18n>('NuiI18n', {
  providedIn: 'root', // Asegura que esté disponible globalmente
  factory: () => NUI_I18N_DEFAULT, // Provee la implementación por defecto
});

/**
 * Proporciona las traducciones globales para los componentes de la librería NUI.
 * Fusiona las traducciones proporcionadas con las por defecto.
 *
 * @param {translations} translations Las traducciones personalizadas para la librería NUI.
 * @returns {Provider} Un Provider que configura la inyección de dependencias.
 *
 * @example
 * // En app.config.ts o main.ts
 * import { provideNuiI18n } from './translations.token';
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *    provideNuiI18n({
 *       paginator: {
 *          itemsPerPage: 'Items per page',
 *          nextPage: 'Next page',
 *       }
 *    })
 *  ]
 * };
 *
 * // El objeto pasado se fusiona con las traducciones por defecto,
 * // permitiendo personalizar solo las necesarias.
 */
export function provideNuiI18n(translations: Partial<NuiI18n>): Provider {
  // Fusionamos las traducciones por defecto con las proporcionadas
  // asegurando que las traducciones personalizadas tengan prioridad.
  // Esto permite que el desarrollador pueda personalizar las traducciones
  // sin perder las traducciones por defecto de la librería.
  const mergedTranslations: NuiI18n = deepMerge(NUI_I18N_DEFAULT, translations);

  return {
    provide: NUI_I18N,
    useValue: mergedTranslations,
  };
}
