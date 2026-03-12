
/**
 * Versión por defecto (usada para fallback y para redirecciones sin versión explícita)
 * Debe coincidir con una de las versiones de AVAILABLE_VERSIONS y con la versión de APP_VERSION en ShowcaseConfigService
 * De esta forma, cada rama puede apuntar a su propia versión sin pisarse entre ellas (porque cada rama tendrá una APP_VERSION distinta)
 */
export const DEFAULT_VERSION = '17';

/**
 * Lista de versiones disponibles en el showcase (Esto escalará aquí)
 * El value debe coincidir con la clave de VERSION_URLS y con la versión de APP_VERSION en ShowcaseConfigService
 * De esta forma, cada rama puede apuntar a su propia URL sin pisarse entre ellas (porque cada rama tendrá una APP_VERSION distinta)
 */
export const AVAILABLE_VERSIONS: Version[] = [
  { value: '17', label: 'v17' },
];

/**
 * Constante con las URLs de cada versión (Esto escalará aquí)
 * La clave debe coincidir con el value de AVAILABLE_VERSIONS y con la versión de APP_VERSION en ShowcaseConfigService
 * De esta forma, cada rama puede apuntar a su propia URL sin pisarse entre ellas (porque cada rama tendrá una APP_VERSION distinta)
 */
export const VERSION_URLS: Record<string, string> = {
  '17': 'https://nui-ng.vercel.app',
};

export interface Version {
  value: string;
  label: string;
}
