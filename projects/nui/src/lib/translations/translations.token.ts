import { InjectionToken, Provider } from '@angular/core';
import { NUITranslations } from './translations.model';
import { NUI_DEFAULT_I18N } from './translations';

/**
 * Token de inyección para proporcionar traducciones personalizadas al componente Select.
 */
export const NUI_TRANSLATIONS = new InjectionToken<NUITranslations>(
  'NUITranslations',
  {
    providedIn: 'root', // Asegura que esté disponible globalmente
    factory: () => NUI_DEFAULT_I18N, // Provee la implementación por defecto
  },
);

/**
 * Proporciona las traducciones globales para los componentes de la librería NUI.
 * Fusiona las traducciones proporcionadas con las por defecto.
 *
 * @param {translations} translations Las traducciones personalizadas para la librería NUI.
 * @returns {Provider} Un Provider que configura la inyección de dependencias.
 *
 * @example
 * // En app.config.ts o main.ts
 * import { provideNUITranslations } from './translations.token';
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *    provideNUITranslations({ formfield: { multipleChoices: '{choices} items selected' } })
 *  ]
 * };
 *
 * // El objeto pasado se fusiona con las traducciones por defecto,
 * // permitiendo personalizar solo las necesarias.
 */
export function provideNUITranslations(
  translations: Partial<NUITranslations>,
): Provider {
  // Fusionamos las traducciones por defecto con las proporcionadas
  // asegurando que las traducciones personalizadas tengan prioridad.
  // Esto permite que el desarrollador pueda personalizar las traducciones
  // sin perder las traducciones por defecto de la librería.
  const mergedTranslations: NUITranslations = {
    ...NUI_DEFAULT_I18N,
    ...translations,
  };

  return {
    provide: NUI_TRANSLATIONS,
    useValue: mergedTranslations,
  };
}
