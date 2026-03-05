import { ComponentPageConfig } from '../../../core/models';
import { SIDEBAR_PANEL_EXAMPLES_SECTIONS } from './configs/sidebar-panel-examples.config';
import { SIDEBAR_PANEL_API_SECTIONS } from './configs/sidebar-panel-api.config';
import { SIDEBAR_PANEL_THEMING_SECTIONS } from './configs/sidebar-panel-theming.config';
import { SIDEBAR_PANEL_I18N_SECTIONS } from './configs/sidebar-panel-i18n.config';
import { SIDEBAR_PANEL_A11Y_SECTIONS } from './configs/sidebar-panel-a11y.config';

/**
 * Configuración de la página de documentación del componente Sidebar Panel
 */
export const SIDEBAR_PANEL_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.sidebar-panel.title',
  subtitle: 'components.sidebar-panel.subtitle',
  sections: [
    ...SIDEBAR_PANEL_EXAMPLES_SECTIONS,
    ...SIDEBAR_PANEL_API_SECTIONS,
    ...SIDEBAR_PANEL_THEMING_SECTIONS,
    ...SIDEBAR_PANEL_I18N_SECTIONS,
    ...SIDEBAR_PANEL_A11Y_SECTIONS,
  ],
};
