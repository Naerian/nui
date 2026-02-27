import { Injectable, inject, signal, computed } from '@angular/core';
import { NUI_I18N } from './nui-i18n.token';
import { NuiI18n } from './nui-i18n.model';
import { deepMerge } from '../utils/deep-merge'; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root',
})
export class NuiI18nService {
  /** Inyectamos los valores por defecto del Token que ya tienes */
  private readonly _defaults = inject(NUI_I18N);

  /** Creamos la señal interna con el estado actual de los textos */
  private readonly _currentTranslations = signal<NuiI18n>(this._defaults);

  /** Exponemos la señal como solo lectura para los componentes */
  readonly translations = this._currentTranslations.asReadonly();

  /** Método para actualizar traducciones desde fuera (ngx-translate, etc.)
   * @param newTranslations Objeto parcial con los nuevos textos
   */
  setTranslations(newTranslations: Partial<NuiI18n>): void {
    this._currentTranslations.update(current => deepMerge(current, newTranslations));
  }

  /** Helper para obtener una sección específica de forma reactiva */
  getSection<K extends keyof NuiI18n>(section: K) {
    return computed(() => this.translations()[section]);
  }
}
