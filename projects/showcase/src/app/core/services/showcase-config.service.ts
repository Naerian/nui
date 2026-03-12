import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_FONT_NAME, DEFAULT_FONT_SIZE } from '../models/font.model';
import { DEFAULT_VERSION } from '../models/version.model';

export interface ShowcaseConfig {
  sidebarCollapsed: boolean;
  currentPreset: string;
  isDarkMode: boolean;
  language?: string;
  version: string;
  fontName: string;
  fontSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShowcaseConfigService {
  private readonly STORAGE_KEY = 'nui-showcase-config';

  // Extraemos la versión como una constante que cambiaremos por rama
  // En la rama support/v17 valdrá '17', en main valdrá '18', etc...
  // --
  // De esta forma podemos mantener distintas versiones en paralelo sin que
  // se pisen las configs en localStorage (porque cada rama buscará su propia versión)
  private readonly APP_VERSION = DEFAULT_VERSION;

  // Configuración por defecto (si no hay nada en localStorage)
  private defaultConfig: ShowcaseConfig = {
    sidebarCollapsed: false,
    currentPreset: 'minimal',
    isDarkMode: false,
    version: this.APP_VERSION,
    fontName: DEFAULT_FONT_NAME,
    fontSize: DEFAULT_FONT_SIZE,
  };

  private configSubject = new BehaviorSubject<ShowcaseConfig>(this.loadConfig());
  public config$ = this.configSubject.asObservable();

  constructor() {
    // Initialize from localStorage
    const config = this.loadConfig();
    this.configSubject.next(config);
  }

  private loadConfig(): ShowcaseConfig {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Forzamos que la versión sea siempre la de la APP_VERSION de la rama
        return { ...this.defaultConfig, ...parsed, version: this.APP_VERSION };
      }
    } catch (e) {
      console.warn('Failed to load showcase config from localStorage', e);
    }
    return this.defaultConfig;
  }

  private saveConfig(config: ShowcaseConfig): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
      this.configSubject.next(config);
    } catch (e) {
      console.warn('Failed to save showcase config to localStorage', e);
    }
  }

  get currentConfig(): ShowcaseConfig {
    return this.configSubject.value;
  }

  toggleSidebar(): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, sidebarCollapsed: !config.sidebarCollapsed });
  }

  setSidebarCollapsed(collapsed: boolean): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, sidebarCollapsed: collapsed });
  }

  setPreset(preset: string): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, currentPreset: preset });
  }

  toggleDarkMode(): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, isDarkMode: !config.isDarkMode });
  }

  setDarkMode(isDark: boolean): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, isDarkMode: isDark });
  }

  setLanguage(language: string): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, language });
  }

  setVersion(version: string): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, version });
  }

  setFont(fontName: string): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, fontName });
  }

  setFontSize(fontSize: number): void {
    const config = this.currentConfig;
    this.saveConfig({ ...config, fontSize });
  }
}
