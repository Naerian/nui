export interface Language {
  code: string;
  label: string;
}

/**
 * Lista de idiomas disponibles en la aplicación
 */
export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
];

export const DEFAULT_LANGUAGE = 'en';
