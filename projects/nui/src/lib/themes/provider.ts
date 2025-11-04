import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ThemeService, ThemeConfig, NUI_THEME_CONFIG } from './theme.service';

export function provideNUI(config?: ThemeConfig): EnvironmentProviders {
  const providers: Provider[] = [ThemeService];

  if (config) {
    providers.push({
      provide: NUI_THEME_CONFIG,
      useValue: config
    });
  }

  return makeEnvironmentProviders(providers);
}
