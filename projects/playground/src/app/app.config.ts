import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNUI, aura } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNUI({ preset: aura })
  ]
};
