import { NUIColor, NUIShape, NUISize, NUIVariant } from './common';
import { CalendarGlobalConfig } from '../components/calendar';
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
  /** NUI Defaults */
  defaultVariant?: NUIVariant;
  defaultSize?: NUISize;
  defaultShape?: NUIShape;
  defaultColor?: NUIColor;
  /** Calendar global defaults */
  calendar?: Partial<CalendarGlobalConfig>;
  /** Paginator global defaults */
  paginator?: PaginatorGlobalConfig;
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
}
