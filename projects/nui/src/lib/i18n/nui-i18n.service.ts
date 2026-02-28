import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { NUI_I18N } from './nui-i18n.token';
import { NuiI18n } from './nui-i18n.model';
import { deepMerge } from '../utils/deep-merge';
import { NUI_DATE_ADAPTER } from '../adapters/nui-date-adapter';

@Injectable({
  providedIn: 'root',
})
export class NuiI18nService {
  /** Inyectamos los valores por defecto del Token que ya tienes */
  private readonly _defaults = inject(NUI_I18N);

  /** Inyectamos el adaptador de fechas */
  private readonly _dateAdapter = inject(NUI_DATE_ADAPTER);

  /** Señal interna para el idioma actual */
  private readonly _currentLang = signal<string>('en');
  readonly currentLang = this._currentLang.asReadonly();

  /** Creamos la señal interna con el estado actual de los textos */
  private readonly _currentTranslations = signal<NuiI18n>(this._defaults);

  /** Exponemos la señal como solo lectura para los componentes */
  readonly translations = this._currentTranslations.asReadonly();

  constructor() {
    // Reaccionar al cambio de idioma para actualizar el adaptador
    effect(() => {
      const lang = this._currentLang();
      this._dateAdapter.setLocale(lang);
    });
  }

  /**
   * Método para cambiar el idioma actual. Acepta un ID de idioma y un objeto opcional de nuevas traducciones.
   * Si se proporcionan nuevas traducciones, se fusionarán con las existentes.
   * @param langId ID del idioma (ej: 'en', 'es')
   * @param newTranslations Traducciones parciales para override
   */
  setLang(langId: string, newTranslations?: Partial<NuiI18n>): void {
    this._currentLang.set(langId);
    if (newTranslations) this.setTranslations(newTranslations);
  }

  /**
   * Método para actualizar traducciones desde fuera (ngx-translate, etc.)
   * @param newTranslations Objeto parcial con los nuevos textos
   */
  setTranslations(newTranslations: Partial<NuiI18n>): void {
    this._currentTranslations.update(current => deepMerge(current, newTranslations));
  }

  /**
   * Helper para obtener una sección específica de forma reactiva
   * @param section Clave de la sección a obtener
   * @returns Señal computada con la sección específica
   */
  getSection<K extends keyof NuiI18n>(section: K) {
    return computed(() => this.translations()[section]);
  }
}
