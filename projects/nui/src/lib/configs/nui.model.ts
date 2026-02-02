import { NUIColor, NUIDateFormat, NUISize, NUIVariant } from './common';
import { FabButtonConfig } from './fab-button/fab-button.config';
import { TooltipConfig } from '../components/tooltip';
import { ToastGlobalConfig } from '../components/toast';
import { PaginatorGlobalConfig } from '../components/paginator';
import { PopoverConfig } from '../components/popover';
import { SidebarPanelConfig } from '../components/sidebar-panel';

/**
 * Configuración global de la librería NUI (Narian UI).
 */
export interface NUIConfig {
  defaultDateFormat?: {
    diffTimeFormat?: NUIDateFormat;
  };
  defaultVariant?: NUIVariant;
  defaultSize?: NUISize;
  defaultColor?: NUIColor;
  dropdownItemSize?: NUISize;
  /** Configuración global del paginator */
  paginator?: PaginatorGlobalConfig;
  /** Configuración global de toasts */
  toast?: Partial<ToastGlobalConfig>;
  /** Configuración global de tooltips */
  tooltip?: Partial<TooltipConfig>;
  /** Configuración global de popovers */
  popover?: Partial<PopoverConfig>;
  /** Configuración global de fab button */
  fabButton?: Partial<FabButtonConfig>;
  /** Configuración global de sidebar panels */
  sidebarPanel?: Partial<SidebarPanelConfig>;
}
