import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app.routes';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { minimal, provideNUI, provideNuiDateLocales } from 'nui';
import { enUS, es, fr, de } from 'date-fns/locale';
import { NuiGlobalErrorHandler } from './core/errors/global-error-handler';

// Map: JSON object key → file name inside components/
const COMPONENT_FILES: [string, string][] = [
  ['button', 'button'],
  ['actionMenu', 'action-menu'],
  ['avatar', 'avatar'],
  ['selectButton', 'select-button'],
  ['calendar', 'calendar'],
  ['paginator', 'paginator'],
  ['popover', 'popover'],
  ['toast', 'toast'],
  ['sidebar-panel', 'sidebar-panel'],
  ['tooltip', 'tooltip'],
  ['timeSelector', 'time-selector'],
  ['fabButton', 'fab-button'],
  ['progressBar', 'progress-bar'],
  ['splitButton', 'split-button'],
];

export class SplitTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const base = `./assets/i18n/${lang}`;

    const componentRequests = Object.fromEntries(
      COMPONENT_FILES.map(([key, file]) => [key, this.http.get(`${base}/components/${file}.json`)])
    );

    return forkJoin({
      common: this.http.get(`${base}/common.json`),
      pages: this.http.get(`${base}/pages.json`),
      components: forkJoin(componentRequests),
    }).pipe(
      map(({ common, pages, components }) => ({
        ...(common as object),
        pages,
        components,
      }))
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new SplitTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: ErrorHandler,
      useClass: NuiGlobalErrorHandler,
    },
    provideNUI({
      preset: minimal,
      darkMode: 'manual',
      config: {
        actionMenu: {
          offset: 5,
        }
      }
    }),
    provideNuiDateLocales({
      en: enUS,
      es: es,
      fr: fr,
      de: de,
    }),
  ],
};
