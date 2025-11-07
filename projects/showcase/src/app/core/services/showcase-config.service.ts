import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ShowcaseConfig {
  sidebarCollapsed: boolean;
  currentPreset: string;
  isDarkMode: boolean;
  language: string;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShowcaseConfigService {
  private readonly STORAGE_KEY = 'nui-showcase-config';
  
  private defaultConfig: ShowcaseConfig = {
    sidebarCollapsed: false,
    currentPreset: 'aura',
    isDarkMode: false,
    language: '', // Empty string means "not set yet"
    version: '1.0.0'
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
        return { ...this.defaultConfig, ...JSON.parse(stored) };
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
}
