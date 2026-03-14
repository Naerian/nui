import { ComponentPageConfig } from '../../../core/models';
import { DOCK_API_SECTIONS } from './configs/dock-api.config';
import { DOCK_THEMING_SECTIONS } from './configs/dock-theming.config';
import { DOCK_I18N_SECTIONS } from './configs/dock-i18n.config';
import { DOCK_GLOBAL_CONFIG_SECTIONS } from './configs/dock-global-config.config';

/**
 * Configuración de la página de documentación del componente NuiDock
 */
export const DOCK_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.dock.title',
  subtitle: 'components.dock.subtitle',
  sections: [
    ...DOCK_API_SECTIONS,
    ...DOCK_THEMING_SECTIONS,
    ...DOCK_I18N_SECTIONS,
    ...DOCK_GLOBAL_CONFIG_SECTIONS,
  ],
};
