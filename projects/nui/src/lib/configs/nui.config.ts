import { InjectionToken, Provider } from '@angular/core';
import { NUIConfig } from './nui.model';

/**
 * Token de inyección estático para la configuración global de NUI.
 * Por defecto, proporciona un objeto vacío para evitar NullInjectorErrors
 * en aplicaciones que no llaman a provideNUIConfig().
 */
export const NUI_CONFIG = new InjectionToken<Partial<NUIConfig>>('NUIConfig', {
  providedIn: 'root',
  factory: () => ({}),
});

/**
 * Proporciona la configuración global de la librería NUI.
 * Solo almacena los overrides del usuario. La fusión con los defaults
 * se delega a cada componente para proteger el tree-shaking.
 *
 * @param config Configuración parcial para override global
 * @returns Provider para inyección de dependencias
 */
export function provideNUIConfig(config: Partial<NUIConfig>): Provider {
  return {
    provide: NUI_CONFIG,
    useValue: config, // Pasamos el valor crudo, sin defaults ni dependencias circulares
  };
}
