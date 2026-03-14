import { NUIColor } from '../../../configs/common/types';
import { SidebarPanelPosition } from '../../sidebar-panel/models/sidebar-panel.model';

/**
 * Tipo de elemento que puede aparecer en el dock.
 */
export type NuiDockItemType = 'modal' | 'sidebar';

/**
 * Customización visual del chip del dock cuando un modal o panel está minimizado.
 *
 * Las propiedades definidas aquí se mapean al `NuiDockItem` correspondiente
 * gestionado por `NuiDockService`.
 *
 * @example
 * ```typescript
 * dockTabConfig: {
 *   icon: 'ri-customer-service-line',
 *   label: 'Soporte',
 *   cssClass: 'my-support-chip',
 * }
 * ```
 */
export interface DockTabConfig {
  /**
   * Clase de icono Remix Icons mostrada en el chip del dock.
   * Si no se proporciona en un SidebarPanel, se muestra un icono direccional
   * basado en la posición del panel. En un ModalDialog se omite el icono.
   * @example 'ri-customer-service-line', 'ri-chat-3-line'
   */
  prefixIcon?: string;

  /**
   * Clase de icono Remix Icons mostrada como sufijo en el chip del dock.
   * Solo se muestra si se proporciona un `prefixIcon`. Se puede usar para
   * indicar un estado adicional (ej. con un punto rojo para notificaciones).
   * @example 'ri-error-warning-line' (un icono de advertencia junto al título)
   */
  suffixIcon?: string;

  /**
   * Permite ocultar el icono direccional que indica la posición original del panel lateral.
   */
  hideSuffixIcon?: boolean;

  /**
   * Título alternativo para el chip del dock.
   * Si no se proporciona, se usa el título del componente.
   */
  label?: string;

  /**
   * Clases CSS adicionales aplicadas al botón chip del dock.
   * @example 'my-chat-chip', ['chip-primary', 'chip-rounded']
   */
  cssClass?: string | string[];
}

/**
 * Elemento unificado del dock que representa un modal o un panel lateral minimizado.
 *
 * El servicio `NuiDockService` gestiona una colección de estos items y crea el
 * componente `NuiDockComponent` de forma lazy cuando aparece el primero.
 */
export interface NuiDockItem {
  /** Identificador único del item; coincide con el id del modal o panel que lo originó */
  id: string;

  /** Tipo de componente que originó este item */
  type: NuiDockItemType;

  /** Título visible en el chip del dock */
  title: string;

  /** Clase de icono Remix Icons mostrada en el chip */
  prefixIcon?: string;

  /** Clase de icono Remix Icons mostrada como sufijo en el chip */
  suffixIcon?: string;

  /**
   * Permite ocultar el icono direccional que indica la posición original del panel lateral.
   */
  hideSuffixIcon?: boolean;

  /** Color semántico NUI aplicado al borde del chip */
  color?: NUIColor;

  /**
   * Posición original del panel lateral.
   * Solo presente cuando `type === 'sidebar'`; se usa para renderizar
   * un icono direccional que indica el origen del panel.
   */
  position?: SidebarPanelPosition;

  /** Clases CSS adicionales aplicadas al botón chip del dock */
  cssClass?: string | string[];

  /** Función de restauración invocada al hacer click en el chip */
  restore: () => void;
}
