import { TemplateRef } from '@angular/core';

/**
 * Tipo de renderizado del menú de acciones.
 * 
 * @typedef {('static' | 'dynamic')} ActionMenuType
 * 
 * - **'static'**: El menú se renderiza estáticamente en el DOM y se muestra/oculta con CSS.
 *   Mejor rendimiento para menús que se usan frecuentemente.
 * 
 * - **'dynamic'**: El menú se crea/destruye dinámicamente en el DOM al abrir/cerrar.
 *   Mejor para menús que se usan ocasionalmente o para reducir el DOM inicial.
 * 
 * @default 'dynamic'
 * 
 * @example
 * ```typescript
 * <nui-action-menu [type]="'static'"></nui-action-menu>
 * ```
 */
export type ActionMenuType = 'static' | 'dynamic';

/**
 * Item individual del menú de acciones.
 * Define la estructura completa de un elemento del menú, incluyendo acciones,
 * visualización, accesibilidad y callbacks.
 * 
 * @interface ActionMenuItem
 * 
 * @property {string} [action] - Identificador único de la acción (ej: 'delete', 'edit', 'share').
 *                                Útil para identificar qué acción ejecutar en el handler.
 * @property {string} [label] - Texto visible del item (ej: "Eliminar", "Editar", "Compartir").
 * @property {string} [subtitle] - Texto secundario mostrado debajo del label en tamaño menor.
 * @property {string} [title] - Texto para el atributo title (tooltip). Mejora la accesibilidad.
 * @property {string} [icon] - Clase del icono RemixIcon (ej: 'ri-delete-bin-line', 'ri-edit-line').
 * @property {string} [shortcut] - Atajo de teclado mostrado visualmente (ej: 'Ctrl+D', '⌘+E').
 *                                 Solo es visual, no ejecuta la acción automáticamente.
 * @property {TemplateRef<any>} [templateRef] - Plantilla Angular personalizada para renderizado custom del item.
 * @property {string} [id] - ID único del item para tracking o referencias.
 * @property {ActionMenuItem[]} [children] - Array de items hijos para crear submenús anidados.
 * @property {boolean} [disabled] - Si está deshabilitado (visual y funcionalmente).
 * @property {boolean} [selected] - Si está seleccionado (para uso como selector).
 * @property {boolean} [separator] - Si es un separador visual. Si tiene label, se muestra como separador con texto.
 * @property {Function} [onAction] - Callback ejecutado al hacer clic en el item.
 * 
 * @example
 * ```typescript
 * // Item simple
 * const deleteItem: ActionMenuItem = {
 *   action: 'delete',
 *   label: 'Eliminar',
 *   icon: 'ri-delete-bin-line',
 *   shortcut: 'Del',
 *   onAction: () => console.log('Eliminando...')
 * };
 * 
 * // Item con submenú
 * const exportItem: ActionMenuItem = {
 *   action: 'export',
 *   label: 'Exportar',
 *   icon: 'ri-download-line',
 *   children: [
 *     {
 *       action: 'export-pdf',
 *       label: 'Exportar como PDF',
 *       icon: 'ri-file-pdf-line',
 *       onAction: () => exportToPDF()
 *     },
 *     {
 *       action: 'export-excel',
 *       label: 'Exportar como Excel',
 *       icon: 'ri-file-excel-line',
 *       onAction: () => exportToExcel()
 *     }
 *   ]
 * };
 * 
 * // Item deshabilitado
 * const shareItem: ActionMenuItem = {
 *   action: 'share',
 *   label: 'Compartir',
 *   icon: 'ri-share-line',
 *   disabled: true,
 *   title: 'Esta función estará disponible pronto'
 * };
 * 
 * // Item con subtitle
 * const userItem: ActionMenuItem = {
 *   action: 'user',
 *   label: 'Juan Pérez',
 *   subtitle: 'juan@example.com',
 *   icon: 'ri-user-line'
 * };
 * 
 * // Item seleccionado
 * const selectedItem: ActionMenuItem = {
 *   action: 'option1',
 *   label: 'Opción 1',
 *   selected: true
 * };
 * 
 * // Separador simple
 * const separator: ActionMenuItem = {
 *   separator: true
 * };
 * 
 * // Separador con label
 * const labeledSeparator: ActionMenuItem = {
 *   separator: true,
 *   label: 'Acciones peligrosas'
 * };
 * 
 * // Item con template personalizado
 * const customItem: ActionMenuItem = {
 *   action: 'custom',
 *   templateRef: myCustomTemplate
 * };
 * ```
 * 
 * @see {@link ActionMenuType} para tipos de renderizado del menú
 */
export interface ActionMenuItem {
  action?: string;
  label?: string;
  subtitle?: string;
  title?: string;
  icon?: string;
  shortcut?: string;
  templateRef?: TemplateRef<any> | null;
  id?: string;
  children?: ActionMenuItem[];
  disabled?: boolean;
  selected?: boolean;
  separator?: boolean;
  onAction?: () => void;
}