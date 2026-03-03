import { NUIColor, NUISize, NUIVariant } from './common';
import { CalendarGlobalConfig } from '../components/calendar';
import { FabButtonConfig } from './fab-button/fab-button.config';
import { TooltipConfig } from '../components/tooltip';
import { ToastGlobalConfig } from '../components/toast';
import { PopoverConfig } from '../components/popover';
import { SidebarPanelConfig } from '../components/sidebar-panel';
import { DarkModeStrategy, ThemePreset } from '../themes';
import { ButtonGlobalConfig } from './button';
import { ActionMenuGlobalConfig } from './action-menu';
import { SelectButtonGlobalConfig } from './select-button';
import { PaginatorConfig } from './paginator';
import { AvatarGlobalConfig } from './avatar';

/**
 * Configuración global de la librería NUI (Narian UI).
 */
export interface NUIConfig {
  // Configuración de theming y modo oscuro
  preset?: ThemePreset;
  darkMode?: DarkModeStrategy;
  darkModeClass?: string;

  // Configuraciones globales de componentes (opcional)
  config?: {
    /** Avatar global defaults */
    avatar?: Partial<AvatarGlobalConfig>;
    /** Action Menu global defaults */
    actionMenu?: Partial<ActionMenuGlobalConfig>;
    /** Select Button global defaults */
    selectButton?: Partial<SelectButtonGlobalConfig>;
    /** Button global defaults */
    button?: Partial<ButtonGlobalConfig>;
    /** Calendar global defaults */
    calendar?: Partial<CalendarGlobalConfig>;
    /** Paginator global defaults */
    paginator?: Partial<PaginatorConfig>;
    /** Toast global defaults */
    toast?: Partial<ToastGlobalConfig>;
    /** Tooltip global defaults */
    tooltip?: Partial<TooltipConfig>;
    /** Popover global defaults */
    popover?: Partial<PopoverConfig>;
    /** Fab button global defaults */
    fabButton?: Partial<FabButtonConfig>;
    /** Sidebar panel global defaults */
    sidebarPanel?: Partial<SidebarPanelConfig>;
  };
}
