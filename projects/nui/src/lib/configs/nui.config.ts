import {
  APP_INITIALIZER,
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { NUIConfig } from './nui.model';
import { ThemeService } from '../themes';

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
    {
      provide: NUI_CONFIG,
      useValue: config,
    },
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
