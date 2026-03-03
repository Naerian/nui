import { InjectionToken, Provider } from '@angular/core';
import { NuiI18n } from './nui-i18n.model';
import { NUI_I18N_DEFAULT } from './nui-i18n';
import { deepMerge } from '../utils';

/**
 * Token de inyección para la configuración de internacionalización (i18n) de NUI.
 * Permite a los usuarios proporcionar una configuración personalizada de i18n que se fusionará
 * con los valores predeterminados internos de NUI.
 */
export const NUI_I18N = new InjectionToken<NuiI18n>('NuiI18n', {
  providedIn: 'root', // Asegura que esté disponible globalmente
  factory: () => NUI_I18N_DEFAULT, // Provee la implementación por defecto
});
