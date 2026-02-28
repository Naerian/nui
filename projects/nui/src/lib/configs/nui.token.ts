import { InjectionToken } from "@angular/core";
import { NUIConfig } from "./nui.model";

/**
 * Token de inyección para la configuración global de NUI.
 * Permite a los usuarios proporcionar una configuración parcial que se fusionará
 * con los valores predeterminados internos de cada componente.
 */
export const NUI_CONFIG = new InjectionToken<Partial<NUIConfig>>('NUIConfig');