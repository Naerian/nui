import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Manejador global de errores para NUI.
 * Detecta errores relacionados con la carga de chunks (actualizaciones) y sugiere recargar la página.
 * También mantiene el log original para facilitar el debug en consola.
 */
@Injectable()
export class NuiGlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private translate: TranslateService,
  ) {}

  handleError(error: any): void {
    const chunkFailedMessage = /Failed to fetch dynamically imported module|Loading chunk/;

    if (chunkFailedMessage.test(error.message)) {
      // Forzamos la recarga dentro de la zona de Angular para asegurar consistencia
      this.zone.run(() => {
        if (confirm(this.translate.instant('errors.newVersion'))) {
          window.location.reload();
        }
      });
    }

    // Mantener el log original para debug en consola
    console.error('NUI Error Catch:', error);
  }
}
