import {
  Provider,
  EnvironmentProviders,
  makeEnvironmentProviders,
  APP_INITIALIZER,
} from '@angular/core';
import { ThemeService } from './theme.service';
import { NUI_THEME_CONFIG } from './models/theme.config';
import { ThemeConfig } from './models/theme.model';

export function provideNUI(config?: ThemeConfig): EnvironmentProviders {
  const providers: Provider[] = [ThemeService];

  if (config) {
    providers.push({
      provide: NUI_THEME_CONFIG,
      useValue: config,
    });
  }

  // Force ThemeService initialization at app startup
  // This ensures themes are applied before the app renders,
  // even with lazy-loaded routes
  providers.push({
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => () => {
      // Service is now instantiated and will apply the theme
      return Promise.resolve();
    },
    deps: [ThemeService],
    multi: true,
  });

  return makeEnvironmentProviders(providers);
}
